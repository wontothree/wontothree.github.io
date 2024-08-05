---
title: "[Cart Pole] Introduction to Cart Pole"
excerpt:
categories:
  - cartpole
---
## Cart Pole

- Cart : moving horizontally
- Pole : freely rotating around its base
- Action Space : horizontal forces that can be applied to the cart (left or right)
  - Action 0 : left
  - Action 1 : right
- Control Object : to find sequence of actions such that the pole is kept in the vertical position
- States of Observation Space
  - Cart Position (X) : $-4.8 \leq X \leq 4.8$
  - Cart Velocity (m/s) ($\dot{X}$) : $-\infty \leq \dot{X} \leq \infty$
  - Pole angle of rotation (radian) ($\theta$) : $-0.418 (-24 \degree) \leq \theta \leq 0.418 (24 \degree)$
  - Pole Angular Velocity ($\dot{\theta}$) : $-\infty \leq \dot{\theta} \leq \infty$

## Reference

[[You Tube] Introduction to OpenAI Gym (Gymnasium): Cart-Pole Environment - Reinforcement Learning Tutorial](https://www.youtube.com/watch?v=2sp_eucoX2I)

[[Post] Cart Pole Control Environment in OpenAI Gym (Gymnasium)- Introduction to OpenAI Gym](https://aleksandarhaber.com/cart-pole-control-environment-in-openai-gym-gymnasium-introduction-to-openai-gym/)

[[GitHub] Demonstration-of-Cart-Pole-OpenAI-Gym-Reinforcement-Learning-Environment-in-Python-](https://github.com/AleksandarHaber/Demonstration-of-Cart-Pole-OpenAI-Gym-Reinforcement-Learning-Environment-in-Python-)

[[You Tube] Detailed Explanation and Python Implementation of Q-Learning Algorithm in OpenAI Gym (Cart-Pole)](https://www.youtube.com/watch?v=KMjQmG5Uzis)

[[Post] Detailed Explanation and Python Implementation of the Q-Learning Algorithm with Tests in Cart Pole OpenAI Gym Environment – Reinforcement Learning Tutorial](https://aleksandarhaber.com/q-learning-in-python-with-tests-in-cart-pole-openai-gym-environment-reinforcement-learning-tutorial/)

[[GitHub] Q-Learning-Algorithm-in-Python-with-Cart-Pole-OpenAI-Gym--Gymnasium-Environment](https://github.com/AleksandarHaber/Q-Learning-Algorithm-in-Python-with-Cart-Pole-OpenAI-Gym--Gymnasium-Environment)
