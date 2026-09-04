---
code: S3
duration: ~1 week
---

# @intro
Everything that follows in the curriculum is written in Python. This module is about the language, not about machine learning: skip it and you'll lose time in every later lesson looking up how to write a dictionary. If you already know Python, move through it quickly and stop only at comprehensions and unpacking, which show up constantly in contest code.

## Types and variables
Python doesn't ask you to declare types. It infers them from the value, and the type can change. That's convenient, but it means type errors show up at runtime, not before.

```
n = 42            # int
pi = 3.14         # float
name = "Radu"     # str
done = True       # bool
nothing = None    # the absence of a value

print(type(n), type(pi))
```

For text, the f-string is the modern way to insert values. You put an `f` before the quotes and write the expression in braces.

```
score = 0.8734
print(f"score: {score:.2f}")        # score: 0.87
print(f"double: {score * 2:.3f}")   # double: 1.747
```

## The four data structures
Almost everything you write uses one of these. Picking the right one simplifies the rest of your code.

- List: ordered, can be changed. `[1, 2, 3]`
- Tuple: ordered, cannot be changed. `(1, 2)`
- Dictionary: key–value pairs. `{"a": 1}`
- Set: unique values, no order. `{1, 2, 3}`

```
scores = [0.71, 0.83, 0.79]
scores.append(0.88)
print(len(scores), max(scores))

model = {"name": "rf", "depth": 8}
print(model["name"])
model["seed"] = 42

unique = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}
```

> [!NOTE]
> Search a set or a dictionary, not a list. Checking `x in list` walks every element; `x in set` is nearly instant. On tens of thousands of elements you feel the difference.

## Indexing and slices
Indexing starts at zero. Negative indices count from the end. The slice `a:b` includes the start and excludes the end.

```
v = [10, 20, 30, 40, 50]

v[0]      # 10, the first
v[-1]     # 50, the last
v[1:3]    # [20, 30], from 1 up to but not including 3
v[:2]     # [10, 20]
v[::2]    # [10, 30, 50], every second one
```

This rule repeats identically for strings, NumPy arrays and Pandas columns. You learn it once and use it everywhere.

## Conditions and loops
Blocks are delimited by indentation, not braces. Four spaces, consistently.

```
for s in scores:
    if s > 0.8:
        print("good", s)
    else:
        print("weak", s)
```

When you also need the position, use `enumerate`. When you walk two lists at once, `zip`.

```
for i, s in enumerate(scores):
    print(i, s)

for name, score in zip(["a", "b"], [0.7, 0.9]):
    print(name, score)
```

## List comprehensions
A short way to build one list from another. It shows up often in contest code, so it's worth reading fluently even if you write ordinary loops at first.

```
squares = [x * x for x in range(5)]        # [0, 1, 4, 9, 16]
good = [s for s in scores if s > 0.8]      # only those above 0.8
```

Read it left to right: "take each x from range, keep it if it passes the condition, put x*x in the list". It works for dictionaries too.

```
lengths = {c: len(c) for c in ["rf", "xgboost"]}   # {"rf": 2, "xgboost": 7}
```

## Functions
A function groups code you repeat. Arguments can have default values, and the defaults always go last.

```
def normalize(v, low=0.0, high=1.0):
    lo, hi = min(v), max(v)
    if hi == lo:
        return [low] * len(v)
    return [low + (x - lo) / (hi - lo) * (high - low) for x in v]

print(normalize([2, 4, 6]))    # [0.0, 0.5, 1.0]
```

Unpacking lets you assign several values at once. You'll see it constantly when splitting data.

```
a, b = 1, 2
X_tr, X_val, y_tr, y_val = split(X, y)   # four values in one go
```

> [!NOTE]
> Never use a list or a dictionary as an argument's default value. It's created once, when the function is defined, and stays shared between calls. Use `None` and create the value inside.

## Classes and modules
A class keeps data and functions together. You won't write many, but every library you use is built from classes, so you need to understand what happens when you write `model.fit(X, y)`.

```
class Mean:
    def __init__(self):
        self.value = None

    def fit(self, y):
        self.value = sum(y) / len(y)
        return self

    def predict(self, n):
        return [self.value] * n

m = Mean().fit([1, 2, 3])
print(m.predict(2))    # [2.0, 2.0]
```

That's exactly the scikit-learn pattern: `fit` learns and remembers, `predict` uses what it learned.

Someone else's code comes in with `import`.

```
import math
from collections import Counter

print(math.sqrt(16))
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

## Files
Reading and writing use `with`, which closes the file on its own even if an error comes up.

```
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("first line\n")

with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

Always pass `encoding="utf-8"`. Without it, on Windows, accented characters get read wrong.

# @takeaways
- Pick the structure by what you need: list for order, dictionary for lookup by key, set for uniqueness.
- Slices `a:b` include the start and exclude the end, the same way everywhere in Python.
- Comprehensions shorten loops that build lists; they're worth reading fluently.
- The `fit` and `predict` pattern in classes is exactly the one scikit-learn uses.
- `with open(...)` closes the file for you; always pass `encoding="utf-8"`.

# @pitfalls
- Use a tuple when you want something that doesn't change, a list when you want to append.
- Search with `in` on a set or a dictionary, not on a large list.
- Use `None` as the default and create the list or dictionary inside the function.
- Indent consistently with four spaces, never mixed with tabs.
- Pass `encoding="utf-8"` for any file with accented characters.

# @practice
- Write a function that takes a list of numbers and returns the mean, the median and the maximum.
- Count the words in a text with a dictionary, then rewrite the solution with `Counter`.
- Rewrite three `for` loops you've already written as list comprehensions.
