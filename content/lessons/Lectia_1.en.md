---
code: S1
duration: ~2h
---

# @intro
Naturally, the first question is what artificial intelligence actually means. With so much confusion around the term, it's worth clearing that up first and only then setting up your working environment, meaning the programs you'll write and run code in.

## What AI is and where it's used
Your phone recognizing the faces in your photos, Google Translate translating a text, YouTube recommending your next video: all of these use artificial intelligence, AI for short. At its core, artificial intelligence means any technology that simulates human functions, that is, it does things that until recently needed a person.

Most of the time, instead of following strict rules, you show it many examples and let it find the rules on its own, through various algorithms. An algorithm is a recipe: a sequence of steps the computer follows. There's nothing mysterious going on. ChatGPT doesn't "think": it learned from a huge number of examples of text. The part about learning from examples is called machine learning, and it's almost everything you do at the olympiad.

An example helps. To tell a spam email from a normal one with hand-written rules, you'd have to write hundreds of conditions of the form "if it contains the word X". With machine learning, you give it a few thousand emails already marked as spam or not, and the model learns by itself which combinations of words predict spam. The model is the program that learns from examples. The marked emails it learns from are the training data, and the step where it learns is called training. After training you give it a new, unmarked email and it tells you whether it's spam: its answer is called a prediction.

You'll hear a few more terms around AI. Data science means getting useful information out of data, using mathematics (statistics above all) and computer science. For example, you work out from a shop's receipts which products are often bought together. Mathematics is the foundation and shows up in absolutely everything we do, but you don't have to learn it in depth to solve problems or build projects. Some classic computer science algorithms are used in certain areas of AI as well, BFS and DFS for example: two ways of searching for a path, like the way out of a maze. They come back in Lesson 11. Machine learning, mentioned above, splits into several categories of its own:

- Supervised learning: every example comes with the correct answer, like the emails marked spam or not, and the model learns to give the answer by itself for new examples.
- Unsupervised learning: the examples have no answer, and the model looks for patterns on its own, for example groups of customers who buy similar things. You'll see it in Lesson 10.
- Reinforcement learning: the model learns by trial and error, gaining points for good moves and losing points for bad ones. For example, a program that teaches itself to play a game from the score alone. You'll see it in Lesson 20.
- Self-supervised learning, sometimes counted as a separate category: the answers come from the data itself. The model reads a text and tries to guess the next word, which the text already contains. That's how models like ChatGPT learn from text.

Here a task means the kind of problem the model solves. A few classic AI tasks include, but aren't limited to:

