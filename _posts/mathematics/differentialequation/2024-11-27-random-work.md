---
title: "[Differential Equation] Random Walk"
categories:
  - differentialequation
---
# Heat Equation and Random Work

Heat Equation

$$
\dfrac{\partial u}{\partial t} = \dfrac{\partial^2 u}{\partial x^2}
$$

입자는 어떻게 퍼져나갈까? 바람이 불지 않는다면 무작위로 퍼져나갈 것이다.

무작위로 동전을 던져서 앞면이 나오면 1차원 수직선 상에서 오른쪽으로 1칸 이동하고, 뒷면이 나오면 왼쪽으로 1칸 이동하는 상황을 생각하자.

이러한 움직임을 묘사하기 위해 등장한 것이 Galton boad이다.

Brownian Motion...

연속과 미분 가능 사이에 개념들이 존재한다. Ripchiz, Holder norm 등이 그런 것이다.

무작위 운동을 열방정식과 어떻게 연관지을 수 있을까?

$u(x, t + \tau)$: 시점 $t + \tau$에 x라는 지점에 있을 확률

1차원 무작위 운동을 다음 방정식으로 묘사할 수 있다.

$$
u(x, t+ \tau) = \dfrac{1}{2}u(x - h, t) + \dfrac{1}{2}u(x + h, t)
$$

이걸 이용하여 $u$가 열방정식을 만족한다는 것을 보일 수 있다.

$$
u(x, t + \tau) = u(x, t) + \tau u_t(x, t)
$$

$$
\begin{align*}
  u(x, t+ \tau) &= \dfrac{1}{2}u(x - h, t) + \dfrac{1}{2}u(x + h, t) \\
  &= \left[u(x + t) - hu_x(x, t) + \dfrac{h^2}{2}u_{xx}(u, t) + ...\right] + \left[u(x + t) + hu_x(x, t) + \dfrac{h^2}{2}u_{xx}(u, t) + ...\right] \\
  &= 2u(x, t) + h^2u_{xx}(x, t) \\

  u(x, t) + \tau u_t(x, t) &= u(x, t) + \dfrac{h^2}{2}u_{xx}(x, t)
\end{align*}
$$

따라서

$$
u_t(x, t) = \dfrac{h^2}{2\tau} u_{xx}(x, t)
$$

입자의 움직임(random work)가 열방정식으로 나타난다는 것을 확인할 수 있다.

# Diffusion Model

diffusion model은 다음의 방정식에 의해 묘사된다.

$$
dx_t = -x_t dt + \sqrt{2}dw_t
$$

두 항으로 나뉜다.

첫 번째 term은 ordinary differential equation과 관련된 term이다.

$$
dx_t = -x_t dt
$$

이 미분방정식은 0으로 수렴한다.

다음은 brownian motion과 관련된 term이다. diffusion model에서는 diffusion term이라고도 불린다.

$$
\sqrt{2}dw_t
$$

SDE를 PDE로 환원시켜서 풀면 gaussian 형태의 해가 나온다.

$$
x_t \sim u(x, t) \\
X \sim N(0, 1) \\
$$