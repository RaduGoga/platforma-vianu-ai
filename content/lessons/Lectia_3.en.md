---
code: S3
duration: ~1 week
---

# @intro
Everything that follows in the curriculum is written in Python. This lesson is about the language, not about machine learning: skip it and you'll lose time in every later lesson looking up how to write a dictionary. If you've never programmed, read it in order and run every code block in a Jupyter Lab notebook (Lesson 1), then change a value and see what changes. If you already know Python, move through it quickly and stop only at comprehensions, unpacking, exceptions and regular expressions, which show up constantly in contest code.

## Your first lines of code
A notebook is made of cells (Lesson 1). You write code in a cell and run it with Shift+Enter: Python runs the lines one at a time, from top to bottom, and shows you the result right under the cell.

```
print("Hello, Vianu")   # Hello, Vianu
print(2 + 3)            # 5
# this line is a comment, Python skips it
print(6 * 7)            # 42
```

Three lines show up under the cell, in order: `Hello, Vianu`, `5` and `42`. `print` is a function: a named command that you put to work (you call it) by writing a value in parentheses after it. The value in the parentheses is called an argument, and `print` shows it under the cell. Text written between quotes appears exactly as written. For `2 + 3`, Python does the math first and shows the result. In code, `*` means multiply and `/` means divide.

Everything after `#` on a line is a comment: a note for people, which Python doesn't run. In this lesson, the comment at the end of a line shows you what that line prints, so you can compare it with what you see under the cell.

If the last line of a cell is just a value, without `print`, Jupyter shows it too. The other lines without `print` don't show up, which is why the examples here use `print` everywhere. If you get something wrong (say you forget a quote mark), Python stops and shows an error message. It happens to everyone, and the Errors and exceptions section shows you how to read it.

## Types and variables
The line `n = 42` puts the value 42 under the name `n`. From then on, wherever you write `n`, Python uses 42. A name you give a value so you can use it later is called a variable, and the step where you give it the value, with `=`, is called assignment. Here `=` isn't the equals sign from math: it means "put the value on the right into the name on the left".

Every value has a type, which says what kind of value it is. The basic types:

- `int`: a whole number, like 42, 0 or -7.
- `float`: a number with decimals, written with a point, not a comma: 3.14, 0.5.
- `str` (short for string, a sequence of characters): text, written between quotes, like `"Radu"`.
- `bool`: a truth value, `True` or `False`.
- `None`: "nothing yet", the value you put in a variable when you don't have anything to put in it yet.

In other programming languages you write the type before the name, which is called declaring it. Python doesn't ask you to declare a type. It infers it from the value, and the type can change: after `n = 42` you can write `n = "Ana"`, and `n` becomes text.

```
n = 42            # int
pi = 3.14         # float
name = "Radu"     # str
done = True       # bool
nothing = None    # the absence of a value

print(type(n), type(pi))   # <class 'int'> <class 'float'>
```

