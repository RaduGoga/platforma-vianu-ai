---
code: S16
duration: ~1 week
---

# @intro
You can do serious NLP without deep learning. TF-IDF plus a linear model solves many text classification problems, fast, explainable, and it's a baseline that's hard to beat. Before you bring out the heavy artillery, build this. Often it's enough, and it's always the reference you judge any more complicated model against.

## The problem: models want numbers, you have text
A mathematical model works with numbers, but text is a string of characters. All of classic NLP is about how you turn text into vectors of numbers that keep the meaning, so you can put an ordinary model on top. The steps are: you clean the text, cut it into units, turn it into numbers.

## Text preprocessing
Tokenization cuts the text into units, usually words. Then you remove stopwords, the very frequent, contentless words (and, or, of, the), which only add noise. Lemmatization brings words back to their base form: went, going, gone become go, so the model doesn't treat them as completely different things.

> [!NOTE]
> For Romanian, watch out for diacritics and the rich inflection. The same word appears written with and without diacritics and in many forms. Normalize consistently (for example, treat ș and s the same), otherwise you lose matches and spread the signal across separate forms.

## Bag-of-words and TF-IDF
Bag-of-words represents a document by how many times each word from the vocabulary appears, ignoring the order. Simple, but common words (which show up everywhere) drown the signal, because they get big numbers without being informative.

TF-IDF fixes this by weighting each word by two things: how often it appears in the document (TF, term frequency) and how rare it is across the other documents (IDF, inverse document frequency). A word that appears often in one document but rarely elsewhere gets a high weight, because it's characteristic of that document.

> [!FORMULA]
> tf-idf(word, doc) = tf(word, doc) · log(N / df(word))
> tf = how many times the word appears in the document. N = the total number of documents. df = in how many documents the word appears. Ubiquitous words get an IDF close to 0.

```
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
X = vec.fit_transform(train_texts)      # fit ONLY on train
X_val = vec.transform(val_texts)        # transform on val
```
caption: ngram_range=(1,2) also catches word pairs, not just single words.

## Text classification
On top of the TF-IDF vectors, two models work surprisingly well: multinomial Naïve Bayes (fast, suited to word counts) and logistic regression (often the best baseline). Both are fast and explainable: you can see which words push toward each class.

For search and text matching, you use cosine similarity: the angle between two document vectors. The smaller the angle, the closer the texts are in content. It's the basis of simple search engines and of finding duplicates.

# @takeaways
- Classic NLP = you turn text into vectors, then put an ordinary model on top.
- Preprocessing: tokenization, stopwords, lemmatization; for Romanian watch diacritics and inflection.
- TF-IDF weights words: high if they're characteristic, low if they're everywhere.
- Naïve Bayes and logistic regression over TF-IDF are a baseline that's hard to beat.
- Cosine similarity measures how close two texts are.

# @pitfalls
- Normalize diacritics consistently before tokenizing.
- Build the vocabulary on training data only, then apply it to test.
- Build a TF-IDF baseline first, so you have something to compare the networks against.

# @practice
- Classify Romanian texts with TF-IDF and logistic regression, fitting only on train.
- Find the two closest documents in a set using cosine similarity.
- Compare plain bag-of-words with TF-IDF on the same problem and see the difference.
