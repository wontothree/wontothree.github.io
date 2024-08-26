---
title: "[ROS2] Dependency"
categories: 
  - ros2
---
ROS2에서 Library를 사용할 때 어떤 것들을 해야 할까?

1. 설치한다.
2. package.xml을 수정한다.
3. CMakeLists.txt를 수정한다.
4. header를 추가한다.

# 1. install

https://github.com/ros-perception/laser_geometry/tree/foxy

laser_geometry 패키지 설치

```bash
sudo apt-get update
sudo apt-get install ros-foxy-laser-geometry
```

# 2. package.xml

```xml
<depend>laser_geometry</depend>
```

# 3. CMakeLists.txt

```cpp
find_package(laser_geometry REQUIRED)

add_executable(local_costmap_generator_node src/local_costmap_generator.cpp src/local_costmap_generator_node.cpp)
ament_target_dependencies(local_costmap_generator_node 
  rclcpp
  sensor_msgs
  laser_geometry
)
```

# 4. Header

```cpp
#include "laser_geometry/laser_geometry.hpp"
```