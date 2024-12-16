---
title: "[AI Semiconductor] New Memory"
categories:
  - aisemiconductor
---
# 1. Resistive Random Access Memory (RRAM)

## RRAM Device Structure and Operation

기본 소자 구조: 두 개의 전극 (top electrode, bottom electrode) 사이에 절연체(metal oxide)가 있는 2단자 소자.

- Forming: 가장 처음에 약한 dielectric breakdown을 시켜준다. Forming 동작 이후에는 TE와 BE를 연결하는 CF(conductive filament)가 생성도므로, RRAM 소자는 낮은 저항 상태(low resistance state, LRS)를 갖게 된다.
  - Conductive filament: oxygen vacncy defect(OxRRAM) 또는 metal ion(CBRAM)
- Reset: 전압을 인가하여 CF를 끊는 과정. 그 결과 RRAM 소자는 높은 저항 상태(high resistance state, HRS)를 갖게 된다.
- Set: 전압을 인가하여 CF를 다시 연결하는 과정. 그 결과 RRAM 소자는 낮은 저항 상태(low resistance state, LRS)를 갖게 된다.

Set과 reset 과정을 번갈아 수행하면서 CF가 반복적으로 연결 및 분리되고 HRS와 LRS 간의 전이가 발생한다.

RRAM은 switching mechanism에 따라 크게 2가지 종류로 나눌 수 있다.

1. Filament-type RRAM: 국부적인 CF의 생성으로 동작하는 RRAM
2. Interface-type RRAM: device 전체 면적에서 균일하게 저항이 변하는 물질이 있어서 산화물과 reactive-metal 전극 사이의 interface에서 산소 이온의 이동에 따른 산화/환원 반응으로 tunnel barrier height가 변함으로써 저항이 변한다.

Filament-type RRAM은 크게 2가지로 분류할 수 있다.

1. OxRRAM or VCM(Valance Change Memory): oxygen vacancies filament-based RRAM
2. CBRAM(Conductive Bridge Random Access Memory) or ECM(Electrochemical metallization memory): metal ion-base RRAM

## Oxygen vacacies filament-based RRAM

OxRRAM은 set 및 reset 동작의 극성에 따라 구분되는 두 가지 주요 저항 스위칭 방식에 의존한다.

- Unipolar switching: set과 reset 간의 전이가 동일한 극성의 전압에 의해 이루어진다.
- Bipolar switching: set과 reset 간의 전이가 서로 반대 극성의 전압에 의해 이루어진다.

unipolar mode: noble metal (Pt, Ru)

bipolar mode: one of the electrodes replaced by oxidizable materials such as Ti or TiN

Unipolar

- 양극성 전압 펄스만을 적용하여 단순한 회로와 단극성 다이오드를 배열 선택에 사용한다.
- 균일성과 사이클링 내구성이 낮다.

Forming (or set) process: 소프트 유전 파괴가 발생한다. 높은 전기장에 의해 산소 이온이 양극 인터페이스로 이동한다. 이때 양극 재료가 귀금속일 경우, 산소 이온은 중성의 비격자 산소로 방출되도(단극성), 산화될 수 있는 양극 재료와 반응하면 인터페이스 산화층을 형성한다.(양극성)

Reset process: reset 과정에서는 산소 이온이 벌크로 다시 이동하여 산소 공백과 재결합하거나 금속 침전물을 산화시켜 메모리 셀을 HRS로 되돌린다.

- reset process for unipolar RRAM: 단극성 모드에서 스위칭하는 장치는 전류에 의한 줄 가열로 산소 원자의 확산이 열적으로 활성화된다. 산소 원자는 농도 기울기에 따라 인터페이스나 CF 주변 영역에서 확산되며, 단극성 스위칭 모드는 CF 주변의 국부 온도를 높이기 위해 상대적으로 더 높은 reset 전류가 필요하다. 금속 필라멘트의 산화로 인해 필라멘트가 분리된다.
- reset process for bipolar RRAM: 양극성 모드에서 스위칭하는 장치의 경우, 인터페이스 산화층이 중요한 확산 장벽이 될 수 있으며 순수한 열 확산만으로는 충분하지 않으므로 산소 이온의 이동이 역전기장에 의해 보조되어야 한다.

## CBRAM

# 3. Magnetoresistive Random-Access Memory (MRAM)

## Introduction to MRAM

- MRAM: 자기적 성질을 이요하여 정보를 저장하는 비휘발성 메모리
- Magnetic Tunnel Juction (MTJ): 2개의 ferromagentic film과 그 사이 얇은 tunnel barrier (1nm)로 구성된다. 두 ferromagentic film의 자기 편극 방향에 따라서 저항이 바뀐다. 이때 tunnel barrier는 절연체이다.
- Ferromagnetism (강자성): 자성체 내의 스핀간의 상호작용에 의해 스스로 특정 방향으로 모든 스핀이 정렬하는 현상

Reference layer vs. free layer

- Reference layer: fixed, huge energy barrier
- Free layer: vaiable, low energy barrier

## Alignment and Resister

- paralell between reference layer and free layer -> less scattering -> low resister (LRS)
- anti-paralell between reference layer and free layer -> scattering -> high resister (HRS)

Why?

