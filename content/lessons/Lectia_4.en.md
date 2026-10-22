---
code: S4
duration: ~2 weeks
---

# @intro
NumPy is Python's library for numeric computing, which means working on many numbers at once, like the sum or the mean of a million values. It works with arrays (an array is like a list of numbers, except they all have the same type) and runs operations much faster than an ordinary loop. Pandas is built on top of NumPy and adds labels, meaning names for columns and rows. A Pandas table looks like a spreadsheet: every column has a name, and every row has an index, a label that by default is the row's number (0, 1, 2...). You'll use both on almost every contest problem, whatever the model.

## Install
Both are external libraries that don't come with Python: they're code written by other people, which pip downloads for you (Lesson 1). You install them once, in the project's virtual environment (the separate box for the project's libraries, from Lesson 1), together with Matplotlib, Seaborn and Pillow. Matplotlib and Seaborn draw charts, and Pillow opens images.

```
pip install numpy
pip install pandas
pip install matplotlib seaborn pillow
```
caption: Run these in a terminal, in the project folder, with the virtual environment activated.

## Why plain Python isn't enough
In ordinary Python, a list of a million numbers you want to add up element by element is done with a for loop. It works, but it's slow. In a list, each element can be anything (a number, some text, another list), so at every step Python first checks what type the element is, and only then does the addition. With real data, that becomes unbearable.

NumPy solves it with a new structure: the ndarray (short for "n-dimensional array", an array with any number of dimensions), a grid of numbers of the same type, with a fixed shape. The grid can be a row of numbers, a table with rows and columns, or something with more dimensions. Fixed shape means that, unlike a list, you can't add elements to it with `.append()`.

Since all the numbers have the same type, NumPy doesn't need to check anything at each step. Operations apply to the whole array at once, with no loop in Python: NumPy runs the loop itself, in compiled code written in C, which runs much faster. A one-dimensional array is also called a vector, and this idea, writing the operation on the whole vector instead of a loop, is called vectorization. It's tens of times faster.

```
import numpy as np

# slow, in pure Python
total = 0
for x in range(1_000_000):
    total += x * x
print(total)   # 333332833333500000

# fast, vectorized
v = np.arange(1_000_000)
total = (v * v).sum()
print(total)   # 333332833333500000, the same result
```
caption: The same sum, but the second version is much faster.

`import numpy as np` brings in the library under a short name, `np`, which you then write in front of every function from it. `np.arange(1_000_000)` makes an array with the numbers from 0 to 999999, like `range`. `v * v` multiplies each number by itself, and `.sum()` adds them all up: on a small array, `[0 1 2 3]`, you'd get `[0 1 4 9]` and a sum of 14.

## Creating and reshaping arrays
`np.array()` turns a Python list into an ndarray. `np.zeros(n)` and `np.ones(n)` make an array filled with 0 or 1, handy as an empty slot to fill in. If you give them a shape instead of `n`, as in `np.ones((2, 3))`, you get a matrix, which is a table of numbers, here with 2 rows and 3 columns. The double parentheses aren't a typo: `(2, 3)` is a tuple (Lesson 3) that describes the shape.

`np.arange(start, stop, step)` works like `range`, but returns an array, and `stop` isn't included. `np.linspace(start, stop, n)` splits an interval into n evenly spaced values, with both ends included, useful for plots.

```
a = np.array([1, 2, 3])      # [1 2 3]
zeros = np.zeros(5)          # [0. 0. 0. 0. 0.]
ones = np.ones((2, 3))       # 2x3 matrix filled with 1:
                             # [[1. 1. 1.]
                             #  [1. 1. 1.]]
steps = np.arange(0, 10, 2)  # [0 2 4 6 8], no 10
line = np.linspace(0, 1, 5)  # [0.   0.25 0.5  0.75 1.  ]
```

The comments show what `print` displays for each line. NumPy writes arrays without commas, with spaces between the numbers, and `0.` means 0.0, a number with decimals. Jupyter only displays the last line of a cell on its own, and slightly differently, for example `array([0., 0., 0., 0., 0.])` or `np.int64(2)`, but with the same values. To see them all, wrap them in `print`.

