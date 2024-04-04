---
title: "[Real Analysis] Ch01. The Real Numbers"
excerpt: Manfred - Introduction to Real Analysis
categories:
  - realanalysis
toc: true
use_math: true
---
## 1. Sets and Operations on Sets

## 2. Functions

## 3. Mathematical Induction

## 4. The Least Upper Bound Property

## 5. Consequences of the Least Upper Bound Property

THEOREM 1.5.1 (Archimedian Property)

## 6. Binary and Ternary Expansions

## 7. Countable and Uncountable Sets

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
>$\N \times \N$ is countable

### Sequences

>**[DEFINITION 1.7.5]**
>If $A$ is a set, by a **sequence** in $A$ we mean a function $f$ from $\N$ into $A$. For each $n \in \N$, let $x_n = f(n)$. Then $x_n$ is called the $n$th term of the sequence $f$

- 고등학교 수학에서와 달리 함수를 통해 수열을 정의한다.

>**[THEOREM 1.7.6]**
>Every infinite subset of a countable set is countable

>**[THEOREM 1.7.7]**
>If $f$ maps $\N$ onto $A$, then $A$ is at most countable

### Index Families of Sets

### The Countability of $\mathbb{Q}$

>**[THEOREM 1.7.15]**
>If $\{E_n\}_{n=1}^{\infty}$ is a sequence of countable sets and $$S = \cup_{n=1}^{\infty} E_n$$, then $S$ is countable.

>**[COROLLARY 1.7.16]**
>$\mathbb{Q}$ is countable.

### The Uncountablity of $\mathbb{R}$

>**[THEOREM 1.7.17]**
>The closed inverval $[0. 1]$ is uncountable.

>**[THEOREM 1.7.18]**
>If $A$ is the set of all sequences whose elements are 0 or 1, then $A$ is uncountable.