`type(...)` is a function that tells you the type of a value. The answer looks odd, `<class 'int'>`, but only the word between the single quotes matters (you'll find out what a class is near the end of the lesson). When you give `print` several arguments separated by commas, it shows them on the same line, with a space between each.

You can assign several variables at once, either with different values or the same value for all of them.

```
a, b, c = 1, 2, 3   # a gets 1, b gets 2, c gets 3
x = y = 0           # both x and y get 0
print(a, b, c, x, y)   # 1 2 3 0 0
```

You'll often want to change a variable based on its current value, for example to add 5 points to a score of 10. You write `score = score + 5`: Python first works out the right-hand side, 10 + 5 = 15, then puts the result back into `score`. The short assignment operators (`+=`, `-=`, `*=`, `//=`) change the value and put it back in the same variable, with less typing. You'll see `//` a bit further down.

```
score = 10
score += 5      # same as score = score + 5
print(score)    # 15
score *= 2      # same as score = score * 2
print(score)    # 30
```

For text, the f-string is the modern way to insert values, for example to print "score: 0.87". You put an `f` before the quotes and write the expression in braces, `{ }`. The expression can be a variable or a calculation. After a colon (`:`) you can ask for a format: `:.2f` means "a number with decimals (`f`), with two digits after the point (`.2`)", rounded. In the same way, `:.3f` keeps three decimals.

```
score = 0.8734
print(f"score: {score:.2f}")        # score: 0.87
print(f"double: {score * 2:.3f}")   # double: 1.747
```

On the second line, Python first works out 0.8734 * 2 = 1.7468, then rounds it to three decimals: 1.747.

Division has two forms. `/` always gives a float, even when the division is exact: `6 / 2` gives 3.0. `//` gives integer division rounded down, that is, how many times 2 fits into 7: 3 times. And `%` gives the remainder: 7 = 2 · 3 + 1, so `7 % 2` is 1.

`int(...)` truncates toward zero, meaning it chops off the decimals: `int(3.9)` gives 3, and `int(-3.9)` gives -3. `round(...)` rounds to the nearest whole number, so `round(3.9)` gives 4. At exactly half, Python goes to the even number: `round(2.5)` gives 2, and `round(3.5)` gives 4. `str(...)`/`float(...)`/`list(...)` convert explicitly between types, meaning they turn a value into a type you choose: `str(42)` is the text `"42"`, and `float("2.5")` is the number 2.5. You'll see `list(...)` with lists.

```
print(7 / 2)          # 3.5
print(7 // 2)         # 3
print(7 % 2)          # 1
print(int(3.9))       # 3, truncates
print(int(-3.9))      # -3, still toward zero
print(round(3.9))     # 4, rounds
print(str(42) + "!")  # 42!
```

The last line glues two pieces of text together: `+` between two strings puts one after the other. A number and a piece of text can't be added directly (`42 + "!"` gives an error), which is why you first turn 42 into text with `str(42)`.

## The four data structures
When you have several values that belong together, like the grades in a gradebook or the scores of ten models, you don't make a separate variable for each. You put them all in a data structure: a single variable that holds several values, called elements. Almost everything you write uses one of these.

- List: ordered, can be changed. `[1, 2, 3]`. Like a shopping list: ordered means every element has its own place (first, second and so on), and "can be changed" means you can add, remove or replace elements.
- Tuple: ordered, cannot be changed. `(1, 2)`. Good for values that belong together and shouldn't change, like the coordinates of a point.
- Dictionary: pairs made of a key and a value. `{"a": 1}`. Like a gradebook: the key is the name you look up (`"Ana"`), the value is what you find there (a grade of 9).
- Set: unique values, no order. `{1, 2, 3}`. From a list of cities with repeats, a set keeps each city only once, and its elements have no positions.

The list below holds the scores of three models, numbers between 0 and 1, like the accuracy from Lesson 2 (0.71 means 71% correct answers).

```
scores = [0.71, 0.83, 0.79]
scores.append(0.88)
print(scores)                     # [0.71, 0.83, 0.79, 0.88]
print(len(scores), max(scores))   # 4 0.88
```

`.append(0.88)` adds 0.88 to the end of the list. A function that belongs to a particular value and that you call with a dot after the value's name, like `scores.append(...)`, is called a method. `len` and `max` are ordinary functions: `len` counts the elements (4), and `max` gives you the largest one (0.88). For the smallest there's `min`.

Besides `.append()`, lists have a few more methods you'll use constantly: `.insert(pos, val)` puts something at a given position, `.pop(pos)` removes an element (with no argument, removes the last one), `.remove(val)` removes the first occurrence of a value, `.index(val)` gives you its position. Positions are counted from 0, so position 0 is the start of the list (more on this in Indexing and slices).

```
scores = [0.71, 0.83, 0.79]
scores.insert(0, 0.5)       # puts 0.5 at position 0, the start
print(scores)               # [0.5, 0.71, 0.83, 0.79]
last = scores.pop()         # removes the last element and hands it to you
print(last, scores)         # 0.79 [0.5, 0.71, 0.83]
scores.remove(0.71)
print(scores)               # [0.5, 0.83]
print(scores.index(0.83))   # 1
```

In a dictionary you write the pairs in braces, as `key: value`, separated by commas. You read the value for a key with `d["key"]`, where `d` is the dictionary's name. Dictionaries aren't only read that way: `d["key"]` raises an error (stops the program) if the key is missing, while `.get("key", default)` returns a default value of your choice instead. Without the second argument, `.get` returns `None`. With `grades["Ana"] = 9` you add a new pair, or change the value if the key already exists.

```
grades = {
    "Radu": 4,
    "Stefan": 10,
    "Victor": 8
}
print(grades["Stefan"])       # 10
print(grades.get("Radu"))     # 4
print(grades.get("Ana", 0))   # 0, because "Ana" isn't in the dictionary
grades["Ana"] = 9             # adds the key "Ana" with the value 9
print(grades["Ana"])          # 9
```

Dictionaries can contain other dictionaries. You read them from the outside in: `student["grades"]` is the dictionary `{"ro": 9, "en": 10}`, and `["en"]` takes the grade 10 out of it.

```
student = {"name": "Ana", "grades": {"ro": 9, "en": 10}}
print(student["grades"]["en"])   # 10
```

Sets drop duplicate values and give you set operations from math: union, intersection, difference, useful when you compare two sets of labels or words. `set(...)` makes a set from a list. `.add(x)` adds an element, and `.discard(x)` removes it, with no error if it isn't there. The operations are written with symbols: `|` is the union (what's in a or in b), `&` the intersection (what's in both), `-` the difference (what's in a but not in b).

```
a = set([1, 2, 2, 3, 3, 3])
print(a)       # {1, 2, 3}
b = {3, 4, 5}

a.add(10)
a.discard(1)
print(a)       # {10, 2, 3}

print(a | b)   # union: {2, 3, 4, 5, 10}
print(a & b)   # intersection: {3}
print(a - b)   # difference: {10, 2}
```

`{10, 2, 3}` isn't a mistake: a set doesn't remember any order, so Python may print it in an order you didn't expect.

