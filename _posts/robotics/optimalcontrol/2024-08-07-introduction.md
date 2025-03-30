---
title: "[MPC] Introduction"
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

absolute constraint:

$$
\underline{u} \leq u(k) \leq \overline{u}
$$

rate constraints:

$$
\underline{\Delta u} \leq u(k) - u(k-1) \leq \overline{\Delta u}
$$

Input constraints commonly arise as a result of actuator limits, e.g. torque saturation in d.c. motors and flow saturation in valvues.

**State constraints.**

Linear state constraints have the general form

$$
\overline{g_c} \leq G_c x(k) \leq \underline{g_c}
$$

where $G_c$ is a constant matrix and $\overline{g_c}, \underline{g_c}$ are constant vectors.

### 5.1 De-tuned optimal control

It may be possible to acount for input constraints by increasing the input weighting $R$ in the LQ performance cost untile the associated optimal feedback law satisfies constraints in the desired operating region.

### 5.2 Anti-windup strategies

Anti-windup methods aim to prevent the instability that can occur in controllers which incorporate integral action when input constraints are active.

### 5.3 Model predictive control

## Summary of Section 1

- MPC is a feedback law based on prediction, optimization, and receding horizon implementation. The optimization is performed over open-loop predictions, which are based on a plant model.
- Constraints on system inputs and states can be hard or soft. Constraints are hendled sub-optimally using de-tued optimal control or anti-windup strategies whereas MPC enables constraints to be handled optimally.

## Question

- 다음 문장의 의미는? "Given a predicted input sequence, the corresponding sequence of state predictions is generated by simulating the model forward over the pre- diction horizon, of say N sampling intervals." : 미래를 고려하기 때문에 forward
- Online optimization and offline optimization?
- receding horizon strategy?
- By continually shifting the horizon over which future inputs are optimized, it attempts to compensate for the fact that this horizon is finite.
- Provided the cost and constraints are designed correctly, a receding horizon strategy can ensure that the performance of the closed-loop system is at least as good as that of the optimal prediction.
- Prediction models may be deterministic, stochastic, or fuzzy.
- Prediction model == plant model ?
  - prediction model : 가정한 plant model. 실제 plant model로부터 도출된 모델
- QP : 선형 상태 공간 모델을 x에 대해 정리하여 비용함수의 x 자리에 대입한 식?
- 1.4.3 이해 안 됨.
- State constraints may be active during transients, e.g. aircraft stall speed, or in steady-state operation as a result of e.g. economic constraints on process operation.
- fig4, 5의 의미
- Constraints on system inputs and states can be hard or soft. Constraints are hendled sub-optimally using de-tued optimal control or anti-windup strategies whereas MPC enables constraints to be handled optimally.

## Seminar

linear MPC가 갖춰야 할 조건

1. cost function이 quadratic form이어야 한다. 4승이면 안 된다.
2. plant model이 선형이어야 한다.

- 왜 예측한 값이 실제와 다를까?
  - cost function L을 잘 선정하면 그 두 개가 같아지게 할 수 있다.
- 모델링을 얼마나 엄밀하게 해야 할까?
  - 모델 오차는 항상 존재한다. 내 제어기가 그 오차를 보정해줄 수 있느냐 등을 보장하는 것은 중요하다. 모델 오차가 1만 있어도 발산한다면 문제가 된다. 하지만 얘는 피드백의 혜택을 누릴 수 있다.
- 모델링 과정에서 마찰력을 고려해야 할까?
  - 마찰 계수를 예측하는 데는 오차가 항상 있기 때문에 마찰력이 uncertainty이다. 적당히 넣고 모델링을 하든 무시하든 uncertainty가 있다.
- Online optimization과 offline optimization의 차이는 우엇인가?
  - offline optimization : 한 번에 다 푼다. feed-forward (피드백이 없다.) online optimization : 매 순간 푼다. feed-forward (피드백이 있다.)

horizon shifting

