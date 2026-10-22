---
code: S13
duration: ~1 week
---

# @intro
The winner on a tabular problem is often an ensemble, not a single model. An ensemble is a group of models that predict together. The idea is simple: several models together are wrong less often than one alone, as long as they're wrong in different places. This module gives you the two big recipes, bagging and boosting, and the discipline to tune the models' settings without getting lost.

## Why combining works
Three models, A, B and C, decide for each of five emails whether it's spam or normal. Each one gets a single email wrong, but each gets a different one wrong. In a vote, the answer given by at least two of the three models wins.

- Email 1, spam: A says normal, B and C say spam. The vote: spam.
- Email 2, normal: all three say normal.
- Email 3, spam: B says normal, A and C say spam. The vote: spam.
- Email 4, normal: all three say normal.
- Email 5, spam: C says normal, A and B say spam. The vote: spam.

Each model gets 4 emails out of 5 right, an accuracy of 80%. The vote gets all 5 right.

If you have three models that are each wrong in different places, the majority vote is better than any one of them: where one is wrong, the other two correct it. The key is diversity. Three models that make exactly the same mistakes don't help at all when combined: if all three had said normal for email 1, the vote would have been wrong too.

There are two big ways to build diversity: bagging (you train models in parallel on slightly different data and average them) and boosting (you train models one after another, each fixing the mistakes of the one before).

## Bagging and Random Forest
Bagging means you train each model on a random sample (with replacement) of the data, then average the predictions. The sample has as many rows as the training set, drawn at random one at a time: after each draw, the row goes back in, so it can come up again. From the rows [A, B, C, D, E] you might get [B, B, D, A, E]: B shows up twice, C is missing. That way, each model sees different data.

"Average the predictions" means a plain average for numbers: if three trees say 90, 100 and 110, the prediction is 100. For classes, you count the votes, as with the emails, or average the probabilities (Lesson 7).

A single deep tree has high variance (it overfits): change the training data a little and it gives different predictions, because it has also memorized the data's quirks (Lessons 1 and 8). But each tree is wrong in its own way. If a house costs 100 and five trees say 120, 85, 95, 110 and 95, each one is off by 5 to 20, but their average, 101, is off by 1. By averaging many trees trained on different data, the variance drops without the bias going up (bias is the error that comes from assumptions that are too simple).

Random Forest is bagging on trees, with one extra trick: at each split, the tree chooses from a random subset of features (the input columns). At each question like "is age over 30?" (Lesson 7), the tree only looks at a few columns picked at random: out of 16 columns, `RandomForestClassifier` picks 4 by default (the square root of 16). That makes the trees even more different from each other: without the trick, if one column is much better than the rest, every tree would start with it. It's hard to break and an excellent first model on tabular data.

```
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)
rf.fit(X_train, y_train)
```

`n_estimators=400` means 400 trees. `max_depth=None` means no depth limit: each tree learns its sample almost by heart, and the averaging fixes the overfitting. `n_jobs` is how many processor cores work at the same time, and -1 means all of them, so the trees train in parallel, faster. With `random_state=42` (Lesson 6), you get the same forest on every run.

Feature importance tells you how much the model leaned on each column: how much the questions asked about it helped separate the classes, averaged over all the trees. You'll find it in `feature_importances_`, one number per column, in column order, and the numbers add up to 1.

```
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

np.random.seed(0)
students = pd.DataFrame({
    "id": np.arange(200),                     # the row number
    "grade": np.random.randint(1, 11, 200),   # from 1 to 10
})
dice = np.random.randint(1, 7, 200)           # from 1 to 6
passed = (students["grade"] + dice >= 9).astype(int)

rf = RandomForestClassifier(random_state=0).fit(students, passed)
print(rf.feature_importances_.round(2))       # [0.4 0.6]
```

Here the target depends only on the grade and on luck: passed is 1 if the grade plus a dice roll comes to at least 9. The id column is just the row number and says nothing about the target, yet it gets 0.4 of the importance. It has 200 different values, so the trees can always find a threshold on it that splits off a few more rows, even if it's pure chance.

> [!NOTE]
> Feature importance from Random Forest is useful, but don't believe it blindly: it favors features with many distinct values. Use it as a hint, not as truth.

## Boosting: XGBoost and LightGBM
Boosting builds trees one at a time. The first makes a rough prediction, the second learns to correct the first's mistakes, the third the mistakes still left, and so on. Each tree is small, but together they form a strong model. It's often the winner on tabular problems.

Take a house that costs 100 (thousand euros). The first step gives a rough estimate, usually the average price, say 80. The second tree no longer learns the price, but the error that's left: 100 - 80 = 20.

Boosting doesn't add the whole correction, only part of it, and that part is called the learning rate. With a learning rate of 0.1 you add 0.1 · 20 = 2 and get to 82. The third tree learns what's left, 18, and adds 1.8, so 83.8. The fourth learns 16.2 and adds 1.62, so 85.42. Each tree closes a tenth of the remaining gap.

The steps are small because each tree also learns from the noise in the training data (Lesson 1), so its correction is a bit off. With small steps, one tree's mistake counts for little, and the next trees fix it. The price is time: you need more trees.

With too many trees, the last ones learn nothing but noise: the training score keeps going up, but the validation score stalls and then drops (overfitting). Early stopping means that after each new tree you check the validation score, and you stop when it hasn't improved for a few rounds in a row.

