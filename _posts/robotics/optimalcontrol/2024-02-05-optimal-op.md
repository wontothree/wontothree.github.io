---
title: "[Optimal Control] 랩미팅"
excerpt:
categories:
  - optimalcontrol
---
$$
x_{k+1} = Ax_k + Bu_k
$$

optimal input sequence를 구해야 한다.

$$
\min
$$

두 가지 constraint가 있다.

$$
x_{i+1\vert k} = A x_{i \vert k} + Bu_{i \vert k}
$$

무한한 optimal control problem을 유한한 optimal control problem으로 바꾼다.

dual-mode framework를 이용한다.

- mode 1 : 0~N-1 -> optimization variables을 사용한다.
- mode 2 : LQR을 통해 예측한다.

- Q. 두 개의 constraint 중 역학식과 관계 없는 식은 어디서 나온 건가요?
- Q. mode 2는 왜 LQR로 예측하나요?

$$
k = N //

x_{N \vert k} = x_{N \vert k}
\\
u_{N \vert k} = k x_{N \vert k}
\\
i = N + 1
\\
x_{N+1 \vert k} = Ax_{N \vert k} + B u_{N \vert k } = (A + BK) x_{N \vert k}
\\
u_{N+1 \vert k} = k(A + Bk) x_{N \vert k}
$$

$x_{N \vert k}$만 알면 그 이후의 모든 것을 알 수 있다.

현재는 $i=0$이다.

N은 마음대로 설정할 수 있다.

- Q. mode 1과 2를 나누는 이유가 무엇인가?
- A. 0부터 무한까지 합을 구하려고 했는데 그것이 불가능하기 떼문에 N부터 무한까지는 LQR로 해결한다.

MPC가 내뱉는 것은 $u_{0 \vert k}$이다. 이것만을 제어 입력으로 사용한다.

그 현상을 이해하는 관점을 이렇게 바라보겠다.

최종적으로는 다음과 같은 문제를 풀 것이다.

$$
\min J = \sum_{i=0}^{N-1} x^T_{i \vert k} Q x_{i \vert k} + u^T_{i \vert k}R u_{i \vert k} + x^T_{N \vert k}Px_{N \vert k}
$$

- $x_{i+1 \vert k} = Ax_{i \vert k} + Bu_{i \vert k}, i = 0, 1, \dots, N-1$
-$Fx_{i \vert k}$

- 모델의 불확실성을 고려하지 않는다.
- 상태변수를 정확하게 측정할 수 있다고 가정한다.

LQR 문제도 constraint를 만족해야 한다.

- terminal cost : mode 2가 constraint를 만족하도록 하는 동치 조건

IH-OCP의 문제를 우리는 풀어야 한다.

2개의 constraint을 만족시켜야 한다.

$x_{0 \vert k}$가 어디에 있는지를 알아야 한다.

$x_{N \vert k}$가 terminal set 안에 있다고 가정한다.

그러면 mode 2 problem의 해는 LQR 문제의 해와 동일하다.

그것을 보이려면  input/output constraint을 고려하지 않고 푼 후에 그 해가 input/output constraint 안에 존재한다는 것을 보이면 된다.

결론 : $x_{N \vert k}$가 terminal set 안에 있으면 state/input constrint를 고려하지 않아도 된다.

모든 상태 변수에 대해 $x_N \in X_T$가 보장되어야 한다.

그러면 $u^*_k = K^*x_k$가 만족된다.

상태변수모델 constraint은 LQR에서 고려되었다.

그러면 terminal cost를 어떻게 찾을 수 있을까?

LQR의 최적의 값은 다음의 꼴이라는 것이 알려져 있다.

$$
x^T_{N \vert k} P x_{N \vert k}
$$

finite 문제가 되었지만 사실상 무한대까지의 합 문제와 동일하다.

10page

우리는 terminal set을 찾아야 한다.

terminal set을 다음과 같이 잡으면 된다.

$$
X_T = \left[ x \vert (F + GK)(A + BK)^i x \leq 1, i = 0, 1, \dots\right]
$$

이 조건도 무한에 대한 조건이기 떼문에 계산 불가능하다.

Thm1을 이용해서 유한에 대한 조건으로 바꾼다.

$$
x_T^{(v)} = \left[ x \vert (F + GK)(A + BK)^i x \leq 1, i = 0, 1, \dots, v \right]
$$

## MPC for FH-OCP

- step 1 : measure current state $x_k$ and set initial constraint $x_{0 \vert k} = x_k$
- step 2 : solve FH-OCP
- step 3 : apply $u_k = u^*_{0 \vert k}$ in 

## Recursive Feasibility

- application에서는 다루지 않을 때도 있다.
- 세 가지 constraint를 만족하는 input sequence가 존재하는가?

만약 다음을 만족하면 존재

$$
X_F = \left[ x_0 \vert \exists u_0, \dots, u_{N-1} \right] \dots
$$

- Optimal sequence : 0부터 무한
- Tail sequence : 1부터 무한

$$
x_{0 \vert k+1} = x_{ 1 \vert k}
$$

application에서는 10page에서 빨간색 항을 고려하지 않을 때도 있다.₩

N이 충분히 크면 finite horizon 문제가 infinite horizon 문제와 유사하기 때문이다.