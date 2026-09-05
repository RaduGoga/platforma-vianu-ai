---
code: S3
duration: ~1 week
---

# @intro
Everything that follows in the curriculum is written in Python. This module is about the language, not about machine learning: skip it and you'll lose time in every later lesson looking up how to write a dictionary. If you already know Python, move through it quickly and stop only at comprehensions, unpacking, exceptions and regular expressions, which show up constantly in contest code.

## Types and variables
Python doesn't ask you to declare a type. It infers it from the value, and the type can change.

```
n = 42            # int
pi = 3.14         # float
name = "Radu"     # str
done = True       # bool
nothing = None    # the absence of a value

print(type(n), type(pi))
```

You can assign several variables at once, either with different values or the same value for all of them.

```
a, b, c = 1, 2, 3
x = y = 0
```

The short assignment operators (`+=`, `-=`, `*=`, `//=`) change the value and put it back in the same variable.

```
total = 0
for s in [1, 2, 3]:
    total += s   # total = total + s
```

For text, the f-string is the modern way to insert values. You put an `f` before the quotes and write the expression in braces.

```
score = 0.8734
print(f"score: {score:.2f}")        # score: 0.87
print(f"double: {score * 2:.3f}")   # double: 1.747
```

Division has two forms: `/` always gives a float, `//` gives integer division rounded down, and `%` gives the remainder. `int(...)` truncates toward zero, `round(...)` rounds normally, and `str(...)`/`float(...)`/`list(...)` convert explicitly between types.

```
print(7 / 2)          # 3.5
print(7 // 2)         # 3
print(7 % 2)           # 1
print(int(3.9))        # 3, truncates
print(round(3.9))      # 4, rounds
print(str(42) + "!")   # "42!"
```

> [!NOTE]
> `0`, `0.0`, `""`, `[]`, `{}`, `set()` and `None` are all "false" when you put them in an `if`. An empty list is false, everything else is true.

## The four data structures
Almost everything you write uses one of these.

- List: ordered, can be changed. `[1, 2, 3]`
- Tuple: ordered, cannot be changed. `(1, 2)`
- Dictionary: key–value pairs. `{"a": 1}`
- Set: unique values, no order. `{1, 2, 3}`

```
scores = [0.71, 0.83, 0.79]
scores.append(0.88)
print(len(scores), max(scores))
```

Besides `.append()`, lists have a few more methods you'll use constantly: `.insert(pos, val)` puts something at a given position, `.pop(pos)` removes an element (with no argument, removes the last one), `.remove(val)` removes the first occurrence of a value, `.index(val)` gives you its position.

```
scores.insert(0, 0.5)
last = scores.pop()
scores.remove(0.71)
print(scores.index(0.83))
```

Dictionaries aren't only read with `d["key"]`, which raises an error if the key is missing. `.get("key", default)` returns a default value instead.

```
grades = {
	"Radu": 4,
	"Stefan": 10,
	"Victor": 8
}
print(grades["Stefan"])   # 10
print(grades.get("Radu")) # 4
```

Dictionaries can contain other dictionaries.

```
student = {"name": "Ana", "grades": {"ro": 9, "en": 10}}
print(student["grades"]["en"])   # 10
```

Sets drop duplicate values and give you set-like operations: union, intersection, difference, useful when you compare two sets of labels or words.

```
a = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}
b = {3, 4, 5}

a.add(10)
a.discard(1)

print(a | b)   # union: {2, 3, 4, 5, 10}
print(a & b)   # intersection: {3}
print(a - b)   # difference: elements in a that aren't in b
```

A less obvious pitfall: `b = a` doesn't copy the list, it just gives the same list in memory a second name. To get a real copy, use `a.copy()` or `list(a)`.

```
a = [1, 2, 3]
b = a
b.append(4)
print(a)          # [1, 2, 3, 4], a changed too

c = a.copy()
c.append(5)
print(a)          # unchanged this time
```

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

This rule repeats identically for strings, NumPy arrays and Pandas columns. You learn it once and use it everywhere. Strings do have one quirk though: they're immutable, you can't change a character in place, you can only build a new string.

```
s = "Vianu"
s[0]        # "V", indexing works
# s[0] = "X"  # error: TypeError, strings can't be modified

s2 = "X" + s[1:]   # "Xianu", a new string
```

