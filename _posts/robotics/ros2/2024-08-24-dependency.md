---
title: "[ROS2] Dependency"
categories: 
  - ros2
---
ROS2에서 Library를 사용할 때 어떤 것들을 해야 할까?

https://github.com/ros-perception/laser_geometry/tree/foxy

laser_geometry 패키지 설치

```bash
sudo apt-get update
sudo apt-get install ros-foxy-laser-geometry
```

package.xml

```xml
<depend>laser_geometry</depend>
```

CMakeLists.txt

```cpp
find_package(laser_geometry REQUIRED)

add_executable(local_costmap_generator_node src/local_costmap_generator.cpp src/local_costmap_generator_node.cpp)
ament_target_dependencies(local_costmap_generator_node 
  rclcpp
  sensor_msgs
  laser_geometry
)

```