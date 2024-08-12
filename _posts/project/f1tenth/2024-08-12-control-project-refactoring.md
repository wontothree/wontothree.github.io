---
title: "[F1tenth] Control Project Refactoring"
categories: 
  - f1tenth
---
## Packages

```md
├── mppi_contoller                  # Local planner
├── racecar_model                   # 차량 모델 urdf
├── custom_msgs                     # 메시지 타입 정의
├── local_costmap_generator         # 센서 데이터를 기반으로 장애물의 위치를 감지하여 로컬 맵 업데이트
├── reference_waypoint_loader       # global planner의 결과를 받아온다.
├── eval                            # local planner에 대한 평가
├── reference_sdf_enerator          # for Gazebo
```

## Core Pakcage : mppi_controller

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

## Core Function

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

## Core Logic

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

## Solver (mpc_solver_ptr_->solve(initial_state))

'mpc_solver_ptr_->solve(initial_state)' 이 부분에서 어떤 일이 벌어질까?

먼저 yaml 파일에 작성된 mpc_mode (forward_mppi, reverse_mppi, sv_mppi, svg_mppi) 변수에 따라 mpc_solver_ptr은 생성자 함수에서 해당하는 클래스 (ForwardMPPI, ReverseMPPI, SteinVariationalMPC, SVGuidedMPPI)의 참조 변수로 선언된다. 우리는 sv_mppi의 solver 함수를 살펴보자.

이 함수는 Stein Variationa Gradient Descent 기법을 사용하여 제어 시퀀스 샘플을 업데이트하고 샘플의 가중치를 계산하여 최적의 제어 시퀀스를 찾는다. 충돌 비율을 계산하고, 가중치가 유효하지 않으면 재샘플링을 수행한다. 이 과정에서 SVGD를 통해 샘플을 이동시키고, 가중치를 통해 제어 시퀀스를 최적화하는 방법을 사용한다.

[stein_variational_mpc.cpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/src/stein_variational_mpc.cpp)

```cpp
std::pair<ControlSeq, double> SteinVariationalMPC::solve(const State& initial_state) {
    \\ ...
}
```

- 비용 함수 계산 준비 : 주어진 샘플에 대한 비용을 계산하는 람다 함수를 정의한다. 람다 함수는 MPC 문제를 해결하기 위해 사용될 샘플 비용을 계산하는 데 사용된다.

```cpp
// calculate gradient of log posterior (= approx grad log_likelihood estimated by monte carlo method + grad log prior)
// NOTE: currently, prior is approximated as normal distribution
auto func_calc_costs = [&](const PriorSamplesWithCosts& sampler) {
    const auto [costs, _flags] = mpc_base_ptr_->calc_sample_costs(sampler, initial_state);
    return costs;
};
```

- Stein Variational Gradient Descent 반복 : SVGD를 통해 샘플들을 업데이트한다. SVGD는 샘플들이 posterior 분포를 따르도록 샘플을 이동시키는 방법

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

## Reference

[proj-svg_mppi](https://github.com/wontothree/proj-svg_mppi)
