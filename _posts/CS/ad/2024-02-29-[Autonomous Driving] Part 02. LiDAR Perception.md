---
title: "[Autonomous Driving] Part 02. Perception"
excerpt: 자율주행을 위한 컴퓨터비전과 라이다 & 센서퓨전까지 초격차 패키지 Online
categories:
  - AD
toc: true
use_math: true
---
## Chapter 00 강의 소개

- 컴퓨터 비전 : 입력이 2차원의 이미지
- 3차원 비전 : 입력이 3차원. 센서를 통해 얻거나 여러 시점의 2차원 데이터를 조합하여 3차원 데이터를 얻는다. 이 데이터에 대해 분석한다.
  - 객체 검출
  - Semantic segmentation

3차원 비전 데이터 취득 방법

1. 다시점 기하학 : 여러 장의 2차원 이미지를 통해 3차원 위치값을 추정한다. muti view stereo, stereo matching.
2. 깊이 카메라 : stereo matching, time of flite, struct late 등의 방법으로 z값을 센싱할 수 있다.
3. 라이다 센서 : 레이저 기반 스캐닝

우리는 3번을 한다.

출력값이 포인트 클라우드이다. 포인트 클라우드 프로세싱이 중요하다.

- chap 1 : 라이다 데이터의 특징 및 처리 방법
- chap 2 : 포인트 클라우드를 딥러닝에 접목하기 위한 backbone model
- chap 3 : 3차원 정합 알고리즘, 포인트 클라우드를 통해 처리할 수 있는 방법론, 고전적인 3d vision 기반의 방법과 딥러닝 기반의 방법 등...
- chap 4 : 3차원 객체 검출. 포인트 클라우드 입력을 이용해 객체 검출을 수행할 수 있는 ai model 소개, 객체 검출에 사용되는 라이브러리 실습
- chap 5 : 3d semantic segmentation, 다양한 활용처에 대한 실습

## Chapter 01 LiDAR Data Processing

### 01-01 LiDAR 센서의 종류 및 데이터 취득 방식

라이다 : 직진성이 강한 펄스 레이저를 높은 밀도로 쏘아 이 레이저가 목표 개체에 닿은 뒤 돌아오는 지연 시간을 분석하여 물체까지의 거리를 측정하는 방식의 센서

뎊스 카메라보다 먼 거리를 측정할 수 있다. 200m 이상 떨어진 물체를 측정할 수 있다.

매우 근접한 물체에 대한 센싱을 할 수 없다.

가까운 물체에 대해 dense하게 point cloud를 생성할 수 있다.

2. 공간 분해능 : 매우 짧은 파장으로 작은 각도 범위까지 세세한 표현을 취득할 수 있다.

특정 거리 가까워지면 조밀한 데이터를 얻을 수 있다.

3. FoV(Field of View) : 카메라 대비 넓다. 회전 방식 라이다는 360도까지 커버할 수 있다.
4. 해상도 : 해상도를 결정하는 두 가지 - 가로 방향으로 얼마나 많은 포인트를 얻는가, 수직 방향으로 몇 개 의 채널을 사용하는가
5. 출력 : Point Cloud - 포인트 클라우드 프로세싱이 중요하다.

#### LiDAR 센서의 종류

- Spanning LiDAR : 전기 모터를 통해 센서를 회전시키며 주변을 스캔하는 방식
  - 장점 : 수직으로 다수의 레이저(채널)을 쏘아 정밀하게 360도 스캔
  - 단점 : 센서의 복잡한 구성과 비싼 가격
- Solid state LiDAR : 별도의 모터 없이 한 방향에 대해 스캔을 진행하는 방식
  - 장점 : 단순한 센서 구성으로 저렴한 가격과 소형화가 가능한 형태
  - 단점 : 시야각이 좁고, 정확도는 spaaning 방식 대비 떨어짐
  - 종류 : MEMS, OPA, Flash

#### 데이터 취득 방식

- Time of Flight : 레이저 광선을 쏘아 물체에서 반사되어 오는 반사광의 걸리는 시간 기반
- FMCW(frequency modulated continuous wave) : Time of Flight가 단순한 레이저 광선을 쏜다면, FMCW는 변하는 연속파를 활용한다. 처음에는 긴 파장, 후에는 짧은 파장. 먼 거리 측정과 태양 간섭에 강인하다.
- Laser scanning : Mirror 방식, MEMS 소자 회전 방식, Flash 방식 등 한 번에 레이저 쏘는 형태

### 01-02 포인트 클라우드의 특징

- 매쉬 : 삼각형 면적으로 표현을 이루는 것. 컴퓨터 그래픽에서 많이 사용한다. 프로세싱 측면에서 무거워서 적합성이 떨어진다.
- Voxel : 큐브 형태로 3차원 공간을 균등하게 분할한 것. 단점은 3d 공간에 존재하는 빈 공간을 같이 할당한다. 빈 공간에 대한 연산을 불필요하게 해야 한다.
- Point Cloud : 두 가지의 단점을 보안한다. 표현해야 하는 부분만 점의 형태로 표현한다. 3차원 형상을 여러 개의 점군으로 표현하는 방법. 다른 3차원 표현 대비 그 표현법이 간결하다. 빈공간을 볼 필요도 없고, 표면을 만들 필요도 없다. 빠르고 간결하다.

