---
title: "[Autonomous Driving] Part 01. LiDAR Perception"
excerpt: 자율주행을 위한 컴퓨터비전과 라이다 & 센서퓨전까지 초격차 패키지 Online
categories:
  - AD
toc: true
use_math: true
---
## 0. Introduction

Contents

1. 강사 소개
2. 자율주행
3. 컴퓨터 비전
4. 자율주행과 컴퓨터 비전
5. 커리큘럼

### 자율주행

Sense - Think - Act Model

환경으로부터 감지 -> 판단 -> 자율주행

사람 : 사람의 오감 -> 두뇌를 이용한 판단 -> 판단의 결과를 신체가 수행

운전자 : 눈으로 정보를 수집 -> 사람의 머리로 상황 판단 -> 손과 발로 운전

자율주행 : sensor -> perception -> planning -> vehicle control -> powertrain control

#### 인간 Perception vs 자동차 Perception

오감을 통해 정보를 받아들이는데 하나라도 문제가 있으면 많은 불편함을 느낀다.

#### 자율주행 보조 시스템

- ADAS(advanced driver assistance system) Camera : 주행 중 발생할 수 있는 상황을 차량이 스스로 인지하고 판단하여 차량을 전자적으로 제어하는 시스템
  - 차선 이탈 경고
  - 차선 유지 보조
  - 보행자 충돌 경고
  - 자동 비상 제동
  - 지능형 조명 제어
- 인 - 캐빈 모니터링 카메라 : 캐빈(차량 껍데기) 운전자 외 탑승자에 대한 모니터링
- 후방 카메라 : 후방의 시아 확보, 주차할 때 도움을 받는다.
- Around View Monitoring : 차량을 하늘에서 내려다 보는 시아를 제공한다. 사람이 볼 수 없는 사각지대를 인식할 수 있다. 여러 센서를 재구성해서 만든다.
- DMS(drive monitoring system) : 운전자의 상태를 분석하는 기술, 머리, 표정, 자세를 인지를 통해 운전자의 상태를 파악하고
  - 졸음 경보
  - 전방 미주시
  - 하품
  - 휴대폰
  - 흡연

### 컴퓨터 비전

기계가 이미지를 자동으로 인식하고 정확하고 효율적으로 설명하는 데 사용되는 기술

대표적인 7가지 기술

- Face recognition : Face ID
- Image classification
- object detection
- emotion detection
- object tracking : 검출 후 어디로 이동하는지 추적
- segmentation : 픽셀 단위로 더 세부적으로 보는 기술
- video analytics : 이미지보다 더 많은 것을 가지고 비디오를 분석하는 기술

### 차량과 컴퓨터 비전

차량에 달린 여러 센서를 통해 정보를 획득하고 컴퓨터로 분석 및 판단을 한다.

자율주행 보조 시스템에 어떤 컴퓨터 비전 기술이 들어갈까?

이 강의에서는 ADAS Camera, DMS에 적용한다.

### 커리큘럼
