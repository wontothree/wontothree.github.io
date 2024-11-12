---
title: "[F1tenth] Solver"
categories:
  - f1tenth_
---
# solve

최종적으로 구해야 할 식은 다음과 같다.

$$
\mathbf{U}_t^* = \sum_{k=0}^{K-1} w(\mathbf{V}_k) \mathbf{V}_k
$$

$$
\begin{align*}
    w(\mathbf{V}_k)
    &= \text{softmax} \left( S(\mathbf{V}_k) + \lambda \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right)\\
    &= \eta^{-1} \exp \left( -\dfrac{1}{\lambda} \left[ S(\mathbf{V}_k) + \lambda \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right] \right)\\
    &= \eta^{-1} \exp \left( -\dfrac{1}{\lambda} S(\mathbf{V}_k) - \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right)
\end{align*}
$$

# approximate_gradient_log_posterior_batch

```cpp
ControlSequenceBatch SVGMPPI::approximate_gradient_log_posterior_batch(
    const State& initial_state
)
{
    // declare and initialize gradient_log_posterior_batch
    ControlSequenceBatch gradient_log_posterior_batch = std::vector<Eigen::MatrixXd, Eigen::aligned_allocator<Eigen::MatrixXd>>(
        sample_number_, Eigen::MatrixXd::Zero(prediction_step_size_, STATE_SPACE::dim)
    );
    for (size_t i = 0; i < sample_number_; i++) {
        const ControlSequence gradient_log_likelihood = approximate_gradient_log_likelihood(
            initial_state,
            control_mean_sequence_,
            noised_control_sequence_batch_[i],
            control_inverse_covariance_sequence_
        );

        gradient_log_posterior_batch[i] = gradient_log_likelihood;
    }

    return gradient_log_posterior_batch;
}
```

## approximate_gradient_log_likelihood

$$
\phi = \dfrac{\sum_{i=0}^{N-1} w(\mathbf{V}_k^g [i]) \Sigma_g^{-1} (\mathbf{V}_k^g[i] - \mathbf{V}_k^g)}{\sum_{i=0}^{N-1}w(\mathbf{V}_k^g [i])}
$$

```cpp
ControlSequence SVGMPPI::approximate_gradient_log_likelihood(
    const State& initial_state,
    const ControlSequence& control_mean_sequence,
    const ControlSequence& noised_control_mean_sequence,
    const ControlCovarianceSequence& control_inverse_covariance_sequence
)
{
    // declate and initialize control_covariance_sequence
    ControlCovarianceSequence control_covariance_sequence = std::vector<Eigen::MatrixXd, Eigen::aligned_allocator<Eigen::MatrixXd>>(
        prediction_horizon_ - 1, Eigen::MatrixXd::Zero(CONTROL_SPACE::dim, CONTROL_SPACE::dim)
    );
    for (auto& control_covariance : control_covariance_sequence) {
        for (size_t i = 0; i < CONTROL_SPACE::dim; i++) {
            control_covariance(i, i) = steering_control_covariance_for_gradient_estimation_[i];
        }
    }

    // Generate control sequence samples - noised_control_sequence_batch_
    random_sampling(noised_control_mean_sequence, control_covariance_sequence);

    // calculate state cost for each state sequence
    auto state_cost_batch = calculate_state_cost_batch(
        initial_state,
        local_cost_map_,
        &state_sequence_batch_
    ).first;

    // calculate cost with control term
    std::vector<double> sample_weight_batch(sample_number_);
    ControlSequence grad_sum = control_mean_sequence * 0.0;
    const ControlCovarianceSequence sampler_inverse_covariance = control_inverse_covariance_sequence_;
    #pragma omp parallel for num_threads(thread_number_)
    for (size_t i = 0; i < sample_number_; i++) {
        // calculate sample cost
        double sample_cost = state_cost_batch[i];
        for (size_t j = 0; j < prediction_step_size_ - 1; j++) {
            const double diff_control_term = grad_lambda_ \
                * (previous_control_mean_sequence_.row(j) - noised_control_sequence_batch_[i].row(j)) \
                * control_inverse_covariance_sequence[j] \
                * (previous_control_mean_sequence_.row(j) - noised_control_sequence_batch_[i].row(j)).transpose();
            sample_cost += diff_control_term;
        }

        const double sample_weight = std::exp(-sample_cost / grad_lambda_);
        sample_weight_batch[i] = sample_weight;
        
        ControlSequence gradient_log_gaussian(control_mean_sequence.rows(), control_mean_sequence.cols());
        gradient_log_gaussian.setZero();
        for (size_t j = 0; j < prediction_step_size_ - 1; j++) {
            gradient_log_gaussian.row(j) = sample_weight \
                * sampler_inverse_covariance[j] \
                * (noised_control_sequence_batch_[i] - noised_control_mean_sequence).row(j).transpose();
        }
        grad_sum += gradient_log_gaussian;
    }

    const double weight_sum = std::accumulate(sample_weight_batch.begin(), sample_weight_batch.end(), 0.0);

    return grad_sum / (weight_sum + 1e-10);
}
```

