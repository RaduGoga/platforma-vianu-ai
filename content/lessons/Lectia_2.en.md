---
code: S2
duration: ~2h
---

# @intro
Before you learn any model, it's worth understanding what you're dealing with. An AI contest problem almost always has the same pieces: some data, a target to predict, a scoring metric and a submission file. Whoever reads the statement properly starts with a big head start.

## Anatomy of a problem
You get two datasets. A training one, which also has the correct answers (called labels, or the target), and a test one, which has the same columns but no answer. Your job is to predict the answer for the test set, based on what you learned from the training one.

- Training data: the rows you see in full, answer included. This is what the model learns from.
- Test data: the same columns, but the target column is missing. This is what you have to fill in.
- The target: what you predict. It can be a label (spam or not) or a number (a price).
- The submission file: a table with your predictions, in exactly the format the platform asks for.

> [!NOTE]
> The columns used as input for the model are called features.

## The metric
Every problem has a metric, the formula your score is computed with. It's written in the statement and it matters a lot. If the metric is F1 and you optimize accuracy, you can climb on a score that earns you no points. A few examples:

- Accuracy: the percentage of correct answers. Simple, but misleading when the classes are imbalanced.
- F1: balances precision against recall, good when the classes are uneven.
- RMSE or MAE: for numbers, how far you are on average from the real answer.

A good rule: read the metric before anything else, and train with it in mind. If F1 is what's scored, validate locally on F1 as well.

## Submission and leaderboard
Once you have the predictions, you put them in the required file and upload it. The platform compares it against the correct answers, which you don't see, and gives you a score on a leaderboard. You usually have a limited number of submissions, so don't waste them on random tries.

The leaderboard has two halves. The public one is computed on part of the test data and you see it throughout the contest. The private one is computed on the rest and is revealed only at the end. The ranking that counts is the private one. That split exists for a reason.

If you pick your model by the public score, you end up fitting that small slice of data rather than the real problem. It's called overfitting the leaderboard: you climb nicely on the public one, then drop on the private one, which is where the points are actually handed out.

> [!NOTE]
> The defence is serious local validation. You keep part of the training data aside as your own test set, and trust the score from there more than the public leaderboard. At the end you pick your submissions by the local score, not the public one.

## Where you train
Three platforms where you'll find problems:

- Kaggle (kaggle.com): the most widely used international ML platform.
- MLCompete (platform.olimpiada-ai.ro): the platform the olympiad runs on and where you practise between stages, with archive problems and training competitions.
- Nitro AI Judge (judge.nitro-ai.org): the platform RoAI and other AI contests run on.

## Your first submission
MLCompete (platform.olimpiada-ai.ro) and Nitro AI Judge (judge.nitro-ai.org) are the platforms you'll practise on. Make an account on both.

1. Enter a training competition and read which metric is scored.
2. Download the data and open the sample submission file, to see exactly which columns and which format it asks for.
3. Produce a file in the same format, even with random answers.
4. Upload it and look at the score.

> [!NOTE]
> If the file isn't formatted correctly you'll get validation errors. Read them, they tell you exactly what doesn't match.

# @practice
- Any problem with a sample submission file
