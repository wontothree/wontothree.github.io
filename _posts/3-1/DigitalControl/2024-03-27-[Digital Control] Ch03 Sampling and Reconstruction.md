---
title: "[Digital Control] Ch03 Sampling and Reconstruction"
excerpt: Charles L. Philips - Digital Control System
categories:
  - digitalcontrol
toc: true
toc_icon: star
share: false
use_math: true
---
## 1 Introduction

To provide a basis for thoroughly understanding the operation of digital control systems, it is necessary to determine the effects of continuous-time signal.

## 2 Sampled-Data Control Systems

<img src="../../..//img/post/digitalcontrol/zero-order-hold.png">

$$
\bar{e}(t) = e(0)[u(t) - u(t - T)] + e(T)[u(t-T)-u(t-2T)] + e(2T)[u(t-2T)-u(t-3T)] + \dots
$$

Laplace transform

$$
\bar{E}(s) = e(0)\left[\dfrac{1}{s} - \dfrac{\epsilon^{-Ts}}{s}\right]
+ e(T)\left[\dfrac{\epsilon^{-Ts}}{s} - \dfrac{\epsilon^{-2Ts}}{s}\right]
+ e(2T)\left[\dfrac{\epsilon^{-2Ts}}{s} - \dfrac{\epsilon^{-3Ts}}{s}\right] \\
= \left[\dfrac{1-\epsilon^{Ts}}{s} \right]\left[e(0) + e(T)\epsilon^{-Ts} + e(2T)\epsilon^{-2Ts}  + \dots  \right]\\
= \left[\sum_{n=0}^{\infty}e(nT)\epsilon^{-nTs}\right] \left[\dfrac{1-\epsilon^{Ts}}{s} \right]
$$

- First factor : a function of the input $e(t)$ and the sampling period $T$
- Second factor :  a transfer function independent of $e(t)$ (zero-order hold)

The function $E^*(S)$, called the starred transform, is defined as

$$
E^*(S) := \sum_{n=0}^{\infty}e(nT)\epsilon^{-nTs}
$$

$E^*(S)$ does not appear in the physical system but appear as a result factoring.

## 3 The Ideal Sampler

Inverse laplace transform

$$
e^*(t) = \mathcal{L}^{-1}[E^*(s)]
= e(0)\delta(t) + e(T)\delta(t-T) + e(2T)\delta(t-2T) + \dots
$$

$e^*(t)$ is not a physical signal

$$
\delta_T(t) := \sum_{n=0}^{\infty}\delta(t-nT)
$$

Then

$$
e^*(t) = e(t)\delta_T(t)
$$

## 4 Evaluation of E*(S)

## 5 Results from the Fourier Transform

## 6 Properties of E*(S)

## 7 Data Reconstruction