# random_sampling

control sequence에 대한 샘플 noised_control_sequence_batch_ 를 생성한다.

1. 평균이 0이고 표준편차가 control_covariance_sequence의 표준편차인 정규분포를 설정한다.
2. 설정된 정규분포에서 샘플링을 하고, 이를 noise_sequence_batch에 저장한다.
3. 일정 비율을 가지고 편향 샘플링과 비편향 샘플링을 하여 control sequence를 샘플링한다. 이를 noised_control_sequence_batch_에 저장한다.
4. control input constraint를 고려하여 샘플링된 제어 신호를 clampling한다.

```cpp
void SVGMPPI::random_sampling(
    const ControlSequence control_mean_sequence,
    const ControlCovarianceSequence control_covariance_sequence
)
{
    set_control_mean_sequence(control_mean_sequence);
    set_control_covariance_sequence(control_covariance_sequence);

    // Set normal distributions parameters
    for (size_t i = 0; i < prediction_horizon_ - 1; i++) {
        for (size_t j = 0; j < CONTROL_SPACE::dim; j++) {
            // standard deviation of control covariance sequence
            const double standard_deviation = std::sqrt(control_covariance_sequence_[i](j, j));

            // normal distribution parameter in which expectation is 0 and standard deviation is from control covariance sequence
            std::normal_distribution<>::param_type normal_distribution_parameter(0.0, standard_deviation);

            // set noraml distribution pointer
            (*normal_distribution_pointer_)[i][j].param(normal_distribution_parameter);
        }
    }

    #pragma omp parallel for num_threads(thread_number_)
    for (size_t i = 0; i < sample_number_; i++) {
        // generate noise sequence using upper normal distribution
        for (size_t j = 0; j < prediction_horizon_ - 1; j++) {
            for (size_t k = 0; k < CONTROL_SPACE::dim; k++) {
                noise_sequence_batch_[i](j, k) = (*normal_distribution_pointer_)[j][k](random_number_generators_[omp_get_thread_num()]);
            }
        }

        // sampling control trajectory with non-biased (around zero) sampling rate
        if (i < static_cast<size_t>((1 - non_biased_sampling_rate_) * sample_number_)) {
            // biased sampling
            noised_control_sequence_batch_[i] = control_mean_sequence_ + noise_sequence_batch_[i];
        } else {
            // non-biased sampling (around zero)
            noised_control_sequence_batch_[i] = noise_sequence_batch_[i];
        }

        // clip input with control input constraints
        for (size_t j = 0; j < CONTROL_SPACE::dim; j++) {
            for (size_t k = 0; k < prediction_horizon_ - 1; k++) {
                noised_control_sequence_batch_[i](k, j) = std::clamp(
                    noised_control_sequence_batch_[i](k, j),
                    min_control_[j],
                    max_control_[j]
                );
            }
        }
    }
}
```

- biased sampling: noise를 입력으로 받은 평균에 더하여 샘플을 생성한다. 이미 알고 있는 정보에 기반하여 샘플링한다.
- 순수한 noise만으로 샘플을 생성한다. 샘플들이 0을 중심으로 분포하게 만든다. 이 방식은 탐색에 유리하다.

# calculate_state_cost_batch

$\left[ S(\mathbf{V}_1), S(\mathbf{V}_2), \dots, S(\mathbf{V}_{T-1}) \right]$를 계산한다.

입력

- initial_state
- local_cost_map
- state_sequence_batch : 멤버 변수가 들어가며, 함수 내부에서 그 값이 변경된다. 계산하는 과정에서 사용하는 것이 아닌 변경할 멤버변수가 들어간다.

사용하는 멤버 변수 : noised_control_sequence_batch_

