---
title: "[Discrete Mathematics] Ch01. The Foundation : Logic and Proofs"
excerpt: Kenneth H. Rosen - Discrete Mathematics and Its Applications
categories:
  - discretemathematics
toc: true
use_math: true
---
## 1. Proposition Logic

## 2. Applications of Propositional Logic

## 3. Propositional Equivalences

Logical Equivalences : truth table을 통해 증명할 수 있다.

|Name|Equivalence|
|---|---|
|Identity laws|p $\wedge$ **T** $\equiv$ p, p $\vee$ **F** $\equiv$ p|
|Domination laws|p $\vee$ **T** $\equiv$ **T**, p $\wedge$ F $\equiv$ F|
|Idempotent laws|p $\wedge$ p $\equiv$ p, p $\vee$ p $\equiv$ p|
|Double negation law|~(~p) $\equiv$ p|
|Commutative laws|p $\vee$ q $\equiv$ q $\vee$ p, p $\wedge$ q $\equiv$ q $\wedge$ p|
|Associative laws|(p $\vee$ q) $\vee$ r $\equiv$ p $\vee$ (q $\vee$ r), (p $\wedge$ q) $\wedge$ r $\equiv$ p $\wedge$ (q $\wedge$ r)|
|Distributive laws|p $\vee$ (q $\wedge$ r) $\equiv$ (p $\vee$ q) $\wedge$ (p $\vee$ r), p $\wedge$ (q $\vee$ r) $\equiv$ (p $\wedge$ q) $\vee$ (p $\wedge$ r)|
|De Morgan's laws|~(p $\vee$ q) $\equiv$ ~p $\wedge$ ~q, ~(p $\wedge$ q) $\equiv$ ~p $\vee$ ~q|
|Absorption laws|p $\vee$ (p $\wedge$ q) $\equiv$ p, p $\wedge$ (p $\vee$ q) $\equiv$ p|
|Negation laws|p $\vee$ ~p $\equiv$ **T**, p $\wedge$ ~p $\equiv$ **F**|

## 4. Predicates and Quantifiers

## 5. Nested Quantifiers

## 6. Rules of Inference

Truth table or rules of inference -> validity

|Name|Tautology|
|---|---|
|Modus ponens|(p $\wedge$ (p $\rightarrow$ q)) $\equiv$ q|
|Modus tollens|(~q $\wedge$ (p $\rightarrow$ q)) $\equiv$ ~p|
|Hypothetical syllogism|((p $\rightarrow$ q) $\wedge$ (q $\rightarrow$ r)) $\equiv$ (p $\rightarrow r)$|
|Disjunctive syllogism|((p $\vee$ q) $\wedge$ ~p) $\rightarrow$ q|
|Addition|p $\rightarrow$ p $\vee$ q|
|Simplication|p $\wedge$ q $\rightarrow$ p|
|Conjunction|((p) $\wedge$ (q)) $\rightarrow$ (p $\wedge$ q)|
|Resolution|((p $\vee$ q) $\wedge$ (~p $\vee$ r)) $\rightarrow$ (q $\vee$ r)|

## 7. Introduction to Proof

## 8. Proof Methods and Strategy
