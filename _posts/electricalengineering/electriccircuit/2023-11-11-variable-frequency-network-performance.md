---
title: "[Electric Circuit] Variable-Frequency Network Performance"
excerpt: "J. David Irwin - Engineering Circuit Analysis : Ch11"
categories:
  - electriccircuit
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. Variable Frequency-Response Analysis

The effect of varying frequency on elements - the resistor, inducor, and capacitor

$$
\textbf{Z}_R = R\angle{0^{\circ}}
\\
\textbf{Z}_L = j\omega L= \omega L \angle{0^{\circ}}
\\
\textbf{Z}_C = \dfrac{1}{j\omega C} = \dfrac{1}{\omega C \angle{90^{\circ}}}
$$

RLC series network

Substitution $s = j\omega$

$$
\textbf{Z}_{eq} = R + j\omega L + \dfrac{1}{j\omega C}
= \dfrac{(j\omega)^2LC + j\omega RC + 1}{j\omega C}
= \dfrac{s^2LC + sRC + 1}{sC}
$$

Example 11.1

### Network functions

- Driving point function


### Poles and Zeros

## 2. Sinusoidal Frequency Analysis (Bode Plot)

In a sinusoidal steady-state analysis, the network function can be expressed as

$$
\textbf{H}(j\omega) = M(\omega) e^{j \phi(\omega)} \\
$$

- Magnitude and phase characteristies : two functions in which the response varies with the input frequency $\omega$

$M(\omega) = |\textbf{H}(\omega)|$

$\phi(\omega)$ is phase

### Frequency Response Using a Bode Plot

- Bode plot : plotting the network characteristics on a semilog scale

$$
number \, of \, dB = 10 \log_{10} {\dfrac{P_2}{P_1}} \\
= 10 \log_{10} \dfrac{|\textbf{V}_2|^2/R}{|\textbf{V}_1|^2/R}
= 10 \log_{10} \dfrac{|\textbf{I}_2|^2/R}{|\textbf{I}_1|^2/R} \\
= 20 \log_{10} \dfrac{|\textbf{V}_2|}{|\textbf{V}_1|}
= 20 \log_{10} \dfrac{|\textbf{I}_2|}{|\textbf{I}_1|}
$$

if the powers are absorbed by two equal resisters

In the sinusoidal steady-state case,

$$
H(j\omega) = \dfrac{K_0(j\omega)^{\pm N}(1 + j\omega\tau_1)[1 + 2\xi(j\omega\tau_3) + (j\omega\tau_3)^2] ...}{(1 + j\omega\tau_a)[1 + 2\xi(j\omega\tau_b) + (j\omega\tau_b)^2] ...}
$$

This equatation contain following typical factors:

1. A frequency-independent factor $K_0 > 0$
2. Poles or zeros at the origin form $j\omega$; that is $(jw)^{+N}$ for zeros and $(j\omega)^{-N}$ for poles
3. Poles or zeros of the form $(1 + j\omega\tau)$
4. Quadratic poles or zeros of the form $1 + 2\xi(j\omega\tau) + (j\omega\tau)^2$

Taking the logarithm of the magitude of the function $\textbf{H}(j\omega)$

$$
20\log_{10} |\textbf{H}(j\omega)|
= 20\log_{10} |K_0| \pm 20N\log_{10}|1 + j\omega\tau_1| + 20\log_{10}|1 + 2\xi_3(j\omega\tau_3) + (j\omega\tau_3)^2| + ... \\
-20\log_{10} |1 + j\omega\tau_a| - 20log_{10} |1 + 2\xi_b(j\omega\tau_b) + (j\omega\tau_b)^2|
$$

The phase angle for $\textbf{H}(j\omega)$

$$
\angle{\textbf{H}(j\omega)} = 0 \pm N(90^{\circ}) + \tan^{-1}\omega\tau_1 + \tan^{-1}(\dfrac{2\xi_a\omega\tau_3}{1 - \omega^2\tau_3^2}) + ... \\
- \tan^{-1}\omega\tau_a - \tan^{-1}\dfrac{2\xi_b\omega\tau_b}{1-\omega^2\tau_b^2} ...
$$

