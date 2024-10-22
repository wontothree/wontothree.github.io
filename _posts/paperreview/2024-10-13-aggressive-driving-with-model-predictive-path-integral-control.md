---
title: "[Paper Review] Aggressive Driving with Model Predictive Path Integral Control"
categories:
  - paperreview
---
# Abstract

The algorithm is based on a stochastic optimal control framework using a fundamental relationship between the information theoretic notions of gree energy and relative entropy.

# 1. Introduction

The method developed here is able to generate new trajectories in real-time

The method we develop is a model predictive control algorithm based on the path integral control framework

We do not split the problem into a planning and execution phase, which allows for a simple problem formulation and optimal behavior with respect to the system dynamics.

# 2. Stochastic Trajectory Optimization

The key insight which allows for this is the use of a fundamental relationship between the information theoretic notions of free energy and relative entropyy (also know as KL-Divergence).

## A. Problem Formulation

Notation

- state at time $t$: $\mathbf{x_t} \in \mathbb{R}^n$
- control at time $t$: $\mathbf{u}_t \in \mathbb{R}^m$
- function which maps time to control inputs: $\mathbb{u} (\cdot) : [t_0, T] \rightarrow \mathbb{R}^m$
- trajectory of the system: $\tau: [t_0, T] \rightarrow \mathbb{R}^n$

In classical stochastic optimal control setting we seek a control sequence $\mathbf{u} (\cdot)$ such that:

$$
\begin{align}
  \mathbf{u}^*(\cdot) = \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E} \left[ \phi (\mathbf{x_T}, T) + \int_{t_0}^T \mathcal{L}(\mathbf{x_t, \mathbf{u}_t, t}) \; dt \right]
\end{align}
$$

with respect to

$$
d\mathbf{x} = \mathbf{F}(\mathbf{x}_t, \mathbf{u}_t, t) \; dt + \mathbf{B}(\mathbf{x}_t, t) \; d\mathbf{w}
$$

We constider costs composed of an arbitrary state-dependent term and a quadratic control cost and dynamics which are affine in controls:

$$
\mathcal{L}(\mathbf{x_t, \mathbf{u}_t, t})  = q(\mathbf{x}_t, t) + \dfrac{1}{2}\mathbf{u}^T \mathbf{R}(\mathbf{x}_t, t) \mathbf{u}
\\
\mathbf{F}(\mathbf{x}_t, \mathbf{u}_t, t) = \mathbf{f}(\mathbf{x}_t, t) + \mathbf{G}(\mathbf{x}_t, t) \mathbf{u}_t
$$

An interpretation of path integral control is given in terms of the information theoretic concepts of free energy and relative entropy. (Relative entropy and free energy dualities connections to path integral and kl control) The interpretation is based on the following equality:

$$
\begin{align}
  -\lambda \mathcal{F}(S(\tau)) = \underset{\mathbb{Q}}{\inf} \left[ \mathbb{E} [\mathcal{S} (\tau)] + \lambda \mathbb{D}_{\text{KL}} (\mathbb{Q} \vert\vert \mathbb{P}) \right]
\end{align}
$$

where

$$
\lambda \in \mathbb{R}^+ \\
$$

$\mathcal{S}(\tau)$ is defined as the state-dependent cost-to-go term

$$
\mathcal{S}(\tau) = \phi (\mathbf{x}_T, T) + \int_{t_0}^T q(\mathbf{x}_t, t) dt
$$

the free energy

$$
\log \left( \mathbb{E}_{\mathbb{P}} \left[ \exp \left(-\dfrac{1}{\lambda} \mathcal{S}(\tau) \right) \right] \right)
$$

$\mathbb{P}$ is the probability measure over the space of trajectories induced by the uncontraolled stochastic dynamics

$$
\mathbf{F}(\mathbf{x}_t, \mathbf{u}_t, t) = \mathbf{f}(\mathbf{x}_t, t) + \mathbf{G}(\mathbf{x}_t, t) \mathbf{u}_t
$$

$\mathbb{Q}$ is any probability measure defined over the space of trajectories such that $\mathbb{Q}$ is absolutely continuous with $\mathbb{P}$.

