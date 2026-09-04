---
code: S2
duration: ~2h
---

# @intro
Before you learn any model, it's worth understanding the game. An AI contest problem always has the same pieces: some data, a target to predict, a scoring metric and a submission file. Whoever reads those pieces correctly starts with a big head start, because half the mistakes at a contest aren't about the model, they're about reading the statement in a hurry.

## Anatomy of a problem
You get two datasets. One for training, which also has the correct answers (called the labels or the target), and one for testing, which has the same columns but no answer. Your job is to predict the answer for the test set, based on what you learned on the training one.

- Training data: the rows you see in full, answer included. This is what the model learns from.
- Test data: the same columns, but the target column is missing. This is what you fill in.
- The target: what you predict. It can be a label (spam or not) or a number (a price).
- The submission file: a table with your predictions, in the exact format the platform wants.

> [!NOTE]
> The first thing you do on a new problem isn't to train something. It's to open the data and the sample submission file and look at them: how many rows, which columns, what's missing, what the required answer looks like.

## The metric is the rule of the game
Every problem has a metric, meaning the formula your score is computed with. It's written in the statement and it's the only one that counts. You're not scored on how clever the model looks, but on the number the metric produces. If the metric is F1 and you optimize accuracy, you can climb a score that earns you no points.

- Accuracy: the share of correct answers. Simple, but misleading when the classes are imbalanced.
- F1: balances precision against recall, good when the classes are uneven.
- RMSE or MAE: for numbers, how far off you are on average from the real answer.

The practical rule: read the metric before anything, and train with it in mind. If F1 is scored, validate locally on F1, not on something else.

## Submission and leaderboard
Once you have the predictions, you put them in the required file and upload it. The platform compares it against the correct answers, which you don't see, and gives you a score on a board. You usually have a limited number of submissions per day, so don't waste them on random tries.

The leaderboard has two faces. The public one is computed on part of the test data and you see it while the contest runs. The private one is computed on the rest and is only revealed at the end. The ranking that counts is the private one. That split exists for a reason, and it leads you straight to the next trap.

## The public leaderboard trap
If you pick your model by the public score, you end up fitting that small slice of data instead of the real problem. It's called overfitting the leaderboard: you climb nicely on the public one, then you drop on the private one, where the points are actually handed out.

> [!NOTE]
> The defense is a serious local validation. You keep part of the training data aside, as your own test, and you trust that score more than the public leaderboard. At the end you pick your submissions on the local score, not the public one.

## Where you train
There are three places you need all year. They're not interchangeable, each has its own job.

- ONIA (olimpiada-ai.ro): the official artificial intelligence olympiad, with a local, county and national stage. The winners go to the team for IOAI.
- MLCompete (platform.olimpiada-ai.ro): the platform the olympiad runs on, and where you practice between stages, with archive problems and training competitions.
- Nitro NLP (nitro-ai.org): a Romanian-language NLP hackathon, in teams, good for working on real text.

You don't have to touch all of them today. You just need to know what each one is for, so you don't find yourself in January with no account and no submission ever made.

# @takeaways
- A problem has four pieces: training data with labels, test data without, a target, a metric.
- You're scored on exactly the metric in the statement. You optimize what's scored, not what looks nice.
- The private leaderboard decides the ranking, the public one just tempts you.
- You pick your final submissions on your local validation, not on the public score.

# @pitfalls
- Read the metric and the submission format before any model.
- Pick your model by your local validation, not by the public leaderboard.
- Save the day's submissions for ideas you've already checked locally.

# @practice
- Take an archive problem on MLCompete and write three lines: what the target is, what the metric is, what the submission looks like.
- Make a local validation split and compare its score with the public leaderboard on the same submission.
- Explain to a friend the difference between the public and the private leaderboard, with an example.
