---
code: S6
duration: ~2 weeks
---

# @intro
Before you train anything, look at the data. At the distributions, at what's missing, at how the columns are scaled. This stage is called EDA, exploratory data analysis, and it's the first thing you do on any new problem.

## What you're looking for
EDA means asking data simple questions and looking at the answer before drawing any conclusion. How many rows and columns there are. What type each column has. What the target looks like, meaning what you want to predict. What's missing and how much.

Plot the distribution of every numeric column with a histogram. You see right away if it's symmetric, if it has a long tail, if it has impossible values (an age of 200, a negative price). Those are signs of data errors you catch by eye.

```
df["age"].hist(bins=30)
df["target"].value_counts()     # how many examples per class
```

## Outliers: values that don't fit
An outlier is a value much larger or smaller than the rest of the column. It can be an error, like an age of 200, or it can be exactly what you're looking for, like an anomaly in a sensor. You spot it fastest on a box plot. The classic rule counts a value as an outlier if it's more than 1.5 IQR below the first quartile or above the third, where IQR is the distance between quartile 1 and quartile 3.

```
q1, q3 = df["price"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["price"] < low) | (df["price"] > high)]
print(len(outliers))
```

What you do with them depends on the cause. You fix or drop errors. Real but extreme values you can cap at a limit with `clip`, and a column with a long right tail, like prices or incomes, you bring to a more balanced shape with `np.log1p`.

```
df["price"] = df["price"].clip(upper=high)
df["income_log"] = np.log1p(df["income"])
```

## Imbalanced classes: why it matters early
If you're predicting a class that shows up in 2% of cases (fraud, a rare disease), a model that always says no gets 98% accuracy and is completely useless. That's why you check class balance from the start: it changes which metric you use and how you split the data.

> [!NOTE]
> When a class is rare, accuracy lies. Keep this for the evaluation module: you'll need precision, recall and F1, not plain accuracy.

## Correlations: which columns say the same thing
Correlation measures how much two columns move together, from -1 (inverse) through 0 (not at all) to 1 (identical trend). Two nearly identical columns tell you something: maybe one is derived from the other, maybe you can drop one without losing information.

```
df.corr(numeric_only=True)     # correlation matrix between columns
```

By default it's Pearson correlation, which only catches linear relationships. `df.corr(method="spearman", numeric_only=True)` also catches columns that rise together without lying on a straight line.

Correlation doesn't mean causation. Two things can rise together without one causing the other. It's a hint of where to look, not a conclusion.

## Missing values: why first, then how
Before you fill in a missing value, ask why it's missing. Sometimes the gap is a collection error. Sometimes the gap is information itself: an empty income field can mean the person refused to answer, which is meaningful on its own. In that case, add a separate column that flags the gap.

Filling in (imputation) uses the mean, the median or the most frequent value, or a model. The median is safer than the mean when there are outliers, because it isn't pulled by extreme values.

In the examples here, `X_train` is the part of the data you train on and `X_val` the part you check the model on. You'll see how to get them in the next lesson.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # same parameters, learned on train
```

`SimpleImputer` adds the column that flags the gap by itself, if you give it `add_indicator=True`.

In time series, like a sensor's readings, a gap is usually filled with the last known value. You sort by time first, then use `ffill`.

```
df = df.sort_values("time")
df["temperature"] = df["temperature"].ffill()
```

## Scaling: which method and when
Many models measure distances (kNN, K-Means) or use gradients (regression, neural networks). For them, a column with large values (income, in thousands) dominates one with small values (age, tens) purely by scale, not by importance. Scaling brings them to the same measure. Decision trees and Random Forest don't need it, because they split the data on thresholds. There are two common methods, and the choice depends on the shape of the data.

> [!FORMULA]
> z = (x - μ) / σ
> Standardization: subtract the mean μ and divide by the standard deviation σ. The result has mean 0 and deviation 1. Use it as the default, for regression, SVM and neural networks, when the data doesn't have extreme outliers.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)   # learns μ and σ on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)          # applies the same μ and σ
```

