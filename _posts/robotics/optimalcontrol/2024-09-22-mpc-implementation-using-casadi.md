---
title: "[MPC] MPC Implementation using CASADI"
categories:
  - optimalcontrol
---
CASADI python library를 이용하여 cart pole system에 대한 MPC Controller를 구현한다.

모든 종류의 MPC cnotroller를 구현할 때 재생산 가능한 template 코드를 작성한다.

Clean architecture를 위해 다음 두 파일로 구성한다.

```py
├── mpc.py                  # interface by abstract class
└── cartpole_nmpc.py        # implementation
```

mpc.py

```py
from abc import ABC, abstractmethod

class MPC(ABC):
    def __init__(self, state_dim, control_dim, prediction_horizon, control_sampling_time):
        self.state_dim = state_dim
        self.control_dim = control_dim
        self.prediction_horizon = prediction_horizon
        self.control_sampling_time = control_sampling_time

        # number of optimization variables
        self.total_variables = (prediction_horizon + 1) * state_dim + prediction_horizon * control_dim

    def set_target_state(self, target_state):
        self.target_state = target_state

    def set_target_control(self, target_control):
        self.target_control = target_control

    @abstractmethod
    def define_dynamic_model(self, state, control):
        pass

    @abstractmethod
    def define_constraint(self):
        pass

    @abstractmethod
    def define_cost_function(self):
        pass

    @abstractmethod
    def solve(self):
        pass
```

cartpole_nmpc.py

## __init__
