// AUTO-GENERAT din content/lessons/*.en.md — NU edita direct.
// Editează fișierele markdown din content/lessons/, apoi rulează `npm run lessons`
// (se rulează oricum automat înainte de dev și build).
import type { Lesson } from "./lesson-types";
export type { Block, LessonSection, Lesson } from "./lesson-types";

export const lessonsEn: Lesson[] = [
  {
    "moduleCode": "S1",
    "duration": "~2h",
    "intro": "Naturally, the first question is what artificial intelligence actually means. With so much confusion around the term, it's worth clearing that up first and only then setting up your working environment, meaning the programs you'll write and run code in.",
    "sections": [
      {
        "heading": "What AI is and where it's used",
        "blocks": [
          {
            "p": "Your phone recognizing the faces in your photos, Google Translate translating a text, YouTube recommending your next video: all of these use artificial intelligence, AI for short. At its core, artificial intelligence means any technology that simulates human functions, that is, it does things that until recently needed a person."
          },
          {
            "p": "Most of the time, instead of following strict rules, you show it many examples and let it find the rules on its own, through various algorithms. An algorithm is a recipe: a sequence of steps the computer follows. There's nothing mysterious going on. ChatGPT doesn't \"think\": it learned from a huge number of examples of text. The part about learning from examples is called machine learning, and it's almost everything you do at the olympiad."
          },
          {
            "p": "An example helps. To tell a spam email from a normal one with hand-written rules, you'd have to write hundreds of conditions of the form \"if it contains the word X\". With machine learning, you give it a few thousand emails already marked as spam or not, and the model learns by itself which combinations of words predict spam. The model is the program that learns from examples. The marked emails it learns from are the training data, and the step where it learns is called training. After training you give it a new, unmarked email and it tells you whether it's spam: its answer is called a prediction."
          },
          {
            "p": "You'll hear a few more terms around AI. Data science means getting useful information out of data, using mathematics (statistics above all) and computer science. For example, you work out from a shop's receipts which products are often bought together. Mathematics is the foundation and shows up in absolutely everything we do, but you don't have to learn it in depth to solve problems or build projects. Some classic computer science algorithms are used in certain areas of AI as well, BFS and DFS for example: two ways of searching for a path, like the way out of a maze. They come back in Lesson 11. Machine learning, mentioned above, splits into several categories of its own:"
          },
          {
            "list": [
              "Supervised learning: every example comes with the correct answer, like the emails marked spam or not, and the model learns to give the answer by itself for new examples.",
              "Unsupervised learning: the examples have no answer, and the model looks for patterns on its own, for example groups of customers who buy similar things. You'll see it in Lesson 10.",
              "Reinforcement learning: the model learns by trial and error, gaining points for good moves and losing points for bad ones. For example, a program that teaches itself to play a game from the score alone. You'll see it in Lesson 20.",
              "Self-supervised learning, sometimes counted as a separate category: the answers come from the data itself. The model reads a text and tries to guess the next word, which the text already contains. That's how models like ChatGPT learn from text."
            ]
          },
          {
            "p": "Here a task means the kind of problem the model solves. A few classic AI tasks include, but aren't limited to:"
          },
          {
            "list": [
              "Classification: you assign a label, meaning you pick the answer from a fixed list of options called classes (spam or not, which digit is in the image, which disease the symptoms point to).",
              "Regression: you predict a number (the price of a house, tomorrow's temperature). Like classification, it's supervised learning.",
              "Clustering: you find structure in unlabelled data, usually groups of similar examples (which customers resemble each other). It's unsupervised learning."
            ]
          },
          {
            "p": "Overfitting, underfitting, bias and variance matter too. Picture a student who memorizes the answers to last year's test. If they get exactly the same questions, they ace it. If the questions are new, they know nothing, because they never understood the lesson, they only memorized it."
          },
          {
            "p": "A model can do the same: if it has memorized the training data, noise included, it does almost perfectly on what it has seen and poorly on new data. That's overfitting. Noise means the accidental details or mistakes in the data, like a normal email marked as spam by mistake. Those details don't repeat in new data, so there's no point learning them. At the opposite end, a model too simple for the problem doesn't even capture the real pattern and gets things wrong everywhere, on the training data and on new data alike: that's underfitting. It's the student who only read the lesson's title and gets even last year's questions wrong."
          },
          {
            "p": "The two are explained by bias and variance. Bias is the error that comes from assumptions that are too simple, like fitting a straight line through data that actually describes a curve. Imagine points that climb more and more steeply on a graph: whatever straight line you draw, it passes far from many of them. Variance is sensitivity to the exact data the model was trained on: change the training set slightly and the model gives completely different predictions. High bias means underfitting, high variance means overfitting, and lowering one usually raises the other. Everything you do at the olympiad, from how complex a model you pick to how long you train it, is really the search for the balance point between them."
          },
          {
            "note": "How to spot them in practice: compare the training score with the validation score. A score is a number that shows how well the model does, for example the percentage of emails it classifies correctly. For validation, you set aside part of the training data at the start, answers included. The model doesn't see it during training, so its score there is like the mark on a test with new questions. Two weak scores mean underfitting, and you need a more complex model. A good training score and a weak validation score means overfitting, and you need more data, regularization, or a simpler model. Regularization is a brake that keeps the model simpler so it can't memorize. You'll see it at work with decision trees in Lesson 7 and with neural networks in Lesson 15."
          },
          {
            "note": "At AI contests, almost every problem comes down to this: you get data, you analyse it, you train a model, and you have it predict on new data."
          }
        ]
      },
      {
        "heading": "What Python is and why it",
        "blocks": [
          {
            "p": "Python is the standard programming language for writing artificial intelligence code (code is the text with instructions that the computer carries out). Not because it's the fastest, but because it's heavily abstracted and already has the libraries you want, written for you, sometimes in faster languages: NumPy for numerical computing, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks. Abstracted means you write a few lines for complicated things, and the libraries hide the details. You can train a whole model, for example, with a single line of code."
          },
          {
            "p": "A library is code written by someone else that you import (bring into your own code with the `import` command) and use. In AI tasks the goal isn't to memorize how algorithms or models are written. The goal is to understand them, to know when each one applies, and to adapt them to the problem at hand alongside other methods."
          },
          {
            "note": "Install a stable version of Python, 3.11 for example, which is well supported by libraries. It's also the version on the olympiad computers."
          }
        ]
      },
      {
        "heading": "Your working setup: Python, pip and Jupyter Lab",
        "blocks": [
          {
            "p": "Before you write any code you need three things installed: Python, pip (which comes with it automatically) and Jupyter Lab. Python is the program that reads and runs code written in Python, and pip is the program you install libraries with. Jupyter Lab, VS Code and Google Colab are programs where you can write Python notebooks. A notebook is a document where the code is split into pieces called cells. You run the cells one at a time, and each cell's result appears right below it."
          },
          {
            "p": "Some steps happen in the terminal: a window where you type commands as text instead of clicking buttons. The computer runs a command when you press Enter."
          },
          {
            "list": [
              "Windows: go to python.org/downloads, download version 3.11 and run the installer. The big button at the top gives you the newest version, so pick Python 3.11.9 from the list further down, the last 3.11 release that has an installer. On the first screen tick \"Add python.exe to PATH\" before Install Now, otherwise the terminal won't find Python afterwards. PATH is the list of folders where the computer looks for a program when you type its name in the terminal.",
              "macOS: download the .pkg file for Python 3.11.9 from python.org/downloads as well and step through the installer. If you already have Homebrew, a program that installs other programs from the terminal, `brew install python@3.11` works just as well.",
              "Linux (Ubuntu/Debian): open a terminal and run `sudo apt update && sudo apt install python3 python3-pip python3-venv`."
            ]
          },
          {
            "p": "Pip ships with Python from version 3.4 on, so you don't install it separately. To confirm both work, open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux), type the commands below one at a time and press Enter after each:"
          },
          {
            "code": "python --version\npip --version",
            "caption": "If both print a version number, for example Python 3.11.9, Python and pip are installed."
          },
          {
            "p": "On macOS and Linux the commands are usually called `python3` and `pip3`, so type `python3 --version` and `pip3 --version`. On Windows, if `python` isn't recognized, try `py --version`; if `pip` doesn't answer either, try `pip3` or `python -m pip --version`."
          },
          {
            "p": "With Python installed, move on to the working environment itself. A virtual environment is a separate box for one project's libraries, so they don't clash with others installed globally, meaning for the whole computer. You create it once per project (usually one folder for each problem you work on) and always work inside it. That way an old project can stay on an older version of a library while a new one uses the latest."
          },
          {
            "steps": [
              "Make a folder to work in and open a terminal inside it: type `cd` and a space, drag the folder with the mouse into the terminal window and press Enter. `cd` stands for \"change directory\", meaning \"move into this folder\".",
              "Create the virtual environment with `python -m venv .venv` (on macOS and Linux, `python3 -m venv .venv`). The command makes a new folder called `.venv` inside yours: that's the box we talked about.",
              "Activate it: `.venv\\Scripts\\activate` on Windows, `source .venv/bin/activate` on macOS and Linux. Once it's active, `(.venv)` appears at the start of the line in the terminal. If PowerShell refuses the command, do these steps in Command Prompt instead. You repeat the activation every time you open a new terminal.",
              "Type `pip install jupyterlab` and press Enter. Pip downloads Jupyter Lab and installs it into the virtual environment; it takes a little while and fills the screen with text, which is normal.",
              "Type `jupyter lab` and press Enter: a browser tab opens automatically with the interface. To make a new notebook, click Python 3 (ipykernel) under Notebook. Keep the terminal open while you work, because closing it also stops Jupyter."
            ]
          },
          {
            "note": "You can use VS Code too, a code editor, but at some contests it isn't available. Google Colab is also a good option when you're working from a computer that isn't yours: it runs right in the browser with a Google account, with nothing to install."
          }
        ]
      },
      {
        "heading": "At the contest",
        "blocks": [
          {
            "p": "At the olympiad you work on the contest centre's computers, with Windows, JupyterLab, Python 3.11 and Firefox. You can't bring notes or books into the room. Online you can only reach the contest platform (the site where you get the problems and upload your answers) and the official documentation of the language and the allowed libraries. Documentation is the manual written by their authors, for example docs.python.org, numpy.org/doc, pandas.pydata.org/docs or scikit-learn.org. The exact list is announced by the committee."
          },
          {
            "p": "That's why it's worth getting used to searching the documentation now, not Google. You also get help right inside the notebook: type a function's name followed by `?`, for example `pd.read_csv?`, or press Shift+Tab inside its parentheses to see which arguments it takes. A function is a named command that does one specific thing, and its arguments are what you give it between the parentheses. For example, `pd.read_csv(\"data.csv\")` reads the table from the file data.csv, and `\"data.csv\"` is its argument. The `?` help only works once you've installed and imported the library; for pandas you do that in Lesson 4."
          },
          {
            "note": "A few JupyterLab keys that save time: Shift+Enter runs the cell and moves to the next one, Esc then A or B adds a cell above or below, Esc then M turns the cell into text, for notes. Before you submit a solution, run Kernel → Restart Kernel and Run All Cells, to make sure the notebook works from scratch. The kernel is the program that runs the code in your cells and remembers everything they've computed. Restart makes it forget all of that, and Run All Cells then runs every cell from top to bottom. Without this step, your notebook might work for you only because the kernel still remembers the result of a cell you've since deleted."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "First submission on MLCompete (the steps are in Lesson 2)"
      },
      {
        "title": "Find in the pandas documentation what the sep argument of read_csv does, without Google"
      }
    ]
  },
  {
    "moduleCode": "S2",
    "duration": "~2h",
    "intro": "Before you learn any model, it's worth understanding what you're dealing with. An AI contest problem almost always has the same pieces: some data, a target to predict, a scoring metric and a submission file with your answers. Whoever reads the statement properly starts with a big head start.",
    "sections": [
      {
        "heading": "Anatomy of a problem",
        "blocks": [
          {
            "p": "You get two datasets. A training one, which also has the correct answers (called labels, or the target), and a test one, which has the same columns but no answer. Your job is to predict the answer for the test set, based on what you learned from the training one."
          },
          {
            "p": "Here's a small example, modelled on the Titanic problem on Kaggle: from a passenger's age and the price of their ticket, you have to guess whether they survived the shipwreck. Data usually comes as CSV files, which are tables saved as text. Each line is a row of the table, with the values separated by commas, and the first line holds the column names. The training file, `train.csv`, looks like this:"
          },
          {
            "code": "id,age,fare,survived\n1,22,7,0\n2,38,71,1\n3,26,8,1\n4,35,53,1\n5,35,8,0",
            "caption": "Each row is a passenger. The last column is the answer: 1 if they survived, 0 if not."
          },
          {
            "p": "The test file, `test.csv`, has other passengers and the same columns, minus the last one. That's the one you have to guess:"
          },
          {
            "code": "id,age,fare\n6,34,8\n7,4,16\n8,58,26",
            "caption": "The same columns, with no answer."
          },
          {
            "p": "You write your answers in a submission file, usually `submission.csv`. A submission is your answer to the problem: the file you upload to the platform to get it scored. It has one row for each passenger in the test file, with their id and your prediction:"
          },
          {
            "code": "id,survived\n6,0\n7,1\n8,1",
            "caption": "For each id in the test file, 1 or 0, whichever you think is right."
          },
          {
            "list": [
              "Training data: the rows you see in full, answer included, as in `train.csv`. This is what the model learns from.",
              "Test data: the same columns, but the target column is missing, as in `test.csv`. This is what you have to fill in.",
              "The target: what you predict, here the `survived` column. It can be a label (spam or not) or a number (a price). A label is the answer on a single row: passenger 2 has the label 1.",
              "The submission file: a table with your predictions, in exactly the format the platform asks for, like `submission.csv`."
            ]
          },
          {
            "note": "The columns used as input for the model are called features, here `age` and `fare`. The `id` column isn't a feature: it's just the row's number, so the platform knows whose prediction is whose."
          }
        ]
      },
      {
        "heading": "The metric",
        "blocks": [
          {
            "p": "Every problem has a metric, the formula your score is computed with. It's written in the statement and it matters a lot. If the metric is F1 and you optimize accuracy (both are explained just below), you can climb on a score that earns you no points. A few examples:"
          },
          {
            "list": [
              "Accuracy: the percentage of correct answers. Simple, but misleading when the classes (the possible answers, like spam and normal) are imbalanced, meaning one is much rarer than the others.",
              "F1: balances precision against recall, good when the classes are imbalanced.",
              "RMSE or MAE: for numeric targets (regression), how far you are on average from the real answer."
            ]
          },
          {
            "p": "An example of imbalanced classes: out of 100 card payments, 98 are normal and 2 are fraud. A model that always says \"normal\" gets 98 out of 100 right, so its accuracy is 98%. Yet it hasn't caught a single fraud, which is exactly what you cared about."
          },
          {
            "p": "This is where F1 helps, and it's computed from two numbers. Precision tells you how many of the payments the model flagged as fraud really were fraud. Recall tells you how many of the real frauds the model caught. The model that always says \"normal\" caught no fraud, so its recall is 0 and its F1 is 0 too. F1 is a score between 0 and 1, and higher is better; the formula and the rest of the details are in Lesson 8."
          },
          {
            "p": "For numbers, here's an example worked out by hand. You predict tomorrow's temperature in three cities: 10, 12 and 9 degrees. The real values were 11, 12 and 6 degrees, so your errors, ignoring the sign, are 1, 0 and 3 degrees. MAE (mean absolute error) is their average: (1 + 0 + 3) / 3 ≈ 1.33 degrees. RMSE (root mean squared error, the square root of the average squared error) first squares each error (1, 0, 9), takes the average and then the square root: √((1 + 0 + 9) / 3) ≈ √3.33 ≈ 1.83 degrees. It comes out higher because the 3-degree error becomes 9 once squared: RMSE punishes big errors harder."
          },
          {
            "p": "A good rule: read the metric before anything else, and train with it in mind. If F1 is what's scored, validate locally on F1 as well, meaning you also measure F1 on the data you set aside to check your model (validation, from Lesson 1)."
          }
        ]
      },
      {
        "heading": "Submission and leaderboard",
        "blocks": [
          {
            "p": "Once you have the predictions, you put them in the required file and upload it. The platform compares it against the correct answers, which you don't see, and gives you a score on a ranking of all the contestants, called the leaderboard. You usually have a limited number of submissions, so don't waste them on random tries."
          },
          {
            "p": "The leaderboard has two parts. The public one is computed on part of the test data and you see it throughout the contest. The private one is computed on the rest and is revealed only at the end. For example, if the test set has 1000 rows, the public score might come from 300 of them and the private one from the other 700, without you knowing which are which. The ranking that counts is the private one. That split into two parts exists for a reason."
          },
          {
            "p": "If you pick your model by the public score, you end up fitting that small slice of data rather than the real problem. It's called overfitting the leaderboard: you climb nicely on the public one, then drop on the private one, which is where the points are actually handed out. It's the overfitting from Lesson 1 (memorizing instead of learning), except that now you're the one doing it, through your choices. If you try 50 variants and keep the one with the best public score, you may simply have picked the variant that got lucky on those 300 public rows."
          },
          {
            "note": "The defence is serious local validation. You keep part of the training data aside as your own test set, and trust the score from there more than the public leaderboard. For example, out of 4000 training rows you set aside 20%, which is 800. You train the model on the other 3200 and score it on those 800, whose answers you know (the code is in Lesson 6). That's more rows than the 300 public ones, and you can use them as often as you like without spending submissions. At the end you pick your submissions by the local score, not the public one."
          }
        ]
      },
      {
        "heading": "The ONIA rules",
        "blocks": [
          {
            "p": "From the rules of the olympiad (ONIA, Romania's National Olympiad in Artificial Intelligence), a few things worth knowing in advance:"
          },
          {
            "list": [
              "The contest lasts four hours.",
              "A problem's solution has two parts: the file with your answer and the Python code that produced it. You submit both on the platform.",
              "The number of submissions is limited, and a minimum amount of time has to pass between two of them. You find out both together with the problems.",
              "The score you see during the contest is provisional, computed on part of the test data, like a public leaderboard. The final one is computed on the whole set.",
              "For each problem you pick two submissions. Only those count in the final ranking.",
              "Your account on platform.olimpiada-ai.ro has to be created and activated before the announced deadline. After it, you can't sign up anymore."
            ]
          },
          {
            "note": "The minimum score to qualify for the national stage is 60% of the total."
          }
        ]
      },
      {
        "heading": "Where you train",
        "blocks": [
          {
            "p": "Three platforms where you'll find problems:"
          },
          {
            "list": [
              "Kaggle (kaggle.com): the most widely used international machine learning platform.",
              "MLCompete (platform.olimpiada-ai.ro): the platform the olympiad runs on and where you practise between stages, with archive problems and training competitions.",
              "Nitro AI Judge (judge.nitro-ai.org): the platform RoAI and other AI contests run on."
            ]
          }
        ]
      },
      {
        "heading": "Your first submission",
        "blocks": [
          {
            "p": "MLCompete (platform.olimpiada-ai.ro) and Nitro AI Judge (judge.nitro-ai.org) are the platforms you'll practise on. Make an account on both. Your first submission doesn't need a good score: you make it to learn the whole route from the data to a score."
          },
          {
            "steps": [
              "Enter a training competition and read which metric is scored.",
              "Download the data and open the sample submission file (usually `sample_submission.csv`), to see exactly which columns and which format it asks for. If you open it in Notepad or another text editor, it looks like the examples above.",
              "Produce a file in the same format, even with random answers. The simplest is to upload the sample file itself, unchanged.",
              "Upload it and look at the score."
            ]
          },
          {
            "note": "If the file isn't formatted correctly you'll get validation errors. Read them, they tell you exactly what doesn't match. Here \"validation\" means the platform checking your file's format, not your model."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Any problem with a sample submission file"
      },
      {
        "title": "Titanic on Kaggle",
        "url": "https://www.kaggle.com/competitions/titanic"
      }
    ]
  },
  {
    "moduleCode": "S3",
    "duration": "~1 week",
    "intro": "Everything that follows in the curriculum is written in Python. This lesson is about the language, not about machine learning: skip it and you'll lose time in every later lesson looking up how to write a dictionary. If you've never programmed, read it in order and run every code block in a Jupyter Lab notebook (Lesson 1), then change a value and see what changes. If you already know Python, move through it quickly and stop only at comprehensions, unpacking, exceptions and regular expressions, which show up constantly in contest code.",
    "sections": [
      {
        "heading": "Your first lines of code",
        "blocks": [
          {
            "p": "A notebook is made of cells (Lesson 1). You write code in a cell and run it with Shift+Enter: Python runs the lines one at a time, from top to bottom, and shows you the result right under the cell."
          },
          {
            "code": "print(\"Hello, Vianu\")   # Hello, Vianu\nprint(2 + 3)            # 5\n# this line is a comment, Python skips it\nprint(6 * 7)            # 42"
          },
          {
            "p": "Three lines show up under the cell, in order: `Hello, Vianu`, `5` and `42`. `print` is a function: a named command that you put to work (you call it) by writing a value in parentheses after it. The value in the parentheses is called an argument, and `print` shows it under the cell. Text written between quotes appears exactly as written. For `2 + 3`, Python does the math first and shows the result. In code, `*` means multiply and `/` means divide."
          },
          {
            "p": "Everything after `#` on a line is a comment: a note for people, which Python doesn't run. In this lesson, the comment at the end of a line shows you what that line prints, so you can compare it with what you see under the cell."
          },
          {
            "p": "If the last line of a cell is just a value, without `print`, Jupyter shows it too. The other lines without `print` don't show up, which is why the examples here use `print` everywhere. If you get something wrong (say you forget a quote mark), Python stops and shows an error message. It happens to everyone, and the Errors and exceptions section shows you how to read it."
          }
        ]
      },
      {
        "heading": "Types and variables",
        "blocks": [
          {
            "p": "The line `n = 42` puts the value 42 under the name `n`. From then on, wherever you write `n`, Python uses 42. A name you give a value so you can use it later is called a variable, and the step where you give it the value, with `=`, is called assignment. Here `=` isn't the equals sign from math: it means \"put the value on the right into the name on the left\"."
          },
          {
            "p": "Every value has a type, which says what kind of value it is. The basic types:"
          },
          {
            "list": [
              "`int`: a whole number, like 42, 0 or -7.",
              "`float`: a number with decimals, written with a point, not a comma: 3.14, 0.5.",
              "`str` (short for string, a sequence of characters): text, written between quotes, like `\"Radu\"`.",
              "`bool`: a truth value, `True` or `False`.",
              "`None`: \"nothing yet\", the value you put in a variable when you don't have anything to put in it yet."
            ]
          },
          {
            "p": "In other programming languages you write the type before the name, which is called declaring it. Python doesn't ask you to declare a type. It infers it from the value, and the type can change: after `n = 42` you can write `n = \"Ana\"`, and `n` becomes text."
          },
          {
            "code": "n = 42            # int\npi = 3.14         # float\nname = \"Radu\"     # str\ndone = True       # bool\nnothing = None    # the absence of a value\n\nprint(type(n), type(pi))   # <class 'int'> <class 'float'>"
          },
          {
            "p": "`type(...)` is a function that tells you the type of a value. The answer looks odd, `<class 'int'>`, but only the word between the single quotes matters (you'll find out what a class is near the end of the lesson). When you give `print` several arguments separated by commas, it shows them on the same line, with a space between each."
          },
          {
            "p": "You can assign several variables at once, either with different values or the same value for all of them."
          },
          {
            "code": "a, b, c = 1, 2, 3   # a gets 1, b gets 2, c gets 3\nx = y = 0           # both x and y get 0\nprint(a, b, c, x, y)   # 1 2 3 0 0"
          },
          {
            "p": "You'll often want to change a variable based on its current value, for example to add 5 points to a score of 10. You write `score = score + 5`: Python first works out the right-hand side, 10 + 5 = 15, then puts the result back into `score`. The short assignment operators (`+=`, `-=`, `*=`, `//=`) change the value and put it back in the same variable, with less typing. You'll see `//` a bit further down."
          },
          {
            "code": "score = 10\nscore += 5      # same as score = score + 5\nprint(score)    # 15\nscore *= 2      # same as score = score * 2\nprint(score)    # 30"
          },
          {
            "p": "For text, the f-string is the modern way to insert values, for example to print \"score: 0.87\". You put an `f` before the quotes and write the expression in braces, `{ }`. The expression can be a variable or a calculation. After a colon (`:`) you can ask for a format: `:.2f` means \"a number with decimals (`f`), with two digits after the point (`.2`)\", rounded. In the same way, `:.3f` keeps three decimals."
          },
          {
            "code": "score = 0.8734\nprint(f\"score: {score:.2f}\")        # score: 0.87\nprint(f\"double: {score * 2:.3f}\")   # double: 1.747"
          },
          {
            "p": "On the second line, Python first works out 0.8734 * 2 = 1.7468, then rounds it to three decimals: 1.747."
          },
          {
            "p": "Division has two forms. `/` always gives a float, even when the division is exact: `6 / 2` gives 3.0. `//` gives integer division rounded down, that is, how many times 2 fits into 7: 3 times. And `%` gives the remainder: 7 = 2 · 3 + 1, so `7 % 2` is 1."
          },
          {
            "p": "`int(...)` truncates toward zero, meaning it chops off the decimals: `int(3.9)` gives 3, and `int(-3.9)` gives -3. `round(...)` rounds to the nearest whole number, so `round(3.9)` gives 4. At exactly half, Python goes to the even number: `round(2.5)` gives 2, and `round(3.5)` gives 4. `str(...)`/`float(...)`/`list(...)` convert explicitly between types, meaning they turn a value into a type you choose: `str(42)` is the text `\"42\"`, and `float(\"2.5\")` is the number 2.5. You'll see `list(...)` with lists."
          },
          {
            "code": "print(7 / 2)          # 3.5\nprint(7 // 2)         # 3\nprint(7 % 2)          # 1\nprint(int(3.9))       # 3, truncates\nprint(int(-3.9))      # -3, still toward zero\nprint(round(3.9))     # 4, rounds\nprint(str(42) + \"!\")  # 42!"
          },
          {
            "p": "The last line glues two pieces of text together: `+` between two strings puts one after the other. A number and a piece of text can't be added directly (`42 + \"!\"` gives an error), which is why you first turn 42 into text with `str(42)`."
          }
        ]
      },
      {
        "heading": "The four data structures",
        "blocks": [
          {
            "p": "When you have several values that belong together, like the grades in a gradebook or the scores of ten models, you don't make a separate variable for each. You put them all in a data structure: a single variable that holds several values, called elements. Almost everything you write uses one of these."
          },
          {
            "list": [
              "List: ordered, can be changed. `[1, 2, 3]`. Like a shopping list: ordered means every element has its own place (first, second and so on), and \"can be changed\" means you can add, remove or replace elements.",
              "Tuple: ordered, cannot be changed. `(1, 2)`. Good for values that belong together and shouldn't change, like the coordinates of a point.",
              "Dictionary: pairs made of a key and a value. `{\"a\": 1}`. Like a gradebook: the key is the name you look up (`\"Ana\"`), the value is what you find there (a grade of 9).",
              "Set: unique values, no order. `{1, 2, 3}`. From a list of cities with repeats, a set keeps each city only once, and its elements have no positions."
            ]
          },
          {
            "p": "The list below holds the scores of three models, numbers between 0 and 1, like the accuracy from Lesson 2 (0.71 means 71% correct answers)."
          },
          {
            "code": "scores = [0.71, 0.83, 0.79]\nscores.append(0.88)\nprint(scores)                     # [0.71, 0.83, 0.79, 0.88]\nprint(len(scores), max(scores))   # 4 0.88"
          },
          {
            "p": "`.append(0.88)` adds 0.88 to the end of the list. A function that belongs to a particular value and that you call with a dot after the value's name, like `scores.append(...)`, is called a method. `len` and `max` are ordinary functions: `len` counts the elements (4), and `max` gives you the largest one (0.88). For the smallest there's `min`."
          },
          {
            "p": "Besides `.append()`, lists have a few more methods you'll use constantly: `.insert(pos, val)` puts something at a given position, `.pop(pos)` removes an element (with no argument, removes the last one), `.remove(val)` removes the first occurrence of a value, `.index(val)` gives you its position. Positions are counted from 0, so position 0 is the start of the list (more on this in Indexing and slices)."
          },
          {
            "code": "scores = [0.71, 0.83, 0.79]\nscores.insert(0, 0.5)       # puts 0.5 at position 0, the start\nprint(scores)               # [0.5, 0.71, 0.83, 0.79]\nlast = scores.pop()         # removes the last element and hands it to you\nprint(last, scores)         # 0.79 [0.5, 0.71, 0.83]\nscores.remove(0.71)\nprint(scores)               # [0.5, 0.83]\nprint(scores.index(0.83))   # 1"
          },
          {
            "p": "In a dictionary you write the pairs in braces, as `key: value`, separated by commas. You read the value for a key with `d[\"key\"]`, where `d` is the dictionary's name. Dictionaries aren't only read that way: `d[\"key\"]` raises an error (stops the program) if the key is missing, while `.get(\"key\", default)` returns a default value of your choice instead. Without the second argument, `.get` returns `None`. With `grades[\"Ana\"] = 9` you add a new pair, or change the value if the key already exists."
          },
          {
            "code": "grades = {\n    \"Radu\": 4,\n    \"Stefan\": 10,\n    \"Victor\": 8\n}\nprint(grades[\"Stefan\"])       # 10\nprint(grades.get(\"Radu\"))     # 4\nprint(grades.get(\"Ana\", 0))   # 0, because \"Ana\" isn't in the dictionary\ngrades[\"Ana\"] = 9             # adds the key \"Ana\" with the value 9\nprint(grades[\"Ana\"])          # 9"
          },
          {
            "p": "Dictionaries can contain other dictionaries. You read them from the outside in: `student[\"grades\"]` is the dictionary `{\"ro\": 9, \"en\": 10}`, and `[\"en\"]` takes the grade 10 out of it."
          },
          {
            "code": "student = {\"name\": \"Ana\", \"grades\": {\"ro\": 9, \"en\": 10}}\nprint(student[\"grades\"][\"en\"])   # 10"
          },
          {
            "p": "Sets drop duplicate values and give you set operations from math: union, intersection, difference, useful when you compare two sets of labels or words. `set(...)` makes a set from a list. `.add(x)` adds an element, and `.discard(x)` removes it, with no error if it isn't there. The operations are written with symbols: `|` is the union (what's in a or in b), `&` the intersection (what's in both), `-` the difference (what's in a but not in b)."
          },
          {
            "code": "a = set([1, 2, 2, 3, 3, 3])\nprint(a)       # {1, 2, 3}\nb = {3, 4, 5}\n\na.add(10)\na.discard(1)\nprint(a)       # {10, 2, 3}\n\nprint(a | b)   # union: {2, 3, 4, 5, 10}\nprint(a & b)   # intersection: {3}\nprint(a - b)   # difference: {10, 2}"
          },
          {
            "p": "`{10, 2, 3}` isn't a mistake: a set doesn't remember any order, so Python may print it in an order you didn't expect."
          },
          {
            "p": "A less obvious pitfall comes from the way Python stores values. When you write `a = [1, 2, 3]`, Python builds the list in the computer's memory and sticks the label `a` on it. A concrete thing in memory, like this list, is called an object. `b = a` doesn't copy the list, it just gives the same list in memory a second name: two labels on the same box, so anything you change through `b` also shows up through `a`. To get a real copy, use `a.copy()` or `list(a)`."
          },
          {
            "code": "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)          # [1, 2, 3, 4], a changed too\n\nc = a.copy()\nc.append(5)\nprint(a)          # [1, 2, 3, 4], unchanged this time\nprint(c)          # [1, 2, 3, 4, 5]"
          }
        ]
      },
      {
        "heading": "Indexing and slices",
        "blocks": [
          {
            "p": "Every element in a list has a position number, called its index (plural: indices). Indexing starts at zero: in `v = [10, 20, 30, 40, 50]`, `v[0]` is 10, `v[1]` is 20, and the last element, 50, has index 4. Negative indices count from the end: `v[-1]` is the last element, `v[-2]` the one before it."
          },
          {
            "p": "A slice takes a piece of a list. The slice `a:b` includes the start and excludes the end: `v[1:3]` takes indices 1 and 2, not 3. Leaving one end empty means \"from the start\" or \"to the end\", so `v[:2]` is the first two elements. A third number is the step: `v[::2]` takes every second element."
          },
          {
            "code": "v = [10, 20, 30, 40, 50]\n\nprint(v[0])      # 10, the first\nprint(v[-1])     # 50, the last\nprint(v[1:3])    # [20, 30], from 1 up to but not including 3\nprint(v[:2])     # [10, 20]\nprint(v[::2])    # [10, 30, 50], every second one"
          },
          {
            "p": "This rule repeats identically for strings, NumPy arrays and Pandas columns, which you'll see in Lesson 4. You learn it once and use it everywhere. Strings do have one quirk though: they're immutable, meaning they can't be changed once created, just like tuples. You can't change a character (a letter, a digit, a space) in place, you can only build a new string."
          },
          {
            "code": "s = \"Vianu\"\nprint(s[0])        # V, indexing works\n# s[0] = \"X\"       # error: TypeError, strings can't be modified\n\ns2 = \"X\" + s[1:]   # \"X\" glued to \"ianu\"\nprint(s2)          # Xianu, a new string"
          },
          {
            "p": "The line that starts with `#` is a comment, so it doesn't run. If you delete the `#`, Python gives a `TypeError`. `s[1:]` is the slice from index 1 to the end, which is `\"ianu\"`."
          },
          {
            "p": "Some characters can't be typed directly between quotes, a new line for example. For special characters in strings you use escape sequences: a backslash `\\` followed by a character that says which special character you want. `\\n` is a new line, `\\t` a tab (a wide space, like the Tab key), `\\\\` a single backslash, `\\\"` a quote mark inside a double-quoted string."
          },
          {
            "code": "print(\"first line\\nsecond line\")   # prints two lines\nprint(\"column1\\tcolumn2\")          # a tab between the two words"
          }
        ]
      },
      {
        "heading": "Conditions and loops",
        "blocks": [
          {
            "p": "So far, every line has run, one after another. Often you want a block of code to run only in certain situations, for example to print \"good\" only if the score is above 0.8. That's what `if` and `else` are for."
          },
          {
            "code": "score = 0.9\nif score > 0.8:\n    print(\"good\")\nelse:\n    print(\"weak\")\n# prints: good"
          },
          {
            "p": "`if` checks a condition, here `score > 0.8`. If it's true, the lines under it run. If it's false, the lines under `else` run instead. The `if` and `else` lines end with a colon (`:`). The lines under them are shifted right by four spaces, which is called indenting, and they form a block: they belong to the `if` or the `else` above them. Blocks are marked by indentation, not by braces like in other languages. Four spaces, consistently."
          },
          {
            "p": "To repeat something for every element of a list, you use a `for` loop. `for s in scores:` takes each element of `scores` in turn, puts it in the variable `s` and runs the block underneath. One pass through the block is called an iteration. The `for` line ends with a colon too. Below, there's an `if` inside the loop's block, so the `print` lines are indented twice: once for the `for`, once for the `if`."
          },
          {
            "code": "scores = [0.71, 0.83, 0.79]\nfor s in scores:\n    if s > 0.8:\n        print(\"good\", s)\n    else:\n        print(\"weak\", s)\n# prints:\n# weak 0.71\n# good 0.83\n# weak 0.79"
          },
          {
            "p": "A condition is a question whose answer is `True` or `False`. Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`and`, `or`, `not`) combine to build conditions. `==` means \"equal\" and has two signs, because a single `=` is assignment. `!=` means \"not equal\", and `<=` and `>=` are \"less than or equal\" and \"greater than or equal\". `and` needs both conditions to be true, `or` is happy with one, and `not` flips: true becomes false. If you're coming from another language, Python writes `and`/`or`/`not` instead of `&&`/`||`/`!`."
          },
          {
            "code": "score, attempts = 0.9, 3\nif score > 0.8 and attempts < 5:\n    print(\"continue\")\nif not (score < 0.5 or attempts == 0):\n    print(\"worth trying\")\n# prints:\n# continue\n# worth trying"
          },
          {
            "p": "The first `if` passes, because 0.9 > 0.8 and 3 < 5 are both true. In the second, the parenthesis is false (neither 0.9 < 0.5 nor 3 == 0 is true), and `not` makes it true. There's no `else` here: it's optional, and without it, when the condition is false, the block simply doesn't run."
          },
          {
            "note": "`0`, `0.0`, `\"\"`, `[]`, `{}`, `set()` and `None` are all \"false\" when you put them in an `if`, even though they aren't `False`: Python treats any zero or empty value as false. An empty list is false, one with elements is true, so `if scores:` runs the block only if the list has at least one element."
          },
          {
            "p": "A classic pitfall if you're coming from another language: `==` compares values (\"do they have the same value?\"), `is` compares whether two names point to the exact same object in memory (\"is it the very same box?\", like `b = a` above). Two lists built separately can have the same values and still be different objects. For `None`, always use `is`, never `==`: there's only one `None`, so you ask directly whether the variable is it."
          },
          {
            "code": "x = None\nif x is None:       # correct\n    print(\"empty\")  # this prints\n\na = [1, 2]\nb = [1, 2]\nprint(a == b)   # True, same values\nprint(a is b)   # False, different objects"
          },
          {
            "p": "For a short `if` that just picks between two values, the conditional expression (ternary) fits on one line. It reads almost like English: `label` gets `\"good\"` if the score is above 0.8, otherwise it gets `\"weak\"`."
          },
          {
            "code": "score = 0.9\nlabel = \"good\" if score > 0.8 else \"weak\"\nprint(label)   # good"
          },
          {
            "p": "When you also need the position, use `enumerate`. When you walk two lists at once, `zip`. `enumerate(scores)` gives you a pair at each iteration, the position and the element, so you write two variables after `for`: `i` gets the position, `s` the element. `zip` walks two lists side by side, like a zipper: first element with first, second with second."
          },
          {
            "code": "scores = [0.71, 0.83, 0.79]\nfor i, s in enumerate(scores):\n    print(i, s)\n# prints:\n# 0 0.71\n# 1 0.83\n# 2 0.79\n\nfor name, score in zip([\"a\", \"b\"], [0.7, 0.9]):\n    print(name, score)\n# prints:\n# a 0.7\n# b 0.9"
          },
          {
            "p": "Besides `for`, there's `while`, which keeps going as long as a condition stays true. `while` checks the condition before each iteration and stops once it becomes false. `break` exits the loop, `continue` skips the current iteration and jumps straight to the next one. In the example, `i` is the index of the element being checked: it starts at 0 and goes up by 1 at each step, as long as it's less than `len(scores)`."
          },
          {
            "code": "scores = [0.71, 0.42, 0.83, 0.97, 0.79]\ni = 0\nwhile i < len(scores):\n    if scores[i] < 0.5:\n        i += 1\n        continue\n    if scores[i] > 0.95:\n        break\n    print(scores[i])\n    i += 1\n# prints:\n# 0.71\n# 0.83"
          },
          {
            "p": "Step by step: 0.71 gets printed. 0.42 is below 0.5, so `continue` moves on to the next element without printing it. 0.83 gets printed. At 0.97, `break` stops the loop entirely, so 0.79 never even gets checked. The `i += 1` before `continue` matters: without it, `i` would stay put and the loop would spin forever. If that happens to you, stop the cell with the ■ button in the notebook's top bar."
          },
          {
            "p": "Sorting is done with `sorted()` or `.sort()`, and `key` tells it what to sort by. `sorted(my_list)` gives you a new, sorted list and leaves the old one unchanged. `my_list.sort()` sorts the list itself, in place, without making a new one."
          },
          {
            "code": "print(sorted([3, 1, 2]))   # [1, 2, 3]\n\nstudents = [(\"Ana\", 9.2), (\"Bogdan\", 8.7), (\"Cris\", 9.5)]\nstudents.sort(key=lambda x: x[1], reverse=True)\nprint(students)   # [('Cris', 9.5), ('Ana', 9.2), ('Bogdan', 8.7)]"
          },
          {
            "p": "Each student is a tuple (name, grade). `key=lambda x: x[1]` tells `sort` to compare students by `x[1]`, the element at position 1, which is the grade. `lambda x: x[1]` is a short function written on one line, which takes a student `x` and returns their grade; we explain it in Functions. `reverse=True` flips the order, so the highest grades come first. Arguments written with a name, like `key=...` or `reverse=True`, are called keyword arguments. Python prints text with single quotes (`'Cris'`), but it's the same as `\"Cris\"`."
          }
        ]
      },
      {
        "heading": "Comprehensions (lists built in one line)",
        "blocks": [
          {
            "p": "A short way to build one structure from another. It shows up often in contest code, so it's worth reading fluently even if you write ordinary loops at first. The example below makes the same list of squares both ways. `range(5)` gives you the numbers 0, 1, 2, 3, 4 one at a time: from 0 up to 5, not including 5, like with slices."
          },
          {
            "code": "# with an ordinary loop\nsquares = []\nfor x in range(5):\n    squares.append(x * x)\nprint(squares)   # [0, 1, 4, 9, 16]\n\n# the same, with a list comprehension\nsquares = [x * x for x in range(5)]\nprint(squares)   # [0, 1, 4, 9, 16]\n\nscores = [0.71, 0.83, 0.79, 0.88]\ngood = [s for s in scores if s > 0.8]\nprint(good)      # [0.83, 0.88], only those above 0.8"
          },
          {
            "p": "Read it like this: \"take each x from range, keep it if it passes the condition (the `if`, when there is one), put x*x in the list\". The same works for dictionaries and sets. `range(n)` doesn't actually build a list of n numbers, it produces the values one at a time: it only remembers where it got to and works out the next number when it's asked for. So `range(10_000_000)` doesn't hold ten million numbers in memory. The underscores in `10_000_000` just help you count the digits, like the spaces in 10 000 000. A list of ten million numbers would take up a few hundred MB, while `range` takes up almost nothing."
          },
          {
            "code": "lengths = {c: len(c) for c in [\"rf\", \"xgboost\"]}\nprint(lengths)          # {'rf': 2, 'xgboost': 7}\nunique_lengths = {len(c) for c in [\"rf\", \"svm\", \"cnn\"]}\nprint(unique_lengths)   # {2, 3}"
          },
          {
            "p": "The first line makes a dictionary, with `key: value` in the braces, and the third makes a set, with just the value. `len` also counts the characters of a string: `len(\"rf\")` is 2. `rf`, `xgboost`, `svm` and `cnn` are short names of models you'll learn later. In the set, 3 appears only once, even though `\"svm\"` and `\"cnn\"` both have three letters."
          },
          {
            "p": "A generator expression looks like a list comprehension but with round brackets instead. It doesn't build the whole structure in memory at once, it produces values one at a time, which matters for sums or large loops. `sum(...)` adds up all the values it gets, and the parentheses of `sum` double as the generator's parentheses."
          },
          {
            "code": "total = sum(x * x for x in range(1_000_000))\nprint(total)   # 333332833333500000"
          }
        ]
      },
      {
        "heading": "Functions",
        "blocks": [
          {
            "p": "A function groups code you repeat. You've already used ready-made functions, like `print`, `len` or `max`. Now you write your own: you give it a name once, then call it whenever you need it."
          },
          {
            "code": "def double(x):\n    return x * 2\n\nprint(double(5))    # 10\nprint(double(21))   # 42"
          },
          {
            "p": "`def` (short for define) starts the definition: the function's name, then, in parentheses, the parameters, which are the names the function receives values under. Here there's just one, `x`. The function's body is the indented block underneath, and `return` sends the result back to whoever called the function. For `double(5)`, Python puts the argument 5 into `x`, works out 5 * 2 and hands you back 10, which `print` shows. The definition alone doesn't print anything: the function only runs when you call it."
          },
          {
            "p": "Arguments can have default values, and the defaults always go last, after the others. A default value is written in the `def`, with `=`, and is used when you don't pass that argument in the call. The function below brings the numbers of a list into the range from `minimum` to `maximum`, 0 to 1 by default, something you'll do often starting with Lesson 5."
          },
          {
            "code": "def normalize(v, minimum=0.0, maximum=1.0):\n    lo, hi = min(v), max(v)\n    if hi == lo:\n        return [minimum] * len(v)\n    return [minimum + (x - lo) / (hi - lo) * (maximum - minimum) for x in v]\n\nprint(normalize([2, 4, 6]))               # [0.0, 0.5, 1.0]\nprint(normalize([2, 4, 6], maximum=10))   # [0.0, 5.0, 10.0]"
          },
          {
            "p": "Step by step, for `[2, 4, 6]`: `lo` is 2 (the smallest) and `hi` is 6 (the largest), so `hi - lo` is 4. For each `x`, the formula works out `(x - lo) / (hi - lo)`: for 2 that's 0 / 4 = 0.0, for 4 it's 2 / 4 = 0.5, for 6 it's 4 / 4 = 1.0. With `minimum` 0 and `maximum` 1, the result is just that fraction, and in the second call `maximum=10` multiplies it by 10. The `if` avoids dividing by zero when all the numbers are equal: then `return` gives back `[minimum] * len(v)`, which is `minimum` repeated `len(v)` times, and stops the function right there."
          },
          {
            "p": "Unpacking lets you assign several values at once. When a function writes `return min(v), max(v)`, it returns a tuple with two values, and `smallest, largest = ...` unpacks it: the first value goes into `smallest`, the second into `largest`. You'll see it constantly when splitting data."
          },
          {
            "code": "a, b = 1, 2\n\ndef min_and_max(v):\n    return min(v), max(v)\n\nsmallest, largest = min_and_max([4, 1, 7])\nprint(smallest, largest)   # 1 7\n\n# in Lesson 6: X_tr, X_val, y_tr, y_val = train_test_split(X, y)"
          },
          {
            "p": "In Lesson 6, `train_test_split` splits the data into four pieces, which you get all at once in four variables. `X` is the features (the input columns), `y` is the target, as in Lesson 2, and `tr` and `val` stand for training and validation."
          },
          {
            "p": "Default values have a trap. The function below is supposed to start from an empty list every time:"
          },
          {
            "code": "def add(x, my_list=[]):\n    my_list.append(x)\n    return my_list\n\nprint(add(1))   # [1]\nprint(add(2))   # [1, 2], not [2]"
          },
          {
            "note": "Never use a list or a dictionary as an argument's default value. It's created once, when the function is defined, and stays shared between calls: that's why the second call found the 1 left there by the first. Use `None` and create the value inside: `def add(x, my_list=None):`, and in the body `if my_list is None: my_list = []`."
          },
          {
            "p": "A variable created inside a function only exists there, it's local: it disappears when the function ends. Variables created outside any function are called global. The function can see global variables but can't change them without the `global` keyword (a word with a special meaning in Python, like `if` or `def`). Needing `global` is usually a sign the function should be rewritten to take in and return values instead of touching outside state."
          },
          {
            "code": "counter = 0\n\ndef wrong_increment():\n    counter = counter + 1   # error when called, see below\n\ndef increment():\n    global counter\n    counter += 1   # works, but avoid this pattern when you can\n\nincrement()\nincrement()\nprint(counter)   # 2"
          },
          {
            "p": "If you call `wrong_increment()`, you get an `UnboundLocalError`. Because the function assigns something to `counter`, Python treats it as a new local variable, and at `counter + 1` that variable doesn't have a value yet. You'll use `global` rarely, when you really do want a function to change something outside it, like a count of calls."
          },
          {
            "p": "Sometimes you don't know in advance how many arguments you'll get. `*args` collects positional arguments into a tuple, `**kwargs` collects keyword ones into a dictionary. Positional arguments are given just by value, in order, like 0.8 and 0.9 below, while keyword arguments are given with a name, like `model=\"rf\"`. The stars are what matter: `args` and `kwargs` are just the usual names, and below we called them `scores` and `info`. `print` is built the same way, which is why it accepts any number of values."
          },
          {
            "code": "def report(*scores, **info):\n    print(\"scores:\", scores)\n    print(\"info:\", info)\n\nreport(0.8, 0.9, model=\"rf\", seed=42)\n# prints:\n# scores: (0.8, 0.9)\n# info: {'model': 'rf', 'seed': 42}"
          },
          {
            "p": "A `lambda` is a small, unnamed function written on one line. You'll see it often as an argument to `sorted`, `map` or `filter`. `lambda x: x * 2` does exactly what `double` above does: it takes `x` and returns `x * 2`, without `def` and without `return`. You use one when you need a small function just once, as an argument to another, like you saw with `sort(key=...)`."
          },
          {
            "code": "double = lambda x: x * 2\nprint(double(5))     # 10\n\nscores = [0.71, 0.83, 0.79, 0.88]\nprint(list(map(lambda x: x * x, [1, 2, 3])))     # [1, 4, 9]\nprint(list(filter(lambda x: x > 0.8, scores)))   # [0.83, 0.88]"
          },
          {
            "p": "`map(f, my_list)` applies the function `f` to each element. `filter(f, my_list)` keeps only the elements for which `f` gives `True`. Both hand out their results one at a time, like `range`, so you wrap them in `list(...)` to see the whole list."
          },
          {
            "p": "In practice, a comprehension often does the job more clearly than `map`/`filter`: `[x * x for x in [1, 2, 3]]` also gives `[1, 4, 9]`. You'll reach for those mostly when the function already comes defined from somewhere else."
          },
          {
            "p": "A function can call itself, recursively. Rarely needed in everyday AI code, but useful to recognize: it always needs a base case that stops the recursion. The example computes a factorial: the factorial of 5 is 5 · 4 · 3 · 2 · 1 = 120, which is 5 times the factorial of 4."
          },
          {
            "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))   # 120"
          },
          {
            "p": "`factorial(5)` asks for `5 * factorial(4)`, which asks for `4 * factorial(3)`, and so on down to `factorial(1)`. That's the base case: `n <= 1` returns 1 straight away, with no further call. Then the multiplications happen on the way back: 1, 2, 6, 24, 120. Without the base case, the function would call itself forever. You'll recognize it in the search algorithms of Lesson 11, like backtracking, which are naturally written recursively."
          },
          {
            "p": "A function with `yield` instead of `return` is a generator: it doesn't return all its values at once, it produces one at a time. At each `yield`, the function hands a value to the `for` loop and pauses right there. When the loop asks for the next value, the function picks up where it left off. You use one when you have lots of values and don't want to keep them all in memory at once, like with `range`."
          },
          {
            "code": "def even_numbers(up_to):\n    for n in range(up_to):\n        if n % 2 == 0:   # remainder by 2 is 0, so n is even\n            yield n\n\nfor n in even_numbers(10):\n    print(n)\n# prints 0, 2, 4, 6, 8, each on its own line"
          }
        ]
      },
      {
        "heading": "Classes and modules",
        "blocks": [
          {
            "p": "A class keeps data and functions together. You won't write many, but every library you use is built from classes, so you need to understand what happens when you write `model.fit(X, y)`. That's how you'll train a model in the coming lessons: `fit` makes it learn from the features `X` and the answers `y`, and `model.predict(...)` then asks it for predictions on new data."
          },
          {
            "p": "Here, a class means something you build in Python, not a category from classification. A class is a template, like the blank sign-up form for the olympiad. An object is a thing made from the template, like a filled-in form: it has the same fields, but with its own data. You can make as many objects as you want from the same class. You've seen this before: `int` and `list` are classes, which is why `type(n)` printed `<class 'int'>`, and every list you create is an object of the class `list`."
          },
          {
            "code": "class Mean:\n    def __init__(self):\n        self.value = None\n\n    def fit(self, y):\n        self.value = sum(y) / len(y)\n        return self\n\n    def predict(self, n):\n        return [self.value] * n\n\nm = Mean().fit([1, 2, 3])\nprint(m.predict(2))    # [2.0, 2.0]"
          },
          {
            "list": [
              "`class Mean:` starts the template. Everything indented under it belongs to the class.",
              "A method is a function written inside the class, like `fit` and `predict`. You call it with a dot, `m.predict(2)`, just like `.append` on lists.",
              "`self` is the object itself. Every method gets it first, but you don't pass it when calling: for `m.predict(2)`, Python puts `m` into `self` and 2 into `n` on its own.",
              "An attribute is a variable kept inside the object, written with `self.` in front, like `self.value`. It stays there between calls, so `predict` sees what `fit` worked out.",
              "`__init__` runs by itself when you create the object with `Mean()` and sets it up: here it starts the attribute `value` at `None`. Names with two underscores on each side are special names that Python calls by itself."
            ]
          },
          {
            "p": "Step by step: `Mean()` creates the object and runs `__init__`. `.fit([1, 2, 3])` works out the mean, (1 + 2 + 3) / 3 = 2.0, and keeps it in `self.value`. `return self` hands back the object itself, which is why you can write `Mean().fit(...)` on one line and put the result in `m`. `m.predict(2)` returns `[self.value] * 2`, the mean repeated twice, one prediction for each of two new rows."
          },
          {
            "p": "That's exactly the scikit-learn pattern: `fit` learns and remembers, `predict` uses what it learned. `Mean` is the simplest model possible: it learns a single value and predicts it for any new row."
          },
          {
            "p": "A class can inherit from another, with `class Child(Parent):`, and `super()` calls the version from the base class. Inheritance means the new class (the child) gets everything the base class (the parent) has, attributes and methods, and only adds or changes what's different. You'll see this pattern constantly later on, with neural networks in PyTorch (Lesson 14), where every model is a class that inherits from `nn.Module`."
          },
          {
            "code": "class Model:\n    def __init__(self, name):\n        self.name = name\n\n    def describe(self):\n        return f\"model {self.name}\"\n\nclass ModelWithSeed(Model):\n    def __init__(self, name, seed):\n        super().__init__(name)\n        self.seed = seed\n\n    def describe(self):\n        return f\"{super().describe()}, seed {self.seed}\"\n\nprint(ModelWithSeed(\"rf\", 42).describe())   # model rf, seed 42"
          },
          {
            "p": "`ModelWithSeed(\"rf\", 42)` runs the child's `__init__`. There, `super().__init__(name)` first runs the parent's `__init__`, which sets `self.name = \"rf\"`, then the child adds `self.seed = 42`. A seed is a starting number for random values, which you'll see at the end of the lesson. The child also writes its own `describe`, which replaces the parent's, but uses it through `super().describe()`: it takes the text `\"model rf\"` and adds `\", seed 42\"` to it."
          },
          {
            "p": "Someone else's code comes in with `import`. A module is a file of ready-made Python code, functions and classes, that you bring into your program. Python comes with lots of modules included: `math` has math functions, and `collections` has extra data structures. The libraries from Lesson 1, like NumPy or Pandas, are made of modules too, except you install those yourself with pip."
          },
          {
            "code": "import math\nfrom collections import Counter\n\nprint(math.sqrt(16))               # 4.0\nprint(Counter([\"a\", \"b\", \"a\"]))    # Counter({'a': 2, 'b': 1})"
          },
          {
            "p": "`import math` brings in the whole module, and you call its functions with the module's name in front: `math.sqrt(16)` is the square root of 16. `from collections import Counter` brings in only `Counter`, which you use without a prefix. `Counter` counts how many times each value appears: `'a'` twice, `'b'` once."
          }
        ]
      },
      {
        "heading": "Errors and exceptions",
        "blocks": [
          {
            "p": "Code that reads files, parses data (turns text into values, like `\"12\"` into the number 12) or takes input typed by a person will produce errors, guaranteed. Python calls them exceptions, and you catch them with `try`/`except` so one bad line doesn't crash the whole program."
          },
          {
            "code": "def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print(\"can't divide by zero\")\n        return None\n\nprint(divide(10, 2))   # 5.0\nprint(divide(10, 0))   # can't divide by zero, then None"
          },
          {
            "p": "`try` runs the block under it. If an error of the type named in `except` happens, here `ZeroDivisionError` (dividing by zero), Python doesn't stop the program: it jumps into the block under `except` and carries on from there."
          },
          {
            "p": "The exceptions you'll hit most in contests: `ValueError` (a failed conversion, like `int(\"abc\")`), `KeyError` (a key that doesn't exist in a dictionary), `IndexError` (an index outside the list), `FileNotFoundError` (a wrong path to the data, meaning the file isn't where you told Python to look). An error you don't catch with `try` stops the cell and shows a message like this one:"
          },
          {
            "code": "grades = {\"Ana\": 9}\nprint(grades[\"Radu\"])\n\n# under the cell you see:\n# ---------------------------------------------------------------------------\n# KeyError                                  Traceback (most recent call last)\n# Cell In[1], line 2\n#       1 grades = {\"Ana\": 9}\n# ----> 2 print(grades[\"Radu\"])\n#\n# KeyError: 'Radu'"
          },
          {
            "p": "When one shows up, read the message from the bottom up: the last line tells you the type of error and why, and further up the arrow points to the line of code that failed. Here, `KeyError: 'Radu'` means the dictionary has no key `'Radu'`, and `---->` points to line 2 of the cell. When the error happens inside a function, the message has several pieces like this one, stacked one under another, and the bottom one shows exactly where it happened."
          },
          {
            "note": "Don't catch exceptions with a bare `except:`, with no type after it. It hides every mistake, including the ones you should actually see. Catch the exact type you expect, for example `except ValueError:`."
          },
          {
            "p": "`finally` always runs, with or without an exception, good for cleanup, for example to close something you opened or to report that a step has finished. `assert` quickly checks an assumption and stops the program with a clear message if it's false, useful for catching bugs (mistakes in the code) early instead of at the end of a run."
          },
          {
            "code": "try:\n    n = int(\"abc\")\nexcept ValueError:\n    print(\"not a number\")\nfinally:\n    print(\"check finished\")   # runs no matter what\n\nX = [[1, 2], [3, 4], [5, 6]]   # three rows of data\ny = [0, 1]                     # only two answers\nassert len(X) == len(y), \"X and y must have the same length\"\n# AssertionError: X and y must have the same length"
          },
          {
            "p": "`X` and `y` are the usual names for the features (here a list of rows, each row a list of two numbers) and the target (one answer per row). One answer is missing, so `assert` stops the cell with your message. With three values in `y`, the line would pass without printing anything."
          }
        ]
      },
      {
        "heading": "Text and regular expressions",
        "blocks": [
          {
            "p": "Many problems, especially in NLP (processing text written by people, in Lesson 12), need text cleaned up before anything else. Strings have built-in methods for this."
          },
          {
            "code": "s = \"  The Second WORLD War  \"\nprint(s.strip())          # removes the spaces at both ends\nprint(s.lower())          # lowercase\nprint(s.split())          # ['The', 'Second', 'WORLD', 'War']\nprint(\"-\".join([\"a\", \"b\", \"c\"]))     # a-b-c\nprint(s.replace(\"WORLD\", \"world\"))   # The Second world War"
          },
          {
            "p": "`.split()` cuts the text at the spaces and gives you the list of words. `\"-\".join(my_list)` does the opposite: it glues together the elements of a list of strings, with `\"-\"` between them. `.replace(old, new)` replaces the text `old` with `new` everywhere. None of them changes `s`, because strings are immutable: each one gives you a new string."
          },
          {
            "p": "For patterns more complicated than `.replace()`, the `re` module matches text against regular expressions. A regular expression (regex) is a pattern that describes what kind of text you're looking for, for example \"a run of digits\", rather than an exact piece of text."
          },
          {
            "code": "import re\n\ntext = \"contact: ana@example.com or 0722 123 456\"\nemails = re.findall(r\"[\\w.]+@[\\w.]+\", text)\nprint(emails)    # ['ana@example.com']\n\ncleaned = re.sub(r\"\\d+\", \"\", text)   # removes every digit\nprint(cleaned)   # contact: ana@example.com or"
          },
          {
            "list": [
              "`r\"...\"`: a raw string, in which Python leaves the backslash `\\` alone, so it reaches `re` unchanged. You always write patterns this way.",
              "`\\d`: a digit, from 0 to 9.",
              "`\\w`: a letter, a digit or `_`, meaning a character that can be part of a word.",
              "`+`: \"one or more\" of whatever comes right before it, so `\\d+` is a run of digits stuck together, like `0722`.",
              "`[...]`: any one of the characters in the brackets, so `[\\w.]` is a letter, a digit, `_` or a dot."
            ]
          },
          {
            "p": "Put together, `[\\w.]+@[\\w.]+` means \"letters, digits or dots, then @, then letters, digits or dots again\", which is the shape of an email address. `re.findall(pattern, text)` gives you the list of every match, and `re.sub(pattern, new, text)` replaces them with `new`, here with nothing."
          },
          {
            "note": "`re` is worth learning gradually, not all at once. At first just remember `findall` (finds every match) and `sub` (replaces), and look up the rest when you need it."
          }
        ]
      },
      {
        "heading": "Files and data formats",
        "blocks": [
          {
            "p": "Reading and writing a text file use `with`, which closes it on its own even if an error comes up. That matters, because what you write is only safely in the file once it's closed."
          },
          {
            "code": "with open(\"notes.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"first line\\n\")\n\nwith open(\"notes.txt\", encoding=\"utf-8\") as f:\n    for line in f:\n        print(line.strip())   # first line"
          },
          {
            "p": "`open(\"notes.txt\", \"w\", ...)` opens the file for writing: `\"w\"` (for write) creates it if it doesn't exist and wipes everything in it if it does. `as f` gives the open file the name `f`, and `f.write(...)` writes text into it; `\\n` ends the line. Without a second argument, `open` opens the file for reading only. `for line in f` walks through it line by line, and `.strip()` removes the `\\n` at the end of each line. The file appears in the same folder as the notebook."
          },
          {
            "p": "Always pass `encoding=\"utf-8\"`. Without it, on Windows, accented characters get read wrong. The encoding is the rule for how letters get saved as numbers in the file, and UTF-8 is the standard rule, which knows about accented letters too."
          },
          {
            "p": "Contest data rarely comes as plain text. It's usually CSV or JSON, and Python has standard modules for both, even before you get to Pandas. A CSV file is a table written as text: the first line has the column names, and each line after it is a row of the table, with the values separated by commas. The code below first writes a three-line CSV, so you have something to read."
          },
          {
            "code": "import csv\n\nwith open(\"scores.csv\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"name,score\\n\")\n    f.write(\"Ana,0.91\\n\")\n    f.write(\"Bogdan,0.78\\n\")\n\nwith open(\"scores.csv\", encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row[\"name\"], row[\"score\"])\n# prints:\n# Ana 0.91\n# Bogdan 0.78"
          },
          {
            "p": "`csv.DictReader` reads each row as a dictionary: the column name is the key, and what's written in the table is the value. The values it reads are text: `row[\"score\"]` is `\"0.91\"`, so to calculate with it you write `float(row[\"score\"])`."
          },
          {
            "p": "JSON is a text format that looks almost exactly like a Python dictionary. The code below saves the dictionary `data` to `result.json`, where it shows up as the text `{\"model\": \"rf\", \"score\": 0.87}`, then reads it back. `json.dump(data, f)` writes, and `json.load(f)` reads and gives you a dictionary again."
          },
          {
            "code": "import json\n\ndata = {\"model\": \"rf\", \"score\": 0.87}\nwith open(\"result.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f)\n\nwith open(\"result.json\", encoding=\"utf-8\") as f:\n    loaded = json.load(f)\nprint(loaded[\"score\"])   # 0.87"
          },
          {
            "p": "For file paths, `pathlib` is clearer than gluing strings together with `+`. A file's path is its address on the computer: the folders it sits in, then its name, so `data/train.csv` is the file `train.csv` in the folder `data`. With `Path`, the `/` sign doesn't divide: it joins a folder and a file name, with the right separator for your system, `/` on macOS and Linux, `\\` on Windows."
          },
          {
            "code": "from pathlib import Path\n\nfolder = Path(\"data\")\nfile = folder / \"train.csv\"\nprint(file)            # data/train.csv (on Windows, data\\train.csv)\nprint(file.exists())   # False, unless you have a data folder with train.csv"
          }
        ]
      },
      {
        "heading": "Random and reproducibility",
        "blocks": [
          {
            "p": "A lot of things in AI look random: splitting data, initializing a model (the numbers it starts from, before it learns), shuffling a training set. The `random` module controls this, and a `seed` makes results repeatable."
          },
          {
            "p": "A computer doesn't really roll dice. Its \"random\" numbers come from a random number generator, a formula that begins with one number and works out from it a sequence that only looks random. That first number is the seed. The same seed gives exactly the same sequence of numbers every time."
          },
          {
            "code": "import random\n\nrandom.seed(42)\nprint(random.random())        # 0.6394267984578837, every time with seed 42\nprint(random.randint(1, 10))  # 1\nscores = [0.71, 0.83, 0.79, 0.88]\nrandom.shuffle(scores)        # shuffles the list in place\nprint(scores)                 # [0.83, 0.88, 0.71, 0.79]"
          },
          {
            "p": "`random.random()` gives a number with decimals between 0 and 1. `random.randint(1, 10)` gives a whole number from 1 to 10, including 10, unlike `range`. `random.shuffle(my_list)` shuffles the list in place, meaning it changes the list itself without making a new one. Run the cell several times: thanks to `random.seed(42)`, you get the same results every time. 42 is just a habit, any number works."
          },
          {
            "note": "Set `random.seed(...)` once, at the start of the script (the program or the notebook). Without it, running the code twice gives different results, which makes it impossible to fairly compare two ideas: you can't tell whether the score went up because of the idea or by luck."
          },
          {
            "p": "`random.seed` only controls the `random` module. NumPy (Lesson 4) has its own generator, which you fix with `np.random.seed(42)`, and scikit-learn functions and models take `random_state=42`, as you'll see when splitting data in Lesson 6."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Kaggle Learn: Python",
        "url": "https://www.kaggle.com/learn/python"
      }
    ]
  },
  {
    "moduleCode": "S4",
    "duration": "~2 weeks",
    "intro": "NumPy is Python's library for numeric computing, which means working on many numbers at once, like the sum or the mean of a million values. It works with arrays (an array is like a list of numbers, except they all have the same type) and runs operations much faster than an ordinary loop. Pandas is built on top of NumPy and adds labels, meaning names for columns and rows. A Pandas table looks like a spreadsheet: every column has a name, and every row has an index, a label that by default is the row's number (0, 1, 2...). You'll use both on almost every contest problem, whatever the model.",
    "sections": [
      {
        "heading": "Install",
        "blocks": [
          {
            "p": "Both are external libraries that don't come with Python: they're code written by other people, which pip downloads for you (Lesson 1). You install them once, in the project's virtual environment (the separate box for the project's libraries, from Lesson 1), together with Matplotlib, Seaborn and Pillow. Matplotlib and Seaborn draw charts, and Pillow opens images."
          },
          {
            "code": "pip install numpy\npip install pandas\npip install matplotlib seaborn pillow",
            "caption": "Run these in a terminal, in the project folder, with the virtual environment activated."
          }
        ]
      },
      {
        "heading": "Why plain Python isn't enough",
        "blocks": [
          {
            "p": "In ordinary Python, a list of a million numbers you want to add up element by element is done with a for loop. It works, but it's slow. In a list, each element can be anything (a number, some text, another list), so at every step Python first checks what type the element is, and only then does the addition. With real data, that becomes unbearable."
          },
          {
            "p": "NumPy solves it with a new structure: the ndarray (short for \"n-dimensional array\", an array with any number of dimensions), a grid of numbers of the same type, with a fixed shape. The grid can be a row of numbers, a table with rows and columns, or something with more dimensions. Fixed shape means that, unlike a list, you can't add elements to it with `.append()`."
          },
          {
            "p": "Since all the numbers have the same type, NumPy doesn't need to check anything at each step. Operations apply to the whole array at once, with no loop in Python: NumPy runs the loop itself, in compiled code written in C, which runs much faster. A one-dimensional array is also called a vector, and this idea, writing the operation on the whole vector instead of a loop, is called vectorization. It's tens of times faster."
          },
          {
            "code": "import numpy as np\n\n# slow, in pure Python\ntotal = 0\nfor x in range(1_000_000):\n    total += x * x\nprint(total)   # 333332833333500000\n\n# fast, vectorized\nv = np.arange(1_000_000)\ntotal = (v * v).sum()\nprint(total)   # 333332833333500000, the same result",
            "caption": "The same sum, but the second version is much faster."
          },
          {
            "p": "`import numpy as np` brings in the library under a short name, `np`, which you then write in front of every function from it. `np.arange(1_000_000)` makes an array with the numbers from 0 to 999999, like `range`. `v * v` multiplies each number by itself, and `.sum()` adds them all up: on a small array, `[0 1 2 3]`, you'd get `[0 1 4 9]` and a sum of 14."
          }
        ]
      },
      {
        "heading": "Creating and reshaping arrays",
        "blocks": [
          {
            "p": "`np.array()` turns a Python list into an ndarray. `np.zeros(n)` and `np.ones(n)` make an array filled with 0 or 1, handy as an empty slot to fill in. If you give them a shape instead of `n`, as in `np.ones((2, 3))`, you get a matrix, which is a table of numbers, here with 2 rows and 3 columns. The double parentheses aren't a typo: `(2, 3)` is a tuple (Lesson 3) that describes the shape."
          },
          {
            "p": "`np.arange(start, stop, step)` works like `range`, but returns an array, and `stop` isn't included. `np.linspace(start, stop, n)` splits an interval into n evenly spaced values, with both ends included, useful for plots."
          },
          {
            "code": "a = np.array([1, 2, 3])      # [1 2 3]\nzeros = np.zeros(5)          # [0. 0. 0. 0. 0.]\nones = np.ones((2, 3))       # 2x3 matrix filled with 1:\n                             # [[1. 1. 1.]\n                             #  [1. 1. 1.]]\nsteps = np.arange(0, 10, 2)  # [0 2 4 6 8], no 10\nline = np.linspace(0, 1, 5)  # [0.   0.25 0.5  0.75 1.  ]"
          },
          {
            "p": "The comments show what `print` displays for each line. NumPy writes arrays without commas, with spaces between the numbers, and `0.` means 0.0, a number with decimals. Jupyter only displays the last line of a cell on its own, and slightly differently, for example `array([0., 0., 0., 0., 0.])` or `np.int64(2)`, but with the same values. To see them all, wrap them in `print`."
          },
          {
            "p": "Every array has a single `dtype`, the type of all its elements (`int64`, `float64`, etc). `int64` means whole numbers, like `int` from Lesson 3, and `float64` means numbers with decimals, like `float`. The 64 is how much memory each number takes (64 bits), and it doesn't matter for now. Mixing an int and a float in the same array converts everything to float."
          },
          {
            "code": "a.dtype                    # int64\nnp.array([1, 2.5])         # [1.  2.5], now 1 is a float too\nnp.array([1, 2.5]).dtype   # float64"
          },
          {
            "p": "`reshape` changes an array's shape without changing its content, as long as the total number of elements stays the same. The shape says how many elements the array has along each direction. `np.arange(6)` has shape `(6,)`: one dimension, with 6 numbers (the comma tells you it's a tuple with a single element). `reshape(2, 3)` lays them out in 2 rows of 3, row by row. That works because 2 × 3 = 6, whereas `reshape(4, 2)` would throw an error, since 4 × 2 = 8. `flatten()` does the opposite, bringing it back to one dimension."
          },
          {
            "code": "v = np.arange(6)       # [0 1 2 3 4 5], shape (6,)\nm = v.reshape(2, 3)    # shape (2, 3):\n                       # [[0 1 2]\n                       #  [3 4 5]]\nm.flatten()            # back to [0 1 2 3 4 5]"
          },
          {
            "note": "A slice of an array (`v[1:4]`) is a view, not a copy. With a list, a slice is a new list; with NumPy, it's only a window onto the same numbers in memory, like `b = a` from Lesson 3. That way NumPy doesn't copy millions of numbers for every slice, but changing the slice changes the original too. If you want an independent copy, ask for it explicitly with `.copy()`."
          },
          {
            "code": "v = np.array([1, 2, 3, 4])\npiece = v[1:3]        # [2 3]\npiece[0] = 99\nprint(v)              # [ 1 99  3  4], the original changed too\n\ncopy = v[1:3].copy()\ncopy[0] = -1\nprint(v)              # [ 1 99  3  4], unchanged this time"
          }
        ]
      },
      {
        "heading": "ndarray: shape, axes, indexing",
        "blocks": [
          {
            "p": "An ndarray has a shape: how many rows, how many columns, how many dimensions. A row of numbers has one dimension (1D), a table has two (2D): rows and columns. You create a 2D array from a list of lists, where each inner list becomes a row, like `x` below."
          },
          {
            "p": "A grayscale image is a 2D matrix, a color one is 3D (height, width, channels): every pixel, meaning every dot in the image, has three numbers, for red, green and blue. Your first move on any bug is to print the shape and check it's what you thought."
          },
          {
            "p": "The axes are the directions you operate along. On `x` below, with 2 rows and 3 columns: with `axis=0` you go down each column and combine the rows, so you get one result per column (3 values). With `axis=1` you go along each row and get one result per row (2 values). To keep them apart: the axis you pass disappears from the shape, so (2, 3) becomes (3,) with `axis=0` and (2,) with `axis=1`. Mixing up the axes is one of the most common beginner mistakes."
          },
          {
            "code": "x = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nx.shape          # (2, 3): 2 rows, 3 columns\nx.mean(axis=0)   # mean of each column: [2.5 3.5 4.5]\nx.mean(axis=1)   # mean of each row: [2. 5.]"
          },
          {
            "p": "The first column holds 1 and 4, so its mean is (1 + 4) / 2 = 2.5. The first row holds 1, 2 and 3, so its mean is 6 / 3 = 2. Without `axis`, `x.mean()` takes the mean of all 6 numbers: 3.5."
          },
          {
            "p": "On an array with several dimensions, indexing and slicing are written with a comma between dimensions, instead of separate brackets: where you'd write `x[0][1]` for a list of lists, in NumPy you write `x[0, 1]`, row first, then column. A bare `:` is a slice with no ends, meaning \"everything\", so `x[:, 0]` means every row, column 0."
          },
          {
            "code": "x[0, 1]      # 2, row 0, column 1\nx[:, 0]      # [1 4], every row, column 0\nx[0, :]      # [1 2 3], all of row 0"
          },
          {
            "p": "Indexing with a boolean mask is a tool you use daily: you build an array of True/False and select only the elements where it's True. That's how you filter data with no loop. The name comes from `bool`, the True/False type from Lesson 3. A comparison like `x > 3` runs on every element and gives an array of the same shape, full of True and False: that's the mask."
          },
          {
            "code": "x > 3            # [[False False False]\n                 #  [ True  True  True]]\nx[x > 3]         # only the elements greater than 3 -> [4 5 6]\nx[x > 3] = 0     # and you can change them in place too\nprint(x)         # [[1 2 3]\n                 #  [0 0 0]]"
          }
        ]
      },
      {
        "heading": "Broadcasting: how NumPy matches different shapes",
        "blocks": [
          {
            "p": "When you add a number to an array, NumPy adds it to every element."
          },
          {
            "code": "np.array([1, 2, 3]) + 10   # [11 12 13]"
          },
          {
            "p": "It's as if 10 had been stretched into an array `[10 10 10]`, the same shape as the other one. A single number that isn't an array is called a scalar. Broadcasting is the rule by which NumPy does operations between arrays of different shapes, automatically stretching the smaller one to fit. Half the beginner errors come from shapes that don't match the way you thought."
          },
          {
            "p": "The rule: NumPy compares shapes from right to left. Two dimensions match if they're equal or if one of them is 1 (that one stretches). A scalar matches anything."
          },
          {
            "p": "Below, `X` has shape (2, 3) and the column means have shape (3,). From the right, 3 and 3 match. The means are missing the first dimension, so NumPy treats it as 1 and stretches them over 2 rows: it subtracts the same row of means from every row of `X`."
          },
          {
            "code": "X = np.array([[1, 2, 3],\n              [4, 5, 6]])      # shape (2, 3)\nmeans = X.mean(axis=0)         # shape (3,): [2.5 3.5 4.5]\nX_centered = X - means         # (2,3) - (3,) matches, subtracts per column\nprint(X_centered)              # [[-1.5 -1.5 -1.5]\n                               #  [ 1.5  1.5  1.5]]",
            "caption": "Centering a matrix on its means, with no loop at all."
          },
          {
            "p": "Centering means subtracting each column's mean from it, so every column ends up with a mean of 0. The first column, 1 and 4 with a mean of 2.5, becomes -1.5 and 1.5. You'll do this step often when preparing data for a model, and you'll see it again in Lesson 5, under scaling."
          },
          {
            "p": "On the other hand, `X - X.mean(axis=1)` throws an error: the row means have shape (2,), and from the right, 3 and 2 aren't equal and neither is 1. If you turn them into a column with `reshape(2, 1)`, the shape becomes (2, 1) and it matches, because the 1 stretches across the 3 columns."
          },
          {
            "note": "When an operation throws a shape error, print the shapes of the two operands (the two arrays in the operation) and apply the right-to-left rule. Nine times out of ten you see straight away where they don't match."
          }
        ]
      },
      {
        "heading": "Sorting, searching and set operations in NumPy",
        "blocks": [
          {
            "p": "`np.sort()` sorts an array without changing it in place: it returns a new, sorted array. `np.argsort()` returns the indices that would sort the array, meaning the positions of the elements, from the smallest to the largest. It's useful when you want to sort one array by another's values."
          },
          {
            "code": "v = np.array([3, 1, 2])\nnp.sort(v)          # [1 2 3]\nnp.argsort(v)       # [1 2 0], the indices in ascending order\n\nnames = np.array([\"Ana\", \"Bogdan\", \"Cris\"])\nnames[np.argsort(v)]  # ['Bogdan' 'Cris' 'Ana']"
          },
          {
            "p": "Read `[1 2 0]` like this: the smallest element is `v[1]`, which is 1, the next one is `v[2]`, which is 2, and the largest is `v[0]`, which is 3. An array of indices inside square brackets picks the elements at those positions, in that order, so `names[np.argsort(v)]` puts the names in ascending order of the values in `v`."
          },
          {
            "p": "`np.where(condition, then, else)` picks between two values element by element, more flexible than a plain mask. On `v`, the condition `v > 1` gives `[True False True]`: where it's True, `np.where` takes the value from `v`, and where it's False it puts 0. A mask, `v[v > 1]`, would keep only `[3 2]`, whereas here all 3 positions stay. `argmax`/`argmin` give the position of the largest, or smallest, element."
          },
          {
            "code": "np.where(v > 1, v, 0)   # [3 0 2], keeps what's above 1, the rest becomes 0\nv.argmax()               # 0, the position of 3\nv.argmin()               # 1, the position of 1"
          },
          {
            "p": "`np.unique()` returns the distinct values in an array, sorted: each value once, like the sets from Lesson 3. `np.concatenate()` joins several arrays into one: you give it a list of the pieces, and it puts them one after another."
          },
          {
            "code": "np.unique([1, 2, 2, 3, 1])      # [1 2 3]\nnp.concatenate([[1, 2], [3, 4]]) # [1 2 3 4]"
          }
        ]
      },
      {
        "heading": "Pandas: data with labels",
        "blocks": [
          {
            "p": "Real data has names: an age column, a score column, a class column (in these examples, a school class, like 9A). Pandas adds labels on top of NumPy, in two structures: Series (a single column, with an index) and DataFrame (a whole table, several columns). The DataFrame is the structure most contest datasets arrive in. The index is each row's label, and if you don't give one, Pandas numbers the rows 0, 1, 2..."
          },
          {
            "code": "import pandas as pd\n\ns = pd.Series([10, 20, 30], index=[\"a\", \"b\", \"c\"])\nprint(s[\"b\"])     # 20\nprint(s)\n# a    10\n# b    20\n# c    30\n# dtype: int64\n\ndf = pd.DataFrame({\"name\": [\"Ana\", \"Bogdan\"], \"score\": [9.2, 8.7]})\nprint(df)\n#      name  score\n# 0     Ana    9.2\n# 1  Bogdan    8.7"
          },
          {
            "p": "In a printed Series you see the index on the left, the values on the right and, on the last line, the type of the values. In `df`, each key of the dictionary becomes a column name, and its list becomes the values in that column. You didn't give an index, so Pandas used 0 and 1."
          },
          {
            "p": "Under the hood, a DataFrame is a dictionary of Series, one per column: `df[\"score\"]` gives you the score column, as a Series, just like `d[\"key\"]` gives you a value from a dictionary. You read a CSV file (the text file with comma-separated values, from Lesson 3) in one line, then look at it before anything else: the first rows, the column types, how many values are missing."
          },
          {
            "code": "import pandas as pd\n\ndf = pd.read_csv(\"data.csv\")\n\ndf.head()        # first 5 rows\ndf.info()        # types and non-null counts\ndf.describe()    # stats on the numeric columns"
          },
          {
            "p": "`head()` shows you the first 5 rows (`head(10)` shows 10). `info()` prints how many rows the table has and, for each column, its name, how many non-null values it has and its type. Non-null means not missing: if a column has fewer than the number of rows, it has gaps. Number columns show up as `int64` or `float64`, and text columns as `str` (`object` in older versions of Pandas)."
          },
          {
            "p": "`describe()` computes eight statistics for each numeric column. Here they are for the grades 9, 7, 10, 6 and 8."
          },
          {
            "code": "grades = pd.DataFrame({\"score\": [9, 7, 10, 6, 8]})\nprint(grades.describe())\n#            score\n# count   5.000000\n# mean    8.000000\n# std     1.581139\n# min     6.000000\n# 25%     7.000000\n# 50%     8.000000\n# 75%     9.000000\n# max    10.000000"
          },
          {
            "p": "`count` is how many values there are, `mean` is the average, and `min` and `max` are the smallest and largest values. `std` is the standard deviation, which measures how spread out the values are around the mean: 0 if they're all equal, larger the further they drift from it. `25%`, `50%` and `75%` are the quartiles. Sorted, the grades are 6, 7, 8, 9, 10: at `50%` sits the middle value, 8, called the median, and 7 and 9 are a quarter and three quarters of the way along. You'll come back to all of them in Lesson 5."
          }
        ]
      },
      {
        "heading": "Selection: loc vs iloc",
        "blocks": [
          {
            "p": "There are two ways to select from a DataFrame, and mixing them is a classic mistake. loc selects by label (the column name, the index value). iloc selects by position (which row, which column, counting from 0)."
          },
          {
            "p": "On a freshly created table, with the index 0, 1, 2, both find the same rows. The difference shows up when the labels are no longer in order, for example after sorting. `sort_values(\"score\", ascending=False)` arranges the rows from the highest score to the lowest, and each row takes its label with it."
          },
          {
            "code": "students = pd.DataFrame({\"name\": [\"Ana\", \"Bogdan\", \"Cris\"],\n                         \"score\": [7.5, 9.2, 8.7]})\ndf = students.sort_values(\"score\", ascending=False)\nprint(df)\n#      name  score\n# 1  Bogdan    9.2\n# 2    Cris    8.7\n# 0     Ana    7.5\n\ndf.loc[0, \"score\"]         # 7.5, the row labeled 0 (Ana)\ndf.iloc[0, 1]              # 9.2, the first row (Bogdan), column 1\ndf.loc[df[\"score\"] > 8]    # all rows with score above 8"
          },
          {
            "p": "`df.loc[0, \"score\"]` looks for the row labeled 0, which is Ana, even though she's now last. `df.iloc[0, 1]` takes the first row in the table, whichever it is, and the second column (positions start at 0). The last line uses a boolean mask, like in NumPy: `df[\"score\"] > 8` gives True or False for each row, and `loc` keeps the rows with True, here Bogdan and Cris."
          }
        ]
      },
      {
        "heading": "Missing values and cleanup",
        "blocks": [
          {
            "p": "Real data almost always has gaps, duplicate rows or wrong types, and a model trained on dirty data makes bad predictions. `isna()` flags where a value is missing, `dropna()` removes rows with gaps, `fillna(value)` fills them in."
          },
          {
            "p": "Pandas marks a missing value with `NaN` (short for \"Not a Number\"). An empty cell in a CSV becomes `NaN` when you read it, and in code you write it as `np.nan`."
          },
          {
            "code": "df = pd.DataFrame({\"name\": [\"Ana\", \"Bogdan\", \"Cris\"],\n                   \"score\": [9.0, np.nan, 7.0]})\n\ndf.isna().sum()          # how many values are missing per column\n                         # name 0, score 1\ndf_complete = df.dropna()  # removes rows with any gap: Ana and Cris stay\n# fills gaps with the mean\ndf[\"score\"] = df[\"score\"].fillna(df[\"score\"].mean())\nprint(df)\n#      name  score\n# 0     Ana    9.0\n# 1  Bogdan    8.0\n# 2    Cris    7.0"
          },
          {
            "p": "`isna()` gives a table of the same shape, with True where a value is missing. `.sum()` adds up each column, and True counts as 1 and False as 0, so you get the number of gaps. `mean()` skips `NaN`, so the mean is (9 + 7) / 2 = 8, and Bogdan gets 8.0."
          },
          {
            "p": "`dropna` and `fillna` don't change the data in place, they return a new copy, so you have to store it in a variable. Without `=`, the line does nothing."
          },
          {
            "note": "Choose between `dropna` and `fillna` based on how many rows you have and what the gap means: if few values are missing, you can drop them; if many are missing, dropping throws away too much good data with them."
          },
          {
            "p": "`duplicated()` flags rows identical to an earlier one, `drop_duplicates()` removes them. Below, Ana appears twice with exactly the same values: `duplicated()` gives False for the first occurrence and True for the second, and `drop_duplicates()` keeps only the first."
          },
          {
            "p": "`astype()` changes a column's type, for example from text to a number: the text `\"9.5\"` becomes the number 9.5. `pd.to_datetime` turns text like `\"2026-10-01\"` into calendar dates that Pandas can do arithmetic with, for example how many days lie between two dates."
          },
          {
            "code": "df = pd.DataFrame({\"name\": [\"Ana\", \"Ana\", \"Bogdan\"],\n                   \"score\": [\"9.5\", \"9.5\", \"8\"],\n                   \"date\": [\"2026-10-01\", \"2026-10-01\", \"2026-10-03\"]})\n\ndf.duplicated().sum()          # how many rows are duplicates: 1\ndf = df.drop_duplicates()\n\ndf[\"score\"] = df[\"score\"].astype(float)\ndf[\"date\"] = pd.to_datetime(df[\"date\"])   # text -> calendar date"
          }
        ]
      },
      {
        "heading": "groupby, merge, pivot: the ones you always use",
        "blocks": [
          {
            "p": "groupby splits the data into groups and computes something on each group: the mean per class, the sum per category. The example below has six students from two school classes, 9A and 9B."
          },
          {
            "code": "df = pd.DataFrame({\n    \"name\": [\"Ana\", \"Bogdan\", \"Cris\", \"Dan\", \"Elena\", \"Filip\"],\n    \"class\": [\"9A\", \"9A\", \"9A\", \"9B\", \"9B\", \"9B\"],\n    \"score\": [9.0, 10.0, 8.0, 5.0, 9.0, 7.0],\n})\n\ndf.groupby(\"class\")[\"score\"].mean()      # mean score per class\n# class\n# 9A    9.0\n# 9B    7.0\n# Name: score, dtype: float64\ndf.groupby(\"class\").size()               # how many rows each class has\n# 3 rows in 9A, 3 in 9B"
          },
          {
            "p": "`groupby(\"class\")` puts together the rows with the same class, `[\"score\"]` picks the column, and `.mean()` takes the mean in each group: for 9A, (9 + 10 + 8) / 3 = 9. The result is a Series with the classes as its index, and `Name: score` is its name, taken from the column."
          },
          {
            "p": "With `agg` you compute several statistics at once, and `transform` returns the result on every row, so you can put it back into the table as a new column."
          },
          {
            "code": "df.groupby(\"class\")[\"score\"].agg([\"mean\", \"std\", \"count\"])\n#        mean  std  count\n# class\n# 9A      9.0  1.0      3\n# 9B      7.0  2.0      3\n\ndf[\"class_mean\"] = df.groupby(\"class\")[\"score\"].transform(\"mean\")\nprint(df)\n#      name class  score  class_mean\n# 0     Ana    9A    9.0         9.0\n# 1  Bogdan    9A   10.0         9.0\n# 2    Cris    9A    8.0         9.0\n# 3     Dan    9B    5.0         7.0\n# 4   Elena    9B    9.0         7.0\n# 5   Filip    9B    7.0         7.0"
          },
          {
            "p": "`agg` takes the list of statistic names and gives one row per group, so 2 rows. `std` is the standard deviation from `describe()`: the grades in 9B (5, 7, 9) are more spread out than those in 9A (8, 9, 10), so it comes out larger. `transform` gives one value for every row of the original table, so 6: each student gets their class's mean, which is why the result fits straight into a new column."
          },
          {
            "p": "merge stitches two tables together on a common column. Below, one table has the students, another the grades, and the `id` column, each student's number, links them."
          },
          {
            "code": "df = pd.DataFrame({\"id\": [1, 2, 3],\n                   \"name\": [\"Ana\", \"Bogdan\", \"Cris\"]})\nother_table = pd.DataFrame({\"id\": [1, 3, 4],\n                            \"score\": [9.0, 7.5, 8.0]})\n\ndf.merge(other_table, on=\"id\", how=\"left\")\n#    id    name  score\n# 0   1     Ana    9.0\n# 1   2  Bogdan    NaN\n# 2   3    Cris    7.5\ndf.merge(other_table, on=\"id\", how=\"inner\")\n#    id  name  score\n# 0   1   Ana    9.0\n# 1   3  Cris    7.5"
          },
          {
            "p": "`on=\"id\"` says which column to match the rows on. how says what you do with the rows that have no match: left keeps everything from the left, inner keeps only the matches. Here Bogdan (id 2) has no grade, and the grade with id 4 has no student. With `how=\"left\"`, Bogdan stays, with `NaN` as his score; with `how=\"inner\"`, only Ana and Cris remain. The grade with id 4 disappears either way, because it has no match in the left table, `df`."
          },
          {
            "p": "When the tables have the same columns and you just want to stack one under the other, use `pd.concat()` instead of merge."
          },
          {
            "code": "df1 = pd.DataFrame({\"name\": [\"Ana\", \"Bogdan\"], \"score\": [9.0, 8.5]})\ndf2 = pd.DataFrame({\"name\": [\"Cris\"], \"score\": [7.5]})\n\npd.concat([df1, df2])   # stacks df2 under df1, same columns\n#      name  score\n# 0     Ana    9.0\n# 1  Bogdan    8.5\n# 0    Cris    7.5"
          },
          {
            "p": "`concat` doesn't match anything: the columns stay the same and only the rows add up, 2 + 1 = 3, so the table grows downwards, not sideways as with merge. Each row keeps its label, so the index now has 0 twice; `pd.concat([df1, df2], ignore_index=True)` renumbers the rows 0, 1, 2."
          },
          {
            "p": "pivot_table reshapes a long table into a wide one, with a column turned into a header: its values, here the years, become the names of the new columns. The long table below has one row for each score, with its class and year. The wide one has one row per class and one column per year. It's handy for reports and for spotting patterns across two dimensions at once."
          },
          {
            "code": "df = pd.DataFrame({\n    \"class\": [\"9A\", \"9A\", \"9A\", \"9B\", \"9B\", \"9B\"],\n    \"year\": [2025, 2025, 2026, 2025, 2026, 2026],\n    \"score\": [8.0, 9.0, 10.0, 6.0, 7.0, 8.0],\n})\n\n# mean score per class (rows) and year (columns)\ndf.pivot_table(index=\"class\", columns=\"year\",\n               values=\"score\", aggfunc=\"mean\")\n# year   2025  2026\n# class\n# 9A      8.5  10.0\n# 9B      6.0   7.5"
          },
          {
            "p": "`index` gives the rows of the new table, `columns` its columns, `values` what goes in the cells, and `aggfunc` how to combine the values that land in the same cell. For 9A in 2025 there are two scores, 8 and 9, so the cell gets their mean, 8.5."
          }
        ]
      },
      {
        "heading": "Other operations you'll use constantly",
        "blocks": [
          {
            "p": "`sort_values()` sorts a DataFrame by a column, and `ascending=False` means descending, from high to low. `value_counts()` counts how many times each distinct value shows up: on the students table, how many students each class has. On the target column, the one you predict (Lesson 2), it's the first check when you want to see if the classes are imbalanced. There, the classes are the possible values of the target, like spam and normal, and imbalanced means one shows up much more rarely, like 5 spam emails for every 95 normal ones."
          },
          {
            "code": "df.sort_values(\"score\", ascending=False)\ndf[\"class\"].value_counts()   # how many rows each class has"
          },
          {
            "p": "You add a new column by direct assignment, drop one with `drop`. `apply()` runs a function on every value in a column, useful when the transformation doesn't already have a built-in method."
          },
          {
            "code": "df[\"score_percent\"] = df[\"score\"] * 10\ndf = df.drop(columns=[\"unused_column\"])\ndf[\"label\"] = df[\"score\"].apply(lambda s: \"good\" if s > 8 else \"weak\")"
          },
          {
            "p": "The first line works on the whole column at once, like in NumPy: a score of 9.2 becomes 92.0. `drop(columns=[...])` takes the list of columns to remove and, like `dropna`, returns a new table. In `apply`, the function is a lambda (the short, nameless function from Lesson 3): it takes each score `s` in turn and returns `\"good\"` if it's above 8, `\"weak\"` otherwise."
          },
          {
            "p": "`corr()` computes the correlation between the numeric columns, a quick first step to see which columns look related to the target you want to predict. A correlation is a number between -1 and 1: close to 1 when two columns rise together (hours of study and the grade, say), close to -1 when one rises as the other falls, close to 0 when they don't look related. Lesson 5 goes into the details."
          },
          {
            "code": "df.corr(numeric_only=True)"
          },
          {
            "p": "The result is a table with one row and one column for each numeric column, and where they cross is their correlation. The diagonal is always 1, because every column is perfectly correlated with itself. `numeric_only=True` skips the text columns."
          },
          {
            "p": "At the end, you write the result back to disk with `to_csv`, in the exact format you upload for submission (the file with your predictions, from Lesson 2). `index=False` tells it not to write the index as well: without it, the file would start with an extra column of 0, 1, 2..., which the platform doesn't expect."
          },
          {
            "code": "df.to_csv(\"result.csv\", index=False)"
          }
        ]
      },
      {
        "heading": "Charts: Matplotlib and Seaborn",
        "blocks": [
          {
            "p": "A chart shows you in a few seconds what you wouldn't notice in a table: a skewed distribution, an impossible value, two columns that rise together. A column's distribution is how its values are spread out, which ones are common and which are rare. Skewed means most values sit on one side, while a few stretch far out on the other, the way prices usually do. Matplotlib is the base library, and Seaborn is built on top of it and draws statistical charts in a single line. The code below is a template: `df` is your table, and you swap in your own column names."
          },
          {
            "code": "import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# line: how a value changes over time\nplt.plot(df[\"day\"], df[\"temperature\"])\nplt.show()\n\n# bars: how many rows each category has\ndf[\"city\"].value_counts().plot(kind=\"bar\")\nplt.show()\n\n# histogram: the distribution of a column\nplt.hist(df[\"age\"], bins=30)\nplt.show()\n\n# scatter: the relationship between two columns\nplt.scatter(df[\"area\"], df[\"price\"])\nplt.show()"
          },
          {
            "list": [
              "The line joins the points in order, here the temperature on each day: you see whether the value rises, falls or jumps.",
              "The bars show how many rows each category has: `value_counts()` counts the cities, and `.plot(kind=\"bar\")` draws one bar for each. You see straight away if one category dominates.",
              "The histogram splits the column's values into intervals (`bins=30` means 30 intervals) and raises a bar over each interval, taller the more values fall into it. That's how you see the distribution: where the values pile up, whether it's skewed, whether there are impossible values.",
              "The scatter plot draws every row as a dot, with the area on the horizontal axis and the price on the vertical one. If the dots climb to the right, the two columns rise together."
            ]
          },
          {
            "p": "Seaborn adds the box plot, good for spotting outliers, and the heatmap, good for the correlation matrix. Outliers are values that don't fit the pattern, much larger or smaller than the rest of the column. The box plot draws one box per group, here per class (`x=\"class\"`), from the values in the `y=\"score\"` column, taken from the `data=df` table. The line inside the box is the median, and the box goes from the first to the third quartile (`25%` and `75%` from `describe()`). The lines sticking out of the box show how far the other values reach, and the dots drawn on their own, beyond them, are the outliers. Lesson 5 explains them in full."
          },
          {
            "code": "# box plot: median, quartiles and the values that don't fit\nsns.boxplot(x=\"class\", y=\"score\", data=df)\nplt.show()\n\n# heatmap: the correlations between columns, as colors\nsns.heatmap(df.corr(numeric_only=True), annot=True, cmap=\"coolwarm\")\nplt.show()"
          },
          {
            "p": "The heatmap colors each cell of a table of numbers, here the correlation table from `corr()`, so you can see at a glance which columns go together. `annot=True` also writes the number in each cell, and `cmap=\"coolwarm\"` picks the colors: blue for low values, red for high ones."
          },
          {
            "note": "Put `plt.show()` after every chart. Otherwise the charts in the same cell get drawn on top of each other."
          }
        ]
      },
      {
        "heading": "Images as arrays",
        "blocks": [
          {
            "p": "To a computer, a color image is an array of numbers with the shape (height, width, 3): three channels, red, green and blue, with values from 0 to 255. Each pixel has one number per channel, where 0 means none and 255 means full, so a red pixel is `[255 0 0]`, a white one `[255 255 255]` and a black one `[0 0 0]`. You read it with Pillow and turn it into a NumPy array, and from there everything you saw above works: on the array `a` below, `a[:, :, 0]` gives you just the red channel."
          },
          {
            "code": "from PIL import Image\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# convert(\"RGB\") drops the transparency channel, if there is one\nimg = Image.open(\"photo.png\").convert(\"RGB\")\na = np.array(img)\nprint(a.shape, a.dtype)                  # (height, width, 3) uint8\n\ngray = np.array(img.convert(\"L\"))        # black and white, one channel\nsmall = np.array(img.resize((64, 64)))   # the same size for every picture\n\nplt.imshow(a)\nplt.show()"
          },
          {
            "p": "For a 640 by 480 pixel photo, `print` shows `(480, 640, 3) uint8`: height first, then width. `uint8` is the pixel type: whole numbers with no minus sign (the u stands for \"unsigned\"), from 0 to 255, each taking 8 bits. Some PNGs also have a fourth channel, for transparency, and `convert(\"RGB\")` drops it. `convert(\"L\")` makes the image black and white: one number per pixel is left, the brightness, from 0 (black) to 255 (white), so the shape becomes (480, 640)."
          },
          {
            "p": "`resize((64, 64))` scales the photo to 64 by 64 pixels, so to the shape (64, 64, 3). A model wants every image to have the same shape, which is why you bring them all to the same size. Careful: `resize` takes the width first and the height second, the opposite of `shape`. `plt.imshow(a)` draws the array as an image."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "numpy-100",
        "url": "https://github.com/rougier/numpy-100"
      },
      {
        "title": "Kaggle Learn: Pandas",
        "url": "https://www.kaggle.com/learn/pandas"
      },
      {
        "title": "Kaggle Learn: Data Visualization",
        "url": "https://www.kaggle.com/learn/data-visualization"
      }
    ]
  },
  {
    "moduleCode": "S6",
    "duration": "~2 weeks",
    "intro": "Before you train anything, look at the data. At the distributions, at what's missing, at how the columns are scaled (how big the numbers in each one are). This stage is called EDA, exploratory data analysis, and it's the first thing you do on any new problem. Once you've looked, you get the data ready for the model, for example by filling in the gaps and turning text into numbers. That part is called preprocessing.",
    "sections": [
      {
        "heading": "What you're looking for",
        "blocks": [
          {
            "p": "EDA means asking data simple questions and looking at the answer before drawing any conclusion. How many rows and columns there are. What type each column has. What the target looks like, meaning what you want to predict. What's missing and how much. You can answer most of these with what you know from Lesson 4: `df.shape`, `df.info()`, `df.isna().sum()`."
          },
          {
            "p": "A column's distribution tells you which values show up in it and how often. Take the salaries at a big company: most people earn around 4000 lei, and a few earn 20000 or more. On a histogram you see a mountain of tall bars on the left and a long trail of short bars stretching to the right. That trail is called a long tail. A symmetric distribution looks the same on both sides of the middle, the way the heights of the students in a school usually do."
          },
          {
            "p": "Plot the distribution of every numeric column with a histogram. You see right away if it's symmetric, if it has a long tail, if it has impossible values (an age of 200, a negative price). Impossible values are signs of data errors you catch by eye."
          },
          {
            "code": "df[\"age\"].hist(bins=30)\ndf[\"target\"].value_counts()     # how many examples per class"
          },
          {
            "p": "The first line is pandas' shortcut for `plt.hist` from Lesson 4: the column's histogram, with 30 intervals. The second counts how many rows each class has, meaning each possible value of the target, like spam or normal."
          }
        ]
      },
      {
        "heading": "Outliers: values that don't fit",
        "blocks": [
          {
            "p": "An outlier is a value much larger or smaller than the rest of the column. It can be an error, like an age of 200, or it can be exactly what you're looking for, like an anomaly in a sensor. You spot it fastest on a box plot."
          },
          {
            "p": "The classic rule for outliers uses quartiles, which you've seen in `describe()`. Take nine prices, sorted from smallest to largest: 10, 12, 14, 15, 16, 18, 20, 22, 90. The median is the value in the middle, the fifth one: 16. The first quartile (Q1) is the value a quarter of the way through the list, and the third quartile (Q3) is the one three quarters of the way through. The second quartile is the median itself. From the first position to the last there are 8 steps: a quarter is 2 steps, so Q1 is the third value, 14. Three quarters is 6 steps, so Q3 is the seventh, 20. When the step doesn't come out whole, pandas takes a value between the two neighbors."
          },
          {
            "p": "The rule counts a value as an outlier if it's more than 1.5 × IQR below the first quartile or above the third. IQR (interquartile range) is the distance between quartile 1 and quartile 3. Here IQR = 20 - 14 = 6, and 1.5 × 6 = 9. So the limits are 14 - 9 = 5 and 20 + 9 = 29, and the only price outside them is 90. On the box plot from Lesson 4, these are exactly the values drawn as separate dots."
          },
          {
            "code": "q1, q3 = df[\"price\"].quantile([0.25, 0.75])\niqr = q3 - q1\nlow, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\noutliers = df[(df[\"price\"] < low) | (df[\"price\"] > high)]\nprint(len(outliers))"
          },
          {
            "p": "`quantile([0.25, 0.75])` computes Q1 and Q3 (0.25 is a quarter, 0.75 three quarters), and `q1, q3 = ...` unpacks them into two variables, as in Lesson 3. The `outliers` line keeps the rows where the price is below `low` or above `high`, like a boolean mask from Lesson 4. The `|` sign means \"or\": pandas needs it instead of `or`, with each condition in parentheses. On the nine prices, the code prints 1."
          },
          {
            "p": "What you do with them depends on the cause. You fix or drop errors. Real but extreme values you can cap at a limit with `clip`, and a column with a long right tail, like prices or incomes, you bring to a more balanced shape with `np.log1p`."
          },
          {
            "code": "df[\"price\"] = df[\"price\"].clip(upper=high)\ndf[\"income_log\"] = np.log1p(df[\"income\"])"
          },
          {
            "p": "`clip(upper=high)` replaces any value above `high` with `high`. In the example, 90 becomes 29 and the other prices stay the same."
          },
          {
            "p": "`np.log1p` uses the logarithm, a function you only get to in math in 10th grade. Here it's enough to know that it grows very slowly. Take 9, 99 and 999, which are 10, 100 and 1000 minus 1: `np.log1p` turns them into about 2.3, 4.6 and 6.9. Each multiplication by 10 adds only 2.3, so the big values get squeezed close to the others and the long tail shrinks. The \"1p\" stands for \"plus 1\": the function takes the logarithm of 1 + x so that it also works on 0, where it gives 0 (the plain logarithm doesn't exist at 0)."
          }
        ]
      },
      {
        "heading": "Imbalanced classes: why it matters early",
        "blocks": [
          {
            "p": "Classes are imbalanced when one of them shows up much more rarely than the others. If you're predicting a class that shows up in 2% of cases (fraud, a rare disease), a model that always says no gets 98% accuracy and is completely useless."
          },
          {
            "p": "Accuracy, from Lesson 2, is the percentage of correct answers. Take 1000 card payments, 20 of which are fraud. A model that always answers \"not fraud\" only gets those 20 wrong, so it's right on 980 out of 1000, which is 98%. And yet it hasn't caught a single fraud, which was its whole job."
          },
          {
            "p": "That's why you check class balance from the start: it changes which metric you use and how you split the data into training and validation (Lesson 6)."
          },
          {
            "note": "When a class is rare, accuracy lies. Keep this for Lesson 8, on evaluation: you'll need precision, recall and F1, not plain accuracy. Recall says how many of the real frauds you caught, precision says how many of your alarms were real frauds, and F1 combines the two into a single score."
          }
        ]
      },
      {
        "heading": "Correlations: which columns say the same thing",
        "blocks": [
          {
            "p": "Students' height and weight usually go up together, while the temperature outside and the gas used for heating move in opposite directions: when one goes up, the other goes down."
          },
          {
            "p": "Correlation measures how much two columns move together, from -1 (inverse) through 0 (not at all) to 1 (identical trend). Two nearly identical columns tell you something: maybe one is derived from the other, maybe you can drop one without losing information. Temperature in degrees Celsius and the same temperature in Fahrenheit, for example, have a correlation of 1, because the second is computed from the first."
          },
          {
            "code": "df.corr(numeric_only=True)     # correlation matrix between columns"
          },
          {
            "p": "The result is the correlation table from Lesson 4, with one row and one column for each numeric column."
          },
          {
            "p": "A relationship is linear when the points lie on a straight line, like the graph of a linear function in math class. Celsius and Fahrenheit are linked exactly like that: F = 1.8 × C + 32, so each extra degree Celsius always adds 1.8 degrees Fahrenheit."
          },
          {
            "p": "By default it's Pearson correlation, which only catches linear relationships. `df.corr(method=\"spearman\", numeric_only=True)` also catches columns that rise together without lying on a straight line."
          },
          {
            "p": "Spearman only looks at the order. It replaces each value with its rank (the smallest becomes 1, the next one 2, and so on), then computes Pearson on the ranks. Take x = 1, 2, 3, 4, 5 and y = 1, 10, 100, 1000, 10000. y always rises with x, but faster and faster, so the points don't lie on a straight line. Pearson gives about 0.76, while Spearman gives 1."
          },
          {
            "p": "Correlation doesn't mean causation. Two things can rise together without one causing the other. In summer, ice cream sales and drownings both go up, but ice cream doesn't cause drowning: the heat drives both. It's a hint of where to look, not a conclusion."
          }
        ]
      },
      {
        "heading": "Missing values: why first, then how",
        "blocks": [
          {
            "p": "Before you fill in a missing value, ask why it's missing. Sometimes the gap is a collection error. Sometimes the gap is information itself: an empty income field can mean the person refused to answer, which is meaningful on its own. In that case, add a separate column that flags the gap, for example `income_missing`, with 1 where the income is missing and 0 everywhere else."
          },
          {
            "p": "Filling in (imputation) uses the mean, the median or the most frequent value, or a model. The median is safer than the mean when there are outliers, because it isn't pulled by extreme values."
          },
          {
            "p": "Take five salaries: 3000, 3200, 3500, 4000 and 50000. The mean is 63700 / 5 = 12740, more than four of the five people earn. The median, the value in the middle, is 3500, a normal salary for this group. The most frequent value is the one you use for text columns, like the city, where you can't take an average."
          },
          {
            "p": "From here on, the examples use `X_train` and `X_val`. You split the training data in two: a part the model learns from and a part you keep aside to check it, just like the local validation from Lesson 2. `X_train` is the part of the data you train on and `X_val` the part you check the model on. `X` is the table of features, meaning the input columns, and `y` is the target, so `y_train` is the target for the rows in `X_train`. You'll see how to get them in the next lesson."
          },
          {
            "p": "Preprocessing tools in scikit-learn have two methods, `fit` and `transform`, following the `fit`/`predict` pattern from Lesson 3. `fit` learns some numbers from the data, here the median of each column; these numbers are called parameters. `transform` applies them to any table, here by filling the gaps with them. You learn them only from `X_train` and apply them to both parts, so the check stays fair. To the model, `X_val` has to be new data it hasn't learned anything from."
          },
          {
            "code": "from sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy=\"median\").fit(X_train)\nX_train = imp.transform(X_train)\nX_val = imp.transform(X_val)    # same parameters, learned on train"
          },
          {
            "p": "`strategy=\"median\"` picks the median; you can also use `\"mean\"` for the mean or `\"most_frequent\"` for the most frequent value. What comes out of `transform` is a NumPy array with no gaps, with the same rows and columns."
          },
          {
            "p": "`SimpleImputer` adds the column that flags the gap by itself, if you give it `add_indicator=True`. For each column that had gaps, it adds a column of 0 and 1 at the end. For example, the incomes 3000, gap, 4000 become 3000, 3500, 4000 (the gap got the median), plus a new column with 0, 1, 0."
          },
          {
            "p": "In time series, like a sensor's readings, a gap is usually filled with the last known value. You sort by time first, then use `ffill`."
          },
          {
            "code": "df = df.sort_values(\"time\")\ndf[\"temperature\"] = df[\"temperature\"].ffill()"
          },
          {
            "p": "`ffill` stands for forward fill: each gap gets the value from the row above it. The readings 20, gap, gap, 23 become 20, 20, 20, 23. That's why you sort first: the row above has to be the reading that came before."
          }
        ]
      },
      {
        "heading": "Scaling: which method and when",
        "blocks": [
          {
            "p": "Take two people: one is 20 years old and earns 3000 lei, the other is 25 and earns 3500 lei. If you treat them as two points in the plane, (20, 3000) and (25, 3500), the distance between them, by the Pythagorean theorem, is √(5² + 500²) ≈ 500.02. That's almost exactly the income gap. The 5 years barely count, only because age is measured in tens and income in thousands."
          },
          {
            "p": "Many models measure distances, like above (for example kNN, which looks for the closest rows, and K-Means, from Lesson 10). Others use gradients, meaning they learn by correcting themselves in small steps (regression, from Lesson 7, and neural networks, from Lesson 14). For them, a column with large values (income, in thousands) dominates one with small values (age, tens) purely by scale, not by importance. Scaling brings them to the same measure."
          },
          {
            "p": "Decision trees and Random Forest don't need it, because they split the data on thresholds. A decision tree (Lesson 7) asks questions like \"is the income above 3200?\". If you scale the column, only the threshold changes, and the rows get split the same way. A Random Forest is a group of such trees (Lesson 9)."
          },
          {
            "p": "There are two common methods, and the choice depends on the shape of the data. The first, standardization, uses the mean and the standard deviation from Lesson 4, which says how far the values typically sit from the mean. Take the values 10, 20, 30, with mean 20. Subtract the mean from each (-10, 0, 10), square them (100, 0, 100), take the mean of the squares (200 / 3 ≈ 66.67) and take the square root: the standard deviation is ≈ 8.16. Standardized, 10 becomes (10 - 20) / 8.16 ≈ -1.22, 20 becomes 0, and 30 becomes 1.22."
          },
          {
            "formula": "z = (x - μ) / σ",
            "explain": "Standardization: subtract the mean μ (read \"mu\") and divide by the standard deviation σ (\"sigma\"). The result has mean 0 and deviation 1. Use it as the default, for regression, SVM and neural networks (you'll see them in Lessons 7 and 14), when the data doesn't have extreme outliers."
          },
          {
            "code": "from sklearn.preprocessing import StandardScaler\nsc = StandardScaler().fit(X_train)   # learns μ and σ on TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)          # applies the same μ and σ"
          },
          {
            "p": "If you check by hand, watch out for one trap. `StandardScaler` takes the mean of the squares as above, dividing their sum by 3, and gets 8.16. In pandas, `.std()` divides the sum by 2 by default (the number of values minus 1) and gives 10.0 for the same values. With `.std(ddof=0)`, pandas gives 8.16 too."
          },
          {
            "p": "Min-max normalization, the second method, moves the values between 0 and 1. On 10, 20, 30, the minimum 10 becomes 0, the maximum 30 becomes 1, and 20 becomes (20 - 10) / (30 - 10) = 0.5."
          },
          {
            "formula": "x' = (x - min) / (max - min)",
            "explain": "Min-max normalization: brings values into the 0 to 1 range (x' is the new value). Use it when you need a fixed range, for example a neural network expecting input between 0 and 1, or images (pixels, already in 0-255). Sensitive to outliers: a single extreme point ruins the minimum or maximum for the rest of the column."
          },
          {
            "code": "from sklearn.preprocessing import MinMaxScaler\nsc = MinMaxScaler().fit(X_train)   # learns min and max on TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)"
          },
          {
            "p": "That last sentence, in numbers: add a 1000 next to 10, 20 and 30. The maximum becomes 1000, and 10, 20 and 30 end up at 0, 0.01 and 0.02, squeezed together near 0."
          },
          {
            "p": "When a column has outliers, a third option, `RobustScaler`, is safer: it subtracts the median and divides by the IQR, so one extreme point doesn't wreck the scale for everything else. On the nine prices from the outliers section (median 16, IQR 6), 10 becomes (10 - 16) / 6 = -1 and 22 becomes 1. The price of 90 ends up at about 12.33, far from the rest, but without squeezing the others together."
          },
          {
            "code": "from sklearn.preprocessing import RobustScaler\nsc = RobustScaler().fit(X_train)   # learns the median and IQR on TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)"
          },
          {
            "p": "All three learn on `X_train` and only apply to `X_val`, because the parameters depend on the data you learn them from. Say the training part has the incomes 3000, 3500 and 4000, and validation has 3200 and 50000. The mean on training is 3500, but on all five it's 12740: a single income from validation changed the number you prepare the training data with. The preprocessing has already \"seen\" validation, like a student who peeked at the exam questions. The validation score no longer tells you how well the model does on new data."
          },
          {
            "note": "The basic rule of preprocessing: learn the parameters (mean, deviation, median, min, max) only on the training set, then apply them to validation and test. Never the other way around. Otherwise test leaks into training and your score is a lie. This is called data leakage."
          }
        ]
      },
      {
        "heading": "Categorical variables: columns of categories",
        "blocks": [
          {
            "p": "A model wants numbers, but many columns are categories: city, color, type. Turning them into numbers is called encoding. Which encoding you pick depends on how many categories there are and whether they have a natural order. The number of different categories in a column is called its cardinality: the `color` column, with red, green and blue, has cardinality 3, while a zip code can have thousands."
          },
          {
            "p": "With no order and few categories, one-hot encoding is the choice: it turns each category into a separate column of 0 and 1. With three colors, red becomes [1,0,0], green [0,1,0]. No category outranks another."
          },
          {
            "code": "pd.get_dummies(df, columns=[\"city\", \"color\"])"
          },
          {
            "p": "`get_dummies` does this for the columns in `columns` and puts the old column's name in front of each category. A `city` column with Bucharest, Cluj and Iasi becomes `city_Bucharest`, `city_Cluj` and `city_Iasi`, and a row from Cluj gets 0, 1, 0. In recent pandas, the new columns come out as `True` and `False` instead of 1 and 0. To the model that's the same thing, and with `dtype=int` you get 0 and 1."
          },
          {
            "p": "With a natural order (small, medium, large), ordinal encoding turns them into numbers that keep the order, 0, 1, 2. It works well especially with tree-based models, which split on thresholds anyway."
          },
          {
            "code": "from sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(categories=[[\"small\", \"medium\", \"large\"]])\ndf[\"size_code\"] = enc.fit_transform(df[[\"size\"]])"
          },
          {
            "p": "`categories` takes the order you want as a list inside a list, one list for each column you encode (here just one). With double brackets, `df[[\"size\"]]` is a table with a single column, the shape scikit-learn tools ask for. `fit_transform` does `fit` and `transform` in one go."
          },
          {
            "p": "Label encoding does the same thing, one integer per category, but without you asking for the order, it comes from alphabetical order or the order of appearance. It's meant for the target y, not for input columns: on an input column with no real order, the numbers invent a false order that a linear model takes at face value. If Bucharest becomes 0, Cluj 1 and Iasi 2, a linear model (Lesson 7) ends up believing Cluj sits \"between\" Bucharest and Iasi."
          },
          {
            "code": "from sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ny_encoded = le.fit_transform(y_train)   # e.g.: \"spam\"/\"not\" -> 1/0"
          },
          {
            "p": "With hundreds of categories (zip code, product ID), one-hot would produce hundreds of columns that are almost all 0. Binary encoding is a middle ground: it turns each category into a number, then into binary digits, and each digit becomes a column. In base 2 (binary), numbers are written with only 0 and 1: 1 is 1, 2 is 10, 3 is 11, 4 is 100, 5 is 101. So category number 5 is written 101 and gets 1, 0 and 1 in three columns. For 100 categories you need only 7 columns (2^7 = 128), not 100, and it doesn't invent any order. With 7 digits of 0 and 1 you can form 128 different numbers, enough for all of them."
          },
          {
            "code": "from category_encoders import BinaryEncoder\nenc = BinaryEncoder(cols=[\"zip_code\"])\ndf_encoded = enc.fit_transform(df[\"zip_code\"])"
          },
          {
            "p": "`BinaryEncoder` comes from the `category_encoders` package, not from scikit-learn, so it might not be installed at the contest. An alternative with plain Pandas is frequency encoding: you replace the category with how many times it shows up. If 400001 appears in three rows and 700001 in one, the rows with 400001 get 3 and the one with 700001 gets 1."
          },
          {
            "code": "freq = df[\"zip_code\"].value_counts()\ndf[\"zip_code_freq\"] = df[\"zip_code\"].map(freq)"
          },
          {
            "p": "`value_counts()` gives, for each code, how many times it appears. `map` takes each value in the column, looks it up in that result and puts the number it finds in its place, like a dictionary lookup (Lesson 3)."
          },
          {
            "p": "Target encoding goes further: it replaces each category with the mean of the target for that category, a single column regardless of how many categories there are. Say the target is 1 if a customer bought something and 0 if not, and the customers from Cluj have the targets 1, 0, 1, 1: Cluj becomes their mean, 0.75. It helps most at very high cardinality, and it's also the most exposed to data leakage. A city that appears in a single row gets that row's own target, so the model sees the answer among its features."
          },
          {
            "code": "from sklearn.preprocessing import TargetEncoder\nenc = TargetEncoder()\nX_train_enc = enc.fit_transform(X_train[[\"zip_code\"]], y_train)\nX_val_enc = enc.transform(X_val[[\"zip_code\"]])"
          },
          {
            "p": "The `TargetEncoder` in scikit-learn protects itself against this. In `fit_transform`, each training row gets a mean computed from rows other than itself, and categories with few rows get pulled toward the overall mean. That's why you call `fit_transform` on `X_train` and only `transform` on `X_val`."
          },
          {
            "note": "Ordinal, binary and target encoding are all learned only on train too, same as imputation and scaling. Otherwise information from validation/test leaks into the encoding and your score lies."
          }
        ]
      },
      {
        "heading": "New columns from the ones you have",
        "blocks": [
          {
            "p": "Often the model learns better from a column you build yourself than from the raw data. That's feature engineering, building new features. Three patterns show up often: statistics per group, sliding windows over series, and pieces of a calendar date."
          },
          {
            "code": "# mean and deviation per group, put on every row\ndf[\"city_mean\"] = df.groupby(\"city\")[\"area\"].transform(\"mean\")\ndf[\"city_std\"] = df.groupby(\"city\")[\"area\"].transform(\"std\")\n\n# sliding window: the mean of the last 5 readings, per sensor\ndf = df.sort_values([\"sensor\", \"time\"])\nmean_5 = lambda s: s.rolling(5, min_periods=1).mean()\ndf[\"temp_5\"] = df.groupby(\"sensor\")[\"temperature\"].transform(mean_5)\n\n# pieces of a calendar date\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\ndf[\"month\"] = df[\"date\"].dt.month\ndf[\"weekday\"] = df[\"date\"].dt.day_of_week"
          },
          {
            "p": "The first part computes the mean and standard deviation of the area in each city and puts them on every row from that city, using `transform` from Lesson 4. If apartments in Cluj average 60 square meters, a 90-square-meter one in Cluj gets a `city_mean` of 60, and the model can see it's big for its city."
          },
          {
            "p": "A sliding window is a group of neighboring rows that slides down one row at a time. For the readings 20, 22, 24, 26, 28, 30, the mean of the last 5 gives 20, 21, 22, 23, 24, 26. At the start, `min_periods=1` averages however many readings exist so far, and at the last row the window holds 22, 24, 26, 28, 30. The function written with `lambda` (Lesson 3) takes the mean, and `transform` applies it to each sensor's readings separately, so the sensors don't get mixed."
          },
          {
            "p": "The last part turns the text into a calendar date with `pd.to_datetime` from Lesson 4 and pulls out the month (1 to 12) and the day of the week (0 is Monday, 6 is Sunday). For December 25, 2024 you get month 12 and day 2, a Wednesday. A model can't use a date directly, but it can learn from \"month 12\" or \"day 5\", for example that people buy more in December or on Saturdays."
          },
          {
            "p": "If the group statistic is computed from the target, it's really target encoding and you learn it only on train, as above."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Kaggle Learn: Data Cleaning",
        "url": "https://www.kaggle.com/learn/data-cleaning"
      },
      {
        "title": "Kaggle Learn: Feature Engineering",
        "url": "https://www.kaggle.com/learn/feature-engineering"
      }
    ]
  },
  {
    "moduleCode": "S5",
    "duration": "~1 week",
    "intro": "So far you've learned pieces: Python, NumPy, Pandas, EDA and preprocessing. This module ties them together. It brings no new theory, only the order in which things get done. That matters, because most olympiad mistakes don't come from the model, they come from steps taken in the wrong order. The chain of steps that takes you from the files you're given to the submission file is called a pipeline. A pipeline you can run end to end in twenty minutes is the most valuable tool you bring into a contest.",
    "sections": [
      {
        "heading": "The six steps, in order",
        "blocks": [
          {
            "p": "Every tabular contest problem, with the data in a table like a CSV file, looks the same from above. You read the data. You split it. You build a baseline, meaning a reference model that's as simple as it gets. You preprocess. You train and validate. You write the submission."
          },
          {
            "p": "The order isn't a suggestion. Each step assumes the previous one was done correctly, and two of them are easy to swap when you're rushing: splitting and preprocessing. Swap those and the preprocessing also learns from the validation rows, which is the data leakage from Lesson 5. Your local score becomes a lie, which you only discover on the private leaderboard."
          },
          {
            "list": [
              "Read the data and look at what you got.",
              "Split into training and validation.",
              "Build a dumb baseline, so you have a reference point.",
              "Preprocess, with parameters learned only on training data.",
              "Train a model and compare it against the baseline.",
              "Write the submission file and check it before uploading."
            ]
          }
        ]
      },
      {
        "heading": "Step 1: read and look",
        "blocks": [
          {
            "p": "The first thing after reading is checking that the data looks the way you think it does. How many rows, which columns, what type each one is, what the target looks like. This isn't full analysis, that's what Lesson 5, on EDA, is for. It's just confirming you didn't read the file wrong."
          },
          {
            "code": "import pandas as pd\n\ntrain = pd.read_csv(\"train.csv\")\ntest = pd.read_csv(\"test.csv\")\n\nprint(train.shape, test.shape)\nprint(train.dtypes)\nprint(train[\"target\"].value_counts())"
          },
          {
            "p": "`train.shape` gives you the number of rows and columns, for example `(1000, 6)`. `train.dtypes` shows each column's type, and text columns show up as `object` or `str`, depending on your pandas version. `value_counts()` counts how many rows each class of the target has."
          },
          {
            "p": "Compare the train columns against the test ones. The difference between them is, almost always, the target column itself. If anything else is missing, that's something to understand before moving on. The quickest way to see it is the set difference from Lesson 3: `set(train.columns) - set(test.columns)` gives you the columns that are in train but missing from test."
          }
        ]
      },
      {
        "heading": "Step 2: split before you touch anything",
        "blocks": [
          {
            "p": "This is where most points are lost. You need a slice of the data the model has never seen, so you can honestly estimate how good it is. The split happens before any transformation. This is where the `X_train` and `X_val` from Lesson 5 come from."
          },
          {
            "code": "from sklearn.model_selection import train_test_split\n\n# the id is just a row number, not information about the row\nX = train.drop(columns=[\"id\", \"target\"])\ny = train[\"target\"]\n\nX_tr, X_val, y_tr, y_val = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)"
          },
          {
            "p": "`X` gets every column except `id` and the target, meaning the features, the input columns. `y` gets the target. `train_test_split` shuffles the rows, splits them in two and returns four pieces: the features and target for training (`X_tr` and `y_tr`, short for `X_train` and `y_train`), then the same for validation (`X_val` and `y_val`). `test_size=0.2` sends 20% of the rows to validation, and the other 80% stay for training."
          },
          {
            "p": "The `stratify` argument keeps the same class proportions in both halves. Without it, on an imbalanced problem you can land a validation set that contains none of the rare class at all, and the score becomes meaningless."
          },
          {
            "p": "Say that out of 1000 rows, 100 belong to the rare class, which is 10%. With `stratify=y`, validation gets 200 rows with exactly 20 rare ones, and training gets 800 with 80 rare ones: 10% in both. Without `stratify`, the number of rare rows in validation changes from one split to the next, for example 12 or 26."
          },
          {
            "note": "A fixed `random_state` means the same split repeats on every run. Without it your score shifts between runs and you can no longer tell whether a change helped or you got lucky. It's the same idea as the seed from Lesson 3, and there's nothing special about 42: it just has to stay the same."
          }
        ]
      },
      {
        "heading": "Step 3: the dumb but honest baseline",
        "blocks": [
          {
            "p": "Before any serious model, build a stupid one. Always predict the majority class, the one with the most rows, or the mean of the target if you're predicting a number, and measure. That number is your floor: any model that doesn't beat it is worse than nothing."
          },
          {
            "code": "from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import f1_score\n\ndummy = DummyClassifier(strategy=\"most_frequent\").fit(X_tr, y_tr)\nprint(f1_score(y_val, dummy.predict(X_val), average=\"macro\"))"
          },
          {
            "p": "`DummyClassifier(strategy=\"most_frequent\")` is a model that doesn't even look at the features. During `fit` it only remembers the most frequent class in `y_tr`, and `predict` gives that class for every row. `f1_score` takes the correct answers first, then the predictions."
          },
          {
            "p": "F1 is a score between 0 and 1, where higher is better. Unlike accuracy, it isn't fooled by a rare class. `average=\"macro\"` computes F1 separately for each class and takes their average, so the rare class counts as much as the big one. Lesson 8 explains it in detail. With 90% of the rows in one class and 10% in the other, this baseline gets 90% accuracy but a macro F1 of only 0.47: about 0.95 on the big class and 0 on the rare one."
          },
          {
            "p": "It looks like a waste of time. It isn't. Often a complicated model produces a score that seems reasonable, until you compare it to the baseline and find it's the same or worse. Without the reference point, you'd never have known."
          }
        ]
      },
      {
        "heading": "Step 4: preprocessing that can't leak",
        "blocks": [
          {
            "p": "The preprocessing rule from Lesson 5: parameters (mean, deviation, categories) are learned only on the training data. The problem is that, done by hand, this rule is easy to break."
          },
          {
            "p": "The fix is Pipeline. You bind preprocessing to the model in a single object, and when you call `fit` on it, scikit-learn makes sure the transformations only learn from what you hand it for training."
          },
          {
            "p": "Think of an assembly line: every row goes through the same steps, in the same order. During `fit`, each step learns from the training data, transforms it and hands it to the next step, and at the end the model trains on whatever it receives. During `predict`, new rows go through the same steps with `transform` only, using the numbers learned in training."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.ensemble import RandomForestClassifier\n\nnumeric = X_tr.select_dtypes(include=\"number\").columns\ncategorical = X_tr.select_dtypes(exclude=\"number\").columns\n\npre = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"median\")),\n        (\"sc\", StandardScaler()),\n    ]), numeric),\n    (\"cat\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"oh\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), categorical),\n])\n\nmodel = Pipeline([\n    (\"pre\", pre),\n    (\"clf\", RandomForestClassifier(random_state=42)),\n])"
          },
          {
            "p": "`select_dtypes(include=\"number\")` picks the columns with numbers, and `exclude=\"number\"` picks all the others, meaning the text ones. `.columns` keeps only their names."
          },
          {
            "p": "`ColumnTransformer` sends each group of columns down its own line. It takes a list of tuples with three items each: a name you choose, the steps and the columns. The numeric columns fill their gaps with the median, then get standardized. The text ones fill their gaps with the most frequent value, then go through one-hot. A `Pipeline` takes (name, step) pairs, in the order they run. `OneHotEncoder` does the same one-hot as `pd.get_dummies` from Lesson 5, but it remembers the categories it saw during `fit`."
          },
          {
            "p": "`RandomForestClassifier` is the model at the end of the line, and `clf` is the usual short name for classifier. It's a model made of many decision trees that vote, explained in Lessons 7 and 9. Here all that matters is that it has `fit` and `predict`, like every scikit-learn model. `random_state=42` makes the result repeatable, as in the split."
          },
          {
            "p": "The `handle_unknown` argument matters in a contest: if a category shows up in test that wasn't in training, without it your code crashes at prediction time, exactly when you have no time to debug. Say training only has Cluj and Iasi, and Brasov shows up in test. Without the argument you get `ValueError: Found unknown categories`. With `handle_unknown=\"ignore\"`, Brasov gets 0 in all the city columns and the prediction carries on."
          }
        ]
      },
      {
        "heading": "Step 5: train and compare",
        "blocks": [
          {
            "p": "Now you have one object that does everything. You fit it on the training slice and measure it on validation, using the same metric the contest uses."
          },
          {
            "code": "model.fit(X_tr, y_tr)\nscore = f1_score(y_val, model.predict(X_val), average=\"macro\")\nprint(f\"model: {score:.4f}\")"
          },
          {
            "p": "The metric has to be the one from the problem statement. If the contest scores macro F1 and you optimize accuracy, you climb on your own score and fall on theirs."
          },
          {
            "note": "Change one thing between runs and write down the score every time. A table with ten rows, even on paper, is worth more than ten ideas tried at once where you can't tell which one helped."
          }
        ]
      },
      {
        "heading": "Step 6: the submission and the checks",
        "blocks": [
          {
            "p": "At the end you retrain on all the training data, not just the eighty percent slice. You used validation to choose; now there's no reason to throw those examples away. With more examples, the model usually learns a bit better. `model.fit(X, y)` reruns the whole line from scratch on every row: the medians and the model are all learned again."
          },
          {
            "code": "model.fit(X, y)\npred = model.predict(test.drop(columns=[\"id\"]))\n\nsub = pd.DataFrame({\"id\": test[\"id\"], \"target\": pred})\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "`test.drop(columns=[\"id\"])` leaves test with exactly the columns in `X`. `index=False`, as in Lesson 4, keeps the row numbers out of the file, where they'd show up as an extra column."
          },
          {
            "p": "Before uploading, three checks that have saved many contests: the row count matches the test file, the column names are exactly what the statement asks for, and there are no missing values in the predictions."
          },
          {
            "code": "assert len(sub) == len(test)\nassert list(sub.columns) == [\"id\", \"target\"]\nassert sub[\"target\"].isna().sum() == 0"
          },
          {
            "p": "`assert` (Lesson 3) stops the program with an error if a condition is false. If the cell runs without any message, all three checks passed."
          },
          {
            "p": "Safer still is to start from the sample file in the statement: you read it, check that the rows are in the same order as in test, change only the target column and save it. That way the column names and their order are exactly what's asked for."
          },
          {
            "code": "sub = pd.read_csv(\"sample_submission.csv\")\nassert (sub[\"id\"] == test[\"id\"]).all()\nsub[\"target\"] = pred\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "`sub[\"id\"] == test[\"id\"]` compares the two columns row by row, and `.all()` gives `True` only if every pair is equal."
          },
          {
            "p": "If the metric is AUC or log loss, you submit probabilities, not classes: `model.predict_proba(...)[:, 1]` gives you the probability of the positive class."
          },
          {
            "p": "Both of them score how good your probabilities are. AUC measures how well they rank the rows: 1 means every row from the positive class got a higher probability than every other row, and 0.5 is what you'd get by flipping a coin. Log loss punishes probabilities that are confident and wrong. If you say 0.99 for class 1 on a row that's actually class 0, you lose about five times more than if you'd said 0.6. For log loss, lower is better."
          },
          {
            "p": "`predict_proba` returns a table with one column per class, and on each row the probabilities add up to 1. `[:, 1]` takes every row from column 1, like NumPy in Lesson 4. The positive class is the one labeled 1, usually the one you're looking for, like fraud or spam."
          }
        ]
      },
      {
        "heading": "What this looks like on contest day",
        "blocks": [
          {
            "p": "You spend the first hour on the pipeline above, with a simple model. You already have a valid submission and a score on the leaderboard. From there you improve, with the safety net that whatever happens, something is submitted."
          },
          {
            "p": "The reverse order goes like this: you spend two hours on a good model and only then start on the submission. It's the most common way to finish a contest with zero points for code that almost worked."
          },
          {
            "p": "At ONIA you also submit the code that produced the file, and the platform runs it without internet access. Before every submission, run Restart Kernel and Run All Cells, to make sure the notebook works from scratch, and read the data with relative paths."
          },
          {
            "p": "A relative path starts from the folder the notebook is in, like `data/train.csv` or just `train.csv`. An absolute one starts from the root of the disk, like `C:/Users/Ana/Desktop/train.csv`, and doesn't exist on another computer. If the data sits next to the notebook, a relative path finds it wherever the folder gets moved."
          },
          {
            "p": "Near the end you pick the two submissions that count: usually the best one on local validation and a safer one, with a simpler model."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Take an archive problem from MLCompete and write the pipeline end to end in an hour, with a simple model."
      },
      {
        "title": "Run the same pipeline once with scaling before the split and once after, and compare the validation scores."
      },
      {
        "title": "Write yourself a template notebook with the six steps, to copy at the start of any problem."
      },
      {
        "title": "House Prices on Kaggle",
        "url": "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques"
      },
      {
        "title": "Kaggle Learn: Intermediate Machine Learning",
        "url": "https://www.kaggle.com/learn/intermediate-machine-learning"
      }
    ]
  },
  {
    "moduleCode": "S8",
    "duration": "~3 weeks",
    "intro": "Here you learn the basic tools of supervised learning: linear and logistic regression, Naïve Bayes, decision trees, SVM. Supervised means you have examples with the correct answer (labels) and the model learns from them. Don't stop at how you call them from scikit-learn. Understand what each one optimizes, meaning which error it tries to make as small as possible, and when it fits, because that's what lets you choose well at the contest.",
    "sections": [
      {
        "heading": "What training a model means",
        "blocks": [
          {
            "p": "Start with an example. You want to guess a house's price from its area alone, with the rule price = w · area, where w is a single number: how many thousand euros one square meter costs. You have three houses with known prices: 50 m² for 100 thousand euros, 80 m² for 170 thousand and 100 m² for 200 thousand."
          },
          {
            "p": "Try w = 1.5. The rule predicts 75, 120 and 150 thousand, so it's off by 25, 50 and 50, 125 thousand in total. With w = 2 it predicts 100, 160 and 200, so it's off by 0, 10 and 0, only 10 thousand in total. The second w is much better."
          },
          {
            "p": "A model has some parameters (internal numbers, like w above) it adjusts so it's wrong as little as possible on the training examples. The measure of the error is called the cost function, or loss: in the example, the total error of 125 or 10 thousand. Training means finding the parameters that minimize the loss, that is, make it as small as possible. The model does the searching: some models compute their parameters directly, others improve them step by step, like you did going from 1.5 to 2. How the steps are chosen comes in Lesson 14."
          },
          {
            "p": "In scikit-learn the pattern is always the same: you create the model, train it with `fit` on the training data, then predict with `predict` on new data, like with `Mean` in Lesson 3. Simple on the surface, but under the hood each model does something different."
          },
          {
            "code": "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)     # learn the parameters\ny_pred = model.predict(X_val)   # predict on new data"
          },
          {
            "p": "`LogisticRegression` is one of the models in this lesson; you'll meet it below. `X_train` is the table with the features, meaning the input columns, for the training rows. `y_train` is the target: the answers for the same rows, in the same order. `X_val` holds the validation rows (Lesson 5), with their answers kept apart in `y_val`. `y_pred` (\"y predicted\") holds the predictions for `X_val`, which you then compare with `y_val`."
          },
          {
            "p": "X has a capital letter because it's a table with several columns, and y a lowercase one because it's a single column. It's only a convention: in Lesson 6 you saw them shortened, `X_tr` and `y_tr`."
          }
        ]
      },
      {
        "heading": "Linear regression: predicting a number",
        "blocks": [
          {
            "p": "Linear regression predicts a continuous value (a price, a temperature) as a linear combination of the features. Continuous means it can come out as any number, decimals included. A linear combination means you multiply each feature by its own number, add up the results and add one more fixed number."
          },
          {
            "p": "For example, price = 1500 · area + 20000 · rooms + 10000, in euros. A 60 m² house with 2 rooms comes out at 1500 · 60 + 20000 · 2 + 10000 = 90000 + 40000 + 10000 = 140000 euros."
          },
          {
            "p": "The regression looks for the line (or the plane, in more dimensions) that passes best through the data. With a single feature it's a straight line, like the graph of f(x) = ax + b from math class. Each house is a point (area, price), and the model looks for the line that passes as close as possible to all the points. With two features the points sit in space and the line becomes a plane, like a sheet of paper held at a tilt. With more you can't draw it anymore, but the math is the same."
          },
          {
            "formula": "ŷ = w₁x₁ + w₂x₂ + ... + b",
            "explain": "ŷ (read \"y hat\") is the prediction, and plain y is the true answer. x₁, x₂ are the features, here the area and the rooms. Each feature x has a weight w that says how much it counts, here 1500 and 20000. b is the intercept, the number that always gets added, like the b in f(x) = ax + b, here 10000. The model learns the w's and b."
          },
          {
            "p": "It minimizes the squared error: the sum of the squared differences between prediction and truth. For the three houses from the start, with w = 1.5, the differences 25, 50 and 50, squared, give 625 + 2500 + 2500 = 5625. With w = 2, the differences 0, 10 and 0 give 0 + 100 + 0 = 100. The square punishes big mistakes harder: 50 is 5 times more than 10, but 2500 is 25 times more than 100."
          },
          {
            "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# 4 houses: area (m²) and number of rooms\nX = np.array([[50, 1], [60, 2], [80, 3], [100, 3]])\ny = np.array([105000, 140000, 190000, 220000])   # prices, in euros\n\nmodel = LinearRegression().fit(X, y)\nprint(model.coef_)                # [ 1500. 20000.]\nprint(round(model.intercept_))    # 10000\nprint(model.predict([[70, 2]]))   # [155000.]"
          },
          {
            "p": "The prices in `y` are computed with the exact rule above, and `fit` finds it on its own. `coef_` holds the weights, in column order, and `intercept_` is the intercept. In scikit-learn, names ending in `_` are things learned during `fit`. `round` only cleans up a 9999.99999 left over from the computation. `[[70, 2]]` has two pairs of brackets because `predict` takes a table, here with a single row. On real data the points don't sit perfectly on a plane and the weights come out approximate."
          },
          {
            "p": "A big advantage of linear regression: you can read the coefficients, which are just the weights w. The weight of 20000 on rooms means that, for the same area, each extra room adds 20000 euros. A large positive w means that feature pushes the prediction up, and a negative one pulls it down."
          },
          {
            "p": "Be careful when you compare weights with each other. Area gets only 1500 against 20000, but that doesn't mean it matters less: a square meter is a small unit, a room is a big one. Weights only compare fairly when the features are on the same scale, for example after the standardization from Lesson 5."
          }
        ]
      },
      {
        "heading": "Logistic regression: predicting a class",
        "blocks": [
          {
            "p": "Despite the name, logistic regression is for classification, not regression. Take a spam filter: each email is either spam (label 1) or normal (label 0). The class you're looking for, spam here, is called the positive class."
          },
          {
            "p": "The model first computes a score z, with the same linear combination as linear regression. The score can come out as any number, -7 or 12, so it isn't a probability. Logistic regression passes it through a sigmoid, which squeezes any number into the 0 to 1 range. The result is a probability: how sure the model is that the example is in the positive class. For example, 0.9 means a 90% chance of spam."
          },
          {
            "formula": "σ(z) = 1 / (1 + e^(-z))",
            "explain": "The sigmoid: it turns the linear score z into a probability between 0 and 1. e is a fixed number, about 2.718, like π, and e^(-z) means e to the power -z."
          },
          {
            "p": "σ(0) = 1 / (1 + e^0) = 1 / (1 + 1) = 0.5, so the model is undecided. σ(2) = 1 / (1 + e^(-2)) ≈ 1 / (1 + 0.135) ≈ 0.88, because e^(-2) = 1 / e² ≈ 0.135. Likewise, σ(-2) ≈ 0.12. The higher the score, the closer the probability gets to 1, and the more negative it is, the closer it gets to 0."
          },
          {
            "p": "From the probability you make the decision with a threshold. With a threshold of 0.5, an email with probability 0.88 is marked as spam, and one with 0.12 stays normal. The threshold isn't necessarily 0.5. If you care more about catching all the positive cases (high recall), you lower it. If you want to be sure when you say positive (high precision), you raise it. The threshold is a knob you tune to the problem's metric."
          },
          {
            "p": "Recall is the share of the real spam you catch, and precision is the share of emails marked as spam that really are spam. With a threshold of 0.3, an email at 0.4 also goes to spam. You catch more spam, so recall goes up, but a few normal emails end up there too, so precision goes down. You'll compute both exactly in Lesson 8."
          },
          {
            "code": "m = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nproba = m.predict_proba(X_val)[:, 1]   # probability of the positive class\npred = (proba > 0.3).astype(int)       # threshold 0.3, for higher recall"
          },
          {
            "p": "`fit` returns the model itself, which is why you can write `.fit(...)` right after creating it, like `Mean().fit(...)` in Lesson 3. Logistic regression searches for its parameters step by step, and `max_iter` is the maximum number of steps. The default is 100, sometimes too few: then you get a `ConvergenceWarning`, meaning the model didn't finish searching. `max_iter=1000` gives it ten times as many. If the warning still shows up with 1000, scale the features (Lesson 5)."
          },
          {
            "p": "`predict_proba(X_val)` gives a table with one row per email and two columns: the probability of class 0 and of class 1, which add up to 1 (for example 0.19 and 0.81). `[:, 1]` takes all rows, column 1, like `x[:, 0]` in Lesson 4, so you get the spam probability. `proba > 0.3` gives `True` or `False` for each row, and `.astype(int)` turns `True` into 1 and `False` into 0, which are labels."
          }
        ]
      },
      {
        "heading": "Naïve Bayes: fast and surprisingly good",
        "blocks": [
          {
            "p": "Stay with the spam filter. In the training emails you count how often each word shows up in spam and how often in normal emails. Say \"free\" appears in 40% of spam emails and in 5% of normal ones, while \"invoice\" appears in 10% of spam and in 20% of normal emails."
          },
          {
            "p": "A new email arrives with \"free\" and \"invoice\". The model multiplies the evidence from the words, separately for each class: for spam 0.40 · 0.10 = 0.04, for normal 0.05 · 0.20 = 0.01. The spam score is 4 times bigger, so the email has a probability of 0.04 / (0.04 + 0.01) = 0.8 of being spam."
          },
          {
            "p": "Here we assumed half the emails are spam. If spam is rarer, you also multiply each score by how common its class is. With 20% spam and 80% normal emails, the scores become 0.2 · 0.04 = 0.008 and 0.8 · 0.01 = 0.008, and the email drops to 50%. This rule, which puts together how common a class is and the evidence from the words, is Bayes' theorem."
          },
          {
            "p": "Naïve Bayes applies Bayes' theorem while assuming, naively, that the features are independent of each other. That is, it treats each word as if it had nothing to do with the others, which is why it can simply multiply the evidence. In reality, \"won\" often shows up next to \"prize\", and the model counts the same evidence twice."
          },
          {
            "p": "The assumption is almost always false, but the model often works very well, especially on text. It's fast, needs little data, and is a baseline (the reference you start from, Lesson 6) that's hard to beat at document classification."
          },
          {
            "p": "In scikit-learn, the version for word counts is `MultinomialNB`: each email becomes a row of numbers saying how many times each word appears in it. How to get these numbers from text automatically comes in Lesson 12."
          },
          {
            "code": "from sklearn.naive_bayes import MultinomialNB\n\n# columns: how many times free, prize, invoice appear\nX = [[2, 1, 0], [3, 2, 0], [1, 1, 0], [0, 0, 2], [0, 1, 1], [0, 0, 3]]\ny = [1, 1, 1, 0, 0, 0]   # 1 = spam, 0 = normal\n\nnb = MultinomialNB().fit(X, y)\nprint(nb.predict([[1, 0, 0], [0, 0, 1]]))   # [1 0]",
            "caption": "An email with \"free\" once comes out as spam, one with \"invoice\" once comes out as normal."
          }
        ]
      },
      {
        "heading": "Decision trees",
        "blocks": [
          {
            "p": "A decision tree asks simple questions, one after another, like a game of 20 questions: is the age over 30? is the income below a value? At each step it splits the data to separate the classes as well as possible."
          },
          {
            "p": "Each question sits in a node. The answer, yes or no, sends the row down one of two branches, to the next node. Where there are no more questions there's a leaf, which gives the prediction: the most common class among the training rows that ended up there."
          },
          {
            "p": "The measure of the separation is Gini impurity or entropy: how mixed the classes are in a node. Gini is 1 minus the sum of the squared shares of each class. A node with 5 spam and 5 normal emails is as mixed as it gets: 1 - 0.5² - 0.5² = 0.5. One with 10 spam and no normal ones is pure: 1 - 1² - 0² = 0. One with 8 spam and 2 normal is in between: 1 - 0.8² - 0.2² = 1 - 0.64 - 0.04 = 0.32."
          },
          {
            "p": "At each node the tree tries many questions and picks the one that leaves the nodes below it as pure as possible. Say you start from 5 spam and 5 normal emails (Gini 0.5). The question \"does it contain 'free'?\" might send 4 spam and 1 normal to yes, and 1 spam and 4 normal to no. Both new nodes have Gini 0.32, so the mix went down from 0.5 to 0.32."
          },
          {
            "p": "Entropy measures the same mix with a different formula: also 0 for a pure node and highest at half and half. It gives very similar trees, and scikit-learn uses Gini unless you ask for something else."
          },
          {
            "p": "Trees are easy to read and don't need scaling. Each question compares a single column with a threshold, for example \"area over 70 m²?\". With the area in square centimeters the threshold would be 700000, and the rows would split exactly the same way."
          },
          {
            "p": "Their problem: left to grow without limit, they memorize the training set down to the last example and generalize badly, meaning they get new data wrong. A tree with no limit keeps asking questions until every leaf is pure, sometimes with a single row. That's called overfitting (Lesson 1). You limit it by setting a maximum depth (how many questions can come one after another) or a minimum number of examples per leaf."
          },
          {
            "code": "from sklearn.tree import DecisionTreeClassifier\n\ntree = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5)\ntree.fit(X_train, y_train)\nprint(tree.score(X_train, y_train))   # accuracy on training\nprint(tree.score(X_val, y_val))       # accuracy on validation"
          },
          {
            "p": "`max_depth=4` allows at most 4 questions along any path, and `min_samples_leaf=5` requires at least 5 training rows in every leaf. `score` predicts on the table you give it and returns the accuracy against the answers. Settings like these aren't learned from the data, you pick them before `fit`. They're called hyperparameters, so you don't mix them up with the parameters the model learns."
          },
          {
            "note": "A tree that's perfect on training and weak on validation has memorized, not learned. The classic sign of overfitting. Cut its depth."
          }
        ]
      },
      {
        "heading": "SVM: the widest margin",
        "blocks": [
          {
            "p": "Take two features of an email, say how many links it has and how many words in capitals. Each email becomes a point in the plane, and the spam and normal emails form two groups. Usually many straight lines can separate them, and you have to pick one."
          },
          {
            "p": "An SVM (support vector machine) looks for the boundary between classes that leaves the widest margin on either side, meaning it's as far as possible from the nearest examples of each class. The idea is that a wide-margin boundary generalizes better."
          },
          {
            "p": "Think of the boundary as the center line of a road. The SVM looks for the widest road that fits between the two groups with no point on it, and the margin is the width of the road. The points on the edges of the road are called support vectors: they \"support\" the road, and each point is a row of numbers, that is, a vector. Only they decide where the road goes. A new email that lands a little toward the other group still stays on the right side of a wide road, while a narrow road could leave it on the wrong side."
          },
          {
            "p": "When the data can't be separated with a straight line, the kernel trick steps in: it projects the data into a higher-dimensional space, where it becomes separable, without computing that space explicitly."
          },
          {
            "p": "The simplest example is on a single axis. Class A has the points -1, 0 and 1, in the middle, and class B has the points -3, -2, 2 and 3, on both sides. No single cut separates them, because B is both to the left and to the right of A. Give each point a second coordinate, x². A becomes (-1, 1), (0, 0) and (1, 1), and B becomes (-3, 9), (-2, 4), (2, 4) and (3, 9). Now the horizontal line y = 2.5 separates them: A has y at most 1, B at least 4."
          },
          {
            "p": "Adding x² is exactly the projection into a space with more dimensions. The trick is that the SVM doesn't need the new coordinates, only how similar two points are. The kernel is a formula that gives that similarity directly, without building the new coordinates."
          },
          {
            "p": "The RBF kernel is the most used. It measures similarity by distance: nearby points have a similarity close to 1, distant points close to 0. With it, the boundary can bend around groups of points."
          },
          {
            "p": "SVM needs scaled data to work well, because the margin and the similarity are computed from distances. With income in thousands and age in tens, the distance would depend almost only on income, exactly the problem scaling solves in Lesson 5."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\n\nsvm = Pipeline([\n    (\"sc\", StandardScaler()),\n    (\"svm\", SVC(kernel=\"rbf\", C=1.0)),\n])\nsvm.fit(X_train, y_train)\npred = svm.predict(X_val)"
          },
          {
            "p": "The Pipeline from Lesson 6 ties the scaling to the model, so `StandardScaler` learns the mean and the deviation only on the training data. `SVC` is scikit-learn's SVM for classification, and `kernel=\"rbf\"` and `C=1.0` are exactly the defaults."
          },
          {
            "p": "In real data the groups overlap a little, so some points end up on the road or on the wrong side. `C` says how hard the model punishes them. A small `C` accepts a few mistakes to keep the road wide. A large `C` wants no training example wrong, even with a narrow road, and risks overfitting. Try 0.1, 1 and 10 and compare them on validation."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Compare logistic regression, a tree and an SVM on the same tabular problem, with the same metric."
      },
      {
        "title": "Move the logistic regression threshold down from 0.5 and watch recall rise and precision fall (measure them with recall_score and precision_score from sklearn.metrics)."
      },
      {
        "title": "Limit a tree's depth and see the training score come closer to the validation one."
      }
    ]
  },
  {
    "moduleCode": "S11",
    "duration": "~2 weeks",
    "intro": "This is where the contest is won or lost. A model that looks good on the public leaderboard can be weak on the hidden one (the private leaderboard from Lesson 2), which is what counts at the end. This module is about having justified trust in your score. It's the least flashy part and the one that makes the difference between a top 10 and a mid-table finish.",
    "sections": [
      {
        "heading": "Why accuracy lies to you",
        "blocks": [
          {
            "p": "Accuracy is the share of correct predictions. It sounds reasonable, but on imbalanced classes (one class much rarer than the other, Lesson 5) it's misleading. If 98% of the examples are the \"no\" class, a model that always says \"no\" gets 98% accuracy and zero value: it never finds the cases you're looking for. That's why you need metrics that look at each class separately."
          }
        ]
      },
      {
        "heading": "The confusion matrix: the foundation",
        "blocks": [
          {
            "p": "The confusion matrix is a 2 by 2 table that counts the four kinds of outcome for a binary classification, meaning one with two classes. It's the basis every other metric is computed from, so it's worth understanding well."
          },
          {
            "p": "One of the classes is the one you're looking for, say spam: that's the positive class, and normal emails are the negative class (as with logistic regression in Lesson 7). In each name below, the second word says what you predicted, and the first says whether you were right."
          },
          {
            "list": [
              "TP (true positive): it was positive, you said positive. Correct.",
              "TN (true negative): it was negative, you said negative. Correct.",
              "FP (false positive): it was negative, you said positive. A false alarm.",
              "FN (false negative): it was positive, you said negative. You missed it."
            ]
          },
          {
            "p": "An example. Out of 100 emails, 10 are spam. The model marks 12 as spam, and 8 of those really are. So TP = 8 (spam caught), FP = 4 (normal emails marked by mistake), FN = 2 (spam that slipped through) and TN = 86 (normal emails left alone), which add up to 100. Accuracy is (8 + 86) / 100 = 0.94, even though the model misses one spam in five."
          },
          {
            "code": "import numpy as np\nfrom sklearn.metrics import confusion_matrix\n\n# 100 emails: 1 = spam, 0 = normal\ny_true = np.array([1] * 10 + [0] * 90)\n# the model catches 8 spam, misses 2 and raises 4 false alarms\ny_pred = np.array([1] * 8 + [0] * 2 + [1] * 4 + [0] * 86)\n\nprint(confusion_matrix(y_true, y_pred))\n# [[86  4]\n#  [ 2  8]]"
          },
          {
            "p": "`[1] * 10` is a list of ten 1s, and `+` glues lists together, so `y_true` has the 10 spam emails first, then the 90 normal ones. `y_pred` has the predictions, in the same order. In the result, rows are the true answers and columns are the predictions, class 0 first, then class 1. So top left is TN, top right FP, bottom left FN and bottom right TP."
          },
          {
            "p": "Which one hurts more depends on the problem. For a disease test, a false negative (a sick person sent home) is worse than a false positive. For a spam filter, it's the other way around: an important email moved to spam costs you more than an ad that slips into your inbox. The right metric reflects the real cost of each kind of mistake."
          }
        ]
      },
      {
        "heading": "Precision, recall, F1",
        "blocks": [
          {
            "formula": "precision = TP / (TP + FP)",
            "explain": "Of all the ones you called positive, how many really were. High precision = few false alarms. In the example: 8 / (8 + 4) = 8 / 12 ≈ 0.67."
          },
          {
            "formula": "recall = TP / (TP + FN)",
            "explain": "Of all the ones that really were positive, how many you caught. High recall = you miss few. In the example: 8 / (8 + 2) = 0.8."
          },
          {
            "p": "Precision and recall pull in opposite directions. If you say positive only when you're very sure, precision goes up but recall goes down. If you say positive often, it's the reverse. That's exactly what you tune with the threshold from Lesson 7. F1 reconciles them into a single number, their harmonic mean, which is small if either of them is small."
          },
          {
            "formula": "F1 = 2 · (precision · recall) / (precision + recall)",
            "explain": "The harmonic mean. It punishes imbalance: you can't have a high F1 with a tiny recall. In the example: 2 · (0.67 · 0.8) / (0.67 + 0.8) ≈ 0.73."
          },
          {
            "p": "The usual average would hide the problem. A model that marks a single email as spam, one it's absolutely sure about, and gets it right, has precision 1.0. But it caught only one of the 10 spam emails, so its recall is 0.1. The usual average would give (1.0 + 0.1) / 2 = 0.55, a score that looks decent for a nearly useless model. F1 gives 2 · (1.0 · 0.1) / (1.0 + 0.1) ≈ 0.18."
          },
          {
            "code": "from sklearn.metrics import classification_report\n\nprint(classification_report(y_true, y_pred))\n#               precision    recall  f1-score   support\n#\n#            0       0.98      0.96      0.97        90\n#            1       0.67      0.80      0.73        10\n#\n#     accuracy                           0.94       100\n#    macro avg       0.82      0.88      0.85       100\n# weighted avg       0.95      0.94      0.94       100"
          },
          {
            "p": "`classification_report` does all the math at once, on the `y_true` and `y_pred` from above. Row 1 is the spam class: 0.67, 0.80 and 0.73, exactly what you computed by hand. Row 0 does the same math with normal emails as the positive class. `support` is how many rows of each class are in the data. `accuracy` is the 0.94 accuracy from above, and the last two rows are two ways of averaging over the classes."
          },
          {
            "p": "It works the same way with more than two classes: one F1 per class, each treated in turn as the positive class, then an average. Take 100 photos, with 80 dogs, 15 rabbits and 5 parrots, and a model with F1 0.9 on dogs, 0.6 on rabbits and 0.2 on parrots. The plain average, macro-F1, is (0.9 + 0.6 + 0.2) / 3 ≈ 0.57. The weighted average, weighted-F1, multiplies each F1 by the class's share of the data: 0.8 · 0.9 + 0.15 · 0.6 + 0.05 · 0.2 = 0.82. The parrots drag macro-F1 down, but in weighted-F1 they barely register."
          },
          {
            "note": "With many classes, F1 is aggregated. Macro-F1 averages over classes treating them equally (good when you care about the rare ones). Weighted-F1 accounts for each class's size. In `f1_score` you pick them with `average=\"macro\"` or `average=\"weighted\"`, as in Lesson 6. Read in the rules which one is scored and optimize exactly that."
          }
        ]
      },
      {
        "heading": "Validation without leaks",
        "blocks": [
          {
            "p": "Data leakage is when, without meaning to, information from the data you evaluate on (validation or test) makes it into training. The result: a great local score that collapses on the real leaderboard. It's the sneakiest way to lose points, because everything looks fine. A few common examples:"
          },
          {
            "list": [
              "Scaling or imputation learned on all the rows, before the split. The mean in `StandardScaler` already contains values from validation, so the model has \"seen\" some of it (Lesson 5).",
              "The same patient in training and in validation. If they have five visits, three land in training and two in validation, and the model learns to recognize the patient, not the disease. On new patients, the score drops.",
              "A column computed from the answer. You predict whether a customer will close their account, and one column is the closing date: it only exists for those who left, so it hands the model the answer."
            ]
          },
          {
            "p": "You defend against it by splitting the data correctly. Keep a validation set the model doesn't see during training and use it to estimate the real score."
          },
          {
            "p": "Better, use k-fold: you split the data into k parts, train on k-1 and test on one, rotating, then average. Each part is called a fold. With k = 5 and 100 rows, each fold has 20. In the first round you train on folds 2, 3, 4 and 5 (80 rows) and measure on fold 1. In the second you train on 1, 3, 4, 5 and measure on 2, and so on, five times. Every row lands in validation exactly once, and at the end you average the 5 scores."
          },
          {
            "p": "That way you use all the data and get a more stable estimate. With a single validation set of 20 rows, the score depends a lot on which rows happened to land there, while the average of five scores depends less on luck."
          },
          {
            "p": "When the classes are imbalanced, use stratified k-fold, which keeps the class proportions in each fold. Otherwise a fold might not contain the rare class at all. With 10 spam emails in 100 rows, the stratified version puts exactly 2 spam in each fold of 20, like `stratify` in Lesson 6. A random split might give, say, 4 spam in one fold and none in another."
          },
          {
            "p": "When the data has time or groups (the same patient in several rows), the split has to respect them, otherwise the model peeks. That is, during training it sees something it won't have when it predicts for real, like a student who glimpsed the questions before the test. With groups, all the rows of a patient go into the same fold. With data over time, you train on the past and validate on what comes after, the way the model will work in reality. In scikit-learn you have `GroupKFold` for groups (you pass the patient column through the `groups` argument) and `TimeSeriesSplit` for time."
          },
          {
            "code": "from sklearn.model_selection import StratifiedKFold, cross_val_score\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nscores = cross_val_score(model, X, y, cv=cv, scoring=\"f1_macro\")\nprint(scores.mean(), scores.std())"
          },
          {
            "p": "`StratifiedKFold(n_splits=5, ...)` sets up the split into 5 stratified folds. `shuffle=True` shuffles the rows first, so the folds don't follow the order in the file, and `random_state=0` makes the shuffle the same on every run (Lesson 6). Don't shuffle data over time: there, the order matters."
          },
          {
            "p": "`cross_val_score` runs the 5 rounds for you. It takes the model, all the training data, `X` and `y` (the folds handle validation, you don't split it off yourself), the split from `cv` and the metric from `scoring`, here macro F1. If `model` is a Pipeline (Lesson 6), the scaling is learned again in every round, only on the training folds, so nothing leaks."
          },
          {
            "p": "It returns an array with 5 scores, one per fold. `mean()` is their average, your estimated score. `std()` is the standard deviation (the σ from standardization, Lesson 5): how much the scores vary from one fold to another. The scores 0.81, 0.79, 0.83, 0.80 and 0.82 have a mean of 0.81 and a deviation of 0.014, so the estimate is stable. The scores 0.60, 0.95, 0.70, 0.88 and 0.92 also average 0.81, but with a deviation of 0.14: there, a difference of 0.01 between two models can be pure luck."
          }
        ]
      },
      {
        "heading": "Bias, variance and the learning curve",
        "blocks": [
          {
            "p": "Two opposite diseases, which you met in Lesson 1. High bias (underfitting): the model is too simple, it does badly on both training and validation. High variance (overfitting): the model is too complex, it does great on training but badly on validation, because it memorized."
          },
          {
            "p": "With the trees from Lesson 7: one with a single question might score 0.70 on training and 0.68 on validation, which is bias. One with no depth limit might score 1.00 on training and 0.75 on validation, which is variance."
          },
          {
            "p": "The learning curve diagnoses them: you plot the training score and the validation score as you add more data. Concretely, you train the model on more and more rows, say 80, 200, 400, 600 and 800, and measure both scores each time. The x axis shows how many training rows you used, the y axis the score, and you get two lines. Usually the training line goes down a little (many examples are harder to memorize), and the validation line goes up (the model has seen more cases)."
          },
          {
            "p": "If both are low and close together, you have bias, you need a more complex model, for example a deeper tree. If there's a big gap between them, you have variance, you need more data or regularization. Regularization is any limit you put on a model so it can't memorize: for trees, `max_depth` is a form of regularization, and for neural networks you'll see it in Lesson 15."
          },
          {
            "code": "import matplotlib.pyplot as plt\nfrom sklearn.model_selection import learning_curve\n\nsizes, train_scores, val_scores = learning_curve(\n    model, X, y, cv=5, scoring=\"f1_macro\",\n    train_sizes=[0.1, 0.25, 0.5, 0.75, 1.0],\n)\nplt.plot(sizes, train_scores.mean(axis=1), label=\"training\")\nplt.plot(sizes, val_scores.mean(axis=1), label=\"validation\")\nplt.xlabel(\"training rows\")\nplt.ylabel(\"F1 macro\")\nplt.legend()\nplt.show()"
          },
          {
            "p": "`learning_curve` does the training runs for you. For each value in `train_sizes` it uses that share of the training rows (10%, 25% and so on) and runs a k-fold with `cv=5`. With 1000 rows, each round has 800 training rows, so the sizes come out as 80, 200, 400, 600 and 800. It returns three things: the sizes, then the training and validation scores, one for each size and each fold. `mean(axis=1)` averages over the folds for each size (Lesson 4)."
          },
          {
            "p": "`label` names each line, and `plt.legend()` shows the names. The two `plt.plot` calls before a single `plt.show()` draw both lines on the same chart, which is exactly what you want here."
          }
        ]
      },
      {
        "heading": "The two final submissions",
        "blocks": [
          {
            "p": "At ONIA you choose two submissions for each problem, and only those count in the final ranking (Lesson 2)."
          },
          {
            "note": "The golden rule: at the end, choose your two submissions on purpose. One on your best local score (the validation, for example the k-fold mean), one on your best public leaderboard. If local and public agree, trust it. If they differ a lot, you have a leak or a bad split. Don't leave your final submissions to be whatever you sent last out of reflex."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Plot a learning curve and decide whether the model suffers from bias or variance."
      },
      {
        "title": "Find a data leak in a given pipeline and fix it."
      },
      {
        "title": "Compute precision, recall and F1 by hand from a given confusion matrix."
      }
    ]
  },
  {
    "moduleCode": "S13",
    "duration": "~1 week",
    "intro": "The winner on a tabular problem is often an ensemble, not a single model. An ensemble is a group of models that predict together. The idea is simple: several models together are wrong less often than one alone, as long as they're wrong in different places. This module gives you the two big recipes, bagging and boosting, and the discipline to tune the models' settings without getting lost.",
    "sections": [
      {
        "heading": "Why combining works",
        "blocks": [
          {
            "p": "Three models, A, B and C, decide for each of five emails whether it's spam or normal. Each one gets a single email wrong, but each gets a different one wrong. In a vote, the answer given by at least two of the three models wins."
          },
          {
            "list": [
              "Email 1, spam: A says normal, B and C say spam. The vote: spam.",
              "Email 2, normal: all three say normal.",
              "Email 3, spam: B says normal, A and C say spam. The vote: spam.",
              "Email 4, normal: all three say normal.",
              "Email 5, spam: C says normal, A and B say spam. The vote: spam."
            ]
          },
          {
            "p": "Each model gets 4 emails out of 5 right, an accuracy of 80%. The vote gets all 5 right."
          },
          {
            "p": "If you have three models that are each wrong in different places, the majority vote is better than any one of them: where one is wrong, the other two correct it. The key is diversity. Three models that make exactly the same mistakes don't help at all when combined: if all three had said normal for email 1, the vote would have been wrong too."
          },
          {
            "p": "There are two big ways to build diversity: bagging (you train models in parallel on slightly different data and average them) and boosting (you train models one after another, each fixing the mistakes of the one before)."
          }
        ]
      },
      {
        "heading": "Bagging and Random Forest",
        "blocks": [
          {
            "p": "Bagging means you train each model on a random sample (with replacement) of the data, then average the predictions. The sample has as many rows as the training set, drawn at random one at a time: after each draw, the row goes back in, so it can come up again. From the rows [A, B, C, D, E] you might get [B, B, D, A, E]: B shows up twice, C is missing. That way, each model sees different data."
          },
          {
            "p": "\"Average the predictions\" means a plain average for numbers: if three trees say 90, 100 and 110, the prediction is 100. For classes, you count the votes, as with the emails, or average the probabilities (Lesson 7)."
          },
          {
            "p": "A single deep tree has high variance (it overfits): change the training data a little and it gives different predictions, because it has also memorized the data's quirks (Lessons 1 and 8). But each tree is wrong in its own way. If a house costs 100 and five trees say 120, 85, 95, 110 and 95, each one is off by 5 to 20, but their average, 101, is off by 1. By averaging many trees trained on different data, the variance drops without the bias going up (bias is the error that comes from assumptions that are too simple)."
          },
          {
            "p": "Random Forest is bagging on trees, with one extra trick: at each split, the tree chooses from a random subset of features (the input columns). At each question like \"is age over 30?\" (Lesson 7), the tree only looks at a few columns picked at random: out of 16 columns, `RandomForestClassifier` picks 4 by default (the square root of 16). That makes the trees even more different from each other: without the trick, if one column is much better than the rest, every tree would start with it. It's hard to break and an excellent first model on tabular data."
          },
          {
            "code": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)\nrf.fit(X_train, y_train)"
          },
          {
            "p": "`n_estimators=400` means 400 trees. `max_depth=None` means no depth limit: each tree learns its sample almost by heart, and the averaging fixes the overfitting. `n_jobs` is how many processor cores work at the same time, and -1 means all of them, so the trees train in parallel, faster. With `random_state=42` (Lesson 6), you get the same forest on every run."
          },
          {
            "p": "Feature importance tells you how much the model leaned on each column: how much the questions asked about it helped separate the classes, averaged over all the trees. You'll find it in `feature_importances_`, one number per column, in column order, and the numbers add up to 1."
          },
          {
            "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\n\nnp.random.seed(0)\nstudents = pd.DataFrame({\n    \"id\": np.arange(200),                     # the row number\n    \"grade\": np.random.randint(1, 11, 200),   # from 1 to 10\n})\ndice = np.random.randint(1, 7, 200)           # from 1 to 6\npassed = (students[\"grade\"] + dice >= 9).astype(int)\n\nrf = RandomForestClassifier(random_state=0).fit(students, passed)\nprint(rf.feature_importances_.round(2))       # [0.4 0.6]"
          },
          {
            "p": "Here the target depends only on the grade and on luck: passed is 1 if the grade plus a dice roll comes to at least 9. The id column is just the row number and says nothing about the target, yet it gets 0.4 of the importance. It has 200 different values, so the trees can always find a threshold on it that splits off a few more rows, even if it's pure chance."
          },
          {
            "note": "Feature importance from Random Forest is useful, but don't believe it blindly: it favors features with many distinct values. Use it as a hint, not as truth."
          }
        ]
      },
      {
        "heading": "Boosting: XGBoost and LightGBM",
        "blocks": [
          {
            "p": "Boosting builds trees one at a time. The first makes a rough prediction, the second learns to correct the first's mistakes, the third the mistakes still left, and so on. Each tree is small, but together they form a strong model. It's often the winner on tabular problems."
          },
          {
            "p": "Take a house that costs 100 (thousand euros). The first step gives a rough estimate, usually the average price, say 80. The second tree no longer learns the price, but the error that's left: 100 - 80 = 20."
          },
          {
            "p": "Boosting doesn't add the whole correction, only part of it, and that part is called the learning rate. With a learning rate of 0.1 you add 0.1 · 20 = 2 and get to 82. The third tree learns what's left, 18, and adds 1.8, so 83.8. The fourth learns 16.2 and adds 1.62, so 85.42. Each tree closes a tenth of the remaining gap."
          },
          {
            "p": "The steps are small because each tree also learns from the noise in the training data (Lesson 1), so its correction is a bit off. With small steps, one tree's mistake counts for little, and the next trees fix it. The price is time: you need more trees."
          },
          {
            "p": "With too many trees, the last ones learn nothing but noise: the training score keeps going up, but the validation score stalls and then drops (overfitting). Early stopping means that after each new tree you check the validation score, and you stop when it hasn't improved for a few rounds in a row."
          },
          {
            "p": "The version used in practice is called gradient boosting. XGBoost and LightGBM are the fast, go-to implementations. They usually score better than Random Forest, but they're also easier to push into overfitting, so they need careful tuning. They don't come with scikit-learn: you install them with `pip install xgboost lightgbm` and use them the same way, with `fit` and `predict` (`XGBClassifier`, `LGBMClassifier`). Check the contest rules first: external libraries aren't allowed at every stage."
          },
          {
            "p": "If you're not allowed to use them, scikit-learn has its own version, `HistGradientBoostingClassifier`, inspired by LightGBM and fast on large data. It has early stopping too."
          },
          {
            "code": "from sklearn.ensemble import HistGradientBoostingClassifier\n\nhgb = HistGradientBoostingClassifier(\n    learning_rate=0.1,\n    max_iter=1000,            # at most 1000 trees\n    early_stopping=True,\n    validation_fraction=0.1,\n    n_iter_no_change=10,\n    random_state=0,\n)\nhgb.fit(X_train, y_train)\nprint(hgb.n_iter_)            # how many trees it built before stopping"
          },
          {
            "p": "`learning_rate=0.1` is the step from the house example, and `max_iter` is the maximum number of trees (other libraries call it `n_estimators`). With `early_stopping=True`, the model sets aside 10% of X_train for validation (`validation_fraction=0.1`) and stops after 10 trees in a row without progress there (`n_iter_no_change=10`). `random_state=0` picks the same validation slice on every run. After `fit`, `n_iter_` tells you how many trees it built, often far fewer than 1000."
          }
        ]
      },
      {
        "heading": "Tuning the hyperparameters, in order",
        "blocks": [
          {
            "p": "Hyperparameters are the settings you choose before training (how many trees, how deep), as opposed to the parameters the model learns on its own. You've already seen a few: `n_estimators`, `max_depth`, `learning_rate`. The classic mistake is to tune dozens at once and lose track of what helped. Go in order, one thing at a time, and write down the validation score after each change. The order below is for boosting."
          },
          {
            "steps": [
              "Start with a small-to-moderate learning rate (0.05 or 0.1) and a reasonable number of trees (a few hundred).",
              "Tune the tree depth first (the complexity of each one): try, say, 3, 5 and 8 levels.",
              "Then the number of trees (`n_estimators`), with early stopping on validation: the model stops on its own, and you note how many trees it used.",
              "Finally, lower the learning rate and raise the number of trees proportionally, for a bit more score: for example, go from 0.1 with 300 trees to 0.05 with 600."
            ]
          },
          {
            "note": "A small learning rate plus more trees almost always gives a better score than a large learning rate, but trains slower. It's the classic time-versus-score trade-off."
          }
        ]
      },
      {
        "heading": "Voting and stacking",
        "blocks": [
          {
            "p": "The simplest ensemble across different models is voting: you have a Random Forest, a boosting model and a logistic regression vote, or you average their probabilities. It works best when the models are of different types, so they're wrong in different ways."
          },
          {
            "p": "A probability (Lesson 7, `predict_proba`) is a number between 0 and 1: how sure the model is. Voting and averaging can give different answers. For one email, the three models give spam probabilities of 0.9, 0.4 and 0.45. In a vote, each model says spam only if its probability is above 0.5, so there's one vote for spam and two for normal: normal wins. On average, (0.9 + 0.4 + 0.45) / 3 ≈ 0.58, above 0.5, so it's spam: one very sure model outweighs two undecided ones."
          },
          {
            "code": "from sklearn.ensemble import VotingClassifier\nfrom sklearn.linear_model import LogisticRegression\n\nvote = VotingClassifier(\n    estimators=[\n        (\"rf\", RandomForestClassifier(n_estimators=300, random_state=0)),\n        (\"hgb\", HistGradientBoostingClassifier(random_state=0)),\n        (\"lr\", LogisticRegression(max_iter=1000)),\n    ],\n    voting=\"soft\",   # average of the probabilities\n)\nvote.fit(X_train, y_train)\npred = vote.predict(X_val)"
          },
          {
            "p": "`estimators` is a list of (name, model) pairs, tuples as in Lesson 3, with names you pick. `voting=\"soft\"` averages the probabilities, and `voting=\"hard\"` counts the votes. Soft usually works a little better. `fit` trains all three, and `predict` combines their answers. If logistic regression gives you a ConvergenceWarning, scale the data first (Lesson 5)."
          },
          {
            "p": "Stacking goes further: it trains a final model that learns how to combine the others' predictions. Its features are the predictions of the base models, the ones you're combining (the spam probability from Random Forest, the one from boosting), and its target is the true label. That way it can learn, for example, that boosting is right more often. It can score better than voting, but it also makes data leakage (Lesson 8) easier if you don't use out-of-fold predictions."
          },
          {
            "p": "Out-of-fold predictions use the k-fold from Lesson 8. You split the training data into 5 parts, train the base models on parts 2, 3, 4 and 5 and predict on part 1, then do the same for each part. That way, every row gets a prediction from models that never saw it in training."
          },
          {
            "p": "Without this, the base models would predict on the very rows they trained on, and the predictions would come out too good: a Random Forest with deep trees gets almost everything it has seen right. The final model would learn to trust them blindly and would be wrong on the test set, where the predictions are weaker."
          },
          {
            "code": "from sklearn.ensemble import StackingClassifier\n\nstack = StackingClassifier(\n    estimators=[\n        (\"rf\", RandomForestClassifier(n_estimators=300, random_state=0)),\n        (\"hgb\", HistGradientBoostingClassifier(random_state=0)),\n    ],\n    final_estimator=LogisticRegression(max_iter=1000),\n    cv=5,   # out-of-fold predictions, with 5 parts\n)\nstack.fit(X_train, y_train)\npred = stack.predict(X_val)"
          },
          {
            "p": "`final_estimator` is the model that learns to combine them, and `cv=5` makes the out-of-fold predictions with 5 parts. At the end, scikit-learn retrains the base models on all of X_train, so they can predict on new data. Start with simple voting, move to stacking only if you have time."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Train a Random Forest and a gradient boosting model (for example HistGradientBoostingClassifier) on the same problem and compare the scores."
      },
      {
        "title": "Do a vote across three different models and see if it beats the best single model."
      },
      {
        "title": "Tune the learning rate with early stopping and watch the time-versus-score trade-off."
      }
    ]
  },
  {
    "moduleCode": "S14",
    "duration": "~1 week",
    "intro": "Not every problem has labels, meaning the correct answer for each row. Sometimes you just want to see the structure in the data: natural groups, outliers (values that break the pattern, Lesson 5), a two-dimensional projection you can draw. That's unsupervised learning: the model finds patterns without being told the correct answer. It's useful both on its own and as a preparation step before a supervised model.",
    "sections": [
      {
        "heading": "Supervised vs unsupervised",
        "blocks": [
          {
            "p": "In supervised learning you had (example, label) pairs and learned to predict the label. In unsupervised learning you only have the examples, no answer. The model looks for structure on its own: which points are similar, along which directions the data varies most. You can't measure correctness as simply, because you have nothing to compare against."
          },
          {
            "p": "An example: an online shop knows, for each customer, how many lei they spent this month and how many times they bought something, but no column says what kind of customer they are. An unsupervised algorithm can find groups on its own, for example customers who buy often and spend little and customers who buy rarely and spend a lot. That's the clustering from Lesson 1."
          },
          {
            "p": "As in Lesson 5, each row is a point, and two rows that are alike are two points close together. The distance between them is computed with the Pythagorean theorem, as there: you add up the squared differences on each column and take the square root."
          }
        ]
      },
      {
        "heading": "K-Means: grouping around centers",
        "blocks": [
          {
            "p": "K-Means splits the data into k groups, each with a center. A group's center is the mean of its points, column by column. Each point is assigned to the nearest center, then the centers move to the mean of their points, and it repeats until it stabilizes. Simple, fast, but you have to choose k yourself and it's sensitive to scale."
          },
          {
            "p": "An example on a single column, so you can follow it with a pencil: the points 1, 2, 3, 10, 11, 12 and k = 2."
          },
          {
            "steps": [
              "Start with two centers placed at random, say at 1 and at 2.",
              "Each point goes to the nearest center, so the groups are {1} and {2, 3, 10, 11, 12}.",
              "Move each center to the mean of its group: the first stays at 1, the second moves to (2 + 3 + 10 + 11 + 12) / 5 = 7.6.",
              "Reassign the points. Point 2 is at distance 1 from the first center and 5.6 from the second, so it moves to the first, and so does 3. The groups become {1, 2, 3} and {10, 11, 12}.",
              "Move the centers again, to (1 + 2 + 3) / 3 = 2 and to (10 + 11 + 12) / 3 = 11.",
              "Reassign, and no point changes group, so you stop."
            ]
          },
          {
            "note": "K-Means measures distances, so scaling is mandatory. Without it, the column with the largest numbers dominates the grouping and the rest doesn't count."
          },
          {
            "code": "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=4, n_init=10, random_state=0)\nlabels = km.fit_predict(X_scaled)"
          },
          {
            "p": "`X_scaled` is your features (the input columns) after scaling, for example with `StandardScaler().fit_transform(X)` (Lesson 5). `n_clusters=4` is k. An unlucky start for the centers can give bad groups, so `n_init=10` runs the algorithm from 10 different starts and keeps the best one. `random_state=0` makes the starts the same on every run. `fit_predict` does `fit` and `predict` in one go: it finds the centers and gives you each row's group, a number from 0 to 3. The numbers are just names: group 3 isn't better than group 1."
          }
        ]
      },
      {
        "heading": "The elbow method and the silhouette score",
        "blocks": [
          {
            "p": "How do you choose k? The elbow method: you run it for several values of k and plot how tight the groups are. Where the curve bends like an elbow, you have a reasonable k."
          },
          {
            "p": "You measure how tight the groups are with the inertia: the sum of the squared distances from each point to its center. In the example above, with centers 2 and 11, the distances are 1, 0, 1, 1, 0 and 1, so the inertia is 1² + 0² + 1² + 1² + 0² + 1² = 4. On the plot, k goes on the horizontal axis and the inertia on the vertical one."
          },
          {
            "code": "import numpy as np\nfrom sklearn.cluster import KMeans\n\npoints = np.array([[1], [2], [3], [10], [11], [12]])   # one column\nfor k in range(1, 5):\n    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(points)\n    print(k, round(km.inertia_, 1))\n# 1 125.5\n# 2 4.0\n# 3 2.5\n# 4 1.0"
          },
          {
            "p": "Each point is a row with a single column, hence the double brackets, and `inertia_` is the inertia computed during `fit`. From k = 1 to k = 2 the inertia drops from 125.5 to 4, then barely moves, so the elbow is at k = 2. Don't pick the k with the lowest inertia: it always goes down as k grows, all the way to 0, when every point is its own center."
          },
          {
            "p": "The silhouette score is a numeric alternative, it measures how well the groups separate. For each point you compare two average distances: a, to the other points in its own group, and b, to the points in the nearest other group."
          },
          {
            "formula": "s = (b - a) / max(a, b)",
            "explain": "s comes out between -1 and 1. Close to 1, the point is much closer to its own group than to the other. Close to 0, it sits on the border between two groups. Negative, it's probably in the wrong group. The silhouette score is the mean of s over all the points."
          },
          {
            "p": "For point 1 in the example, a = (1 + 2) / 2 = 1.5, the average distance to 2 and 3, and b = (9 + 10 + 11) / 3 = 10, the average distance to 10, 11 and 12. So s = (10 - 1.5) / 10 = 0.85. The mean over all 6 points also comes out at 0.85."
          },
          {
            "code": "from sklearn.metrics import silhouette_score\n\nfor k in range(2, 5):\n    km = KMeans(n_clusters=k, n_init=10, random_state=0)\n    labels = km.fit_predict(points)\n    print(k, round(silhouette_score(points, labels), 2))\n# 2 0.85\n# 3 0.5\n# 4 0.17"
          },
          {
            "p": "You pick the k with the highest score, here k = 2 again. The loop starts at 2 because the silhouette score needs at least two groups."
          }
        ]
      },
      {
        "heading": "DBSCAN and hierarchical clustering",
        "blocks": [
          {
            "p": "DBSCAN groups by density: where points are packed together they form a group, and isolated points it marks as noise (here, points that don't belong to any group). Advantages: you don't have to give the number of groups and it finds the outliers on its own. It depends on two hyperparameters, the neighborhood radius and the minimum number of neighbors, which you have to tune."
          },
          {
            "p": "In scikit-learn they're called `eps` and `min_samples`. Two points are neighbors if the distance between them is at most `eps`. A point with at least `min_samples` points within its radius, counting itself, sits at the core of a group, and its neighbors join the same group. Whatever doesn't end up in any group is noise."
          },
          {
            "code": "from sklearn.cluster import DBSCAN\n\npoints = [[1], [2], [3], [10], [11], [12], [30]]\ndb = DBSCAN(eps=1.5, min_samples=2)\nprint(db.fit_predict(points))   # [ 0  0  0  1  1  1 -1]"
          },
          {
            "p": "Points 1, 2 and 3 are neighbors in a chain and form group 0, and 10, 11 and 12 form group 1. Point 30 has no neighbors and gets -1, the label for noise. To tune `eps`, try several values: here, with 0.5 everything would be noise, and with 20 it would all be one group. Scale the data first, as with K-Means."
          },
          {
            "p": "Hierarchical clustering builds a tree of groups, from each point separate up to one big group. You draw it as a dendrogram and cut it at the level that gives you the number of groups you want. Useful when you want to see structure at several levels."
          },
          {
            "p": "You start with each point as its own group and, at each step, merge the two closest groups, until only one is left. The dendrogram draws these merges like a family tree: the points are at the bottom, and each merge is a horizontal line at the height of the distance between the two groups. If you cut the drawing with a horizontal line, each branch you cut is a group."
          },
          {
            "code": "from scipy.cluster.hierarchy import linkage, dendrogram, fcluster\nimport matplotlib.pyplot as plt\n\npoints = [[1], [2], [3], [10], [11], [12]]\nZ = linkage(points, method=\"average\")   # all the merges, in order\ndendrogram(Z)\nplt.show()\nprint(fcluster(Z, t=5, criterion=\"distance\"))   # [1 1 1 2 2 2]"
          },
          {
            "p": "With `method=\"average\"`, the distance between two groups is the average distance between their points. At the bottom, the points show up by their position in the list, from 0 to 5. First 1 merges with 2 and 10 with 11, at height 1, then 3 and 12 join them at 1.5, and the two big groups only merge at 9. `fcluster` cuts at height `t=5` and gives each point's group, numbered from 1. scipy gets installed along with scikit-learn."
          }
        ]
      },
      {
        "heading": "PCA: dimensionality reduction",
        "blocks": [
          {
            "p": "Here a dimension means a column: a row with 2 columns is a point in the plane, and one with 100 columns is a point in a space with 100 axes, which you can no longer draw. In NumPy (Lesson 4) the word meant something else: there, a table was an array with 2 dimensions."
          },
          {
            "p": "When you have tens or hundreds of columns, it's hard to visualize and models suffer (the curse of dimensionality). PCA (principal component analysis) finds the directions the data varies most along and projects onto them, keeping as much information as possible in fewer dimensions."
          },
          {
            "p": "The curse of dimensionality: with each extra column, the points get sparser. To cover a line segment with points 0.1 apart you need 10 points. For a square you need 100, for a cube 1000, and for 10 columns ten billion (10 to the power of 10). With hundreds of columns and a few thousand rows, your data is sparse points in an almost empty space, and models easily find patterns that are just chance."
          },
          {
            "p": "An example in 2D: in a class of students, height and weight go up together, so on a scatter plot the points lie close to a slanted line. Along the line, the direction says roughly \"how big the student is\", and that's where the data varies most. Along the perpendicular direction, \"heavier or lighter than you'd expect for the height\", the points stray only a little."
          },
          {
            "p": "\"Varies most\" means the values are most spread out. Spread is measured with the variance, the square of the standard deviation from Lessons 4 and 5: the mean of the squared distances to the mean. The lists 4, 5, 6 and 0, 5, 10 have the same mean, 5, but very different variances: (1 + 0 + 1) / 3 ≈ 0.67 and (25 + 0 + 25) / 3 ≈ 16.7."
          },
          {
            "note": "The variance here is a different thing from a model's variance in Lessons 1 and 8 (how much the model changes when you change the training data). In PCA, variance is just how spread out the values are."
          },
          {
            "p": "The directions PCA finds are called components. Each component is a new column computed from the old ones: the first one, for the students, goes up when both height and weight go up. Projecting a point onto a component means keeping only where it falls along that direction, like its shadow on a line. With the first component alone, each student is described by one number instead of two."
          },
          {
            "p": "PCA tells you how much of the variance you keep with each component. You can go from 100 columns down to 10 that keep, say, 95% of the information. It's useful as preprocessing before a model, as well as for drawings. It needs scaled data: otherwise a column in thousands of lei looks like the most spread out one just because of its unit, and the first component would be almost entirely that column."
          },
          {
            "code": "import numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\n\n# height (cm) and weight (kg) for 6 students\nstudents = np.array([[150, 45], [155, 52], [160, 50],\n                     [170, 63], [175, 66], [185, 72]])\nstudents_scaled = StandardScaler().fit_transform(students)\np = PCA().fit(students_scaled)\nprint(p.explained_variance_ratio_.round(2))   # [0.99 0.01]"
          },
          {
            "p": "`explained_variance_ratio_` is the explained variance: the share of the total spread that each component captures. The first captures 99%, the second 1%, so you can keep only the first."
          },
          {
            "code": "from sklearn.decomposition import PCA\np = PCA(n_components=0.95).fit(X_scaled)   # keep 95% of the variance\nX_reduced = p.transform(X_scaled)\nprint(X_reduced.shape[1], \"components\")"
          },
          {
            "p": "`n_components=0.95` asks PCA for as many components as it takes to reach 95% of the variance, while a whole number, say 2, asks for exactly that many. `fit` finds the directions, `transform` computes each row's values along them, and `X_reduced.shape[1]` is the number of columns left. Before a supervised model, `fit` only on the training data, as with scaling (Lesson 5), and apply `transform` to the validation and test data."
          }
        ]
      },
      {
        "heading": "t-SNE and UMAP: for visualization only",
        "blocks": [
          {
            "p": "A 2D projection turns each row, with all its columns, into a point with just two coordinates, x and y, that you can put on a scatter plot (Lesson 4). PCA with `n_components=2` makes a 2D projection too."
          },
          {
            "p": "t-SNE and UMAP make 2D projections that look nice and bring out groups. They're excellent for looking at the structure of the data. But they have an important catch: the distances and group sizes in the drawing aren't trustworthy. Two groups close together in the picture aren't necessarily close in reality."
          },
          {
            "p": "The reason: t-SNE and UMAP only try to keep neighbors together. Rows that are alike end up close in the drawing, but the large distances between groups aren't preserved."
          },
          {
            "code": "from sklearn.manifold import TSNE\nimport matplotlib.pyplot as plt\n\nX_2d = TSNE(n_components=2, random_state=0).fit_transform(X_scaled)\nprint(X_2d.shape)   # (number of rows, 2)\nplt.scatter(X_2d[:, 0], X_2d[:, 1], s=5)\nplt.show()"
          },
          {
            "p": "`X_2d[:, 0]` is every row of column 0, meaning each point's x, and `s=5` makes the points small. t-SNE is in scikit-learn, but it gets slow on tens of thousands of rows, so plot a sample. UMAP lives in a separate package, umap-learn (`pip install umap-learn`, then `import umap`), which may be missing at the contest. t-SNE doesn't even have `transform` for new data, so you can't apply it to the test set."
          },
          {
            "note": "Use t-SNE and UMAP to look, not to draw hard conclusions. For trustworthy preprocessing, PCA is the safe choice."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Apply K-Means and DBSCAN to the same dataset and compare the groups found."
      },
      {
        "title": "Reduce to 2D with PCA and with UMAP (or with t-SNE, if umap-learn isn't installed) and see what differs between them."
      },
      {
        "title": "Use the elbow method to choose k on a dataset and justify the choice."
      }
    ]
  },
  {
    "moduleCode": "S15",
    "duration": "~2 weeks",
    "intro": "This part of AI has no training data. You have a start state, a goal, and some allowed moves. The question is how you reach the goal efficiently. It's algorithmic, almost like a programming contest, and it shows up in puzzle, planning and game problems. You solve it with data structures, not with models.",
    "sections": [
      {
        "heading": "State space: the common language",
        "blocks": [
          {
            "p": "Take a small maze, 3 by 3 squares. S is the start, G is the goal, # is a wall, and a dot is a free square. You can move one square at a time, up, down, left or right, but not through walls."
          },
          {
            "code": "S . #\n. # .\n. . G"
          },
          {
            "p": "Each square has coordinates (row, column), counted from 0 like Python indices. S is at (0, 0), the walls are at (0, 2) and (1, 1), and G is at (2, 2). The square you're on right now is your state: a state is everything you need to know about the situation to carry on from there."
          },
          {
            "p": "Every search problem is described the same way: a start state, a set of actions that lead from one state to another, a goal test that says whether you've arrived, and optionally a cost on each move. A maze: the state is your position, the actions are the steps in the four directions, the goal is the exit. In our maze, the goal test is the question \"am I on G?\", and each step costs 1."
          },
          {
            "p": "All the states you can reach form a graph, where the nodes are states and the edges are moves. A graph is a set of points, called nodes, joined by lines, called edges. A subway map is a graph: the stations are the nodes, and the stretches of track between neighboring stations are the edges."
          },
          {
            "p": "In the maze, the nodes are the 7 free squares. An edge joins two neighboring free squares: S with (0, 1), S with (1, 0), (1, 0) with (2, 0), (2, 0) with (2, 1), (2, 1) with G, and (1, 2) with G."
          },
          {
            "p": "Search means exploring that graph cleverly, without building all of it, because it's usually enormous. Our maze has 7 states, but a Rubik's cube has more than 43 billion billion."
          },
          {
            "note": "Always mark the states you've visited. Without that you go around in circles forever, revisiting the same states. In the maze: from S you go to (1, 0), from (1, 0) one move takes you back to S, from there back to (1, 0), and so on. It's the most common cause of a search that never ends."
          }
        ]
      },
      {
        "heading": "Uninformed search: BFS, DFS, uniform cost",
        "blocks": [
          {
            "p": "Uninformed search explores blindly, with no idea where the goal is. The algorithms below differ in the order in which they pick the next state to explore, and that order comes from the structure that holds the states waiting their turn."
          },
          {
            "p": "The first structure is the queue, like the line at the canteen: whoever got there first is served first. You add at the back and take from the front."
          },
          {
            "p": "BFS (breadth-first search) explores level by level, using a queue. First every state one step from the start, then every state two steps away, and so on. It always finds the path with the fewest moves, but it uses a lot of memory: a whole level sits in the queue at once. If every state has 3 new moves, level 10 can have 3^10 = 59,049 states waiting."
          },
          {
            "p": "On the maze, BFS starts with S in the queue. It takes S out and puts its free neighbors, (1, 0) and (0, 1), into the queue. This step is called expanding a state: you take it out of the queue and add its unvisited neighbors. Next comes (1, 0), which adds (2, 0). Then (0, 1), a dead end that adds nothing. Then (2, 0) adds (2, 1), and (2, 1) adds G. When G comes out of the queue, you're done."
          },
          {
            "p": "To get the path, each square remembers the square you reached it from, called its parent. You start at G and follow the parents back: G, (2, 1), (2, 0), (1, 0), S. Reversed, that's the 4-step path. It's the shortest possible: BFS finishes every square 1 step away before it moves on to the squares 2 steps away, so the first time it reaches G, it got there by the shortest path."
          },
          {
            "p": "In Python, the queue is a `deque` from the `collections` module, the same module you imported `Counter` from in Lesson 3. `append` adds at the back and `popleft` takes from the front. A plain list works too, but `my_list.pop(0)` shifts every other element by one position, so it gets slow on long lists."
          },
          {
            "code": "from collections import deque\n\nmaze = [\"S.#\",\n        \".#.\",\n        \"..G\"]\nrows, cols = len(maze), len(maze[0])\n\ndef neighbors(pos):\n    r, c = pos\n    result = []\n    # up, down, left, right\n    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n        nr, nc = r + dr, c + dc\n        inside = 0 <= nr < rows and 0 <= nc < cols\n        if inside and maze[nr][nc] != \"#\":\n            result.append((nr, nc))\n    return result\n\ndef bfs(start, goal):\n    queue = deque([start])\n    parent = {start: None}        # where you came from; also marks visited\n    while queue:\n        pos = queue.popleft()     # take from the front\n        if pos == goal:\n            break\n        for n in neighbors(pos):\n            if n not in parent:   # not visited yet\n                parent[n] = pos\n                queue.append(n)   # add at the back\n    if goal not in parent:\n        return None               # no path\n    path = []\n    pos = goal\n    while pos is not None:        # walk back, parent by parent\n        path.append(pos)\n        pos = parent[pos]\n    return path[::-1]             # reversed: from start to goal\n\nprint(bfs((0, 0), (2, 2)))\n# [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2)]"
          },
          {
            "p": "The function takes the maze, as a list of strings, plus the start and the goal, and returns the path as a list of coordinates. `rows` and `cols` are computed from the maze, so the same code works on any rectangular grid. `neighbors` tries the four directions and keeps only the squares inside the grid that aren't walls."
          },
          {
            "p": "Each pair (dr, dc) says how much the row and the column change: (-1, 0) is one row up, (0, 1) one column to the right. `0 <= nr < rows` checks two things at once: that the row is at least 0 and that it's less than the number of rows. `maze[nr][nc]` first picks the string of row nr, then the character at position nc in it."
          },
          {
            "p": "The `parent` dictionary does two jobs: it stores each square's parent, and its keys are the visited squares, so `n not in parent` means \"not visited yet\". `while queue:` runs as long as the queue isn't empty, because an empty queue counts as false, like an empty list (Lesson 3). `path[::-1]` reverses the list: it's the `[::2]` slice from Lesson 3, with a step of -1."
          },
          {
            "p": "The second structure is the stack, like a pile of plates: you put plates on top and take them from the top, so the last one put down is the first one taken."
          },
          {
            "p": "DFS (depth-first search) goes as far as it can down one path, with a stack. It uses little memory, but it may not find the shortest path and can get lost deep down. The memory stays small because it only holds the path it's on and the neighbors left for later along it, not a whole level. To see it in action, write `queue.pop()` instead of `queue.popleft()` in the code above: you always take the last state added, so the deque behaves like a stack."
          },
          {
            "p": "On the maze, (0, 1) comes out right after S, because it went in last, and only after that dead end does (1, 0) get its turn. Here there's only one path, so DFS finds that same one. On an empty 5 by 5 grid, from one corner to the opposite one, the same version returns a winding path of 16 steps, while the shortest has 8."
          },
          {
            "p": "Uniform cost (Dijkstra) is like BFS, but it accounts for move costs: it always expands the state with the lowest total cost so far. When moves have different costs, it finds the cheapest path, not the shortest by number of steps."
          },
          {
            "p": "An example with costs: four towns, A, B, C and D, linked by one-way roads to keep the example short. Each road has a cost in minutes: A to B 1, A to C 4, B to C 2, B to D 5 and C to D 1. You want to get from A to D as fast as possible."
          },
          {
            "p": "BFS looks for the path with the fewest edges, so it would return A, B, D (6 minutes) or A, C, D (5 minutes). The fastest is A, B, C, D, though: 1 + 2 + 1 = 4 minutes, even with three edges."
          },
          {
            "p": "Uniform cost uses a priority queue. What comes out isn't whoever arrived first, but the element with the best priority, like in a hospital emergency room, where the most serious case goes in first. Here the priority is the cost: the state you reached most cheaply always comes out first."
          },
          {
            "p": "On the towns: you start with A, at cost 0. You expand A, and B enters the queue with cost 1, C with 4. B (1) comes out, the smallest: C enters again, with 1 + 2 = 3, and D with 1 + 5 = 6. C (3) comes out, and D enters with 3 + 1 = 4. C (4) comes out, but C was already expanded along a cheaper path, so you skip it. D (4) comes out, the goal: the path A, B, C, D, 4 minutes."
          },
          {
            "p": "You stop when the goal comes out of the queue, not when it goes in. D first went in with cost 6, but by the time its turn came, the 4-minute route had shown up."
          },
          {
            "p": "In Python, the priority queue is the `heapq` module. `heapq.heappush(queue, x)` adds and `heapq.heappop(queue)` takes out the smallest element. When the elements are tuples, it compares them by the first number, here the cost."
          },
          {
            "code": "import heapq\n\nroads = {\"A\": [(\"B\", 1), (\"C\", 4)],\n         \"B\": [(\"C\", 2), (\"D\", 5)],\n         \"C\": [(\"D\", 1)],\n         \"D\": []}\n\ndef uniform_cost(start, goal):\n    queue = [(0, start, [start])]    # (cost so far, town, path)\n    done = set()                     # towns already expanded\n    while queue:\n        cost, town, path = heapq.heappop(queue)   # the cheapest\n        if town == goal:\n            return cost, path\n        if town in done:\n            continue                 # already reached it more cheaply\n        done.add(town)\n        for nxt, c in roads[town]:\n            heapq.heappush(queue, (cost + c, nxt, path + [nxt]))\n    return None\n\nprint(uniform_cost(\"A\", \"D\"))   # (4, ['A', 'B', 'C', 'D'])"
          },
          {
            "p": "`roads` says, for each town, where you can go and at what cost. The queue holds tuples (cost, town, path): what it cost to get there, the town, and the path so far. The `done` set holds the towns already expanded, so the second copy of C gets skipped. `path + [nxt]` builds a new list with the next town added at the end. The function returns the lowest cost and the path."
          },
          {
            "list": [
              "BFS: queue, fewest-steps path, large memory.",
              "DFS: stack, small memory, no shortest-path guarantee.",
              "Uniform cost: priority queue on cost, lowest-cost path."
            ]
          }
        ]
      },
      {
        "heading": "A*: informed search with a heuristic",
        "blocks": [
          {
            "p": "A* (read \"A star\") is the star of the module. It adds a heuristic, meaning an estimate of the distance left to the goal, so it heads straight for the target instead of exploring blindly. It combines the cost already paid with the estimate of what's left to pay."
          },
          {
            "p": "A heuristic is a quick rule of thumb for estimating. On a map, the straight-line distance to a town tells you roughly how far you still have to go, even before you know which roads you'll take."
          },
          {
            "formula": "f(n) = g(n) + h(n)",
            "explain": "g(n) = the real cost from start to state n. h(n) = the estimate (the heuristic) from n to the goal. A* always expands the state with the lowest f."
          },
          {
            "p": "On a grid, a natural heuristic is the Manhattan distance: how many rows plus how many columns separate you from the goal, as if there were no walls. Between (r1, c1) and (r2, c2) it's |r1 - r2| + |c1 - c2|, where |x| is the absolute value, the number without its sign. From S = (0, 0) to G = (2, 2) you get |0 - 2| + |0 - 2| = 2 + 2 = 4. The name comes from the streets of Manhattan, laid out in a grid, where you can't cut diagonally between the buildings."
          },
          {
            "p": "A* on the maze, where every step costs 1: at S, g = 0 and h = 4, so f = 4. The neighbor (1, 0) has g = 1 and h = |1 - 2| + |0 - 2| = 3, so f = 4. The neighbor (0, 1) has g = 1 and h = |0 - 2| + |1 - 2| = 3, also f = 4. The heuristic can't see walls, so the dead end (0, 1) looks just as good to it."
          },
          {
            "p": "Along the good path, (2, 0) has g = 2 and h = 2, (2, 1) has g = 3 and h = 1, and G has g = 4 and h = 0. f stays 4 the whole way, because here the heuristic guessed exactly how much was left."
          },
          {
            "p": "On a grid with no walls you can see why A* heads straight for the goal. A step toward the goal raises g by 1 and lowers h by 1, so f stays the same. A step in the wrong direction raises both g and h by 1, so f goes up by 2. A* always takes out the state with the lowest f, so the wrong steps wait at the back and often never get expanded."
          },
          {
            "p": "The code is the uniform cost code with one change: you put tuples (g + h, g, node, path) in the queue. They come out in order of f = g + h, but you keep g to compute the cost of the neighbors."
          },
          {
            "p": "For A* to guarantee the optimal path, the heuristic has to be admissible: it must never overestimate the real distance left. If h is admissible, A* can't miss the optimal solution. If it overestimates, it may find a path, but not necessarily the shortest one."
          },
          {
            "p": "Manhattan is admissible in the maze: every step changes the row or the column by exactly 1, so you need at least |r1 - r2| + |c1 - c2| steps, and walls can only make the path longer."
          },
          {
            "p": "The towns show what an overestimate breaks. The real cost left to D is 4 from A, 3 from B and 1 from C. The heuristic h(A) = 3, h(B) = 2, h(C) = 1, h(D) = 0 never exceeds them, and A* finds the path A, B, C, D, 4 minutes. Now change only h(C) to 10. Once A and B are expanded, the best C in the queue has f = 3 + 10 = 13, and D has f = 6 + 0 = 6. D comes out, and A* returns A, B, D, 6 minutes. With h(C) = 1, C would have had f = 3 + 1 = 4, below 6, and A* would have gone through it."
          },
          {
            "p": "A classic puzzle is the 8-puzzle: a 3 by 3 board with tiles numbered 1 to 8 and one empty square. Each move slides a neighboring tile into the empty square, and the goal is to put the tiles in order."
          },
          {
            "p": "Classic heuristics for puzzles: Manhattan distance (the sum of the horizontal and vertical differences) and the number of misplaced tiles. Both never overestimate, so they're admissible."
          },
          {
            "p": "For the 8-puzzle, Manhattan adds up, for each tile, how many rows and columns separate it from its place. It can't overestimate, because one move shifts a single tile by a single square. Neither can the count of misplaced tiles, because each of them needs at least one move. Manhattan gives larger estimates, so closer to the real cost, which is why A* usually expands fewer states with it."
          }
        ]
      },
      {
        "heading": "Games: minimax and alpha-beta",
        "blocks": [
          {
            "p": "In two-player turn-based games (tic-tac-toe, simplified chess), you don't look for a path, you look for the best move assuming the opponent plays their best against you. That's what minimax does: you maximize the score, the opponent minimizes it, and you analyze the move tree down to some depth."
          },
          {
            "p": "The move tree starts from the current position. One branch leaves it for each of your moves, then one branch leaves each new position for each of the opponent's replies, and so on. At the ends of the branches, called leaves, the game is over and you have a score: high is good for you, low is good for the opponent. The depth is how many moves ahead you look. If the game isn't over at that depth, you give the position an estimated score, for example the difference in pieces in chess."
          },
          {
            "p": "A small tree: you have three moves, A, B and C, and after each one the opponent has two replies. The game ends with a score of 3 or 5 after A, 2 or 9 after B, and 1 or 7 after C."
          },
          {
            "p": "Minimax works from the bottom up. The opponent picks the minimum in each branch: after A they leave you 3, after B 2, after C 1. You pick the maximum of those minimums, which is 3, so move A. If you went by the biggest number in the tree, you'd pick B for the 9, but the opponent would answer with the reply that gives you 2."
          },
          {
            "p": "The tree grows explosively: every move opens up many others. In tic-tac-toe, the first move has 9 options, the second 8, the third 7, so after three moves you already have 9 · 8 · 7 = 504 branches. In chess, with about 30 possible moves at each step, four moves give you 30^4 = 810,000."
          },
          {
            "p": "Alpha-beta pruning cuts the branches that can't change the result anyway, without losing correctness (pruning is what a gardener does when cutting branches off a tree). With it you reach deeper in the same compute time."
          },
          {
            "p": "On the tree above: once you've worked out A, you know you can get at least 3. At B, the first leaf is 2, so the opponent can hold you to 2 or less, below 3. B is certainly worse than A, so you don't read the leaf with the 9: whatever it is, the opponent won't let you have it. At C, the first leaf is 1, and you cut the same way. You've read 4 leaves out of 6 and picked the same move, A."
          },
          {
            "p": "The name comes from the two numbers the algorithm keeps track of: alpha, the score you've already secured (here 3), and beta, the score the opponent has already secured. Order matters: if you checked C first, then B and A, you'd cut nothing. That's why chess programs try the moves that look good first."
          },
          {
            "note": "Alpha-beta gives exactly the same result as minimax, just faster. It doesn't change the chosen move, it only skips branches it has proven useless."
          }
        ]
      },
      {
        "heading": "CSP: constraint problems",
        "blocks": [
          {
            "p": "A CSP (constraint satisfaction problem) asks for an assignment of values to some variables that respects all the rules. Coloring a map with three colors so neighbors differ, Sudoku, a timetable: all are CSPs."
          },
          {
            "p": "A CSP has variables (what you have to choose), a domain for each variable (the values it can take) and constraints (the rules). In Sudoku, the variables are the 81 squares, and each domain is the digits 1 to 9. The constraints require different digits in every row, every column and every 3 by 3 box."
          },
          {
            "p": "Take four regions on the map of Romania: Transylvania, Moldavia, Muntenia and Oltenia. They're the variables, and each one's domain is {red, green, blue}. The constraint: two neighboring regions get different colors. Transylvania borders the other three, Muntenia borders Moldavia and Oltenia, and Moldavia and Oltenia don't touch."
          },
          {
            "p": "You solve them with backtracking: you assign a value, move on, and if you get stuck you go back and try something else."
          },
          {
            "p": "On the map, you take the regions one by one and try the colors in the order red, green, blue. Transylvania gets red. Moldavia can't be red, since it borders Transylvania, so it gets green. Muntenia borders both, so blue is what's left. Oltenia can't be red (Transylvania) or blue (Muntenia), so it gets green. Moldavia and Oltenia are both green, but they don't touch, so that's allowed."
          },
          {
            "p": "You see the backtracking happen if you try with only red and green. Transylvania is red, Moldavia green, and Muntenia, which borders both, has no color left. You go back to Moldavia, but it has no other free color either, so you go back to Transylvania and make it green. Moldavia becomes red, and Muntenia gets stuck the same way. The conclusion: there's no solution with two colors, because Transylvania, Moldavia and Muntenia all touch each other."
          },
          {
            "p": "Without improvements, backtracking is slow. On a big map you can color dozens of regions correctly and only find out at the end that an early choice didn't work. Two techniques speed it up a lot:"
          },
          {
            "list": [
              "Forward checking: after each assignment, you remove from the neighbors the values that are no longer possible. You catch dead ends early.",
              "MRV (minimum remaining values): you always pick the variable with the fewest values left. You attack the most constrained part first, where a contradiction is more likely."
            ]
          },
          {
            "p": "Forward checking on the map, with three colors: after Transylvania = red, you remove red from the neighbors' domains, so Moldavia, Muntenia and Oltenia are left with {green, blue}. After Moldavia = green, you remove green from Muntenia, which is left with only {blue}. With two colors, the same step would have emptied Muntenia's domain right after you colored Moldavia, so you'd know on the spot that you have to go back."
          },
          {
            "p": "MRV then picks Muntenia, with one color left, before Oltenia, which still has two. Muntenia gets blue, Oltenia is left with only {green}, and the map is done without a single wrong try. At the start every region has three colors, so you can begin with any of them."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Implement A* for the 8-puzzle with two heuristics (Manhattan and misplaced tiles) and compare the number of states expanded."
      },
      {
        "title": "Solve a map coloring as a CSP with forward checking and MRV."
      },
      {
        "title": "Write minimax with alpha-beta for tic-tac-toe and check it never loses."
      }
    ]
  },
  {
    "moduleCode": "S16",
    "duration": "~1 week",
    "intro": "NLP (natural language processing) means getting a program to work with text written by people: reviews, emails, news. You can do serious NLP without deep learning, meaning without the big neural networks from Lesson 14 on. TF-IDF is a way of turning text into numbers, which you'll build below. Together with a linear model, like the logistic regression from Lesson 7, it solves many text classification problems, fast and in a way you can explain. It's a baseline that's hard to beat (the simple model you start from, as in Lesson 6). Before you bring out the heavy artillery, build this. Often it's enough, and it's always the reference you judge any more complicated model against.",
    "sections": [
      {
        "heading": "The problem: models want numbers, you have text",
        "blocks": [
          {
            "p": "A mathematical model works with numbers, but text is a string of characters. The logistic regression from Lesson 7 multiplies each feature by a weight, and \"the film was great\" can't be multiplied by anything."
          },
          {
            "p": "All of classic NLP is about how you turn text into vectors of numbers that keep the meaning, so you can put an ordinary model on top. A vector here is a list of numbers of the same length for every text, like a row in a table of features, the input columns. The steps are: you clean the text, cut it into units, turn it into numbers."
          }
        ]
      },
      {
        "heading": "Text preprocessing",
        "blocks": [
          {
            "p": "Tokenization cuts the text into units, called tokens, usually words. The simplest tokenizer is `text.lower().split()` from Lesson 3, which cuts at the spaces but leaves punctuation stuck to the words, as in `'school,'`. `re.findall(r\"\\w+\", text.lower())`, also from Lesson 3, is better: `\\w+` means \"one or more letters or digits in a row\", so commas and periods stay out."
          },
          {
            "p": "Then you remove stopwords, the very frequent, contentless words (and, or, of, the), which only add noise. You put them in a set and keep only the tokens that aren't in it."
          },
          {
            "p": "Lemmatization brings words back to their base form: went, going, gone become go, so the model doesn't treat them as completely different things. The base form, called the lemma, is the one in the dictionary: the infinitive for verbs, the singular for nouns. That takes a dictionary with every form of every word, so you do lemmatization with a library, for example spaCy, which also has a model for Romanian."
          },
          {
            "p": "All the steps, on a single sentence: \"I was walking to school, but I forgot my homework.\" becomes, after tokenization, `['i', 'was', 'walking', 'to', 'school', 'but', 'i', 'forgot', 'my', 'homework']`. Without stopwords (i, to, but, my) it's `['was', 'walking', 'school', 'forgot', 'homework']`, and after lemmatization `['be', 'walk', 'school', 'forget', 'homework']`."
          },
          {
            "note": "For Romanian, watch out for diacritics and the rich inflection. The same word appears written with and without diacritics and in many forms. Normalize consistently (for example, treat ș and s the same), otherwise you lose matches and spread the signal across separate forms: to the model, \"școală\" and \"scoala\" are different words, and what it learns about one doesn't carry over to the other. To strip the diacritics, after lowercasing the text, you use `text.translate(str.maketrans(\"ăâîșț\", \"aaist\"))`: it replaces each letter of the first string with the letter in the same position in the second."
          }
        ]
      },
      {
        "heading": "Bag-of-words and TF-IDF",
        "blocks": [
          {
            "p": "Bag-of-words describes a document by how many times each word from the vocabulary appears, ignoring the order. A document here is any text you're processing (a sentence, a review, an email), and the vocabulary is the list of all the words that appear in the documents."
          },
          {
            "p": "Three documents: \"the film is good\", \"the film is very very good\" and \"the film is bad\". The vocabulary, in alphabetical order, is bad, film, good, is, the, very. Each document becomes a vector of 6 numbers, one per vocabulary word: [0, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 2] and [1, 1, 0, 1, 1, 0]. The second one has a 2 in the place of \"very\", because it contains it twice."
          },
          {
            "code": "from sklearn.feature_extraction.text import CountVectorizer\n\ndocs = [\"the film is good\",\n        \"the film is very very good\",\n        \"the film is bad\"]\nvec = CountVectorizer()\nX = vec.fit_transform(docs)\nprint(vec.get_feature_names_out())\n# ['bad' 'film' 'good' 'is' 'the' 'very']\nprint(X.toarray())\n# [[0 1 1 1 1 0]\n#  [0 1 1 1 1 2]\n#  [1 1 0 1 1 0]]"
          },
          {
            "p": "`CountVectorizer` does bag-of-words: `fit` learns the vocabulary, `transform` counts the words, and `fit_transform` does both at once. `get_feature_names_out()` gives you the vocabulary, the names of the columns. By default it lowercases the text. Also by default, it skips one-letter words, like \"a\" or \"I\"."
          },
          {
            "p": "The result is a sparse matrix, which stores only the numbers that aren't zero. On real texts the vocabulary has tens of thousands of words, and each vector is almost all zeros. `.toarray()` turns it into an ordinary NumPy array so you can print it."
          },
          {
            "p": "Simple, but common words (which show up everywhere) drown the signal, because they get big numbers without being informative. In the example, \"the\", \"film\" and \"is\" appear in all three documents, so they don't help you tell them apart at all."
          },
          {
            "p": "TF-IDF fixes this by weighting each word by two things: how often it appears in the document (TF, term frequency) and how rare it is across the other documents (IDF, inverse document frequency). A word that appears often in one document but rarely elsewhere gets a high weight, because it's characteristic of that document."
          },
          {
            "formula": "tf-idf(word, doc) = tf(word, doc) · log(N / df(word))",
            "explain": "tf = how many times the word appears in the document. N = the total number of documents. df = in how many documents the word appears. Ubiquitous words get an IDF close to 0."
          },
          {
            "p": "log is the logarithm: log(x) tells you what power you have to raise 10 to in order to get x. log(10) = 1, log(100) = 2, log(1000) = 3, so it grows very slowly, and log(1) = 0, because 10 to the power 0 is 1. For numbers between 1 and 10 it gives values between 0 and 1, for example log(3) ≈ 0.48. A word that's in every document has N / df = 1, so its IDF = log(1) = 0."
          },
          {
            "p": "On the three documents above, N = 3. \"the\", \"film\" and \"is\" are in all three, so their IDF = log(3 / 3) = 0 and they vanish. \"good\" is in two, so its IDF = log(3 / 2) = log(1.5) ≈ 0.18. \"very\" and \"bad\" are in only one, with IDF = log(3) ≈ 0.48. In the second document, \"very\" has tf = 2, so tf-idf = 2 · 0.48 ≈ 0.95, and \"good\" has 1 · 0.18 = 0.18. The third is left with only \"bad\", at 0.48: exactly the word that sets it apart from the others."
          },
          {
            "p": "TF-IDF doesn't know what words mean. \"good\" gets a low weight here only because it appears in two documents out of three, not because it matters less in a review."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)\nX = vec.fit_transform(train_texts)      # fit ONLY on train\nX_val = vec.transform(val_texts)        # transform on val",
            "caption": "ngram_range=(1,2) puts word pairs into the vocabulary, on top of the single words."
          },
          {
            "p": "`train_texts` and `val_texts` are lists of strings, one text per element. `X` comes out as a sparse matrix, with one row per text and one column per word or word pair in the vocabulary. `TfidfVectorizer` uses a slightly adjusted version of the formula: the natural logarithm (the same idea, but with base e ≈ 2.718 instead of 10) and a 1 added in a couple of places, so a word that's everywhere doesn't drop to exactly 0. Then it scales every vector to length 1, so a long text doesn't look important just because it has many words. What the length of a vector is comes further down, with cosine similarity. Its numbers won't match the ones you work out by hand, but rare words still get the bigger weights."
          },
          {
            "p": "An n-gram is a run of n words in a row, and `ngram_range=(1, 2)` puts both single words and pairs of neighboring words into the vocabulary. From \"is not good\" you get is, not, good, \"is not\" and \"not good\". The pair \"not good\" catches the negation, which the words lose when you take them one by one."
          },
          {
            "p": "`min_df=2` keeps only the words that appear in at least 2 documents, the same df as in the formula. A word from a single document, like a typo, doesn't help the model generalize and only makes the vectors longer."
          },
          {
            "p": "The vocabulary and the IDF values are parameters the vectorizer learns, like the mean and standard deviation in `StandardScaler` from Lesson 5. That's why you `fit` only on the training data and only `transform` the validation data. If you also fit on the validation texts, the IDF would use information from them, which is data leakage, and your validation score would come out better than the real one."
          }
        ]
      },
      {
        "heading": "Text classification",
        "blocks": [
          {
            "p": "On top of the TF-IDF vectors, two models work surprisingly well: multinomial Naïve Bayes (fast, suited to word counts) and logistic regression (often the best baseline). Both are fast and explainable: you can see which words push toward each class."
          },
          {
            "p": "Logistic regression (Lesson 7) gives every word in the vocabulary a weight. For a text, it multiplies each word's TF-IDF value by its weight and adds everything up, together with the intercept. Then it passes the sum through the sigmoid, which squeezes it into a probability between 0 and 1. A positive weight pushes toward class 1, a negative one toward class 0."
          },
          {
            "p": "Naïve Bayes (also from Lesson 7) looks at how often each word appears in the texts of each class, and treats the words as if they had nothing to do with each other. The multinomial version is the one made for counts, like word counts."
          },
          {
            "p": "A complete example, on eight short film reviews: four positive (label 1) and four negative (label 0). All eight are training data, and the two new sentences play the role of test data."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.naive_bayes import MultinomialNB\n\ntexts = [\"the film was wonderful\",\n         \"good actors and a beautiful story\",\n         \"i liked it a lot, i recommend it\",\n         \"great directing and good actors\",\n         \"the film was boring\",\n         \"weak actors and a dull story\",\n         \"i did not like it, weak actors\",\n         \"boring and far too long\"]\nlabels = [1, 1, 1, 1, 0, 0, 0, 0]      # 1 = positive, 0 = negative\n\nvec = TfidfVectorizer()\nX = vec.fit_transform(texts)           # 8 rows, 24 columns\nmodel = LogisticRegression().fit(X, labels)\n\nnew = vec.transform([\"wonderful films with good actors\",\n                     \"boring films, far too long\"])\nprint(model.predict(new))                        # [1 0]\nprint(model.predict_proba(new)[:, 1].round(2))   # [0.6  0.39]\n\nnb = MultinomialNB().fit(X, labels)\nprint(nb.predict(new))                           # [1 0]\n\nwords = vec.get_feature_names_out()\norder = model.coef_[0].argsort()      # from the smallest weight up\nprint(words[order[:3]])     # ['boring' 'weak' 'dull']\nprint(words[order[-3:]])    # ['beautiful' 'wonderful' 'good']"
          },
          {
            "p": "`predict` gives the class, and `predict_proba(new)[:, 1]` gives the probability of class 1 for each new text, as in Lesson 7. The probabilities are only a little above and below 0.5, because the model has seen just eight examples. \"films\" isn't in the vocabulary, which only has \"film\", so the vectorizer ignores it, along with \"with\". Lemmatization would have helped here, since it brings \"films\" and \"film\" to the same form."
          },
          {
            "p": "`model.coef_[0]` holds the weights, one per vocabulary word (`[0]` because with two classes `coef_` has a single row). `argsort` from Lesson 4 orders their positions from the smallest weight to the largest, so the first three words push hardest toward negative and the last three toward positive. Naïve Bayes is used the same way: `fit` on the same data, then `predict`."
          },
          {
            "p": "For search and text matching, you use cosine similarity: the cosine of the angle between two document vectors. The smaller the angle, the closer the texts are in content. It's the basis of simple search engines and of finding duplicates."
          },
          {
            "p": "Take a vocabulary of just two words, \"football\" and \"match\". A text where \"football\" appears 3 times and \"match\" 4 times is the vector (3, 4), an arrow in the plane from (0, 0) to the point (3, 4). Texts that use the same words in the same proportions have arrows pointing the same way, and two texts with no word in common have perpendicular arrows. The cosine of the angle between them, from geometry, is 1 at 0° and 0 at 90°."
          },
          {
            "formula": "similarity(a, b) = (a₁·b₁ + a₂·b₂) / (length(a) · length(b))",
            "explain": "a₁ and a₂ are the two numbers in a, how many times each word appears. length(a) = √(a₁² + a₂²), from the Pythagorean theorem. With more words in the vocabulary, you add one term per word, on top and under the square root."
          },
          {
            "p": "For a = (3, 4) and b = (4, 3): on top you get 3·4 + 4·3 = 24, and each arrow has length √(9 + 16) = 5, so the similarity is 24 / 25 = 0.96. For a and c = (6, 8), the same text written twice: 3·6 + 4·8 = 50, the lengths are 5 and 10, so 50 / 50 = 1. The length of the text doesn't matter, only the proportions of the words. For (1, 0) and (0, 1), two texts with no words in common, the top is 0, so the similarity is 0."
          },
          {
            "p": "TF-IDF vectors have no negative values, so the angle between two of them is between 0° and 90°, and the similarity is between 0 and 1."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndocs = [\"the team won the football match\",\n        \"the football match ended in a draw\",\n        \"a simple apple pie recipe\"]\nvec = TfidfVectorizer()\nX = vec.fit_transform(docs)\nprint(cosine_similarity(X).round(2))\n# [[1.   0.45 0.  ]\n#  [0.45 1.   0.  ]\n#  [0.   0.   1.  ]]\n\nquery = vec.transform([\"who won the match\"])\nprint(cosine_similarity(query, X).round(2))   # [[0.8  0.36 0.  ]]"
          },
          {
            "p": "`cosine_similarity(X)` compares every document with every other one and gives a 3 by 3 table: row i, column j holds the similarity between documents i and j. The diagonal is 1, each document with itself. The first two are about football and score 0.45, and the recipe has no word in common with them, so 0. `.round(2)` rounds to two decimals. Search works the same way: you transform the question with the same vectorizer, compare it with every document and show the closest one first, here the first document, at 0.8."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Classify Romanian texts with TF-IDF and logistic regression, fitting only on train."
      },
      {
        "title": "Find the two closest documents in a set using cosine similarity."
      },
      {
        "title": "Compare plain bag-of-words with TF-IDF on the same problem and see the difference."
      }
    ]
  },
  {
    "moduleCode": "S17",
    "duration": "~1 week",
    "intro": "An image is just a tensor of numbers, meaning a grid of numbers with several dimensions. Before neural nets (from Lesson 14 on), it's worth understanding what you do with it: how you represent it, what a convolution filter is, and which augmentation helps without breaking the label. This module is the bridge to CNNs, the networks for images in Lesson 17: if you understand the image as a tensor and convolution by hand, the convolutional layers later won't be a mystery anymore.",
    "sections": [
      {
        "heading": "The image as a tensor",
        "blocks": [
          {
            "p": "A tensor is a grid of numbers with several dimensions, the generalization of a matrix. A single number has 0 dimensions, a list of numbers has 1, a table with rows and columns (a matrix) has 2, and a stack of tables has 3. For a NumPy array, the number of dimensions is the number of values in its `shape` (Lesson 4): an array with shape (2, 3) has 2 dimensions. NumPy calls it an ndarray, PyTorch (Lesson 14) calls it a tensor, but it's the same idea."
          },
          {
            "p": "A grayscale image is a 2D matrix: each number is the intensity of a pixel, meaning how bright it is, from 0 (black) to 255 (white). A color image is a 3D tensor: height, width and 3 channels (red, green, blue). Each color pixel is three numbers: (255, 0, 0) is bright red, (255, 255, 0) is yellow, and (255, 255, 255) is white. So a 4000 by 3000 pixel phone photo holds 4000 · 3000 · 3 = 36 million numbers."
          },
          {
            "note": "Watch out for the dtype and the range. Pixels come either as integers from 0 to 255, or as decimals from 0 to 1. The image you read with Pillow in Lesson 4 had dtype `uint8`, meaning 8-bit integers with no minus sign: exactly the numbers from 0 to 255. Don't mix them: a model trained on 0 to 1 gets garbage if you feed it 0 to 255. Normalizing to the same range is your first concern. And don't do arithmetic directly in `uint8`: there 250 + 10 gives 4, because the result goes past 255 and wraps around to 0."
          },
          {
            "code": "img.shape       # (H, W, 3): height, width, 3 color channels\nimg = img / 255.0   # bring it from 0..255 to 0..1"
          },
          {
            "p": "`img` here is the NumPy array of a photo, like `a` in Lesson 4. H stands for height (the number of rows of pixels), and W for width (the number of columns). `img / 255.0` divides every pixel by 255, through broadcasting (Lesson 4), and gives an array of decimals, of type `float64`: 255 becomes 1.0, 51 becomes 0.2, and 0 stays 0.0."
          }
        ]
      },
      {
        "heading": "Convolution: filters that slide over the image",
        "blocks": [
          {
            "p": "A convolution filter is a small matrix (say 3x3) that you slide over the image. At each position, you multiply the filter with the patch of image under it and add up: each number in the filter times the pixel under it, then you add the 9 products. The sum becomes one pixel of the new image. The result is a new image that brings out a certain pattern: edges, blur, contrast."
          },
          {
            "p": "It's worth writing a few classic filters by hand once. Blur averages the neighbors (smooths): all 9 numbers of the filter are 1/9, so the result is the average of the 9 pixels under it. Sharpen accentuates differences: it has 5 in the middle, -1 above, below, left and right, and 0 in the corners. On a uniform area where every pixel is 10, it gives 5 · 10 - 4 · 10 = 10, so nothing changes, but next to an edge it darkens the dark side and brightens the bright side. Sobel detects edges, where intensity changes abruptly."
          },
          {
            "p": "Once you've written them, you understand exactly what a convolutional layer in a network does (Lesson 17): the same operation, only the filters are learned, not written by you. The 9 numbers in a filter are parameters, like the weights in Lesson 7."
          },
          {
            "code": "import numpy as np\n\nsobel_x = np.array([[-1, 0, 1],\n                    [-2, 0, 2],\n                    [-1, 0, 1]])\n# you slide sobel_x over the image to pull out the vertical edges\n\npatch = np.array([[0, 0, 9],\n                  [0, 0, 9],\n                  [0, 0, 9]])    # dark on the left, bright on the right\nprint((patch * sobel_x).sum())   # 36"
          },
          {
            "p": "`patch` is a 3x3 square cut from an image, with a vertical edge: pixels of 0 (black) on the left and 9 (bright) on the right. The numbers are small so you can check them with a pencil. `patch * sobel_x` multiplies position by position, as in Lesson 4, and `.sum()` adds everything up. By hand, row by row: -1 · 0 + 0 · 0 + 1 · 9 = 9, then -2 · 0 + 0 · 0 + 2 · 9 = 18, then 9 again, so 9 + 18 + 9 = 36."
          },
          {
            "p": "On a uniform patch where every pixel is 9, you'd get (-9 + 9) + (-18 + 18) + (-9 + 9) = 0. A big number means an edge, and 0 means a uniform area. Blur on the same patch gives the average: (0 + 0 + 9) · 3 / 9 = 3."
          },
          {
            "p": "To get the whole new image, you repeat the calculation at every position. The function below does that on a 4 by 6 pixel image, with 0 on the left and 9 on the right, and uses `np` and `sobel_x` from the block above."
          },
          {
            "code": "img = np.array([[0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9],\n                [0, 0, 0, 9, 9, 9]], dtype=float)\n\ndef convolve(img, kernel):\n    H, W = img.shape\n    out = np.zeros((H - 2, W - 2))\n    for i in range(H - 2):\n        for j in range(W - 2):\n            patch = img[i:i + 3, j:j + 3]        # the 3x3 window\n            out[i, j] = (patch * kernel).sum()   # multiply and add\n    return out\n\nblur = np.ones((3, 3)) / 9\nprint(convolve(img, blur))\n# [[0. 3. 6. 9.]\n#  [0. 3. 6. 9.]]\nprint(convolve(img, sobel_x))\n# [[ 0. 36. 36.  0.]\n#  [ 0. 36. 36.  0.]]"
          },
          {
            "p": "The function takes a grayscale image (a 2D array) and a 3x3 filter, and returns the filtered image. `img[i:i + 3, j:j + 3]` is the slice of 3 rows and 3 columns that starts at row i and column j. `dtype=float` makes the pixels decimals, so you avoid the `uint8` surprises, and `np.ones((3, 3)) / 9` is the blur filter."
          },
          {
            "p": "The result is 2 by 4 pixels, not 4 by 6, because the filter only fits in 2 positions vertically and 4 horizontally. In Lesson 17 you'll see how to keep the size with padding, a frame of zeros placed around the image. The blur turned the sudden jump from 0 to 9 into a smooth ramp: 0, 3, 6, 9. Sobel gives 36 only next to the edge and 0 on the uniform areas on both sides."
          }
        ]
      },
      {
        "heading": "Data augmentation",
        "blocks": [
          {
            "p": "When you have few images, the model memorizes (overfitting, from Lesson 1). Augmentation artificially grows the set by creating variants of the images: you flip them, rotate them, crop them, shift the colors a bit. The model sees the same label in slightly different forms and learns to generalize, not to memorize. If all your cat photos show the cat with its head on the left, the model can learn \"cat = head on the left\". After a flip, it also sees cats with the head on the right."
          },
          {
            "list": [
              "Horizontal flip: mirrors the image left to right.",
              "Random rotation and crop: change the position and the framing, for example you rotate by a few degrees or keep only a piece from a randomly chosen spot.",
              "Color jitter: slightly varies the brightness and color, like the same photo taken in the morning, in the evening or under neon light (jitter means a small shake).",
              "Cutout: covers a random patch with a black square, like a finger over the lens, forcing the model not to rely on a single detail."
            ]
          },
          {
            "p": "On an array, flips and rotations just move the numbers around. Here's what they do to a small 2 by 3 array:"
          },
          {
            "code": "import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\nprint(np.fliplr(a))   # mirror left to right\n# [[3 2 1]\n#  [6 5 4]]\nprint(np.rot90(a))    # rotate by 90°, counterclockwise\n# [[3 6]\n#  [2 5]\n#  [1 4]]"
          },
          {
            "p": "`np.fliplr` reverses the order of the columns. On an image with shape (H, W, 3) it does the same, so it mirrors the image and leaves the channels alone. `np.rot90` rotates by 90 degrees, and the shape (2, 3) becomes (3, 2): for an image, height and width swap places."
          },
          {
            "p": "In practice you don't write them by hand. torchvision, PyTorch's image library (you use it from Lesson 14 on), has them ready-made, random part included:"
          },
          {
            "code": "from PIL import Image\nfrom torchvision import transforms\n\naug = transforms.Compose([\n    transforms.Resize((64, 64)),              # every photo to 64x64\n    transforms.RandomHorizontalFlip(p=0.5),   # flip, with a 50% chance\n    transforms.RandomRotation(15),            # between -15 and 15 degrees\n    transforms.RandomCrop(56),                # a 56x56 piece\n    transforms.ColorJitter(brightness=0.2),   # brightness x0.8 ... x1.2\n    transforms.ToTensor(),                    # tensor (3, H, W), 0 ... 1\n    transforms.RandomErasing(p=0.5),          # cutout, with a 50% chance\n])\n\nimg = Image.open(\"cat.jpg\").convert(\"RGB\")\nx = aug(img)              # a different variant on every call\nprint(x.shape)            # torch.Size([3, 56, 56])"
          },
          {
            "p": "Here `img` is the photo opened with Pillow, as in Lesson 4, not an array. `Compose` chains the transforms: the photo goes through them one by one, top to bottom. The ones with Random in their name flip a coin on every call: `p=0.5` means they apply half the time, and the angle and the crop position are picked at random. `ColorJitter(brightness=0.2)` multiplies the brightness by a number picked at random between 0.8 and 1.2. That way, every time the model asks for the photo, it sees a different variant, and you don't save any copies to disk."
          },
          {
            "p": "`ToTensor` turns the Pillow photo into a PyTorch tensor with values from 0 to 1, but with the channels first: the shape is (3, H, W), not (H, W, 3) as in NumPy. `RandomErasing` is cutout, and it comes after `ToTensor` because it works on tensors."
          },
          {
            "p": "You apply augmentations only to the training data. On validation and test you leave the images as they are, so the score shows how well the model does on real photos."
          },
          {
            "note": "The golden rule of augmentation: it has to keep the label. A horizontal flip of a cat is still a cat, so it's valid. But for the digit 2 or the letter b, the flip changes the meaning, so it's NOT valid. In the same way, a 6 rotated by 180 degrees becomes a 9. Always ask whether the transform would change the correct answer."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Write a Sobel filter by hand and apply it to an image to pull out the edges."
      },
      {
        "title": "Test whether a set of augmentations improves the score on a small classification problem."
      },
      {
        "title": "Take a list of augmentations and decide for each whether it keeps the label on a digit problem."
      }
    ]
  },
  {
    "moduleCode": "S18",
    "duration": "~1 week",
    "intro": "This is where deep learning starts: machine learning with neural networks that have many layers. A neural network is a chain of layers, and training is adjusting the weights so the error goes down. The weights are the numbers the network learns, like the w's in linear regression (Lesson 7). The key to the module is understanding what backpropagation does, not just calling it: it's how the network works out which way to move each weight. Once you get how the gradient flows back through the network (the gradient is the slope of the error, explained below), the rest of deep learning becomes tuning, not mystery.",
    "sections": [
      {
        "heading": "From perceptron to network",
        "blocks": [
          {
            "p": "A small example: you want to guess whether a student passes a test from two input numbers: x₁ = 3 hours of studying and x₂ = 2 hours on the phone the night before. Each input has a weight that says how much it counts and in which direction: w₁ = 0.8 (studying helps), w₂ = -0.5 (the phone hurts). You also add a bias term, b = -1, the same as the intercept b in linear regression (Lesson 7); PyTorch calls it bias. The sum is z = 0.8 · 3 + (-0.5) · 2 + (-1) = 2.4 - 1 - 1 = 0.4."
          },
          {
            "p": "Then a rule decides: if z is greater than 0, the answer is 1 (pass), otherwise it's 0 (fail). Here z = 0.4, so 1. This rule is the simplest activation function: the function that takes the sum z and gives the output."
          },
          {
            "p": "That's what a perceptron, the basic brick, does: it takes the inputs, multiplies them by some weights, adds a bias term, and passes the result through an activation function. The weights and the bias are its parameters, the numbers it learns from examples."
          },
          {
            "formula": "output = f(w₁x₁ + w₂x₂ + b)",
            "explain": "f is the activation function. With more inputs, you add one w · x product for each, as in linear regression."
          },
          {
            "p": "On its own, it only learns linear boundaries, just like logistic regression. The boundary is where z = 0, here the line 0.8 · x₁ - 0.5 · x₂ - 1 = 0 in the plane with axes x₁ and x₂: the points (x₁, x₂) on one side of it get 1, the ones on the other side get 0. If the students who pass and the ones who fail can't be split by a single straight line, a perceptron can't cope."
          },
          {
            "p": "The fix is to connect several perceptrons. In a network, each one is called a neuron. A layer is a group of neurons that get the same inputs, each with its own weights, and the outputs of one layer become the inputs of the next one."
          },
          {
            "p": "The power shows up when you stack many layers of neurons one after another: an MLP (multilayer perceptron). Each layer transforms the output of the one before. With layers and non-linear activations between them, the network can learn relationships of any complexity. Without non-linearity, however many layers you stack collapse into a single one."
          },
          {
            "p": "The layers between the inputs and the output layer are called hidden layers, because their values don't show up anywhere in the data. A small MLP for the test example: 2 inputs, a hidden layer of 3 neurons, one output neuron. Each hidden neuron has 2 weights and a bias, and the output neuron has 3 weights (one per hidden neuron) and a bias. In total, 3 · 3 + 4 = 13 parameters."
          },
          {
            "p": "The collapse above is easy to see with numbers. Without an activation function, a neuron only multiplies and adds, so it's a linear function, like f(x) = ax + b in math class, whose graph is a straight line. Take two layers with one neuron each: the first computes 3x + 1, the second multiplies the result by 2. Together they give 2 · (3x + 1) = 6x + 2, still a straight line. A single neuron with weight 6 and bias 2 did exactly the same thing. However many linear layers you chain, the result stays a straight line."
          },
          {
            "p": "The activation function brings the non-linearity. ReLU (keep the positive, cut the negative to zero) is the most used, it's simple and trains fast. Sigmoid and tanh are still used, but ReLU is the default choice in the hidden layers."
          },
          {
            "formula": "ReLU(z) = max(0, z)",
            "explain": "Positives pass through unchanged, negatives become 0: ReLU(5) = 5, ReLU(0.4) = 0.4, ReLU(-2) = 0. The graph has a bend at 0, and out of many bends placed in different spots, one from each neuron, the network can build almost any shape."
          },
          {
            "p": "You know the sigmoid from Lesson 7: it squeezes any number between 0 and 1, with σ(0) = 0.5, σ(2) ≈ 0.88 and σ(-2) ≈ 0.12. Tanh has the same S shape, but it squeezes numbers between -1 and 1: tanh(0) = 0, tanh(2) ≈ 0.96, tanh(-2) ≈ -0.96."
          }
        ]
      },
      {
        "heading": "The cost function and the gradient",
        "blocks": [
          {
            "p": "Training needs a measure of the error: the cost function (loss), which you saw in Lesson 7. It's a number that says how wrong the model is, and lower is better. For regression, the squared error. For classification, cross-entropy, which punishes confident wrong answers hard. The goal is to find the weights that make the loss as small as possible."
          },
          {
            "p": "For regression the usual choice is MSE (mean squared error): for each example you subtract the real answer from the prediction, square the difference, then take the average. If the model predicts 3 and 5 and the real answers are 2 and 8, the differences are 1 and -3, the squares 1 and 9, and MSE = (1 + 9) / 2 = 5."
          },
          {
            "p": "For classification, the network gives a probability for each class, and they add up to 1 (it gets them with a function called softmax, which PyTorch's `nn.CrossEntropyLoss` applies for you). Cross-entropy only looks at the probability p given to the correct class."
          },
          {
            "formula": "loss = -log(p)",
            "explain": "p is the probability the model gave to the correct class. p = 0.9 gives a loss of 0.105, p = 0.5 gives 0.69, and p = 0.1 gives 2.3."
          },
          {
            "p": "Logarithms only come up in math in grade 10; here a few of their values are enough (it's the natural logarithm, Python's `math.log`): log(1) = 0, log(0.9) ≈ -0.105, log(0.5) ≈ -0.69, log(0.1) ≈ -2.3. The closer p gets to 0, the lower log(p) goes, and the minus in front makes the loss positive. A model that gives the correct class 0.9 pays 0.105. One that is confidently wrong, giving the correct class only 0.1, pays 2.3, almost 22 times more."
          },
          {
            "p": "How do you find the weights that make the loss small? Take the simplest case: a model with a single weight w and the loss L(w) = (w - 3)². The loss is at its minimum, 0, when w = 3, but the model doesn't know that. It starts from w = 0, where L = (0 - 3)² = 9."
          },
          {
            "p": "Move w up a little, to 0.1: L = (0.1 - 3)² = 8.41, so the loss went down by 0.59. Divide the change in the loss by how far w moved: -0.59 / 0.1 = -5.9. With an even smaller move, to w = 0.01, you get -5.99, closer and closer to -6. This number is the slope of the loss at w = 0: how much the loss changes for a tiny move of w, relative to the size of the move. The minus says the loss goes down when w goes up."
          },
          {
            "p": "That slope is the gradient. For L(w) = (w - 3)², the gradient has the formula 2 · (w - 3), which comes from derivatives (math, grade 11); here you just take it as given. At w = 0 it gives 2 · (0 - 3) = -6, exactly what you found above. When the loss depends on many weights, the gradient with respect to one of them is written ∂L/∂w and read \"the gradient of L with respect to w\": how much L changes when you nudge only w, holding the other weights still. The ∂ sign is a rounded d that signals exactly that, that you're looking at one weight out of many."
          },
          {
            "p": "The gradient of the loss with respect to each weight tells you which direction to move the weight to increase the loss; you go the opposite way. In the example, the gradient of -6 says the loss grows toward smaller w, so you move w up. The idea is called gradient descent: step by step, you go down the slope toward the minimum, the point where the loss is smallest."
          },
          {
            "formula": "w ← w - η · ∂L/∂w",
            "explain": "Each weight w moves a small step (learning rate η) in the direction opposite to the gradient ∂L/∂w. You repeat thousands of times. The arrow means \"gets the value\", like `w = w - eta * grad` in Python. η (the Greek letter eta) is a small number, for example 0.1; you already met the learning rate with boosting, in Lesson 9."
          },
          {
            "p": "Two steps by hand, with η = 0.1. Step 1: at w = 0 the gradient is -6, so w ← 0 - 0.1 · (-6) = 0.6, and the loss drops from 9 to (0.6 - 3)² = 5.76. Step 2: at w = 0.6 the gradient is 2 · (0.6 - 3) = -4.8, so w ← 0.6 - 0.1 · (-4.8) = 1.08, and the loss gets to 3.69. The steps shrink on their own, because the slope gets gentler as you get closer to the minimum."
          },
          {
            "code": "w = 0.0\neta = 0.1                    # learning rate\nfor step in range(1, 31):\n    grad = 2 * (w - 3)       # gradient of (w - 3) ** 2 at the point w\n    w = w - eta * grad       # one descent step\n    if step % 10 == 0:\n        print(step, round(w, 4))\n# prints:\n# 10 2.6779\n# 20 2.9654\n# 30 2.9963"
          },
          {
            "p": "The code repeats the step 30 times and prints w after every tenth step: the weight gets closer to 3, so the loss (w - 3)² gets closer to 0."
          }
        ]
      },
      {
        "heading": "Backpropagation: the chain rule",
        "blocks": [
          {
            "p": "A network is a chain of operations. To find the gradient of the loss with respect to a weight in the first layer, you apply the chain rule from calculus (also grade 11): you multiply the gradients step by step, from the output back toward the input. That's backpropagation, the backward propagation of the error."
          },
          {
            "p": "The idea of the chain rule: rates of change multiply. Take y = 3x + 1 and L = 2 · y. If x goes up by 0.1 (from 1 to 1.1), y goes up 3 times as much, by 0.3 (from 4 to 4.3). L goes up 2 times as much as y, by 0.6 (from 8 to 8.6). So L changes 3 · 2 = 6 times as fast as x, as in the example with the layers: 2 · (3x + 1) = 6x + 2."
          },
          {
            "p": "The same thing in a tiny network with a single weight: the input x = 2, the prediction p = w · x, the correct answer 8 and the loss L = (p - 8)². You start with w = 1, so p = 2 and L = 36. The chain has two links. The first is the gradient of L with respect to p: by the same formula as for (w - 3)², it's 2 · (p - 8) = 2 · (2 - 8) = -12. The second is how fast p changes when w changes: p = w · 2, so 2 times as fast. Multiply them: ∂L/∂w = -12 · 2 = -24. Check it with a small nudge: at w = 1.01, L drops to 35.76, that is by 0.24, 24 times the nudge of 0.01."
          },
          {
            "p": "Concretely: each operation in the network knows how to pass its gradient backward. You start from the loss, go back layer by layer, and at the end you have the gradient for every weight in the network, in a single pass. The product computed up to one layer gets reused for the layer before it, so you don't redo the chain from scratch for every weight. That's what makes training large networks efficient."
          },
          {
            "note": "Backpropagation computes the gradients. It does NOT update the weights. The update is done by the optimizer, in a separate step. The optimizer is the piece of code that applies the rule w ← w - η · ∂L/∂w, or a smarter variant of it (you'll see them in Lesson 15). This mix-up is common, remember they're two different things."
          }
        ]
      },
      {
        "heading": "PyTorch: what it looks like in code",
        "blocks": [
          {
            "p": "PyTorch is the neural network library mentioned in Lesson 1. You install it with `pip install torch`, inside the virtual environment."
          },
          {
            "p": "PyTorch works with tensors that keep track of their gradient automatically. A tensor (the grid of numbers from Lesson 13) looks a lot like a NumPy array from Lesson 4, with one difference: it remembers which operations produced it, so PyTorch can run backpropagation on its own."
          },
          {
            "code": "import torch\n\nw = torch.tensor(0.0, requires_grad=True)   # a weight, with a gradient\nL = (w - 3) ** 2          # the loss from the slope example\nL.backward()              # backpropagation: computes the gradient\nprint(w.grad)             # tensor(-6.)\n\nL = (w - 3) ** 2\nL.backward()              # once more, without clearing\nprint(w.grad)             # tensor(-12.): -6 was added on top of -6"
          },
          {
            "p": "`requires_grad=True` asks PyTorch to track everything computed from w. `L.backward()` runs backpropagation and puts the gradient in `w.grad`: -6 (printed as `tensor(-6.)`), as in the hand calculation. The second time, the new gradient was added on top of the old one: PyTorch doesn't clear gradients by itself, which is why the training loop calls `zero_grad()`."
          },
          {
            "p": "You define the network as an `nn.Module`: you write a class (Lesson 3) that inherits from `nn.Module`, PyTorch's base class for models. In `__init__` you create the layers, and in the `forward` method you write how the data flows through them. The basic layer is `nn.Linear(inputs, neurons)`, where every neuron is connected to all the inputs; it's also called a dense layer. For example, `nn.Linear(2, 3)` is the hidden layer from the test example: 3 neurons with 2 weights each, plus 3 biases."
          },
          {
            "p": "You wrap the data in a `Dataset` and a `DataLoader`. The Dataset holds the (input, correct answer) pairs and gives you any one of them by its number. The DataLoader takes the Dataset and hands it to you in batches: small groups of examples processed at once, for example 20 at a time. Why batches, and how big, is in Lesson 15."
          },
          {
            "p": "At each step, meaning for each batch, you do four things, always in the same order."
          },
          {
            "steps": [
              "Pass the data through the model and compute the loss (forward, the forward pass).",
              "`loss.backward()`: backpropagation computes the gradients.",
              "`optimizer.step()`: the optimizer updates the weights with the gradients.",
              "`optimizer.zero_grad()`: you clear the gradients, so they don't add up at the next step."
            ]
          },
          {
            "code": "for x, y in dataloader:\n    pred = model(x)                # forward\n    loss = criterion(pred, y)\n    loss.backward()                # compute the gradients\n    optimizer.step()               # update the weights\n    optimizer.zero_grad()          # clear for the next step"
          },
          {
            "p": "On each turn of the loop, `dataloader` gives you a batch: `x` holds the inputs, `y` the correct answers. `model(x)` calls `forward` and returns the predictions. `criterion` is the loss function (the criterion you judge the prediction by): `nn.MSELoss()` for numbers, `nn.CrossEntropyLoss()` for classes. You create the optimizer, for example, with `torch.optim.SGD(model.parameters(), lr=0.1)`: it gets the model's parameters and the learning rate, and `step()` applies the rule w ← w - η · ∂L/∂w to each parameter."
          }
        ]
      },
      {
        "heading": "A complete example you can run",
        "blocks": [
          {
            "p": "The code below puts all the pieces together and runs as it is. The network learns the relationship y = x², which isn't a straight line, from 200 made-up examples, with a hidden layer of 32 neurons and ReLU. The loss is MSE, because it predicts a number."
          },
          {
            "code": "import torch\nfrom torch import nn\nfrom torch.utils.data import TensorDataset, DataLoader\n\ntorch.manual_seed(0)          # the same random numbers on every run\n\n# made-up data: 200 values of x between -2 and 2, the target is x squared\nX_train = torch.linspace(-2, 2, 200).reshape(-1, 1)   # shape (200, 1)\ny_train = X_train ** 2\n\nclass Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.hidden = nn.Linear(1, 32)    # hidden layer: 32 neurons\n        self.output = nn.Linear(32, 1)    # one output neuron\n\n    def forward(self, x):\n        h = torch.relu(self.hidden(x))    # the ReLU activation\n        return self.output(h)\n\nmodel = Net()\ndata = TensorDataset(X_train, y_train)\ndataloader = DataLoader(data, batch_size=20, shuffle=True)\ncriterion = nn.MSELoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\nfor epoch in range(1, 101):       # 100 passes through all the data\n    total = 0\n    for x, y in dataloader:       # 10 batches of 20 examples\n        pred = model(x)\n        loss = criterion(pred, y)\n        loss.backward()\n        optimizer.step()\n        optimizer.zero_grad()\n        total += loss.item()\n    if epoch in [1, 10, 50, 100]:\n        print(epoch, round(total / len(dataloader), 4))\n\nx_new = torch.tensor([[1.5]])          # a new example, shape (1, 1)\nprint(round(model(x_new).item(), 3))   # the right answer: 1.5 ** 2 = 2.25\n# prints:\n# 1 0.9165\n# 10 0.0135\n# 50 0.0023\n# 100 0.0012\n# 2.272"
          },
          {
            "list": [
              "`torch.linspace(-2, 2, 200)` gives 200 evenly spaced numbers between -2 and 2, like `np.linspace` from Lesson 4, and `.reshape(-1, 1)` stacks them in a column: 200 rows, one feature each (-1 means \"however many rows it takes\").",
              "`super().__init__()` sets up the part inherited from `nn.Module`, like `super()` in Lesson 3.",
              "`TensorDataset` is a ready-made Dataset for data that already sits in tensors. `batch_size=20` gives 10 batches of 20, and `shuffle=True` shuffles the examples on every pass.",
              "The outer loop goes through all the data 100 times; one full pass is called an epoch (Lesson 15 explains it). Inside is the loop from above, unchanged.",
              "`loss.item()` pulls the number out of the tensor, and `total / len(dataloader)` is the average loss over the epoch's 10 batches.",
              "`torch.manual_seed(0)` fixes the starting weights and the shuffling order (like `random.seed` in Lesson 3), so you get the same numbers as in the comments."
            ]
          },
          {
            "p": "The average loss drops from 0.92 to 0.0012, and for x = 1.5 the network predicts 2.272, close to the right answer, 2.25. Try removing `torch.relu` from `forward`: the loss stays around 1.46, and the network gives about 1.46 for every x, a flat line. Without the activation, the two layers squashed into one, as with 2 · (3x + 1)."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Work out backpropagation by hand for a network with one hidden layer, on paper."
      },
      {
        "title": "Train an MLP on a small dataset in PyTorch and watch the loss go down."
      },
      {
        "title": "Deliberately remove zero_grad() and see how the training goes haywire."
      }
    ]
  },
  {
    "moduleCode": "S19",
    "duration": "~1 week",
    "intro": "A good model trained badly doesn't learn. This module is about the training loop from Lesson 14 (forward, backward, step, zero_grad): how you choose the optimizer, how you tune the learning rate (the most important knob), and how you keep overfitting under control. Overfitting means the model has learned the training examples by heart and gets new data wrong (Lesson 1). The same layers, trained carefully or carelessly, give completely different results.",
    "sections": [
      {
        "heading": "Epochs, batches, steps",
        "blocks": [
          {
            "p": "Three words to lock in. A batch is a small group of examples you process at once. An epoch is one full pass through the whole training set. A step is one weight update, meaning one batch processed. You usually train for many epochs, each with many steps."
          },
          {
            "p": "With numbers: you have 1,000 training examples and batches of 100 (the batch size, how many examples a batch holds, is 100). One epoch has 1,000 / 100 = 10 steps. If you train for 20 epochs, you take 20 · 10 = 200 steps: the weights get updated 200 times, and each example is seen 20 times. The complete example in Lesson 14 had 200 examples, batches of 20 and 100 epochs, so 10 steps per epoch and 1,000 in total."
          },
          {
            "p": "Why batches and not the whole set at once? Because it's faster and adds useful noise that helps the model not get stuck. Why not one example at a time? Because batches use the hardware better. A batch size between 32 and 256 is typical."
          },
          {
            "p": "Faster, because in one pass through the data the model corrects itself 10 times, not just once. The noise comes from the fact that the gradient computed on 100 examples is only an estimate of the one on all 1,000, a little different from one batch to the next. The steps don't head perfectly straight for the minimum, they zigzag a bit, and the zigzag can knock the model out of a small dip in the loss where it would otherwise get stuck."
          },
          {
            "p": "The hardware is the physical part of the computer. Networks are usually trained on the graphics card (GPU), which does thousands of multiplications in parallel, and with a single example most of it would sit idle. A batch of 64 examples is computed much faster than 64 examples taken one by one, just like vectorization in Lesson 4."
          }
        ]
      },
      {
        "heading": "Optimizers",
        "blocks": [
          {
            "p": "The optimizer decides how it uses the gradients to update the weights; it's what runs `optimizer.step()` in the Lesson 14 loop. SGD (stochastic gradient descent) with momentum is solid and reliable: momentum adds inertia, like a ball rolling, so it gets over small bumps."
          },
          {
            "p": "Plain SGD is exactly the rule from Lesson 14, w ← w - η · ∂L/∂w. Stochastic means \"with some randomness in it\": the gradient isn't computed on the whole set, but on a batch picked at random. With momentum, each step keeps part of the previous step, usually 90% (`momentum=0.9`). When the gradients keep pointing the same way, the steps get longer, and when they contradict each other from one batch to the next, they partly cancel out and the zigzag calms down."
          },
          {
            "p": "Adam and AdamW adapt on their own: they take bigger steps where needed and smaller ones where not. Concretely, Adam keeps track, for each weight, of how big its gradients usually are and divides by that size, so the weights with small gradients move forward too. They start more easily and need less tuning, which is why they're the default for many. AdamW handles weight decay more correctly. Start with Adam/AdamW if you're not sure."
          },
          {
            "p": "Weight decay pulls every weight a little toward 0 at each step, harder the bigger the weight is. You set it with a number, for example `weight_decay=0.01`. When you give Adam weight decay, it adds the shrinking to the gradient, and its adaptive steps distort it. AdamW applies it separately, directly on the weights, which is why it's more correct."
          },
          {
            "code": "import torch\nfrom torch import nn\n\nmodel = nn.Linear(10, 1)      # any model; here, a single layer\nsgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)\nadam = torch.optim.Adam(model.parameters(), lr=0.001)\nadamw = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)"
          },
          {
            "p": "In a real program you create just one, not all three. Each one gets `model.parameters()`, the weights it moves, and `lr`, the learning rate. The values in the code are common starting points."
          }
        ]
      },
      {
        "heading": "Learning rate, the most important knob",
        "blocks": [
          {
            "p": "The learning rate (η) is the step size at each update. It's the most important hyperparameter in all of deep learning (a hyperparameter is a setting you choose before training, Lesson 9). Too big: the loss jumps around chaotically or explodes, the model diverges. Too small: it learns painfully slowly or gets stuck before reaching anywhere good."
          },
          {
            "p": "Diverging means that instead of getting closer to the minimum, the model moves further and further away from it, and the loss grows from one step to the next. The code below goes back to the Lesson 14 example, L(w) = (w - 3)² starting from w = 0, and takes 20 steps with three learning rates."
          },
          {
            "code": "for eta in [1.1, 0.1, 0.001]:\n    w = 0.0\n    for step in range(20):\n        w = w - eta * 2 * (w - 3)       # the step from Lesson 14\n    print(eta, round((w - 3) ** 2, 4))  # the loss after 20 steps\n# prints:\n# 1.1 13227.9441\n# 0.1 0.0012\n# 0.001 8.3074"
          },
          {
            "p": "With 1.1, every step jumps over 3, further each time (w = 6.6, then -1.32, then 8.18), and after 20 steps the loss is over 13,000: it diverged. With 0.1 it gets to 0.0012. With 0.001 it barely moved, from 9 to 8.31."
          },
          {
            "p": "Don't guess it, search for it. Try values on a logarithmic scale (for example 0.1, 0.01, 0.001) and look at the loss curve. You want the largest learning rate where the loss still drops smoothly, not chaotically."
          },
          {
            "p": "On a logarithmic scale, each value is 10 times smaller than the one before. That way a few tries cover the whole useful range, from 1 down to 0.00001, while between 0.1 and 0.09 you'd barely feel a difference. The loss curve is the graph with the loss on the vertical axis and the steps or epochs on the horizontal one. It's not the learning curve from Lesson 8, where the horizontal axis was the amount of data. With a good learning rate, the curve drops fast at first, then more and more slowly, and levels off. With one that's too big, it jumps up and down or climbs. With one that's too small, it goes down almost flat."
          },
          {
            "p": "Schedulers change the learning rate during training. A recipe that often works: a short warmup at the start (you raise the rate gradually, so you don't destabilize it), followed by a smooth decay (cosine) toward the end, to settle finely into the minimum."
          },
          {
            "p": "Warmup: at the start the weights are random, and the first gradients can be big and chaotic. So you begin with a small step and raise it gradually, for example from 0.01 to 0.1 over the first 10 steps. Cosine: after the warmup, the learning rate goes smoothly down toward 0 following the shape of the cosine function from trigonometry, slowly at first, faster around the middle and slowly again at the end. The small steps at the end no longer jump over the minimum, they settle into it."
          },
          {
            "code": "import torch\nfrom torch import nn\nfrom torch.optim import lr_scheduler\n\nmodel = nn.Linear(10, 1)\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\n# first 10 steps: warmup, lr climbs from 0.01 to 0.1\nwarmup = lr_scheduler.LinearLR(optimizer, start_factor=0.1, total_iters=10)\n# next 90 steps: cosine, lr goes smoothly down toward 0\ncosine = lr_scheduler.CosineAnnealingLR(optimizer, T_max=90)\nscheduler = lr_scheduler.SequentialLR(optimizer, [warmup, cosine],\n                                      milestones=[10])\n\nfor step in range(100):\n    lr = scheduler.get_last_lr()[0]    # the lr used at this step\n    if step in [0, 5, 10, 55, 99]:\n        print(step, round(lr, 4))\n    # ... forward, loss.backward() ...\n    optimizer.step()\n    optimizer.zero_grad()\n    scheduler.step()                   # sets up the lr for the next step\n# prints:\n# 0 0.01\n# 5 0.055\n# 10 0.1\n# 55 0.05\n# 99 0.0"
          },
          {
            "p": "`LinearLR` does the warmup: it multiplies the lr by a factor that climbs from 0.1 to 1 over 10 steps. `CosineAnnealingLR` does the decay, over `T_max=90` steps. `SequentialLR` chains them: the first one until step 10 (`milestones=[10]`), then the second. `get_last_lr()` gives a list with the current lr, and `[0]` takes its first element. You call `scheduler.step()` once per step, after `optimizer.step()`. At step 99 the lr is 0.00003, which is why it shows up rounded to 0.0."
          },
          {
            "note": "If training goes haywire or the loss becomes NaN, the first thing you try is lowering the learning rate. Most of the time that's the cause. NaN (not a number) is the result of a calculation that makes no sense. It shows up, for example, when the weights grow so much that they pass the largest number the computer can hold and become infinity, and the program ends up computing infinity minus infinity. Once it appears, it spreads: any calculation with NaN gives NaN, so the loss stays `nan` until the end."
          }
        ]
      },
      {
        "heading": "Regularization: keeping overfitting in check",
        "blocks": [
          {
            "p": "Regularization is any technique that stops the model from memorizing the training set. Without it, a big network learns the examples by heart and falls apart on new data. You have several tools, often used together:"
          },
          {
            "list": [
              "Dropout: during training, it randomly switches off part of the neurons at each step. It forces the network not to rely on a single path, so it generalizes better, meaning it also works well on data it hasn't seen.",
              "Weight decay: penalizes large weights, keeping them small and the model simple. It's the shrinking toward 0 from the optimizers: with small weights, the prediction can't jump sharply for a small change in the input, so the model can't chase every detail of a single example.",
              "Batch normalization: normalizes the activations in each batch, stabilizes and speeds up training. The activations are the outputs of the neurons after the activation function, the numbers that pass from one layer to the next.",
              "Early stopping: you stop when the validation score starts getting worse, even if the training one is still dropping. You saw it with boosting, in Lesson 9."
            ]
          },
          {
            "p": "Dropout with p = 0.5 means that, at each step, every neuron outputs 0 with a 50% chance, so on average half of them go quiet, a different half each time. At prediction time all the neurons are used, and `model.eval()` is the command that switches the model into that mode. The code below applies dropout to 8 activations equal to 1."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\ndrop = nn.Dropout(p=0.5)\nx = torch.ones(8)          # 8 activations, all equal to 1\n\ndrop.train()               # training mode\nprint(drop(x))             # tensor([0., 0., 2., 0., 0., 0., 2., 2.])\nprint(drop(x))             # tensor([0., 2., 2., 2., 2., 0., 2., 2.])\ndrop.eval()                # prediction mode\nprint(drop(x))             # tensor([1., 1., 1., 1., 1., 1., 1., 1.])"
          },
          {
            "p": "At the first step 3 activations out of 8 survived, at the second 6 out of 8: half is only an average. The survivors get multiplied by 2, that is 1 / (1 - 0.5), so the sum stays the same on average as at prediction time, when nothing is switched off. On a whole model, `model.train()` and `model.eval()` switch the mode of all its layers."
          },
          {
            "p": "Batch norm applies the standardization from Lesson 5 to each batch: it subtracts the batch's mean and divides by its standard deviation. If a neuron outputs 2, 4 and 6 on the 3 examples of a batch, after batch norm it outputs -1.22, 0 and 1.22, with mean 0 and standard deviation 1. Then the layer learns, for each neuron, two numbers it can use to stretch and shift the result. At prediction time, after `model.eval()`, it uses the mean and standard deviation gathered during training, not those of the current batch. In a network, the two layers sit like this:"
          },
          {
            "code": "import torch\nfrom torch import nn\n\nmodel = nn.Sequential(\n    nn.Linear(20, 64),\n    nn.BatchNorm1d(64),   # normalizes the 64 activations over each batch\n    nn.ReLU(),\n    nn.Dropout(p=0.5),    # during training, half of them become 0 on average\n    nn.Linear(64, 2),\n)"
          },
          {
            "p": "`nn.Sequential` is a ready-made `nn.Module`: it passes the data through the layers in the order you write them, without you writing `forward`."
          },
          {
            "p": "Early stopping with patience: the validation loss bounces around a little from one epoch to the next, so you don't stop at the first time it gets worse. You wait a number of epochs called the patience and stop only if no better validation loss showed up in all that time. With a patience of 3 and the validation loss going 0.50, 0.42, 0.38, 0.39, 0.37, 0.40, 0.41, 0.43, the best is 0.37, at epoch 5. Then come 3 epochs with nothing better, so you stop after epoch 8 and keep the weights from epoch 5. The sketch below does this in code, with a patience of 5."
          },
          {
            "code": "def evaluate(model):\n    model.eval()                # dropout off, batch norm in prediction mode\n    with torch.no_grad():       # you only measure, no gradients\n        return criterion(model(X_val), y_val).item()\n\nbest = float(\"inf\")             # bigger than any loss\npatience = 5                    # how many epochs you wait with no progress\nno_progress = 0\nfor epoch in range(1, 201):\n    train_one_epoch(model)      # the Lesson 14 loop, once through the data\n    val_loss = evaluate(model)\n    if val_loss < best:\n        best = val_loss\n        torch.save(model.state_dict(), \"best.pt\")\n        no_progress = 0\n    else:\n        no_progress += 1\n        if no_progress == patience:\n            break               # 5 epochs in a row with no progress: stop\n\nmodel.load_state_dict(torch.load(\"best.pt\"))"
          },
          {
            "p": "You write `train_one_epoch` yourself: it's the Lesson 14 loop, put in a function that starts with `model.train()`. `evaluate` measures the loss on the validation data (`X_val`, `y_val`). `with torch.no_grad():` tells PyTorch to stop tracking the operations for gradients, since here you only measure. `float(\"inf\")` is infinity, bigger than any loss, so the first epoch is sure to come out as the best so far. `model.state_dict()` is the dictionary with all the model's weights: `torch.save` writes it to a file, and at the end `load_state_dict` puts back the weights from the best epoch."
          },
          {
            "p": "Weight initialization matters more than it seems at first. Initialization means the values the weights start with, before the first step: PyTorch picks them at random and small, which is why `torch.manual_seed` makes the results repeatable. Weights started badly can block training from the start. If all the weights of a layer started from the same value, all its neurons would compute the same thing and get the same gradient, so they'd stay copies of each other: 64 neurons acting like one. Luckily, PyTorch layers have good default initializations, so you rarely need to step in, but it's worth knowing it's a factor."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Test three learning rates on a logarithmic scale and draw the loss curves."
      },
      {
        "title": "Add dropout and early stopping to a network and see the effect on validation."
      },
      {
        "title": "Compare SGD with momentum and Adam on the same small problem."
      }
    ]
  },
  {
    "moduleCode": "S20",
    "duration": "~1 week",
    "intro": "Sooner or later, a network refuses to learn: the loss stays put, or the score is at guessing level, meaning what you'd get without looking at the data, for example by always answering the most frequent class, like the baseline from Lesson 6. Panicking and changing things at random doesn't help. You have a checklist, in order, from simple to complex. Most of the time the problem is trivial and it's near the top of the list.",
    "sections": [
      {
        "heading": "The test that solves half the cases",
        "blocks": [
          {
            "p": "Before anything, check whether the model can overfit 10 examples, meaning whether it can learn them by heart (Lesson 1). You take ten examples, turn off all regularization (no dropout, no weight decay, Lesson 15), and train until it should memorize them perfectly. If the loss gets close to zero, the learning machinery works and the problem is elsewhere (data, too aggressive regularization)."
          },
          {
            "p": "The test makes sense because memorizing is the easiest thing you can ask of a network. Even a small network has hundreds of weights, and 10 examples are nothing to it. If the data reaches the model correctly, the loss is computed correctly, the gradients flow back and the optimizer moves the weights, the loss has to come down close to 0. On 10 examples, the test takes a few seconds."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\nX = torch.randn(10, 5)              # 10 examples, 5 made-up features\ny = torch.randint(0, 2, (10,))      # 10 random labels: 0 or 1\n\nmodel = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))\ncriterion = nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.01)\n\nfor step in range(1, 301):\n    loss = criterion(model(X), y)   # all 10 examples, at every step\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n    if step in [1, 100, 200, 300]:\n        print(step, round(loss.item(), 4))\n\nprint(model(X).argmax(dim=1))       # the class picked for each example\nprint(y)                            # the true labels\n# prints:\n# 1 0.6561\n# 100 0.0047\n# 200 0.0012\n# 300 0.0006\n# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])\n# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])"
          },
          {
            "p": "`torch.randn(10, 5)` gives 10 rows of 5 random numbers around 0. `torch.randint(0, 2, (10,))` gives 10 whole numbers from 0 up to 2, without 2 (as with `range`), so 0 or 1. The labels are random, so there's no rule to learn: the network can only memorize them, which is exactly what you're checking. All 10 examples go in at every step, with no DataLoader. For each example, the network gives two numbers, one score per class, and `nn.CrossEntropyLoss` turns them into probabilities (Lesson 14)."
          },
          {
            "p": "The loss starts at 0.66, close to -log(0.5) = 0.69, what you get by giving each class 50%, and gets down to 0.0006. `argmax(dim=1)` picks, for each row, the class with the higher score, and the predictions come out identical to the labels. On your own data, you run the test with your model and the first 10 rows, `X_train[:10]` and `y_train[:10]`."
          },
          {
            "note": "If the model can't reach a near-zero loss even on ten examples, you have a BUG, not a capacity or data problem. Capacity is how much a model can learn, and it grows with the number of weights; for 10 examples, almost any network has enough. There's no point training longer or making the network bigger. Something is broken in the code, the data or the wiring (the way the layers are connected to each other)."
          }
        ]
      },
      {
        "heading": "The checklist, in order",
        "blocks": [
          {
            "p": "If the overfit-on-10-examples test fails, go through this list, top to bottom. These are the most common causes, roughly ordered by how often they show up."
          },
          {
            "steps": [
              "Learning rate: too big (chaotic loss or NaN, the result of a calculation that got out of hand, Lesson 15) or too small (nothing moves). Try another value first, 10 times smaller or bigger.",
              "Data normalization: are the inputs scaled? A network struggles with data on huge or inconsistent ranges. Standardize the columns (mean 0, standard deviation 1, Lesson 5) and bring pixels to 0..1 (Lesson 13).",
              "Labels: are they aligned correctly with the inputs? Did you shuffle the order? Do you have the right loss function for the type of problem? Row i of X has to have its label on row i of y, and if you shuffle only X, the pairs break. For classes you use `nn.CrossEntropyLoss`, for numbers `nn.MSELoss`.",
              "zero_grad: are you calling optimizer.zero_grad() at each step? Without it, the gradients add up and training goes haywire. In Lesson 14 you saw the gradient -6 turn into -12.",
              "Initialization and gradients: check whether the gradients explode (become huge) or vanish (become zero). Batch norm and good initialization help."
            ]
          },
          {
            "p": "Gradients explode or vanish because of the chain rule from Lesson 14: backpropagation multiplies the gradient by one factor per layer. If the factors are around 0.5, after 20 layers the gradient is multiplied by 0.5 to the power of 20, about 0.000001, and the first layers barely learn anything. If they're around 2, it's multiplied by 2 to the power of 20, about a million, and the steps throw the weights far off, all the way to NaN. To check, after `loss.backward()` you look at the size of the gradients, layer by layer:"
          },
          {
            "code": "torch.manual_seed(0)                # the same network as above, untrained\nX = torch.randn(10, 5)\ny = torch.randint(0, 2, (10,))\nmodel = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))\n\nloss = criterion(model(X), y)\nloss.backward()                     # computes the gradients, takes no step\nfor name, p in model.named_parameters():\n    print(name, round(p.grad.abs().mean().item(), 4))\n# prints:\n# 0.weight 0.0087\n# 0.bias 0.0119\n# 2.weight 0.0539\n# 2.bias 0.207"
          },
          {
            "p": "`named_parameters()` gives (name, tensor) pairs: `0.weight` are the weights of the layer at position 0 in `nn.Sequential`, and `2.bias` the biases of the layer at position 2. `.abs()` takes the absolute value (drops the sign), and `.mean()` takes the average. Values like 0.01 or 0.2 are normal. 0.0 in the first layers means vanishing gradients, and thousands or millions mean exploding gradients."
          }
        ]
      },
      {
        "heading": "How to read the loss curve",
        "blocks": [
          {
            "p": "The loss curve is the main diagnostic tool. Look at it, not just the final score. Each shape tells you something different."
          },
          {
            "p": "The curve has the loss on the vertical axis and the epochs on the horizontal one (Lesson 15), usually with two lines: one for training, one for validation. A healthy curve, on a classification with two classes, looks roughly like this from one epoch to the next: 0.69, 0.45, 0.31, 0.24, 0.21, 0.20. It drops fast at first, then more and more slowly, and levels off, with validation a little above training."
          },
          {
            "list": [
              "Flat loss from the start: learning doesn't kick off. Most often the learning rate or the data. For example 0.693, 0.693, 0.692, 0.693, which is exactly -log(0.5): the model gives each class 50% and doesn't budge.",
              "Loss that explodes or becomes NaN: learning rate too big or exploding gradients. For example 0.69, 0.81, 3.5, 140, then nan.",
              "Training loss drops, validation loss rises: overfitting, add regularization. For example, training 0.60, 0.40, 0.25, 0.12, 0.05 and validation 0.62, 0.48, 0.45, 0.50, 0.61: the right moment is the validation minimum, epoch 3, where early stopping would stop you.",
              "Noisy but decreasing loss: probably normal, maybe a batch size that's too small. For example 0.90, 0.75, 0.82, 0.61, 0.66, 0.50: it goes up and down from one epoch to the next, but the trend is down, and small batches give noisier gradients (Lesson 15)."
            ]
          },
          {
            "p": "The code below produces the third shape with real numbers: only 10 training examples and a network far too big for them."
          },
          {
            "code": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\nX = torch.randn(110, 1)\nY = X + 0.5 * torch.randn(110, 1)        # a straight line, plus noise\nX_train, y_train = X[:10], Y[:10]         # only 10 training examples\nX_val, y_val = X[10:], Y[10:]             # 100 validation examples\n\nmodel = nn.Sequential(nn.Linear(1, 128), nn.ReLU(),\n                      nn.Linear(128, 128), nn.ReLU(),\n                      nn.Linear(128, 1))  # far too big for 10 examples\ncriterion = nn.MSELoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.01)\n\nfor epoch in range(1, 401):\n    model.train()\n    loss = criterion(model(X_train), y_train)\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()\n    model.eval()\n    with torch.no_grad():                 # validation is only measured\n        val_loss = criterion(model(X_val), y_val).item()\n    if epoch in [1, 25, 100, 200, 400]:\n        print(epoch, round(loss.item(), 3), round(val_loss, 3))\n# prints (epoch, training, validation):\n# 1 0.749 0.628\n# 25 0.082 0.203\n# 100 0.059 1.142\n# 200 0.048 3.949\n# 400 0.025 5.119"
          },
          {
            "p": "At each epoch, the model takes one step on the 10 examples, then `model.eval()` and `torch.no_grad()` (Lesson 15) measure the validation loss without changing anything. Training goes down to 0.025, but validation gets to about 0.2 in the first epochs, then climbs to 5.1: the network learned the 10 points by heart, noise included. To draw the curves, at each epoch you add the two values to two lists and pass them to `plt.plot` (Lesson 4)."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Take a network that won't learn and find the cause by going through the list, one step at a time."
      },
      {
        "title": "Reproduce overfitting on 10 examples as a sanity check before the real training."
      },
      {
        "title": "Draw a few loss curves (good and bad) and learn to recognize them by shape."
      }
    ]
  },
  {
    "moduleCode": "S21",
    "duration": "~1 week",
    "intro": "CNNs (convolutional networks) are the tools for images. Instead of connecting every pixel to every neuron, which would be enormous, they use small filters that slide over the image. That's how they learn local features (small patterns in one area of the image: edges, corners, then shapes) efficiently and with few weights. You saw convolution by hand in Lesson 13, with filters you wrote yourself; here the network learns its own filters.",
    "sections": [
      {
        "heading": "Why not a plain MLP on images",
        "blocks": [
          {
            "p": "An MLP (the network from Lesson 14, where every neuron is connected to all the inputs) would take the image as one long row of numbers. A 224x224 color image has 224 · 224 · 3 = 150,528 numbers (three channels per pixel, Lesson 13). A neuron connected to all of them has 150,528 weights, and a first layer of 1,000 neurons has about 150 million. Too many: a huge, slow model that overfits immediately (it memorizes the training images and gets new ones wrong, Lesson 1)."
          },
          {
            "p": "On top of that, an MLP treats each pixel independently and loses the fact that neighboring pixels form structures. The image goes in flattened into a single row, as after `flatten()` in Lesson 4, so the network doesn't know which pixels were neighbors. If you shuffled the order of the pixels the same way in every image, an MLP would learn just as well, even though you couldn't recognize anything in the pictures anymore."
          },
          {
            "p": "CNNs exploit two ideas. Locality: the useful features (an edge) are local, so a small filter is enough. To tell whether there's an edge at some point, the 3x3 square around it is all you need. Weight sharing: the same filter slides over the whole image, so an edge is recognized wherever it appears, with the same weights. The Sobel filter from Lesson 13 works the same way: the same 9 numbers find the edges across the whole image."
          },
          {
            "p": "In numbers: a 3x3 filter on a color image covers 3 · 3 · 3 = 27 numbers (3x3 pixels, 3 channels each), so it has 27 weights plus a bias term, like the perceptron in Lesson 14. That's it, however big the image is, 32x32 or 224x224. A layer with 64 filters has 64 · 28 = 1,792 parameters (the numbers it learns), against the 150 million above. Few weights, a lot of power."
          }
        ]
      },
      {
        "heading": "The convolutional layer: kernel, stride, padding",
        "blocks": [
          {
            "p": "A convolutional layer applies several learned filters over the input, each producing a feature map that highlights a certain pattern. A feature map is the grid of numbers that comes out of a single filter: one number for each position of the filter, large where the pattern shows up. The edge image that the Sobel filter from Lesson 13 gives you is a feature map. Mind the word: here a feature is a pattern in the image, not a column in a table as in the lessons on tabular data."
          },
          {
            "p": "A layer with 16 filters outputs 16 maps, stacked on top of each other like channels: 3 color channels go in, 16 come out. Each filter goes through all the input channels at once, which is why a 3x3 filter on a color image has 3 · 3 · 3 weights. The numbers in the filters are weights like any others: they start out random and get adjusted by gradient descent (Lesson 14)."
          },
          {
            "p": "Three settings define how the filter slides."
          },
          {
            "list": [
              "Kernel: the size of the filter (usually 3x3). How big the sliding window is. On a row of 5 pixels, a window of 3 can start at pixel 1, 2 or 3, so the output has 3 numbers.",
              "Stride: how far the filter jumps at each step. Stride 2 jumps two at a time, shrinking the output. On a row of 7 pixels, with kernel 3 and stride 2, the window starts at pixels 1, 3 and 5, so the output has 3 numbers instead of 5.",
              "Padding: how much you pad the edges with zeros, so the output doesn't shrink too fast and the corners count. Padding 1 adds a border of zeros one pixel wide: the row of 5 becomes 7, and kernel 3 gives 5 numbers again."
            ]
          },
          {
            "p": "You need to know how to compute the output size, otherwise you can't wire the layers together correctly. For example, the `nn.Linear` layer at the end of the network (Lesson 14) has to know how many numbers it receives, and if you get it wrong, PyTorch stops with a shape error. It's a simple formula you apply for each layer."
          },
          {
            "formula": "output = (input - kernel + 2·padding) / stride + 1",
            "explain": "For an input of 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. The size is kept."
          },
          {
            "p": "Input and output are the width (or the height) in pixels; for a square image, both give the same result. With stride 2, the division may not come out even. For input 32, kernel 3, padding 1 and stride 2: (32 - 3 + 2) / 2 + 1 = 31 / 2 + 1 = 15.5 + 1. The division is rounded down, to 15, because the filter can't start at half a pixel. The output has 15 + 1 = 16 pixels, so stride 2 halved the image. PyTorch rounds the same way."
          }
        ]
      },
      {
        "heading": "Pooling and the receptive field",
        "blocks": [
          {
            "p": "Pooling shrinks the feature map, taking for example the maximum of each 2x2 window (max pooling). In the code below, a 4x4 map becomes 2x2. PyTorch works with batches of images (Lesson 15) shaped (N, C, H, W): the number of images, the channels, the height and the width. The channels come first, not last as in Lesson 13, which is why the 4x4 grid gets the shape (1, 1, 4, 4)."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\nx = torch.tensor([[1, 3, 2, 0],\n                  [4, 2, 1, 1],\n                  [0, 1, 5, 6],\n                  [2, 0, 7, 3]])\nx = x.reshape(1, 1, 4, 4)    # 1 image, 1 channel, 4x4\npool = nn.MaxPool2d(2)       # 2x2 windows, jumping 2 at a time\nprint(pool(x).reshape(2, 2))\n# tensor([[4, 2],\n#         [2, 7]])"
          },
          {
            "p": "The 2x2 window jumps two at a time, so the 16 numbers split into four squares, and only the largest number of each square stays. From the top-left square (1, 3, 4, 2) you keep 4, and from the bottom-right one (5, 6, 7, 3) you keep 7. Pooling has no weights to learn. It keeps how clearly the pattern showed up in each area and forgets its exact position."
          },
          {
            "p": "It reduces the size, so the computation, and grows the receptive field: how much of the original image a neuron sees. Here a neuron is one number in a feature map, and it depends only on a patch of the image. After one 3x3 convolution, each number sees 3x3 pixels. After a second convolution, a 3x3 window combines 3x3 numbers from the first map, which together cover 5x5 pixels (three windows of 3 pixels, each shifted by one, cover 5). After the third convolution, the receptive field is 7x7."
          },
          {
            "p": "After a 2x2 pooling, one step on the map means 2 pixels in the image, so the convolutions after it widen the receptive field twice as fast. The upper layers (the last ones, furthest from the image), with a large receptive field, see whole shapes, while the first ones only see edges."
          },
          {
            "p": "At the end of a CNN there are usually a few dense (fully connected) layers: layers where every neuron is connected to all the input numbers, as in the MLP from Lesson 14, which means `nn.Linear` in PyTorch. Global average pooling is a clean alternative to the dense layers at the end: it averages each feature map into a single number. It has fewer weights and overfits less than large dense layers."
          },
          {
            "p": "An example with numbers. VGG, a classic network from the next section, flattens its final 512 maps of 7x7 into a row of 512 · 7 · 7 = 25,088 numbers. It connects them to a dense layer of 4,096 neurons: over 102 million weights in that one place. With global average pooling you're left with 512 numbers, one per map, and a dense layer from them to 10 classes has 512 · 10 + 10 = 5,130 parameters."
          }
        ]
      },
      {
        "heading": "Classic architectures and ResNet",
        "blocks": [
          {
            "p": "The classic pattern of a CNN: you alternate convolutional and pooling layers, which extract more and more abstract features, then at the end a classification head that gives the class. More abstract means that the first layers find edges, the next ones corners and textures, and the last ones parts of objects, like an eye or a wheel. The classification head is the last layer (or the last few): it takes the features and gives one score per class, and the class with the highest score is the prediction."
          },
          {
            "p": "The code below builds a small CNN for 32x32 color images with 10 classes and prints the shape of the data after each layer."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\ntorch.manual_seed(0)\nmodel = nn.Sequential(\n    nn.Conv2d(3, 16, kernel_size=3, padding=1),    # 16 filters, 3x3\n    nn.ReLU(),\n    nn.MaxPool2d(2),                               # 32x32 -> 16x16\n    nn.Conv2d(16, 32, kernel_size=3, padding=1),   # 32 filters, 3x3\n    nn.ReLU(),\n    nn.MaxPool2d(2),                               # 16x16 -> 8x8\n    nn.AdaptiveAvgPool2d(1),                       # global average pooling\n    nn.Flatten(),\n    nn.Linear(32, 10),                             # the head: 10 classes\n)\n\nx = torch.randn(8, 3, 32, 32)   # a batch of 8 color images, 32x32\nfor layer in model:\n    x = layer(x)\n    print(type(layer).__name__, tuple(x.shape))\n# Conv2d (8, 16, 32, 32)\n# ReLU (8, 16, 32, 32)\n# MaxPool2d (8, 16, 16, 16)\n# Conv2d (8, 32, 16, 16)\n# ReLU (8, 32, 16, 16)\n# MaxPool2d (8, 32, 8, 8)\n# AdaptiveAvgPool2d (8, 32, 1, 1)\n# Flatten (8, 32)\n# Linear (8, 10)"
          },
          {
            "p": "`nn.Sequential` chains the layers: the output of one goes into the next, and the `for` loop takes them one at a time. `nn.Conv2d(3, 16, kernel_size=3, padding=1)` takes 3 channels and has 16 filters, so it outputs 16 maps, and padding 1 keeps the size. ReLU (it cuts negatives to zero, Lesson 14) doesn't change the shape. `nn.MaxPool2d(2)` is max pooling with 2x2 windows, and `nn.AdaptiveAvgPool2d(1)` is global average pooling: it leaves a single number from each map. `nn.Flatten()` turns the shape (8, 32, 1, 1) into (8, 32), one row per image. `nn.Linear(32, 10)` is the head: 10 scores per image. `type(layer).__name__` just gives the layer's name, so you know which line is which."
          },
          {
            "p": "What comes out: after each layer you see the shape (images, channels, height, width). Convolutions change the number of channels, pooling halves the height and the width, and at the end 10 numbers per image are left. The whole model has only 5,418 parameters. You train it with the exact loop from Lesson 14, with `nn.CrossEntropyLoss()` as the loss, since it's a classification problem."
          },
          {
            "p": "LeNet (digits) and VGG (stacks of 3x3 convolutions) are the historical starting points. LeNet (1998) read handwritten digits from 32x32 black-and-white images. VGG (2014) has 16 or 19 layers with weights and uses only 3x3 convolutions, one after another."
          },
          {
            "p": "The problem with very deep networks: the gradient vanishes on the way back through many layers, and the network stops learning. In backpropagation (Lesson 14), the gradient for the first layers comes from multiplying one factor for each layer it passes through. If the factors are below 1, say 0.5, after 20 layers you're left with 0.5 to the power of 20, about 0.000001. The first layers barely move anymore: these are the vanishing gradients from the checklist in Lesson 16."
          },
          {
            "p": "ResNet (2015) solved this with residual connections: a shortcut that skips a few layers and adds the input to the output. If x is the input of a block and F(x) is what the layers inside it compute (say, two convolutions), the block outputs y = F(x) + x. It keeps the input as it is and adds a learned correction to it. If the layers have nothing useful to add, it's enough for F(x) to be close to 0, and the input passes through unchanged."
          },
          {
            "p": "The gradient can flow straight through the shortcut, so networks of tens or hundreds of layers become trainable. On the way back, the \"+ x\" branch passes the gradient on multiplied by 1, so it reaches the first layers whole. Most modern image models start from here."
          },
          {
            "p": "A residual block in PyTorch looks like this. To add F(x) and x, the two need the same shape, which is why the convolutions in the block keep the number of channels and the size (padding 1)."
          },
          {
            "code": "class ResidualBlock(nn.Module):\n    def __init__(self, channels):\n        super().__init__()\n        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)\n        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)\n\n    def forward(self, x):\n        f = self.conv2(torch.relu(self.conv1(x)))   # F(x)\n        return torch.relu(f + x)                    # F(x) + x\n\nblock = ResidualBlock(16)\ny = block(torch.randn(8, 16, 32, 32))\nprint(y.shape)   # torch.Size([8, 16, 32, 32]), same shape as the input"
          },
          {
            "p": "`torch.relu` is ReLU used as a function. The only difference from a plain network is the `f + x` in `forward`: without the \"+ x\", it would be two ordinary convolutions in a row."
          },
          {
            "note": "The residual connection is the idea to remember from this module. Without it, very deep networks don't learn. With it, depth becomes an advantage, not a bottleneck."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Compute the output sizes for a small convolutional network on paper, layer by layer."
      },
      {
        "title": "Train a simple convolutional network on a small image dataset."
      },
      {
        "title": "Add a residual connection to a network and compare training with and without it."
      }
    ]
  },
  {
    "moduleCode": "S22",
    "duration": "~1 week",
    "intro": "You rarely train an image network from scratch. You take a pretrained model, one that someone else has already trained on a huge number of images, and adapt it to your problem. Usually that's ImageNet: about 1.2 million photos labeled in 1,000 classes, from dog breeds to fruits and tools. With little data, that's the difference between a good score and a miserable one. The model has already learned to see edges, textures and shapes; you just reorient it toward your classes.",
    "sections": [
      {
        "heading": "Why transfer works",
        "blocks": [
          {
            "p": "A CNN trained on many images learns general features in the lower layers (the first ones, closest to the image): edges, corners, textures. These are useful for almost any image problem, including one the model has never seen. The upper layers (the last ones, close to the output) learn specific features (shapes of dogs, of cars). The transfer idea: you keep the general part and rewrite only the specific part."
          },
          {
            "p": "Say you have 300 photos of leaves, healthy or diseased. ImageNet has no \"diseased leaf\" class, but the spots, edges and textures the model already recognizes are exactly what you need to tell them apart."
          },
          {
            "p": "ResNet18, the model in the code below, is a ResNet (Lesson 17) with 18 layers and about 11.7 million parameters. That way, instead of training millions of weights from scratch, with millions of images you don't have, you use what the model already learned and train only a little, with little data. It's the most practical technique in all of image deep learning."
          }
        ]
      },
      {
        "heading": "Feature extraction vs fine-tuning",
        "blocks": [
          {
            "p": "There are two ways to adapt a pretrained model, depending on how much data you have."
          },
          {
            "list": [
              "Feature extraction: you freeze the whole network (it no longer trains) and replace only the classification head, which you train on your classes. Fast, suited to when you have very little data.",
              "Fine-tuning: you also unfreeze the upper layers of the network and train them with a small learning rate, to nudge them toward your problem. It can give a better score, suited to when you have somewhat more data."
            ]
          },
          {
            "p": "The classification head is the last layer of the network, the one that gives a score for each class (Lesson 17). In ResNet it's called `net.fc` (for fully connected) and goes from 512 numbers to 1,000 scores, one for each ImageNet class. Your problem has other classes, so you replace it with a new one."
          },
          {
            "p": "The name feature extraction comes from what the frozen network does: it extracts features. For each image it outputs 512 numbers that describe it, and the new head learns from them, like an ordinary model on a table with 512 columns."
          },
          {
            "p": "Freezing a weight means `requires_grad = False`: PyTorch stops computing its gradient. With no gradient, the optimizer has nothing to move it with at `optimizer.step()` (Lesson 14), so it stays exactly as it came."
          },
          {
            "code": "from torchvision import models\nimport torch\nimport torch.nn as nn\n\nNUM_CLASSES = 2                      # for example: healthy / diseased leaf\n\nnet = models.resnet18(weights=\"DEFAULT\")\nfor p in net.parameters():\n    p.requires_grad = False          # freeze everything (feature extraction)\nnet.fc = nn.Linear(net.fc.in_features, NUM_CLASSES)   # new, trainable head\nprint(net.fc)   # Linear(in_features=512, out_features=2, bias=True)\n\noptimizer = torch.optim.Adam(net.fc.parameters(), lr=1e-3)   # head only"
          },
          {
            "p": "`weights=\"DEFAULT\"` loads the best ImageNet weights torchvision has for ResNet18. `net.fc.in_features` is the number of inputs of the old head, 512 for ResNet18. You read it from there instead of typing 512 by hand, so the code also works with other models (ResNet50 has 2,048). `NUM_CLASSES` is your number of classes. The new head is created after the freezing, so its weights have `requires_grad = True` and they're the only ones that train: 512 · 2 + 2 = 1,026 numbers out of more than 11 million. The optimizer gets only `net.fc.parameters()`, the head's weights, and `lr=1e-3` is a learning rate of 0.001."
          },
          {
            "note": "`weights=\"DEFAULT\"` downloads the weights from the internet the first time you run the code (for ResNet18, a file of about 45 MB) and keeps them on your computer for next time. At ONIA, the platform runs your code without internet access (Lesson 6), so the download fails. You can use a pretrained model at the contest only if the rules allow it and the weights file is already available where your code runs. In that case you create the model with `weights=None` (random weights) and load the file with `net.load_state_dict(torch.load(\"resnet18.pth\"))`. Check the rules before the contest, not during it."
          }
        ]
      },
      {
        "heading": "Normalization: the same as at training",
        "blocks": [
          {
            "p": "A pretrained model saw images normalized in a certain way: subtracted and divided by the ImageNet statistics (the means and deviations on the three channels). Concretely, once the pixels were brought between 0 and 1 (Lesson 13), each channel had its mean subtracted and was divided by its standard deviation, exactly the standardization from Lesson 5. The means, computed on the ImageNet photos, are 0.485, 0.456 and 0.406 (red, green, blue), and the standard deviations are 0.229, 0.224 and 0.225."
          },
          {
            "p": "A pixel with red at 0.8 becomes (0.8 - 0.485) / 0.229 ≈ 1.38, and one with red at exactly 0.485 becomes 0, an \"ordinary red\" for ImageNet. If you feed it images normalized differently, the input doesn't look like what it saw at training and it works badly, sometimes inexplicably badly."
          },
          {
            "p": "In torchvision, preparing the photos looks like this."
          },
          {
            "code": "from PIL import Image\nfrom torchvision import transforms\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),           # the size of ImageNet photos\n    transforms.ToTensor(),                   # 0..255 -> 0..1, shape (3, H, W)\n    transforms.Normalize(mean=[0.485, 0.456, 0.406],\n                         std=[0.229, 0.224, 0.225]),\n])\n\nimg = Image.new(\"RGB\", (300, 200), (204, 128, 51))   # a test photo\nx = transform(img)\nprint(x.shape)      # torch.Size([3, 224, 224])\nprint(x[:, 0, 0])   # tensor([ 1.3755,  0.2052, -0.9156])"
          },
          {
            "p": "`transforms.Compose` puts the steps in order, like a Pipeline from Lesson 6. `Resize((224, 224))` brings the photo to 224x224, the size the model was trained on. `ToTensor()` turns the Pillow photo (Lesson 4) into a tensor with values between 0 and 1 and the channels first, and `Normalize` does the subtraction and division on each channel. The test photo has the color (204, 128, 51) everywhere, and 204 / 255 = 0.8, so the first number is exactly (0.8 - 0.485) / 0.229 ≈ 1.3755. `x[:, 0, 0]` takes all three channels of the top-left pixel."
          },
          {
            "note": "When you use a pretrained model, normalize the images exactly with the statistics it was trained on (for ImageNet, the means and standard deviations above). It's a silent, common mistake: the code runs without any error, only the score comes out bad. To be safe, you can get the model's official steps with `models.ResNet18_Weights.DEFAULT.transforms()`."
          }
        ]
      },
      {
        "heading": "A small learning rate for fine-tuning",
        "blocks": [
          {
            "p": "In fine-tuning, the pretrained layers already have good weights. If you train them with a large learning rate, the big steps break exactly the valuable features you wanted to keep. Use a small learning rate for them, sometimes even smaller than for the new head. That way you nudge them finely, not destroy them."
          },
          {
            "p": "In PyTorch, the optimizer can take groups of parameters, each with its own learning rate. Below, the last block of the pretrained body (everything before the head) is unfrozen and gets steps 10 times smaller than the new head. The rest of the body stays frozen."
          },
          {
            "code": "for p in net.layer4.parameters():\n    p.requires_grad = True           # unfreeze the last block\n\noptimizer = torch.optim.AdamW([\n    {\"params\": net.layer4.parameters(), \"lr\": 1e-4},   # body: small steps\n    {\"params\": net.fc.parameters(), \"lr\": 1e-3},       # head: bigger steps\n])"
          },
          {
            "p": "The body of ResNet18 has four big blocks, `net.layer1` to `net.layer4`, and `net.layer4` is the closest to the head. AdamW is the optimizer from Lesson 15. Each dictionary in the list is a group: `\"params\"` says which weights it holds, and `\"lr\"` the learning rate it moves them with. 1e-4 means 0.0001, 10 times less than 1e-3."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Adapt a ResNet to a problem with few images through feature extraction."
      },
      {
        "title": "Compare feature extraction with fine-tuning on the same set and see when each is worth it."
      },
      {
        "title": "Check what happens to the score if you drop the correct image normalization."
      }
    ]
  },
  {
    "moduleCode": "S23",
    "duration": "~1 week",
    "intro": "One-hot (the vector of zeros with a single 1, from Lesson 5) treats every word as something isolated: dog and cat are as different as dog and television. Embeddings put words into a space where closeness means close meaning. It's the idea all of modern NLP rests on. This module gives you the intuition, so that big text models (ChatGPT, for example) aren't a mystery to you.",
    "sections": [
      {
        "heading": "The problem with one-hot representation",
        "blocks": [
          {
            "p": "In classic NLP (Lesson 12), a word was a position in a huge vector of zeros with a single 1. With a vocabulary of just three words, dog, cat and television, the vectors would be dog = [1, 0, 0], cat = [0, 1, 0] and television = [0, 0, 1]. The problem: all the vectors are equally far from each other. The cosine similarity (Lesson 12) between any two of them is 0, since they never have a 1 in the same position. The model has no way to know that king and queen are related, or that good and excellent are close. The meaning is lost completely."
          },
          {
            "p": "The vectors are also enormous (as big as the vocabulary, tens of thousands of dimensions) and sparse (almost all zeros). With a vocabulary of 50,000 words, each vector has 49,999 zeros and a single 1. Inefficient and with no information about meaning. Embeddings solve both problems: they use dense vectors, which means short and with nonzero numbers almost everywhere."
          }
        ]
      },
      {
        "heading": "Embeddings: meaning as position in space",
        "blocks": [
          {
            "p": "An embedding is a dense, short vector (say 100-300 numbers), learned for each word, so that words with close meaning have close vectors. To see the idea, take vectors with just two numbers, points in the plane. Say that after training you have dog = [4, 3], cat = [3, 4] and television = [-3, 4]. We picked these numbers ourselves; real ones are learned and don't have such a simple meaning."
          },
          {
            "p": "The cosine similarity is the product of the two vectors (multiply the positions pairwise and add) divided by the product of their lengths. The length of [4, 3] is √(4² + 3²) = √25 = 5, and the same goes for the other two. Dog and cat: (4 · 3 + 3 · 4) / (5 · 5) = 24 / 25 = 0.96, close to 1, so close meaning. Dog and television: (4 · (-3) + 3 · 4) / 25 = 0 / 25 = 0, nothing in common."
          },
          {
            "code": "import numpy as np\n\ndef cosine(a, b):\n    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))\n\ndog = np.array([4, 3])\ncat = np.array([3, 4])\ntelevision = np.array([-3, 4])\nprint(cosine(dog, cat))          # 0.96\nprint(cosine(dog, television))   # 0.0\nprint(cosine(cat, television))   # 0.28"
          },
          {
            "p": "`a @ b` is the product described above: it multiplies the positions pairwise and adds them up, 4 · 3 + 3 · 4 = 24. `np.linalg.norm(a)` gives the length of the vector, here 5. Cat and television come out at 0.28, still far apart."
          },
          {
            "p": "They're learned from contexts: words that appear in similar contexts get similar vectors. Dog and cat both appear next to food, fur, animal, so they end up close. A word's context is the words around it, usually the ones at most two positions away, to the left and to the right. In the sentence \"my cat drinks milk in the kitchen\", the context of \"drinks\" is \"my\", \"cat\", \"milk\" and \"in\". This window slides over millions of sentences, one word at a time."
          },
          {
            "p": "Word2Vec learns such vectors in two variants: skip-gram (from a word you predict the context) or CBOW (from the context you predict the word). Skip-gram gets \"drinks\" and has to guess, one at a time, \"my\", \"cat\", \"milk\" and \"in\". CBOW does the reverse: it gets the four surrounding words and guesses \"drinks\". The guessing is just a pretext: after training you throw away the part that guesses and keep the vectors learned along the way."
          },
          {
            "p": "A famous result: vector arithmetic works. The vector king minus man plus woman lands close to queen. Meaning becomes geometry."
          },
          {
            "formula": "vec(king) - vec(man) + vec(woman) ≈ vec(queen)",
            "explain": "Meaning relations become directions in space. The man-woman difference is the same direction as king-queen."
          },
          {
            "p": "A toy example with two numbers: the first shows how royal a word is, the second how masculine. Say king = [9, 8], man = [1, 8], woman = [1, 1] and queen = [9, 1]. Then king - man + woman = [9 - 1 + 1, 8 - 8 + 1] = [9, 1], exactly queen. The difference woman - man = [0, -7] is the same as queen - king: it's the \"direction\" from masculine to feminine. With real embeddings, the result only lands close to queen (hence the ≈), so you look for the word with the highest cosine similarity to it."
          }
        ]
      },
      {
        "heading": "FastText: important for Romanian",
        "blocks": [
          {
            "p": "Word2Vec treats each word as a whole. FastText goes by subwords (pieces of letters): it builds a word's vector from its fragments. That matters a lot for Romanian, with its rich inflection: the same word changes form with person, number, tense or case. Merg, mergem, mergeau (I go, we go, they were going) share subwords, so they get related vectors, even if one of the forms is rare or unseen at training."
          },
          {
            "p": "Concretely, FastText puts a < at the start of the word and a > at the end, so it knows where the word begins and ends, then cuts it into pieces of 3 letters. It usually uses pieces of 3 to 6 letters, but here we stick to 3."
          },
          {
            "code": "def pieces(word, n=3):\n    w = \"<\" + word + \">\"\n    return [w[i:i + n] for i in range(len(w) - n + 1)]\n\nprint(pieces(\"mergem\"))   # ['<me', 'mer', 'erg', 'rge', 'gem', 'em>']\nprint(pieces(\"merg\"))     # ['<me', 'mer', 'erg', 'rg>']"
          },
          {
            "p": "`w[i:i + n]` is a slice of n letters starting at position i (Lesson 3), and the list takes all of them, from the first position to the last. \"merg\" and \"mergem\" share their first three pieces: \"<me\", \"mer\" and \"erg\". A word's vector is the average of the vectors of its pieces, plus the vector of the whole word if it was seen at training. That way, even an unseen form, for example \"mergeați\" (you were going), gets a vector from the pieces it has."
          },
          {
            "note": "For Romanian, prefer FastText or embeddings that use subwords. Models that treat each inflected form as a completely separate word lose the links and get stuck on the rare forms."
          }
        ]
      },
      {
        "heading": "Pretrained embeddings",
        "blocks": [
          {
            "p": "You can use pretrained vectors (ready-trained Word2Vec, FastText, GloVe) as feature extractors, without training anything: you take the word vectors and put a simple model on top. Pretrained means that someone else has already trained the model on billions of words, for example on all of Wikipedia, and published the vectors. GloVe is one more method for learning word vectors, similar to Word2Vec, and FastText has ready-trained vectors for Romanian too. With little data, it's much better than starting from scratch."
          },
          {
            "p": "To get a single row of features for a whole text, the simplest way is to average the vectors of its words. A text of 10 words, with vectors of 300 numbers, becomes a single row of 300 numbers, and on top of these rows you put a logistic regression (Lesson 7)."
          },
          {
            "note": "Files of pretrained vectors are big (from hundreds of MB to a few GB) and get downloaded from the internet. At the contest, the platform runs your code without internet access (Lesson 6), so you can use them only if the rules allow it and the files are already available where your code runs."
          }
        ]
      },
      {
        "heading": "Sequences: RNN, LSTM, GRU",
        "blocks": [
          {
            "p": "An embedding gives a word meaning, but a sentence is a sequence where order matters. \"The dog bit the mailman\" and \"the mailman bit the dog\" have the same words but don't say the same thing, and a bag-of-words (Lesson 12) sees them as identical. Recurrent networks (RNN) process the text word by word, holding a state that summarizes what they've seen so far."
          },
          {
            "p": "The state is like what you keep in your head while reading. You don't remember every word, but you know who the character is and what has happened so far, and each new word updates your summary. In an RNN, the state is a vector of numbers, say 16 of them. At each word, the network takes the word's embedding and the old state and computes the new state from them, with the same weights at every step (like the sliding filter from Lesson 17). The state after the last word sums up the whole sentence and can go into a dense layer that gives the class."
          },
          {
            "p": "In PyTorch, `nn.Embedding` is literally a table of embeddings: one vector for each word in the vocabulary, learned together with the rest of the network. Words go in as numbers (each word's position in the vocabulary), and the table gives back their vectors."
          },
          {
            "code": "import torch\nimport torch.nn as nn\n\ntorch.manual_seed(0)\nids = torch.randint(0, 1000, (4, 7))   # 4 sentences, 7 words each\nemb = nn.Embedding(1000, 50)           # 1000 words, vectors of 50\nx = emb(ids)\nprint(x.shape)        # torch.Size([4, 7, 50])\n\nrnn = nn.RNN(input_size=50, hidden_size=16, batch_first=True)\noutputs, state = rnn(x)\nprint(outputs.shape)  # torch.Size([4, 7, 16]): the state after each word\nprint(state.shape)    # torch.Size([1, 4, 16]): the state after the last"
          },
          {
            "p": "What goes in: 4 sentences of 7 words each, given as numbers between 0 and 999 (here picked at random with `torch.randint`). `nn.Embedding(1000, 50)` turns them into vectors of 50 numbers, so the shape becomes (4, 7, 50). `batch_first=True` tells the RNN that the first dimension is the batch (the sentences), followed by the words. What comes out: `outputs` holds the state after each word, 16 numbers per word, and `state` only the state after the last word. The 1 in front is the number of RNN layers stacked on top of each other, here just one."
          },
          {
            "p": "The problem: on long sequences, the gradient vanishes and the network forgets the start of the sentence. In backpropagation (Lesson 14), the gradient flows back through every step, as if through a network with one layer per word. If it gets multiplied by 0.9 at each step, after 50 words you're left with 0.9 to the power of 50, about 0.005. It's the vanishing gradient problem (Lesson 16), the same as in the very deep networks from Lesson 17: the first words barely count in training anymore."
          },
          {
            "p": "LSTM and GRU solve this with gates: mechanisms that decide what information they keep, what they forget and what they let through. That way they can hold context from further back. A gate is a row of numbers between 0 and 1, produced by a sigmoid (Lesson 14), that the information gets multiplied by: 0 blocks it, 1 lets it all through, and 0.5 lets half through."
          },
          {
            "p": "Besides the state, an LSTM keeps a separate memory and has three gates. The forget gate decides what you erase from the memory, the input gate what new information you write into it, and the output gate which part of the memory you use at this step. GRU is a simpler variant with two gates, often just as good and faster."
          },
          {
            "p": "In \"Maria left home in the morning and, after a long day at school, she came back tired\", the word \"she\" points back to \"Maria\", more than ten words earlier. An LSTM can keep who the subject is in its memory until then, by holding its forget gate close to 1. You don't have to implement them from scratch, but understand conceptually why they work: the gates protect important information from being erased step by step."
          },
          {
            "p": "The LSTM's memory is updated mostly by addition, like the residual connection from Lesson 17. When the forget gate is close to 1, the memory passes almost unchanged from one word to the next, and so does the gradient. In PyTorch, `nn.LSTM` is used like `nn.RNN`, with the same arguments, except it also returns the memory: `outputs, (state, memory) = lstm(x)`."
          },
          {
            "p": "RNNs and LSTMs have largely been replaced by transformers in top-end NLP. A transformer no longer reads word by word: it looks at all the words at once and learns, for each word, which of the others to pay attention to. The big text models, like ChatGPT, are built on this idea. RNNs still matter for understanding the idea of sequence processing and the long-range memory problem, which is exactly what transformers came to solve better."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Explore vector arithmetic (king - man + woman) on a set of pretrained embeddings."
      },
      {
        "title": "Compare FastText with Word2Vec on inflected Romanian words."
      },
      {
        "title": "Use pretrained embeddings as features and put a logistic regression on top."
      }
    ]
  },
  {
    "moduleCode": "S24",
    "duration": "~1 week",
    "intro": "Reinforcement learning is required in the upper grades. An agent learns what to do from rewards, by trial and error, without being told the correct answer at every step. At the end we also reach ethics: models can be unfair to certain groups, and it's worth knowing why it happens and how it's measured.",
    "sections": [
      {
        "heading": "What's different about RL",
        "blocks": [
          {
            "p": "In the supervised learning from the lessons so far, you had the correct answer for every example. In RL you don't. The agent takes actions in an environment, gets rewards (positive or negative), and has to learn on its own which sequence of actions brings the largest reward in the long run. The challenge: a good action now may only bring the reward many steps later."
          },
          {
            "p": "A classic example: an agent in a grid-world (a map of cells) has to reach a target while avoiding traps. It isn't told the path; it gets a small negative reward at each step and a big positive one at the target, and learns the good path on its own. The negative reward at every step pushes it toward the shortest path, since each extra step costs it. On this example, the basic words of RL mean:"
          },
          {
            "list": [
              "The agent is the one deciding what to do, here the robot on the map. In code, it's your program.",
              "The environment is the world the agent lives in: the map with its walls, traps and target, plus the rules by which the robot moves.",
              "An action is a move: up, down, left or right.",
              "The reward is a number the environment gives the agent after each action, for example -1 for an ordinary step, -10 for a trap and +10 for the target.",
              "An episode is one complete attempt, from the start until the agent reaches the target or falls into a trap. The agent plays many episodes and gets better from one to the next."
            ]
          },
          {
            "p": "The difference from the search in Lesson 11: there you knew the map and searched it for the best path. Here the agent doesn't know the map or where the traps are. It finds out by trying."
          }
        ]
      },
      {
        "heading": "MDP: the language of RL",
        "blocks": [
          {
            "p": "An MDP (Markov decision process) describes the problem formally. Markov comes from the Russian mathematician Andrey Markov and means that what happens next depends only on the current state, not on the path that led there. On the map: if you know which cell the robot is in, it doesn't matter where it came from. An MDP has:"
          },
          {
            "list": [
              "States: where the agent can be, here the cell it's in.",
              "Actions: what it can do in each state, here the four moves.",
              "Transitions: where it ends up after an action. \"Right\" moves it one cell to the right, and if there's a wall there, it stays put.",
              "Rewards: what it gets after each action.",
              "A discount factor: how much the future counts against the present."
            ]
          },
          {
            "p": "The policy is the rule the agent chooses its action by in each state. On the map, a policy is an arrow drawn in every cell. The policy isn't part of the problem description: it's what you're looking for. The goal: find the policy that maximizes the expected total reward. Expected means on average: sometimes the environment is random (for example, the robot slips and lands in a different cell than it wanted), so what counts is what you get on average, over many episodes."
          },
          {
            "p": "The discount is written γ (the Greek letter gamma) and is a number between 0 and 1, usually 0.9 or 0.99. Each step of waiting multiplies a reward by γ. With γ = 0.9, a reward of 10 received right now is worth 10. If it comes one step later, it's worth 10 · 0.9 = 9, two steps later 10 · 0.9² = 8.1, and three steps later 10 · 0.9³ = 7.29. A win now is surer than one promised far ahead, and this way the agent comes to prefer short paths. With γ = 0 it would only look at the immediate reward; with γ close to 1, the future counts almost as much as the present."
          },
          {
            "p": "Two functions measure how well you're doing. V(s) says how good a state is (how much reward you expect from there on). Q(s,a) says how good a state-action pair is (how much reward you expect if you take action a in state s, then play well). The letter s stands for state, a for action, and future rewards are added up with the discount, as above."
          },
          {
            "p": "The smallest grid-world is a corridor of 5 cells, numbered 0 to 4. The agent starts in cell 0 and can move left or right. The target is cell 4: when it gets there it receives 10 and the episode ends. Every other step gives 0, to keep the math simple. If it's in cell 0 and moves left, it bumps into the wall and stays put. The discount is γ = 0.9."
          },
          {
            "p": "The best policy is \"always go right\". From cell 3, the reward of 10 comes with the very next move, so V(3) = 10. From cell 2 it comes one step later, so V(2) = 9. In the same way, V(1) = 8.1 and V(0) = 7.29, exactly the discount numbers."
          },
          {
            "p": "Q compares the actions. Q(2, right) = 0 + 0.9 · V(3) = 9: you get 0 now and land in cell 3, which is worth 10. Q(2, left) = 0 + 0.9 · V(1) = 0.9 · 8.1 = 7.29: you land in cell 1, further from the target. The bigger Q tells you what to do: from cell 2 you go right."
          },
          {
            "p": "The Bellman equations link them recursively: the value of a state depends on the values of the next states. The value here is the reward you get now plus γ times the value of the state you land in, if you play as well as you can from there. That's exactly how you computed it above: to find V(2), you needed V(3)."
          }
        ]
      },
      {
        "heading": "Tabular Q-learning",
        "blocks": [
          {
            "p": "Q-learning learns the Q function from experience, holding a table with one value for each state-action pair. In the corridor, the table has 5 rows (the cells) and 2 columns (left, right). After each action, it updates the value in the table, moving it closer to the reward received plus the best value in the next state. With enough tries, the table converges (the values stop changing) and the good policy comes out: in each state, you pick the action with the highest Q."
          },
          {
            "p": "Above, you computed Q by hand because you knew the map. The agent doesn't: it finds out the rewards and where each move takes it only by trying. The formula below tells it how to correct its table after every step."
          },
          {
            "formula": "Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]",
            "explain": "α = the learning rate, r = the reward, γ = the discount factor, s' = the next state. You move Q toward the real reward plus the future value. max Q(s',a') is the largest value in the row of state s', and the arrow ← means \"becomes\", like `=` in Python."
          },
          {
            "p": "The square bracket is the difference between what you just found out, r + γ · max Q(s',a'), and what you believed before, Q(s,a). α (alpha) says how much of that difference you correct, like the learning rate η from Lesson 14: with α = 0.5 you go half the way."
          },
          {
            "p": "A calculation by hand in the corridor, with α = 0.5 and γ = 0.9. The table starts out all zeros. The agent is in cell 3, moves right, gets r = 10 and reaches the target. Nothing comes after the target, so max Q(s',a') = 0. Q(3, right) ← 0 + 0.5 · [10 + 0.9 · 0 - 0] = 5."
          },
          {
            "p": "In a later episode, the agent is in cell 2 and moves right: r = 0 and it lands in cell 3, where the largest value is now 5. Q(2, right) ← 0 + 0.5 · [0 + 0.9 · 5 - 0] = 2.25. When it's back in cell 3 and moves right, Q(3, right) ← 5 + 0.5 · [10 + 0.9 · 0 - 5] = 7.5. The target's value trickles backward, cell by cell, and with enough episodes the numbers approach 10, 9, 8.1 and 7.29."
          }
        ]
      },
      {
        "heading": "Exploration versus exploitation",
        "blocks": [
          {
            "p": "A central dilemma: exploration versus exploitation. If the agent always picks what looks best now (exploitation), it may miss a better path it hasn't tried. If it explores too much, it wastes time. The ε-greedy strategy balances it: with probability ε it takes a random action (exploration), otherwise it picks the best one (exploitation). You usually start with a large ε and lower it gradually."
          },
          {
            "p": "ε (epsilon) is another Greek letter, here a number between 0 and 1, and greedy means always grabbing what looks best right now. With ε = 0.1, about 1 move in 10 is picked at random, and the other 9 are the best ones according to the table. With ε = 1, every move is random, which is what you want at the start, when the table is all zeros and the agent knows nothing."
          },
          {
            "p": "The code below puts it all together: the corridor, the Q table, the formula and ε-greedy."
          },
          {
            "code": "import random\nimport numpy as np\n\nrandom.seed(0)\nN = 5                    # cells 0, 1, 2, 3, 4; the target is cell 4\nQ = np.zeros((N, 2))     # column 0 = left, column 1 = right\nalpha, gamma = 0.5, 0.9\n\nfor episode in range(300):\n    eps = max(0.1, 1 - episode / 100)  # starts at 1, drops to 0.1\n    s = 0                              # every episode starts in cell 0\n    while s != N - 1:\n        if random.random() < eps:\n            a = random.randint(0, 1)   # exploration: a random action\n        else:\n            a = Q[s].argmax()          # exploitation: the best one so far\n        s2 = max(s - 1, 0) if a == 0 else s + 1   # in cell 0, left = stay\n        r = 10 if s2 == N - 1 else 0\n        future = 0 if s2 == N - 1 else Q[s2].max()\n        Q[s, a] += alpha * (r + gamma * future - Q[s, a])\n        s = s2\n\nprint(Q.round(2))\n# [[ 6.56  7.29]\n#  [ 6.56  8.1 ]\n#  [ 7.29  9.  ]\n#  [ 8.1  10.  ]\n#  [ 0.    0.  ]]\nprint(Q[:N - 1].argmax(axis=1))   # [1 1 1 1]: right in every cell"
          },
          {
            "p": "Each episode starts in cell 0 and lasts until the agent reaches cell 4 (the `while` loop). `Q[s]` is the row of cell s, and `Q[s].argmax()` gives the column with the largest value (Lesson 4), the best action so far. `random.random()` gives a random number between 0 and 1 (Lesson 3); when ε = 0.1, the number falls below ε about once in 10, and then the agent picks at random. `s2` is the next cell, `r` the reward, and `future` is max Q(s',a'), which is 0 when the target has been reached. The line with `+=` is the formula above."
          },
          {
            "p": "What comes out: the learned table, rounded to two decimals with `Q.round(2)`. The right column holds exactly the values computed by hand: 7.29, 8.1, 9 and 10. The left column matches too, for example Q(2, left) = 7.29, as above. The row of cell 4 stays 0, because the game ends there. `Q[:N - 1].argmax(axis=1)` picks the best column in every row except the last: 1, which means right, everywhere."
          },
          {
            "p": "The ε in the code goes down: it's 1 in the first episode, 0.5 at episode 50 and 0.1 from episode 90 on. At first the agent tries anything, then it uses what it learned more and more often. Since ε never reaches 0, the agent still tries left now and then, which is why the left column has values too."
          },
          {
            "note": "An ε that's too small too early is a classic trap: the agent fixes on the first decent path it found and stops exploring, staying stuck in a mediocre solution. Let it explore enough at the start."
          }
        ]
      },
      {
        "heading": "Bias and fairness",
        "blocks": [
          {
            "p": "Here bias no longer means the error from overly simple assumptions from Lesson 1. It means a systematic unfairness: the model makes more mistakes, or worse decisions, for a certain group of people. A model learns from data, so it inherits the patterns in it, including the unfair ones. Bias comes in through several doors: historical data that reflects past discrimination, biased labeling, or the choice of a metric that hides the problem."
          },
          {
            "p": "For example, if a company used to hire mostly men, a model trained on the old hiring decisions learns that being a man is a good sign. Yet that says nothing about how well someone works. A model can do well on average and badly on a subgroup, and the average hides that. In numbers: group A is 90% of the data and the model has 99% accuracy on it, while group B is 10% of the data and there the model gets half the cases wrong. The overall accuracy is 0.9 · 99% + 0.1 · 50% = 89.1% + 5% = 94.1%, which looks great."
          },
          {
            "p": "That's why you measure performance on each subgroup separately, next to the overall score. With pandas, if you have a `group` column and a `correct` column (True when the prediction is right), `df.groupby(\"group\")[\"correct\"].mean()` gives you the accuracy for each group (Lesson 4). The mean of True and False values is exactly the share of True. Fairness has several definitions, and this is the hard part: you can't always have them all at once."
          },
          {
            "list": [
              "Demographic parity: the model gives positive outcomes in the same proportion for each group. For example, it approves 45% of the applications in group A and in group B.",
              "Equal opportunity: the model has the same true positive rate for each group (it catches the real cases equally well in each group). The true positive rate is the recall from Lesson 8, computed separately for each group."
            ]
          },
          {
            "p": "An example with loans. Group A has 100 people, 60 of whom would pay the money back. Group B also has 100, but only 30 would pay it back. \"Positive\" means the model approves the loan."
          },
          {
            "p": "A perfect model approves exactly the people who would pay back: 60 in A and 30 in B. The true positive rate is 60 / 60 = 100% in A and 30 / 30 = 100% in B, so equal opportunity holds. But the approval rate is 60% in A and 30% in B, so demographic parity is broken."
          },
          {
            "p": "Now you ask for parity: 45 approvals in each group. In A, the best you can do is approve 45 of the 60 who would pay, so you turn down 15 people who deserved it: the true positive rate drops to 45 / 60 = 75%. In B you approve all 30 who would pay, plus 15 who won't pay the money back, and the rate stays at 100%. Parity holds (45% and 45%), but equal opportunity doesn't anymore (75% against 100%)."
          },
          {
            "p": "The two definitions can be mathematically incompatible: satisfying one, you break the other. It happens when the groups have different shares of real positive cases, like 60% and 30% here. You can satisfy both only with a model that makes more mistakes: it turns down people who deserved it or approves people who didn't. There's no purely technical answer. The choice depends on the context and on what cost each kind of mistake has for people. What matters is to be aware of the trade-off and make it explicit, not to report only the average and hide the rest."
          }
        ]
      }
    ],
    "practice": [
      {
        "title": "Implement Q-learning on a grid-world and watch the policy take shape."
      },
      {
        "title": "Measure a model's performance on subgroups and discuss which fairness definition you use."
      },
      {
        "title": "Vary ε (the exploration) and see how the policy the agent learns changes."
      }
    ]
  }
];

export const lessonByModuleEn = (code: string): Lesson | undefined =>
  lessonsEn.find((l) => l.moduleCode === code);
