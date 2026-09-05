---
code: S4
duration: ~2 weeks
---

# @intro
NumPy is Python's library for numeric computing: it works with arrays of numbers and runs operations much faster than an ordinary loop. Pandas is built on top of NumPy and adds labels: named columns, an index on rows, tables like in a spreadsheet. You'll use both on almost every contest problem, whatever the model.

## Install
Neither comes with Python. You install them once, in the project's virtual environment.

```
pip install numpy
pip install pandas
```
caption: Run these in a terminal, in the project folder.

## Why plain Python isn't enough
In ordinary Python, a list of a million numbers you want to add up element by element is done with a for loop. It works, but it's slow, because Python checks the type of every element at every step. With real data, that becomes unbearable.

NumPy solves it with a new structure: the ndarray, a grid of numbers of the same type, with a fixed shape. Operations apply to the whole array at once, in fast compiled code, with no Python loop. The idea is called vectorization and it's tens of times faster.

```
import numpy as np

# slow, in pure Python
total = 0
for x in range(1_000_000):
    total += x * x

# fast, vectorized
v = np.arange(1_000_000)
total = (v * v).sum()
```
caption: The same sum, but the second version is much faster.

## Creating and reshaping arrays
`np.array()` turns a Python list into an ndarray. `np.zeros(n)` and `np.ones(n)` make an array filled with 0 or 1, handy as an empty slot to fill in. `np.arange(start, stop, step)` works like `range`, but returns an array. `np.linspace(start, stop, n)` splits an interval into n evenly spaced values, useful for plots.

```
a = np.array([1, 2, 3])
zeros = np.zeros(5)          # [0. 0. 0. 0. 0.]
ones = np.ones((2, 3))       # 2x3 matrix filled with 1
steps = np.arange(0, 10, 2)  # [0 2 4 6 8]
line = np.linspace(0, 1, 5)  # [0. 0.25 0.5 0.75 1.]
```

Every array has a single `dtype`, the type of all its elements (`int64`, `float64`, etc). Mixing an int and a float in the same array converts everything to float.

```
a.dtype              # dtype('int64')
np.array([1, 2.5]).dtype   # dtype('float64')
```

`reshape` changes an array's shape without changing its content, as long as the total number of elements stays the same. `flatten()` does the opposite, brings it back to one dimension.

```
v = np.arange(6)
m = v.reshape(2, 3)    # [[0 1 2], [3 4 5]]
m.flatten()             # back to [0 1 2 3 4 5]
```

> [!NOTE]
> A slice of an array (`v[1:4]`) is a view, not a copy: changing it changes the original too. If you want an independent copy, ask for it explicitly with `.copy()`.

```
v = np.array([1, 2, 3, 4])
piece = v[1:3]
piece[0] = 99
print(v)              # [1, 99, 3, 4], the original changed too

copy = v[1:3].copy()
copy[0] = -1
print(v)              # unchanged this time
```

## ndarray: shape, axes, indexing
An ndarray has a shape: how many rows, how many columns, how many dimensions. A grayscale image is a 2D matrix, a color one is 3D (height, width, channels). Your first move on any bug is to print the shape and check it's what you thought.

The axes are the directions you operate along. axis=0 goes down the rows (vertically, you get one value per column), axis=1 goes across the columns (horizontally). Mixing up the axes is one of the most common beginner mistakes.

```
x = np.array([[1, 2, 3],
              [4, 5, 6]])

x.shape          # (2, 3): 2 rows, 3 columns
x.mean(axis=0)   # mean of each column -> [2.5, 3.5, 4.5]
x.mean(axis=1)   # mean of each row    -> [2.0, 5.0]
```

On an array with several dimensions, indexing and slicing are written with a comma between dimensions, instead of separate brackets.

```
x[0, 1]      # 2, row 0, column 1
x[:, 0]      # [1, 4], every row, column 0
x[0, :]      # [1, 2, 3], all of row 0
```

Indexing with a boolean mask is a tool you use daily: you build a vector of True/False and select only the elements where it's True. That's how you filter data with no loop.

```
x[x > 3]         # only the elements greater than 3 -> [4, 5, 6]
x[x > 3] = 0     # and you can change them in place too
```

## Broadcasting: how NumPy matches different shapes
Broadcasting is the rule by which NumPy does operations between arrays of different shapes, automatically stretching the smaller one to fit. Half the beginner errors come from shapes that don't match the way you thought.

The rule: NumPy compares shapes from right to left. Two dimensions match if they're equal or if one of them is 1 (that one stretches). A scalar matches anything.

```
X = np.array([[1, 2, 3],
              [4, 5, 6]])      # shape (2, 3)
means = X.mean(axis=0)         # shape (3,): [2.5, 3.5, 4.5]
X_centered = X - means         # (2,3) - (3,) matches, subtracts per column
```
caption: Centering a matrix on its means, with no loop at all.

