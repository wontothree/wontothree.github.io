---
title: "[Digital Control] Ch02 Discrete-Time Systems and the z-Transform"
excerpt: Charles L. Philips - Digital Control System
categories:
  - digitalcontrol
toc: true
toc_icon: star
share: false
use_math: true
---
## 1 Introduction

- 이산 시간 시스템
- z-transform

|연속 시간|이산 시간|
|---|---|
|미분방정식|차분방정식|
|Laplace Transform|Z-Transform|

## 2 Discrete-Time Systems

n차 선형 차분 방정식의 일반적인 형태 - 디지털 필터

$$
x(k) =b_ne(k) + b_{n-1}e(k-1) + \dots + b_0e(k-n) \\
-a_{n-1}x(k-1) - \dots - a_0x(k-n)
$$

플랜드가 선형이고 시불변이면, 전체 시스템은 차분 방정식에 의해 모델링될 수 있다.

디지털 보상기 설계

1. 아날로그 보상기를 설계하고 근사화 과정을 통해 디지털 보상기로 변환한다.
2. 디지털 보상기를 설계한다.

## 3 Transform Methods

**DEFINTION**

$$
E(z) = Z{e(k)} = e(0) + e(1)z^{-1} + e(2)z^{-2} = \sum_{k=0}^{\infty}e(k)z^{-k}
$$

z-transform은 임의의 수열에 대해 정의되며, 선형 시불변 차분 방정식에 의해 타나내지는 임의의 형태의 시스템 해석에 사용할 수 있다.

## 4 Properties of the z-Transform

- 가산과 감산 : 수열의 합의 z 변환은 수열의 z 변환의 합과 같다.
- 상수배 : 상수가 곱해진 수열의 z 변환은 수열의 z 변환에 상수를 곱한 것과 같다.

## 5 Finding z-Transform

## 6 Solution of Difference Equations

## 7 The Inverse z-Transform

## 8 Simulation Diagrams and Flow Graphs

## 9 State Variables

## 10 Other State-Variable Formulations

## 11 Transfer Functions

## 12 Solutions of the State Equations

## 13 Linear Time-varying Systems
