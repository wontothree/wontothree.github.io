---
title: "Sequences of Real Numbers"
excerpt: "Real Analysis"
categories:
  - realanalysis
---
We begin with limits of sequences.

Some of the concepts and results included in this chapter have been encountered in the study of calculus.

Our presentation will be considerably more rigorous - emphasizing proofs rather than computation.

## 1. Convergent Squences

>**[DEFINITION 3.1.1]** \
>A Sequence $ \{p_n \}$  in $X$ is said to **converge** if there exists a point $p \in X$ such that for every $\epsilon > 0$, there exists a positvie integer $n_0 = n_0(\epsilon)$ such that $p_n \in N_\epsilon (p)$ for all $n \geq n_0$. If this is the case, we say that $\{ p_n \}$ converges to $p$. \
>In this is the case, we say that $p_n$ converges to $p$, or that $p$  is the limist of the sequence $p_n$, and we write $\lim_{n \rightarrow \infty} p_n = p$ or $p_n \rightarrow p$. \
>If $p_n$ does not converge, then $p_n$ is said to diverge. \
>In the definition, the statement $p_n \in N_{\epsilon}(p)$ for all $n \geq n_0$ is equivalent to $d(p_n, p) < \epsilon$ for all $n \geq n_0$.

>**[DEFINITION 3.1.3]** \
> A sequence $\{p_n\}$ in X is said to be **bounded** if there exists $p \in X$ and a positvie constant $M$ such that $d(p, p_n) \leq M$ for all $n \in \mathbb{N}$.

>**[THEOREM 3.1.4]** \
>Let $(X, d)$ be a metric space. \
>(a) If a sequence $ \{p_n\}$ in $X$ converges, then its limit is unique. \
>(b) Every convergent sequence in $X$ is bounded. \
>(c) If $E \subset X$ and $p$ is a limit point of $E$, then there exists a sequence $\{p_n\}$ in $E$ with $p_n \neq p$ for all $n$ such that $\lim_{x\to\infty} \{p_n\} = p$.

**Proof (a)**

We will prove it using proof by contradiction.

Suppose that the sequence $p_n$ converges to two distinct points $p, q \in X$.

Let $\epsilon = \dfrac{1}{3} d(p, q)$.

Since $p_n \rightarrow p, \exists n_1 \in \mathbb{N} \; s.t. \; \vert p_n - p \vert < \epsilon \; \forall n \geq n_1.$

Also, since $p_n \rightarrow p, \exists n_2 \in \mathbb{N} \; s.t. \; \vert p_n - q \vert < \epsilon \; \forall n \geq n_2.$

Thus if $n \geq max(n_1, n_2)$, by triangule inequality, $d(p, q) \leq d(p_n, p) + d(p_n, q) < 2 \epsilon = \dfrac{2}{3} d(p, q)$, which is a contradiction.
Thereofre, $p = q$ and the sequence $p_n$ converges to unique point.

**Proof (b)**

Let $\{p_n\}$ be a convergent sequence in $X$ such that converges to $p \in X$.

Take $\epsilon = 1$. For this $\epsilon, \exists n_0 \in \mathbb{N} \; s.t. \; d(p_n, p) < \epsilon \; \forall n > n_0$. Let $M = max(d(p, p_1), d(p, p_2), \dots, d(p, p_{n_0}), 1)$.

Then $d(p, p_n) \leq M \; \forall n \in \mathbb{N}$.

Therefore $p_n$ is bounded.

**Proof (c)**

## 2. Sequences of Real Numbers

We will emphasize some of the important properties of sequences of real numbers, and also investigate the limites of several basic sequences that are frequently encountered in the analysis.

>**[THEOREM 3.2.1]** \
>If $\{ a_n \}$ and $\{ b_n \}$ are convergent sequences of real numbers with $\lim_{n \rightarrow \infty} a_n= a$ and $\lim_{n \rightarrow \infty} b_n= b$, \
>then \
>(a) $\lim_{n \rightarrow \infty} (a_n + b_n) = a + b$, and \
>(b) $\lim_{n \rightarrow \infty} a_nb_n= ab$. \
>(c) Futhermore, if $a \neq 0$, and $a_n \neq 0$ for all $n$, then $\lim_{x\to\infty} \dfrac{b_n}{a_n}= \dfrac{b}{a}$.

**Proof (a)**

