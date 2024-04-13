---
title: "[Digital Control] Open-loop Discrete-time Systems"
excerpt: "Charles L. Philips - Digital Control System : Ch04"
categories:
  - digitalcontrol
toc: true
toc_icon: star
share: false
use_math: true
---
## 1 Introduction

앞서 배운 이산 시간 시스템, z-transform, sampling, data reconstruction에 대한 내용들을 open-loop discrete-time system을 분석하는 데 활용할 것이다. Since ideal sampler don't have transfer function, these analysis technique of discrete-time system is requited.

## 2 The Relationship Between $E(Z)$ and $E^*(S)$

starred transform $E^*(s)$ of $e(t)$

$$
E^*(s) = e(0) + e(T)\epsilon^{-Ts} + e(2T)\epsilon^{-2Ts} + \dots
$$

z-transform $E(z)$ of $e^d(k)$

$$
E^d(z) = e^d(0) + z^{-1}e^d(1) + z^{-2}e^d(2) + \dots
$$

Therefore

$$
E(z) = E^*(s) |_{\epsilon^{sT}=z}
$$

이것은 z-transform이 laplace transform의 특별한 경우라는 것을 의미한다.

우리는 이산 시간 시스템을 분석할 때 앞으로 star-transform 대신 z-transform을 이용할 것이다.

star-transform이 필요하다면, 먼저 $E(z)$를 구하고 inverse-transform을 이용하여 $E^*(s)$를 구할 것이다.

$$
E(z) = \sum_{\text{at poles of} \;E(\lambda)} \left [\text{residues of} \;E(\lambda)\dfrac{1}{1-z^{-1}\epsilon^{T\lambda}}\right]
$$

이 표현은 z-transform table을 만드는 데 유용하다. $z = \epsilon^{Ts}$로 치환하면 z-transform table이 된다.

$E(z)$와 $E^*(s)$의 관계를 이용해 2장에서 다루었던 z-transform에 관한 정리들을 star-transform에도 적용할 수 있다.

## 3 The Pulse Transfer Function

## 4 Open-Loop Systems Contraining Digital Filters

## 5 The Modified z-Transform

## 6 Systems with Time Delays

## 7 Nonsynchronous Sampling

## 8 State-Variable Models

## 9 Review of Continuous-Time State Variables

## 10 Discrete-Time State Equations

## 11 Practical Calculations
