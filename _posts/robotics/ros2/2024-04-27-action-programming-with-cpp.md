---
title: "[ROS2] Action Programming with C++"
excerpt:
categories: 
  - ros2
---
## 빌드와 실행

## Action Server 작성

```cpp
// Copyright 2018 Open Source Robotics Foundation, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <memory>
#include <thread>

// 이 두 가지를 include해야 action을 사용할 수 있다.
#include "custom_interfaces/action/fibonacci.hpp"
#include "rclcpp/rclcpp.hpp"

// TODO(jacobperron): Remove this once it is included as part of 'rclcpp.hpp'
#include "rclcpp_action/rclcpp_action.hpp"

// action type에 대해 축양 -> 가독성
using Fibonacci = custom_interfaces::action::Fibonacci;
using GoalHandleFibonacci = rclcpp_action::ServerGoalHandle<Fibonacci>;

class FBActionServer : public rclcpp::Node {
private:
  rclcpp_action::Server<Fibonacci>::SharedPtr m_action_server;

public:
  FBActionServer() : Node("fb_action_server") {
    using namespace std::placeholders;
    // Create an action server with three callbacks
    //   'handle_goal' and 'handle_cancel' are called by the Executor
    //   (rclcpp::spin) 'execute' is called whenever 'handle_goal' returns by
    //   accepting a goal
    //    Calls to 'execute' are made in an available thread from a pool of
    //    four.

    // 첫 번째 매개변수로 this가 들어간다.
    // 두 번째 매개 변수 : 이름
    // client로부터 goal request가 왔을 때 goal callback이 실행되고, cancel request가 왔을 때 cancel callback이 실행된다.
    m_action_server = rclcpp_action::create_server<Fibonacci>(
        this, "fibonacci",
        std::bind(&FBActionServer::handle_goal, this, _1, _2),
        std::bind(&FBActionServer::handle_cancel, this, _1),
        std::bind(&FBActionServer::handle_accepted, this, _1));

    RCLCPP_INFO(get_logger(),
                "FB Action Server Created Waiting for client... ");
  }

  // handle_goal은 uuid와 goal을 매개변수로 갖는다.
  // 여기서는 uuid를 사용하지 않는다. uuid는 goal에 대한 id이다.
  rclcpp_action::GoalResponse
  handle_goal(const rclcpp_action::GoalUUID &uuid,
              std::shared_ptr<const Fibonacci::Goal> goal) {
    RCLCPP_INFO(get_logger(), "Got goal request with order %d", goal->order);

    // 개별 goal request에 대한 id
    (void)uuid;

    // Let's reject sequences that are over 9000
    // 피보나치 수열이 9000 이상을 요구하면 reject, 이하면 execute
    if (goal->order > 9000) {
      return rclcpp_action::GoalResponse::REJECT;
    }
    return rclcpp_action::GoalResponse::ACCEPT_AND_EXECUTE;
  }

  // cancel이 들어왔을 때 억셉과 리젝에 대한 조건을 만드려면 goal_handle 함수를 다뤄야 한다. 설명 생략
  rclcpp_action::CancelResponse
  handle_cancel(const std::shared_ptr<GoalHandleFibonacci> goal_handle) {
    RCLCPP_WARN(get_logger(), "Got request to cancel goal");
    (void)goal_handle;
    return rclcpp_action::CancelResponse::ACCEPT;
  }

  void handle_accepted(const std::shared_ptr<GoalHandleFibonacci> goal_handle) {
    // this needs to return quickly to avoid blocking the executor, so spin up a
    // new thread
    using namespace std::placeholders;
    std::thread{std::bind(&FBActionServer::execute, this, _1), goal_handle}
        .detach();
  }

  void execute(const std::shared_ptr<GoalHandleFibonacci> goal_handle) {
    RCLCPP_INFO(get_logger(), "Executing goal");
    rclcpp::Rate loop_rate(2);  // 0.5 sec

    const auto goal = goal_handle->get_goal(); // 1. 어떤 goal이 왔는지에 대한 함수
    auto feedback = std::make_shared<Fibonacci::Feedback>(); // 안에 있는 partial sequence가 벡터
    auto result = std::make_shared<Fibonacci::Result>();
    auto &sequence = feedback->partial_sequence;
    sequence.push_back(0);
    sequence.push_back(1);

    // goal_handle이 수많은 역할을 담당하고 있다.
    // execute, handle accpeted, handle cancel에서 모두 사용된다.
    for (int i = 1; (i < goal->order) && rclcpp::ok(); ++i) { // cancel request가 발생하면 무조건 accept되고  is_canceling이 true가 된다.
      // Check if there is a cancel request
      if (goal_handle->is_canceling()) { // 2. cancel이 됐는지 여부를 판단한다. // cancel request가 발생하면 무조건 accept되고  is_canceling이 true가 된다.
        result->sequence = sequence;
        goal_handle->canceled(result); // 3. 현재 자기 상태를 바꿀 수 있는 canceled와 succeed도 가지고 있다.
        RCLCPP_WARN(get_logger(), "Goal Canceled");
        return;
      }
      // Update sequence
      sequence.push_back(sequence[i] + sequence[i - 1]);
      // Publish feedback
      goal_handle->publish_feedback(feedback); // 4. feedback을 publish하는 publish_feedback 함수도 가지고 있다.
      RCLCPP_INFO(get_logger(), "Publish Feedback");

      loop_rate.sleep();
    }
    // Check if goal is done
    if (rclcpp::ok()) {
      result->sequence = sequence;
      goal_handle->succeed(result);
      RCLCPP_INFO(get_logger(), "Goal Succeeded");
    }
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);

  auto server_node = std::make_shared<FBActionServer>();
  rclcpp::spin(server_node);

  rclcpp::shutdown();
  return 0;
}
```

