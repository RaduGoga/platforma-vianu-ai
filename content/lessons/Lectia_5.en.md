---
code: S6
duration: ~2 weeks
---

# @intro
Before you train anything, look at the data. At the distributions, at what's missing, at how the columns are scaled (how big the numbers in each one are). This stage is called EDA, exploratory data analysis, and it's the first thing you do on any new problem. Once you've looked, you get the data ready for the model, for example by filling in the gaps and turning text into numbers. That part is called preprocessing.

## What you're looking for
EDA means asking data simple questions and looking at the answer before drawing any conclusion. How many rows and columns there are. What type each column has. What the target looks like, meaning what you want to predict. What's missing and how much. You can answer most of these with what you know from Lesson 4: `df.shape`, `df.info()`, `df.isna().sum()`.

A column's distribution tells you which values show up in it and how often. Take the salaries at a big company: most people earn around 4000 lei, and a few earn 20000 or more. On a histogram you see a mountain of tall bars on the left and a long trail of short bars stretching to the right. That trail is called a long tail. A symmetric distribution looks the same on both sides of the middle, the way the heights of the students in a school usually do.

Plot the distribution of every numeric column with a histogram. You see right away if it's symmetric, if it has a long tail, if it has impossible values (an age of 200, a negative price). Impossible values are signs of data errors you catch by eye.

```
df["age"].hist(bins=30)
df["target"].value_counts()     # how many examples per class
```

The first line is pandas' shortcut for `plt.hist` from Lesson 4: the column's histogram, with 30 intervals. The second counts how many rows each class has, meaning each possible value of the target, like spam or normal.

## Outliers: values that don't fit
An outlier is a value much larger or smaller than the rest of the column. It can be an error, like an age of 200, or it can be exactly what you're looking for, like an anomaly in a sensor. You spot it fastest on a box plot.

The classic rule for outliers uses quartiles, which you've seen in `describe()`. Take nine prices, sorted from smallest to largest: 10, 12, 14, 15, 16, 18, 20, 22, 90. The median is the value in the middle, the fifth one: 16. The first quartile (Q1) is the value a quarter of the way through the list, and the third quartile (Q3) is the one three quarters of the way through. The second quartile is the median itself. From the first position to the last there are 8 steps: a quarter is 2 steps, so Q1 is the third value, 14. Three quarters is 6 steps, so Q3 is the seventh, 20. When the step doesn't come out whole, pandas takes a value between the two neighbors.

The rule counts a value as an outlier if it's more than 1.5 × IQR below the first quartile or above the third. IQR (interquartile range) is the distance between quartile 1 and quartile 3. Here IQR = 20 - 14 = 6, and 1.5 × 6 = 9. So the limits are 14 - 9 = 5 and 20 + 9 = 29, and the only price outside them is 90. On the box plot from Lesson 4, these are exactly the values drawn as separate dots.

```
q1, q3 = df["price"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["price"] < low) | (df["price"] > high)]
print(len(outliers))
```

`quantile([0.25, 0.75])` computes Q1 and Q3 (0.25 is a quarter, 0.75 three quarters), and `q1, q3 = ...` unpacks them into two variables, as in Lesson 3. The `outliers` line keeps the rows where the price is below `low` or above `high`, like a boolean mask from Lesson 4. The `|` sign means "or": pandas needs it instead of `or`, with each condition in parentheses. On the nine prices, the code prints 1.

What you do with them depends on the cause. You fix or drop errors. Real but extreme values you can cap at a limit with `clip`, and a column with a long right tail, like prices or incomes, you bring to a more balanced shape with `np.log1p`.

```
df["price"] = df["price"].clip(upper=high)
df["income_log"] = np.log1p(df["income"])
```

`clip(upper=high)` replaces any value above `high` with `high`. In the example, 90 becomes 29 and the other prices stay the same.

