---
title: "[F1tenth] local_costmap_generator Package API"
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

# LocalCostmapGenerator

```cpp
LocalCostmapGenerator::LocalCostmapGenerator() : Node("loca_costmap_generator_node"), tf_buffer_(this->get_clock()), tf_listener_(tf_buffer_)
{
    laserscan_topic = "/scan";

    sub_laserscan_ = this->create_subscription<sensor_msgs::msg::LaserScan>(
        laserscan_topic,
        10, 
        std::bind(&LocalCostmapGenerator::scan_callback, this, std::placeholders::_1)
    );

    is_laserscan_received_ = false;

    timer_ = this->create_wall_timer(std::chrono::milliseconds(10), std::bind(&LocalCostmapGenerator::timer_callback, this));

    laser_projection_ = std::make_shared<laser_geometry::LaserProjection>();

    pointcloud2_ = std::make_shared<sensor_msgs::msg::PointCloud2>();

    pub_pointcloud2_ = this->create_publisher<sensor_msgs::msg::PointCloud2>("/pointcloud2", 10);

    pcl_ = pcl::PointCloud<pcl::PointXYZ>::Ptr(new pcl::PointCloud<pcl::PointXYZ>());

    robot_frame_id_ = "ego_racecar/base_link";
    sensor_frame_id_ = "ego_racecar/laser";
    pcl_robot_frame_ = pcl::PointCloud<pcl::PointXYZ>::Ptr(new pcl::PointCloud<pcl::PointXYZ>());
}
```

# scan_callback

```cpp
void LocalCostmapGenerator::scan_callback(const sensor_msgs::msg::LaserScan::ConstSharedPtr laserscan)
{
    laserscan_to_pointcloud2(laserscan, pointcloud2_);
    pointcloud2_to_pcl(pointcloud2_, pcl_);

    is_laserscan_received_ = true;
}
```

# timer_callback

```cpp
void LocalCostmapGenerator::timer_callback()
{
    if (!is_laserscan_received_) {
        RCLCPP_INFO(this->get_logger(), "Waiting for laser scan data...");
        return;
    }

    preprocess_pcl(pcl_);

    sensor_frame_to_robot_frame(sensor_frame_id_, robot_frame_id_, pcl_, pcl_robot_frame_);
}
```

# 1. laserscan_to_pointcloud2

```cpp
void LocalCostmapGenerator::laserscan_to_pointcloud2(const sensor_msgs::msg::LaserScan::ConstSharedPtr laserscan, sensor_msgs::msg::PointCloud2::SharedPtr pointcloud2)
{
    laser_projection_->projectLaser(*laserscan, *pointcloud2);
}
```

- sensor_msgs::LaserScan을 sensor_msgs::PointCloud2로 변환하는 함수
- Library [laser_geometry](https://github.com/ros-perception/laser_geometry.git)의 laser_geometry::LaserProjection를 사용한다.

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
void LocalCostmapGenerator::pointcloud2_to_pcl(const sensor_msgs::msg::PointCloud2::ConstSharedPtr pointcloud2, pcl::PointCloud<pcl::PointXYZ>::Ptr pcl)
{
    pcl::fromROSMsg(*pointcloud2, *pcl);
}
```

ROS message 형태의 point cloude를 pcl에서 사용하는 message type으로 변환한다.

pcl message type의 형태로 데이터를 가공한 후 ROS에서 publish하기 위해서는 다시 sensor_msgs::msg::PointCloud2로 바꿔야 한다.

RVIZ를 이용해 전처리 결과를 시각적으로 확인하기 위해서는 sensor_msgs::msg::PointCloud2로 publish해야 한다.

[perception_pcl](https://github.com/ros-perception/perception_pcl/tree/foxy-devel) : 포인트 클라우드 데이터를 처리하고 분석하는 라이브러리. 데이터 처리 도구.

sensor_msgs::msg::PointCloud2 메시지를 pcl::PointCloud 객체로 변환하려면, pcl_conversions 패키지를 이용해야 한다.

# 3. preprocess_pointcloud

```cpp
void LocalCostmapGenerator::preprocess_pcl(pcl::PointCloud<pcl::PointXYZ>::Ptr pcl)
{
    *pcl = *pcl;
}
```

- NaN 제거
- 이상치 제거
- 다운샘플링
- 통과 필터

# 4. sensor_frame_to_robot_frame

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

# 5. remove_pcl_within_robot

- 로봇의 특정 영역 바깥에 위치한 포인트를 제거하는 데 사용된다.
- 포인트 클라우드를 로봇의 관심 영역으로 제한하여 후속 처리나 분석을 더 효율적으로 수행할 수 있다.
- PCL의 CropBox 필터를 사용한다.

# 6. pcl_to_costmap

pcl을 costmap으로 변환한다.

모든 Point cloud를 grid costmap에 대응시킨다.

1. 모든 point cloud를 순회한다.
   2. 만약 해당 point cloud가 costmap 내부에 있다면, 그 point cloud에 대응되는 costmap의 cell에 값을 부여한다.
   3. 만약 해당 point cloud가 costmap 내부에 없다면, 그 point cloud를 제거한다.

- 의존성

OpenMP

# 7. inflate_rigidbody

- 비용 맵 데이터 가져오기
- 오프셋 계산
- 비용 맵의 크기 가져오기
- 비용 맵 팽창

# Reference

https://pointclouds.org/

https://limhyungtae.github.io/2021-09-09-ROS-Point-Cloud-Library-(PCL)-0.-Tutorial-%EB