$$
\mathbb{D}_{\text{KL}} (\mathbb{Q} \vert\vert \mathbb{P}) = \mathbb{E}_{\mathbb{Q}} \left[ \log \left( \dfrac{d \mathbb{Q}}{d \mathbb{P}} \right) \right]
$$

The controlled dynamics induce another probability measure on the space of trajectories, which we denote $\mathbb{Q} (\mathbf{u})$. The relative entropy term between the uncontrolled distribution $\mathbb{P}$ and the controlled distribution $\mathbb{Q} (\mathbf{u})$ can be computed by applying Girsanov’s theorem.

$$
\mathbb{D}_{\text{KL}} (\mathbb{Q} (\mathbf{u}) \vert\vert \mathbb{P}) = \dfrac{1}{2} \int_{t_0}^T \mathbf{u}_t^T \mathbf{G} (\mathbb{x}_t, t)^T \Sigma (\mathbf{x}_t, t)^{-1} \mathbf{G}(x_t, t) \mathbf{u}_t dt
$$

where

$$
\Sigma (\mathbb{x}_t, t) = \mathbf{B} (\mathbf{x}_t, t) \mathbf{B} (\mathbf{x}_t, t)^T
$$

If we assume that the control cost matrix takes the form:

$$
\mathbf{R}(\mathbf{x}_t, t) = \lambda \mathbf{G}(\mathbf{x}_t, t)^T \Sigma (\mathbf{x}, t)^{-1} \mathbf{G} (\mathbf{x}_t, t)
$$

we get the following correspondence between the right hand side of (1) and (2):

$$
\mathbb{E}_{\mathbb{Q} (\mathbf{u})} \left[ \mathcal{S} (\tau) \right] + \lambda \mathbb{D}_{\text{KL}} (\mathbb{Q} \vert\vert \mathbb{P}) = \mathbb{E}_{\mathbb{Q}(\mathbf{u})}\left[ \mathcal{S}(\tau) + \dfrac{1}{2} \int_{t_0}^T \mathbf{u}_t^T \mathbf{R} (\mathbf{x}_t, t) \mathbf{u}_t dt \right]
$$

The form of the optimal probability measure $\mathbb{Q}^*$ can be derived in terms of the Radon-Nikodym derivative with respect to the uncontrolled dynamics

$$
\dfrac{d \mathbb{Q}^*}{d \mathbb{P}} = \dfrac{\exp \left( -\dfrac{1}{\lambda} \mathcal{S} (\tau) \right)}{\mathbb{E}_{\mathbb{P}} \left[ \exp \left( -\dfrac{1}{\lambda} \mathcal{S}(\tau) \right) \right]}
$$

Previous works (E. A. Theodorou and E. Todorov, “Relative entropy and free energy dualities: Connections to path integral and kl control,” in Decision and Control (CDC), 2012 IEEE 51st Annual Conference on. IEEE, 2012 / E. A. Theodorou, “Nonlinear stochastic control and information the- oretic dualities: Connections, interdependencies and thermodynamic interpretations,” Entropy, vol. 17, no. 5, p. 3352, 2015.) make these connections between the information theoretic notions of free energy, relative entropy, and classical optimal control theory. However, they do not provide a method for computing a control law independent of the HJB-equation, as we do here.

The main idea in our approach is that since we have the form of the optimal distribution, it is possible to pursue the following optimization scheme: instead of trying to directly solve the optimal control problem by computing the solution to the stochastic HJB equation, we can solve the mini- mization problem defined by (4) by moving the probability distribution induced by the controller, Q(u), as close as possible to the optimal probability measure, $\mathbb{Q}^*$, defined by the Radon-Nikodym derivative $\dfrac{d\mathbb{Q}^*}{d\mathbb{P}}$. We obtain the following optimization problem:

$$
\mathbf{u}^*(\cdot) = \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{D}_{\text{KL}} (\mathbb{Q}^* \vert\vert \mathbb{Q}(\mathbf{u}))
$$

## B. Relative Entropy Minimization

