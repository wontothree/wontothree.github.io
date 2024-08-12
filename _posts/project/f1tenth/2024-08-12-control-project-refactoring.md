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

## Core Source Code

[proj-svg_mppi/src/mppi_controller/src/mppi_controller_ros.cpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/src/mppi_controller_ros.cpp#L246)

함수 MPPIControllerROS::timer_callback는 ROS 타이머 콜백 함수로 일정 주기로 호출된다. 이 함수는 MPPI 기반 차량 제어를 수행한다.

이 함수는 로봇의 상태와 제어 명령을 주기적으로 업데이트하고, MPPI를 이용하여 제어 명령을 계산하며, 이를 기반으로 로봇의 조향 각도와 속도를 설정한다. 또한 다양한 상태를 시각화하고 디버깅 정보를 게시한다.

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

- 조향 관찰 및 MPC 해결 : 이 부분에서는 이전의 조향 명령을 사용해 로봇의 조향 상태를 업데이트합니다. 그 다음, 초기 상태를 설정하고 MPC를 해결하여 제어 시퀀스를 업데이트합니다.

```cpp
const double prev_steer_cmd = control_msg_.drive.steering_angle;
robot_state_.steer = robot_state_.steer + (prev_steer_cmd - robot_state_.steer) * (1 - exp(-control_sampling_time_ / steer_1st_delay_));
```

- 제어 명령 발행 : MPC로부터 얻은 제어 시퀀스를 기반으로 조향 각도와 속도를 설정합니다. 참조 SDF 맵이 없거나 로봇이 맵 밖에 있을 경우, 속도는 일정 속도로 설정됩니다. 설정된 제어 명령을 발행합니다.

```cpp
const double steering_angle = updated_control_seq(0, CONTROL_SPACE::steer);
// const double accel = updated_control_seq(0, CONTROL_SPACE::accel);

// const double speed = robot_state_.vel + accel * control_sampling_time_;
// speed_cmd_ += accel * control_sampling_time_;
control_msg_.header.stamp = ros::Time::now();
control_msg_.drive.steering_angle = std::atan2(std::sin(steering_angle), std::cos(steering_angle));
double speed_cmd = 0.0;
if (constant_speed_mode_ || is_localize_less_mode_) {
    speed_cmd = reference_speed_;
} else {
    if (reference_sdf_.isInside(grid_map::Position(robot_state_.x, robot_state_.y))) {
        speed_cmd = reference_sdf_.atPosition(speed_field_layer_name_, grid_map::Position(robot_state_.x, robot_state_.y));
    } else {
        speed_cmd = reference_speed_;
        ROS_WARN("[MPPIControllerROS] Robot is out of reference sdf map. Use constant speed mode.");
    }
}
control_msg_.drive.speed = speed_cmd;
pub_ackermann_cmd_.publish(control_msg_);
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

## Reference

[proj-svg_mppi](https://github.com/wontothree/proj-svg_mppi)
