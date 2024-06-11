---
title: "[Electronic Circuit] Operational Amplifiers"
excerpt: "Sedra - Microelectronic Circuits : Ch02"
categories:
  - electroniccircuit
---
One of the reason for the popularity of the ap amp is its verstaility.

Equally important is the fact that the integrated circuit (IC) op amp hase characteristics that closely approach the assumed ideal.

An IC op amp is made up of about 20 transistor together with registors, and one capacitor connected in a rather complex circuit.

We will treat the op amp as a circuit building block and study its terminal characteristics and applications.

실무에서 회로 설계에 opamp를 사용하는 경우의 90%는 voltage follower, inverting amplifier, non-inverting amplifer를 위해서이다.

## 1 The Ideal Op amp

### 1.1 The Op-AMP Terminals

The op amp has three therminals from a signal point of view and requite dc power to operate.

- Two input terminals
- One output terminal
- Two terminals donnected to a positive supplu voltage $V_{CC}$ and a negative supply voltage $-V_{EE}$

### 1.2 Function and Characteristics of the Ideal Op Amp

### 1.3 Differential and Common-Mode Signals

## 2 The Inverting Configuration (반전 구성)

Op amp are not used alone; rather, the op amp is connected to passive components in a feedback circuit.

There are two basic circuit configurations employing an op amp and two resistors : the inverting configuration and the noninverting configuration.

Negative feedback

Positive feedback

### 2.1 The Closed-Loop Gain

- Virtual short circuit : whatever voltage is at 2 will automatically appear at 1 because of the infinite gain

### 2.2 Effect of Finite Open-Loop Gain

### 2.3 Input and Output Resistance

### 2.4 An Important Application : The Weighted Summer

## 3 The Noninverting Configuration (비반전 구성)

The input signal is applied directly to the positive input terminal of the op amp while on terminal of resistor is connected to ground.

### 3.1 The Closed-Loop Gain

### 3.2 Effect of Finite Open-Loop Gain

### 3.3 Input and Output Resistance

### 3.4 The Voltage Follower

## 4 Difference Amplifiers

## 5 Integrators and Differentiators

## 6 DC Imperfections (직류 결함)

We will consider some of the important nonideal properties of the op amp.

### 6.1 Offset Voltage

적절한 극성과 크기를 갖는 직류 전압 전원을 연산 증폭기의 두 입력 단자 사이에 연결함으로써 연산 증폭기의 출력을 그것의 이상적인 전압인 0V로 되돌릴 수 있다. 이는 이 외부 전원이 연산 증폭기의 입력 오프셋 전압을 상쇄시켰다는 것을 의미한다. 따라서 입력 오프셋 전압은 외부에서 인가한 전압과 크기는 같고 극성은 반대이어야 한다.

입력 오프셋 전압을 포함시킨 연산 증폭기 회로 모델

### 6.2 Input Bias Current and Offset Current

연산 증폭기가 동작하기 위해서는 두 입력 단자에 입력 바이어스 전류라고 불리는 직류 전류가 공급되어야 한다.

입력 바이어스 전류

$$
\dfrac{I_{B1} + I_{B2}}{2}
$$

입력 오프셋 전류

$$
\vert I_{B1} - I_{B2} \vert
$$

## 7 Effect of Finite Open-Loop Gain and Bandwidth on Circuit Performance

## 8 Large-Signal Operation of Op amps

## Reference

Sedra - Microelectronic Circuits : Ch02
