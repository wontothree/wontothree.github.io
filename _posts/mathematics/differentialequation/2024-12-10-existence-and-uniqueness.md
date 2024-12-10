---
title: "[Differential Equation] Existence and Uniqueness"
categories:
  - differentialequation
---
# Lipschiz Continuity

<span style="color: #2D3748; background-color:#fff5b1;">Definition</span>

Function $g: \mathbb{R}^n \rightarrow \mathbb{R}$ is Lipschiz continuous if

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
  \vert g(x) - g(y) \vert = \vert x^2 - y^2  = \vert x + y \vert \cdot \vert x - y \vert &\leq L \vert x - y \vert \\

  \leftrightarrow \\
  (L - \vert x + y \vert) \vert x - y \vert &\geq 0
\end{align*}
$$

for $x, y \in \mathbb{R}$.

However, $g(x) = x^2$ is Lipschiz continuous on $[0, 1]$.

<span style="color: #2D3748; background-color:#fff5b1;">Differentiable and Lipschiz Coninuous</span>
