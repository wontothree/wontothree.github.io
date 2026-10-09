In this chapter, we see how to calculate the robot end-effector frame's position and orientation for a given set of joint positions.

# 1. Product of Exponentials Formula

When we are defining the kinematics of an $n$-joint robot, we may either

(1) minimally use the frames $\left\{ s \right\}$ and $\left\{ b \right\}$ if we are only interested in the kinematics, or
(2) refer to $\left\{ s \right\}$ as frame $\left\{ 0 \right\}$, use frames $\left\{ i \right\}$ for $i = 1, \dots, n$ (the frames for links $i$ at joints $i$), and use one more frame $\left\{ n + 1 \right\}$ (corresponding to $\left\{ b \right\}$) at the end-effector.

The frame $\left\{ n + 1 \right\}$ is fixed relative to $\left\{ n \right\}$, but is is at a more convenient location to represent the configuration of the end-effector.

## 4.1 First Formulation: Screw Axes in the Base Frame

The key concept behind the PoE formula is to regard each joint as applying a screw motion to all the outward links.

$$
T(\theta) = e^{[\mathcal S_1] \theta_1} \cdots e^{[\mathcal S_{n-1}] \theta_{n-1}} e^{[\mathcal S_n] \theta_n}M.
$$

This is the product of exponentials formula describing the foward kinematics of an $n$-dof open chain. Shpecifically, we call the equation the space form of the product of exponentials formula, referring to the fact that the screw axes are expressed in the fixed space frame.

To summarize, to calculate the forward kinematics of an open chain using the space form of the PoE formula, we need the follwoing elements:

(a) the end-effector configuration $M \in SE(3)$ when the robot is at its home position; \
(b) the screw axes $S_1, \dots, S_n$ expredd in the fixed base frame, corresponding to the joint motions when the robot is at its home position; \
(c) the joint variables $\theta_1, \dots, \theta_n$.

## 4.2 Second Formulation: Screw Axes in the End-Effector Frame

$$
\begin{aligned}
T(\theta) =& e^{[\mathcal S_1] \theta_1} \cdots e^{[\mathcal S_n] \theta_n}M
\\
=& e^{[\mathcal S_1] \theta_1} \cdots M e^{M^{-1}[\mathcal S_n] M \theta_n}
\\
=& e^{[\mathcal S_1] \theta_1} \cdots M e^{M^{-1}[\mathcal S_{n-1}] M \theta_{n-1}} e^{M^{-1}[\mathcal S_n] M \theta_n}
\\
=& Me^{M^{-1} [\mathcal S_1] M \theta_1} \cdots e^{M^{-1}[\mathcal S_{n-1}] M \theta_{n-1}} e^{M^{-1}[\mathcal S_n] M \theta_n}
\\
=& Me^{[\mathcal B_1] \theta_1} \cdots e^{[\mathcal B_{n-1}] \theta_{n-1}} e^{[\mathcal B_n] \theta_n}
\end{aligned}
$$
where $[\mathcal B_i] := M^{-1} [\mathcal S_i] M$.

This equation is an alternative form of the product of exponentials formula, representing the joint axes as screw axes $\mathcal B_i$ in the end-effector (body) frame when the robot is at its zero position. We call this equation the body form of product of exponentials formula.
