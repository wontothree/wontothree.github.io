---
title: "[F1tenth] SVG-MPPI Project Analysis"
categories: 
  - f1tenth
---
# Packages

```md
├── mppi_contoller                  # Local planner
├── racecar_model                   # 차량 모델 urdf
├── custom_msgs                     # 메시지 타입 정의
├── local_costmap_generator         # 센서 데이터를 기반으로 장애물의 위치를 감지하여 로컬 맵 업데이트
├── reference_waypoint_loader       # global planner의 결과를 받아온다.
├── eval                            # local planner에 대한 평가
├── reference_sdf_enerator          # for Gazebo
```

# Core Pakcage : mppi_controller

```md
├── config
    └── mppi_controller.yaml
├── include
    ├── mppi_controller
        ├── StopWatch.hpp
        ├── common.hpp
        ├── forward_mppi.hpp
        ├── mpc_base.hpp
        ├── mpc_template.hpp
        ├── mppi_controller_ros.hpp
        ├── prior_smaples_with_costs.hpp
        ├── reverse_mppi.hpp
        ├── stein_variational_guided_mppi.hpp
        └── stein_variational_mpc.hpp
├── launch
    └── mppi_controller.launch
├── src
│   ├── forward_mppi.cpp                        # solver
│   ├── mpc_base.cpp                            # mpc의 기본적인 기능
│   ├── mppi_controller_node.cpp                # 실행
│   ├── mppi_controller_ros.cpp                 # 코어
│   ├── prior_samples_with_costs.cpp            # 
│   ├── reverse_mppi.cpp                        # solver
│   ├── stein_variational_guided_mppi.cpp       # solver
│   └── stein_variational_mpc.cpp               # solver
├── CMakeLists.txt
├── Readm.md
└── package.xml
```

# Core Function