#### Point cloud 데이터 구성

- 3차원 포인트 좌표 : 이게 없으면 표현력을 잃게 된다.
- 3차원 포인트의 색상(RGB data)
- 3차원 포인트의 노말 벡터 : 표현에 대한 정보를 포함한다.

일반적으로 이 세 가지가 들어가고 추가적으로 필요할 수도 있다. 배열의 형태이기 때문에 접근에 용의하다.

#### Point cloud의 특징

1. Unstructured : 별도의 정형화된 구조가 없어 일부 영역은 dense하거나 sparse하다.
2. Unordered : 데이터의 순서가 정해져 있지 않다. 이미지는 좌표를 설정할 수 있지만 포인트는 무작위로 정의되어 있다.
3. Simple : 점 하나에 위치 및 색상, 노말 등 다양한 정보를 저장해낼 수 있다.
4. Permutation invariant : 요소의 순서와 상관 없이 같은 출력을 도출할 수 있는 구조이다. 포인트 클라우드가 배치된 순서에 영향을 받지 않는다. 딥러닝 측면에서 치명적인 단점이다.
5. Hard to apply CNN : CNN은 2차원 이미지와 같이 구조화된 입력을 요구하기 때문에 CNN에 적용할 수 없다. CNN, RNN에 적용할 수 없다.

#### Applications

포인트 클라우드를 이용해 어떤 것을 할 수 있을까?

- Registration : 두 포인트 클라우드에서 상응 관계를 찾아 두 개의 클라우드 포인트 모델을 동일한 위치에 정합시킬 수 있다.
- Classification : 포인트 클라우드가 어떤 객체를 나타내느냐를 식별할 수 있다.
- Semantic segmentation
- Part segmentation : 특정한 객체로부터 옴체, 날개, 꼬리를 식별할 수 있다. 3d 모델에서 파트를 추출할 수 있다.
- Object detection : 3d 입력으로부터 객체를 검출
- Odometry : 라이다 오도메트리나 라이다 슬램을 할 수 있다.

#### Parametric vs Implicit

- 파라메틱 : 눈에 보이는 명시적인 단위로 표현하는 것 - 포인트 클라우드, triangle mesh
- Implicit : 함수에 의한 표현 등 - level set

### 01-03 테스트를 위한 ROS 환경 구성(1)

ROS 20.04 LTS Noetic

install terminator

```
sudo apt install terminator
```

```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

```
sudo apt install curl
```

```
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
```

complete environment setting

```
sudo apt update
```

ROS install

```
sudo apt install ros-noetic-desktop-full
```

activating ROS before roscore

```
source /opt/ros/noetic/setup.bash
```

```
roscore
```

```
vi .bashrc
```

or

```
vim .bashrc
```

```
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

you can find added line - source /opt/ros/noetic/setup.bash

this is setup file.

autonomous ROS environment setting on terminal

```
vi .bashrc
```

install dependence package

```
sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential
```

```
sudo rosdep init
```

complete all ROS environment

```
rosdep update
```

### 01-04 테스트를 위한 ROS 환경 구성(2)

catkin_ws is a main root directory of ROS workspace

```
mkdir -p catkin_ws/src
```

```
cd catkin_ws
```

build command : auto making build folder and devel folder

```
catkin_make
```

you can activate project environment. also other terminal

```
source devel/setup.bash
```

ros node : program unit cooresponding to one task

node example

ros-noetic-[package name]

ros-noetic-slam-gmapping

```
sudo apt install ros-noetic-ros-tutorials
```

in a terminal

```
roscore
```

in another terminal

you can check rosnode on now

```
rosnode list
```

```
source /opt/ros/noetic/setup.bash
```

```
rosrun turtlesim turtlesim_node
```

you can check /turtlesim

```
rosnode list
```

topic : data unit

node A -> the other node B

topic : "hello"

A : publish / B : subscribe

topic example

```
rosrun turtlesim turtle_teleop_key
```

```
rostopic list
```

```
rostopic echo /turtle1/pose
```

second way to check ros topic : rqt

```
sudo apt install ros-noetic-rqt-common-plugins
```

```
rosrun rqt_graph rqt_graph
```

dataset download

```
rviz
```

### 01-05 테스트를 위한 ROS 환경 구성(3)

ROS back file : recorded result - LiDAR mapping, oddometry, trajectory result and so on.

start

```
mkdir -p ouster_ws/src
```

```
cd ouster_ws/src
```

```
git clone https://github.com/ouster-lidar/ouster_example
```

install ouster ros package

```
catkin_make ouster_ros
```

build

```
catkin_make
```

on catkin_ws directory

l : infinite loop

