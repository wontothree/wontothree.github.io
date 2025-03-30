---
title: "[Discrete Mathematics] Discrete Probability"
excerpt: "Discrete Mathematics (Ch07)"
categories:
  - discretemathematics
---
## 1. An Introudction to Discrete Probability

## 2. Probibility Theory

- Experiment : a procedure that yields one of a given set of possible outcomes
- Sample space (of the experiment) : the set of possible outcomes
- Event : a subset of the sample space
- Event space : the power set of the sample space

### 2.4 Conditional Probability

### 2.7 Random Variables

>**[Definition 6]** \
>A random variable is a function from the sample space of an experiment to the set of real numbers.

### 2.8 The Birthday Problem

### 2.9 Monte Carlo Algorithms

- Deterministic algorithm : always proceeds in the same way whenever given the same input
- Probabilistic algorithm : algorithms that make random choices at one or more steps

Monte Carlo algorithms always produce answers to problems, but a small probility remains that rhere answers may be incorrect. However, the probability that the answer is incorrect decreases rapidly when the algorithm carries out sufficient computation.

## 3. Bayes' Theorem

>**[Theorem]** \
>Suppose that $E$ and $F$ are events from sample space $s$ such that $p(E) \neq 0$ and $p(F) \neq 0$. Then \
>$Pr [F \| E] = \dfrac{Pr[E \| F] \cdot Pr[F]}{Pr[E]} = \dfrac{Pr[E \| F] \cdot Pr[F]}{Pr[E \| F] \cdot Pr[F] + Pr[E \| \bar{F}] \cdot Pr[\bar{F}]}$

## 4. Expected Value and Variance

### 4.1 Introduction

The expected value of a random variable is the sum over all elements in a sample space of the product of the probibility of the element the value of the random variable at this element. Conseuqently, the expected value is a wighted average of the values of a random variable

Another useful measure of a random variable is its variane, which tell us how spread out the values of this random variable are.

>**[Definition 1]** \
>The expected value (or expectation) of the random variable $X(s)$ on the sample space $S$ is equal to $E(X) = \sum_{s \in S}p(s)X(s)$. \
>
>The deviation of $X$ at $s \in S$ is $X(s)-E(s)$, the difference between the value of $X$ and the mean of $X$.

>**[Theorem 2]** \
>The expected numnber of successes when $n$ Bernoulli trials are performed, where $p$ is the probibility of success on each trial, is $np$.

Linearity of Expectations

>**[Theorem 3]** \
>If $X_i, i = 1, 2, \dots, n$ with $n$ a positive integer, are random variable on $S$, if a and b are real numbers, then \
>(i) E(X_1 + X_2 + \dots + X_n) \
>(ii) E(aX + b) = aE(X) + b.

### 4.5 The Geometric Distribution

The random variable $X$ that equals the number of flips expected before a coin comes up tails is an example of a random variable with a geometric distribution.

>**[Definition 2]** \
>A random variable $X$ has a geometric distribution with parameter $p$ if $p(X=k) = (1-p)^{k-1}p$ for $k = 1, 2, 3, \dots$, where $p$ is a real number with $0 \leq p \leq 1$.

### 4.6 Independent Random Variables

Independent events, and now independent of two random variables

>**[Definition 3]** \
>The random variable $X$ and $Y$ on a sample $S$ are independent if
>
>$p(X=r_1 \;\text{and}\; Y=r_2) = p(X=r_1) \cdot p(Y=r_2)$.

### 4.7 Variance

>**[Definition 4]** \
>Let $X$ be a random variable on a sample space $S$. The variance of $X$, denoted by
>
>$V(X)$, is $V(X) = \sum_{s \in S}(X(s)-E(X))^2p(s)$.
>
>That is, $V(X)$ is the weighted average of the square of the deviation of $X$. The standard deviation of $X$, denoted $\sigma(X)$, is defined to be $\sqrt{V(X)}$.

>**[Theorem 6]** \
>If $X$ is a random variable on a sample space $S$, then $V(X) = E(X^2) - E(X)^2$.

>**[Corollary 1]** \
>If $X$ is a random variable on a sample space $S$ and $E(X) = \mu$, then $V(X) = E(X-\mu)^2$.

### 4.8 Chebyshev's Inequality

>**[Theorem 8]** \
>Let $X$ be a random variable on a sample sapce $S$ with probility function $p$. If $r$ is a positive real number, then
>
>$p(\vert X(s)-E(X) \vert \geq r) \leq V(X)/r^2$

## Reference

Kenneth H. Rosen - Discrete Mathematics and Its Applications : Chapter 07
