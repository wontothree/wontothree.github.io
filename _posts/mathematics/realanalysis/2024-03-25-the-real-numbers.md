---
title: "[Real Analysis] The Real Numbers"
excerpt: "Manfred - Introduction to Real Analysis : Ch01"
categories:
  - realanalysis
toc: true
toc_icon: star
share: false
use_math: true
---
## 1 Sets and Operations on Sets

## 2 Functions

>**[DEFINITION 1.2.1]** \
>Let $A$ and $B$ be any two sets. A function $f$ from $A$ into $B$ is a subset of $A \times B$ with the property \
>that each $x \in A$ is the first component of preciesly one ordered pair $(x, y)$; that is, for every $x \in A$ there exists $y \in B$ such that $(x, y) \in f$, \
>and if $(x, y)$ and $(x, y')$ are elements of $f$, then $y = y'$.\
>The set $A$ is called the **domain** of $f$, denoted Dom $f$. \
>The **range** of $f$, denoted Range $f$, is defined by  \
>$\text{Range} f = \{y \in B : (x, y) \in f \;\text{for some}\; x \in A\}$

>If Range $f = B$, then the function $f$ is said to be **onto** $B$

### Image and Inverse Image

### Inverse Function

>**[DEFINITION 1.2.7]** \
>A function $f$ from $A$ into $B$ is said to be one-to-one if whenever $x_1 \neq x_2$, then $f(x_1) \neq f(x_2)$

## 3 Mathematical Induction

>**WELL-ORDERING PRINCIPLE** \
>Every nonempty subset of $\mathbb{N}$ has a smallest element.

## 4 The Least Upper Bound Property

Both the rational numbers $\mathbb{Q}$ and real numbers $\mathbb{R}$ are algebraic systems known as *fields*.

>A Field is a set $\mathbb{F}$ with two perations, addition and multiplication, which satisfy the following axioms:
>1. If $a, b \in F$, then $a + b \in F$ and $a \cdot b \in \mathbb{F}$.
>2. For all $a, b\in F$, then $a + b = b + a, a \cdot b = b \cdot a$.
>3. For all $a, b, c \in F$, then $a + (b + c) = (a + b) + c, a \cdot (b \cdot c) = (a \cdot b) \cdot c$
>4. There exists an element $0 \in F$ such that $a + 0 = a$ for all $a \in F$.
>5. 
>6. 
>7.
>8.

>The real numbers $\mathbb{R}$ contain a subset $\mathbb{P}$ known as the positive real numbers satisfying the following: \
>(01) If $a, b \in \mathbb{P}$, then $a + b \in \mathbb{P}$ and $a \cdot b \in \mathbb{P}$. \
>(O2) If $a \in \mathbb{P}$, then one and only one of the following hold: \
>$a \in \mathbb{P}, -a \in \mathbb{P}, a = 0$.

### Upper Bound of Set

>**[DEFINITION 1.4.1]** \
>A subset $E$ of $\mathbb{R}$ is **bounded above** if there exists $\beta \in \mathbb{R}$ such that $x \leq \beta$ for every $x \in E$. \
> Such a $\beta$ is called an upper bound of $E$.

### Least Upper Bound od a Set

>**[DEFINITION 1.4.3]** \
>Let $E$ be a nonempty subset of $\mathbb{R}$ that is bounded above. \
> An element of $\alpha \in \mathbb{R}$ is called the **least upper bound** of **supremum** of $E$ if \
>(i) $\alpha$ is an upper bound of $E$, and \
>(ii) if $\beta \in \mathbb{R}$ satisfies $\beta < \alpha$, then $\beta$ is not an upper bound of $E$.

### Least Upper Bound Property of $\mathbb{R}$

### Intervals

## 5 Consequences of the Least Upper Bound Property

We look at a number of elementary properties of real numbers which in more elementary courses are usually always taken for granted. There are all actually consequences of the least upper bound property of the real numbers.

>**[THEOREM 1.5.1] (Archimedian Property)** \
>If $x, y \in \mathbb{R}$ and $x > 0$, then there exists a positive integer $n$ such that $nx > y$.

>**[THEOREM 1.5.2]** \
>If $x, y \in \mathbb{R}$ and $x < y$, then there exists $r \in \mathbb{Q}$ such that $x < r < y$.

>**[THEOREM 1.5.3]** \
>For every real number $x > 0$ and every positive integer $n$, there exists a unique positive real number $y$ so that $y^n = x$.

## 7 Countable and Uncountable Sets

We take a closer look at infinite sets and what it means for an infinite set ot be countable.

>**[DEFINITION 1.7.1]**
>Two sets $A$ and $B$ are said to be **equivalent** (or to have the same **cardinality**), denoted by $A$ ~ $B$, if there exists a one-to-one function of $A$ onto $B$.
>
>The notion of equivalence of sets satisfies the following:
>(i) $A$ ~ $A$ (reflexive)
>(ii) If $A$ ~ $B$, then $B$ ~ $A$. (symmetric)
>(iii) If $A$ ~ $B$ and $B$ ~ $C$, then $A$ ~ $C$. (transitive)

>**[DEFINITION 1.7.2]**
>For each positive integer $n$, let $\mathbb{N}_n = \{1, 2, 3, ... , n\}$. $\mathbb{N}$ denotes the set of all positive integers. If $A$ is a set, we say
>
>(a) $A$ is **finite** if $A$ ~ $\mathbb{N}_n$ for some n, or if $A = \emptyset$.
>
>(b) $A$ is **infinite** if $A$ is not finite.
>
>(c) $A$ is **countable** if $A$ ~ $N$.
>
>(d) $A$ is **uncountable** if $A$ is neither finite nor countable.
>
>(e) $A$ is **at most countable** if $A$ is finite or countable.

>**THEOREM 1.7.4**
>$\mathbb{N} \times \mathbb{N}$ is countable

### Sequences

>**[DEFINITION 1.7.5]**
>If $A$ is a set, by a **sequence** in $A$ we mean a function $f$ from $\mathbb{N}$ into $A$. For each $n \in \mathbb{N}$, let $x_n = f(n)$. Then $x_n$ is called the $n$th term of the sequence $f$

- 고등학교 수학에서와 달리 함수를 통해 수열을 정의한다.

>**[THEOREM 1.7.6]**
>Every infinite subset of a countable set is countable

>**[THEOREM 1.7.7]**
>If $f$ maps $\mathbb{N}$ onto $A$, then $A$ is at most countable

### The Countability of $\mathbb{Q}$

>**[THEOREM 1.7.15]**
>If $\{E_n\}_{n=1}^{\infty}$ is a sequence of countable sets and $S = \cup_{n=1}^{\infty} E_n$, then $S$ is countable.

>**[COROLLARY 1.7.16]**
>$\mathbb{Q}$ is countable.

### The Uncountablity of $\mathbb{R}$

>**[THEOREM 1.7.17]**
>The closed inverval $[0. 1]$ is uncountable.

>**[THEOREM 1.7.18]**
>If $A$ is the set of all sequences whose elements are 0 or 1, then $A$ is uncountable.

## 궁금한 점

- 첫 번째 order axiom이 field axiom과 중복되는데 왜 존해하는 것일까?