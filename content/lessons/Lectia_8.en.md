---
code: S11
duration: ~2 weeks
---

# @intro
This is where the contest is won or lost. A model that looks good on the public leaderboard can be weak on the hidden one (the private leaderboard from Lesson 2), which is what counts at the end. This module is about having justified trust in your score. It's the least flashy part and the one that makes the difference between a top 10 and a mid-table finish.

## Why accuracy lies to you
Accuracy is the share of correct predictions. It sounds reasonable, but on imbalanced classes (one class much rarer than the other, Lesson 5) it's misleading. If 98% of the examples are the "no" class, a model that always says "no" gets 98% accuracy and zero value: it never finds the cases you're looking for. That's why you need metrics that look at each class separately.

## The confusion matrix: the foundation
The confusion matrix is a 2 by 2 table that counts the four kinds of outcome for a binary classification, meaning one with two classes. It's the basis every other metric is computed from, so it's worth understanding well.

One of the classes is the one you're looking for, say spam: that's the positive class, and normal emails are the negative class (as with logistic regression in Lesson 7). In each name below, the second word says what you predicted, and the first says whether you were right.

- TP (true positive): it was positive, you said positive. Correct.
- TN (true negative): it was negative, you said negative. Correct.
- FP (false positive): it was negative, you said positive. A false alarm.
- FN (false negative): it was positive, you said negative. You missed it.

An example. Out of 100 emails, 10 are spam. The model marks 12 as spam, and 8 of those really are. So TP = 8 (spam caught), FP = 4 (normal emails marked by mistake), FN = 2 (spam that slipped through) and TN = 86 (normal emails left alone), which add up to 100. Accuracy is (8 + 86) / 100 = 0.94, even though the model misses one spam in five.

```
import numpy as np
from sklearn.metrics import confusion_matrix

# 100 emails: 1 = spam, 0 = normal
y_true = np.array([1] * 10 + [0] * 90)
# the model catches 8 spam, misses 2 and raises 4 false alarms
y_pred = np.array([1] * 8 + [0] * 2 + [1] * 4 + [0] * 86)

print(confusion_matrix(y_true, y_pred))
# [[86  4]
#  [ 2  8]]
```

`[1] * 10` is a list of ten 1s, and `+` glues lists together, so `y_true` has the 10 spam emails first, then the 90 normal ones. `y_pred` has the predictions, in the same order. In the result, rows are the true answers and columns are the predictions, class 0 first, then class 1. So top left is TN, top right FP, bottom left FN and bottom right TP.

Which one hurts more depends on the problem. For a disease test, a false negative (a sick person sent home) is worse than a false positive. For a spam filter, it's the other way around: an important email moved to spam costs you more than an ad that slips into your inbox. The right metric reflects the real cost of each kind of mistake.

## Precision, recall, F1
> [!FORMULA]
> precision = TP / (TP + FP)
> Of all the ones you called positive, how many really were. High precision = few false alarms. In the example: 8 / (8 + 4) = 8 / 12 ≈ 0.67.

> [!FORMULA]
> recall = TP / (TP + FN)
> Of all the ones that really were positive, how many you caught. High recall = you miss few. In the example: 8 / (8 + 2) = 0.8.

Precision and recall pull in opposite directions. If you say positive only when you're very sure, precision goes up but recall goes down. If you say positive often, it's the reverse. That's exactly what you tune with the threshold from Lesson 7. F1 reconciles them into a single number, their harmonic mean, which is small if either of them is small.

> [!FORMULA]
> F1 = 2 · (precision · recall) / (precision + recall)
> The harmonic mean. It punishes imbalance: you can't have a high F1 with a tiny recall. In the example: 2 · (0.67 · 0.8) / (0.67 + 0.8) ≈ 0.73.

The usual average would hide the problem. A model that marks a single email as spam, one it's absolutely sure about, and gets it right, has precision 1.0. But it caught only one of the 10 spam emails, so its recall is 0.1. The usual average would give (1.0 + 0.1) / 2 = 0.55, a score that looks decent for a nearly useless model. F1 gives 2 · (1.0 · 0.1) / (1.0 + 0.1) ≈ 0.18.