$$
\begin{align*}
  \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{D}_{\text{KL}} (\mathbb{Q}^* \vert\vert \mathbb{Q}(\mathbf{u}))
  &= \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E}_{\mathbb{Q}^*} \left[ \log \left( \dfrac{d \mathbb{Q^*}}{d \mathbb{Q}(\mathbf{u})} \right) \right] \\
  &= \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E}_{\mathbb{Q}^*} \left[ \log \left( \dfrac{d \mathbb{Q^*}}{d \mathbb{P}} \cdot \dfrac{d \mathbb{P}}{d \mathbb{Q}(\mathbf{u})} \right) \right] \\
  &= \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E}_{\mathbb{Q}^*} \left[ \log \left( \dfrac{\exp \left( -\dfrac{1}{\lambda} \mathcal{S} (\tau) \right)}{\mathbb{E}_{\mathbb{P}} \left[ \exp \left( -\dfrac{1}{\lambda} \mathcal{S}(\tau) \right) \right]} \cdot \exp \left( \mathcal{D} (\tau, \mathbf{u}(\cdot))\right) \right) \right] \\
  &= \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E}_{\mathbb{Q}^*} \left[ -\dfrac{1}{\lambda} \mathcal{S} (\tau) + \mathcal{D} (\tau, \mathbf{u}(\cdot))- \log \left( \mathbb{E}_{\mathbb{P}} \left[ \exp \left( -\dfrac{1}{\lambda} \mathcal{S}(\tau) \right) \right] \right)\right] \\
  &= \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E}_{\mathbb{Q}^*} \left[ \mathcal{D} (\tau, \mathbf{u}(\cdot)) \right] \\
\end{align*}
$$

where

$$
\mathcal{D} (\tau, \mathbf{u}(\cdot)) = - \int_0^T \mathbf{u}_t^T \mathbf{G} (\mathbf{x}_t, t)^T \Sigma (\mathbf{x}_t, t)^{-1} \mathbf{G}(\mathbf{x}_t, t) d\mathbf{w}^{(0)} + \dfrac{1}{2} \int_0^T \mathbf{u}_t^T \mathbf{G}(\mathbf{x}_t, t)^T \Sigma (\mathbf{x}_t, t)^{-1} \mathbf{G}(\mathbf{x}_t, t) \mathbf{u}_t dt
$$

Since we inevitably apply the control in discrete time, it suffices to consider the class of step functions:

$$
\mathbf{u}_t = 
\begin{cases} 
  \vdots \\
  \mathbf{u}_j \;\;\; \text{if} \; j \Delta t \leq t < (j + 1) \Delta t \\
  \vdots \\
\end{cases}
$$

with $j = \{0, 1, 2, \dots, N\}$. Applying this parameterization,

$$
\mathcal{D} (\tau, \mathbf{u}(\cdot)) = - \sum_{j = 0}^M \mathbf{u}_j^T \int_{t_j}^{t_{j+1}} \mathcal{G}(\mathbf{x}_t, t) d\mathbf{w}^{(0)} + \dfrac{1}{2} \mathbf{u}_j^T \int_{t_j}^{t_{j+1}} \mathcal{H} (\mathbf{x}_t, t) dt \; \mathbf{u}_j
$$

where

$$
\begin{align*}
  i)& \;\;\;\mathcal{G} = \mathbf{G} (\mathbf{x}_t, t)^T \Sigma (\mathbf{x}_t, t)^{-1} \mathbf{B} (\mathbf{x}_t, t) \\
  ii)& \;\;\;\mathcal{H} = \mathbf{G} (\mathbf{x}_t, t)^T \Sigma (\mathbf{x}_t, t)^{-1} \mathbf{G} (\mathbf{x}_t, t) \\
  iii)& \;\;\; N = T / \Delta t
\end{align*}
$$

For small $\Delta t$ we can make the approximations that:

$$
\int_{t_j}^{t_{j+1}} \mathcal{H} (\mathbf{x}_t, t) dt \approx \mathcal{H} (\mathbf{x}_t, t) \Delta t, \;\;\;
\int_{t_j}^{t_{j+1}} \mathcal{G} (\mathbf{x}_t, t) d\mathbf{w}^{(0)} \approx \mathcal{G} (\mathbf{x}_t, t) \int_{t_j}^{t_{j+1}} d\mathbf{w}^{(0)} \\
$$

