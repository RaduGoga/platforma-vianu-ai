---
code: S6
duration: ~2 weeks
---

# @intro
Before you train anything, look at the data. At the distributions, at what's missing, at how the columns are scaled. It sounds dull, but half the gain comes from here, not from the model you pick. This step is called EDA, exploratory data analysis, and it's the first thing you do on any new problem.

## What you look for when you look at data
EDA means asking the data simple questions and looking at the answer before you draw any conclusion. How many rows and columns there are. What type each column is. What the target looks like, meaning what you want to predict. What's missing and how much.

Plot the distribution of each numeric column with a histogram. You see straight away whether it's symmetric, whether it has a long tail, whether it has impossible values (an age of 200, a negative price). Those are signs of errors in the data that you catch by eye.

```
df["age"].hist(bins=30)
df["target"].value_counts()     # how many examples in each class
```

## Imbalanced classes: why it matters early
If you predict a class that shows up in 2% of cases (fraud, a rare disease), a model that always says no gets 98% accuracy and is completely useless. That's why you look at class balance from the start: it changes which metric you use and how you split the data.

> [!NOTE]
> When a class is rare, accuracy lies. Keep it in mind for the evaluation module: you'll need precision, recall and F1, not plain accuracy.

## Correlations: which columns say the same thing
Correlation measures how much two columns move together, from -1 (opposite) through 0 (not at all) up to 1 (same trend). Two nearly identical columns tell you something: maybe one is derived from the other, maybe you can drop one without losing information.

```
df.corr(numeric_only=True)     # the correlation matrix between columns
```

Correlation isn't causation. Two things can rise together without one causing the other. It's just a hint of where to look, not a conclusion.

## Missing values: first why, then how
Before you fill a missing value, ask yourself why it's missing. Sometimes the gap is a collection error. Other times the gap is information itself: an empty income field can mean the person refused to answer, which is meaningful. In that case, add a separate column that flags the gap.

Filling (imputing) is done with the mean, the median or the most frequent value, or with a model. The median is safer than the mean when there are outliers, because it isn't dragged by the extreme values.

```
from sklearn.impute import SimpleImputer
imp = SimpleImputer(strategy="median").fit(X_train)
X_train = imp.transform(X_train)
X_val = imp.transform(X_val)    # the same parameters, learned on train
```

## Scaling: why and how
Many models measure distances (kNN, K-Means) or use gradients (regression, neural nets). For them, a column with large values (income, in thousands) dominates one with small values (age, in tens) purely by scale, not by importance. Scaling brings them to the same measure.

> [!FORMULA]
> z = (x - μ) / σ
> Standardization: you subtract the mean μ and divide by the standard deviation σ. The result has mean 0 and standard deviation 1.

Min-max normalization, on the other hand, brings the values into the 0 to 1 range. Standardization is used more often. What matters isn't which, but the rule below.

> [!NOTE]
> The golden rule, true for all preprocessing: learn the parameters (mean, deviation, median) only on the training set, then apply them to validation and test. Never the other way. Otherwise the test leaks into training and your score is a lie.

```
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train)      # learn μ and σ on TRAIN
X_train = sc.transform(X_train)
X_val = sc.transform(X_val)             # apply the same μ and σ
```

## Categorical variables
A model wants numbers, but many columns are categories: city, color, type. You can't hand them over directly as text, and you can't number them 1,2,3 at random either, because the model would think 3 is bigger than 1, which makes no sense for colors.

One-hot encoding fixes this: it turns each category into a separate column of 0s and 1s. Red becomes [1,0,0], green [0,1,0]. No category is bigger than another.

```
pd.get_dummies(df, columns=["city", "color"])
```

# @takeaways
- EDA means looking at the data (distributions, gaps, class balance) before any model.
- Imbalanced classes change the metric and the way you split the data.
- Ask why a value is missing before you fill it; sometimes the gap is information.
- Scaling brings columns to the same measure for distance-based or gradient-based models.
- Learn the preprocessing parameters only on train, apply them to val/test.

# @pitfalls
- Learn preprocessing parameters only on the training set, after the split.
- Impute missing values with statistics computed only on training data.
- Use one-hot for categories with no order; numbering 1, 2, 3 invents an order.

# @practice
- Make a completeness report on a dataset and decide which columns you keep.
- Compare three imputation strategies (mean, median, most frequent) on the same problem.
- Standardize correctly: fit on train, transform on val, and check the means on train are close to 0.
