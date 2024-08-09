---
title: "[Cart Pole] Mechanical Design"
excerpt:
categories:
  - cartpole
---
## Object

- 더 많은 비용을 지불하더라도 최대한 단순하게 만든다.
- 보수적으로 만든다. 안전하게 만들자. 성공하기 높은 방식으로 만들자.
- 만들기 쉬운 방식으로 만들자.

## 3D Modeling

![](../../../img/cartpole/cartpole-3d.png){: .align-center width="400" height="200"}

## Materials

|Index|용도|재료명|
|---|---|---|
|1|하단 고정|DIY 삼나무 솔리드 24x1000x400mm, 6.2kg|
|2|Cart 이동|선형 레일 가이드 800mm, 리니어 블록 MGN12H 세트|
|3|Pole 막대|공예용 사각 나무 막대기 40cm|
|4|동력 원천|Unipolar Stepping Motor|
|5|모터 드라이버|Unipolar Stepping Motor Driver 3A|
|6|Pole 회전 각도 측정 센서|Absolute Rotary Encoder|
|7|Cart의 절대 위치 계산|아두이노 포토 인터럽터 속도 센서 모듈|
|8||Arduino UNO R4 WiFi|
|9|Pole과 각도 센서 연결 및 고정|Shaft Coupler 내경 6mm|
|10|동력 전달|GT2 기어 36T 타이밍 폴라 폭 6mm, 내경 5mm|
|11|동력 전달|GT2 기어없음 민짜 타이밍 아이들러 내경 5mm|
|12|동력 전달|GT2 타이밍 벨트 폭 6mm, 길이 2m|
|13|동력 전달|GT2 벨트 고정 클립 폭 6mm|
|14|나사|스텐 둥근 머리 십자볼트 규격 M3(3mm), 기장 8mm|
|15|나사|스텐 트러스머리 1종 피스 규격 M4, 기장 10mm|
|16|전선|절연 전선 12AWG 1M|
|17|전선|실리콘 전선 18AWG 30M|
|18|전원 공급|Power Supply 12V 5A|
|19|전선 연결|Bread Board|
|20|전선 절단 도구|스트리퍼|
|21|납땜|만능기판|

Sheet Metal Outsourcing Cost : 12만원

## Research Note

### 동력 전달 방식

1. 톱니바퀴
2. 벨트

|방식|톱니바퀴|벨트|
|---|---|---|
|장점|조금 더 단순한 구조처럼 보일 수도 있다.|만들기 쉽다.|
|||성공할 가능성이 더 크다.|
|단점|만들기 어렵다.|기구의 부피가 커진다.|
||Cart의 무제 M이 커진다.||
||마찰이 크게 발생할 수 있다.||

더 만들기 쉬우며 성공 가능성이 높은 벨트의 방식을 선택하였다.

### 카트의 이동 경로

|방식|프로파일|Linear Guide|
|---|---|---|
|장점|||
|단점|||

### 타이밍 벨트 가로 vs 세로

### 하단 고정 방식

1. 나무 판자
2. 책상 구조물
3. 받침 구조물
4. 클립

### 리니어 가이드를 바닥에 고정할 것인가

1. 구조물을 이용해서 공중에 띄운다.
2. 바닥에 밀착시킨다.

### End stop을 위해 어떤 센서를 사용할 것인가?

### 어떤 Pole 막대를 사용할 것이며 어떻게 고정할 것인가?

1. 연마봉
2. 나무 막대

### Linear guide에 cart를 어떻게 고정할 것인가?

### 무엇을 판금해야 할까?

### Motor bracket도 하나의 판금으로 연결할 수 있을까?

### 지지 구조물 자체에 고정하기 위한 것을 만들어서 나무판자 없이 만들 수 있을까? 이때 빵판, 전원 공급기 등 또한 간소화할 수 있을까?

### 어떤 각도 센서를 사용할 것이며 어떻게 연결할 것인가?

### 어떤 나무를 사용할 것인가?

### 어떤 모터와 모터 드라이버를 사용할 것인가?

1. Stepping Motor
2. DC Motor

### 어떤 전선을 사용할 것인가?

## Sheet Metal

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