`np.log1p` uses the logarithm, a function you only get to in math in 10th grade. Here it's enough to know that it grows very slowly. Take 9, 99 and 999, which are 10, 100 and 1000 minus 1: `np.log1p` turns them into about 2.3, 4.6 and 6.9. Each multiplication by 10 adds only 2.3, so the big values get squeezed close to the others and the long tail shrinks. The "1p" stands for "plus 1": the function takes the logarithm of 1 + x so that it also works on 0, where it gives 0 (the plain logarithm doesn't exist at 0).

## Imbalanced classes: why it matters early
Classes are imbalanced when one of them shows up much more rarely than the others. If you're predicting a class that shows up in 2% of cases (fraud, a rare disease), a model that always says no gets 98% accuracy and is completely useless.

Accuracy, from Lesson 2, is the percentage of correct answers. Take 1000 card payments, 20 of which are fraud. A model that always answers "not fraud" only gets those 20 wrong, so it's right on 980 out of 1000, which is 98%. And yet it hasn't caught a single fraud, which was its whole job.

That's why you check class balance from the start: it changes which metric you use and how you split the data into training and validation (Lesson 6).

> [!NOTE]
> When a class is rare, accuracy lies. Keep this for Lesson 8, on evaluation: you'll need precision, recall and F1, not plain accuracy. Recall says how many of the real frauds you caught, precision says how many of your alarms were real frauds, and F1 combines the two into a single score.

## Correlations: which columns say the same thing
Students' height and weight usually go up together, while the temperature outside and the gas used for heating move in opposite directions: when one goes up, the other goes down.

Correlation measures how much two columns move together, from -1 (inverse) through 0 (not at all) to 1 (identical trend). Two nearly identical columns tell you something: maybe one is derived from the other, maybe you can drop one without losing information. Temperature in degrees Celsius and the same temperature in Fahrenheit, for example, have a correlation of 1, because the second is computed from the first.

```
df.corr(numeric_only=True)     # correlation matrix between columns
```

The result is the correlation table from Lesson 4, with one row and one column for each numeric column.

A relationship is linear when the points lie on a straight line, like the graph of a linear function in math class. Celsius and Fahrenheit are linked exactly like that: F = 1.8 × C + 32, so each extra degree Celsius always adds 1.8 degrees Fahrenheit.

By default it's Pearson correlation, which only catches linear relationships. `df.corr(method="spearman", numeric_only=True)` also catches columns that rise together without lying on a straight line.

Spearman only looks at the order. It replaces each value with its rank (the smallest becomes 1, the next one 2, and so on), then computes Pearson on the ranks. Take x = 1, 2, 3, 4, 5 and y = 1, 10, 100, 1000, 10000. y always rises with x, but faster and faster, so the points don't lie on a straight line. Pearson gives about 0.76, while Spearman gives 1.

Correlation doesn't mean causation. Two things can rise together without one causing the other. In summer, ice cream sales and drownings both go up, but ice cream doesn't cause drowning: the heat drives both. It's a hint of where to look, not a conclusion.

## Missing values: why first, then how
Before you fill in a missing value, ask why it's missing. Sometimes the gap is a collection error. Sometimes the gap is information itself: an empty income field can mean the person refused to answer, which is meaningful on its own. In that case, add a separate column that flags the gap, for example `income_missing`, with 1 where the income is missing and 0 everywhere else.

Filling in (imputation) uses the mean, the median or the most frequent value, or a model. The median is safer than the mean when there are outliers, because it isn't pulled by extreme values.

Take five salaries: 3000, 3200, 3500, 4000 and 50000. The mean is 63700 / 5 = 12740, more than four of the five people earn. The median, the value in the middle, is 3500, a normal salary for this group. The most frequent value is the one you use for text columns, like the city, where you can't take an average.

From here on, the examples use `X_train` and `X_val`. You split the training data in two: a part the model learns from and a part you keep aside to check it, just like the local validation from Lesson 2. `X_train` is the part of the data you train on and `X_val` the part you check the model on. `X` is the table of features, meaning the input columns, and `y` is the target, so `y_train` is the target for the rows in `X_train`. You'll see how to get them in the next lesson.

