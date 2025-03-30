---
title: "[Engineering Mathematics] 복소함수"
excerpt:
categories:
  - engineeringmathematics
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. 복소수

## 2. 거듭제곱과 근

직교좌표 $(x, y)$와 극좌표 $(r, \theta)$의 관계는 $x = r\cos \theta$와 $y = r\cos\theta$로 표현된다. 따라서 다음과 같이 표현할 수 있다.

$$z = x + iy = r\cos\theta + i r\cos\theta$$

## 3. 복소수의 집합

## 4. 복소함수

A라는 집합에 B라는 집합을 대응시키는 함수 f : A에 있는 원소 a에 B에 있는 원소 b를 대응시키는 규칙

집합 A를 f의 정의역이라 하고, 집합 B에 있는 모든 상들의 집합을 함수의 치역이라 한다.

복소함수 : 정의역이 복소수 z의 집합인 함수

$$
w = f(z) = u(x, y) + iv(x, y)
$$

- 복소함수 z(= u + iv)의 상 : w
- 실수부분 : u
- 허수부분 : v

복소함수는 w = f(z)는 4차원 좌표계를 나타내는 축이 네 개 필요하기 때문에 그래프로 그릴 수 없다.

z 평면에서 w 평면으로 가는 사상 또는 변환으로 해석할 수 있다.

함수의 극한

연속성

도함수

함수 f가 $z_0$에서 해석적이다. : 복소함수 w = f(z)가 $z_0$에서 미분 가능하고, $z_0$의 어떤 근방이 존재하여 그 안의 모든 점에서 미분 가능하다.

## 5. Cauchy-Riemann Equation

함수 f가 어떤 열린 영역 D에서 해석적이라 것은 f가 D 안의 모든 점에서 미분 가능하다는 것을 함축한다.

함수 f(z) = u(x, y) + iv(x, y)가 z = x + iy에서 미분 가능하다고 하자. 그러면 z에서 u와 v의 1차 편도함수가 존재하고, 다음과 같은 cauchy-Riemann 방정식을 만족한다.

$$
\dfrac{du}{dx} = \dfrac{dv}{dy} \quad \dfrac{du}{dy} = -\dfrac{dv}{dx}
$$

실함수 u(x, y)와 v(x, y)가 열린 영역 D에서 연속이고 이들의 1차 편도함수들도 모두 연속이라 하자. 만약 u와 v가 D 안의 모든 점에서 Cauchy-Riemann 방정식을 만족하면, 복소함수 f(z) = u(x, y)는 D에서 해석적이다.

D에서 조화함수 : 실함수 $\phi(x, y)$가 열린 역역 D에서 2차 편도함수를 갖고 Laplance 방정식을 만족하면 함수 $\phi(x, y)$

복소함수 $f(z) = u(x, y) + iv(x, y)$가 열린 역역 D에서 해석적이라 하자. 그러면 실함수 u(x, y)와 v(x, y)는 조화함수이다.

## 6. 지수함수와 로그함수

## 7. 삼각함수와 쌍곡선함수

임의의 복소수 z = x + iy에 대해, 다음과 같이 사인과 코사인 함수를 정의한다.

$$
\sin z = \dfrac{e^{iz} - e^{-iz}}{2}, \quad \cos z = \dfrac{e^{iz} + e^{-iz}}{2i}
$$

다른 네 개의 삼각함수도 실수 삼각법에서처럼 sin z와 cos z를 이용하여 정의한다.

$$
\tan z = \dfrac{\sin z}{\cos z}, \quad \csc z = \dfrac{1}{\sin z}, \quad \sec z = \dfrac{1}{\cos z}, \quad \cot z = \dfrac{1}{\tan z}
$$

임의의 복소수 z = x + iy에 대해 다음과 같이 쌍곡선함수를 정의한다.

$$
\sin z = \dfrac{e^z - e^{-z}}{2}, \quad \cos z = \dfrac{e^z + e^{-z}}{2}
$$

다른 네 개의 쌍곡선 함수도 실함수에서처럼 sinh z와 cosh z를 이용하여 다음과 같이 정의한다.

$$
\tanh z = \dfrac{\sinh z}{\cosh z}, \quad \csch z = \dfrac{1}{\sinh z}, \quad \sech z = \dfrac{1}{\cosh z}, \quad \coth z = \dfrac{1}{\tanh z}
$$

## 8. 역삼각함수와 역쌍곡선함수

## Reference

Dennis G. Zill - Advanced Engineering Mathematics