The version used in practice is called gradient boosting. XGBoost and LightGBM are the fast, go-to implementations. They usually score better than Random Forest, but they're also easier to push into overfitting, so they need careful tuning. They don't come with scikit-learn: you install them with `pip install xgboost lightgbm` and use them the same way, with `fit` and `predict` (`XGBClassifier`, `LGBMClassifier`). Check the contest rules first: external libraries aren't allowed at every stage.

If you're not allowed to use them, scikit-learn has its own version, `HistGradientBoostingClassifier`, inspired by LightGBM and fast on large data. It has early stopping too.

```
from sklearn.ensemble import HistGradientBoostingClassifier

hgb = HistGradientBoostingClassifier(
    learning_rate=0.1,
    max_iter=1000,            # at most 1000 trees
    early_stopping=True,
    validation_fraction=0.1,
    n_iter_no_change=10,
    random_state=0,
)
hgb.fit(X_train, y_train)
print(hgb.n_iter_)            # how many trees it built before stopping
```

`learning_rate=0.1` is the step from the house example, and `max_iter` is the maximum number of trees (other libraries call it `n_estimators`). With `early_stopping=True`, the model sets aside 10% of X_train for validation (`validation_fraction=0.1`) and stops after 10 trees in a row without progress there (`n_iter_no_change=10`). `random_state=0` picks the same validation slice on every run. After `fit`, `n_iter_` tells you how many trees it built, often far fewer than 1000.

## Tuning the hyperparameters, in order
Hyperparameters are the settings you choose before training (how many trees, how deep), as opposed to the parameters the model learns on its own. You've already seen a few: `n_estimators`, `max_depth`, `learning_rate`. The classic mistake is to tune dozens at once and lose track of what helped. Go in order, one thing at a time, and write down the validation score after each change. The order below is for boosting.

1. Start with a small-to-moderate learning rate (0.05 or 0.1) and a reasonable number of trees (a few hundred).
2. Tune the tree depth first (the complexity of each one): try, say, 3, 5 and 8 levels.
3. Then the number of trees (`n_estimators`), with early stopping on validation: the model stops on its own, and you note how many trees it used.
4. Finally, lower the learning rate and raise the number of trees proportionally, for a bit more score: for example, go from 0.1 with 300 trees to 0.05 with 600.

> [!NOTE]
> A small learning rate plus more trees almost always gives a better score than a large learning rate, but trains slower. It's the classic time-versus-score trade-off.

## Voting and stacking
The simplest ensemble across different models is voting: you have a Random Forest, a boosting model and a logistic regression vote, or you average their probabilities. It works best when the models are of different types, so they're wrong in different ways.

A probability (Lesson 7, `predict_proba`) is a number between 0 and 1: how sure the model is. Voting and averaging can give different answers. For one email, the three models give spam probabilities of 0.9, 0.4 and 0.45. In a vote, each model says spam only if its probability is above 0.5, so there's one vote for spam and two for normal: normal wins. On average, (0.9 + 0.4 + 0.45) / 3 ≈ 0.58, above 0.5, so it's spam: one very sure model outweighs two undecided ones.

```
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression

vote = VotingClassifier(
    estimators=[
        ("rf", RandomForestClassifier(n_estimators=300, random_state=0)),
        ("hgb", HistGradientBoostingClassifier(random_state=0)),
        ("lr", LogisticRegression(max_iter=1000)),
    ],
    voting="soft",   # average of the probabilities
)
vote.fit(X_train, y_train)
pred = vote.predict(X_val)
```

`estimators` is a list of (name, model) pairs, tuples as in Lesson 3, with names you pick. `voting="soft"` averages the probabilities, and `voting="hard"` counts the votes. Soft usually works a little better. `fit` trains all three, and `predict` combines their answers. If logistic regression gives you a ConvergenceWarning, scale the data first (Lesson 5).

Stacking goes further: it trains a final model that learns how to combine the others' predictions. Its features are the predictions of the base models, the ones you're combining (the spam probability from Random Forest, the one from boosting), and its target is the true label. That way it can learn, for example, that boosting is right more often. It can score better than voting, but it also makes data leakage (Lesson 8) easier if you don't use out-of-fold predictions.

Out-of-fold predictions use the k-fold from Lesson 8. You split the training data into 5 parts, train the base models on parts 2, 3, 4 and 5 and predict on part 1, then do the same for each part. That way, every row gets a prediction from models that never saw it in training.

Without this, the base models would predict on the very rows they trained on, and the predictions would come out too good: a Random Forest with deep trees gets almost everything it has seen right. The final model would learn to trust them blindly and would be wrong on the test set, where the predictions are weaker.

```
from sklearn.ensemble import StackingClassifier

stack = StackingClassifier(
    estimators=[
        ("rf", RandomForestClassifier(n_estimators=300, random_state=0)),
        ("hgb", HistGradientBoostingClassifier(random_state=0)),
    ],
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5,   # out-of-fold predictions, with 5 parts
)
stack.fit(X_train, y_train)
pred = stack.predict(X_val)
```

`final_estimator` is the model that learns to combine them, and `cv=5` makes the out-of-fold predictions with 5 parts. At the end, scikit-learn retrains the base models on all of X_train, so they can predict on new data. Start with simple voting, move to stacking only if you have time.

# @practice
- Train a Random Forest and a gradient boosting model (for example HistGradientBoostingClassifier) on the same problem and compare the scores.
- Do a vote across three different models and see if it beats the best single model.
- Tune the learning rate with early stopping and watch the time-versus-score trade-off.
