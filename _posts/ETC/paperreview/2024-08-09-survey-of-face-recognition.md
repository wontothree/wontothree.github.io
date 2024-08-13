---
title: "[Paper Review] A Survey of Face Recognition"
categories:
  - paperreview
---
## Abstract

Recent years witnessed the breakthrough of face recognition with deep convolutional neural networks. Dozens of papers in the field of FR are published every year.

- an introduction to face recognition, including its history, pipeline, algorithms based on conventional manually designed features or deep learning, mainstream training, evaluation datasets, and related applications.
- have analyzed and compared state-of-the- art works as many as possible, and also carefully designed a set of experiments to find the effect of backbone size and data distribution.
- a material of the tutorial named The Practical Face Recognition Technology in the Industrial World in the FG2023.

## 1. Introduction

- Chapter 2 : history of face recognition
- Chapter 3 : pipeline in the deep learning framework
- Chapter 4 : details of face recognition algorithms - loss functions, embedding techniques, face recognition with massive IDs, cross-domain, pipeline acceleration, closed-set training, mask face recognition, privacy preserving
- Chapter 5 : experiments fo find the effect of backbone size and data distribution
- Chapter 6 : frequently used training and test datasets and comparison results
- Chapter 7 : application
- Chapter 8 : competitation and open-source programs

## 2. History

Before 2014, FR was processed in non-deep learning ways.

## 3. Pipelines in deep learning framework

In this section, we give the pipelines of ’training’ a FR deep model and ’inference’ to get the ID of a face image.

Pipelinea of training FR model

1. face images preprocessing
2. model training

Getting the FR result by the trained model

1. face images preprocessing
2. model inference to get face embedding
3. recognition by matching features between test image and images with known labels

### 3.1 Preprocessing

1. face detection with face landmark detection
2. face alignment to transform this face patch in a good angle or position

#### 3.1.1 Face detection

#### 3.1.2 Face anti-spoofing

#### 3.1.3 Face alignment

- Face image patches from face detection are often different in shapes due to factors such as pose, perspective, transformation and so on, whcich will lead to a decline on recognition performance.
- Face alignment : transforming face patches into a similar angle and position, which alleviate this issue

### 3.2 Training and testing a FR deep model

Different backbones with similar parameter amount have similar accuracy on FR.

You can use Resnet, ResNext, SEResnet, Inception net, Densenet, etc. to form your FR system.

If you need to design a FR system with limited calculation resource, Mobilemt with its variation will be good options.

Practical tricks which will be utilized in the model training and testing steps.

1. Training image augmentation - adding noise, blurring, modifying colors
2. Flipping face images horizontally

In testing, we can put image $I$ and its flipped mirror image $I'$ into the model, and get their embeddings $f$ and $f'$. Then their mean feature $\frac{f + f'}{2}$ can be used as the embedding of image $I$.

### 3.3 Face recognition by comparing face embeddings

The last part of face inference pipeline is face recognition by comparing face embeddings.

Face recognition

1. face verification
2. face identification

- Building face gallery : face-ID (each ID contains on or several face images)
- All face embeddings from the gallery images will be extracted by a trained model and saved in a database

<span style="color: #2D3748; background-color:#fff5b1;">Face verification Protocal</span> : 1 : 1 problem

1. Giving a face image $I$ and a face ID set S, it outputs the ID related to the face image, or 'not recognized'.
2. We extract the feature of image $I$ and calculate its similatiry (generally cosine similarity) $s(I, ID)$ with the ID's embedding in the database.
3. If $s(I, ID)$ is larger than a threshold $\mu$, we will output 'True' which represents image $I$ belongs to the ID, and vice verse.

<span style="color: #2D3748; background-color:#fff5b1;">Face identification</span> : 1 : N problem

1. Giving a face image $I$ and a face ID set $S$, it outputs the ID related to the face image, or 'not recognized'.
2. We extract the feature of $I$ and calculate its similarity $s(I, ID), ID \in S$ with all IDs' embeddings in the database.
3. We find the maximum of all similarity values.
4. Otherwise, we output 'not recognized', which shows that the person of image $I$ is bot in the database.

## 4. Algorithms

We will introduce FR algorithms in recent years.

Based on different aspects in deep FR modeling, we divided all FR methods into several categories

- designing loss function
- refining embedding
- FR with massive IDs
- FR on uncommon images
- FR pipeline acceleration
- close-set training

### 4.1 Loss Function

#### 4.1.1 Loss based on metric learning

### 4.2 Embedding

Embedding refinement is another way to enhance FR results.

1. set a explicit constraint on face embeddings with a face generator
2. changed the face embedding with auxilary information from training images, such as occlusion and resolution.
3. models FR in a multi-task way
4. age, pose prediction etc

#### 4.2.1 Embedding refinement by face gen