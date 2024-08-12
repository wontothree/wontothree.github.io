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

- MPC 제어 루프 수행 : 스레드 동기화를 위해 mtx_를 잠그고, stop_watch_를 사용해 계산 시간을 측정한다. 장애물 맵과, is_localize_less_mode_에 따라 참조 맵을 설정한다.

```cpp
mtx_.lock();
stop_watch_.lap();
mpc_solver_ptr_->set_obstacle_map(obstacle_map_);
if (!is_localize_less_mode_) {
    mpc_solver_ptr_->set_reference_map(reference_sdf_);
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
  - 스레드 동기화를 위해 mtx_ 뮤텍스를 잠근다. 이는 멀티스레딩 환경에서 데이터 무결성을 보장하기 위한 것이다. 코드 블록 내에서 공유 데이터에 대한 접근이 보호되기 때문이다.
  - 이 블록에서 계산 시간을 측정하기 시작한다.

```cpp
mtx_.lock();

stop_watch_.lap();
```

- MPC 솔버에 데이터 설정
  - 장애물 맵 설정
  - 참조 맵 설정 (비모드) : is_localize_less_mode_가 활성화되어 있지 않은 경우, 참조 SDF(점 유사도 필드) 맵 (reference_sdf_)도 설정합니다. 이 맵은 로봇의 목표 위치 및 경로를 정의합니다.

```cpp
mpc_solver_ptr_->set_obstacle_map(obstacle_map_);
if (!is_localize_less_mode_) {
    mpc_solver_ptr_->set_reference_map(reference_sdf_);
}
```

- 조향 관찰 및 업데이트 : 이전에 발행된 조향 명령(prev_steer_cmd)을 사용하여 현재 로봇의 조향 상태를 업데이트한다. exp(-control_sampling_time_ / steer_1st_delay_)는 조향 명령의 지연 효과를 고려하는 지수 함수이다.

```cpp
const double prev_steer_cmd = control_msg_.drive.steering_angle;
robot_state_.steer = robot_state_.steer + (prev_steer_cmd - robot_state_.steer) * (1 - exp(-control_sampling_time_ / steer_1st_delay_));
```

- MPPI 문제 해결
  - 초기 상태 설정 : 로봇의 현재 상태(x, y, yaw, vel, steer)를 MPC 솔버의 초기 상태로 설정한다.
  - MPC 해결 : mpc_solver_ptr_->solve(initial_state)를 호출하여 MPC 문제를 해결합니다. 이 과정에서 업데이트된 제어 시퀀스 (updated_control_seq)와 충돌 비율 (collision_rate)을 반환받는다.

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
  - 예측 상태 시퀀스 얻기 : mpc_solver_ptr_->get_predictive_seq를 호출하여 최적 상태 시퀀스 (best_state_seq), 상태 비용 (state_cost), 충돌 비용 (collision_cost), 입력 오차 (input_error)를 가져옵니다.

```cpp
mtx_.unlock();

// predict state seq
const auto [best_state_seq, state_cost, collision_cost, input_error] = mpc_solver_ptr_->get_predictive_seq(initial_state, updated_control_seq);
```

- 제어 명령 게시
  - 조향 각도 설정 : updated_control_seq에서 조향 각도를 추출하고 이를 atan2를 사용하여 정상화한다.
  - 속도 설정 : 속도를 설정한다. constant_speed_mode_ 또는 is_localize_less_mode_가 활성화된 경우, 참조 속도 (reference_speed_)를 사용합니다. 그렇지 않으면 현재 위치가 참조 SDF 맵 안에 있는지 확인하고 적절한 속도를 설정합니다. 참조 SDF 맵 밖에 있는 경우, 참조 속도를 사용하고 경고 메시지를 출력합니다.
  - 제어 명령 발행: 설정한 조향 각도와 속도를 포함한 제어 메시지를 pub_ackermann_cmd_를 통해 발행합니다.

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

- 계산 시간 측정 : stop_watch_.lap()을 호출하여 이 블록의 계산 시간을 측정합니다. 이 측정된 시간은 성능 모니터링 및 디버깅에 사용될 수 있습니다.

```cpp
const double calculation_time = stop_watch_.lap();
```

## Reference

[proj-svg_mppi](https://github.com/wontothree/proj-svg_mppi)
