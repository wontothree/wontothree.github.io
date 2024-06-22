---
title: "[Electronic Circuit] MOS Field-Effect Transistors (MOSFETs)"
excerpt: "Sedra - Microelectronic Circuits : Ch05"
categories:
  - electroniccircuit
---
We study the other major three terminal device : the metal-oxide-semiconductor field-effect transistor (MOSFET)

MOSFET has become by far the most widely used electronic device more than BJT material, especially in the design of integrated circuits(ICs), which are entire circuits fabricated on a singlesilicon chip.

|BJTs|MOSFETs|
|---|---|
||Small|
||less power|

This chapter will help you become familiar with the MOSFET : its physical structure and operation, terminal characteristics, and dc circuit application.

## 1. Device Structure and Physical Operation

The enchancement-type MOSFET is the most widely used field-effect transistor.

- Chapter 5 : structure and physical operation
- Chpater 6 : current-voltage characteristics of the device

### 1.1 Device Structure

### 1.2 Operation with Zero Gate Voltage

When zero voltage is applied to the gate, we have two back-to-back diodes in series between drain and source.

One diode is formed by the pn junction between the $n^+$ drain region and the p-type substrate, and the other diode is formed by pn junction between the p-type substrate and the n^+ source region.

These back-to-back diodes prevent current conduction from drain to source when a voltage $v_{DS}$ is applied.

In fact, the path between drain and source has a very high resistance ($10^{12}\Omega$).

### 1.3 Creating a Channel for Current Flow

### 1.4 Applying a Small $v_{DS}$

### 1.5 Operation as $v_{DS}$ Is Increased

### 1.6 Operation for $v_{DS} \geq v_{OV}$ : Channel Pinch-Off and Current Saturation

### 1.7 The p-Channel MOSFET

### 1.8 Complementary MOS or CMOS

## 2. Current-Voltage Characteristics

Complete current-voltage characteristic (static characteristics : at dc or low frequencies)

The dynamic effects that limit the operation of the MOSFET at high frequencies and high switching speeds will be discussed in Chapter 9.

### 2.1 Circuit Symbol

### 2.2 The $i_D-v_{DS}$

Three possible region

- Cutoff region
- Triode region
- Saturation region

The cutoff and triode regions are useful when we want to operate the MOSFETs as a switch.

If we want to use the MOSFET to design an amplifier, it must be operated in the saturation region. (chapter 6)

### 2.3 The $i_D-v_{GS} Characteristic$

## 3. MOSFET Circuits at DC

## 4. Technology Scaling (Moore's Law) and Other Topics
