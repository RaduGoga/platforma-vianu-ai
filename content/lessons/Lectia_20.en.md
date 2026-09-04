---
code: S24
duration: ~1 week
---

# @intro
Reinforcement learning is required in the upper grades. An agent learns what to do from rewards, by trial and error, without being told the correct answer at every step. At the end we also reach ethics: models can be unfair to certain groups, and it's worth knowing why it happens and how it's measured.

## What's different about RL
In supervised learning you had the correct answer for every example. In RL you don't. The agent takes actions in an environment, gets rewards (positive or negative), and has to learn on its own which sequence of actions brings the largest reward in the long run. The challenge: a good action now may only bring the reward many steps later.

A classic example: an agent in a grid-world (a map of cells) has to reach a target while avoiding traps. It isn't told the path; it gets a small negative reward at each step and a big positive one at the target, and learns the good path on its own.

## MDP: the language of RL
An MDP (Markov decision process) describes the problem formally. It has states (where the agent can be), actions (what it can do), rewards (what it gets), a discount factor (how much the future counts against the present), and a policy (the rule the agent chooses its action by in each state). The goal: find the policy that maximizes the expected total reward.

Two functions measure how well you're doing. V(s) says how good a state is (how much reward you expect from there on). Q(s,a) says how good a state-action pair is (how much reward you expect if you take action a in state s, then play well). The Bellman equations link them recursively: the value of a state depends on the values of the next states.

## Tabular Q-learning
Q-learning learns the Q function from experience, holding a table with one value for each state-action pair. After each action, it updates the value in the table, moving it closer to the reward received plus the best value in the next state. With enough tries, the table converges and the good policy comes out: in each state, you pick the action with the highest Q.

> [!FORMULA]
> Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]
> α = the learning rate, r = the reward, γ = the discount factor, s' = the next state. You move Q toward the real reward plus the future value.

A central dilemma: exploration versus exploitation. If the agent always picks what looks best now (exploitation), it may miss a better path it hasn't tried. If it explores too much, it wastes time. The ε-greedy strategy balances it: with probability ε it takes a random action (exploration), otherwise it picks the best one (exploitation). You usually start with a large ε and lower it gradually.

> [!NOTE]
> An ε that's too small too early is a classic trap: the agent fixes on the first decent path it found and stops exploring, staying stuck in a mediocre solution. Let it explore enough at the start.

## Bias and fairness
A model learns from data, so it inherits the patterns in it, including the unfair ones. Bias comes in through several doors: historical data that reflects past discrimination, biased labeling, or the choice of a metric that hides the problem. A model can do well on average and badly on a subgroup, and the average hides that.

That's why you measure performance on subgroups too, not just overall. Fairness has several definitions, and this is the hard part: you can't always have them all at once.

- Demographic parity: the model gives positive outcomes in the same proportion for each group.
- Equal opportunity: the model has the same true positive rate for each group (it catches the real cases equally well in each group).

The two definitions can be mathematically incompatible: satisfying one, you break the other. There's no purely technical answer. The choice depends on the context and on what cost each kind of mistake has for people. What matters is to be aware of the trade-off and make it explicit, not to report only the average and hide the rest.

# @takeaways
- In RL the agent learns from rewards, not from given correct answers.
- An MDP has states, actions, rewards, discount and a policy; V and Q measure how well you're doing.
- Q-learning learns a table of values from experience and produces the good policy.
- ε-greedy balances exploration and exploitation; explore enough at the start.
- Bias comes in through data and labels; measure on subgroups, not just the average.
- Fairness definitions can be incompatible; the choice is contextual, not purely technical.

# @pitfalls
- Decay ε gradually, so the agent explores enough early on.
- Report the score on subgroups too, not just the average.
- Treat fairness as several definitions that pull against each other.

# @practice
- Implement Q-learning on a grid-world and watch the policy take shape.
- Measure a model's performance on subgroups and discuss which fairness definition you use.
- Vary ε (the exploration) and see how the policy the agent learns changes.
