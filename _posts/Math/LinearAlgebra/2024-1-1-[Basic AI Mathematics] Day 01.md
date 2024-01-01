---
title: "[Basic AI Mathematics] Day 01"
categories:
  - LinearAlgebra
excerpt: 
toc: true
# use_math: true
---
## Linear Algebra

>Linear

$$
x_1 \rightarrow ㅁ \rightarrow y_1 \\
x_2 \rightarrow ㅁ \rightarrow y_2 \\
$$

(i). Superposition : $x_1 + x_2\rightarrow ㅁ \rightarrow y_1 + y_2 \\$
(ii). Homogeneity : $\alpha x_1 \rightarrow ㅁ \rightarrow \alpha y_1 \\$

>Algebra : 집합에 있는 원소에 어떤 연산을 가했을 때 생기는 구조를 다루는 학문

>Linear Algebra : **Vector Space**를 다루는 학문

$$
\vec{a}, \; \vec{b} \in V
$$

(i) Vector Addition(벡터의 덧셈에 대해 닫혀있다.) : $\vec{a} + \vec{b} \in V \\$
(ii) Scalar Multiplication(벡터의 스칼라배에 대해 닫혀있다.) : $\alpha \vec{a} \in V \\$

Scalar의 대수적인 이름은 field이다. Scalar는 사칙연산이 자유롭게 가능해야 한다.

## 사칙연산을 다룰 수 있는 집합(Field)

$\mathbb{N}$ : set of natural numbers

$\mathbb{Z}$ : set of integers

$\mathbb{Q}$ : set of quotients(rational numbers)

$\mathbb{R}$ : set of real numbers

$\mathbb{C}$ : set of complex numbers

>(i) Closure : 한 집합에서 임의의 원소들로 연산을 했을 때 그 결과가 그 집합 안에 있다.

>(ii) Identity : 한 집합에 항등원이 있다.

$$
\exists e_1, \; a + e_1 = e_1 + a = a \;\;\; \exists e_2, \; ae_2 = e_2a = a
$$

-> 자연수 집합에는 덧셈에 대한 항등원인 0이 없다.

>(iii) Inverse : $\exists b, \; a + b = b + a = e_1 \;\;\; \exists c, ac = ca = e_2$

덧셈과 곱셈을 정의하고 뺄셈과 나눗셈은 각각 덧셈과 곱셈에 대한 역원을 이용해서 계산한다.

-> 정수 집합은 곱셈에 대한 역원이 존재하지 않을 수 있다.

>(iv) Associativity : $(a + b) + c = a + (b + c) \;\;\; (ab)c = a(bc)$

>(v) Commutivity : $a + b = b + a \;\;\; ab = ba$

행렬에서 곱셈은 교환법칙이 성립하지 않는다.(참조)

>(xi) Distributivity : $a(b + c) = ab + ac$

덧셈과 곱셈에 대한 연산을 이어주는 법칙이다.

덧셈과 곱셈 각각에 대해서 (i) ~ (v)를 만족해야 한다. 이 11가지를 모두 만족하는 집합을 field라고 한다. Scalar는 이 11가지를 만족해야 한다. 따러서 Scalar는 유리수 집합, 실수 집합, 복소수 집합 중 하나에서 다뤄질 수 있다.

## $\mathbb{Z}_p$

- Infinite field : 원소의 개수가 무한한 field
- Finite field : 원소의 개수가 유한한 field

Finite field는 원소의 개수를 임의로 가질 수 없다. $p^m, \; m \in \mathbb{N}$개의 원소를 갖는다.

우리는 다음의 집합을 집중적으로 다룬다.

$$\mathbb{Z}_p = \{1, 2, \; ... \; , p - 1\}$$

모든 연산에 mod 연산을 취함으로써 이 집합에서 사칙연산을 정의할 수 있다. modulo p는 p로 나눈 나머지를 연산 결과로 취하는 연산이다. field의 가장 중요한 필요조건은 연산의 결과가 집합 안에 있어야 한다는 것이다. 이것이 성립하지 않으면 연산은 아무 의미가 없다.

$$
\mathbb{Z}_5 \\
3 + 4 = 2 \\
4 + 4 = 3 \\
3 \times 4 = 2 \\
4 \times 4 = 1 \\
3 - 2 = 3 + (-2) = 3 + 3 = 1 \\
3 \;\%\; 4 = 3 \times 4^{-1} = 3 \times 4 = 2 \\
2 \;\%\; 3 = 2 \times 3^{-1} = 2 \times 2 = 4 \\
\mathbb{Z}_{13} \\
4 - 7 = 4 + (-7) = 4 + 6 = 10 \\
7 \;\%\; 8 = 7 \times 8^{-1} = 7 \times 5 = 9 \\
$$

## 역원

n 자리 소수를 이용한다면 어떻게 계산할까? -> 유클리드 알고리즘 -> division algorithm -> great common divisor -> 역원

$$
a = bq + r \\
gcd(a, b) = gcd(b, r)
$$

$$
14 = 3 \times 4 + 2 \\
3 = 2 \times 1 + 1 \\
$$

반면 소인수분해는 계산 비용이 굉장히 높은 과정이다. 암호 시스템에 많이 사용된다.

[예제] $\mathbb{Z}_{23}$에서 6의 곱셈에 대한 역원을 구하라.

$$
\mathbb{Z}_{23} = \{0, 1, \; ... \;, 22\} \;\;\;
gcd(23, 6) = 1
$$

$$
23 = 6 \times 3 + 5 \\
6 = 5 \times 1 + 1 \\
$$

$$
1 = 6 - 5 \times 1
= 6 - (23 - 6 \times 3) \times 1
= \mathbf{6} \times 4 - \mathbf{23} \times 1
$$

$$
\therefore 4
$$

6을 Symbol로 봐야 한다. 양변에 mod 연산을 취하면 4를 얻을 수 있다.

[예제] $\mathbb{Z}_{23}$에서 4의 곱셈에 대한 역원을 구하라.

$$
gcd(23, 4) = 1
$$

$$
23 = 4 \times 5 + 3 \\
4 = 3 \times 1 + 1 \\
$$

$$
1 = 4 - 3 \times 1
= 4 - (23 - 4 \times 5) \times 1
= 4 \times 6 - 23 \times 1
$$

$$
\therefore 6
$$

[예제] $\mathbb{Z}_{97}$에서 17의 곱셈에 대한 역원을 구하라.

$$
97 = 17 \times 5 + 12 \\
17 = 12 \times 1 + 5 \\
12 = 5 \times 2 + 2 \\
5 = 2 \times 2 + 1 \\
$$

$$
1 = 5 - 2 \times 2
= 5 - (12 - 5 \times 2) \times 2
=
$$