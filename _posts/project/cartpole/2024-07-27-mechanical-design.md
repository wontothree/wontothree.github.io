---
title: "[Cart Pole] Mechanical Design"
excerpt:
categories:
  - cartpole
---
# Object

- 더 많은 비용을 지불하더라도 최대한 단순하게 만든다.
- 보수적으로 만든다. 안전하게 만들자. 성공하기 높은 방식으로 만들자.
- 만들기 쉬운 방식으로 만들자.

# 3D Modeling

![](../../../img/cartpole/cartpole-3d.png){: .align-center width="400" height="200"}

# Materials

|Electronics|Utility|Name|Specification|
|---|---|---|---|
|1|동력 원천|Unipolar Stepping Motor||
|2|모터 드라이버|Unipolar Stepping Motor Driver|3A|
|3|Pole 회전 각도 측정 센서|Absolute Rotary Encoder||
|4|End stop|아두이노 포토 인터럽터 속도 센서 모듈||
|5||Arduino UNO R4 WiFi||
|6|전원 공급|Power Supply|12V, 5A|
|7|전선|절연 전선|12AWG, 1M|
|8|전선|실리콘 전선|18AWG, 30M|

|Mechanical Components|Utility|Name|Specification|
|---|---|---|---|
|9|하단 고정|DIY 삼나무 솔리드|24x1000x400mm, 6.2kg|
|10|Cart 이동|선형 레일 가이드, 리니어 블록 세트|800mm, MGN12H|
|11|Pole 막대|공예용 사각 나무 막대기|40cm|
|12|Pole과 각도 센서 연결 및 고정|Shaft Coupler|내경 6mm|
|13|동력 전달|GT2 기어 36T 타이밍 폴리|폭 6mm, 내경 5mm|
|14|동력 전달|GT2 기어없음 민짜 타이밍 아이들러| 내경 5mm|
|15|동력 전달|GT2 타이밍 벨트|폭 6mm, 길이 2m|
|16|동력 전달|GT2 벨트 고정 클립|폭 6mm|
|17|나사|스텐 둥근 머리 십자볼트|규격 M3(3mm), 기장 8mm|
|18|나사|스텐 트러스머리 1종 피스|규격 M4, 기장 10mm|

|Consumable Components|Utility|Name|
|---|---|---|
|19|전선 연결|Bread Board|
|20|납땜|만능기판|
|21|전선 절단 도구|스트리퍼|

Sheet Metal Outsourcing Cost : 12만원

# Sheet Metal

Linear Guide Base

![](../../../img/cartpole/linear_guide_base.png){: .align-center width="400" height="200"}

Motor Bracket

![](../../../img/cartpole/motor_bracket.png){: .align-center width="400" height="200"}

제조 방식

- 밀링 : 통 알류미늄을 파낸다. 비싸다.
- 절곡 : 철을 접는다.
- 용접 : 분리된 조각을 붙인다.

종류

- 쇠(철)
  - 알류미늄보다 강도가 높다.
  - 알류미늄보다 3배 무겁다.
  - 녹이 슬어서 페인트 칠을 해야 하기 때문에 도장 값이 따로 붙는다.
- 알류미늄
  - 원자재 값이 쇠보다 비싸다. 하지만 소량으로 주문할 때는 쇠보다 저렴하다.

# Measurement

Cart

- Mass of cart ($M$) : 122.53g (= 0.123kg) (재측정해야 함)
- Inertia of cart ($I$) :

Rod

- Mass of rod ($m$) : 88.68g (= 0.089kg)
- Length of rod ($L$) : 40cm (= 0.4m)

