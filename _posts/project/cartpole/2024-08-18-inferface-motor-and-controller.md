---
title: "[Cart Pole] Interface of Motor Controller and High-Level Controller"
categories:
  - cartpole
---
1. Motor Controller to High-Level Controller
2. High-Level Controller to Motor Controller

# Motor Controller to High-Level Controller

모터의 정보를 바탕으로 controller에게 position of cart와 velocity of cart를 줘야 한다.

## State Measurement and Estimation

상위 제어기는 $k$ 시점에서 현재 상태에 대한 정보를 필요로 한다.

$$
\begin{bmatrix}
  x \\
  \dot{x} \\
  \theta \\
  \dot{\theta} \\
\end{bmatrix}
$$

- $x$ : Position of Cart
- $\dot{x}$ : Velocity of Cart
- $\theta$ : Angle of Pole
- $\dot{\theta}$ : Angular Velocity of Pole

The state of angle $\theta (k)$ and angular velocity $\dot{\theta}(k)$ are measured directly by absolute rotary encoder sensor.

We need to estimate the cart position $x(k)$ and cart velocity $\dot{x}(k)$.

# High-Level Controller to Motor Controller

현재 시점을 k라고 하고, 제어주기를 T라고 하자.

1. High-Level Controller로부터 현재 시점 k에서 cart pole 계의 목표 합력 $u(k) = F(k)$가 주어진다.
2. 현재 시점 k에서 cart pole 계의 목표 가속도 $a(k) = F(k) / (m + M)$를 구한다.
3. 현재 시점 k에서 cart pole 계의 목표 속도 $v(k) = v(k-1) + T a(k)$를 구한다.
4. 현재 시점 k에서 stepping motor의 목표 각속도 step/s를 구한다.
5. 현재 시점 k에서 stepping motor가 1 step 움직이는 주기를 결정한다.
6. 그 주기로 stepping motor를 동작시킨다.
