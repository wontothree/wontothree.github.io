---
title: "[C++] namespace, using, struct"
categories:
  - cpp
---
# namespace

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
    static constexpr int dim = 5;
};  // namespace STATE_SPACE
```

- namespace : C++에서 이름 충돌을 방지하고 코드를 조직화하기 위한 방법. 동일한 이름을 가진 여러 함수나 변수들이 다른 네임스페이스 안에서 존재할 수 있다.
- constexpr : 컴파일 시간에 평가될 수 있는 상수. 해당 네임스페이스 안에서 전역적으로 접근 가능한 상수를 만들 수 있다.
- x, y, yaw, vel, steer은 각각 인덱스 0, 1, 2, 3, 4에 해당한다.
- dim : 상태 벡터의 차원 수를 나타낸다. 이 경우 상태 벡터는 5차원이다.

# using

C++에서 using 키워드는 타입에 별칭을 정의하는 데 사용된다. 코드의 가독성을 높이고 타입 정의를 더 명확하게 할 수 있다.

Eigen::Matrix : 행렬과 벡터 계산을 위한 템플릿 클래스

- 첫 번째 인자 : 자료형(double)
- 두 번째 인자 : 행의 개수(STATE::dim(=5))
- 세 번째 인자 : 열의 개수(1)

```cpp
namespace cpu {
    using State = Eigen::Matrix<double, STATE_SPACE::dim, 1>;
}  // namespace cpu
```

# struct

C++에서 구조체는 관련된 데이터를 그룹화하고 관리하기 위한 데이터 구조이다. 구조체는 변수(멤버 변수)와 함수(멤버 함수)를 그룹화하여 하나의 단위로 처리할 수 있도록 한다.

다음 예제에서는 Params라는 구조체가 Common과 ForwardMPPI라는 두 개의 하위 구조체를 멤버로 포함하고 있다. 이를 통해 두 개의 관련된 데이터 그룹을 관리한다.

```cpp
struct Params {
    struct Common {
        int thread_num;
        int prediction_step_size;
        double prediction_interval;
        double steer_delay;
        double steer_1st_delay;
        bool is_localize_less_mode;
        double reference_speed;
        double max_steer_angle;
        double min_steer_angle;
        double max_accel;
        double min_accel;
        std::string speed_prediction_mode;
        double lr;
        double lf;
        double q_dist;
        double q_angle;
        double q_speed;
        double collision_weight;
        double q_terminal_dist;
        double q_terminal_angle;
        double q_terminal_speed;
    };
    Common common;

    struct ForwardMPPI {
        int sample_batch_num;
        double lambda;
        double alpha;
        double non_biased_sampling_rate;
        double steer_cov;
        // double accel_cov;
        int sample_num_for_grad_estimation;
        double steer_cov_for_grad_estimation;
        int num_itr_for_grad_estimation;
        double step_size_for_grad_estimation;
    };
    ForwardMPPI forward_mppi;
}
```

# Reference

[mppi_controller/include/mppi_controller/common.hpp](https://github.com/kohonda/proj-svg_mppi/blob/main/src/mppi_controller/include/mppi_controller/common.hpp)
