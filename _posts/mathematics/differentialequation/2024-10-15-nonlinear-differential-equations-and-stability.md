---
title: "[Differential Equation] Nonlinear Differential Equations and Stability"
categories:
  - differentialequation
---
# 1. Phase Plane: Linear System of Equations

많은 미분방정식들이 해석학적인 방법으로는 쉽게 풀리지 않기 때문에 직접 식을 풀지 않고 정성적인 정보를 얻을 수 있는 방법에 대해 알아보자.

다음 미분방정식

$$
\dfrac{d\mathbf{x}}{dt} = \mathbf{A}\mathbf{x}
$$

에 대해 $\mathbf{A}$ (2 by 2) 의 고윳값들이 갖는 특성에 따라 발생할 수 있는 상황을 분류할 수 있다.

1. 같은 부호의 서로 다른 실수 고윳값들
2. 다른 부호의 실수 고윳값들
3. 서로 같은 고윳값
4. 영이 아닌 실수부를 갖는 복소수 고윳값들
5. 순허수 고윳값들

$\det \mathbf{A} \neq 0$인 2차원 연립방정식 $\mathbf{x}' = \mathbf{A}\mathbf{x}$에 대해서만 유효하다. 고차원 연립방정식에서 발생하는 상황들은 본질적으로 2차원 연립방정식에서 발생했던 상황들의 조합이다.

|Eigenvalue|Type of Critical Point|Stability|
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

미분 방정식의 해를 다음과 같이 표현하자.

$$
\begin{align*}
  \mathbf{x} &= c_1 \xi_1 e^{r_1 t} + c_2 \xi_2 e^{r_2 t} \\
  &= e^{r_2 t} (c_1 \xi_1 e^{(r_1 - r_2) t} + c_2 \xi_2) \\
\end{align*}
$$

- 이때 $r_1 - r_2 < 0$이므로 충분히 큰 t에 대해 $c_1 \xi_1 e^{(r_1 - r_2) t}$ 항은 무시해도 될 만큼 작은 크기를 갖게 된다. 따라서 $t \rightarrow \infty$일 때 궤적은 원점으로 다가갈 뿐 아니라 $\xi_2$를 지나는 직선을 향해 갈 것이다.
- 충분히 작은 $t < 0$에 대해 $\xi_1$을 지나는 직선을 향해 갈 것이다.

이때의 원점을 node라고 한다.

![](./../../../img/differentialequation/phase-portrait-case1.png){: .align-center width="800" height="800"}

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

![](./../../../img/differentialequation/phase-portrait-case2.png){: .align-center width="800" height="800"}

## [Case 3] 서로 같은 고윳값

$r_1 = r_2 = r < 0$ 인 경우만 살펴보자. 양수인 경우에는 궤적이 움직이는 방향만 반대이고 모양은 동일하다.

중복되는 고윳값이 두 개의 독립적인 고유벡터를 갖는지, 하나의 고유벡터를 갖는지에 따라 두 가지 경우로 세분화된다.

### 두 개의 독립 고유벡터

<span style="color: #2D3748; background-color:#fff5b1;">일반해</span>

$$
\mathbf{x} = c_1 \xi_1 e^{r t} + c_2 \xi_2 e^{r t}
$$

Proper node (or start point)

### 한 개의 독립 고유벡터

<span style="color: #2D3748; background-color:#fff5b1;">일반해</span>

$$
\mathbf{x} = c_1 \xi e^{r t} + c_2 (\xi t e^{r t} + \eta e^{rt})
$$

## [Case 4] 영이 아닌 실수부를 갖는 복소수 고윳값

![](./../../../img/differentialequation/phase-portrait-case4.png){: .align-center width="800" height="800"}

## [Case 5] 순허수 고윳값들

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

## Stability and Unstability

자율 연립방정식에 대하여

$$
\mathbf{x}' = \mathbf{f}\mathbf{x}
$$

<span style="color: #2D3748; background-color:#fff5b1;">임계점</span>