A less obvious pitfall comes from the way Python stores values. When you write `a = [1, 2, 3]`, Python builds the list in the computer's memory and sticks the label `a` on it. A concrete thing in memory, like this list, is called an object. `b = a` doesn't copy the list, it just gives the same list in memory a second name: two labels on the same box, so anything you change through `b` also shows up through `a`. To get a real copy, use `a.copy()` or `list(a)`.

```
a = [1, 2, 3]
b = a
b.append(4)
print(a)          # [1, 2, 3, 4], a changed too

c = a.copy()
c.append(5)
print(a)          # [1, 2, 3, 4], unchanged this time
print(c)          # [1, 2, 3, 4, 5]
```

## Indexing and slices
Every element in a list has a position number, called its index (plural: indices). Indexing starts at zero: in `v = [10, 20, 30, 40, 50]`, `v[0]` is 10, `v[1]` is 20, and the last element, 50, has index 4. Negative indices count from the end: `v[-1]` is the last element, `v[-2]` the one before it.

A slice takes a piece of a list. The slice `a:b` includes the start and excludes the end: `v[1:3]` takes indices 1 and 2, not 3. Leaving one end empty means "from the start" or "to the end", so `v[:2]` is the first two elements. A third number is the step: `v[::2]` takes every second element.

```
v = [10, 20, 30, 40, 50]

print(v[0])      # 10, the first
print(v[-1])     # 50, the last
print(v[1:3])    # [20, 30], from 1 up to but not including 3
print(v[:2])     # [10, 20]
print(v[::2])    # [10, 30, 50], every second one
```

This rule repeats identically for strings, NumPy arrays and Pandas columns, which you'll see in Lesson 4. You learn it once and use it everywhere. Strings do have one quirk though: they're immutable, meaning they can't be changed once created, just like tuples. You can't change a character (a letter, a digit, a space) in place, you can only build a new string.

```
s = "Vianu"
print(s[0])        # V, indexing works
# s[0] = "X"       # error: TypeError, strings can't be modified

s2 = "X" + s[1:]   # "X" glued to "ianu"
print(s2)          # Xianu, a new string
```

The line that starts with `#` is a comment, so it doesn't run. If you delete the `#`, Python gives a `TypeError`. `s[1:]` is the slice from index 1 to the end, which is `"ianu"`.

Some characters can't be typed directly between quotes, a new line for example. For special characters in strings you use escape sequences: a backslash `\` followed by a character that says which special character you want. `\n` is a new line, `\t` a tab (a wide space, like the Tab key), `\\` a single backslash, `\"` a quote mark inside a double-quoted string.

```
print("first line\nsecond line")   # prints two lines
print("column1\tcolumn2")          # a tab between the two words
```

## Conditions and loops
So far, every line has run, one after another. Often you want a block of code to run only in certain situations, for example to print "good" only if the score is above 0.8. That's what `if` and `else` are for.

```
score = 0.9
if score > 0.8:
    print("good")
else:
    print("weak")
# prints: good
```

`if` checks a condition, here `score > 0.8`. If it's true, the lines under it run. If it's false, the lines under `else` run instead. The `if` and `else` lines end with a colon (`:`). The lines under them are shifted right by four spaces, which is called indenting, and they form a block: they belong to the `if` or the `else` above them. Blocks are marked by indentation, not by braces like in other languages. Four spaces, consistently.

To repeat something for every element of a list, you use a `for` loop. `for s in scores:` takes each element of `scores` in turn, puts it in the variable `s` and runs the block underneath. One pass through the block is called an iteration. The `for` line ends with a colon too. Below, there's an `if` inside the loop's block, so the `print` lines are indented twice: once for the `for`, once for the `if`.

```
scores = [0.71, 0.83, 0.79]
for s in scores:
    if s > 0.8:
        print("good", s)
    else:
        print("weak", s)
# prints:
# weak 0.71
# good 0.83
# weak 0.79
```

A condition is a question whose answer is `True` or `False`. Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`and`, `or`, `not`) combine to build conditions. `==` means "equal" and has two signs, because a single `=` is assignment. `!=` means "not equal", and `<=` and `>=` are "less than or equal" and "greater than or equal". `and` needs both conditions to be true, `or` is happy with one, and `not` flips: true becomes false. If you're coming from another language, Python writes `and`/`or`/`not` instead of `&&`/`||`/`!`.

```
score, attempts = 0.9, 3
if score > 0.8 and attempts < 5:
    print("continue")
if not (score < 0.5 or attempts == 0):
    print("worth trying")
# prints:
# continue
# worth trying
```

The first `if` passes, because 0.9 > 0.8 and 3 < 5 are both true. In the second, the parenthesis is false (neither 0.9 < 0.5 nor 3 == 0 is true), and `not` makes it true. There's no `else` here: it's optional, and without it, when the condition is false, the block simply doesn't run.

> [!NOTE]
> `0`, `0.0`, `""`, `[]`, `{}`, `set()` and `None` are all "false" when you put them in an `if`, even though they aren't `False`: Python treats any zero or empty value as false. An empty list is false, one with elements is true, so `if scores:` runs the block only if the list has at least one element.

