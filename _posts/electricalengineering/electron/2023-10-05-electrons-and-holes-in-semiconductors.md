---
title: "[Electron] Electrons and Holes in Semiconductors"
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
이 장에서 기술되는 용어와 개념, 모델은 현존하는 반도체 소자들과 미래에 발명될 소자들을 이해하는 데 필수적이다.

## 1. Silicon crystal structure

## 2. 전자와 양공의 결합 모델(Bond Model)

- Donor : 전자를 제공하는 불순물, Ab, P
- N-type semiconductor : 다수의 이동성 전자와 소수의 정공을 포함하는 반도체
- Acceptor : 정공을 받아들여 생성하는 도펀트, In, Al

## 3. Energy Band Model

에너지 밴드 모델은 반도체 소자를 이해하는 데 가장 유용한 모델이다.

- Pauli exclusion principle : 원자, 분자, 혹은 결정과 같은 전자 시스템에서 각각의 양자 상태는 두 개 이상의 전자에 의해 점유될 수 없고 오직 한 개의 전자에 의해서만 점유된다.
- Valence band(가전자 대역) : 채워진 밴드 중 맨 꼭대기에 있는 거의 채워진 밴드
- Conduction band(전도 대역) : 비어있는 밴드 중 최하단에 있는 거의 빈 밴드
- Band gap : Valence band와 Conduction band 사이의 갭

Valence band와 conduction band만이 반도체에서 전류 흐름에 기여하는 유일한 에너지 밴드가 된다.

- Band gap energy(or energy gap) :
- Doner energy level
- acceptor energy level

## 4. 반도체, 절연체, 도체

에너지 밴드 모델에 기초하여 반도체, 절연체, 그리고 도체 사이의 차이점을 이해할 수 있다.

## 5. 전자 및 정공

에너지 밴드 다이어그램에서 높은 위치는 높은 전자 에너지를 의미한다. 전도 전자 에너지의 최소값은 $E_c$이다. 한편 더 낮은 위치는 더 높은 정공 에너지를 의미한다. 정공을 아래쪽으로 이동시키기 위해서는 에너지가 필요한데, 이는 전자를 위쪽으로 이동하는 것과 마찬가지이기 때문이다. $E_v$는 최소 정공 에너지이다.

우리는 정공을 에너지 밴드에서 떠다니는 액체 내의 기포처럼 생각할 수 있으며, 전자를 에너지 밴드에서 최소 에너지 상태로 떨어지려는 물방울처럼 생각할 수 있다.

### 유효질량

전기장 $E$이 가해질 때, 전자 혹은 정공은 다음 식에 따라서 가속될 것이다.

$$
가속도 = \dfrac{-qE}{m_n}, 가속도 = \dfrac{qE}{m_p}
$$

전자와 정공의 운동을 입자의 운동에 관한 고전적 법칙을 사용해서 설명하기 위해서 우리는 effective mass(유효질량)을 적용해야 한다.

||Si|Ge|GaAs|InAs|AlAs|
|---|---|---|---|---|---|
|$m_n/m_0$|0.26|0.12|0.068|0.023|2.0|
|$m_p/m_0$|0.39|0.3|0.5|0.3|0.3|

$m_0 = 9.1 * 10^{-32}kg$

결정 내의 전자에 대한 완벽한 기술은 반드시 그들의 입자 특성뿐만 아니라 파동 특성에 기초를 두어야 한다. 전자의 파동 함수는 3차원 슈뢰딩거 파동 방정식의 해이다.

$$
i\hbar \frac{\partial \Psi(r, t)}{\partial t} = \left[ -\frac{\hbar^2}{2m} \left( \nabla^2 \Psi(r, t) \right) + V(r) \right] \Psi(r, t)
$$

$$
유효질량 = \dfrac{\hbar^2}{d^2E/dk^2}
$$

각각의 반도체 물질은 전도 대역에서 유일한 E-k 관계를 갖고 또한 가전자 대역에서도 또 다른 유일한 E - k 관계를 갖는다. 따라서 각각의 반도체 물질은 유일한 $m_n$과 $m_p$을 갖는다.

### 유효질량의 측정

cycleotron resonance(사이클로트론 공명) : 자기장($B$) 안에 위치한 $N$형 반도체 내의 운동하는 전자가 $B$에 수직인 평면 내에서 원형 궤적을 그리며 운동하는 현상. 이때 자기장은 전자에 $qvB$의 힘을 발휘한다.

