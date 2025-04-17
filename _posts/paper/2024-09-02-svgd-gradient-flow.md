---
title: "[Paper] SVGD as Gradient Flow"
categories:
  - paper
---
# Abstract

SVGD

- deterministic sampling algorithm
- iteratively transport a set of particles to approximate given distributions
- based on gradient-based update that guarantees to optimally decrease the KL divergence within a function space.

This paper

- develops the first theoretical analysis on SVGD

# Density Evolution of SVGD Dynamics

- Section 3.1 : the evolutionary process of the empriical measures of the SVGD particles and their large sample limit as $n \rightarrow \infty$
- Section 3.2 : large time limit as $\mathcal{l} \rightarrow \infty$.
- Section 3.3 : the large sample limit of the SVGD dynamics is characterized by a Vlasov process, which monotonically decreases the KL divergence to target distributions with a decreasing rate the equals the square of Stein discrepancy.
- Section 3.4 : geometric intuition that interpret SVGD as a gradient flow of KL divergence under a new Riemannian metric structure induced by Stein operator.
- Section 3.5 : brief discussion on the connection to Langevin dynamics

## 3.1 Large Sample Asymptotic of SVGD

SVGD는 다음의 Optimal transform을 취급한다.

$$
\mathbf{T}_{\mu, p}(x) = x + \epsilon \phi_{\mu, p}^*(x)
$$

We define its related map

$$
\Phi_p : \mu \rightarrow \mathbf{T}_{\mu, p}\mu
$$

This map fully characterizes the SVGD dynamics in the sense that the empirical measure $\hat{h}_l^n$ can be obtained by recursively applying $\Phi_p$ starting from the initial meausre $\hat{\mu}_0^n$.  

$$
\mu_{l + 1}^\infty = \Phi_p (\mu_l^\infty), \;\;\; \forall l \in \mathbf{N}
$$

<span style="color: #2D3748; background-color:#fff5b1;">결론</span>

Assuming $\hat{\mu}_0^n \Rightarrow \hat{\mu}_0^\infty$ by initialization, we may expect that $\hat{\mu}_l^n \Rightarrow \hat{\mu}_l^\infty$ for all the finite iterations $l$ if $\Phi_p$ satisfies certain Lipschitz condition.

<span style="color: #2D3748; background-color:#fff5b1;">Bounded Lipschitz</span>

For two measures $\mu$ and $v$, their bounded Lipschitz (BL) metric

$$
\text{BL} (\mu, v) := \sup_f \left[ \mathbf{E}_\mu f - \mathbf{E}_v f \;\;\; \text{s.t.} \;\;\; \vert \vert f \vert \vert_{\text{BL}} \leq 1 \right]
$$

where

- $\vert \vert f \vert \vert_{\text{BL}} = \max \left[ \vert \vert f \vert \vert_\infty, \vert\vert f \vert\vert_{\text{Lip}} \right]$
- $\vert \vert f \vert \vert_\infty = \sup_x \vert f(x) \vert$
- $\vert\vert f \vert\vert_{\text{Lip}} = \sup_{x \neq y} \dfrac{\vert f(x) - f(y) \vert}{\vert\vert x - y \vert\vert_2}$

definition

For a vector-valued bounded Lipschitz function $\mathbb{f} = \left[ f_1, f_2, \dots, f_d \right]^T$, we define its norm by 

$$
\vert\vert \mathbb{f} \vert\vert_{\text{BL}}^2 = \sum_{i=1}^d \vert\vert f_i \vert\vert_{\text{BL}}^2.
$$

It is known that the BL metric metricizes weak convergence, that is, $\text{BL} (\mu_n, v) \rightarrow 0$ if and only if $\mu_n \Rightarrow v$.

<span style="color: #2D3748; background-color:#fff5b1;">Lemma 3.1.1</span>

Assuming $\mathbb{g} (x, y) := \mathcal{S}_p^x \otimes k(x, y)$ is bounded Lipschitiz jointly on $(x, y)$ with norm $\vert\vert \mathbf{g} \vert\vert_{\text{BL}} < \infty$, then for any two probability measures $\mu$ and $\mu '$, we have