For special characters in strings you use escape sequences: `\n` a new line, `\t` a tab, `\\` a single backslash, `\"` a quote mark inside a double-quoted string.

```
print("first line\nsecond line")
print("column1\tcolumn2")
```

## Conditions and loops
Blocks are delimited by indentation, not braces. Four spaces, consistently.

```
for s in scores:
    if s > 0.8:
        print("good", s)
    else:
        print("weak", s)
```

Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`and`, `or`, `not`) combine like in any language, but Python writes `and`/`or`/`not` instead of `&&`/`||`/`!`.

```
score, attempts = 0.9, 3
if score > 0.8 and attempts < 5:
    print("continue")
if not (score < 0.5 or attempts == 0):
    print("worth trying")
```

A classic pitfall if you're coming from another language: `==` compares values, `is` compares whether two names point to the exact same object in memory. For `None`, always use `is`, never `==`.

```
x = None
if x is None:       # correct
    print("empty")

a = [1, 2]
b = [1, 2]
print(a == b)   # True, same values
print(a is b)   # False, different objects
```

For a short `if` that just picks between two values, the conditional expression (ternary) fits on one line.

```
label = "good" if score > 0.8 else "weak"
```

When you also need the position, use `enumerate`. When you walk two lists at once, `zip`.

```
for i, s in enumerate(scores):
    print(i, s)

for name, score in zip(["a", "b"], [0.7, 0.9]):
    print(name, score)
```

Besides `for`, there's `while`, which keeps going as long as a condition stays true. `break` exits the loop, `continue` skips the current iteration.

```
i = 0
while i < len(scores):
    if scores[i] < 0.5:
        i += 1
        continue
    if scores[i] > 0.95:
        break
    print(scores[i])
    i += 1
```

Sorting is done with `sorted()` or `.sort()`, and `key` tells it what to sort by.

```
students = [("Ana", 9.2), ("Bogdan", 8.7), ("Cris", 9.5)]
students.sort(key=lambda x: x[1], reverse=True)
print(students)   # sorted by grade, highest first
```

## Comprehensions
A short way to build one structure from another. It shows up often in contest code, so it's worth reading fluently even if you write ordinary loops at first.

```
squares = [x * x for x in range(5)]        # [0, 1, 4, 9, 16]
good = [s for s in scores if s > 0.8]      # only those above 0.8
```

Read it left to right: "take each x from range, keep it if it passes the condition, put x*x in the list". The same works for dictionaries and sets. `range(n)` doesn't actually build a list of n numbers, it produces the values one at a time, so `range(10_000_000)` doesn't hold ten million numbers in memory.

```
lengths = {c: len(c) for c in ["rf", "xgboost"]}   # {"rf": 2, "xgboost": 7}
unique_lengths = {len(c) for c in ["rf", "svm", "cnn"]}   # {2, 3}
```

A generator expression looks like a list comprehension but with round brackets instead. It doesn't build the whole structure in memory at once, it produces values one at a time, which matters for sums or large loops.

```
total = sum(x * x for x in range(1_000_000))
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

A variable created inside a function only exists there, it's local. The function can see global variables but can't change them without the `global` keyword, and needing `global` is usually a sign the function should be rewritten to take in and return values instead of touching outside state.

```
counter = 0

def wrong_increment():
    counter = counter + 1   # error: local variable used before assignment

def increment():
    global counter
    counter += 1   # works, but avoid this pattern when you can
```

Sometimes you don't know in advance how many arguments you'll get. `*args` collects positional arguments into a tuple, `**kwargs` collects named ones into a dictionary.

```
def report(*scores, **info):
    print("scores:", scores)
    print("info:", info)

report(0.8, 0.9, model="rf", seed=42)
```

A `lambda` is a small, unnamed function written on one line. You'll see it often as an argument to `sorted`, `map` or `filter`.

```
double = lambda x: x * 2
print(double(5))     # 10

