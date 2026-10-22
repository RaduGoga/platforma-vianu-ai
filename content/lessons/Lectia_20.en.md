---
code: S24
duration: ~1 week
---

# @intro
Reinforcement learning is required in the upper grades. An agent learns what to do from rewards, by trial and error, without being told the correct answer at every step. At the end we also reach ethics: models can be unfair to certain groups, and it's worth knowing why it happens and how it's measured.

## What's different about RL
In the supervised learning from the lessons so far, you had the correct answer for every example. In RL you don't. The agent takes actions in an environment, gets rewards (positive or negative), and has to learn on its own which sequence of actions brings the largest reward in the long run. The challenge: a good action now may only bring the reward many steps later.

A classic example: an agent in a grid-world (a map of cells) has to reach a target while avoiding traps. It isn't told the path; it gets a small negative reward at each step and a big positive one at the target, and learns the good path on its own. The negative reward at every step pushes it toward the shortest path, since each extra step costs it. On this example, the basic words of RL mean:

- The agent is the one deciding what to do, here the robot on the map. In code, it's your program.
- The environment is the world the agent lives in: the map with its walls, traps and target, plus the rules by which the robot moves.
- An action is a move: up, down, left or right.
- The reward is a number the environment gives the agent after each action, for example -1 for an ordinary step, -10 for a trap and +10 for the target.
- An episode is one complete attempt, from the start until the agent reaches the target or falls into a trap. The agent plays many episodes and gets better from one to the next.

The difference from the search in Lesson 11: there you knew the map and searched it for the best path. Here the agent doesn't know the map or where the traps are. It finds out by trying.

## MDP: the language of RL
An MDP (Markov decision process) describes the problem formally. Markov comes from the Russian mathematician Andrey Markov and means that what happens next depends only on the current state, not on the path that led there. On the map: if you know which cell the robot is in, it doesn't matter where it came from. An MDP has:

- States: where the agent can be, here the cell it's in.
- Actions: what it can do in each state, here the four moves.
- Transitions: where it ends up after an action. "Right" moves it one cell to the right, and if there's a wall there, it stays put.
- Rewards: what it gets after each action.
- A discount factor: how much the future counts against the present.

The policy is the rule the agent chooses its action by in each state. On the map, a policy is an arrow drawn in every cell. The policy isn't part of the problem description: it's what you're looking for. The goal: find the policy that maximizes the expected total reward. Expected means on average: sometimes the environment is random (for example, the robot slips and lands in a different cell than it wanted), so what counts is what you get on average, over many episodes.

The discount is written γ (the Greek letter gamma) and is a number between 0 and 1, usually 0.9 or 0.99. Each step of waiting multiplies a reward by γ. With γ = 0.9, a reward of 10 received right now is worth 10. If it comes one step later, it's worth 10 · 0.9 = 9, two steps later 10 · 0.9² = 8.1, and three steps later 10 · 0.9³ = 7.29. A win now is surer than one promised far ahead, and this way the agent comes to prefer short paths. With γ = 0 it would only look at the immediate reward; with γ close to 1, the future counts almost as much as the present.

Two functions measure how well you're doing. V(s) says how good a state is (how much reward you expect from there on). Q(s,a) says how good a state-action pair is (how much reward you expect if you take action a in state s, then play well). The letter s stands for state, a for action, and future rewards are added up with the discount, as above.

The smallest grid-world is a corridor of 5 cells, numbered 0 to 4. The agent starts in cell 0 and can move left or right. The target is cell 4: when it gets there it receives 10 and the episode ends. Every other step gives 0, to keep the math simple. If it's in cell 0 and moves left, it bumps into the wall and stays put. The discount is γ = 0.9.

The best policy is "always go right". From cell 3, the reward of 10 comes with the very next move, so V(3) = 10. From cell 2 it comes one step later, so V(2) = 9. In the same way, V(1) = 8.1 and V(0) = 7.29, exactly the discount numbers.

Q compares the actions. Q(2, right) = 0 + 0.9 · V(3) = 9: you get 0 now and land in cell 3, which is worth 10. Q(2, left) = 0 + 0.9 · V(1) = 0.9 · 8.1 = 7.29: you land in cell 1, further from the target. The bigger Q tells you what to do: from cell 2 you go right.

