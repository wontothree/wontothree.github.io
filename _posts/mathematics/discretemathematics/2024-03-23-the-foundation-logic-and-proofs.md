---
title: "[Discrete Mathematics] The Foundation : Logic and Proofs"
excerpt: "Discrete Mathematics (Ch01)" 
categories:
  - discretemathematics
---
## 1. Proposition Logic

A proposition is a declarative sentence that is either true or false, but not both.

>**[DEFINTION 2]** \
>Let $p$ and $q$ be propositions. The conjection of $p$ and $q$, denoted by $p \wedge q$, is the proposition "$p$ and $q$". The conjunction $p \wedge q$ is true when both $p$ and $q$ are true and false otherwise.

## 2. Applications of Propositional Logic

## 3. Propositional Equivalences

>**[DEFINITION 1]** \
>A compound proposition that is always true, no matter what the truth vales of the propositional variablse that occur in it, is called a tautology. \
>A compound proposition that is always false is called a contradiction. \
>A compund proposition that is neither a tautologoy nor a contraadiction is called a contingency.

### 3.2 Logical Equivalences

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

### 3.4 Constructing New Logical Equivalences

The logical equivalences in Table can be used to construct additional logical equivalences.

## 4. Predicates and Quantifiers

"x is greater than 3"

- Subject : x
- Predicate : a property that subject of the statement can have. - "is greater than 3"

Quantification expresses the extent to which a predicate is true over a range of elements.

>**[DEFINITION 1]** \
>The universal quantification of $P(x)$ is the statement \
>"P(x) for all values in the domain." \
>The notation $\forall x P(x)$ denotes the universal quantification of $P(x)$. Here $\forall$ is called the universal quantifier. We read $\forall x P(x)$ as "for all $x P(x)$" or "for every $xP(x)$". An element ofr which $P(x)$ is false is called a counterexample to $\forall x f(x)$.

>**[DEFINITION 2]** \
>The existential quantification of $P(x)$ is the proposition \
>"There exists an element $x$ in the domain such that $P(x)$." \
>We use the notation $\exists x P(x)$ for the existential quantification of $P(x)$. Here $\exists$ is called the existential quantifier.

De Morgan's Laws for Quanifiers

|Negation|Equivalent Statement|
|:---:|:---:|
|~$\exists P(x)$|$\forall$~$P(x)$|
|~$\forall P(x)$|$\exists$~$P(x)$|

## 5. Nested Quantifiers

Nested quantifiers commonly occur in mathematics and compuer science.

## 6. Rules of Inference

To deduce new statements from statements we already have, we use rules of inference which are templates for constructinf valid arguments. Rules of inference are our basic tools for establishing the truth of statements.

We will show rules of inference ofr propositiions and for quanfified statements can be combined.

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