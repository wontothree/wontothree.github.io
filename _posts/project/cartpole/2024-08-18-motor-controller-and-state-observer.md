---
title: "[Cart Pole] Motor Controller and State Observer"
categories:
  - cartpole
---
![](../../../img/cartpole/cartpole-block-diagram.png){: .align-center }

설계에 있어 다른 부분은 해야 할 일이 명확히 있는 반면 이 포스트에서 다루는 내용은 설계자에 따라 달라질 수 있다.

전체 시스템을 설계하며 가장 많이 했던 고민 중 하나가 어디까지 python에서 연산할 것이고 어디까지 arduino에서 연산할 것인지에 대한 내용이었다.

Processor

- Arduino UNO R3 : 16M Hz (62.5ns)
- Arduino UNO R4 : 38M Hz

# Stepper Motor Controller

## High Level Motor Controller

- 섬세한 제어를 하기 위해 12상 여자 방식을 사용하여 제어한다. : 1 rotation = 400 step
- 64 분주 프리스케일러를 사용한다. : 1 clock period = 1/(16M/64) = 0.5us

현재 시점을 k라고 하고, 제어주기를 T라고 하자.

1. MPC Controller로부터 현재 시점 k에서 cart pole 계의 목표 합력 $u(k) = F(k) \; N$가 주어진다.
2. 현재 시점 k에서 cart pole 계의 목표 선가속도 $a(k) = u(k) / (M + m) \;m/s^2$ 를 구한다.
3. 현재 시점 k에서 목표 각가속도 $\alpha (k) = a(k) / (0.01 m) \; rad/s^2$를 구한다.
4. 현재 시점 k에서 stepping motor의 목표 각속도 $\omega (k) = \omega (k-1) + (\text{sampling control periode}) \; \alpha (k) \; rad/s$를 구한다.
5. 현재 시점 k에서 stepping motor의 목표 각속도 $\omega (k) \; rad/s = 2\pi / 400 \; \omega (k) \; step/s$를 step/s 단위로 변환한다.
6. 현재 시점 k에서 stepping motor가 1 step 움직이는 주기 $\text{(step interval period)} = 1/\omega(k) \; s/step$를 구한다.
7. 그 주기 T에 해당하는 $(\text{step interval counts}) = (\text{step interval period}) / (\text{clock interval period})$를 구한다.

1~3은 python에서 연산을 하고, 4~7은 arduino에서 연산을 한다.

- Target linear acceleration

$$
a(K) = \dfrac{u(K)}{M + m} = \dfrac{u(K)}{0.21129} \;\;\; m/s^2
$$

- Target angular acceleration

$$
\alpha(K) = \dfrac{a(K)}{0.01m} = 473.283 u(K) \;\;\; \text{rad}/s^2
$$

- Target angular velocity of rad/s

$$
\omega (k) = \omega (k-1) + \dfrac{T}{n} \alpha(K) \;\;\; \text{rad}/s
$$

Small k is different from large K

- Target angular velocity of step/s

$$
\omega (k) = \dfrac{400}{2\pi} \left[ \omega (k-1) + \dfrac{T}{n} \alpha(K) \right] \;\;\; \text{step}/s
$$

- Target step interval period

$$
(\text{target step interval period}) = \dfrac{1}{\omega (k)} = \dfrac{1}{\dfrac{400}{2\pi} \left[ \omega (k-1) + \dfrac{T}{n} \alpha(K) \right]} \;\;\; s/\text{step}
$$

- Target step interval counts

$$
(\text{target step interval counts}) = \dfrac{16M/64}{\omega (k)} = \dfrac{16M/64}{\dfrac{400}{2\pi} \left[ \omega (k-1) + \dfrac{T}{n} \alpha(K) \right]} = \dfrac{3926.990 816}{\omega (k-1) + \dfrac{T}{n} \alpha(K)} \;\;\; \text{clock/step}
$$

## Low Level Motor Controller

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

>1 m/s = 100rad/s = 15.915 rotation/s = 6366 step/s = 1 step / 157us = 1step/(1 clock * 314)