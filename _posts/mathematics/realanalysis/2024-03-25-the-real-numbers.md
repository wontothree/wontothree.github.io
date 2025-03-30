---
title: "[Real Analysis] The Real Numbers"
excerpt: "Real Analysis"
categories:
  - realanalysis
---
## 1. Sets and Operations on Sets

### Set Operations

If $A$ and $B$ are sets, the union of $A$ and $B$, denoted $A \cup B$, is the set of all elements that belong either to $A$ or $B$ or to both $A$ and $B$.

$$
A \cup B = \{x : x \in A \; \text{or} \; x \in B \}
$$

The intersection of $A$ and $B$, denoted $A \cup B$, is the set of elements that belonfg to both $A$ and $B$; that is

$$
A \cap B = \{x : x \in A \; \text{and} \; x \in B \}
$$

The two sets $A$ and $B$ are disjoint if $A \cap B = \emptyset$.

The relative complement $B \setminus A$, is the set of all elements which are in $B$ but not in $A$.

$$
B \setminus A = \{x : x \in B \;\text{and} \; x \notin A \}
$$

>**[THEOREM 1.1.1]** \
>If $A, B$ and $C$ are sets, then \
>(a) $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$, \
>(b) $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$, \
>(c) $C \setminus (A \cup B) = (C \setminus A) \cup (C \setminus B)$, \
>(d) $C \setminus (A \cap B) = (C \setminus A) \cap (C \setminus B)$.

If $A$ and $B$ are two sets, the **Cartesian product** of $A$ and $B$, denoted $A \times B$, is defined as the set of all ordered pairs $(a, b)$, where the first component $a$ is from $A$ and the second component $b$ is from $B$.

$$
A \times B = \{(a, b) : a \in A, b \in B \}
$$

## 2. Functions

