---
title: "[Optimal Control] Ch02 Optimal Control of Discrete Time Systems"
excerpt: Frank L. Lewis - Optimal Control
categories:
  - optimalcontrol
toc: true
use_math: true
---
## 4. Steady-State Closed-Loop Control and Suboptimal Feedback

### Suboptimal Feedback Gain

### The Algebraic Riccati Equation

### Limiting Behavioir of the Ricatti-equation Solution

Question 1. When does there exist a bounded limiting solution $S_{\infin}$ to the Riccati equation for all choices of $S_N$

Question 2. In general, the limiting solution $S_{\infin}$ depends on the boundary condition $S_N$. When is $S_{\infin}$ the same for all choices of $S_N$?

Question 3. When is the closed-loop plant asymptotically stable?

>$(A, B)$ is **reachable**(= controllable) if the eigenvalues of $(A-BK)$ can be arbitrarily assigned by appropriate choice of the feedback modes of $A$.
>
>$(A, B)$ is **stabilizable** if there exists a matrix $K$ such that $(A-BK)$ is asymptotically stable.\
>
>$(A, B)$ is **observable** if the eigenvalues of $(A-LC)$ can be arbitrarily assigned by appropriate choice of the output injection matrix $L$.
>
>$(A, C)$ is **detectable** if $(A-LC)$ can be made asymptotically stable by some matrix $L$.

$\textbf{Theorem 2.4-1}$ Let $(A, B)$ be stabilizable. Then for every choice of $S_N$, there is a bounded limiting solution $S_{\infin}$. Furthermore, $S_{\infin}$ is a positive semidefinite solution to the algebraic Riccati equation.

$\textbf{Theorem 2.4-2}$ Let $\mathbf{C}$ be a square root of the intermediate-state wighting matrix, so that $Q = C^TC \geq 0$, and suppose $R > 0$. Suppose that $(A, C)$ is observable; then $(A, B)$ is stabilizable if and only if :

a. There is a unique positive definite limiting solution $S_{\infin}$ to the Riccati equation. Furthermore, $S_{\infin}$ is the unique postive definite solution to the algebraic Riccati equation.

b. The closed-loop plant $x_{k+1} = (A - Bk_{\infin})x_k$ is asymptotically stable, where $K_{\infin}$ is given by (2.4-13)

### An analytic Solution to the Riccati Equation

### Analytic Solution to the Discrete Riccati Equation : System Matrix A Singular

### Design of Steady-state Regulators by Eigenstructure Assignment

### Time-varying Plant

## 5. Frequency-Domain Results
