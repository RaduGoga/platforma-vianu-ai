---
code: S1
duration: ~2h
---

# @intro
The first session has two halves. First we make it clear what artificial intelligence actually means, so you know what we're talking about all year. Then we do the logistics: a place to write code and a place to send answers. The setup part sounds boring, but most of the silly points lost at the first stage come from here: an environment that won't start, a badly formatted submission file, a missing library. Do it once, properly, and you're done with it.

## What AI is and where it's used
Artificial intelligence is the idea of building a program that solves problems without you writing, step by step, the rule for every case. Instead of telling it "if this, do that", you show it many examples and let it find the rule on its own. That part, learning from examples, is called machine learning, and it's almost everything you do at the olympiad.

One example makes it clear. To tell a spam email from a normal one with hand-written rules, you'd write hundreds of "if it contains word X". With machine learning, you give it a few thousand emails already marked spam or not, and the model learns on its own which combinations of words predict spam. You don't give it the rule, you pull the rule out of the data.

- Classification: you put a label on something (spam or not, which digit is in an image, what a scan shows).
- Regression: you predict a number (the price of a house, tomorrow's temperature).
- Grouping: you find structure in data with no labels (which customers are similar).

> [!NOTE]
> At AI contests almost every problem comes down to this: you get data with examples, you train a model that learns from them, and you make it predict on new data. The rest of the curriculum is the tools that do this well.

## What Python is and why it's the one
Python is the standard language for writing AI code. Not because it's the fastest, but because the libraries you want are already written: NumPy for numeric work, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks. At the olympiad everything is written in Python, so that's where you start.

A library is code someone else wrote, that you import and use. Instead of writing the sorting algorithm or matrix multiplication yourself, you call the right function. Most of your work will be wiring these libraries together correctly.

> [!NOTE]
> Install Python 3.11 (a stable, widely supported version) and JupyterLab. Jupyter gives you an interactive notebook where you run code piece by piece and see the result right away, exactly what you want when you're exploring data.

## Set up Python, pip, and Jupyter Lab
Before you write any code you need three things installed: Python, pip (it ships with Python already), and Jupyter Lab. The steps below take you from a blank machine to a running notebook.

- Windows: go to python.org/downloads, grab the latest 3.11 or newer, and run the installer. On the first screen check "Add python.exe to PATH" before clicking Install Now, otherwise your terminal won't find Python afterward.
- macOS: download the same .pkg from python.org/downloads and run through the installer. If you already have Homebrew, brew install python@3.11 works just as well.
- Linux (Ubuntu/Debian): open a terminal and run sudo apt update && sudo apt install python3 python3-pip python3-venv.

Pip has shipped with Python since version 3.4, so there's nothing separate to install for it. To confirm both are working, open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux) and run:

```
python --version
pip --version
```
caption: If both print a version number, Python and pip are set up correctly.

On Windows, if python isn't recognized, try py --version instead; if pip doesn't respond either, try pip3 or python -m pip --version.

With Python installed, move on to the environment itself. A virtual environment is a separate box for one project's libraries, so they don't clash with anything else installed globally. You create it once per project and always work inside it.

1. Open a terminal in your working folder.
2. Create the environment: python -m venv .venv (on Linux/macOS you may need python3 -m venv .venv instead).
3. Activate it: on Windows .venv\Scripts\activate, on macOS/Linux source .venv/bin/activate. You'll know it worked when you see (.venv) at the start of your command line.
4. Install the core tools: pip install numpy pandas matplotlib scikit-learn jupyterlab.
5. Launch Jupyter Lab: jupyter lab. A browser tab should open on its own with the interface.

Check right away that everything imports without errors. If something breaks, fix it now, at home, with internet, not in the contest room where you have neither.

```
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

print("numpy", np.__version__)
print("pandas", pd.__version__)
print("all good")
```
caption: Type this into a new cell in Jupyter Lab and run it. If it runs with no error, you're ready to work.

## Offline documentation
At the contest, most stages are offline: no internet, no Stack Overflow, no asking a model. The only thing you can look at is the local documentation, meaning the libraries' help files saved on your machine.

Get into the habit early of searching the offline docs. In Jupyter, you put a question mark after a function and it shows you what it does and what arguments it takes. That's the reflex that saves you precious minutes.

```
pd.read_csv?      # open the help for read_csv
np.mean?          # what it does, what arguments it takes
```
caption: The question mark opens the docs with no internet.

## Your first submission, the full loop
MLCompete (platform.olimpiada-ai.ro) is the platform you train on all year. Nitro AI Judge (judge.nitro-ai.org) is another one, for hackathon-style NLP problems. Make accounts on both now.

A competition works like this: you download a dataset, train a model, produce a file with your predictions for the test data, upload it, and get a score on a leaderboard. The point of your first submission isn't the score. It's to see the whole loop at least once.

1. Enter a training competition and read which metric is scored.
2. Download the data and open the sample submission file, so you see exactly which columns and format it wants.
3. Produce a file in the same format, even with random answers.
4. Upload it and look at the score.

> [!NOTE]
> A good model with a badly formatted file scores zero. The submission format isn't a detail, it's a condition. Check it every time: the column names, the order, the separator, whether it has a header or not.

# @takeaways
- AI at the olympiad means machine learning: the model learns the rule from examples, you don't write it.
- Python plus a few libraries do everything: NumPy, Pandas, scikit-learn, PyTorch.
- The environment and the offline docs are prepared at home, not on contest day.
- The contest loop: data in, a predictions file out, a score on the board.
- The submission format is a scoring condition, not a detail.

# @pitfalls
- Get your setup done a few days ahead, not the night before the contest.
- Check the submission format before the model: a file that's good as a model but badly formatted scores zero.
- Train offline, with local documentation, because you get no internet in the contest.

# @practice
- Send one valid submission to a training competition on MLCompete.
- Save the offline docs for numpy and pandas and search them with no internet.
- Write the steps from data to submission file from memory, without looking.