Preprocessing tools in scikit-learn have two methods, `fit` and `transform`, following the `fit`/`predict` pattern from Lesson 3. `fit` learns some numbers from the data, here the median of each column; these numbers are called parameters. `transform` applies them to any table, here by filling the gaps with them. You learn them only from `X_train` and apply them to both parts, so the check stays fair. To the model, `X_val` has to be new data it hasn't learned anything from.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # same parameters, learned on train
```

`strategy="median"` picks the median; you can also use `"mean"` for the mean or `"most_frequent"` for the most frequent value. What comes out of `transform` is a NumPy array with no gaps, with the same rows and columns.

`SimpleImputer` adds the column that flags the gap by itself, if you give it `add_indicator=True`. For each column that had gaps, it adds a column of 0 and 1 at the end. For example, the incomes 3000, gap, 4000 become 3000, 3500, 4000 (the gap got the median), plus a new column with 0, 1, 0.

In time series, like a sensor's readings, a gap is usually filled with the last known value. You sort by time first, then use `ffill`.

```
df = df.sort_values("time")
df["temperature"] = df["temperature"].ffill()
```

`ffill` stands for forward fill: each gap gets the value from the row above it. The readings 20, gap, gap, 23 become 20, 20, 20, 23. That's why you sort first: the row above has to be the reading that came before.

## Scaling: which method and when
Take two people: one is 20 years old and earns 3000 lei, the other is 25 and earns 3500 lei. If you treat them as two points in the plane, (20, 3000) and (25, 3500), the distance between them, by the Pythagorean theorem, is √(5² + 500²) ≈ 500.02. That's almost exactly the income gap. The 5 years barely count, only because age is measured in tens and income in thousands.

Many models measure distances, like above (for example kNN, which looks for the closest rows, and K-Means, from Lesson 10). Others use gradients, meaning they learn by correcting themselves in small steps (regression, from Lesson 7, and neural networks, from Lesson 14). For them, a column with large values (income, in thousands) dominates one with small values (age, tens) purely by scale, not by importance. Scaling brings them to the same measure.

Decision trees and Random Forest don't need it, because they split the data on thresholds. A decision tree (Lesson 7) asks questions like "is the income above 3200?". If you scale the column, only the threshold changes, and the rows get split the same way. A Random Forest is a group of such trees (Lesson 9).

There are two common methods, and the choice depends on the shape of the data. The first, standardization, uses the mean and the standard deviation from Lesson 4, which says how far the values typically sit from the mean. Take the values 10, 20, 30, with mean 20. Subtract the mean from each (-10, 0, 10), square them (100, 0, 100), take the mean of the squares (200 / 3 ≈ 66.67) and take the square root: the standard deviation is ≈ 8.16. Standardized, 10 becomes (10 - 20) / 8.16 ≈ -1.22, 20 becomes 0, and 30 becomes 1.22.

> [!FORMULA]
> z = (x - μ) / σ
> Standardization: subtract the mean μ (read "mu") and divide by the standard deviation σ ("sigma"). The result has mean 0 and deviation 1. Use it as the default, for regression, SVM and neural networks (you'll see them in Lessons 7 and 14), when the data doesn't have extreme outliers.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)   # learns μ and σ on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)          # applies the same μ and σ
```

If you check by hand, watch out for one trap. `StandardScaler` takes the mean of the squares as above, dividing their sum by 3, and gets 8.16. In pandas, `.std()` divides the sum by 2 by default (the number of values minus 1) and gives 10.0 for the same values. With `.std(ddof=0)`, pandas gives 8.16 too.

Min-max normalization, the second method, moves the values between 0 and 1. On 10, 20, 30, the minimum 10 becomes 0, the maximum 30 becomes 1, and 20 becomes (20 - 10) / (30 - 10) = 0.5.

