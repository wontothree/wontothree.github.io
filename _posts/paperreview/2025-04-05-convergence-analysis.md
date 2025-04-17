---
title: "[OPT for ML] Convergence Analysis of ODE Models for Accelerated First-Order Methods"
categories:
  - paperreview
---
[사전지식] Definition of Stability

임의의 epsilon > 0에 대해서 적당한 delta > 0가 존재하여 t = 0에서

$$
\vert\vert \mathbf{x}(0) - \mathbf{x}^{*} \vert\vert < \delta
$$

을 만족하는 연립방정식의 모든 해

$$
\mathbf{x} = \mathbf{x}(t)
$$

가 모든 t에 대해서 존재하고 모든 t ≥ 0에 대해

$$
\vert\vert \mathbf{x}(0) - \mathbf{x}^{*} \vert\vert < \epsilon
$$

을 만족한다면 연립방정식의 임계점

$$
\mathbf{x}^{*}
$$

가 안정적이라고 한다.

# Abstract

- novel methodology that systematically analyzes ordinary differential equation models for first-roder optimization methods
- establish convergence rates of various accelerated gradient flow models.
- Lagrangian dual of a related version of continuous-time PEP를 기반으로 만들어졌다.
- 수렴 속도를 증명하는 작업을 특정 적분 커널의 positive semidefiniteness을 검증하는 문제로 변환한다. (?)

# Continuous-time Performance Estimation Problem

Nesterov’s Accelerated Gradient Method에 대한 limiting ODE

$$
\ddot{X} + \dfrac{1}{t} \dot{X} + \nabla f(X) = 0
$$

with initial conditions

$$
X(0) = x_0, \;\;\; \dot{X}(0) = 0
$$

만약 다음 부등식을 만족하는 $\rho$가 존재한다면 $f$가 $f(x^*)$로 수렴한다. 따라서 우리의 목표는 다음 부등식을 만족하는 $\rho$를 찾는 것이다.

$$
f(X(T)) - f(x^*) \leq \rho \vert\vert x_0 - x^* \vert\vert^2
$$

우리는 이 $\rho$를 찾기 위해 다음의 최적화 문제(Exact PEP)를 구성한다.

<div class="latex-container">
  $$
  \begin{align*} & \underset{
    \substack{
      f \in \mathcal{F}_0(\mathbb{R}^d; \mathbb{R}) \\
      X \in C^1([0, T]; \mathbb{R}^d)
    }
  }{\max} \;\; \dfrac{f(X(T)) - f(x^*)}{\vert\vert x_0 - x^* \vert\vert^2} \\ & \mathrm{subject \; to} \;\;\ddot{X} + \dfrac{1}{t} \dot{X} + \nabla f(X) = 0
  \end{align*}
  $$
</div>

여기서 $\mathcal{F}_0(\mathbb{R}^d; \mathbb{R})$는 the set of continuously differentiable $\mu$-strongly convex functions on $\mathbb{R}^d$.

## Relaxation of PEP

Exact PEP의 결과값을 $\rho$로 설정할 수 있기 때문에 Exact PEP를 푸는 것은 유용하다. 하지만 최적화 변수인 함수 $f$를 모르기 때문에 Exact PEP는 풀기 어렵다. 따라서 우리는 조건

$$
f \in \mathcal{F}_0(\mathbb{R}^d; \mathbb{R})
$$

을 충분조건으로 대체함으로써 Exact PEP를 relax된 최적화 문제(Relaxed PEP)를 다룬다.

<div class="latex-container">
  $$
  \begin{align*}
  & \underset{ \rho, \gamma, v}{\max} \;\; \dfrac{f(X(t)) - f(x^*)}{\vert\vert x_0 - x^* \vert\vert^2} \\
  & \mathrm{subject \; to} \;\;\; t \in (0, T), \\
  & 0 = \dot{\rho}(t) + \Big\langle \gamma(t), \int^t_0 H(t, \gamma) \gamma(r) dr \rangle \\
  & 0 \geq \gamma(t) + \Big\langle \gamma(t), v + \int^t_0 \int^t_\tau H(s, \tau) \gamma(\tau) \; ds \; d\tau \Big\rangle \\
  \end{align*}
  $$
</div>

val(Relaxed PEP) $\geq$ val(Exact PEP)

## Lagrangian dual of relaxed PEP

Let Lagrange multipliers

$$
\lambda_1 \in C^1 ([0, T]; \mathbb{R}), \;\;\; \lambda_2 \in C ([0, T]; \mathbb{R}_{\geq 0})
$$

which are continuous and differentiable to ensure that the dual problem is well-defined.

Then we define the Lagrangian function as

$$
\begin{align*}
\mathcal{L} (\varphi, \gamma, v; \lambda_1, \lambda_2)
&= \varphi (T) - \int_0^T \lambda_1(t) \left( \dot{\varphi} + \Big\langle \gamma (t), \int_0^t H(t, \tau) \gamma(\tau) d\tau \Big\rangle \right) dt \\
& \;\;\;\; - \int_0^T \lambda_2(t)\left(\varphi(t) + \Big\langle \gamma(t), v + \int_0^t \int_\tau^t H(s, \tau) \gamma(\tau) ds \; d\tau \Big\rangle \right) dt \\
&= \varphi (T) - \langle \lambda_1, \dot{\varphi}_{L^2([0, T]; \mathbb{R}^d)} \rangle - \langle \lambda_2(t) v, \gamma(t)\rangle_{L^2([0, T]; \mathbb{R}^d)} \\
& \;\;\;\; -\dfrac{1}{2} \langle K_{\gamma}, \gamma \rangle_{L^2([0, T]; \mathbb{R}^d)} - \langle \lambda_2(t)v, \gamma(t) \rangle_{L^2([0, T]; \mathbb{R}^d)}
\end{align*}
$$

where K is the Hibert-Schmidt integral operator with the symmetric kernel k defined by

$$
k(t, \gamma) = \lambda_1(t) H(t, \tau) + \lambda_2 \int_{\tau}^t H(s, \tau) ds, \;\;\; t \geq \tau
$$

The dual function is defined as

$$
\text{Dual}(\lambda_1, \lambda_2) = \sup_{\varphi, \gamma, v} \mathcal{L}(\varphi, \gamma, v; \lambda_1, \lambda_2)
$$