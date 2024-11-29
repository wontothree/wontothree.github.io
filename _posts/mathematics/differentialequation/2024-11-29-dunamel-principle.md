---
title: "[Differential Equation] Dunamel's Principle"
categories:
  - differentialequation
---
# Dunamel's Principle

$$
\dot{x}(t) = Ax(t) + f(t)
$$

의 일반해는 다음과 같다.

$$
x(t) = x_0 \exp{At} + \int_0^s \exp A(t - s) f(s) ds
$$

# Ex

$$
\begin{align*}
x_1' &= 2x_1 + 2x_2 - x_3 + 1 \\
x_2' &= 2x_2 + x_3 \\
x_3' &= 2x_3
\end{align*}
$$

위 미분방정식은 다음과 같이 표현하 수 있다.

$$
\mathbf{X} = \mathbf{A} \mathbf{X} + f
$$

where

$$
\mathbf{X} =
\begin{bmatrix}
  x_1 \\
  x_2 \\
  x_3 \\
\end{bmatrix}, \;\;\;

\mathbf{A} =
\begin{bmatrix}
  2 & 2 & -1 \\
  0 & 2 & 1 \\
  0 & 0 & 2 \\
\end{bmatrix}, \;\;\;

f =
\begin{bmatrix}
  1 \\
  0 \\
  0 \\
\end{bmatrix}
$$