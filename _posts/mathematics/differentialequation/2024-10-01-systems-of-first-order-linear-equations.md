---
title: "[Differential Equation] Systems of First Order Linear Equations"
categories:
  - differentialequation
---
이 장에서는 상수계수를 갖는 미분방정식을 주로 다룰 것이다.

# 1. Introduction

<span style="color: #2D3748; background-color:#fff5b1;">정리 1</span>

n개의 함수 $F_1, \dots, F_n$과 $n^2$개의 1계편도함수 $\dfrac{\partial F_1}{\partial x_1}, \dots, \dfrac{\partial F_1}{\partial x_n}, \dots, \dfrac{\partial F_n}{\partial x_1}, \dots, \dfrac{\partial F_n}{\partial x_n}$이 각각 $\alpha < t < \beta, \alpha_1 < x_1 < \beta_1, \dots, \alpha_n < x_1 < \beta_n$으로 정의된 $tx_1x_2\dots x_n$ - 공간 상의 영역 $R$에서 연속이고, 점 ($t_0, x_1^0, x_2^0, \dots, x_n^0$)이 $R$ 안에 있다고 하자.

그러면 초기조건

$$
x_1(t_0) = x_1^0, x_2(t_0) = x_2^0, \dots, x_n(t_0) = x_n^0
$$

을 만족하는 연립 미분방정식

$$
\begin{align*}
  x_1' &= F_1 (t, x_1, x_2, \dots, x_n), \\
  x_2' &= F_2 (t, x_1, x_2, \dots, x_n), \\
  \vdots \\
  x_n' &= F_n (t, x_1, x_2, \dots, x_n), \\
\end{align*}
$$

의 유일한 해

$$
x_1 = \phi_1(t), \dots, x_n = \phi_n(t)
$$

가 존재하는 적당한 구간 $\vert t - t_0 \vert < h$이 있다.

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

[Remark] 이는 위 표현식이 주어진 미분방정식의 모든 해를 표현할 수 있음을 의미한다.

<span style="color: #2D3748; background-color:#fff5b1;">정리 3 (아벨의 정리)</span>

$\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}$이 구간 $\alpha < t < \beta$에서 $\mathbf{x}' = \mathbf{P} \mathbf{x}$의 해들이라면, 이 구간에서 $\mathbf{W}[\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(n)}]$은 항상 영이거나 아니면 절대 영이 아니다.

[Remark] 론스키안이 항상 0이거나 0이 아니라는 것은 0이 아닌 하나의 점을 발견한다면 $\mathbf{W}[y_1, y_2] \neq 0$임을 의미한다.

[Remark] 함수들의 집합의 선형독립/종속을 판별하는 일반적인 방법은 없지만, 함수들이 미분가능하다면 론스키안을 통해 선형독립성을 판별할 수 있다. $\mathbf{W} \neq 0$이면 각 벡터는 선형독립이다.

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

연립방정식

$$
\mathbf{x}' = \mathbf{P}(t) \mathbf{x}
$$

을 고려하자. 이때 $\mathbf{P}$의 각 요소는 연속 실함수이다. 만약 $\mathbf{x} = \mathbf{u}(t) + i \mathbf{v}(t)$가 식 (11)의 복수함수 해라면, 이 해의 실수부 $\mathbf{u}(t)$와 허수부 $\mathbf{v}(t)$도 이 미분방정식의 해들이다.

[Remark] 이 정리는 실수 계수 행렬의 미분방정식이 복소수 해를 갖을 때 미분방정식의 실수의 일반해를 구할 때 사용된다.

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
- 움직이는 방향이 시계 방향인지 또는 반시계방향인지 결정하려면, 편의상 한 점에서 움직이는 방향만 결정하면 된다.

미분방정식

$$
\mathbf{x}' = \mathbf{A}\mathbf{x}
$$

이 켤레 복소수 고윳값 $r_1 = \lambda + i \mu, r_2 = \lambda - i \mu$를 갖는다고 가정하자. 그러면 이에 대응되는 고유벡터 $\xi_1, \xi_2$도 켤레 복소수이다. 미분방정식의 해는

$$
\mathbf{x}_1(t) = \xi_1 e^{r_1t}, \;\;\; \mathbf{x}_2(t) = \xi_2 e^{r_2 t}
$$

실수 벡터 $\mathbf{a}, \mathbf{b}$에 대해 $\xi_1 = \mathbf{a} + i \mathbf{b}$라고 하자. 그러면

$$
\begin{align*}
  \mathbf{x}_1 &= \xi_1 e^{r_1t} \\
  &= (\mathbf{a} + i \mathbf{b}) e^{\lambda + i \mu} \\
  &= e^{\lambda}(\mathbf{a} + i \mathbf{b}) (\cos \mu t + i \sin \mu t) \\
  &= e^{\lambda} (\mathbf{a} \cos \mu t - \mathbf{b} \sin \mu t) + ie^{\lambda} (\mathbf{a} \sin \mu t + \mathbf{b} \cos \mu t) \\
  &= \mathbf{u}(t) + i \mathbf{v}(t)
\end{align*}
$$

