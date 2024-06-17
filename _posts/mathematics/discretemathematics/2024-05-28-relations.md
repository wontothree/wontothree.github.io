---
title: "[Discrete Mathematics] Relations"
categories:
  - discretemathematics
---
## 1. Relations and Their Properties

### 1.2 Functions as Relations

### 1.3 Relations on a Set

>**[Definition 2]** \
>A relation on a set $A$ is a relation from $A$ to A.

### 1.4 Properties of Relations

>**[Defintion 3]** \
>A relation $R$ on a set $A$ is caleed **reflexive** if $(a, a) \in R$ for every element $a \in \mathbb{A}$.

>**[Definition 4]** \
>A relation $R$ on a set $A$ is called **symmetric** if $(b, a) \in R$ whenever $(a, b) \in R$, for all $a, b \in A$.
>
>A relation $R$ on  a set $A$ such that for all $a, b \in A$, if $(a, b) \in R$ and $(b, a) \in R$, then $a = b$ is called **antisymmetric**.

>**[Definition 5]** \
>A relation $R$ on a set $A$ is called **transitive** if whenever $(a, b) \in \mathbb{R}$ and $(b, c) \in \mathbb{R}$, then $(a, c) \in \mathbb{R}$, for all $a, b, c \in A$.

transisitve는 찾기 어렵다.

reflexive, symmetric, transitive 정의 뭍는 문제 출제될 거 같음 (꼭 기억하라 함)

### 1.5 Combining Relations

>**[Defintion 6]**

Composition Theorem

>**[Theorem 1]** \
>Then relation $\mathbb{R}$ on a set $A$ is transitive if and only if $R^n \in R$ for $n = 1, 2, 3 \dots$.

## 2. n-ary Relations and Their Applications

### 2.3 Databases and Relations

### 2.4 Operations on n-ary Relations

### 2.5 SQL

### 2.6 Association Rules from Data Mining

## 3. Representing Relatinos

### 3.2 Representing Relations Using Matrices

### 3.3 Representing Relations Using Digraphs

## 4. Closures of Relations

### 4.2 Different Types of Closures

기존의 set보다 크거나 같다.

### 4.3 Paths in Directed Graphs

### 4.4 Transitive Closures

>**[Theorem 3]** \
>Let $M_R$ be the zero--one matrix of the relation $R$ on a set with $n$ elements. \
>Then the zero-one matrix of the transitive closure $R^*$ is \
>$M_{R^*} = M_R$

### 4.5 Warshall's Algorithm

$n^4$을 $n^3$으로 낮췄다.

## 5. Equivalence Relations

### 5.2 Equivalence Relations

>**[Definition 1]** \
>A relation on a set $A$ is called an equivalence relation if it is reflexive, symmetric, and transitive.

### 5.3 Equivalence Classes

>**[Definition 3]** \
>Let $R$ be an equivalence relation on a set A. The set of all elements that are related to an element $a$ of $A$ is called the **equivalence class** of $a$. The equivalence class of $a$ with respect subscript $R$ and write $[a]$ for this equivalence class.
>
>$[a]_R = [b | (a, b) \in R]$

교안 35page 3by3로 문제 나옴

### 5.4 Equivalence Classes and Partitions

## 6. Partial Orderings

>**[Definition 1]** \
>A relation $R$ on a set $S$ is called a partial ordering or partial order if it is reflexive, antisymmetric, and transitive. A set $S$ together with a partial ordering $R$ is called a partially ordered set or poset, and is denoted by $(S, R)$. Members of $S$ are called elements of the poset.

>**[Theorem 1] The principle of well-ordered induction** \
>Suppose that $S$ is a well-ordered set. Then $P(x)$ is true for all $x \in S$, if

### 6.2 Lexicographic Order

sorting method using ordering

### 6.3 Hasse Diagrams

concept in graph theory

42p : diviablity -> sorting

### 6.4 Maximal and Minimal Elements

### 6.5 Lattices

### 6.6 Topological Sorting

eliminating minimum and maximum and sorting

위상적 그래프 - 컴퓨터 사이언스

예제 많이 풀어봐라.

시험 전범위