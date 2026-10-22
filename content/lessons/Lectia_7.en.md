---
code: S8
duration: ~3 weeks
---

# @intro
Here you learn the basic tools of supervised learning: linear and logistic regression, Naïve Bayes, decision trees, SVM. Supervised means you have examples with the correct answer (labels) and the model learns from them. Don't stop at how you call them from scikit-learn. Understand what each one optimizes, meaning which error it tries to make as small as possible, and when it fits, because that's what lets you choose well at the contest.

## What training a model means
Start with an example. You want to guess a house's price from its area alone, with the rule price = w · area, where w is a single number: how many thousand euros one square meter costs. You have three houses with known prices: 50 m² for 100 thousand euros, 80 m² for 170 thousand and 100 m² for 200 thousand.

Try w = 1.5. The rule predicts 75, 120 and 150 thousand, so it's off by 25, 50 and 50, 125 thousand in total. With w = 2 it predicts 100, 160 and 200, so it's off by 0, 10 and 0, only 10 thousand in total. The second w is much better.

A model has some parameters (internal numbers, like w above) it adjusts so it's wrong as little as possible on the training examples. The measure of the error is called the cost function, or loss: in the example, the total error of 125 or 10 thousand. Training means finding the parameters that minimize the loss, that is, make it as small as possible. The model does the searching: some models compute their parameters directly, others improve them step by step, like you did going from 1.5 to 2. How the steps are chosen comes in Lesson 14.

In scikit-learn the pattern is always the same: you create the model, train it with `fit` on the training data, then predict with `predict` on new data, like with `Mean` in Lesson 3. Simple on the surface, but under the hood each model does something different.

```
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)     # learn the parameters
y_pred = model.predict(X_val)   # predict on new data
```

`LogisticRegression` is one of the models in this lesson; you'll meet it below. `X_train` is the table with the features, meaning the input columns, for the training rows. `y_train` is the target: the answers for the same rows, in the same order. `X_val` holds the validation rows (Lesson 5), with their answers kept apart in `y_val`. `y_pred` ("y predicted") holds the predictions for `X_val`, which you then compare with `y_val`.

X has a capital letter because it's a table with several columns, and y a lowercase one because it's a single column. It's only a convention: in Lesson 6 you saw them shortened, `X_tr` and `y_tr`.

## Linear regression: predicting a number
Linear regression predicts a continuous value (a price, a temperature) as a linear combination of the features. Continuous means it can come out as any number, decimals included. A linear combination means you multiply each feature by its own number, add up the results and add one more fixed number.

For example, price = 1500 · area + 20000 · rooms + 10000, in euros. A 60 m² house with 2 rooms comes out at 1500 · 60 + 20000 · 2 + 10000 = 90000 + 40000 + 10000 = 140000 euros.

The regression looks for the line (or the plane, in more dimensions) that passes best through the data. With a single feature it's a straight line, like the graph of f(x) = ax + b from math class. Each house is a point (area, price), and the model looks for the line that passes as close as possible to all the points. With two features the points sit in space and the line becomes a plane, like a sheet of paper held at a tilt. With more you can't draw it anymore, but the math is the same.

> [!FORMULA]
> ŷ = w₁x₁ + w₂x₂ + ... + b
> ŷ (read "y hat") is the prediction, and plain y is the true answer. x₁, x₂ are the features, here the area and the rooms. Each feature x has a weight w that says how much it counts, here 1500 and 20000. b is the intercept, the number that always gets added, like the b in f(x) = ax + b, here 10000. The model learns the w's and b.

It minimizes the squared error: the sum of the squared differences between prediction and truth. For the three houses from the start, with w = 1.5, the differences 25, 50 and 50, squared, give 625 + 2500 + 2500 = 5625. With w = 2, the differences 0, 10 and 0 give 0 + 100 + 0 = 100. The square punishes big mistakes harder: 50 is 5 times more than 10, but 2500 is 25 times more than 100.

