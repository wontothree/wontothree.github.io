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
  v \\
  \theta \\
  w \\
\end{bmatrix}
$$

- $x$ : Position of Cart
- $v$ : Velocity of Cart
- $\theta$ : Angle of Pole
- $w$ : Angular Velocity of Pole

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

## Constant

- Timing Pulley Radius : 1cm
- 1 rotation = 400 step
- System Clock of Arduino Uno R3 : 16M Hz (62.5ns)
- 프리 스케일러 (타이머의 클럭 신호를 얼마나 나누어 사용할지를 결정하는 값 : 타이머의 주기를 조정하여 타이머가 얼마나 자주 카운트업할지를 결정한다.) : 64
- 1 clock period = 1/(16M/64) = 0.5us
- M + m = 0.211 29 kg

1 m/s = 100rad/s = 15.915 rotation/s = 6366 step/s = 1 step / 157us = 1step/(1 clock * 314)
