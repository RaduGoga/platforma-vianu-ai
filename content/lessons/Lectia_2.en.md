---
code: S2
duration: ~2h
---

# @intro
Before you learn any model, it's worth understanding what you're dealing with. An AI contest problem almost always has the same pieces: some data, a target to predict, a scoring metric and a submission file with your answers. Whoever reads the statement properly starts with a big head start.

## Anatomy of a problem
You get two datasets. A training one, which also has the correct answers (called labels, or the target), and a test one, which has the same columns but no answer. Your job is to predict the answer for the test set, based on what you learned from the training one.

Here's a small example, modelled on the Titanic problem on Kaggle: from a passenger's age and the price of their ticket, you have to guess whether they survived the shipwreck. Data usually comes as CSV files, which are tables saved as text. Each line is a row of the table, with the values separated by commas, and the first line holds the column names. The training file, `train.csv`, looks like this:

```
id,age,fare,survived
1,22,7,0
2,38,71,1
3,26,8,1
4,35,53,1
5,35,8,0
```
caption: Each row is a passenger. The last column is the answer: 1 if they survived, 0 if not.

The test file, `test.csv`, has other passengers and the same columns, minus the last one. That's the one you have to guess:

```
id,age,fare
6,34,8
7,4,16
8,58,26
```
caption: The same columns, with no answer.

You write your answers in a submission file, usually `submission.csv`. A submission is your answer to the problem: the file you upload to the platform to get it scored. It has one row for each passenger in the test file, with their id and your prediction:

```
id,survived
6,0
7,1
8,1
```
caption: For each id in the test file, 1 or 0, whichever you think is right.

- Training data: the rows you see in full, answer included, as in `train.csv`. This is what the model learns from.
- Test data: the same columns, but the target column is missing, as in `test.csv`. This is what you have to fill in.
- The target: what you predict, here the `survived` column. It can be a label (spam or not) or a number (a price). A label is the answer on a single row: passenger 2 has the label 1.
- The submission file: a table with your predictions, in exactly the format the platform asks for, like `submission.csv`.

> [!NOTE]
> The columns used as input for the model are called features, here `age` and `fare`. The `id` column isn't a feature: it's just the row's number, so the platform knows whose prediction is whose.

## The metric
Every problem has a metric, the formula your score is computed with. It's written in the statement and it matters a lot. If the metric is F1 and you optimize accuracy (both are explained just below), you can climb on a score that earns you no points. A few examples:

- Accuracy: the percentage of correct answers. Simple, but misleading when the classes (the possible answers, like spam and normal) are imbalanced, meaning one is much rarer than the others.
- F1: balances precision against recall, good when the classes are imbalanced.
- RMSE or MAE: for numeric targets (regression), how far you are on average from the real answer.

An example of imbalanced classes: out of 100 card payments, 98 are normal and 2 are fraud. A model that always says "normal" gets 98 out of 100 right, so its accuracy is 98%. Yet it hasn't caught a single fraud, which is exactly what you cared about.

This is where F1 helps, and it's computed from two numbers. Precision tells you how many of the payments the model flagged as fraud really were fraud. Recall tells you how many of the real frauds the model caught. The model that always says "normal" caught no fraud, so its recall is 0 and its F1 is 0 too. F1 is a score between 0 and 1, and higher is better; the formula and the rest of the details are in Lesson 8.

For numbers, here's an example worked out by hand. You predict tomorrow's temperature in three cities: 10, 12 and 9 degrees. The real values were 11, 12 and 6 degrees, so your errors, ignoring the sign, are 1, 0 and 3 degrees. MAE (mean absolute error) is their average: (1 + 0 + 3) / 3 ≈ 1.33 degrees. RMSE (root mean squared error, the square root of the average squared error) first squares each error (1, 0, 9), takes the average and then the square root: √((1 + 0 + 9) / 3) ≈ √3.33 ≈ 1.83 degrees. It comes out higher because the 3-degree error becomes 9 once squared: RMSE punishes big errors harder.

A good rule: read the metric before anything else, and train with it in mind. If F1 is what's scored, validate locally on F1 as well, meaning you also measure F1 on the data you set aside to check your model (validation, from Lesson 1).

## Submission and leaderboard
Once you have the predictions, you put them in the required file and upload it. The platform compares it against the correct answers, which you don't see, and gives you a score on a ranking of all the contestants, called the leaderboard. You usually have a limited number of submissions, so don't waste them on random tries.

The leaderboard has two parts. The public one is computed on part of the test data and you see it throughout the contest. The private one is computed on the rest and is revealed only at the end. For example, if the test set has 1000 rows, the public score might come from 300 of them and the private one from the other 700, without you knowing which are which. The ranking that counts is the private one. That split into two parts exists for a reason.

If you pick your model by the public score, you end up fitting that small slice of data rather than the real problem. It's called overfitting the leaderboard: you climb nicely on the public one, then drop on the private one, which is where the points are actually handed out. It's the overfitting from Lesson 1 (memorizing instead of learning), except that now you're the one doing it, through your choices. If you try 50 variants and keep the one with the best public score, you may simply have picked the variant that got lucky on those 300 public rows.

> [!NOTE]
> The defence is serious local validation. You keep part of the training data aside as your own test set, and trust the score from there more than the public leaderboard. For example, out of 4000 training rows you set aside 20%, which is 800. You train the model on the other 3200 and score it on those 800, whose answers you know (the code is in Lesson 6). That's more rows than the 300 public ones, and you can use them as often as you like without spending submissions. At the end you pick your submissions by the local score, not the public one.

## The ONIA rules
From the rules of the olympiad (ONIA, Romania's National Olympiad in Artificial Intelligence), a few things worth knowing in advance:

- The contest lasts four hours.
- A problem's solution has two parts: the file with your answer and the Python code that produced it. You submit both on the platform.
- The number of submissions is limited, and a minimum amount of time has to pass between two of them. You find out both together with the problems.
- The score you see during the contest is provisional, computed on part of the test data, like a public leaderboard. The final one is computed on the whole set.
- For each problem you pick two submissions. Only those count in the final ranking.
- Your account on platform.olimpiada-ai.ro has to be created and activated before the announced deadline. After it, you can't sign up anymore.

> [!NOTE]
> The minimum score to qualify for the national stage is 60% of the total.

## Where you train
Three platforms where you'll find problems:

- Kaggle (kaggle.com): the most widely used international machine learning platform.
- MLCompete (platform.olimpiada-ai.ro): the platform the olympiad runs on and where you practise between stages, with archive problems and training competitions.
- Nitro AI Judge (judge.nitro-ai.org): the platform RoAI and other AI contests run on.

## Your first submission
MLCompete (platform.olimpiada-ai.ro) and Nitro AI Judge (judge.nitro-ai.org) are the platforms you'll practise on. Make an account on both. Your first submission doesn't need a good score: you make it to learn the whole route from the data to a score.

1. Enter a training competition and read which metric is scored.
2. Download the data and open the sample submission file (usually `sample_submission.csv`), to see exactly which columns and which format it asks for. If you open it in Notepad or another text editor, it looks like the examples above.
3. Produce a file in the same format, even with random answers. The simplest is to upload the sample file itself, unchanged.
4. Upload it and look at the score.

> [!NOTE]
> If the file isn't formatted correctly you'll get validation errors. Read them, they tell you exactly what doesn't match. Here "validation" means the platform checking your file's format, not your model.

# @practice
- Any problem with a sample submission file
- [Titanic on Kaggle](https://www.kaggle.com/competitions/titanic)