```
import numpy as np
from sklearn.linear_model import LinearRegression

# 4 houses: area (m²) and number of rooms
X = np.array([[50, 1], [60, 2], [80, 3], [100, 3]])
y = np.array([105000, 140000, 190000, 220000])   # prices, in euros

model = LinearRegression().fit(X, y)
print(model.coef_)                # [ 1500. 20000.]
print(round(model.intercept_))    # 10000
print(model.predict([[70, 2]]))   # [155000.]
```

The prices in `y` are computed with the exact rule above, and `fit` finds it on its own. `coef_` holds the weights, in column order, and `intercept_` is the intercept. In scikit-learn, names ending in `_` are things learned during `fit`. `round` only cleans up a 9999.99999 left over from the computation. `[[70, 2]]` has two pairs of brackets because `predict` takes a table, here with a single row. On real data the points don't sit perfectly on a plane and the weights come out approximate.

A big advantage of linear regression: you can read the coefficients, which are just the weights w. The weight of 20000 on rooms means that, for the same area, each extra room adds 20000 euros. A large positive w means that feature pushes the prediction up, and a negative one pulls it down.

Be careful when you compare weights with each other. Area gets only 1500 against 20000, but that doesn't mean it matters less: a square meter is a small unit, a room is a big one. Weights only compare fairly when the features are on the same scale, for example after the standardization from Lesson 5.

## Logistic regression: predicting a class
Despite the name, logistic regression is for classification, not regression. Take a spam filter: each email is either spam (label 1) or normal (label 0). The class you're looking for, spam here, is called the positive class.

The model first computes a score z, with the same linear combination as linear regression. The score can come out as any number, -7 or 12, so it isn't a probability. Logistic regression passes it through a sigmoid, which squeezes any number into the 0 to 1 range. The result is a probability: how sure the model is that the example is in the positive class. For example, 0.9 means a 90% chance of spam.

> [!FORMULA]
> σ(z) = 1 / (1 + e^(-z))
> The sigmoid: it turns the linear score z into a probability between 0 and 1. e is a fixed number, about 2.718, like π, and e^(-z) means e to the power -z.

σ(0) = 1 / (1 + e^0) = 1 / (1 + 1) = 0.5, so the model is undecided. σ(2) = 1 / (1 + e^(-2)) ≈ 1 / (1 + 0.135) ≈ 0.88, because e^(-2) = 1 / e² ≈ 0.135. Likewise, σ(-2) ≈ 0.12. The higher the score, the closer the probability gets to 1, and the more negative it is, the closer it gets to 0.

From the probability you make the decision with a threshold. With a threshold of 0.5, an email with probability 0.88 is marked as spam, and one with 0.12 stays normal. The threshold isn't necessarily 0.5. If you care more about catching all the positive cases (high recall), you lower it. If you want to be sure when you say positive (high precision), you raise it. The threshold is a knob you tune to the problem's metric.

Recall is the share of the real spam you catch, and precision is the share of emails marked as spam that really are spam. With a threshold of 0.3, an email at 0.4 also goes to spam. You catch more spam, so recall goes up, but a few normal emails end up there too, so precision goes down. You'll compute both exactly in Lesson 8.

```
m = LogisticRegression(max_iter=1000).fit(X_train, y_train)
proba = m.predict_proba(X_val)[:, 1]   # probability of the positive class
pred = (proba > 0.3).astype(int)       # threshold 0.3, for higher recall
```

`fit` returns the model itself, which is why you can write `.fit(...)` right after creating it, like `Mean().fit(...)` in Lesson 3. Logistic regression searches for its parameters step by step, and `max_iter` is the maximum number of steps. The default is 100, sometimes too few: then you get a `ConvergenceWarning`, meaning the model didn't finish searching. `max_iter=1000` gives it ten times as many. If the warning still shows up with 1000, scale the features (Lesson 5).

