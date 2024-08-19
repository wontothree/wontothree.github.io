---
title: "[F1tenth] Introduction"
excerpt:
categories: 
  - f1tenth
---
# Package 설계

- [Package] slam 
- [Package] local_costmap_generator

# Big Picture

1. SLAM을 통해 맵을 얻는다. (2D occupancy grid map)

---

1. LiDAR 데이터를 수신한다.
2. 2D Costmap을 생성한다.

# Reseache Note

8.11.

- 첫 시도 : ROS1으로 된 Svg mppi 코드를 ros2로 바꾸자.
- 의존성을 확인하고 ROS2로 바꾸는 작업이 over-engineering이라고 생각하게 되었다. ROS1과 ROS2가 너무나도 다르기 때문이다.
- '핵심 로직을 취해서 새롭게 만들자'라는 방향으로 노선 변경
- 알아야 할 것이 산더미다. 쫄지 말고 하나씩 정리해나가면서 전진하자. 로마군처럼.

Refactoring

하나하나 디테일까지 한 번에 전부 파악하는 것은 불가능하다.

프로젝트 안에서 가장 핵심적인 패키지, 패키지 안에서 가장 핵심적인 파일, 파일에서 가장 핵심적인 함수, 함수에서 가장 핵심적인 로직을 찾아야 한다.

그리고 거기부터 세부적인 것들로 뻗어나가야 한다.

# 프로젝트를 위해 필요한 역량

- ROS2
- Cpp : 이번 기회에 익혀두자.
  - Eigen 라이브러리
- Hybrid A*, RRT, MPC, MPPI 개념

# Path Planning

- Global Planner
- Local Planner

# SLAM


# Project Architecture

- MPC
- Solver
- 평가 시스템
- 데이터 수집 파이프라인
- global planner로부터 어떤 양식의 데이터를 받을지
- 자료구조

# 궁금한 점

- lidar data를 2d costmap으로 변환하는 과정이 반드시 필요할까? 2d costmap을 사용하지 않고 경로 생성을 하는 방법이 있을까?
- occupancy grid map와 costmap의 차이가 뭘까?
  - Occupancy Grid Map은 환경의 기본 구조(장애물의 존재 여부 등)를 나타내는 반면, Costmap은 로봇의 이동과 관련된 비용을 추가하여 그리드의 각 셀에 더 많은 의미를 부여합니다.
  - Occupancy Grid Map은 단순한 이진(점유됨/비어 있음) 또는 확률적 맵인 반면, Costmap은 장애물 회피와 경로 계획을 지원하기 위해 더 복잡하고 정밀한 비용 표현을 제공합니다. 
  - Costmap은 Occupancy Grid Map을 기반으로 생성될 수 있지만, 그 반대는 아닙니다. Costmap은 더욱 실시간적인 요소와 동적 환경을 반영하기 때문입니다.
- costmap은 무엇으로부터 생성될까? slam을 통해 얻은 occupancy grid map으로부터 얻을 수 있을까?
  - SLAM으로 생성된 Occupancy Grid Map은 로봇의 초기 환경 정보로 사용됩니다. 이 정보를 기반으로 초기 Costmap을 생성하고, 이후 로봇이 이동하면서 실시간 센서 데이터를 바탕으로 Costmap이 업데이트됩니다.
  - SLAM이 제공하는 Occupancy Grid Map은 주로 글로벌 Costmap(Global Costmap)을 초기화하는 데 사용되며, 로컬 Costmap(Local Costmap)은 실시간 센서 데이터를 통해 주로 업데이트됩니다.
- local costmap은 시각적으로 어떻게 생겼을까?
- 주행 중에 라이다 데이터로 무엇을 할 것인가? 라이다 데이터를 어떻게 이용할 것인가?

http://wiki.ros.org/costmap_2d

# Costmap

- 목적: 로봇의 경로 계획과 충돌 회피를 위한 자세한 정보 제공이 주 목적입니다. 비용(cost)은 로봇이 특정 셀을 통과할 때의 위험성이나 어려움을 나타냅니다.
- 구조: 마찬가지로 2D 그리드로 구성되지만, 각 셀이 비용 값을 가지며, 이 값은 0 (자유 공간)에서 255 (치명적인 장애물)에 이릅니다. 비용 값은 셀의 위험성이나 장애물과의 거리에 따라 달라집니다.
- 생성: Occupancy Grid Map뿐만 아니라 실시간 센서 데이터(예: 장애물, 사람, 동적 물체) 및 기타 정보(예: 장애물 회피 우선순위)를 포함하여 만들어집니다.
- 적용 범위: 로봇이 장애물을 피하면서 가장 안전하고 효율적인 경로를 찾기 위해 사용됩니다. 동적 환경에서도 실시간으로 업데이트되어 경로 계획의 핵심 역할을 합니다.
