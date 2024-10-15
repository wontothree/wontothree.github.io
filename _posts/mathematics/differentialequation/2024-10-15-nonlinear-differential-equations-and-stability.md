---
title: "[Differential Equation] Nonlinear Differential Equations and Stability"
categories:
  - differentialequation
---
# 1. Phase Plane: Linear System of Equations

많은 미분방정식들이 해석학적인 방법으로는 쉽게 풀리지 않기 때문에 직접 식을 풀지 않고 정성적인 정보를 얻을 수 있는 방법을 고민할 필요가 있다.

다음 미분방정식

$$
\dfrac{d\mathbb{x}}{dt} = \mathbb{A}\mathbb{x}
$$

에 대해 $\mathbb{A}$의 고윳값들이 갖는 특성에 따라 발생할 수 있는 상황을 분류할 수 있다.

1. 같은 부호의 서로 다른 실수 고윳값들
2. 다른 부호의 실수 고윳값들
3. 서로 같은 고윳값
4. 영이 아닌 실수부를 갖는 복소수 고윳값들
5. 순허수 고윳값들

|Eigenvalue|Type of Critical point|Stability|
|---|---|---|
|$r_1 > r_2 > 0$|node|unstable|
|$r_1 < r_2 < 0$|node|asymptotically stable|
|$r_2 < 0 < r_1$|Saddle point|unstable|
|$r_1 = r_2  > 0$|proper or improper node|unstable|
|$r_1 = r_2 < 0$|proper or improper node|asymptotically stable|
|$r_1, r_2 = \lambda \pm i\mu$|||
|$\lambda > 0$|spiral point|unstable|
|$\lambda < 0$|spiral point|asymptotically stable|
|$\lambda = 0$|Center|stable|

한편

$$
A =
\begin{bmatrix}
  a_{11} & a_{12} \\
  a_{21} & a_{22} \\
\end{bmatrix}
,\;\;\;
p = a_{11} + a_{22},
\;\;\;
q = a_{11}a_{22} - a_{12}a_{21}
$$

라고 정의하면 행렬 $A$에 대해 발생할 수 있는 상황을 분석하는 데 용의하다.

$$
\begin{align*}
  0 &= \det (A - \lambda I) \\
  &= (a_{11} - \lambda)(a_{22} - \lambda) - a_{12}a_{21} \\
  &= \lambda^2 - (a_{11} + a_{22}) \lambda + a_{11}a_{22} - a_{12}a_{21} \\
  &= \lambda^2 - p\lambda + q
\end{align*}
$$

# 2.Autonomous Systems and Stability
