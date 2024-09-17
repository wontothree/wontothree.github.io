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

For a vector-valued bounded Lipschitz function $\mathbb{f} = \left[ f_1, f_2, \dots, f_d \r