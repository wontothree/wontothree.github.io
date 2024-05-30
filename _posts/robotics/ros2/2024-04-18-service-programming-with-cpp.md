---
title: "[ROS2] Service Programming with C++"
excerpt:
categories: 
  - ros2
---
## 

```cpp
#include <memory>
#include "custom_interfaces/srv/turning_control.hpp"
#include "geometry_msgs/msg/twist.hpp"
#include "rclcpp/rclcpp.hpp"

using Twist = geometry_msgs::msg::Twist;
using TurningControl = custom_interfaces::srv::TurningControl;

class RobotTurnServer : public rclcpp::Node {
private:
  rclcpp::Service<TurningControl>::SharedPtr m_service;
  rclcpp::Publisher<Twist>::SharedPtr m_twist_pub;

  Twist m_twist_msg;

public:
  RobotTurnServer() : Node("robot_turn_server") {
    RCLCPP_WARN(get_logger(), "Robot Turn Server Started");

    m_twist_pub = create_publisher<Twist>("skidbot/cmd_vel", 10);
    // create_service를 이용해 서비스 Server를 만든다.
    // 매개변수 1 : 생성한 서비스의 이름
    // 매개변수 2 : request가 올 때마다 실행될 callback 함수
    // 각각에 대한 최소 매개변수 개수
    m_service = create_service<TurningControl>(
        "turn_robot", std::bind(&RobotTurnServer::response_callback, this,
                                std::placeholders::_1, std::placeholders::_2));
  }
  // request에 들어있는 것
  // uint32 time_duration
  // float64 angular_vel_z
  // float64 linear_vel_x
  // ---
  // bool success


  // Server는 어떤 요구가 왔는지 파악하고, 그에 필요한 연산을 수행하고, response에 결과를 넣어 되돌려준다.
  // 따라서 response_callback는 매개변수로 request와 response가 필요하다.
  void response_callback(std::shared_ptr<TurningControl::Request> request,
                         std::shared_ptr<TurningControl::Response> response) {

    // 시간을 다루는 부분
    auto t_start = now();
    auto t_now = now();
    auto t_delta = request->time_duration * 1e9; // ns

    RCLCPP_INFO(get_logger(), "\nTime Duration : %d\nLinear X Cmd : %f\nAngular Z Cmd : %f",
      request->time_duration, request->linear_vel_x, request->angular_vel_z);

    RCLCPP_INFO(get_logger(), "Request Received Robot Starts to Move");

    while ((t_now - t_start).nanoseconds() < t_delta) {
      t_now = now();
      move_robot(request->linear_vel_x, request->angular_vel_z);
    }
    stop_robot();

    RCLCPP_WARN(get_logger(), "Request Done Wating for next request...");

    // 로봇이 성공적으로 정지했다면 true
    response->success = true;
  }

  void move_robot(const float &linear_x, const float &angular_z) {
    m_twist_msg.linear.x = linear_x;
    m_twist_msg.angular.z = angular_z;

    m_twist_pub->publish(m_twist_msg);
  }

  void stop_robot() {
    m_twist_msg.linear.x = 0.0;
    m_twist_msg.angular.z = 0.0;
    m_twist_pub->publish(m_twist_msg);

    RCLCPP_INFO(get_logger(), "Stop Robot and make Node FREE!");
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);

  auto node = std::make_shared<RobotTurnServer>();

  // request가 왔다, response를 보낸다 - 이 부분은 코드에 구현되지 않는다. rclcpp의 spin이 알아서 scheduling한다.
  rclcpp::spin(node);
  rclcpp::shutdown();
}
```

## Service Client

```cpp
#include <chrono>
#include <cstdlib>
#include <memory>

#include "custom_interfaces/srv/turning_control.hpp"
#include "rclcpp/rclcpp.hpp"

using namespace std::chrono_literals;
using TurningControl = custom_interfaces::srv::TurningControl;

class RobotTurnClient : public rclcpp::Node
{
// 맴버 변수
private:
  rclcpp::Client<TurningControl>::SharedPtr m_client;
  // request를 message를 담아서 보내야 하기 때문에 맴버 변수로 선언한다.
  // 왜 다른 shared ptr를 사용했을까
  // client 입장에서 control할 수 있는 부분이 request밖에 없다. response는 server가 주는 것이고 client가 handling할 수 없다.
  std::shared_ptr<TurningControl::Request> m_request;

public:
  RobotTurnClient() : Node("robot_turn_client")
  {
    m_client = create_client<TurningControl>("turn_robot");
    m_request = std::make_shared<TurningControl::Request>();

    // client가 request를 보내기 전에 생성자가 request를 받을 server가 있는지 확인한다. 1초 동안 기다리고 응답이 없다면, server가 없는 것으로 판단한다.
    while (!m_client->wait_for_service(1s))
      RCLCPP_INFO(get_logger(), "service not available, waiting again...");

    RCLCPP_INFO(get_logger(), "service available, waiting serice call");
  }

  // request로 채워줘야 할 부분 3개의 매개변수를 받고싶다.
  // uint32 time_duration
  // float64 angular_vel_z
  // float64 linear_vel_x
  // ---
  // bool success

  // request를 보내는 부분
  auto get_result_future(const int &time_in, const float &linear_x_in,
                         const float &angular_z_in)
  {
    RCLCPP_WARN(get_logger(), "Input Info");
    RCLCPP_INFO(get_logger(), "time_duration : %d\nlinear_vel_x : %f\nangular_vel_z : %f",
      time_in, linear_x_in, angular_z_in);

    // 보낸다.
    m_request->time_duration = time_in;
    m_request->linear_vel_x = linear_x_in;
    m_request->angular_vel_z = angular_z_in;

    // async_send_request를 사용해서 보낸다.
    // 비동기적으로 request를 보낸다.
    return m_client->async_send_request(m_request);
  }
};

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);

  // 첫 번째 매개변수는 예약되어 있다. 매개변수가 4개가 아니면, 노드를 생성한다.
  if (argc != 4)
  {
    RCLCPP_INFO(
        rclcpp::get_logger("rclcpp"),
        "usage: robot_turning_client [seconds] [linear_vel_x] [angular_vel_z]");
    return 1;
  }

  auto basic_service_client = std::make_shared<RobotTurnClient>();

  // get_result_future 안에 매개변수를 채워준다.
  // atoi : integer
  // atof : float
  auto result = basic_service_client->get_result_future(
      atoi(argv[1]), atof(argv[2]), atof(argv[3]));

  // Wait for the result.

  // 노드와 future를 받는다. 퓨처가 끝나기 전까지 첫 번째 매개변수인 노드를 스핀시킨다.
  // 퓨처가 끝남 response가 오면 success 출력
  if (rclcpp::spin_until_future_complete(basic_service_client, result) ==
      rclcpp::executor::FutureReturnCode::SUCCESS)
    RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "Result : %s",
                result.get()->success ? "True" : "False");
  else
    RCLCPP_ERROR(rclcpp::get_logger("rclcpp"),
                 "Failed to call service add_two_ints");

  rclcpp::shutdown();
  return 0;
}
```

## Reference

 김수영 대표 강의 - 11강