[proj-svg_mppi/src/mppi_controller/src/mppi_controller_ros.cpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/src/mppi_controller_ros.cpp#L246)

함수 MPPIControllerROS::timer_callback는 ROS 타이머 콜백 함수로 일정 주기로 호출된다. 이 함수는 MPPI 기반 차량 제어를 수행한다.

이 함수는 로봇의 상태와 제어 명령을 주기적으로 업데이트하고, MPPI를 이용하여 제어 명령을 계산하며, 이를 기반으로 로봇의 조향 각도와 속도를 설정한다. 또한 다양한 상태를 시각화하고 디버깅 정보를 게시한다.

```cpp
void MPPIControllerROS::timer_callback([[maybe_unused]] const ros::TimerEvent& te) {
  // ...
}
```

- 상태 체크 : 로봇의 상태와 필요한 맵이 준비되었는지 확인한다.

```cpp
if (is_localize_less_mode_) {
    if (!is_robot_state_ok_ || !is_costmap_ok_) {
        ROS_WARN_THROTTLE(5.0, "[MPPIControllerROS] Not ready: Robot state: %d, Map: %d", is_robot_state_ok_, is_costmap_ok_);
        return;
    }
} else {
    if (!is_robot_state_ok_ || !is_reference_sdf_ok_ || !is_costmap_ok_) {
        ROS_WARN_THROTTLE(5.0, "[MPPIControllerROS] Not ready: Robot state: %d, Reference SDF: %d, Map: %d", is_robot_state_ok_, is_reference_sdf_ok_, is_costmap_ok_);
        return;
    }
}
```

- 제어 신호 대기 : is_activate_ad_가 비활성화 상태이고 시뮬레이션 모드가 아닌 경우, 제어 신호가 활성화될 때까지 대기한다. 이 경우 제어 명령을 제로로 설정하고 이를 pub_ackermann_cmd_를 통해 발행한다.

```cpp
if (!is_activate_ad_ && !is_simulation_) {
    ROS_WARN_THROTTLE(5.0, "[MPPIControllerROS] waiting to activate signal");
    control_msg_.header.stamp = ros::Time::now();
    control_msg_.drive.steering_angle = 0.0;
    control_msg_.drive.speed = 0.0;
    pub_ackermann_cmd_.publish(control_msg_);
    return;
}
```

- 시작 신호 대기 : is_start_가 비활성화된 경우, RViz로부터 시작 신호가 올 때까지 대기한다. 이 경우에도 제어 명령을 제로로 설정하고 발행하며, 디버깅을 위해 예측된 상태를 게시한다.

```cpp
if (!is_start_) {
    ROS_WARN_THROTTLE(5.0, "[MPPIControllerROS] waiting to start signal from rviz");
    control_msg_.header.stamp = ros::Time::now();
    control_msg_.drive.steering_angle = 0.0;
    control_msg_.drive.speed = 0.0;
    pub_ackermann_cmd_.publish(control_msg_);

    // publish predicted state for debug
    const int num_visualized_samples = 100;
    const auto [predict_state_seq_batch, weights] = mpc_solver_ptr_->get_state_seq_candidates(num_visualized_samples);
    publish_candidate_paths(predict_state_seq_batch, weights, pub_candidate_paths_);

    return;
}
```

- 코어

```cpp
mtx_.lock();

stop_watch_.lap();

mpc_solver_ptr_->set_obstacle_map(obstacle_map_);
if (!is_localize_less_mode_) {
    mpc_solver_ptr_->set_reference_map(reference_sdf_);
}

// steer observer
const double prev_steer_cmd = control_msg_.drive.steering_angle;
robot_state_.steer = robot_state_.steer + (prev_steer_cmd - robot_state_.steer) * (1 - exp(-control_sampling_time_ / steer_1st_delay_));

// Solve MPC
mppi::cpu::State initial_state = mppi::cpu::State::Zero();
initial_state[STATE_SPACE::x] = robot_state_.x;
initial_state[STATE_SPACE::y] = robot_state_.y;
initial_state[STATE_SPACE::yaw] = robot_state_.yaw;
initial_state[STATE_SPACE::vel] = robot_state_.vel;
initial_state[STATE_SPACE::steer] = robot_state_.steer;
const auto [updated_control_seq, collision_rate] = mpc_solver_ptr_->solve(initial_state);

mtx_.unlock();

// predict state seq
const auto [best_state_seq, state_cost, collision_cost, input_error] = mpc_solver_ptr_->get_predictive_seq(initial_state, updated_control_seq);

// Publish control command
const double steering_angle = updated_control_seq(0, CONTROL_SPACE::steer);
// const double accel = updated_control_seq(0, CONTROL_SPACE::accel);

// const double speed = robot_state_.vel + accel * control_sampling_time_;
// speed_cmd_ += accel * control_sampling_time_;
control_msg_.header.stamp = ros::Time::now();
control_msg_.drive.steering_angle = std::atan2(std::sin(steering_angle), std::cos(steering_angle));
double speed_cmd = 0.0;
if (constant_speed_mode_ || is_localize_less_mode_) {
    // Note: constant speed is used in localize_less_mode because reference sdf
    // is not available
    speed_cmd = reference_speed_;
} else {
    if (reference_sdf_.isInside(grid_map::Position(robot_state_.x, robot_state_.y))) {
        // speed_cmd = reference_sdf_.atPosition(speed_field_layer_name_,
        // grid_map::Position(ahead_x, ahead_y));
        speed_cmd = reference_sdf_.atPosition(speed_field_layer_name_, grid_map::Position(robot_state_.x, robot_state_.y));
    } else {
        speed_cmd = reference_speed_;
        ROS_WARN(
            "[MPPIControllerROS] Robot is out of reference sdf map. Use "
            "constant speed mode.");
    }
}
control_msg_.drive.speed = speed_cmd;

pub_ackermann_cmd_.publish(control_msg_);

const double calculation_time = stop_watch_.lap();
```

- 디버깅 및 시각화 : 디버깅과 시각화를 위해, 다양한 데이터를 게시합니다. is_visualize_mppi_가 활성화된 경우, 예측된 상태, 제어 분산, 제안된 상태 분포, 최적 경로 및 노미널 경로 등을 게시합니다.

```cpp
if (is_visualize_mppi_) {
    const int num_visualized_samples = 100;
    const auto [predict_state_seq_batch, weights] = mpc_solver_ptr_->get_state_seq_candidates(num_visualized_samples);
    publish_candidate_paths(predict_state_seq_batch, weights, pub_candidate_paths_);

    const auto cov_matrices = mpc_solver_ptr_->get_cov_matrices();
    publish_traj(best_state_seq, "best_path", "red", pub_best_path_);
    publish_control_covs(best_state_seq, cov_matrices, pub_control_covariances_);
    const auto [mean, xycov_mat] = mpc_solver_ptr_->get_proposed_state_distribution();
    publish_state_seq_dists(mean, xycov_mat, pub_proposal_state_distributions_);
    const auto nominal_control_seq = mpc_solver_ptr_->get_control_seq();
    const auto nominal_state_seq = std::get<0>(mpc_solver_ptr_->get_predictive_seq(initial_state, nominal_control_seq));
    publish_path(nominal_state_seq, "nominal_path", "g", pub_nominal_path_);
} else {
    publish_traj(best_state_seq, "best_path", "red", pub_best_path_);
}
```

- 기타 메트릭 및 로그 : 최종적으로, 계산된 비용, 속도, 계산 시간, 충돌 비율 및 MPPI 메트릭스 등의 정보를 게시하여 다른 노드나 디버깅 도구가 이 데이터를 사용할 수 있게 합니다.

```cpp
std_msgs::Float32 cost_msg;
cost_msg.data = static_cast<float>(state_cost + collision_cost);
pub_cost_.publish(cost_msg);

std_msgs::Float32 speed_msg;
speed_msg.data = robot_state_.vel;
pub_speed_.publish(speed_msg);

std_msgs::Float32 calculation_time_msg;
calculation_time_msg.data = static_cast<float>(calculation_time);
pub_calculation_time_.publish(calculation_time_msg);

std_msgs::Float32 collision_rate_msg;
collision_rate_msg.data = static_cast<float>(collision_rate);
pub_collision_rate_.publish(collision_rate_msg);

mppi_metrics_msgs::MPPIMetrics mppi_metrics_msg;
mppi_metrics_msg.header.stamp = ros::Time::now();
mppi_metrics_msg.calculation_time = calculation_time;
mppi_metrics_msg.state_cost = state_cost;
mppi_metrics_msg.collision_cost = collision_cost;
mppi_metrics_msg.input_error = input_error;
pub_mppi_metrics_.publish(mppi_metrics_msg);
```

# Core Logic

MPPI 제어기를 사용하여 로봇의 제어 명령을 계산하고 게시하는 부분

- 뮤텍스 잠금 및 스톱워치 시작
  - 뮤텍스 잠금 : 스레드 동기화를 위해 mtx_ 뮤텍스를 잠근다. 이는 멀티스레딩 환경에서 데이터 무결성을 보장하기 위한 것이다. 코드 블록 내에서 공유 데이터에 대한 접근이 보호되기 때문이다.
  - 스톱워치 시작 : 이 블록에서 계산 시간을 측정하기 시작한다.

```cpp
mtx_.lock();

stop_watch_.lap();
```

- MPC 솔버에 데이터 설정
  - 장애물 맵 설정
  - 참조 맵 설정 (비모드) : is_localize_less_mode_가 활성화되어 있지 않은 경우, 참조 SDF(점 유사도 필드) 맵 (reference_sdf_)도 설정한다. 이 맵은 로봇의 목표 위치 및 경로를 정의한다.

```cpp
mpc_solver_ptr_->set_obstacle_map(obstacle_map_);
if (!is_localize_less_mode_) {
    mpc_solver_ptr_->set_reference_map(reference_sdf_);
}
```

- 조향 관찰 및 업데이트 : 이전에 발행된 조향 명령(prev_steer_cmd)을 사용하여 현재 로봇의 조향 상태를 업데이트한다. 여기서 'exp(-control_sampling_time_ / steer_1st_delay_)'는 조향 명령의 지연 효과를 고려하는 지수 함수이다.

```cpp
const double prev_steer_cmd = control_msg_.drive.steering_angle;
robot_state_.steer = robot_state_.steer + (prev_steer_cmd - robot_state_.steer) * (1 - exp(-control_sampling_time_ / steer_1st_delay_));
```

- MPPI 문제 해결
  - 초기 상태 설정 : 로봇의 현재 상태(x, y, yaw, vel, steer)를 MPC 솔버의 초기 상태로 설정한다.
  - MPC 해결 : mpc_solver_ptr_->solve(initial_state)를 호출하여 MPC 문제를 해결한다. 이 과정에서 업데이트된 제어 시퀀스 (updated_control_seq)와 충돌 비율 (collision_rate)을 반환받는다.

```cpp
mppi::cpu::State initial_state = mppi::cpu::State::Zero();
initial_state[STATE_SPACE::x] = robot_state_.x;
initial_state[STATE_SPACE::y] = robot_state_.y;
initial_state[STATE_SPACE::yaw] = robot_state_.yaw;
initial_state[STATE_SPACE::vel] = robot_state_.vel;
initial_state[STATE_SPACE::steer] = robot_state_.steer;
const auto [updated_control_seq, collision_rate] = mpc_solver_ptr_->solve(initial_state);
```

- 뮤텍스 해제 및 예측 상태 시퀀스 얻기
  - 뮤텍스 해제 : mtx_.unlock()을 호출하여 뮤텍스를 해제한다. 이제 다른 스레드가 이 데이터에 접근할 수 있다.
  - 예측 상태 시퀀스 얻기 : mpc_solver_ptr_->get_predictive_seq를 호출하여 최적 상태 시퀀스 (best_state_seq), 상태 비용 (state_cost), 충돌 비용 (collision_cost), 입력 오차 (input_error)를 가져온다.

```cpp
mtx_.unlock();

// predict state seq
const auto [best_state_seq, state_cost, collision_cost, input_error] = mpc_solver_ptr_->get_predictive_seq(initial_state, updated_control_seq);
```

- 제어 명령 publish
  - 조향 각도 설정 : updated_control_seq에서 조향 각도를 추출하고 이를 atan2를 사용하여 정상화한다.
  - 속도 설정 : 속도를 설정한다. constant_speed_mode_ 또는 is_localize_less_mode_가 활성화된 경우, 참조 속도 (reference_speed_)를 사용합니다. 그렇지 않으면 현재 위치가 참조 SDF 맵 안에 있는지 확인하고 적절한 속도를 설정합니다. 참조 SDF 맵 밖에 있는 경우, 참조 속도를 사용하고 경고 메시지를 출력한다.
  - 제어 명령 발행: 설정한 조향 각도와 속도를 포함한 제어 메시지를 pub_ackermann_cmd_를 통해 publish한다.

```cpp
// Publish control command
const double steering_angle = updated_control_seq(0, CONTROL_SPACE::steer);
// const double accel = updated_control_seq(0, CONTROL_SPACE::accel);

// const double speed = robot_state_.vel + accel * control_sampling_time_;
// speed_cmd_ += accel * control_sampling_time_;
control_msg_.header.stamp = ros::Time::now();
control_msg_.drive.steering_angle = std::atan2(std::sin(steering_angle), std::cos(steering_angle));
double speed_cmd = 0.0;
if (constant_speed_mode_ || is_localize_less_mode_) {
    // Note: constant speed is used in localize_less_mode because reference sdf
    // is not available
    speed_cmd = reference_speed_;
} else {
    if (reference_sdf_.isInside(grid_map::Position(robot_state_.x, robot_state_.y))) {
        // speed_cmd = reference_sdf_.atPosition(speed_field_layer_name_,
        // grid_map::Position(ahead_x, ahead_y));
        speed_cmd = reference_sdf_.atPosition(speed_field_layer_name_, grid_map::Position(robot_state_.x, robot_state_.y));
    } else {
        speed_cmd = reference_speed_;
        ROS_WARN(
            "[MPPIControllerROS] Robot is out of reference sdf map. Use "
            "constant speed mode.");
    }
}
control_msg_.drive.speed = speed_cmd;

pub_ackermann_cmd_.publish(control_msg_);
```

- 계산 시간 측정 : stop_watch_.lap()을 호출하여 이 블록의 계산 시간을 측정합니다. 이 측정된 시간은 성능 모니터링 및 디버깅에 사용된다.

```cpp
const double calculation_time = stop_watch_.lap();
```

# Solver 'SV_MPC'

'mpc_solver_ptr_->solve(initial_state)'에서 어떤 일이 벌어질까?

먼저 yaml 파일에 작성된 mpc_mode (forward_mppi, reverse_mppi, sv_mppi, svg_mppi) 변수에 따라 mpc_solver_ptr은 생성자 함수에서 해당하는 클래스 (ForwardMPPI, ReverseMPPI, SteinVariationalMPC, SVGuidedMPPI)의 참조 변수로 선언된다. 우리는 sv_mppi의 solver 함수를 살펴보자.

[stein_variational_mpc.cpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/src/stein_variational_mpc.cpp)

이 함수는 Stein Variationa Gradient Descent 기법을 사용하여 제어 시퀀스 샘플을 업데이트하고 샘플의 가중치를 계산하여 최적의 제어 시퀀스를 찾는다. 충돌 비율을 계산하고, 가중치가 유효하지 않으면 재샘플링을 수행한다. 이 과정에서 SVGD를 통해 샘플을 이동시키고, 가중치를 통해 제어 시퀀스를 최적화하는 방법을 사용한다.

```cpp
std::pair<ControlSeq, double> SteinVariationalMPC::solve(const State& initial_state) {
    // ...
}
```

- 비용함수 계산 람다 함수 : MPC 문제를 해결하기 위해 사용될 샘플 비용을 계산

```cpp
// calculate gradient of log posterior (= approx grad log_likelihood estimated by monte carlo method + grad log prior)
// NOTE: currently, prior is approximated as normal distribution
auto func_calc_costs = [&](const PriorSamplesWithCosts& sampler) {
    const auto [costs, _flags] = mpc_base_ptr_->calc_sample_costs(sampler, initial_state);
    return costs;
};
```

- **Stein Variational Gradient Descent 반복** : SVGD를 통해 샘플들을 업데이트한다. SVGD는 샘플들이 posterior 분포를 따르도록 샘플을 이동시키는 방법
  - `approx_grad_posterior_batch` 함수 : 주어진 샘플에 대해 log posterior의 기울기를 근사한다.
    - `prior_samples_ptr_` : 샘플을 담고 있는 객체의 포인터
    - `func_calc_costs` 는 비용 계산을 위한 람다 함수
    - `grad_log_posterior` : log posterior의 기울기를 포함하는 `ControlSeqBatch` 객체이다. 이 기울기는 확률 및도 함수의 변화를 측정하는 데 사용된다.
  - `phi_batch` 함수 : SVGD 알고리즘의 핵심 단계로, `grad_log_posterior` 를 사용하여 샘플을 이동시키기 위한 변환을 계산한다.
    - `phis` : 각 샘플에 대해 계산된 이동 벡터를 담고 있는 `ControlSeqBatch`
  - `#pragma omp parallel for num_threads(thread_num_)` : OpenMP를 사용하여 for 루프를 병렬화하여 각 샘플의 업데이트를 여러 스레드에서 동시에 수행할 수 있도록 한다.

```cpp
for (int i = 0; i < num_svgd_iteration_; i++) {
    const ControlSeqBatch grad_log_posterior = approx_grad_posterior_batch(*prior_samples_ptr_, func_calc_costs);

    // Transport samples by stein variational gradient descent
    const ControlSeqBatch phis = phi_batch(*prior_samples_ptr_, grad_log_posterior);
#pragma omp parallel for num_threads(thread_num_)
    for (size_t i = 0; i < prior_samples_ptr_->get_num_samples(); i++) {
        prior_samples_ptr_->noised_control_seq_samples_[i] += svgd_step_size_ * phis[i];
    }
}
```

- 새로운 샘플의 비용 및 충돌 비율 계산 : 업데이트 된 샘플들에 대해 비용과 충돌 비용을 다시 계산한다. 그리고 충돌 비율을 계산한다.

```cpp
// calculate weights for shifting prior distribution
auto [_costs, collision_costs] = mpc_base_ptr_->calc_sample_costs(*prior_samples_ptr_, initial_state);
prior_samples_ptr_->costs_ = std::forward<std::vector<double>>(_costs);
const std::vector<double> weights = calc_weights(*prior_samples_ptr_);

const int collision_num = std::count_if(collision_costs.begin(), collision_costs.end(), [](const double& cost) { return cost > 0.0; });
const double collision_rate = static_cast<double>(collision_num) / static_cast<double>(prior_samples_ptr_->get_num_samples());
```

- 유효성 검사 및 제어 시퀀스 업데이트 : 계산된 가중치에 NaN 또는 무한값이 있는지 확인한다. 가중치가 유효하다면, 이를 이용해 최적의 제어 시퀀스를 업데이트한다. is_max_posterior_estimation_ 플래그에 따라 최대 posterior 추정값을 선택하거나, 샘플의 가중 평균을 사용한다. 그리고 업데이트된 샘플들로부터 새로운 평균 및 공분산을 계산하여 prior distribution을 갱신한다.

```cpp
// NAN and inf check for weights
auto has_nan_or_inf = [](const double& x) { return std::isnan(x) || std::isinf(x); };
const bool is_valid = std::none_of(weights.begin(), weights.end(), has_nan_or_inf);

if (is_valid) {
    weights_ = weights;  // for visualization

    ControlSeq updated_control_seq = prior_samples_ptr_->get_zero_control_seq();
    if (is_max_posterior_estimation_) {
        // max posterior
        const int max_idx = std::distance(weights.begin(), std::max_element(weights.begin(), weights.end()));
        updated_control_seq = prior_samples_ptr_->noised_control_seq_samples_.at(max_idx);
    } else {
        // Get control input sequence by weighted average of samples
        for (size_t i = 0; i < prior_samples_ptr_->get_num_samples(); i++) {
            updated_control_seq += weights[i] * prior_samples_ptr_->noised_control_seq_samples_.at(i);
        }
    }

    // shift particles
    // This cause unstable behavior
    // #pragma omp parallel for num_threads(thread_num_)
    //                 for (size_t i = 0; i < prior_samples_ptr_->get_num_samples(); i++)
    //                 {
    //                     // shift control sequence by 1 step
    //                     ControlSeq tmp = prior_samples_ptr_->get_zero_control_seq();
    //                     for (size_t j = 0; j < prediction_step_size_ - 2; j++)
    //                     {
    //                         tmp.row(j) = prior_samples_ptr_->noised_control_seq_samples_.at(i).row(j + 1);
    //                     }
    //                     tmp.row(prediction_step_size_ - 1) = updated_control_seq.row(prediction_step_size_ - 2);
    //                     prior_samples_ptr_->noised_control_seq_samples_.at(i) = tmp;
    //                 }

    // update prior distribution
    const auto [new_mean, new_cov] = weighted_mean_and_sigma(*prior_samples_ptr_, weights);
    prior_samples_ptr_->set_control_seq_mean(new_mean);
    prior_samples_ptr_->set_control_seq_cov_matrices(new_cov);

    prev_control_seq_ = updated_control_seq;
    return std::make_pair(updated_control_seq, collision_rate);
} else {
    // std::cout << "NAN or INF is detected in control sequence. Resampling..." << std::endl;
    prior_samples_ptr_->random_sampling(prior_samples_ptr_->get_zero_control_seq(),
                                        prior_samples_ptr_->get_constant_control_seq_cov_matrices({steer_cov_}));

    return std::make_pair(prev_control_seq_, collision_rate);
}
```

# Stein Variational Gradient Descent

SVGD가 반복되는 동안 벌어지는 디테일한 과정에 대해 알아보자.

```cpp
for (int i = 0; i < num_svgd_iteration_; i++) {
    const ControlSeqBatch grad_log_posterior = approx_grad_posterior_batch(*prior_samples_ptr_, func_calc_costs);

    // Transport samples by stein variational gradient descent
    const ControlSeqBatch phis = phi_batch(*prior_samples_ptr_, grad_log_posterior);
#pragma omp parallel for num_threads(thread_num_)
    for (size_t i = 0; i < prior_samples_ptr_->get_num_samples(); i++) {
        prior_samples_ptr_->noised_control_seq_samples_[i] += svgd_step_size_ * phis[i];
    }
}
```

## Type 'ControlSeqBatch'

```cpp
namespace cpu {
    // ...
    using ControlSeqBatch = std::vector<Eigen::MatrixXd, Eigen::aligned_allocator<Eigen::MatrixXd>>;
}
```

- std::vector<Eigen::MatrixXd>
  - std::vector : C++ 표준 라이브러리에서 제공하는 동적 배열로, 크기를 동적으로 조절할 수 있는 연속적인 메모리 블럭
  - Eigen::MatrixXd : Eigen 라이브러리에서 제공하는 동적 크기의 행렬 클래스. 이 클래스는 실수를 요소로 갖는 행렬을 표현한다.
- Eigen::aligned_allocator<Eigen::Matrixd>
  - aligned_allocator : 메모리 정렬을 보장하는 할당자를 제공
  - Eigen 라이브러리는 고성능을 위해 메모리 정렬을 중요시한다. 특히 SIMD 명령어를 사용하는 경우 정렬된 메모리를 필요로 하므로 aligned_allocator를 사용하여 Eigen::MatrixXd 객체들이 올바르게 정렬되도록 보장한다.

ControlSeqBatch : 여러 개의 Eigen::MatrixXd 행렬을 저장할 수 있는 동적 배열. Eigen 라이브러리의 성능 최적화를 위해 정렬된 메모리를 사용한다. 이 타입은 최적화된 행렬 연산을 수행하거나 다양한 제어 시퀀스를 효율적으로 관리하기 위해 사용된다. 이는 SteinVariationalMPC::solve 함수와 같이 복잡한 계산을 필요로 하는 상황에서 유용하게 사용된다.

이 정의를 통해 ControlSeqBatch를 사용하는 코드에서 여러 행렬을 효율적으로 처리할 수 있다. MPC 알고리즘에서 굉장히 중요하다.

## Function 'approx_grad_posterior_batch'

SVGD 알고리즘의 핵심 부분 중 하나로, 제어 시퀀스에 대한 로그 사후 확률의 기울기를 근사한다. 이 함수는 샘플들의 로그 사후 확률의 기울기를 계산하여, 각 샘플에 대해 사전 정보와 관측 정보에 기반한 기울기를 조합한다.

- 샘플링 기반 기법을 사용하여 최적의 제어 시퀀스를 찾기 위해 각 샘플에 대한 기울기를 계산한다.
- 이를 통해 행동을 최적화하거나 제어하려는 모델의 적합성을 개선한다.
- SVGD 알고리즘을 통해 제어 샘플들이 점점 더 우도 높은 상태로 수렴하도록 기울기 정보를 사용하여 샘플을 이동시킨다.
- 이 함수는 SteinVariationalMPC의 전체 최적화 과정에서 매우 중요한 역할을 하며, 병렬 처리로 성능을 극대화하도록 설계되었다.

```cpp
ControlSeqBatch SteinVariationalMPC::approx_grad_posterior_batch(
    const PriorSamplesWithCosts& samples,
    const std::function<std::vector<double>(const PriorSamplesWithCosts&)>& calc_costs) const {
    // ...
}
```

- 초기화
  - samples.get_zero_control_seq_batch() 는 제어 시퀀스의 모든 요소를 0으로 설정한 벡터이다.

```cpp
ControlSeqBatch grad_log_likelihoods = samples.get_zero_control_seq_batch();
```

- mean 계산 : 현재 샘플들의 평균 제어 시퀀스를 계산한다. 이는 나중에 기울기를 계산할 때 참조된다.

```cpp
const ControlSeq mean = samples.get_mean();
```

- 병렬 처리 : OpenMP 지시어 - #pragma omp parallel for - 는 for 루프를 병렬로 실행하여 성능을 향상시킨다.

```cpp
#pragma omp parallel for num_threads(thread_num_)
```

- 루프에서 샘플별 기울기 계산
  - 루그 우도 기울기 계산 : approx_grad_log_likelihood 함수는 각 샘플에 대해 로그 우도의 기울기를 계산한다. 이 함수는 주어진 평균과 샘플, 그리고 역 공분산 행렬을 사용한다.
  - 로그 사전 기울기 계산 : grad_log_nomal_dist 함수는 주어진 샘플이 가우시안 분포를 따를 때의 로그 사전 기울기를 계산한다. 샘플의 평균과 역 공분산 행렬이 필요하다.
  - 로그 사후 기울기 계산 : grad_log_likelihood와 grad_log_prior의 합을 grad_log_likelihoods[i]에 저장한다.

```cpp
for (size_t i = 0; i < samples.get_num_samples(); i++) {
    const ControlSeq grad_log_likelihood = approx_grad_log_likelihood(
        mean, samples.noised_control_seq_samples_[i], samples.get_inv_cov_matrices(), calc_costs, grad_sampler_ptrs_.at(i).get());
    const ControlSeq grad_log_prior =
        grad_log_normal_dist(samples.noised_control_seq_samples_[i], samples.get_mean(), samples.get_inv_cov_matrices());
    grad_log_likelihoods[i] = grad_log_likelihood + grad_log_prior;
}
```

- 기울기 벡터 반환 : grad_log_likelihoods를 반환하여 SVGD에서 사용될 각 샘플의 로그 사후 기울기를 제공한다.

```cpp
return grad_log_likelihoods;
```

## Function 'phi_batch'

SVGD 알고리즘을 사용하여 각 제어 시퀀스 샘플에 대한 변환(phi)을 계산하여 샘플을 업데이트하여 사후 확률을 최대화하는 방향으로 이동시키고, 이 과정에서 커널 함수를 사용하여 업데이트의 부드러움과 안정성을 보장한다.

커널 함수를 사용하여 그래디언트를 스무딩하며, 샘플 간의 거리를 기반으로 한 스케일링을 통해 안정성을 제공한다. 이렇게 계산된 phi_batch는 이후 샘플 업데이트에 사용된다.

```cpp
ControlSeqBatch SteinVariationalMPC::phi_batch(const PriorSamplesWithCosts& samples, const ControlSeqBatch& grad_posterior_batch) const {
  // ...
}
```

- 커널 스케일링을 위한 중앙값 계산
  - 각 샘플의 제어 시퀀스에 대한 제곱 노름을 계산하여 dists 벡터에 저장한다.
  - dists 벡터를 정렬하고, 중앙값을 선택하여 h로 설정한다. 이 h는 커널 함수의 스케일링을 결정하는 데 사용된다.
  - h가 너무 작아지지 않도록 최소값을 1e-5로 설정한다.

```cpp
// calculate median of samples
// This makes the sum of kernel values close to 1
std::vector<double> dists(samples.get_num_samples(), 0.0);
for (size_t i = 0; i < samples.get_num_samples(); i++) {
    dists[i] = (samples.noised_control_seq_samples_[i]).squaredNorm();
}
std::sort(dists.begin(), dists.end());
double h = dists[static_cast<size_t>(samples.get_num_samples() / 2)] / std::log(static_cast<double>(samples.get_num_samples()));
h = std::max(h, 1e-5);
```

- phi 배치 계산
  - phi_batch : 초기화 시 모든 제어 시퀀스가 0인 상태로 설정된다.
  - OpenMP를 사용하여 병렬로 샘플을 처리한다.
  - 각 샘플 i에 대해 다른 모든 샘플 j에 대해 RBF 커널 값을 계산한다. phi_batch[i]에 커널 값과 사후 확률의 그래디언트를 곱한 값을 더하고, RBF 커널의 그래디언트도 추가한다. 모든 샘플의 개수로 phi_batch[i]를 나눔으로써 평균을 구한다.

```cpp
// calculate phi batch
ControlSeqBatch phi_batch = samples.get_zero_control_seq_batch();
#pragma omp parallel for num_threads(thread_num_)
for (size_t i = 0; i < samples.get_num_samples(); i++) {
    for (size_t j = 0; j < samples.get_num_samples(); j++) {
        const double kernel = RBF_kernel(samples.noised_control_seq_samples_[j], samples.noised_control_seq_samples_[i], h);

        phi_batch[i] += kernel * grad_posterior_batch[j];
        phi_batch[i] += grad_RBF_kernel(samples.noised_control_seq_samples_[j], samples.noised_control_seq_samples_[i], h);
    }

    phi_batch[i] /= static_cast<double>(samples.get_num_samples());
}
```

- 각 제어 시퀀스 샘플에 대한 변환(phi)를 반환한다.

```cpp
return phi_batch;
```

# Solver 'SVG_MPPI'

[stein_variational_guided_mppi.cpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/src/stein_variational_guided_mppi.cpp)

- Input : 'const State& initial_state'
- Output : 'std::make_pair(updated_control_seq, collision_rate)'

시스템의 초기 상태를 입력받아 최적화된 제어 입력 시퀀스 - 시간에 따라 취해야 하는 일련의 행동이나 명령 - 과 충돌 비율을 출력한다.

```cpp
std::pair<ControlSeq, double> SVGuidedMPPI::solve(const State& initial_state) {
  // ...
}
```

- 초기화 및 비용 계산 함수 정의
  - 벡터 초기화
    - costs_history : 각 반복에서 계산된 비용을 저장한다.
    - control_seq_history : 각 반복에서의 제어 시퀀스를 저장한다.
  - 비용 계산 함수 정의

```cpp
// Transport guide particles by SVGD
std::vector<double> costs_history;
std::vector<ControlSeq> control_seq_history;
auto func_calc_costs = [&](const PriorSamplesWithCosts& sampler) { return mpc_base_ptr_->calc_sample_costs(sampler, initial_state).first; };
```

- SVGD를 이용한 가이드 샘플 이동
  - num_svgd_iteration_ : 샘플 이동 반복 수
  - approx_grad_posterior_batch 함수 : 각 샘플에 대한 로그 후방 확률의 그래디언트를 계산
  - 각 샘플은 svgd_step_size_ 와 계산된 그래디언트를 이용하여 업데이트된다.
  - 한편 각 반복에서 계산된 비용을 costs_history에 추가하고 현재의 제어 시퀀스를 control_seq_history에 추가한다.

```cpp
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
```

- 최적의 파티클 선택 : 가이드 샘플들의 최종 비용을 계산하고, 가장 낮은 비용을 가진 제어 시퀀스를 선택하여 best_particle로 설정한다.

```cpp
const auto guide_costs = mpc_base_ptr_->calc_sample_costs(*guide_samples_ptr_, initial_state).first;
const size_t min_idx = std::distance(guide_costs.begin(), std::min_element(guide_costs.begin(), guide_costs.end()));
const ControlSeq best_particle = guide_samples_ptr_->noised_control_seq_samples_[min_idx];
```

- 적응형 공분산 행렬 계산
  - 기본 공분산 행렬 설정 : steer_cov_을 기반으로 하는 고정 공분산 행렬을 초기화한다.
  - 적응형 공분산 행렬 설정
    - is_covariance_adaptation_가 true인 경우, costs_history를 사용하여 스프트맥스 비용을 계산한다.
    - gaussian_fitting 함수를 통해 적응형 공분산 행렬을 업데이트하며, 이는 각 스텝의 제어 샘플을 기반으로 한다.

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

- 무작위 샘플링 및 비용 계산
  - 이전 제어 시퀀스와 계산된 공분산 행렬을 사용하여 새로운 샘플링을 수행한다.
  - 새로운 샘플에 대한 비용과 충돌 비용을 계산하고, 비용을 prior_samples_ptr에 저장한다.

```cpp
// random sampling from prior distribution
prior_samples_ptr_->random_sampling(prev_control_seq_, covs);

// Rollout samples and calculate costs
auto [_costs, collision_costs] = mpc_base_ptr_->calc_sample_costs(*prior_samples_ptr_, initial_state);
prior_samples_ptr_->costs_ = std::forward<std::vector<double>>(_costs);
```

- 가중치 계산 및 제어 시퀀스 업데이트
  - 가중치 계산
    - nominal_control_seq_ : 가장 적합한 제어 시퀀스(best_particle)로 설정하거나 기본값으로 설정한다.
    - calc_weights 함수를 통해 각 샘플의 가중치를 계산하고, 이 가중치를 weights_에 저장한다.
  - 제어 시퀀스 업데이트
    - 샘플의 가중 평균을 계산하여 최종 제어 시퀀스를 업데이트 한다.

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

- 충돌 비율 계산 및 반환
  - 충돌 비용을 기반으로 충돌 비율을 계산한다.
  - 최적화된 제어 시퀀스와 충돌 비율을 반환한다.

```cpp
const int collision_num = std::count_if(collision_costs.begin(), collision_costs.end(), [](const double& cost) { return cost > 0.0; });
const double collision_rate = static_cast<double>(collision_num) / static_cast<double>(prior_samples_ptr_->get_num_samples());

// update previous control sequence for next time step
prev_control_seq_ = updated_control_seq;

return std::make_pair(updated_control_seq, collision_rate);
```

# Reference

[[Github] proj-svg_mppi](https://github.com/wontothree/proj-svg_mppi)

# svtmppi-solver

# 입출력

```cpp
std::pair<ControlSeq, double> SVGuidedMPPI::solve(const State& initial_state) {
  // ...
  return std::make_pair(updated_control_seq, collision_rate);
}
```

# Variables

|Data Type|Variable Name|Description|
|---|---|---|
|std::vector<double>|costs_history|각 반복에서 계산된 비용을 저장하는 벡터입니다. 각 스텝의 비용 값을 저장하여 후에 분석이나 가우시안 피팅 등에 사용될 수 있습니다.|
|std::vector<ControlSeq>|control_seq_history|각 반복에서의 제어 시퀀스를 저장하는 벡터입니다. 각 반복마다의 제어 이력(컨트롤 시퀀스)을 기록합니다. **costs_history**와 **control_seq_history**는 주로 이후에 가우시안 피팅을 통해 적응형 공분산(adaptive covariance)을 계산하거나, 최적의 제어 시퀀스를 선택하기 위한 데이터로 사용됩니다.|
|const ControlSeqBatch|grad_log_posterior|각 샘플에 대한 로그 후방 확률의 그래디언트를 저장하는 변수입니다. Stein Variational Gradient Descent(SVGD)에서 사용됩니다. 각 샘플에 대해 계산된 로그 후방 확률의 그래디언트입니다. 이 그래디언트는 Stein Variational Gradient Descent(SVGD)를 통해 샘플을 점진적으로 업데이트하는 데 사용됩니다.|
|const std::vector<double>|costs|현재 반복에서 계산된 비용을 저장하는 벡터입니다. 이 값은 mpc_base_ptr_->calc_sample_costs 함수에서 계산됩니다.|
||||
|const auto|guide_costs|최종 가이드 샘플에 대해 계산된 비용 벡터입니다. 이 값은 각 샘플에 대한 총 비용을 나타냅니다.|
|const size_t|min_idx|최종 guide_costs 벡터에서 가장 작은 비용을 가진 요소의 인덱스입니다.|
|const ControlSeq|best_particle|가장 작은 비용을 가진 가이드 샘플입니다. 이 샘플이 최종 선택된 최적의 제어 시퀀스가 됩니다. **min_idx**는 비용이 가장 낮은 샘플을 찾기 위해 사용되며, **best_particle**은 이 샘플이 선택된 최적의 제어 시퀀스입니다.|
||||
|ControlSeqCovMatrices|covs|제어 시퀀스의 공분산 행렬을 저장하는 변수. 이 행렬은 제어 입력의 불확실성을 나타내며, 각 시점에서 제어 입력이 얼마나 변동될 수 있는지를 나타낸다. 이 변수는 예측 단계에서 사용할 공분산 행렬을 담고 있으며, 초기에는 고정된 공분산 값으로 설정된다. 이후 코드에서 적응형 공분산 계산이 활성화되면, 이 값이 업데이트된다.|
|const std::vector<double>|softmax_costs|제어 샘플의 중요도를 나타내는 가중치를 저장하는 벡터. 소프트맥스 함수에 의해 계산된 비용의 가중치를 저장하는 벡터. 이전의 비용(costs_history)을 기반으로 각 샘플의 상태적인 중요도를 계산한 것이다.|
|std::vector<double>|steer_samples(control_seq_history.size())|각 샘플의 스티어링 값을 저장하는 벡터. 특정 시점에서 각 제어 샘플의 스티어링(조향) 값을 저장하는 벡터이다. 벡터의 크기는 control_seq_history.size()로 이는 저장된 제어 시퀀스의 수와 동일하다. 이 벡터는 각 샘플의 스티어링 입력 값을 모아서 공분산 계산의 입력으로 사용된다.|
|std::vector<double>|q_star(softmax_costs.size())|소프트맥스 가중치를 저장하는 벡터. 소프트맥스 가중치 softmax_costs 를 저장하는 벡터. steer_samples와 동일한 크기를 갖는다. 이 벡터는 steer_samples와 함쎄 공분산 계산의 입력으로 사용된다.|
|const double|sigma|가우시안 피팅을 통해 계산된 공분산 값. 가우시안 피팅을 통해 계산된 공분산 값이다. 이는 스티어링 샘플과 가중치를 기반으로 최적의 공분산을 찾는 과정에서 도출된 결과이다. 후속 계산에서 클램핑을 통해 적절한 범위 내로 제한된다.|
|const double|sigma_clamped|공분산 값을 제한 범위 내로 클램핑한 값. sigma 값을 특정 범위 (min_steer_cov_, max_steer_cov_) 내에서 제한한 값. 이 값은 최종적으로 covs 행렬에 저장되넝 제어 시퀀스의 공분산 행렬로 사용된다. 이는 제어 입력의 불확실성을 나타내며, 지나치게 크거나 작은 값을 방지하기 위해 클램핑된 값이다.|
||||
||_costs|샘플들의 비용을 나타내는 벡터. 각 샘플이 얼마나 좋은지 평가한다. 이후의 가중치 계산에서 중요한 역할을 한다.|
||collision_costs|샘플들의 충돌 관련 비용을 나타내는 벡터. 각 샘플이 충돌과 관련된 비용을 얼마나 가지는지 평가한다. 충돌이 발생한 샘플들은 높은 비용을 가지며, 이는 제어 시퀀스의 안전성을 평가하는 데 사용된다.|
||nominal_control_seq_|참조용 제어 시퀀스. 최적화 과정에서 참조 시퀀스로 사용된다. 가중치를 계산할 때 참조로 사용된다. is_use_nominal_solution_ 플래그에 따라 이전에 계산된 최적 제어 시퀀스 best_particl을 사용할지 아니면 제로 시퀀스를 사용할지 결정된다.|
||weights|각 샘플에 대한 가중치를 나타내는 벡터. 비용과 참조 시퀀스를 기반으로 각 샘플의 중요도롤 결정한다. 이 가중치는 샘플들을 통합하여 최종 제어 시퀀스를 생성하는 데 사용된다.|
||weights_|weights의 복사본으로 시각화 목적으로 사용된다.|
||updated_control_seq|가중 평균을 통해 계산된 새로운 제어 시퀀스. 모든 샘플의 가중 평균을 계산하여 최종 제어 입력을 결정한다. 이 제어 시퀀스는 이후 단계에서 사용할 최적의 입력이 된다.|
||collision_num|충돌이 발생한 샘플의 수. 제어 시퀀스의 안전성을 평가하기 위해 사용된다. 충돌이 많은 경우, 해당 제어 시퀀스는 안전하지 않은 것으로 간주된다.|
||collision_rate|충돌이 발생한 샘플의 비율. 전체 샘플 중 충돌이 발생한 샘플의 비율을 계산하여 제어 시퀀스의 안전성을 정량적으로 평가한다.|

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

# 

# 궁금한 점

- 적응형 공분산 행렬이 무엇이고, 왜 계산할까?
- 로그 사후 확률

# Memo

Adaptive Covariance : 모델의 정확성을 향상시키고, 불확실성을 반영하며, 탐색 효율성을 높이기 위해서이다.

모델의 정확성 향상

- 제어 시스템에서 공분산 행렬은 제어 입력의 불확실성을 나타낸다. 만약 공분산이 고정되어 있다면, 다양한 상황에서 모델이 동일한 정도의 불확실성을 가정하게 된다. 하지만 실제로는 상황에 따라 불확실성이 달라질 수 있다.
- 적응형 공분산을 사용하면, 현재 상황에 맞게 공분산을 조정하여 모델의 정확성을 높일 수 있다. 예를 들어 상황에 따라 노이즈가 더 크거나 작을 수 있으므로 이를 반영하는 공분산을 사용하면 예측의 신뢰성을 높일 수 있다.

불확실성의 반영

- 제어 입력(조향, 가속 등)에 대한 불확실성은 시점마다 다를 수 있다. 특정 상황에서는 제어 입력의 결과가 더 예측 가능하거나 더 불확실할 수 있다.
- 적응형 공분산을 통해 이러한 불확실성을 동적으로 반영하면, 모델이 다양한 상황에서 더 적절한 예측을 할 수 있다. 이는 특히 복잡한 환경이나 비선형 시스템에서 중요하다.

# local planner

## 사용 기술

Stein Variational Guided MPPI

## State

$$
\begin{bmatrix}
  x \\
  y \\
  \text{yaw} \\
  \text{vel} \\
  \text{steer} \\
\end{bmatrix}
$$

## [Solver] SVGD

- Input : 'const State& initial_state'
- Output : 'std::make_pair(prev_control_seq_, collision_rate)'

다음과 같이 구성된 최적화 프로세스를 통해 주어진 초기 상태로부터 시스템이 최적의 행동을 할 수 있도록 제어 시퀀스를 제공하며, 충돌 위험을 평가하여 안전한 동작을 보장한다.

1. 초기화 : 초기 상태와 샘플을 기반으로 비용 계산을 시작한다.
2. SVGD 반복 : 샘플에 대한 로그 후방 확률의 그래디언트를 사용하여 제어 시퀀스를 개선한다.
3. 비용 및 최적 제어 시퀀스 결정 : 각 샘플에 대한 비용을 계산하고, 가장 낮은 비용의 샘플을 선택하여 best_particle로 저장한다.
4. 공분산 계산 및 샘플링 : 적응형 공분산을 계산하여 새로운 제어 입력을 샘플링한다.
5. 가중 평균 계산 : 가중 평균을 사용하여 최적화된 제어 시퀀스(updated_control_seq)를 계산한다.
6. 충돌 비율 계산 : 샘플 중 충돌이 발생한 비율을 계산하여 collision_rate로 반환한다.

### grad_log_posterior

로그 후방 분포의 기울기를 나타내는 변수이다.

- 후방 분포 (Posterior Distribution) : 주어진 데이터와 사전 정보를 바탕으로 추정하는 확률 분포. 베이즈 정리에 따라 데이터가 주어진 후의 사후 확률 분포를 계산한다.
- 로그 후방 분포 (Log Posterior) : 후방 분포의 확률 및도 함수를 로그 함수에 의해 변환한 것. 이는 수치적으로 안정성을 높이고, 계산 효율성을 개선하기 위해 사용된다. 로그를 취함으로써 곱셈 연산이 덧셈 연산으로 변환되기 때문이다.
- 기울기 (Gradient) : 함수의 기울기를 나타내는 벡터. 함수의 값이 가장 빠르게 증가하는 방향을 나타낸다. 최적화 문제에서는 함수의 기울기를 사용하여 함수의 최솟값 또는 최댓값을 찾는다.
- 로그 후방 분포의 기울기 : 해당 분포의 매개변수들에 대한 함수의 변화율. 이는 후방 분포의 형태를 조정하기 위해 필요하다.
- SVGD : 샘플 집합을 후방 분포의 기울기를 사용하여 업데이트하는 최적화 기법. SVGD는 주어진 샘플을 후방 분포에 맞게 조정하는 데 사용된다.
- grad_log_posterior : 다음 단계의 업데이트를 위해 각 샘플의 기울기를 저장한다.

샘플은 뭘 말하는 걸까?

- 샘플 : 주어진 문제에 대해 가능한 여러 제어 시퀀스 또는 상태 시퀀스를 생성하여 사용된다. 이러한 샘플들은 주로 후방 분포를 기반으로 생성되며, 이 분포는 문제의 목적 함수와 제약 조건을 반영한다.
- 샘플들은 최적화 과정에서 여러 후보 솔루션을 평가하고 비교하는 데 사요된다 샘플은 문제의 목적 함수 또는 비용 함수에 대해 평가되어, 최적의 제어 시퀀스나 솔루션을  찾는 데 도움을 준다.
- SVGD에서는 이러한 샘플들을 업데이트하여 후방 분포에 더 잘 맞도록 조절한다. 즉, 샘플들이 더 나은 예측을 제공하도록 변형된다.

샘플은 문제 해결을 위한 데이터 포인트를 의미한다. SVGuidedMPPI와 같은 알고리즘은 이 샘플들을 생성하고 업데이트하여 최적화 문제를 해결하거나 모델을 개선한다. 샘플들은 모델의 성능을 향상시키기 위한 핵심 요소이며, 최적화 과정에서 중요한 역할을 한다.

하나의 샘플은 [x, y, yaw, vel, steer]이다.

여러 샘플이 모여 시스템의 상태 공간을 탐색하고 최적의 제어 시퀀스를 찾는 데 사용된다.

샘플의 역할

- 모델의 입력 : 샘플은 시스템의 현재 상태나 제어 입력을 나타내며, 모델을 업데이트하거나 예측을 수행하는 데 사용된다.
- 최적화 문제의 후보 솔루션 : 샘플들은 최적화 과정에서 후보 솔루션으로 사용된다. 최적의 제어 시퀀스를 찾기 위한 평가가 이루어진다.
- 데이터 생성 및 수집 : 샘플들은 실험 또는 시뮬레이션에서 생성되며, 시스템의 동작을 분석하거나 평가하는 데 활용된다.

모델을 이용할까? solver 단에서 모델을 이용할까?

solver가 한 번 풀릴 때 MPPI가 출력하는 것은 하나의 상태 벡터일까?

[u1, u2, u3, ..., uN]는 N개의 시간 단계에 대한 제어 입력을 포함된다.