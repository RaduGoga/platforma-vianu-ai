// AUTO-GENERAT din content/lessons/*.en.md — NU edita direct.
// Editează fișierele markdown din content/lessons/, apoi rulează `npm run lessons`
// (se rulează oricum automat înainte de dev și build).
import type { Lesson } from "./lesson-types";
export type { Block, LessonSection, Lesson } from "./lesson-types";

export const lessonsEn: Lesson[] = [
  {
    "moduleCode": "S1",
    "duration": "~2h",
    "objective": "You know what artificial intelligence is and where it's used, you have your working setup sorted, and a first valid submission on MLCompete.",
    "intro": "The first session has two halves. First we make it clear what artificial intelligence actually means, so you know what we're talking about all year. Then we do the logistics: a place to write code and a place to send answers. The setup part sounds boring, but most of the silly points lost at the first stage come from here: an environment that won't start, a badly formatted submission file, a missing library. Do it once, properly, and you're done with it.",
    "sections": [
      {
        "heading": "What AI is and where it's used",
        "blocks": [
          {
            "p": "Artificial intelligence is the idea of building a program that solves problems without you writing, step by step, the rule for every case. Instead of telling it \"if this, do that\", you show it many examples and let it find the rule on its own. That part, learning from examples, is called machine learning, and it's almost everything you do at the olympiad."
          },
          {
            "p": "One example makes it clear. To tell a spam email from a normal one with hand-written rules, you'd write hundreds of \"if it contains word X\". With machine learning, you give it a few thousand emails already marked spam or not, and the model learns on its own which combinations of words predict spam. You don't give it the rule, you pull the rule out of the data."
          },
          {
            "list": [
              "Classification: you put a label on something (spam or not, which digit is in an image, what a scan shows).",
              "Regression: you predict a number (the price of a house, tomorrow's temperature).",
              "Grouping: you find structure in data with no labels (which customers are similar)."
            ]
          },
          {
            "note": "At AI contests almost every problem comes down to this: you get data with examples, you train a model that learns from them, and you make it predict on new data. The rest of the curriculum is the tools that do this well."
          }
        ]
      },
      {
        "heading": "What Python is and why it's the one",
        "blocks": [
          {
            "p": "Python is the standard language for writing AI code. Not because it's the fastest, but because the libraries you want are already written: NumPy for numeric work, Pandas for tables, scikit-learn for classic models, PyTorch for neural networks. At the olympiad everything is written in Python, so that's where you start."
          },
          {
            "p": "A library is code someone else wrote, that you import and use. Instead of writing the sorting algorithm or matrix multiplication yourself, you call the right function. Most of your work will be wiring these libraries together correctly."
          },
          {
            "note": "Install Python 3.11 (a stable, widely supported version) and JupyterLab. Jupyter gives you an interactive notebook where you run code piece by piece and see the result right away, exactly what you want when you're exploring data."
          }
        ]
      },
      {
        "heading": "Get your environment ready",
        "blocks": [
          {
            "p": "A virtual environment is a separate box for one project's libraries, so they don't clash with others. You create it once and always work inside it. The steps below give you a clean environment with everything you need to start."
          },
          {
            "steps": [
              "Open a terminal in your working folder.",
              "Create the environment: python3.11 -m venv .venv",
              "Activate it: source .venv/bin/activate (on Windows: .venv\\Scripts\\activate).",
              "Install the tools: pip install numpy pandas matplotlib scikit-learn jupyterlab",
              "Start Jupyter: jupyter lab"
            ]
          },
          {
            "p": "Check right away that everything imports without errors. If something breaks, fix it now, at home, with internet, not in the contest room where you have neither the net nor the time."
          },
          {
            "code": "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LogisticRegression\n\nprint(\"numpy\", np.__version__)\nprint(\"pandas\", pd.__version__)\nprint(\"all good\")",
            "caption": "If this runs with no error, you're ready to work."
          }
        ]
      },
      {
        "heading": "Offline documentation",
        "blocks": [
          {
            "p": "At the contest, most stages are offline: no internet, no Stack Overflow, no asking a model. The only thing you can look at is the local documentation, meaning the libraries' help files saved on your machine."
          },
          {
            "p": "Get into the habit early of searching the offline docs. In Jupyter, you put a question mark after a function and it shows you what it does and what arguments it takes. That's the reflex that saves you precious minutes."
          },
          {
            "code": "pd.read_csv?      # open the help for read_csv\nnp.mean?          # what it does, what arguments it takes",
            "caption": "The question mark opens the docs with no internet."
          }
        ]
      },
      {
        "heading": "Your first submission, the full loop",
        "blocks": [
          {
            "p": "MLCompete (platform.olimpiada-ai.ro) is the platform you train on all year. Nitro AI Judge (judge.nitro-ai.org) is another one, for hackathon-style NLP problems. Make accounts on both now."
          },
          {
            "p": "A competition works like this: you download a dataset, train a model, produce a file with your predictions for the test data, upload it, and get a score on a leaderboard. The point of your first submission isn't the score. It's to see the whole loop at least once."
          },
          {
            "steps": [
              "Enter a training competition and read which metric is scored.",
              "Download the data and open the sample submission file, so you see exactly which columns and format it wants.",
              "Produce a file in the same format, even with random answers.",
              "Upload it and look at the score."
            ]
          },
          {
            "note": "A good model with a badly formatted file scores zero. The submission format isn't a detail, it's a condition. Check it every time: the column names, the order, the separator, whether it has a header or not."
          }
        ]
      }
    ],
    "pitfalls": [
      "You leave the install for the last night. Something breaks, and you lose time instead of learning.",
      "You don't check the submission format. A file that's good as a model but badly formatted scores zero.",
      "You rely on the internet while training, then at the offline contest you're lost."
    ],
    "practice": [
      "Send one valid submission to a training competition on MLCompete.",
      "Save the offline docs for numpy and pandas and search them with no internet.",
      "Write the steps from data to submission file from memory, without looking."
    ],
    "keyTakeaways": [
      "AI at the olympiad means machine learning: the model learns the rule from examples, you don't write it.",
      "Python plus a few libraries do everything: NumPy, Pandas, scikit-learn, PyTorch.",
      "The environment and the offline docs are prepared at home, not on contest day.",
      "The contest loop: data in, a predictions file out, a score on the board.",
      "The submission format is a scoring condition, not a detail."
    ]
  },
  {
    "moduleCode": "S2",
    "duration": "~2h",
    "objective": "You read a contest problem correctly: you know what the data is, which metric scores you, what the submission looks like, and what the leaderboard does (and doesn't) tell you.",
    "intro": "Before you learn any model, it's worth understanding the game. An AI contest problem always has the same pieces: some data, a target to predict, a scoring metric and a submission file. Whoever reads those pieces correctly starts with a big head start, because half the mistakes at a contest aren't about the model, they're about reading the statement in a hurry.",
    "sections": [
      {
        "heading": "Anatomy of a problem",
        "blocks": [
          {
            "p": "You get two datasets. One for training, which also has the correct answers (called the labels or the target), and one for testing, which has the same columns but no answer. Your job is to predict the answer for the test set, based on what you learned on the training one."
          },
          {
            "list": [
              "Training data: the rows you see in full, answer included. This is what the model learns from.",
              "Test data: the same columns, but the target column is missing. This is what you fill in.",
              "The target: what you predict. It can be a label (spam or not) or a number (a price).",
              "The submission file: a table with your predictions, in the exact format the platform wants."
            ]
          },
          {
            "note": "The first thing you do on a new problem isn't to train something. It's to open the data and the sample submission file and look at them: how many rows, which columns, what's missing, what the required answer looks like."
          }
        ]
      },
      {
        "heading": "The metric is the rule of the game",
        "blocks": [
          {
            "p": "Every problem has a metric, meaning the formula your score is computed with. It's written in the statement and it's the only one that counts. You're not scored on how clever the model looks, but on the number the metric produces. If the metric is F1 and you optimize accuracy, you can climb a score that earns you no points."
          },
          {
            "list": [
              "Accuracy: the share of correct answers. Simple, but misleading when the classes are imbalanced.",
              "F1: balances precision against recall, good when the classes are uneven.",
              "RMSE or MAE: for numbers, how far off you are on average from the real answer."
            ]
          },
          {
            "p": "The practical rule: read the metric before anything, and train with it in mind. If F1 is scored, validate locally on F1, not on something else."
          }
        ]
      },
      {
        "heading": "Submission and leaderboard",
        "blocks": [
          {
            "p": "Once you have the predictions, you put them in the required file and upload it. The platform compares it against the correct answers, which you don't see, and gives you a score on a board. You usually have a limited number of submissions per day, so don't waste them on random tries."
          },
          {
            "p": "The leaderboard has two faces. The public one is computed on part of the test data and you see it while the contest runs. The private one is computed on the rest and is only revealed at the end. The ranking that counts is the private one. That split exists for a reason, and it leads you straight to the next trap."
          }
        ]
      },
      {
        "heading": "The public leaderboard trap",
        "blocks": [
          {
            "p": "If you pick your model by the public score, you end up fitting that small slice of data instead of the real problem. It's called overfitting the leaderboard: you climb nicely on the public one, then you drop on the private one, where the points are actually handed out."
          },
          {
            "note": "The defense is a serious local validation. You keep part of the training data aside, as your own test, and you trust that score more than the public leaderboard. At the end you pick your submissions on the local score, not the public one."
          }
        ]
      },
      {
        "heading": "Where you train",
        "blocks": [
          {
            "p": "There are three places you need all year. They're not interchangeable, each has its own job."
          },
          {
            "list": [
              "ONIA (olimpiada-ai.ro): the official artificial intelligence olympiad, with a local, county and national stage. The winners go to the team for IOAI.",
              "MLCompete (platform.olimpiada-ai.ro): the platform the olympiad runs on, and where you practice between stages, with archive problems and training competitions.",
              "Nitro NLP (nitro-ai.org): a Romanian-language NLP hackathon, in teams, good for working on real text."
            ]
          },
          {
            "p": "You don't have to touch all of them today. You just need to know what each one is for, so you don't find yourself in January with no account and no submission ever made."
          }
        ]
      }
    ],
    "pitfalls": [
      "You jump to the model without reading the metric and the submission format. You lose points on things that aren't about AI.",
      "You obsess over the public score and pick your model by it. You drop on the private one.",
      "You burn the day's submissions on random tries, then have nothing left to test the good idea with."
    ],
    "practice": [
      "Take an archive problem on MLCompete and write three lines: what the target is, what the metric is, what the submission looks like.",
      "Make a local validation split and compare its score with the public leaderboard on the same submission.",
      "Explain to a friend the difference between the public and the private leaderboard, with an example."
    ],
    "keyTakeaways": [
      "A problem has four pieces: training data with labels, test data without, a target, a metric.",
      "You're scored on exactly the metric in the statement. You optimize what's scored, not what looks nice.",
      "The private leaderboard decides the ranking, the public one just tempts you.",
      "You pick your final submissions on your local validation, not on the public score."
    ]
  },
  {
    "moduleCode": "S3",
    "duration": "~3 weeks",
    "objective": "You handle data with NumPy and Pandas without thinking about the syntax, so you spend your time on the model, not on how to write a filter.",
    "intro": "NumPy and Pandas are the tools you use on every problem, whatever the model. If you trip over them, you lose precious time. The goal here isn't just to write code that works, it's to write it fast and by reflex. You learn them once, well, and use them the rest of the year.",
    "sections": [
      {
        "heading": "Why plain Python isn't enough",
        "blocks": [
          {
            "p": "In ordinary Python, a list of a million numbers you want to add up element by element is done with a for loop. It works, but it's slow, because Python checks the type of every element at every step. With real data, that becomes unbearable."
          },
          {
            "p": "NumPy solves it with a new structure: the ndarray, a grid of numbers of the same type, with a fixed shape. Operations apply to the whole array at once, in fast compiled code, with no Python loop. The idea is called vectorization and it's tens of times faster."
          },
          {
            "code": "import numpy as np\n\n# slow, in pure Python\ntotal = 0\nfor x in range(1_000_000):\n    total += x * x\n\n# fast, vectorized\nv = np.arange(1_000_000)\ntotal = (v * v).sum()",
            "caption": "The same sum, but the second version is much faster."
          }
        ]
      },
      {
        "heading": "ndarray: shape, axes, indexing",
        "blocks": [
          {
            "p": "An ndarray has a shape: how many rows, how many columns, how many dimensions. A grayscale image is a 2D matrix, a color one is 3D (height, width, channels). Your first move on any bug is to print the shape and check it's what you thought."
          },
          {
            "p": "The axes are the directions you operate along. axis=0 goes down the rows (vertically, you get one value per column), axis=1 goes across the columns (horizontally). Mixing up the axes is one of the most common beginner mistakes."
          },
          {
            "code": "x = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nx.shape          # (2, 3): 2 rows, 3 columns\nx.mean(axis=0)   # mean of each column -> [2.5, 3.5, 4.5]\nx.mean(axis=1)   # mean of each row    -> [2.0, 5.0]"
          },
          {
            "p": "Indexing with a boolean mask is a tool you use daily: you build a vector of True/False and select only the elements where it's True. That's how you filter data with no loop."
          },
          {
            "code": "x[x > 3]         # only the elements greater than 3 -> [4, 5, 6]\nx[x > 3] = 0     # and you can change them in place too"
          }
        ]
      },
      {
        "heading": "Broadcasting: how NumPy matches different shapes",
        "blocks": [
          {
            "p": "Broadcasting is the rule by which NumPy does operations between arrays of different shapes, automatically stretching the smaller one to fit. It's gold once you understand it, and a source of strange bugs when you don't. Half the beginner errors come from shapes that don't match the way you thought."
          },
          {
            "p": "The rule, simply: NumPy compares shapes from right to left. Two dimensions match if they're equal or if one of them is 1 (that one stretches). A scalar matches anything."
          },
          {
            "code": "X = np.array([[1, 2, 3],\n              [4, 5, 6]])      # shape (2, 3)\nmeans = X.mean(axis=0)         # shape (3,): [2.5, 3.5, 4.5]\nX_centered = X - means         # (2,3) - (3,) matches, subtracts per column",
            "caption": "Centering a matrix on its means, with no loop at all."
          },
          {
            "note": "When an operation throws a shape error, print the shapes of the two operands and apply the right-to-left rule. Nine times out of ten you see straight away where they don't match."
          }
        ]
      },
      {
        "heading": "Pandas: data with labels",
        "blocks": [
          {
            "p": "NumPy is good with numbers, but real data has names: an age column, a score column, a class column. Pandas adds labels on top of NumPy. A DataFrame is a table with column names and a row index. It's the structure most contest datasets arrive in."
          },
          {
            "p": "You read a CSV file in one line. Then you look at it before anything: the first rows, the column types, how many values are missing."
          },
          {
            "code": "import pandas as pd\n\ndf = pd.read_csv(\"data.csv\")\ndf.head()        # first 5 rows\ndf.info()        # types and non-null counts\ndf.describe()    # stats on the numeric columns"
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
            "code": "df.loc[10, \"score\"]        # value at index 10, column \"score\"\ndf.iloc[0, 2]              # row 0, column 2, by position\ndf.loc[df[\"score\"] > 8]    # all rows with score above 8"
          },
          {
            "note": "The trap shows up when the index isn't 0,1,2,... For example after a filter, the index has gaps. Then iloc[0] and loc[0] can be completely different rows. Choose on purpose which one you want."
          }
        ]
      },
      {
        "heading": "groupby, merge, pivot: the three you always use",
        "blocks": [
          {
            "p": "groupby splits the data into groups and computes something on each group: the mean per class, the sum per category. It's the split-apply-combine pattern: you split, you apply a function, you stitch the results back together."
          },
          {
            "code": "df.groupby(\"class\")[\"score\"].mean()      # mean score per class\ndf.groupby(\"class\").size()               # how many rows each class has"
          },
          {
            "p": "merge stitches two tables together on a common column, exactly like a JOIN in databases. how says what you do with the rows that have no match: left keeps everything from the left, inner keeps only the matches."
          },
          {
            "code": "df.merge(other_table, on=\"id\", how=\"left\")"
          },
          {
            "p": "pivot_table reshapes a long table into a wide one, with a column turned into a header. It's handy for reports and for spotting patterns across two dimensions at once."
          }
        ]
      }
    ],
    "pitfalls": [
      "Python loops over DataFrame rows. It's slow and pointless, there's almost always a vectorized version.",
      "The loc/iloc mix-up, especially when the index isn't 0, 1, 2.",
      "Ignoring shape errors instead of printing the shapes and applying the broadcasting rule."
    ],
    "practice": [
      "Take a CSV and answer five questions about it using only groupby and mask filters.",
      "Rewrite a Python loop as a vectorized operation and compare the timings.",
      "Center a matrix on its column means using broadcasting, with no loop."
    ],
    "keyTakeaways": [
      "Vectorization replaces loops: you operate on the whole array at once, much faster.",
      "Shape and axes are the first thing to check on a NumPy bug.",
      "Broadcasting matches shapes by comparing right to left; one of the dimensions has to be equal or 1.",
      "loc by label, iloc by position, don't mix them.",
      "groupby, merge, pivot_table show up in almost every tabular problem."
    ]
  },
  {
    "moduleCode": "S4",
    "duration": "~1 week",
    "objective": "You take a contest problem from the raw file to a valid submission, without skipping steps and without leaking test data into training.",
    "intro": "So far you've learned pieces: Python, NumPy, Pandas. This module ties them together. It brings no new theory, only the order in which things get done. That matters, because most olympiad mistakes don't come from the model, they come from steps taken in the wrong order. A pipeline you can run end to end in twenty minutes is the most valuable tool you bring into a contest.",
    "sections": [
      {
        "heading": "The six steps, in order",
        "blocks": [
          {
            "p": "Every tabular contest problem looks the same from above. You read the data. You split it. You build a baseline. You preprocess. You train and validate. You write the submission."
          },
          {
            "p": "The order isn't a suggestion. Each step assumes the previous one was done correctly, and two of them are easy to swap when you're rushing: splitting and preprocessing. Swap those and your local score becomes a lie, which you only discover on the private leaderboard."
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
            "p": "The first thing after reading is checking that the data looks the way you think it does. How many rows, which columns, what type each one is, what the target looks like. This isn't full analysis, that comes in the next module. It's just confirming you didn't read the file wrong."
          },
          {
            "code": "import pandas as pd\n\ntrain = pd.read_csv(\"train.csv\")\ntest = pd.read_csv(\"test.csv\")\n\nprint(train.shape, test.shape)\nprint(train.dtypes)\nprint(train[\"target\"].value_counts())"
          },
          {
            "p": "Compare the train columns against the test ones. The difference between them is, almost always, the target column itself. If anything else is missing, that's something to understand before moving on."
          }
        ]
      },
      {
        "heading": "Step 2: split before you touch anything",
        "blocks": [
          {
            "p": "This is where most points are lost. You need a slice of the data the model has never seen, so you can honestly estimate how good it is. The split happens before any transformation."
          },
          {
            "code": "from sklearn.model_selection import train_test_split\n\nX = train.drop(columns=[\"target\"])\ny = train[\"target\"]\n\nX_tr, X_val, y_tr, y_val = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)"
          },
          {
            "p": "The stratify argument keeps the same class proportions in both halves. Without it, on an imbalanced problem you can land a validation set that contains none of the rare class at all, and the score becomes meaningless."
          },
          {
            "note": "A fixed random_state means the same split repeats on every run. Without it your score shifts between runs and you can no longer tell whether a change helped or you got lucky."
          }
        ]
      },
      {
        "heading": "Step 3: the dumb but honest baseline",
        "blocks": [
          {
            "p": "Before any serious model, build a stupid one. Always predict the majority class, or the mean, and measure. That number is your floor: any model that doesn't beat it is worse than nothing."
          },
          {
            "code": "from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import f1_score\n\ndummy = DummyClassifier(strategy=\"most_frequent\").fit(X_tr, y_tr)\nprint(f1_score(y_val, dummy.predict(X_val), average=\"macro\"))"
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
            "p": "The preprocessing rule: parameters (mean, deviation, categories) are learned only on the training data. The problem is that, done by hand, this rule is easy to break."
          },
          {
            "p": "The fix is Pipeline. You bind preprocessing to the model in a single object, and when you call fit on it, scikit-learn makes sure the transformations only learn from what you hand it for training."
          },
          {
            "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.ensemble import RandomForestClassifier\n\nnumeric = X_tr.select_dtypes(include=\"number\").columns\ncategorical = X_tr.select_dtypes(exclude=\"number\").columns\n\npre = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"median\")),\n        (\"sc\", StandardScaler()),\n    ]), numeric),\n    (\"cat\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"oh\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), categorical),\n])\n\nmodel = Pipeline([(\"pre\", pre), (\"clf\", RandomForestClassifier(random_state=42))])"
          },
          {
            "p": "The handle_unknown argument matters in a contest: if a category shows up in test that wasn't in training, without it your code crashes at prediction time, exactly when you have no time to debug."
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
            "p": "At the end you retrain on all the training data, not just the eighty percent slice. You used validation to choose; now there's no reason to throw those examples away."
          },
          {
            "code": "model.fit(X, y)\npred = model.predict(test)\n\nsub = pd.DataFrame({\"id\": test[\"id\"], \"target\": pred})\nsub.to_csv(\"submission.csv\", index=False)"
          },
          {
            "p": "Before uploading, three checks that have saved many contests: the row count matches the test file, the column names are exactly what the statement asks for, and there are no missing values in the predictions."
          },
          {
            "code": "assert len(sub) == len(test)\nassert list(sub.columns) == [\"id\", \"target\"]\nassert sub[\"target\"].isna().sum() == 0"
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
            "p": "The reverse order, where you spend two hours on a good model and only then start on the submission, is the most common way to finish a contest with zero points for code that almost worked."
          }
        ]
      }
    ],
    "pitfalls": [
      "You scale or impute on the whole set, then split. The validation score comes out optimistic and false.",
      "You optimize a different metric than the one in the statement.",
      "You forget handle_unknown and the code crashes on a new category in test.",
      "You submit the file without checking the row count and column names.",
      "You stay on the eighty percent slice for the final submission instead of retraining on everything."
    ],
    "practice": [
      "Take an archive problem from MLCompete and write the pipeline end to end in an hour, with a simple model.",
      "Run the same pipeline once with scaling before the split and once after, and compare the validation scores.",
      "Write yourself a template notebook with the six steps, to copy at the start of any problem."
    ],
    "keyTakeaways": [
      "The order of the steps matters more than the choice of model.",
      "You split before any transformation, otherwise your local score lies.",
      "The dumb baseline is the reference point without which you can't tell if your model is good.",
      "Pipeline makes information leakage hard to commit by accident.",
      "The first valid submission happens in the first hour, not at the end."
    ]
  },
  {
    "moduleCode": "S6",
    "duration": "~2 weeks",
    "objective": "You look at the data before you train, and you prepare it correctly for a model, without introducing data leakage.",
    "intro": "Before you train anything, look at the data. At the distributions, at what's missing, at how the columns are scaled. It sounds dull, but half the gain comes from here, not from the model you pick. This step is called EDA, exploratory data analysis, and it's the first thing you do on any new problem.",
    "sections": [
      {
        "heading": "What you look for when you look at data",
        "blocks": [
          {
            "p": "EDA means asking the data simple questions and looking at the answer before you draw any conclusion. How many rows and columns there are. What type each column is. What the target looks like, meaning what you want to predict. What's missing and how much."
          },
          {
            "p": "Plot the distribution of each numeric column with a histogram. You see straight away whether it's symmetric, whether it has a long tail, whether it has impossible values (an age of 200, a negative price). Those are signs of errors in the data that you catch by eye."
          },
          {
            "code": "df[\"age\"].hist(bins=30)\ndf[\"target\"].value_counts()     # how many examples in each class"
          }
        ]
      },
      {
        "heading": "Imbalanced classes: why it matters early",
        "blocks": [
          {
            "p": "If you predict a class that shows up in 2% of cases (fraud, a rare disease), a model that always says no gets 98% accuracy and is completely useless. That's why you look at class balance from the start: it changes which metric you use and how you split the data."
          },
          {
            "note": "When a class is rare, accuracy lies. Keep it in mind for the evaluation module: you'll need precision, recall and F1, not plain accuracy."
          }
        ]
      },
      {
        "heading": "Correlations: which columns say the same thing",
        "blocks": [
          {
            "p": "Correlation measures how much two columns move together, from -1 (opposite) through 0 (not at all) up to 1 (same trend). Two nearly identical columns tell you something: maybe one is derived from the other, maybe you can drop one without losing information."
          },
          {
            "code": "df.corr(numeric_only=True)     # the correlation matrix between columns"
          },
          {
            "p": "Correlation isn't causation. Two things can rise together without one causing the other. It's just a hint of where to look, not a conclusion."
          }
        ]
      },
      {
        "heading": "Missing values: first why, then how",
        "blocks": [
          {
            "p": "Before you fill a missing value, ask yourself why it's missing. Sometimes the gap is a collection error. Other times the gap is information itself: an empty income field can mean the person refused to answer, which is meaningful. In that case, add a separate column that flags the gap."
          },
          {
            "p": "Filling (imputing) is done with the mean, the median or the most frequent value, or with a model. The median is safer than the mean when there are outliers, because it isn't dragged by the extreme values."
          },
          {
            "code": "from sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy=\"median\").fit(X_train)\nX_train = imp.transform(X_train)\nX_val = imp.transform(X_val)    # the same parameters, learned on train"
          }
        ]
      },
      {
        "heading": "Scaling: why and how",
        "blocks": [
          {
            "p": "Many models measure distances (kNN, K-Means) or use gradients (regression, neural nets). For them, a column with large values (income, in thousands) dominates one with small values (age, in tens) purely by scale, not by importance. Scaling brings them to the same measure."
          },
          {
            "formula": "z = (x - μ) / σ",
            "explain": "Standardization: you subtract the mean μ and divide by the standard deviation σ. The result has mean 0 and standard deviation 1."
          },
          {
            "p": "Min-max normalization, on the other hand, brings the values into the 0 to 1 range. Standardization is used more often. What matters isn't which, but the rule below."
          },
          {
            "note": "The golden rule, true for all preprocessing: learn the parameters (mean, deviation, median) only on the training set, then apply them to validation and test. Never the other way. Otherwise the test leaks into training and your score is a lie."
          },
          {
            "code": "from sklearn.preprocessing import StandardScaler\nsc = StandardScaler().fit(X_train)      # learn μ and σ on TRAIN\nX_train = sc.transform(X_train)\nX_val = sc.transform(X_val)             # apply the same μ and σ"
          }
        ]
      },
      {
        "heading": "Categorical variables",
        "blocks": [
          {
            "p": "A model wants numbers, but many columns are categories: city, color, type. You can't hand them over directly as text, and you can't number them 1,2,3 at random either, because the model would think 3 is bigger than 1, which makes no sense for colors."
          },
          {
            "p": "One-hot encoding fixes this: it turns each category into a separate column of 0s and 1s. Red becomes [1,0,0], green [0,1,0]. No category is bigger than another."
          },
          {
            "code": "pd.get_dummies(df, columns=[\"city\", \"color\"])"
          }
        ]
      }
    ],
    "pitfalls": [
      "You scale or impute on the whole set before the split. That's a data leak, the most common mistake.",
      "You fill missing values with a mean computed including the test set.",
      "You number the categories 1,2,3 and the model believes there's an order that doesn't exist."
    ],
    "practice": [
      "Make a completeness report on a dataset and decide which columns you keep.",
      "Compare three imputation strategies (mean, median, most frequent) on the same problem.",
      "Standardize correctly: fit on train, transform on val, and check the means on train are close to 0."
    ],
    "keyTakeaways": [
      "EDA means looking at the data (distributions, gaps, class balance) before any model.",
      "Imbalanced classes change the metric and the way you split the data.",
      "Ask why a value is missing before you fill it; sometimes the gap is information.",
      "Scaling brings columns to the same measure for distance-based or gradient-based models.",
      "Learn the preprocessing parameters only on train, apply them to val/test."
    ]
  },
  {
    "moduleCode": "S8",
    "duration": "~3 weeks",
    "objective": "You pick and train classic classification and regression models, and you understand what each one optimizes, not just how to call it.",
    "intro": "Here you learn the basic tools of supervised learning: linear and logistic regression, Naïve Bayes, decision trees, SVM. Supervised means you have examples with the correct answer (labels) and the model learns from them. Don't stop at how you call them from scikit-learn. Understand what each one optimizes and when it fits, because that's what lets you choose well at the contest.",
    "sections": [
      {
        "heading": "What training a model means",
        "blocks": [
          {
            "p": "A model has some parameters (internal numbers) it adjusts so it's wrong as little as possible on the training examples. The measure of the error is called the cost function, or loss. Training means finding the parameters that minimize the loss."
          },
          {
            "p": "In scikit-learn the pattern is always the same: you create the model, train it with fit on the training data, then predict with predict on new data. Simple on the surface, but under the hood each model does something different."
          },
          {
            "code": "model = LogisticRegression()\nmodel.fit(X_train, y_train)     # learn the parameters\ny_pred = model.predict(X_val)   # predict on new data"
          }
        ]
      },
      {
        "heading": "Linear regression: predicting a number",
        "blocks": [
          {
            "p": "Linear regression predicts a continuous value (a price, a temperature) as a linear combination of the features. It looks for the line (or the plane, in more dimensions) that passes best through the data."
          },
          {
            "formula": "ŷ = w₁x₁ + w₂x₂ + ... + b",
            "explain": "Each feature x has a weight w that says how much it counts. b is the intercept. The model learns the w's and b."
          },
          {
            "p": "It minimizes the squared error: the sum of the squared differences between prediction and truth. The square punishes big mistakes harder. A big advantage of linear regression: you can read the coefficients. A large positive w means that feature pushes the prediction up."
          }
        ]
      },
      {
        "heading": "Logistic regression: predicting a class",
        "blocks": [
          {
            "p": "Despite the name, logistic regression is for classification, not regression. It takes the same linear combination and passes it through a sigmoid, which squeezes any number into the 0 to 1 range. The result is a probability: how sure the model is that the example is in the positive class."
          },
          {
            "formula": "σ(z) = 1 / (1 + e^(-z))",
            "explain": "The sigmoid: it turns the linear score z into a probability between 0 and 1."
          },
          {
            "p": "From the probability you make the decision with a threshold. The threshold isn't necessarily 0.5. If you care more about catching all the positive cases (high recall), you lower it. If you want to be sure when you say positive (high precision), you raise it. The threshold is a knob you tune to the problem's metric."
          },
          {
            "code": "m = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nproba = m.predict_proba(X_val)[:, 1]   # probability of the positive class\npred = (proba > 0.3).astype(int)       # threshold moved to 0.3 for higher recall"
          }
        ]
      },
      {
        "heading": "Naïve Bayes: fast and surprisingly good",
        "blocks": [
          {
            "p": "Naïve Bayes applies Bayes' theorem while assuming, naively, that the features are independent of each other. The assumption is almost always false, but the model often works very well, especially on text. It's fast, needs little data, and is a baseline that's hard to beat at document classification."
          }
        ]
      },
      {
        "heading": "Decision trees",
        "blocks": [
          {
            "p": "A decision tree asks simple questions, one after another, like a game of 20 questions: is the age over 30? is the income below a value? At each step it splits the data to separate the classes as well as possible. The measure of the separation is Gini impurity or entropy: how mixed the classes are in a node."
          },
          {
            "p": "Trees are easy to read and don't need scaling. Their problem: left to grow without limit, they memorize the training set down to the last example and generalize badly on new data. That's called overfitting. You limit it by setting a maximum depth or a minimum number of examples per leaf."
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
            "p": "An SVM (support vector machine) looks for the boundary between classes that leaves the widest margin on either side, meaning it's as far as possible from the nearest examples of each class. The idea is that a wide-margin boundary generalizes better."
          },
          {
            "p": "When the data can't be separated with a straight line, the kernel trick steps in: it projects the data into a higher-dimensional space, where it becomes separable, without computing that space explicitly. The RBF kernel is the most used. SVM needs scaled data to work well."
          }
        ]
      }
    ],
    "pitfalls": [
      "You read the regression coefficients without having scaled the features.",
      "You let the tree grow without limit and wonder why it's perfect on training and weak on validation.",
      "You use SVM on unscaled data and it works inexplicably badly."
    ],
    "practice": [
      "Compare logistic regression, a tree and an SVM on the same tabular problem, with the same metric.",
      "Move the logistic regression threshold down from 0.5 and watch recall rise and precision fall.",
      "Limit a tree's depth and see the training score come closer to the validation one."
    ],
    "keyTakeaways": [
      "Training = finding the parameters that minimize the cost function.",
      "Linear regression predicts numbers and gives readable coefficients; logistic predicts class probabilities.",
      "The logistic regression threshold is tuned to the metric, it's not fixed at 0.5.",
      "Trees are readable but overfit without a depth limit.",
      "SVM maximizes the margin; the kernel lets it separate non-linear data."
    ]
  },
  {
    "moduleCode": "S11",
    "duration": "~2 weeks",
    "objective": "You measure a model correctly and avoid fooling yourself, so your local score predicts the real score on the hidden leaderboard.",
    "intro": "This is where the contest is won or lost. A model that looks good on the public leaderboard can be weak on the hidden one, which is what counts at the end. This module is about having justified trust in your score. It's the least flashy part and the one that makes the difference between a top 10 and a mid-table finish.",
    "sections": [
      {
        "heading": "Why accuracy lies to you",
        "blocks": [
          {
            "p": "Accuracy is the share of correct predictions. It sounds reasonable, but on imbalanced classes it's misleading. If 98% of the examples are the no class, a model that always says no gets 98% accuracy and zero value. That's why you need metrics that look at each class separately."
          }
        ]
      },
      {
        "heading": "The confusion matrix: the foundation",
        "blocks": [
          {
            "p": "The confusion matrix counts the four kinds of outcome for a binary classification. It's the basis every other metric is computed from, so it's worth understanding well."
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
            "p": "Which one hurts more depends on the problem. For a disease test, a false negative (a sick person sent home) is worse than a false positive. For a spam filter, it's the other way around. The right metric reflects the real cost of each kind of mistake."
          }
        ]
      },
      {
        "heading": "Precision, recall, F1",
        "blocks": [
          {
            "formula": "precision = TP / (TP + FP)",
            "explain": "Of all the ones you called positive, how many really were. High precision = few false alarms."
          },
          {
            "formula": "recall = TP / (TP + FN)",
            "explain": "Of all the ones that really were positive, how many you caught. High recall = you miss few."
          },
          {
            "p": "Precision and recall pull in opposite directions. If you say positive only when you're very sure, precision goes up but recall goes down. If you say positive often, it's the reverse. F1 reconciles them into a single number, their harmonic mean, which is small if either of them is small."
          },
          {
            "formula": "F1 = 2 · (precision · recall) / (precision + recall)",
            "explain": "The harmonic mean. It punishes imbalance: you can't have a high F1 with a tiny recall."
          },
          {
            "note": "With many classes, F1 is aggregated. Macro-F1 averages over classes treating them equally (good when you care about the rare ones). Weighted-F1 accounts for each class's size. Read in the rules which one is scored and optimize exactly that."
          }
        ]
      },
      {
        "heading": "Validation without leaks",
        "blocks": [
          {
            "p": "Data leakage is when, without meaning to, information from the test set makes it into training. The result: a great local score that collapses on the real leaderboard. It's the sneakiest way to lose points, because everything looks fine."
          },
          {
            "p": "You defend against it by splitting the data correctly. Keep a validation set the model doesn't see during training and use it to estimate the real score. Better, use k-fold: you split the data into k parts, train on k-1 and test on one, rotating, then average. That way you use all the data and get a more stable estimate."
          },
          {
            "p": "When the classes are imbalanced, use stratified k-fold, which keeps the class proportions in each fold. Otherwise a fold might not contain the rare class at all. When the data has time or groups (the same patient in several rows), the split has to respect them, otherwise the model peeks."
          },
          {
            "code": "from sklearn.model_selection import StratifiedKFold, cross_val_score\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\nscores = cross_val_score(model, X, y, cv=cv, scoring=\"f1_macro\")\nprint(scores.mean(), scores.std())"
          }
        ]
      },
      {
        "heading": "Bias, variance and the learning curve",
        "blocks": [
          {
            "p": "Two opposite diseases. High bias (underfitting): the model is too simple, it does badly on both training and validation. High variance (overfitting): the model is too complex, it does great on training but badly on validation, because it memorized."
          },
          {
            "p": "The learning curve diagnoses them: you plot the training score and the validation score as you add more data. If both are low and close together, you have bias, you need a stronger model. If there's a big gap between them, you have variance, you need more data or regularization."
          }
        ]
      },
      {
        "heading": "The two final submissions",
        "blocks": [
          {
            "note": "The golden rule: at the end, choose your two submissions on purpose. One on your best local score (the validation), one on your best public leaderboard. If local and public agree, trust it. If they differ a lot, you have a leak or a bad split. Don't leave your final submissions to be whatever you sent last out of reflex."
          }
        ]
      }
    ],
    "pitfalls": [
      "You optimize on the public leaderboard and end up having overfit it.",
      "Non-stratified k-fold on rare classes: some folds don't contain the class at all.",
      "You report accuracy on an imbalanced problem and think the model is good."
    ],
    "practice": [
      "Plot a learning curve and decide whether the model suffers from bias or variance.",
      "Find a data leak in a given pipeline and fix it.",
      "Compute precision, recall and F1 by hand from a given confusion matrix."
    ],
    "keyTakeaways": [
      "Accuracy lies on imbalanced classes; use precision, recall, F1.",
      "The confusion matrix (TP, TN, FP, FN) is the basis of all metrics.",
      "Precision and recall fight each other; F1 reconciles them.",
      "Stratified k-fold estimates the score stably, with no leaks.",
      "The learning curve tells bias (underfitting) from variance (overfitting).",
      "Choose your two final submissions: one on local, one on public."
    ]
  },
  {
    "moduleCode": "S13",
    "duration": "~1 week",
    "objective": "You combine models through bagging and boosting and tune the hyperparameters that matter, in the right order.",
    "intro": "The winner on a tabular problem is often an ensemble, not a single model. The idea is simple and powerful: several models together are wrong less often than one alone, as long as they're wrong in different places. This module gives you the two big recipes, bagging and boosting, and the discipline to tune the parameters without getting lost.",
    "sections": [
      {
        "heading": "Why combining works",
        "blocks": [
          {
            "p": "If you have three models that are each wrong in different places, the majority vote is better than any one of them: where one is wrong, the other two correct it. The key is diversity. Three models that make exactly the same mistakes don't help at all when combined."
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
            "p": "Bagging means you train each model on a random sample (with replacement) of the data, then average the predictions. A single deep tree has high variance (it overfits). By averaging many trees trained on different data, the variance drops without the bias going up."
          },
          {
            "p": "Random Forest is bagging on trees, with one extra trick: at each split, the tree chooses from a random subset of features. That makes the trees even more different from each other. It's robust, hard to break, and an excellent first model on tabular data."
          },
          {
            "code": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=400, max_depth=None, n_jobs=-1)\nrf.fit(X_train, y_train)"
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
            "p": "XGBoost and LightGBM are the fast, go-to implementations. They're more powerful than Random Forest, but also easier to push into overfitting, so they need careful tuning. Check the contest rules first: external libraries aren't allowed at every stage."
          }
        ]
      },
      {
        "heading": "Tuning the hyperparameters, in order",
        "blocks": [
          {
            "p": "Hyperparameters are the settings you choose before training (how many trees, how deep), as opposed to the parameters the model learns on its own. The classic mistake is to tune dozens at once and lose track of what helped. Go in order, one thing at a time."
          },
          {
            "steps": [
              "Start with a small-to-moderate learning rate and a reasonable number of trees.",
              "Tune the tree depth first (the complexity of each one).",
              "Then the number of trees (n_estimators), with early stopping on validation.",
              "Finally, lower the learning rate and raise the number of trees proportionally, for a bit more score."
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
            "p": "Stacking goes further: it trains a final model that learns how to combine the others' predictions. It's stronger, but also easier to leak into if you don't use out-of-fold predictions. Start with simple voting, move to stacking only if you have time."
          }
        ]
      }
    ],
    "pitfalls": [
      "You tune dozens of hyperparameters at once and can't tell what helped.",
      "You trust feature importance as if it were absolute truth.",
      "You use external boosting at a stage where the rules don't allow it."
    ],
    "practice": [
      "Train a Random Forest and a gradient boosting model on the same problem and compare the scores.",
      "Do a vote across three different models and see if it beats the best single model.",
      "Tune the learning rate with early stopping and watch the time-versus-score trade-off."
    ],
    "keyTakeaways": [
      "Ensembles work when the models are wrong in different ways; diversity is the key.",
      "Bagging (Random Forest) cuts variance by averaging trees trained on different data.",
      "Boosting (XGBoost, LightGBM) builds trees that fix each other's mistakes in turn.",
      "Tune hyperparameters in order: depth, then number of trees, then learning rate.",
      "Voting across different models often beats the best single model."
    ]
  },
  {
    "moduleCode": "S14",
    "duration": "~1 week",
    "objective": "You group unlabeled data and reduce dimensionality for visualization and preprocessing.",
    "intro": "Not every problem has labels. Sometimes you just want to see the structure in the data: natural groups, outliers, a two-dimensional projection you can draw. That's unsupervised learning: the model finds patterns without being told the correct answer. It's useful both on its own and as a preparation step before a supervised model.",
    "sections": [
      {
        "heading": "Supervised vs unsupervised",
        "blocks": [
          {
            "p": "In supervised learning you had (example, label) pairs and learned to predict the label. In unsupervised learning you only have the examples, no answer. The model looks for structure on its own: which points are similar, along which directions the data varies most. You can't measure correctness as simply, because you have nothing to compare against."
          }
        ]
      },
      {
        "heading": "K-Means: grouping around centers",
        "blocks": [
          {
            "p": "K-Means splits the data into k groups, each with a center. Each point is assigned to the nearest center, then the centers move to the mean of their points, and it repeats until it stabilizes. Simple, fast, but you have to choose k yourself and it's sensitive to scale."
          },
          {
            "p": "How do you choose k? The elbow method: you run it for several values of k and plot how tight the groups are. Where the curve bends like an elbow, you have a reasonable k. The silhouette score is a numeric alternative, it measures how well the groups separate."
          },
          {
            "note": "K-Means measures distances, so scaling is mandatory. Without it, the column with the largest numbers dominates the grouping and the rest doesn't count."
          },
          {
            "code": "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=4, n_init=10, random_state=0)\nlabels = km.fit_predict(X_scaled)"
          }
        ]
      },
      {
        "heading": "DBSCAN and hierarchical clustering",
        "blocks": [
          {
            "p": "DBSCAN groups by density: where points are packed together they form a group, and isolated points it marks as noise. Advantages: you don't have to give the number of groups and it finds the outliers on its own. It depends on two parameters, the neighborhood radius and the minimum number of neighbors, which you have to tune."
          },
          {
            "p": "Hierarchical clustering builds a tree of groups, from each point separate up to one big group. You draw it as a dendrogram and cut it at the level that gives you the number of groups you want. Useful when you want to see structure at several levels."
          }
        ]
      },
      {
        "heading": "PCA: dimensionality reduction",
        "blocks": [
          {
            "p": "When you have tens or hundreds of columns, it's hard to visualize and models suffer (the curse of dimensionality). PCA (principal component analysis) finds the directions the data varies most along and projects onto them, keeping as much information as possible in fewer dimensions."
          },
          {
            "p": "PCA tells you how much of the variance you keep with each component. You can go from 100 columns down to 10 that keep, say, 95% of the information. It's useful as preprocessing before a model, not just as a drawing. It needs scaled data."
          },
          {
            "code": "from sklearn.decomposition import PCA\np = PCA(n_components=0.95).fit(X_scaled)   # keep 95% of the variance\nX_reduced = p.transform(X_scaled)\nprint(X_reduced.shape[1], \"components\")"
          }
        ]
      },
      {
        "heading": "t-SNE and UMAP: for visualization only",
        "blocks": [
          {
            "p": "t-SNE and UMAP make 2D projections that look nice and bring out groups. They're excellent for looking at the structure of the data. But they have an important catch: the distances and group sizes in the drawing aren't trustworthy. Two groups close together in the picture aren't necessarily close in reality."
          },
          {
            "note": "Use t-SNE and UMAP to look, not to draw hard conclusions. For trustworthy preprocessing, PCA is the safe choice."
          }
        ]
      }
    ],
    "pitfalls": [
      "K-Means on unscaled data: the column with big numbers dominates everything.",
      "You read the distances in a t-SNE plot as if they were real.",
      "You choose k at random with no elbow or silhouette."
    ],
    "practice": [
      "Apply K-Means and DBSCAN to the same dataset and compare the groups found.",
      "Reduce to 2D with PCA and with UMAP and see what differs between them.",
      "Use the elbow method to choose k on a dataset and justify the choice."
    ],
    "keyTakeaways": [
      "Unsupervised = finding structure with no labels (groups, directions of variation).",
      "K-Means needs you to choose k and scaled data; pick k with the elbow or the silhouette.",
      "DBSCAN finds the number of groups and the outliers on its own, by density.",
      "PCA reduces dimensions while keeping variance; good as preprocessing too.",
      "t-SNE and UMAP are for looking only, the distances in them aren't trustworthy."
    ]
  },
  {
    "moduleCode": "S15",
    "duration": "~2 weeks",
    "objective": "You solve state-space search problems with BFS, DFS, A*, minimax and CSP, and you know when each one fits.",
    "intro": "This part of AI has no training data. You have a start state, a goal, and some allowed moves. The question is how you reach the goal efficiently. It's algorithmic, almost like a programming contest, and it shows up in puzzle, planning and game problems. You solve it with data structures, not with models.",
    "sections": [
      {
        "heading": "State space: the common language",
        "blocks": [
          {
            "p": "Every search problem is described the same way: a start state, a set of actions that lead from one state to another, a goal test that says whether you've arrived, and optionally a cost on each move. A maze: the state is your position, the actions are the steps in the four directions, the goal is the exit."
          },
          {
            "p": "All the states you can reach form a graph, where the nodes are states and the edges are moves. Search means exploring that graph cleverly, without building all of it, because it's usually enormous."
          },
          {
            "note": "Always mark the states you've visited. Without that you go around in circles forever, revisiting the same states. It's the most common cause of a search that never ends."
          }
        ]
      },
      {
        "heading": "Uninformed search: BFS, DFS, uniform cost",
        "blocks": [
          {
            "p": "Uninformed search explores blindly, with no idea where the goal is. BFS (breadth-first search) explores level by level, using a queue. It always finds the path with the fewest moves, but it uses a lot of memory. DFS (depth-first search) goes as far as it can down one path, with a stack. It uses little memory, but it may not find the shortest path and can get lost deep down."
          },
          {
            "p": "Uniform cost (Dijkstra) is like BFS, but it accounts for move costs: it always expands the state with the lowest total cost so far. When moves have different costs, it finds the cheapest path, not the shortest by number of steps."
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
            "p": "A* is the star of the module. It adds a heuristic, meaning an estimate of the distance left to the goal, so it heads straight for the target instead of exploring blindly. It combines the cost already paid with the estimate of what's left to pay."
          },
          {
            "formula": "f(n) = g(n) + h(n)",
            "explain": "g(n) = the real cost from start to state n. h(n) = the estimate (the heuristic) from n to the goal. A* always expands the state with the lowest f."
          },
          {
            "p": "For A* to guarantee the optimal path, the heuristic has to be admissible: it must never overestimate the real distance left. If h is admissible, A* can't miss the optimal solution. If it overestimates, it may find a path, but not necessarily the shortest one."
          },
          {
            "p": "Classic heuristics for puzzles: Manhattan distance (the sum of the horizontal and vertical differences) and the number of misplaced tiles. Both never overestimate, so they're admissible."
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
            "p": "The tree grows explosively: every move opens up many others. Alpha-beta pruning cuts the branches that can't change the result anyway, without losing correctness. With it you reach deeper in the same compute time."
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
            "p": "You solve them with backtracking: you assign a value, move on, and if you get stuck you go back and try something else. Without improvements, it's slow. Two techniques speed it up a lot:"
          },
          {
            "list": [
              "Forward checking: after each assignment, you remove from the neighbors the values that are no longer possible. You catch dead ends early.",
              "MRV (minimum remaining values): you always pick the variable with the fewest values left. You attack the most constrained part first, where a contradiction is more likely."
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "A non-admissible heuristic in A*: you find a solution, but not the optimal one.",
      "You forget to mark visited states and fall into infinite loops.",
      "You run minimax with no depth limit on a big game and run out of time."
    ],
    "practice": [
      "Implement A* for the 8-puzzle with two heuristics (Manhattan and misplaced tiles) and compare the number of states expanded.",
      "Solve a map coloring as a CSP with forward checking and MRV.",
      "Write minimax with alpha-beta for tic-tac-toe and check it never loses."
    ],
    "keyTakeaways": [
      "Every search is described the same way: start, actions, goal test, cost.",
      "BFS gives the fewest-steps path, DFS saves memory, uniform cost gives the lowest-cost path.",
      "A* uses f = g + h; with an admissible heuristic, it finds the optimal solution.",
      "Minimax picks the move against an optimal opponent; alpha-beta does it faster without changing the result.",
      "CSPs are solved with backtracking plus forward checking and MRV."
    ]
  },
  {
    "moduleCode": "S16",
    "duration": "~1 week",
    "objective": "You turn text into vectors and train a solid text classifier, with no neural networks.",
    "intro": "You can do serious NLP without deep learning. TF-IDF plus a linear model solves many text classification problems, fast, explainable, and it's a baseline that's hard to beat. Before you bring out the heavy artillery, build this. Often it's enough, and it's always the reference you judge any more complicated model against.",
    "sections": [
      {
        "heading": "The problem: models want numbers, you have text",
        "blocks": [
          {
            "p": "A mathematical model works with numbers, but text is a string of characters. All of classic NLP is about how you turn text into vectors of numbers that keep the meaning, so you can put an ordinary model on top. The steps are: you clean the text, cut it into units, turn it into numbers."
          }
        ]
      },
      {
        "heading": "Text preprocessing",
        "blocks": [
          {
            "p": "Tokenization cuts the text into units, usually words. Then you remove stopwords, the very frequent, contentless words (and, or, of, the), which only add noise. Lemmatization brings words back to their base form: went, going, gone become go, so the model doesn't treat them as completely different things."
          },
          {
            "note": "For Romanian, watch out for diacritics and the rich inflection. The same word appears written with and without diacritics and in many forms. Normalize consistently (for example, treat ș and s the same), otherwise you lose matches and spread the signal across separate forms."
          }
        ]
      },
      {
        "heading": "Bag-of-words and TF-IDF",
        "blocks": [
          {
            "p": "Bag-of-words represents a document by how many times each word from the vocabulary appears, ignoring the order. Simple, but common words (which show up everywhere) drown the signal, because they get big numbers without being informative."
          },
          {
            "p": "TF-IDF fixes this by weighting each word by two things: how often it appears in the document (TF, term frequency) and how rare it is across the other documents (IDF, inverse document frequency). A word that appears often in one document but rarely elsewhere gets a high weight, because it's characteristic of that document."
          },
          {
            "formula": "tf-idf(word, doc) = tf(word, doc) · log(N / df(word))",
            "explain": "tf = how many times the word appears in the document. N = the total number of documents. df = in how many documents the word appears. Ubiquitous words get an IDF close to 0."
          },
          {
            "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)\nX = vec.fit_transform(train_texts)      # fit ONLY on train\nX_val = vec.transform(val_texts)        # transform on val",
            "caption": "ngram_range=(1,2) also catches word pairs, not just single words."
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
            "p": "For search and text matching, you use cosine similarity: the angle between two document vectors. The smaller the angle, the closer the texts are in content. It's the basis of simple search engines and of finding duplicates."
          }
        ]
      }
    ],
    "pitfalls": [
      "You forget about Romanian: you treat diacritics inconsistently and lose matches.",
      "You build the vocabulary (fit) on the whole set, including the test. A leak.",
      "You jump straight to neural nets without first building the TF-IDF baseline to compare against."
    ],
    "practice": [
      "Classify Romanian texts with TF-IDF and logistic regression, fitting only on train.",
      "Find the two closest documents in a set using cosine similarity.",
      "Compare plain bag-of-words with TF-IDF on the same problem and see the difference."
    ],
    "keyTakeaways": [
      "Classic NLP = you turn text into vectors, then put an ordinary model on top.",
      "Preprocessing: tokenization, stopwords, lemmatization; for Romanian watch diacritics and inflection.",
      "TF-IDF weights words: high if they're characteristic, low if they're everywhere.",
      "Naïve Bayes and logistic regression over TF-IDF are a baseline that's hard to beat.",
      "Cosine similarity measures how close two texts are."
    ]
  },
  {
    "moduleCode": "S17",
    "duration": "~1 week",
    "objective": "You work with images as tensors and apply augmentation suited to the problem, without breaking the label.",
    "intro": "An image is just a tensor of numbers. Before neural nets, it's worth understanding what you do with it: how you represent it, what a convolution filter is, and which augmentation helps without breaking the label. This module is the bridge to CNNs: if you understand the image as a tensor and convolution by hand, the convolutional layers later aren't magic anymore.",
    "sections": [
      {
        "heading": "The image as a tensor",
        "blocks": [
          {
            "p": "A tensor is a grid of numbers with several dimensions, the generalization of a matrix. A grayscale image is a 2D matrix: each number is the intensity of a pixel. A color image is a 3D tensor: height, width and 3 channels (red, green, blue). Each color pixel is three numbers."
          },
          {
            "note": "Watch out for the dtype and the range. Pixels come either as integers from 0 to 255, or as decimals from 0 to 1. Don't mix them: a model trained on 0 to 1 gets garbage if you feed it 0 to 255. Normalizing to the same range is your first concern."
          },
          {
            "code": "img.shape       # (H, W, 3): height, width, 3 color channels\nimg = img / 255.0   # bring it from 0..255 to 0..1"
          }
        ]
      },
      {
        "heading": "Convolution: filters that slide over the image",
        "blocks": [
          {
            "p": "A convolution filter is a small matrix (say 3x3) that you slide over the image. At each position, you multiply the filter with the patch of image under it and add up. The result is a new image that brings out a certain pattern: edges, blur, contrast."
          },
          {
            "p": "It's worth writing a few classic filters by hand once. Blur averages the neighbors (smooths). Sharpen accentuates differences. Sobel detects edges, where intensity changes abruptly. Once you've written them, you understand exactly what a convolutional layer in a network does: the same operation, only the filters are learned, not written by you."
          },
          {
            "code": "sobel_x = np.array([[-1, 0, 1],\n                    [-2, 0, 2],\n                    [-1, 0, 1]])\n# you slide sobel_x over the image to pull out the vertical edges"
          }
        ]
      },
      {
        "heading": "Data augmentation",
        "blocks": [
          {
            "p": "When you have few images, the model memorizes. Augmentation artificially grows the set by creating variants of the images: you flip them, rotate them, crop them, shift the colors a bit. The model sees the same label in slightly different forms and learns to generalize, not to memorize."
          },
          {
            "list": [
              "Horizontal flip: mirrors the image left to right.",
              "Random rotation and crop: change the position and the framing.",
              "Color jitter: slightly varies the brightness and color.",
              "Cutout: covers a random patch, forcing the model not to rely on a single detail."
            ]
          },
          {
            "note": "The golden rule of augmentation: it has to keep the label. A horizontal flip of a cat is still a cat, so it's valid. But for the digit 2 or the letter b, the flip changes the meaning, so it's NOT valid. Always ask whether the transform would change the correct answer."
          }
        ]
      }
    ],
    "pitfalls": [
      "Augmentations that change the meaning: a flip on characters, big rotations on objects with a fixed orientation.",
      "You mix intensity ranges and the model gets inconsistent data.",
      "You augment the validation set too, not just training. Validation stays clean."
    ],
    "practice": [
      "Write a Sobel filter by hand and apply it to an image to pull out the edges.",
      "Test whether a set of augmentations improves the score on a small classification problem.",
      "Take a list of augmentations and decide for each whether it keeps the label on a digit problem."
    ],
    "keyTakeaways": [
      "An image is a tensor: 2D grayscale, 3D color (H, W, channels).",
      "Watch the range: 0..255 integer or 0..1 decimal, don't mix them.",
      "Convolution slides a small filter over the image; it's exactly what CNN layers do, with learned filters.",
      "Augmentation grows the set and fights overfitting.",
      "Valid augmentation keeps the label; a flip on digits or letters breaks it."
    ]
  },
  {
    "moduleCode": "S18",
    "duration": "~1 week",
    "objective": "You understand backpropagation from the ground up and build a simple network in PyTorch, knowing what each line does.",
    "intro": "This is where deep learning starts. A neural network is a chain of layers, and training is adjusting the weights so the error goes down. The key to the module is understanding what backpropagation does, not just calling it. Once you get how the gradient flows back through the network, the rest of deep learning becomes tuning, not mystery.",
    "sections": [
      {
        "heading": "From perceptron to network",
        "blocks": [
          {
            "p": "A perceptron, the basic brick, takes the inputs, multiplies them by some weights, adds a bias term, and passes the result through an activation function. On its own, it only learns linear boundaries, just like logistic regression."
          },
          {
            "p": "The power shows up when you stack many layers of neurons one after another: an MLP (multilayer perceptron). Each layer transforms the output of the one before. With layers and non-linear activations between them, the network can learn relationships of any complexity. Without non-linearity, however many layers you stack collapse into a single one."
          },
          {
            "p": "The activation function brings the non-linearity. ReLU (keep the positive, cut the negative to zero) is the most used, it's simple and trains fast. Sigmoid and tanh are still used, but ReLU is the default choice in the hidden layers."
          }
        ]
      },
      {
        "heading": "The cost function and the gradient",
        "blocks": [
          {
            "p": "Training needs a measure of the error: the cost function (loss). For regression, the squared error. For classification, cross-entropy, which punishes confident wrong answers hard. The goal is to find the weights that make the loss as small as possible."
          },
          {
            "p": "How? The gradient of the loss with respect to each weight tells you which direction to move the weight to increase the loss; you go the opposite way. The idea is called gradient descent: step by step, you go down the slope toward the minimum."
          },
          {
            "formula": "w ← w - η · ∂L/∂w",
            "explain": "Each weight w moves a small step (learning rate η) in the direction opposite to the gradient ∂L/∂w. You repeat thousands of times."
          }
        ]
      },
      {
        "heading": "Backpropagation: the chain rule",
        "blocks": [
          {
            "p": "A network is a chain of operations. To find the gradient of the loss with respect to a weight in the first layer, you apply the chain rule from calculus: you multiply the gradients step by step, from the output back toward the input. That's backpropagation, the backward propagation of the error."
          },
          {
            "p": "Concretely: each operation in the network knows how to pass its gradient backward. You start from the loss, go back layer by layer, and at the end you have the gradient for every weight in the network, in a single pass. That's what makes training large networks efficient."
          },
          {
            "note": "Backpropagation computes the gradients. It does NOT update the weights. The update is done by the optimizer, in a separate step. This mix-up is common, remember they're two different things."
          }
        ]
      },
      {
        "heading": "PyTorch: what it looks like in code",
        "blocks": [
          {
            "p": "PyTorch works with tensors that keep track of their gradient automatically. You define the network as an nn.Module, wrap the data in a Dataset and a DataLoader (which hands it over in batches), and at each step you do four things, always in the same order."
          },
          {
            "steps": [
              "Pass the data through the model and compute the loss (forward).",
              "loss.backward(): backpropagation computes the gradients.",
              "optimizer.step(): the optimizer updates the weights with the gradients.",
              "optimizer.zero_grad(): you clear the gradients, so they don't add up at the next step."
            ]
          },
          {
            "code": "for x, y in dataloader:\n    pred = model(x)                # forward\n    loss = criterion(pred, y)\n    loss.backward()                # compute the gradients\n    optimizer.step()               # update the weights\n    optimizer.zero_grad()          # clear for the next step"
          }
        ]
      }
    ],
    "pitfalls": [
      "You forget optimizer.zero_grad() and the gradients add up from one step to the next.",
      "You think .backward() trains the model. It only computes gradients, the optimizer takes the step.",
      "You stack linear layers with no activations between them and wonder why it learns nothing non-linear."
    ],
    "practice": [
      "Work out backpropagation by hand for a network with one hidden layer, on paper.",
      "Train an MLP on a small dataset in PyTorch and watch the loss go down.",
      "Deliberately remove zero_grad() and see how the training goes haywire."
    ],
    "keyTakeaways": [
      "An MLP is layers of neurons with non-linear activations between them; without non-linearity it collapses to one layer.",
      "ReLU is the default activation in the hidden layers.",
      "Training = gradient descent: you move the weights opposite the loss gradient.",
      "Backpropagation is the chain rule applied backward through the network; it computes the gradients.",
      "In PyTorch: forward, backward, step, zero_grad, in that order."
    ]
  },
  {
    "moduleCode": "S19",
    "duration": "~1 week",
    "objective": "You write the training loop yourself and tune the optimizer, learning rate and regularization, so the model learns stably.",
    "intro": "A good model trained badly doesn't learn. This module is about the training loop: how you choose the optimizer, how you tune the learning rate (the most important knob), and how you keep overfitting under control. The same layers, trained carefully or carelessly, give completely different results.",
    "sections": [
      {
        "heading": "Epochs, batches, steps",
        "blocks": [
          {
            "p": "Three words to lock in. A batch is a small group of examples you process at once. An epoch is one full pass through the whole training set. A step is one weight update, meaning one batch processed. You usually train for many epochs, each with many steps."
          },
          {
            "p": "Why batches and not the whole set at once? Because it's faster and adds useful noise that helps the model not get stuck. Why not one example at a time? Because batches use the hardware better. A batch size between 32 and 256 is typical."
          }
        ]
      },
      {
        "heading": "Optimizers",
        "blocks": [
          {
            "p": "The optimizer decides how it uses the gradients to update the weights. SGD (stochastic gradient descent) with momentum is solid and reliable: momentum adds inertia, like a ball rolling, so it gets over small bumps."
          },
          {
            "p": "Adam and AdamW adapt on their own: they take bigger steps where needed and smaller ones where not. They start more easily and need less tuning, which is why they're the default for many. AdamW handles weight decay more correctly. Start with Adam/AdamW if you're not sure."
          }
        ]
      },
      {
        "heading": "Learning rate, the most important knob",
        "blocks": [
          {
            "p": "The learning rate (η) is the step size at each update. It's the most important hyperparameter in all of deep learning. Too big: the loss jumps around chaotically or explodes, the model diverges. Too small: it learns painfully slowly or gets stuck before reaching anywhere good."
          },
          {
            "p": "Don't guess it, search for it. Try values on a logarithmic scale (for example 0.1, 0.01, 0.001) and look at the loss curve. You want the largest learning rate where the loss still drops smoothly, not chaotically."
          },
          {
            "p": "Schedulers change the learning rate during training. A recipe that often works: a short warmup at the start (you raise the rate gradually, so you don't destabilize it), followed by a smooth decay (cosine) toward the end, to settle finely into the minimum."
          },
          {
            "note": "If training goes haywire or the loss becomes NaN, the first thing you try is lowering the learning rate. Most of the time that's the cause."
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
              "Dropout: during training, it randomly switches off part of the neurons at each step. It forces the network not to rely on a single path, so it generalizes better.",
              "Weight decay: penalizes large weights, keeping them small and the model simple.",
              "Batch normalization: normalizes the activations in each batch, stabilizes and speeds up training.",
              "Early stopping: you stop when the validation score starts getting worse, even if the training one is still dropping."
            ]
          },
          {
            "p": "Weight initialization matters more than it seems at first. Weights started badly can block training from the start. Luckily, PyTorch layers have good default initializations, so you rarely need to step in, but it's worth knowing it's a factor."
          }
        ]
      }
    ],
    "pitfalls": [
      "You look for bigger architectures when the learning rate is actually wrong.",
      "You let training run long after the validation score started rising.",
      "You see a NaN loss and change the architecture instead of first lowering the learning rate."
    ],
    "practice": [
      "Test three learning rates on a logarithmic scale and draw the loss curves.",
      "Add dropout and early stopping to a network and see the effect on validation.",
      "Compare SGD with momentum and Adam on the same small problem."
    ],
    "keyTakeaways": [
      "Batch, epoch, step: one batch processed = one step; one pass through the whole set = one epoch.",
      "Adam/AdamW start easily and need little tuning; SGD with momentum is solid.",
      "The learning rate is the most important knob; search for it on a logarithmic scale.",
      "Warmup plus cosine decay is a good scheduler recipe.",
      "Dropout, weight decay, batch norm and early stopping keep overfitting in check."
    ]
  },
  {
    "moduleCode": "S20",
    "duration": "~1 week",
    "objective": "You debug a network that won't learn systematically, instead of changing things at random.",
    "intro": "Sooner or later, a network refuses to learn: the loss stays put, or the score is at guessing level. Panicking and changing things at random doesn't help. You have a checklist, in order, from simple to complex. Most of the time the problem is trivial and it's near the top of the list.",
    "sections": [
      {
        "heading": "The test that solves half the cases",
        "blocks": [
          {
            "p": "Before anything, check whether the model can overfit 10 examples. You take ten examples, turn off all regularization, and train until it should memorize them perfectly. If the loss gets close to zero, the learning machinery works and the problem is elsewhere (data, too aggressive regularization)."
          },
          {
            "note": "If the model can't reach a near-zero loss even on ten examples, you have a BUG, not a capacity or data problem. There's no point training longer or making the network bigger. Something is broken in the code, the data or the wiring."
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
              "Learning rate: too big (chaotic loss or NaN) or too small (nothing moves). Try another value first.",
              "Data normalization: are the inputs scaled? A network struggles with data on huge or inconsistent ranges.",
              "Labels: are they aligned correctly with the inputs? Did you shuffle the order? Do you have the right loss function for the type of problem?",
              "zero_grad: are you calling optimizer.zero_grad() at each step? Without it, the gradients add up and training goes haywire.",
              "Initialization and gradients: check whether the gradients explode (become huge) or vanish (become zero). Batch norm and good initialization help."
            ]
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
            "list": [
              "Flat loss from the start: learning doesn't kick off. Most often the learning rate or the data.",
              "Loss that explodes or becomes NaN: learning rate too big or exploding gradients.",
              "Training loss drops, validation loss rises: overfitting, add regularization.",
              "Noisy but decreasing loss: probably normal, maybe a batch size that's too small."
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "You blame the architecture when the data isn't normalized.",
      "You train for hours hoping it fixes itself.",
      "You change five things at once and can't tell which was the problem."
    ],
    "practice": [
      "Take a network that won't learn and find the cause by going through the list, one step at a time.",
      "Reproduce overfitting on 10 examples as a sanity check before the real training.",
      "Draw a few loss curves (good and bad) and learn to recognize them by shape."
    ],
    "keyTakeaways": [
      "First test: can the model overfit 10 examples? If not, it's a bug.",
      "Debug in order: learning rate, normalization, labels, zero_grad, gradients.",
      "Don't change things at random; go down the list, one thing at a time.",
      "The loss curve tells you the cause: flat shape, explosion, or a train-validation gap."
    ]
  },
  {
    "moduleCode": "S21",
    "duration": "~1 week",
    "objective": "You understand how a convolutional network works and the classic architectures, and you can compute the sizes.",
    "intro": "CNNs (convolutional networks) are the tools for images. Instead of connecting every pixel to every neuron, which would be enormous, they use small filters that slide over the image. That's how they learn local features (edges, corners, then shapes) efficiently and with few weights. You saw convolution by hand in S17; here the network learns it on its own.",
    "sections": [
      {
        "heading": "Why not a plain MLP on images",
        "blocks": [
          {
            "p": "If you connected every pixel of a 224x224 color image to every neuron, you'd have hundreds of thousands of weights in the first layer alone. Too many: a huge, slow model that overfits immediately. On top of that, an MLP treats each pixel independently and loses the fact that neighboring pixels form structures."
          },
          {
            "p": "CNNs exploit two ideas. Locality: the useful features (an edge) are local, so a small filter is enough. Weight sharing: the same filter slides over the whole image, so an edge is recognized wherever it appears, with the same weights. Few weights, a lot of power."
          }
        ]
      },
      {
        "heading": "The convolutional layer: kernel, stride, padding",
        "blocks": [
          {
            "p": "A convolutional layer applies several learned filters over the input, each producing a feature map that highlights a certain pattern. Three settings define how the filter slides."
          },
          {
            "list": [
              "Kernel: the size of the filter (usually 3x3). How big the sliding window is.",
              "Stride: how far the filter jumps at each step. Stride 2 jumps two at a time, shrinking the output.",
              "Padding: how much you pad the edges with zeros, so the output doesn't shrink too fast and the corners count."
            ]
          },
          {
            "p": "You need to know how to compute the output size, otherwise you can't wire the layers together correctly. It's a simple formula you apply for each layer."
          },
          {
            "formula": "output = (input - kernel + 2·padding) / stride + 1",
            "explain": "For an input of 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. The size is kept."
          }
        ]
      },
      {
        "heading": "Pooling and the receptive field",
        "blocks": [
          {
            "p": "Pooling shrinks the feature map, taking for example the maximum of each 2x2 window (max pooling). It reduces the size, so the computation, and grows the receptive field: how much of the original image a neuron sees. The upper layers, with a large receptive field, see whole shapes, not just edges."
          },
          {
            "p": "Global average pooling is a clean alternative to the dense layers at the end: it averages each feature map into a single number. It has fewer weights and overfits less than large dense layers."
          }
        ]
      },
      {
        "heading": "Classic architectures and ResNet",
        "blocks": [
          {
            "p": "The classic pattern of a CNN: you alternate convolutional and pooling layers, which extract more and more abstract features, then at the end a classification head that gives the class. LeNet (digits) and VGG (stacks of 3x3 convolutions) are the historical starting points."
          },
          {
            "p": "The problem with very deep networks: the gradient vanishes on the way back through many layers, and the network stops learning. ResNet solved this with residual connections: a shortcut that skips a few layers and adds the input to the output. The gradient can flow straight through the shortcut, so networks of tens or hundreds of layers become trainable. Most modern image models start from here."
          },
          {
            "note": "The residual connection is the idea to remember from this module. Without it, very deep networks don't learn. With it, depth becomes an advantage, not a bottleneck."
          }
        ]
      }
    ],
    "pitfalls": [
      "You get the size calculation wrong and the layers don't fit together.",
      "Deep networks with no residual connections: the gradient vanishes and it doesn't learn.",
      "You put huge dense layers at the end and overfit; global average pooling is cleaner."
    ],
    "practice": [
      "Compute the output sizes for a small convolutional network on paper, layer by layer.",
      "Train a simple convolutional network on a small image dataset.",
      "Add a residual connection to a network and compare training with and without it."
    ],
    "keyTakeaways": [
      "CNNs use small shared filters: few weights, they recognize features wherever they appear.",
      "The convolutional layer has kernel, stride, padding; the output is computed with a simple formula.",
      "Pooling shrinks the map and grows the receptive field.",
      "The pattern: convolutions plus pooling for features, then a classification head.",
      "Residual connections (ResNet) let the gradient pass through deep networks."
    ]
  },
  {
    "moduleCode": "S22",
    "duration": "~1 week",
    "objective": "You use pretrained models and adapt them to your problem, to get good scores with little data.",
    "intro": "You rarely train an image network from scratch. You take a model already trained on millions of images (ImageNet) and adapt it to your problem. With little data, that's the difference between a good score and a miserable one. The model has already learned to see edges, textures and shapes; you just reorient it toward your classes.",
    "sections": [
      {
        "heading": "Why transfer works",
        "blocks": [
          {
            "p": "A CNN trained on many images learns general features in the lower layers: edges, corners, textures. These are useful for almost any image problem, not just the one it was trained on. The upper layers learn specific features (shapes of dogs, of cars). The transfer idea: you keep the general part and rewrite only the specific part."
          },
          {
            "p": "That way, instead of training millions of weights from scratch, with millions of images you don't have, you use what the model already learned and train only a little, with little data. It's the most practical technique in all of image deep learning."
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
              "Fine-tuning: you also unfreeze the upper layers of the network and train them with a small learning rate, to nudge them toward your problem. Stronger, suited to when you have somewhat more data."
            ]
          },
          {
            "code": "from torchvision import models\nimport torch.nn as nn\n\nnet = models.resnet18(weights=\"DEFAULT\")\nfor p in net.parameters():\n    p.requires_grad = False          # freeze everything (feature extraction)\nnet.fc = nn.Linear(net.fc.in_features, NUM_CLASSES)   # new, trainable head"
          }
        ]
      },
      {
        "heading": "Normalization: the same as at training",
        "blocks": [
          {
            "p": "A pretrained model saw images normalized in a certain way: subtracted and divided by the ImageNet statistics (the means and deviations on the three channels). If you feed it images normalized differently, the input doesn't look like what it saw at training and it works badly, sometimes inexplicably badly."
          },
          {
            "note": "When you use a pretrained model, normalize the images exactly with the statistics it was trained on (for ImageNet, the known means and standard deviations). It's a silent, common mistake."
          }
        ]
      },
      {
        "heading": "A small learning rate for fine-tuning",
        "blocks": [
          {
            "p": "In fine-tuning, the pretrained layers already have good weights. If you train them with a large learning rate, the big steps break exactly the valuable features you wanted to keep. Use a small learning rate for them, sometimes even smaller than for the new head. That way you nudge them finely, not destroy them."
          }
        ]
      }
    ],
    "pitfalls": [
      "You forget the ImageNet normalization and the pretrained model works badly for no apparent reason.",
      "Fine-tuning with a large learning rate: you break the already-good features.",
      "You fine-tune the whole model with very little data and overfit; feature extraction is better."
    ],
    "practice": [
      "Adapt a ResNet to a problem with few images through feature extraction.",
      "Compare feature extraction with fine-tuning on the same set and see when each is worth it.",
      "Check what happens to the score if you drop the correct image normalization."
    ],
    "keyTakeaways": [
      "Pretrained models have learned general features reusable on other problems.",
      "Feature extraction (freeze everything, train only the head) is for very little data.",
      "Fine-tuning (unfreeze the upper layers, small learning rate) is for somewhat more data.",
      "Normalize the images with the same statistics as at pretraining (ImageNet).",
      "A large learning rate in fine-tuning breaks the good features already learned."
    ]
  },
  {
    "moduleCode": "S23",
    "duration": "~1 week",
    "objective": "You represent words as dense vectors that carry meaning and understand how networks process sequences of text.",
    "intro": "One-hot treats every word as something isolated: dog and cat are as different as dog and television. Embeddings put words into a space where closeness means close meaning. It's the idea all of modern NLP rests on. This module gives you the intuition, so the big models later aren't magic.",
    "sections": [
      {
        "heading": "The problem with one-hot representation",
        "blocks": [
          {
            "p": "In classic NLP (S16), a word was a position in a huge vector of zeros with a single 1. The problem: all the vectors are equally far from each other. The model has no way to know that king and queen are related, or that good and excellent are close. The meaning is lost completely."
          },
          {
            "p": "The vectors are also enormous (as big as the vocabulary, tens of thousands of dimensions) and sparse (almost all zeros). Inefficient and with no semantic meaning. Embeddings solve both problems."
          }
        ]
      },
      {
        "heading": "Embeddings: meaning as position in space",
        "blocks": [
          {
            "p": "An embedding is a dense, short vector (say 100-300 numbers), learned for each word, so that words with close meaning have close vectors. They're learned from contexts: words that appear in similar contexts get similar vectors. Dog and cat both appear next to food, fur, animal, so they end up close."
          },
          {
            "p": "Word2Vec learns such vectors in two variants: skip-gram (from a word you predict the context) or CBOW (from the context you predict the word). A famous result: vector arithmetic works. The vector king minus man plus woman lands close to queen. Meaning becomes geometry."
          },
          {
            "formula": "vec(king) - vec(man) + vec(woman) ≈ vec(queen)",
            "explain": "Meaning relations become directions in space. The man-woman difference is the same direction as king-queen."
          }
        ]
      },
      {
        "heading": "FastText: important for Romanian",
        "blocks": [
          {
            "p": "Word2Vec treats each word as a whole. FastText goes by subwords (pieces of letters): it represents a word from its fragments. That matters a lot for Romanian, with its rich inflection. Merg, mergem, mergeau share subwords, so they get related vectors, even if one of the forms is rare or unseen at training."
          },
          {
            "note": "For Romanian, prefer FastText or embeddings that use subwords. Models that treat each inflected form as a completely separate word lose the links and get stuck on the rare forms."
          },
          {
            "p": "You can use pretrained vectors (ready-trained Word2Vec, FastText, GloVe) as feature extractors, without training anything: you take the word vectors and put a simple model on top. With little data, it's much better than starting from scratch."
          }
        ]
      },
      {
        "heading": "Sequences: RNN, LSTM, GRU",
        "blocks": [
          {
            "p": "An embedding gives a word meaning, but a sentence is a sequence where order matters. Recurrent networks (RNN) process the text word by word, holding a state that summarizes what they've seen so far. The problem: on long sequences, the gradient vanishes and the network forgets the start of the sentence."
          },
          {
            "p": "LSTM and GRU solve this with gates: mechanisms that decide what information they keep, what they forget and what they let through. That way they can hold context from further back. You don't have to implement them from scratch, but understand conceptually why they work: the gates protect important information from being erased step by step."
          },
          {
            "p": "RNNs and LSTMs have largely been replaced by transformers in top-end NLP, but they stay important for understanding the idea of sequence processing and the long-range memory problem, which is exactly what transformers came to solve better."
          }
        ]
      }
    ],
    "pitfalls": [
      "For Romanian you use vectors that ignore subwords and lose the inflected forms.",
      "You expect a plain RNN to remember the context from 200 words ago.",
      "You train embeddings from scratch with little data instead of using pretrained ones."
    ],
    "practice": [
      "Explore vector arithmetic (king - man + woman) on a set of pretrained embeddings.",
      "Compare FastText with Word2Vec on inflected Romanian words.",
      "Use pretrained embeddings as features and put a logistic regression on top."
    ],
    "keyTakeaways": [
      "One-hot loses the meaning; all words are equally far apart.",
      "Embeddings are dense vectors where closeness = close meaning, learned from context.",
      "Word-vector arithmetic works: meaning relations become directions.",
      "FastText uses subwords, essential for Romanian's rich inflection.",
      "RNNs process sequences but forget over long ranges; LSTM/GRU hold on with gates."
    ]
  },
  {
    "moduleCode": "S24",
    "duration": "~1 week",
    "objective": "You solve tabular reinforcement learning problems and recognize the sources of bias and the fairness issues.",
    "intro": "Reinforcement learning is required in the upper grades. An agent learns what to do from rewards, by trial and error, without being told the correct answer at every step. At the end we also reach ethics: models can be unfair to certain groups, and it's worth knowing why it happens and how it's measured.",
    "sections": [
      {
        "heading": "What's different about RL",
        "blocks": [
          {
            "p": "In supervised learning you had the correct answer for every example. In RL you don't. The agent takes actions in an environment, gets rewards (positive or negative), and has to learn on its own which sequence of actions brings the largest reward in the long run. The challenge: a good action now may only bring the reward many steps later."
          },
          {
            "p": "A classic example: an agent in a grid-world (a map of cells) has to reach a target while avoiding traps. It isn't told the path; it gets a small negative reward at each step and a big positive one at the target, and learns the good path on its own."
          }
        ]
      },
      {
        "heading": "MDP: the language of RL",
        "blocks": [
          {
            "p": "An MDP (Markov decision process) describes the problem formally. It has states (where the agent can be), actions (what it can do), rewards (what it gets), a discount factor (how much the future counts against the present), and a policy (the rule the agent chooses its action by in each state). The goal: find the policy that maximizes the expected total reward."
          },
          {
            "p": "Two functions measure how well you're doing. V(s) says how good a state is (how much reward you expect from there on). Q(s,a) says how good a state-action pair is (how much reward you expect if you take action a in state s, then play well). The Bellman equations link them recursively: the value of a state depends on the values of the next states."
          }
        ]
      },
      {
        "heading": "Tabular Q-learning",
        "blocks": [
          {
            "p": "Q-learning learns the Q function from experience, holding a table with one value for each state-action pair. After each action, it updates the value in the table, moving it closer to the reward received plus the best value in the next state. With enough tries, the table converges and the good policy comes out: in each state, you pick the action with the highest Q."
          },
          {
            "formula": "Q(s,a) ← Q(s,a) + α · [r + γ · max Q(s',a') - Q(s,a)]",
            "explain": "α = the learning rate, r = the reward, γ = the discount factor, s' = the next state. You move Q toward the real reward plus the future value."
          },
          {
            "p": "A central dilemma: exploration versus exploitation. If the agent always picks what looks best now (exploitation), it may miss a better path it hasn't tried. If it explores too much, it wastes time. The ε-greedy strategy balances it: with probability ε it takes a random action (exploration), otherwise it picks the best one (exploitation). You usually start with a large ε and lower it gradually."
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
            "p": "A model learns from data, so it inherits the patterns in it, including the unfair ones. Bias comes in through several doors: historical data that reflects past discrimination, biased labeling, or the choice of a metric that hides the problem. A model can do well on average and badly on a subgroup, and the average hides that."
          },
          {
            "p": "That's why you measure performance on subgroups too, not just overall. Fairness has several definitions, and this is the hard part: you can't always have them all at once."
          },
          {
            "list": [
              "Demographic parity: the model gives positive outcomes in the same proportion for each group.",
              "Equal opportunity: the model has the same true positive rate for each group (it catches the real cases equally well in each group)."
            ]
          },
          {
            "p": "The two definitions can be mathematically incompatible: satisfying one, you break the other. There's no purely technical answer. The choice depends on the context and on what cost each kind of mistake has for people. What matters is to be aware of the trade-off and make it explicit, not to report only the average and hide the rest."
          }
        ]
      }
    ],
    "pitfalls": [
      "ε too small too early: the agent doesn't explore enough and stays stuck.",
      "You report only the average score and hide that the model is weak on a subgroup.",
      "You think there's a single correct definition of fairness."
    ],
    "practice": [
      "Implement Q-learning on a grid-world and watch the policy take shape.",
      "Measure a model's performance on subgroups and discuss which fairness definition you use.",
      "Vary ε (the exploration) and see how the policy the agent learns changes."
    ],
    "keyTakeaways": [
      "In RL the agent learns from rewards, not from given correct answers.",
      "An MDP has states, actions, rewards, discount and a policy; V and Q measure how well you're doing.",
      "Q-learning learns a table of values from experience and produces the good policy.",
      "ε-greedy balances exploration and exploitation; explore enough at the start.",
      "Bias comes in through data and labels; measure on subgroups, not just the average.",
      "Fairness definitions can be incompatible; the choice is contextual, not purely technical."
    ]
  }
];

export const lessonByModuleEn = (code: string): Lesson | undefined =>
  lessonsEn.find((l) => l.moduleCode === code);
