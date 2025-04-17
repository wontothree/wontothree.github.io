---
title: "[Paper] RL for Trading Cryptocurrency"
categories:
  - paper
---
Markov Decision Process

State

$$
s_t = [b_t, \bm{h}_t, \bm{p}_t \bm{f}_t] \in \mathbb{R}^{1 + (I + 2) D}
$$

- $b_t \in \mathbb{R}_+$ : cash amount in the account
- $\bm{h}_t \in \mathbb{R}_+^D$ : share holdings
- $\bm{p}_t \in \mathbb{R}_+^D$ : prices at time $t$
- $\bm{f}_t \in \mathbb{R}^{I \cdot D}$ : feature vector for $D$ cryptocurrencies and each has $I$ technial indicators

$\mathbb{R}_+$ : non-negative real numbers