행렬 $\mathbf{A}$가 두 복소수 고윳값 $r_1 = \lambda + i\mu, r_2 = \lambda - i \mu$를 갖고, $r_3, \dots, r_n$은 서로 다른 실수라고 하자. 그리고 이에 대응되는 고유벡터를 $\mathbf{\xi_1} = \mathbf{a} + i \mathbf{b}, \mathbf{\xi_2} = \mathbf{a} - i\mathbf{b}, \mathbf{\xi_3}, \dots, \mathbf{\xi_n}$으로 두자. 그러면 일반해는

$$
\mathbf{x} = c_1\mathbf{u}(t) + c_2\mathbf{v}(t) + c_3 \mathbf{\xi_3}e^{r_3t} + \dots + c_n \mathbf{\xi_n}e^{r_nt}
$$

# 7. 기본행렬

연립 선형 미분 방정식의 해의 구조는 기본행렬이라는 개념을 도입하면 더 잘 이해할 수 있다.

$\mathbf{x}^{(1)}(t), \dots, \mathbf{x}^{(n)}(t)$가 어떤 구간 $\alpha < t < \beta$에서 다음 미분 방정식의 기본해 집합을 이룬다고 하자.

$$
\mathbf{x}' = \mathbf{P}(t) \mathbf{x}
$$

고윳값 $\lambda \pm i \mu$가 복소수

$$
\Psi = \left( \mathbf{x}^{(1)}(t) \vert \mathbf{x}^{(2)}(t) \vert \dots \vert \mathbf{x}^{(n)}(t) \right) =
\begin{pmatrix}
  \mathbf{x}^{(1)}_1(t) & \dots & \mathbf{x}^{(n)}_1(t) \\
  \vdots & & \vdots \\
  \mathbf{x}^{(1)}_n(t) & \dots & \mathbf{x}^{(n)}_n(t) \\
\end{pmatrix}
$$

의 열들이 벡터 $\mathbf{x}^{(1)}(t), \dots, \mathbf{x}^{(n)}(t)$이고 이 행렬을 연립방정식 (1)의 기본 행렬이라고 부른다.

---

$$
\exp(\mathbf{A}t) = \mathbf{I} + \sum_{n=1}^\infty \dfrac{\mathbf{A}^n t^n}{n!}
$$

# 8. 중복 고윳값

연립방정식 $\mathbf{x}' = \mathbf{Ax}$에서 $r = \rho$가 고유방정식의 m 중근이라고 하자.

$$
\det ({\mathbf{A} - r \mathbf{I}}) = 0
$$

그러면 $\rho$는 $\mathbf{A}$의 대수적 다중도가 m인 고윳값이다. 이런 경우 두 가지 가능성이 있다.

- 고윳값 $\rho$에 대응되는 m개의 일차독립인 고유벡터가 존재한다.
- m보다 적은 수의 일차독립인 고유벡터가 있다.

대수적 다중도가 m인 고윳값 $\rho$에 대응되는 m개의 일차독립인 고유벡터를 $\xi_1, \dots, \xi_n$라고 하면, m개의 일차독립인 해가 존재한다.

$$
\mathbf{x}_1 = \mathbf{\xi}_1e^{\rho t}, \dots, \mathbf{x}_n = \mathbf{\xi}_ne^{\rho t}
$$

이런 일은 계수행렬 $\mathbf{A}$가 (실수이고 대칭인) Hermitian이면 항상 발생한다.

계수행렬이 Hermitian이 아니어서 대수적 다중도 2인 고윳값 $\rho$에 대응되는 일차독립인 고유벡터가 $\mathbf{\xi}_1$로 1개인 상황을 고려하자.

한 해는 $(\mathbf{A} - \rho \mathbf{I}) \mathbf{\xi} = 0$를 만족하고, 다음과 같은 형태이다.

$$
\mathbf{x}_1 = \xi e^{\rho t}
$$

미분 연립방정식 $\mathbf{x}' = \mathbf{Ax} $의 두 번째 해를 다음의 형태로 가정하자.

$$
\mathbf{x} = \xi t e^{\gamma t} + \eta e^{\gamma t}
$$

이를 연립 미분방정식에 대입하자.

$$
\gamma \xi t e^{\gamma t} + (\xi + \gamma \eta) e^{\gamma t} = \mathbf{A} (\xi t e^{\gamma t} + \eta e^{\gamma t})
$$

계수 비교를 통해 다음 식을 얻을 수 있을 수 있다. 두 번째 해는 다음을 만족해야 한다.

$$
\gamma \xi = \mathbf{A} \xi, \;\;\; \xi + \gamma \eta = \mathbf{A} \eta \;\;\; \\
\text{or} \\
(\mathbf{A} - \gamma \mathbf{I}) = 0, \;\;\; (\mathbf{A} - \gamma \mathbf{I}) \eta = \xi
$$

벡터 $\eta$를 행렬 $\mathbf{A}$의 고윳값 $\rho$에 대응되는 일반화된 고유벡터라고 한다.

# Reference

William E. Boyce, Boyce’s Elementary Differential Equations and Boundary Value Problems
