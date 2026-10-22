---
code: S5
duration: ~1 week
---

# @intro
So far you've learned pieces: Python, NumPy, Pandas, EDA and preprocessing. This module ties them together. It brings no new theory, only the order in which things get done. That matters, because most olympiad mistakes don't come from the model, they come from steps taken in the wrong order. The chain of steps that takes you from the files you're given to the submission file is called a pipeline. A pipeline you can run end to end in twenty minutes is the most valuable tool you bring into a contest.

## The six steps, in order
Every tabular contest problem, with the data in a table like a CSV file, looks the same from above. You read the data. You split it. You build a baseline, meaning a reference model that's as simple as it gets. You preprocess. You train and validate. You write the submission.

The order isn't a suggestion. Each step assumes the previous one was done correctly, and two of them are easy to swap when you're rushing: splitting and preprocessing. Swap those and the preprocessing also learns from the validation rows, which is the data leakage from Lesson 5. Your local score becomes a lie, which you only discover on the private leaderboard.

- Read the data and look at what you got.
- Split into training and validation.
- Build a dumb baseline, so you have a reference point.
- Preprocess, with parameters learned only on training data.
- Train a model and compare it against the baseline.
- Write the submission file and check it before uploading.

## Step 1: read and look
The first thing after reading is checking that the data looks the way you think it does. How many rows, which columns, what type each one is, what the target looks like. This isn't full analysis, that's what Lesson 5, on EDA, is for. It's just confirming you didn't read the file wrong.

```
import pandas as pd

train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")

print(train.shape, test.shape)
print(train.dtypes)
print(train["target"].value_counts())
```

`train.shape` gives you the number of rows and columns, for example `(1000, 6)`. `train.dtypes` shows each column's type, and text columns show up as `object` or `str`, depending on your pandas version. `value_counts()` counts how many rows each class of the target has.

Compare the train columns against the test ones. The difference between them is, almost always, the target column itself. If anything else is missing, that's something to understand before moving on. The quickest way to see it is the set difference from Lesson 3: `set(train.columns) - set(test.columns)` gives you the columns that are in train but missing from test.

## Step 2: split before you touch anything
This is where most points are lost. You need a slice of the data the model has never seen, so you can honestly estimate how good it is. The split happens before any transformation. This is where the `X_train` and `X_val` from Lesson 5 come from.

```
from sklearn.model_selection import train_test_split

# the id is just a row number, not information about the row
X = train.drop(columns=["id", "target"])
y = train["target"]

X_tr, X_val, y_tr, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

`X` gets every column except `id` and the target, meaning the features, the input columns. `y` gets the target. `train_test_split` shuffles the rows, splits them in two and returns four pieces: the features and target for training (`X_tr` and `y_tr`, short for `X_train` and `y_train`), then the same for validation (`X_val` and `y_val`). `test_size=0.2` sends 20% of the rows to validation, and the other 80% stay for training.

The `stratify` argument keeps the same class proportions in both halves. Without it, on an imbalanced problem you can land a validation set that contains none of the rare class at all, and the score becomes meaningless.

Say that out of 1000 rows, 100 belong to the rare class, which is 10%. With `stratify=y`, validation gets 200 rows with exactly 20 rare ones, and training gets 800 with 80 rare ones: 10% in both. Without `stratify`, the number of rare rows in validation changes from one split to the next, for example 12 or 26.

> [!NOTE]
> A fixed `random_state` means the same split repeats on every run. Without it your score shifts between runs and you can no longer tell whether a change helped or you got lucky. It's the same idea as the seed from Lesson 3, and there's nothing special about 42: it just has to stay the same.

## Step 3: the dumb but honest baseline
Before any serious model, build a stupid one. Always predict the majority class, the one with the most rows, or the mean of the target if you're predicting a number, and measure. That number is your floor: any model that doesn't beat it is worse than nothing.

```
from sklearn.dummy import DummyClassifier
from sklearn.metrics import f1_score

dummy = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
print(f1_score(y_val, dummy.predict(X_val), average="macro"))
```

`DummyClassifier(strategy="most_frequent")` is a model that doesn't even look at the features. During `fit` it only remembers the most frequent class in `y_tr`, and `predict` gives that class for every row. `f1_score` takes the correct answers first, then the predictions.

F1 is a score between 0 and 1, where higher is better. Unlike accuracy, it isn't fooled by a rare class. `average="macro"` computes F1 separately for each class and takes their average, so the rare class counts as much as the big one. Lesson 8 explains it in detail. With 90% of the rows in one class and 10% in the other, this baseline gets 90% accuracy but a macro F1 of only 0.47: about 0.95 on the big class and 0 on the rare one.

It looks like a waste of time. It isn't. Often a complicated model produces a score that seems reasonable, until you compare it to the baseline and find it's the same or worse. Without the reference point, you'd never have known.

## Step 4: preprocessing that can't leak
The preprocessing rule from Lesson 5: parameters (mean, deviation, categories) are learned only on the training data. The problem is that, done by hand, this rule is easy to break.

The fix is Pipeline. You bind preprocessing to the model in a single object, and when you call `fit` on it, scikit-learn makes sure the transformations only learn from what you hand it for training.

Think of an assembly line: every row goes through the same steps, in the same order. During `fit`, each step learns from the training data, transforms it and hands it to the next step, and at the end the model trains on whatever it receives. During `predict`, new rows go through the same steps with `transform` only, using the numbers learned in training.

```
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

numeric = X_tr.select_dtypes(include="number").columns
categorical = X_tr.select_dtypes(exclude="number").columns

