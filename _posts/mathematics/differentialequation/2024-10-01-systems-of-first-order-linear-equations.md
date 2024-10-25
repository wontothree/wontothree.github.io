---
title: "[Differential Equation] Systems of First Order Linear Equations"
categories:
  - differentialequation
---
이 장에서는 상수계수를 갖는 미분방정식을 주로 다룰 것이다.

# 4. 연립 1계 선형 미분방정식의 기본 이론

n 개의 식으로 된 연립 1계 선형 미분방정식의 연립방정식

$$
\begin{align*}
  x_1' =& p_{11}(t)x_1 + \dots + p_{1n}(t) + g_1(t), \\
  &\vdots \\
  x_n' =& p_{n1}(t)x_1 + \dots + p_{nn}(t) + g_n(t), \\
\end{align*}
$$

에 대한 일반론은 하나의 n계 선형 미분방정식의 일반론과 매우 유사하다. 다음과 같이 정의를 하면

$$
\mathbf{x} = \mathbf{x}(t) =
\begin{bmatrix}
  x_1(t) \\
  \vdots \\
  x_n(t) \\
\end{bmatrix}, \;\;\;
\mathbf{g}(t) =
\begin{bmatrix}
  g_1(t) \\
  \vdots \\
  g_n(t) \\
\end{bmatrix}, \;\;\;
\mathbf{P}(t) =
\begin{bmatrix}
  P_{11} & \dots & P_{1n} \\
  \vdots & \ddots & \vdots \\
  P_{n1} & \dots & P_{nn} \\
\end{bmatrix}
$$

연립방정식을 다음과 같이 나타낼 수 있다.

$$
\mathbf{x}' = \mathbf{P}(t) \mathbf{x} + \mathbf{g}(t)
$$

$$
\begin{align}
  \mathbf{x}' = \mathbf{P}(t) \mathbf{x}
\end{align}
$$

<span style="color: #2D3748; background-color:#fff5b1;">정리 1</span>

벡터 함수 $\mathbf{x}^{(1)}$과 $\mathbf{x}^{(1)}$가 연립방정식의 해라면, 임의의 상수 $c_1, c_2$에 대한 일차결합

$$
c_1 \mathbf{x}^{(1)} + c_2 \mathbf{x}^{(1)}
$$

도 해이다.

<span style="color: #2D3748; background-color:#fff5b1;">정리 2</span>

구간 $\alpha < t < \beta$의 각 점에 대해 벡터 함수 $\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$이 연립방정식의 일차독립인 해들이라면, 연립방정식의 각 해 $\mathbf{x} = \mathbf{x}(t)$는 $\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$의 일차결합

$$
\mathbf{x}(t) = c_1 \mathbf{x}^{(1)} + \dots + c_n \mathbf{x}^{(n)}
$$

로 유일하게 나타낼 수 있다.

<span style="color: #2D3748; background-color:#fff5b1;">정리 3 (아벨의 정리)</span>

$\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$이 구간 $\alpha < t < \beta$에서 $\mathbf{x}' = \mathbf{P} \mathbf{x}$의 해들이라면, 이 구간에서 $\mathbf{W}[\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}]$은 항상 영이거나 아니면 절대 영이 될 수 없다.

<span style="color: #2D3748; background-color:#fff5b1;">정리 4</span>

$$
\mathbf{e}^{(1)} =
\begin{bmatrix}
  1 \\
  0 \\
  \vdots \\
  0 \\
\end{bmatrix}, \;\;\;
\mathbf{e}^{(2)} =
\begin{bmatrix}
  0 \\
  1 \\
  \vdots \\
  0 \\
\end{bmatrix}, \;\;\;
\mathbf{e}^{(n)} =
\begin{bmatrix}
  0 \\
  0 \\
  \vdots \\
  1 \\
\end{bmatrix}
$$

이라 하고, $\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$을 $\alpha < t < \beta$ 안의 임의의 점 $t_0$에 대한 초기 조건

$$
\mathbf{x}^{(1)}(t_0) = \mathbf{e}^{(1)}, \;\;\; \dots, \;\;\;\mathbf{x}^{(n)}(t_0) = \mathbf{e}^{(n)}
$$

을 만족하는 연립방정식 (1)의 해를 두자. 그러면 $\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$은 연립방정식 (1)의 기본 해 집합을 이룬다.

