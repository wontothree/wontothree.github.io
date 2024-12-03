---
title: "[Differential Equation] Duhamel's Principle"
categories:
  - differentialequation
---
# Duhamel's Principle

$$
\dot{x}(t) = Ax(t) + f(t)
$$

의 일반해는 다음과 같다.

$$
x(t) = x_0 \exp{At} + \int_0^s \exp A(t - s) f(s) ds
$$

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