Since we cannot sample from the $\mathbb{Q}^*$ distribution, we need to change the expectation to the an expectation with respect to the uncontrolled dynamics $\mathbb{P}$. We can then directly sample trajectories from $\mathcal{P}$ to approximate the controls. The change in expection is achieved by applying the Radon-Hikodym derivative

From

$$
\begin{align*}
  0 &= \nabla_{u_j} \mathbb{E}_{\mathbb{Q}^*} \left[ \mathcal{D} (\tau, \mathbf{u}(\cdot)) \right] \\
  &= \nabla_{u_j} \left[ \sum_{j=0}^N \mathbf{u}_j^T \mathbb{E}_{\mathbf{Q}^*} \left[ \int_{j_j}^{t_{j+1}} \mathcal{G} (\mathbf{x}_t, t) d\mathbf{w}^{(0)} \right] + \sum_{j=0}^N \dfrac{1}{2} \mathbf{u}_j^T \mathbb{E}_{\mathbb{Q}^*} \left[ \int_{j_j}^{{j+1}} \mathcal{H} (\mathbf{x}_t, t) dt \right] \mathbf{u}_j \right]
\end{align*}
$$

,

$$
\begin{align*}
  \mathbf{u}_j^* &= \mathbb{E}_{\mathbb{Q}^*} \left[ \int_{t_j}^{t_{j+1}} \mathcal{H} (\mathbf{x}_t, t) dt \right]^{-1} \mathbb{E}_{\mathbb{Q}^*} \left[ \int_{t_j}^{t_{j+1}} \mathcal{G} (\mathbf{x}_t, t) d\mathbf{w}^{(0)} \right] \\
  &= \dfrac{1}{\Delta t} \mathbb{E}_{\mathbb{Q}^*} \left[ \mathcal{H} (\mathbf{x}_t, t_j)\right]^{-1} \mathbb{E}_{\mathbb{Q}^*} \left[ \mathcal{G} (\mathbb{x}_t, t_j) \int_{t_j}^{t_{j+1}} d\mathbf{w}^{(0)}\right] \\
  &= \dfrac{1}{\Delta t} \mathbb{E}_{\mathbb{P}} \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \mathcal{S}(\tau)) \mathcal{H} (\mathbf{x}_{t_j}, t_j)}{\mathbb{E}_{\mathbb{P}}\left[ \exp(-\dfrac{1}{\lambda} \mathcal{S} (\tau)) \right]} \right]^{-1}
  \mathbb{E}_{\mathbb{P}} \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \mathcal{S}(\tau)) \mathcal{G} (\mathbf{x}_{t_j}, t_j) \int_{t_j}^{t_{j+1}}d\mathbf{w}^{(0)}}{\mathbb{E}_{\mathbb{P}}\left[ \exp(-\dfrac{1}{\lambda} \mathcal{S} (\tau)) \right]} \right]
\end{align*}
$$

## C. Special Case: State Independent Control Matrix

We suppose that the control matrix and diffusion matrix have the form. In other word, there are no correlations between noise in the directly actuated and non-directly actuated states, and the diffusion for the directly actuated states is state-independent.

$$
\mathbf{G} =
\begin{bmatrix}
  0 \\
  \mathbf{G}_c
\end{bmatrix}, \;\;\;
\mathbf{B}(\mathbf{x}_t) =
\begin{bmatrix}
  \mathbf{B}_a (\mathbf{x}_t) & 0 \\
  0 & \mathbf{B}_c
\end{bmatrix}
$$

In this case the covariance matrix

$$
\Sigma (\mathbf{x}) =
\begin{bmatrix}
  \mathbf{B}_a (\mathbf{x})\mathbf{B}_a (\mathbf{x})^T & 0 \\
  9 & \mathbf{B}_c \mathbf{B}_c^T
\end{bmatrix}
$$

Then the terms $\mathcal{H} (\mathbf{x}_t)$ and $\mathcal{G} (\mathbf{x}_t)$ are no longer state dependent and reduce to