```cpp
std::pair<std::vector<double>, std::vector<double>> SVGMPPI::calculate_state_cost_batch(
    const State& initial_state,
    const grid_map::GridMap& local_cost_map,
    StateSequenceBatch* state_sequence_batch
) const
{
    std::vector<double> total_cost_batch(sample_number_);
    std::vector<double> collision_cost_batch(sample_number_);

    #pragma omp parallel for num_threads(thread_number_)
    for (size_t i = 0; i < sample_number_; i++) {
        // predict state sequence
        state_sequence_batch->at(i) = predict_state_sequence(
            initial_state,
            noised_control_sequence_batch_[i]
        );

        // calculate state sequence cost
        const auto [total_cost, collision_cost] = calculate_state_sequence_cost(
            state_sequence_batch->at(i),
            local_cost_map
        );
        total_cost_batch.at(i) = total_cost;
        collision_cost_batch.at(i) = collision_cost;
    }

    return std::make_pair(total_cost_batch, collision_cost_batch);
}
```

## predict_state_sequence

Sample의 $k$th state sequence를 생성한다.

$$
\mathbf{x}_0, \mathbf{x}_1, \dots, \mathbf{x}_{T - 1}
$$

```cpp
StateSequence SVGMPPI::predict_state_sequence(
    const State& initial_state,
    const ControlSequence& control_sequence
) const
{
    // initialize state trajectory
    StateSequence predicted_state_sequence_ = Eigen::MatrixXd::Zero(prediction_step_size_, STATE_SPACE::dim);

    // set current state to state trajectory as initial state
    predicted_state_sequence_.row(0) = initial_state;

    for (size_t i = 0; i < prediction_step_size_ - 1; i++) {
        double steering_ = control_sequence(i, CONTROL_SPACE::steering);

        const double predicted_x_ = predicted_state_sequence_(i, STATE_SPACE::x);
        const double predicted_y_ = predicted_state_sequence_(i, STATE_SPACE::y);;
        const double predicted_yaw_ = predicted_state_sequence_(i, STATE_SPACE::yaw);
        const double predicted_velocity_ = predicted_state_sequence_(i, STATE_SPACE::velocity);
        const double predicted_steering_ = predicted_state_sequence_(i, STATE_SPACE::steering);

        // kinematic bicycle model
        const double sideslip_ = atan(lf_ / (lf_ + lr_) * tan(steering_));
        const double predicted_delta_x_ = predicted_velocity_ * cos(predicted_yaw_ + sideslip_) * prediction_interval_;
        const double predicted_delta_y_ = predicted_velocity_ * sin(predicted_yaw_ + sideslip_) * prediction_interval_;
        const double predicted_delta_yaw_ = predicted_velocity_ * sin(sideslip_) / lr_ * prediction_interval_;
        const double predicted_delta_steering_ = predicted_steering_;

        double next_velocity_ = 0.0;
        if (1) {
            next_velocity_ = predict_constant_speed(predicted_velocity_);
        }

        // next state
        predicted_state_sequence_(i + 1, STATE_SPACE::x) = predicted_x_ + predicted_delta_x_;
        predicted_state_sequence_(i + 1, STATE_SPACE::y) = predicted_y_ + predicted_delta_y_;
        predicted_state_sequence_(i + 1, STATE_SPACE::yaw) = std::atan2(sin(predicted_yaw_ + predicted_delta_yaw_), cos(predicted_yaw_ + predicted_delta_yaw_));
        predicted_state_sequence_(i + 1, STATE_SPACE::velocity) = next_velocity_;
        predicted_state_sequence_(i + 1, STATE_SPACE::steering) = predicted_steering_ + predicted_delta_steering_;
    }

    return predicted_state_sequence_;
}
```

### predict_constant_speed

## calculate_state_sequence_cost

$k$th state sequence cost $S(\mathbf{V}_k)$을 계산한다.

$$
S(\mathbf{V}_k) = \phi(\mathbf{x}_T) + \sum_{\tau = 0}^{T-1} c(\mathbf{x}_{\tau})
$$

