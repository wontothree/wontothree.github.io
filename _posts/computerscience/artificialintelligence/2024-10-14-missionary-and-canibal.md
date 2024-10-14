---
title: "[Artificial Intelligence] Missionary and Cannibal"
categories:
  - artificialintelligence
---
# Imtroduction

The missionaries and cannibals problem is a well-known toy problem in arificial intelligence, classic river-crossing logic puzzle.

# Rules

- Three missionaries and three cannibals must cross a river using a boat which can carry at most two peoples,
- under the constraint that, for both banks, if there are missionaries present on the bank, they cannot be outnumbered by cannibals (if they were, the cannibals would eat the missionaries)
- The boat cannot cross the river by itself with no people on board.

# State

Size of state space: $_2H_3 \times _2H_3 \times 2 = 32$

상태는 세 가지로 분류할 수 있다.

- 강의 왼쪽에 있는 선교사의 수 (M)
- 강의 왼쪽에 있는 식인종의 수 (C)
- 강의 오른쪽에 있는 배의 수 (B)

각 상태를 [M, C, B]로 표현하자. 그러면 초기 상태와 목표 상태는 다음과 같이 표현할 수 있다.

- initial state: [3, 3, 1]
- goal state: [0, 0, 0]

가능한 32가지의 모든 상태는 다음과 같다.

[3, 3, 1] \
[2, 3, 1] \
[1, 3, 1] \
[0, 3, 1] \
[3, 2, 1] \
[2, 2, 1] \
[1, 2, 1] \
[0, 2, 1] \
[3, 1, 1] \
[2, 1, 1] \
[1, 1, 1] \
[0, 1, 1] \
[3, 0, 1] \
[2, 0, 1] \
[1, 0, 1] \
[0, 0, 1] \
[3, 3, 0] \
[2, 3, 0] \
[1, 3, 0] \
[0, 3, 0] \
[3, 2, 0] \
[2, 2, 0] \
[1, 2, 0] \
[0, 2, 0] \
[3, 1, 0] \
[2, 1, 0] \
[1, 1, 0] \
[0, 1, 0] \
[3, 0, 0] \
[2, 0, 0] \
[1, 0, 0] \
[0, 0, 0]

# Action

행동을 다음과 같이 나눌 수 있다.

- 배에 탑승한 선교사의 수 (M')
- 배에 탑승한 식인종의 수 (C')
- 오른쪽에서 출발한 배의 수 (B')

각 action을 <M', C', B'>와 같이 표현하자.

그러면 constraint를 다음과 같이 표현할 수 있다.

$$
0 < M' + C' \leq 2
$$

가능한 모든 action은 다음과 같다.

<1, 1, 1> \
<1, 0, 1> \
<0, 1, 1> \
<1, 1, 0> \
<1, 0, 0> \
<0, 1, 0>

# Constraint

>When the number of missionaries is smaller than that of the cannibals on a side, the missionaries will be eaten.

# Optimal State Trajectory and Optimal Action Trajectory

[3, 3, 1] \
<1, 1, 1>, [2, 2, 0] \
<1, 0, 0>, [3, 2, 1] \
<0, 2, 1>, [3, 0, 0] \
<2, 0, 0>, [3, 1, 1] \
<2, 0, 1>, [1, 1, 0] \
<1, 1, 0>, [2, 2, 1] \
<2, 0, 1>, [0, 2, 0] \
<0, 1, 0>, [0, 3, 1] \
<0, 2, 1>, [0, 1, 0] \
<0, 1, 0>, [0, 2, 0] \
<0, 2, 1>, [0, 0, 0]
