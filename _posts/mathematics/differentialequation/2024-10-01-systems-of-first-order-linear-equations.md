---
title: "[Differential Equation] Systems of First Order Linear Equations"
categories:
  - differentialequation
---
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

# 7. 기본행렬

연립 선형 미분 방정식의 해의 구조는 기본행렬이라는 개념을 도입하면 더 잘 이해할 수 있다.

$\mathbf{x}^{(1)}(t), \dots, \mathbf{x}^{(n)}(t)$가 어떤 구간 $\alpha < t < \beta$에서 다음 미분 방정식의 기본해 집합을 이룬다고 하자.

$$
\mathbf{x}' = \mathbf{P}(t) \mathbf{x}
$$

그러면 행렬

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
  