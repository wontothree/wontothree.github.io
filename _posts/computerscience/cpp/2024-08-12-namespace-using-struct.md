---
title: "[C++] namespace, using, struct"
categories:
  - cpp
---
## namespace

C++에서 namespace를 정의하여 관련된 상수들을 그룹화할 수 있다.

이 namespace는 시스템이나 애플리케이션의 상태를 구성하는 여러 요소에 대한 인덱스를 명시적으로 관리하기 위해 사용된다.

5차원 상태 공간을 설명하는 예시이다.

```cpp
namespace STATE_SPACE {
    static constexpr int x = 0;
    static constexpr int y = 1;
    static constexpr int yaw = 2;
    static constexpr int vel = 3;
    static constexpr int steer = 4;
    static con