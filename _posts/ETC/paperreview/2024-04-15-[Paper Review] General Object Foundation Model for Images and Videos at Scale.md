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

- **A general object foundation model framework** : our unified approach to handle multiple modalities enables us to concurrently solve various object-centric tasks, all while maintaining state-of-the-art performance.
  - detection
  - instance segmentation
  - referring expression comprehension
  - interactive segmentation
  - multi-object tracking
  - video object segmentation
  - video instance segmentation
  - video referring segmentation
- **A multi-granularity jooint supervision and scaleable training paradigm**
- **Strong zero-shot transferability to a wide range of object level image and video tasks** :

## 2. Related Work

### 2.1. Visual Foundation Model

### 2.2. Unified and General Model

### 2.3. Vision-Language Understanding

## 3. Method

### 3.1 Formulation

### 3.2 Task Unification

### 3.3 Training Unification
