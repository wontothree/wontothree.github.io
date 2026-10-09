I believe that the truely understanding means begin able to implement its logic myself without dependencies. In this sense, I am going to make robotic arm while studying book of modern robotics. I will study modern robotics and I will find the true meaning in designing physical robotic arm.

This chapter is about configuration space.

<iframe src="/blog/posts/configuration-space/five.html" style="align: center;height:600px; width: 600px; border: none"></iframe>

# Configuration Space

Definition

- The **configuration** of a robot is a complete specification of the position of every point of the robot.
- The minimum number $n$ of real-valued coordinates needed to represent the configuration is the number of **degrees of freedom** (**dof**) of the robot
- The $n$-dimensional space containing all possible configurations of the robot is called the **configuration space** (**C-space**)
- The configuration of a robot is represented by a point in its C-space.

## 1. Degrees of Freedom of a Rigid Body

## 2. Degrees of Freedom of a Robot

## 3. Configuration Space: Topology and Representation

We want to consider the shape of C-space.

Revolute (rotational) joint을 생각하보자. joint의 개수를 늘려가면서 configuration space의 shape이 어떻게 변하는지 살펴보자.

먼저, yaw 축을 가진 revolute joint가 하나 있을 때의 상황이다. 전등은 바라보는 방향만을 바꿀 수 있다.

<iframe src="/blog/posts/configuration-space/one.html" style="align: center;height:600px; width: 600px; border: none"></iframe>

다음으로, pitch 축을 가진 revolute joint를 더 했을 때 상황이다. 전등은 반구 모양의 C-space를 가질 수 있다.

<iframe src="/blog/posts/configuration-space/two.html" style="align: center;height:600px; width: 600px; border: none"></iframe>

pitch 축을 가진 revolute joint를 한 번 더 더 했을 때 상황이다. 이제는 전등이 반구 내부 영역에도 도달할 수 있다.

<iframe src="/blog/posts/configuration-space/three.html" style="align: center;height:600px; width: 600px; border: none"></iframe>

## 4. Configuration and Velocity Constraints

전등의 높이를 제한한다면 이러한 형태의 constraints이 발생한다.

## 5. Task Space and Workspace

- The task space is a space in which the robot's task can be naturally expressed.
- The workspace is a specification of the configurations that the end-effector of the robot can reach.

[Task A] 전등 로봇이 사람의 얼굴을 인식하고 사람을 향해 빛을 빛춘다.

[Task B] 전등 로봇이 음악에 맞춰 리듬을 탄다.

# Reference

[1] Kevin M. Lynch and Frank C. Park. Modern Robotics: Mechanics, Planning, and Control. Cambridge University Press, New York, NY, USA, 2017.