Every array has a single `dtype`, the type of all its elements (`int64`, `float64`, etc). `int64` means whole numbers, like `int` from Lesson 3, and `float64` means numbers with decimals, like `float`. The 64 is how much memory each number takes (64 bits), and it doesn't matter for now. Mixing an int and a float in the same array converts everything to float.

```
a.dtype                    # int64
np.array([1, 2.5])         # [1.  2.5], now 1 is a float too
np.array([1, 2.5]).dtype   # float64
```

`reshape` changes an array's shape without changing its content, as long as the total number of elements stays the same. The shape says how many elements the array has along each direction. `np.arange(6)` has shape `(6,)`: one dimension, with 6 numbers (the comma tells you it's a tuple with a single element). `reshape(2, 3)` lays them out in 2 rows of 3, row by row. That works because 2 × 3 = 6, whereas `reshape(4, 2)` would throw an error, since 4 × 2 = 8. `flatten()` does the opposite, bringing it back to one dimension.

```
v = np.arange(6)       # [0 1 2 3 4 5], shape (6,)
m = v.reshape(2, 3)    # shape (2, 3):
                       # [[0 1 2]
                       #  [3 4 5]]
m.flatten()            # back to [0 1 2 3 4 5]
```

> [!NOTE]
> A slice of an array (`v[1:4]`) is a view, not a copy. With a list, a slice is a new list; with NumPy, it's only a window onto the same numbers in memory, like `b = a` from Lesson 3. That way NumPy doesn't copy millions of numbers for every slice, but changing the slice changes the original too. If you want an independent copy, ask for it explicitly with `.copy()`.

```
v = np.array([1, 2, 3, 4])
piece = v[1:3]        # [2 3]
piece[0] = 99
print(v)              # [ 1 99  3  4], the original changed too

copy = v[1:3].copy()
copy[0] = -1
print(v)              # [ 1 99  3  4], unchanged this time
```

## ndarray: shape, axes, indexing
An ndarray has a shape: how many rows, how many columns, how many dimensions. A row of numbers has one dimension (1D), a table has two (2D): rows and columns. You create a 2D array from a list of lists, where each inner list becomes a row, like `x` below.

A grayscale image is a 2D matrix, a color one is 3D (height, width, channels): every pixel, meaning every dot in the image, has three numbers, for red, green and blue. Your first move on any bug is to print the shape and check it's what you thought.

The axes are the directions you operate along. On `x` below, with 2 rows and 3 columns: with `axis=0` you go down each column and combine the rows, so you get one result per column (3 values). With `axis=1` you go along each row and get one result per row (2 values). To keep them apart: the axis you pass disappears from the shape, so (2, 3) becomes (3,) with `axis=0` and (2,) with `axis=1`. Mixing up the axes is one of the most common beginner mistakes.

```
x = np.array([[1, 2, 3],
              [4, 5, 6]])

x.shape          # (2, 3): 2 rows, 3 columns
x.mean(axis=0)   # mean of each column: [2.5 3.5 4.5]
x.mean(axis=1)   # mean of each row: [2. 5.]
```

The first column holds 1 and 4, so its mean is (1 + 4) / 2 = 2.5. The first row holds 1, 2 and 3, so its mean is 6 / 3 = 2. Without `axis`, `x.mean()` takes the mean of all 6 numbers: 3.5.

On an array with several dimensions, indexing and slicing are written with a comma between dimensions, instead of separate brackets: where you'd write `x[0][1]` for a list of lists, in NumPy you write `x[0, 1]`, row first, then column. A bare `:` is a slice with no ends, meaning "everything", so `x[:, 0]` means every row, column 0.

```
x[0, 1]      # 2, row 0, column 1
x[:, 0]      # [1 4], every row, column 0
x[0, :]      # [1 2 3], all of row 0
```

Indexing with a boolean mask is a tool you use daily: you build an array of True/False and select only the elements where it's True. That's how you filter data with no loop. The name comes from `bool`, the True/False type from Lesson 3. A comparison like `x > 3` runs on every element and gives an array of the same shape, full of True and False: that's the mask.

```
x > 3            # [[False False False]
                 #  [ True  True  True]]
x[x > 3]         # only the elements greater than 3 -> [4 5 6]
x[x > 3] = 0     # and you can change them in place too
print(x)         # [[1 2 3]
                 #  [0 0 0]]
```

