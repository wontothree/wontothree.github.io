---
title: "[ROS2] Dependency"
categories: 
  - ros2
---

의존성 패키지는 두 가지 종류로 나뉜다.

1. workspace 내부에 소스 코드 형태로 존재해야 하는 dependency
2. 외부 라이브러리 : rosdep 등을 통해 설치할 수 있다.

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
include_directories(include)

find_package(laser_geometry REQUIRED)

add_executable(local_costmap_generator_node 
   