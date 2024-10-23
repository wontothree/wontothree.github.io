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

## [Case 1] 같은 부호의 서로 다른 실수 고윳값

고윳값이 $r_1, r_2$이고, 이에 대응되는 고유벡터가 $\xi_1, \xi_2$라고 하자.

<span style="color: #2D3748; background-color:#fff5b1;">일반해</span>

$$
\mathbf{x} = c_1 \xi_1 e^{r_1 t} + c_2 \xi_2 e^{r_2 t}
$$

$r_1 < r_2 < 0$이라고 가정하자.

$c_1, c_2$에 관계 없이 $t \rightarrow \infty$이면 $\mathbf{x} \rightarrow 0$. 즉 모든 해들이 원점에서 임계점으로 다가간다.

## [Case 2] 다른 부호의 실수 고윳값

고윳값이 $r_1 > 0, r_2 < 0$이고, 이에 대응되는 고유벡터가 $\xi_1, \xi_2$라고 하자.

<span style="color: #2D3748; background-color:#fff5b1;">일반해</span>

$$
\mathbf{x} = c_1 \xi_1 e^{r_1 t} + c_2 \xi_2 e^{r_2 t}
$$

<span style="color: #2D3748; background-color:#fff5b1;">극한</span>

- 해가 $\xi_1$을 지나는 직선 위의 한 초깃점에서 시작한다면 $c_2 = 0$. 따라서 이때의 해는 모든 t에 대하여 $\xi_1$을 지나는 직선 위에 놓이게 되고, $\vert\vert \mathbf{x} \vert\vert \rightarrow 0$
- 해가 $\xi_2$를 지나는 직선 위의 한 초깃점에서 시작한다면 항상 그 직선 위에 높여 있게 되고 $t \rightarrow \infty$ 일 때, $\vert\vert \mathbf{x} \vert\vert \rightarrow 0$
- 다른 점에서 시작하는 해들은 $t$가 클 때, 양의 지수를 포함하는 함수가 일반해의 주요 항이 되므로 양의 고윳값 $r_1$에 대한 고유벡터 $\xi_1$에 의해 결정되는 직선을 향이 한없이 점근한다.
- 원점에서 임계점으로 다가가는 해는 $\xi_2$에 의해 결정되는 직선 위에서 시작하는 해들밖에 없다.

다음 그림은 고윳값들이 모두 실수이고 부호가 반대인 전형적인 경우이다. 이때의 원점을 saddle point라고 한다.

![](./../../../img/differentialequation/phase-portrait-case2.png){: .align-center width="500" height="500"}

## 한편

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

한편 선형 미분 방정식 계는 (0, 0)을 유일한 critical point로 갖는다.

# 2.Autonomous Systems and Stability