pre = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("sc", StandardScaler()),
    ]), numeric),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(handle_unknown="ignore")),
    ]), categorical),
])

model = Pipeline([
    ("pre", pre),
    ("clf", RandomForestClassifier(random_state=42)),
])
```

`select_dtypes(include="number")` picks the columns with numbers, and `exclude="number"` picks all the others, meaning the text ones. `.columns` keeps only their names.

`ColumnTransformer` sends each group of columns down its own line. It takes a list of tuples with three items each: a name you choose, the steps and the columns. The numeric columns fill their gaps with the median, then get standardized. The text ones fill their gaps with the most frequent value, then go through one-hot. A `Pipeline` takes (name, step) pairs, in the order they run. `OneHotEncoder` does the same one-hot as `pd.get_dummies` from Lesson 5, but it remembers the categories it saw during `fit`.

`RandomForestClassifier` is the model at the end of the line, and `clf` is the usual short name for classifier. It's a model made of many decision trees that vote, explained in Lessons 7 and 9. Here all that matters is that it has `fit` and `predict`, like every scikit-learn model. `random_state=42` makes the result repeatable, as in the split.

The `handle_unknown` argument matters in a contest: if a category shows up in test that wasn't in training, without it your code crashes at prediction time, exactly when you have no time to debug. Say training only has Cluj and Iasi, and Brasov shows up in test. Without the argument you get `ValueError: Found unknown categories`. With `handle_unknown="ignore"`, Brasov gets 0 in all the city columns and the prediction carries on.

## Step 5: train and compare
Now you have one object that does everything. You fit it on the training slice and measure it on validation, using the same metric the contest uses.

```
model.fit(X_tr, y_tr)
score = f1_score(y_val, model.predict(X_val), average="macro")
print(f"model: {score:.4f}")
```

The metric has to be the one from the problem statement. If the contest scores macro F1 and you optimize accuracy, you climb on your own score and fall on theirs.

> [!NOTE]
> Change one thing between runs and write down the score every time. A table with ten rows, even on paper, is worth more than ten ideas tried at once where you can't tell which one helped.

## Step 6: the submission and the checks
At the end you retrain on all the training data, not just the eighty percent slice. You used validation to choose; now there's no reason to throw those examples away. With more examples, the model usually learns a bit better. `model.fit(X, y)` reruns the whole line from scratch on every row: the medians and the model are all learned again.

```
model.fit(X, y)
pred = model.predict(test.drop(columns=["id"]))

sub = pd.DataFrame({"id": test["id"], "target": pred})
sub.to_csv("submission.csv", index=False)
```

`test.drop(columns=["id"])` leaves test with exactly the columns in `X`. `index=False`, as in Lesson 4, keeps the row numbers out of the file, where they'd show up as an extra column.

Before uploading, three checks that have saved many contests: the row count matches the test file, the column names are exactly what the statement asks for, and there are no missing values in the predictions.

```
assert len(sub) == len(test)
assert list(sub.columns) == ["id", "target"]
assert sub["target"].isna().sum() == 0
```

`assert` (Lesson 3) stops the program with an error if a condition is false. If the cell runs without any message, all three checks passed.

Safer still is to start from the sample file in the statement: you read it, check that the rows are in the same order as in test, change only the target column and save it. That way the column names and their order are exactly what's asked for.

```
sub = pd.read_csv("sample_submission.csv")
assert (sub["id"] == test["id"]).all()
sub["target"] = pred
sub.to_csv("submission.csv", index=False)
```

`sub["id"] == test["id"]` compares the two columns row by row, and `.all()` gives `True` only if every pair is equal.

If the metric is AUC or log loss, you submit probabilities, not classes: `model.predict_proba(...)[:, 1]` gives you the probability of the positive class.

Both of them score how good your probabilities are. AUC measures how well they rank the rows: 1 means every row from the positive class got a higher probability than every other row, and 0.5 is what you'd get by flipping a coin. Log loss punishes probabilities that are confident and wrong. If you say 0.99 for class 1 on a row that's actually class 0, you lose about five times more than if you'd said 0.6. For log loss, lower is better.

`predict_proba` returns a table with one column per class, and on each row the probabilities add up to 1. `[:, 1]` takes every row from column 1, like NumPy in Lesson 4. The positive class is the one labeled 1, usually the one you're looking for, like fraud or spam.

## What this looks like on contest day
You spend the first hour on the pipeline above, with a simple model. You already have a valid submission and a score on the leaderboard. From there you improve, with the safety net that whatever happens, something is submitted.

The reverse order goes like this: you spend two hours on a good model and only then start on the submission. It's the most common way to finish a contest with zero points for code that almost worked.

At ONIA you also submit the code that produced the file, and the platform runs it without internet access. Before every submission, run Restart Kernel and Run All Cells, to make sure the notebook works from scratch, and read the data with relative paths.

A relative path starts from the folder the notebook is in, like `data/train.csv` or just `train.csv`. An absolute one starts from the root of the disk, like `C:/Users/Ana/Desktop/train.csv`, and doesn't exist on another computer. If the data sits next to the notebook, a relative path finds it wherever the folder gets moved.

Near the end you pick the two submissions that count: usually the best one on local validation and a safer one, with a simpler model.

# @practice
- Take an archive problem from MLCompete and write the pipeline end to end in an hour, with a simple model.
- Run the same pipeline once with scaling before the split and once after, and compare the validation scores.
- Write yourself a template notebook with the six steps, to copy at the start of any problem.
- [House Prices on Kaggle](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques)
- [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning)
