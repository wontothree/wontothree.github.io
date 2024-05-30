---
title: "[ROS2] Topic Programming with C++"
excerpt:
categories: 
  - ros2
---
## Publish Node 작성

### 5초 동안 로봇이 원동하고 정지하는 예제

![](../../../img/ros2/parking.png)

```bash
cbp cpp_topic_pkg

# Terminal 1
rosfoxy

ros2 launch gcamp_gazebo gcamp_world.launch.py

# Terminal 2
rosfoxy

ros2 run cpp_topic_pkg cmd_vel_pub_node

# Result
[INFO] [1713391686.567648606] [cmd_vel_pub_node]: 4.999986 Seconds Passed
[INFO] [1713391686.567660466] [cmd_vel_pub_node]: 4.999998 Seconds Passed
[INFO] [1713391686.567680108] [cmd_vel_pub_node]: 5.000009 Seconds Passed
[INFO] [1713391686.567691436] [cmd_vel_pub_node]: ==== Stop Robot ====
```

이러한 예시를 만드려면 cmd_vel를 publish하는 node를 만들어야 한다.

```cpp
#include <memory>

// geometry_msgs/msg/twist 형식의 topic message type을 사용하기 위해 include
// py는 CamelCase로 import하고, cpp는 snake_case로 include한다.
// include에서는 twist, type을 지정할 때와 코드에서 사용할 때는 Twist로 사용한다.
// 로봇을 움직이기 위해서는 특정 축으로 몇 m/s 움직일 것인지에 대한 제어 신호를 주어야 한다.
// 이것은 geometry_msgs 에 있는 twist의 속도와 각속도로 표현할 수 있다.
#include "geometry_msgs/msg/twist.hpp"
#include "rclcpp/rclcpp.hpp"

// public 상속어로 rclcpp 안에 있는 node를 상속받는다.
class TwistPub : public rclcpp::Node {
private:
  // topic publisher node를 SharedPtr로 선언한다.
  rclcpp::Publisher<geometry_msgs::msg::Twist>::SharedPtr m_pub;
  // publish를 주기적으로 사용하기 위한 timer 변수를 선언한다.
  rclcpp::TimerBase::SharedPtr m_timer;
  // topic message 변수를 geometry_msgs::msg::Twist의 type으로 선언한다.
  geometry_msgs::msg::Twist m_twist_msg;

  // 로봇에게 제어 신호를 전달하는 함수
  void timer_callback() { move_robot(); }

public:
  // Node의 생성자를 호출하면서 node의 이름을 지정한다.
  TwistPub() : Node("cmd_vel_pub_node") {
    RCLCPP_INFO(get_logger(), "Cmd_vel Pub Node Created");

    // create_publisher를 통해 **publish를 생성하는 부분**(핵심)
    // message type template : <geometry_msgs::msg::Twist> / python과 차이
    // [매개변수 1] topic의 이름 : skidbot/cmd_vel
    // [매개변수 2] 큐 사이즈 : 10
    m_pub = create_publisher<geometry_msgs::msg::Twist>("skidbot/cmd_vel", 10);

    // create_wall_timer를 사용하기 때문에 내부적으로 WallRate가 사용될 것이다.
    // [매개변수 1] 실행 주기 : 100ms의 주기로 timer_callback을 실행한다.
    // [매개변수 2] 실행 함수 : timer_callback이 클래스 내부에 정의된 함수이기 때문에 std::bind를 사용한다.
    // [매개변수 3] 매개변수가 없기 때문에 this를 사용한다.
    m_timer = create_wall_timer(std::chrono::milliseconds(100),
                                std::bind(&TwistPub::timer_callback, this));
  }

  // 로봇을 움직이는 함수
  // twist에 해당하는 제어 신호를 준다.
  void move_robot() {
    // 로봇이 원운동하도록 한다.
    m_twist_msg.linear.x = 0.5;
    m_twist_msg.angular.z = 1.0;
    // m_pub을 pointer로 선언했기 때문에 화살표로 publish 함수를 호출하여 publish한다.
    m_pub->publish(m_twist_msg);
  }

  // 로봇을 멈추는 함수
  void stop_robot() {
    // 클래스 내부에서 로봇을 움직이는 함수과 멈추는 함수의 차이는 publish하는 message 내부 데이터의 차이일 뿐이고 구조는 동일하다.
    m_twist_msg.linear.x = 0.0;
    m_twist_msg.angular.z = 0.0;
    m_pub->publish(m_twist_msg);

    RCLCPP_INFO(get_logger(), "==== Stop Robot ====");
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);

  auto twist_pub = std::make_shared<TwistPub>();

  // 갱신되지 않는 시간 변수 1
  auto t_start = twist_pub->now();
  // 갱신되는 시간 변수 2
  auto t_now = twist_pub->now();
  // 정지하고자 하는 시간 변수
  auto stop_time = 5.0;

  // 시간 차가 정한 시간을 넘으면 반복을 멈춘다.
  // ros2 시간 api : now(), seconds() 등이 있다.
  while ((t_now - t_start).seconds() < stop_time) {
    // 계속해서 갱신한다.
    t_now = twist_pub->now();
    // rclcpp::spin_some(twist_pub);
    // move_robot()을 호출한다.
    twist_pub->move_robot();

    RCLCPP_INFO(twist_pub->get_logger(), "%f Seconds Passed", (t_now - t_start).seconds());
  }

  // stop_robot()을 호출한다.
  twist_pub->stop_robot();

  rclcpp::shutdown();

  return 0;
}
```

