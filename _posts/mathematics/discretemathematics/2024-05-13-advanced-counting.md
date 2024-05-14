---
title: "Advanced Counting"
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

>**[Definition]** \
> A linear homogeneous recurrence relation of degree $k$ with constant coefficients is a recurrence relation of the form $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$, where $c_1, c_2, \dots, c_k$ are real numbers, and $c_k \neq 0$.

>**[Theorem]** \
> Suppose that $r^2 - c_1r - c_2 = 0$ ahs two distinct roots $r_1$ and $r_2, where $c_1 and $c_2$ be real numbers. Then
>$\{a_n\}$ is a solution of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2}$
>a_n = \alpha_1 r^n + \alpha_2 r_2^n for $n \geq 0$, where $\alpha_1$ and $\alpha_2$ are constants.

이게 선형 대수와 연관된다. 방데르몽데 행렬

2차로 나타난 recurrent 행렬의 일반항은 항상 구할 수 있다.

이제 피보나치 수열의 일반항를 구할 수 있다.

## 3. Divide-and-Conquer Algorithms and Recurrence Relations

## 4. Generating Function

## 5. Inclusion-Exclusion

## 6. Applications of Inclusion-Exclusion

## Reference

Kenneth H. Rosen - Discrete Mathematics and Its Applications : Chapter 08
