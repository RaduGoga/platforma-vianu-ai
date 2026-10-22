---
code: S16
duration: ~1 week
---

# @intro
NLP (natural language processing) means getting a program to work with text written by people: reviews, emails, news. You can do serious NLP without deep learning, meaning without the big neural networks from Lesson 14 on. TF-IDF is a way of turning text into numbers, which you'll build below. Together with a linear model, like the logistic regression from Lesson 7, it solves many text classification problems, fast and in a way you can explain. It's a baseline that's hard to beat (the simple model you start from, as in Lesson 6). Before you bring out the heavy artillery, build this. Often it's enough, and it's always the reference you judge any more complicated model against.

## The problem: models want numbers, you have text
A mathematical model works with numbers, but text is a string of characters. The logistic regression from Lesson 7 multiplies each feature by a weight, and "the film was great" can't be multiplied by anything.

All of classic NLP is about how you turn text into vectors of numbers that keep the meaning, so you can put an ordinary model on top. A vector here is a list of numbers of the same length for every text, like a row in a table of features, the input columns. The steps are: you clean the text, cut it into units, turn it into numbers.

## Text preprocessing
Tokenization cuts the text into units, called tokens, usually words. The simplest tokenizer is `text.lower().split()` from Lesson 3, which cuts at the spaces but leaves punctuation stuck to the words, as in `'school,'`. `re.findall(r"\w+", text.lower())`, also from Lesson 3, is better: `\w+` means "one or more letters or digits in a row", so commas and periods stay out.

Then you remove stopwords, the very frequent, contentless words (and, or, of, the), which only add noise. You put them in a set and keep only the tokens that aren't in it.

Lemmatization brings words back to their base form: went, going, gone become go, so the model doesn't treat them as completely different things. The base form, called the lemma, is the one in the dictionary: the infinitive for verbs, the singular for nouns. That takes a dictionary with every form of every word, so you do lemmatization with a library, for example spaCy, which also has a model for Romanian.

All the steps, on a single sentence: "I was walking to school, but I forgot my homework." becomes, after tokenization, `['i', 'was', 'walking', 'to', 'school', 'but', 'i', 'forgot', 'my', 'homework']`. Without stopwords (i, to, but, my) it's `['was', 'walking', 'school', 'forgot', 'homework']`, and after lemmatization `['be', 'walk', 'school', 'forget', 'homework']`.

> [!NOTE]
> For Romanian, watch out for diacritics and the rich inflection. The same word appears written with and without diacritics and in many forms. Normalize consistently (for example, treat ș and s the same), otherwise you lose matches and spread the signal across separate forms: to the model, "școală" and "scoala" are different words, and what it learns about one doesn't carry over to the other. To strip the diacritics, after lowercasing the text, you use `text.translate(str.maketrans("ăâîșț", "aaist"))`: it replaces each letter of the first string with the letter in the same position in the second.

## Bag-of-words and TF-IDF
Bag-of-words describes a document by how many times each word from the vocabulary appears, ignoring the order. A document here is any text you're processing (a sentence, a review, an email), and the vocabulary is the list of all the words that appear in the documents.

Three documents: "the film is good", "the film is very very good" and "the film is bad". The vocabulary, in alphabetical order, is bad, film, good, is, the, very. Each document becomes a vector of 6 numbers, one per vocabulary word: [0, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 2] and [1, 1, 0, 1, 1, 0]. The second one has a 2 in the place of "very", because it contains it twice.

```
from sklearn.feature_extraction.text import CountVectorizer

docs = ["the film is good",
        "the film is very very good",
        "the film is bad"]
vec = CountVectorizer()
X = vec.fit_transform(docs)
print(vec.get_feature_names_out())
# ['bad' 'film' 'good' 'is' 'the' 'very']
print(X.toarray())
# [[0 1 1 1 1 0]
#  [0 1 1 1 1 2]
#  [1 1 0 1 1 0]]
```

`CountVectorizer` does bag-of-words: `fit` learns the vocabulary, `transform` counts the words, and `fit_transform` does both at once. `get_feature_names_out()` gives you the vocabulary, the names of the columns. By default it lowercases the text. Also by default, it skips one-letter words, like "a" or "I".

The result is a sparse matrix, which stores only the numbers that aren't zero. On real texts the vocabulary has tens of thousands of words, and each vector is almost all zeros. `.toarray()` turns it into an ordinary NumPy array so you can print it.

