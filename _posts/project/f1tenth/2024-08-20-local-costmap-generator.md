---
title: "[F1tenth] Package local_costmap_generator API"
categories: 
  - f1tenth
---
LaserScan data를 local costmap으로 바꾸는 package이다.

Process

1. sensor_msgs::LaserScan을 sensor_msgs::PointCloud2로 변환한다. [laserscan_to_pointcloud2]
2. sensor_msgs::PointCloud2를 pcl::PointCloud로 변환한다. [pointcloud2_to_pcl]
3. pointcloud2를 전처리한다. [preprocess_pointcloud]
4. 4센서 프레임 좌표계를 로봇 프레임 좌표계로 변환한다. [sensorFrame_to_robotFrame]
5. 로봇 내부에 있는 pointcloud를 제거한다. [crop_points_within_robot]
6. pointcloud를 costmap으로 변환한다. [pointcloud_to_costmap]
7. 강체를 가진 costmap을 inflate한다. [inflate_rigidbody]

# 1. laserscan_to_pointcloud2

sensor_msgs::LaserScan을 sensor_msgs::PointCloud2로 변환하는 함수

Library [laser_geometry](https://github.com/ros-perception/laser_geometry.git)의 class LaserProjection를 사용한다. - laser_geometry::LaserProjection

```cpp
void LocalCostmapGenerator::laserscan_to_pointcloud2(const sensor_msgs::msg::LaserScan::ConstSharedPtr laserscan_msg)
{
    laser_projection_->projectLaser(*laserscan_msg, *pointcloud2_);
}
```

[message] [sensor_msgs/LaserScan](https://github.com/ros-perception/laser_geometry/tree/foxy)

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

[message] [sensor_msgs/PointCloud2](https://docs.ros.org/en/melodic/api/sensor_msgs/html/msg/PointCloud2.html)

```cpp
std_msgs/Header header
uint32 height
uint32 width
sensor_msgs/PointField[] fields
bool is_bigendian
uint32 point_step
uint32 row_step
uint8[] data
bool is_dense
```

# 2. pointcloud2_to_pcl

```cpp
void LocalCostmapGenerator::pointcloud2_to_pcl(const sensor_msgs::msg::PointCloud2::ConstSharedPtr pointcloud2)
{
    pcl::fromROSMsg(*pointcloud2, *pcl_);
}
```

ROS message 형태의 point cloude를 pcl에서 사용하는 message type으로 변환한다.

pcl message type의 형태로 데이터를 가공한 후 ROS에서 publish하기 위해서는 다시 sensor_msgs::msg::PointCloud2로 바꿔야 한다.

RVIZ를 이용해 전처리 결과를 시각적으로 확인하기 위해서는 sensor_msgs::msg::PointCloud2로 publish해야 한다.

[perception_pcl](https://github.com/ros-perception/perception_pcl/tree/foxy-devel) : 포인트 클라우드 데이터를 처리하고 분석하는 라이브러리. 데이터 처리 도구.

sensor_msgs::msg::PointCloud2 메시지를 pcl::PointCloud 객체로 변환하려면, pcl_conversions 패키지를 이용해야 한다.

# 3. preprocess_pointcloud

```cpp
void LocalCostmapGenerator::preprocess_pcl(const pcl::PointCloud<pcl::PointXYZ>::ConstPtr pcl, pcl::PointCloud<pcl::PointXYZ>::Ptr& pcl_preprocessed)
{
    *pcl_preprocessed = *pcl;
}
```

- NaN 제거
- 이상치 제거
- 다운샘플링
- 통과 필터

# 4. sensorFrame_to_robotFrame

```cpp
void LocalCostmapGenerator::sensor_frame_to_robot_frame(const std::string& sensor_frame_id, const std::string& robot_frame_id, const pcl::PointCloud<pcl::PointXYZ>::ConstPtr& pcl_sensor_frame, pcl::PointCloud<pcl::PointXYZ>::Ptr& pcl_robot_frame)
{
    try {
        transform_stamped_ = tf_buffer_.lookupTransform(robot_frame_id, sensor_frame_id, rclcpp::Time(0));
    } catch (tf2::TransformException &ex) {
        RCLCPP_WARN_THROTTLE(this->get_logger(), *this->get_clock(), 3000, "[LocalCostmapGenerator] %s", ex.what());
        return;
    }

    const Eigen::Isometry3d transform_matrix = tf2::transformToEigen(transform_stamped_.transform);

    pcl::transformPointCloud(*pcl_sensor_frame, *pcl_robot_frame, transform_matrix.matrix().cast<float>());
}
```

- 좌표 변환 조회 : 센서와 로봇 사이의 변환 정보를 조회
- 변환 행렬 생성 : 조화된 변환 정보를 Eigen의 행렬로 변환한다.
- 포인트 클라우드 변환 : 포인트 클라우드를 변환 행렬을 사용하여 로봇 프레임으로 변환한다.

tf_buffer_, tf_listener_ : TF2 라이브러리에서 좌표 변환을 관리하고 변환을 수신하는 데 사용된다.

# 5. crop_points_within_robot

- 로봇의 특정 영역 바깥에 위치한 포인트를 제거하는 데 사용된다.
- 포인트 클라우드를 로봇의 관심 영역으로 제한하여 후속 처리나 분석을 더 효율적으로 수행할 수 있다.
- PCL의 CropBox 필터를 사용한다.

# 6. pcl_to_costmap

- 비용 맵 데이터 가져오기 및 초기화
- 포인트 클라우드의 각 포인트를 처리하여 비용 맵 업데이트
- 영역 밖의 인덱스 제거

# 7. inflate_rigidbody

- 비용 맵 데이터 가져오기
- 오프셋 계산
- 비용 맵의 크기 가져오기
- 비용 맵 팽창

# Reference

https://pointclouds.org/

https://limhyungtae.github.io/2021-09-09-ROS-Point-Cloud-Library-(PCL)-0.-Tutorial-%EB