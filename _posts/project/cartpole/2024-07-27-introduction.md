---
title: "[Cart Pole] Introduction"
categories:
  - cartpole
---
## Project

- Conpetition : UOS ECE IF (Innovation Fair)
- Nmae : Cart Pole Design and Control - Model Predictive Control vs Reinforcement Learning
- Team Member : Sewon Kim
- Project Duration : July 25 - September 27

## Contents

1. Linear Inverted Pendulum의 역학을 수학적으로 Modeling한다.
2. AutoDesk를 이용하여 Inverted Pendulum을 기구 설계한다.
3. Inverted Pendulum의 hardware를 제작한다.
4. Simulation 환경을 구축한다.
5. MPC controller와 end-to-end based controller를 설계하고 simulation 환경에서 테스트한다.
6. 두 제어기를 Inverted Pendulum Hardware에서 동작시킨다.
7. 두 제어기를 정량적으로 비교한다.

## Individual Object

1. 2,000,000원이 있다면 조금 더 모아서 유럽 여행을 갈 수 있다. 만약 팀원을 구한다면 n빵을 해야 하기 때문에 여행 자금으로써는 부족하다. 따라서 혼자 진행하였다.
2. Hardware : 프로젝트를 진행하면 나는 항상 소프트웨어 파트를 맡았다. 프로젝트를 많이 할지라도 하드웨어에 대한 지식은 진전을 이루지 못했다. 이번 기회를 통해 하드웨어에 대한 두려움을 극복하고 전문성을 갖추고싶었다.
3. 많은 프로젝트를 하더라도 분업을 하기 때문에 프로젝트의 큰 방향을 이해하며 세부적인 것까지 파악하기란 어려웠다. A부터 Z까지 내가 주도하는 프로젝트에 대한 갈증이 있었다.
4. 이론으로만 알고 있던 MPC controller와 RL controller를 직접 구현하고 적용해보고 싶었다.

## Retrospect

- 재료비가 생각보다 많이 나왔다.

대회의 조건이 50만원 내에서 재료비를 사용하는 것이었는데, 부품 비용으로 37만원과 판금 비용으로 12만원이 지출되어 조금도 남지 않았다.

전동 드릴 동작법부터 너트와 피스와 차이점도 몰랐다.

- 기구설계
  - 맨 왼쪽 나사 구멍 위치 고려
  - linear guide base : 맨 오른쪽 받침
  - 폴리가 좀 더 크면 좋을 것 같다.
  - motor bracket : 하부 고정하는 부분을 길게 해도 좋았을 것 같다.

## 해야 할 것

- DDP 공부, 구현
- MPC 공부
- RL 공부
- 모터 제어
- 하드웨어 완성
- 포토 센서 테스트
- 포토 센서 부착