A classic pitfall if you're coming from another language: `==` compares values ("do they have the same value?"), `is` compares whether two names point to the exact same object in memory ("is it the very same box?", like `b = a` above). Two lists built separately can have the same values and still be different objects. For `None`, always use `is`, never `==`: there's only one `None`, so you ask directly whether the variable is it.

```
x = None
if x is None:       # correct
    print("empty")  # this prints

a = [1, 2]
b = [1, 2]
print(a == b)   # True, same values
print(a is b)   # False, different objects
```

For a short `if` that just picks between two values, the conditional expression (ternary) fits on one line. It reads almost like English: `label` gets `"good"` if the score is above 0.8, otherwise it gets `"weak"`.

```
score = 0.9
label = "good" if score > 0.8 else "weak"
print(label)   # good
```

When you also need the position, use `enumerate`. When you walk two lists at once, `zip`. `enumerate(scores)` gives you a pair at each iteration, the position and the element, so you write two variables after `for`: `i` gets the position, `s` the element. `zip` walks two lists side by side, like a zipper: first element with first, second with second.

```
scores = [0.71, 0.83, 0.79]
for i, s in enumerate(scores):
    print(i, s)
# prints:
# 0 0.71
# 1 0.83
# 2 0.79

for name, score in zip(["a", "b"], [0.7, 0.9]):
    print(name, score)
# prints:
# a 0.7
# b 0.9
```

Besides `for`, there's `while`, which keeps going as long as a condition stays true. `while` checks the condition before each iteration and stops once it becomes false. `break` exits the loop, `continue` skips the current iteration and jumps straight to the next one. In the example, `i` is the index of the element being checked: it starts at 0 and goes up by 1 at each step, as long as it's less than `len(scores)`.

```
scores = [0.71, 0.42, 0.83, 0.97, 0.79]
i = 0
while i < len(scores):
    if scores[i] < 0.5:
        i += 1
        continue
    if scores[i] > 0.95:
        break
    print(scores[i])
    i += 1
# prints:
# 0.71
# 0.83
```

Step by step: 0.71 gets printed. 0.42 is below 0.5, so `continue` moves on to the next element without printing it. 0.83 gets printed. At 0.97, `break` stops the loop entirely, so 0.79 never even gets checked. The `i += 1` before `continue` matters: without it, `i` would stay put and the loop would spin forever. If that happens to you, stop the cell with the ■ button in the notebook's top bar.

Sorting is done with `sorted()` or `.sort()`, and `key` tells it what to sort by. `sorted(my_list)` gives you a new, sorted list and leaves the old one unchanged. `my_list.sort()` sorts the list itself, in place, without making a new one.

```
print(sorted([3, 1, 2]))   # [1, 2, 3]

students = [("Ana", 9.2), ("Bogdan", 8.7), ("Cris", 9.5)]
students.sort(key=lambda x: x[1], reverse=True)
print(students)   # [('Cris', 9.5), ('Ana', 9.2), ('Bogdan', 8.7)]
```

Each student is a tuple (name, grade). `key=lambda x: x[1]` tells `sort` to compare students by `x[1]`, the element at position 1, which is the grade. `lambda x: x[1]` is a short function written on one line, which takes a student `x` and returns their grade; we explain it in Functions. `reverse=True` flips the order, so the highest grades come first. Arguments written with a name, like `key=...` or `reverse=True`, are called keyword arguments. Python prints text with single quotes (`'Cris'`), but it's the same as `"Cris"`.

## Comprehensions (lists built in one line)
A short way to build one structure from another. It shows up often in contest code, so it's worth reading fluently even if you write ordinary loops at first. The example below makes the same list of squares both ways. `range(5)` gives you the numbers 0, 1, 2, 3, 4 one at a time: from 0 up to 5, not including 5, like with slices.

```
# with an ordinary loop
squares = []
for x in range(5):
    squares.append(x * x)
print(squares)   # [0, 1, 4, 9, 16]

# the same, with a list comprehension
squares = [x * x for x in range(5)]
print(squares)   # [0, 1, 4, 9, 16]

scores = [0.71, 0.83, 0.79, 0.88]
good = [s for s in scores if s > 0.8]
print(good)      # [0.83, 0.88], only those above 0.8
```

Read it like this: "take each x from range, keep it if it passes the condition (the `if`, when there is one), put x*x in the list". The same works for dictionaries and sets. `range(n)` doesn't actually build a list of n numbers, it produces the values one at a time: it only remembers where it got to and works out the next number when it's asked for. So `range(10_000_000)` doesn't hold ten million numbers in memory. The underscores in `10_000_000` just help you count the digits, like the spaces in 10 000 000. A list of ten million numbers would take up a few hundred MB, while `range` takes up almost nothing.

```
lengths = {c: len(c) for c in ["rf", "xgboost"]}
print(lengths)          # {'rf': 2, 'xgboost': 7}
unique_lengths = {len(c) for c in ["rf", "svm", "cnn"]}
print(unique_lengths)   # {2, 3}
```

