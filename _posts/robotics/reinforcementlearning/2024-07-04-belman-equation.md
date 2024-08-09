---
title: "[RL] Bellman Equation"
excerpt:
categories: 
  - reinforcementlearning
---
상태 가치 함수를 구하는 것

벨만 방정식 : 마르코프 결정 과정에서 성립하는 가장 중요한 방정식. 많은 강화 학습 알고리즘에 중요한 기초를 제공한다.

## 1. 벨만 방정식 도출

### 1.1 확률과 기댓값

### 1.2 벨만 방정식 도출

$$
\begin{align*}
  v_\pi(s) &= \mathbb{E}_\pi[G_t \vert S_t = s] \\
  &= \mathbb{E}_\pi [R_t + \gamma G_{t+1} \vert S_t = s] \\
  &= \mathbb{E}_\pi [R_t \vert S_t = s] + \gamma \mathbb{E} [G_{t+1} \vert S_t = s]
\end{align*}
$$