## Broadcasting: how NumPy matches different shapes
When you add a number to an array, NumPy adds it to every element.

```
np.array([1, 2, 3]) + 10   # [11 12 13]
```

It's as if 10 had been stretched into an array `[10 10 10]`, the same shape as the other one. A single number that isn't an array is called a scalar. Broadcasting is the rule by which NumPy does operations between arrays of different shapes, automatically stretching the smaller one to fit. Half the beginner errors come from shapes that don't match the way you thought.

The rule: NumPy compares shapes from right to left. Two dimensions match if they're equal or if one of them is 1 (that one stretches). A scalar matches anything.

Below, `X` has shape (2, 3) and the column means have shape (3,). From the right, 3 and 3 match. The means are missing the first dimension, so NumPy treats it as 1 and stretches them over 2 rows: it subtracts the same row of means from every row of `X`.

```
X = np.array([[1, 2, 3],
              [4, 5, 6]])      # shape (2, 3)
means = X.mean(axis=0)         # shape (3,): [2.5 3.5 4.5]
X_centered = X - means         # (2,3) - (3,) matches, subtracts per column
print(X_centered)              # [[-1.5 -1.5 -1.5]
                               #  [ 1.5  1.5  1.5]]
```
caption: Centering a matrix on its means, with no loop at all.

Centering means subtracting each column's mean from it, so every column ends up with a mean of 0. The first column, 1 and 4 with a mean of 2.5, becomes -1.5 and 1.5. You'll do this step often when preparing data for a model, and you'll see it again in Lesson 5, under scaling.

On the other hand, `X - X.mean(axis=1)` throws an error: the row means have shape (2,), and from the right, 3 and 2 aren't equal and neither is 1. If you turn them into a column with `reshape(2, 1)`, the shape becomes (2, 1) and it matches, because the 1 stretches across the 3 columns.

> [!NOTE]
> When an operation throws a shape error, print the shapes of the two operands (the two arrays in the operation) and apply the right-to-left rule. Nine times out of ten you see straight away where they don't match.

## Sorting, searching and set operations in NumPy
`np.sort()` sorts an array without changing it in place: it returns a new, sorted array. `np.argsort()` returns the indices that would sort the array, meaning the positions of the elements, from the smallest to the largest. It's useful when you want to sort one array by another's values.

```
v = np.array([3, 1, 2])
np.sort(v)          # [1 2 3]
np.argsort(v)       # [1 2 0], the indices in ascending order

names = np.array(["Ana", "Bogdan", "Cris"])
names[np.argsort(v)]  # ['Bogdan' 'Cris' 'Ana']
```

Read `[1 2 0]` like this: the smallest element is `v[1]`, which is 1, the next one is `v[2]`, which is 2, and the largest is `v[0]`, which is 3. An array of indices inside square brackets picks the elements at those positions, in that order, so `names[np.argsort(v)]` puts the names in ascending order of the values in `v`.

`np.where(condition, then, else)` picks between two values element by element, more flexible than a plain mask. On `v`, the condition `v > 1` gives `[True False True]`: where it's True, `np.where` takes the value from `v`, and where it's False it puts 0. A mask, `v[v > 1]`, would keep only `[3 2]`, whereas here all 3 positions stay. `argmax`/`argmin` give the position of the largest, or smallest, element.

```
np.where(v > 1, v, 0)   # [3 0 2], keeps what's above 1, the rest becomes 0
v.argmax()               # 0, the position of 3
v.argmin()               # 1, the position of 1
```

`np.unique()` returns the distinct values in an array, sorted: each value once, like the sets from Lesson 3. `np.concatenate()` joins several arrays into one: you give it a list of the pieces, and it puts them one after another.

```
np.unique([1, 2, 2, 3, 1])      # [1 2 3]
np.concatenate([[1, 2], [3, 4]]) # [1 2 3 4]
```

## Pandas: data with labels
Real data has names: an age column, a score column, a class column (in these examples, a school class, like 9A). Pandas adds labels on top of NumPy, in two structures: Series (a single column, with an index) and DataFrame (a whole table, several columns). The DataFrame is the structure most contest datasets arrive in. The index is each row's label, and if you don't give one, Pandas numbers the rows 0, 1, 2...

