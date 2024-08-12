---
title: "[F1tenth] Local Planner"
categories: 
  - f1tenth
---
## 사용 기술

Stein Variational Guided MPPI

## State

$$
\begin{bmatrix}
  x \\
  y \\
  \text{yaw} \\
  \text{vel} \\
  \text{steer} \\
\end{bmatrix}
$$

## [Solver] SVGD

- Input : 'const State& initial_state'
- Output : 'std::make_pair(prev_control_seq_, collision_rate)'

다음과 같이 구성된 최적화 프로세스를 통해 주어진 초기 상태로부터 시스템이 최적의 행동을 할 수 있도록 제어 시퀀스를 제공하며, 충돌 위험을 평가하여 안전한 동작을 보장한다.

1. 초기화 : 초기 상태와 샘플을 기반으로 비용 계산을 시작한다.
2. SVGD 반복 : 샘플에 대한 로그 후방 확률의 그래디언트를 사용하여 제어 시퀀스를 개선한다.
3. 비용 및 최적 제어 시퀀스 결정 : 각 샘플에 대한 비용을 계산하고, 가장 낮은 비용의 샘플을 선택하여 best_particle로 저장한다.
4. 공분산 계산 및 샘플링 : 적응형 공분산을 계산하여 새로운 제어 입력을 샘플링한다.
5. 가중 평균 계산 : 가중 평균을 사용하여 최적화된 제어 시퀀스(updated_control_seq)를 계산한다.
6. 충돌 비율 계산 : 샘플 중 충돌이 발생한 비율을 계산하여 collision_rate로 반환한다.
