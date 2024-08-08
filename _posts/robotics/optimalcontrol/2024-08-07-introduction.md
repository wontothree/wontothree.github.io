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

$$
x(k+1) = Ax(k) + Bu(k)
$$

where $x(k)$ and $u(k)$ are the model state and input vectors at the kth sampling instant.

Notation

$$
\mathbf{u}(k) =
\begin{bmatrix}
  u(k \vert k)  \\
  u(k+1 \vert k)  \\
  \vdots \\
  u(k + N - 1 \vert k)
\end{bmatrix},
\;\;\;
\mathbf{x}(k) =
\begin{bmatrix}
  u(k + 1 \vert k)  \\
  u(k + 2 \vert k)  \\
  \vdots \\
  u(k + N \vert k)
\end{bmatrix}
$$

$u(k + i \vert k)$ and $x(k + i \vert k)$ : input and state vectors at time $k + i$ that are predicted at time $k$

Prediction model

$$
x(k + i \vert k) = A x(k + i \vert k) + B u(k + i \vert k), \;\;\; i = 0, 1, \dots
$$

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

The process of computing $\mathbf{u}^{*}(k)$ 

by minimizing the predicted cost and implementing the first element of $\mathbf{u}^{*}$ 

is then repeated at each sampling instant $k = 0, 1, \dots$.

For this reason the optimization defining $\mathbf{u}^*$ is known as an online optimizaiton.

The prediction horizon remains the same length despite the repetition of the optimization at future time instants. (receding horizon strategy)

**First feature of receding horizon strategy** Since the state predictions $\mathbf{x}$ and hence the optimal input sequence $\mathbf{u}^*$ depend on the current state measurement $x(k)$, this procedure introduces feedback in the MPC law, thus providing a degree of robustness to modeling errors and uncertainty.

**A second feature of receding horizon strategy** By continually shifting the horizon over which future inputs are optimized, it attempts to compensate for the fact that this horizon is finite.

### 3.4 Historical development

- 1960-70 : Receding horizon approaches were used to define computational methods for optimal control problems that have no closed-form solution.
- 1980 : a means exploiting continual improvements in computational resources to improve performance
- Recent : a eneral technique for deriving stabilizing controllers for constrained systems. And the availability of faster computers and improvements in computational efficiency of predictive controllers have extended its range of applications to include fast sampling systems.

## 4. Prediction Model

A very wide class of plant model can be incorporated in a predictive control strategy.

Plant models

- linear
- nonlinear
- discrete
- continuous-time

Prediction models

- deterministic
- stochastic
- fuzzy

### 4.1 Linear plant model

For linear systems, the dependence of predictions $\mathbf{x}(k)$ on $\mathbf{u}(k)$ is linear.

A quadratic predicted cost is thereforece a quadratic function of the input sequence $\mathbf{u}(k)$.

Thus $J(k)$ can be expressed as a function of $\mathbf{u}$ in the form

$$
J(k) = \mathbf{u}^T(k)H\mathbf{u}(k) + 2f^T \mathbf{u}(k) + g
$$

where $H$ is a constant positive definite (or possibly positive semidefinite) matrix, and f, g are respectively a vector and scalar which depend on $x(k)$.

Linear input and state constraints likewise imply linear constraints on $\mathbf{u}(k)$ which can be expressed

$$
A_c \mathbf{u}(k) \leq b_c
$$

where $A_c$ is a constant matrix and, depending on the form of the constraints, the vector $b_c$ may be a function of $x(k)$.

The online MPC optimization thereforece comprises the minimization over $\mathbf{u}$ of a quadratic objective subject to linear constraints (quadratic programming problem):

$$
\underset{u}{\mathrm{minimize}} \;\;\; \mathbf{u}^T H \mathbf{u} + 2f^T \mathbf{u} \\
\mathrm{subject \; to} \;\;\; A_c \mathbf{u} \leq b_c
$$

Given that $H$ is a positive definite matrix and the constraints are linear, it is easy to show the optimization problem is a convex problem.

Matlab's QP solver : 2GHZ PC - 10ms - 10 variables and 100 constrains

### 4.2 Nonlinear plant model

If a nonlinear prediction model is employed, then due to the nonlinear dependence of the state predictions $\mathbf{x}(k)$ on $\mathbf{u}(k)$, the MPC optimization problem is significantly harder that for the linear model case.

This is because the cost in equation, which can be written as $J(\mathbf{u}(k), x(k))$, and the constraints, $g(\mathbf{u}(k), x(k)) \leq 0$, are in general nonconvex functions of $\mathbf{u}(k)$, so that the optimization problem :

$$
\underset{u}{\mathrm{minimize}} \;\;\; J(\mathbf{u}, x(k)) \\
\mathrm{subject \; to} \;\;\; g(\mathbf{u}, x(k)) \leq 0
$$

becomes nonconvex nonlinear programming (NLP) problem.

As a result there will in general be no guarantee that a solver will converge to a global minimym, and the times requited to find even a local solution are typically orders of magnitude greater than for QP problems of simililar size.

To solve the MPC optimization derived from an inverted pendulum control with 10 variables in $\mathbf{u}$, solution times of 10sec are typically need on a 2GHZ PC.

Unlike QP solvers, the computational loads of solvers for nonlinear programming problems are strongly problem-dependent.

### 4.3 Discrete and continuous-time prediction models

control periode < sampling periode

## 5. Constraint Handling

While the equality constraints are usually handled implicitly (i.e the plant model is used to write predicted state trajectories as functions of initial conditions and input trajectories), the inequality constraints are imposed as explicit constraints within the online optimization problem.

This course is concerned with linear inequality constrains

**Input constraints.**

absolute constraint

$$
\underline{u} \leq u(k) \leq \overline{u}
$$

**State constraints.**

### 5.1 De-tuned optimal control

### 5.2 Anti-windup strategies

### 5.3 Model predictive control

## Question

- 다음 문장의 의미는? "Given a predicted input sequence, the corresponding sequence of state predictions is generated by simulating the model forward over the pre- diction horizon, of say N sampling intervals."
- Online optimization and offline optimization?
- receding horizon strategy?
- By continually shifting the horizon over which future inputs are optimized, it attempts to compensate for the fact that this horizon is finite.
- Provided the cost and constraints are designed correctly, a receding horizon strategy can ensure that the performance of the closed-loop system is at least as good as that of the optimal prediction.
- Prediction models may be deterministic, stochastic, or fuzzy.
- QP : 선형 상태 공간 모델을 x에 대해 정리하여 비용함수의 x 자리에 대입한 식?
- Prediction model == plant model ?
- 1.4.3 이해 안 됨.