The Bellman equations link them recursively: the value of a state depends on the values of the next states. The value here is the reward you get now plus γ times the value of the state you land in, if you play as well as you can from there. That's exactly how you computed it above: to find V(2), you needed V(3).

## Tabular Q-learning
Q-learning learns the Q function from experience, holding a table with one value for each state-action pair. In the corridor, the table has 5 rows (the cells) and 2 columns (left, right). After each action, it updates the value in the table, moving it closer to the reward received plus the best value in the next state. With enough tries, the table converges (the values stop changing) and the good policy comes out: in each state, you pick the action with the highest Q.

Above, you computed Q by hand because you knew the map. The agent doesn't: it finds out the rewards and where each move takes it only by trying. The formula below tells it how to correct its table after every step.

> [!FORMULA]
> Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]
> α = the learning rate, r = the reward, γ = the discount factor, s' = the next state. You move Q toward the real reward plus the future value. max Q(s',a') is the largest value in the row of state s', and the arrow ← means "becomes", like `=` in Python.

The square bracket is the difference between what you just found out, r + γ · max Q(s',a'), and what you believed before, Q(s,a). α (alpha) says how much of that difference you correct, like the learning rate η from Lesson 14: with α = 0.5 you go half the way.

A calculation by hand in the corridor, with α = 0.5 and γ = 0.9. The table starts out all zeros. The agent is in cell 3, moves right, gets r = 10 and reaches the target. Nothing comes after the target, so max Q(s',a') = 0. Q(3, right) ← 0 + 0.5 · [10 + 0.9 · 0 - 0] = 5.

In a later episode, the agent is in cell 2 and moves right: r = 0 and it lands in cell 3, where the largest value is now 5. Q(2, right) ← 0 + 0.5 · [0 + 0.9 · 5 - 0] = 2.25. When it's back in cell 3 and moves right, Q(3, right) ← 5 + 0.5 · [10 + 0.9 · 0 - 5] = 7.5. The target's value trickles backward, cell by cell, and with enough episodes the numbers approach 10, 9, 8.1 and 7.29.

## Exploration versus exploitation
A central dilemma: exploration versus exploitation. If the agent always picks what looks best now (exploitation), it may miss a better path it hasn't tried. If it explores too much, it wastes time. The ε-greedy strategy balances it: with probability ε it takes a random action (exploration), otherwise it picks the best one (exploitation). You usually start with a large ε and lower it gradually.

ε (epsilon) is another Greek letter, here a number between 0 and 1, and greedy means always grabbing what looks best right now. With ε = 0.1, about 1 move in 10 is picked at random, and the other 9 are the best ones according to the table. With ε = 1, every move is random, which is what you want at the start, when the table is all zeros and the agent knows nothing.

The code below puts it all together: the corridor, the Q table, the formula and ε-greedy.

```
import random
import numpy as np

random.seed(0)
N = 5                    # cells 0, 1, 2, 3, 4; the target is cell 4
Q = np.zeros((N, 2))     # column 0 = left, column 1 = right
alpha, gamma = 0.5, 0.9

for episode in range(300):
    eps = max(0.1, 1 - episode / 100)  # starts at 1, drops to 0.1
    s = 0                              # every episode starts in cell 0
    while s != N - 1:
        if random.random() < eps:
            a = random.randint(0, 1)   # exploration: a random action
        else:
            a = Q[s].argmax()          # exploitation: the best one so far
        s2 = max(s - 1, 0) if a == 0 else s + 1   # in cell 0, left = stay
        r = 10 if s2 == N - 1 else 0
        future = 0 if s2 == N - 1 else Q[s2].max()
        Q[s, a] += alpha * (r + gamma * future - Q[s, a])
        s = s2

print(Q.round(2))
# [[ 6.56  7.29]
#  [ 6.56  8.1 ]
#  [ 7.29  9.  ]
#  [ 8.1  10.  ]
#  [ 0.    0.  ]]
print(Q[:N - 1].argmax(axis=1))   # [1 1 1 1]: right in every cell
```