> [!FORMULA]
> x' = (x - min) / (max - min)
> Min-max normalization: brings values into the 0 to 1 range (x' is the new value). Use it when you need a fixed range, for example a neural network expecting input between 0 and 1, or images (pixels, already in 0-255). Sensitive to outliers: a single extreme point ruins the minimum or maximum for the rest of the column.

```
from sklearn.preprocessing import MinMaxScaler
sc = MinMaxScaler().fit(X_train)   # learns min and max on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

That last sentence, in numbers: add a 1000 next to 10, 20 and 30. The maximum becomes 1000, and 10, 20 and 30 end up at 0, 0.01 and 0.02, squeezed together near 0.

When a column has outliers, a third option, `RobustScaler`, is safer: it subtracts the median and divides by the IQR, so one extreme point doesn't wreck the scale for everything else. On the nine prices from the outliers section (median 16, IQR 6), 10 becomes (10 - 16) / 6 = -1 and 22 becomes 1. The price of 90 ends up at about 12.33, far from the rest, but without squeezing the others together.

```
from sklearn.preprocessing import RobustScaler
sc = RobustScaler().fit(X_train)   # learns the median and IQR on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

All three learn on `X_train` and only apply to `X_val`, because the parameters depend on the data you learn them from. Say the training part has the incomes 3000, 3500 and 4000, and validation has 3200 and 50000. The mean on training is 3500, but on all five it's 12740: a single income from validation changed the number you prepare the training data with. The preprocessing has already "seen" validation, like a student who peeked at the exam questions. The validation score no longer tells you how well the model does on new data.

> [!NOTE]
> The basic rule of preprocessing: learn the parameters (mean, deviation, median, min, max) only on the training set, then apply them to validation and test. Never the other way around. Otherwise test leaks into training and your score is a lie. This is called data leakage.

## Categorical variables: columns of categories
A model wants numbers, but many columns are categories: city, color, type. Turning them into numbers is called encoding. Which encoding you pick depends on how many categories there are and whether they have a natural order. The number of different categories in a column is called its cardinality: the `color` column, with red, green and blue, has cardinality 3, while a zip code can have thousands.

With no order and few categories, one-hot encoding is the choice: it turns each category into a separate column of 0 and 1. With three colors, red becomes [1,0,0], green [0,1,0]. No category outranks another.

```
pd.get_dummies(df, columns=["city", "color"])
```

`get_dummies` does this for the columns in `columns` and puts the old column's name in front of each category. A `city` column with Bucharest, Cluj and Iasi becomes `city_Bucharest`, `city_Cluj` and `city_Iasi`, and a row from Cluj gets 0, 1, 0. In recent pandas, the new columns come out as `True` and `False` instead of 1 and 0. To the model that's the same thing, and with `dtype=int` you get 0 and 1.

With a natural order (small, medium, large), ordinal encoding turns them into numbers that keep the order, 0, 1, 2. It works well especially with tree-based models, which split on thresholds anyway.

```
from sklearn.preprocessing import OrdinalEncoder
enc = OrdinalEncoder(categories=[["small", "medium", "large"]])
df["size_code"] = enc.fit_transform(df[["size"]])
```

`categories` takes the order you want as a list inside a list, one list for each column you encode (here just one). With double brackets, `df[["size"]]` is a table with a single column, the shape scikit-learn tools ask for. `fit_transform` does `fit` and `transform` in one go.

Label encoding does the same thing, one integer per category, but without you asking for the order, it comes from alphabetical order or the order of appearance. It's meant for the target y, not for input columns: on an input column with no real order, the numbers invent a false order that a linear model takes at face value. If Bucharest becomes 0, Cluj 1 and Iasi 2, a linear model (Lesson 7) ends up believing Cluj sits "between" Bucharest and Iasi.

```
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y_train)   # e.g.: "spam"/"not" -> 1/0
```

With hundreds of categories (zip code, product ID), one-hot would produce hundreds of columns that are almost all 0. Binary encoding is a middle ground: it turns each category into a number, then into binary digits, and each digit becomes a column. In base 2 (binary), numbers are written with only 0 and 1: 1 is 1, 2 is 10, 3 is 11, 4 is 100, 5 is 101. So category number 5 is written 101 and gets 1, 0 and 1 in three columns. For 100 categories you need only 7 columns (2^7 = 128), not 100, and it doesn't invent any order. With 7 digits of 0 and 1 you can form 128 different numbers, enough for all of them.

```
from category_encoders import BinaryEncoder
enc = BinaryEncoder(cols=["zip_code"])
df_encoded = enc.fit_transform(df["zip_code"])
```

`BinaryEncoder` comes from the `category_encoders` package, not from scikit-learn, so it might not be installed at the contest. An alternative with plain Pandas is frequency encoding: you replace the category with how many times it shows up. If 400001 appears in three rows and 700001 in one, the rows with 400001 get 3 and the one with 700001 gets 1.

```
freq = df["zip_code"].value_counts()
df["zip_code_freq"] = df["zip_code"].map(freq)
```

`value_counts()` gives, for each code, how many times it appears. `map` takes each value in the column, looks it up in that result and puts the number it finds in its place, like a dictionary lookup (Lesson 3).

Target encoding goes further: it replaces each category with the mean of the target for that category, a single column regardless of how many categories there are. Say the target is 1 if a customer bought something and 0 if not, and the customers from Cluj have the targets 1, 0, 1, 1: Cluj becomes their mean, 0.75. It helps most at very high cardinality, and it's also the most exposed to data leakage. A city that appears in a single row gets that row's own target, so the model sees the answer among its features.

```
from sklearn.preprocessing import TargetEncoder
enc = TargetEncoder()
X_train_enc = enc.fit_transform(X_train[["zip_code"]], y_train)
X_val_enc = enc.transform(X_val[["zip_code"]])
```

The `TargetEncoder` in scikit-learn protects itself against this. In `fit_transform`, each training row gets a mean computed from rows other than itself, and categories with few rows get pulled toward the overall mean. That's why you call `fit_transform` on `X_train` and only `transform` on `X_val`.

> [!NOTE]
> Ordinal, binary and target encoding are all learned only on train too, same as imputation and scaling. Otherwise information from validation/test leaks into the encoding and your score lies.

## New columns from the ones you have
Often the model learns better from a column you build yourself than from the raw data. That's feature engineering, building new features. Three patterns show up often: statistics per group, sliding windows over series, and pieces of a calendar date.

```
# mean and deviation per group, put on every row
df["city_mean"] = df.groupby("city")["area"].transform("mean")
df["city_std"] = df.groupby("city")["area"].transform("std")

# sliding window: the mean of the last 5 readings, per sensor
df = df.sort_values(["sensor", "time"])
mean_5 = lambda s: s.rolling(5, min_periods=1).mean()
df["temp_5"] = df.groupby("sensor")["temperature"].transform(mean_5)

# pieces of a calendar date
df["date"] = pd.to_datetime(df["date"])
df["month"] = df["date"].dt.month
df["weekday"] = df["date"].dt.day_of_week
```

The first part computes the mean and standard deviation of the area in each city and puts them on every row from that city, using `transform` from Lesson 4. If apartments in Cluj average 60 square meters, a 90-square-meter one in Cluj gets a `city_mean` of 60, and the model can see it's big for its city.

A sliding window is a group of neighboring rows that slides down one row at a time. For the readings 20, 22, 24, 26, 28, 30, the mean of the last 5 gives 20, 21, 22, 23, 24, 26. At the start, `min_periods=1` averages however many readings exist so far, and at the last row the window holds 22, 24, 26, 28, 30. The function written with `lambda` (Lesson 3) takes the mean, and `transform` applies it to each sensor's readings separately, so the sensors don't get mixed.

The last part turns the text into a calendar date with `pd.to_datetime` from Lesson 4 and pulls out the month (1 to 12) and the day of the week (0 is Monday, 6 is Sunday). For December 25, 2024 you get month 12 and day 2, a Wednesday. A model can't use a date directly, but it can learn from "month 12" or "day 5", for example that people buy more in December or on Saturdays.

If the group statistic is computed from the target, it's really target encoding and you learn it only on train, as above.

# @practice
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning)
- [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering)