$$
\dfrac{m_n v^2}{r} = qvB, v = \dfrac{qBr}{m_n}
$$

원운동 주파수(사이클론 공명 주파수)

$$
f_{cr} = \dfrac{v}{2 \pi r} = \dfrac{qB}{2 \pi m_n}
$$

공명 주파수는 $r$과 $v$에 독립적이라는 것에 주의하라. 만약 원형으로 편광된 전계 주파수 $f_{cr}$과 동일한 주파수로 이 반도체에 가해진다면, 전자들은 강하게 마이크로파 에너지를 흡수할 것이다. 그렇게 되면 전자들은 보다 고속으로 가속되고, 그들의 원운동 주파수를 바꾸지 않으면서 반경이 증가된 원 궤적을 그릴 것이다. 충돌을 통해 에너지를 손실하고 또다시 가속 과정을 시작할 것이다.
만약 가해준 전계의 주파수가 $f_{cr}$과 같지 않으면, 즉 가해준 전계가 전자의 운동과 동시성이 어긋날 때, 확실히 흡수는 많이 약해질 것이다.

전기장의 자파수를 변화시키거나 $B$를 변화시키다가 흡수 피크가 관측되면 위 식을 이용하여 $m_n$을 계산할 수 있다.

## 6. Desity of States(상태 밀도)

에너지 밴드는 불연속인 에너지 상태들의 집합이다. 각 상태는 반도체의 주기적인 전위 함수에 대하여 슈뢰딩거 파동 방정식을 풀어서 구한 유일한 해와 유일한 스핀(업과 다운)을 의미한다.

각 상태는 단 하나의 전자를 보유하거나 보유하고 있지 않다. 우리는 전도 대역에서 작은 에너지 범위 $\Delta E$ 내에 있는 상태들의 수를 계산하여 상태 밀도를 계산할 수 있다.

가전자 대역 상태 밀도, 정공 상태 밀도

$$
D_c(E) = \dfrac{\Delta E 내에 존재하는 상태들의 수}{\Delta E \times volume}
\\
= \dfrac{8 \pi m_n \sqrt{2 m_n (E - E_c)}}{h^3}, E \geq E_c
\\
D_v(E) = \dfrac{8 \pi m_p \sqrt{2 m_p (E_v - E)}}{h^3}, E \leq E_v
$$

입방 센티미터당 일렉트론볼트당 개수($개/cm^3/eV$)의 차원을 갖는다.

## 7. 열적 평형상태와 페르미 함수

전도 대역 전자들 대부분이 전자 에너지가 가장 작은 $E_c$ 근처에서 발견되며 대부분의 정공들은 정공 에너지가 가장 작은 $E_v$ 쪽으로 떠오르게 된다. 전자와 정공의 분포에 대해 자세히 알아보자.

Equalibrium condition(평형상태 조건) : thermal agitation(열적 선동)의 존재와 조화를 이룬 가능한 최소 에너지 상태

반도체 내에서 전자와 정공들은 결정으로부터 에너지를 받거나 혹은 결정과 에너지를 교환하면서, 그리고 서로 간에 에너지를 받거나 교환하는 가운데, 전도 대역과 가전자 대역의 모든 에너지 상태는 전자에 의해 점유될 일정한 확룰을 갖는다.

### 페르미 함수

입자들이 어떻게 원자들과 튕겨나가거나 혹은 서로 간에 튕기는지에 대해 상세하게 고려하지 않고 오직 입자의 수와 총 시스템 에너지가 일정하게 유지된다고 가정하고 통계 열역학적 분석을 하여 페르미 함수를 유도할 수 있다.

Fermi-Dirac distribution function(페르미-디락 분포 함수) : 에너지의 상태가 전자에 의해 점유될 확률

$$
f(E) = \dfrac{1}{1 + e^{(E - E_F) / kT}}
\\
\approx e^{-(E - E_F) / kT} (E - E_F << -kT) \\
\approx 1 - e^{-(E_F - E) / kT}
$$

볼츠만 근사

낮은 에너지 영역($E - E_F << -KT$)에서 점유 확률은 1에 가깝다. 다시 말하면 낮은 에너지 상태들은 완전히 점유되는 경향이 있다.

정공에 의해 점유될 확률

$$
1 - f(E) = e^{-(E_F - E) / kT}
$$

$E$가 $E_F$보다 매우 낮다면 점유 확률은 1에 가까워지고, $E$가 $E_F$보다 매우 높다면 점유 확률은 0에 가까워진다.

