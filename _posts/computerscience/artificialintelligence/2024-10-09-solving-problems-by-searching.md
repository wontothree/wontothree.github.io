---
title: "[Artificial Intelligence] Solving Problems by Searching"
categories:
  - artificialintelligence
---
We will cover several shearch algorithms.

We consider only the simplest environments: episodic, single agent, fully observaable, deterministic, static, discrete, and known.

- Informed algorithms: the agent can estimate how far it is from the goal
- Uninformed algorithm: no such estimate is available

# 1. Problem-Solving Agents

Search Problem Formulation

- *State space*: a set of possible states that the environment can be in
- *Initial state*: a state that the agent starts in
- *Goal state*: Given a state $s$, ACTIONS($s$) returns a finite set of actions that cab ev excuted in $s$
- *Transition model*: describing what each action does. RESULT(s, a) returns the state that results from doing action $a$ in the state $s$.
- *Action cost function*: ACTION-COST($s, a, s'$) gives the numeric cost of applying action a in state s to reach state $s'$.
- *Path*: a sequence of actions
- *Solution*: a path from the initial state to a goal state
- *Optimal Solution*: the lowest path among all solutions

The state space can be represented as a graph in which the verices are states and the directed edges between  them are actions.

- *Model* : a abstract mathematical description
- *Abstraction* : the process of removing detail from a representation

The abstraction is useful if carrying out each of the actions in the solution is easier than the original problem.

The choice of a good abstraction thus involves removing as much detail as possible while retaining validity and ensuring that the abstract actions are easy to carry out.

# 2. Example Problems

# 3. Search Algorithms

# 4. Uninformed Search Strategies

# 5. Informed (Heuristic) Search Strategies

# 6. Heuristic Functions

# Reference

Artificial Intelligence: A Modern Approach Fourth Edition
