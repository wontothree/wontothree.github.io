---
title: "[Paper] Convergence and Stability Results for the Particle System in the Stein Gradient Descent Method"
categories:
  - paper
---
# Abstract

Stein gradient descent method is based on a particle system moving along the gradient flow of the Kullback-Leibler divergence towards the asymptotic state corresponding to the desired distribution.

Mathematically, the method can be formulated as a joint limit of time $t$ and number of particles $N$ going to infinity.

We first observe that the recent work of Lu and Noeln (2019) implies the if $t \approx \log \log N$, then the joint limit can be rigorously justified in the Wasserstein distance.

<span style="color: #2D3748; background-color:#fff5b1;">
Not satifisfied with this time scale, we explore what happens for larger times by investigating the stability of the method: if the particles are initially close to the asymptotic state (with distance $\approx 1/N$), how long will they remain close? We prove that this happends in algebraic time scales $t \approx \sqrt{N}$ which is significantly better.</span>

# 1. Introduction

## Original Paper

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

## Follow-Up Paper

[Point 1] Stein's method was connected to the ODE system (Q. 이게 왜 ODE?)

$$
\partial_t x^i(x) = - \dfrac{1}{N}\sum_{j=1}^N \nabla K(x^i(t) - x^j(t)) - \dfrac{1}{N} \sum_{j=1}^N K (x^i(t) - x^j(t)) \nabla V (x^j(t))
$$

[Point 2] If the empirical emasure is $\rho_t^N = \dfrac{1}{N} \sum_{i=1}^N \delta_{x_i}(t)$, on finite intervals of time, $\rho_t^N \rightarrow \rho_t$ in the Wasserstein distance $\mathcal{W}_p$ where $\rho_t$ solves the nonlocal PDE

$$
\partial_t \rho_t = \text{div} ( \rho_t K * (\nabla \rho_t + \nabla V \rho_t))
$$

[Point 3] More rigorously, by Dobrushin-type argument,

$$
\mathcal{W_p (\mu_t, \nu_t)} \leq C \exp (C \exp (CT)) \mathcal{W}_p(\mu_0, \nu_0)
$$

for all times $t \in [0, T]$ and measure solution $\mu_t, \nu_t$, assuming that $V(x) \approx \vert x \vert ^p$ for large $x$.

## Main Results

- Paper [24] : N이 충분히 클 때 $t \rightarrow \infty$에 대한 수렴성을 보인다.
- This paper: N과 t가 특정한 관계에 있을 때, 각각이 모두 무한으로 갈 때에 대한 수렴성을 보인다.

<span style="color: #2D3748; background-color:#fff5b1;">*Theorem 1.1* (convergence)</span>

Suppose that $K, V$ satisfy Assumption 3.1 and 3.2. Let $\rho_t^N = \dfrac{1}{N} \sum_{i=1}^N \delta_{x_i(t)}$ where $x_i(t)$ solve

$$
\partial_t x^i(x) = - \dfrac{1}{N}\sum_{j=1}^N \nabla K(x^i(t) - x^j(t)) - \dfrac{1}{N} \sum_{j=1}^N K (x^i(t) - x^j(t)) \nabla V (x^j(t))
$$

Let $N(t) = \exp (2C \exp(Ct))$ where $C$ is the constant satisfying $\mathcal{W_p (\mu_t, \nu_t)} \leq C \exp (C \exp (CT)) \mathcal{W}_p(\mu_0, \nu_0)$

Then for all $q \in [1, p)$

$$
\mathcal{W}_q(\rho_t^{N(t)}, \rho_\infty) \rightarrow 0 \;\; \text{as} \;\; t \rightarrow \infty
$$

<span style="color: #2D3748; background-color:#fff5b1;">*Theorem 1.2* (stability estimate)</span>

Suppose that $K ,V$ satisfy Assumptions 3.1 and 3.3. Let $\rho_t$ be a measure solution to $\partial_t \rho_t = \text{div} ( \rho_t K * (\nabla \rho_t + \nabla V \rho_t))$

Then, there exists a constant $C$ depending only on $K$ and $V$ such that for all times $t$ satisfying $1 - C t(t + 1) \vert\vert \rho_0 - \rho_\infty \vert\vert_{\text{BL}_V^*} > 0$ we have

$$
\vert\vert \rho_t -\rho_\infty \vert\vert_{\text{BL}_V^*} \leq \dfrac{C(t + 1) \vert\vert \rho_0 - \rho_\infty \vert\vert_{\text{BL}_V^*}}{1 - C(t + 1)t \vert\vert \rho_0 - \rho_\infty \vert\vert_{\text{BL}_V^*}}
$$

<span style="color: #2D3748; background-color:#fff5b1;">*Theorem 1.3* (weighted estimate on $\rho$)</span>

Suppose that $K, V$ satisfy Assumptions 3.1 and 3.3. Let $\rho$ be a solution to

$$
\partial_t \rho = \nabla \rho \cdot K * (\nabla \mu_t + \mu_t \nabla V) + ( \nabla \rho_\infty \mathcal{\rho}) * \nabla K - (\nabla \rho_\infty \mathcal{\rho}) * K \cdot \nabla V - (\rho_\infty \mathcal{\rho})  * \Delta K + (\rho_\infty \mathcal{\rho}) * \nabla K \cdot \nabla V + g(1 + V)
$$

with $g$ and $T > 0$ fixed.

Then, there exists a constant $C$ depending only on $V$ and $K$ such that

$$
\mathcal{Q}(\rho (t, \cdot)) \leq C \int_t^T \vert\vert g(s, \cdot \vert\vert_{L^\infty(\mathbb{R}^d)} ds e^{C \int_t^T \vert\vert \mu_s \vert\vert_{\text{BL}_V^*}ds})
$$

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
