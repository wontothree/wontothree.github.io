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

# calculate_state_cost_batch

$[S(\mathbf{V}_1), S(\mathbf{V}_2), \dots, S(\mathbf{V}_{T-1})]$를 계산한다.

```cpp

std::pair<std::vector<double>, std::vector<double>> SVGMPPI::calculate_state_cost_batch(
    const State& initial_state,
    const grid_map::GridMap& local_cost_map,
    StateSequenceBatch* state_sequence_batch,
    ControlSequenceBatch& control_sequence_batch
) const
{
    std::vector<double> total_cost_batch_(sample_number_);
    std::vector<double> collision_cost_batch_(sample_number_);

    #pragma omp parallel for num_threads(thread_number_)
    for (size_t i = 0; i < sample_number_; i++) {
        // predict state sequence
        state_sequence_batch->at(i) = predict_state_sequence(
            initial_state,
            control_sequence_batch[i]
        );

        // calculate state sequence cost
        const auto [total_cost_, collision_cost_] = calculate_state_sequence_cost(
            state_sequence_batch->at(i),
            local_cost_map
        );
        total_cost_batch_.at(i) = total_cost_;
        collision_cost_batch_.at(i) = collision_cost_;
    }

    return std::make_pair(total_cost_batch_, collision_cost_batch_);
}
```

## predict_state_sequence

Sample의 $k$th state sequence를 생성한다.

$$
\mathbf{x}_0, \mathbf{x}_1, \dots, \mathbf{x}_{T - 1}
$$

### predict_constant_speed

## calculate_state_sequence_cost

$k$th state sequence cost $S(\mathbf{V}_k)$을 계산한다.

$$
S(\mathbf{V}_k) = \phi(\mathbf{x}_T) + \sum_{\tau = 0}^{T-1} c(\mathbf{x}_{\tau})
$$

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

# approximate_gradient_log_posterior_batch

```cpp
ControlSequenceBatch SVGMPPI::approximate_gradient_log_posterior_batch(
    const State& initial_state,
    const ControlSequence control_sequence
)
{
    ControlSequenceBatch gradient_log_posterior_batch_ = std::vector<Eigen::MatrixXd, Eigen::aligned_allocator<Eigen::MatrixXd>>(
        sample_number_, Eigen::MatrixXd::Zero(prediction_step_size_, STATE_SPACE::dim)
    );

    for (size_t i = 0; i < sample_number_; i++) {
        const ControlSequence gradient_log_likelihood_; // ...

        gradient_log_posterior_batch_[i] = gradient_log_likelihood_;
    }

    return gradient_log_posterior_batch_;
}
```

## approximate_gradient_log_likelihood

# random_sampling

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