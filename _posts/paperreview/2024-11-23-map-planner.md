---
title: "[Paper Review] Model- and Acceleration-based Pursuit Controller for High-Performance Autonomous Racing"
categories:
  - paperreview
---
# 3. Methodology

- Pure Pursuit uses  the same $L_1$ guidance law that was proposed for UAV. With his, we show that Pure Pursuit disregards wheel slip, an assumption that fails at high speeds.

We propose a method able to better capture and control the real-world dynamics of the car.

## A. Proposed Control System Overview

Ths $L_2$ guidance results in a desired centripetal acceleration $a_c$ of the vehicle, equal to the tangential speed $v_t$ multiplied with the yaw rate $\psi$

$$
a_c = v_t \\
\dot{\psi} = 2 \dfrac{v_t^2}{L_d} \sin{}
$$
