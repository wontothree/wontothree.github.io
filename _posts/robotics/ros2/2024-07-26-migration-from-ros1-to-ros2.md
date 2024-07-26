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

## Reference

https://docs.ros.org/en/foxy/The-ROS2-Project/Contributing/Migration-Guide.html#prerequisites