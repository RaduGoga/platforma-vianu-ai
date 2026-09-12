---
code: S1
duration: ~2h
---

# @intro
Naturally, the first question is what artificial intelligence actually means. With so much confusion around the term, it's worth clearing that up first and only then setting up your working environment.

## What AI is and where it's used
At its core, artificial intelligence means any technology that simulates human functions. Instead of following strict rules, you show it many examples and let it find the rules on its own, through various algorithms. It isn't magic: ChatGPT doesn't "think". The part about learning from examples is called machine learning, and it's almost everything you do at the olympiad.

Some terminology is worth mentioning too. Data science covers all the fields involved in AI: mathematics, computer science and others. Mathematics is the foundation and shows up in absolutely everything we do, but you don't have to learn it in depth to solve problems or build projects. Some classic computer science algorithms are used as well, BFS and DFS for example, in certain areas of AI. Machine learning, mentioned above, splits into several categories of its own: supervised learning, unsupervised learning, reinforcement learning and, sometimes, self-supervised.

A few examples help. To tell a spam email from a normal one with hand-written rules, you'd have to write hundreds of conditions of the form "if it contains the word X". With machine learning, you give it a few thousand emails already marked as spam or not, and the model learns by itself which combinations of words predict spam. A few classic AI tasks include, but aren't limited to:

- Classification: you assign a label (spam or not, which digit is in the image, which disease the symptoms point to).
- Regression: you predict a number (the price of a house, tomorrow's temperature).
- Clustering: you find structure in unlabelled data (which customers resemble each other).

Overfitting, underfitting, bias and variance matter too. A model that has memorized the training data, noise included, does almost perfectly on what it has seen and poorly on new data: that's overfitting. At the opposite end, a model too simple for the problem doesn't even capture the real pattern and gets things wrong everywhere, on training and on test alike: that's underfitting.

The two are explained by bias and variance. Bias is the error that comes from assumptions that are too simple, like fitting a straight line through data that actually describes a curve. Variance is sensitivity to the exact data it was trained on: change the training set slightly and the model gives completely different predictions. High bias means underfitting, high variance means overfitting, and lowering one usually raises the other. Everything you do at the olympiad, from how complex a model you pick to how long you train it, is really the search for the balance point between them.

> [!NOTE]
> How to spot them in practice: compare the training score with the validation score. Both weak means underfitting, and you need a stronger model. A good training score and a weak validation score means overfitting, and you need more data, regularization, or a simpler model.

> [!NOTE]
> At AI contests, almost every problem comes down to this: you get data, you analyse it, you train a model, and you have it predict on new data.

## What Python is and why it
Python is the standard language for writing artificial intelligence code. Not because it's the fastest, but because it's heavily abstracted and already has the libraries you want, written for you, sometimes in faster languages: NumPy for numerical computing, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks.

A library is code written by someone else that you import and use. In AI tasks the goal isn't to memorize how algorithms or models are written, but to understand them, to know when each one applies, and to adapt them to the problem at hand alongside other methods.

> [!NOTE]
> Install a stable version of Python, 3.11 for example, which is well supported by libraries.

## Your working setup: Python, pip and Jupyter Lab
Before you write any code you need three things installed: Python, pip (which comes with it automatically) and Jupyter Lab. Jupyter Lab, VS Code and Google Colab are environments where you can write Python notebooks, which let you write code in pieces and run it one piece at a time.

- Windows: go to python.org/downloads, download the latest 3.11 or newer and run the installer. On the first screen tick "Add python.exe to PATH" before Install Now, otherwise the terminal won't find Python afterwards.
- macOS: download the .pkg file from python.org/downloads as well and step through the installer. If you already have Homebrew, brew install python@3.11 works just as well.
- Linux (Ubuntu/Debian): open a terminal and run sudo apt update && sudo apt install python3 python3-pip python3-venv.

Pip ships with Python from version 3.4 on, so you don't install it separately. To confirm both work, open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux) and run:

```
python --version
pip --version
```
caption: If both print a version number, Python and pip are installed.

On Windows, if python isn't recognized, try py --version; if pip doesn't answer either, try pip3 or python -m pip --version.

With Python installed, move on to the working environment itself. A virtual environment is a separate box for one project's libraries, so they don't clash with others installed globally. You create it once per project and always work inside it.

1. Open a terminal in the folder you're working in.
2. Type pip install jupyterlab and press Enter.
3. Type jupyter lab and press Enter: a browser tab opens automatically with the interface.

> [!NOTE]
> You can use VS Code too, but at some contests it isn't available. Google Colab is also a good option when you're working from a computer that isn't yours.

# @practice
- First submission on MLCompete