- Classification: you assign a label, meaning you pick the answer from a fixed list of options called classes (spam or not, which digit is in the image, which disease the symptoms point to).
- Regression: you predict a number (the price of a house, tomorrow's temperature). Like classification, it's supervised learning.
- Clustering: you find structure in unlabelled data, usually groups of similar examples (which customers resemble each other). It's unsupervised learning.

Overfitting, underfitting, bias and variance matter too. Picture a student who memorizes the answers to last year's test. If they get exactly the same questions, they ace it. If the questions are new, they know nothing, because they never understood the lesson, they only memorized it.

A model can do the same: if it has memorized the training data, noise included, it does almost perfectly on what it has seen and poorly on new data. That's overfitting. Noise means the accidental details or mistakes in the data, like a normal email marked as spam by mistake. Those details don't repeat in new data, so there's no point learning them. At the opposite end, a model too simple for the problem doesn't even capture the real pattern and gets things wrong everywhere, on the training data and on new data alike: that's underfitting. It's the student who only read the lesson's title and gets even last year's questions wrong.

The two are explained by bias and variance. Bias is the error that comes from assumptions that are too simple, like fitting a straight line through data that actually describes a curve. Imagine points that climb more and more steeply on a graph: whatever straight line you draw, it passes far from many of them. Variance is sensitivity to the exact data the model was trained on: change the training set slightly and the model gives completely different predictions. High bias means underfitting, high variance means overfitting, and lowering one usually raises the other. Everything you do at the olympiad, from how complex a model you pick to how long you train it, is really the search for the balance point between them.

> [!NOTE]
> How to spot them in practice: compare the training score with the validation score. A score is a number that shows how well the model does, for example the percentage of emails it classifies correctly. For validation, you set aside part of the training data at the start, answers included. The model doesn't see it during training, so its score there is like the mark on a test with new questions. Two weak scores mean underfitting, and you need a more complex model. A good training score and a weak validation score means overfitting, and you need more data, regularization, or a simpler model. Regularization is a brake that keeps the model simpler so it can't memorize. You'll see it at work with decision trees in Lesson 7 and with neural networks in Lesson 15.

> [!NOTE]
> At AI contests, almost every problem comes down to this: you get data, you analyse it, you train a model, and you have it predict on new data.

## What Python is and why it
Python is the standard programming language for writing artificial intelligence code (code is the text with instructions that the computer carries out). Not because it's the fastest, but because it's heavily abstracted and already has the libraries you want, written for you, sometimes in faster languages: NumPy for numerical computing, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks. Abstracted means you write a few lines for complicated things, and the libraries hide the details. You can train a whole model, for example, with a single line of code.

A library is code written by someone else that you import (bring into your own code with the `import` command) and use. In AI tasks the goal isn't to memorize how algorithms or models are written. The goal is to understand them, to know when each one applies, and to adapt them to the problem at hand alongside other methods.

> [!NOTE]
> Install a stable version of Python, 3.11 for example, which is well supported by libraries. It's also the version on the olympiad computers.

## Your working setup: Python, pip and Jupyter Lab
Before you write any code you need three things installed: Python, pip (which comes with it automatically) and Jupyter Lab. Python is the program that reads and runs code written in Python, and pip is the program you install libraries with. Jupyter Lab, VS Code and Google Colab are programs where you can write Python notebooks. A notebook is a document where the code is split into pieces called cells. You run the cells one at a time, and each cell's result appears right below it.

Some steps happen in the terminal: a window where you type commands as text instead of clicking buttons. The computer runs a command when you press Enter.

- Windows: go to python.org/downloads, download version 3.11 and run the installer. The big button at the top gives you the newest version, so pick Python 3.11.9 from the list further down, the last 3.11 release that has an installer. On the first screen tick "Add python.exe to PATH" before Install Now, otherwise the terminal won't find Python afterwards. PATH is the list of folders where the computer looks for a program when you type its name in the terminal.
- macOS: download the .pkg file for Python 3.11.9 from python.org/downloads as well and step through the installer. If you already have Homebrew, a program that installs other programs from the terminal, `brew install python@3.11` works just as well.
- Linux (Ubuntu/Debian): open a terminal and run `sudo apt update && sudo apt install python3 python3-pip python3-venv`.

Pip ships with Python from version 3.4 on, so you don't install it separately. To confirm both work, open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux), type the commands below one at a time and press Enter after each:

```
python --version
pip --version
```
caption: If both print a version number, for example Python 3.11.9, Python and pip are installed.

On macOS and Linux the commands are usually called `python3` and `pip3`, so type `python3 --version` and `pip3 --version`. On Windows, if `python` isn't recognized, try `py --version`; if `pip` doesn't answer either, try `pip3` or `python -m pip --version`.

With Python installed, move on to the working environment itself. A virtual environment is a separate box for one project's libraries, so they don't clash with others installed globally, meaning for the whole computer. You create it once per project (usually one folder for each problem you work on) and always work inside it. That way an old project can stay on an older version of a library while a new one uses the latest.

1. Make a folder to work in and open a terminal inside it: type `cd` and a space, drag the folder with the mouse into the terminal window and press Enter. `cd` stands for "change directory", meaning "move into this folder".
2. Create the virtual environment with `python -m venv .venv` (on macOS and Linux, `python3 -m venv .venv`). The command makes a new folder called `.venv` inside yours: that's the box we talked about.
3. Activate it: `.venv\Scripts\activate` on Windows, `source .venv/bin/activate` on macOS and Linux. Once it's active, `(.venv)` appears at the start of the line in the terminal. If PowerShell refuses the command, do these steps in Command Prompt instead. You repeat the activation every time you open a new terminal.
4. Type `pip install jupyterlab` and press Enter. Pip downloads Jupyter Lab and installs it into the virtual environment; it takes a little while and fills the screen with text, which is normal.
5. Type `jupyter lab` and press Enter: a browser tab opens automatically with the interface. To make a new notebook, click Python 3 (ipykernel) under Notebook. Keep the terminal open while you work, because closing it also stops Jupyter.

> [!NOTE]
> You can use VS Code too, a code editor, but at some contests it isn't available. Google Colab is also a good option when you're working from a computer that isn't yours: it runs right in the browser with a Google account, with nothing to install.

## At the contest
At the olympiad you work on the contest centre's computers, with Windows, JupyterLab, Python 3.11 and Firefox. You can't bring notes or books into the room. Online you can only reach the contest platform (the site where you get the problems and upload your answers) and the official documentation of the language and the allowed libraries. Documentation is the manual written by their authors, for example docs.python.org, numpy.org/doc, pandas.pydata.org/docs or scikit-learn.org. The exact list is announced by the committee.

That's why it's worth getting used to searching the documentation now, not Google. You also get help right inside the notebook: type a function's name followed by `?`, for example `pd.read_csv?`, or press Shift+Tab inside its parentheses to see which arguments it takes. A function is a named command that does one specific thing, and its arguments are what you give it between the parentheses. For example, `pd.read_csv("data.csv")` reads the table from the file data.csv, and `"data.csv"` is its argument. The `?` help only works once you've installed and imported the library; for pandas you do that in Lesson 4.

> [!NOTE]
> A few JupyterLab keys that save time: Shift+Enter runs the cell and moves to the next one, Esc then A or B adds a cell above or below, Esc then M turns the cell into text, for notes. Before you submit a solution, run Kernel → Restart Kernel and Run All Cells, to make sure the notebook works from scratch. The kernel is the program that runs the code in your cells and remembers everything they've computed. Restart makes it forget all of that, and Run All Cells then runs every cell from top to bottom. Without this step, your notebook might work for you only because the kernel still remembers the result of a cell you've since deleted.

# @practice
- First submission on MLCompete (the steps are in Lesson 2)
- Find in the pandas documentation what the sep argument of read_csv does, without Google
