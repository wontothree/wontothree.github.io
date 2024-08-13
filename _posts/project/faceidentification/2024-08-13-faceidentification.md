---
title: "[InBody Scale AI] Face Identification"
excerpt:
categories: 
  - inbodyscaleai
---
## Library deepface

deepface 라이브러리를 이용해서 간단한 간단한 face verification 기능을 구현해보았다.

![](./../../../img/inbodyscaleai/face-identification-1.png){: .align-center width="400" height="200"}

![](./../../../img/inbodyscaleai/face-identification-2.png){: .align-center width="400" height="200"}

![](./../../../img/inbodyscaleai/face-identification-3.png){: .align-center width="400" height="200"}

![](./../../../img/inbodyscaleai/face-identification-5.png){: .align-center width="400" height="200"}

```py
from deepface import DeepFace

result = DeepFace.verify(img1_path="1.png", img2_path="2.png")

print(result)
```

결과

```py
# 1 - 2
{'verified': True, 'distance': 0.3741865460590087, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 979, 'y': 2535, 'w': 61, 'h': 61, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 2899, 'y': 1201, 'w': 105, 'h': 105, 'left_eye': None, 'right_eye': None}}, 'time': 10.97}

# 1 - 3
{'verified': True, 'distance': 0.5353439661726294, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 979, 'y': 2535, 'w': 61, 'h': 61, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 336, 'y': 1756, 'w': 86, 'h': 86, 'left_eye': None, 'right_eye': None}}, 'time': 13.11}

# 1 - 4
{'verified': True, 'distance': 0.29401419437888754, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 979, 'y': 2535, 'w': 61, 'h': 61, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 1180, 'y': 1797, 'w': 48, 'h': 48, 'left_eye': None, 'right_eye': None}}, 'time': 10.77}

# 2 - 3
{'verified': False, 'distance': 0.7067760489326051, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 2899, 'y': 1201, 'w': 105, 'h': 105, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 336, 'y': 1756, 'w': 86, 'h': 86, 'left_eye': None, 'right_eye': None}}, 'time': 6.65}

# 2 - 4
{'verified': True, 'distance': 0.5394623340302183, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 2899, 'y': 1201, 'w': 105, 'h': 105, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 1180, 'y': 1797, 'w': 48, 'h': 48, 'left_eye': None, 'right_eye': None}}, 'time': 6.16}

# 3 - 4
{'verified': True, 'distance': 0.5467762156052304, 'threshold': 0.68, 'model': 'VGG-Face', 'detector_backend': 'opencv', 'similarity_metric': 'cosine', 'facial_areas': {'img1': {'x': 336, 'y': 1756, 'w': 86, 'h': 86, 'left_eye': None, 'right_eye': None}, 'img2': {'x': 1180, 'y': 1797, 'w': 48, 'h': 48, 'left_eye': None, 'right_eye': None}}, 'time': 6.16}
```