```
import pandas as pd

s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s["b"])     # 20
print(s)
# a    10
# b    20
# c    30
# dtype: int64

df = pd.DataFrame({"name": ["Ana", "Bogdan"], "score": [9.2, 8.7]})
print(df)
#      name  score
# 0     Ana    9.2
# 1  Bogdan    8.7
```

In a printed Series you see the index on the left, the values on the right and, on the last line, the type of the values. In `df`, each key of the dictionary becomes a column name, and its list becomes the values in that column. You didn't give an index, so Pandas used 0 and 1.

Under the hood, a DataFrame is a dictionary of Series, one per column: `df["score"]` gives you the score column, as a Series, just like `d["key"]` gives you a value from a dictionary. You read a CSV file (the text file with comma-separated values, from Lesson 3) in one line, then look at it before anything else: the first rows, the column types, how many values are missing.

```
import pandas as pd

df = pd.read_csv("data.csv")

df.head()        # first 5 rows
df.info()        # types and non-null counts
df.describe()    # stats on the numeric columns
```

`head()` shows you the first 5 rows (`head(10)` shows 10). `info()` prints how many rows the table has and, for each column, its name, how many non-null values it has and its type. Non-null means not missing: if a column has fewer than the number of rows, it has gaps. Number columns show up as `int64` or `float64`, and text columns as `str` (`object` in older versions of Pandas).

`describe()` computes eight statistics for each numeric column. Here they are for the grades 9, 7, 10, 6 and 8.

```
grades = pd.DataFrame({"score": [9, 7, 10, 6, 8]})
print(grades.describe())
#            score
# count   5.000000
# mean    8.000000
# std     1.581139
# min     6.000000
# 25%     7.000000
# 50%     8.000000
# 75%     9.000000
# max    10.000000
```

`count` is how many values there are, `mean` is the average, and `min` and `max` are the smallest and largest values. `std` is the standard deviation, which measures how spread out the values are around the mean: 0 if they're all equal, larger the further they drift from it. `25%`, `50%` and `75%` are the quartiles. Sorted, the grades are 6, 7, 8, 9, 10: at `50%` sits the middle value, 8, called the median, and 7 and 9 are a quarter and three quarters of the way along. You'll come back to all of them in Lesson 5.

## Selection: loc vs iloc
There are two ways to select from a DataFrame, and mixing them is a classic mistake. loc selects by label (the column name, the index value). iloc selects by position (which row, which column, counting from 0).

On a freshly created table, with the index 0, 1, 2, both find the same rows. The difference shows up when the labels are no longer in order, for example after sorting. `sort_values("score", ascending=False)` arranges the rows from the highest score to the lowest, and each row takes its label with it.

```
students = pd.DataFrame({"name": ["Ana", "Bogdan", "Cris"],
                         "score": [7.5, 9.2, 8.7]})
df = students.sort_values("score", ascending=False)
print(df)
#      name  score
# 1  Bogdan    9.2
# 2    Cris    8.7
# 0     Ana    7.5

df.loc[0, "score"]         # 7.5, the row labeled 0 (Ana)
df.iloc[0, 1]              # 9.2, the first row (Bogdan), column 1
df.loc[df["score"] > 8]    # all rows with score above 8
```

`df.loc[0, "score"]` looks for the row labeled 0, which is Ana, even though she's now last. `df.iloc[0, 1]` takes the first row in the table, whichever it is, and the second column (positions start at 0). The last line uses a boolean mask, like in NumPy: `df["score"] > 8` gives True or False for each row, and `loc` keeps the rows with True, here Bogdan and Cris.

## Missing values and cleanup
Real data almost always has gaps, duplicate rows or wrong types, and a model trained on dirty data makes bad predictions. `isna()` flags where a value is missing, `dropna()` removes rows with gaps, `fillna(value)` fills them in.

Pandas marks a missing value with `NaN` (short for "Not a Number"). An empty cell in a CSV becomes `NaN` when you read it, and in code you write it as `np.nan`.