>Constant Term
>
>$$
K_0
$$

>A constant magnitude with zero phase shift
>
>$$
20\log_{10} K_0
$$

>Poles or Zero at the Origin
>
>$$
(j\omega)^{\pm N}
$$
>
>The magnitude and the phase of the function
>
>$$
\pm 20N \log_{10} \omega, \; \pm N(90^{\circ})
$$

>Simple Pole or Zero
>
>$$
(1 + j\omega\tau)
$$
>
>The magnitude and the phase of the function
>
>$$
20\log_{10} |1 + j\omega\tau|, \; \tan^{-1}\omega\tau
>$$
>
>$$
if \; \omega\tau \ll 1, \; 20\log_{10} |1 + j\omega\tau| \approx 0 \\
if \; \omega\tau \gg 1, \; 20\log_{10} |1 + j\omega\tau| \approx 20\log \omega\tau \\
if \; \omega\tau = 1, \; \; 20\log_{10} |1 + j\omega\tau| = \; 20\log_{10} 2^{1/2} = 3dB
$$

- Break frequency

>Quadratic Poles or Zeros
>
>$$
1 + 2\xi(j\omega\tau) + (j\omega\tau)^2
$$
>
>The magnitude and the phase of the function
>
>$$
20log_{10} |1 + 2\xi(j\omega\tau) + (j\omega\tau)^2|, \;
\tan^{-1}\dfrac{2\xi\omega\tau}{1-\omega^2\tau^2}
$$
>
>$$
if \; \omega\tau \ll 1, \; 20log_{10} |1 + 2\xi(j\omega\tau) + (j\omega\tau)^2| \approx 0 \\
if \; \omega\tau \gg 1, \; 20log_{10} |1 + 2\xi(j\omega\tau) + (j\omega\tau)^2| \approx 40\log_{10} \omega\tau \\
>$$
>
>- Damping ratio : $\xi$

## 3. Resonant Circuits

### Series Resonance

The input impedence for the series RLC circuits is

$$Z(jw) = R + jwL + \dfrac{1}{jwC} = R + j(wL - \dfrac{1}{wC})$$

$wL = \dfrac{1}{wC}$에서 $w_0 = \dfrac{1}{\sqrt{LC}}$, $Z(j w_0) = R$

- Resonant frequency : the impedence of the circuit is purely real
- Resonance
- Quality factor

$$Q = \dfrac{w_0 L}{R} = \dfrac{1}{w_o CR} = \dfrac{1}{R} \sqrt{\dfrac{L}{C}}$$

We can develop a general expression for the ratio of $\dfrac{V_R}{V1}$(gain) for the network in terms of $Q, \omega$, and $\omega_{0}$

$$
G(j\omega) = \dfrac{V_R}{V_1} = \dfrac{IR}{IZ} \\
= \dfrac{R}{R + j \omega L + 1/j \omega C} \\
= \dfrac{1}{1 + j(1/R)(\omega L - 1/ \omega C)} \\
= \dfrac{1}{1 + jQ(\omega L / RQ - 1/ \omega CRQ)} \\
= \dfrac{1}{1 + jQ(\omega / \omega_{0} - \omega_{0} / \omega)} \\
$$

$$
M(\omega) = \dfrac{1}{1 + Q^2 (\omega / \omega_{0} - \omega_{0} / \omega)^{1/2}},  
\phi(\omega) = - \arctan Q(\dfrac{\omega}{\omega_{0}} - \dfrac{\omega_{0}}{\omega})
$$

<img src="../../../../assets/images/gain.jpg">

- Bandwidth : difference between the two half-power frequencies

$$
M(\omega) = \dfrac{1}{\sqrt{2}} \\
Q (\dfrac{\omega}{\omega_{0}} - \omega_{0}\dfrac{\omega_{0}}{\omega}) = \pm 1 \\
\omega = \pm \dfrac{\omega_{0}}{2Q} \pm \omega_{0}\sqrt{(\dfrac{1}{2Q})^2 + 1} \\
\omega_{LO} = - \dfrac{\omega_{0}}{2Q} + \omega_{0}\sqrt{(\dfrac{1}{2Q})^2 + 1} \\
\omega_{HI} = \dfrac{\omega_{0}}{2Q} + \omega_{0}\sqrt{(\dfrac{1}{2Q})^2 + 1} \\
$$

