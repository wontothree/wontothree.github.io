---
title: "[Differential Equation] One-Dimentional Spring Problem"
categories:
  - differentialequation
---
# Problem Formulation

For $x \in (0, L), t > 0$,

$$
\begin{align*}
  u_{tt} &= u_{xx}  \\
  f(x) &= u(x, 0) \\
  u_t(x, 0) &= 0 \\
  u(0, t) &= u(L, t) = 0 \\
\end{align*}
$$

Suppose form of solution

$$
u_n(x, t) = \sum_{n=1}^{\infty} c_n u_n
$$

$$
u_n(x, t) = X_n(x)T_n(t)
$$

From $u_{tt} = u_{xx}$

$$
\dfrac{X''(x)}{X(x)} = \dfrac{T''(t)}{T(t)} = - \lambda
$$

or

$$
\begin{align*}
  X''(x) + \lambda X'(x) &= 0 \\
  T''(t) + \lambda T'(t) &= 0 \\
\end{align*}
$$
