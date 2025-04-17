---
title: "[Generative AI] Variational Autoencoder"
categories:
  - paper
---
관련 지식

- MLE
- KLD
- Monte Carlo Method
- VAE

# 1. Maximum Likelihood Estimation

매개변수가 theta라면 데이터 x를 얻을 수 있는 확률 밀도를

$$
p_{\theta}(x)
$$

라고 하자. 그리고 각 데이터는 확률분포에 따라 독립적으로 생성된다고 가정하자. 그러면 샘플 D를 얻을 수 있는 확률 밀도는

$$
p_{\theta}(\mathcal{D}) = \prod_{n=1}^{N} p_{\theta}(x^{(n)})
$$

MLE는 가능도를 최대화하는 매개변수 theta를 찾는 기법이다. 예컨대 가장 가능도를 최대화하는 매개변수를

$$
\hat{\theta}
$$

라고 하면, 매개변수가 \hat{\theta}일 때 샘플이 관찰될 확률이 가장 높다. 즉, \hat_{\theta}일 때 모델이 샘플에 가장 잘 맞는다는 뜻이다.

MLE는 계산의 편의성을 위해 실제로 가능도가 아니라 로그 가능도를 최대화한다. 수학적으로 다음과 같이 나타낼 수 있다.

$$
\begin{align*} \hat{\theta} &= \underset{\theta}{\mathrm{\argmax}} \; p_{\theta}(\mathcal{D}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \log_e p_{\theta}(\mathcal{D})\end{align*}
$$

## Monte Carlo Method

몬테카를로 방법: 무작위 샘플을 생성하여 복잡한 확률 분포나 기댓값 등의 근삿값을 계산하는 방법. 무작위로 생성된 샘플을 이용해 문제를 시뮬레이션하고, 그 샘플에서 구한 결과의 평균을 취해 문제의 해답을 근사한다.

임의의 함수 f(x)에 대해 몬테카를로 방법을 사용하여 기댓값을 구하는 방법은 다음과 같다.

1. 확률 분포 p_*(x)에 따라 샘플 [x^{(1)}, x^{(2)}, \dots, x^{(N)}]을 독립적으로 생성한다.
2. 각 데이터 x^{(i)}에서 f(x^{(i)})을 구하고 그 평균을 구한다.

수학적으로 표현하면 다응과 같다.

$$
\begin{align*} \mathbb{E}_{p_{*}(x)} [f(x)] &= \int p_{*}(x) f(x) \; dx \\ &\approx \dfrac{1}{N} \sum_{n=1}^N f(x^{(n)}) \;\;\;\;\;(x^{(n)} \sim p_{*}(x)) \end{align*}
$$

## KLD와 MLE의 관계

KLD를 이용해서 MLE의 최적화 문제를 유도할 수 있음을 알아보자.

모집단 분포

$$
p_{*}(x)
$$

가 있고, 샘플 데이터

$$
[x^{(1)}, x^{(2)}, \dots, x^{(N)}]
$$

을 생성했다고 가정하자. 우리의 목표는 매개변수 theta를 조정할 수 있는 확률 분포

$$
p_{\theta}(x)
$$

를 사용하여 모집단 분포

$$
p_{*}(x)
$$

에 최대한 가까운 확률 분포를 만드는 것이다.

핵심 아이디어는 ‘

$$
p_{\theta}(x)
$$

를

$$
p_{*}(x)
$$

에 최대한 가깝게 만든다’를 ‘

$$
p_{\theta}(x)
$$

와

$$
p_{*}(x)
$$

의 KL 발산을 최소화한다’로 바꾸어 표현할 수 있다는 것이다. 수학적으로 다음과 같이 표현한다.

$$
D_{\text{KL}}(p_{*} \; \vert\vert \; p_{\theta}) = \int p_{*}(x) \log \dfrac{p_{*}(x)}{p_{\theta}{(x)}} dx
$$

$$
f(x) = \log \dfrac{p_{*}(x)}{p_{\theta}(x)}
$$

라 두고 몬테카를로 방법을 적용하자.

$$
\begin{align*} D_{\text{KL}}(p_{*} \; \vert\vert \; p_{\theta}) &= \int p_{*}(x) \log \dfrac{p_{*}(x)}{p_{\theta}{(x)}} dx \\ &\approx \dfrac{1}{N} \sum_{n=1}^{N} \log \dfrac{p_{*}(x)}{p_{\theta} {(x)}} \;\;\;\;\;(x^{(n)} \sim p_{*}(x)) \\ &= \dfrac{1}{N} \sum_{n=1}^{N} \left( \log p_{*}(x^{(n)}) - \log p_{\theta}(x^{(n)}) \right) \end{align*}
$$

따라서 

$$
\begin{align*} \hat{\theta} &= \underset{\theta}{\mathrm{\argmin}} \; D_{\text{KL}}(p_{*} \; \vert\vert \; p_{\theta}) \\ &\approx \underset{\theta}{\mathrm{\argmin}} \; \dfrac{1}{N} \sum_{n=1}^{N} \left( \log p_{*}(x^{(n)}) - \log p_{\theta}(x^{(n)}) \right) \\ &= \underset{\theta}{\mathrm{\argmin}} \; -\dfrac{1}{N} \sum_{n=1}^{N} \log p_{\theta}(x^{(n)}) \\ &= \underset{\theta}{\mathrm{\argmin}} \; -\sum_{n=1}^{N} \log p_{\theta}(x^{(n)}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \log p_{\theta}(x^{(n)}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \log p_{\theta}(\mathcal{D})\end{align*}
$$

KLD가 최소가 되는 theta는 MLE가 최대가 되는 theta와 일치한다는 것을 알 수 있다.

# 2. Variational Autoencoder

임의의 함수 q(z)에 대해 MLE의 최적화 문제를 다음과 같이 전개하자.

$$
\begin{align*} \hat{\theta} &= \underset{\theta}{\mathrm{\argmax}} \; \log p_{\theta}(\mathcal{D}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \log p_{\theta}(x^{(n)}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \left( \int q(z) dz \right) \log p_{\theta}(x^{(n)}) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \int q(z) \log p_{\theta}(x^{(n)}) dz  \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \int q(z) \log \dfrac{p_{\theta}(x^{(n)}, z)}{p_{\theta}(z \; | \; x^{(n)})} dz \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \int q(z) \log \dfrac{p_{\theta}(x^{(n)}, z)}{p_{\theta}(z \; | \; x^{(n)})} \dfrac{q(z)}{q(z)} dz \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \left( \int q(z) \log \dfrac{p_{\theta}(x^{(n)}, z)}{q(z)} dz + \int q(z) \log \dfrac{q(z)}{p_{\theta}(z \; | \; x^{(n)})} dz \right) \\ &= \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \left( \int q(z) \log \dfrac{p_{\theta}(x^{(n)}, z)}{q(z)} dz + D_{\text{KL}}(q(z) \; \vert\vert \; p_{\theta}(z | x^{(n)})) \right) \\ &\geq \underset{\theta}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \int q(z) \log \dfrac{p_{\theta}(x^{(n)}, z)}{q(z)} dz \\ \end{align*}
$$

우리는 직접 계산할 수 없는 log p 대신 해석적으로 계산할 수 있는 ELBO를 최적화의 대상으로 삼는다.

## Encoder and Decoder

decoder

$$
\begin{align*} p(z) &= \mathcal{N}(z; \mathbf{0}, \mathbf{I}) \\ \hat{x} &= \text{NeuralNet}(z; \theta) \\ p_{\theta}(x^{(n)} \vert z) &= \mathcal{N}(x; \hat{x}, \mathbf{I}) \end{align*}
$$

우리는 encoder의 일부인 신경망을 도입한다. 이 신경망의 입력은 x이고 출력은 mu, Sigma이며, 신경망의 매개변수는 Pi이다. 잘 학습된 신경망은 x^{(n)}에 적합한 mu^{(n)}, Sigma^{(n)}을 출력한다. (amortized inference)

- encoder: 관찰된 데이터를 잠재변수로 변환한다.

VAE의 encoder가 수행하는 일은 다음 식으로 표현할 수 있다.

$$
\begin{align*} \mu, \sigma &= \text{NeuralNet}(x; \phi) \\ q_{\phi}(z \; | \; x^{(n)}) &= \mathcal{N}(z; \mu, \sigma^2\mathbf{I}) \end{align*}
$$

우리의 목표는 이 두 신경망을 사용한 모델에서 로그 가능도를 최대화하는 매개변수 theta, psi를 찾는 것이다. 하지만 로그 가능도 자체를 직접 계산할 수 없으므로 대산 다음과 같이 ELBO를 최대화한다. 임의의 함수 q(z)를 다음과 같이 선택한다.

$$
q(z) = q_{\phi}(z | x^{(n)})
$$

## Object Function

$$
\begin{align*} \sum_{n=1}^{N} \text{ELBO}(x^{(n)}; \; \theta, \phi) = \sum_{n=1}^{N} \int q_{\phi}(z | x^{(n)}) \log \dfrac{p_{\theta}(x^{(n)}, z)}{q_{\phi}(z | x^{(n)})} dz \\ \end{align*}
$$

## Optimization Problem*

$$
\begin{align*} \theta, \phi &= \underset{\theta, \; \phi}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \text{ELBO}(x^{(n)}; \; \theta, \phi) \\ &= \underset{\theta, \; \phi}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \int q_{\phi}(z | x^{(n)}) \log \dfrac{p_{\theta}(x^{(n)}, z)}{q_{\phi}(z | x^{(n)})} dz \\ &\approx \underset{\theta, \; \phi}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \left[ -\dfrac{1}{2} \sum_{d=1}^D (x_d - \hat{d}_d)^2 -\dfrac{1}{2} \sum_{h=1}^{H} (1 + \log \sigma_{h}^2 - \mu_{h}^2 - \sigma_{h}^2) + \text{const} \right] \\ &= \underset{\theta, \; \phi}{\mathrm{\argmax}} \; \sum_{n=1}^{N} \left[ -\dfrac{1}{2} \sum_{d=1}^D (x_d - \hat{d}_d)^2 -\dfrac{1}{2} \sum_{h=1}^{H} (1 + \log \sigma_{h}^2 - \mu_{h}^2 - \sigma_{h}^2) \right] \end{align*}
$$

## ELBO

$$
\begin{align*} \text{ELBO}(x; \; \theta, \phi) &= \int q_{\phi}(z | x) \log \dfrac{p_{\theta}(x, z)}{q_{\phi}(z | x)} dz \\ &= \int q_{\phi}(z | x) \log \dfrac{p_{\theta}(x \vert z) p(z)}{q_{\phi}(z \vert x)} dz \\ &= \int q_{\phi}(z | x) \log p_{\theta}(x \vert z) dz + \int q_{\phi}(z | x) \log \dfrac{ p(z)}{q_{\phi}(z \vert x)} dz \\ &= \int q_{\phi}(z | x) \log p_{\theta}(x \vert z) dz - \int q_{\phi}(z | x) \log \dfrac{q_{\phi}(z \vert x)}{p(z)} dz \\ &= \mathbb{E}_{q_{\phi}(z | x)}[\log p_{\theta}(x \vert z)] - D_{\text{KL}}(q_{\phi}(z \vert x) \; \vert\vert \; p(z)) \\ \end{align*}
$$

여기서

$$
\begin{align*} \mathbb{E}_{q_{\phi}(z | x)}[\log p_{\theta}(x \vert z)] &\approx \log \mathcal{N}(x; \hat{x}, \mathbf{I}) \\ &= \log \left( \dfrac{1}{\sqrt{(2\pi)^D \vert \mathbf{I} \vert}} \exp \left( -\dfrac{1}{2}(x - \hat{x})^\top \mathbf{I}^{-1} (x - \hat{x})
  \right) \right) \\ &= -\dfrac{1}{2}(x - \hat{x})^\top (x - \hat{x}) + \log \dfrac{1}{\sqrt{(2\pi)^D}} \\ &= -\dfrac{1}{2} \sum_{d=1}^D (x_d - \hat{d}_d)^2 + \text{const} \end{align*}
$$

이고

$$
\begin{align*} D_{\text{KL}}(q_{\phi}(z \vert x) \; \vert\vert \; p(z)) &= D_{\text{KL}}(\mathcal{N}(z; \mu, \sigma^2\mathbf{I}) \; \vert\vert \; \mathcal{N}(z; \mathbf{0}, \mathbf{I})) \\ &= -\dfrac{1}{2} \sum_{h=1}^{H} (1 + \log \sigma_{h}^2 - \mu_{h}^2 - \sigma_{h}^2) \end{align*}
$$

따라서 ELBO는 다음과 같이 계산할 수 있다.

$$
\begin{align*} \text{ELBO}(x; \; \theta, \phi) &= \mathbb{E}_{q_{\phi}(z | x)}[\log p_{\theta}(x \vert z)] - D_{\text{KL}}(q_{\phi}(z \vert x) \; \vert\vert \; p(z)) \\ &\approx -\dfrac{1}{2} \sum_{d=1}^D (x_d - \hat{d}_d)^2 -\dfrac{1}{2} \sum_{h=1}^{H} (1 + \log \sigma_{h}^2 - \mu_{h}^2 - \sigma_{h}^2) + \text{const} \end{align*}
$$

# Reference

- Auto-Encoding Variational Bayes
