---
title: "[F1tenth] Solver"
categories:
  - f1tenth_
---
# solve

# calculate_sample_weights

생성한 모든 state trajectory의 weight들을 구한다.

최종적으로 구해야 할 식은 다음과 같다.

$$
\mathbf{U}_t^* = \sum_{k=0}^{K-1} w(\mathbf{V}_k) \mathbf{V}_k
$$

여기서 function calculate_state_trajectory_weights은 $w(\mathbf{V}_k)$를 계산한다.

$$
\begin{align*}
    w(\mathbf{V}_k)
    &= \text{softmax} \left( S(\mathbf{V}_k) + \lambda \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right)\\
    &= \eta^{-1} \exp \left( -\dfrac{1}{\lambda} \left[ S(\mathbf{V}_k) + \lambda \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right] \right)\\
    &= \eta^{-1} \exp \left( -\dfrac{1}{\lambda} S(\mathbf{V}_k) - \sum_{\tau = 0}^{T-1} (\hat{\mathbf{u}}_{\tau} - \tilde{\mathbf{u}}_{\tau})^{\top} \Sigma_{\tau}^{-1} \mathbf{v}_{\tau} \right)
\end{align*}
$$

```cpp
/**
* @brief Calculate the softmax of the given costs.
* @param costs A vector of costs to be normalized.
* @param lambda A scaling parameter for the softmax function.
* @param thread_number The number of threads to use for parallel computation.
* @return A vector containing the softmax values of the input costs.
*/
std::vector<double> SVGMPPI::calculate_sample_weights(
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

    return softmax(sample_costs, lambda, thread_number_);
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