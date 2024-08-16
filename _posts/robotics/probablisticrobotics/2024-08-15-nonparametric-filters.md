---
title: "[Probablistic Robotics] Nonparametric Filters"
categories:
  - probablisticrobotics
---
# 1. The Histogram Filter

Histogram filters decompose the state space into finitely many regions and represent the cumulative posterior for each region by a single probability value.

- Discrete Bayes filter : when applied to finite spaces
- Histogram filter : when applied to continuous spaces

## 1.1 The Discrete Bayes Filter Algorithm

![](../../../img/probablisticrobotics/discretebayesfilter_algorithm.png){: .align-center}

Discrete Bayes filters apply to problems with finite state spaces, where the random variable $X_t$ can take on finitely many values.

The discrete Bayes filter is derived from the general Bayes filter by replacing the integration with a finite sum.

- $x_i, x_t$ : individual states, of which there may only be finitely many.
- $p_{k, t}$ : discrete probaility distribution

<span style="color: #2D3748; background-color:#fff5b1;">Input</span>

- discrete probaility distribution $p_{k, t}$
- the most recent control $u_t$
- measurement $z_t$

<span style="color: #2D3748; background-color:#fff5b1;">Output</span>

- the belief at time $t$, represented by $\mu_t$ and $\Sigma_t$, $p_{k, t}$

<span style="color: #2D3748; background-color:#fff5b1;">Prediction Step</span> (Linea 3)

calculates the prediciton, the belief for the new state based on the control alone

<span style="color: #2D3748; background-color:#fff5b1;">Measurement Update</span> (Linea 4)

incorporate the measurement

# 3. The Particle Filter

## 3.1 Basic Algorithm
