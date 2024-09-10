---
title: "[Cart Pole] Introduction"
categories:
  - cartpole
---
# Project

Nonlinear Model Predictive Control vs. Deep Reinforcement Learning: A Comprehensive Numerical Comparison of Model-Free and Model-Based Methodologies in Cart Pole

- Conpetition : UOS ECE IF (Innovation Fair) Competition
- Team Member : Sewon Kim
- Project Duration : July 25 - September 27

# Contents

1. [Dynamic model](https://wontothree.github.io/cartpole/dynamic-model/) of Linear Inverted Pendulum을 구한다.
2. AutoDesk를 이용하여 Linear Inverted Pendulum을 [Mechanical Design](https://wontothree.github.io/cartpole/mechanical-design/) 한다.
3. [Electronics](https://wontothree.github.io/cartpole/electronics/)를 구성하고 Inverted Pendulum의 hardware를 제작한다.
4. [Motor Controller](https://wontothree.github.io/cartpole/motor-control/)를 만든다.
5. Simulation 환경을 구축한다.
6. [Nonlinear Model Predictive Controller](https://wontothree.github.io/cartpole/nmpc/)를 설계하고 simulation 환경에서 테스트한다.
7. [Deep Reinforcement Learing Controller]()를 설계하고 simulation 환경에서 테스트한다.
8. 두 제어기를 Inverted Pendulum Hardware에서 동작시키고 데이터를 수집한다.
9. 다방면에서 두 제어기의 성능을 정량적으로 평가한다.

# Competition

- 참여 대상 : 전자전기컴퓨터공학부 재학생
- 전공 수업 지식을 활용, 스스로 제안 및 개발한 프로젝트 결과물 전시
- 교수님 및 대학원생 지도, 조언 불가 (지도 및 조언을 받을 시 자동 탈락)
- 학부생들 본인의 지식과 노력으로 만든 작품만 출품 가능
- 팀당 최대 50만원 재료비 지원 (개인 사비 지출 금지)

# Individual Object

1. [Money for Europe Trip] 2,000,000원이 있다면 조금 더 모아서 유럽 여행을 갈 수 있다. 만약 팀원을 구한다면 n빵을 해야 하기 때문에 여행 자금으로써는 부족하다. 따라서 혼자 진행하였다.
2. [Hardware] 프로젝트를 진행하면 나는 항상 소프트웨어 파트를 맡았다. 프로젝트를 많이 할지라도 하드웨어에 대한 지식은 진전을 이루지 못했다. 이번 기회를 통해 하드웨어에 대한 두려움을 극복하고 전문성을 갖추고싶었다.
3. [Myself from A to Z] 많은 프로젝트를 하더라도 분업을 하기 때문에 프로젝트의 큰 방향을 이해하며 세부적인 것까지 파악하기란 어려웠다. A부터 Z까지 내가 주도하는 프로젝트에 대한 갈증이 있었다.
4. [Implementation] 이론으로만 알고 있던 MPC controller와 RL controller를 직접 구현하고 적용해보고 싶었다.

# Retrospect

- 재료비가 생각보다 많이 나왔다.

대회의 조건이 50만원 내에서 재료비를 사용하는 것이었는데, 부품 비용으로 37만원과 판금 비용으로 12만원이 지출되어 조금도 남지 않았다.

전동 드릴 동작법부터 너트와 피스와 차이점도 몰랐다.

- 기구설계
  - 맨 왼쪽 나사 구멍 위치 고려
  - linear guide base : 맨 오른쪽 받침
  - 폴리가 좀 더 크면 좋을 것 같다.
  - motor bracket : 하부 고정하는 부분을 길게 해도 좋았을 것 같다.

# Reference

- Nonlinear Model Predictive Control of an Inverted Pendulum
- Personalized Cancer Chemotherapy Schedule: a numerical comparison of performance and robustness in model-based and model-free scheduling methodologies
