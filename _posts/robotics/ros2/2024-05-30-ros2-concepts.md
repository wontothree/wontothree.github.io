---
title: "[ROS2] ROS Concepts"
excerpt:
categories: 
  - ros2
---
## Workspace

![](../../../img/ros2/workspace.png)

```
my_ros2_workspace/
├── build/
│   └── (build artifacts)
├── install/
│   └── (installed files)
├── log/
│   └── (log files)
└── src/
    ├── my_package_1/
    │   ├── CMakeLists.txt
    │   ├── package.xml
    │   └── src/
    │       └── (source files)
    └── my_package_2/
        ├── CMakeLists.txt
        ├── package.xml
        └── src/
            └── (source files)
```

- [workspace_name]/src : package들이 들어간다.

ROS2에서는 패키지가 워크스페이스 내의 src 디렉토리 하위에 여러 계층의 디렉토리 구조를 가질 수 있습니다. colcon 빌드 도구는 하위 디렉토리 내에 있는 패키지를 모두 탐색하여 빌드할 수 있습니다. 따라서 workspace_name/src/repository/pathplanning/pid_planning와 같은 경로에 패키지가 위치해도 문제 없습니다.

중요한 점은 package.xml과 CMakeLists.txt 파일이 패키지의 루트 디렉토리에 있어야 한다는 것입니다. pid_planning 디렉토리 안에 이 두 파일이 있어야 합니다.

## Packages

- 관련된 코드, 데이터, 라이브러리, 설정 파일 등을 하나의 단위로 묶은 것
- 패키지는 기능적으로 관련된 코드를 모듈화하고, 쉽게 재사용하고 배포할 수 있도록 한다.

구조

- src/ : source code directory
- launch/ : launch file directory
- msg/ : message file directory
- srv/ : service file directory
- CMakeLists.txt : 프로젝트의 빌드 프로세스를 정의하는 스크립트. 프로젝트 설정, 소스 및 헤더 파일 관리, 라이브러리 및 실행 파일 생성, 의존성 관리, 설치 지시사항 등을 포함하여 프로젝트를 컴파일하고 링크하는 데 필요한 모든 정보를 제공한다. 다양한 플랫폼과 컴파일러에서 일관된 빌드 환경을 제공한다.
- package.xml : build와 dependency 관리를 위한 파일

## CMakeLists.txt

역할

1. 프로젝트 정의 : 프로젝트의 이름 버전, 최소 CMake 버전 등을 정의한다.
2. 패키지 찾기 : 프로젝트에서 필요한 외부 라이브러리와 패키지를 찾고, 해당 패키지의 위치와 관련 정보를 설정한다.
3. 소스 파일 및 헤더 파일 설정 : 프로젝트의 소스 파일과 헤더 파일을 설정하고 이들을 컴파일하여 최종 실행 파일이나 라이브러리를 생성한다.
4. 라이브러리 및 실행 파일 생성
5. 설치 지시 사항
6. 테스트 및 빌드 옵션 설정
7. 패키지 의존성 관리
8. 조건부 컴파일
9. 다양한 CMake 매크로 및 함수 사용
10. 디렉토리 및 서브 디렉토리 관리

## Node

## Launch File

- ROS에서 시스템의 여러 노드를 한꺼번에 실행하고 관리하기 위해 사용되는 XML 형식의 설정 파일
