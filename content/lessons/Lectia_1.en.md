---
code: S1
duration: ~2h
---

# @intro
The first session has two halves. First we make it clear what artificial intelligence means, so you know what we're talking about all year. Then we handle the logistics: a place to write code and a place to send answers.

## What AI is and where it's used
Artificial intelligence is the idea of building a program that solves problems without you writing, step by step, the rule for every case. Instead of telling it "if this, do that", you show it many examples and let it find the rule on its own. That part, learning from examples, is called machine learning, and it's almost everything you do at the olympiad.

One example makes the difference clear. To tell a spam email from a normal one with hand-written rules, you'd write hundreds of "if it contains word X". With machine learning, you give it a few thousand emails already marked spam or not, and the model learns on its own which combinations of words predict spam.

- Classification: you put a label on something (spam or not, which digit is in an image, what disease a set of symptoms points to).
- Regression: you predict a number (the price of a house, tomorrow's temperature).
- Clustering: you find structure in data with no labels (which customers are similar).

> [!NOTE]
> At AI contests almost every problem comes down to this: you get data with examples, you train a model that learns from them, and you make it predict on new data.

## What Python is and why it's the one
Python is the standard language for writing AI code. Not because it's the fastest, but because the libraries you want are already written: NumPy for numeric work, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks.

A library is code someone else wrote, that you import and use. Instead of writing the sorting algorithm or matrix multiplication yourself, you call the right function. Most of your work will be wiring these libraries together correctly.

> [!NOTE]
> Install Python 3.11 (a stable, widely supported version) and JupyterLab. Jupyter gives you an interactive notebook where you run code piece by piece and see the result right away, exactly what you want when you're exploring data.

## Set up Python, pip, and Jupyter Lab
Before you write any code you need three things installed on your computer: Python, pip (it comes bundled with it), and Jupyter Lab.

- Windows: go to python.org/downloads, grab the latest 3.11 or newer, and run the installer. On the first screen check "Add python.exe to PATH" before clicking Install Now, otherwise your terminal won't find Python afterward.
- macOS: download the same .pkg from python.org/downloads and run through the installer. If you already have Homebrew, brew install python@3.11 works just as well.
- Linux (Ubuntu/Debian): open a terminal and run sudo apt update && sudo apt install python3 python3-pip python3-venv.

Pip has shipped with Python since version 3.4, so there's nothing separate to install for it. To confirm both are working, open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux) and run:

```
python --version
pip --version
```
caption: If both print a version number, Python and pip are installed.

On Windows, if python isn't recognized, try py --version instead; if pip doesn't respond either, try pip3 or python -m pip --version.

With Python installed, move on to the environment itself. A virtual environment is a separate box for one project's libraries, so they don't clash with anything else installed globally. You create it once per project and always work inside it.

1. Open a terminal in your working folder.
2. Type pip install jupyterlab and press Enter.
3. Type jupyter lab and press Enter: a browser tab opens on its own with the interface.

> [!NOTE]
> At the contest you'll find all of this already installed on the computers.

## Documentation at the contest
You're not fully offline at the contest. You get internet, but a controlled one: only a fixed list of sites, usually the official docs for the libraries you use, like numpy.org, scikit-learn.org, pandas.pydata.org, pytorch.org, docs.python.org. The system logs what you visit, and going to anything outside that list, ChatGPT, any other page, gets you flagged and risks disqualification.

In practice, you can look up a function in the official docs, but you can't ask anyone and you can't copy code from a forum. Get used to finding the answer directly in the docs, not through a Google search.

There's also a faster option that works even with no connection at all: in Jupyter, put a question mark after a function and it shows you what it does and what arguments it takes, straight from the library installed on your machine.

```
pd.read_csv?      # open the help for read_csv
np.mean?          # what it does, what arguments it takes
```
caption: The question mark opens the docs even with no internet.

> [!NOTE]
> Check the exact list of allowed sites for the contest you're entering beforehand, the rules vary between competitions. Going outside the list counts as an attempt to cheat.

## Your first submission, the full loop
MLCompete (platform.olimpiada-ai.ro) and Nitro AI Judge (judge.nitro-ai.org) are the platforms you'll train on. Make an account on both.

A competition works like this: you download a dataset, train a model, produce a file with your predictions for the test data, upload it, and get a score on a leaderboard. The point of your first submission isn't the score. It's to see the whole loop at least once.

1. Enter a training competition and read which metric is scored.
2. Download the data and open the sample submission file, so you see exactly which columns and format it wants.
3. Produce a file in the same format, even with random answers.
4. Upload it and look at the score.

> [!NOTE]
> A good model with a badly formatted file scores zero. The submission format isn't a detail, it's a condition. Check it every time: the column names, the order, the separator, whether it has a header or not.
