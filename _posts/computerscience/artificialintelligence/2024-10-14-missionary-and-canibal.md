---
title: "[AI] Missionary and Cannibal"
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
0 \leq C \leq M \;\;\; \text{or} \;\;\; M = 0 \\
0 \leq 3 - C \leq 3 - M \;\;\; \text{or} \;\;\; 3 - M = 0 \\
M, C \in [0, 1, 2, 3], \;\;\;B \in [0, 1]
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

# Python Implementation

```py
class Simulator:
    def __init__(self):
        # State: [number of missionaries on the right bank, number of cannibals on the right bank, boat position]
        self.state = [3, 3, 1]  # Initial state: 3 missionaries, 3 cannibals, boat on the right bank
        self.goal_state = [0, 0, 0]  # Goal state: all on the left bank

    def print_state(self):
        """
        Print the current state
        """
        right_missionaries, right_cannibals, boat = self.state
        left_missionaries = 3 - right_missionaries
        left_cannibals = 3 - right_cannibals

        print("\n")
        print("------------------------------------------------------------")
        print("Right Bank                                         Left Bank")
        print(f"|# of Missionaries|{left_missionaries}|                  |# of Missionaries|{right_missionaries}|")
        print(f"|# of Cannibals   |{left_cannibals}|                  |# of Cannibals   |{right_cannibals}|")
        print(f"|# of Boat        |{1 - boat}|                  |# of Boat        |{boat}|")
        print("------------------------------------------------------------")

    def is_success(self):
        """
        Check if the game has successfully ended
        """
        return self.state == self.goal_state

    def is_failure(self):
        """
        Check if the game has failed
        """
        right_missionaries, right_cannibals = self.state[0], self.state[1]
        left_missionaries = 3 - right_missionaries
        left_cannibals = 3 - right_cannibals

        return (0 < left_missionaries < left_cannibals) or (0 < right_missionaries < right_cannibals)
    
    def is_valid_action(self, action):
        """
        Check if the action is valid
        """
        return 1 <= action[0] + action[1] <= 2
    
    def is_valid_state(self, state):
        """
        Check if the state is valid
        """
        right_missionaries = state[0]
        right_cannibals = state[1]
        left_missionaries = 3 - right_missionaries
        left_cannibals = 3 - right_cannibals

        # Valid state if no more cannibals than missionaries on either bank
        return 0 <= right_missionaries <= 3 and 0 <= right_cannibals <= 3 and \
                0 <= left_missionaries <= 3 and 0 <= left_cannibals <= 3

    def act(self, action):
        """
        Perform the given action and update the state
        """
        right_missionaries, right_cannibals, boat = self.state

        # Determine the new state based on boat position
        if action[2] == 1:  # Boat is on the right bank
            new_state = [right_missionaries - action[0], right_cannibals - action[1], 0]
        elif action[2] == 0:  # Boat is on the left bank
            new_state = [right_missionaries + action[0], right_cannibals + action[1], 1]

        # inspect validity of action
        if self.is_valid_action(action) and self.is_valid_state(new_state):
            # Update the state
            self.state = new_state
        else:
            print("Invalid action or invalid state.")

    def play(self):
        """
        Main loop to execute the game
        """
        print("The game is starting! Move all missionaries and cannibals safely to the other side of the river.")

        while True:
            try:
                self.print_state()

                if self.is_success():
                    print("Game success! All missionaries and cannibals have safely crossed the river.")
                    break
                if self.is_failure():
                    print("Game failure! Cannibals have eaten the missionaries.")
                    break

                missionary = int(input("The number of missionaries to move: "))
                cannibal = int(input("The number of cannibals to move: "))

                if self.state[2] == 1:
                    boat = 1
                    print("The number of boat to move in right bank: 1")
                elif self.state[2] == 0:
                    boat = 0
                    print("The number of boat in left bank: 1")
                
                action = [missionary, cannibal, boat]
                self.act(action)
            
            except ValueError:
                print("Invalid input. Please enter a number.")

if __name__ == '__main__':
    simulator = Simulator()
    simulator.play()
```