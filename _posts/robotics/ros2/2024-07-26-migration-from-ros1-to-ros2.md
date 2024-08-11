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

C 언어에서는 kernel에서