>**[DEFINITION 1.2.1]** \
>Let $A$ and $B$ be any two sets. \
>A function $f$ from $A$ into $B$ is a subset of $A \times B$ with the property that each $x \in A$ is the first component of preciesly one ordered pair $(x, y)$; that is, for every $x \in A$ there exists $y \in B$ such that $(x, y) \in f$, \
>and if $(x, y)$ and $(x, y')$ are elements of $f$, then $y = y'$.
>
>The set $A$ is called the **domain** of $f$, denoted Dom $f$. \
>The **range** of $f$, denoted Range $f$, is defined by $\text{Range} f = \{y \in B : (x, y) \in f \;\text{for some}\; x \in A\}$.

>If Range $f = B$, then the function $f$ is said to be **onto** $B$

### Image and Inverse Image

>**[DEFINITION 1.2.3]** \
>Let $f$ be a function from $A$ into $B$. \
>If $E \subset A$, then $f(E)$, the image of $E$ under $f$, is defined by $f(E) = \{f(x) : x \in E\}.$ \
>If $H \subset B$, the inverse image of $H$, denoted $f^{-1}(H)$, is defined by $f^{-1}(H) = \{x \in A : f(x) \in H \}$. \
>If $H$ contains a single element of $B$, $H = \{y\}$, we will write $f^{-1}(y)$ instead of $f^{-1}\{y\}$. Thus for $y \subset B$, $f^{-1}(y) = \{x \in A : f(x) = y\}$.

>**[THEOREM 1.2.5]** \
>Let $f$ be a function form $A$ into $B$. If $A_1$ and $A_2$ are subsets of $A$, then \
>(a) $f(A_1 \cup A_2) = f(A_1) \cup f(A_2)$ \
>(b) $f(A_1 \cap A_2) \subset f(A_1) \cap f(A_2)$

>**[THEOREM 1.2.6]** \
>Let f be a function form $A$ into $B$. If $B_1$ and $B_2$ are subsets of $B$, then \
>(a) $f^{-1}(B_1 \cup B_2) = f^{-1}(B_1) \cup f^{-1}(B_2)$, \
>(b) $f^{-1}(B_1 \cap B_2) = f^{-1}(B_1) \cap f^{-1}(B_2)$, \
>(c) $f^{-1}(B \setminus B_1) = A \setminus f^{-1}(B_1)$.

### Inverse Function

>**[DEFINITION 1.2.7]** \
>A function $f$ from $A$ into $B$ is said to be one-to-one if whenever $x_1 \neq x_2$, then $f(x_1) \neq f(x_2)$

## 3. Mathematical Induction

Mathematical induction is very useful tool in establishing that a identity is valid for all positvie integer $n$.

>**[THEOREM 1.3.1]** (Principle of Mathematical Induction) \
>For each $n \in \mathbb{N}$, let $P(n)$ be a statement about the positive integer $n$. If \
>(a) $P(1)$ is true. \
>(b) $P(k+1)$ is true whenever $P(k)$ is true, \
>then $P(n)$ is true for all $n \in \mathbb{N}$.

**Proof.**

I use proof by contradiction.

Assume that $P(1)$ is true and $P(k+1)$ is true whenever $P(k)$ is true, but that there exists a positive integer $n \in \mathbb{N}$ s.t. $f(n)$ is false.

Let $A = \{k \in \mathbb{N} : f(n) \; \text{is false} \}$.

By assumption that $P(1)$ is true, $A$ is a nonempty subset of $\mathbb{N}$.

Thus, by well-ordering principle, $A$ has a smallest element $k_0$.

Since $P(1)$ is true, $k_0 > 1$.

Also, since $k_0$ is the smallest element of $A$, $P(k_0-1)$ is true.

By assumption that $P(k+1)$ is true whenever $P(k)$ is true, $P(k_0)$ is true, which is a contradiction.

Consequently, $P(n)$ must be true for all $n \in \mathbb{N}$.

>**WELL-ORDERING PRINCIPLE** \
>Every nonempty subset of $\mathbb{N}$ has a smallest element.

## 4. The Least Upper Bound Property

Both the rational numbers $\mathbb{Q}$ and real numbers $\mathbb{R}$ are algebraic systems known as *fields*.

>A Field is a set $\mathbb{F}$ with two perations, addition and multiplication, which satisfy the following axioms:
>
>1. If $a, b \in F$, then $a + b \in F$ and $a \cdot b \in \mathbb{F}$.
>2. For all $a, b\in F$, then $a + b = b + a, a \cdot b = b \cdot a$.
>3. For all $a, b, c \in F$, then $a + (b + c) = (a + b) + c, a \cdot (b \cdot c) = (a \cdot b) \cdot c$
>4. There exists an element $0 \in F$ such that $a + 0 = a$ for all $a \in F$.
>5. \
>6. \
>7. \
>8.

>The real numbers $\mathbb{R}$ contain a subset $\mathbb{P}$ known as the positive real numbers satisfying the following: \
>(01) If $a, b \in \mathbb{P}$, then $a + b \in \mathbb{P}$ and $a \cdot b \in \mathbb{P}$. \
>(O2) If $a \in \mathbb{P}$, then one and only one of the following hold: \
>$a \in \mathbb{P}, -a \in \mathbb{P}, a = 0$.

### Upper Bound of Set

>**[DEFINITION 1.4.1]** \
>A subset $E$ of $\mathbb{R}$ is **bounded above** if there exists $\beta \in \mathbb{R}$ such that $x \leq \beta$ for every $x \in E$. \
> Such a $\beta$ is called an upper bound of $E$. \
>A subset $E$ of $\mathbb{R}$ is **bounded below** if there exists $\alpha \in \mathbb{R}$ such that $\alpha \leq x$ for every $x \in E$. \
>Such a $\alpha$ is called an lower bound of $E$. \
>A set $E$ is **bounded** if $E$ is bounded both above and below.

### Least Upper Bound of a Set

>**[DEFINITION 1.4.3]** \
>Let $E$ be a nonempty subset of $\mathbb{R}$ that is bounded above. \
> An element of $\alpha \in \mathbb{R}$ is called the **least upper bound** or **supremum** of $E$ if \
>(i) $\alpha$ is an upper bound of $E$, and \
>(ii) if $\beta \in \mathbb{R}$ satisfies $\beta < \alpha$, then $\beta$ is not an upper bound of $E$.

Upper bound의 정의만으로 upper bound인 조건과 upper bound가 아닌 조건만을 이용하여 least upper bound를 정의한다.

>**[THEOREM 1.4.4]** \
>Let $A$ be a nonempty subset of $\mathbb{R}$ that is bounded above. \
>An upper bound $\alpha$ of $A$ is the supremum of $A$ if and only if for every $\beta < \alpha$, there exists an element $x \in A$ such that $\beta < x \leq \alpha$.

**Proof.**

Suppose $\alpha = sup A$.

If $\beta \in \mathbb{R}$  satisfies $\beta < \alpha$, $\beta$ is not upper bound of $A$.

Thus, there exists an element $x \in A$ such that $x > \beta$.

On the other hand, since $\alpha$ is an upper bound of $A$, $x < \alpha$ for all $x \in A$.

Therefore, there exists an $x \in A$ such that $\beta < x \leq \alpha$.

Suppose $\alpha$ is an upper bound of $A$ satisfying that for every $\beta < \alpha$, there exists an element $x \in A$ such that $\beta < x$.

Every $\beta$ is not an upper bound of $A$.

Therefore $\alpha = sup A$.

>**[AXIOM]** Completeness of Real Numbers \
>Every nonempty subset of $\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$. \
>Every nonempty subset of $\mathbb{R}$ thar is bounded below has a infimum in $\mathbb{R}$.

### Least Upper Bound Property of $\mathbb{R}$

### Intervals

Using the order properties of $\mathbb{R}$, we can define certain subsets of $\mathbb{R}$ known as intervals.

>**[Definition 1.4.8]** \
>For $a, b \in \mathbb{R}, a \leq b$, the open inveral (a, b) is defined as $(a, b) = [x \in \mathbb{R} : a < x < b]$, \
>whereas the closed interval [a, b] is defined as $[a, b] = [x \in \mathbb{R} : a \leq x \leq b]$.

## 5 Consequences of the Least Upper Bound Property

We look at a number of elementary properties of real numbers which in more elementary courses are usually always taken for granted. There are all actually consequences of the least upper bound property of the real numbers.

>**[THEOREM 1.5.1] (Archimedian Property)** \
>If $x, y \in \mathbb{R}$ and $x > 0$, then there exists a positive integer $n$ such that $nx > y$.

>**[THEOREM 1.5.2]** \
>If $x, y \in \mathbb{R}$ and $x < y$, then there exists $r \in \mathbb{Q}$ such that $x < r < y$.

부등식을 작성하게 해주는 중요한 두 가지 정리이다.

>**[THEOREM 1.5.3]** \
>For every real number $x > 0$ and every positive integer $n$, there exists a unique positive real number $y$ so that $y^n = x$.

>**[COROLLARY 1.5.4]** \
>If $a, b$ are positive real numbers and $n$ is a positive integer, then $(ab)^{1/n} = a^{1/n} b^{1/n}$

## 7 Countable and Uncountable Sets

We take a closer look at infinite sets and what it means for an infinite set ot be countable.

>**[DEFINITION 1.7.1]**
>Two sets $A$ and $B$ are said to be **equivalent** (or to have the same **cardinality**), denoted by $A$ ~ $B$, if there exists a one-to-one function of $A$ onto $B$.
>
>The notion of equivalence of sets satisfies the following:
>(i) $A$ ~ $A$ (reflexive)
>(ii) If $A$ ~ $B$, then $B$ ~ $A$. (symmetric)
>(iii) If $A$ ~ $B$ and $B$ ~ $C$, then $A$ ~ $C$. (transitive)

>**[DEFINITION 1.7.2]**
>For each positive integer $n$, let $\mathbb{N}_n = \{1, 2, 3, ... , n\}$. $\mathbb{N}$ denotes the set of all positive integers. If $A$ is a set, we say
>
>(a) $A$ is **finite** if $A$ ~ $\mathbb{N}_n$ for some n, or if $A = \emptyset$.
>
>(b) $A$ is **infinite** if $A$ is not finite.
>
>(c) $A$ is **countable** if $A$ ~ $\mathbb{N}$.
>
>(d) $A$ is **uncountable** if $A$ is neither finite nor countable.
>
>(e) $A$ is **at most countable** if $A$ is finite or countable.

>**THEOREM 1.7.4**
>$\mathbb{N} \times \mathbb{N}$ is countable

### Sequences

>**[DEFINITION 1.7.5]**
>If $A$ is a set, by a **sequence** in $A$ we mean a function $f$ from $\mathbb{N}$ into $A$. For each $n \in \mathbb{N}$, let $x_n = f(n)$. Then $x_n$ is called the $n$th term of the sequence $f$

- 고등학교 수학에서와 달리, 수열은 정의역이 자연수인 함수이다.

>**[THEOREM 1.7.6]**
>Every infinite subset of a countable set is countable

>**[THEOREM 1.7.7]**
>If $f$ maps $\mathbb{N}$ onto $A$, then $A$ is at most countable

### The Countability of $\mathbb{Q}$

>**[THEOREM 1.7.15]**
>If $\{E_n\}_{n=1}^{\infty}$ is a sequence of countable sets and $S = \cup_{n=1}^{\infty} E_n$, then $S$ is countable.

>**[COROLLARY 1.7.16]**
>$\mathbb{Q}$ is countable.

### The Uncountablity of $\mathbb{R}$

>**[THEOREM 1.7.17]**
>The closed inverval $[0. 1]$ is uncountable.

>**[THEOREM 1.7.18]**
>If $A$ is the set of all sequences whose elements are 0 or 1, then $A$ is uncountable.

## 궁금한 점

- 첫 번째 order axiom이 field axiom과 중복되는데 왜 존해하는 것일까?

## Reference

Manfred - Introduction to Real Analysis : Ch01
