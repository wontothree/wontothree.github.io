---
title: "[C++] Initialization"
categories:
  - cpp
---
두 가지 초기화 방식이 있다.

1. 초기화 리스트
2. 생성자 함수 내부에서 초기화

# 1. 초기화 리스트

```cpp
LocalCostmapGenerator()
: Node("local_costmap_generator"),
  tf_buffer_(this->get_clock()), // tf_buffer_를 생성하고
  tf_listener_(tf_buffer_)       // tf_listener_로 tf_buffer_에 tf 정보를 채움
{
    // 초기화 코드
}
```

- 초기화 리스트를 사용하면 객체의 멤버 변수들이 생성될 때 바로 초기화되기 때문에 객체 생성 과정에서 불필요한 복사를 피할 수 있다.
- 클래스 멤버 변수들이 포인터나 복사가 비용이 큰 객체일 때 유리하다.
- 상수 멤버나 참조 멤버 변수를 초기화할 때는 반드시 초기화 리스트를 사용해야 한다. 그렇지 않으면 컴파일 에러가 발생한다.
- 코드가 더 간결하고, 객체가 초기화될 때 바로 필요한 값을 설정할 수 있다.

# 2. 생성자 함수

```cpp
LocalCostmapGenerator()
: Node("local_costmap_generator")
{
    tf_buffer_ = std::make_shared<tf2_ros::Buffer>(this->get_clock()); 
    tf_listener_ = std::make_shared<tf2_ros::TransformListener>(*tf_buffer_);
}
```

- 더 복잡한 초기화 논리를 적용할 수 있다. 예를 들어 초기화 과정에서 특정 조건에 따라 다른 값을 설정할 수 있다.
- 멤버 변수가 많을 때 생성자 내부에서 초기화하는 것이 초기화 리스트보다 더 읽기 쉽다.
- 생성자에서 복잡한 초기화 로직이 필요하거나 초기화 순서에 따라 다른 멤버 변수를 사용해야 할 경우 유용하다.