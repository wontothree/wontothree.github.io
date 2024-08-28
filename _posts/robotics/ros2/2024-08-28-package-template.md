---
title: "[ROS2] Package Template"
categories: 
  - ros2
---
    ├── <package_name>/
    │   ├── package.xml
    │   ├── CMakeLists.txt
    │   ├── include/<package_name>/
    │   │   └── lcaol_planner_ros.hpp
    │   └── src/
    │       ├── local_planner_ros.cpp
    │       └── local_planner_node.cpp

# package.xml

```cpp
<depend>rclcpp</depend>
<depend>grid_map_msgs</depend>
<depend>nav_msgs</depend>
```

새로운 의존성을 추가해야 한다.

# CMakeLists.txt

```cpp
include_directories(include/)
```

header file의 경로를 설정해줘야 한다.

```cpp
add_executable(local_planner_node 
  src/local_planner_node.cpp
  src/local_planner_ros.cpp
)
```

실행 파일을 지정한다.

```cpp
#include "local_planner/local_planner_ros.hpp"
```

cpp 파일이나 hpp 파일에서 위와 같이 작성해도 compiler가 경로를 찾을 수 있다.


Dependencis룰 find_package() 한다.

```cpp
ament_target_dependencies(local_planner_node
  rclcpp
  grid_map_msgs
  nav_msgs
)
```

의존성을 지정한다.

# Header file

가정 먼저 해야 할 것

- subscriber
- callback 함수들
  - subscription에 의한 callback 함수
  - timer_callback 함수

```hpp
#include "local_planner/local_planner_ros.hpp"

LocalPlanner::LocalPlanner() : Node("local_planner_node")
{
    // subscribe
    is_localize_less_mode_ = false;
    topic_name_local_costmap_ = "/local_costmap";
    topic_name_odometry_ = "/odom";

    if (is_localize_less_mode_) {
        sub_local_costmap_ = this->create_subscription<grid_map_msgs::msg::GridMap>(
            topic_name_local_costmap_, 
            10, 
            [this](const grid_map_msgs::msg::GridMap::SharedPtr local_costmap) { this->callback_local_costmap(local_costmap); }
        );
        sub_odometry_ = this->create_subscription<nav_msgs::msg::Odometry>(
            topic_name_odometry_, 
            10, 
            [this](const nav_msgs::msg::Odometry::SharedPtr odometry) { this->callback_odometry(odometry); }
        );
    } else {
        // ...
    }

    // callback_local_costmap
    is_local_costmap_received_ = false;

    // callback_odometry
    is_odometry_received_ = false;

    // callback_timer
    timer_ = this->create_wall_timer(std::chrono::milliseconds(1000), std::bind(&LocalPlanner::callback_timer, this));
}

void LocalPlanner::callback_local_costmap(const grid_map_msgs::msg::GridMap::SharedPtr local_costmap)
{
    is_local_costmap_received_ = true;
}

void LocalPlanner::callback_odometry(const nav_msgs::msg::Odometry::SharedPtr odometry)
{
    is_odometry_received_ = true;
}

void LocalPlanner::callback_timer()
{
    // ...
}
```

# Source code

local_planner.cpp

```cpp
#include "local_planner/local_planner_ros.hpp"

LocalPlanner::LocalPlanner() : Node("local_planner_node")
{
    // ...
}

// void callback_timer()
// {
//     // ...
// }

// void callback_local_costmap()
// {
//     // ...
// }

// void callback_odometry()
// {
//     // ...
// }
```

local_planner_node.cpp

```cpp
#include "local_planner/local_planner_ros.hpp"

int main(int argc, char * argv[])
{
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<LocalPlanner>());
    rclcpp::shutdown();
    return 0;
}
```