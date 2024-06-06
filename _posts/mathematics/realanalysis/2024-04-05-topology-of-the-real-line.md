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

## 1. Metric Spaces

>**[DEFINITION 2.1.1]** \
>For a real number $x$ the absolute value of $x$, denoted $|x|$, is deinfed by $|x|$ ...

From the definition, $\vert x \vert \geq 0$ for all $x \in \mathbb{R}$ and $\vert x \vert = 0$ if and only if $x = 0$.

다음의 총 8가지 정리는 실수이기만 하면 성립한다.

>**[THEOREM 2.1.2]** \
>(a) $|-x| = |x|$ for all $x \in \mathbb{R}$. \
>(b) $|xy| = |x| |y|$ for all $x, y \in \mathbb{R}$. \
>(c) $|x| = \sqrt{x^2}$ for all $x \in \mathbb{R}$. \
>(d) If $r$ > 0, then $|x| < r$ if and only if $-r < x < r$. \
>(e) $-|x| \leq x \leq |x|$ for all $x \in \mathbb{R}$.

>**[THEOREM 2.1.3]** (Triangle Inequality) \
>For all $x, y \in \mathbb{R}$, we have $|x + y| \leq |x| + |y|$.

>**[COROLLARY 2.1.4]** \
>For all $x, y, z \in \mathbb{R}$, we have \
>(a) $|x - y| \leq |x - z| + |z - y|$, and \
>(b) $||x| - |y|| \leq |x - y|$.

Geometrically, $\vert x \vert$ represents the distance from $x$ to the origin 0.

More generally for $x, y \in \mathbb{R}$, the **euclidean distance** $d(x, y)$ is defined by

$$
d(x, y) = |x - y|.
$$

The distance $d$ may be regard as a function on $\mathbb{R} \times \mathbb{R}$ wich satisfy the following properties : $d(x, y) \geq 0$, $d(x, y) = 0$ if and only if $x = y$, $d(x, y) = d(y, x)$, and $d(x, y) \leq d(x, z) + d(z, y)$ for all $x, y, z \in \mathbb{R}$.

We now extend the notion of distance to sets other than $\mathbb{R}$.

>**[DEFINITION 2.1.6]** \
>Let $X$ be a nonempty set. A real valued function $d$ defined on $X \times X$ satisfying \
>(1) $d(x, y) \geq 0$ for all $x, y \in X$, \
>(2) $d(x, y) = 0$ if and only if $x = y$, \
>(3) $d(x, y) = d(y, x)$, \
>(4) $d(x, y) \geq d(x, z) + d(z, y)$ for all $x, y, z \in \mathbb{R}$ \
>is called a **metric** or **distance function** on $X$. \
>The set $X$ with metric of $d$ is called a **metric space**, and is denoted by $(X, d)$

All of these properties are what we intuitively expect a distance function to satisfy.

수열의 극한의 정의에서 거리 함수가 사용된다.

## 2. Open and Closed Sets

## 3. Compact Sets

## 4. Compact Subsets of $\mathbb{R}$

## 5. The Cantor Set

## 궁금한 점

- Matric Space의 의미가 뭘까?

## Reference

Manfred - Introduction to Real Analysis : Ch02
