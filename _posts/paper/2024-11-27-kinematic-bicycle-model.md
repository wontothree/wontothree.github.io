---
title: "[Paper] The kinematic bicycle model: A consistent model for planning feasible trajectories for autonomous vehicles?"
categories:
  - paper
---
# Abstract

Most autonomous driving architectures separate planning and control phases in different layers, even though both problems are intrinsically related. Due to limitations on the available computational power, their levels of abstraction and modeling differ; in particular, vehicle dynamics are often highly simplified at the planning phase, which may lead to inconsistency between the two layers.

Contribution

- study the kinematic bicycle model, which is often used for trajectory planning
- compare its results to a 9 degrees of freedom model.
- Modeling errors and limitations of the kinematic bicycle model are highlighted.
- proposes a simple and efficient consistency criterion in order to validate the use of this model for planning purposes.

# 3. Low-Level Control

Given a list of waypoints $(w_i)_{i \in I} = (X_i, Y_i, V_i)_{i \in I}$

- $(X_i, Y_i)$: successive reference positions of the vehicle in the ground frame
- $V_i$: successive speed references at position $(X_i, Y_i)$

, the control problem

1. <span style="color: #2D3748; background-color:#fff5b1;">finding a sequence of feasible control inputs $(u_i)_{i \in I}$ that stabilizes the system and tracks the reference trajectory given by the waypoints.</span>
2. time response of the system
3. driving comfort
4. energy consumption

## Solutions

### 1) Kinematic-based controllers

- based on the geometry and on the speed of the vihicles.
- assume no slip and no skip
- usually limited to low-speed application

### 2) Dunamic-based controllers

based on the 3 Degrees of Freedom dynamics bicycle model of the vechicle combined with a linear tire model

$$
\begin{align*}
  m(\dot{V}_x) - \dot{\psi}V_y &= F_{xf} + F_{xr} \\
  m(\dot{V}_y) + \dot{\psi}V_x &= F_{yf} + F_{yr} \\
  I_z \ddot{\psi} &= I_f F_{yf} - I_r F_{yr}
\end{align*}
$$

$C_{\tau}, C_{\alpha}$ corresponds to the longitudinal (lateral) tire stiffness coefficient

$$
\begin{align*}
  F_{xp_f} &= C_{\tau_f}\tau_{x_f} \\
  F_{yp_f} &= C_{\alpha_f} \left(\delta_f - \dfrac{V_y + I_f \psi}{V_x} \right) \\
  F_{xp_r} &= C_{\tau_r} \tau_{x_r} \\
  F_{yp_r} &= - C_{\alpha_r}\left( \dfrac{V_y - I_r \psi}{V_x} \right)
\end{align*}
$$