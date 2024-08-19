---
title: "[F1tenth] SVG-MPPI Solver"
categories: 
  - f1tenth
---
# 입출력

```cpp
std::pair<ControlSeq, double> SVGuidedMPPI::solve(const State& initial_state) {
  // ...
  return std::make_pair(updated_control_seq, collision_rate);
}
```

# Variables

|Index|Data Type|Variable Name|Description|
|---|---|---|---|
|1|std::vector<double>|costs_history|각 반복에서 계산된 비용을 저장하는 벡터입니다. 각 스텝의 비용 값을 저장하여 후에 분석이나 가우시안 피팅 등에 사용될 수 있습니다.|
|2|std::vector<ControlSeq>|control_seq_history|각 반복에서의 제어 시퀀스를 저장하는 벡터입니다. 각 반복마다의 제어 이력(컨트롤 시퀀스)을 기록합니다. **costs_history**와 **control_seq_history**는 주로 이후에 가우시안 피팅을 통해 적응형 공분산(adaptive covariance)을 계산하거나, 최적의 제어 시퀀스를 선택하기 위한 데이터로 사용됩니다.|
|3|const ControlSeqBatch|grad_log_posterior|각 샘플에 대한 로그 후방 확률의 그래디언트를 저장하는 변수입니다. Stein Variational Gradient Descent(SVGD)에서 사용됩니다. 각 샘플에 대해 계산된 로그 후방 확률의 그래디언트입니다. 이 그래디언트는 Stein Variational Gradient Descent(SVGD)를 통해 샘플을 점진적으로 업데이트하는 데 사용됩니다.|
|4|const std::vector<double>|costs|현재 반복에서 계산된 비용을 저장하는 벡터입니다. 이 값은 mpc_base_ptr_->calc_sample_costs 함수에서 계산됩니다.|
|5|ControlSeqCovMatrices|covs|제어 시퀀스의 공분산 행렬을 저장하는 변수. 이 행렬은 제어 입력의 불확실성을 나타내며, 각 시점에서 제어 입력이 얼마나 변동될 수 있는지를 나타낸다. 이 변수는 예측 단계에서 사용할 공분산 행렬을 담고 있으며, 초기에는 고정된 공분산 값으로 설정된다. 이후 코드에서 적응형 공분산 계산이 활성화되면, 이 값이 업데이트된다.|
|6|const std::vector<double>|softmax_costs|제어 샘플의 중요도를 나타내는 가중치를 저장하는 벡터. 소프트맥스 함수에 의해 계산된 비용의 가중치를 저장하는 벡터. 이전의 비용(costs_history)을 기반으로 각 샘플의 상태적인 중요도를 계산한 것이다.|
|7|std::vector<double>|steer_samples(control_seq_history.size())|각 샘플의 스티어링 값을 저장하는 벡터. 특정 시점에서 각 제어 샘플의 스티어링(조향) 값을 저장하는 벡터이다. 벡터의 크기는 control_seq_history.size()로 이는 저장된 제어 시퀀스의 수와 동일하다. 이 벡터는 각 샘플의 스티어링 입력 값을 모아서 공분산 계산의 입력으로 사용된다.|
|8|std::vector<double>|q_star(softmax_costs.size())|소프트맥스 가중치를 저장하는 벡터. 소프트맥스 가중치 softmax_costs 를 저장하는 벡터. steer_samples와 동일한 크기를 갖는다. 이 벡터는 steer_samples와 함쎄 공분산 계산의 입력으로 사용된다.|
|9|const double|sigma|가우시안 피팅을 통해 계산된 공분산 값. 가우시안 피팅을 통해 계산된 공분산 값이다. 이는 스티어링 샘플과 가중치를 기반으로 최적의 공분산을 찾는 과정에서 도출된 결과이다. 후속 계산에서 클램핑을 통해 적절한 범위 내로 제한된다.|
|10|const double|sigma_clamped|공분산 값을 제한 범위 내로 클램핑한 값. sigma 값을 특정 범위 (min_steer_cov_, max_steer_cov_) 내에서 제한한 값. 이 값은 최종적으로 covs 행렬에 저장되넝 제어 시퀀스의 공분산 행렬로 사용된다. 이는 제어 입력의 불확실성을 나타내며, 지나치게 크거나 작은 값을 방지하기 위해 클램핑된 값이다.|
||||
|11|const auto|guide_costs|최종 가이드 샘플에 대해 계산된 비용 벡터입니다. 이 값은 각 샘플에 대한 총 비용을 나타냅니다.|
|12|const size_t|min_idx|최종 guide_costs 벡터에서 가장 작은 비용을 가진 요소의 인덱스입니다.|
|13|const ControlSeq|best_particle|가장 작은 비용을 가진 가이드 샘플입니다. 이 샘플이 최종 선택된 최적의 제어 시퀀스가 됩니다. **min_idx**는 비용이 가장 낮은 샘플을 찾기 위해 사용되며, **best_particle**은 이 샘플이 선택된 최적의 제어 시퀀스입니다.|
|14||_costs|샘플들의 비용을 나타내는 벡터. 각 샘플이 얼마나 좋은지 평가한다. 이후의 가중치 계산에서 중요한 역할을 한다.|
|15||collision_costs|샘플들의 충돌 관련 비용을 나타내는 벡터. 각 샘플이 충돌과 관련된 비용을 얼마나 가지는지 평가한다. 충돌이 발생한 샘플들은 높은 비용을 가지며, 이는 제어 시퀀스의 안전성을 평가하는 데 사용된다.|
|16||nominal_control_seq_|참조용 제어 시퀀스. 최적화 과정에서 참조 시퀀스로 사용된다. 가중치를 계산할 때 참조로 사용된다. is_use_nominal_solution_ 플래그에 따라 이전에 계산된 최적 제어 시퀀스 best_particl을 사용할지 아니면 제로 시퀀스를 사용할지 결정된다.|
|17||weights|각 샘플에 대한 가중치를 나타내는 벡터. 비용과 참조 시퀀스를 기반으로 각 샘플의 중요도롤 결정한다. 이 가중치는 샘플들을 통합하여 최종 제어 시퀀스를 생성하는 데 사용된다.|
|18||weights_|weights의 복사본으로 시각화 목적으로 사용된다.|
|19||updated_control_seq|가중 평균을 통해 계산된 새로운 제어 시퀀스. 모든 샘플의 가중 평균을 계산하여 최종 제어 입력을 결정한다. 이 제어 시퀀스는 이후 단계에서 사용할 최적의 입력이 된다.|
||||
|20||collision_num|충돌이 발생한 샘플의 수. 제어 시퀀스의 안전성을 평가하기 위해 사용된다. 충돌이 많은 경우, 해당 제어 시퀀스는 안전하지 않은 것으로 간주된다.|
|21||collision_rate|충돌이 발생한 샘플의 비율. 전체 샘플 중 충돌이 발생한 샘플의 비율을 계산하여 제어 시퀀스의 안전성을 정량적으로 평가한다.|

