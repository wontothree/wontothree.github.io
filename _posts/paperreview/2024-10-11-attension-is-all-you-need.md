---
title: "[Paper Review] Attension is All You Need"
categories:
  - paperreview
---
# Abstract

We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

Experiments on two machine translation tasks show these models to be superior in quality while bein more parallelizable and requireing significantly less time to train.

# 1. Introduction

Recurrent models's inherently sequential nature precludes parallelization, within training examples, which becomes critical at longer sequence lengths, as memory contraints limit batching across examples.

Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks.

In this work, We proposed the transformer.

# 2. Backgound

To the best of our knowledge, the transformer is the first transduction model relying entirely on self-attension to compute representions of its input and output without using sequence-aligned RNNs or convolution.

# 3. Model Architecture
