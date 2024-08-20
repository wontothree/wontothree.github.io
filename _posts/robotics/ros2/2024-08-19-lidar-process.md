---
title: "[ROS2] LiDAR"
categories: 
  - ros2
---
LiDAR data를 어떻게 처리해야 할까?

# Dependencies

package.xml

```cpp
<depend>rclcpp</depend>
<depend>sensor_msgs</depend>
```

- rclcpp : node를 생성하고 messgae를 subscribe 또는 publish할 때 필요하다.
- sensor_msgs : Laser data를 처리할 때 주로 사용하는 메시지 타입인 sensor_msgs/LaserScan이 포함되어 있다. LaserScan, PointCloud, Image 등 다양한 센서 데이터 타입을 포함하는 패키지이다.

---

# 전체 코드

```cpp
#include "rclcpp/rclcpp.hpp"
#include <string>
#include "sensor_msgs/msg/laser_scan.hpp"
#include "nav_msgs/msg/odometry.hpp"
#include "ackermann_msgs/msg/ackermann_drive_stamped.hpp"

#define _USE_MATH_DEFINES
#include <cmath>

using std::placeholders::_1;

class WallFollow : public rclcpp::Node {

public:
    WallFollow() : Node("wall_follow_node")
    {
        // Create ROS subscribers and publishers
        publisher_ = this->create_publisher<ackermann_msgs::msg::AckermannDriveStamped>(this->drive_topic, 10);
        subscription_ = this->create_subscription<sensor_msgs::msg::LaserScan>(this->lidarscan_topic, 10, std::bind(&WallFollow::scan_callback, this, _1));
    }

private:
    // PID CONTROL PARAMS
    double kp = 3;
    double ki = 0;
    double kd = 0.1;
    double servo_offset = 0.0;
    double prev_error = 0.0;
    double error = 0.0;
    double integral = 0.0;
    double start_t = -1;
    double curr_t = 0.0;
    double prev_t = 0.0;
    
    // Topics
    std::string lidarscan_topic = "/scan";
    std::string drive_topic = "/drive";

    /// Create ROS subscribers and publishers
    rclcpp::Publisher<ackermann_msgs::msg::AckermannDriveStamped>::SharedPtr publisher_;
    rclcpp::Subscription<sensor_msgs::msg::LaserScan>::SharedPtr subscription_;
    

    double get_range(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg, double angle)
    {
        /*
        Simple helper to return the corresponding range measurement at a given angle. Make sure you take care of NaNs and infs.

        Args:
            range_data: single range array from the LiDAR
            angle: between angle_min and angle_max of the LiDAR in radians

        Returns:
            range: range measurement in meters at the given angle
        */

        assert(angle >= scan_msg->angle_min && angle <= scan_msg->angle_max); // Angle must be within range
        int i = (angle - scan_msg->angle_min) / (scan_msg->angle_increment); // index i of closest angle
        if (std::isnan(scan_msg->ranges[i]) || scan_msg->ranges[i] > scan_msg->range_max) return scan_msg->range_max; // In case of NaNs and infinity, just return the maximum of the scan message
        return scan_msg->ranges[i];
    }
    
    double to_radians(double theta) {
        return M_PI * theta / 180.0;

    }
    
    double to_degrees(double theta) {
        return theta * 180.0 / M_PI;
    }

    void get_error(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg, double dist)
    {
        /*
        Calculates the error to the wall. Follow the wall to the left (going counter clockwise in the Levine loop). You potentially will need to use get_range()

        Args:
            range_data: single range array from the LiDAR
            dist: desired distance to the wall

        Returns:
            error: calculated error
        */

        double a = get_range(scan_msg, to_radians(-50.0));
        double b = get_range(scan_msg, to_radians(-90.0)); // 0 degrees is in front of the card.
        double theta = to_radians(40.0); // 90.0 - 50.0 = 40.0 degrees
        double alpha = std::atan((a * std::cos(theta) - b)/(a * std::sin(theta)));
        double D_t = b*std::cos(alpha);
        // double D_t_1 =  D_t + dist * std::sin(alpha);

        this->prev_error = this->error;
        this->error = dist - D_t;
        this->integral += this->error;
        this->prev_t = this->curr_t;
        this->curr_t = (double) scan_msg->header.stamp.nanosec * (double)10e-9 + (double) scan_msg->header.stamp.sec;
        if (this->start_t == 0.0) {
            this->start_t = this->curr_t;
        }
    }

    void pid_control()
    {
        /*
        Based on the calculated error, publish vehicle control

        Args:
            error: calculated error
            velocity: desired velocity

        Returns:
            None
        */
        double angle = 0.0;
        // Use kp, ki & kd to implement a PID controller
        if (this->prev_t == 0.0) return;
        angle = this->kp * this->error + this->ki * this->integral * (this->curr_t - this->start_t) + this->kd * (this->error - this->prev_error)/(this->curr_t - this->prev_t);

        auto drive_msg = ackermann_msgs::msg::AckermannDriveStamped();
        // Fill in drive message and publish
        drive_msg.drive.steering_angle = angle;
        
        // We go slower if we need to a large steering angle correction
        if (std::abs(drive_msg.drive.steering_angle) >= this->to_radians(0) && std::abs(drive_msg.drive.steering_angle) < this->to_radians(10)) {
            drive_msg.drive.speed = 1.5;
        } else if (std::abs(drive_msg.drive.steering_angle) >= this->to_radians(10) && std::abs(drive_msg.drive.steering_angle) < this->to_radians(20)) {
            drive_msg.drive.speed = 1.0;
        } else {
            drive_msg.drive.speed = 0.5;
        }
        this->publisher_->publish(drive_msg);
    }

    void scan_callback(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg) 
    {
        /*
        Callback function for LaserScan messages. Calculate the error and publish the drive message in this function.

        Args:
            msg: Incoming LaserScan message

        Returns:
            None
        */
        get_error(scan_msg, 1); 
        pid_control();

    }

};

int main(int argc, char ** argv) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<WallFollow>());
    rclcpp::shutdown();
    return 0;
}
```

