---
title: "[Differential Equation] Partial Differential Equations and Fourier Series"
categories:
  - differentialequation
---
많은 물리 문제에는 두 개 이상의 독립변수들이 존재한다. 이에 대응되는 수학적 모델은 상미분방정식보다는 편미분방정식과 관련이 있다.

편미분 방정식을 푸는 중요한 방법 중 하나가 변수분리법이다. 변수븐리법은 편미분방정식을 상미분방정식들의 집합으로 바꿀 수 있게 해준다. 이 미분방정식들은 주어진 초기 조건 또는 경계 조건하에서 풀어진다.

# 1. Two Point Boundary Value Problem

- Initial value problem: differential equation and initial condiction at a point
- two point boundary value problem: 종속변수 y와 y의 도함수 값이 서로 다른 두 점에서 주어진다.

$$
y'' + p(x) y' + q(x) y = g(x) \\
y(\alpha) = y_0, \;\;\; y(\beta) = y_1 \\
$$

일반적으로 먼저 미분방정식에 대한 일반해를 찾고, 그 다음에 경계조건들을 이용하여 임의의 상수값을 결정한다.

- homogeneous: g의 값이 모든 x에 대해 영이고 경곗값 $y_0, y_1$도 영이면
- inhomogeneous: homogeneous가 아니면

계수들에 대한 조건이 약해도 초깃값 문제는 확실히 유일한 해를 갖는다. 그러나 이와 비슷한 조건에서 경곗값 문제는 유일한 해를 가질 수도 있지만 해가 없는 경우도 있고 무수히 많은 해를 갖는 경우도 있다.

## Eigenvalue Problem

Non-trivial solution

$$
y'' + \lambda y = 0
$$

$$
y(0) = 0, \;\;\; y(L) = 0 \\
$$

- Eigenvalue: 위 경곗값 문제에서 자명하지 않은 해를 갖지 않는 $\lambda$ 값
- Eigenfunction: 이때의 자명하지 않은 해

위 경곗값 문제의 또 다른 고윳값과 고유함수를 찾아보자. 각각의 경우에 대해 해의 모양이 달라지기 때문에 $\lambda > 0, \lambda = 0, \lambda < 0$의 경우들로 나눠서 생각하자.

# 2.Fourier Series

Fourier serier는 partial differential equation, variable separation, 주기적인 외부 힘이 작용하는 기계 시스템, 전기 시스템에 대한 해석 등과 같은 다양한 분야에 이용된다.

Fourier Series: 주어진 함수를 표현하는 sine function이나 cosine function들의 급수

1. 주어진 함수가 푸리에 급수의 합으로 표현될 수 있는지 확인한다.
2. 주어진 함수에 대응되는 급수의 계수들을 계산한다.

## 사인함수와 코사인함수의 주기성

## 사인함수와 코사인함수의 직교성

<span style="color: #2D3748; background-color:#fff5b1;">Inner product for two functions</span>

$\alpha \leq x \leq \beta$

$$
<u, v> = \int_{\alpha}^{\beta} u(x)v(x) dx
$$

<span style="color: #2D3748; background-color:#fff5b1;">Orthogonal</span>

$$
<u, v> = 0
$$

<span style="color: #2D3748; background-color:#fff5b1;">Euler-Fourier</span>

급수가 $-L \leq x \leq L$ 안의 모든 실수 $x$에 대해 수렴할 때

$$
f(x) = \dfrac{a_0}{2} + \sum_{m=1}^{\infty} \left( a_m \cos\dfrac{m\pi x}{L} + b_m \sin\dfrac{m\pi x}{L} \right)
$$

에 대해

$$
\begin{align*}
  a_n = \dfrac{1}{L}\int_{-L}^{L} f(x) \cos \dfrac{n\pi x}{L}dx ,\;\;\;\ n = 1, 2, 3, \dots \\
  b_n = \dfrac{1}{L}\int_{-L}^{L} f(x) \sin \dfrac{n\pi x}{L}dx ,\;\;\;\ n = 1, 2, 3, \dots \\
\end{align*}
$$

# 5.변수분리법: 막대에서의 열전도

열전도, 파장 전파, 퍼텔셜 이론에 대한 기본적인 편미분방정식들은 서로 다른 세 유형의 물리적 현상과 관련이 있다.

- 확산 과정
- 진동 과정
- 시간에 독립적인 또는 정상적인 과정

이런 과정들은 많은 물리학 분야에서 중요하고도 핵심적인 개념이며 수학적으로도 큰 의미가 있다. 이론적으로 가장 잘 발달되어 있으며 가장 의미 있고 다양하게 응용되는 편미분방정식은 2계 선형 편미분방정식이다. 이런 편미분방정식들은 모두 세 가지 범주 중 하나로 분류될 수 있다.

- 열전도 방정식
- 파동 방정식
- 퍼텐셜 방정식

