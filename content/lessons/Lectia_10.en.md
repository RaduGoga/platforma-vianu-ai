---
code: S14
duration: ~1 week
---

# @intro
Not every problem has labels, meaning the correct answer for each row. Sometimes you just want to see the structure in the data: natural groups, outliers (values that break the pattern, Lesson 5), a two-dimensional projection you can draw. That's unsupervised learning: the model finds patterns without being told the correct answer. It's useful both on its own and as a preparation step before a supervised model.

## Supervised vs unsupervised
In supervised learning you had (example, label) pairs and learned to predict the label. In unsupervised learning you only have the examples, no answer. The model looks for structure on its own: which points are similar, along which directions the data varies most. You can't measure correctness as simply, because you have nothing to compare against.

An example: an online shop knows, for each customer, how many lei they spent this month and how many times they bought something, but no column says what kind of customer they are. An unsupervised algorithm can find groups on its own, for example customers who buy often and spend little and customers who buy rarely and spend a lot. That's the clustering from Lesson 1.

As in Lesson 5, each row is a point, and two rows that are alike are two points close together. The distance between them is computed with the Pythagorean theorem, as there: you add up the squared differences on each column and take the square root.

## K-Means: grouping around centers
K-Means splits the data into k groups, each with a center. A group's center is the mean of its points, column by column. Each point is assigned to the nearest center, then the centers move to the mean of their points, and it repeats until it stabilizes. Simple, fast, but you have to choose k yourself and it's sensitive to scale.

An example on a single column, so you can follow it with a pencil: the points 1, 2, 3, 10, 11, 12 and k = 2.

1. Start with two centers placed at random, say at 1 and at 2.
2. Each point goes to the nearest center, so the groups are {1} and {2, 3, 10, 11, 12}.
3. Move each center to the mean of its group: the first stays at 1, the second moves to (2 + 3 + 10 + 11 + 12) / 5 = 7.6.
4. Reassign the points. Point 2 is at distance 1 from the first center and 5.6 from the second, so it moves to the first, and so does 3. The groups become {1, 2, 3} and {10, 11, 12}.
5. Move the centers again, to (1 + 2 + 3) / 3 = 2 and to (10 + 11 + 12) / 3 = 11.
6. Reassign, and no point changes group, so you stop.

> [!NOTE]
> K-Means measures distances, so scaling is mandatory. Without it, the column with the largest numbers dominates the grouping and the rest doesn't count.

```
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4, n_init=10, random_state=0)
labels = km.fit_predict(X_scaled)
```

`X_scaled` is your features (the input columns) after scaling, for example with `StandardScaler().fit_transform(X)` (Lesson 5). `n_clusters=4` is k. An unlucky start for the centers can give bad groups, so `n_init=10` runs the algorithm from 10 different starts and keeps the best one. `random_state=0` makes the starts the same on every run. `fit_predict` does `fit` and `predict` in one go: it finds the centers and gives you each row's group, a number from 0 to 3. The numbers are just names: group 3 isn't better than group 1.

## The elbow method and the silhouette score
How do you choose k? The elbow method: you run it for several values of k and plot how tight the groups are. Where the curve bends like an elbow, you have a reasonable k.

You measure how tight the groups are with the inertia: the sum of the squared distances from each point to its center. In the example above, with centers 2 and 11, the distances are 1, 0, 1, 1, 0 and 1, so the inertia is 1² + 0² + 1² + 1² + 0² + 1² = 4. On the plot, k goes on the horizontal axis and the inertia on the vertical one.

```
import numpy as np
from sklearn.cluster import KMeans

points = np.array([[1], [2], [3], [10], [11], [12]])   # one column
for k in range(1, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(points)
    print(k, round(km.inertia_, 1))
# 1 125.5
# 2 4.0
# 3 2.5
# 4 1.0
```

Each point is a row with a single column, hence the double brackets, and `inertia_` is the inertia computed during `fit`. From k = 1 to k = 2 the inertia drops from 125.5 to 4, then barely moves, so the elbow is at k = 2. Don't pick the k with the lowest inertia: it always goes down as k grows, all the way to 0, when every point is its own center.