# LiDAR

라이다 정보를 사용하려면 다음의 의존성이 필요하다.

```cpp
#include "sensor_msgs/msg/laser_scan.hpp"
```

LaserScan 메시지 subscribe 생성

- subscribe할 message type : sensor_msgs::msg::LaserScan
- [첫 번째 인자] subscribe할 topic 이름 : lidarscan_topic
- [두 번째 인자] Queue 사이즈 : 10
  - ROS2에서 메시지를 queue로 관리할 때 사용할 수 있는 버퍼의 크기. 이 버퍼의 크기는 구독자가 처리할 수 없는 메시지가 누적될 수 있는 최대 개수.
= [세 번째 인자] 구독한 메시지가 들어올 때 호출할 콜백 함수
  - std::bind : scan_callback 멤버 함수를 현재 객체의 컨텍스트에서 실행되도록 바인딩한다.
  - _1 : scan_callback 함수가 받아들일 인자
  - scan_callback : 수신된 LiDAR 데이터를 기반으로 차량 제어 등의 동작을 수행한다.

```cpp
subscription_ = this->create_subscription<sensor_msgs::msg::LaserScan>(
    this->lidarscan_topic, 10, std::bind(&WallFollow::scan_callback, this, _1));
```

LiDAR 데이터가 발행되는 ROS2 토픽의 이름을 저장하는 문자열 변수를 선언하고 초기화한다.

문자열 변수 lidarscan_topic을 선언하고, 초기값으로 /scan이라는 문자열을 할당한다.

- lidarscan_topic : 토픽의 이름을 저장하기 위해 사용된다. 이 이름으로 다른 노드들이 LiDAR 데이터를 구독할 수 있다.

```cpp
std::string lidarscan_topic = "/scan";
```

LiDAR 데이터를 구독하기 위한 구독자 객체를 가리키는 스마트 포인터 변수를 선언한다.

subscription 객체를 저장하기 위한 포인터 변수 선언

- rclcpp::Subscription<sensor_msgs::msg::LaserScan> : ROS2에서 특정 메시지 타입을 구독할 때 사용하는 클래스
- sensor_msgs::msg::LaserScan : LiDAR 데이터가 전달될 메시지 형식
- SharedPtr : 스마트 포인터. subscription_ 이라는 변수가 구독자 객체를 가리키는 포인터.
  - 스마트 포인터는 메모리 관리를 자동화하여 메모리 누수를 방지한다.
