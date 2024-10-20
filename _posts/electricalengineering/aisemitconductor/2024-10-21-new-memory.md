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
