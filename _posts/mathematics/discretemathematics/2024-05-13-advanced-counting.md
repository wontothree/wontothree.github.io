---
title: "[Discrete Mathematics] Advanced Counting"
excerpt: "Discrete Mathematics (Ch08)"
categories:
  - discretemathematics
---
## 1. Recurrence Relations

>**[Definition]** \
>A Recurrence relation for the sequence for the sequence $\{a_n\}$ is an equation that express $a_n$ in terms of one or more fo the previous terms of the sequence, namely, $a_0, a_1, \dots, a_{n-1}$, for all integer $n$ with $n \geq n_0$, where is $n_0$ a nonnegative integer. \
>A sequence is called a solution of a recurrence relation if its terms satisfy the recurrence relation.

- Fibonacci number

$$
a_n = a_{n-1} + a_{n-2}
\\
x^n = x^{n-1} + x^{n-2}
\\
x^2 = x + 1
$$

미방과 유사하다.

-The Tower of Hanoi

$$
a_n = 2a_{n-1} + 1
\\
(a_n + 1) = 2(a_{n-1} + 1)
\\
a_n = 2^n - 1
$$

- Counting bit strings of length n with no two consecutive 0s
- Codeword enumeration example
- Catalan numbers

## 2. Solving linear Recurrence Relations

>**[Definition 1]** \
> A linear homogeneous recurrence relation of degree $k$ with constant coefficients is a recurrence relation of the form $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$, where $c_1, c_2, \dots, c_k$ are real numbers, and $c_k \neq 0$.

>**[Theorem 1]** \
> Suppose that $r^2 - c_1r - c_2 = 0$ ahs two distinct roots $r_1$ and $r_2$, where $c_1$ and $c_2$ be real numbers. Then
>$\{a_n\}$ is a solution of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2}$
>a_n = \alpha_1 r^n + \alpha_2 r_2^n for $n \geq 0$, where $\alpha_1$ and $\alpha_2$ are constants.

이게 선형 대수와 연관된다. 방데르몽데 행렬

2차로 나타난 recurrent 행렬의 일반항은 항상 구할 수 있다.

이제 피보나치 수열의 일반항를 구할 수 있다.

>**[Theorem 2]** \
>Let $c_1$ and $c_2$ be real numbers with $c_2 \neq 0$. Suppose that $r^2 - c_1r c_2 = 0$ has only one root $r_0$. A sequence $a_n$ is a solution of the recurrence relation $a_n = c_1 a_{n-1} + c_2 a_{n-2}$ if and only if $a_n = \alpha_1 r_0^n + \alpha_2 n r_0^n$, for $n = 0, 1, 2, \dots$, where $\alpha_1$ and $\alpha_2$ are constants.

Linear homogeneous recurrence relation with constant coefficients는 모두 풀 수 있다.

Linear nonhomogeneous recurrent relation with constant coefficients를 풀 수 있을까?

>**[Theorem]** \
>If $\{a_n^{(p)}\}$ is a particular solution of the nonhomogeneous linear recurrence relation with constant coefficients

1. homogeneous solution
2. particular solution

master

>**[Theorem]** \
> Suppose that $\{a_n\}$ satisfies the linear nonhomogeneous recurrence relation \
>$a_n$ = c_1a_{n-1}

## 3. Divide-and-Conquer Algorithms and Recurrence Relations

$$
a_2a_1 \times b_2b_1
\\
f(n) = 4f(n/2) + 3n
$$

카르슈바

$$
f(n) = 3f(n/2) + \dots
\\
O(\log_23)
$$

Divide and conquer example

Master theorem : Big notation을 알려준다. 시간 복잡도가 우리의 목적이다. 이것만 기억하면 된다. Theorem for the relation of $f(n) = af(n/b) + g(n)$은 외울 필요 x

>**[Theorem]** \
>Let f be an increasing function that satisfies the recurremce relation $f(n) = af(n/b) + cn^d$ whenever $n = b^k$, where $k$ is a positive integer, $a \geq 1$, b is an integer greater than 1, and c and d are real numbers with c positive and d nonnegative. Then
>

Karatsuba

더하기 빼기만으로 이끌어낸다.

Closed-Pair Problem

## 4. Generating Function

### 4.1 Introduction

### 4.2 Useful Facts Abour Power Series

>**[Definition 2]** \
>Let $u$ be a real number and $k$ a nonnegativie integer. Then the extended binomial coefficient .. is defined by

>**[Theorem 2]** \
>$(1 + x)^n = \sum_{k=0}^\infty \combination (n, k) x^k$

### 4.3 Counting Problem and Generating Functions

### 4.4 Using Generating Functions to Solve Recurrence Relations

## 5. Inclusion-Exclusion

>**[Theorem 1] THE PRINCIPLE OF INCLUSION-EXCLUSION** \
>Let $A_1, A_2, \dots, A_n$ be finite sets.
>

## 6. Applications of Inclusion-Exclusion

### 6.2 An Alternative Form of Inclusion-Exclusion

### 6.3 The Sieve of Eratosthenes

### 6.4 The Number of Onto Functions

>**[Theorem 1]** \
>Let $m$ and $n$ be positive integers with $m \geq n$. Then, there are
>$n^m - C(n, 1) (n-1)^m + C(n, 2) (n-2)^m \dots$

### 6.4 Derangements

>**[Theorem 2]** \
>The number of deranements of a set with $n$ elements is \
>$D_n = n! [1 - \dfrac{1}{1!}]$

## Reference

Kenneth H. Rosen - Discrete Mathematics and Its Applications : Chapter 08

## 생각

Divied and Conquer와 반대되는 것이 End-to-End인 것 같다.