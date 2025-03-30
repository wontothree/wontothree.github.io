---
title: "[Discrete Mathematics] Induction and Recursion"
excerpt: "Discrete Mathematics (Ch05)"
categories:
  - discretemathematics
---
## 1 Mathematical Induction

## 2 Strong Induction and Well-Ordering

### 2.2 Strong Induction

>**STRONG INDUCTION** To prove that $P(n)$ is true for all positive integers $n$, where $P(n)$ is a propositional function, we complete two steps: \
>**BASIS STEP** : We verify that the proposition $P(1)$ is true. \
>**INDUCTIVE STEP** : We show that the conditional statement \
>$[P(1) \wedge P(2) \wedge \dots \wedge P(3)] \rightarrow P(k+1)$ \
>is true for all positive integers $k$.

## 3 Recursive Definition and Structural Induction

We can use recursion to define sequences, functions, and sets.

### 3.2 Recursively Defined Functions

>**BASIS STEP** : Specifiy the value of the function at zero. \
>**RECURSIVE STEP** : Give a rule for finding its value at an integer from its values at smaller integers.

### 3.3 Recursively Defined Sets and Structures

>**[DEFINITION 3]** \
>The set of rooted trees, where a rooted tree consists of a set of vertices containing a distinguished vertex called the root, and edges connecting these vertices, can be defined recursively by these step: \
>**BASIS STEP** : A single vertex $r$ is a rooted tree. \
>**RECURSIVE STEP** : Suppose that $T_1, T_2, \dots T_n$ are disjoint rooted trees with roots $r_1, r_2, \dots r_n$, respectively. Then the graph formed by starting with a root $r$, which is not in any of the rooted trees $T_1, T_2, \dots T_n$, and adding an edge from $r$ to each of the vertices $r_1, r_2, \dots r_n$, is also a rooted tree.

Binary trees are a speical type of rooted trees. We will provide recursive definitions of two types of binary trees - full binary trees and extended binary trees.

>**[DEFINITION 4]** \
>The set of extended binary tree can be defined recursively by these steps: \
>BASIS STEP : The empty set is an extended binary tree. \
>RECURSIVE STEP : If $T_1$ and $T_2$ are disjoint extended binary trees, there is an extended binary tree, denoted by $T_1 \cdot T_2$, consisting of a root $r$ together with edges connecting the root to each of the roots of the left subtree $T_1$ and the right subtree $T_2$ when these trees are nonempty.

>**[DEFINITION 5]** \
>The set of full binary tree. \
>BASIS STEP : There is a full binary tree consisting only of a single vertex $r$. \
>RECURSIVE STEP : If $T_1$ and $T_2$ are disjoint full binary trees, there is a full binary tree, denoted by $T_1 \cdot T_2$, consisting of a root $r$ together with edges connecting the root to each of the roots of the left subtree $T_1$ and the right subtree $T_2$.

### 3.4 Structureal Induction

## 4 Recursive Algorithms

We will see that algorithms that successively reduce a problem to the same problem with smaller input are used to solve a wide variety of problems.

>**[DEFINITION 1]** \
>An algorithm is called recursive if it solves a problem by reducing it to an instance of the same problem with smaller input.

### 4.3 Recursive and Iteration

### 4.4 The Merge Sort

오늘의 결론 : merge sort

## Reference

Kenneth H. Rosen - Discrete Mathematics and Its Applications : Ch05