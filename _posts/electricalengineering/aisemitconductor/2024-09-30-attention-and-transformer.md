---
title: "[AI Semiconductor] Attention and Transformer"
categories:
  - aisemiconductor
---
# Attention

앞서 배운 seq2seq 모델은 인코더에서 입력 시퀀스를 컨텍스트 벡터라는 하나의 고정된 크기의 벡터 표현으로 압축하고, 디코더는 이 컨텍스트 벡터를 통해서 출력 시퀀스를 만들어냈습니다. 하지만 이러한 RNN에 기반한 seq2seq 모델에는 크게 두 가지 문제가 있습니다.

1. 하나의 고정된 크기의 벡터에 모든 정보를 압축하려고 하니까 정보 손실이 발생합니다.
2. RNN의 고질적인 문제인 기울기 소실(vanishing gradient) 문제가 존재합니다.

어텐션의 기본 아이디어는 디코더에서 출력 단어를 예측하는 매 시점(time step)마다, 인코더에서의 전체 입력 문장을 다시 한 번 참고한다는 점입니다. 단, 전체 입력 문장을 전부 다 동일한 비율로 참고하는 것이 아니라, 해당 시점에서 예측해야할 단어와 연관이 있는 입력 단어 부분을 좀 더 집중(attention)해서 보게 됩니다.

Attension을 함수로 표현할 수 있습니다. Attention 함수는 주어진 Query에 대해 모든 Key와의 유사도를 구하고, 이 유사도를 키와 mapping되어 있는 각각의 value에 반영합니다.

Attension(Q, K, V) = Attention Value

- Q: Query
- K: Key
- V: Value

## Dot-Product Attention

1. Attension score by dot product
2. Attention distribution by Softmax
3. Attention value by weighted sum
4. Concatenate
5. Dense Layer VMM & Softmax

# Transformer

기존의 seq2seq의 encoder-decoder 구조를 차용하지만 RNN(LSTM)을 사용하지 않고 attension만으로 구현한 model (Attension is all you need (NIPS 2017))

RNN(LSTM)에서는 단어들을 순차적으로 입력받았지만, transformer는 단어들이 동시에 들어갑니다. 단어의 위치 정보를 다른 방식으로 고려하기 때문입니다.

각 tocken을 embedding vector로 만들고 positional encoding과 더하여 encoder에 입력한다.

Transformer에서는 다음의 세 가지 attention이 사용된다.

- Encoder Self-Attension
- Masked Decoder Self-Attention
- Encoder-Decoder Attention

## Encoder in Transformer

Transformer는 여러 개의 encoder를 층으로 구성됩니다. 하나의 encoder는 self-attention과 feed-forward neural network로 구성됩니다.

Self-Attention

1. 입력 문장의 모든 단어 벡터들에 해당하는 weight matrix $W^Q, W^K, W^V$를 곱하여 Q vector, K vector, V vector를 구합니다. 이때 각 weight matrix는 학습의 대상입니다.
2. Scaled dot-product attention을 수행한다.

## Decoder in Transformer
