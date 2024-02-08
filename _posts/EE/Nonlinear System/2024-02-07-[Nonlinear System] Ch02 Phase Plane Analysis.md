---
title: "[Nonlinear System] Ch02 Phase Plane Analysis"
excerpt: Jean-Jacques E.Slotine Weiping Li - Applied Nonlinear Control
categories:
  - NLS
toc: true
use_math: true
---
## 1. Concepts of Phase Plane Analysis

## 2. Constructing Phase Portraits

- Analytical method
- The mthod of isoclines
- The delta method
- Lienard's method
- Pell's method 

### Analytical method

주어진 시스템에 대한 수식이 다음과 같이 표현될 수 있다면, 여기서는 analytic 하게 서술된 것이라고 본다.

$$
g(x_1, x_2, c) = 0
$$

**Example 2.4 : Mass-spring system**

Since $\ddot{x} = \dfrac{d\dot{x}}{dt} = \dfrac{d\dot{x}}{dx} \cdot \dfrac{dx}{dt} = \dot{x}\dfrac{d\dot{x}}{dx}$,

$$
0 = \ddot{x} + x = \dot{x}\dfrac{d\dot{x}}{dx} + x
\\
\dot{x} d\dot{x} + x dx = 0
$$

Since $x = x_0\sin t, \dot{x} = x_0\cos t$,

$$
\dfrac{1}{2}\dot{x}^2 + \dfrac{1}{2}x^2 = C
\\
\dot{x}^2 + x^2 = C
\\
\dot{x}^2 + x^2 = x_0^2
\\
x_1^2 + x_2^2 = x_0^2
$$

여기서 $x_1$과 $x_2$를 독립적인 변수로 취급한다. 위 예제에서 mass-spring system이 analytic하게 서술되는 것을 확인할 수 있다.

**Example 2.5 : A satellite control system**

### The method of isoclines

## 3. Determinging Time from Phase Portraits

## 4. Phase Plane Anaysis of Linear Systems

## 5. Phase Plane Anaysis of Nonlinear Systems

## 6. Existence of Limit Cycles