> [!FORMULA]
> x' = (x - min) / (max - min)
> Min-max normalization: brings values into the 0 to 1 range. Use it when you need a fixed range, for example a neural network expecting input between 0 and 1, or images (pixels, already in 0-255). Sensitive to outliers: a single extreme point ruins the minimum or maximum for the rest of the column.

```
from sklearn.preprocessing import MinMaxScaler
sc = MinMaxScaler().fit(X_train)   # learns min and max on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

When a column has outliers, a third option, `RobustScaler`, is safer: it subtracts the median and divides by the IQR, so one extreme point doesn't wreck the scale for everything else.

```
from sklearn.preprocessing import RobustScaler
sc = RobustScaler().fit(X_train)   # learns the median and IQR on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)
```

> [!NOTE]
> The basic rule of preprocessing: learn the parameters (mean, deviation, median, min, max) only on the training set, then apply them to validation and test. Never the other way around. Otherwise test leaks into training and your score is a lie.

## Categorical variables
A model wants numbers, but many columns are categories: city, color, type. Which encoding you pick depends on how many categories there are and whether they have a natural order.

With no order and few categories, one-hot encoding is the choice: it turns each category into a separate column of 0 and 1. Red becomes [1,0,0], green [0,1,0]. No category outranks another.

```
pd.get_dummies(df, columns=["city", "color"])
```

With a natural order (small, medium, large), ordinal encoding maps them to numbers that keep the order, 0, 1, 2. It works well especially with tree-based models, which split on thresholds anyway.

```
from sklearn.preprocessing import OrdinalEncoder
enc = OrdinalEncoder(categories=[["small", "medium", "large"]])
df["size_code"] = enc.fit_transform(df[["size"]])
```

Label encoding does the same thing, one integer per category, but without you asking for the order, it comes from alphabetical order or the order of appearance. It's meant for the target y, not for input columns: on an input column with no real order, the numbers invent a false order that a linear model takes at face value.

```
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y_train)   # e.g.: "spam"/"not" -> 1/0
```

With hundreds of categories (zip code, product ID), one-hot would produce hundreds of near-empty columns. Binary encoding is a middle ground: it turns each category into a number, then into binary digits, and each digit becomes a column. For 100 categories you need only 7 columns (2^7 = 128), not 100, and it doesn't invent any order.

```
from category_encoders import BinaryEncoder
enc = BinaryEncoder(cols=["zip_code"])
df_encoded = enc.fit_transform(df["zip_code"])
```

`BinaryEncoder` comes from the `category_encoders` package, not from scikit-learn, so it might not be installed at the contest. An alternative with plain Pandas is frequency encoding: you replace the category with how many times it shows up.

```
freq = df["zip_code"].value_counts()
df["zip_code_freq"] = df["zip_code"].map(freq)
```

Target encoding goes further: it replaces each category with the mean of the target for that category, a single column regardless of how many categories there are. The most powerful option at very high cardinality, but also the most exposed to data leakage.

```
from sklearn.preprocessing import TargetEncoder
enc = TargetEncoder()
X_train_enc = enc.fit_transform(X_train[["zip_code"]], y_train)
X_val_enc = enc.transform(X_val[["zip_code"]])
```

> [!NOTE]
> Ordinal, binary and target encoding are all learned only on train too, same as imputation and scaling. Otherwise information from validation/test leaks into the encoding and your score lies.

## New columns from the ones you have
Often the model learns better from a column you build yourself than from the raw data. That's feature engineering. Three patterns show up often: statistics per group, sliding windows over series, and pieces of a calendar date.

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
df["weekday"] = df["date"].dt.dayofweek
```

If the group statistic is computed from the target, it's really target encoding and you learn it only on train, as above.

# @practice
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning)
- [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering)
