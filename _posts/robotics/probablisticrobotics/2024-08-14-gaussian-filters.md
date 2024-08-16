---
title: "[Probablistic Robotics] Gaussian Filters"
categories:
  - probablisticrobotics
---
# 1. Introduction

- Kalman filter : 선형 동역학과 측정 함수가 있는 제한된 문제에 대해 모멘트 표현을 사용하여 베이즈 필터를 구현한다.
- Extened Kalman filter : 비선형 문제로 칼만 필터를 확장한 것
- Information filter : 가우시안의 정준 표현을 사용하는 칼만 필터의 쌍대

# 2. The Kalman Filter

## Linear Gaussian Systems

베이즈 필터를 구현하는 가장 잘 연구된 기술은 칼만 필터이다.

칼만 필터는 모멘트 표현을 사용하여 신념을 표현한다.

시간 t에서 신념은 평균 $\mu_t$과 공분산 $\sum_t$으로 표현한다.

베이즈 필터의 마르코프 가정 외에 다음의 세 가지 조건이 충족된다면, 사후 확률은 가우시안 분포를 따른다.

1. The next state probability $p(x_t \vert u_t, x_{t-1}$ must be a linear function in its arguments with added Gaussian noise.

$$
x_t = A_t x_{t-1} + B_t u_t + \epsilon_t
$$

2. The measurement probability $p(z_t \vert x_t)$ must also be linear in it arguments, with added Gaussian noise:

$$
Z_t = C_t x_t + \delta_t
$$

3. The initial belief *bel($x_0$)* must be normal distributed 

$$
bel(x_0) = p(x_0) = det(2\pi \Sigma_0)^{-\dfrac{1}{2}} exp \left[ -\dfrac{1}{2} (x_0 - \mu_0)^T \Sigma_0^{-1} (x_0 - \mu_0) \right]
$$

## 2.2 The Kalman Filter Algorithm

칼만 필터는 시간 $t$에서 신념 *bel($x_t$)*을 평균 $\mu_t$과 공분산 $\sum_t$으로 표현한다.

$K_t$ : 칼만 이득

## 2.3 Illustration

## 2.4 Mathematical Derivation of the KF

Part 1. Prediction

Part 2. Measurement Update

# 3. The Extended Kalman Filter

## 3.1 Why Linearize?

$$
\begin{align*}
  x_t &= g(u_t, x_{t-1}) + \epsilon_t \\
  \\
  z_t &= h(x_t) + \delta_t
\end{align*}
$$

Unfortunately, with arbitrary functions $g$ and $h$, the belief is no longer a Gaussian.

In fact performing the belief update exactly is usually impossible for nonlinear functions $g$ and $h$, and the Bayes filter does not possess a closed-form solution.

## 3.2 Linearization Via Taylor Expansion

The key advantage of the linearization lies in its efficiency.

There exist many technigues for linearizing nonlinear functions.

EKFs utilize a method called Taylor expansion

## 3.3 The EKF Algorithm

## 3.4 Mathematical Derivation of the EKF

## 3.5 Practical Considerations

# 4. The Unscented Kalman Filter

# 5. The Information Filter

## Question

- 사후 확률이 뭘까?
