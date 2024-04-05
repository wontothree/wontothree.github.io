---
title: "[Paper Review] Autonomous Vehicles on the Edge : A Survey on Autonomous Vehicle Racing"
excerpt: '14 Feb 2022 / 146 citation'
categories:
  - paperreview
toc: true
toc_icon: star
share: false
use_math: true
---
## ABSTRACT

- First holistic survey that covers the research in the field of autonomous racing
- Autonomous racecars / algorithms, methods and approaches that are used in the fields of perception, planning, and control + end-to-end learning
- Comprehensive overview of the current autonomous racing platforms emphasizing both the software-hardware co-evolution
- Summary of open research challenges

## 1 INTRODUCTION

### *A. Contribution*

1. Cover comprehensively the topic of autonomous vehicle racing for both software and hardware developments.
2. Compare the differenct approaches and explain their algorithmic setup in perception, planning, and control. + DNN, RL.
3. Compare the current autonomous racing competitions - hardware, racing enviroment, orgranization.
4. Present a list of open research challenges in the field of autonomous racing.

### *B. Preliminart Remark*

![](../../img/post/paperreview/autonomous-driving-pipline.png)

## 2 AUTONOMOUS RACING SOFTWARE

### *A. Perception*

- Perception : detecting object, detecting the free space, mapping the environment, localizing the autonomous vehicle
- Autonomous racing $\rightarrow$ "How fast is too fast?" (Falanga et al.) $\rightarrow$ The maximum latency an autonomous system can tolerate to guarantee safety (not crashing in an object) is related to the **desired speed**, the **agility of the system** (e.g. the maximum acceleration it can produce) and the **perception parameter of the sensors** (e.g. the sensing range).
- Fundemental problems for autonomous racing perception
  - High speed object detection
  - High speed localization and state estimation
  - Localization on wide areas without specific landmarks
  - Percise localization information necessary to chieve high dynamic trajectory planning and control

![](../../img/post/paperreview/overview-perception.png)

## 3 AUTONOMOUS RACING HARDWARE: VEHICLES AND COMPETITIONS

## 4 SUMMARY AND CONCLUSIONS
