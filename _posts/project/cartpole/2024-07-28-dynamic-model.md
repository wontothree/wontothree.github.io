---
title: "[Cart Pole] Dynamic Model"
excerpt:
categories:
  - cartpole
---
Cart Pole을 수학적으로 모델링하자.

# Assumptions

- 카트와 바닥 간의 마찰은 없다고 가정한다.
- 카트와 막대는 모두 질량 분포가 일정하여 막대의 중력이 막대의 기하학적 중심에 작용한다고 가정한다.

# Dynamic Model

뉴턴 역학을 이용해서 inverted pendulum을 모델링할 수 있다.

![](../../../img/cartpole/cartpole-modeling.png){: .align-center width="400" height="200"}

![](../../../img/cartpole/cartpole-modeling-2.png){: .align-center width="400" height="200"}

- $x$ : Distance of cart from initial position [$m$]
- $\theta$ : Tilt angle of rod [$rad$]
- $M$ : Mass of Cart [$kg$]
- $m$ : Mass of rod [$kg$]
- $I$ : Inertia of Cart [kg $\cdot m^2$]
- $L$ : Length of rod [$m$]
- $F$ : Force applied at cart [$N$]

![](../../../img/cartpole/free-body-diagram.png){: .align-center width="400" height="200"}

카트와 막대 간의 반력을 $R$이라 정의하자.

뉴턴 운동 법칙과 돌림힘 법칙을 적용하자.

<div class="latex-container">
  $$
  \begin{align}
    & \sum F_x = R_x = m\ddot{x} \\
    & \sum F_y = R_y - mg = m \ddot{y_m} \\
    & R_x \dfrac{L}{2} \cos\theta + R_y \dfrac{L}{2}\sin\theta = I\ddot{\theta} \\
    & \sum F_x = F - R_x = M\ddot{x}
  \end{align}
  $$
</div>

![](../../../img/cartpole/distance-relation.png){: .align-center width="400" height="200"}

<div class="latex-container">
  $$
  \begin{align}
    & x_m = x - \dfrac{L}{2} \sin\theta \\
    & y_m = \dfrac{L}{2} \cos\theta \\
  \end{align}
  $$
</div>

5, 6번 식을 미분한다.

<div class="latex-container">
  $$
  \begin{align*}
    & \dot{x}_m = \dot{x} - \dfrac{L}{2} \dot{\theta} \cos\theta \\
    & \dot{y}_m = -\dfrac{L}{2} \dot{\theta} \sin\theta \\
    & \ddot{x}_m = \ddot{x} + \dfrac{L}{2} \dot{\theta}^2 \sin\theta - \dfrac{L}{2} \ddot{\theta} \cos\theta \\
    & \ddot{y}_m = -\dfrac{L}{2} \dot{\theta}^2 \cos\theta - \dfrac{L}{2} \ddot{\theta} \sin\theta
  \end{align*}
  $$
</div>

이를 1, 2번 식에 대입한다.

<div class="latex-container">
  $$
  \begin{align*}
    & R_x = m  \left[ \ddot{x} + \dfrac{L}{2} \dot{\theta}^2 \sin\theta - \dfrac{L}{2} \ddot{\theta} \cos\theta \right] \\
    & R_y = mg + m \left[ -\dfrac{L}{2} \dot{\theta}^2 \cos\theta - \dfrac{L}{2} \ddot{\theta} \sin\theta \right] \\
  \end{align*}
  $$
</div>

이를 3, 4번 식에 대입한다.

<div class="latex-container">
  $$
  \begin{align*}
    & I \ddot{\theta} = m \ddot{x} \dfrac{L}{2} \cos\theta - m \left( \dfrac{L}{2} \right)^2 \ddot{\theta} + mg \left( \dfrac{L}{2} \right) \sin\theta \\

    & (M + m) \ddot{x} + m \dfrac{L}{2} (\dot{\theta}^2 \sin\theta - \ddot{\theta} \cos\theta) = F
  \end{align*}
  $$
</div>

정리하여 다음 식을 얻는다.

<div class="latex-container">
  $$
  \begin{align*}
    & \ddot{\theta} = \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2\theta}  \left[ -m^2 \left(\dfrac{L}{2}\right)^2 \dot{\theta}^2 \sin\theta \cos\theta + (M + m) mg \left(\dfrac{L}{2}\right) \sin\theta + m \left(\dfrac{L}{2}\right) \cos\theta F \right] \\
    & \ddot{x} = \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2\theta} \left[  m^2 \left(\dfrac{L}{2}\right)^2 \sin\theta \cos\theta g - m \left(I + m \left(\dfrac{L}{2}\right)^2 \right)\left(\dfrac{L}{2}\right) \sin\theta \dot{\theta}^2 + \left(I + m \left(\dfrac{L}{2}\right)^2 \right) F \right] \\
  \end{align*}
  $$