- Magnetoresistance effect (MR): 자기장의 방향에 따라 저항이 달라지는 현상 (W. Thomson, 1856)
- Giant magnetoresistance (GMR): 일반적인 MR effect는 약 2%이지만, ferromagnetic layer와 얇은 non-magnetic film의 샌드위치 구조에서 큰 MR effect가 발생한다. (albert Fert and Peter Grunberg, novel prize)
- Spin dependent scattering: 전자의 spin 방향이 자기편극 방향과 같을 때는 scattering이 잘 안 일어나지만, 다를 때는 scattering이 잘 일어난다.

## MRAM Device

MRAM technology는 write mechanism에 따라 분류된다.

1. [1세대] conventional field-written MRAM: 자기장을 이용하여 free layer의 magnetic polarization의 방향을 바꾼다.
2. [2세대] STT-MRAM: Spin-Transfer Torque (STT)을 이용하여 free layer의 magnetic polarization을 바꾼다. (in-plane, perpendicular-to-the-plane)

conventional field-written MRAM

단점

1. large power consumption
2. magentic field interference between the neighboring cells

STT-MRAM

- <span style="color: #2D3748; background-color:#fff5b1;">Spin-Transfer Torque</span>: 전자가 첫 번째 ferromagnetic layer (polarizer, reference layer, or pinnned layer)를 지나면 spin polarization이 되어 polarizer의 스핀 방향과 평행하게 된다. 이후 free layer를 지나면서 전자의 스핀은 다시 FL의 스핀 방향으로 재편극된다. 하지만 이때 작용반작용 법칙에 의해 free layer 전자들도 반대 방향으로 토크를 받는다.

# 4. PRAM

- Phase Charge Memory(PCM, PRAM, or PCRAM): 특정 물질이 crystalline state과 amorphous state룰 갖는 것을 활용한 비휘발성 메모리
  - crystalline state: 낮은 저항 (set state)
  - amorphous state (reset state)

## Device Operation

다른 것들은 변하지 않은 채 phase change material (상변화 물질)만 crystalline state과 amorphous state 중 하나로 변한다. Phase change materials have a large electrical contrast.

- 제작 직후: phase change material은 crystalline state
- amorphous state: 순간적으로 큰 전류 펄스를 인가하여 높은 온도를 가하고 이어서 빠르게 냉각시킨다. -> amorphous phase
- crystalline state: 중간 정도의 전류 펄스를 비교적 오랜 시간 동안 가한다. (crystallization temperature와 melting temperature 사이의 온도에서 머물도록 한다.)

## 한계

1. Endureance: 비정질 상에서의 전기 전도는 열에 의해 활성화된 호핑(hopping) 수송으로 설명할 수 있습니다. 트랩을 통한 캐리어의 푸울-프렌켈(Poole–Frenkel) 수송은 매우 작은 전압에서는 전압에 비례하는 전류를, 높은 전압에서는 지수적으로 증가하는 전류를 발생시킵니다.
2. Thermal Disturbance: 결정질 상에서의 전기 전도는 도핑된 반도체의 드리프트-확산(drift-diffusion) 거동으로 간단히 설명할 수 있으며, 낮은 전압에서는 오옴(Ohmic) 거동을 보입니다. 높은 전압에서 PCM 셀이 비오옴(Non-Ohmic) 거동을 보이는 것은 전류에 의한 줄(Joule) 가열로 설명할 수 있습니다.

# 5. FRAM

DRAM과 비슷한 구조이나 강유전체를 사용하여 비휘발성 메모리로 동작한다.

장점

1. lower power usage
2. faster write performance
3. much greater maximum read/write endurance

단점

1. much lower storage densities
2. storage capacity limitations
3. higher cost
4. destructive read process
5. additional write-after-read architecture

- Ferroelectrice material(강유전체): 쿼리온도 이하에서 외부 전기장이 없이도 내부의 전기상극자모멘트가 정렬하여 자발적인 분극을 갖는 유전체
- 이진 "0"과 "1"은 각 데이터 저장 셀에서 두 가지 가능한 전기적 극성 중 하나로 저장됩니다. 예를 들어, "1"은 음의 잔여 분극 "-Pr"을 사용하여 인코딩되고, "0"은 양의 잔여 분극 "+Pr"을 사용하여 인코딩됩니다.

장점

- nondestructive readout
- low voltage

단점

- poor retention

## 1T-1C FRAM

FRAM 메모리의 읽기 작업은 여러 단계를 필요로 합니다. 이는 동적 RAM, DRAM에서 사용되는 방식과 매우 유사합니다. 비트라인 전압은 단순히 기준값과 비교됩니다. 이 기준값은 스위치되지 않은 전압과 스위치 전압 사이에 설정됩니다. 그 후, 감쇠 증폭기는 비교기로 작용하여 차이를 증폭시켜 논리 1 또는 논리 0을 출력하게 됩니다.

## 1T FRAM (FE-FET)

장점

1. FE-FETs는 강유전체 난폭 접근 메모리 애플리케이션보다 비파괴적 읽기 기능의 장점을 가지고 있습니다.
2. 낮은 항복 전기장 (Ec)을 보여줌으로써 합리적인 메모리 창에서도 저전압 작동이 가능합니다.

단점

1. 낮은 저장 특성 (강유전체-절연체 계면에서의 보상 전하 터널링, 유지 기간 동안 강유전체 필름에서 발생하는 탈분극 전기장의 설정)