$\mathbf{f} = 0$인 점

<span style="color: #2D3748; background-color:#fff5b1;">안정적</span>

주어진 임의의 $\epsilon > 0$에 대해서 이것에 대응하는 적당한 $\delta > 0$가 존재하여 $t = 0$에서

$$
\vert\vert \mathbf{x}(0) - \mathbf{x}^{(0)} \vert\vert < \delta
$$

을 만족하는 연립방정식의 모든 해 $\mathbf{x} = \mathbf{x}(t)$가 모든 t에 대해서 존재하고 모든 $t \geq 0$에 대해

$$
\vert\vert \mathbf{x}(t) - \mathbf{x}^{(0)} \vert\vert < \epsilon
$$

을 만족한다면 연립방정식의 임계점 $\mathbf{x}^{(0)}$가 안정적(stable)이라고 한다.

<span style="color: #2D3748; background-color:#fff5b1;">불안정</span>

안정적이지 않은 임계점을 불안정(unstable)하다고 한다.

<span style="color: #2D3748; background-color:#fff5b1;">점근적으로 안정적</span>

임계점 $\mathbf{x}^{(0)}$가 안정적이고 적당한 $\delta_0 (>0)$ 가 존재하여 해 $\mathbf{x} = \mathbf{x}(t)$가

$$
\vert\vert \mathbf{x}(0) - \mathbf{x}^{(0)} \vert\vert < \delta_0
$$

을 만족할 때

$$
\lim_{t\to0} \mathbf{x}(t) = \mathbf{x}^{(0)}
$$

이면 이때의 임계점 $\mathbf{x}^{(0)}$을 점근적으로 안정적(asymptotically stable)이라고 한다.

## 진동하는 진자

점근 안정성, 안정성, 불안정성이라는 개념은 진동하는 진자를 이용하면 쉽게 눈으로 확인할 수 있다.

- 질량을 갖는 물체를 낮은 평셩상태의 위치에서 약간 들어올렸다 놓으면 앞뒤로 진동하면서 진폭이 점점 줄어들다가 처음 상태에서 갖고 있던 위치에서니가 감쇠력에 의해 사라져감에 따라 평형 상태의 위치로 수렴한다. (점근적 안정성)
- 질량이 있는 물체를 높은 평형상태의 위치에서 약간 내렸다 놓으면 중력의 융향으로 아래로 떨어지고 결국에는 낮은 평형상태의 위치로 수렴하게 된다. (불안정성)
- 만약 감쇠 계수가 영인 이상적 상황을 가정한다면, 질량이 있는 물체를 낮은 평형상태의 위치에서 약간 들어올린 후 놓으면 평형상태의 위치에서 일정한 진폭을 유지하며 무한히 진동할 것이다. (안정적)

# 3. Locally Linear System

<span style="color: #2D3748; background-color:#fff5b1;">정리</span>

선형 연립방정식 $\mathbf{x}' = \mathbf{A} \mathbf{x}$의 임계점 $\mathbf{x} = 0$은

1. 고윳값 $r_1, r_2$가 음의 실수이거나 음의 실수부를 갖는다면 점근 안정적이다.
2. 고윳값 $r_1, r_2$가 순허수라면 안정적이지만 점근 안정적이지는 않다.
3. 고윳값 $r_1, r_2$가 양의 실수이거나 양의 실수부를 갖는다면 불안정하다.

## 섭동 (Perturbation) 효과

몇몇 또는 모든 계수에 대한 작은 섭동은 고윳값에 작은 섭동을 일으킬 수 있다.

- $r_1 = i \mu, r_2 = - i \mu$
- $r_1 = r_2$

## 비선형 연립방정식에 대한 선형 근사

비선형 자율 2차원 연립방정식

$$
\mathbf{x}' = \mathbf{f} (\mathbf{x})
$$

을 고려하자. 주요 목적은 임계점 $\mathbf{x}^{(0)}$ 근처에서 연립방정식의 궤적의 모양을 조사하는 것이다.

