---
code: S11
duration: ~2 weeks
---

# @intro
This is where the contest is won or lost. A model that looks good on the public leaderboard can be weak on the hidden one, which is what counts at the end. This module is about having justified trust in your score. It's the least flashy part and the one that makes the difference between a top 10 and a mid-table finish.

## Why accuracy lies to you
Accuracy is the share of correct predictions. It sounds reasonable, but on imbalanced classes it's misleading. If 98% of the examples are the no class, a model that always says no gets 98% accuracy and zero value. That's why you need metrics that look at each class separately.

## The confusion matrix: the foundation
The confusion matrix counts the four kinds of outcome for a binary classification. It's the basis every other metric is computed from, so it's worth understanding well.

- TP (true positive): it was positive, you said positive. Correct.
- TN (true negative): it was negative, you said negative. Correct.
- FP (false positive): it was negative, you said positive. A false alarm.
- FN (false negative): it was positive, you said negative. You missed it.

Which one hurts more depends on the problem. For a disease test, a false negative (a sick person sent home) is worse than a false positive. For a spam filter, it's the other way around. The right metric reflects the real cost of each kind of mistake.

## Precision, recall, F1
> [!FORMULA]
> precision = TP / (TP + FP)
> Of all the ones you called positive, how many really were. High precision = few false alarms.

> [!FORMULA]
> recall = TP / (TP + FN)
> Of all the ones that really were positive, how many you caught. High recall = you miss few.

Precision and recall pull in opposite directions. If you say positive only when you're very sure, precision goes up but recall goes down. If you say positive often, it's the reverse. F1 reconciles them into a single number, their harmonic mean, which is small if either of them is small.

> [!FORMULA]
> F1 = 2 · (precision · recall) / (precision + recall)
> The harmonic mean. It punishes imbalance: you can't have a high F1 with a tiny recall.

> [!NOTE]
> With many classes, F1 is aggregated. Macro-F1 averages over classes treating them equally (good when you care about the rare ones). Weighted-F1 accounts for each class's size. Read in the rules which one is scored and optimize exactly that.

## Validation without leaks
Data leakage is when, without meaning to, information from the test set makes it into training. The result: a great local score that collapses on the real leaderboard. It's the sneakiest way to lose points, because everything looks fine.

You defend against it by splitting the data correctly. Keep a validation set the model doesn't see during training and use it to estimate the real score. Better, use k-fold: you split the data into k parts, train on k-1 and test on one, rotating, then average. That way you use all the data and get a more stable estimate.

When the classes are imbalanced, use stratified k-fold, which keeps the class proportions in each fold. Otherwise a fold might not contain the rare class at all. When the data has time or groups (the same patient in several rows), the split has to respect them, otherwise the model peeks.

```
from sklearn.model_selection import StratifiedKFold, cross_val_score
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_val_score(model, X, y, cv=cv, scoring="f1_macro")
print(scores.mean(), scores.std())
```

## Bias, variance and the learning curve
Two opposite diseases. High bias (underfitting): the model is too simple, it does badly on both training and validation. High variance (overfitting): the model is too complex, it does great on training but badly on validation, because it memorized.

The learning curve diagnoses them: you plot the training score and the validation score as you add more data. If both are low and close together, you have bias, you need a stronger model. If there's a big gap between them, you have variance, you need more data or regularization.

## The two final submissions
> [!NOTE]
> The golden rule: at the end, choose your two submissions on purpose. One on your best local score (the validation), one on your best public leaderboard. If local and public agree, trust it. If they differ a lot, you have a leak or a bad split. Don't leave your final submissions to be whatever you sent last out of reflex.

# @takeaways
- Accuracy lies on imbalanced classes; use precision, recall, F1.
- The confusion matrix (TP, TN, FP, FN) is the basis of all metrics.
- Precision and recall fight each other; F1 reconciles them.
- Stratified k-fold estimates the score stably, with no leaks.
- The learning curve tells bias (underfitting) from variance (overfitting).
- Choose your two final submissions: one on local, one on public.

# @pitfalls
- Trust your local validation, not the public leaderboard.
- Use stratified k-fold so every fold contains the rare classes too.
- On imbalanced data report precision, recall and F1, not accuracy.

# @practice
- Plot a learning curve and decide whether the model suffers from bias or variance.
- Find a data leak in a given pipeline and fix it.
- Compute precision, recall and F1 by hand from a given confusion matrix.
