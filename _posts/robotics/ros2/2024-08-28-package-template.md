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
```

새로운 의존성을 추가해야 한다.

# CMakeLists.txt

```cpp
include_directories(include/)
```

header file의 경로를 설정해줘야 한다.

```cpp
#include "local_planner/local_planner_ros.hpp"
```

cpp 파일이나 hpp 파일에서 위와 같이 작성해도 compiler가 경로를 찾을 수 있다.

```cpp
find_package(rclcpp)
```

Dependencis룰 find_package() 한다.

```cpp
add_executable(local_planner_node 
  src/local_planner_node.cpp
  src/local_planner_ros.cpp
)
```

실행 파일을 지정한다.

```cpp
ament_target_dependencies(local_planner_node
  rclcpp
)
```

의존성을 지정한다.

# Header file

```hpp
#ifndef LOCAL_PLANNER_HPP
#define LOCAL_PLANNER_HPP

#include "rclcpp/rclcpp.hpp"

class LocalPlanner : public rclcpp::Node {
public:
    LocalPlanner();

private:
    // void callback_timer();

    // void callback_local_costmap();

    // void callback_odometry();
};

#endif // LOCAL_PLANNER_HPP
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