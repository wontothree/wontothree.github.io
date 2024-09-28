---
title: "[Cart Pole] Introduction"
categories:
  - cartpole
---
# Introduction

The Cart-Pole, a classical benchmark problem in control, consists of a cart, driven left or right by a linear actuator, and a pole attached to the cart via an un-actuated joint.  The goal is to swing the pole up and balance it above the cart using motor control.

# Project

*[1st Project] PID is All You Need* (Compeletion)

*[2nd Project] Swing-Up Control using Nonlinear Model Predictive Control in Cart Pole* (Not Yet)

*[3nd Project] Swing-Up Control using Deep Reinforcement Learning in Cart Pole* (Not Yet)

*[4th Project] Nonlinear Model Predictive Control vs. Deep Reinforcement Learning: A Comprehensive Numerical Comparison of Model-Free and Model-Based Methodologies in Cart Pole* (Not Yet)

*[5th Project] System Identification* (Not Yet)

## PID is All You Need

- UOS ECE IF (Innovation Fair) Competition
- Team Member : Sewon Kim (only me)
- Project Duration : July 25 - September 27
- Populatity Prize

**Competition**

- 참여 대상 : Undergraduate students in department of electrical and computer engineering
- 전공 수업 지식을 활용, 스스로 제안 및 개발한 프로젝트 결과물 전시
- 교수님 및 대학원생 지도, 조언 불가 (지도 및 조언을 받을 시 자동 탈락)
- 학부생들 본인의 지식과 노력으로 만든 작품만 출품 가능
- 팀당 최대 50만원 재료비 지원 (개인 사비 지출 금지)

**Individual Object**

1. [Money for Europe Trip] 2,000,000원이 있다면 조금 더 모아서 유럽 여행을 갈 수 있다. 만약 팀원을 구한다면 n빵을 해야 하기 때문에 여행 자금으로써는 부족하다. 따라서 혼자 진행하였다.
2. [Hardware] 프로젝트를 진행하면 나는 항상 소프트웨어 파트를 맡았다. 프로젝트를 많이 할지라도 하드웨어에 대한 지식은 진전을 이루지 못했다. 이번 기회를 통해 하드웨어에 대한 두려움을 극복하고 전문성을 갖추고싶었다.
3. [Myself from A to Z] 많은 프로젝트를 하더라도 분업을 하기 때문에 프로젝트의 큰 방향을 이해하며 세부적인 것까지 파악하기란 어려웠다. A부터 Z까지 내가 주도하는 프로젝트에 대한 갈증이 있었다.
4. [Implementation] 이론으로만 알고 있던 MPC controller와 RL controller를 직접 구현하고 적용해보고 싶었다.

**Retrospect**

4등을 해서 인기상을 수상했다. 교수들의 평가에 의해 결정되는 1~3등과 달리, 인기상은 학생들의 투표에 의해 결정된다.교수들의 푱가 기준에는 들지 못했던 것 같다. 두 가지 부분이 부족했을 것이라 예상된다. 첫 번째는 전전컴에서 다루는 범위를 벗어난 것들을 포함하고 있었다. 두 번째는 학부 수준을 벗어나는 내용들이 많았다. 나름 결과와 발표가 준수했음에도 이 부분에서 다른 팀에게 밀렸던 것이라 생각한다.

하지만 내 부스가 가장 많은 사람이 몰렸을 만큼 많은 사람들이 방문해주었다. 친구가 말하길 나를 중심으로 모든 사람이 몰려들었다고 했다. 이런 대회에서 중요한 요소 중 하나가 시각적으로 자극적인 걸 하는 것이다. 적당히 이 정도는 되겠지라고 생각하는 것 이상으로 자극적일수록 좋다.

시연하는 과정에서 세게 치는 사람이 많았다. 나는 굉장히 긴 길이의 막대를 사용하기 때문에 살짝만 쳐도 막대의 중심축 입장에서 큰 관성력이 작용하게 되어 넘어질 수밖에 없다. plz don't touch.

비교적 나는 이론을 좋아하는 사람인 것 같다. 상대적으로 구현에 대한 능력이 정말 부족하다는 것을 많이 느꼈다. 프로그래밍을 정말 잘 해야 한다.

첫 포스터 발표였다. 다른 내용은 조금 부족했을지라도 "PID is All You Need" 이름 하나는 너무 마음에 든다.

글로써 말로써 설명하는 능력을 더 키울 필요가 있다. 청자의 지식 수준을 고려해서 설명하는 능력 역시 중요하다. 나는 전문적인 지식을 지나치게 단순화해서 설명하는 경향이 있다. 배경지식이 없는 청자라면 쉽게 이해할 수 있지만, 전문지식을 갖춘 사람 입장에서는 굉장히 불편한 부분이 많이 생길 수 있다.

나는 큰 그림을 catch하는 데는 능숙하지만 detail한 부분을 잡는 능력이 부족하다. 엄밀함을 더욱 기르자.

사실 많은 부분이 돈을 들여 비싼 재료를 사는 것으로 해결할 수 있다. 그것은 진정한 의미의 공학이 아니다. 저렴한 재료를 이용하여 만드는 것이 진정한 공학이다. 고성능 장비에 대한 의존성 없는 개발을 하자.

센서를 독립적으로 테스트 해볼 수 있어야 한다. 시스템이 커질수록 각 모듈을