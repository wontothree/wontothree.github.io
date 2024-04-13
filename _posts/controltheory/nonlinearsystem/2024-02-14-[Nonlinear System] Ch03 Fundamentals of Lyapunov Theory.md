---
title: "[Nonlinear System] Ch03 Fundamentals of Lyapunov Theory"
excerpt: Jean-Jacques E.Slotine Weiping Li - Applied Nonlinear Control
categories:
  - NLS
toc: true
use_math: true
---
## 1. Nonlinear Systems and Equilibrium Points

## 2. Concepts of Stability

## 3. Linearization and Local Stability

## 4. Lyapunov's Direct Method

### 4.1 Positive Definite Functions and Lyqpunov Functions

Definition

>A scalar continuous function $V(x)$ is said to be **lacally positive definite** if $V(0) = 0$ and, in a ball $B_{R_0}$
>
>$$
x \neq 0 \rightarrow V(x) > 0
$$
>if $V(0) = 0$ and the above property bolds over the whole state space, the $V(x)$ is said to be **globally positive definite**.

Definition

>If, in a ball $B_{R_0}$, the function $V(x)$ is positive definite and has continuous partial derivatives, and if its time deriative along any state trajectory of system is negative semi-definite
>
>$$
\dot{V}(x) \leq 0
$$

>then $V(x)$ is said to be a **Lyapunov function** for the system.

### 4.2 Equilibrium Point Theorems

#### Lyapunov theorem for local stability

#### Lyapunov theorem for global stability

### 4.3 Invariant Set Theorems

## 5. System Analysis Based on Lyapunov's Direct Method

## 6. Control Design Based on Lyapunov's Direct Method
