---
title: "[Engineering Mathematics] 복소평면에서의 적분"
excerpt:
categories:
  - engineeringmathematics
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. 경로적분

**[경로적분**(정의)**]**
함수 f는 $x = x(t), y = y(t), a \leq t \leq b$에 의하여 정의되는 매끄러운 곡선 C 상의 점에서 정의된다고 하자. C를 다라서 f의 경로적분은 다음과 같이 정의한다.

$$
\int_C f(z)dz = \lim_{||P \rightarrow0||} \sum_{k=1}^n f(z_k*) \Delta z_k
$$

만약 함수 f가 경로 C의 모든 점에서 연속이고 C가 매끄럽거나 조각마다 매끄러운 곡선이면 위 식의 극한은 존재한다.

**[경로적분의 계산**(정리)**]**
만약 f가 매끄러운 곡선 C 상에서 연속이고 곡선 C가 $z(t) = x(t) + iy(t), a \leq t \leq b$에 의하여 표현되면 다음 식이 성립한다.

$$
\int_C f(z) dz = \int_a^b f(z(t))z'(t)dt
$$

**[경로적분의 성질**(정리)**]**
f와 g가 열린 영역 D에서 연속이고 C는 D 내에 있는 매끄러운 곡선이라면

$$
\int_C kf(z) dz = k\int_C f(z) dz, \quad k \text{는 상수}
$$

$$
\int_C [f(z) + g(z)]dz = \int_C f(z) dz + \int_C g(z) dz
$$

$$
\int_C  f(z) dz = \int_{C_1} f(z) dz + \int_{C_2} f(z) dz, \quad \text{C는 매끄러운 곡선} C_1 \text{과}\; C_2 \text{의 합집합이다.}
$$

$$
\int_{-C} f(z) dz = -\int_C f(z) dz
$$

## 2. Cauchy-Goursat 정리

경로 C가 양의 방향(반시계 방향)의 단순 폐곡선인 경우의 경로적분에 대해서만 고려하자.

단순 연결 : 어떤 열린 영역 D 내의 임의의 단순 폐곡선 C가 D의 밖으로 벗어나지 않으면서 D 내의 한 점으로 줄어들 수 있는 열린 영역 D -> '구멍'을 갖지 않는다.

다중 연결 영역 : 단순 열결이 되지 않은 열린 영역 -> '구멍'이 있다.

2중 연결 열린 영역 : 구멍이 1개

2중 연결 열린 영역 : 구멍이 2개

**[단순연결 열린 영역에 대한 Cauchy-Goursat 정리**(정리)**]**
함수 f가 단순연결 열린 영역 D에서 해석적이라고 한다면, D 안에 있는 모든 단순 폐곡선 C에 대하여

$$
\oint_C f(z)dz = 0
$$

**[다중연결 열린 영역에 대한 Cauchy Goursat 정리**(정리)**]**
C, C_1, .., C_n들이 양의 방향으 ㅣ단순 폐곡선으로서 C_1, ..., C_n은 C의 내부에 있고 C_k, k = 1, 2, ..., n의 각각의 내부는 서로 겹치지 않는다고 하자. 만약 f가 모든 경로에서 해석적이고, C의 내부에 속하면서 동시에 C_k, k = 1, ... , n의 외부에 있는 모든 점에서 해석적이면, 다음이 성립한다.

$$
\oint_Cf(z)dz = \sum_{i=1}^n\oint_{C_k}f(z)dz
$$

## 3. 경로의 독립성

**[경로의 독립성**(정의)**]**
$z_0$와 $z_1$은 열린 영역 D 내의 점이라 하자. 경로적분 $\int_Cf(z)dz$가 시작점이 $z_0$이고 끝점이 $z_1$인 D 내에 있는 모든 경로 C에 대하여 적분값이 같다면, $\int_Cf(z)dz$는 경로에 독립이라고 한다.

**[해석적이면 경로에 독립**(정리)**]**
f가 단순연결 열린 영역 D에서 해석함수이면, $\int_Cf(z)dz$는 경로 C에 독립이다.

**[역도함수**(정의)**]**
f가 열린 영역 D에서 연속이라 하자. 만약 D 내의 모든 x에 대하여 $F'(z) = f(z)$인 함수 F가 존재한다면, F를 f의 **역도함수**라고 한다.

**[경로적분의 기본정리**(정리)**]**
f가 열린 영역 D에서 연속이고 F는 D에서 f의 역도함수라면, 시작점 $z_0$와 끝점 $z_1$을 갖는 D 내의 어떤 경로 C에 대해서도 다음이 성립한다.

$$
\int_Cf(z)dz = F(z_1) - F(z_0)
$$

## 4. Cauchy의 적분 공식

**[Cauchy의 적분 공식**(정리)**]**
f가 단순연결 열린 영역 DDPTJ GOTJRWJRDLFK GKRH, C는 D 내에 있는 단순 폐곡선이라 하자. 만약 $z_0$이 C 내부에 있는 임의의 점이라면, 다음 식이 성립한다.

$$
f(z_0) = \dfrac{1}{2\pi}i\oint_C\dfrac{f(z)}{z-z_0}dz
$$

**[도함수에 관한 Cauchy의 적분 공식**(정리)**]**
f가 단순연결 영역 D에서 해석적이고 C는 D 내에 완전히 포함된 단순 폐곡선이라 하자. 만약 $z_0$이 C 내부에 있는 임의의 점이라면 다음이 성립한다.

$$
f^{(n)}(z_0) = \dfrac{n!}{2\pi i}\oint_C\dfrac{f(z)}{(z-z_0)^{n+1}}dz
$$

## Reference

Dennis G. Zill - Advanced Engineering Mathematics