The first line makes a dictionary, with `key: value` in the braces, and the third makes a set, with just the value. `len` also counts the characters of a string: `len("rf")` is 2. `rf`, `xgboost`, `svm` and `cnn` are short names of models you'll learn later. In the set, 3 appears only once, even though `"svm"` and `"cnn"` both have three letters.

A generator expression looks like a list comprehension but with round brackets instead. It doesn't build the whole structure in memory at once, it produces values one at a time, which matters for sums or large loops. `sum(...)` adds up all the values it gets, and the parentheses of `sum` double as the generator's parentheses.

```
total = sum(x * x for x in range(1_000_000))
print(total)   # 333332833333500000
```

## Functions
A function groups code you repeat. You've already used ready-made functions, like `print`, `len` or `max`. Now you write your own: you give it a name once, then call it whenever you need it.

```
def double(x):
    return x * 2

print(double(5))    # 10
print(double(21))   # 42
```

`def` (short for define) starts the definition: the function's name, then, in parentheses, the parameters, which are the names the function receives values under. Here there's just one, `x`. The function's body is the indented block underneath, and `return` sends the result back to whoever called the function. For `double(5)`, Python puts the argument 5 into `x`, works out 5 * 2 and hands you back 10, which `print` shows. The definition alone doesn't print anything: the function only runs when you call it.

Arguments can have default values, and the defaults always go last, after the others. A default value is written in the `def`, with `=`, and is used when you don't pass that argument in the call. The function below brings the numbers of a list into the range from `minimum` to `maximum`, 0 to 1 by default, something you'll do often starting with Lesson 5.

```
def normalize(v, minimum=0.0, maximum=1.0):
    lo, hi = min(v), max(v)
    if hi == lo:
        return [minimum] * len(v)
    return [minimum + (x - lo) / (hi - lo) * (maximum - minimum) for x in v]

print(normalize([2, 4, 6]))               # [0.0, 0.5, 1.0]
print(normalize([2, 4, 6], maximum=10))   # [0.0, 5.0, 10.0]
```

Step by step, for `[2, 4, 6]`: `lo` is 2 (the smallest) and `hi` is 6 (the largest), so `hi - lo` is 4. For each `x`, the formula works out `(x - lo) / (hi - lo)`: for 2 that's 0 / 4 = 0.0, for 4 it's 2 / 4 = 0.5, for 6 it's 4 / 4 = 1.0. With `minimum` 0 and `maximum` 1, the result is just that fraction, and in the second call `maximum=10` multiplies it by 10. The `if` avoids dividing by zero when all the numbers are equal: then `return` gives back `[minimum] * len(v)`, which is `minimum` repeated `len(v)` times, and stops the function right there.

Unpacking lets you assign several values at once. When a function writes `return min(v), max(v)`, it returns a tuple with two values, and `smallest, largest = ...` unpacks it: the first value goes into `smallest`, the second into `largest`. You'll see it constantly when splitting data.

```
a, b = 1, 2

def min_and_max(v):
    return min(v), max(v)

smallest, largest = min_and_max([4, 1, 7])
print(smallest, largest)   # 1 7

# in Lesson 6: X_tr, X_val, y_tr, y_val = train_test_split(X, y)
```

In Lesson 6, `train_test_split` splits the data into four pieces, which you get all at once in four variables. `X` is the features (the input columns), `y` is the target, as in Lesson 2, and `tr` and `val` stand for training and validation.

Default values have a trap. The function below is supposed to start from an empty list every time:

```
def add(x, my_list=[]):
    my_list.append(x)
    return my_list

print(add(1))   # [1]
print(add(2))   # [1, 2], not [2]
```

> [!NOTE]
> Never use a list or a dictionary as an argument's default value. It's created once, when the function is defined, and stays shared between calls: that's why the second call found the 1 left there by the first. Use `None` and create the value inside: `def add(x, my_list=None):`, and in the body `if my_list is None: my_list = []`.

A variable created inside a function only exists there, it's local: it disappears when the function ends. Variables created outside any function are called global. The function can see global variables but can't change them without the `global` keyword (a word with a special meaning in Python, like `if` or `def`). Needing `global` is usually a sign the function should be rewritten to take in and return values instead of touching outside state.

```
counter = 0

def wrong_increment():
    counter = counter + 1   # error when called, see below

def increment():
    global counter
    counter += 1   # works, but avoid this pattern when you can

increment()
increment()
print(counter)   # 2
```

If you call `wrong_increment()`, you get an `UnboundLocalError`. Because the function assigns something to `counter`, Python treats it as a new local variable, and at `counter + 1` that variable doesn't have a value yet. You'll use `global` rarely, when you really do want a function to change something outside it, like a count of calls.

Sometimes you don't know in advance how many arguments you'll get. `*args` collects positional arguments into a tuple, `**kwargs` collects keyword ones into a dictionary. Positional arguments are given just by value, in order, like 0.8 and 0.9 below, while keyword arguments are given with a name, like `model="rf"`. The stars are what matter: `args` and `kwargs` are just the usual names, and below we called them `scores` and `info`. `print` is built the same way, which is why it accepts any number of values.

