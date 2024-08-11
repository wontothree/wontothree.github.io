---
title: "[ROS2] Migration from ROS1 to ROS2"
excerpt:
categories: 
  - ros2
---
## Migration steps

1. Package manifests : package.xml 파일을 수정해야 한다.
2. Metapackages : <metapackage /> tag는 제거해라.
3. Message, service, and action definitions
4. Build system
5. Update source code

## CMakeLists.txt

Build system

- ROS1 : catkin
- ROS2 : ament

### 기타

C 언어에서는 kernel에서 gcc라는 명령어를 사용한다. gcc라는 명령어로 compile과 linking을 할 수 있다.

- compile : programming language -> assembly code (or machine code)
- linking : assembly code를 연결한다.

c 파일과 header 파일을 각각 compile하고 linking한다.

원래는 gcc or gpp로 c 파일 컴파일, header 파일 컴파일, linking을 해야 한다.

- make file : compile과 linking을 하기 위한 gcc 명령어의 집합. cpp 파일을 compile한다.
- CMakeLists.txt : 기입된 의존성과 특성, 환경 등에 대한 정보를 이용해서 make 파일을 만든다.

CMake를 실행하면 make file을 만든다.

## Reference

https://docs.ros.org/en/foxy/The-ROS2-Project/Contributing/Migration-Guide.html#prerequisites