<span style="color: #2D3748; background-color:#fff5b1;">정리 5</span>

연립방정식 (1)

$$
\mathbf{x}' = \mathbf{P}(t) \mathbf{x}
$$

을 고려하자. 이때 $\mathbf{P}$의 각 요소는 연속 실함수이다. 만약 $\mathbf{x} = \mathbf{u}(t) + i \mathbf{v}(t)$가 식 (11)의 복수함수 해라면, 이 해의 실수부 $\mathbf{u}(t)$와 허수부 $\mathbf{v}(t)$도 이 미분방정식의 해들이다.

# 5. 상수계수인 제차 선형 연립방정식

실수의 상수 계수를 갖는 연립 제차 선형 미분 방정식 - n x n 상수 행렬 $\mathbf{A}$에 대한

$$
\begin{align}
  \mathbf{x}' = \mathbf{A}\mathbf{x}
\end{align}
$$

형태의 연립방정식에 주목하자.

$n = 1$이면 연립 방정식은 하나의 1계 미분방정식

$$
\dfrac{dx}{dt} = ax
$$

이 된다.

- solution: $x(t) = c e^{at}$
- critical point: $a \neq 0$이면 $x = 0$
- 만약 $a < 0$이면 평형해가 아닌 해는 $r$가 증가함에 따라 $x(t) = 0$에 다가간다. (asymptotically stable)
- 만약 $a > 0$이면 모든 해는 $r$가 증가할수록 평형해로부터 멀어진다. (unstable)

n개의 식으로 된 연립방정식의 경우에 상황은 비슷하지만 훨씬 복잡하다. $\det A \neq 0$이라고 가정한다면 $\mathbf{x} = 0$이 유일한 평형해이다.

$n = 2$인 경우는 특별히 중요하다. 위상평문 (phase plane)에서 그래프를 그릴 수 있다. 많은 점에서 $\mathbf{Ax}$를 계산하여 나온 벡터들을 그리면 연립 미분방정식의 해와 접하는 방향장을 얻는다. 방향장은 해의 성질을 정성적으로 이해시켜준다. 주어진 시스템의 대표적인 궤적을 보여주는 그래프를 위상 궤적이라고 부른다.

연립 미분방정식 (2)의 일반해가 다음 형태를 갖는다고 가정하자.

$$
\mathbf{x} = \xi e^{rt}
$$

이를 (2)에 대입하여 정리하여 정리하자.

$$
r\xi e^{rt} = \mathbf{A}\xi e^{rt} \\
\mathbf{A}\xi = r\xi \\
(\mathbf{A} - r\mathbf{I}) \xi = 0 \\
$$

연립 미분방정식 (1)을 풀기 위해서는 위 문제를 풀어야 한다. 이는 행렬 $\mathbf{A}$의 고윳값과 고유벡터를 구하는 문제이다. $r$을 계수행렬 $\mathbf{A}$의 고윳값, $\xi$를 $\mathbf{A}$의 고유벡터로 두면 $\mathbf{x} = \xi e^{rt}$가 연립 미분방정식의 해이다.

# 6. Complex Eigenvalue

상수 계수를 갖는 n 개의 식으로 된 연립 제차 선형 미분 방정식

$$
\mathbf{x}' = \mathbf{Ax'}
$$

을 다룬다. 이때 계수 행렬 $A$는 실수 값을 갖는다.

$\mathbf{x} = \xi e^{rt}$ 형태의 해를 구하고자 한다면, $r$은 계수 행렬 $A$의 eigenvalue이고, $\xi$는 이에 대응되는 eigenvector이어야 한다.

$\mathbf{A}$의 eigenvalue $r_1, \dots, r_n$은 고유 방정식

$$
\det (\mathbf{A} - r \mathbf{I}) = 0
$$

의 근이고 이에 대응되는 고유벡터는

$$
(\mathbf{A} - r \mathbf{I})\mathbf{\xi} = 0
$$

- 고윳값 $\lambda \pm i \mu$가 복소수이면 궤적은 나선 안쪽($\lambda < 0$)이거나, 나선 바깥쪽($\lambda > 0$), 또는 폐곡선을 따라 계속 돈다. ($\lambda = 0$)
- 