---
title: "[Paper Review] General Object Foundation Model for Images and Videos at Scale"
excerpt: 14 Dec 2023
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

- Foundation model : an emerging paradigm for building artificial general intelligence (AGI) systems, signifying a model trained on broad data that is capable of being adapted to a wide range of downstream tasks in an general paradigm.
- 기존 연구 : Despite being widely studied, current visual foundation models are still focusing on establishing correlations between global image features and language descriptions or learning image-level feature representations. However, locating and identifying objects constitute foundational capabilities in computer vi- sion systems, serves as a basis for solving complex or high level vision tasks such as segmentation, scene understand- ing, object tracking, event detection, and activity recogni- tion and support a wide range of applications.
- GLEE : To address the aforementioned limitation, providing general and accurate object-level information, we introduce a general object vi- sual foundation model, coined as GLEE, which simultane- ously solve a wide range of object-centric tasks while ensur- ing SOTA performance, including object detection, instance segmentation, grounding, object tracking, interactive seg- mentation and tracking, etc., as shown in Figure 1. Through a unified input and output paradigm definition, our model is capable of learning from a wide range of diverse data and predicting general object representations, which masks it to generalize well to new data and tasks in a zero-shot manner and achieve amazing performance. In addition, thanks to the unified paradigm, the training data can be scaled up at low cost by introducing a large amount of automatically la- beled data, and further improve the zero-shot generalization ability of the model.

![](./../../../img/paperreview/glee.png)

- A general object foundation model framework. Our objective is to build an object visual foundation model ca- pable of simultaneously addressing a wide range of object- centric tasks.
- Our objective is to build an object visual foundation model ca- pable of simultaneously addressing a wide range of object- centric tasks. Specifically, we employ an image encoder, a text encoder, and a visual prompter to encode multi-modal inputs. They are integrated into a detector to extract ob- jects from images according to textual and visual input. This unified approach to handle multiple modalities en- ables us to concurrently solve various object-centric tasks, including detection [11, 58, 90, 132], instance segmenta- tion [16, 34], referring expression comprehension [38, 62, 104, 131], interactive segmentation [1, 13, 135], multi- object tracking [21, 68, 111, 126, 129], video object seg- mentation [17, 18, 73, 110], video instance segmenta- tion [37, 98, 101, 103, 113], and video referring segmen- tation [86, 102, 104], all while maintaining state-of-the-art performance.
- The unified support for multi-source data in our approach greatly facilitates the incorporation of addi- tional manually or automatically annotated data, enabling easy scaling up of the dataset. Furthermore, the alignment of model optimization across tasks means that joint training serves not only as a unifying strategy but also as a mecha- nism to boost performance across individual tasks.
- Strong zero-shot transferability to a wide range of object level image and video tasks. After joint training on data from diverse sources, GLEE demonstrates remark- able versatility and zero-shot generalization abilities. Ex- tensive experiments demonstrate that GLEE achieves state- of-the-art performance compared to existing specialist and generalist models in object-level image tasks such as detec- tion, referring expression comprehension, and open-world detection, all without requiring any task-specific designs or fine-tuning. Furthermore, we showcase the extraordi- nary generalization and zero-shot capabilities of GLEE in large-vocabulary open-world video tracking tasks, achiev- ing significantly superior performance over existing models even in a zero-shot transfer manner. Additionally, by incor- porating automatically annotated data like SA1B [43] and GRIT [75], we are able to scale up our training dataset to an impressive size of 10 million images at a low cost, which is typically challenging to achieve for object-level tasks and further enhances the generalization performance. More- over, we replace the SAM [43] component with GLEE in a multimodal Large Language Model (mLLM) [47] and ob- serve that it achieves comparable results. This demonstrates that GLEE is capable of supplying the visual object-level in- formation that modern LLMs currently lack, thus laying a solid foundation for an object-centric mLLMs.

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
