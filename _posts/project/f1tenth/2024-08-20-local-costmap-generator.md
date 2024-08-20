---
title: "[F1tenth] Package - Local Costmap Generator"
categories: 
  - f1tenth
---
LaserScan data를 local costmap으로 바꾸는 package이다.

# Process

1. LaserScan.msg를 subscribe한다.
2. laser scan을 point cloud2로 변환한다.
3. pointclooud2를 pcl로 변환한다.
4. pointcloud를 전처리한다. [preprocess_pointcloud]
5. 센서 프레임 좌표계를 로봇 프레임 좌표계로 변환한다.
6. 로봇 내부에 있는 pointcloud를 제거한다. [crop_points_within_robot]
7. pointcloud를 costmap으로 변환한다. [pointcloud_to_costmap]
8. 강체를 가진 costmap을 inflate한다. [inflate_rigid_body]
9. costmap을 publish한다. [publish_rigid_body_shape]

LaserScan

```cpp
float32 angle_min
float32 angle_max
float32 angle_increment
float32 time_increment
float32 scan_time
float32 range_min
float32 range_max
float32[] ranges
float32[] intensities
```
