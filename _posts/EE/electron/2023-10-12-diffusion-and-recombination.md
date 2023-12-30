---
title: "[Electron] Diffusion and Recombination"
excerpt:
categories:
  - Electron
tags:
  - 2-2
toc: true
toc_label: 
toc_icon: heart

share: false
---
## 1. 열 운동

전자의 평균 운동에너지 = 총 운동 에너지 / 전수 수

= $\dfrac{\int f(E) D(E) (E - E_c) dE}{\int f(E) D(E) dE}  = \dfrac{3}{2} k T$

열속도

$$
\dfrac{3}{2} k T = \dfrac{1}{2} m v_{th}^2
\\
v_{th} = \sqrt{\dfrac{3 k T}{m}}
$$

## 2. Drift

- 드리프트 : 전계가 원인이 되어 발생된 전하 캐리어들의 움직임

### 2.1 Electron and Hole Mobility

드리프트 속도에 대한 모델

- Drift velocity : 반도체에 전기장이 가해졌들 때 캐리어의 평균 속도

(매 충돌마다 잃어버리는 전체 드리프트 운동량) = (충돌 사이에 얻는 드리프트 운동량)

$$
m_p v = q E \tau_{mp}
\\
v = \dfrac{q E \tau_{mp}}{m_p} = \mu_p E
$$

- 충돌 사이 평균 자유 시간 : $\tau_{mp}$
- Hole mobility(정공 이동도) $\mu_p$ : 정공이 얼마나 이동성이 있는지의 측정 규준

$$
v = - \mu_n E
\\
\mu_n = \dfrac{q \tau_{mn}}{m_n}
$$

**저농도로 도핑된 몇 개의 반도체에 대한 상온에서의 전자와 정공의 이동도**

||Si|Ge|GaAs|InAs|
|---|---|---|---|---|
|$\mu_n(cm^2/V \cdot s)$|1400|3900|8500|30000|
|$\mu_p(cm^2/V \cdot s)$|470|1900|400|500|

### 2.2 캐리어 산란 메커니즘

캐리어 충돌에 대하여 좀 더 상세하게 묘사해보자. $\mu_n$ 과 $\mu_p$는 온도와 도핑 농도에 따라서 매우 중대하게 변한다.

캐리어의 충돌과 산란을 일으키는 결정 내의 결함은 phonon scattering(포논 산란)과 ionized impurity scattering(이온화 불순물 산란)이다.

- phonon : 결정 내에 있는 원자의 진동(소리를 운반하는 진동과 같은 종류)을 입자로 표현한 것

결정 진동은 주기적이 결정 구조를 왜곡시키고 전자 파동을 산란시킨다.

포논 산란 하나에만 기인한 이동도는 포논 사란의 평균 자유 시간에 비례한다.

$$
\mu_{phonon} = \dfrac{q\tau_{ph}}{m}
$$

포논 산란의 평균 자유 시간은 포논의 밀도와 전자의 속도(열 속도)에 반비례한다. 포논 밀도는 절대온도에 비례한다.

$$
\mu_{phonon}
\propto \dfrac{1}{\text{포논 밀도} \cdot \text{캐리어 열 속도}}
\propto \dfrac{1}{T \cdot T^{1/2}}
\propto T^{-3/2}
$$

불순물 산란에 기인하는 이동도는 도너 이온 농도와 억셉터 이온 농도의 합에 반비례한다.

$$
\mu_{impurity}
\propto \dfrac{T^{3/2}}{N_a + N_d}
$$

총 산란 비율 및 총 이동도는 각 역수의 합으로 결정된다.

$$
\dfrac{1}{\tau} = \dfrac{1}{\tau_{phonon} + \tau_{impurity}}
\\
\dfrac{1}{\mu} = \dfrac{1}{\mu_{phonon} + \mu_{impurity}}
$$

### 2.3 Drift Current and 전도도

캐리어의 드리프트의 결과로 전류가 흐른다.

전류 밀도 $J$ : 전류가 흐르는 방향에 수직인 단위 면적 평면을 가로질러 흐르는 단위시간 당 전하량

단위 면적을 갖는 p형 반도체 막대에서 정공의 전류 밀도

$$
J_{p, drift} = qpv
\\
= qp\mu_p E
$$

전자 전류 밀도

$$
J_{n, drift} = qp\mu_n E
$$

총 드리프트 전류 밀도는 전자와 정공의 드리프트 전류 밀도 성분을 합한 것이다.

$$
J_{drift} = J_{n, drift} + J_{p, drift} = (qp\mu_n + qp\mu_p) E = \rho E
$$

다수 캐리어 농도와 소수 캐리어 농도 간 비율이 매우 크기 때문에 보통 두 성분 중 한 가지만 고려한다.