Since $a_n \rightarrow a$ and $b_n \rightarrow b$, $\forall \epsilon_1 \; \exists n_1 \; s.t. \; \vert a_n - a \vert < \epsilon_1 \; \forall n \geq n_1$ and $\forall \epsilon_2 \; \exists n_2 \; s.t. \; \vert b_n - b \vert < \epsilon_2 \; \forall n \geq n_2$.

Take $\epsilon = \epsilon_1 + \epsilon_2$ and $n_0 = max(n_1, n_2)$. if $n \geq n_0$, using triangle inequality, $\vert (a_n + b_n) - (a + b) \vert \leq \vert a_n - a \vert + \vert b_n - b \vert \leq \epsilon_1 + \epsilon_2 = \epsilon$.

Therefore, $(a_n + b_n) \rightarrow (a+b)$.

**Proof (b)**

Since $a_n \rightarrow a$, by theorem 3.1.4 (b), $a_n$ is bounded. Thus $\exists M >0 \; s.t. \; \vert a_n \vert \leq M \; \forall \; n \in \mathbb{N}$.

Take $\epsilon = M \epsilon_2 + \vert b \vert \epsilon_1 > 0$ and $n_0 = max(n_1, n_2)$.

Since $a_n \rightarrow a$ and $b_n \rightarrow b$, $\forall \epsilon_1 > 0 \; \exists n_1 \in \mathbb{N} \; s.t. \; \vert a_n - a \vert < \epsilon_1 \; \forall n \geq n_1$ and $\forall \epsilon_2 > 0 \in \mathbb{N} \; \exists n_2 \; s.t. \; \vert b_n - b \vert < \epsilon_2 \; \forall n \geq n_2$.

If $n \geq n_0$,

$$
\vert a_nb_n - ab \vert = \vert a_n (b_n - b) + b (a_n - a) \vert
\\
\leq \vert a_n (b_n - b) \vert + \vert b (a_n - a) \vert
\\
= \vert a_n \vert \cdot \vert (b_n - b) \vert + \vert b \vert \cdot \vert (a_n - a) \vert
\\
\leq M \cdot \vert (b_n - b) \vert + \vert b \vert \cdot \vert (a_n - a) \vert \\
= M \epsilon_2 + \vert b \vert \epsilon_1
\\
= \epsilon
$$

Therefore $a_nb_n \rightarrow ab$

**Proof (C)**

It is suffice to show that $\dfrac{1}{a_n} \rightarrow \dfrac{1}{a}$.

The result (c) then follows from (b).

Since $a \neq 0$ and $a_n \rightarrow a$, let $\epsilon' = \dfrac{1}{2} \vert a \vert$ and $\exists n_0 \in \mathbb{N} \; s.t. \; \vert a_n - a \vert < \epsilon' \; \forall n \geq n_0$.

Since $\vert a \vert \leq \vert a_n - a \vert + \vert a_n \vert < \dfrac{1}{2} \vert a \vert + \vert a_n \vert \; \forall \; n \geq n_0$, $\vert a_n \vert > \dfrac{1}{2} \vert a \vert \; \forall \; n \geq n_0$.

Take $\epsilon = \dfrac{1}{\vert a \vert}$, and if $n \geq n_0$,

$$
\vert \dfrac{1}{a_n} - \dfrac{1}{a} \vert \leq \dfrac{\vert a_n - a \vert}{\vert a_n \vert \vert a \vert} < \dfrac{\dfrac{1}{2} \vert a \vert}{\dfrac{1}{2} \vert a \vert \vert a \vert} = \dfrac{1}{\vert a \vert} = \epsilon
$$

Therefore $\dfrac{1}{a_n} \rightarrow \dfrac{1}{a}$

>**[COROLLARY 3.2.2]** \
>If $\{ a_n \}$ is a convergent sequence of real numbers with $\lim_{n \rightarrow \infty} a_n= a$, then for any $c \in \mathbb{R}$, \
>(a) $\lim_{n \rightarrow \infty} (a_n + c)= a + c$, and \
>(b) $\lim_{n \rightarrow \infty} c\;a_n= c\;a$.

**Proof.**

If we define the sequence $c_n$ by $c_n = c$ for all $n \in \mathbb{N}$, then the conclusions follow by (a) and (b) of the previous theorem.

>**[THEOREM 3.2.3]** \
>Let $\{ a_n \}$ and $\{ b_n \}$ be a sequences of real numbers. If $\{ b_n \}$ is bounded and $\lim_{n \rightarrow \infty} a_n= 0$, then
>$\lim_{n \rightarrow \infty} a_n b_n= 0$

