---
title: "[Linear Algebra and Its Applications] Ch01 Linear Equations in Linear Algebra"
categories:
  - LinearAlgebra
excerpt: 
toc: true
# use_math: true
---
## 1. Systems of Linear Equations

>**Linear equation** in the variables $x_1, ... , x_n$

$$
a_1x_1 + a_2x_2 + ... + a_nx_n = b
$$

$b$, the coefficients $a_1, ... , a_n$ : real or complex numbers

>**A system of linear equations**(linear system)

Collection of one or more linear equations involving the same variables

>**Solution** of the system

List $(s_1, s_2, ... , s_n)$ of numbers that makes each equation a true statement when the values $s_1, s_2, ... , s_n$ are substituted for $x_1, x_2, ... x_n$, respectively

>**Solution set** of the linear system

The set of all possible solutions

>Two linear systems are **equivalent**

they have the same solution set

A system of linear equations has

1. no solution
2. exactly one solution
3. infinitely many solutions

>A system of linear equations is consistent

It has either one solution or infintiely many solutions

A system is inconsistent if it has no solution

### Matrix Notation

Given the system

$$
x_1 - 2x_2 + x_3 = 0 \\
\;\;\;\;\;\; 2x_2 -8x_3 = 8 \\
5x_1 \;\;\;\;\; - 5x_3 = 10
$$

>Coefficient matrix

$$
\begin{bmatrix}
  1 & -2 & 1  \\
  0 & 2 & -8  \\
  5 & 0 & -5  \\
\end{bmatrix}
$$

>Augmented matrix

$$
\begin{bmatrix}
  1 & -2 & 1 & 0  \\
  0 & 2 & -8 & 8  \\
  5 & 0 & -5 & 10 \\
\end{bmatrix}
$$

The basic strategy for solving linear system is to replace one system with an equivalent system that is easier to solve

>ELEMENTARY ROW OPEATIONS(Algorithm)
>
>1. (Replacement) Replace one row by the sum of itself and a multiple of another row.
>2. (Interchange) Interchange two rows.
>3. (Scaling) Multiply all entries in a row by a nonzero constant.

If the augmented matrices of two linear systems are row equivalent, the the two systems have the same solution set.

## 2. Row Reduction and Echelon Forms

>Leading entry of a row

Leftmost nonzero entry (in a nonzero row)

>Echelon form(for echelon form)

1. All nonzero rows are above any rows of all zeros
2. Each leading entry of a row is in a column to the right of the leading entry of the row above it
3. All entries in a column below a leading entry are zeros

>Reduced Echelon form

1. The leading entry in each nonzero row is 1
2. Each leading 1 is the only nonzero entry in its column

>Uniqueness of the Reduced Echelon Form

Each matrix is row equivalent to one and only one reduced echelon matrix.

### Pivor Positions

>**Pivot position** in a matrix $A$ and **Pivot column**

A location in A that corresponds to a leading 1 in the reduced echelon form of $A$. A column of $A$ that contains a pivot position.

Since the reduced echelon form is unique, the leading entries are always in the same positions in any echelon form obtained from a given matrix.

### Row Reduction Algorithm

1. Begin with the leftmost nonzero column. This is a pivot column. The pivot position is at the top.
2. Select a nonzero entry in the pivot column as a pivot. If necessary, interchange rows to move this entry into the pivot position.
3. Use row replacement operations to create zeros in all positions below the pivot.
4. Cover(or ignore) the row containing the pivot position and cover all rows, if any, above it. Apply steps 1-3 to the submatrix that remains. Repeat the process until there are no more nonzero rows to modify.
5. Begining with the rightmost pivot and working upward and to the left, create zeros above each pivot. If a pivot is not 1, make it 1 by a scaling operation.

### Solutions of Linear Systems

>Basic variable and free variable

Variables corresponding to pivot columns in the matrix and the other variable

Whenever a system is consistent, the solution set can be described explicitly by solving the reduced system of equations for the basic variable in terms of the free variables.

### Parametric Descriptions of Solution Sets

Whenever a system is consistent and have free variables, we can describe parametric descriptions of solution sets in which the free varables act as parameters.

Whenever a system is inconsistent, the solution set is empty, which the solution set has no parametric representation.

### Existence and Uniqueness Questions

>Existence and Uniqueness Theorem

A linear system is consistent if and only if the rightmost column of the augmented matrix is not apivot column - that is, if and only if an echelon form of the augmented matrix has no row of the form

$$
[0 \;... \;0 \;b] \;\text{with b nonzero}
$$

>USING ROW REDUCTION TO SOLVE A LINEAR SYSTEM

1. Write the augmented matrix of the system.
2. Use the row reduction algorithm to obtain an equivalent augmented matrix in echelon form. Decide whether the system is consistent. If there is no solution, stop; otherwise, go to the next step.
3. Continue row reduction to obtain the reduced echelon form.
4. Write the system of equations corresponding to the matrix obtained in step 3.
5. Rewrite each nonzero equation from step 4 so that its basic variable is expressed in terms of any free variables appearing in the equation.

## 3. Vector Equations

## 4. The Matrix Equation Ax = b

## 5. Solution Sets of Linear Systems

## 6. Linear Independence

## 7. Introduction to Linear Transformations

## 8. The Matrix of a Linear Transformation
