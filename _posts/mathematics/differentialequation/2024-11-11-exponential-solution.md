---
title: "[Differential Equation] Exponential Solution"
categories:
  - differentialequation
---
# Introduction

다음의 미분 방정식들에 대해

$$
\begin{align*}
  x_1'(t) &= a_{11}x_1(t) + a_{12}x_2(t) + \dots + a_{1n}x_n(t) \\
  x_2'(t) &= a_{21}x_1(t) + a_{22}x_2(t) + \dots + a_{2n}x_n(t) \\
  & \vdots \\
  x_n'(t) &= a_{n1}x_1(t) + a_{n2}x_2(t) + \dots + a_{nn}x_n(t) \\
\end{align*}
$$

다음과 같이 정의한다면

$$
X
=
\begin{bmatrix}
  x_1 \\
  x_2 \\
  \vdots \\
  x_n \\
\end{bmatrix}
, \;\;\;
A
=
(a_{ij})
$$

미분 방정식들을 다음과 같이 간략하게 나타낼 수 있다.

$$
X' = AX
$$

하나의 미분방정식의 해와 꼴로부터 위 미분 방정식의 일반해의 꼴을 다음과 같이 유추할 수 있다.

$$
X(t) = e^{At}X(0)
$$

where

$$
e^A = I + A + \dfrac{A^2}{2!} + \dots
$$

만약 우리가 $e^A$ 를 계산할 수 있다면 ordinary differential equation은 다 푼 것이다.

# Exponential Matrix

matrix A가 symmetric이라고 가정하고, $\lambda_i, v_i$가 각각 A의 고유값과 고유벡터라고 하자. 그러면 다음과 같이 식을 전개할 수 있다.

$$
\begin{align*}
  A
  \begin{bmatrix}
    v_1 & v_2 & \dots & v_n
  \end{bmatrix}
  &=
  \begin{bmatrix}
    Av_1 & Av_2 & \dots & Av_n
  \end{bmatrix} \\
  &=
  \begin{bmatrix}
    \lambda_1 v_1 & \lambda_2 v_2 & \dots & \lambda_n v_n
  \end{bmatrix} \\
  &=
  \begin{bmatrix}
    v_1 & v_2 & \dots & v_n
  \end{bmatrix}
  \begin{bmatrix}
    \lambda_1 & 0 & \dots & 0 \\
    0 & \lambda_2 & \dots & 0 \\
    \vdots & & \ddots & \vdots \\
    0 & 0 & \dots & \lambda_n \\
  \end{bmatrix}
\end{align*}
$$

에서

$$
AV = VD \;\;\; \Leftrightarrow \;\;\; V^{-1}AV = D
$$

where

$$
V
=
\begin{bmatrix}
  v_1 & v_2 & \dots & v_n
\end{bmatrix}
, \;\;\;
D
=
\begin{bmatrix}
  \lambda_1 & 0 & \dots & 0 \\
  0 & \lambda_2 & \dots & 0 \\
  \vdots & & \ddots & \vdots \\
  0 & 0 & \dots & \lambda_n \\
\end{bmatrix}
$$

diagonal matrix D에 대한 exppnential은 다음과 같이 구할 수 있다.

$$
\begin{align*}
  e^D &= I + D + \dfrac{D^2}{2!} + \dots \\
  &=
  \begin{bmatrix}
    e^{\lambda_1} & 0 & \dots & 0 \\
    0 & e^{\lambda_2} & \dots & 0 \\
    \vdots &  & \ddots & \vdots \\
    0 & 0 & \dots & e^{\lambda_n} \\
  \end{bmatrix}
\end{align*}
$$

따라서

$$
\begin{align*}
  e^A
  &= e^{VDV^{-1}} \\
  &= \sum_{k=0}^{\infty} \dfrac{(VDV^{-1})^k}{k!} \\
  &= \sum_{k=0}^{\infty} \dfrac{VD^kV^{-1}}{k!} \\
  &= V \left( \sum_{k=0}^{\infty} \dfrac{D^k}{k!} \right) V^{-1}\\
  &= V e^D V^{-1}
\end{align*}
$$

# Example

Lemma) Suppose $AB = BA$, Then $e^{A + B} = e^A e^B$

For

$$
A
=
\begin{bmatrix}
  1 & 1 \\
  0 & 1 \\
\end{bmatrix}
$$

Find $e^A$

Sol)

A는 diagonal matrix

$$
\begin{align*}
  A
  &=
  \begin{bmatrix}
    1 & 1 \\
    0 & 1 \\
  \end{bmatrix} \\
  &=
  \begin{bmatrix}
    1 & 0 \\
    0 & 1 \\
  \end{bmatrix}
  +
  \begin{bmatrix}
    0 & 1 \\
    0 & 0 \\
  \end{bmatrix} \\
  &= I + N
\end{align*}
$$

where

$$
N
=
\begin{bmatrix}
  0 & 1 \\
  0 & 0 \\
\end{bmatrix} \\
$$