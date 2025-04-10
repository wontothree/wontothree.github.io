---
title: "[AI] Intelligent Agents"
categories:
  - artificialintelligence
---
Our plan in this book is to use this concept to develop a small set of design principles for building successful agents—systems that can reasonably be called intelligent.

We begin by examining agents, environments, and the coupling between them. The observation that some agents behave better than others leads naturally to the idea of a rational agent—one that behaves as well as possible.

How well an agent can behave depends on the nature of the environment.

We give a crude categorization of environments and show how properties of an environment influence the design of suitable agents for that environment.

# 1. Agent and Environments

- Agent: anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators
- Environment: part of the universe that affect what the agent perceives and that is affected by the agent's actions

Mathematically speaking, we say that an agent's behavior is described by the agent function that maps any given percept sequence to an action

# 2. Good Behavior: The Concept of Rationality

## Performance measures

THe notion of desirability is captured by a performance measure that evaluages any given sequence of encironment states.

Some agent have an explicit representation of the performance measure, while in other designs the performance measure is entirely implicit - that agent may do the right thing, but it doesn't know why.

As a general rule, it is better to design performance measures according to what one actually wants to be achieved in the environment, tather than according to how one thinks the agent should behave.

For most of the book, we will assume that the performance measure can be specified correctly.

## Rationality

What is rational at any given time depends on four things:

- The performance measure that defines the criterion of success.
- The agent’s prior knowledge of the environment.
- The actions that the agent can perform.
- The agent’s percept sequence to date.

This leads to a definition of a rational agent:

>For each possible percept sequence, a rational agent should select an action that is ex- pected to maximize its performance measure, given the evidence provided by the percept sequence and whatever built-in knowledge the agent has.

## Omniscience, learning, and autonomy

We need to be careful to distinguish between rationality and omniscience.

Rationality is not the same as perfection. Rationality maximizes expected performance, while perfection maximizes actual performance. It will be impossible to design an agent to fulfill the perfection.

Our definition of rationality does not require omniscience, then, because the rational choice depends only on the percept sequence to data.

1. it would not be rational to cross the road given this uninformative percept sequence: the risk of accident from crossing without looking is too great.
2. A rational agent should choose the “looking” action before stepping into the street, because looking helps maximize the expected performance

To the extent that an agent relies on the prior knowledge of its designer rather than on its own percepts and learning processes, we say that the agent lacks autonomy. A rational agent should be autonomous—it should learn what it can to compensate for partial or incorrect prior knowledge.

it would be reasonable to provide an artificial intelligent agent with some initial knowledge as well as an ability to learn. After sufficient experience of its environment, the behavior of a rational agent can become effectively independent of its prior knowledge. Hence, the incorporation of learning allows one to design a single rational agent that will succeed in a vast variety of environments.

# 3. The Hature of Environments

We begin by showing how to specify a task environment, illustrating the process with a number of examples. We then show that task environments come in a variety of flavors. The nature of the task environment directly affects the appropriate design for the agent program.

## Specifying the task environment

In our discussion of the rationality of the simple vacuum-cleaner agent, we had to specify the performance measure, the environment, and the agent’s actuators and sensors. We group all these under the heading of the task environment. For the acronymically minded, we call this the PEAS (Performance, Environment, Actuators, Sensors) description. In designing an agent, the first step must always be to specify the task environment as fully as possible.

## Properties of task environments

The range of task environments thath might arise in AI is obviously vast. We can, however, identify a fairly small number of dimensions along which task environments can be categorized.

**Fully observable** vs. **partially observable**

- If an agent’s sensors give it access to the complete state of the environment at each point in time, then we say that the task environment is fully observable. A task environment is effectively fully observable if the sensors detect all aspects that are relevant to the choice of action; relevance, in turn, depends on the performance measure. Fully observable environments are convenient because the agent need not maintain any internal state to keep track of the world.
- An environment might be partially observable because of noisy and inaccurate sensors or because parts of the state are simply missing from the sensor data.

**Deterministic** vs. **nondeterministic**.

- If the next state of the environment is completely determined by the current state and the action executed by the agent(s), then we say the environment is deterministic; otherwise, it is nondeterministic.

In principle, an agent need not worry about uncertainty in a fully observable, deterministic environment. If the environment is partially observable, however, then it could appear to be nondeterministic.

- We say that a model of the environment is stochastic if it explicitly deals with probabilities.

**Episodic** vs. **sequential**

- In an episodic task environment, the agent’s experience is divided into atomic episodes. In each episode the agent receives a percept and then performs a single action. Crucially, the next episode does not depend on the actions taken in previous episodes.
- In sequential environments, the current decision could affect all future decisions.

Episodic environments are much simpler than sequential environments because the agent does not need to think ahead.

**Static** vs. **dynamic**

- If the environment can change while an agent is deliberating, then we say the environment is dynamic for that agent; otherwise, it is static. Static environments are easy to deal with because the agent need not keep looking at the world while it is deciding on an action, nor need it worry about the passage of time. Dynamic environments, on the other hand, are continuously asking the agent what it wants to do; if it hasn’t decided yet, that counts as deciding to do nothing.
- If the environment itself does not change with the passage of time but the agent’s performance score does, then we say the environment is semidynamic.

**Discrete** vs. **continuous**

- The discrete/continuous distinction applies to the state of the environment, to the way time is handled, and to the percepts and actions of the agent.

**Known** vs. **unknown**

- In a known environment, the outcomes (or outcome probabilities if the environment is nondeterministic) for all actions are given.
- if the environment is unknown, the agent will have to learn how it works in order to make good decisions.

The hardest case is partially observable, multiagent, nondeterministic, sequential, dy- namic, continuous, and unknown. Taxi driving is hard in all these senses, except that the driver’s environment is mostly known. Driving a rented car in a new country with unfamiliar geography, different traffic laws, and nervous passengers is a lot more exciting.

## The Structure of Agents

# 4. The Structure of Agents
