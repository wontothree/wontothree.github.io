---
title: "[MPC] Introduction"
excerpt: "Mark Cannon Lecture note"
categories:
  - optimalcontrol
---
Model Predictive Control is an optimal control strategy based on numerical optimiation.

Future control inputs and future plant responses are predicted using a system model and optimized a t regular intervals with respect to a performance index.

MPC provides a systematic method of dealing with constraints on inputs and states. The constraints represent limitations on actuators and plant states arising from physical, economic, or safety constraints.

## 1. Objectives

- Understand the advantages of receding horizon control, its limitations and areas of application.
- Know how to formulate receding horizon control as
  - a. quadratic program for unconstrained linear systems
  - b. a quadratic program for linearly constrained linear systems
  - c. a nonlinear program
- Understand and know how to determine the stability properties of a predictive controller in terms of
  - a. recursive feasibility guarantees
  - b. monotonic cost decrease through optimization
- Know how to design terminal constraints through a constraint checking horizon
- Know how to incorporate integral action
- Know hor to ensure robustness to bounded disturbances

## 3. Predictive Control Strategy

A model predictive control law contains the basic components of prediction, optimization and receding horizon implementation.

### 3.1 Prediction

The future response of the controlled plant is predicted using a dynamic model.

This course is concerned mainly with the case od discrete-time linear systems with state-space representation

<div class="latex-container">
$$
x(k+1) = Ax(k) + Bu(k)
$$
</div>

where $x(k)$ and $u(k)$ are the model state and input vectors at the kth sampling instant.

Notation

$$
\mathbf{u}(k) =
\begin{equation*}
  \begin{bmatrix}
  u(k \vert k)  \\
  u(k+1 \vert k)  \\
  \vdots \\
  u(k + N - 1 \vert k)
  \end{bmatrix}
\end{equation*},
\;\;\;
\mathbf{x}(k) =
\begin{equation*}
  \begin{bmatrix}
  u(k + 1 \vert k)  \\
  u(k + 2 \vert k)  \\
  \vdots \\
  u(k + N \vert k)
  \end{bmatrix}
\end{equation*}
$$

$u(k + i \vert k)$ and $x(k + i \vert k)$ : input and state vectors at time $k + i$ that are predicted at time $k$

Prediction model

<div class="latex-container">
$$
x(k + i \vert k) = A x(k + i \vert k) + B u(k + i \vert k), \;\;\; i = 0, 1, \dots
$$
</div>

with initial condition $x(k \vert k) = x(k)$

### 3.2 Optimization

The predictive control feedback law is computed by minimizing a predicted performance cost, which is defined in terms of the predicted sequences $\mathbf{u}, \mathbf{x}$.

This course is mainly concerned with the case of quadratic cost, for which the predicted cost has the deneral form:

$$
J(k) = \sum^N_{i = 0} \left[ x^T(k + i \vert k)Qx(k + i \vert k) + u^T(k + i \vert k)R u(k + i \vert k) \right]
$$

where $Q, R$ are positvie definite(or semi-definite for Q) matrices.

The optimal inpute sequence for the problem of minimizing $J(k)$ is denoted $u^*(k)$:

$$
\mathbf{u}^* = \underset{u}{\mathrm{argmin}} J(k)
$$

If the plant is subject to input and state constraints, then these could be included in the optimization as equivalent constraints on $\mathbf{u}(k).$

### 3.3 Receding horion implementation

Only the first element of the optimal predicted inpute sequence $\mathbf{u}^*$ is input to the plant

$$
u(k) = u^*(k \vert k)
$$

The process of computing $\mathbf{u}^*(k)$ by minimizing the predicted cost and implementing the first element of $\mathbf{u}^*$ is then repeated at each sampling instant $k = 0, 1, \dots$.

For this reason the optimization defining $\mathbf{u}^*$ is known as an online optimizaiton.

The prediction horizon remains the same length despite the repetition of the optimization at future time instants. (receding horizon strategy)

**First feature of receding horizon strategy** Since the state predictions $\mathbf{x}$ and hence the optimal input sequence $\mathbf{u}^*$ depend on the current state measurement $x(k)$, this procedure introduces feedback in the MPC law, thus providing a degree of robustness to modeling errors and uncertainty.

**A second feature of receding horizon strategy** By continually shifting the horizon over which future inputs are optimized, it attempts to compensate for the fact that this horizon is finite.

### 3.4 Historical development

## 4. Prediction Model

## 5. Constraint Handling

## Question

- 다음 문장의 의미는? "Given a predicted input sequence, the corresponding sequence of state predictions is generated by simulating the model forward over the pre- diction horizon, of say N sampling intervals."
- Online optimization and offline optimization?
- receding horizon strategy?
- By continually shifting the horizon over which future inputs are optimized, it attempts to compensate for the fact that this horizon is finite.
- Provided the cost and constraints are designed correctly, a receding horizon strategy can ensure that the performance of the closed-loop system is at least as good as that of the optimal prediction.