> [!NOTE]
> When an operation throws a shape error, print the shapes of the two operands and apply the right-to-left rule. Nine times out of ten you see straight away where they don't match.

## Sorting, searching and set operations in NumPy
`np.sort()` sorts an array without changing it in place. `np.argsort()` returns the indices that would sort the array, useful when you want to sort one array by another's values.

```
v = np.array([3, 1, 2])
np.sort(v)          # [1, 2, 3]
np.argsort(v)       # [1, 2, 0], the indices in ascending order
```

`np.where(condition, then, else)` picks between two values element by element, more flexible than a plain mask. `argmax`/`argmin` give the position of the largest, or smallest, element.

```
np.where(v > 1, v, 0)   # [3, 0, 2], keeps what's above 1, the rest becomes 0
v.argmax()               # 0, the position of 3
```

`np.unique()` returns the distinct values in an array, sorted. `np.concatenate()` joins several arrays into one.

```
np.unique([1, 2, 2, 3, 1])      # [1, 2, 3]
np.concatenate([[1, 2], [3, 4]]) # [1, 2, 3, 4]
```

## Pandas: data with labels
Real data has names: an age column, a score column, a class column. Pandas adds labels on top of NumPy, in two structures: Series (a single column, with an index) and DataFrame (a whole table, several columns). It's the structure most contest datasets arrive in.

```
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s["b"])     # 20

df = pd.DataFrame({"name": ["Ana", "Bogdan"], "score": [9.2, 8.7]})
```

A DataFrame is basically a dictionary of Series, one per column. You read a CSV file in one line, then look at it before anything: the first rows, the column types, how many values are missing.

```
import pandas as pd

df = pd.read_csv("data.csv")

df.head()        # first 5 rows
df.info()        # types and non-null counts
df.describe()    # stats on the numeric columns
```

## Selection: loc vs iloc
There are two ways to select from a DataFrame, and mixing them is a classic mistake. loc selects by label (the column name, the index value). iloc selects by position (which row, which column, counting from 0).

```
df.loc[10, "score"]        # value at index 10, column "score"
df.iloc[0, 2]              # row 0, column 2, by position
df.loc[df["score"] > 8]    # all rows with score above 8
```

## Missing values and cleanup
Real data almost always has gaps, duplicate rows or wrong types, and a model trained on dirty data makes bad predictions. `isna()` flags where a value is missing, `dropna()` removes rows with gaps, `fillna(value)` fills them in.

```
df.isna().sum()          # how many values are missing per column
df.dropna()               # removes rows with any gap
df["score"].fillna(df["score"].mean())   # fills gaps with the mean
```

> [!NOTE]
> Choose between `dropna` and `fillna` based on how many rows you have and what the gap means: if few values are missing, you can drop them; if many are missing, dropping throws away too much good data with them.

`duplicated()` flags rows identical to an earlier one, `drop_duplicates()` removes them. `astype()` changes a column's type, for example from text to a number.

```
df.duplicated().sum()          # how many rows are duplicates
df = df.drop_duplicates()

df["score"] = df["score"].astype(float)
df["date"] = pd.to_datetime(df["date"])   # text -> calendar date
```

## groupby, merge, pivot: the ones you always use
groupby splits the data into groups and computes something on each group: the mean per class, the sum per category.

```
df.groupby("class")["score"].mean()      # mean score per class
df.groupby("class").size()               # how many rows each class has
```

merge stitches two tables together on a common column. how says what you do with the rows that have no match: left keeps everything from the left, inner keeps only the matches. When the tables have the same columns and you just want to stack one under the other, use `pd.concat()` instead of merge.

```
df.merge(other_table, on="id", how="left")
pd.concat([df1, df2])   # stacks df2 under df1, same columns
```

pivot_table reshapes a long table into a wide one, with a column turned into a header. It's handy for reports and for spotting patterns across two dimensions at once.

## Other operations you'll use constantly
`sort_values()` sorts a DataFrame by a column. `value_counts()` counts how many times each distinct value shows up, the first check when you want to see if a class is imbalanced.

```
df.sort_values("score", ascending=False)
df["class"].value_counts()   # how many rows each class has
```

You add a new column by direct assignment, drop one with `drop`. `apply()` runs a function on every value in a column, useful when the transformation doesn't already have a built-in method.

```
df["score_percent"] = df["score"] * 10
df = df.drop(columns=["unused_column"])
df["label"] = df["score"].apply(lambda s: "good" if s > 8 else "weak")
```

`corr()` computes the correlation between the numeric columns, a quick first step to see which variables look related to the target you want to predict.

```
df.corr(numeric_only=True)
```

At the end, you write the result back to disk with `to_csv`, in the exact format you upload for submission.

```
df.to_csv("result.csv", index=False)
```
