---
title: "[Differential Equation] Undamped Vibration"
categories:
  - differentialequation
---
Undamped System에서는 friction force와 air resistance를 고려하지 않았다.

Damped System에서는 friction force를 고려한다.

1. 물리학 법칙을 이용해서 미분방정식을 도출한다. [물리학]
2. 미분방정식을 푼다. [수학]
3. 그 결과를 해석한다. [물리학]

물리학 법칙에 의해 다음의 미분방정식을 도출할 수 있다.

$$
\begin{align*}
  F &= m\ddot{x} \\
  F &= - kx - v \dot{x} \\
\end{align*}
\\
m \ddot{x} + v\dot{x} + k x = 0,
\;\;\; m, k, v > 0
$$

주어진 미분방정식의 일반 해를 구하자.

$x = a_1 e^{a_2t}$를 가정하자.

$$
\begin{align*}
  0 &= m \ddot{x} + k \dot{x} + v
\end{align*}
$$

# A Matrix Form

$$
m\ddot{x} + r \dot{x} + kx = 0
$$

다음과 같이 정의하자.

$$
\begin{align*}
y_1 = x \\
y_2 = \dot{x} \\
\end{align*}
$$

$$
\begin{align*}
y_1 &= x = y_2 \\
y_2 &= \ddot{x} = \dfrac{-r \dot{x} - kx}{m} = -\dfrac{k}{m} y_1 - \dfrac{v}{m} y_2 \\
\end{align*}
$$

한편 다음과 같이 정의하자.

$$
Y =
\begin{bmatrix}
  y_1 \\
  y_2 \\
\end{bmatrix}
$$

$$
\dot{Y} =
\begin{bmatrix}
  \dot{y_1} \\
  \dot{y_2} \\
\end{bmatrix}
=
\begin{bmatrix}
  y_2 \\
  -\dfrac{k}{m} y_1 - \dfrac{v}{m} y_2 \\
\end{bmatrix}
=
\begin{bmatrix}
  0 & 1 \\
  -\dfrac{k}{m} & - \dfrac{v}{m} \\
\end{bmatrix}
\begin{bmatrix}
  y_1 \\
  y_2 \\
\end{bmatrix}
=
\begin{bmatrix}
  0 & 1 \\
  -\dfrac{k}{m} & - \dfrac{v}{m} \\
\end{bmatrix}
Y
$$

일반 해를 구할 수 있다.

$$
\begin{align*}
  Y(t) &= c_1 e^{\lambda_1 t} v_1 + c_2 e^{\lambda_2 t} v_2 \\
  &= c_1 e^{\lambda_1 t}
  \begin{bmatrix}
    1 \\
    \lambda_1 \\
  \end{bmatrix} +
  c_2 e^{\lambda_2 t}
  \begin{bmatrix}
    1 \\
    \lambda_2 \\
  \end{bmatrix} \\
  &=
  \begin{bmatrix}
  c_1e^{\lambda_1t} + c_2 e^{\lambda_2t} \\
  c_1 \lambda_1 e^{\lambda_1t} + c_2 \lambda_2 e^{\lambda_2t} \\
  \end{bmatrix}
\end{align*}
$$

$y_1,y_2$가 언제, 어떻게 수렴할까?

# Question

- 상태의 개수가 4개 이상일 때 phase portrait을 어떻게 그릴까?
