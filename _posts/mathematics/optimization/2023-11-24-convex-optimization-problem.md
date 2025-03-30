---
title: "[Optimization] Convex Optimization Problem"
excerpt: "Stephen Boyd - Convex Optimization : Ch04"
categories:
  - optimization
---
# 1.1 Basic terminology

$$
minimize \quad f_0(x) \\
subject \, to \quad f_i(x) \leq 0, \quad i = 1, ... , m \\
\qquad \qquad \quad \, h_i(x) = 0, \quad i = 1, ... , p
$$

- Optimization variable := $x$
- Optimization function(or cost function) := $f_0(x)$
- Inequality constraints := $f_i(x) \leq 0$
- Inequality constraint functions := $f_i : R^n \rightarrow R$
- Equality constraints := $h_i(x) = 0$
- Equality constraint functions := $h_i : R^n \rightarrow R$

$$
D = \bigcap_{i=0}^{m}dom \, f_i \, \cap \, \bigcap_{i=1}^{p}dom \, h_i
$$

- Domain of the optimization problem := the set of points for which the objective and all constraint functions are defined
- Feasible point $x \in D$ := a point satisfing the constraints $f_i(x) \leq 0, i = 1, ... , m, and \; h_i(x) = 0, i = 1, ... , p$
- Feasible problem := the problem in which there exists at least one feasible point and infeasible otherwise
- Feasible set(or constraint set) := the set of all feasible points

$$
p* = inf \{f_o(x) | f_i(x) \leq 0, i = 1, ... , m, h_i(x) = 0, i = 1, ... , p\}
$$

- Optimal value := $p*$
- The problem is unbounded below := if there are feasible points $x_k$ with $f_0(x_k) \rightarrow -\infty$, then $p* \rightarrow -\infty$

## Optimal and locally optimal points

- Optimal point := $x*$ if $x*$ is feasible and $f_0(x*) = p*$
- Optimal set := the set of all optimal points $X_{opt}$

$$
X_{opt} = \{x| f_i(x) \leq 0, i = 1, ... , m, h_i(x) = 0, i = 1, ... , p, f_0(x) = p*\}
$$

- Optimal value is attained or achieved(and the problem is solvable) : there exists an optimal opint for the optimization problem
- Optimal value is not attained or not achieved : $X_{opt}$ is empty
- $\epsilon$ - suboptimal point : a feasible point $x$ with $f_0(x) \leq p* + \epsilon$
- $\epsilon$ - suboptimal set : the set of all $\epsilon$ - suboptimal points
- Locally optimal : a feasible point $x$ in which there is an $R > 0$ such that

$$
f_0(x) = inf\{f_0(z) | f_i(z) \leq 0, i = 1, ... , m, \;\;h_i(z) = 0, i = 1, ..., p, \;\; ||z - x||_2 \leq R\},
$$

or, in other word, $x$ solve the optimization problem

$$
\text{minimize} \;f_0(z)
\\
\text{subject to} \;f_i(z) \leq 0, \;\; i = 1, ... ,m
\\
h_i(z) = 0, \;\; i = 1, ... ,p
\\
||z - x|| \leq R
$$

## Feasibility problems

- Feasibility problem : a problem in which if the objective function is identically zero, the optimal value is either zero or inifinity

$$
\text{find} \;\; x
\\
\text{subject to} \;\; f_i(x) \leq 0, \;\; i = 1, ..., m
\\
h_i(x) = 0 \;\; i = 1, ..., m
$$

>Example 4.1 - We illustrate these definitions with a few simple unconstrained optimization problems with variable $x \in R$, and $\textbf{dom} f_0 = R++$

- $f_0(x) = \dfrac{1}{x} : p* = 0$, but the optimal value is not achieved.
- $f_0(x) = -\log x : p* = \infty$, so this problem is unbounded below.
- $f_0(x) = x \log x : p* = -1/e$, achieved at the unique optimal point $x* = 1/e$

# 1.2 Expressing problems in standard form

In the standard form problem we adopt the convention that the righthand sied of the inequlity and equlity constraints are zero.