1. allow for feedback : compensates for model mismatch & disturbances
2. compensates for finite number of d.o.f in predictions : improves closed-loop performance

너무 긴 미래를 고려하면 현재에 대한 고려가 적어지기 때문에 성능이 떨어질 수 있다.

closed-loop : 제어가 된 이후의 전체 시스템의 성능

- MPC의 단점 : online optimization / nonlinear/uncertain plants -> computationally expensive

지금 상황에서는 동일하다.

- kalman filter : uncertainty를 gaussian으로 modeling했다. (?)

최적의 제어를 하겠다. uncertainty가 있다면 그것이 최적일까?

보통 mpc가 다룰 수 있는 불확실성의 범위가 굉장히 작다. 최적을 말하려면 불확실성을 많이 다루기 어렵다.

더 큰 불확실성을 다루려면 다른 제어기를 사용하라.

fuzzy :

강화학습이 나오기 전 신이 fuzzy

결정을 내리는 걸 network을 만들어서... (신경망)

stochastic optimiation은 plant model이 stochastic해지는 것인가? (?)

- QP : cost function을 x에 의존적이지 않은 u에 대한 함수로 쓸 수 있다.
  - 이 문제의 장점은 convexity를 보장받을 수 있다.
  - 해가 global unique하다.
  - solver가 풀기 쉽다.
  - 저 미방을 완전히 풀어서 원래 최적화 문제에 대입하여 qp의 cost function을 얻을 수 있다.
- 비선형 시스템은 각각이 연구 주제다.
- 여기서는 T는 제어 주기이자 예측 주기(샘플링)이다.
- 먼저 연속 시간에서 모델링을 하고 이산화 모델을 만든다. 처음부터 이산화된 모델이 주어졌다면 그대로 사용하면 된다. 핵심은 MPC를 사용하기 위해서는 이산화된 모델을 사용해야 한다는 것이다.
- Soft and hard constraint
  - MPC에서 hard constraint : 최적화 문제에서 constraint
  - MPC에서 soft constraint : cost function에서 추가된 term
- discretize한다는 것은 다른 모든 것은 그대로 둔 채 plant model만 discretiz하면 되나? Yes
- De-tuned optimal control 와 Anti-windup strategies는 아직 mpc가 아니다.
  - R을 높이면 u를 적게 사용할 것이다. R에 대한 가중치를 키우면 상대적으로 Q에 대한 가중치가 작아져서 u는 빠르게 수렴할지라도 y는 빠르게 수렴하지 않는다.
  - 저 두 가지보다 mpc가 조금 더 똑똑하다. 저 두 가지는 input constraint를 고려하지 않았다.
- 입력의 변수 수 : 입력의 원소의 개수 x 샘플링 수
- 지금은 disturbance에 radnom 성이 없다. 100번 해도 동일한 결론이 나온다. random 성이 들어가면 100번 중에 다른 결론이 나온다. stochastic optimization에서는 disturbance를 random variable로 두고,  상태변수도 random variable이 된다. 가우시안이다 등의 가정을 한다. state도 평균과 분산이 있을 것이다. 이때 최적이라는 것이 굉장히 애매하다. 그래서 평균을 취한다. cost function에 expection이 들어간다. cost function도 이산화해야 한다. MPC는 어짜피 이산화 버전만을 다룬다. summaton을 한다는 것 자체가 이산화되어 있다는 것이다. 이미 이산화된 버전이다.

cost function을 구성하는 x(t), x(k) 중에 고민해야 한다.

$$
L(x, u) = x^TQx + u^TRu
$$

- 이산화 한다고 하더라도 L은 건드릴 필요가 없다. 연속시간이었다면 적분을 했어야 했을 것이다.
- soft constraint을 주는 대표적인 세 가지 방법이 있다.
  - 가장 메이저한 방법이 barrior function을 사용하는 것이다. 지수 스케일의 barrior function 등 $\sum L + barrier$
  - slack vairable을 이용하는 방법도 있다.

$$
J = sum L + r

s.t. x \leq 1 + r
$$
