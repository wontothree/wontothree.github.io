---
title: "[F1tenth] Kinematic Bicycle Model"
categories:
  - f1tenth_
---
# Kinematic Bycycle Model (Single Track Model)

- $x$: absolute position x (m)
- $y$: absolute position y (m)
- $\psi$: yaw (deg)
- $v$: velocity (m/s)
- $\delta$: steering angle (deg)
- $\beta:$ side slip angle

State

$$
x =
\begin{bmatrix}
  x \\
  y \\
  \psi \\
  v \\
  \delta \\

\end{bmatrix}
$$

Action

$$
u = \delta
$$

Kinematic Bicycle Model

$$
\begin{align*}
  \dot{x} &= v \cos(\psi + \beta) \\
  \dot{y} &= v \sin(\psi + \beta) \\
  \dot{\psi} &= \dfrac{v}{l_r + l_f} \cos\beta \tan\delta \\
  \beta &= \arctan{\dfrac{l_r}{l_r +l_f} \tan\delta} \\
\end{align*}
$$