Simple, but common words (which show up everywhere) drown the signal, because they get big numbers without being informative. In the example, "the", "film" and "is" appear in all three documents, so they don't help you tell them apart at all.

TF-IDF fixes this by weighting each word by two things: how often it appears in the document (TF, term frequency) and how rare it is across the other documents (IDF, inverse document frequency). A word that appears often in one document but rarely elsewhere gets a high weight, because it's characteristic of that document.

> [!FORMULA]
> tf-idf(word, doc) = tf(word, doc) · log(N / df(word))
> tf = how many times the word appears in the document. N = the total number of documents. df = in how many documents the word appears. Ubiquitous words get an IDF close to 0.

log is the logarithm: log(x) tells you what power you have to raise 10 to in order to get x. log(10) = 1, log(100) = 2, log(1000) = 3, so it grows very slowly, and log(1) = 0, because 10 to the power 0 is 1. For numbers between 1 and 10 it gives values between 0 and 1, for example log(3) ≈ 0.48. A word that's in every document has N / df = 1, so its IDF = log(1) = 0.

On the three documents above, N = 3. "the", "film" and "is" are in all three, so their IDF = log(3 / 3) = 0 and they vanish. "good" is in two, so its IDF = log(3 / 2) = log(1.5) ≈ 0.18. "very" and "bad" are in only one, with IDF = log(3) ≈ 0.48. In the second document, "very" has tf = 2, so tf-idf = 2 · 0.48 ≈ 0.95, and "good" has 1 · 0.18 = 0.18. The third is left with only "bad", at 0.48: exactly the word that sets it apart from the others.

TF-IDF doesn't know what words mean. "good" gets a low weight here only because it appears in two documents out of three, not because it matters less in a review.

```
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
X = vec.fit_transform(train_texts)      # fit ONLY on train
X_val = vec.transform(val_texts)        # transform on val
```
caption: ngram_range=(1,2) puts word pairs into the vocabulary, on top of the single words.

`train_texts` and `val_texts` are lists of strings, one text per element. `X` comes out as a sparse matrix, with one row per text and one column per word or word pair in the vocabulary. `TfidfVectorizer` uses a slightly adjusted version of the formula: the natural logarithm (the same idea, but with base e ≈ 2.718 instead of 10) and a 1 added in a couple of places, so a word that's everywhere doesn't drop to exactly 0. Then it scales every vector to length 1, so a long text doesn't look important just because it has many words. What the length of a vector is comes further down, with cosine similarity. Its numbers won't match the ones you work out by hand, but rare words still get the bigger weights.

An n-gram is a run of n words in a row, and `ngram_range=(1, 2)` puts both single words and pairs of neighboring words into the vocabulary. From "is not good" you get is, not, good, "is not" and "not good". The pair "not good" catches the negation, which the words lose when you take them one by one.

`min_df=2` keeps only the words that appear in at least 2 documents, the same df as in the formula. A word from a single document, like a typo, doesn't help the model generalize and only makes the vectors longer.

The vocabulary and the IDF values are parameters the vectorizer learns, like the mean and standard deviation in `StandardScaler` from Lesson 5. That's why you `fit` only on the training data and only `transform` the validation data. If you also fit on the validation texts, the IDF would use information from them, which is data leakage, and your validation score would come out better than the real one.

## Text classification
On top of the TF-IDF vectors, two models work surprisingly well: multinomial Naïve Bayes (fast, suited to word counts) and logistic regression (often the best baseline). Both are fast and explainable: you can see which words push toward each class.

Logistic regression (Lesson 7) gives every word in the vocabulary a weight. For a text, it multiplies each word's TF-IDF value by its weight and adds everything up, together with the intercept. Then it passes the sum through the sigmoid, which squeezes it into a probability between 0 and 1. A positive weight pushes toward class 1, a negative one toward class 0.

Naïve Bayes (also from Lesson 7) looks at how often each word appears in the texts of each class, and treats the words as if they had nothing to do with each other. The multinomial version is the one made for counts, like word counts.

A complete example, on eight short film reviews: four positive (label 1) and four negative (label 0). All eight are training data, and the two new sentences play the role of test data.

