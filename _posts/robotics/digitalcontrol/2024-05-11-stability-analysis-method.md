---
title: "[Digital Control] Stability Analysis Techniques"
excerpt: "Charles L. Philips - Digital Control System : Ch07"
categories:
  - digitalcontrol
---
## 1. Introduction

- Routh-Hurwiz criterion
- Root-locus procedure
- Frequency-response methods
- Jury stability test

## 2. Stability

## 3. Bilinear Transformation

- Continuous-time LTI systems : the stability boundary is the imaginary axis in the s-plane.
- Discrete-time LTI systems : the stability boundary is the unit circle in the z-plane

$$
z = \dfrac{1 + (T/2)w}{1 - (T/2)w}, \;\; \text{or} \;\; w = \dfrac{2}{T}\dfrac{z - 1}{z + 1}
$$

## 4. The Routh-Hurwitz Criterion

- Routh-Hurwiz criterion may be used in the analysis of LTI continuous-time systems to determine if any roots of a given equation are in the right half of the s-plane.
- If the characteristic equation is expressed as a function of the bilinear transform variable w (not z), the the stability of the system may be determined by directly applying the Routh-Hurwiz criterion.

## 5. Jury's Stability Test

- Since the stability boundary in the z-plane is different from that in the s-plane, the Routh-Hurwiz criterion cannot be directly applied to discrete-time systems if the system characteristic equation is expressed as a function of z.

## 6. Root Locus

## 7. The Nyquist Criterion

## 8. The Bode Diagram

## 9. Interpretation of the Frequency Response

## 10. Closed-Loop Frequency Response
