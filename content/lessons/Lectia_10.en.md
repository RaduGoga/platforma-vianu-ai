---
code: S14
duration: ~1 week
---

# @intro
Not every problem has labels. Sometimes you just want to see the structure in the data: natural groups, outliers, a two-dimensional projection you can draw. That's unsupervised learning: the model finds patterns without being told the correct answer. It's useful both on its own and as a preparation step before a supervised model.

## Supervised vs unsupervised
In supervised learning you had (example, label) pairs and learned to predict the label. In unsupervised learning you only have the examples, no answer. The model looks for structure on its own: which points are similar, along which directions the data varies most. You can't measure correctness as simply, because you have nothing to compare against.

## K-Means: grouping around centers
K-Means splits the data into k groups, each with a center. Each point is assigned to the nearest center, then the centers move to the mean of their points, and it repeats until it stabilizes. Simple, fast, but you have to choose k yourself and it's sensitive to scale.

How do you choose k? The elbow method: you run it for several values of k and plot how tight the groups are. Where the curve bends like an elbow, you have a reasonable k. The silhouette score is a numeric alternative, it measures how well the groups separate.

> [!NOTE]
> K-Means measures distances, so scaling is mandatory. Without it, the column with the largest numbers dominates the grouping and the rest doesn't count.

```
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4, n_init=10, random_state=0)
labels = km.fit_predict(X_scaled)
```

## DBSCAN and hierarchical clustering
DBSCAN groups by density: where points are packed together they form a group, and isolated points it marks as noise. Advantages: you don't have to give the number of groups and it finds the outliers on its own. It depends on two parameters, the neighborhood radius and the minimum number of neighbors, which you have to tune.

Hierarchical clustering builds a tree of groups, from each point separate up to one big group. You draw it as a dendrogram and cut it at the level that gives you the number of groups you want. Useful when you want to see structure at several levels.

## PCA: dimensionality reduction
When you have tens or hundreds of columns, it's hard to visualize and models suffer (the curse of dimensionality). PCA (principal component analysis) finds the directions the data varies most along and projects onto them, keeping as much information as possible in fewer dimensions.

PCA tells you how much of the variance you keep with each component. You can go from 100 columns down to 10 that keep, say, 95% of the information. It's useful as preprocessing before a model, not just as a drawing. It needs scaled data.

```
from sklearn.decomposition import PCA
p = PCA(n_components=0.95).fit(X_scaled)   # keep 95% of the variance
X_reduced = p.transform(X_scaled)
print(X_reduced.shape[1], "components")
```

## t-SNE and UMAP: for visualization only
t-SNE and UMAP make 2D projections that look nice and bring out groups. They're excellent for looking at the structure of the data. But they have an important catch: the distances and group sizes in the drawing aren't trustworthy. Two groups close together in the picture aren't necessarily close in reality.

> [!NOTE]
> Use t-SNE and UMAP to look, not to draw hard conclusions. For trustworthy preprocessing, PCA is the safe choice.

# @takeaways
- Unsupervised = finding structure with no labels (groups, directions of variation).
- K-Means needs you to choose k and scaled data; pick k with the elbow or the silhouette.
- DBSCAN finds the number of groups and the outliers on its own, by density.
- PCA reduces dimensions while keeping variance; good as preprocessing too.
- t-SNE and UMAP are for looking only, the distances in them aren't trustworthy.

# @pitfalls
- Scale the data before K-Means, otherwise the column with big numbers dominates everything.
- Read t-SNE as a map of neighbourhoods, not as real distances.
- Choose k with the elbow method or the silhouette score.

# @practice
- Apply K-Means and DBSCAN to the same dataset and compare the groups found.
- Reduce to 2D with PCA and with UMAP and see what differs between them.
- Use the elbow method to choose k on a dataset and justify the choice.