```
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB

texts = ["the film was wonderful",
         "good actors and a beautiful story",
         "i liked it a lot, i recommend it",
         "great directing and good actors",
         "the film was boring",
         "weak actors and a dull story",
         "i did not like it, weak actors",
         "boring and far too long"]
labels = [1, 1, 1, 1, 0, 0, 0, 0]      # 1 = positive, 0 = negative

vec = TfidfVectorizer()
X = vec.fit_transform(texts)           # 8 rows, 24 columns
model = LogisticRegression().fit(X, labels)

new = vec.transform(["wonderful films with good actors",
                     "boring films, far too long"])
print(model.predict(new))                        # [1 0]
print(model.predict_proba(new)[:, 1].round(2))   # [0.6  0.39]

nb = MultinomialNB().fit(X, labels)
print(nb.predict(new))                           # [1 0]

words = vec.get_feature_names_out()
order = model.coef_[0].argsort()      # from the smallest weight up
print(words[order[:3]])     # ['boring' 'weak' 'dull']
print(words[order[-3:]])    # ['beautiful' 'wonderful' 'good']
```

`predict` gives the class, and `predict_proba(new)[:, 1]` gives the probability of class 1 for each new text, as in Lesson 7. The probabilities are only a little above and below 0.5, because the model has seen just eight examples. "films" isn't in the vocabulary, which only has "film", so the vectorizer ignores it, along with "with". Lemmatization would have helped here, since it brings "films" and "film" to the same form.

`model.coef_[0]` holds the weights, one per vocabulary word (`[0]` because with two classes `coef_` has a single row). `argsort` from Lesson 4 orders their positions from the smallest weight to the largest, so the first three words push hardest toward negative and the last three toward positive. Naïve Bayes is used the same way: `fit` on the same data, then `predict`.

For search and text matching, you use cosine similarity: the cosine of the angle between two document vectors. The smaller the angle, the closer the texts are in content. It's the basis of simple search engines and of finding duplicates.

Take a vocabulary of just two words, "football" and "match". A text where "football" appears 3 times and "match" 4 times is the vector (3, 4), an arrow in the plane from (0, 0) to the point (3, 4). Texts that use the same words in the same proportions have arrows pointing the same way, and two texts with no word in common have perpendicular arrows. The cosine of the angle between them, from geometry, is 1 at 0° and 0 at 90°.

> [!FORMULA]
> similarity(a, b) = (a₁·b₁ + a₂·b₂) / (length(a) · length(b))
> a₁ and a₂ are the two numbers in a, how many times each word appears. length(a) = √(a₁² + a₂²), from the Pythagorean theorem. With more words in the vocabulary, you add one term per word, on top and under the square root.

For a = (3, 4) and b = (4, 3): on top you get 3·4 + 4·3 = 24, and each arrow has length √(9 + 16) = 5, so the similarity is 24 / 25 = 0.96. For a and c = (6, 8), the same text written twice: 3·6 + 4·8 = 50, the lengths are 5 and 10, so 50 / 50 = 1. The length of the text doesn't matter, only the proportions of the words. For (1, 0) and (0, 1), two texts with no words in common, the top is 0, so the similarity is 0.

TF-IDF vectors have no negative values, so the angle between two of them is between 0° and 90°, and the similarity is between 0 and 1.

```
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = ["the team won the football match",
        "the football match ended in a draw",
        "a simple apple pie recipe"]
vec = TfidfVectorizer()
X = vec.fit_transform(docs)
print(cosine_similarity(X).round(2))
# [[1.   0.45 0.  ]
#  [0.45 1.   0.  ]
#  [0.   0.   1.  ]]

query = vec.transform(["who won the match"])
print(cosine_similarity(query, X).round(2))   # [[0.8  0.36 0.  ]]
```

`cosine_similarity(X)` compares every document with every other one and gives a 3 by 3 table: row i, column j holds the similarity between documents i and j. The diagonal is 1, each document with itself. The first two are about football and score 0.45, and the recipe has no word in common with them, so 0. `.round(2)` rounds to two decimals. Search works the same way: you transform the question with the same vectorizer, compare it with every document and show the closest one first, here the first document, at 0.8.

# @practice
- Classify Romanian texts with TF-IDF and logistic regression, fitting only on train.
- Find the two closest documents in a set using cosine similarity.
- Compare plain bag-of-words with TF-IDF on the same problem and see the difference.
