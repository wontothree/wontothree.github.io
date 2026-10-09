“각 joint가 움직였을 때 전등의 위치와 방향이 공간에서 어떻게 변하는가?”를 수학적으로 표현하는 방법

In this chapter we develop a systematic way to describe a rigid body's position and orientation which relies on attaching a reference frame to the body.

# 1. Rigid-Body Motions in the Plane

3차원 로봇팔로 확장하기 전에 2차원 평면에서 동작하는 모바일 로봇을 생각해보자. 이 로봇은 differential drive model로 모델링된다.

<iframe src="/blog/posts/rigid-body-motions/mobile-robot.html" style="align: center;height:600px; width: 600px; border: none"></iframe>

Suppose that a length scale and a fixed world frame (or reference frame) $\left\{ w \right\}$ have been chosen as shown, with unit axes $x_w$ and $y_w$.

The position of the reference frame {r}, expressed in the world frame {w}, can be represented as a column vector ${}^{w}p_r \in \mathbb R^2$ of the form

$$
{}^{w}p_r =
\begin{bmatrix}
{}^{w}p_{r, x} \\
{}^{w}p_{r, y} \\
\end{bmatrix}
$$

The two vectors $x_r$ and $y_r$ can also be written as column vectors and packaged into the following $2 \times 2$ matrix ${}^{w}P_r$:
$$
{}^{w}P_r = \left[ x_r, y_r \right] =
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta \\
\end{bmatrix}.
$$
Matrix $P$ is an example of rotation matrix. The pair $({}^{w}P_r, {}^{w}p_r)$ provides a description of the orientation and position of $\left\{ r \right\}$ relative to $\left\{ w \right\}$.

우리의 mobile robot는 우측에 측면 카메라를 가지고 있다. camera 좌표계 $\left\{ c \right\}$를 robot 좌표계 $\left\{ r \right\}$로 나타내면 다음과 같다.

$$
{}^{r}p_c =
\begin{bmatrix}
{}^{b}p_{c, x} \\
{}^{b}p_{c, y} \\
\end{bmatrix} =
\begin{bmatrix}
0.5 \\
-0.5 \\
\end{bmatrix},
\quad
{}^{r}P_c =
\begin{bmatrix}
\cos \left(\frac{\pi}{2} \right) & -\sin\left(\frac{\pi}{2} \right) \\
\sin\left(\frac{\pi}{2} \right) & \cos\left(\frac{\pi}{2} \right) \\
\end{bmatrix} =
\begin{bmatrix}
0 & -1 \\
1 & 0\\
\end{bmatrix}.
$$

한편, mobile robot에 장착된 camera의 위치와 방향을 world frame에서 알고자 하는 경우가 있다. 이때 camera frame ${c}$의 pose를 world frame ${w}$에서 표현해야 한다. 앞서 구한 robot과 camera 사이의 상대적인 pose를 이용하면, camera의 orientation과 position을 world frame에서 다음과 같이 구할 수 있다.

$$
\begin{aligned}
{}^wP_c =& {}^wP_r {}^rP_c = 
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta \\
\end{bmatrix}
\begin{bmatrix}
0 & -1 \\
1 & 0\\
\end{bmatrix}
=
\begin{bmatrix}
-\sin\theta & -\cos\theta \\
\cos\theta & -\sin\theta \\
\end{bmatrix},
\\
{}^wp_c =& {}^wP_r {}^rp_c + {}^wp_r
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta \\
\end{bmatrix}
\begin{bmatrix}
0.5 \\
-0.5 \\
\end{bmatrix}
+
\begin{bmatrix}
{}^{w}p_{r, x} \\
{}^{w}p_{r, y} \\
\end{bmatrix}
=0.5 
\begin{bmatrix}
\sin\theta + \cos\theta \\
\sin\theta - \cos\theta \\
\end{bmatrix}
+
\begin{bmatrix}
{}^{w}p_{r, x} \\
{}^{w}p_{r, y} \\
\end{bmatrix}.
\end{aligned}
$$

# 2. Rotations and Angular Velocities

## 2.1 Rotation Matrices

이제 우리는 3차원 강체의 움직임으로 일반화해보자. fixed frame을 $\left\{ x_s, y_s, z_s \right\}$로 표시하고, body frame을 $\left\{ x_b, y_b, z_b \right\}$로 표시하자. body frame의 위치는 다음과 같이 표현되며

$$
p = p_1 x_s + p_2 y_s + p_3 z_s
$$

body frame의 각 축들은 다음과 같이 표현된다.

$$
x_b = r_{11} x_s + r_{12} y_s + r_{13} z_s
\\
y_b = r_{21} x_s + r_{22} y_s + r_{23} z_s
\\
z_b = r_{31} x_s + r_{32} y_s + r_{33} z_s
$$

여기서 $p \in \mathbb R^{3}$ and $R \in \mathbb R^{3\times 3}$을 다음과 같이 정의하면

$$
p =
\begin{bmatrix}
p_1 \\
p_2 \\
p_3 \\
\end{bmatrix}, \quad
R = [x_b, y_b, z_b]
=
\begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
r_{21} & r_{22} & r_{23} \\
r_{31} & r_{32} & r_{33} \\
\end{bmatrix}.
$$

$(R, p)$에 있는 12개의 파라미터가 fixed frame에 대한 강체의 위치와 회전을 표현한다.

이제 우리는 special orthogonal group $SO(3)$을 공식적으로 정의할 것이다.

[**Definition**] The special orthogonal group $SO(3)$, also known as the group of rotation matrices, is the set of all $3\times3$ real matrices $R$ that satisfy $(i) R^\top R = I$ and $(ii) \det R = 1$.

