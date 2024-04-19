---
title: "[Engineering Mathematics] 급수와 유수"
excerpt:
categories:
  - engineeringmathematics
toc: true
toc_icon: star
share: false
use_math: true
---

## 1. 수열과 급수

## 2. Taylor 급수

## 3. Laurent 급수

## 4. 영점과 극점

## 5. 유수 정리

특이점 $z_0$에서 f의 유수(residue) : Laurent 급수에서 $\dfrac{1}{z-z_0}$의 계수 $a_{-1}$

$$
a_{-1} = Res(f(z), z_0)
$$

**[단순극점에서의 유수**(정리)**]**
f가 $z = z_0$에서 단순극점을 가지면 다음과 같다.

$$
Res(f(z), z_0) = \lim_{z \rightarrow z_0}(z - z_0)f(z)
$$

**[n차 극점에서의 유수**(정리)**]**
f가 $z = z_0$에서 n차 극점을 가지면 다음과 같다.

$$
Res(f(z), z_0) = \dfrac{1}{(n-1)!}\lim_{z\rightarrow z_0}\dfrac{d^{n-1}}{dz^{n-1}}(z-z_0)^nf(z)
$$

**[Cauchy의 유수정리**(정리)**]**
D가 단순 연결 영역이고 C는 완전하게 D 내에 놓여 있는 단순 폐경로라 하자. 함수 f가 C 상과 C 내의 유한 개의 특이점 $z_1, z_2, ... , z_n$을 제외한 C 내부에서 해석적이면 다음과 같다.

$$
\oint_Cf(z)dz = 2\pi i \sum_{k=1}^nRes(f(z), z_k)
$$

## 6. 실적분의 계산

## Reference

Dennis G. Zill - Advanced Engineering Mathematics Chapter
