---
title: "[Optimal Control - Paper Review] NMPC of an Inverted Pendulum"
excerpt:
categories:
  - optimalcontrol
---
## I. Introudction

- Sample interval : 25ms
- Non-convex optimization problem with 61 variables and 241 inequality constraints

## II. Nonlinear Model Predictive Control

Discrete-time nonlinear state-space model of dynamic bebaviour

$$
x_{k+1} = f_k(x_k, u_k)
$$

- $x_k \in \mathbb{R}^n$ : state
- $u_k \in \mathbb{R}^m$ : input
- $f_k(., .)$ : function maping the current state and input to the next state

We can predict the state trajectory over a prediction horizon $N$ using the model, so that suitable control action can be taken in order to move the state to the origin.

$$
\begin{align*}
  x_2 =& \; f(x_1, u_1) \\
  \vdots \\
  x_{N+1} =& \; f_N(x_N, u_N) \\
\end{align*}
$$

The state at some point in the future depends only on the initial state $x_1$ and all the inputs from $[u_1, u_2, \cdots, u_N]$.

It is possible to choose an input sequence

$$
\mathbf{u} = [u_1, \cdots, u_N]
$$

that moves the initial state $x_1$ towards a desired region (generally origin).

This goal is achieved by minimizing a cost function

$$
V(\mathbf{u}) = \sum_{k=1}^N x_{k+1}^T Q x_{k+1} + u_k^T R u_k
$$

- $Q \in \mathbb{R}^{n \times n}$ : positive semi-definite matrix used to penalise state-movements about the origin
- $R$ : positive definite matrix that penalises input movements from the origin.

NMPC control action is determined by minimising $V_N$ over the future control moves $\mathbf{u}$.

The first control action is applied to the system and the procedure repeats at the next time sample based on new measurements.

Physical limits on the system inputs and states can be directly inclued into the optimization problem.

If the input must line in a set $\mathbb{U}$ and the state must line in a set $\mathbb{X}$ for alll time samples, then the NMPC optimization problem becomes

$$
\mathbf{u*} = \argmin_u V_N(\mathbf{u}) \;\; \text{s.t.} \; u_k \in \mathbb{U}, x_{k+1} \in \mathbb{X}
$$

Solving this problem is non-trivial and usually forms the bulk of the computational work required to obtain the next control action in NMPC. Consquently, the smaple times must be sufficiently large to allow for a solution to be foound.
