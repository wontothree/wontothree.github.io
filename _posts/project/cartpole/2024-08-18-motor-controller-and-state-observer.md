---
title: "[Cart Pole] Motor Controller and State Observer"
categories:
  - cartpole
---
![](../../../img/cartpole/cartpole-block-diagram.png){: .align-center }

설계에 있어 다른 부분은 해야 할 일이 명확히 있는 반면 이 포스트에서 다루는 내용은 설계자에 따라 달라질 수 있다.

전체 시스템을 설계하며 가장 많이 했던 고민 중 하나가 어디까지 python에서 연산할 것이고 어디까지 arduino에서 연산할 것인지에 대한 내용이었다.

# Stepper Motor Controller

- 섬세한 제어를 하기 위해 12상 여자 방식을 사용하여 제어한다.

현재 시점을 k라고 하고, 제어주기를 T라고 하자.

1. MPC Controller로부터 현재 시점 k에서 cart pole 계의 목표 합력 $u(k) = F(k) \; N$가 주어진다.
2. 현재 시점 k에서 cart pole 계의 목표 선가속도 $a(k) = F(k) / (m + M) \;m/s^2$ 를 구한다.
3. 현재 시점 k에서 목표 각가속도 $\alpha (k) = a(k) / (0.01) \; rad/s^2$를 구한다.
4. 현재 시점 k에서 stepping motor의 목표 각속도 $\omega (k) = \omega (k-1) + T \alpha (k) \; rad/s$를 구한다.
5. 현재 시점 k에서 stepping motor의 목표 각속도 $\omega (k) \; rad/s = 360 / 400 \; \omega (k) \; step/s$를 step/s 단위로 변환한다.
6. 현재 시점 k에서 stepping motor가 1 step 움직이는 주기 $1/\omega(k) \; s/step$를 구한다.
7. 그 주기 T로 stepping motor를 동작시킨다.

# State Observer

- Absolute Rotary Encoder를 통해 angle of pole을 측정한다. 이때 Arduino UNO R3를 사용한다.
- Photo Interrupt Sensor와 Stepper Motor를 통해 position of cart를 구한다. 이때 Arduino UNO R4를 사용한다.

$$
\mathbb{x}(k) =
\begin{bmatrix}
  x_1(k) \\
  x_2(k) \\
  x_3(k) \\
  x_4(k) \\
\end{bmatrix} =
\begin{bmatrix}
  x(k) \\
  \theta(k) \\
  v(k) \\
  \omega(k) \\
\end{bmatrix}
$$

- $x$ : Position of Cart
- $\theta$ : Angle of Pole
- $v$ : Velocity of Cart
- $\omega$ : Angular Velocity of Pole

In order to apply the NMPC strategy, we must bave access to the state at time $k$.

While the state of cart position $x(k)$ and pole angle $\theta (k)$ are measured directly by stepper motor and encoder sensor respectly, we need to estimate the  cart velocity $v(k)$ and pole angular velocity $w(k)$.

We simply approximate the time derivatie via a finite difference approximation.

$$
v(k) = \dfrac{x(k) - x(k-1)}{T}, \;\;\; \omega(k) = \dfrac{\theta (k) - \theta (k-1)}{T}
$$

# 임시

## Constant

- Timing Pulley Radius : 1cm
- 1 rotation = 400 step
- System Clock of Arduino Uno R3 : 16M Hz (62.5ns)
- 프리 스케일러 (타이머의 클럭 신호를 얼마나 나누어 사용할지를 결정하는 값 : 타이머의 주기를 조정하여 타이머가 얼마나 자주 카운트업할지를 결정한다.) : 64
- 1 clock period = 1/(16M/64) = 0.5us
- M + m = 0.211 29 kg

>1 m/s = 100rad/s = 15.915 rotation/s = 6366 step/s = 1 step / 157us = 1step/(1 clock * 314)