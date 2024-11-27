---
title: "[F1tenth] Introduction"
categories:
  - f1tenth_
---
# 1. Simultaneous Localization and Mapping

# 2. GLobal Planning (Model Predictive Control)

# 3. Localization (SynPF)

# 4. Local Cost Map

# 5. Controller (Model Path Integral Control)

kinematics에 pacejka magic fomula를 추가한 dynamics를 풀면 더 성능이 좋아지지 않을까?

차량의 더 복잡한 dynamics에는 어떤 게 있을까?

```py
# Vector from the current position to the point at lookahead distance
position_la_vector = np.array([lookahead_point[0] - self.position[0], lookahead_point[1] - self.position[1]])
yaw = self.position[2]
eta = np.arcsin(np.dot([-np.sin(yaw), np.cos(yaw)], position_la_vector)/np.linalg.norm(position_la_vector))
lat_acc = 2*target_speed**2 / lookahead_distance * np.sin(eta)

steering_angle = self.steer_lookup.lookup_steer_angle(lat_acc, target_speed)
ack_msg.drive.steering_angle = steering_angle
ack_msg.drive.speed = np.max(target_speed, 0)  # no negative speed
```

# 6. System