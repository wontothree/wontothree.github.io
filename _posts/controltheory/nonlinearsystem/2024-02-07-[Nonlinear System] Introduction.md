---
title: "[Nonlinear System] Introduction"
excerpt: "Jean-Jacques E.Slotine Weiping Li - Applied Nonlinear Control : Ch01"
categories:
  - nonlinearsystem
---
## 1. Why Nonlinear Control?

## 2. Nonlinear System Behavior

- 비선형 시스템에서는 equilibrium point에 대해 stability를 이야기한다.
- 선형 시스템에서 equilibrium point는 $x = 0$뿐이지만 비선형 시스템에서는 여러 개일 수 있다.

Q. $\dot{x} = -x + x^2$이 시스템은 stable한가?

$\dot{x} = Ax$ : Asymtotically stable

- 선형 시스템은 초기값이 어디에 있든 원점으로 수렴한다.
- 선형 시스템의 stability를 판단하는 조건은 A의 eigenvalue...

<img src="../../../img/post/Nonlinear System/nls1.png">

- 선형 시스템은 특정 system에 대해 stability를 논하고, 비선형 시스템에서는 equilibrium을 기준으로 stability를 논한다.
- 이를 잘 보여주는 사례가 inverted pendulum이다. 막대가 바닥을 향하고 있을 때 stable하고, 막대가 하늘을 향하고 있을 때 equilibrium이지만 unstable하다.
- equilibrium point의 stability는 주변을 기준으로 판단한다. 주변에서 날 떠나는 친구가 한 명이라도 있으면 unstable하다.
- 선형 시스템에서는 A가 특정 조건을 만족한다면 x = 0으로 수렴하는 것이 보장되었다.
- 선형 시스템에서는 제어의 목표를 $x = 0$로 설정하고, 비선형 시스템에서는 제어의 목표를 equilibrium point로 설정한다.
- 모터를 이용해 $\theta = -\dfrac{3}{4}\pi$로 이동시키는 것이 목적이라면 그 지점을 equilibrium point가 되도록 system을 수식적으로 설계해야 한다.

## 3. An Overview of the Book

## 4. Notes and Reference