```
df = pd.DataFrame({"name": ["Ana", "Bogdan", "Cris"],
                   "score": [9.0, np.nan, 7.0]})

df.isna().sum()          # how many values are missing per column
                         # name 0, score 1
df_complete = df.dropna()  # removes rows with any gap: Ana and Cris stay
# fills gaps with the mean
df["score"] = df["score"].fillna(df["score"].mean())
print(df)
#      name  score
# 0     Ana    9.0
# 1  Bogdan    8.0
# 2    Cris    7.0
```

`isna()` gives a table of the same shape, with True where a value is missing. `.sum()` adds up each column, and True counts as 1 and False as 0, so you get the number of gaps. `mean()` skips `NaN`, so the mean is (9 + 7) / 2 = 8, and Bogdan gets 8.0.

`dropna` and `fillna` don't change the data in place, they return a new copy, so you have to store it in a variable. Without `=`, the line does nothing.

> [!NOTE]
> Choose between `dropna` and `fillna` based on how many rows you have and what the gap means: if few values are missing, you can drop them; if many are missing, dropping throws away too much good data with them.

`duplicated()` flags rows identical to an earlier one, `drop_duplicates()` removes them. Below, Ana appears twice with exactly the same values: `duplicated()` gives False for the first occurrence and True for the second, and `drop_duplicates()` keeps only the first.

`astype()` changes a column's type, for example from text to a number: the text `"9.5"` becomes the number 9.5. `pd.to_datetime` turns text like `"2026-10-01"` into calendar dates that Pandas can do arithmetic with, for example how many days lie between two dates.

```
df = pd.DataFrame({"name": ["Ana", "Ana", "Bogdan"],
                   "score": ["9.5", "9.5", "8"],
                   "date": ["2026-10-01", "2026-10-01", "2026-10-03"]})

df.duplicated().sum()          # how many rows are duplicates: 1
df = df.drop_duplicates()

df["score"] = df["score"].astype(float)
df["date"] = pd.to_datetime(df["date"])   # text -> calendar date
```

## groupby, merge, pivot: the ones you always use
groupby splits the data into groups and computes something on each group: the mean per class, the sum per category. The example below has six students from two school classes, 9A and 9B.

```
df = pd.DataFrame({
    "name": ["Ana", "Bogdan", "Cris", "Dan", "Elena", "Filip"],
    "class": ["9A", "9A", "9A", "9B", "9B", "9B"],
    "score": [9.0, 10.0, 8.0, 5.0, 9.0, 7.0],
})

df.groupby("class")["score"].mean()      # mean score per class
# class
# 9A    9.0
# 9B    7.0
# Name: score, dtype: float64
df.groupby("class").size()               # how many rows each class has
# 3 rows in 9A, 3 in 9B
```

`groupby("class")` puts together the rows with the same class, `["score"]` picks the column, and `.mean()` takes the mean in each group: for 9A, (9 + 10 + 8) / 3 = 9. The result is a Series with the classes as its index, and `Name: score` is its name, taken from the column.

With `agg` you compute several statistics at once, and `transform` returns the result on every row, so you can put it back into the table as a new column.

```
df.groupby("class")["score"].agg(["mean", "std", "count"])
#        mean  std  count
# class
# 9A      9.0  1.0      3
# 9B      7.0  2.0      3

df["class_mean"] = df.groupby("class")["score"].transform("mean")
print(df)
#      name class  score  class_mean
# 0     Ana    9A    9.0         9.0
# 1  Bogdan    9A   10.0         9.0
# 2    Cris    9A    8.0         9.0
# 3     Dan    9B    5.0         7.0
# 4   Elena    9B    9.0         7.0
# 5   Filip    9B    7.0         7.0
```

`agg` takes the list of statistic names and gives one row per group, so 2 rows. `std` is the standard deviation from `describe()`: the grades in 9B (5, 7, 9) are more spread out than those in 9A (8, 9, 10), so it comes out larger. `transform` gives one value for every row of the original table, so 6: each student gets their class's mean, which is why the result fits straight into a new column.

merge stitches two tables together on a common column. Below, one table has the students, another the grades, and the `id` column, each student's number, links them.