비선형 연립방정식은 임계점 근처에서 어떤 선형 연립방정식의 궤적과 비슷한 궤적을 갖는다. 이것은 비선형 연립방정식을 임계점 근처에서 궤적을 구하기 쉬운 선형  연립방정식으로 근사할 수 있음을 시사한다.

>임계점 근처에서 비선형 연립방정식의 궤적에 거의 근접하는 궤적을 갖는 근사 선형 연립방정식을 찾을 수 있을까? 그렇다면 어떻게 찾을 수 있을까?

임계점을 원점으로 선택하자. 만약 $\mathbf{x}^{(0)} \neq 0$이면 $\mathbf{y} = \mathbf{x} - \mathbf{x}^{(0)}$으로 치환하여 $\mathbf{y}$가 원점에서 임계점을 갖는 자율 연립방정식을 만족하도록 바꿀 수 있기 때문에 임계점을 원점으로 두어도 일반성을 잃지 않는다.

<span style="color: #2D3748; background-color:#fff5b1;">고립된 임계점</span>

$\mathbf{x} = 0$가 고립되었다는 것은 그 안에 다른 임계점들을 포함하지 않는 원점을 중심으로 하는 적당한 원이 존해함을 의미한다.

<span style="color: #2D3748; background-color:#fff5b1;">국소적으로 선형인 연립방정식</span>

비선형 방정식이 선형 방정식에 가깝다는 것은 어떤 의미일까?

$$
\mathbf{x}' = \mathbf{A}\mathbf{x} + \mathbf{g}(\mathbf{x})
$$

이고, $\det A \neq 0$라고 가정하여 $\mathbf{x} = 0$은 연립방정식의 고립된(isolated) 임계점이 되도록 하자.

다음 조건을 만족하는 연립방정식을 임계점 $\mathbf{x} = 0$의 근방에서 국소적으로 선형인 연립방정식(locally linear system)이라고 한다.  

$$
\mathbf{x} \rightarrow 0, \;\;\; \dfrac{\vert\vert \mathbf{g}(\mathbf{x}) \vert\vert}{\vert\vert \mathbf{x} \vert\vert} \rightarrow 0
$$

<span style="color: #2D3748; background-color:#fff5b1;">정리</span>

함수 $F$와 $G$가 2계까지 연속인 편도함수를 갖는다면 다음 연립방정식은 임계점 $(x_0, y_0)$ 근방에서 국소적으로 선형이다.

$$
x' = F(x, y), \;\;\; y' = G(x, y)
$$

이 정리는 다음의 두 가지 의미가 있다.

1. 함수 $F, G$가 두 번 미분 가능하다면 연립방정식은 국소적으로 선형이다.
2. Jacobian matrix를 통해 임계점 근처에서 국소적으로 선형인 연립방정식에 대응되는 선형 연립방정식을 구할 수 있다.

Jocobian matrix

$$
\mathbf{J} = \mathbf{J}[F, G](x, y) =
\begin{bmatrix}
  F_x(x, y) & F_y(x, y) \\
  G_x(x, y) & G_y(x, y) \\
\end{bmatrix}
$$

이때 $\det (J)$ 가 $(x_0, y_0)$에서 영이 아니라고 가정해야 $(x_0, y_0)$가 선형 연립방정식의 고립된 임계점이 될 수 있다.

<span style="color: #2D3748; background-color:#fff5b1;">정리</span>

![](./../../../img/differentialequation/locally-linear-system-table.png){: .align-center width="800" height="800"}

증명은 생략한다.

위 정리는 $\mathbf{x}$가 작으면 비선형적인항들도 작아지고 따라서 선형인 항에 의해 결정된 임계점의 유형과 안정성에 영향을 끼치지 않음을 의미한다.

두 가지 예외가 있다.

