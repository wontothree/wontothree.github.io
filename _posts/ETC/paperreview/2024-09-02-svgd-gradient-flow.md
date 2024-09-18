---
title: "[Paper Review] SVGD as Gradient Flow"
categories:
  - paperreview
---
# Abstract

SVGD

- deterministic sampling algorithm
- iteratively transport a set of particles to approximate given distributions
- based on gradient-based update that guarantees to optimally decrease the KL divergence within a function space. 

This paper

- develops the first theoretical analysis on SVGD

# 1. Introduction

SVGD

- particle-based algorithm for approximating complex distribution.

# 2. Stein Variational Gradient Descent

We want to approximate $v_p$ with a set of aprticles $\left[ x_i \right]_{i=1}^n$ whose empirical measure

# 3. Density Evolution of SVGD Dynamics

- Section 3.1 : the evolutionary process of the empriical measures of the SVGD particles and their large sample limit as $n \rightarrow \infty$
- Section 3.2 : large time limit as $\mathcal{l} \rightarrow \infty$.
- Section 3.3 : the large sample limit of the SVGD dynamics is characterized by a Vlasov process, which monotonically decreases the KL divergence to target distributions with a decreasing rate the equals the square of Stein discrepancy.
- Section 3.4 : geometric intuition that interpret SVGD as a gradient flow of KL divergence under a new Riemannian metric structure induced by Stein operator.
- Section 3.5 : brief discussion on the connection to Langevin dynamics

## 3.1 Large Sample Asymptotic of SVGD

$$
\mu_{l + 1}^\infty = \Phi_p (\mu_l^\infty), \;\;\; \forall l \in \mathbf{N}
$$

Assuming $\hat{\mu}_0^n \Rightarrow \hat{\mu}_0^\infty$ by initializzation, we may expect that $\hat{\mu}_l^n \Rightarrow \hat{\mu}_l^\infty$ for all the finite iterations $l$ if $\Phi_p$ satisfies certain Lipschitz condition.

**Bounded Lipschitz**

For two measures $\mu$ and $v$, their bounded Lipschitz (BL) metric

$$
\text{BL} (\mu, v) := \sup \left[ \mathbf{E}_\mu f - \mathbf{E}_v f \;\;\; \text{s.t.} \;\;\; \vert \vert f \vert \vert_{\text{BL}} \leq 1 \right]
$$

where

- $\vert \vert f \vert \vert_{\text{BL}} = \max \left[ \vert \vert f \vert \vert_\infty, \vert\vert f \vert\vert_{\text{Lip}} \right]$
- $\vert \vert f \vert \vert_\infty = \sup_x \vert f(x) \vert$
- $\vert\vert f \vert\vert_{\text{Lip}} = \sup_{x \neq y} \dfrac{\vert f(x) - f(y) \vert}{\vert\vert x - y \vert\vert_2}$

**definition**

For a vector-valued bounded Lipschitz function $\mathbb{f} = \left[ f_1, f_2, \dots, f_d \right]^T$, we define its norm by 

$$
\vert\vert \mathbb{f} \vert\vert_{\text{BL}}^2 = \sum_{i=1}^d \vert\vert f_i \vert\vert_{\text{BL}}^2.
$$

It is known that the BL metric metricizes weak convergence, that is, $\text{BL} (\mu_n, v) \rightarrow 0$ if and only if $\mu_n \Rightarrow v$.

>Lemma 3.1.1

Assuming $\mathbb{g} (x, y) := \mathcal{S}_p^x \otimes k(x, y)$ is bounded Lipschitiz jointly on $(x, y)$ with norm $\vert\vert \mathbf{g} \vert\vert_\infty < \infty$, then for any two probability measures $\mu$ and $\mu '$, we have

$$
\text{BL} (\Phi_p (\mu), \Phi_p (\mu')) \leq (1 + 2\epsilon \vert\vert \mathbf{g} \vert\vert_{\text{BL}}) \text{BL} (\mu, \mu')
$$

>Theorem 3.2

## 3.2 Large Time Asymptotic of SVGD

We show that update $\mu_{l + 1}^\infty = \Phi_p (\mu_l^\infty), \;\;\; \forall l \in \mathbf{N}$ monotonically decreases the KL divergence between $\mu_l^\infty$ and $v_p$ and allows us to establish the convergence $\mu_l^\infty \Rightarrow v_p$.

>Theorem 3.3.

1. Assuming p is a density that satisfies Stein's identity for $\forall \phi \in \mathcal{H}$, then the measure $v_p$ of p is a fixed point of map $\Phi_p$

## 3.3 Continuous Time Limit and Viasov Process

## 3.4 Gradient Flow, Optimal Transport, Geometry

## 3.5 Comparison with Langevin Dynamics

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

# 4. Conclusion and Open Questions