## Action Client 작성

```cpp
// Copyright 2018 Open Source Robotics Foundation, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <chrono>
#include <cinttypes>
#include <memory>

// Deduction
#include <typeinfo>

#include "custom_interfaces/action/fibonacci.hpp"
#include "rclcpp/rclcpp.hpp"

// action client를 생성하기 위해 필요하다.
#include "rclcpp_action/rclcpp_action.hpp"

using Fibonacci = custom_interfaces::action::Fibonacci;
using GoalHandleFibonacci = rclcpp_action::ClientGoalHandle<Fibonacci>;

class FBActionClient : public rclcpp::Node {
private:
  rclcpp_action::Client<Fibonacci>::SharedPtr m_action_client;
  GoalHandleFibonacci::SharedPtr goal_handle;
  rclcpp::TimerBase::SharedPtr m_timer;

public:
  FBActionClient() : Node("fb_action_client"), goal_handle(nullptr) {
    m_action_client =
        rclcpp_action::create_client<Fibonacci>(this, "fibonacci");
    m_timer = create_wall_timer(std::chrono::milliseconds(500),
                                std::bind(&FBActionClient::send_goal, this));

    RCLCPP_INFO(get_logger(), "FB Action Client Node Created");
  }

  bool is_goal_handle_none() {
    bool is_goal_handle = goal_handle == nullptr ? true : false;
    return is_goal_handle;
  }

  const std::shared_future<GoalHandleFibonacci::WrappedResult>
  get_result_future() {
    auto result_future = m_action_client->async_get_result(goal_handle);
    return result_future;
  }

  const std::shared_future<
      std::shared_ptr<action_msgs::srv::CancelGoal_Response>>
  get_cancel_result_future() {
    auto cancel_result_future = m_action_client->async_cancel_goal(goal_handle);
    return cancel_result_future;
  }

  void send_goal() {
    using namespace std::placeholders;

    // timer cancel required for send goal once
    m_timer->cancel();

    // 10초 동안 기다렸는데 설정한 action server가 존재하지 않는다면 shutdown한다.
    if (!m_action_client->wait_for_action_server(std::chrono::seconds(10))) {
      RCLCPP_ERROR(get_logger(), "Action server not available after waiting");
      rclcpp::shutdown();
    }

    auto goal_msg = Fibonacci::Goal(); // 내부 메시지를 만든다.
    goal_msg.order = 10; // 내부 메시지

    // goal을 send할 때 여러 가지 callback을 묶어서 보낸다. SendGoalOptions를 이용해서 send_goal_options를 생성한다. object 내에 여러 가지 callback을 묶어준다.
    auto send_goal_options =
        rclcpp_action::Client<Fibonacci>::SendGoalOptions();

    // TODO(Swimming): Cancel Logic
    // response가 오면 실행될 goal_response_callback, 피드백이 올 때마다 실행될 feedback_callback, result response가 올 때 실행될 feedback_callback을 std:bind로 묶어준다.(내부 변수이기 때문)
    send_goal_options.goal_response_callback =
        std::bind(&FBActionClient::goal_response_callback, this, _1);
    send_goal_options.feedback_callback =
        std::bind(&FBActionClient::feedback_callback, this, _1, _2);
    send_goal_options.result_callback =
        std::bind(&FBActionClient::result_callback, this, _1);

    m_action_client->async_send_goal(goal_msg, send_goal_options); // goal request. goal_msg와 send_goal_options을 보낸다.
  }

  // 내부에 받게 될 goal response가 성공했는지, 서버로부터 억셉 or 리젝이 됐는지에 대한 로직 
  // future : goal response에 대한 서버로부터의 응답이 들어있다.
  // 세 가지 콜백에 대해 살펴보자.
  void goal_response_callback(
      std::shared_future<GoalHandleFibonacci::SharedPtr> future) {
    goal_handle = future.get();

    if (!goal_handle)
      RCLCPP_ERROR(get_logger(), "Goal was rejected by server");
    else
      RCLCPP_INFO(get_logger(), "Goal accepted by server, waiting for result");
  }

  // feedback 메시지가 올 때마다 출력한다.
  void feedback_callback(GoalHandleFibonacci::SharedPtr,
                    const std::shared_ptr<const Fibonacci::Feedback> feedback) {
    RCLCPP_WARN(get_logger(), "Next number in sequence received: ");

    for (auto number : feedback->partial_sequence)
      RCLCPP_INFO(get_logger(), "%d", number);
  }

  // 서버로부터 마지막 응답. 예약된 SUCCEEDED, ABORTED, CANCELED를 사용하여 각 경우에 따른 대응을 정의한다.
  void result_callback(const GoalHandleFibonacci::WrappedResult &result) {
    switch (result.code) {
    case rclcpp_action::ResultCode::SUCCEEDED:
      break;
    case rclcpp_action::ResultCode::ABORTED:
      RCLCPP_ERROR(get_logger(), "Goal aborted");
      rclcpp::shutdown();
      return;
    case rclcpp_action::ResultCode::CANCELED:
      rclcpp::shutdown();
      RCLCPP_WARN(get_logger(), "Goal canceled");
      return;
    default:
      RCLCPP_ERROR(get_logger(), "Unknown result code");
      return;
    }

    RCLCPP_WARN(get_logger(), "Result received: ");

    for (const auto number : result.result->sequence)
      RCLCPP_INFO(get_logger(), "%d", number);

    rclcpp::shutdown();
  }
};

int main(int argc, char **argv) {
  rclcpp::init(argc, argv);

  // 노드 생성 -> timer에 의해 0.5s 뒤에 send_goal이 실행된다.
  // goal_response 도착 시 result resopnse future를 받는다.
  // 받은 future를 통해 spin_until_future_complete을 실행시키고, 3초 안에 result를 받지 못하면 cancel이 시작된다.
  auto client_node = std::make_shared<FBActionClient>(); // 노드 생성

  while (rclcpp::ok()) {
    // 계속 갱신
    // send_goal 트리거
    // goal callback이 실행되어 goal_handle을 받게 되나. 
    // get_result future를 받는다.
    // 3초 안에 안 받아오면 cancel 요청
    rclcpp::spin_some(client_node); // 5초 동안 갱신

    if (!client_node->is_goal_handle_none()) { // goal response가 도착하면 goal_handle을 받는다.
      auto result_future = client_node->get_result_future(); // result에 대한 future를 받는다.
      auto wait_result = rclcpp::spin_until_future_complete(
          client_node, result_future, std::chrono::seconds(3)); // future를 3초 안에 못 받아오면 

      if (wait_result == rclcpp::executor::FutureReturnCode::TIMEOUT) { // timeout
        RCLCPP_INFO(client_node->get_logger(), "Canceling goal"); // 목표를 취소한다.
        // Cancel the goal since it is taking too long

        auto cancel_result_future = client_node->get_cancel_result_future(); // cancel에 대한 future가 success면 정상, 그렇지 않으면 문제
        if (rclcpp::spin_until_future_complete(client_node,
                                               cancel_result_future) !=
            rclcpp::executor::FutureReturnCode::SUCCESS) {
          RCLCPP_ERROR(client_node->get_logger(), "failed to cancel goal");
          rclcpp::shutdown();
          return 1;
        }

        RCLCPP_INFO(client_node->get_logger(), "goal is being canceled");

        while (rclcpp::ok())
          rclcpp::spin_some(client_node);
      } else if (wait_result != rclcpp::executor::FutureReturnCode::SUCCESS) {
        RCLCPP_ERROR(client_node->get_logger(), "failed to get result");
        rclcpp::shutdown();
        return 1;
      }
    }
  }

  rclcpp::shutdown();
  return 0;
}
```

## Reference

김수영 대표 강의 - 17강
