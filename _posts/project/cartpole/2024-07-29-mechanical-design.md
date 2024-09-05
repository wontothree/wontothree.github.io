---
title: "[Cart Pole] Mechanical Design"
excerpt:
categories:
  - cartpole
---
# Object

- 더 많은 비용을 지불하더라도 최대한 단순하게 만든다.
- 보수적으로 만든다. 안전하게 만들자. 성공하기 높은 방식으로 만들자.
- 만들기 쉬운 방식으로 만들자.

# 3D Modeling

![](../../../img/cartpole/cartpole-3d.png){: .align-center width="400" height="200"}

# Materials

# Sheet Metal

Linear Guide Base

![](../../../img/cartpole/linear_guide_base.png){: .align-center width="400" height="200"}

Motor Bracket

![](../../../img/cartpole/motor_bracket.png){: .align-center width="400" height="200"}

제조 방식

- 밀링 : 통 알류미늄을 파낸다. 비싸다.
- 절곡 : 철을 접는다.
- 용접 : 분리된 조각을 붙인다.

종류

- 쇠(철)
  - 알류미늄보다 강도가 높다.
  - 알류미늄보다 3배 무겁다.
  - 녹이 슬어서 페인트 칠을 해야 하기 때문에 도장 값이 따로 붙는다.
- 알류미늄
  - 원자재 값이 쇠보다 비싸다. 하지만 소량으로 주문할 때는 쇠보다 저렴하다.

# Measurement

- Mass of cart ($M$) : 0.123kg (122.61g)
- Mass of pole ($m$) : 0.089kg (88.68g)
- Length of pole ($L$) : 0.4m (40cm)
- Inertia of pole ($I$) : 0.004746 $kg \cdot m^2$

# Inertia

길이가 L이고 질량이 m인 막대기의 한 쪽 끝을 회전축으로 할 때 관성 모멘트를 구하자.

![](../../../img/cartpole/inertia.png){: .align-center width="400" height="200"}

미소 질량은 dm이고 그 요소의 길이는 dx이다.

y축에 대한 막대의 관성 모멘트는 다음과 같이 구할 수 있다.

$dm = \lambda dx, \lambda = \dfrac{m}{L}$이므로

$$
\begin{align*}
  I &= \int r^2 dm = \int_0^{L} x^2 (\lambda dx) = \left[ \dfrac{1}{3} x^3 \lambda \right]_0^L = \dfrac{1}{3}\lambda L^3 = \dfrac{1}{3} m L^2
\end{align*}
$$
