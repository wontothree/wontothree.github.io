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

# 프로젝트를 위해 필요한 역량

- ROS2
- Cpp : 이번 기회에 익혀두자.
  - Eigen 라이브러리
- Hybrid A*, RRT, MPC, MPPI 개념

# Path Planning

- Global Planner
- Local Planner

# Project Architecture

- MPC
- Solver
- 평가 시스템
- 데이터 수집 파이프라인
- global planner로부터 어떤 양식의 데이터를 받을지
- 자료구조