```
df = pd.DataFrame({"id": [1, 2, 3],
                   "name": ["Ana", "Bogdan", "Cris"]})
other_table = pd.DataFrame({"id": [1, 3, 4],
                            "score": [9.0, 7.5, 8.0]})

df.merge(other_table, on="id", how="left")
#    id    name  score
# 0   1     Ana    9.0
# 1   2  Bogdan    NaN
# 2   3    Cris    7.5
df.merge(other_table, on="id", how="inner")
#    id  name  score
# 0   1   Ana    9.0
# 1   3  Cris    7.5
```

`on="id"` says which column to match the rows on. how says what you do with the rows that have no match: left keeps everything from the left, inner keeps only the matches. Here Bogdan (id 2) has no grade, and the grade with id 4 has no student. With `how="left"`, Bogdan stays, with `NaN` as his score; with `how="inner"`, only Ana and Cris remain. The grade with id 4 disappears either way, because it has no match in the left table, `df`.

When the tables have the same columns and you just want to stack one under the other, use `pd.concat()` instead of merge.

```
df1 = pd.DataFrame({"name": ["Ana", "Bogdan"], "score": [9.0, 8.5]})
df2 = pd.DataFrame({"name": ["Cris"], "score": [7.5]})

pd.concat([df1, df2])   # stacks df2 under df1, same columns
#      name  score
# 0     Ana    9.0
# 1  Bogdan    8.5
# 0    Cris    7.5
```

`concat` doesn't match anything: the columns stay the same and only the rows add up, 2 + 1 = 3, so the table grows downwards, not sideways as with merge. Each row keeps its label, so the index now has 0 twice; `pd.concat([df1, df2], ignore_index=True)` renumbers the rows 0, 1, 2.

pivot_table reshapes a long table into a wide one, with a column turned into a header: its values, here the years, become the names of the new columns. The long table below has one row for each score, with its class and year. The wide one has one row per class and one column per year. It's handy for reports and for spotting patterns across two dimensions at once.

```
df = pd.DataFrame({
    "class": ["9A", "9A", "9A", "9B", "9B", "9B"],
    "year": [2025, 2025, 2026, 2025, 2026, 2026],
    "score": [8.0, 9.0, 10.0, 6.0, 7.0, 8.0],
})

# mean score per class (rows) and year (columns)
df.pivot_table(index="class", columns="year",
               values="score", aggfunc="mean")
# year   2025  2026
# class
# 9A      8.5  10.0
# 9B      6.0   7.5
```

`index` gives the rows of the new table, `columns` its columns, `values` what goes in the cells, and `aggfunc` how to combine the values that land in the same cell. For 9A in 2025 there are two scores, 8 and 9, so the cell gets their mean, 8.5.

## Other operations you'll use constantly
`sort_values()` sorts a DataFrame by a column, and `ascending=False` means descending, from high to low. `value_counts()` counts how many times each distinct value shows up: on the students table, how many students each class has. On the target column, the one you predict (Lesson 2), it's the first check when you want to see if the classes are imbalanced. There, the classes are the possible values of the target, like spam and normal, and imbalanced means one shows up much more rarely, like 5 spam emails for every 95 normal ones.

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

The first line works on the whole column at once, like in NumPy: a score of 9.2 becomes 92.0. `drop(columns=[...])` takes the list of columns to remove and, like `dropna`, returns a new table. In `apply`, the function is a lambda (the short, nameless function from Lesson 3): it takes each score `s` in turn and returns `"good"` if it's above 8, `"weak"` otherwise.

`corr()` computes the correlation between the numeric columns, a quick first step to see which columns look related to the target you want to predict. A correlation is a number between -1 and 1: close to 1 when two columns rise together (hours of study and the grade, say), close to -1 when one rises as the other falls, close to 0 when they don't look related. Lesson 5 goes into the details.

```
df.corr(numeric_only=True)
```

The result is a table with one row and one column for each numeric column, and where they cross is their correlation. The diagonal is always 1, because every column is perfectly correlated with itself. `numeric_only=True` skips the text columns.

At the end, you write the result back to disk with `to_csv`, in the exact format you upload for submission (the file with your predictions, from Lesson 2). `index=False` tells it not to write the index as well: without it, the file would start with an extra column of 0, 1, 2..., which the platform doesn't expect.

```
df.to_csv("result.csv", index=False)
```

