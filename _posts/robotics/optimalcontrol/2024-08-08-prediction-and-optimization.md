---
title: "[MPC] Prediction and Optimization"
categories:
  - optimalcontrol
---
## 1. Predictive equations

This section derives an expression for the predicted state trajectory $x(k)$ in terms of the predicted input trajectory $u(k)$.

This expression allows the general quadratic cost:

<div class="latex-container">
$$
J(k) = \sum^{N-1}_{i=0} \left[ x^T(k + i \vert k) Q x(k + i \vert k) u^T(k + i \vert k) R u(k + i \vert k) \right] + x^T(k + N \vert k) \bar{Q}x x(k + N \vert k)
$$
</div>

### 1.1 LTV prediction models

## 2. Unconstrainted optimization

### 2.1 Horizon length and performance

## 3. Infinite horizon cost

### 3.1 The relationship between unconstrainted MPC and LQ optimal control

## 4. Incorporating constraints

## 5. Quadratic Programming

### 5.1 Active set algorithms

### 5.2 Interior point QP algorithms