```
rosbag play -l ouster_example.bag
```

check information of ros bag

```
rosbag info ouster_example.bag
```

```
rviz
```

add -> By topic -> Odometry -> OK

map -> odom

Close without Saving

add -> By topic -> Odometry -> OK

Fixed Frame : base_link

lobby_lidaar bag example

```
rosbag play -l lobby_lidar.bag
```

install driver

```
sudo apt install ros-noetic-velodyne
```

```
mkdir -p velo_ws/src
```

```
git clone https://github.com/ros-drivers/velodyne.git
```

on velo_ws

```
rosdep install --from-paths src --ignore-src --rosdistro noetic -y
```

```
catkin_make
```

on catkin_ws

```
rviz
```

add -> By topic -> PointCloud2

```
source devel/setup.bash
```

```
roslaunch velodyne_pointcloud VLP16_points.launch
```

### 01-06 자율주행 실습을 위한 오픈 라이다 데이터셋 소개

라이다 데이터셋의 역할

- 목적 : 항해법 성능 개선을 위한 알고리즘 반복 평가
- 성능의 정량적인 평가
- 잠재적인 약점 분석
- 다른 방법들과 객관적인 비교
- 많은 데이터는 실제 상황에서 알고리즘의 적은 편차와 높은 신뢰도를 보장

KITTI dataset

- 주율 주행 목적인 컴퓨터 비전 분야에서 가장 대표적으로 쓰이는 데이터셋

- 데이터셋 취득을 위한 센서 구성
  - GPS/IMU: OXRS RT 3003
  - LiDAR : Velodyne HDL-64E
  - Grayscale Camera x 2 : Point Grey Flea 2
  - Color Cmaera x 2 : Point Grey Flea 2
- 활용 가능 분야
  - Stereo vision
  - Optical flow
  - Depth estimation
  - Visual/LiDAR odometry
  - Object detection/tracking
  - Semantic segmentation
  - Road/lane detection

Semantic-KITTI dataset

- KITTI dataset을 ai 목적에 맞게 customize한 dataset
- AI processing을 위한 추가적인 annotiation이 포함된(semantic label 등)
- 데이터셋 구성
  - 0~10번 시퀀스는 학습을 위한 어노테이션이 포함된
  - 11~21번 시퀀스는 테스트에 주로 활용되며, 다양한 hard case들이 포함되어 있음
  - 총 28개의 클래스 레이블이 있음
- 주요 활용 분야
  - Semantic segmentation
  - Panoptic segmentation
  - Semantic scene completion

nuScenes dataset

- 센서 구성
  - 카메라 6대
  - 스피닝 라이다 1대
  - 장거리 레이더 센서 5대
- 포함사항
  - 각 센서 간 extrinsics calibratino
  - 카메라의 intrinsic calibration
  - 센서 synchronization
  - 모델 학습을 위한 class annotation

Waymo open dataset

1. Perception data
  - 세그멘테이션 레이블 및 객체 어노테이션 포함
  - 맵 데이터
  - 센서 구성
    - 중거리 라이다 1대
    - 단거리 라이다 4대
    - 카메라 5대
  - 센서 설정
    - 라이다와 카메라 간 동기화
    - LiDAR to Camera projection
    - 센서 캘리브레이션 및 이를 활용한 주행체의 pose
2. Motion data
  - 센서 구성
    - 중거리 라이다 1대
    - 단거리 라이다 4대
  - 객체 추적을 위한 어노테이션 데이터
  - 맵 데이터

Complex urban dataset

- 2018에 KAIST에서 공개한 오픈 데이터셋
  - 복잡한 도시 촬영을 하면서 복잡한 씬에 대한 데이터 취득
  - 빌등 숲을 구성한 도시에서 GPS 수신호가 취약한 점을 참고하여 이러한 환경에서 집중적으로 데이터셋을 취득함

### 01-07 포인트 클라우드 처리 방법 구현을 위한 Open3D 사용법

Open3D : point cloud 계의 openCV

```
sudo apt install python3-pip
```

```
pip install open3d
```

```
python
```

```
impost open3d
```

sample.py

```py
import open3d as o3d
import numpy as np

print("Load a ply")

ply_point_cloud = o3d.data.ply_point_cloud()

pcd = o3d.io.read_point_cloud(ply_point_cloud.path)

print(pcd)

print(np.array(pcd.points))

o3d.visualization.draw_geometries(
    [pcd],
    zoom=0.3412,
    front=[0.4257, -0.2125, -0.8795],
    lookat=[2.6172, 2.0475, 1.532],
    up=[-0.694, -0.9768, 0.2024],
)
```

### 01-08 포인트 클라우드 시각화 및 편집 툴 CloudCompare 사용법

### 01-09 LiDAR 데이터 학습을 위한 레이블링 툴 소개

## Chapter 02 Point Cloud Processing Backbone

## Chapter 03 Point Cloud Matching

## Chapter 04 3D Object Detection

## Chapter 05 3D Segmentation