print(list(map(lambda x: x * x, [1, 2, 3])))      # [1, 4, 9]
print(list(filter(lambda x: x > 0.8, scores)))    # only those above 0.8
```

In practice, a comprehension often does the job more clearly than `map`/`filter`. You'll reach for those mostly when the function already comes defined from somewhere else.

A function can call itself, recursively. Rarely needed in everyday AI code, but useful to recognize: it always needs a base case that stops the recursion.

```
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
```

A function with `yield` instead of `return` is a generator: it doesn't return all its values at once, it produces one at a time, each time it's called again through a `for` loop.

```
def even_numbers(up_to):
    for n in range(up_to):
        if n % 2 == 0:
            yield n

for n in even_numbers(10):
    print(n)
```

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

A class can inherit from another, with `class Child(Parent):`, and `super()` calls the version from the base class. You'll see this pattern constantly later on, with neural networks in PyTorch, where every model is a class that inherits from `nn.Module`.

```
class Model:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"model {self.name}"

class ModelWithSeed(Model):
    def __init__(self, name, seed):
        super().__init__(name)
        self.seed = seed

    def describe(self):
        return f"{super().describe()}, seed {self.seed}"

print(ModelWithSeed("rf", 42).describe())   # model rf, seed 42
```

Someone else's code comes in with `import`.

```
import math
from collections import Counter

print(math.sqrt(16))
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

## Errors and exceptions
Code that reads files, parses data or takes input will produce errors, guaranteed. Python calls them exceptions, and you catch them with `try`/`except` so one bad line doesn't crash the whole program.

```
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("can't divide by zero")
        return None

print(divide(10, 2))   # 5.0
print(divide(10, 0))   # message, then None
```

The exceptions you'll hit most in contests: `ValueError` (a failed conversion, like `int("abc")`), `KeyError` (a key that doesn't exist in a dictionary), `IndexError` (an index outside the list), `FileNotFoundError` (a wrong path to the data).

> [!NOTE]
> Don't catch exceptions with a bare `except:`. It hides every mistake, including the ones you should actually see. Catch the exact type you expect, for example `except ValueError:`.

`finally` always runs, with or without an exception, good for cleanup. `assert` quickly checks an assumption and stops the program with a clear message if it's false, useful for catching bugs early instead of at the end of a run.

```
assert len(X) == len(y), "X and y must have the same length"
```

## Text and regular expressions
Many problems, especially in NLP, need text cleaned up before anything else. Strings have built-in methods for this.

```
s = "  The Second WORLD War  "
print(s.strip())          # removes the spaces at both ends
print(s.lower())          # lowercase
print(s.split())          # ['The', 'Second', 'WORLD', 'War']
print("-".join(["a", "b", "c"]))   # "a-b-c"
print(s.replace("WORLD", "world"))
```

For patterns more complicated than `.replace()`, the `re` module matches text against regular expressions.

```
import re

text = "contact: ana@example.com or 0722 123 456"
emails = re.findall(r"[\w.]+@[\w.]+", text)
print(emails)    # ['ana@example.com']

cleaned = re.sub(r"\d+", "", text)   # removes every digit
```

> [!NOTE]
> `re` is worth learning gradually, not all at once. At first just remember `findall` (finds every match) and `sub` (replaces), and look up the rest when you need it.

## Files and data formats
Reading and writing a text file use `with`, which closes it on its own even if an error comes up.

```
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("first line\n")

with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

Always pass `encoding="utf-8"`. Without it, on Windows, accented characters get read wrong.

Contest data rarely comes as plain text. It's usually CSV or JSON, and Python has standard modules for both, even before you get to Pandas.

```
import csv

with open("scores.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["score"])
```

```
import json

data = {"model": "rf", "score": 0.87}
with open("result.json", "w", encoding="utf-8") as f:
    json.dump(data, f)

with open("result.json", encoding="utf-8") as f:
    loaded = json.load(f)
```

For file paths, `pathlib` is clearer than gluing strings together with `+`.

```
from pathlib import Path

folder = Path("data")
file = folder / "train.csv"
print(file.exists())
```

## Random and reproducibility
A lot of things in AI look random: splitting data, initializing a model, shuffling a training set. The `random` module controls this, and a `seed` makes results repeatable.

```
import random

random.seed(42)
print(random.random())        # always the same value, with the same seed
print(random.randint(1, 10))
random.shuffle(scores)        # shuffles the list in place
```

> [!NOTE]
> Set `random.seed(...)` once, at the start of the script. Without it, running the code twice gives different results, which makes it impossible to fairly compare two ideas.