- subscription_ : 실제 구독자 객체. /scan 토픽으로부터 발행된 LiDAR 데이터를 구독하고, 해당 데이터를 처리하는 콜백 함수에 전달하는 역할을 한다.

```cpp
rclcpp::Subscription<sensor_msgs::msg::LaserScan>::SharedPtr subscription_;
```

## get_range

LiDAR 센서로부터 전달된 레이저 스캔 데이터로부터 특정 각도에서의 거리값을 얻기 위해 사용된다. 이는 벽과의 거리를 계산하는 작업에서 필요하다.

- 주어진 각도가 LiDAR의 측정 가능한 각도 범위에 있는지 확인한다. 만약 각도가 이 범위를 벗어나면 프로그램은 중단된다.
- 주어진 각도에 가장 가까운 인덱스를 계산한다. LiDAR 데이터는 각도마다 거리가 측정되기 때문에 각도를 인덱스로 변환하여 그에 해당하는 거리 값을 찾는 과정이다.
  - scan_msg->angle_min : LiDAR의 최소 측정 각도
  - scan_msg->angle_increment : 각 인덱스 사이의 각도 차이
- 계산된 인덱스 i에 해당하는 거리 값이 NaN이거나 LiDAR의 최대 범위를 초과하는 경우에 대한 처리이다.
- 반환 : 최대 범위를 반환한다.

```cpp
double get_range(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg, double angle)
{
    assert(angle >= scan_msg->angle_min && angle <= scan_msg->angle_max);
    int i = (angle - scan_msg->angle_min) / (scan_msg->angle_increment);
    if (std::isnan(scan_msg->ranges[i]) || scan_msg->ranges[i] > scan_msg->range_max) return scan_msg->range_max;
    return scan_msg->ranges[i];
}
```

## get_error

로봇이 벽을 따라 이동할 때 벽과의 거리에서 발생하는 오차를 계산하는 역할을 한다. 이 오차는 PID 제어를 통해 로봇의 주행 경로를 조정하는 데 사용된다.

```cpp
void get_error(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg, double dist)
{
    double a = get_range(scan_msg, to_radians(-50.0));
    double b = get_range(scan_msg, to_radians(-90.0)); // 0 degrees is in front of the card.
    double theta = to_radians(40.0); // 90.0 - 50.0 = 40.0 degrees
    double alpha = std::atan((a * std::cos(theta) - b)/(a * std::sin(theta)));
    double D_t = b*std::cos(alpha);

    this->prev_error = this->error;
    this->error = dist - D_t;
    this->integral += this->error;
    this->prev_t = this->curr_t;
    this->curr_t = (double) scan_msg->header.stamp.nanosec * (double)10e-9 + (double) scan_msg->header.stamp.sec;
    if (this->start_t == 0.0) {
        this->start_t = this->curr_t;
    }
}
```

## pid_control

```cpp
void pid_control()
{
    double angle = 0.0;
    // Use kp, ki & kd to implement a PID controller
    if (this->prev_t == 0.0) return;
    angle = this->kp * this->error + this->ki * this->integral * (this->curr_t - this->start_t) + this->kd * (this->error - this->prev_error)/(this->curr_t - this->prev_t);

    auto drive_msg = ackermann_msgs::msg::AckermannDriveStamped();
    // Fill in drive message and publish
    drive_msg.drive.steering_angle = angle;
    
    // We go slower if we need to a large steering angle correction
    if (std::abs(drive_msg.drive.steering_angle) >= this->to_radians(0) && std::abs(drive_msg.drive.steering_angle) < this->to_radians(10)) {
        drive_msg.drive.speed = 1.5;
    } else if (std::abs(drive_msg.drive.steering_angle) >= this->to_radians(10) && std::abs(drive_msg.drive.steering_angle) < this->to_radians(20)) {
        drive_msg.drive.speed = 1.0;
    } else {
        drive_msg.drive.speed = 0.5;
    }
    this->publisher_->publish(drive_msg);
}
```

## scan_callback

```cpp
    void scan_callback(const sensor_msgs::msg::LaserScan::ConstSharedPtr scan_msg) 
    {
        get_error(scan_msg, 1); 
        pid_control();
    }
```