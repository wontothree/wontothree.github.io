---
title: "[Digital Control] Ch03 Sampling and Reconstruction"
excerpt: Charles L. Philips - Digital Control System
categories:
  - DigitalControl
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
\bar{E} = e(0)\left[\dfrac{1}{s} - \dfrac{\epsilon^{-Ts}}{s}\right]
+ e(T)\left[\dfrac{\epsilon^{-Ts}}{s} - \dfrac{\epsilon^{-2Ts}}{s}\right]
+ e(2T)\left[\dfrac{\epsilon^{-2Ts}}{s} - \dfrac{\epsilon^{-3Ts}}{s}\right] \\
= \left[\dfrac{1-\epsilon^{Ts}}{s} \right]\left[e(0) + e(T)\epsilon^{-Ts} + e(2T)\epsilon^{-2Ts}  + \dots  \right]\\
= \left[\sum_{n=0}^{\infty}e(nT)\epsilon^{-nTs}\right] \left[\dfrac{1-\epsilon^{Ts}}{s} \right]
$$

## 3 The Ideal Sampler

## 4 Evaluation of E*(S)

## 5 Results from the Fourier Transform

## 6 Properties of E*(S)

## 7 Data Reconstruction
