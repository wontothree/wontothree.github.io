---
title: "[Paper Review] General Object Foundation Model for Images and Videos at Scale"
excerpt: 14 Dec 2023
categories:
  - paperreview
toc: true
toc_icon: star
share: false
use_math: true
---
## Abstract

- An object-level foundation model for locating and identifying objects in images and videos.
- [Model and Code](https://glee-vision.github.io/)

## 1. Introduction

>**Foundation model** : an emerging paradigm for building artificial general intelligence (AGI) systems, signifying a model trained on broad data that is capable of being adapted to a wide range of downstream tasks in an general paradigm.

- **NLP foundation models** such as BERT, GPT-3, T5 developed with unified input-output paradigms and large-scale pre-trainning, have achieved remarkable generalization capabilities to address nearly all NLP tasks.
- **Visual foundation models** can only serve specific subdomains, such as CLIP for multi-modal visual model, MAE for visual representations model, SAM for segmetation model.
- We introduce **a general object visual foundation model - GLEE**, which simultaneously solve a wide range of object-centric tasks while ensuring SOTA performance, including object detection, instance segmentation, grounding, object tracking, interactive segmentation and tracking, etc.

![](./../../../img/paperreview/glee.png)

## 2. Related Work

### 2.1. Visual Foundation Model

NLP 분야의 기초 모델 [9, 19, 22, 78, 91]이 놀라운 성과를 거두자, 시각 기초 모델의 구축이 점점 더 주목받고 있습니다. NLP 작업이 주로 텍스트 대 텍스트 패러다임 아래 통합되는 반면, 컴퓨터 비전 작업은 여전히 형태와 정의에서 상당한 차이를 보입니다. 이러한 격차로 인해 시각 기초 모델은 일반적으로 단일 작업 학습 프레임워크에서 훈련되어 특정 하위 도메인 내의 작업에만 적용되는 것이 일반적입니다. 예를 들어, CLIP [77], ALIGN [41], Florence [121], BEIT3 [97], Flamingo[2]와 같은 다중 모달 시각 기초 모델은 대규모 이미지-텍스트 쌍에서 대조 학습과 가려진 데이터 모델링을 활용하여 효율적인 전이 학습을 이루고, 비전-언어 작업에서 인상적인 제로 샷 기능을 보여줍니다. DALL-E [79, 80]와 Stable Diffusion [83]은 대규모 이미지와 캡션 쌍으로 훈련되어 텍스트 지시에 의존한 자세한 이미지 콘텐츠를 생성할 수 있습니다. DINO [12], MAE [35], EVA [27], ImageGPT [14]는 대규모 이미지 데이터에서 자기 지도 학습을 통해 강력한 시각적 표현을 얻으며, 이를 후속 작업으로 전이합니다. 이러한 기초 모델은 이미지 수준의 특징을 학습하지만, 이는 객체 수준의 작업에 직접적으로 적용되지 않습니다. 최근 제안된 SAM [43]은 시각적 프롬프트(예: 점 및 상자)에 기반하여 주어진 이미지의 모든 객체를 분할할 수 있는 능력을 갖추고 있으며, 풍부한 객체 수준 정보와 강력한 일반화 능력을 보여줍니다. 그러나 객체 정보는 의미적 맥락이 부족하여 객체 수준 작업에서의 응용이 제한됩니다. 기존의 시각 기초 모델과 달리, 우리는 추가 매개 변수나 세밀한 조정 없이 후속 작업을 직접 해결할 수 있는 객체 기초 모델을 개발하고자 합니다.

### 2.2. Unified and General Model

통합 모델은 다중 비전 또는 다중 모달 작업을 하나의 모델 내에서 처리할 수 있는 능력 때문에, 다중 작업 통합 측면에서 기초 모델과 유사점을 공유합니다. MuST [30]와 Intern [87]은 여러 비전 작업을 훈련하고 동시에 해결하는 것을 제안합니다. 시퀀스 대 시퀀스 NLP 모델 [9, 78]의 성공을 모방하여, Uni-Perceiver [133], OFA [94], Unified-IO [66], Pix2Seq v2 [15], 그리고 UniTAB [114]과 같은 모델들은 통합된 패러다임 내에서 여러 작업을 시퀀스 생성 작업으로 모델링하는 것을 제안합니다. 이러한 접근 방식은 작업 간 일반화 능력을 보여주었지만, 주로 이미지 수준의 이해 작업에 중점을 두고 있습니다. 또한, 상자와 마스크의 자동 회귀 생성은 추론 속도를 현저히 느리게 만들며, 성능은 여전히 최첨단 작업 특정 모델의 성능에 미치지 못합니다. 감지기 [50, 132]를 기반으로 Uni-Perceiver v2 [51]와 UNINEXT [112]는 통합된 최대 우도 추정과 객체 검색을 활용하여 다양한 작업을 지원하여 지역화의 도전을 효과적으로 해결합니다. 그러나, 이들은 폐쇄 집합 데이터에서 훈련되어 있기 때문에 제로 샷 일반화 능력을 보여주지 않습니다. X-decoder [134]와 SEEM [135]은 픽셀 수준 분할과 언어 토큰을 예측할 수 있는 일반화된 디코딩 모델을 구축합니다. 통합 모델과는 달리, 제안된 GLEE는 단지 통합된 방식으로 객체 수준 작업을 직접 해결하는 것뿐만 아니라, 보다 넓은 범위의 작업에 대한 기초가 되는 보편적인 객체 표현을 제공하여 새로운 데이터와 작업에 잘 일반화되며, 자세한 객체 정보가 필요한 작업에 대한 중심 요소로 작용합니다.

### 2.3. Vision-Language Understanding

## 3. Method

### 3.1 Formulation

### 3.2 Task Unification

### 3.3 Training Unification
