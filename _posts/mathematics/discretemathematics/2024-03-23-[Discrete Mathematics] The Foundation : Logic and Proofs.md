---
title: "[Discrete Mathematics] The Foundation : Logic and Proofs"
excerpt: "Kenneth H. Rosen - Discrete Mathematics and Its Applications : Ch01" 
categories:
  - discretemathematics
toc: true
toc_icon: star
share: false
use_math: true
---
## 1. Proposition Logic

## 2. Applications of Propositional Logic

## 3. Propositional Equivalences

Logical Equivalences : truth table을 통해 증명할 수 있다.

|Name|Equivalence|
|---|---|
|Identity laws|p $\wedge$ **T** $\equiv$ p, p $\vee$ **F** $\equiv$ p|
|Domination laws|p $\vee$ **T** $\equiv$ **T**, p $\wedge$ **F** $\equiv$ **F**|
|Idempotent laws|p $\wedge$ p $\equiv$ p, p $\vee$ p $\equiv$ p|
|Double negation law|~(~p) $\equiv$ p|
|Commutative laws|p $\vee$ q $\equiv$ q $\vee$ p, p $\wedge$ q $\equiv$ q $\wedge$ p|
|Associative laws|(p $\vee$ q) $\vee$ r $\equiv$ p $\vee$ (q $\vee$ r), (p $\wedge$ q) $\wedge$ r $\equiv$ p $\wedge$ (q $\wedge$ r)|
|Distributive laws|p $\vee$ (q $\wedge$ r) $\equiv$ (p $\vee$ q) $\wedge$ (p $\vee$ r), p $\wedge$ (q $\vee$ r) $\equiv$ (p $\wedge$ q) $\vee$ (p $\wedge$ r)|
|De Morgan's laws|~(p $\vee$ q) $\equiv$ ~p $\wedge$ ~q, ~(p $\wedge$ q) $\equiv$ ~p $\vee$ ~q|
|Absorption laws|p $\vee$ (p $\wedge$ q) $\equiv$ p, p $\wedge$ (p $\vee$ q) $\equiv$ p|
|Negation laws|p $\vee$ ~p $\equiv$ **T**, p $\wedge$ ~p $\equiv$ **F**|

|Logical Equivalences Involving Conditional Statements|
|:---:|
|p $\rightarrow$ q $\equiv$ ~p $\vee$ q|
|p $\rightarrow$ q $\equiv$ ~q $\rightarrow$ ~p|

|Logical Equivalences Involving Biconditional Statements|
|---|
||

## 4. Predicates and Quantifiers

De Morgan's Laws for Quanifiers

|Negation|Equivalent Statement|
|:---:|:---:|
|~$\exists P(x)$|$\forall$~$P(x)$|
|~$\forall P(x)$|$\exists$~$P(x)$|

## 5. Nested Quantifiers

### 5.2 Understanding Statements Involving Nested Quantifiers

### 5.3 The Order of Quantifiers

### 5.4 Translatin Mathematical Statements into Statements Involving Nested Quantifiers

### 5.5 Translating from Nested Quantifiers into English

### 5.6 Translating English Sentences into Logical Expressions

### 5.7 Negating Nested Quantifiers

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

### 7.2 Understanding How Theorems Are Stated

### 7.3 Methods of Proving Theormes

### 7.5 Direct Proofs

### 7.6 Proofs by Contraposition

### 7.7 Proofs by Contradiction

### 7.8 Mistakes in Proofs

## 8. Proof Methods and Strategy

### 8.2 Exhaustive Proof and Proof by Cases

### 8.3 Existence Proofs

### 8.4 Uniqueness Proofs

### 8.5 Proof Strategies

### 8.6 Looking for Counterexamples

### 8.7 Proof Strategy in Action

### 8.8 Tilings

### 8.9 The Role of Open Problems