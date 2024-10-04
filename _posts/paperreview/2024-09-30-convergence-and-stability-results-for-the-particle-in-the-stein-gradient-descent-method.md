---
title: "[Paper Review] CONVERGENCE AND STABILITY RESULTS FOR THE PARTICLE SYSTEM IN THE STEIN GRADIENT DESCENT METHOD"
categories:
  - paperreview
  - svgd
---
# Abstract

Stein gradient descent method is based on a particle system moving along the gradient flow of the Kullback-Leibler divergence towards the asymptotic state corresponding to the desired distribution.

Mathematically, the method can be formulated as a joint limit of time $t$ and number of particles $N$ going to infinity.

We first observe that the recent work of Lu and Noeln (2019) implies the if $t \approx \log \log N$, then the joint limit can be rigorously justified in the Wasserstein distance.

<span style="color: #2D3748; background-color:#fff5b1;">
Not satifisfied with this time scale, we explore what happens for larger times by investigating the stability of the method: if the particles are initially close to the asymptotic state (with distance $\approx 1/N$), how long will they remain close? We prove that this happends in algebraic time scales $t \approx \sqrt{N}$ which is significantly better.</span>

# 1. Introduction

The Stein gradient descent method sample the probibilty distribution $\rho_{\infty} := e^{-V(x)/Z}$ when the normalization constant $Z = \int_{\mathbb{R}^d} e^{-V(x)} dx$ is unknown or difficult to compute.

A prominent example is the Bayesian inference used to fit parameters $\theta \in \Theta$ based on the data $D$ and a priori distribution of parameters $\pi (\theta)$: the a posteriori distribution is given by

$$
\mathbb{P} (\theta \vert D) =\dfrac{\mathbb{R} (D \vert \theta) \pi (\theta)}{\int_{\Theta} \mathbb{R}(D \vert \theta ') \pi (\theta ') d \theta'}
$$

Comparing to the well-known stochastic Methropolis-Hastings algorithm and its variants which require hug number of iterations, the Stein algorithm is completely deterministic.

In this method, one starts with a measure $\mu$ and modifies it via the map

$$
T_{\epsilon, \phi}(x) = x + \epsilon \phi,
$$

where $\epsilon$ is a small parameter and $\phi$ is chosed to minimize the Kullback-Leibler divergence $\text{KL}(T^{}$

# 2. Measure Solutions and the Functional Analytic Setting

## 2.1 Spaces of measures, the Wasserstein distance and the weighted bounded Lipschitz distance

<span style="color: #2D3748; background-color:#fff5b1;">*Bounded Lipschitz functions*</span>

Bounded Lipschitz functions

$$
\text{BL}(\mathbb{R}^d) = \left[ \psi : \mathbb{R}^d \rightarrow \mathbb{R} : \vert\vert \psi \vert\vert_{L^{\infty} (\mathbb{R}^d)} < \infty, \vert \psi \vert_{Lip} < \infty \right]
$$

where

$$
\vert \psi \vert_{\text{Lip}} = \sup_{x \neq y} \dfrac{\vert \psi (x) - \psi (y) \vert}{\vert x - y \vert}.
$$

A useful fact is that $\vert \psi \vert_{\text{Lip}} \leq \vert\vert \nabla \psi \vert\vert_{L^{\infty} (\mathbb{R}^d)}$.

In particular, to estimate $\vert\vert \psi \vert\vert_{\text{BL}(\mathbb{R}^d)}$, it is sufficient to compute $\vert\vert \psi \vert\vert_{L^{\infty}(\mathbb{R}^d)}$ and $\vert\vert \nabla \psi \vert\vert_{L^{\infty}(\mathbb{R}^d)}$.

## 2.2 Measure solutions to (1.5)

<span style="color: #2D3748; background-color:#fff5b1;">Definition 2.1 (*measure solution*)</span>

We say that a family of probability measures $\left[ \rho_t \right]_{t \in \left[ 0, T\right]}$ is a measure solution to (1.5) if $t \mapsto \rho_t$ is continusous (with respect to the narrow topology), for all $T > 0$ the growth estimate

$$
\sup_{t \in \left[ 0, T\right]} \vert\vert \rho_t \vert\vert_{\text{BL}^*_V} = \sup_{t \in \left[ 0, T\right]} \int_{\mathbb{R}^d} (1 + V(x)) d \rho_t(x) \leq C(T)
$$

is satisfied and for all $\phi \in C_c^{\infty} (\left[ 0, \infty\right) \times \mathbb{R}^d)$

$$
d
$$

# 3. Assumptions on the Kernel and the Potential

# 4. Proof o fTheorem 1.1

# 5. The Weighted $L^2$ Estimate (Proof of Theorem 1.3)

# 6. BL Estimates on $\rho$ and Proof of Theorem 1.2