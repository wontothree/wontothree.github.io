---
title: "[F1tenth] Package API - local_planner"
categories: 
  - f1tenth
---
# callback_local_costmap

```cpp
void LocalPlanner::callback_local_costmap(const grid_map_msgs::msg::GridMap::SharedPtr local_costmap)
{
    is_local_costmap_received_ = true;
}
```

# callback_odometry

```cpp
void LocalPlanner::callback_odometry(const nav_msgs::msg::Odometry::SharedPtr odometry)
{
    robot_state_.x = 0.0;
    robot_state_.y = 0.0;
    robot_state_.yaw = 0.0;
    robot_state_.vel = odometry->twist.twist.linear.x;

    is_odometry_received_ = true;
}
```

# callback_timer

```cpp
void LocalPlanner::callback_timer()
{
    // ...
}
```

