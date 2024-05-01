---
title: "[Apply] SKT AI Fellowship 6기"
excerpt: "06. 대규모 Multimodal AI모델을 이용한 영상 검색 시스템 - 제안서"
categories: 
  - etc
---
[Yolo 9000 Classes](https://github.com/pjreddie/darknet/blob/1e729804f61c8627eb257fba8b83f74e04945db7/data/9k.names)

## 제안서

top-down

1. 사용자가 질문을 한다. : "비가 오는 밤에 촬영된 영상을 찾아줘"
2. LLM Model을 통해 탐색해야 할 객체를 추출한다. : ["비", "밤"]
3. 

down-top

1. 이미지에서 Yolo 9000 classes에 해당하는 객체를 저장한다.
2. 이미지의 모든 객체와 객체의 속성, 배경에 대한 정보를 text로 저장한다. (이미지의 객체와 객체의 속성을 text로 바꿀 수 있다고 가정한다.)
3. Image frame을 scene 단위로 묶는다.
4. 각 Scene에서 동작을 text로 저장한다. (scene의 동작을 text로 바꿀 수 있다고 가정한다.)
5. 사용자가 질문을 한다.
6. 사용자가 질문한 문장에서 '탐색을 위한 부분'과 '요구 사항'을 추출한다. '탐색의 단서'는 객체, 객체의 속성, 배경을 포함하도록 추출하되 정보가 소실되지 않는 방식으로 가공한다.
7. 가공된 정보와 관련이 있는 scene을 찾는다.
8. scene에서 요구사항에 대한 결과를 도출한다.
9. 결과를 사용자에게 제공한다.

## Memo

모든 정보

- image frame -> 객체, 객체의 속성, 배경(객체 이외의 것)
- 관련이 있는 Image들의 집합인 scene -> 동작

## 드는 생각

- 새로운 기술을 찾기보다 상황을 정확하게 이해하고 주어진 기술을 적절하고 정확하게 사용하는 것이 중요한 것 같다.