[**Definition**] The special orthogonal group $SO(2)$ is the set of all $2 \times 2$ real matrices $R$ that satisfy $(i) R^\top R = I$ and $(ii) \det R = 1$.

$(i) R^\top R = I$는 다음 (a)와 (b)를 의미한다.

(a) unit norm condition: $x_b, y_b$ and $z_b$ are all unit vectors, i.e.,

$$
\begin{aligned}
r_{11}^2 + r_{21}^2 + r_{31}^2 =& 1, \\
r_{12}^2 + r_{22}^2 + r_{32}^2 =& 1, \\
r_{13}^2 + r_{23}^2 + r_{31}^2 =& 1. \\
\end{aligned}
$$

(b) The orthogonality condition: $x_b \cdot y_b = x_b \cdot z_b = y_b \cdot z_b = 0$, i.e.,

$$
\begin{aligned}
r_{11}r_{12} + r_{21}r_{22} + r_{31}r_{32} =& 0, \\
r_{12}r_{13} + r_{22}r_{23} + r_{32}r_{33} =& 0, \\
r_{11}r_{13} + r_{21}r_{23} + r_{31}r_{33} =& 0. \\
\end{aligned}
$$

### 2.1.1 Properties of Rotation Matrices

회전 행렬 $SO(2)$와 $SO(3)$의 집합은 수학적인 의미의 group이 만족하는 속성을 가지고 있기 때문에 groups이라고 불린다. 구체적으로 다음과 같은 속성을 갖는다.

For all $A, B$ in the group, the following properties are satisfied:

1. closure: $AB$ is also in the group
2. associativity: $(AC)C = A(BC)$
3. identity element existence: There exists an element $I$ in the group (the identity element for $SO(n)$) such that $AI = IA = A$.
4. inerse element existence: there exists an element $A^{-1}$ in the group such aht $AA^{-1} = A^{-1}A = I$.

### 2.1.2 Uses of Rotation Matrices

회전 행렬 $R$은 주로 다음의 세 가지 목적으로 사용한다.

1. to represent an orientation;
2. to change the reference frame in which a vector or a frame is represented;
3. to rotate a vector or a frame.

1번: mobile robot의 orientation을 world frame에서 나타내는 상황

2번: camera의 orientation을 robot frame이 아니라 world frame에서 나타내는 상황

3번: 원래는 측면을 바라보고 있던 camera가 정면을 바라본다고 가정했을 때의 상황

## 2.2 Angular Velocities

$$
w = \hat w \dot \theta
$$

$$
\begin{aligned}
\dot{\hat x} =& w \times \hat x, \\
\dot{\hat y} =& w \times \hat y, \\
\dot{\hat z} =& w \times \hat z. \\
\end{aligned}
$$

fixed frame에서 $\hat x$를 $r_1(t)$로 표현하자. 그러면 위 방정식을 다시 표현할 수 있다.

$$
\dot r_i = w_s \times r_i, \quad i = 1, 2, 3.
$$

이 세 방정식은 다음의 $3 \times 3 $ 행렬 방정식으로 쓸 수 있다.

$$
\begin{align}
\dot R =
\begin{bmatrix}
w_s \times r_1 & w_s \times r_2 & w_s \times r_3
\end{bmatrix}
= w_s \times R.
\end{align}
$$

이 방정식 오른쪽에 있는 cross product를 없애기 위해서 우리는 새로운 notation을 도입할 것이다.

$$
w_s \times R = [w_s] R
$$

여기서 $[w_s]$는 $w_s \in \mathbb R^3$의 $3 \times 3$ skew-symmetric 행렬 표현이다.

[**Definition**] Given a vector $x = \begin{bmatrix} x_1 & x_2 & x_3 \end{bmatrix}^\top \in \mathbb R^3$, define

$$
\left[ x \right] =
\begin{bmatrix}
0 & -x_3 & x_2 \\
x_3 & 0 & x_1 \\
-x_2 & x_1 & 0 \\
\end{bmatrix}.
$$

행렬 $[x]$은 $x$에 대한 $3 \times 3$ skew-symmetric 행렬 표현이며, 다음 조건을 만족한다.
$$
[x] = - [x]^\top.
$$

모든 $3 \times 3$ real skew-symmetric 행렬의 집합을 $so(3)$라고 부른다.

회전 행렬과 skew-symmetric 행렬에 대한 유용한 정리는 다음과 같다.

[**proposition**] Given any $w \in \mathbb R^3$ and $R \in SO(3)$, the following always holds:
$$
R [w] R^\top = [Rw].
$$

skew-symmetric 표기를 이용하면 Equation (1)은

$$
[w_s] R = \dot R,
\\
[w_s] = \dot R R^{-1}.
$$

## 2.3 Exponential Coordinate Representation of Rotation

# 3. Rigid-Body Motions and Twists

## 3.1 Homogeneous Transformation Matrices

[Definition] The special Euclidean group $SE(3)$, also known as the group of rigid-body motions or homogeneous transformation matrices in $\mathbb R^3$, is the set of all $4 \times 4$ real matrices $T$ of the form

$$
T =
\begin{bmatrix}
R & p \\
0 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
r_{11} & r_{12} & r_{13} & p_1 \\
r_{21} & r_{22} & r_{23} & p_2 \\
r_{31} & r_{32} & r_{33} & p_3 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$
where $R \in SO(3)$ and $p \in \mathbb R^3$ is a column vector.

## 3.2 Twists

## 3.3 Exponential Coordinate Representation of Rigid-Body Mations

# 4. Wrenches