# 기능별

SVGD and 최적의 파티클 선택

- 입력 : initial_state
- 출력 : costs_history, control_seq_history

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
            costs_history.insert(costs_history.end(), costs.begin(), costs.end());
            control_seq_history.insert(control_seq_history.end(), guide_samples_ptr_->noised_control_seq_samples_.begin(),
                                       guide_samples_ptr_->noised_control_seq_samples_.end());
        }
```

- 입력 : initial_state
- 출력 : best_particle

```cpp
        const auto guide_costs = mpc_base_ptr_->calc_sample_costs(*guide_samples_ptr_, initial_state).first;
        const size_t min_idx = std::distance(guide_costs.begin(), std::min_element(guide_costs.begin(), guide_costs.end()));
        const ControlSeq best_particle = guide_samples_ptr_->noised_control_seq_samples_[min_idx];
```

Adaptive Covariance Matrix of Control Sequences : 상황에 맞게 제어 시스템을 더 정확하게 설정하는 데 기여한다.

- 입력 : costs_history, control_seq_history
- 출력 : covs

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

Prior Distribution에서의 샘플링

- 입력 : prev_control_seq_, covs
- 출력 : 없음 (prior_samples_ptr_ 가 내부적으로 갱신된다.)

```cpp
        // random sampling from prior distribution
        prior_samples_ptr_->random_sampling(prev_control_seq_, covs);
