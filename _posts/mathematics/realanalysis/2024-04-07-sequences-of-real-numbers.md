---
title: "[Real Analysis] Sequences of Real Numbers"
excerpt: "Manfred - Introduction to Real Analysis : Ch03"
categories:
  - realanalysis
toc: true
toc_icon: star
share: false
use_math: true
---
We begin with limits of sequences.

Some of the concepts and results included in this chapter have been encountered in the study of calculus.

Our presentation will be considerably more rigorous - emphasizing proofs rather than computation.

## 1 Convergent Squences

>**[DEFINITION 3.1.1]** \
>A Sequence $ \{p_n \}$  in $X$ is said to **converge** if there exists a point $p \in X$ such that for every $\epsilon > 0$, there exists a positvie integer $n_0 = n_0(\epsilon)$ such that $p_n \in N_\epsilon (p)$ for all $n \geq n_0$. If this is the case, we say that $\{ p_n \}$ converges to $p$. \
>In the definition, the statement $p_n \in N_{\epsilon}(p)$ for all $n \geq n_0$ is equivalent to $d(p_n, p) < \epsilon$ for all $n \geq n_0$.

>**[DEFINITION 3.1.3]** \
> A sequence $\{p_n\}$ in X is said to be **bounded** if there exists $p \in X$ and a positvie constant $M$ such that $d(p, p_n) \leq M$ for all $n \in \mathbb{N}$.

>**[THEOREM 3.1.4]** \
>Let $(X, d)$ be a metric space. \
>(a) If a sequence $ \{p_n\}$ in $X$ converges, then its limit is unique. \
>(b) Every convergent sequence in $X$ is bounded. \
>(c) If $E \subset X$ and $p$ is a limit point of $E$, then there exists a sequence $\{p_n\}$ in $E$ with $p_n \neq p$ for all $n$ such that $\lim_{n \rightarrow \infty} \{p_n\} = p$.

Proof (a)

We will prove it using proof by contradiction.

Suppose that the sequence $p_n$ converges to two distinct points $p, q \in X$.

Let $\epsilon = \dfrac{1}{3} d(p, q)$.

Since $p_n \rightarrow p$, $\exists n_1 \in \mathbb{N}$ s.t. $|p_n - p| < \epsilon$ $\forall n \geq n_1.$

Also, since $p_n \rightarrow p$, $\exists n_2 \in \mathbb{N}$ s.t. $|p_n - q| < \epsilon$ $\forall n \geq n_2.$

Thus if $n \geq max(n_1, n_2)$, by triangule inequality, $d(p, q) \leq d(p_n, p) + d(p_n, q) < 2 \epsilon = \dfrac{2}{3} d(p, q)$, which is a contradiction.

Thereofre, $p = q$ and the sequence $p_n$ converges to unique point.

Proof (b)

## 2 Sequences of Real Numbers

We will emphasize some of the important properties of sequences of real numbers, and also investigate the limites of several basic sequences that are frequently encountered in the analysis.

>**[THEOREM 3.2.1]** \
>If $\{ a_n \}$ and $\{ b_n \}$ are convergent sequences of real numbers with $\lim_{n \rightarrow \infty} a_n= a$ and $\lim_{n \rightarrow \infty} b_n= b$, \
>then \
>(a) $\lim_{n \rightarrow \infty} (a_n + b_n) = a + b$, and \
>(b) $\lim_{n \rightarrow \infty} a_nb_n= ab$. \
>(c) Futhermore, if $a \neq 0$, and $a_n \neq 0$ for all $n$, then $\lim_{n \rightarrow \infty} \dfrac{b_n}{a_n}= \dfrac{b}{a}$.

>**[COROLLARY 3.2.2]** \
>If $\{ a_n \}$ is a convergent sequence of real numbers with $\lim_{n \rightarrow \infty} a_n= a$, then for any $c \in \mathbb{R}$, \
>(a) $\lim_{n \rightarrow \infty} (a_n + c)= a + c$, and \
>(b) $\lim_{n \rightarrow \infty} c\;a_n= c\;a$.

>**[THEOREM 3.2.3]** \
>Let $\{ a_n \}$ and $\{ b_n \}$ be a sequences of real numbers. If $\{ b_n \}$ is bounded and $\lim_{n \rightarrow \infty} a_n= 0$, then
>$\lim_{n \rightarrow \infty} a_n b_n= 0$

>**[THEOREM 3.2.4]** squeeze theorem \
>Suppose $\{a_n\}$, $\{b_n\}$, and $\{c_n\}$ are sequences of real numbers for which there exists $n_0 \in \mathbb{N}$ such that $a_n \leq b_n \leq c_n$ for all $n \in \mathbb{N}$, $n \geq n_0$, \
>and that $\lim_{n \rightarrow \infty} a_n= \lim_{n \rightarrow \infty} b_n = L$. \
>Then the sequence $\{b_n\}$ converges and $\lim_{n \rightarrow \infty} b_n = L$

### Some special Sequences

>**[THEOREM 3.2.5]** (Binomial Theorem) \
>For $a \in \mathbb{R}$, $n \in \mathbb{N},$ \
>$(1 + a)^n = \sum_{k=0}^n \dots$

>**[THEOREM 3.2.6]** \
>(a) If $p > 0$, then $\lim_{n \rightarrow \infty} \dfrac{1}{p^n} = 0$. \
>(b) If $p > 0$, then $\lim_{n \rightarrow \infty} \sqrt[n]{p} = 1$. \
>(c) $\lim_{n \rightarrow \infty} \sqrt[n]{n} = 1$ \
>(d) If $p > 1$ and $\alpha$ is real, then $\lim_{n \rightarrow \infty} \dfrac{n^\alpha}{p^n} = 0$. \
>(e) If $|p| < 1$, then $\lim_{n \rightarrow \infty} p^n = 0$. \
>(f) For all $p \in \mathbb{R}$, $\lim_{n \rightarrow \infty} \dfrac{p^n}{n!} = 0$.

## 3 Monotone Sequences

## 4 Subsequences and the Bolzano- Weierstrass Theorem

## 5 Limit Superior and Inferior of a Sequence

## 6 Cauchy Sequences

## 7 Series of Real Numbers
