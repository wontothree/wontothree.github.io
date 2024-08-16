---
title: "[Probablistic Robotics] Recursive State Estimation"
categories:
  - probablisticrobotics
---
## Bayes Filters

### 1. The Bayes Filter Algorithm

The most general algorithm for calculating beliefs is given by the Bayes Filter algorithm.

The general algorithm for Bayes filtering

input

- belief *bel* at time t-1
- most recent control $u_t$
- most recent measuremnt $z_t$

output

- belief *bel$(x_t)$* at time t

The Bayes filter algorithm possesses two essential steps.

- control update
- measurment update

### 2. Example

### 3. Mathematical Derivation of the Bayes Filter

- We need toshow that it correctly calculates the posterior distribution $p(x_t \vert z_{1:t}, u{1:t}$ from corresponding posterior one time step earlier $p(x_{t-1} \vert z_{1:t-1}, u_{1:t-1}$
- Induction

### 4. The Markov Assumption