```
from sklearn.metrics import classification_report

print(classification_report(y_true, y_pred))
#               precision    recall  f1-score   support
#
#            0       0.98      0.96      0.97        90
#            1       0.67      0.80      0.73        10
#
#     accuracy                           0.94       100
#    macro avg       0.82      0.88      0.85       100
# weighted avg       0.95      0.94      0.94       100
```

`classification_report` does all the math at once, on the `y_true` and `y_pred` from above. Row 1 is the spam class: 0.67, 0.80 and 0.73, exactly what you computed by hand. Row 0 does the same math with normal emails as the positive class. `support` is how many rows of each class are in the data. `accuracy` is the 0.94 accuracy from above, and the last two rows are two ways of averaging over the classes.

It works the same way with more than two classes: one F1 per class, each treated in turn as the positive class, then an average. Take 100 photos, with 80 dogs, 15 rabbits and 5 parrots, and a model with F1 0.9 on dogs, 0.6 on rabbits and 0.2 on parrots. The plain average, macro-F1, is (0.9 + 0.6 + 0.2) / 3 ≈ 0.57. The weighted average, weighted-F1, multiplies each F1 by the class's share of the data: 0.8 · 0.9 + 0.15 · 0.6 + 0.05 · 0.2 = 0.82. The parrots drag macro-F1 down, but in weighted-F1 they barely register.

> [!NOTE]
> With many classes, F1 is aggregated. Macro-F1 averages over classes treating them equally (good when you care about the rare ones). Weighted-F1 accounts for each class's size. In `f1_score` you pick them with `average="macro"` or `average="weighted"`, as in Lesson 6. Read in the rules which one is scored and optimize exactly that.

## Validation without leaks
Data leakage is when, without meaning to, information from the data you evaluate on (validation or test) makes it into training. The result: a great local score that collapses on the real leaderboard. It's the sneakiest way to lose points, because everything looks fine. A few common examples:

- Scaling or imputation learned on all the rows, before the split. The mean in `StandardScaler` already contains values from validation, so the model has "seen" some of it (Lesson 5).
- The same patient in training and in validation. If they have five visits, three land in training and two in validation, and the model learns to recognize the patient, not the disease. On new patients, the score drops.
- A column computed from the answer. You predict whether a customer will close their account, and one column is the closing date: it only exists for those who left, so it hands the model the answer.

You defend against it by splitting the data correctly. Keep a validation set the model doesn't see during training and use it to estimate the real score.

Better, use k-fold: you split the data into k parts, train on k-1 and test on one, rotating, then average. Each part is called a fold. With k = 5 and 100 rows, each fold has 20. In the first round you train on folds 2, 3, 4 and 5 (80 rows) and measure on fold 1. In the second you train on 1, 3, 4, 5 and measure on 2, and so on, five times. Every row lands in validation exactly once, and at the end you average the 5 scores.

That way you use all the data and get a more stable estimate. With a single validation set of 20 rows, the score depends a lot on which rows happened to land there, while the average of five scores depends less on luck.

When the classes are imbalanced, use stratified k-fold, which keeps the class proportions in each fold. Otherwise a fold might not contain the rare class at all. With 10 spam emails in 100 rows, the stratified version puts exactly 2 spam in each fold of 20, like `stratify` in Lesson 6. A random split might give, say, 4 spam in one fold and none in another.

When the data has time or groups (the same patient in several rows), the split has to respect them, otherwise the model peeks. That is, during training it sees something it won't have when it predicts for real, like a student who glimpsed the questions before the test. With groups, all the rows of a patient go into the same fold. With data over time, you train on the past and validate on what comes after, the way the model will work in reality. In scikit-learn you have `GroupKFold` for groups (you pass the patient column through the `groups` argument) and `TimeSeriesSplit` for time.

