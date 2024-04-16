---
title: "[Paper Review] MoAI: Mixture of All Intelligence for Large Language and Vision Models"
excerpt: 12 Mar 2024
categories:
  - paperreview
toc: true
toc_icon: star
share: false
use_math: true
---
## ABSTRACT

요즘에는 대규모 언어 모델(LLMs)과 지시 튜닝이 현재의 지시 튜닝 대규모 언어 및 시각 모델(LLVMs)의 추세로 이어지고 있습니다. 이 추세는 특정 목표에 맞추어 세밀하게 구성된 다양한 지시 튜닝 데이터셋을 선별적으로 구성하거나, 시각 언어(VL) 데이터의 막대한 양을 관리하기 위해 LLVMs를 확장하는 것을 포함합니다. 그러나 현재의 LLVMs는 세분화된 컴퓨터 비전(CV) 모델에서 실세계 장면 이해와 같은 시각 지각 작업에서 제공되는 상세하고 포괄적인 정보를 무시했습니다. 대신, 기존의 LLVMs는 주로 LLM 백본의 대용량 및 신흥 능력에 의존합니다. 따라서, 우리는 외부 세분화, 감지, SGG 및 OCR 모델의 출력으로부터 얻은 보조 시각 정보를 활용하는 새로운 LLVM인 MoAI를 제시합니다. MoAI는 MoAI-Compressor와 MoAI-Mixer라는 두 개의 새로운 모듈을 통해 작동합니다. 외부 CV 모델의 출력을 문서화한 후, MoAI-Compressor는 이러한 출력을 조정하고 압축하여 VL 작업에 관련된 보조 시각 정보를 효율적으로 활용합니다. MoAI-Mixer는 Expert 혼합 개념을 활용하여 시각 특징, 외부 CV 모델의 보조 특징 및 언어 특징 세 가지 유형의 지능을 혼합합니다. 이 통합을 통해 MoAI는 모델 크기를 확장하거나 추가적인 시각 지시 튜닝 데이터셋을 구성하지 않고도 실세계 장면 이해와 관련된 다양한 제로 샷 VL 작업에서 주요한 성과를 거둡니다. 코드는 https://github.com/ByungKwanLee/MoAI에서 사용할 수 있습니다.