**열적 평형상태에 있는 시스템에 대하여 단 하나의 페르미 준위만 존재한다.**

## 8. Electron and 정공의 Concentration

### Electron concentration

Elctron concentration : 전도 대역 내 전자의 농도

전체 전도 대역 내에 있는 입방 센티미터당 전자의 개수

$$
n = \int_{E_c}^{top conduction band} f(E) D_c(E) dE \\
\approx \int_{E_C}^{\infty} \dfrac{8 \pi m_n \sqrt{2 m_n (E - E_c)}}{h^3} \cdot e^{-(E - E_f) / kT} dE \\
= \dfrac{8 \pi m_n \sqrt{2 m_n}}{h^3} e^{-(E_c - E_f) / kT} \int_{E_c}^{\infty} \sqrt{E - E_c} e^{-(E - E_c) / kT} dE \\
= \dfrac{8 \pi m_n \sqrt{2 m_n}}{h^3} e^{-(E_c - E_f) / kT} kT \sqrt{kT} \int_{E_c}^{\infty} \sqrt \dfrac{E - E_c}{kT} e^{-(E_c - E_f) / kT} kT dE \\
= \dfrac{8 \pi m_n \sqrt{2 m_n}}{h^3} e^{-(E_c - E_f) / kT} kT \sqrt{kT} \int_{0}^{\infty} \sqrt{x} e^{-x} dx \\
= \dfrac{8 \pi m_n \sqrt{2 m_n}}{h^3} e^{-(E_c - E_f) / kT} kT \sqrt{kT} (\dfrac{\sqrt{\pi}}{2})\\
= 2[\dfrac{2 \pi m_n kT}{h^2}]^{3/2} e^{-(E_c - E_f) / kT} \\
= N_c e^{-(E_c - E_f) / kT} \\
= N_c f(E_c)
$$

$$
p = \int_{bottomconductionband}^{E_v} D_v(E) (1 - f(E)) dE
\\
= N_v e^{-(E_f - E_v) / kT}
\\= N_v f(E_f)\\
, N_v = 2[\dfrac{2 \pi m_p kT}{h^2}]^{3/2}
$$

$N_c = 2[\dfrac{2 \pi m_n kT}{h^2}]^{3/2}$ : effective density of states(유효 상태 밀도)

$N_v = 2[\dfrac{2 \pi m_p kT}{h^2}]^{3/2}$ : effective density of states of the valence band(가전자 대역의 유효 상태 밀도)

전자 농도는 유효 상태 밀도와 '$E_c$ 에너지 상태가 점유될 확률'의 곱과 같다.

### Fermi level and carrior density

에너지 상태가 전자에 의해 점유될 확률과 유효 상태 밀도의 관계

### np 곱과 진성 캐리어 농도

도펀트 농도에 관계없이 주어진 반도체와 온도에 대하여 $np$ 곱은 일정하다.

$$
np = N_c e^{-(E_c - E_f) / kT} \cdot N_v e^{-(E_f - E_v)} \\
= N_c N_v e^{-(E_c - E_v) / kT} \\
= [\sqrt{N_c N_v} e^{-E_g / 2kT}]^2 \\
= n_i^2
$$

- $n$ : 전자 농도(전도 대역 내 전자 농도)
- $p$ : 정공 농도
- $n_i$ : 진성 캐리어 농도(실리콘에 대해서 $np = n_i^2 = 10^{20}cm^{-6}$)

이 식은 도펀트가 존재하지 않더라도 항상 얼마간의 전자와 정공들이 존재한다는 것을 의미한다. n과 p가 0이 되지 않는 것은 열적 여기가 존재하여 약간의 전자가 가전자 대역으로부터 전도 대역으로 이동했기 때문이다. 이때 전자와 정공은 쌍으로 생성되기 때문에 진성 반도체에서 $n = p$ 이다.

- Intrinsic(진성) : 도펀트가 존재하지 않는 반도체
- Excitation(열적 여기) :

$$
n = p = n_i
$$

$n_i$을 intrinsic carrier concentration(진성 캐리어 농도)라고 한다.

- Majority carrier(다수 캐리어) : N형 반도체에서 풍부한 양의 전자
- Minority carrier(소수 캐리어) : N형 반도체에서 거의 존재하지 않는 정공

## 9. n과 p의 일반적 이론

모든 얕은 도너 및 억셉터들이 이온화되었다고 가정할 수 있다.

Dopant compensation(도펀트 보상) :

## 10. 극고온과 극저온에서의 캐리어 농도