`predict_proba(X_val)` gives a table with one row per email and two columns: the probability of class 0 and of class 1, which add up to 1 (for example 0.19 and 0.81). `[:, 1]` takes all rows, column 1, like `x[:, 0]` in Lesson 4, so you get the spam probability. `proba > 0.3` gives `True` or `False` for each row, and `.astype(int)` turns `True` into 1 and `False` into 0, which are labels.

## Naïve Bayes: fast and surprisingly good
Stay with the spam filter. In the training emails you count how often each word shows up in spam and how often in normal emails. Say "free" appears in 40% of spam emails and in 5% of normal ones, while "invoice" appears in 10% of spam and in 20% of normal emails.

A new email arrives with "free" and "invoice". The model multiplies the evidence from the words, separately for each class: for spam 0.40 · 0.10 = 0.04, for normal 0.05 · 0.20 = 0.01. The spam score is 4 times bigger, so the email has a probability of 0.04 / (0.04 + 0.01) = 0.8 of being spam.

Here we assumed half the emails are spam. If spam is rarer, you also multiply each score by how common its class is. With 20% spam and 80% normal emails, the scores become 0.2 · 0.04 = 0.008 and 0.8 · 0.01 = 0.008, and the email drops to 50%. This rule, which puts together how common a class is and the evidence from the words, is Bayes' theorem.

Naïve Bayes applies Bayes' theorem while assuming, naively, that the features are independent of each other. That is, it treats each word as if it had nothing to do with the others, which is why it can simply multiply the evidence. In reality, "won" often shows up next to "prize", and the model counts the same evidence twice.

The assumption is almost always false, but the model often works very well, especially on text. It's fast, needs little data, and is a baseline (the reference you start from, Lesson 6) that's hard to beat at document classification.

In scikit-learn, the version for word counts is `MultinomialNB`: each email becomes a row of numbers saying how many times each word appears in it. How to get these numbers from text automatically comes in Lesson 12.

```
from sklearn.naive_bayes import MultinomialNB

# columns: how many times free, prize, invoice appear
X = [[2, 1, 0], [3, 2, 0], [1, 1, 0], [0, 0, 2], [0, 1, 1], [0, 0, 3]]
y = [1, 1, 1, 0, 0, 0]   # 1 = spam, 0 = normal

nb = MultinomialNB().fit(X, y)
print(nb.predict([[1, 0, 0], [0, 0, 1]]))   # [1 0]
```
caption: An email with "free" once comes out as spam, one with "invoice" once comes out as normal.

## Decision trees
A decision tree asks simple questions, one after another, like a game of 20 questions: is the age over 30? is the income below a value? At each step it splits the data to separate the classes as well as possible.

Each question sits in a node. The answer, yes or no, sends the row down one of two branches, to the next node. Where there are no more questions there's a leaf, which gives the prediction: the most common class among the training rows that ended up there.

The measure of the separation is Gini impurity or entropy: how mixed the classes are in a node. Gini is 1 minus the sum of the squared shares of each class. A node with 5 spam and 5 normal emails is as mixed as it gets: 1 - 0.5² - 0.5² = 0.5. One with 10 spam and no normal ones is pure: 1 - 1² - 0² = 0. One with 8 spam and 2 normal is in between: 1 - 0.8² - 0.2² = 1 - 0.64 - 0.04 = 0.32.

At each node the tree tries many questions and picks the one that leaves the nodes below it as pure as possible. Say you start from 5 spam and 5 normal emails (Gini 0.5). The question "does it contain 'free'?" might send 4 spam and 1 normal to yes, and 1 spam and 4 normal to no. Both new nodes have Gini 0.32, so the mix went down from 0.5 to 0.32.

Entropy measures the same mix with a different formula: also 0 for a pure node and highest at half and half. It gives very similar trees, and scikit-learn uses Gini unless you ask for something else.

Trees are easy to read and don't need scaling. Each question compares a single column with a threshold, for example "area over 70 m²?". With the area in square centimeters the threshold would be 700000, and the rows would split exactly the same way.

