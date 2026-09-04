---
code: S13
duration: ~1 week
---

# @intro
The winner on a tabular problem is often an ensemble, not a single model. The idea is simple and powerful: several models together are wrong less often than one alone, as long as they're wrong in different places. This module gives you the two big recipes, bagging and boosting, and the discipline to tune the parameters without getting lost.

## Why combining works
If you have three models that are each wrong in different places, the majority vote is better than any one of them: where one is wrong, the other two correct it. The key is diversity. Three models that make exactly the same mistakes don't help at all when combined.

There are two big ways to build diversity: bagging (you train models in parallel on slightly different data and average them) and boosting (you train models one after another, each fixing the mistakes of the one before).

## Bagging and Random Forest
Bagging means you train each model on a random sample (with replacement) of the data, then average the predictions. A single deep tree has high variance (it overfits). By averaging many trees trained on different data, the variance drops without the bias going up.

Random Forest is bagging on trees, with one extra trick: at each split, the tree chooses from a random subset of features. That makes the trees even more different from each other. It's robust, hard to break, and an excellent first model on tabular data.

```
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)
rf.fit(X_train, y_train)
```

> [!NOTE]
> Feature importance from Random Forest is useful, but don't believe it blindly: it favors features with many distinct values. Use it as a hint, not as truth.

## Boosting: XGBoost and LightGBM
Boosting builds trees one at a time. The first makes a rough prediction, the second learns to correct the first's mistakes, the third the mistakes still left, and so on. Each tree is small, but together they form a strong model. It's often the winner on tabular problems.

XGBoost and LightGBM are the fast, go-to implementations. They're more powerful than Random Forest, but also easier to push into overfitting, so they need careful tuning. Check the contest rules first: external libraries aren't allowed at every stage.

## Tuning the hyperparameters, in order
Hyperparameters are the settings you choose before training (how many trees, how deep), as opposed to the parameters the model learns on its own. The classic mistake is to tune dozens at once and lose track of what helped. Go in order, one thing at a time.

1. Start with a small-to-moderate learning rate and a reasonable number of trees.
2. Tune the tree depth first (the complexity of each one).
3. Then the number of trees (n_estimators), with early stopping on validation.
4. Finally, lower the learning rate and raise the number of trees proportionally, for a bit more score.

> [!NOTE]
> A small learning rate plus more trees almost always gives a better score than a large learning rate, but trains slower. It's the classic time-versus-score trade-off.

## Voting and stacking
The simplest ensemble across different models is voting: you have a Random Forest, a boosting model and a logistic regression vote, or you average their probabilities. It works best when the models are of different types, so they're wrong in different ways.

Stacking goes further: it trains a final model that learns how to combine the others' predictions. It's stronger, but also easier to leak into if you don't use out-of-fold predictions. Start with simple voting, move to stacking only if you have time.

# @takeaways
- Ensembles work when the models are wrong in different ways; diversity is the key.
- Bagging (Random Forest) cuts variance by averaging trees trained on different data.
- Boosting (XGBoost, LightGBM) builds trees that fix each other's mistakes in turn.
- Tune hyperparameters in order: depth, then number of trees, then learning rate.
- Voting across different models often beats the best single model.

# @pitfalls
- Tune one hyperparameter at a time and write down the score every time.
- Take feature importance as a hint about where to look, not as final truth.
- Check the stage's rules before using external boosting libraries.

# @practice
- Train a Random Forest and a gradient boosting model on the same problem and compare the scores.
- Do a vote across three different models and see if it beats the best single model.
- Tune the learning rate with early stopping and watch the time-versus-score trade-off.