```
def report(*scores, **info):
    print("scores:", scores)
    print("info:", info)

report(0.8, 0.9, model="rf", seed=42)
# prints:
# scores: (0.8, 0.9)
# info: {'model': 'rf', 'seed': 42}
```

A `lambda` is a small, unnamed function written on one line. You'll see it often as an argument to `sorted`, `map` or `filter`. `lambda x: x * 2` does exactly what `double` above does: it takes `x` and returns `x * 2`, without `def` and without `return`. You use one when you need a small function just once, as an argument to another, like you saw with `sort(key=...)`.

```
double = lambda x: x * 2
print(double(5))     # 10

scores = [0.71, 0.83, 0.79, 0.88]
print(list(map(lambda x: x * x, [1, 2, 3])))     # [1, 4, 9]
print(list(filter(lambda x: x > 0.8, scores)))   # [0.83, 0.88]
```

`map(f, my_list)` applies the function `f` to each element. `filter(f, my_list)` keeps only the elements for which `f` gives `True`. Both hand out their results one at a time, like `range`, so you wrap them in `list(...)` to see the whole list.

In practice, a comprehension often does the job more clearly than `map`/`filter`: `[x * x for x in [1, 2, 3]]` also gives `[1, 4, 9]`. You'll reach for those mostly when the function already comes defined from somewhere else.

A function can call itself, recursively. Rarely needed in everyday AI code, but useful to recognize: it always needs a base case that stops the recursion. The example computes a factorial: the factorial of 5 is 5 · 4 · 3 · 2 · 1 = 120, which is 5 times the factorial of 4.

```
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
```

`factorial(5)` asks for `5 * factorial(4)`, which asks for `4 * factorial(3)`, and so on down to `factorial(1)`. That's the base case: `n <= 1` returns 1 straight away, with no further call. Then the multiplications happen on the way back: 1, 2, 6, 24, 120. Without the base case, the function would call itself forever. You'll recognize it in the search algorithms of Lesson 11, like backtracking, which are naturally written recursively.

A function with `yield` instead of `return` is a generator: it doesn't return all its values at once, it produces one at a time. At each `yield`, the function hands a value to the `for` loop and pauses right there. When the loop asks for the next value, the function picks up where it left off. You use one when you have lots of values and don't want to keep them all in memory at once, like with `range`.

```
def even_numbers(up_to):
    for n in range(up_to):
        if n % 2 == 0:   # remainder by 2 is 0, so n is even
            yield n

for n in even_numbers(10):
    print(n)
# prints 0, 2, 4, 6, 8, each on its own line
```

## Classes and modules
A class keeps data and functions together. You won't write many, but every library you use is built from classes, so you need to understand what happens when you write `model.fit(X, y)`. That's how you'll train a model in the coming lessons: `fit` makes it learn from the features `X` and the answers `y`, and `model.predict(...)` then asks it for predictions on new data.

Here, a class means something you build in Python, not a category from classification. A class is a template, like the blank sign-up form for the olympiad. An object is a thing made from the template, like a filled-in form: it has the same fields, but with its own data. You can make as many objects as you want from the same class. You've seen this before: `int` and `list` are classes, which is why `type(n)` printed `<class 'int'>`, and every list you create is an object of the class `list`.

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

- `class Mean:` starts the template. Everything indented under it belongs to the class.
- A method is a function written inside the class, like `fit` and `predict`. You call it with a dot, `m.predict(2)`, just like `.append` on lists.
- `self` is the object itself. Every method gets it first, but you don't pass it when calling: for `m.predict(2)`, Python puts `m` into `self` and 2 into `n` on its own.
- An attribute is a variable kept inside the object, written with `self.` in front, like `self.value`. It stays there between calls, so `predict` sees what `fit` worked out.
- `__init__` runs by itself when you create the object with `Mean()` and sets it up: here it starts the attribute `value` at `None`. Names with two underscores on each side are special names that Python calls by itself.

Step by step: `Mean()` creates the object and runs `__init__`. `.fit([1, 2, 3])` works out the mean, (1 + 2 + 3) / 3 = 2.0, and keeps it in `self.value`. `return self` hands back the object itself, which is why you can write `Mean().fit(...)` on one line and put the result in `m`. `m.predict(2)` returns `[self.value] * 2`, the mean repeated twice, one prediction for each of two new rows.

That's exactly the scikit-learn pattern: `fit` learns and remembers, `predict` uses what it learned. `Mean` is the simplest model possible: it learns a single value and predicts it for any new row.

A class can inherit from another, with `class Child(Parent):`, and `super()` calls the version from the base class. Inheritance means the new class (the child) gets everything the base class (the parent) has, attributes and methods, and only adds or changes what's different. You'll see this pattern constantly later on, with neural networks in PyTorch (Lesson 14), where every model is a class that inherits from `nn.Module`.

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

