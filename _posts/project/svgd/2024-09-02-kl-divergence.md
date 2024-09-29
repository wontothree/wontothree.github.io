---
title: "[Stein Variational GD] Entropy, Cross-Entropy, KL-Divergence"
categories:
  - svgd
---
- Information Content : 단일 사건에 대한 정보량
- Entropy : 확률분포의 정보량
- Cross-Entropy : 두 확률분포를 구분하기 위해 필요한 평균 정보량
- Kullback-Leibler Divergence

# Information Content

확률이 낮을수록 정보량이 높다. 즉, 정보량은 확률에 반비례한다.

이산 랜덤 변수 $X$에 대해 정보량은

$$
I(x) = \log_b{\dfrac{1}{P(X)}} = - \log_b(P(X))
$$

여기서 로그의 밑 $b$는 응용 분야에 따라 다르게 사용되며, 대부분 $2, e, 10$ 중 하나가 사용된다. (bit, nit, dit)

# Entropy

Entropy는 한 확률분포의 평균 정보량 또는 사건을 표현하기 위해 요구되는 평균 자원이다.

$$
\begin{align*}
  H(x) &= E_{P(X)} \left[ I(x) \right] \\
  &= E_{P(X)} \left[ - \log P(X) \right] \\
  &= \sum_{i=1}^N -P(x_i) \log P(x_i) \\
\end{align*}
$$

다음의 X와 Y에 대한 두 확률분포 중에 어떤 확률분포의 entropy가 클까?

|$X$|1|2|3|4|
|---|---|---|---|---|
|$P(X)$|$\dfrac{1}{4}$|$\dfrac{1}{4}$|$\dfrac{1}{4}$|$\dfrac{1}{4}$|

|$Y$|1|2|3|4|
|---|---|---|---|---|
|$P(Y)$|$\dfrac{1}{2}$|$\dfrac{1}{4}$|$\dfrac{1}{8}$|$\dfrac{1}{8}$|

$$
\begin{align*}
  H(X) &= \sum_{i=1}^4 -P(x_i) \log P(x_i) \\
  &= -P(1)\log P(1) - P(2)\log P(2) - P(3)\log P(3) - P(4)\log P(4) \\
  &= - \dfrac{1}{4} \log_2 \dfrac{1}{4} - \dfrac{1}{4} \log_2 \dfrac{1}{4} - \dfrac{1}{4} \log_2 \dfrac{1}{4} - \dfrac{1}{4} \log_2 \dfrac{1}{4} \\
  &= 2
  \\
  H(Y) &= - \dfrac{1}{2} \log_2 \dfrac{1}{2} - \dfrac{1}{4} \log_2 \dfrac{1}{4} - \dfrac{1}{8} \log_2 \dfrac{1}{8} - \dfrac{1}{8} \log_2 \dfrac{1}{8} \\
  &= 1.75
\end{align*}
$$

확률분포 X를 나타내기 위해 필요한 최소 평균 자원 수는 2bit이고, 확률분포 Y를 나타내기 위해 필요한 최소 평균 자원 수는 1.75bit이다. 여기서는 log의 밑을 2로 사용했기 때문에 bit로 표현된다.

또한 uniform한 분포일수록 엔트로피가 크다는 것을 확인할 수 있다.

# Cross-Entropy

Cross Entropy는 두 확률분포 간의 차이를 측정하는 메트릭이다.

머신러닝의 classification 문제에서 실제 확률 뷴포와 모델이 예측한 확률 분포 간의 차이를 수치화하여 모델의 성능을 평가하는 데 사용된다. Cross Entropy 값이 작을수록 두 확률분포가 유사하다고 해석할 수 있으므로 이를 통해 최적의 모델 파라미터를 찾는다. 목적 함수를 최소화하는 과정에서 cross-entropy가 사용되기도 한다.

예측 결과 Q와 정답 P에 대해 cross entropy는 다음과 같다.

$$
\sum_{x \in \mathcal{X}} - P(x) \log (Q(x))
$$

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
- [cross-entropy](https://wikidocs.net/157190)
- [[Youtube] 엔트로피, 크로스-엔트로피, KL-divergence, Mutual information](https://www.youtube.com/watch?v=z1k8HVU4Mxc)
- [[Youtube] Intuitively Understanding the KL Divergence](https://www.youtube.com/watch?v=SxGYPqCgJWM)
- [[Youtube] KL-Divergence를 여행하는 히치하이커를 위한 안내서](https://www.youtube.com/watch?v=Ymehhn427EY)
