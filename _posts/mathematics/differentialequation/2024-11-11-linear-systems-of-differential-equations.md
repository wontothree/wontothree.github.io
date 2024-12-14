---
title: "[Differential Equation] Linear System of Differential Equations"
categories:
  - differentialequation
---
# The Matrix Exponential

## Introduction

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

## Exponential Matrix

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
AV = VD \;\;\; \Leftrightarrow \;\;\; A = VDV^{-1}
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

## Example

Lemma) Suppose $AB = BA$, Then $e^{A + B} = e^A e^B$

Find $e^A$

### Ex 1

$$
A
=
\begin{bmatrix}
  1 & 1 \\
  0 & 1 \\
\end{bmatrix}
$$

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

$$
N^2
=
\begin{bmatrix}
  0 & 1 \\
  0 & 0 \\
\end{bmatrix}
\begin{bmatrix}
  0 & 1 \\
  0 & 0 \\
\end{bmatrix}
=
0
$$

이므로 $k \geq 0$ 일 때

$$
N^k = 0
$$

이다. 따라서

$$
e^N = I + N
=
\begin{bmatrix}
  1 & 1 \\
  0 & 1 \\
\end{bmatrix}
$$

따라서

$$
e^A = e^I e^N =
\begin{bmatrix}
  e & 0 \\
  0 & e \\
\end{bmatrix}
\begin{bmatrix}
  1 & 1 \\
  0 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
  e & e \\
  0 & e \\
\end{bmatrix}
$$

### Ex 2

$$
A
=
\begin{bmatrix}
  a & b \\
  0 & c \\
\end{bmatrix}
$$

### Ex 3

$$
A
=
\begin{bmatrix}
  0 & -1 \\
  1 & 0 \\
\end{bmatrix}
$$

Eigenvalue and eignevector

$$
\lambda_1 = -i, \;\;\; \lambda_2 = i, \;\;\; v_1 =
\begin{bmatrix}
  1 \\
  i \\
\end{bmatrix}, \;\;\;

v_2 =
\begin{bmatrix}
  1 \\
  -i \\
\end{bmatrix}
$$

이므로

$$
D =
\begin{bmatrix}
  -i & 0 \\
  0 & i \\
\end{bmatrix}
, \;\;\;
V =
\begin{bmatrix}
  1 & 1 \\
  i & -i \\
\end{bmatrix}
$$

이고

$$
A = VDV^{-1}
$$

따라서

$$
\begin{align*}
  e^{tA} &= e^{tVDV^{-1}} \\
  &= V e^{tD} V^{-1} \\
  &=
  \begin{bmatrix}
    1 & 1 \\
    i & -i \\
  \end{bmatrix}
  \begin{bmatrix}
    e^{-it} & 0 \\
    0 & e^{it} \\
  \end{bmatrix}
  \dfrac{1}{2i}
  \begin{bmatrix}
    i & 1 \\
    i & -1 \\
  \end{bmatrix} \\
  &=
  \dfrac{1}{2i}
  \begin{bmatrix}
    1 & 1 \\
    i & -i \\
  \end{bmatrix}
  \begin{bmatrix}
    \cos t - i \sin t & 0 \\
    0 & \cos t + i \sin t \\
  \end{bmatrix}
  \begin{bmatrix}
    i & 1 \\
    i & -1 \\
  \end{bmatrix} \\
  &=
  \begin{bmatrix}
    \cos t & -\sin t \\
    \sin t & \cos t \\
  \end{bmatrix} \\
\end{align*}
$$

### Ex 4

$$
A
=
\begin{bmatrix}
  2 & 6 \\
  6 & 7 \\
\end{bmatrix}
$$

### Ex 5

$$
A
=
\begin{bmatrix}
  2 & 2 & -1 \\
  0 & 2 & 1 \\
  0 & 0 & 2 \\
\end{bmatrix}
$$

## Nonhomogeneous Equations and Duhamel's Formula

Here we condifer the nonhomogeneous equation

$$
\dfrac{dx}{dt} = Ax + f(t), \;\;\; x(0) = x_0 \in \mathbb{C}^n
$$

General solution is

$$
x(t) = \exp{tA}x_0 + \int_0^s \exp (t - s)A f(s) ds
$$

