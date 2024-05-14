---
title: "Discrete Probability"
excerpt: "Discrete Mathematics (Ch07)"
categories:
  - discretemathematics
---
## 1. An Introudction to Discrete Probability

## 2. Probibility Theory

## 3. Bayes' Theorem

>**[Theorem]** \
>Suppose that $E$ and $F$ are events from sample space $s$ such that $p(E) \neq 0$ and $p(F) \neq 0$. Then \
>$Pr [F \| E] = \dfrac{Pr[E \| F] \cdot Pr[F]}{Pr[E]} = \dfrac{Pr[E \| F] \cdot Pr[F]}{Pr[E \| F] \cdot Pr[F] + Pr[E \| \bar{F}] \cdot Pr[\bar{F}]}$

## 4. Expected Value and Variance

>**[Definition]** \
>The expected value (or expectation) of the random variable $X(s)$ on the sample space $S$ is equal to $E(X) = \sum_{s \in S}p(s)X(s)$.

>**[Theorem]** \
>The expected numnber of successes when $n$ Bernoulli trials are performed, where $p$ is the probibility of success on each trial, is $np$.

Linearity of Expectations

>**[Theorem]** \
>If $X_i, i = 1, 2, \dots, n$ with $n$ a positive integer, are random variable on $S$, if a and b are real numbers, then \
>(i) E(X_1 + X_2 + \dots + X_n) \
>(ii) E(aX + b) = aE(X) + b.

## Reference

Kenneth H. Rosen - Discrete Mathematics and Its Applications : Chapter 07
