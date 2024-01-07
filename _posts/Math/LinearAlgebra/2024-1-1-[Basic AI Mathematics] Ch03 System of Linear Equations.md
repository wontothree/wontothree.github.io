---
title: "[Basic AI Mathematics] Ch03 System of Linear Equations"
excerpt: "인공지능을 위한 수학"
categories:
  - LinearAlgebra
toc: true
---
## 1. Introduction to Systems of Linear Equations

## 2. Direct Methods for Solving Linear Systems

### Matrices and Echelon form

### Elementary Row Operation

### Gaussian Elimination

### Gauss-Jordan Elimination

### Homogeneous System

### Linear Systems over $\mathbb{Z}_p$

## 3. Spanning Sets and Linear Independence

## 4. The Inverse of a Matrix

$$
A A' = A' A = I
$$

The inverse of 2 x 2 matrix

$$
A =
\begin{bmatrix}
  a & b \\
  c & d \\
\end{bmatrix}
$$

$$
A^{-1} =
\dfrac{1}{ad - bc}
\begin{bmatrix}
  d & -b \\
  -c & a \\
\end{bmatrix}
$$

### Properties of Invertible Matrices

### Elementary Matrices

### The Fundamental Theorem of Invertible Matrices

### The Gauss-Jordan Method for Computing the Inverse

## 5. The LU Factorization

상수값 b만 변하는 여러 선형방정식 $Ax = b$을 풀 때 계산량을 획기적으로 줄일 수 있다.

A : n x n

$$
A = LU
\\
Ax = b \leftrightarrow y = Ux \;\text{and}\; Ly = b
$$

- L : lower triangular matrix
- U : Upper triangular matrix

## 6. Subspace, Basis, Dimension, and Rank

A Subspace of $R^n$ is any collection $S$ of vectors in $R^n$ such that :

1. The zero vector $\mathbf{0}$ is in $S$
2. If $\mathbf{u}$ and $\mathbf{v}$ are in S, then $\mathbf{u + v}$ is in S. (S is closed under addition.)
3. If $\mathbf{u}$ is in S and c is a scalar, then $c\mathbf{u}$ is in S. (S is closed under scalar multimplication.)

### Subspaces Associated with Matrices

Let A be an m x n matrix.

- **Row space** of A : the subspace row(A) of $R^n$ spanned by the rows of A.
- **Column space** of A : the subspace of col(A) of $R^m$ spanned by the columns of A.
