---
title: "[Nonlinear System] Ch02 Phase Plane Analysis"
excerpt: Jean-Jacques E.Slotine Weiping Li - Applied Nonlinear Control
categories:
  - NLS
toc: true
use_math: true
---
## 1. Concepts of Phase Plane Analysis

## 2. Constructing Phase Portraits

- Analytical method
- The mthod of isoclines
- The delta method
- Lienard's method
- Pell's method 

### Analytical method

주어진 시스템에 대한 수식이 다음과 같이 표현될 수 있다면, 여기서는 analytic 하게 서술된 것이라고 본다.

$$
g(x_1, x_2, c) = 0
$$

**Example 2.4 : Mass-spring system**

Since $\ddot{x} = \dfrac{d\dot{x}}{dt} = \dfrac{d\dot{x}}{dx} \cdot \dfrac{dx}{dt} = \dot{x}\dfrac{d\dot{x}}{dx}$,

$$
0 = \ddot{x} + x = \dot{x}\dfrac{d\dot{x}}{dx} + x
\\
\dot{x} d\dot{x} + x dx = 0
$$

Since $x = x_0\sin t, \dot{x} = x_0\cos t$,

$$
\dfrac{1}{2}\dot{x}^2 + \dfrac{1}{2}x^2 = C
\\
\dot{x}^2 + x^2 = C
\\
\dot{x}^2 + x^2 = x_0^2
\\
x_1^2 + x_2^2 = x_0^2
$$

여기서 $x_1$과 $x_2$를 독립적인 변수로 취급한다. 위 예제에서 mass-spring system이 analytic하게 서술되는 것을 확인할 수 있다.

<img src="../../../img/post/Nonlinear System/mass-spring sys.png">

여기서 방향을 어떻게 정할까?

**Example 2.5 : A satellite control system**

위성 모델

$$
\ddot{\theta} = u, \;
u(t) = - U (\theta > 0), U (\theta < 0)
$$

Since $\ddot{\theta} = \dfrac{\dot{d\theta}}{dt} = \dfrac{\dot{d\theta}}{d\theta} \cdot \dfrac{d\theta}{dt} = \dot{\theta}\dfrac{d\dot{\theta}}{d\theta}$,

$$
\ddot{\theta} = u
\\
\dot{\theta}\dfrac{d\dot{\theta}}{d\theta} = u
\\
\dot{\theta}d\dot{\theta} = u d\theta
\\
\dfrac{1}{2} \dot{\theta}^2 = u\theta + C
\\
\dot{\theta}^2 = 2u\theta + C
$$

$x_1$과 $x_2$를 미분 관계로 표현할 수 있어야 하는 것이다.

Q. 왜 $x_1$과 $x_2$가 미분 관계여야 하는 것일까?

**Linear system**

입력이 없는 시스템

$$
\dot{x} = f(x)
$$

$f(x)$가 다음과 같이 표현된다면 이 시스템을 선형적이라고 한다.

$$
f(x) = Ax
$$

입력이 있는 시스템

$$
\dot{x} = f(x, u)
$$

$$
f(x) = Ax + Bu
$$

**Piece-wise linear system**

piece-wise linear system : 구간별로는 선형적이지만 모든 구간에서는 선형적이지 않은 시스템 (piece-wise continuous와 비슷)

$f(x)$가 다음과 같이 표현된다면 이 시스템을 piece-wise linear라고 한다.

$$
f(x) = A_1x \; (x \in C_1), \; A_2x \; (x \in C_2)
$$

Q. 왜 satellite control system은 piece-wise linear system일까?

$$
x =
\begin{bmatrix}
  x_1 \\
  x_2 \\
\end{bmatrix}
=
\begin{bmatrix}
  \theta  \\
  \dot{\theta}  \\
\end{bmatrix}
$$

라고 하면,

$$
\dot{x_1} = x_2, \; \dot{x_2} = sign(x_1)u
$$

이므로

$$
\dot{x} = 
\begin{bmatrix}
  \dot{x_1} \\
  \dot{x_2} \\
\end{bmatrix}
=
\begin{bmatrix}
  0 & 1 \\
  0 & 0 \\
\end{bmatrix}
\begin{bmatrix}
  x_1 \\
  x_2 \\
\end{bmatrix}
+
\begin{bmatrix}
  0 \\
  1 \\
\end{bmatrix}
u
=
\begin{bmatrix}
  0 & 1 \\
  0 & 0 \\
\end{bmatrix}
x
+
\begin{bmatrix}
  0 \\
  1 \\
\end{bmatrix}
u
$$

선형 시스템은 일반해를 알 수 있기 때문에 Analytic method를 사용할 수 있지만, 일반적인 비선형 시스템에 대해서는 적용할 수 없다.

### The method of isoclines

- 임의로 $\alpha$를 도입해서 모든 $\alpha$에 대해 관찰한다.
- System을 해석하기 위해 그림을 그리는 데에 관심이 있다.
- 수식적으로 정확하게 알 수는 없지만 그림은 그릴 수 있다.
- 무수히 많은 phase portrait이 있지만 initial condition에 의해 하나로 결정된다.

Q. Initial condition은 어떻게 얻을 수 있을까?

$$
\dfrac{dx_2}{dx_1} = \dfrac{f_2(x_1, x_2)}{f_1(x_1, x_2)} = \alpha
$$

## 3. Determinging Time from Phase Portraits

## 4. Phase Plane Anaysis of Linear Systems

## 5. Phase Plane Anaysis of Nonlinear Systems

## 6. Existence of Limit Cycles
