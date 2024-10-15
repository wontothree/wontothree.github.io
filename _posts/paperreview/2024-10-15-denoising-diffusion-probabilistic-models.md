---
title: "[Paper Review] Denoising Diffusion Probabilistic Models (NeurIPS 2020)"
categories:
  - paperreview
---
# Abstract

- We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.
- Our best results are obtained by training on a weighted variational bound designed according to a novel connection between diffusion probabilistic models and denoising score matching with Langevin dynamics, and our models naturally admit a progressive lossy decompression scheme that can be interpreted as a generalization of autoregressive decoding.

Performance

- On the unconditional CIFAR10 dataset, an Inception score of 9.46(state-of-the-art FID score of 3.17)
- On 256x256 LSUN, sample quality similar to ProgressiveGAN
- https://github.com/hojonathanho/diffusion.

# Introduction

This paper persent progress in diffusion probabilistic models - Deep Unsupervised Learning using Nonequilibrium Thermodynamics (ICML 2015)

- Diffusion probilistic model: parameterized Markov chain trained using variational inference to produce samples matching the data after finite time

Transitions of this chain are learned to reverse a diffusion process

- Reverse diffusion process: Markov chain that gradually adds noise to the data in the opposite direction of sampling until signal is destroyed

# Background