`ModelWithSeed("rf", 42)` runs the child's `__init__`. There, `super().__init__(name)` first runs the parent's `__init__`, which sets `self.name = "rf"`, then the child adds `self.seed = 42`. A seed is a starting number for random values, which you'll see at the end of the lesson. The child also writes its own `describe`, which replaces the parent's, but uses it through `super().describe()`: it takes the text `"model rf"` and adds `", seed 42"` to it.

Someone else's code comes in with `import`. A module is a file of ready-made Python code, functions and classes, that you bring into your program. Python comes with lots of modules included: `math` has math functions, and `collections` has extra data structures. The libraries from Lesson 1, like NumPy or Pandas, are made of modules too, except you install those yourself with pip.

```
import math
from collections import Counter

print(math.sqrt(16))               # 4.0
print(Counter(["a", "b", "a"]))    # Counter({'a': 2, 'b': 1})
```

`import math` brings in the whole module, and you call its functions with the module's name in front: `math.sqrt(16)` is the square root of 16. `from collections import Counter` brings in only `Counter`, which you use without a prefix. `Counter` counts how many times each value appears: `'a'` twice, `'b'` once.

## Errors and exceptions
Code that reads files, parses data (turns text into values, like `"12"` into the number 12) or takes input typed by a person will produce errors, guaranteed. Python calls them exceptions, and you catch them with `try`/`except` so one bad line doesn't crash the whole program.

```
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("can't divide by zero")
        return None

print(divide(10, 2))   # 5.0
print(divide(10, 0))   # can't divide by zero, then None
```

`try` runs the block under it. If an error of the type named in `except` happens, here `ZeroDivisionError` (dividing by zero), Python doesn't stop the program: it jumps into the block under `except` and carries on from there.

The exceptions you'll hit most in contests: `ValueError` (a failed conversion, like `int("abc")`), `KeyError` (a key that doesn't exist in a dictionary), `IndexError` (an index outside the list), `FileNotFoundError` (a wrong path to the data, meaning the file isn't where you told Python to look). An error you don't catch with `try` stops the cell and shows a message like this one:

```
grades = {"Ana": 9}
print(grades["Radu"])

# under the cell you see:
# ---------------------------------------------------------------------------
# KeyError                                  Traceback (most recent call last)
# Cell In[1], line 2
#       1 grades = {"Ana": 9}
# ----> 2 print(grades["Radu"])
#
# KeyError: 'Radu'
```

When one shows up, read the message from the bottom up: the last line tells you the type of error and why, and further up the arrow points to the line of code that failed. Here, `KeyError: 'Radu'` means the dictionary has no key `'Radu'`, and `---->` points to line 2 of the cell. When the error happens inside a function, the message has several pieces like this one, stacked one under another, and the bottom one shows exactly where it happened.

> [!NOTE]
> Don't catch exceptions with a bare `except:`, with no type after it. It hides every mistake, including the ones you should actually see. Catch the exact type you expect, for example `except ValueError:`.

`finally` always runs, with or without an exception, good for cleanup, for example to close something you opened or to report that a step has finished. `assert` quickly checks an assumption and stops the program with a clear message if it's false, useful for catching bugs (mistakes in the code) early instead of at the end of a run.

```
try:
    n = int("abc")
except ValueError:
    print("not a number")
finally:
    print("check finished")   # runs no matter what

X = [[1, 2], [3, 4], [5, 6]]   # three rows of data
y = [0, 1]                     # only two answers
assert len(X) == len(y), "X and y must have the same length"
# AssertionError: X and y must have the same length
```

`X` and `y` are the usual names for the features (here a list of rows, each row a list of two numbers) and the target (one answer per row). One answer is missing, so `assert` stops the cell with your message. With three values in `y`, the line would pass without printing anything.

## Text and regular expressions
Many problems, especially in NLP (processing text written by people, in Lesson 12), need text cleaned up before anything else. Strings have built-in methods for this.

```
s = "  The Second WORLD War  "
print(s.strip())          # removes the spaces at both ends
print(s.lower())          # lowercase
print(s.split())          # ['The', 'Second', 'WORLD', 'War']
print("-".join(["a", "b", "c"]))     # a-b-c
print(s.replace("WORLD", "world"))   # The Second world War
```

`.split()` cuts the text at the spaces and gives you the list of words. `"-".join(my_list)` does the opposite: it glues together the elements of a list of strings, with `"-"` between them. `.replace(old, new)` replaces the text `old` with `new` everywhere. None of them changes `s`, because strings are immutable: each one gives you a new string.

For patterns more complicated than `.replace()`, the `re` module matches text against regular expressions. A regular expression (regex) is a pattern that describes what kind of text you're looking for, for example "a run of digits", rather than an exact piece of text.

```
import re

text = "contact: ana@example.com or 0722 123 456"
emails = re.findall(r"[\w.]+@[\w.]+", text)
print(emails)    # ['ana@example.com']

cleaned = re.sub(r"\d+", "", text)   # removes every digit
print(cleaned)   # contact: ana@example.com or
```

- `r"..."`: a raw string, in which Python leaves the backslash `\` alone, so it reaches `re` unchanged. You always write patterns this way.
- `\d`: a digit, from 0 to 9.
- `\w`: a letter, a digit or `_`, meaning a character that can be part of a word.
- `+`: "one or more" of whatever comes right before it, so `\d+` is a run of digits stuck together, like `0722`.
- `[...]`: any one of the characters in the brackets, so `[\w.]` is a letter, a digit, `_` or a dot.

Put together, `[\w.]+@[\w.]+` means "letters, digits or dots, then @, then letters, digits or dots again", which is the shape of an email address. `re.findall(pattern, text)` gives you the list of every match, and `re.sub(pattern, new, text)` replaces them with `new`, here with nothing.

> [!NOTE]
> `re` is worth learning gradually, not all at once. At first just remember `findall` (finds every match) and `sub` (replaces), and look up the rest when you need it.

## Files and data formats
Reading and writing a text file use `with`, which closes it on its own even if an error comes up. That matters, because what you write is only safely in the file once it's closed.

```
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("first line\n")

with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())   # first line
```

`open("notes.txt", "w", ...)` opens the file for writing: `"w"` (for write) creates it if it doesn't exist and wipes everything in it if it does. `as f` gives the open file the name `f`, and `f.write(...)` writes text into it; `\n` ends the line. Without a second argument, `open` opens the file for reading only. `for line in f` walks through it line by line, and `.strip()` removes the `\n` at the end of each line. The file appears in the same folder as the notebook.

Always pass `encoding="utf-8"`. Without it, on Windows, accented characters get read wrong. The encoding is the rule for how letters get saved as numbers in the file, and UTF-8 is the standard rule, which knows about accented letters too.

Contest data rarely comes as plain text. It's usually CSV or JSON, and Python has standard modules for both, even before you get to Pandas. A CSV file is a table written as text: the first line has the column names, and each line after it is a row of the table, with the values separated by commas. The code below first writes a three-line CSV, so you have something to read.

```
import csv

