---
title: "[Discrete Mathematics] Relations"
excerpt: "Discrete Mathematics (Ch09)"
categories:
  - discretemathematics
---
## 1. Relations and Their Propertiesx

### 1.2 Functions as Relations

### 1.3 Relations on a Set

>**[Definition 2]** \
>A relation on a set $A$ is a relation from $A$ to A.

### 1.4 Properties of Relations

>**[Defintion 3]** \
>A relation $R$ on a set $A$ is caleed $reflexive$ if $(a, a) \in \mathbb{R}$ for every element $a \in \mathbb{A}$.

>**[Definition 5]** \
>A relation $R$ on a set $A$ is called transitive if whenever $(a, b) \in \mathbb{R}$ and $(b, c) \in \mathbb{R}$, then $(a, c) \in mathbb{R}$, for all $a, b, c \in A$.

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

### 5.3 Equivalence Classes

교안 35page 3by3로 문제 나옴

### 5.4 Equivalence Classes and Partitions

## 6. partial Orderings

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