**Proof.**

Since $b_n$ is bounded, $\exists M > 0 \; s.t. \; \vert b_n \vert < M \;\forall \; n \in \mathbb{N}$.

Let $\epsilon > 0$ be given.

Since $a_n \rightarrow 0$, $\exists n_0 = n_0(\epsilon) \in \mathbb{N} \; s.t. \; \vert a_n - 0 \vert < \dfrac{\epsilon}{M} \; \forall n \geq n_0$.

Thus, if $n \geq n_0$, $\vert a_nb_n - 0 \vert \leq \vert a_n \vert \vert b_n \vert \leq \dfrac{\epsilon}{M} \cdot M = \epsilon$.

Therefore, $a_nb_n \rightarrow 0$.

>**[THEOREM 3.2.4]** squeeze theorem \
>Suppose $\{a_n\}$, $\{b_n\}$, and $\{c_n\}$ are sequences of real numbers for which there exists $n_0 \in \mathbb{N}$ such that $a_n \leq b_n \leq c_n$ for all $n \in \mathbb{N}$, $n \geq n_0$, \
>and that $\lim_{n \rightarrow \infty} a_n= \lim_{n \rightarrow \infty} b_n = L$. \
>Then the sequence $\{b_n\}$ converges and $\lim_{n \rightarrow \infty} b_n = L$

Let $\epsilon > 0$ be given.

Since $a_n \rightarrow L$ and $b_n \rightarrow L$,

$\exists n_1 \in \mathbb{N} \; s.t. \; \vert a_n - L \vert < \epsilon \; \forall n \geq n_1$ and $\exists n_2 \in \mathbb{N} \; s.t. \; \vert c_n - L \vert < \epsilon \; \forall n \geq n_2$

Thus, $L - \epsilon < a_n < L + \epsilon$ and $L - \epsilon < c_n < L + \epsilon$.

Take $n_0 = max(n_1, n_2)$.

Since $L - \epsilon < a_n \leq b_n \leq c_n < L + \epsilon \; \forall n \geq n_0$, $\vert b_n - L \vert < \epsilon \; \forall n \geq n_0$.

Therefore $c_n \rightarrow L$.

### Some special Sequences

We consider some special sequences of real numbers that occur frequently in the study of analysis.

>**[THEOREM 3.2.5]** (Binomial Theorem) \
>For $a \in \mathbb{R}$, $n \in \mathbb{N},$ \
>$(1 + a)^n = \sum_{k=0}^n {n \choose k} a^k = {n \choose 0} + {n \choose 1} a + \dots + {n \choose n} a^n$

**Proof.**

We will use Mathematical induction.

When $n = 1$, ${1 \choose 0} + {1 \choose 1} a = 1 + 1$, which means the given identity is true.

Suppose that the given identity is true, which is ${n \choose 0} + {n \choose 1} a + \dots + {n \choose n} a^n$.

$$
(1 + a)^{n+1} = (1 + a) (1 + a)^n
\\
= (1 + a) \{ {n \choose 0} + {n \choose 1} a + \dots + {n \choose n} a^n \}
\\
= \{ {n \choose 0} + {n \choose 1} a + \dots + {n \choose n} a^n \} + \{ {n \choose 0} a + {n \choose 1} a^2 + \dots + {n \choose n} a^{n+1} \}
\\
= {n \choose 0} + {n+1 \choose 1} a + \dots + {n+1 \choose n} a^{n+1} + {n \choose n} a^{n+1}
\\
= {n+1 \choose 0} + {n+1 \choose 1} a + \dots + {n+1 \choose n} a^{n+1} + {n+1 \choose n+1} a^{n+1}
$$

, which means the given identity is true when $n = n + 1$.

Therefore, by mathematical induction, the given identity is true.

>**[THEOREM 3.2.6]** \
>(a) If $p > 0$, then $\lim_{n \rightarrow \infty} \dfrac{1}{n^p} = 0$. \
>(b) If $p > 0$, then $\lim_{n \rightarrow \infty} \sqrt[n]{p} = 1$. \
>(c) $\lim_{n \rightarrow \infty} \sqrt[n]{n} = 1$ \
>(d) If $p > 1$ and $\alpha$ is real, then $\lim_{n \rightarrow \infty} \dfrac{n^\alpha}{p^n} = 0$. \
>(e) If $|p| < 1$, then $\lim_{n \rightarrow \infty} p^n = 0$. \
>(f) For all $p \in \mathbb{R}$, $\lim_{n \rightarrow \infty} \dfrac{p^n}{n!} = 0$.

