---
title: "[Differential Equation] Classification of Critical Points"
categories:
  - differentialequation
---
# Stability

[Critical points] For a system $x' = f(x)$, the points whose $f(x) = 0$ are called critical points for the system.

[Stable] A critical point $x_0$ of $x' = f(x)$ is said to be stable if for any $\epsilon$, there exists $\delta > 0$ such that

$$
x_0 \in B_{\delta}(x^*) \rightarrow x(t) \in B_{\delta}(x^*)
$$

[Unstable] If $x^*$ is NOT stable, then it is unstable.

[Asympotically stable] $x_0$ is asympotically stable if $\lim_{t \rightarrow \infty} x(t) = x^*$ where $x(t)$ is a solution of $x' = f(x)$ with $x(0) = x_0$.

$$
B_{\delta}(x^*) = \left[ x : \vert\vert x - x^* \vert\vert < \delta \right]
$$

# Classification

$$
x' =
\begin{bmatrix}
  a & b \\
  c & d
\end{bmatrix}
x
$$

위 matrix의 eigenvalue를 $r_1, r_2$, eigenvector를 $v_1, v_2$라고 하자.

먼저 $v_1, v_2$가 실수인 경우를 보자.

# Reference

Prof. Dohyeon Kwon’s applied differential equation - week 6 lecture