with open("scores.csv", "w", encoding="utf-8") as f:
    f.write("name,score\n")
    f.write("Ana,0.91\n")
    f.write("Bogdan,0.78\n")

with open("scores.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["score"])
# prints:
# Ana 0.91
# Bogdan 0.78
```

`csv.DictReader` reads each row as a dictionary: the column name is the key, and what's written in the table is the value. The values it reads are text: `row["score"]` is `"0.91"`, so to calculate with it you write `float(row["score"])`.

JSON is a text format that looks almost exactly like a Python dictionary. The code below saves the dictionary `data` to `result.json`, where it shows up as the text `{"model": "rf", "score": 0.87}`, then reads it back. `json.dump(data, f)` writes, and `json.load(f)` reads and gives you a dictionary again.

```
import json

data = {"model": "rf", "score": 0.87}
with open("result.json", "w", encoding="utf-8") as f:
    json.dump(data, f)

with open("result.json", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded["score"])   # 0.87
```

For file paths, `pathlib` is clearer than gluing strings together with `+`. A file's path is its address on the computer: the folders it sits in, then its name, so `data/train.csv` is the file `train.csv` in the folder `data`. With `Path`, the `/` sign doesn't divide: it joins a folder and a file name, with the right separator for your system, `/` on macOS and Linux, `\` on Windows.

```
from pathlib import Path

folder = Path("data")
file = folder / "train.csv"
print(file)            # data/train.csv (on Windows, data\train.csv)
print(file.exists())   # False, unless you have a data folder with train.csv
```

## Random and reproducibility
A lot of things in AI look random: splitting data, initializing a model (the numbers it starts from, before it learns), shuffling a training set. The `random` module controls this, and a `seed` makes results repeatable.

A computer doesn't really roll dice. Its "random" numbers come from a random number generator, a formula that begins with one number and works out from it a sequence that only looks random. That first number is the seed. The same seed gives exactly the same sequence of numbers every time.

```
import random

random.seed(42)
print(random.random())        # 0.6394267984578837, every time with seed 42
print(random.randint(1, 10))  # 1
scores = [0.71, 0.83, 0.79, 0.88]
random.shuffle(scores)        # shuffles the list in place
print(scores)                 # [0.83, 0.88, 0.71, 0.79]
```

`random.random()` gives a number with decimals between 0 and 1. `random.randint(1, 10)` gives a whole number from 1 to 10, including 10, unlike `range`. `random.shuffle(my_list)` shuffles the list in place, meaning it changes the list itself without making a new one. Run the cell several times: thanks to `random.seed(42)`, you get the same results every time. 42 is just a habit, any number works.

> [!NOTE]
> Set `random.seed(...)` once, at the start of the script (the program or the notebook). Without it, running the code twice gives different results, which makes it impossible to fairly compare two ideas: you can't tell whether the score went up because of the idea or by luck.

`random.seed` only controls the `random` module. NumPy (Lesson 4) has its own generator, which you fix with `np.random.seed(42)`, and scikit-learn functions and models take `random_state=42`, as you'll see when splitting data in Lesson 6.

# @practice
- [Kaggle Learn: Python](https://www.kaggle.com/learn/python)
