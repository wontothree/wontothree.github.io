---
title: "[Physics] Lagange Dynamics"
categories:
  - physics
---
강체의 동역학 식을 얻어내는 두 가지 방법

1. Newton-Euler
2. Euler-Lagange Equation

$$
L = \dfrac{\partial f}{\partial y} - \dfrac{d}{d x} \dfrac{\partial f}{\partial y'}
$$

변분법 : 다음 식에 해당하는 y를 찾는 것

$$
J = \int_{x_1}^{x_2} f(y(x), \dot{y}(x), x) ds
$$

변분 원리는 J를 최소화하는 y를 찾는 것이 목적이다.

시작점과 끝점은 고정되어 있다.

$$
J = \int_1^2 ds = \int_1^2 ds \sqrt{1 + (\dfrac{dy}{dx}})^2
\\
f(y(x), \dot{y}(x), x) = \sqrt{1 +(\dfrac{dy}{dx}})^2
$$

varied path를 최소화하고 싶다.

$$
J(\alpha) = \int_{x_1}^{x_2} f(y(x, a), \dot{y}(x, a), x) ds
\\

\dfrac{d}{d\alpha} \int_{x_1}^{x_2} f(y(x, a), \dot{y}(x, a), x) ds = 0
\\
\int_{x_1}^{x_2} \left[ \dfrac{\partial f}{\partial y} \dfrac{\partial y}{\partial \alpha} + \dfrac{\partial f}{\partial y'} \dfrac{\partial y'}{\partial \alpha}\right] dx
= \int_{x_1}^{x_2} \left[ \dfrac{\partial f}{\partial y} - \dfrac{d}{dx} \dfrac{\partial f}{\partial y'} \right] dx
$$

therefore

Euler Equation

$$
\dfrac{\partial f}{\partial y} - \dfrac{d}{dx} \dfrac{\partial f}{\partial y'} = 0
$$

$$
f = \sqrt{1 + y'^2}
$$

$$
\dfrac{\partial f}{\partial y} = 0, \;\;\;
\dfrac{\partial f}{\partial y'} = \dfrac{y'}{\sqrt{1 + y^2}}
$$

therefore

$$
\dfrac{y'}{\sqrt{1 + y'^2}} = c
\\
y' = c \sqrt{1 + y'^2} = \sqrt{c^2 + c^2 y'^2}
\\
\dfrac{dy}{dx} = \dfrac{c}{\sqrt{1 - c^2}}
$$

Euler 식에서 f 대신에 L(lagrangian) = T(kinetic energy) - V(potential energy)를 대입하면 Lagrange equation이라고 한다.

[경험 법칙] 헤밀통의 least action principle : 고전 역학에서 모든 법칙은 lagrangian을 최소화하는 방향으로 움직인다.

$$
J = \int_{t_1}^{t_2} L dt = \int_{t_1}^{t_2} (T - V) dt
$$

강체에 힘을 주었을 때 어떻게 움직일까? J를 최소화하는 방향으로 움직인다.

V + H : Hamiltonian

이상적으로 보존되기 때문에 의미가 없다.

V - H가 분석할 의미가 있더라. 이걸 통해 시스템의 거동을 묘사하자.

# Example

$$
f = T - V
= \dfrac{1}{2} m \dot{y}^2 - mgy
$$

$$
\dfrac{\partial f}{\partial t} - \dfrac{d}{d t} \dfrac{\partial f}{\partial y'} = -mg - m\ddot{y} = 0
$$

$$
F = -mg
$$

# Question

- 알파에 대한 식으로 나타낼 수 있는 것은 일차함수만을 다룬다는 것인가?