$$
\mathcal{H} = \mathbf{G}_c^T (\mathbf{B}_c \mathbf{B}_c^T)^{-1} \mathbf{G}_c, \;\;\; \mathcal{G} = \mathbf{G}_c^T (\mathbf{B}_c \mathbf{B}_c^T)^{-1} \mathbf{B}_c
$$

Therefore

$$
\begin{align}
  \mathbf{u}_j^*
  = \dfrac{1}{\Delta t} \mathcal{H}^{-1} \mathcal{G} \;
  \mathbb{E}_{\mathbb{P}} \left[ \int_{t_j}^{t_{j+1}} \dfrac{\exp (-\dfrac{1}{\lambda} \mathcal{S}(\tau))}{\mathbb{E}_{\mathbb{P}}\left[ \exp(-\dfrac{1}{\lambda} \mathcal{S} (\tau)) \right]} d\mathbf{w}^{(0)}\right]
\end{align}
$$

## D. Numerical Approximation

In order to numerically approximate (3), there are two problems  that need to be addressed.

1. We need to rerite the equation for sampling in discreate time.
2. The expectation is with respect ot hte uncontrolled dynamics which in many cases is a very inefiicient ditribution to sample

So we need a way to perform importance sampling with (3).

In discrete time the dynamics of the system

$$
d \mathbf{x}_t = (\mathbf{f} (\mathbf{x}_{t_j}t_j) + \mathbf{G} (\mathbf{x}_{t_j}, t_j) \mathbf{u}_j) \Delta t + \mathbf{B} (\mathbf{x}_{t_j}, t_j) \epsilon_j \sqrt{\Delta t}
$$

where $\epsilon_j$ is a vector where each entry is a standard normal random variable.

Therefore

$$
\begin{align}
  \mathbf{u}_j^*
  = \dfrac{1}{\Delta t} \mathcal{H}^{-1} \mathcal{G} \;
  \mathbb{E}_{p} \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \mathcal{S}(\tau)) \epsilon_j \sqrt{\Delta t}}{\mathbb{E}_{p}\left[ \exp(-\dfrac{1}{\lambda} \mathcal{S} (\tau)) \right]} \right]
\end{align}
$$

where $p$ is the probability distribution corresponding to the discrete time uncontrolled dynamics.

Instead of sampling from $p$ we can choose to sample from a different probability distribution $q_{\mathbf{u}}^{\nu}$ which corresponds to sampling from the dynamics

$$
d \mathbf{x}_t = (\mathbf{f} (\mathbf{x}_{t_j}t_j) + \mathbf{G} (\mathbf{x}_{t_j}, t_j) \mathbf{u}_j) \Delta t + \mathbf{B}_E (\mathbf{x}_{t_j}, t_j) \epsilon_j \sqrt{\Delta t}
$$

where

$$
\mathbf{B}_E (\mathbf{x}_t) =
\begin{bmatrix}
  \mathbf{B}_a(\mathbf{x}_t) & 0 \\
  0 & \nu \mathbf{B}_c
\end{bmatrix}
$$

with $\nu \geq 1$.

When sampling from the distribution $q_{\mathbf{u}}^{\nu}$, the designer gets to choose

1. The initial controls from which sampling is centered about
2. The magnitude of the exploration variance defined by $\nu$.

In order to sample from $q_{\mathbf{u}}^{\nu}$ instead of $p$ it is necessary to compute the likelibood ratio between the two distributions. Inserting the likelibood ratio corresponds to changing the running cost from $ (\mathbf{x}_t, t)$ to

$$
\tilde{q} (\mathbf{x}_t, \mathbf{u}_t, \epsilon_t, t) = q(\mathbf{x}_t, t) + \dfrac{1}{2} \mathbf{u}_t^T \mathbf{R} \mathbf{u}_t + \lambda \mathbf{u}^T \mathcal{G} \dfrac{\epsilon}{\sqrt{\Delta t}} + \dfrac{1}{2} \lambda (1 - \nu^{-1})\dfrac{\epsilon^T}{\sqrt{\Delta t}} \mathbf{B}_c^T (\mathbf{B_c}\mathbf{B}_c^T)^{-1} \mathbf{B}_c \dfrac{\epsilon}{\sqrt{\Delta t}}
$$

