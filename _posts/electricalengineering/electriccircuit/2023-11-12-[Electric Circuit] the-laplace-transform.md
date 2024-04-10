---
title: "[Electric Circuit] Laplace Transform"
excerpt: "J. David Irwin - Engineering Circuit Analysis : Ch12"
categories:
  - electriccircuit
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. Definition

Laplace transform of a function $f(t)$

$$
\mathscr{L}[f(t)] = \int_0^{\infty} f(t) e^{-st} dt
= \textbf{F}(s),
\;\; s + j\sigma,
\;\; f(t) = 0 \; for \; t < 0
$$

A sufficient condition for existence of laplace transform

$$
\int_0^{\infty} e^{-\sigma t} |f(t)|dt < \infty
$$

for some real value $\sigma$

All of the inputs we will apply to circuits possess Laplace transforms.

## 2. Step and Impulse Function

Two singularity functions are very important in circuit analysis : (1) Unit step function $u(t)$ (2) Unit impulse function(or delta function) $\delta (t)$

>The unit step function
>
>$$
u(x) =
\begin{cases}
    0 & t < 0 \\
    1 & t \geq 0
\end{cases}
\\
u(x - a) =
\begin{cases}
    0 & t < a \\
    1 & t \geq a
\end{cases}
$$

>The unit impulse function
>
>$$
\delta(t - t_0) = 0 \;\; t \neq t_0
\\
\int_{t_0-\epsilon}^{t_0+\epsilon} \delta(t - t_0)dt = 1 \;\; \epsilon > 0
$$

>Sampling property
>
>$$
\int_{t_1}^{t_2} f(t)\delta(t - t_0) dt =
\begin{cases}
    f(t_0) & t \neq t_0 \\
    0 & \epsilon > 0
\end{cases}
$$

For engineers, the unit impulse function is a convenient matematical function that can be utilized to model a physical process.

## 3. Transform Pairs

A number of basic transformation pairs that are very useful in circuit analysis

Once the transform pair are known, we can easily move back and forth between the time domain and the complex frequency domain without using definition of the Laplace transform.

|$f(t)$|$\textbf{F}(s)$|
|:---:|:---:|
|$\delta (t)$|$1$|
|$u(t)$|$\dfrac{1}{s}$|
|$e^{-at}$|$\dfrac{1}{s + a}$|
|$t$|$\dfrac{1}{s^2}$|
|$\dfrac{t^n}{n!}$|$\dfrac{1}{s^(n+1)}$|
|$te^{-at}$|$\dfrac{1}{(s + a)^2}$|
|$\dfrac{t^ne^{-at}}{n!}$|$\dfrac{1}{s + a}^{n+1}$|
|$\sin bt$|$\dfrac{b}{s^2 + b^2}$|
|$\cos bt$|$\dfrac{s}{s^2 + b^2}$|
|$e^{-at}\sin bt$|$\dfrac{b}{(s + a)^2 + b^2}$|
|$e^{-at}\cos bt$|$\dfrac{s + a}{(s + a)^2 + b^2}$|

## 4. Properties of the Laplace Transform

Useful theorems describing important properties of the Laplace transform

>The time-scaling theorem
>
>$$
\mathscr{L}[f(at)]
= \int_0^{\infty} f(at) e^{-st} dt
= \dfrac{1}{a}\int_0^{\infty} f(\lambda) e^{-(\lambda/a)s} d\lambda
= \dfrac{1}{a}\textbf{F}(\dfrac{s}{a}), \; \sigma > 0
$$

>The time-shifting theorem
>
>$$
\mathscr{L}[f(t - t_0)u(t - t_0)]
= \int_0^{\infty} f(t - t_0)u(t - t_0) e^{-st} dt
= \int_{-t_0}^{\infty} f(t)u(t) e^{-s(t + t_0)} dt \\
= \int_{0}^{\infty} f(t) e^{-s(t + t_0)} dt
= e^{-st_0}\int_0^{\infty} f(t) e^{-st} dt
= e^{-st_0}\textbf{F}(s)
$$

>The frequency-shifting, or modulation, theorem
>
>$$
\mathscr{L}[e^{-at}f(t)]
= \int_0^{\infty} e^{-at}f(t) e^{-st} dt
= \int_0^{\infty} f(t) e^{-(a + s)t} dt
= \textbf{F}(a + s)
$$

|Properties Number|$f(t)$|$\textbf{F}(s)$|
|:---:|:---:|:---:|
|1. Magnitude scaling|$Af(t)$|$A\textbf{F}(s)$|
|2. Addition/subtraction|$f_1(t) \pm f_2(t)$|$$\textbf{F}_1(s) \pm \textbf{F}_2(s)$$|
|3. Time scaling|$f(at)$|$\dfrac{1}{a}\textbf{F}(\dfrac{s}{a}), \; a > 0$|
|4. Time shifting|$f(t - t_0)u(t - t_0)$|$e^{-st_0}\textbf{F}(s)$|
|5. Frequency shifting|$e^{-at}f(t)$|$\textbf{F}(a + s)$|
|6. Differentiation|$\dfrac{d^nf(t)}{dt^n}$|$s^n\textbf{F}(s) - s^{n-1}f(0) - s^{n-2}f^1(0) - s^{n-3}f^2(0) ... - s^0f^{n-1}(0)$|
|7. Multiplication by t|$tf(t)$|$-\dfrac{d\textbf{F}(s)}{ds}$|
||$t^nf(t)$|$-\dfrac{d^n\textbf{F}(s)}{ds^n}$|
|8. Division by t|$\dfrac{f(t)}{t}$|$\int_s^{\infty}\textbf{F}(\lambda)d\lambda$|
|9. Integration|$\int_0^tf(\lambda)d\lambda$|$\dfrac{\textbf{F}(s)}{s}$|
|10. Convolution|$\int_0^t f_1(\lambda)f_2(t - \lambda) d\lambda$|$\textbf{F}_1(s)\textbf{F}_2(s)$|

## 5. Performing the Inverse Transfrom

1. We will transform the problem from the time domain to the complex frequency domain.
2. We will solve the circuit equations algebraically in the complex frequency domain.
3. We will transform the solution from the s-domain back to the time domain.

The algebraic solution of the circuit equations in the complex frequency domain results in a rational function of s of the form

$$
\textbf{F}(s) = \dfrac{\textbf{P}(s)}{\textbf{Q}(s)}
= \dfrac{a_ms^m + a_{m-1}s^{m-1} + ... + a_1 s + a_0}{b_ns^n + b_{n-1}s^{n-1} + ... + b_1 s + b_0} \\
= C_{m-n}s^{m-n} + ... + c_2s^2 + C_1s + C_0 + \dfrac{\textbf{P}_1(s)}{\textbf{Q}(s)}
$$

Case 1 roots are simple

Case 2. simple complex roots

Case 3. a root of multiplicity r

Once the function is expressed in this form, the individual inverse Laplace transforms can be obtained from known and tabulated transform pairs.

### Simple Poles

$$
\dfrac{\textbf{P}(s)}{\textbf{Q}(s)}
= \dfrac{K_1}{s + p_1} + \dfrac{K_2}{s + p_2} + ... + \dfrac{K_n}{s + p_n}
$$

$$
K_i = \dfrac{(s + p_i)\textbf{P}(s)}{\textbf{Q}(s)} |_{s = p_i},\;\;i = 1, 2, ... , n
$$

$$
\mathscr{L}^{-1}[\dfrac{1}{s + a}] = e^{-at}
$$

### Complex-Conjugate Poles

### Multiple Poles

## 6. Convolutional Integral

## 7. Initial-Value and Final Value Theorems