```

가중 평균을 통한 제어 입력 시퀀스 생성

- 입력 : best_particle
- 출력 : updated_control_seq

```cpp

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
```

충돌 비율 계산

- 입력 : initial_state
- 출력 : collision_rate

```cpp
        // Rollout samples and calculate costs
        auto [_costs, collision_costs] = mpc_base_ptr_->calc_sample_costs(*prior_samples_ptr_, initial_state);
        prior_samples_ptr_->costs_ = std::forward<std::vector<double>>(_costs);

        const int collision_num = std::count_if(collision_costs.begin(), collision_costs.end(), [](const double& cost) { return cost > 0.0; });
        const double collision_rate = static_cast<double>(collision_num) / static_cast<double>(prior_samples_ptr_->get_num_samples());

        // update previous control sequence for next time step
        prev_control_seq_ = updated_control_seq;
```

# 가독성을 위한 코드 순서 교체

Adaptive Covariance 계산

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

// random sampling from prior distribution
prior_samples_ptr_->random_sampling(prev_control_seq_, covs);
```

update_control_seq 계산

```cpp
const auto guide_costs = mpc_base_ptr_->calc_sample_costs(*guide_samples_ptr_, initial_state).first;
const size_t min_idx = std::distance(guide_costs.begin(), std::min_element(guide_costs.begin(), guide_costs.end()));
const ControlSeq best_particle = guide_samples_ptr_->noised_control_seq_samples_[min_idx];

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
```

collision_rate 계산

```cpp
// Rollout samples and calculate costs
auto [_costs, collision_costs] = mpc_base_ptr_->calc_sample_costs(*prior_samples_ptr_, initial_state);
prior_samples_ptr_->costs_ = std::forward<std::vector<double>>(_costs);

const int collision_num = std::count_if(collision_costs.begin(), collision_costs.end(), [](const double& cost) { return cost > 0.0; });
const double collision_rate = static_cast<double>(collision_num) / static_cast<double>(prior_samples_ptr_->get_num_samples());

// update previous control sequence for next time step
prev_control_seq_ = updated_control_seq;
```

# 궁금한 점

- 적응형 공분산 행렬이 무엇이고, 왜 계산할까?
- 

# Memo

Adaptive Covariance : 모델의 정확성을 향상시키고, 불확실성을 반영하며, 탐색 효율성을 높이기 위해서이다.

모델의 정확성 향상

- 제어 시스템에서 공분산 행렬은 제어 입력의 불확실성을 나타낸다. 만약 공분산이 고정되어 있다면, 다양한 상황에서 모델이 동일한 정도의 불확실성을 가정하게 된다. 하지만 실제로는 상황에 따라 불확실성이 달라질 수 있다.
- 적응형 공분산을 사용하면, 현재 상황에 맞게 공분산을 조정하여 모델의 정확성을 높일 수 있다. 예를 들어 상황에 따라 노이즈가 더 크거나 작을 수 있으므로 이를 반영하는 공분산을 사용하면 예측의 신뢰성을 높일 수 있다.

불확실성의 반영

- 제어 입력(조향, 가속 등)에 대한 불확실성은 시점마다 다를 수 있다. 특정 상황에서는 제어 입력의 결과가 더 예측 가능하거나 더 불확실할 수 있다.
- 적응형 공분산을 통해 이러한 불확실성을 동적으로 반영하면, 모델이 다양한 상황에서 더 적절한 예측을 할 수 있다. 이는 특히 복잡한 환경이나 비선형 시스템에서 중요하다.