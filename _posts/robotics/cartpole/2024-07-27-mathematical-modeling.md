---
title: "[Cart Pole] Mathematical Modeling"
excerpt:
categories:
  - cartpole
---
## Assumptions

- 카트와 바닥 간의 마찰은 없다고 가정한다.
- 카트와 막대는 모두 질량 분포가 일정하여 막대의 중력이 막대의 기하학적 중심에 작용한다고 가정한다.

## Mathematical Modeling

![](../../../img/cartpole/cartpole-modeling.png)

![](../../../img/cartpole/cartpole-modeling-2.png)

- $x$ : Distance of cart from initial position [$m$]
- $\theta$ : Tilt angle of rod [$rad$]
- $M$ : Mass of Cart [$kg$]
- $m$ : Mass of rod [$kg$]
- $I$ : Inertia of Cart [kg $\cdot m^2$]
- $L$ : Length of rod [$m$]
- $F$ : Force applied at cart [$N$]

![](../../../img/cartpole/free-body-diagram.png)

카트와 막대 간의 반력을 $R$이라 정의하자.

뉴턴 운동 법칙과 돌림힘 법칙을 적용하자.

$$
\begin{align}
  & \sum F_x = R_x = m\ddot{x} \\
  & \sum F_y = R_y - mg = m \ddot{y_m} \\
  & R_x \dfrac{L}{2} \cos\theta + R_y \dfrac{L}{2}\sin\theta = I\ddot{\theta} \\
  & \sum F_x = F - R_x = M\ddot{x}
\end{align}
$$

![](../../../img/cartpole/distance-relation.png)

$$
\begin{align}
  & x_m = x - \dfrac{L}{2} \sin\theta \\
  & y_m = \dfrac{L}{2} \cos\theta \\
\end{align}
$$

$$
\begin{align*}
  & \dot{x}_m = \dot{x} - \dfrac{L}{2} \dot{\theta} \cos\theta \\
  & \dot{y}_m = -\dfrac{L}{2} \dot{\theta} \sin\theta \\
  & \ddot{x}_m = \ddot{x} + \dfrac{L}{2} \dot{\theta}^2 \sin\theta - \dfrac{L}{2} \ddot{\theta} \cos\theta \\
  & \ddot{y}_m = -\dfrac{L}{2} \dot{\theta}^2 \cos\theta - \dfrac{L}{2} \ddot{\theta} \sin\theta
\end{align*}
$$

$$
\begin{align*}
  & R_x = m  \left[ \ddot{x} + \dfrac{L}{2} \dot{\theta}^2 \sin\theta - \dfrac{L}{2} \ddot{\theta} \cos\theta \right] \\
  & R_y = mg + m \left[ -\dfrac{L}{2} \dot{\theta}^2 \cos\theta - \dfrac{L}{2} \ddot{\theta} \sin\theta \right] \\
\end{align*}
$$

Therefore,

$$
\begin{align*}
  & \ddot{\theta} = \dfrac{1}{(M+m) \left( l + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2\theta}  \left[ -m^2 \left(\dfrac{L}{2}\right)^2 \dot{\theta}^2 \sin\theta \cos\theta + (M + m) mg \left(\dfrac{L}{2}\right) \sin\theta + m \left(\dfrac{L}{2}\right) \cos\theta F \right] \\
  
  & \ddot{x} = \dfrac{1}{(M+m) \left( l + m (L/2)^2 \right) - m^2 (L/2)^2 \cos^2\theta} \left[  m^2 \left(\dfrac{L}{2}\right)^2 \sin\theta \cos\theta g - m \left(I + m \left(\dfrac{L}{2}\right)^2 \right)\left(\dfrac{L}{2}\right) \sin\theta \dot{\theta}^2 + \left(I + m \left(\dfrac{L}{2}\right)^2 \right) F \right] \\
\end{align*}
$$