Each episode starts in cell 0 and lasts until the agent reaches cell 4 (the `while` loop). `Q[s]` is the row of cell s, and `Q[s].argmax()` gives the column with the largest value (Lesson 4), the best action so far. `random.random()` gives a random number between 0 and 1 (Lesson 3); when ε = 0.1, the number falls below ε about once in 10, and then the agent picks at random. `s2` is the next cell, `r` the reward, and `future` is max Q(s',a'), which is 0 when the target has been reached. The line with `+=` is the formula above.

What comes out: the learned table, rounded to two decimals with `Q.round(2)`. The right column holds exactly the values computed by hand: 7.29, 8.1, 9 and 10. The left column matches too, for example Q(2, left) = 7.29, as above. The row of cell 4 stays 0, because the game ends there. `Q[:N - 1].argmax(axis=1)` picks the best column in every row except the last: 1, which means right, everywhere.

The ε in the code goes down: it's 1 in the first episode, 0.5 at episode 50 and 0.1 from episode 90 on. At first the agent tries anything, then it uses what it learned more and more often. Since ε never reaches 0, the agent still tries left now and then, which is why the left column has values too.

> [!NOTE]
> An ε that's too small too early is a classic trap: the agent fixes on the first decent path it found and stops exploring, staying stuck in a mediocre solution. Let it explore enough at the start.

## Bias and fairness
Here bias no longer means the error from overly simple assumptions from Lesson 1. It means a systematic unfairness: the model makes more mistakes, or worse decisions, for a certain group of people. A model learns from data, so it inherits the patterns in it, including the unfair ones. Bias comes in through several doors: historical data that reflects past discrimination, biased labeling, or the choice of a metric that hides the problem.

For example, if a company used to hire mostly men, a model trained on the old hiring decisions learns that being a man is a good sign. Yet that says nothing about how well someone works. A model can do well on average and badly on a subgroup, and the average hides that. In numbers: group A is 90% of the data and the model has 99% accuracy on it, while group B is 10% of the data and there the model gets half the cases wrong. The overall accuracy is 0.9 · 99% + 0.1 · 50% = 89.1% + 5% = 94.1%, which looks great.

That's why you measure performance on each subgroup separately, next to the overall score. With pandas, if you have a `group` column and a `correct` column (True when the prediction is right), `df.groupby("group")["correct"].mean()` gives you the accuracy for each group (Lesson 4). The mean of True and False values is exactly the share of True. Fairness has several definitions, and this is the hard part: you can't always have them all at once.

- Demographic parity: the model gives positive outcomes in the same proportion for each group. For example, it approves 45% of the applications in group A and in group B.
- Equal opportunity: the model has the same true positive rate for each group (it catches the real cases equally well in each group). The true positive rate is the recall from Lesson 8, computed separately for each group.

An example with loans. Group A has 100 people, 60 of whom would pay the money back. Group B also has 100, but only 30 would pay it back. "Positive" means the model approves the loan.

A perfect model approves exactly the people who would pay back: 60 in A and 30 in B. The true positive rate is 60 / 60 = 100% in A and 30 / 30 = 100% in B, so equal opportunity holds. But the approval rate is 60% in A and 30% in B, so demographic parity is broken.

Now you ask for parity: 45 approvals in each group. In A, the best you can do is approve 45 of the 60 who would pay, so you turn down 15 people who deserved it: the true positive rate drops to 45 / 60 = 75%. In B you approve all 30 who would pay, plus 15 who won't pay the money back, and the rate stays at 100%. Parity holds (45% and 45%), but equal opportunity doesn't anymore (75% against 100%).

The two definitions can be mathematically incompatible: satisfying one, you break the other. It happens when the groups have different shares of real positive cases, like 60% and 30% here. You can satisfy both only with a model that makes more mistakes: it turns down people who deserved it or approves people who didn't. There's no purely technical answer. The choice depends on the context and on what cost each kind of mistake has for people. What matters is to be aware of the trade-off and make it explicit, not to report only the average and hide the rest.

# @practice
- Implement Q-learning on a grid-world and watch the policy take shape.
- Measure a model's performance on subgroups and discuss which fairness definition you use.
- Vary ε (the exploration) and see how the policy the agent learns changes.
