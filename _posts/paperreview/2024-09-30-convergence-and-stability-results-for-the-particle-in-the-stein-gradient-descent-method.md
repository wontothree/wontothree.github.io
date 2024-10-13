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

- The Stein gradient descent method sample the probibilty distribution $\rho_{\infty} := e^{-V(x)/Z}$ when the normalization constant $Z = \int_{\mathbb{R}^d} e^{-V(x)} dx$ is unknown or difficult to compute.
- A prominent example is the Bayesian inference used to fit parameters $\theta \in \Theta$ based on the data $D$ and a priori distribution of parameters $\pi (\theta)$: the a posteriori distribution is given by

$$
\mathbb{P} (\theta \vert D) =\dfrac{\mathbb{R} (D \vert \theta) \pi (\theta)}{\int_{\Theta} \mathbb{R}(D \vert \theta ') \pi (\theta ') d \theta'}
$$

- Comparing to the well-known stochastic Methropolis-Hastings algorithm and its variants which require hug number of iterations, the Stein algorithm is completely deterministic.

[Point 1] In this method, one starts with a measure $\mu$ and modifies it via the map

$$
T_{\epsilon, \phi}(x) = x + \epsilon \phi,
$$

where $\epsilon$ is a small parameter and $\phi$ is chosed to minimize the Kullback-Leibler divergence.

[Point 2] For two nonnegative measure $\mu, \nu$ the Kullback-Leibler divergence is defined as

$$
\text{KL}(\mu \vert\vert \nu) =
\int_{\mathbb{R}^d} \log \left( \dfrac{d\mu}{d\nu}(x) \right) \dfrac{d\mu}{d\nu}(x) \; d\nu (x)
$$

[Point 3] $\phi$ is chosen as a maximizer of the following optimization problem

$$
\max_{\phi \in \mathcal{H}} \left[ -\dfrac{d}{d\epsilon} \text{KL}(T^@_{\epsilon, \phi} \mu \vert\vert \rho_\infty) \vert_{\epsilon = 0}: \vert\vert \phi \vert\vert_{\mathcal{H}} \leq 1 \right]
$$

where $\mathcal{H}$ is a sufficiently big Hilbert space.

[Point 4] KL divergence

$$
-\dfrac{d}{d\epsilon} \text{KL}(T^@_{\epsilon, \phi} \mu \vert\vert \rho_\infty) \vert_{\epsilon = 0}
= \int_{\mathbb{R}^d} (\nabla \log (\rho_\infty) \cdot \phi + \text{div} \phi) d \mu (x)
$$

if $\dfrac{d\mu}{d\nu}$ exists, otherwise $+\infty$.

[Point 5] the variation does not depend on the normalization constant $Z$.

[Point 6] If $\mathcal{H}$ is a reproducing Hilbert space with kernel $K(x - y)$, one can obtain an explicit expression for the optimal $\phi$

$$
\phi \propto (\nabla \log (\rho_\infty) \mu) * K - \nabla K * \mu
$$

where $*$ denotes convolution operator $f * g(x) = \int_{\mathbb{R}^d} f(x - y) g(y) dy$

[Point 7] Let $\mu_0 = \dfrac{1}{N}\sum_{i=1}^N \delta_{x_0^i}$ and $\mu_l = \sum_{i=1}^N \delta_{x_l^i}$ from the l-th step, in the (l + 1)-th step we compute $\mu_{l+1} = \dfrac{1}{N} \sum_{i=1}^N \delta_{x_{l+1}^i}$ by

$$
x_{i+1}^i = x_l^i + \dfrac{\epsilon}{N}\sum_{j=1}^N \left[ \nabla \log \rho_\infty (x_l^i) K(x_l^i - x_l^j) - \nabla K (x_l^i - x_l^j) \right]
$$

This shows that the Stein gradient descent method is simple and attractive for practioners.

---

[Point 1] Stein's method was connected to the ODE system (Q. 이게 왜 ODE?)

$$
\part