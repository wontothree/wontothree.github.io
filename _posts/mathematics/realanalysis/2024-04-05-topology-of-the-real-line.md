---
title: "[Real Analysis] Topology of the Real Line"
excerpt: "Real Analysis"
categories:
  - realanalysis
---
1장이 실수에서의 이야기였다면 2장은 그것을 Matric Space로 확장한다.

We introduce some of the basic concepts fundamental to the study of limits and continuity, and study the structure of point sets in $\mathbb{R}$.

Topology : The branch of mathematics concerned with the study of these topics - the real numbers, more general sets.

One of the primary goals of topology is to provide an appropriate setting for the study of many important mathematical concepts - limit point of a set and the limit process.

One of the first topics encountered in the study of calculus is the concept of limit, which requites the notion of closeness, ot the distance between points becoming small.

- On the real linea or in the euclidean plane, the distance between points is usually measured as the length of the stright line segment joining the points.
- However, in may instances our points are functions defined on some set.
- For this reason, we introduce the concept of distance on an arbitrary set and study metric spaces in general

# 1. Metric Spaces

We begin our study of metric spaces with a review of distance between points in the real numbers or its geometric interpretation as the real line.

<span style="color: #2D3748; background-color:#fff5b1;">**[DEFINITION 2.1.1]**</span>

From the definition,

$$
\vert x \vert \geq 0
$$

for all $x \in \mathbb{R}$

and

$$\vert x \vert = 0$$

if and only if

$$x = 0$$

다음의 총 8가지 정리는 실수이기만 하면 성립한다.

<span style="color: #2D3748; background-color:#fff5b1;">**[THEOREM 2.1.2]**</span>

a

$$|-x| = |x|$$

for all $x \in \mathbb{R}$

b

$|xy| = |x| |y|$ for all $x, y \in \mathbb{R}$

c

$$
|x| = \sqrt{x^2}
$$

for all $x \in \mathbb{R}$

d

If $r$ > 0, then

$$
|x| < r
$$

if and only if

$$
-r < x < r
$$

e

$$
-|x| \leq x \leq |x|
$$

for all $x \in \mathbb{R}$

<span style="color: #2D3748; background-color:#fff5b1;">**[THEOREM 2.1.3]** (Triangle Inequality)</span>

For all $x, y \in \mathbb{R}$, we have

$$
|x + y| \leq |x| + |y|
$$

<span style="color: #2D3748; background-color:#fff5b1;">**[COROLLARY 2.1.4]**</span>

For all $x, y, z \in \mathbb{R}$, we have

(a)

$$
|x - y| \leq |x - z| + |z - y|
$$

$$
||x| - |y|| \leq |x - y|
$$

Geometrically, $\vert x \vert$ represents the distance from $x$ to the origin 0.

More generally for $x, y \in \mathbb{R}$, the **euclidean distance** $d(x, y)$ is defined by

$$
d(x, y) = |x - y|
$$

The distance $d$ may be regard as a function on $\mathbb{R} \times \mathbb{R}$ wich satisfy the following properties : $d(x, y) \geq 0$, $d(x, y) = 0$ if and only if $x = y$, $d(x, y) = d(y, x)$, and $d(x, y) \leq d(x, z) + d(z, y)$ for all $x, y, z \in \mathbb{R}$.

We now extend the notion of distance to sets other than $\mathbb{R}$.

<span style="color: #2D3748; background-color:#fff5b1;">**[DEFINITION 2.1.6]**</span>

Let $X$ be a nonempty set. A real valued function $d$ defined on $X \times X$ satisfying

(1) $d(x, y) \geq 0$ for all $x, y \in X$

(2) $d(x, y) = 0$ if and only if $x = y$

(3) $d(x, y) = d(y, x)$

(4) $d(x, y) \geq d(x, z) + d(z, y)$ for all $x, y, z \in \mathbb{R}$

