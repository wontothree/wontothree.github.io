---
title: "[Cart Pole] Mechanical Design and Electronics"
categories:
  - cartpole_
---
Cart Pole Hardware를 만드는 과정에 대한 이야기이다.

Object

- 더 많은 비용을 지불하더라도 최대한 단순하게 만든다.
- 보수적으로 만든다. 안전하게 만들자. 성공하기 높은 방식으로 만들자.
- 만들기 쉬운 방식으로 만들자.

# Mechanical Design

## 3D Modeling

![](../../../img/cartpole/cartpole-3d.png)

## Measurement

![](../../../img/cartpole/physical-property.png){: .align-center }

**Inertia**

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

# Electronics

- Arduino UNO R3, R4
- Unipolar Stepper Motor
- Unipolar Stepper Motor Driver
- Absolute Rotary Encoder
- Photo Interrupt Sensor

Absolute Rotary Encoder를 통해 angle of pole을 측정한다. 이때 Arduino UNO R3를 사용한다.

Photo Interrupt Sensor와 Stepper Motor를 통해 position of cart를 구한다. 이때 Arduino UNO R4를 사용한다.