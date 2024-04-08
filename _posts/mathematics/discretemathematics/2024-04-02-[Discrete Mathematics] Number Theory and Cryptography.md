---
title: "[Discrete Mathematics] Ch04 Number Theory and Cryptography"
excerpt: "Kenneth H. Rosen - Discrete Mathematics and Its Applications : Ch04"
categories:
  - discretemathematics
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. Disivility and Modular Arithmetic

DIvision of an integer bu a positive integer produces quatient and remainder. Working with these remainders leads ot modular arithemtic, which plays an important role in mathematics and which is used throughout computer science.

### 1.2 Division

>**[DEFINITION 1]** If $a$ and $b$ are integers with $a \neq 0$, we say that $a$ divides $b$ if thers is an integer $c$ such that $b = ac$ or equivalently, if $\dfrac{b}{a}$ is an integer. When $a$ divides $b$, we say that a is a *factor* or *divisor* of $b$, and that $b$ is a muliple of $a$. The notation $a|b$ denotes that $a$ devides $b$. We write $a \not| b$when $a$ does not divide $b$.

>**[THEOREM 1]** Let $a, b$ be integers, where $a \neq 0$, Then \
>(i) if $a \;|\; b$ and $a \;|\; c$, then $a \;|\; (b + c)$; \
>(ii) if $a | b$, then $a \;|\; bc$ for all integers $c$; \
>(iii) if $a | b$ and $b \;|\; c$, then $a \;|\; c$.

>**[COROLLARY 1]** \
>If $a, b,$ and $c$ are integers, where $a \neq 0$, such that $a \;|\; b$ and $a \;|\; c$, then $a \;|\; mb + nc$ whenever $m$ and $n$ are integers.

### 1.3 The Division Algorithm

>**[THEORM 2]** **THE DIVISION ALGORITHM** \
>Let $a$ be an integer and $d$ a positive integer. Then there are unique integers $q$ and $r$, with $0 \geq r < d$, such that $a = dq + r$.

>**[DEFINTION 2]** In the equality in the division algorithm, $d$ is called the divisor, $a$ is called the divident, and, $q$ is called the quotient, and $r$ is called the remainder. The notation is used to express the quotient and remainder: $q = a$ **div** $d$, $r = a$ **mod** $d$

### 1.4 Modular Arithmetic

Because we are interested only in remainders, we have special notation for them. We have already notation $a$ mode $m$ to represent remainder when integer $a$ is divided by the positive integer $m$. We now introduce a different, but related, notation that indicates that two integers have the same reaminder when they are divided by the positive integer $m$.

>[DEFINITION 3] If $a$ and $b$ are integers and $m$ is a positive integer, then $a$ is congruent to $b$ modulo $m$ if $m$ divides $a-b$. \
>We use the notation $a \equiv b (\text{mod m)}$ to indicate that $a$ is congruent to $b$ modulo $m$. \
>We say that $a \equiv b (\text{mode m})$ is a congruence and that $m$ is its modulus (plural moduli). \
>If $a$ and $b$ are not congruent to modulo $b$, we write $a \not\equiv b (mod m)$.

## 2. Ineger Representations and Algorithms

## 3. Primes and Greatest Common Divisors

### 3.6 Greatest Common Divisors and Least Common Multiples

### 3.7 The Euclidean Algorithm

>**[LEMMA 1]**
>Let $a = bq + r$, where a, b, q, and r are integers. Then gcd($a, b$) = gcd($b, r$).

### 3.8 gcds as Linear Combinations

>**[BEZOUT'S THEOREM]**
>If $a$ and $b$ are positive integers, then there exist integers $s$ and $t$ such that gcd(a, b) = sa + tb

## 4. Solving Congruences

## 5. Application of Congruences

## 6. Cryptography