$$
\text{BL} (\Phi_p (\mu), \Phi_p (\mu')) \leq (1 + 2\epsilon \vert\vert \mathbf{g} \vert\vert_{\text{BL}}) \text{BL} (\mu, \mu')
$$

<span style="color: #2D3748; background-color:#fff5b1;">Theorem 3.2</span>

Let $\hat{\mu}_l^n$ be the empirical measure of $[x_l^i]_{i=1}^n$ be the empirical measure of $[x_l^i]_{i=1}^n$ at the $l$-th iteration of SVGD. Assuming

$$
\lim_{n \rightarrow \infty} \text{BL} (\hat{\mu}_0^n, \mu_0^\infty) \rightarrow 0,
$$

then for $\mu_l^\infty$ at any finite iteration $l$,

$$
\lim_{n \rightarrow \infty} \text{BL} (\hat{\mu}_l^n, \mu_l^\infty) \rightarrow 0,
$$

## 3.2 Large Time Asymptotic of SVGD

We show that update $\mu_{l + 1}^\infty = \Phi_p (\mu_l^\infty), \;\;\; \forall l \in \mathbf{N}$ monotonically decreases the KL divergence between $\mu_l^\infty$ and $v_p$ and allows us to establish the convergence $\mu_l^\infty \Rightarrow v_p$.

<span style="color: #2D3748; background-color:#fff5b1;">Theorem 3.3.</span>

Assuming p is a density that satisfies Stein's identity for $\forall \phi \in \mathcal{H}$, then the measure $v_p$ of p is a fixed point of map $\Phi_p$.

Assuming $R = \sup_x [\dfrac{1}{2} \vert\vert \nabla \log p \vert\vert_{\text{Lip}} k(x, x) + 2 \nabla_{x x'} k(x, x)] < \infty$, where $\nabla_{x x'} k(x, x) = \sum_i \partial_{x_i} \partial_{x_i'} k(x, x') \vert_{x = x'}$, and the step size $\epsilon_l$ at the $l$-th iteration is no larger that $\epsilon_l^* := (2\sup_x \rho(\nabla \phi_{\mu_l, p}^* + \nabla {\phi_{\mu_l, p}^*}^T))^{-1}$, where $\rho (A)$ denotes the spectrum norm of a matrix $A$.

If $\text{KL} (\mu_0^\infty) \vert\vert v_p < \infty$ by initialization, then

$$
\dfrac{1}{\epsilon_l} [ \text{KL} (\mu_{l+1}^\infty \vert\vert v_p) - \text{KL} (\mu_{l}^\infty \vert\vert v_p)] \leq - (1 - \epsilon_l R) \mathbb{D} (\mu_l^\infty \vert\vert v_p)^2 < 0
$$

the population SVGD dynamics always decrease the KL divergence when using sufficiently small step sizes, with a decreasing rate upper bounded by the squared Stein discrepancy.

## 3. Continuous Time Limit and Viasov Process

We can explain ... as deterministic PDE of Fokker-Planck equation that characterizes the movement of particles under deterministic forces, but it is nonlinear.

$$
\dfrac{\partial}{\partial t}q_t(x) = -\nabla \cdot (\phi_{q_t, p}^*(x) q_t(x)).
$$

## 4. Gradient Flow, Optimal Transport, Geometry

## 5. Comparison with Langevin Dynamics

The theoy of SVGD is parellal to that Langevin dynamics in many perspectives, with importance differnences.

Langevin dynamcis

$$
x_{l+1} \leftarrow x_l + \epsilon \nabla \log p(x_l) + 2 \sqrt{\epsilon} \xi_l, \;\;\; \xi_l \sim \mathcal{N} (0, 1)
$$

where a single particle $x_l$ moves along the gradient direction.

Standard results show that the density $q_t$ of random variable $x_t$ is governed by a linear Fokker-Planck equation, following which the KL divergence to p decreases with a rate that equals Fisher divergence:

$$
\dfrac{\partial q_t}{\partial t} = - \nabla \cdot (q_t \nabla \log p) + \Delta q_t, \;\;\; \dfrac{d}{dt} \text{KL} (q_t \vert \vert p) = -\mathbf{F}(q_t, p),
$$

where $\mathbf{F}(q, p) = \vert \vert \nabla \log (q / p) \vert \vert_{L_q^2}^2$

- deterministic vs. stochastic
- Ito stochastic differential equation vs Fokker-Planck euqation
- 2-Wasserstein에서 KL funcional gradient flow로 해석 가능
- SVGD와 Langevin 동역학 간의 연결 고리는 두 방법을 통합하거나 그 장점을 결합하는 이론 및 알고리즘 개발로 이어질 수 있다.

# Conclusion and Open Questions

We developed a theoretical framework for analyzing the asymptotic properties of Stein variational gradient descent.

Open Problem

1. to establish explicit convergence rate of SVGD, for which the existing theoretical literature on Langevin dynamics and interacting particles systems may provide insights. 
2. to develop finite sample bounds for SVGD that can take the fact that it reduces to MAP optimization when n = 1 into account
3. to understand the bias and variance of SVGD particles, or combine it with traditional Monte Carlo whose bias-variance analysis is clearer