is called a **metric** or **distance function** on $X$. The set $X$ with metric of $d$ is called a **metric space**, and is denoted by $(X, d)$

All of these properties are what we intuitively expect a distance function to satisfy.

수열의 극한의 정의에서 거리 함수가 사용된다.

# 2. Open and Closed Sets

The purpose of this section is to give a precise meaning to the adjectivies open and closed for arbitrary subsets of $\mathbb{R}$ or a metric space $(X, d)$.

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.1]**</span>

Let (X, d) be a metric space and let $p \in \mathbb{X}$. For $\epsilon >0$, the set $N_\epsilon(p) = [ x \in \mathbb{X} : d(p, x) < \epsilon ]$ is called an $\epsilon$-neighborhood of the point $p$.

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.3]**</span>

Let $E$ be a subset of $X$. A point $p \in E$ is called an interior point of $E$ if there exists an $\epsilon > 0$ such that $N_\epsilon(p) \subset E$. \
The set of interior points of $E$ is denoted by Int(E), and is called the in terior of $E$.

## Open and Closed Sets

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.5]**</span>

(a) A subset $O$ of $\mathbb{R}$ is open if every point of $O$ is an interior point of $O$. \
(b) A subset $F$ of $\mathbb{R}$ is closed if $F^c = \mathbb{R} \setminus F$ is open.

<span style="color: #2D3748; background-color:#fff5b1;">**[Theorem 2.2.7]**</span>

Every open interval in $\mathbb{R}$ is an open subset of $\mathbb{R}$.

<span style="color: #2D3748; background-color:#fff5b1;">**[Theorem 2.2.9]**</span>

Let $(X, d)$ be a metric space. Then

a

for any collection $[ O_\alpha]_{\alpha \in A}$ of open subsets of $X$, $\cup_{\alpha \in A} O_\alpha$ is open, and \

b

for any finite collection $[ O_1, \dots, O_n ]$ of open subsets of $X$, $\cap_{j=1}^n$ is open.

<span style="color: #2D3748; background-color:#fff5b1;">**[Theorem 2.2.10]**</span>

Let (X, d) be a metric space. Then

(a)

for any collection

$$(F_\alpha)_{\alpha \in A}$$

of closed subsets of $X$,

$\cap_{\alpha \in A}$ is closed, and

(b)

for any finite collection $(F_1, \dots, F_n)$ of closed subsets of $X$, $\cup_{j=1}^n F_j$ is closed.

### Limit Points

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.12]**</span>

Let $E$ be a subset of a metric space $X$.

(a)

A point $p \in X$ is a limit point $E$ if every $\epsilon$-neighborhood $N_{\epsilon}(p)$ of $p$ contains a point $q \in E$$ with $q \neq q$

(b)

A point $p \in E$ that is not a limit point of $E$ is called an isolated point of $E$.

<span style="color: #2D3748; background-color:#fff5b1;">**[Theorem 2.2.14]**</span>

A subset $F$ of a metric space $X$ is closed if and only if $F$ conains all its limit points.

<span style="color: #2D3748; background-color:#fff5b1;">**[Corollary 2.2.16]**</span>

A finite set has no limit points.

### Closure of a Set

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.17]**</span>

If E is a seubset of ametric space $X$, let $E'$ denote the set of limit points of $E$. The closure of $E$, denoted $\bar{E}$ is defined as $\bar{E}= E \cup E'$.

<span style="color: #2D3748; background-color:#fff5b1;">**[Theorem 2.2.18]**</span>

(a) $\bar{E}$ is closed \
(b) $E = \bar{E}$ if and only if $E$ is closed \
(c) $\bar{E} \subset F$ for every closed set $F \subset X$ such that $E \subset F$

<span style="color: #2D3748; background-color:#fff5b1;">**[Definition 2.2.19]**</span>

A subset of $D$ of a metric space $X$ is dense in $X$ if $\bar{D}=X$.

# Reference

Manfred - Introduction to Real Analysis : Ch02
