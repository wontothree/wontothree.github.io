---
title: "[ROS2] Library Grid-Map"
categories: 
  - ros2
---
|[Grid Map](https://github.com/ANYbotics/grid_map/tree/ros2?tab=readme-ov-file) Packages|Description|
|---|---|
|grid_map|meta-package for the grid map library|
|**grid_map_core**|algorithms of the grid map library, no ROS dependencies|
|grid_map_ros|main package for ROS dependent projects using the grid map library, interface of grid map and ROS message types|
|grid_map_demos|nodes for demonstration|
|grid_map_filters|ROS Filters package to process grid maps as a sequence of filters|
|grid_map_msgs|ROS message and service definitions|
|grid_map_rviz_plugin|RViz plugin to visualize grid maps as 3d surface plots|
|grid_map_visualization|node written to convert GridMap messages to other ROS message types|
|grid_map_costmap_2d|conversions of grid maps from costmap_2d map types|
|grid_map_cv|conversions of grid maps from and to OpenCV image types|
|grid_map_octomap|conversions of grid maps from OctoMap (OctoMap) maps|
|grid_map_pcl|conversions of grid maps from Point Cloud Library (PCL) polygon meshes and point clouds|

## grid_map_core package 이용 사례

다음 코드는 ROS1 Noetic으로 쓰인 코드이다. [mppi_controller/src/stein_variational_mpc.cpp](https://github.com/wontothree/proj-svg_mppi/blob/main/src/mppi_controller/src/stein_variational_mpc.cpp#L119)

장애물 맵 설정 함수 : 장애물 회피와 관련된 계산을 수행할 수 있게 한다.

```cpp
void SteinVariationalMPC::set_obstacle_map(const grid_map::GridMap& obstacle_map) {
    mpc_base_ptr_->set_obstacle_map(obstacle_map);
}
```

참조 맵 : MPC 알고리즘의 목표나 경로를 정의하는 데 사용된다. 

```cpp
void SteinVariationalMPC::set_reference_map(const grid_map::GridMap& reference_map) {
    mpc_base_ptr_->set_reference_map(reference_map);
}
```

'grid_map::GridMap&' : C++에서 grid_map 라이브러리에서 GridMap 클래스를 참조하는 객체

mpc_base_ptr_ : SteinVariationalMPC라는 클래스 내부에 있는 클래스 MPCBase에 대한 포인터

함수 SteinVariationalMPC::set_obstacle_map는 클래스 MPCBase의 set_obstacle_map 함수를 호출하고, 함수 SteinVariationalMPC::set_reference_map는 클래스 MPCBase의 set_reference_map 함수를 호출한다.

이는 클래스 SteinVariationalMPC가 클래스 MPCBase의 기능을 사용하거나 확장하기 위해 설계된 것임을 나타낸다.

[mppi_controller/src/mpc_base.cpp](https://github.com/wontothree/proj-svg_mppi/blob/main/src/mppi_controller/src/mpc_base.cpp#L55)

```cpp
void MPCBase::set_obstacle_map(const grid_map::GridMap& obstacle_map) { 
    obstacle_map_ = obstacle_map; 
}
```

```cpp
void MPCBase::set_reference_map(const grid_map::GridMap& reference_map) {
    reference_map_ = reference_map; 
}
```

grid_map::GridMap& reference_map 는 2D 격자 형태의 맵을 표현한다.

