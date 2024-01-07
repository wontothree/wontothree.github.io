---
title: "[Basic AI Mathematics] Ch02 Matrices"
excerpt: "인공지능을 위한 수학"
categories:
  - LinearAlgebra
toc: true
---
## vector

모든 공학의 학부 수준에서는 linear한 경우만을 다룬다. 이 성질만을 이용해도 잘 설명되는 system이 어마어마하게 많다. 선형대수학에서는 vector space와 matrix algebra를 다룬다.

원칙적으로 vector는 vector space에 존재하는 원소이기 때문에 지정된 형태가 없다. 하지만 우리는 그중에서 $R^n$ space 상에 있는 것만을 vector라고 이야기한다.

$$
\mathbb{Z}_3^3 = \mathbb{Z}_3 \times \mathbb{Z}_3 \times \mathbb{Z}_3 \\
x, y, z \in \mathbb{Z}_3
$$

- row vector : 벡터를 가로로 표현하는 것
- column vector : 벡터를 세로로 표현하는 것

표현의 차이일 뿐이지만 벡터는 column vector 표기를 기본으로 한다.

$$
A = [1, 2, 3]
= [1 \; 2 \; 3]
=
\begin{bmatrix}
  1 \\
  2 \\
  3 \\
\end{bmatrix}
$$

Zero vector : 모든 component가 0인 벡터

벡터의 덧셈은 두 벡터의 component의 개수가 같아야 정의된다. component의 개수가 다르면 정의되지 않으며 의미가 없다.

벡터에서 사용할 수 있는 연산은 기본적으로 덧셈과 스칼라배이다. 벡터의 뺄셈은 덧셈에 대한 역원을 더하는 것으로 정의한다.

수학에서는 항상 연산을 정의하고 나면, 연산에 대한 이해를 높이기 위해 그리고 연산을 편하고 빠르게 계산하기 위해 그 연산에 대한 성질을 이야기한다.

## Linear Combination

$$
v = c_1v_1 + c_2v_2 + ... + c_nv_n
$$

## Length and Angle : The Dot Product

새로운 연산을 정의하는 것이다.

두 개의 벡터 인풋을 하나의 실수 아웃풋으로 바꾸는 연산이다.

$$
\vec{u} \cdot \vec{v} = u_1v_1 + u_2v_2 + ... + u_nv_n = \sum_{i=1}^nu_iv_i
$$

inner product를 정의했기 때문에 벡터의 크기(길이)를 정의할 수 있다. -> norm

## Cauchy-Schawrz Inequality

## The Triangle Inequality

## Orthogonal Vector

Perpendicular : 2, 3 차원에서 두 벡터가 수직

Orthogonal : n 차원 공간에서 두 벡터가 직교

$$
\vec{u} \cdot \vec{v} = 0
$$

Inner product를 정의함으로써 새로운 성질들이 탄생한 것이다. 크기, 각, 직교

### Matrices

Matrix : m x n

- Square Matrix : m = n
- Diagonal Matrix : Square matrix에서 diagonal에만 원소가 있는 행렬
- Scalar Matrix : Diagonal matrix에서 diagonal 성분이 모두 같은 행렬
- Identity Matrix : Scalar matrix에서 diagonal 성분이 모두 1인 행렬

### The Transpose of a Matrix

Interchaning the rows and the columns of matrix

- Symmetric Matrix : $A^T = A$
- Skew-symmetric Metrix : $A^T = - A$

## 2.2 Matrix Algebra

### Properties of Addition and Scalar Multiplication

