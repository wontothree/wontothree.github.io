---
title: "[Discrete Mathematics] Ch04 Number Theory and Cryptography"
excerpt: "Kenneth H. Rosen - Discrete Mathematics and Its Applications : Ch04"
categories:
  - discretemathematics
toc: true
toc_icon: star
share: false
use_math: true
---
## 1 Disivility and Modular Arithmetic

DIvision of an integer bu a positive integer produces quatient and remainder. Working with these remainders leads ot modular arithemtic, which plays an important role in mathematics and which is used throughout computer science.

### 1.2 Division

>**[DEFINITION 1]** If $a$ and $b$ are integers with $a \neq 0$, we say that $a$ divides $b$ if thers is an integer $c$ such that $b = ac$ or equivalently, if $\dfrac{b}{a}$ is an integer. When $a$ divides $b$, we say that a is a *factor* or *divisor* of $b$, and that $b$ is a muliple of $a$. The notation $a|b$ denotes that $a$ devides $b$. We write $a \not| b$when $a$ does not divide $b$.

>**[THEOREM 1]** Let $a, b$ be integers, where $a \neq 0$, Then \
>(i) if $a \;|\; b$ and $a \;|\; c$, then $a \;|\; (b + c)$; \
>(ii) if $a | b$, then $a \;|\; bc$ for all integers $c$; \
>(iii) if $a | b$ and $b \;|\; c$, then $a \;|\; c$.

>**[COROLLARY 1]** \
>If $a, b,$ and $c$ are integers, where $a \neq 0$, such that $a \;|\; b$ and $a \;|\; c$, then $a \;|\; mb + nc$ whenever $m$ and $n$ are integers.

### 1.3 The Division Algorithm

>**[THEORM 2]** **THE DIVISION ALGORITHM** \
>Let $a$ be an integer and $d$ a positive integer. Then there are unique integers $q$ and $r$, with $0 \geq r < d$, such that $a = dq + r$.

>**[DEFINTION 2]** In the equality in the division algorithm, $d$ is called the divisor, $a$ is called the divident, and, $q$ is called the quotient, and $r$ is called the remainder. The notation is used to express the quotient and remainder: $q = a$ **div** $d$, $r = a$ **mod** $d$

### 1.4 Modular Arithmetic

Because we are interested only in remainders, we have special notation for them. We have already notation $a$ mode $m$ to represent remainder when integer $a$ is divided by the positive integer $m$. We now introduce a different, but related, notation that indicates that two integers have the same reaminder when they are divided by the positive integer $m$.

>[DEFINITION 3] If $a$ and $b$ are integers and $m$ is a positive integer, then $a$ is congruent to $b$ modulo $m$ if $m$ divides $a-b$. \
>We use the notation $a \equiv b (\text{mod m)}$ to indicate that $a$ is congruent to $b$ modulo $m$. \
>We say that $a \equiv b (\text{mode m})$ is a congruence and that $m$ is its modulus (plural moduli). \
>If $a$ and $b$ are not congruent to modulo $b$, we write $a \not\equiv b (mod m)$.

## 2 Ineger Representations and Algorithms

## 3 Primes and Greatest Common Divisors

### 3.6 Greatest Common Divisors and Least Common Multiples

### 3.7 The Euclidean Algorithm

>**[LEMMA 1]**
>Let $a = bq + r$, where a, b, q, and r are integers. Then gcd($a, b$) = gcd($b, r$).

### 3.8 gcds as Linear Combinations

>**[BEZOUT'S THEOREM]**
>If $a$ and $b$ are positive integers, then there exist integers $s$ and $t$ such that gcd(a, b) = sa + tb

## 4 Solving Congruences

## 5 Application of Congruences

### 5.3 Parity Check Digit

x = 10101

isbm number : 바코드(13자리)

예전에는 10자리였다.

요즘에는 13자리이다.

$$
x_13 = 10 - (x_1 + 3x_2 + )(mod 10)
$$

주민등록번호

앞 : 생년월일

뒤 : 성별( 1, 2, 3, 4) / 

4자리 : 동사무소

유치원 동창과 

그날 그 동사무소에 몇 번째로 등록했냐 대부분은 1이다.

2라면 그 앞까지 동일한 사람이 한 명 더 있다는 것이다.

마지막 자리는 check number이다.

1970년에 주민등록번호가 만들어졌다. 그때는 check digit이 잘못 만들어지는 경욱도 있었다.

태어난 곳만 알면 된다. 서울

12 26 재수했다.

001226-30 _ _ _ 1 _

6, 두 자리는 60~80

2020년도부터 태어난 애들은 뒷 자리 두 번째 수부터 마지막 직전까지 random하게 설정한다.

## 6 Cryptography

정수론이 적용되는 분야 중 하나

만나지 않고도 가능한 암호 RSA 공개키 암호 : RSA : 인수분해 문제 

f -> f^-1가 어렵도록 one way function

현대 암호는 55년이 되지 않았다. 배워야 할 양이 적다.

Caesar Cipher

모든 글자를 세 칸 시프트한다. 대칭키 암호(고전 암호)

현대 자원을 동원하면 다 깨진다.

SKC는 암호화 키와 복호화키가 상호 변환 가능하다.

PKC는 암호화 키는 모두가 가지고 있다.

복호확 키는 나만 가지고 있다. (역함수)

f가 알려지더라도 역함수를 알기 어려운 문제가 있냐 -> 수학하는 사람이 해결해야 한다.

RSA회사도 있다. 때부자.

핵심은 소인수분해는 어렵다는 것이다. 1234565432347는 어떤 수들로 곱해졌을까?

10진수로 300자리 이상이다. 이거를 컴퓨터가 루트 n보다 작은 수로 다 나눠봐야 한다.

키 생성은 bob이 한다. 두 프라임을 랜덤하게 선택한다.

두 소수 p, q를 선택

결국 만족하게 한 수식은 x^ed = x^d (mod n)이다.

나의 공개키는 (e, n)입니다. 메시지 보내세요.

c = x^e (mod n) 이걸 결국 풀어야 한다. 이게 인수분해만큼이나 어렵다.

c^d = (M^e)^d = M^1

RSA에 정수론적인 요소가 들어가 있다.

inverse를 찾기 어렵다는 점에 기반한 것이다. p q가 커질 때 소인수분해가 어렵다는 것에 기반

지금도 어려울까?

양자컴퓨터가 등장하면서 암호에 대해 다시 고민을 해야 할 시점이 왔다.

양자컴이 있다면 소인수분해 문제를 polynomial에 의해 해결된다는 이론이 등장했다. 2000년에는 양자컴이 대에는 환상이라고 생각했다. 하지만 지금은 100bit 짜리를 만들었다.

깨려면 몇 만 비트가 빌요하다. 양자컴 시대에서 RSA는 끝이다.

요즘 나오는 암호 PQC : Post Quantom Cryptography

양자컴이 나오더라도 살아남을 수 있는 수학적 문제가 뭐가 있을까?

IFP

DLP 로가리즘 브라블럼

10년 후에는 RSA는 역사 속으로 사라질 수 있다.

교수 전공은 대체키 암호다. 공개키 암호 상관 ㄴㄴ

아직까지는 양자컴으로부터도 안전할 것이라 생각된다.

RSA : 는 컴싸에서도 조금 배우면 할 수 있지만 PQC는 대학원 수학을 알아야만 할 수 있다.

유툽으로 찾아볼 것.