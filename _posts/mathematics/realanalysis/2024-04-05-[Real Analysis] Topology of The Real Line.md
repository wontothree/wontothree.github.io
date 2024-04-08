---
title: "[Real Analysis] Topology of THe Real Line"
excerpt: "Manfred - Introduction to Real Analysis : Ch02"
categories:
  - realanalysis
toc: true
toc_icon: star
share: false
use_math: true
---
2장에서는 실수에서의 이야기였다면 3장은 그것을 Matric Space로 확장한다.

## 1 Metric Spaces

>**[DEFINITION 2.1.1]** For a real number $x$  the absolute value of $x$, denoted $|x|$, is deinfed by $|x| = $

>**[THEOREM 2.1.2]** \
>(a) $|-x| = |x|$ for all $x \in \mathbb{R}$. \
>(b) $|xy| = |x| |y|$ for all $x, y \in \mathbb{R}$. \
>(c) $|x| = \sqrt{x^2}$ for all $x \in \mathbb{R}$. \
>(d) If $r$ > 0, then $|x| < r$ if and only if $-r < x < r$. \
>(e) $-|x| \leq x \leq |x|$.

>**[THEOREM 2.1.3]** (Triangle Inequality) \
>For all $x, y \in \mathbb{R}$, we have $|x + y| \leq |x| + |y|$.

>**[COROLLART 2.1.4]** For all $a, y, x \in \mathbb{R}$ we have \
>(a) $|x - y| \geq |x - z| + |z - y|$, and \
>(b) $||x| - |y|| \leq |x - y|$.

Geometrically, $|x|$ represents the distance from $x$ to the origin 0. More generally for $x, y \in \mathbb{R}$, the **euclidean distance** $d(x, y)$ is defined by

$$
d(x, y) = |x - y|
$$

>**[DEFINITION 2.1.6]** \
>Let $X$ be a nonempty set. A real valued function $d$ defined on $x \times X$ satisfying \
>(1) $d(x, y) \geq 0$ for all $x, y \in X$, \
>(2) $d(x, y) = 0$ if and only if $x = y$, \
>(3) $d(x, y) = d(y, x)$, \
>(4) $d(x, y) \geq d(x, z) + d(z, y)$ for all $x, y, z \in \mathbb{R}$ \
>is called a **matic** or **distance function** on $X$. The set $X$ with metric of $d$ is called a **metric space**, and is denoted by $(X, d)$

## 2 Open and Closed Sets

## 3 Compact Sets

## 4 Compact Subsets of $\mathbb{R}$

## 5 The Cantor Set

## 궁금한 점

- Matric Space의 의미가 뭘까?