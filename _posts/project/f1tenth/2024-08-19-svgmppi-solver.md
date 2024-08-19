---
title: "[F1tenth] SVG-MPPI Solver"
categories: 
  - f1tenth
---
# 큰 기능

```cpp
std::pair<ControlSeq, double> SVGuidedMPPI::solve(const State& initial_state) {
  // ...
  return std::make_pair(updated_control_seq, collision_rate);
}
```

# Variables

|Data Type|Variable Name|Description|
|---|---|---|
|std::vector<double>|costs_history|각 반복에서 계산된 비용을 저장한다.|
|std::vector<ControlSeq>|control_seq_history|각 반복에서의 제어 시퀀스를 저장한다|

# 기능별

SVGD and 최적의 파티클 선택

```cpp
        // Transport guide particles by SVGD
        std::vector<double> costs_history;
        std::vector<ControlSeq> control_seq_history;
        auto func_calc_costs = [&](const PriorSamplesWithCosts& sampler) { return mpc_base_ptr_->calc_sample_costs(sampler, initial_state).first; };
        for (int i = 0; i < num_svgd_iteration_; i++) {
            // Transport samples by stein variational gradient descent
            const ControlSeqBatch grad_log_posterior = approx_grad_posterior_batch(*guide_samples_ptr_, func_calc_costs);
#pragma omp parallel for num_threads(thread_num_)
            for (size_t i = 0; i < guide_samples_ptr_->get_num_samples(); i++) {
                guide_samples_ptr_->noised_control_seq_samples_[i] += svgd_step_size_ * grad_log_posterior[i];
            }

            // store costs and samples for adaptive covariance calculation
            const std::vector<double> costs = mpc_base_ptr_->calc_sample_costs(*guide_samples_ptr_, initial_state).first;
            // guide_samples_ptr_->costs_ = costs;
            // const std::vector<double> cost_with_control_term = guide_samples_ptr_->get_costs_with_control_term(gaussian_fitting_lambda, 0,
            // prior_samples_ptr_->get_zero_control_seq());
            costs_history.insert(costs_history.end(), costs.begin(), costs.end());
            control_seq_history.insert(control_seq_history.end(), guide_samples_ptr_->noised_control_seq_samples_.begin(),
                                       guide_samples_ptr_->noised_control_seq_samples_.end());
        }
        const auto guide_costs = mpc_base_ptr_->calc_sample_costs(*guide_samples_ptr_, initial_state).first;
        const size_t min_idx = std::distance(guide_costs.begin(), std::min_element(guide_costs.begin(), guide_costs.end()));
        const ControlSeq best_particle = guide_samples_ptr_->noised_control_seq_samples_[min_idx];
```

적응형 공분산 행렬 계산

```cpp
        // calculate adaptive covariance matrices for prior distribution
        // TODO: Support multiple control input dimensions
        ControlSeqCovMatrices covs = prior_samples_ptr_->get_constant_control_seq_cov_matrices({steer_cov_});
        if (is_covariance_adaptation_) {
            // calculate softmax costs
            const std::vector<double> softmax_costs = softmax(costs_history, gaussian_fitting_lambda_, thread_num_);

            // calculate covariance using gaussian fitting
            for (size_t i = 0; i < prediction_step_size_ - 1; i++) {
                std::vector<double> steer_samples(control_seq_history.size());
                std::vector<double> q_star(softmax_costs.size());
                for (size_t j = 0; j < steer_samples.size(); j++) {
                    steer_samples[j] = control_seq_history[j](i, 0);
                    q_star[j] = softmax_costs[j];
                }
                const double sigma = gaussian_fitting(steer_samples, q_star).second;

                const double sigma_clamped = std::clamp(sigma, min_steer_cov_, max_steer_cov_);

                covs[i] = Eigen::MatrixXd::Identity(CONTROL_SPACE::dim, CONTROL_SPACE::dim) * sigma_clamped;
            }
        }
```

```cpp
        // random sampling from prior distribution
        prior_samples_ptr_->random_sampling(prev_control_seq_, covs);

        // Rollout samples and calculate costs
        auto [_costs, collision_costs] = mpc_base_ptr_->calc_sample_costs(*prior_samples_ptr_, initial_state);
        prior_samples_ptr_->costs_ = std::forward<std::vector<double>>(_costs);

        // calculate weights
        if (is_use_nominal_solution_) {
            // with nominal sequence
            nominal_control_seq_ = best_particle;
        } else {
            // without nominal sequence
            nominal_control_seq_ = prior_samples_ptr_->get_zero_control_seq();
        }
        const std::vector<double> weights = calc_weights(*prior_samples_ptr_, nominal_control_seq_);
        weights_ = weights;  // for visualization

        // Get control input sequence by weighted average of samples
        ControlSeq updated_control_seq = prior_samples_ptr_->get_zero_control_seq();
        for (size_t i = 0; i < prior_samples_ptr_->get_num_samples(); i++) {
            updated_control_seq += weights[i] * prior_samples_ptr_->noised_control_seq_samples_.at(i);
        }

        const int collision_num = std::count_if(collision_costs.begin(), collision_costs.end(), [](const double& cost) { return cost > 0.0; });
        const double collision_rate = static_cast<double>(collision_num) / static_cast<double>(prior_samples_ptr_->get_num_samples());

        // update previous control sequence for next time step
        prev_control_seq_ = updated_control_seq;
```
