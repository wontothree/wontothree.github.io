---
title: "[Cart Pole] Simulation"
excerpt:
categories:
  - cartpole
---
## Cart Pole

- Cart : moving horizontally
- Pole : freely rotating around its base
- Action Space : horizontal forces that can be applied to the cart (left or right)
  - Action 0 : left
  - Action 1 : right
- Control Object : to find sequence of actions such that the pole is kept in the vertical position
- States of Observation Space
  - Cart Position (m) ($X$) : $-4.8 \leq X \leq 4.8$
  - Cart Velocity (m/s) ($\dot{X}$) : $\infty \leq \dot{X} \leq \infty$
  - Pole angle of rotation (radian) ($\theta$) : $-0.418(-24 \degree) \leq \theta \leq 0.418 (24 \degree)$
  - Pole Angular Velocity ($\dot{\theta}$) : $\infty \leq \dot{\theta} \leq \infty$
  