- first two additional terms: penalities for shifting the mean for the exploration away from zero
- last term: penalty for sampling from an overaggressive variance
- $\mathbf{B}_c \dfrac{\epsilon}{\sqrt{\Delta t}}$: the effective change in the control input due to noise

Define

$$
\tilde{S}(\tau) = \phi (\mathbf{x}_T, T) + \sum_{j = 0}^N \tilde{q} (\mathbf{x}_T, \mathbf{u}_T, \epsilon_t, t) \Delta t
$$

Then (4) becomes the iterative update rules

$$
\begin{align*}
  \mathbf{u}_j^*
  &= u_j + \mathcal{H}^{-1} \mathcal{G} \;
  \mathbb{E}_{q_{\mathbf{u}}^{\nu}} \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \tilde{\mathcal{S}}(\tau)) \epsilon_j \sqrt{\Delta t}}{\mathbb{E}_{q_{\mathbf{u}}^{\nu}}\left[ \exp(-\dfrac{1}{\lambda} \tilde{\mathcal{S}} (\tau)) \right]} \right] \\
  &\approx u_j + \mathcal{H}^{-1} \mathcal{G} \;
  \sum_{k=1}^K \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \tilde{\mathcal{S}}(\tau)) \epsilon_j \sqrt{\Delta t}}{\sum_{k=1}^K \exp(-\dfrac{1}{\lambda} \tilde{\mathcal{S}} (\tau))} \right] \\
\end{align*}
$$

# 3. Model Predictive Control Algorithm

GPU를 사용한 병렬 궤적 샘플링은 매우 효율적인 작업으로 복잡한 비선형 동역학에서도 수천 개의 궤적을 샘플링할 때 우리의 구현에서는 15ms 이하의 시간이 소요된다. MPPI 알고리즘을 구현하는 가장 간단한 방법은 샘플당 하나의 스레드를 사용하여 샘플링 반복문을 병렬화하는 것이다.

![](./../../img/paperreview/mppi-sudocode.png){: .align-center}

```
K: Number of samples;
N: Number of timesteps;
(u_0, u_1, ..., u_{N-1}): Initial control sequences;
\Delta t, \mathbf{x}_{t_0}, \mathbf{f}, \mathbf{G}, \mathbf{B}, \mathbf{B}_E: System/sampling dynamics;
\phi, q, \mathbf{R}, \lambda: Cost parameters;
\mathbf{u}_{init}: Value to initialize new controls to;

while task not completed do
  for k \leftarrow 0 to K - 1 do
    \mathbf{x} = \mathbf{x}_{t_0};
    for i \leftarrow to N-1 do
      \mathbf{x}_{i+1} = \mathbf{x}_{i} + (\mathbf{f} + \mathbf{G} \mathbf{u}_i) \Delta t + \mathbf{B}_E \epsilon_{i, k} \sqrt{\Delta t};
      \tilde{S}(\tau_k) = \tilde{S}(\tau_k) + \tilde{q} (\mathbf{x}_i, \mathbf{u}_i, \epsilon_{i, k}, t_i);
    
  for i \leftarrow 0 to N - 1 do
  \mathbf{u}_i = \mathbf{u}_i + \mathcal{H}^{-1} \mathcal{G} \;
  \sum_{k=1}^K \left[ \dfrac{\exp (-\dfrac{1}{\lambda} \tilde{\mathcal{S}}(\tau)) \epsilon_j \sqrt{\Delta t}}{\sum_{k=1}^K \exp(-\dfrac{1}{\lambda} \tilde{\mathcal{S}} (\tau))} \right];

  send to actuators (\mathbf{u}_0)

  for i \leftarrow 0 to N - 2 do
    \mathbf{u}_i = \mathbf{u}_{i+1};
  \mathbf{u}_{N-1} = \mathbf{u}_{init}

  Update the current state after receiving feedback;
  check for task completion;
```