>Example 4.2 - *Box constraints*. Consider the optimization problem
$$
\text{minimizate} \;f_0(x)
\\
\text{subject to} \; i_i \leq x_i \leq u_i, \;\; i = 1, ... , n,
$$
where $x \in R$ is variable. The constraints are called variable bounds (since they give lower and upper bounds for each $x_i$) or box constraints (since the feasible set is a box)

We can express this problem in standard form as
$$
\text{minimizate} \;f_0(x)
\\
\text{subject to} \; i_i - x_i \leq 0 \;\; i = 1, ... , n,
\\
x_i - u_i \leq 0 \;\; i = 1, ... , n,
>$$
There are 2n inequality constraint functions:
$$
f_i(x) = i_i - x_i \;\; i = 1, ... , n
$$
and
$$
f_i(x) = x_i - u_i \leq 0 \;\; i = n, ... , 2n,
$$

## Maximization problems

We can solve the maximization problem by minizing the function $-f_0$ subject ot the constraints

- Utility(or satisfaction levbel) : an objective in the maximization problem

Maximization problem

$$
\text{maximize} \;\; f_0(x)
\\
\text{subject to} \;\; f_i(x) \leq 0, \;\;\; i = 1, ..., m
\\
h_i(x) = 0 \;\;\; i = 1, ..., p
$$

$$
p* = \sup\{f_0(x) | f_i(x) \leq 0, i = 1, ..., m, \;\; h_i(x) = 0, i = 1, ..., p\}
$$

## 1.3 Equivalent problems

Tow problems are equivalent : from a solution of one, a solution of the other is readily found, and vice versa

## 1.4 Parameter and oracle problem descriptions

# 2. Convex optimization

## 2.1 Convex optimization problems in standard form

$$
minimize \quad f_0(x) \\
subject \, to \quad f_i(x) \leq 0, \quad i = 1, ... , m \\
\qquad \qquad \quad \, a_i^T x = b_i, \quad i = 1, ... , p
$$

Comparing with the general standard form problem, the convex problem hase three additional requirements

- the objective functions must be convex.
- the inequality constraint functions must be convex.
- the equality constraint functions $h_i(x) = a_i^Tx - b_i$ must be affine

The feasible set of a convex optimization problem is convex, since it is the intersection of the domain of the problem which is a convex set, with m sublevel sets and p hyper planes. Thus, in aconvex optimization problem, we minimize a convex objective function over a convex set.

$$
D = \cap_{i=0}^m \textbf{dom}f_i
$$

### Concave maximization problems

$$
\text{maximizate} \quad f_0(x) \\
\text{subject} \, to \quad f_i(x) \leq 0, \quad i = 1, ... , m \\
\qquad \qquad \quad \, a_i^T x = b_i, \quad i = 1, ... , p
$$

This concave optimization problem is readily solved by minimizing the convex objective function $-f_0$

### Abstract form convex optimization problem

It is important to note a subtlety in our definition of convex optimization problem.

This problem is not a convex optimization problem in standard form since the equality function $h_1$ is not affine, and the inequality constraint function $f_1$ is not convex.

$$
\text{minimize} \quad f_0(x) = x_1^2 + x_2^2
\\
\text{subject} \, to \quad f_1(x) = \dfrac{x_1}{1 + x_2^2} \leq 0
\\
\qquad \qquad \quad \, h_1(x) = (x_1 + x_2)^2 = 0
$$

The problem is readily reformulated as

$$
\text{minimize} \quad f_0(x) = x_1^2 + x_2^2
\\
\text{subject} \, to \quad f_1(x) = x_1 \leq 0
\\
\qquad \qquad \quad \, h_1(x) = (x_1 + x_2) = 0
$$

## 2.2 Local and global optima

A fundemental property of convex optimization problems is that any locally optimal point is also globally optimal

Pf

Supoose that $x$ is locally optimal for a convex optimization - $x$ is feasible and

$$
f_0(x) = \text{inf} \; \{f_0(z) | z \;\text{feasible}, ||z - x||_2 \leq R\}
$$

for some $R > 0$.

Suppose that $x$ is bot globally optimal - there is a feasible $y$ such that $f_0(y) < f_0(x)$

Evidently $||y - x||_2 > R$, since otherwise $f_0(x) \leq f_0(y)$.

Consider the point $z$ given by

$$
z = (1 - \theta) x + \theta y, \;\; \theta = \dfrac{R}{2||y - x||_2}.
$$

