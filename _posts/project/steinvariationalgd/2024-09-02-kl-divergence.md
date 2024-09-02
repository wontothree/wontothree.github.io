---
title: "[Stein Variational GD] Entropy, Cross-Entropy, KL-Divergence"
categories:
  - steinvariationalgd
---
# 정보량

확률이 낮을수록 정보량이 높다. 즉, 정보량은 확률에 반비례한다.

**Definition**

이산 랜덤 변수 $X$에 대해

$$
I(x) = - \log_b(P(X)) = \log_b{\dfrac{1}{P(X)}}
$$

여기서 로그의 밑 $b$는 응용 분야에 따라 다르게 사용되며, 대부분 $2, e, 10$ 중 하나가 사용된다. (bit, bit, dit)

정보량을 정의할 때 왜 $\log$ 를 사용하며, 왜 이렇게 정의할까?

1. 확률값 (혹은 확률 밀도 값)에 반비례한다.
2. 두 사건의 정보량을 더하면 각 사건의 정보량을 합친 것과 같아야 한다.

# Entropy

# Cross-Entropy

# Kullback-Leibler Divergence

- 두 확률분포의 차이를 계산하는 데 사용하는 함수
- 어떤 이상적인 분포에 대해 그 분포를 근사하는 다른 분포를 사용해 샘플링을 한다면 발생할 수 있는 정보 엔트로피 차이를 계산한다.

두 확률분포 P, Q에 대한 Kullback-Leibler divergence의 정의

이산확률분포

$$
D_{KL} = (P \vert \vert Q) = \sum_i P(i) log \left[ \dfrac{P(i)}{Q(i)} \right]
$$

연속확률분포

$$
D_{KL} = (P \vert \vert Q) = \int_{-\infty}^{\infty} p(x) \left[ \dfrac{P(i)}{Q(i)} \right] dx
$$

$p, q$ : 두 확률분포의 확률밀도함수

# Reference

- [[Wikipedia] Kullback–Leibler divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)
- [KL divergence](https://angeloyeo.github.io/2020/10/27/KL_divergence.html)
- [[Youtube] 엔트로피, 크로스-엔트로피, KL-divergence, Mutual information](https://www.youtube.com/watch?v=z1k8HVU4Mxc)
- [[Youtube] Intuitively Understanding the KL Divergence](https://www.youtube.com/watch?v=SxGYPqCgJWM)
- [[Youtube] KL-Divergence를 여행하는 히치하이커를 위한 안내서](https://www.youtube.com/watch?v=Ymehhn427EY)
