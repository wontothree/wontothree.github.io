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
\mathbf{u}^*(\cdot) = \underset{\mathbf{u}(\cdot)}{\operatorname{argmin}} \; \mathbb{E} \left[ \phi (\mathbf{x_T}, T) + \int_{t_0}^T \mathcal{L}(\mathbf{x_t, \mathbf{u}_t, t}) \; dt \right]
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

# 3. Model Predictive Control Algorithm

![](./../../img/paperreview/mppi-sudocode.png){: .align-center}