```
from sklearn.model_selection import StratifiedKFold, cross_val_score
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_val_score(model, X, y, cv=cv, scoring="f1_macro")
print(scores.mean(), scores.std())
```

`StratifiedKFold(n_splits=5, ...)` sets up the split into 5 stratified folds. `shuffle=True` shuffles the rows first, so the folds don't follow the order in the file, and `random_state=0` makes the shuffle the same on every run (Lesson 6). Don't shuffle data over time: there, the order matters.

`cross_val_score` runs the 5 rounds for you. It takes the model, all the training data, `X` and `y` (the folds handle validation, you don't split it off yourself), the split from `cv` and the metric from `scoring`, here macro F1. If `model` is a Pipeline (Lesson 6), the scaling is learned again in every round, only on the training folds, so nothing leaks.

It returns an array with 5 scores, one per fold. `mean()` is their average, your estimated score. `std()` is the standard deviation (the σ from standardization, Lesson 5): how much the scores vary from one fold to another. The scores 0.81, 0.79, 0.83, 0.80 and 0.82 have a mean of 0.81 and a deviation of 0.014, so the estimate is stable. The scores 0.60, 0.95, 0.70, 0.88 and 0.92 also average 0.81, but with a deviation of 0.14: there, a difference of 0.01 between two models can be pure luck.

## Bias, variance and the learning curve
Two opposite diseases, which you met in Lesson 1. High bias (underfitting): the model is too simple, it does badly on both training and validation. High variance (overfitting): the model is too complex, it does great on training but badly on validation, because it memorized.

With the trees from Lesson 7: one with a single question might score 0.70 on training and 0.68 on validation, which is bias. One with no depth limit might score 1.00 on training and 0.75 on validation, which is variance.

The learning curve diagnoses them: you plot the training score and the validation score as you add more data. Concretely, you train the model on more and more rows, say 80, 200, 400, 600 and 800, and measure both scores each time. The x axis shows how many training rows you used, the y axis the score, and you get two lines. Usually the training line goes down a little (many examples are harder to memorize), and the validation line goes up (the model has seen more cases).

If both are low and close together, you have bias, you need a more complex model, for example a deeper tree. If there's a big gap between them, you have variance, you need more data or regularization. Regularization is any limit you put on a model so it can't memorize: for trees, `max_depth` is a form of regularization, and for neural networks you'll see it in Lesson 15.

```
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve

sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, scoring="f1_macro",
    train_sizes=[0.1, 0.25, 0.5, 0.75, 1.0],
)
plt.plot(sizes, train_scores.mean(axis=1), label="training")
plt.plot(sizes, val_scores.mean(axis=1), label="validation")
plt.xlabel("training rows")
plt.ylabel("F1 macro")
plt.legend()
plt.show()
```

`learning_curve` does the training runs for you. For each value in `train_sizes` it uses that share of the training rows (10%, 25% and so on) and runs a k-fold with `cv=5`. With 1000 rows, each round has 800 training rows, so the sizes come out as 80, 200, 400, 600 and 800. It returns three things: the sizes, then the training and validation scores, one for each size and each fold. `mean(axis=1)` averages over the folds for each size (Lesson 4).

`label` names each line, and `plt.legend()` shows the names. The two `plt.plot` calls before a single `plt.show()` draw both lines on the same chart, which is exactly what you want here.

## The two final submissions
At ONIA you choose two submissions for each problem, and only those count in the final ranking (Lesson 2).

> [!NOTE]
> The golden rule: at the end, choose your two submissions on purpose. One on your best local score (the validation, for example the k-fold mean), one on your best public leaderboard. If local and public agree, trust it. If they differ a lot, you have a leak or a bad split. Don't leave your final submissions to be whatever you sent last out of reflex.

# @practice
- Plot a learning curve and decide whether the model suffers from bias or variance.
- Find a data leak in a given pipeline and fix it.
- Compute precision, recall and F1 by hand from a given confusion matrix.