</div>

# Continuous State Space Model

상태 변수와 입력을 다음과 같이 정의한다.

<div class="latex-container">
  $$
  \mathbb{x}(t) =
  \begin{bmatrix}
    x_1(t) \\
    x_2(t) \\
    x_3(t) \\
    x_4(t) \\
  \end{bmatrix} =
  \begin{bmatrix}
    x(t) \\
    \dot{x}(t) \\
    \theta(t) \\
    \dot{\theta}(t) \\
  \end{bmatrix}, \;\;\;
  u(t) = F(t)
  $$
</div>

그러면 정리한 식을 $\dot{x} = f(x, u)$ 꼴의 비선형 상태 공간 모델로 나타낼 수 있다.

<div class="latex-container">
  $$
  \begin{align*}
    \dot{x_1} &= x_2 \\
    \dot{x_2} &= \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2x_3} \left[  m^2 \left(\dfrac{L}{2}\right)^2 \sin x_3 \cos x_3 g - m \left(I + m \left(\dfrac{L}{2}\right)^2 \right)\left(\dfrac{L}{2}\right) \sin x_3 x_4^2 + \left(I + m \left(\dfrac{L}{2}\right)^2 \right) u \right] \\
    \dot{x_3} &= x_4 \\
    \dot{x_4} &= \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2 x_3}  \left[ -m^2 \left(\dfrac{L}{2}\right)^2 x_4^2 \sin\theta \cos x_3 + (M + m) mg \left(\dfrac{L}{2}\right) \sin x_3 + m \left(\dfrac{L}{2}\right) \cos x_3 u \right] \\
  \end{align*}
  $$
</div>

이를 $\dot{x} = f(x) + g(x) u$ 꼴로 나타내자.

<div class="latex-container">
  $$
  \begin{bmatrix}
    \dot{x_1} \\
    \dot{x_2} \\
    \dot{x_3} \\
    \dot{x_4} \\
  \end{bmatrix}
  =
  \begin{bmatrix}
    x_2 \\
    \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2x_3} \left[  m^2 \left(\dfrac{L}{2}\right)^2 \sin x_3 \cos x_3 g - m \left(I + m \left(\dfrac{L}{2}\right)^2 \right)\left(\dfrac{L}{2}\right) \sin x_3 x_4^2 \right] \\
    x_4 \\
    \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2 x_3}  \left[ -m^2 \left(\dfrac{L}{2}\right)^2 x_4^2 \sin x_3 \cos x_3 + (M + m) mg \left(\dfrac{L}{2}\right) \sin x_3 \right] \\
  \end{bmatrix}
  +
  \begin{bmatrix}
    0 \\
    I + m \left(\dfrac{L}{2}\right)^2 \\
    0 \\
    m \left(\dfrac{L}{2}\right) \cos x_3 \\
  \end{bmatrix}
  u
  $$
</div>

# Discrete State Space Model

Forward Euler Method를 이용하면 다음과 같이 미분 방정식을 차분 방정식으로 바꿀 수 있다.

샘플링 주기를 $T$라 하자.

<div class="latex-container">
  $$
  \dot{x} = f(x, u), \;\;\; x_{k+1} = x_k + T \cdot f(x_k, u_k) \\
  $$
</div>

<div class="latex-container">
  $$
  \begin{bmatrix}
    x_1^{k+1} \\
    x_2^{k+1} \\
    x_3^{k+1} \\
    x_4^{k+1} \\
  \end{bmatrix}
  =
  \begin{bmatrix}
    x_1^{k} \\
    x_2^{k} \\
    x_3^{k} \\
    x_4^{k} \\
  \end{bmatrix}
  +
  T
  \begin{bmatrix}
    x_2^k \\
    \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2 x_3^k} \left[  m^2 \left(\dfrac{L}{2}\right)^2 \sin x_3^k \cos x_3^k g - m \left(I + m \left(\dfrac{L}{2}\right)^2 \right)\left(\dfrac{L}{2}\right) \sin x_3^k {x_4^k}^2 \right] \\
    x_4^k \\
    \dfrac{1}{(M+m) \left( I + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2 x_3^k}  \left[ -m^2 \left(\dfrac{L}{2}\right)^2 {x_4^k}^2 \sin x_3^k \cos x_3^k + (M + m) mg \left(\dfrac{L}{2}\right) \sin x_3^k \right] \\
  \end{bmatrix}
  +
  T
  \begin{bmatrix}
    0 \\
    I + m \left(\dfrac{L}{2}\right)^2 \\
    0 \\
    m \left(\dfrac{L}{2}\right) \cos x_3^k \\
  \end{bmatrix}
  u
  $$
</div>