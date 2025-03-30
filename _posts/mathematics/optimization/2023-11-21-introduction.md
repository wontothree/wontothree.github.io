---
title: "[Optimization] Introduction"
excerpt: "Stephen Boyd - Convex Optimization : Ch01"
categories:
  - optimization
---
## 1. 수학적 최적화

수학적 최적화 문제(또는 최적화 문제)

$$
\text{minimize} \;\; f_0(x)
\\
\text{subject to} \;\; f_i(x) \leq b_i \;\; i = 1, 2, ..., m
$$

Linear programming : 목적 함수와 제약 함수들이 $f_0, ..., f_m$ 선형성을 가지고 있는 최적화 문제

$$
f_i(\alpha x + \beta y) = \alpha f_i(x) + \beta f_i(x) \;\;
\\
\text{for all} \; x, y \in R^n \; \text{and all} \; \alpha, \beta \in R
$$

Nonlinear programming : 선형적이지 않은 최적화 문제

Convex optimization problem : 목적 함수와 제약 함수들이 convex한 최적화 문제

$$
f_i(\alpha x + \beta y) \leq \alpha f_i(x) + \beta f_i(x)
\\
\text{for all} \; x, y \in R^n \text{and all} \; \alpha, \beta \in R \;\text{with} \;\alpha + \beta = 1, \alpha \geq 0, \beta \geq 0
$$

## 2. Least-squares and linear programming

Least square 문제 : 제약 조건이 없고 목적 함수가 $\sum_{i=1}^k(a_i^Tx - b_i)^2$의 형태인 최적화 문제

$$
\text{minimize} \;\; f_0(x) = ||Ax - b||_2^2 = \sum_{i = 1}^k (a_i^T - b_i)^2
$$

Lineaer programming : 목적 함수와 모든 제약 함수가 선형성을 가지고 있는 최적화 문제

$$
\text{minimize} \;\; c^Tx
\\
\text{subject to} \;\; a_i^T \leq b_i \;\; i = 1, 2, ..., m
$$

## 3. 볼록 최적화

Convex optimization problem : 목적 함수와 제약 함수들이 convex한 최적화 문제

$$
\text{minimize} \;\; f_0(x)
\\
\text{subject to} \;\; f_i(x) \leq b_i \;\; i = 1, 2, ..., m
\\
\text{where the functions} \; f_0, ... , f_m : R^n \rightarrow R \;\text{are convex, i.e.,}
\\
f_i(\alpha x + \beta y) \leq \alpha f_i(x) + \beta f_i(x)
\\
\text{for all} \; x, y \in R^n \text{and all} \; \alpha, \beta \in R \;\text{with} \alpha + \beta = 1, \alpha \geq 0, \beta \geq 0
$$

## 4. Nonlinear optimization

Non linear optimization : 목적 함수와 제약 함수들이 선형적이지 않은 최적화 문제

## Reference

Stephen Boyd - Convex Optimization
