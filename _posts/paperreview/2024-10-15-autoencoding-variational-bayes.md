---
title: "[Paper Review] Auto-Encoding Variational Bayes"
categories:
  - paperreview
---
# Abstract

How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets?

We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case.

Contributions

1. a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods.
2. for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (recognition model) to the intractable posterior using the proposed lower bound estimator.

# 1. Introduction

How can we perform efficient approximate inference and learning with directed probabilistic models whose continuous latent variables and/or parameters have intractable posterior distributions?

We show how a reparameterization of the variational lower bound yields a simple differentiable unbiased estimator of the lower bound; this SGVB (Stochastic Gradient Variational Bayes) estimator can be used for efficient approximate posterior inference in almost any model with continuous latent variables and/or parameters, and is straightforward to optimize using standard stochastic gradient ascent techniques.

# 2. Method

## 2.1 Problem Senario

Let us consider some dataset X = {x(i)}Ni=1 consisting of N i.i.d. samples of some continuous or discrete variable x.

We assume that the data are generated by some random process, involving an unobserved continuous random variable z. The process consists of two steps:

1. a value z(i) is generated from some prior distribution pθ∗ (z)
2. a value x(i) is generated from some conditional distribution pθ∗ (x|z).

We assume that the prior pθ∗ (z) and likelihood pθ∗ (x|z) come from parametric families of distributions pθ (z) and pθ (x|z), and that their PDFs are differentiable almost everywhere w.r.t. both θ and z.

Very importantly, we do not make the common simplifying assumptions about the marginal or pos- terior probabilities. Conversely, we are here interested in a general algorithm that even works effi- ciently in the case of:


1. Intractability: the case where the integral of the marginal likelihood pθ(x) = R pθ(z)pθ(x|z)dz is intractable (so we cannot evaluate or differentiate the marginal like- lihood), where the true posterior density pθ(z|x) = pθ(x|z)pθ(z)/pθ(x) is intractable (so the EM algorithm cannot be used), and where the required integrals for any reason- able mean-field VB algorithm are also intractable. These intractabilities are quite common and appear in cases of moderately complicated likelihood functions pθ(x|z), e.g. a neural network with a nonlinear hidden layer.
2. A large dataset: we have so much data that batch optimization is too costly; we would like to make parameter updates using small minibatches or even single datapoints. Sampling- based solutions, e.g. Monte Carlo EM, would in general be too slow, since it involves a typically expensive sampling loop per datapoint.

We are interested in, and propose a solution to, three related problems in the above scenario:

1. Efficient approximate ML or MAP estimation for the parameters θ. The parameters can be of interest themselves, e.g. if we are analyzing some natural process. They also allow us to mimic the hidden random process and generate artificial data that resembles the real data.
2. Efficient approximate posterior inference of the latent variable z given an observed value x for a choice of parameters θ. This is useful for coding or data representation tasks.
3. Efficient approximate marginal inference of the variable x. This allows us to perform all kinds of inference tasks where a prior over x is required. Common applications in computer vision include image denoising, inpainting and super-resolution.

## 2.2 The variational bound

## 2.4 Reparameterization trick