Their problem: left to grow without limit, they memorize the training set down to the last example and generalize badly, meaning they get new data wrong. A tree with no limit keeps asking questions until every leaf is pure, sometimes with a single row. That's called overfitting (Lesson 1). You limit it by setting a maximum depth (how many questions can come one after another) or a minimum number of examples per leaf.

```
from sklearn.tree import DecisionTreeClassifier

tree = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5)
tree.fit(X_train, y_train)
print(tree.score(X_train, y_train))   # accuracy on training
print(tree.score(X_val, y_val))       # accuracy on validation
```

`max_depth=4` allows at most 4 questions along any path, and `min_samples_leaf=5` requires at least 5 training rows in every leaf. `score` predicts on the table you give it and returns the accuracy against the answers. Settings like these aren't learned from the data, you pick them before `fit`. They're called hyperparameters, so you don't mix them up with the parameters the model learns.

> [!NOTE]
> A tree that's perfect on training and weak on validation has memorized, not learned. The classic sign of overfitting. Cut its depth.

## SVM: the widest margin
Take two features of an email, say how many links it has and how many words in capitals. Each email becomes a point in the plane, and the spam and normal emails form two groups. Usually many straight lines can separate them, and you have to pick one.

An SVM (support vector machine) looks for the boundary between classes that leaves the widest margin on either side, meaning it's as far as possible from the nearest examples of each class. The idea is that a wide-margin boundary generalizes better.

Think of the boundary as the center line of a road. The SVM looks for the widest road that fits between the two groups with no point on it, and the margin is the width of the road. The points on the edges of the road are called support vectors: they "support" the road, and each point is a row of numbers, that is, a vector. Only they decide where the road goes. A new email that lands a little toward the other group still stays on the right side of a wide road, while a narrow road could leave it on the wrong side.

When the data can't be separated with a straight line, the kernel trick steps in: it projects the data into a higher-dimensional space, where it becomes separable, without computing that space explicitly.

The simplest example is on a single axis. Class A has the points -1, 0 and 1, in the middle, and class B has the points -3, -2, 2 and 3, on both sides. No single cut separates them, because B is both to the left and to the right of A. Give each point a second coordinate, x². A becomes (-1, 1), (0, 0) and (1, 1), and B becomes (-3, 9), (-2, 4), (2, 4) and (3, 9). Now the horizontal line y = 2.5 separates them: A has y at most 1, B at least 4.

Adding x² is exactly the projection into a space with more dimensions. The trick is that the SVM doesn't need the new coordinates, only how similar two points are. The kernel is a formula that gives that similarity directly, without building the new coordinates.

The RBF kernel is the most used. It measures similarity by distance: nearby points have a similarity close to 1, distant points close to 0. With it, the boundary can bend around groups of points.

SVM needs scaled data to work well, because the margin and the similarity are computed from distances. With income in thousands and age in tens, the distance would depend almost only on income, exactly the problem scaling solves in Lesson 5.

```
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

svm = Pipeline([
    ("sc", StandardScaler()),
    ("svm", SVC(kernel="rbf", C=1.0)),
])
svm.fit(X_train, y_train)
pred = svm.predict(X_val)
```

The Pipeline from Lesson 6 ties the scaling to the model, so `StandardScaler` learns the mean and the deviation only on the training data. `SVC` is scikit-learn's SVM for classification, and `kernel="rbf"` and `C=1.0` are exactly the defaults.

In real data the groups overlap a little, so some points end up on the road or on the wrong side. `C` says how hard the model punishes them. A small `C` accepts a few mistakes to keep the road wide. A large `C` wants no training example wrong, even with a narrow road, and risks overfitting. Try 0.1, 1 and 10 and compare them on validation.

# @practice
- Compare logistic regression, a tree and an SVM on the same tabular problem, with the same metric.
- Move the logistic regression threshold down from 0.5 and watch recall rise and precision fall (measure them with recall_score and precision_score from sklearn.metrics).
- Limit a tree's depth and see the training score come closer to the validation one.