```cpp
std::pair<double, double> SVGMPPI::calculate_state_sequence_cost(
    const StateSequence state_sequence,
    const grid_map::GridMap& local_cost_map
) const
{
    // total cost of summing stage cost and terminal cost
    double state_squence_cost_sum_ = 0.0;

    // stage cost
    for (size_t i = 0; i < prediction_step_size_; i++) {
        double state_squence_stage_cost_sum_ = 10.0;

        State stage_state_ = state_sequence.row(i);
        if (local_cost_map.isInside(grid_map::Position(stage_state_(STATE_SPACE::x), stage_state_(STATE_SPACE::y)))) {
            state_squence_stage_cost_sum_ = local_cost_map.atPosition(
                "collision", grid_map::Position(stage_state_(STATE_SPACE::x), stage_state_(STATE_SPACE::y))
            );
        }

        state_squence_cost_sum_ += collision_weight_ * state_squence_stage_cost_sum_;
    }

    // terminal cost
    const State terminal_state_ = state_sequence.row(prediction_step_size_ - 1);
    double state_sequence_terminal_cost_sum_ = 10.0;
    if (local_cost_map.isInside(grid_map::Position(terminal_state_(STATE_SPACE::x), terminal_state_(STATE_SPACE::y)))) {
        state_sequence_terminal_cost_sum_ = local_cost_map.atPosition(
            "collision", grid_map::Position(terminal_state_(STATE_SPACE::x), terminal_state_(STATE_SPACE::y))
        );
    }

    state_squence_cost_sum_ += collision_weight_ * state_sequence_terminal_cost_sum_;

    return std::make_pair(state_squence_cost_sum_, state_squence_cost_sum_);
}
```

# calculate_sample_cost_batch

sample costs를 계산한다.

$$
S(\mathbf{V}_k) + \lambda \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau}
$$

```cpp
/**
* @brief Calculate the softmax of the given costs.
* @param costs A vector of costs to be normalized.
* @param lambda A scaling parameter for the softmax function.
* @param thread_number The number of threads to use for parallel computation.
* @return A vector containing the softmax values of the input costs.
*/
std::vector<double> SVGMPPI::calculate_sample_costs(
    const double& lambda,
    const double& alpha,
    const std::vector<double> state_costs,
    const ControlSequence initial_consrol_sequence,
    const ControlSequence nominal_control_sequqnce,
    const ControlSequenceBatch control_sequence,
    const ControlCovarianceSequence control_inverse_covariance_sequence
) const
{
    // 모든 sample의 cost들
    std::vector<double> sample_costs = state_costs;

    #pragma omp parallel for num_threads(thread_number_)
    for (size_t i = 0; i < sample_number_; i++) {
        for (size_t j = 0; j < prediction_horizon_ - 1; j++) {
            const double control_cost = \
                lambda * (1 - alpha) \
                * (initial_consrol_sequence.row(j) - nominal_control_sequqnce.row(j)) \
                * control_inverse_covariance_sequence[j] \
                * control_sequence[i].row(j).transpose();
            
            sample_costs[i] += control_cost;
        }
    }

    return sample_costs;
}
```

# softmax

가장 basic한 softmax

$$
\text{softmax}(c_i) = \dfrac{e^{c_i}}{\sum_{i=1}^n e^{c_i}}
$$

값이 작을수록 높은 확률을 부여하고 싶을 때 음수를 활용한다.

$$
\text{softmax}(c_i) = \dfrac{e^{-c_i/\lambda}}{\sum_{i=1}^n e^{-c_i/\lambda}}
$$

수치적 안정성을 위해 우리는 다음과 같은 수식을 사용한다.

$$
c_{\text{min}} = \min [c_1, c_2, \cdots, c_n]
$$

$$
Z = \sum_{i=1}^n \exp {\left(-\dfrac{c_i - c_{\min}}{\lambda}\right)} + 10^{-10}
$$

$$
\text{softmax} (c_i) = \dfrac{\exp {\left(-\dfrac{c_i - c_{\min}}{\lambda}\right)}}{Z}
$$

```cpp
/**
 * @brief Calculate the softmax of the given costs.
 * @param costs A vector of costs to be normalized.
 * @param lambda A scaling parameter for the softmax function.
 * @param thread_number The number of threads to use for parallel computation.
 * @return A vector containing the softmax values of the input costs.
 */
std::vector<double> softmax(
    const std::vector<double>& costs,
    const double& lambda,
    const int thread_number
) const
{
    // minimum element of costs
    const double min_cost_ = *std::min_element(costs.begin(), costs.end());

    // calculate normalizing constant
    double normalizing_constant_ = 1e-10;
    for (const auto& cost : costs) {
        normalizing_constant_ += std::exp(- (cost - min_cost_) / lambda);
    }

    // calculate softmax of costs
    std::vector<double> softmax_costs_(costs.size());
    #pragma omp parallel for num_threads(thread_number)
    for (size_t i = 0; i < costs.size(); i++) {
        softmax_costs_[i] = std::exp(-(costs[i] - min_cost_) / lambda) / normalizing_constant_;
    }

    return softmax_costs_;
}
```