1. $r_1, r_2$가 순허수일 때, 작은 비선형 항이 안정적인 center를 점근 안정 또는 불안정 spiral point로 바꿀 수 있다.
2. $r_1, r_2$가 동일한 실수일 때, 비선형 항이 node를 spiral point로 바꿀 수 있다.

선형 연립방정식의 임계점과 같은 유형의 임계점을 갖더라도 국소적으로 선형인 연립방정식의 궤적들은 그 임계점 바로 근처를 제외하고는 이에 대응되는 성형 연립방정식의 궤적들과는 상당히 다를 수 있다. 그러나 그 임계점을 향해 들어가거나 빠져나오는 점에서 궤적들이 갖는 기울기는 선형 연립방정식으로부터 정확하게 구할 수 있다.

# 4. Competing Species

개체역학에서 발생하는 문제들에 phase portrait analysis를 적용하자. 이 절에서 소개하는 방정식들이 현실에서의 복잡한 관계에 비해 극도로 단순하지만 이런 모델링들을 연구함으로써 생태계의 원리를 이해하는 데 도움이 된다.

폐쇄적인 환경에서 제한적인 식량을 두고 경쟁하는 비슷한 두 개의 종이 있다고 가정하자. 시간 t에 대한 두 종의 개체수를 각각 x, y라 두자. 한 종이 없을 때 다른 종의 개체수는 로지스틱 방정식을 따른다고 가정하자.

두 개체수의 증가율 $\epsilon_1, \epsilon_2$와 두 개체수의 포화 레벨을 나타내는 $\epsilon_1/\alpha_1, \epsilon_2/\alpha_2$에 대해 각각

$$
\dfrac{dx}{dt} = x (\epsilon_1 - \rho_1x) \\
\dfrac{dy}{dt} = y (\epsilon_2 - \rho_2x) \\
$$

이 된다. 그러나 두 종이 모두 있을 때 각각의 종들이 다른 종에 대한 식량 공급을 감소시켜 두 종의 성장률과 포화 개체수가 줄어든다. 이를 반영하자.

$$
\dfrac{dx}{dt} = x (\epsilon_1 - \rho_1x - \alpha_1 y) \\
\dfrac{dy}{dt} = y (\epsilon_2 - \rho_2y - \alpha_2 x) \\
$$

양의 상수 $\epsilon_1, \rho_1, \alpha_1, \epsilon_2, \rho_2, \alpha_2$는 고려 대상인 종이 무엇이냐에 따라 좌우된다.

# 5. Predator - Prey Equations

한 종(포식자)이 다른 종(먹이)을 잡아먹고 먹이는 다른 식량을 먹고 사는 상황을 다루자.

시간 t에 대한 먹의 개체수와 포식자의 개체수를 각각 x와 y라 두자. 두 종간의 상호작용을 모델링하는 데 있어서 다음과 같은 가정을 세우자.

1. 포식자가 없으면 먹이는 현재의 개체수에 비례하여 증가한다. 즉 $y = 0$일 때 $dx/dt = ax (a > 0)$
2. 먹이가 없으면 포식자는 멸종된다. 즉 $x = 0$일 때 $dy/dt = - cy (c > 0)$
3. 포식자와 먹이가 마주치는 횟수는 두 개체수의 곱에 비례한다. 서로 마주치면 포식자의 증가량은 촉진되고 먹이의 증가량은 억제되는 경향이 있다. 따라서 양의 상수 $\gamma, \alpha$에 대해서 포식자의 증가율은 $\gamma x y$이고, 먹이의 증가율은 $-\alpha x y $이다.

이 가정들에 따라 다음과 같은 연립방정식이 유도된다. (Lotka-Volterra)

$$
\dfrac{dx}{dt} = ax - \alpha xy \\
\dfrac{dy}{dt} = -cy + \gamma x y
$$

여기서 상수 $a, c, \alpha, \gamma$는 모두 양수이다. $a, c$는 각각 먹이의 증가율과 포식자의 사망률이고 $\alpha, \gamma$는 두 종간의 상호작용의 영향을 측ㅈㅇ하는 값들이다.