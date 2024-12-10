---
title: "[Differential Equation] Existence and Uniqueness of Partial Differential Equation"
categories:
  - differentialequation
---
# Lipschiz Continuity

<span style="color: #2D3748; background-color:#fff5b1;">Definition</span>

A function $g: \mathbb{R}^n \rightarrow \mathbb{R}$ is Lipschiz continuous if

$$
\vert g(x) - g(y) \vert \leq L \vert\vert x - y \vert\vert
$$

for some $L > 0$ and for all $x, y \in \mathbb{D} = \mathbb{R}^n$

<span style="color: #2D3748; background-color:#fff5b1;">Example</span>

$g(x) = x$ is Lipschiz continuous on $\mathbb{R}$ because

$$
\vert g(x) - g(y) \vert = \vert x - y\vert \leq L \vert x - y \vert \leftrightarrow (L - 1) \vert x - y \vert \geq 0
$$

for $x, y \in \mathbb{R}$ and some $L$.

$g(x) = x^2$ is not Lipschiz continuous on $\mathbb{R}$ because there does not exist $L$ such that

$$
\begin{align*}
  \vert g(x) - g(y) \vert = \vert x^2 - y^2 \vert = \vert x + y \vert \cdot \vert x - y \vert &\leq L \vert x - y \vert \\

  \leftrightarrow \\
  (L - \vert x + y \vert) \vert x - y \vert &\geq 0
\end{align*}
$$

for $x, y \in \mathbb{R}$.

However, $g(x) = x^2$ is Lipschiz continuous on $[0, 1]$.

<span style="color: #2D3748; background-color:#fff5b1;">Differentiability and Lipschiz Coninuity</span>

A function $f(x)$ is said to be differentiable at a point $c \in \mathbb{R}$ if

$$
\displaystyle{\lim_{x \to c}} \dfrac{f(x) - f(c)}{x - c}
$$

If a function $g(x)$ is differeniable, $g(x)$ is Lipschiz continuous. However although $g(x)$ is Lipschiz continuous, $g(x)$ may not be differentiable. $g(x) = \vert x \vert$ is Lipschiz continuous but is not differentiable.

$$
\begin{align*}
  \vert g(x) - g(y) \vert = \vert \vert x \vert - \vert y \vert \vert \leq \vert x - y \vert \\
\end{align*}
$$

# Uniqueness

If $\vert f(x, t) \vert < M$ and $\vert f(x, t) - f(y, t) < L \vert\vert x - y \vert\vert$ for all $x, y, t$, then

there exists $\epsilon > 0$ such that

$$
\begin{align}
  \dfrac{dx}{dt} &= f(x, t) \\
  x(t_0) &= x_0
\end{align}
$$

has a unique solution in $(t_0 - \epsilon, t_0 + \epsilon)$.

<span style="color: #2D3748; background-color:#fff5b1;">Proof</span>

(1)의 양변을 적분하자.

$$
x(T) - x(0) = \int_0^T f(x(t), t)dt
$$

Picard equation

$$
x_1(t) = x_0 + \int_0^t f(x_0(s), s)ds \\
x_2(t) = x_0 + \int_0^t f(x_1(s), s)ds \\
\vdots \\
x_{n+1}(t) = x_0 + \int_0^t f(x_{n}(s), s)ds \\
$$

다음과 같이 표현할 수 있다.

$$
x_n(t) = \sum_{i=1}^n \left( x_i(t) - x_{i-1}(t)\right) + x_0(t)
$$

다음이 수렴함을 보이자.

$$
\sum_{i=1}^{\infty} \left( x_i(t) - x_{i-1}(t)\right) < \infty
$$

$$
\begin{align*}
  \vert x_i(t) - x_{i-1}(t) \vert &\leq \int_0^t \vert f(x_{i-1}(s), s) - f(x_{i-2}(s), s) \vert ds \\
  &\leq \int_0^t L \vert\vert x_{i-1}(s) - x_{i-2}(s) \vert\vert ds \\
  &= L \int_0^t \vert\vert x_{i-1}(s) - x_{i-2}(s) \vert\vert ds
\end{align*}
$$
