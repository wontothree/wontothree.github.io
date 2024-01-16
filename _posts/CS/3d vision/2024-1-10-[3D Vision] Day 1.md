---
title: "[3D Vision] 1"
excerpt: "3D Vision Study"
categories:
  - 3DVision
toc: true
use_math: true
---
## LiDar/voxel-based 3D object detection

- LiDar
- point cloud(LiDar)

## LiDar

- light detectino and ranging의 약자
- time of flight의 방식을 주로 사용한다.

출발한 빛이 반사되어 되돌아 올 때까지의 시간을 측정해서 거리를 측정한다. 각도와 거리를 바탕으로 point cloud를 생성한다.

## point cloud

2차원을 사용하는 경우는 거의 없다.

10~100만 개의 점이 찍힌다.

## Voxel

공간을 카르테시안 좌표계에서 일정한 좌표계로 나눴을 때 하나의 직육면체를 의미한다.

pixel의 3차인

voxel-based는

## Object Detection

2D 이미지에서 시작된 개념이다.

object라고 할만 한 것이 이미지에서 검출되었을 때 검출된 정보의 class를 찾는다.

bounding box는 검출된 물체를 일부만 포함할 수도 있다.

3d object detection은 3차원으로 검출하는 것이다. 3차원 상자가 뜨는 것이다.

## VoxelNet cvpr 2018

- 라이더 데이터만을 사용한다.

1. 포인트 클라우드가 잡히는 공간을 3D 볼셀로 나눈다.
2. 각 복셀을 VFE layer로 인코드한다.
3. 복셀 데이터를 3d conv를 통해 벡터나 텐서로 바꾼다.
4. RPN

포인트 클라우드를 입력으로 받는다.

feature learning network로 들어간다.

물체인지 아닌지를 추출한다.

## Architecture

1. voxel partition : 하나의 복셀의 크기 그룹핑은 포인트 클라우드의 포인트들이 소속되는 복셀을 찾는 것
2. grouping
3. random smpling : 10~100만개의 점을 다루는데, 3만개씩 뭉쳐있는 경우가 발생하는데 계산이 복잡해지고 불필요하게 많은 비용이 들어간다. 하나의 복셀 안에 특정 수를 넘는 포인트가 있으면 특정 수가 되도록 랜덤 추출해서 진행한다.
4. voxel feature encoding : 라이더가 reflectence도 얻는다. 세기의 강도. 상대좌표를 가지고 연장한다.

probability score map
regression map

loss function

positive anchor boxes

negative anchor boxes

residual vector

efficient implementation

실제로 80%가 빈공간이다. 포인트가 있는 복셀만 픽셀을 뽑아서 인덱싱해서 사용한다.

## 박형호 Point cloud tools

다양한 툴들의 장단점과 ROS에 대한 기초적인 설명

ROS : 로봇 운영 체제

로봇 개발을 위한 라이브러리

우분트 리눅스에서 사용한다.

통신값을 확인할 수 있다.

ROS 사용 이유

- 분산 프로세스(Node) 마스터를 기준으로 노드들이 유기적인 구조를 이룬다.
- 패키지 단위 : 모바일봇 메타 패키지 안에 기능별로 구현되어 있다. 기능들로 폴더를 구현한다. 로스의 장점은 런치를 사용할 수 있는 것이다.

공통 라이브러리 : API를 들고 올 수 있다.

직접 설치해야 한다. 백그라운드에 라이브러리를 설치하고 사용한다.

C++, Python, Java 등 다양한 프로그래밍 언어를 사용 가능

다른 언어를 사용한 코드들이 기능별로 구현되어 서로 주고 받을 수 있다.

## 정보를 어떻게 주고 받느냐

- 토픽 : 정보를 일방적으로 던진다.
- 서비스 : request와 response가 있다. 한 번으로 이루어진다. 한 번이라도 어긋나면 프로그램이 멈춘다.
- 액션 : client가 serve가 중간 과정에 대해 계속 설명한다.

## ROS1 vs ROS2

ROS1

- 단일 로봇 제어(스레드 1개 존재)
- 안정적인 네트워크 환경 요구
- 실시간 제어 지원 x
- 주로 ubuntu에서 사용 가능

ROS2

- 복수 로봇 제어(스레드 다수 존재)
- 불안정적인 네트워크 환경 가능
- 실시간 제어 지원 o
- 임베디드 시스템에서 사용 가능

## Rviz

- Ros Visualization Tool (ROS의 도구 중 하나)
- 센서 데이터 시각화 가능
- URDF 표현 가능

ROS의 프레임은 유클리드 좌표계이다. 서로 분리되어 있다.

tf값을 연결해야 한다. map 안에서 로봇이 어떻게 이동하는지 포인트 클라우드 정보들을 나타낼 수 있다.

포인트 클라우드들이 다양하게 찍히는 것이 아닌 엉망진창이 될 것이다.

## Open3D

3차원 데이터를 다루는 소프트웨어 개발을 지원하는 오픈소스 라이브러리

- 3D 메쉬 생성에 다른 Tool보다 가벼움
- 쉬운 설치

## Cloudcompare

- 포인트클라우드를 전문적으로 사용할 수 잇다.
- 거리측정, 표면분석 등에 대한 기능을 제공한다.
- 대규모 레이저 스캔 데이터를 다루는 데 유용하다.

둘 다 3D 데이터 처리 도구

Open3D

- 3D 기하학, 머신러닝 등에 중점
- 컴퓨터 비전 및 머신러닝 지원
- 유연한 확장성

Cloudcompare

- 포인트 클라우드 전용
- 대구ㅠ모 레이저 라이다 센서 데이터 처리에 적합
- 다양한 포인트 클라우드 기능이 존재한다.