반도체의 전도도(conductivity)($A/V \cdot cm$)

$$
\rho = qp\mu_n + qp\mu_p
$$

저항률($\Omega \cdot cm$)은 전도도의 역수이다.

상온에서 도펀트 농도와 저항률 간의 정해진 관계가 존재한다.

## 3. Diffusion Current

금속은 매우 높은 전도도를 갖기 때문에 일반적으로 확산 전류는 금속에서 중요한 고려 사항이 되지 않는다. 낮은 전전도의 경우와 불균일한 캐리어 농도 분포를 만들기 쉬운 경우에는 확산이 반도체 내에서 중요한 과정이 된다.

- Diffusion : 입자들의 열 운동에 의해 상대적으로 더 높은 입자 농도를 갖는 지점에서 더 낮은 농도의 지점으로 입자들이 움직이는 현상

$$J_{n, diffusion} = q D_n \dfrac{dn}{dx}$$
$$J_{p, diffusion} = q D_p \dfrac{dp}{dx}$$

일반적으로 드리프트와 확산은 모두 전류에 기여한다.

$$J_n = J_{n, drift} + J_{n, diffusion}
\\
= q n \mu_n E + q D_n \dfrac{dn}{dx}$$

$$J_p = J_{p, drift} + J_{p, diffusion}
\\
= q p \mu_p E + q D_p \dfrac{dp}{dx}$$
$$J = J_n + J_p$$

## 4. Energy Diagram and Relation between the Energy and V

$$E_c(x) = 상수 - q V(x)$$

$E_c$와 $E_v$는 전압이 낮은 곳일수록 위로 올라간다.

$$E = - \frac{dV}{dx} = \dfrac{1}{q} \dfrac{dE_c}{dx} = \dfrac{1}{q} \frac{dE_v}{dx}$$

에너지 밴드 다이어그램에서 전자는 돌과 같이 아래쪽으로 굴러가고 정공은 거품처럼 올라온다.

## 5. Einstein Relationship between D and $\mu$

- Eienstein relationship : 확산상수와 이동도의 관계

$$
0 = J_n = q n \mu_n E + q D_n \dfrac{dn}{dx} \\
= q n \mu_n E + q D_n \dfrac{d}{dx}(N_c e^{-(E_c - E_F)/kT}) \\
= q n \mu_n E + q D_n\dfrac{N_c}{kT} e^{-(E_c - E_F)/kT} \dfrac{dE_c}{dx} \\
= q n \mu_n E - q D_n \dfrac{n}{kT} \dfrac{E_c}{dx} \\
= q n \mu_n E - q D_n \dfrac{n}{kT} q E
$$
$$
D_n = \dfrac{kT}{q} \mu_n
$$

## 6. Electron and Hole Recombination

$$
n = n_0 + n' \\
p = p_o + p'
$$

$n_0$ : 평형상태 캐리어 농도, $n'$ : 과잉 캐리어 농도

$n'$과 $p'$이 빛에 의해 생성되었다면 전자와 정공은 쌍으로 생성되기 때문에 $n' = p'$

- 과잉 캐리어 농도 : 빛을 비추기 전후의 농도 차이
- Recombination : 빛으로 생성된 전자와 정공 쌍이 빛이 꺼졌을 때 감쇄하는 과정
- Recombination time(재결합 시간 or carrier lifetime(캐리어 수명), $\tau$) : 감쇄의 시간상수

$$\frac{dn'}{dt} = - \dfrac{n'}{\tau} = - \dfrac{p'}{\tau}$$

- 재결합 비율 = $\dfrac{n'}{\tau} = \dfrac{p'}{\tau}$

- Deep traps(깊은 트랩 or recombination center(재결합 센터)) : 금과 백금 같은 소량의 금속 불순물이 밴드 갭 깊숙한 곳에 형성하는 여러 에너지 준위를 갖는 밴드 갭 내의 트랩

## 7. Thermal Generation

영이 아닌 어떤 온도에서든 전자 - 정공 쌍은 계속적으로 생성되고 재결합에 의해 소멸된다.

- Thermal generation(열 생성) : 재결합의 반대 과정

(재결합) $np = n_i^2$ (열 생성) : 열 생성 비율과 재결합 비율은 같다.

$np > n_i^2$ : 순 재결합이 존재한다.

$np < n_i^2$ : 순 생성이 존재한다.

## 8. 유사 평형상태와 의사 페르미 준위

과잉 캐리어의 존재가 np 곱을 $n_i^2$보다 매우 크게 만드는 일이 쉽게 일어난다.

Quasi-Fermi level $E_{Fn}, E_{Fp}$

$$n = N_c e^{-(E_c - E_{Fn})/kT}$$
$$p = N_v e^{-(E_{Fp} - E_v)/kT}$$