최근 2세기 동안 편미분방정식들을 풀기 위해 여러 가지 방법들이 개발되었는데, 이 중 변수분리법은 가장 오래된 체계적인 방법이다. (D'Alembert, 1750)

일정한 단면을 갖고 균일한 물질로 되어 있는 곧은 막대에 대한 열전도 문제를 고려하자.

- $x$ 축을 막대의 축을 따라 놓고 $x = 0$과 $x = L$을 막대의 양끝으로 두자.
- 막대의 옆면을 완전히 단열하여 열이 드나들지 못하고 온도 $u$를 임의의 단면에서 일정하다고 높을 수 있을 만큼 단면의 크기가 충분히 작다고 가정하자.

그러면 $u$는 축 좌표 $x$와 시간 $t$만의 함수가 된다. 이 막대에서의 온도 변화에 대한 지배 방정식은 편미분방정식을 이룬다.

## Heat conduction equation

For $0 < x < L, t > 0$ (미분방정식)

$$
\begin{align}
  \alpha^2 u_{xx} = u_t
\end{align}
$$

이 막대의 최기 운도 분포가 주어져 있다고 가정하자. (초기조건)

For $0 \leq x \leq L$,

$$
\begin{align}
  u(x, 0) = f(x)
\end{align}
$$

이 막대의 양 끝에서의 온도가 고정되어 있다고 가정하자. (경계조건)

For $t > 0$,

$$
\begin{align}
  u(0, t) = u(L, t) = 0
\end{align}
$$

이 문제는 시간 변수 $t$에 대한 초깃값 문제이며, 공간 변수 $x$에 대한 경곗값 문제이다.

## 변수분리법

$u(x, t)$가 하나는 $x$에만 종속되고 다른 하나는 $t$에만 종속되는 두 함수의 곱으로 가정하자.

$$
u(x, t) = X(x)T(t)
$$

이를 (1)에 대입하면

$$
\alpha^2 X''(x)T(t) = X(x)T'(t)
$$

분리상수를 높자.

$$
\dfrac{X''}{X} = \dfrac{1}{\alpha^2}\dfrac{T'}{T} = -\lambda
$$

따라서 다음의 두 개의 상미분방정식을 얻을 수 있다.

$$
\begin{align}
  X'' + \lambda X = 0 \\
  T' + \alpha^2\lambda T = 0
\end{align}
$$

식 (4) 를 풀자. 경계조건을 고려할 때 유일하게 자명하지 않은 고유함수는

$$
X_n(x) = \sin \left( \dfrac{n\pi x}{L} \right), \;\;\; n = 1, 2, 3, \dots
$$

고윳값은

$$
\lambda_n = \dfrac{n^2\pi^2}{L^2}, \;\;\; n = 1, 2, 3, \dots
$$

식 (5)를 풀자. 고윳값을 대입하면

$$
T' + \dfrac{n^2\pi^2 \alpha^2}{L^2}T = 0
$$

이를 풀면

$$
T(t) = \exp \left( -\dfrac{n^2\pi^2 \alpha^2}{L^2}t \right)
$$

따라서 다음 식을 모든 양의 정수에 대해 편미분방정식 (1)과 경계조건 (3)을 만족하는 기본해 (fundamental solution)을 얻을 수 있다.

$$
u_n(x, t) = \exp \left( -\dfrac{n^2\pi^2 \alpha^2}{L^2}t \right) \sin \left( \dfrac{n\pi x}{L} \right), \;\;\; n = 1, 2, 3, \dots
$$

이제 초기 조건을 만족하면 된다.

$$
u(x, 0) = f(x), \;\;\; 0 \leq x \leq L
$$

미정 계수 $c_n$에 대해

$$
\begin{align*}
  u(x, t) &= \sum_{n=1}^{\infty} c_n u_n(x, t) \\
  &= \sum_{n=1}^{\infty}c_n \exp \left( -\dfrac{n^2\pi^2 \alpha^2}{L^2}t \right) \sin \left( \dfrac{n\pi x}{L} \right)
\end{align*}
$$

$$
u(x, 0) = \sum_{n=1}^{\infty}c_n \sin \left( \dfrac{n\pi x}{L} \right) = f(x)
$$

로부터

$$
c_n = \dfrac{2}{L} \int_0^L f(x) \sin{\left(\dfrac{n\pi x}{L}\right)} ds
$$

# 6. 또 다른 열전도 문제들

# 7. 파동방정식: 탄성 줄의 진동

응용 수학에서 자주 발생하는 두 번째 편미분방정식은 파동 방정식이다.

길이 L인 탄성 줄을 x 축을 이 줄을 따라 놓을 수 있게 두 지지대 사이에서 수평을 맞추어 평평하게 잡아당겼다고 가정하자. 이 줄이 움직이기 시작해 수직 평면에서 진동한다고 가정하고 $u(x, t)$를 이 줄이 시간 t에서 위치 x를 지날 때의 수직 변위라 하자. 공기 저항 같은 감쇠효과를 무시하고 줄의 운동 진폭이 지나치게 크지 않다고 가정하면 $u(x, t)$는

정의역 $0 < x < L, t > 0$에서 편미분방정식

$$
\alpha^2 u_{xx} = u_{tt}
$$

을 만족한다.

양 끝이 고정되어 있다고 가정하자. (경계 조건)

For $t \geq 0$

$$
u(0, t) = u(L, t) = 0
$$

줄의 초기 위치와 초기 속도가 주어진다. (초기 조건)

For $0 \leq x \leq L$

$$
u(x, 0) = f(x) \\
u_t(x, 0) = g(x) \\
$$

# 기타

# Eigenvalue Problem