**Proof (a)**

Let $\epsilon \in \mathbb{R}$ s.t. $\epsilon > 0 $ be given.

By Archimedian property, $\exists n_0$ s.t. $n_0 \epsilon^{1/p} > 1$ or $\epsilon > \dfrac{1}{n_0^p}$.

If $n \geq n_0$, $\vert \dfrac{1}{n^p} - 0 \vert \leq \vert \dfrac{1}{n_0^p} \vert < \epsilon$.

Therefore, $\dfrac{1}{n^p} \rightarrow 0$

**Proof (b)**

When $p = 1$, $\lim_{n \rightarrow \infty} \sqrt[n]{p} = \lim_{n \rightarrow \infty} 1 = 1$.

When $p < 1$, $\exists q = \dfrac{1}{p}$.

If is suffice to show that $\lim_{n \rightarrow \infty} \sqrt[n]{p} = 1$ for $p > 1$.

Since $p > 1$, $\sqrt[n]{p} > 1$ and $\sqrt[n]{p} = p^{1/n} = 1 + a_n$ for $n \in \mathbb{N}$ and some $a_n > 0$.

$$
p = (1 + a_n)^n
= {n \choose 0} + {n \choose 1} a_n + \dots + {n \choose n} a_n^n
\geq na_n
$$

Since $0 < a_n < \dfrac{p}{n}$ for all $n \in \mathbb{N}$ and $\dfrac{p}{n} \rightarrow 0$, by squeeze theorem, $a_n \rightarrow 0$.

Therefore, $\lim_{n \rightarrow \infty} \sqrt[n]{p} = \lim_{n \rightarrow \infty} (1 + a_n) = 1$.

**Proof (c)**

Let $x_n = \sqrt[n]{n} - 1 > 0$ for $n \in \mathbb{N}$.

By the binomial theorem,

$$
n = (x_n + 1)^n
= 1 + nx_n + \dfrac{n(n-1)}{2}x_n^2 + \dots + x_n^n
\geq \dfrac{n(n-1)}{2}x_n^2
$$

for all $n \geq 2$.

Since $0 < x_n < \sqrt{\dfrac{2}{n-1}}$ for all $n \geq 2$ and $\lim_{n \rightarrow \infty} \sqrt{\dfrac{2}{n-1}} = 0$, by squeeze theorem, $x_n \rightarrow 0$.

Therefore, $\lim_{n \rightarrow \infty} \sqrt[n]{n} = \lim_{n \rightarrow \infty} (1 + x_n) = 1$.

## 3. Monotone Sequences

In this section, we will consider monotone sequences of real numbers. One of the advantages of such sequences is that they will either converge tn $\mathbb{R}$, or diverge to $+\infty$ or $-\infty$.

>**[Definition 3.3.1]** \
>A sequence $a_n$ of real numbers is said to be \
>(a) monotone increasing (or nondecreasing) if $a_n \leq a_{n+1}$ for all $n \in \mathbb{N}$; \
>(b) monotone decreasing (or nonincreasing) if $a_n \geq a_{n+1}$ for all $n \in \mathbb{N}$; \
>(c) monotone if it is either monotone increasing or monotone decreasing.

A sequence $a_n$ is strictly increasing if $a_n < a_{n+1}$ for all $n \in \mathbb{N}$. A sequence $a_n$ is strictly decreasing if $a_n > a_{n+1}$ for all $n \in \mathbb{N}$.

>**[Theorem 3.3.2]** \
>If $a_n$ is monotone and bounded, then $a_n$ converges.

### Nested Intervals Property

>**[Corollary 3.3.3] (Nested Intervals Property)** \
>If $I_n$ is a sequence of closed and bounded intervals with $I_n \supset I_{n+1}$ for all $n \in \mathbb{N}$, then \
>$\cap_{n=1}^{\infty} I_n \neq \emptyset$.

### Euler's Number $\mathbb{e}$

굉장히 아름다운 부분이다.

>**[Example 3.3.5]** \
>We consider in detain the very important sequence $t_n = (1 + \dfrac{1}{n})^n$. \
>We will show that the sequence $t_n$ is monotone increasing and bounded above, and thus has a limit. \
>The standard notation for this limit is $\mathbb{e} = \lim_{n \to \infty} (1 + \dfrac{1}{n})^n$.