# Reference

Introduction to Differential Equations, Michel E. Taylor

# TMP

# Duhamel's Principle

# Ex 1

$$
\begin{align*}
x_1' &= 2x_1 + 2x_2 - x_3 + 1 \\
x_2' &= 2x_2 + x_3 \\
x_3' &= 2x_3
\end{align*}
$$

위 미분방정식은 다음과 같이 표현하 수 있다.

$$
\mathbf{x} = \mathbf{A} \mathbf{x} + f
$$

where

$$
\dot{\mathbf{x}} =
\begin{bmatrix}
  x_1 \\
  x_2 \\
  x_3 \\
\end{bmatrix}, \;\;\;

\mathbf{A} =
\begin{bmatrix}
  2 & 2 & -1 \\
  0 & 2 & 1 \\
  0 & 0 & 2 \\
\end{bmatrix}, \;\;\;

f =
\begin{bmatrix}
  1 \\
  0 \\
  0 \\
\end{bmatrix}
$$

일반해는 다음과 같다.

$$
\mathbf{x}(t) = \mathbf{x}(0) \exp{At} + \int_0^s \exp{ \left(A(t - s) \right)} f(s) ds
$$

# Ex 2

$$
\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + f(t)
$$

where

$$
\mathbf{A} =
\begin{bmatrix}
  -2 & 1 \\
  1 & -2 \\
\end{bmatrix}, \;\;\;
f(t) =
\begin{bmatrix}
  2e^{-t} \\
  2t \\
\end{bmatrix}
$$

## Sol 1

$$
\lambda_1 = -3, \;\;\; v_1 =
\begin{bmatrix}
  1 \\
  -1 \\
\end{bmatrix}, \;\;\; 
\lambda_2 = -1, \;\;\; v_2 =
\begin{bmatrix}
  1 \\
  1 \\
\end{bmatrix}
$$

$$
\mathbf{x}(t) = c_1 e^{\lambda_1 t}v_1 + c_2 e^{\lambda_2 t} v_2 = e^{\mathbf{A}t}\mathbf{x}(0)
$$

where

$$
\mathbf{x}(0) =
\begin{bmatrix}
  a \\
  b \\
\end{bmatrix}
$$

로부터

$$
c_1 = \dfrac{a - b}{2}, \;\;\; c_2 = \dfrac{a + b}{2}
$$

$$
\begin{align*}
  \mathbf{x}(t)
  &= \dfrac{a - b}{2} e^{\lambda_1 t}
  \begin{bmatrix}
    1 \\
    -1 \\
  \end{bmatrix}
  +
  \dfrac{a + b}{2} e^{\lambda2 t}
  \begin{bmatrix}
    1 \\
    1 \\
  \end{bmatrix} \\
  &=
  \dfrac{1}{2}
  \begin{bmatrix}
    e^{\lambda_1 t} + e^{\lambda_2 t} & -e^{\lambda_1 t} + e^{\lambda_2 t} \\
    -e^{\lambda_1 t} + e^{\lambda_2 t} & e^{\lambda_1 t} + e^{\lambda_2 t} \\
  \end{bmatrix}
  \begin{bmatrix}
    a \\
    b \\
  \end{bmatrix}
\end{align*}
$$

Therefore

$$
e^{\mathbf{A}t} =
\dfrac{1}{2}
\begin{bmatrix}
  e^{\lambda_1 t} + e^{\lambda_2 t} & -e^{\lambda_1 t} + e^{\lambda_2 t} \\
  -e^{\lambda_1 t} + e^{\lambda_2 t} & e^{\lambda_1 t} + e^{\lambda_2 t} \\
\end{bmatrix}
$$

## Sol 2

$$
\mathbf{A} \mathbf{v} = \mathbf{v} \mathbf{D}
$$

where

$$
\mathbf{v} =
\begin{bmatrix}
  v_1 & v_2
\end{bmatrix}, \;\;\;
\mathbf{D} =
\begin{bmatrix}
  \lambda_1 & 0 \\
  0 & \lambda_2 \\
\end{bmatrix}
$$

$$
e^{\mathbf{A}t} = \mathbf{v} e^{\mathbf{D}t}\mathbf{v}^{-1}
$$

## Sol 3

## Sol 4