이렇게 일정 시간동안 Node를 반복 실행하고자 하는 경우 ⇒ Spin을 적극 사용하시기 바랍니다.

```cpp
while ((t_now - t_start).nanoseconds() < t_delta)
  {
    t_now = twist_pub->now();
    rclcpp::spin_some(twist_pub);
  }

  twist_pub->stop_robot();
```

## Subscriber Node 작성

### Laser Scan Subscriber 예제

```bash
rosfoxy

ros2 run cpp_topic_pkg laser_sub_node
```

```bash
[INFO] [1626530617.299164834] [topic_sub_oop_node]: Distance from Front Object : 1.640594
[INFO] [1626530617.324146947] [topic_sub_oop_node]: Distance from Front Object : 1.670932
[INFO] [1626530617.349146400] [topic_sub_oop_node]: Distance from Front Object : 1.630855
[INFO] [1626530617.374505251] [topic_sub_oop_node]: Distance from Front Object : 1.630175
[INFO] [1626530617.399248050] [topic_sub_oop_node]: Distance from Front Object : 1.648074
[INFO] [1626530617.424354715] [topic_sub_oop_node]: Distance from Front Object : 1.648457
[INFO] [1626530617.449352158] [topic_sub_oop_node]: Distance from Front Object : 1.650059
```