### Infinite Limits

먼저 무한대로 발산을 엄밀하게 정의한다. 정의역에서 존재성을 가지고 정의하면 진술이 편해진다. 

>**[Definition 3.3.6]** \
>Let $a_n$ be a sequence of real numbers. \
>We say that $a_n$ approaches infinity, or that $a_n$ diverges to $\infty$, denoted $a_n \rightarrow \infty$, \
>if for every positive real number $M$, there exists an integer $n_0 \in \mathbb{N}$ such that $a_n > M$ for all $n \geq n_0$.

>**[Theorem 3.3.7]** \
>If $a_n$ is monotone increasing and not bounded above, then $a_n \rightarrow \infty$ as $n \rightarrow \infty$.

## 4. Subsequences and the Bolzano-Weierstrass Theorem

In this section, we will consider subsequences and subsequential limits of a given sequence of real numbers. One of the key results of the section is that every bounded sequence of real numbers bas a convergent subsequence. This result, also known as the sequential version of the Bolzano Weierstrass theorem, is one of the fundemental results of real analysis.

>**[Definition 3.4.1]** \
>Let $(X, d)$ be a metric space. \
>Given a sequence $p_n$ in $X$, consider a sequence $n_k$
>of positive integers such that $n_1 < n_2 < n_3 < \dots$. \
>Then the sequence $p_{n_k}$ is called a subsequence of the sequence $p_n$.

A point $p \in X$ is a subsequential limit of the sequence $\{p_n\}$ is there exists a subsequence $\{p_{n_k}\}$ of $\{p_n\}$ that converges to p. Also, given a sequence $\{p_n\}$ in $\mathbb{R}$, we say that $\infty$ is a subsequential limit of $\{p_n\}$ if there exists a subsequence $\{p_{n_k}\}$ so that $\{p_{n_k}\} \rightarrow \infty$ as $k \rightarrow \infty$. Similarly for $-\infty$.

>**[Theorem  3.4.3]** \
>Let $(X, d)$ be a metric space and let $\{p_n\}$ be a sequence in $X$. \
>If $\{p_n\}$ converges to $p$, then every subsequence of $\{p_n\}$ also converges to $p$.

>**[Corollary 3.4.6] (Bolzano-Weierstrass)** \
>Every bounded sequence in $\mathbb{R}$ has convergent subsequence.

## 5. Limit Superior and Inferior of a Sequence

In this section, we define the limit superior and limit inferior of a sequence of real numbers.

These two limit operations are important because unlike the limit of a sequence, the limit superior and limit inferior of a sequence always exist.

The concepts of the limit superior and limit inferior will also be important in our study of both series of real numbers and power series.

>**[Definition 3.5.1]** \
>Let $s_n$ be a sequence in $\mathbb{R}$. \
>The limit superior of $s_n$, denoted $\varlimsup_{n \to \infty} s_n$ or $\varlimsup s_n$ , is defined as
>$$\varlimsup_{n \to \infty} s_n = \lim_{n \to \infty} b_k = \inf_{k \in N} \sup \{s_n : n \geq k\}$$
>The limit inferior of $s_n$, denoted $\varliminf_{n \to \infty} s_n$ or $\varliminf s_n$, is defined as
>$$\varliminf_{n \to \infty} s_n = \lim_{n \to \infty} a_k = \sup_{k \in N} \inf \{s_n : n \geq k\}$$

>**[Theorem 3.5.3]** \
>Let $s_n$ be a sequence in $\mathbb{R}$. \
>(a) Suppose $\varlimsup_{n \to \infty} s_n \in \mathbb{R}$. Then $\beta = \varlimsup_{n \to \infty} s_n$ if and only if for all $\epsilon > 0$ \
>(i) there exists $n_0 \in \mathbb{N}$ such that $s_n < \beta + \epsilon $ 
>for all $n \geq n_0$, and \
>(ii) given $n \in \mathbb{N}$, there exists $k \in \mathbb{N}$ with $k \geq n$ such that $s_k > \beta + \epsilon$. \
>(b) \
>(c)

>**[Corollary 3.3.3]** \
>$\varlimsup_{n \to \infty} s_n = \varliminf_{n \to \infty} s_n$ if and ony if $\lim_{n \to \infty}$ exists in $\mathbb{R} \cup \{-\infty, \infty\}$.

## 6 Cauchy Sequences

## 7 Series of Real Numbers

## Reference

Manfred - Introduction to Real Analysis : Ch03