Then we have

$$
||z - x||_2
= ||(1 - \dfrac{R}{2||y - x||_2}) x + \dfrac{R}{2||y - x||_2} y - x||_2
= \dfrac{y - x}{2||y - x||_2}R
= \dfrac{R}{2}
$$

, and by convexity of feasible set, $z$ is feasible.

By convexity of $f_0$ we have

$$
f_0(z) = f_0((1-\theta)x + \theta y)
\leq (1 - \theta)f_0(x) + \theta f_0(y)
\leq (1 - \theta)f_0(x) + \theta f_0(x)
= f_0(y)
$$

which contradicts.

Hence there exists no feasible $y$ with $f_0(y) < f_0(x)$, $x$ is globally optimal.

## 2.3 An optimality criterion for differentiable $f_0$

Suppose that the objective $f_0$ in a convex optimization problem is differentiable, so that for all $x, y \in \textbf{dom} f_0$

$$
f_0(y) \geq f_0(x) + \nabla f_0^T(x)(y - x)
$$

Let X denote the feasible set, i.e., 

$$
X = \{x | f_i(x) \leq 0, i = 1, ..., m, h_i(x) = 0  \}
$$

x is optimal if and only if $x \in X$ and

$$
\nabla f_0(x)^T(y - x) \geq 0 \;\;\text{for all} \; y \in X
$$

### Proof of optimal condition

First suppose $x \in X$ and satisfies

$$
\nabla f_0(x)^T(y - x) \geq 0 \;\;\text{for all} \; y \in X
$$

Then if $y \in X$,

$$
f_0(y) - f_0(x) \geq \nabla f_0^T(x)(y - x) \geq 0 \rightarrow f_0(y) \geq f_0(x)
$$

Conversely, suppose $x$ is optimal, but the conditon

$$
\nabla f_0(x)^T(y - x) \geq 0 \;\;\text{for all} \; y \in X
$$

does not hold, i.e., for some $y \in x$ we have

$$
\nabla f_0(x)^T(y - x) < 0
$$

Consider the point $z(t) = ty + (1-t)x$, where $t \in [0, 1]$ is a parameter. 

Since $z(t)$ is on the line segment between $x$ and $y$, and the feasible set is convex, $z(t)$ is feasible.

For small positive $t, f_0(z(t)) \leq f_0(x)$, which will prove that $x$ is not optimal.

### Unconstrainted problems

$$
x \;\text{is optimal} \quad \Leftrightarrow \quad\nabla f_0(x) = 0
$$

Suppose this optimality condition, which means that $x \in \textbf{dom} f_0$, and for all feasible $y \quad\nabla f_0(x)(y - x) \geq 0$

Since $f_0$ is differentiable, its domain is open, so all y sufficiently close to $x$ are feasible.

Let us take $y = x - t\nabla f_0(x)$, where $t \in R$ is parameter.

For $r$ small and positive, $y$ is feasible, and so

$$\nabla f_0(x)(y - x) = -t||\nabla f_0(x)||^2 \geq 0$$

from which we conclude $f_0(x) = 0$

Example 4.5 *Unconstrainted quadratic optimization*. Consider the problem of minimizing the quadrtic function

$$
f_0(x) = \dfrac{1}{2}x^TPx + q^Tx + r
$$

where $P \in S_+^n$ (which makes $f_0$) convex.

The necessary and sufficient condition for $x$ to be a minimizer of $f_0$ is

$$
\nabla f_0(x) = Px + q = 0
$$

- If $q \notin R(p)$, then there is no solution. In this case $f_0$ is unbounded below.
- If $P > 0$ (which is the condition for $f_0$ to be strictly convex), then there is a unique minimizer, $x* = - P^{-1}q$
- If

### Problems with equality constraints only

### Minimization over the nonnegative orthant

## 2.4 Equivalent convex problems

## 2.5 Quasiconex optimization

### Locally optimal solutions and optimality conditions

Let X denote the feasible set for the quasiconvex optimization problem. x is optimal if

$$
x \in X, \;\; \nabla f_0(x)^T(y - x) > 0 \;\text{for all} \; y \in X\{x\}
$$

# Reference

Stephen Boyd - Convex Optimization