The silhouette score is a numeric alternative, it measures how well the groups separate. For each point you compare two average distances: a, to the other points in its own group, and b, to the points in the nearest other group.

> [!FORMULA]
> s = (b - a) / max(a, b)
> s comes out between -1 and 1. Close to 1, the point is much closer to its own group than to the other. Close to 0, it sits on the border between two groups. Negative, it's probably in the wrong group. The silhouette score is the mean of s over all the points.

For point 1 in the example, a = (1 + 2) / 2 = 1.5, the average distance to 2 and 3, and b = (9 + 10 + 11) / 3 = 10, the average distance to 10, 11 and 12. So s = (10 - 1.5) / 10 = 0.85. The mean over all 6 points also comes out at 0.85.

```
from sklearn.metrics import silhouette_score

for k in range(2, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=0)
    labels = km.fit_predict(points)
    print(k, round(silhouette_score(points, labels), 2))
# 2 0.85
# 3 0.5
# 4 0.17
```

You pick the k with the highest score, here k = 2 again. The loop starts at 2 because the silhouette score needs at least two groups.

## DBSCAN and hierarchical clustering
DBSCAN groups by density: where points are packed together they form a group, and isolated points it marks as noise (here, points that don't belong to any group). Advantages: you don't have to give the number of groups and it finds the outliers on its own. It depends on two hyperparameters, the neighborhood radius and the minimum number of neighbors, which you have to tune.

In scikit-learn they're called `eps` and `min_samples`. Two points are neighbors if the distance between them is at most `eps`. A point with at least `min_samples` points within its radius, counting itself, sits at the core of a group, and its neighbors join the same group. Whatever doesn't end up in any group is noise.

```
from sklearn.cluster import DBSCAN

points = [[1], [2], [3], [10], [11], [12], [30]]
db = DBSCAN(eps=1.5, min_samples=2)
print(db.fit_predict(points))   # [ 0  0  0  1  1  1 -1]
```

Points 1, 2 and 3 are neighbors in a chain and form group 0, and 10, 11 and 12 form group 1. Point 30 has no neighbors and gets -1, the label for noise. To tune `eps`, try several values: here, with 0.5 everything would be noise, and with 20 it would all be one group. Scale the data first, as with K-Means.

Hierarchical clustering builds a tree of groups, from each point separate up to one big group. You draw it as a dendrogram and cut it at the level that gives you the number of groups you want. Useful when you want to see structure at several levels.

You start with each point as its own group and, at each step, merge the two closest groups, until only one is left. The dendrogram draws these merges like a family tree: the points are at the bottom, and each merge is a horizontal line at the height of the distance between the two groups. If you cut the drawing with a horizontal line, each branch you cut is a group.

```
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
import matplotlib.pyplot as plt

points = [[1], [2], [3], [10], [11], [12]]
Z = linkage(points, method="average")   # all the merges, in order
dendrogram(Z)
plt.show()
print(fcluster(Z, t=5, criterion="distance"))   # [1 1 1 2 2 2]
```

With `method="average"`, the distance between two groups is the average distance between their points. At the bottom, the points show up by their position in the list, from 0 to 5. First 1 merges with 2 and 10 with 11, at height 1, then 3 and 12 join them at 1.5, and the two big groups only merge at 9. `fcluster` cuts at height `t=5` and gives each point's group, numbered from 1. scipy gets installed along with scikit-learn.

## PCA: dimensionality reduction
Here a dimension means a column: a row with 2 columns is a point in the plane, and one with 100 columns is a point in a space with 100 axes, which you can no longer draw. In NumPy (Lesson 4) the word meant something else: there, a table was an array with 2 dimensions.

When you have tens or hundreds of columns, it's hard to visualize and models suffer (the curse of dimensionality). PCA (principal component analysis) finds the directions the data varies most along and projects onto them, keeping as much information as possible in fewer dimensions.

The curse of dimensionality: with each extra column, the points get sparser. To cover a line segment with points 0.1 apart you need 10 points. For a square you need 100, for a cube 1000, and for 10 columns ten billion (10 to the power of 10). With hundreds of columns and a few thousand rows, your data is sparse points in an almost empty space, and models easily find patterns that are just chance.

An example in 2D: in a class of students, height and weight go up together, so on a scatter plot the points lie close to a slanted line. Along the line, the direction says roughly "how big the student is", and that's where the data varies most. Along the perpendicular direction, "heavier or lighter than you'd expect for the height", the points stray only a little.

"Varies most" means the values are most spread out. Spread is measured with the variance, the square of the standard deviation from Lessons 4 and 5: the mean of the squared distances to the mean. The lists 4, 5, 6 and 0, 5, 10 have the same mean, 5, but very different variances: (1 + 0 + 1) / 3 ≈ 0.67 and (25 + 0 + 25) / 3 ≈ 16.7.

> [!NOTE]
> The variance here is a different thing from a model's variance in Lessons 1 and 8 (how much the model changes when you change the training data). In PCA, variance is just how spread out the values are.

The directions PCA finds are called components. Each component is a new column computed from the old ones: the first one, for the students, goes up when both height and weight go up. Projecting a point onto a component means keeping only where it falls along that direction, like its shadow on a line. With the first component alone, each student is described by one number instead of two.

PCA tells you how much of the variance you keep with each component. You can go from 100 columns down to 10 that keep, say, 95% of the information. It's useful as preprocessing before a model, as well as for drawings. It needs scaled data: otherwise a column in thousands of lei looks like the most spread out one just because of its unit, and the first component would be almost entirely that column.

```
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# height (cm) and weight (kg) for 6 students
students = np.array([[150, 45], [155, 52], [160, 50],
                     [170, 63], [175, 66], [185, 72]])
students_scaled = StandardScaler().fit_transform(students)
p = PCA().fit(students_scaled)
print(p.explained_variance_ratio_.round(2))   # [0.99 0.01]
```

`explained_variance_ratio_` is the explained variance: the share of the total spread that each component captures. The first captures 99%, the second 1%, so you can keep only the first.

```
from sklearn.decomposition import PCA
p = PCA(n_components=0.95).fit(X_scaled)   # keep 95% of the variance
X_reduced = p.transform(X_scaled)
print(X_reduced.shape[1], "components")
```

`n_components=0.95` asks PCA for as many components as it takes to reach 95% of the variance, while a whole number, say 2, asks for exactly that many. `fit` finds the directions, `transform` computes each row's values along them, and `X_reduced.shape[1]` is the number of columns left. Before a supervised model, `fit` only on the training data, as with scaling (Lesson 5), and apply `transform` to the validation and test data.

## t-SNE and UMAP: for visualization only
A 2D projection turns each row, with all its columns, into a point with just two coordinates, x and y, that you can put on a scatter plot (Lesson 4). PCA with `n_components=2` makes a 2D projection too.

t-SNE and UMAP make 2D projections that look nice and bring out groups. They're excellent for looking at the structure of the data. But they have an important catch: the distances and group sizes in the drawing aren't trustworthy. Two groups close together in the picture aren't necessarily close in reality.

The reason: t-SNE and UMAP only try to keep neighbors together. Rows that are alike end up close in the drawing, but the large distances between groups aren't preserved.

```
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

X_2d = TSNE(n_components=2, random_state=0).fit_transform(X_scaled)
print(X_2d.shape)   # (number of rows, 2)
plt.scatter(X_2d[:, 0], X_2d[:, 1], s=5)
plt.show()
```

`X_2d[:, 0]` is every row of column 0, meaning each point's x, and `s=5` makes the points small. t-SNE is in scikit-learn, but it gets slow on tens of thousands of rows, so plot a sample. UMAP lives in a separate package, umap-learn (`pip install umap-learn`, then `import umap`), which may be missing at the contest. t-SNE doesn't even have `transform` for new data, so you can't apply it to the test set.

> [!NOTE]
> Use t-SNE and UMAP to look, not to draw hard conclusions. For trustworthy preprocessing, PCA is the safe choice.

# @practice
- Apply K-Means and DBSCAN to the same dataset and compare the groups found.
- Reduce to 2D with PCA and with UMAP (or with t-SNE, if umap-learn isn't installed) and see what differs between them.
- Use the elbow method to choose k on a dataset and justify the choice.
