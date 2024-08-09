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

## 2. 벨만 방정식의 예

벨만 방정식을 이요하면 상태 가치 함수를 구할 수 있다.

### 2.1 두 칸짜리 그리드 월드

'두 칸짜리 그리드 월드' 문제를 다룬다.

Agent는 50%의 확률로 각각 오른쪽 또는 왼쪽으로 이동한다고 가정한다.

$v_\pi(L1)$ : 상태 $L1$에서 정책 $\pi$에 따라 얻을 수 있는 기대 수익. 이 기대 수익은 앞으로 무한히 지속되는 보상의 총합

무한히 분기하는 계산을 벨만 방정식을 이용하여 구할 수 있다.

$$
\begin{align*}
  v_\pi(s) &= \sum_{a, s'} \pi(a \vert s) p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_\pi(s') \right] \\
  &= \sum_{a} \pi(a \vert s) \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_\pi(s') \right] \\
\end{align*}
$$

이번 문제에서 상태는 결정적으로 전이되기 때문에 상태 전이는 확률 $p(s' \vert s, a$가 아닌 함수 $f(s, a)$에 의해 결정된다.

- $s' = f(s, a)$이면 $p(s' \vert s, a) = 1$
- $s' \neq f(s, a)$이면 $p(s' \vert s, a) = 0$

$s' = f(s, a)$이면,

$$
v_\pi(s) = \sum_{a} \pi(a \vert s) \left[ r(s, a, s') + \gamma v_\pi(s') \right]
$$

이 식에 이번 문제를 대입해보자.

상태 L1에서 벨만 방정식

$$
v(L1) = 0.5 \left[ -1 + 0.9 v_\pi (L1) \right] + 0.5 \left[ 1 + 0.9 v_\pi (L2) \right]
$$

다음과 같이 정리할 수도 있다.

$$
-0.55 v_\pi (L1) + 0.45 v_\pi (L2) = 0
$$

상태 L2에서 벨만 방정식

$$
v_\pi (L2) = 0.5 \left[ 0 + 0.9 v_\pi(L1) \right] + 0.5 \left[ -1 + 0.9 v_\pi (L2) \right]
\\
0.45 v_\pi(L1) + - 0.55 v_\pi (L2) = 0.5
$$

이렇게 모든 상태에서 벨만 방정식을 구했다.

이제 알고싶은 변수는 $v_\pi(L1)$과 $v_\pi(L2)$뿐이다.

주어진 두 방정식을 연립하여 해를 구하자.

$$
\begin{cases}
  v_\pi (L1) = -2.25 \\
  v_\pi (L2) = -2.75 \\
\end{cases}
$$

이는 무작위 정책의 상태 가치 함수이다.

상태 L1에서 무작위로 행동하면 앞으로 -2.25의 수익을 기대할 수 있다는 뜻이다.

### 2.2 벨만 방정식의 의의

벨만 방정식을 통해 무한히 계속되는 계산을 유한한 연립방정식으로 변환할 수 있었다.

행동이 무작위로 이루어지도라도 벨만 방정식을 이용하면 상태 가치 함수를 구할 수 있다.

상태 가치 함수는 기대 수익이며 '무한히 이어지는' 보상의 합으로 정의된다. 벨만 방정식에는 '무한'이라는 개념이 없다. 벨만 방정식 덕분에 무한의 굴레에서 빠져나올 수 있다.

연립방정식을 푸는 알고리즘을 이용하면 자동으로 상태 가치 함수를 구할 수 있다.

## 3. 행동 가치 함수 (Q 함수)와 벨만 방정식

행동 가치 함수를 도입하고, 행동 가치 함수(Q 함수)를 이용한 벨만 방정식을 도출하겠다.

### 3.1 행동 가치 함수

상태 가치 함수 : 상태가 $s$일 때, 정책 $\pi$

$$
v_\pi(s) = \mathbb{E}_\pi \left[ G_t \vert S_t = s \right]
$$

행동 가치 함수 : 시간 t일 때 상태 s에서 행동 a를 취하고, 시간 t + 1부터는 정책 $\pi$에 따라 행동을 결정할 때 기대 수익 $q_\pi (s, a)$

$$
q_\pi(s, a) = \mathbb{E}_\pi \left[ G_t \vert S_t = s, A_t = a \right]
$$

상태 가치 함수에서의 행동 a는 정책 $\pi$에 따라 선택되지만 $Q$ 함수에서 행동 $a$는 자유롭게 선택할 수 있다.

만약 Q 함수의 행동 a를 정책 $\pi$에 따라 선택하도록 설계하면 Q 함수와 상태 가치 함수는 완전히 같아진다.

예를 들어 상태 s에서 취할 수 있는 행동 후보가 $\left[ a_1, a_2, a_3 \right]$ 세 가지 있다고 가정하고 이때 정책 $\pi$에 따라 행동한다고 해보자.

- $\pi (a_1 \vert s)$의 확률로 행동 $a_1$을 선택하는 경우 Q 함수는 $q_\pi (s, a_1)$
- $\pi (a_2 \vert s)$의 확률로 행동 $a_2$를 선택하는 경우 Q 함수는 $q_\pi (s, a_2)$
- $\pi (a_3 \vert s)$의 확률로 행동 $a_3$를 선택하는 경우 Q 함수는 $q_\pi (s, a_3)$

이때 기대 수익은 Q 함수의 가중 합이다.

$$
\sum_{a = \left[ a_1, a_2, a_3 \right]} \pi (a \vert s) q_\pi (s, a)
= \pi (a_1 \vert s) q_\pi (s, a_1) + \pi (a_2 \vert s) q_\pi (s, a_2) + \pi (a_3 \vert s) q_\pi (s, a_3)
$$

이 식은 상태 가치 함수와 동일한 조건에서의 기대 수익이다.

### 3.2 행동 가치 함수를 이용한 벨만 방정식

행동 가치 함수(Q 함수)를 이용한 벨만 방정식을 도출하겠다.

상태 s와 보상 a는 정해져있다.

다음 상태 $s'$로의 전이 확률은 $p(s' \vert s, a)$이고 보상은 $r(s, a, s')$ 함수에 의해 주어진다.

$$
\begin{align*}
  q_\pi (s, a) &= \mathbb{E}_\pi \left[ G_t \vert S_t = s, A_t = a \right] \\
  &= \mathbb{E}_\pi \left[ R_t + \gamma G_{t+1} \vert S_t = s, A_t = a \right] \\
  &= \mathbb{E}_\pi \left[ R_t \vert S_t = s, A_t = a \right] + \gamma \mathbb{E}_\pi \left[G_{t+1} \vert S_t = s, A_t = a \right] \\
  &= \sum_{s'} p(s' \vert s, a) r(s, a, s') + \gamma \sum_{s'} p(s' \vert s, a) \mathbb{E}_\pi \left[ G_{t+1} \vert S_{t+1} = s' \right] \\
  &= \sum_{s'} p(s' \vert s, a) \left[  r(s, a, s') + \gamma \mathbb{E}_\pi \left[ G_{t+1} \vert S_{t+1} = s' \right] \right] \\
  &= \sum_{s'} p(s' \vert s, a) \left[  r(s, a, s') + \gamma v_\pi (s') \right] \\
\end{align*}
$$

## 4. 벨만 최적 방정식

## 5. 벨만 최적 방정식의 예

## 6. 정리