## Charts: Matplotlib and Seaborn
A chart shows you in a few seconds what you wouldn't notice in a table: a skewed distribution, an impossible value, two columns that rise together. A column's distribution is how its values are spread out, which ones are common and which are rare. Skewed means most values sit on one side, while a few stretch far out on the other, the way prices usually do. Matplotlib is the base library, and Seaborn is built on top of it and draws statistical charts in a single line. The code below is a template: `df` is your table, and you swap in your own column names.

```
import matplotlib.pyplot as plt
import seaborn as sns

# line: how a value changes over time
plt.plot(df["day"], df["temperature"])
plt.show()

# bars: how many rows each category has
df["city"].value_counts().plot(kind="bar")
plt.show()

# histogram: the distribution of a column
plt.hist(df["age"], bins=30)
plt.show()

# scatter: the relationship between two columns
plt.scatter(df["area"], df["price"])
plt.show()
```

- The line joins the points in order, here the temperature on each day: you see whether the value rises, falls or jumps.
- The bars show how many rows each category has: `value_counts()` counts the cities, and `.plot(kind="bar")` draws one bar for each. You see straight away if one category dominates.
- The histogram splits the column's values into intervals (`bins=30` means 30 intervals) and raises a bar over each interval, taller the more values fall into it. That's how you see the distribution: where the values pile up, whether it's skewed, whether there are impossible values.
- The scatter plot draws every row as a dot, with the area on the horizontal axis and the price on the vertical one. If the dots climb to the right, the two columns rise together.

Seaborn adds the box plot, good for spotting outliers, and the heatmap, good for the correlation matrix. Outliers are values that don't fit the pattern, much larger or smaller than the rest of the column. The box plot draws one box per group, here per class (`x="class"`), from the values in the `y="score"` column, taken from the `data=df` table. The line inside the box is the median, and the box goes from the first to the third quartile (`25%` and `75%` from `describe()`). The lines sticking out of the box show how far the other values reach, and the dots drawn on their own, beyond them, are the outliers. Lesson 5 explains them in full.

```
# box plot: median, quartiles and the values that don't fit
sns.boxplot(x="class", y="score", data=df)
plt.show()

# heatmap: the correlations between columns, as colors
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")
plt.show()
```

The heatmap colors each cell of a table of numbers, here the correlation table from `corr()`, so you can see at a glance which columns go together. `annot=True` also writes the number in each cell, and `cmap="coolwarm"` picks the colors: blue for low values, red for high ones.

> [!NOTE]
> Put `plt.show()` after every chart. Otherwise the charts in the same cell get drawn on top of each other.

## Images as arrays
To a computer, a color image is an array of numbers with the shape (height, width, 3): three channels, red, green and blue, with values from 0 to 255. Each pixel has one number per channel, where 0 means none and 255 means full, so a red pixel is `[255 0 0]`, a white one `[255 255 255]` and a black one `[0 0 0]`. You read it with Pillow and turn it into a NumPy array, and from there everything you saw above works: on the array `a` below, `a[:, :, 0]` gives you just the red channel.

```
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# convert("RGB") drops the transparency channel, if there is one
img = Image.open("photo.png").convert("RGB")
a = np.array(img)
print(a.shape, a.dtype)                  # (height, width, 3) uint8

gray = np.array(img.convert("L"))        # black and white, one channel
small = np.array(img.resize((64, 64)))   # the same size for every picture

plt.imshow(a)
plt.show()
```

For a 640 by 480 pixel photo, `print` shows `(480, 640, 3) uint8`: height first, then width. `uint8` is the pixel type: whole numbers with no minus sign (the u stands for "unsigned"), from 0 to 255, each taking 8 bits. Some PNGs also have a fourth channel, for transparency, and `convert("RGB")` drops it. `convert("L")` makes the image black and white: one number per pixel is left, the brightness, from 0 (black) to 255 (white), so the shape becomes (480, 640).

`resize((64, 64))` scales the photo to 64 by 64 pixels, so to the shape (64, 64, 3). A model wants every image to have the same shape, which is why you bring them all to the same size. Careful: `resize` takes the width first and the height second, the opposite of `shape`. `plt.imshow(a)` draws the array as an image.

# @practice
- [numpy-100](https://github.com/rougier/numpy-100)
- [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas)
- [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization)
