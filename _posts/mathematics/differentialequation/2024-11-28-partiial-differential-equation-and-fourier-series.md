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

# 4.변수분리법: 막대에서의 열전도

# 6. 또 다른 열전도 문제들

# 기타

# Eigenvalue Problem
