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
  &= \sum_{s'} p(s' \vert s, a) \left[  r(s, a, s') + \gamma \sum_{a'} \pi (a' \vert s') q_\pi (s', a') \right] \\
\end{align*}
$$

마지막 식이 행동 가치 함수를 이용한 벨만 방정식이다.

## 4. 벨만 최적 방정식

벨만 방정식은 어떤 정책 $\pi$에 대해 설립하는 방정식이다.

우리가 궁극적으로 찾으려고 하는 것은 최적 정책이다.

- 최적 정책 : 모든 상태에서 상태 가치 함수가 최대인 정책
- 벨만 최적 방정식 : 최적 정책에 대해 성립하는 방정식

이번 절에서는 벨만 최적 방정식에 대해 알아보겠다.

다음은 어떠한 정책에 대해서 성립하는 벨만 방정식이다.

$$
\begin{align*}
  v_\pi (s) &= \sum_{a, s'} \pi (a \vert s) p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_\pi (s') \right] \\
  &= \sum_{a} \pi (a \vert s) \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_\pi (s') \right] \\
\end{align*}
$$

최적 정책을 $\pi_*(a \vert s)$라고 하면 다음과 같은 벨만 방정식이 성립한다.

$$
v_* (s) = \sum_{a} \pi_* (a \vert s) \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_* (s') \right]
$$

이 식에서 최적 정책의 가치 함수는 $v_*(s)$이다.

벨만 최적 방정식

$$
v_*(s) = \max_a \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_*(s) \right]
$$

이 식과 같이 최댓값은 max 연산자를 사용하여 표현할 수 있다.

### 4.2 행동 가치 함수의 벨만 최적 방정식

행동 가치 함수 (Q 함수)에 대해서도 벨만 최적 방정식을 구할 수 있다.

최적 행동 가치 함수 : 최적 정책에서의 행동 가치 함수

Q 함수의 벨만 방정식

$$
q_\pi (s, a) = \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \sum_{a'} \pi (a' \vert s') q_\pi (s' \vert a') \right]
$$

Q함수에 대한 벨만 최적 방정식

$$
\begin{align*}
  q_* (s, a) &= \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \sum_{a'} \pi_* (a' \vert s') q_* (s' \vert a') \right] \\
  &= \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \max_{a'} q_* (s' \vert a') \right] \\
\end{align*}
$$

MDP에서는 결정적 최적 정책이 하나 이상 존재한다.

결정적 정책 : 특정 상태에서 반드시 특정 행동을 선택하는 정책

최적 정책은 $\mu_*(s)$와 같이 함수로 나타낼 수 있다.

문제에 따라 최적 정책이 여러 개일 수 있지만 그 가치 함수들의 값은 모두 같다.

따라서 최적 정책의 가치 함수는 $v_*(s)$라는 하나의 기호로 나타낼 수 있다.

마찬가지로 Q 함수도 $q_*(s, a)$도 하나만 존재한다.

## 5. 벨만 최적 방정식의 예

두 칸짜리 그리드 월드

보상은 에이전트가 L1에서 L2로 이동할 때 +1, 벽에 부딪히면 -1이다.

사과는 몇 번이고 다시 생성된다.

### 5.1 벨만 최적 방정식 적용

두 칸짜리 그리드 월드 문제에 벨만 최적 방정식을 적용할 것이다.

벨만 최적 방정식

$$
v_*(s) = \max_a \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_*(s) \right]
$$

상태 전이가 결정적이라고 가정하자.

- $s' = f(s, a)$이면 $p(s' \vert s, a) = 1$
- $s' \neq f(s, a)$이면 $p(s' \vert s, a) = 0$

$s' = f(s, a)$일 때,

$$
v_*(s) = \max_a \left[ r(s, a, s') + \gamma v_*(s') \right]
$$

이제 할인율이 0.9일 때 두 칸짜리 그리드 월드에 벨만 최적 방정식을 적용하자.

$$
\begin{align*}
  v_*(L1) &= \max \left[ -1 + 0.9 v_*(L1), 1 + 0.9 v_*(L2) \right] \\
  v_*(L2) &= \max \left[ 0.9 v_*(L1), -1 + 0.9 v_*(L2) \right] \\
\end{align*}
$$

벨만 방정식(연립 방정식)의 해는 다음과 같다.

$$
\begin{cases}
  v_*(L1) = 5.26 \\
  v_*(L2) = 4.73
\end{cases}
$$

### 5.2 최적 정책 구하기

우리가 궁극적으로 알고 싶은 것은 최적 정책이다.

최적 행동 가치 함수 $q_*(s, )a$를 알고 있다면, 상태 s에서의 최적 행동은 다음과 같이 구할 수 있다.

$$
\mu_*(s) = \underset{a}{\operatorname{argmax}} \; q_* (s, a)
$$

argmax는 최댓값을 만들어내는 인수를 반환한다.

최적 상태 가치 함수 $v_*(s)$를 알고 있다면 최적 행동을 다음과 같이 얻을 수 있다.

$$
\mu_*(s) = \underset{a}{\operatorname{argmax}} \; p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_*(s') \right]
$$

두 식은 탐욕 정책이다.

탐욕 정책은 국소적인 후보 중에서 최선의 행동을 찾는다. 이번처럼 벨만 최적 방정식에서는 현재 상태 s와 다음 상태 s'만 관련이 있으며, 단순히 다음 상태만을 고려하여 가치가 가장 큰 행동을 선택한다.

마지막으로 얻은 식을 이용하여 두 칸짜리 그리드 월드 문제의 최적 정책을 찾아보자.

취할 수 있는 행동은 left와 right뿐이다.

Left를 선택하면 상태 L1로 전이하여 보상 -1을 얻는다.

할인율은 0.9

$$
\sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \max_{a'} q_* (s' \vert a') \right] = -1 + 0.9 v_*(L1) = -1 + 0.9 * 5.26 = 3.734
$$

Right를 선택하면 상태 L2로 전이하여 보상 1을 얻는다.

$$
1 + 0.9 v_*(L2) = 1 + 0.9 * 4.73 = 5.257
$$

따라서 값이 더 큰 행동은 Right이다.

상태 L1에서의 최적의 행동은 Right라는 뜻이다.

같은 방식으로 상태 L2에서의 최적 행동은 Left이다.

따라서 L1에서는 오른쪽으로, L2에서는 왼쪽으로 이동하는 행동이 최적 정책이다.

최적 상태 가치 함수를 알면 최적 정책을 구할 수 있다.

## 6. 정리

벨만 방정식을 도출하고 단순한 문제를 벨만 방정식을 이용하여 풀었다.

벨만 방정식을 이용하여 연립 방정식으 ㄹ얻고 이를 통해 가치 함수를 구할 수 있었다.

실제 문제에서는 계산량이 너무 많아져서 연립 방정식을 이용하는 방법은 적용할 수 없다.

하지만 벨만 방정식은 많은 강화 학습 알고리즘에 중요한 기초를 제공한다.

강화 학습의 궁극적인 목표는 최적 정책 찾기이다.

이번 장에서는 벨만 최적 방정식에 대해서 배웠다.

벨만 최적 방정식은 최적 정책에서 성립하는 특별한 벨만 방정식이다.

최적 정책의 가치 함수를 구할 수 있다면 쉽게 최적 정책을 찾을 수 있다.

벨만 방정식

$$
\begin{align*}
  v_\pi (s) &= \sum_{a, s'} \pi (a \vert s) p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_\pi (s') \right] \\
  q_\pi (s, a) &= \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \sum_{a'} \pi (a' \vert s') q_\pi (s', a') \right]
\end{align*}
$$

벨만 최적 방정식

$$
\begin{align*}
  v_* (s) &= \max_a \; \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_* (s') \right] \\
  q_* (s, a) &= \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma \max_{a'} \; q_* (s', a') \right]
\end{align*}
$$

최적 정책

$$
\begin{align*}
  \mu_*(s) &= \underset{a}{\operatorname{argmax}} \; q_* (s, a) \\
  &=  \underset{a}{\operatorname{argmax}} \; \sum_{s'} p(s' \vert s, a) \left[ r(s, a, s') + \gamma v_*(s') \right]
\end{align*}
$$

## Reference

Deep Learning from Scratch 4