$$
BW = \omega_{HI} - \omega_{LO} = \dfrac{\omega_{0}}{Q} \\
(\omega_{0})^2 = \omega_{LO} \omega_{HI}
$$

witch illustrates that the resonant frequency is the geometric mean of the two half-power frequencies

The frequency selectivity of the circuit is determined by the value of Q. A high-Q circuit has a small bandwidth and, therefore, the circuit is very selective.

Q has a more general meaning that we can explore via an energy analysis of the series resonant circuit. The capacitor voltage at resonance

$$
V_c = \dfrac{1}{j \omega_{0} C} I = \dfrac{1}{j \omega_{0} C} \dfrac{V_m}{R} \angle 0 = \dfrac{V_m}{\omega_{0} R C} \angle-90' \\
v(t) = \dfrac{V_m}{\omega_{0} R C} \cos(\omega_{0} t - 90')
$$

$$
w_L(t) = \dfrac{1}{2} L i^2(t) = \dfrac{1}{2} L (\dfrac{V_m}{R} \cos \omega_{0} t)^2 = \dfrac{L V_m^2}{2 R^2} \cos^2\omega_{0} t
$$

$$
w_C(t) = \dfrac{1}{2} C v_c^2(t) = \dfrac{1}{2} C (\dfrac{V_m}{\omega_{0} R C} \cos(\omega_{0} t - 90'))^2 = \dfrac{V_m^2}{2 \omega_{0}^2 R^2 C} \sin^2(\omega_{0} t) \\
= \dfrac{V_m^2}{2 \dfrac{1}{LC} R^2 C} \sin^2(\omega_{0} t) = \dfrac{V_m^2 L}{2 R^2 } \sin^2\omega_{0} t
$$

The total energy stored in the circuit is constant

$$
\dfrac{L V_m^2}{2 R^2} \cos^2\omega_{0} t + \dfrac{V_m^2 L}{2 R^2 } \sin^2\omega_{0} t = \dfrac{V_m^2 L}{2 R^2 }
$$

When a circuit is in resonance, there is a continuous exchange of energy between the magnetic field of the inductor and the electric field of the capacitor.

The maximum energy stored in the RLC circuit at resonance is $w_s = \dfrac{V_m^2 L}{2 R^2}$.

The energy dissipated per cycle in this series resonant circuit is

$$
W_D = \int_{0}^{T}p_R dt = \int_{0}^{T} i^2(t) R dt = \int_{0}^{T} (\dfrac{V_m}{R} \cos \omega_{0} t)^2 dt = \dfrac{V_m^2 T}{2 R}
$$

$$
\dfrac{W_S}{W_D} = \dfrac{\dfrac{V_m^2 L}{2 R^2}}{\dfrac{V_m^2 T}{2 R}} = \dfrac{L}{RT} = \dfrac{L}{R (\dfrac{2 \pi}{\omega})} = \dfrac{\omega_{0} L}{2 \pi R}
$$

$$
Q = \dfrac{\omega_{0} L}{R}= 2 \pi \dfrac{W_S}{W_D}
$$

The voltage across the capacitor or inductor in the series resonant circuit could be equal to Q times the magnitude of the source voltage.

$$
\left| V_0 \right| = \left| \dfrac{1/j \omega C}{R + j \omega L + 1/j \omega C} V_S \right|\\
= \left| \dfrac{V_S}{1 - \omega^2 LC + j \omega CR} \right|\\
= \dfrac{\left| V_S \right|}{\sqrt{(1 - \omega^2 LC)^2 +(\omega CR)^2}}
$$

We might assume that the maximum value of the output voltage would occur at the resonance frequency $\omega_{0}$. Let us see whether this assumptopm is correct.

$$
\dfrac{d \left| V_0 \right|}{d \omega} = 0 \\
\omega_{max} = \sqrt{\dfrac{1}{LC} - \dfrac{1}{2} (\dfrac{R}{L})^2}
= \sqrt{\omega_{0}^2 - \dfrac{1}{2} (\dfrac{\omega_{0}}{Q})^2}
= \omega_{0} \sqrt{1 - \dfrac{1}{2Q^2}} \\
$$

Clearly, $\omega_{max} \neq \omega_0$; however, $\omega_0$ closely approximated $\omega_{max}$ if the Q is high

$$
\left| V_0 \right|_{max} = \dfrac{\left| V_S \right|}{\sqrt{(1 - \omega_{max}^2 LC)^2 +(\omega_{max} CR)^2}} \\
= \dfrac{\left| V_S \right|}{\sqrt{(1 - (\omega_{0} \sqrt{1 - \dfrac{1}{2Q^2}})^2 \dfrac{1}{\omega_0^2})^2 +(\omega_{0} \sqrt{1 - \dfrac{1}{2Q^2}} \dfrac{1}{\omega_0 Q})^2}} \\
= \dfrac{\left| V_S \right|}{\sqrt{\dfrac{1}{4 Q^4} + (\dfrac{1}{Q^2} - \dfrac{1}{2 Q^4})}}
= \dfrac{Q \left| V_S \right|}{\sqrt{1 - \dfrac{1}{4Q^2}}} \\
$$

we see that $\left| V_0 \right|_{max} = Q \left| V_S \right|$ if the nwtwork has a high Q.

### Parallel Resonance(병렬 공진)

$$
I_S = I_G + I _C + I_L = V_SG + j \omega C V_S + \dfrac{V_S}{j \omega L} = V_S [G + j(\omega C - \dfrac{1}{\omega L})]
$$

Resonance frequency

$$
\omega_0 = \dfrac{1}{\sqrt{LC}}
$$

Half-power frequencies

$$
\omega_{LO} = -\dfrac{1}{2RC} + \sqrt{\dfrac{1}{(2RC)^2} + \dfrac{1}{LC}} \\
\omega_{HI} = \dfrac{1}{2RC} + \sqrt{\dfrac{1}{(2RC)^2} + \dfrac{1}{LC}}
$$

Bandwidth

$$
BW = \omega_{HI} - \omega_{LO} = \dfrac{1}{RC}
$$

Quality factor

$$
Q = \dfrac{\omega_0}{BW} = R \sqrt{\dfrac{C}{L}}
$$

Practical parallel resonant circuit

## 4. Scaling

 In this section we illustrate how to scale the circuits to make the parameters more realistic

- Magnitute scaling(or impedence scaling) : multiplying the impedence of each element by a scale factor $K_M$

$$
R' \rightarrow K_M R \\
L' \rightarrow K_M L \\
C' \rightarrow \dfrac{C}{K_M} \\
$$

since

$$
\omega_0' = \dfrac{1}{\sqrt{L'C'}}
= \dfrac{1}{\sqrt{K_M L \cdot \dfrac{C}{K_M}}}
= \dfrac{1}{\sqrt{LC}}
= \omega_0
$$

and

$$
Q' = \dfrac{\omega_0 L'}{R'}
= \dfrac{\omega_0 K_M L}{K_M R}
= \dfrac{\omega_0 L}{R}
= Q
$$

The resonant frequency, the quality factor and, therefore, the bandwidth are unaffected by by magitude scaling.

- Frequency scaling :

$$
R' \rightarrow R \\
L' \rightarrow \dfrac{L}{K_F} \\
C' \rightarrow \dfrac{C}{K_F} \\
$$

병렬 회로에서도 직렬 회로에서 처럼 동일하게 성립할까?

## 5. Filter Networks

### Passive Filters

A filter network is generally designed to pass signals with a specific frequency range and reject or attenuate signals whose frequency spectrum is outside this pass-band

- Low-pass filter
- high-pass filter
- band-pass filter
- band-rejection filter

### Active Filters

### Higher Order Filters

### Butterworth Filters

### OTA Filters

## 6. Application Examples

## 7. Design Examples

## 궁금한 점

위상차의 정의가 뭘까?

차 : 큰 거 - 작은 거

https://blog.naver.com/seo0511/10153075056