```cpp
#include <memory>
#include "rclcpp/rclcpp.hpp"
// python에서는 CamelCase를 사용하여 sensor_msgs/msg/LaseScan와 같이 import한다.
// C++에서는 snake_case를 사용하여 include하고, 코드에서는 LaserScan과 같이 CamelCase를 사용한다.
#include "sensor_msgs/msg/laser_scan.hpp"

// 생산성을 높이기 위한 축약어
using LaserScan = sensor_msgs::msg::LaserScan;

class LaserSub : public rclcpp::Node {
private:
  // subsrciber node 변수를 선언한다.
  rclcpp::Subscription<sensor_msgs::msg::LaserScan>::SharedPtr m_sub;

public:
  LaserSub() : Node("topic_sub_oop_node") {
    // create_subscription 함수를 호출하여 subscriber를 생성한다.
    // message type : sensor_msgs::msg::LaserScan
    // 한편 using을 사용한다면 LaserScan만 쓰면 된다.
    // [매개변수 1] : subscribe할 topic 이름
    // [매개변수 2] : 큐 사이즈
    // [매개변수 3] : callback 함수 / 내부 함수이기 때문에 
    // std::placeholders::_1 : 적어도 1개의 매개변수가 필요하다.
    // callback이 실행되면서 subscribe받은 데이터를 다뤄야 한다. msg가 그 데이터이다.
    m_sub = this->create_subscription<sensor_msgs::msg::LaserScan>(
        "skidbot/scan", 10,
        std::bind(&LaserSub::sub_callback, this, std::placeholders::_1));
  }

  // SharedPtr - shared pointer 형태의 subscribe data - msg를 입력받는다.
  void sub_callback(const sensor_msgs::msg::LaserScan::SharedPtr msg) {
    // std::cout << (msg->ranges).size() << std::endl;

    // for (auto e : msg->ranges)
    //   std::cout << e << std::endl;

    // Laser Scane 데이터 안에는 ranges라는 항목이 있다.
    // ranges 안에는 720개의 laser point에 대한 물체와의 거리가 담겨 있다.
    // 360번째는 전방에 해당한다.
    // 포인터이기 때문에 화살표로 접근한다.
    // console로 출력한다.
    // 파이썬은 ranges가 list지만 cpp는 vector다.
    RCLCPP_INFO(this->get_logger(), "Distance from Front Object : %f", (msg->ranges)[360]);
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);
  // subscriber는 계속해서 데이터를 받아와야 한다.
  // 이때는 spin을 사용해야 한다.
  // spin이 없다면 LaserScan 값이 갱신되지 않는다.
  rclcpp::spin(std::make_shared<LaserSub>());
  rclcpp::shutdown();

  return 0;
}
```

## Publisher와 Subscriber가 결합된 주차 예시

```bash
rosfoxy

ros2 run cpp_topic_pkg parking_node
```

```cpp
#include <memory>
#include "geometry_msgs/msg/twist.hpp"
#include "rclcpp/rclcpp.hpp"
#include "sensor_msgs/msg/laser_scan.hpp"

using Twist = geometry_msgs::msg::Twist;
using LaserScan = sensor_msgs::msg::LaserScan;
class ParkingNode : public rclcpp::Node {
private:
  rclcpp::Publisher<Twist>::SharedPtr m_pub;
  rclcpp::Subscription<LaserScan>::SharedPtr m_sub;

  Twist m_twist_msg;

public:
  ParkingNode() : Node("robot_parking_node") {
    RCLCPP_INFO(get_logger(), "Parking Node Created");

    m_pub = create_publisher<Twist>("skidbot/cmd_vel", 10);
    m_sub = create_subscription<LaserScan>(
        "skidbot/scan", 10,
        std::bind(&ParkingNode::sub_callback, this, std::placeholders::_1));
  }

  void sub_callback(const LaserScan::SharedPtr msg) {
    auto forward_distance = (msg->ranges)[360];

    if (forward_distance > 0.8) {
      move_robot(forward_distance);
    } else {
      stop_robot();
      rclcpp::shutdown();
    }
  }

  void move_robot(const float &forward_distance) {
    m_twist_msg.linear.x = 0.5;
    m_twist_msg.angular.z = 0.0;
    m_pub->publish(m_twist_msg);

    RCLCPP_INFO(get_logger(), "Distance from Obstacle ahead : %f", forward_distance);
  }

  void stop_robot() {
    m_twist_msg.linear.x = 0.0;
    m_twist_msg.angular.z = 0.0;
    m_pub->publish(m_twist_msg);

    RCLCPP_WARN(get_logger(), "Stop Robot and make Node FREE!");
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);

  auto parking_node = std::make_shared<ParkingNode>();
  rclcpp::spin(parking_node);
  rclcpp::shutdown();

  return 0;
}
```

## Reference

김수영 대표 강의 - 14강
