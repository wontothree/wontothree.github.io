---
title: "[Artificial Intelligence] Missionary and Cannibal"
categories:
  - artificialintelligence
---
# Introduction

The missionaries and cannibals problem is a well-known puzzle in artificial intelligence and a classic example of a river-crossing logic puzzle. The goal is to transport three missionaries and three cannibals across a river under specific constraints. This problem demonstrates the use of state space search in AI.

# Rules

1. Three missionaries and three cannibals must cross a river using a boat that can carry at most two people.
2. On either side of the river, missionaries cannot be outnumbered by cannibals; otherwise, the cannibals will eat the missionaries.
3. The boat cannot travel across the river without at least one person on board.

# State

The state is represented as a triplet [M,C,B], where:

- M: number of missionaries on the left bank
- C: number of cannibals on the left back
- B: location of boat (1 if on the left bank, 0 if on the right bank)

그러면 초기 상태와 목표 상태는 다음과 같이 표현할 수 있다.

- initial state: [3, 3, 1] (All people and the boat are on the left bank)
- goal state: [0, 0, 0] (Everyone has crossed to the right bank)

## Possible States

[3, 3, 1], [2, 3, 1], [1, 3, 1], [0, 3, 1], \
[3, 2, 1], [2, 2, 1], [1, 2, 1], [0, 2, 1], \
[3, 1, 1], [2, 1, 1], [1, 1, 1], [0, 1, 1], \
[3, 0, 1], [2, 0, 1], [1, 0, 1], [0, 0, 1], \
[3, 3, 0], [2, 3, 0], [1, 3, 0], [0, 3, 0], \
[3, 2, 0], [2, 2, 0], [1, 2, 0], [0, 2, 0], \
[3, 1, 0], [2, 1, 0], [1, 1, 0], [0, 1, 0], \
[3, 0, 0], [2, 0, 0], [1, 0, 0], [0, 0, 0]

# Action

Action describe how missionaries and cannibals move across the river. Each action can be represented as a triplet [M', C', B'], where

- M': number of missionaries on the boat
- C': number of cannibals on the boat
- B': direction of the boar (1 for left-to-right, 0 for right-to-left)

## Possible Actions

|Missionaries on Boat (M')|Cannibals on Boat (C')|Boat Direction (B')|
|:---:|:---:|:---:|
|1|0|1|
|0|1|1|
|1|1|1|
|2|0|1|
|0|2|1|
|1|0|0|
|0|1|0|
|1|1|0|
|2|0|0|
|0|2|0|

각 action에 대한 비용은 1로 동일하다.

# Constraint

$$
M, C, B, M', C', B' \in \mathbb{N}
$$

## Constraint on Action

$$
1 \leq M' + C' \leq 2
$$

## Constraint on State

$$
M \leq C \;\;\;\text{if} \;\; M > 0 \\
3 - M \leq 3 - C \;\;\; \text{if} \;\;\; 3 - M > 0 \\
0 \leq M \leq 3 \\
0 \leq C \leq 3 \\
B = 0 \;\;\; \text{or} \;\;\; B = 1
$$

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

# Cost

모든 action에 동일한 cost 1을 부여한다.
