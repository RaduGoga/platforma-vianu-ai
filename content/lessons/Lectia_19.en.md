---
code: S23
duration: ~1 week
---

# @intro
One-hot (the vector of zeros with a single 1, from Lesson 5) treats every word as something isolated: dog and cat are as different as dog and television. Embeddings put words into a space where closeness means close meaning. It's the idea all of modern NLP rests on. This module gives you the intuition, so that big text models (ChatGPT, for example) aren't a mystery to you.

## The problem with one-hot representation
In classic NLP (Lesson 12), a word was a position in a huge vector of zeros with a single 1. With a vocabulary of just three words, dog, cat and television, the vectors would be dog = [1, 0, 0], cat = [0, 1, 0] and television = [0, 0, 1]. The problem: all the vectors are equally far from each other. The cosine similarity (Lesson 12) between any two of them is 0, since they never have a 1 in the same position. The model has no way to know that king and queen are related, or that good and excellent are close. The meaning is lost completely.

The vectors are also enormous (as big as the vocabulary, tens of thousands of dimensions) and sparse (almost all zeros). With a vocabulary of 50,000 words, each vector has 49,999 zeros and a single 1. Inefficient and with no information about meaning. Embeddings solve both problems: they use dense vectors, which means short and with nonzero numbers almost everywhere.

## Embeddings: meaning as position in space
An embedding is a dense, short vector (say 100-300 numbers), learned for each word, so that words with close meaning have close vectors. To see the idea, take vectors with just two numbers, points in the plane. Say that after training you have dog = [4, 3], cat = [3, 4] and television = [-3, 4]. We picked these numbers ourselves; real ones are learned and don't have such a simple meaning.

The cosine similarity is the product of the two vectors (multiply the positions pairwise and add) divided by the product of their lengths. The length of [4, 3] is √(4² + 3²) = √25 = 5, and the same goes for the other two. Dog and cat: (4 · 3 + 3 · 4) / (5 · 5) = 24 / 25 = 0.96, close to 1, so close meaning. Dog and television: (4 · (-3) + 3 · 4) / 25 = 0 / 25 = 0, nothing in common.

```
import numpy as np

def cosine(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

dog = np.array([4, 3])
cat = np.array([3, 4])
television = np.array([-3, 4])
print(cosine(dog, cat))          # 0.96
print(cosine(dog, television))   # 0.0
print(cosine(cat, television))   # 0.28
```

`a @ b` is the product described above: it multiplies the positions pairwise and adds them up, 4 · 3 + 3 · 4 = 24. `np.linalg.norm(a)` gives the length of the vector, here 5. Cat and television come out at 0.28, still far apart.

They're learned from contexts: words that appear in similar contexts get similar vectors. Dog and cat both appear next to food, fur, animal, so they end up close. A word's context is the words around it, usually the ones at most two positions away, to the left and to the right. In the sentence "my cat drinks milk in the kitchen", the context of "drinks" is "my", "cat", "milk" and "in". This window slides over millions of sentences, one word at a time.

Word2Vec learns such vectors in two variants: skip-gram (from a word you predict the context) or CBOW (from the context you predict the word). Skip-gram gets "drinks" and has to guess, one at a time, "my", "cat", "milk" and "in". CBOW does the reverse: it gets the four surrounding words and guesses "drinks". The guessing is just a pretext: after training you throw away the part that guesses and keep the vectors learned along the way.

A famous result: vector arithmetic works. The vector king minus man plus woman lands close to queen. Meaning becomes geometry.

> [!FORMULA]
> vec(king) - vec(man) + vec(woman) ≈ vec(queen)
> Meaning relations become directions in space. The man-woman difference is the same direction as king-queen.

A toy example with two numbers: the first shows how royal a word is, the second how masculine. Say king = [9, 8], man = [1, 8], woman = [1, 1] and queen = [9, 1]. Then king - man + woman = [9 - 1 + 1, 8 - 8 + 1] = [9, 1], exactly queen. The difference woman - man = [0, -7] is the same as queen - king: it's the "direction" from masculine to feminine. With real embeddings, the result only lands close to queen (hence the ≈), so you look for the word with the highest cosine similarity to it.

## FastText: important for Romanian
Word2Vec treats each word as a whole. FastText goes by subwords (pieces of letters): it builds a word's vector from its fragments. That matters a lot for Romanian, with its rich inflection: the same word changes form with person, number, tense or case. Merg, mergem, mergeau (I go, we go, they were going) share subwords, so they get related vectors, even if one of the forms is rare or unseen at training.

Concretely, FastText puts a < at the start of the word and a > at the end, so it knows where the word begins and ends, then cuts it into pieces of 3 letters. It usually uses pieces of 3 to 6 letters, but here we stick to 3.

```
def pieces(word, n=3):
    w = "<" + word + ">"
    return [w[i:i + n] for i in range(len(w) - n + 1)]

print(pieces("mergem"))   # ['<me', 'mer', 'erg', 'rge', 'gem', 'em>']
print(pieces("merg"))     # ['<me', 'mer', 'erg', 'rg>']
```

`w[i:i + n]` is a slice of n letters starting at position i (Lesson 3), and the list takes all of them, from the first position to the last. "merg" and "mergem" share their first three pieces: "<me", "mer" and "erg". A word's vector is the average of the vectors of its pieces, plus the vector of the whole word if it was seen at training. That way, even an unseen form, for example "mergeați" (you were going), gets a vector from the pieces it has.

> [!NOTE]
> For Romanian, prefer FastText or embeddings that use subwords. Models that treat each inflected form as a completely separate word lose the links and get stuck on the rare forms.

## Pretrained embeddings
You can use pretrained vectors (ready-trained Word2Vec, FastText, GloVe) as feature extractors, without training anything: you take the word vectors and put a simple model on top. Pretrained means that someone else has already trained the model on billions of words, for example on all of Wikipedia, and published the vectors. GloVe is one more method for learning word vectors, similar to Word2Vec, and FastText has ready-trained vectors for Romanian too. With little data, it's much better than starting from scratch.

To get a single row of features for a whole text, the simplest way is to average the vectors of its words. A text of 10 words, with vectors of 300 numbers, becomes a single row of 300 numbers, and on top of these rows you put a logistic regression (Lesson 7).

> [!NOTE]
> Files of pretrained vectors are big (from hundreds of MB to a few GB) and get downloaded from the internet. At the contest, the platform runs your code without internet access (Lesson 6), so you can use them only if the rules allow it and the files are already available where your code runs.

## Sequences: RNN, LSTM, GRU
An embedding gives a word meaning, but a sentence is a sequence where order matters. "The dog bit the mailman" and "the mailman bit the dog" have the same words but don't say the same thing, and a bag-of-words (Lesson 12) sees them as identical. Recurrent networks (RNN) process the text word by word, holding a state that summarizes what they've seen so far.

The state is like what you keep in your head while reading. You don't remember every word, but you know who the character is and what has happened so far, and each new word updates your summary. In an RNN, the state is a vector of numbers, say 16 of them. At each word, the network takes the word's embedding and the old state and computes the new state from them, with the same weights at every step (like the sliding filter from Lesson 17). The state after the last word sums up the whole sentence and can go into a dense layer that gives the class.

In PyTorch, `nn.Embedding` is literally a table of embeddings: one vector for each word in the vocabulary, learned together with the rest of the network. Words go in as numbers (each word's position in the vocabulary), and the table gives back their vectors.

```
import torch
import torch.nn as nn

torch.manual_seed(0)
ids = torch.randint(0, 1000, (4, 7))   # 4 sentences, 7 words each
emb = nn.Embedding(1000, 50)           # 1000 words, vectors of 50
x = emb(ids)
print(x.shape)        # torch.Size([4, 7, 50])

rnn = nn.RNN(input_size=50, hidden_size=16, batch_first=True)
outputs, state = rnn(x)
print(outputs.shape)  # torch.Size([4, 7, 16]): the state after each word
print(state.shape)    # torch.Size([1, 4, 16]): the state after the last
```

What goes in: 4 sentences of 7 words each, given as numbers between 0 and 999 (here picked at random with `torch.randint`). `nn.Embedding(1000, 50)` turns them into vectors of 50 numbers, so the shape becomes (4, 7, 50). `batch_first=True` tells the RNN that the first dimension is the batch (the sentences), followed by the words. What comes out: `outputs` holds the state after each word, 16 numbers per word, and `state` only the state after the last word. The 1 in front is the number of RNN layers stacked on top of each other, here just one.

The problem: on long sequences, the gradient vanishes and the network forgets the start of the sentence. In backpropagation (Lesson 14), the gradient flows back through every step, as if through a network with one layer per word. If it gets multiplied by 0.9 at each step, after 50 words you're left with 0.9 to the power of 50, about 0.005. It's the vanishing gradient problem (Lesson 16), the same as in the very deep networks from Lesson 17: the first words barely count in training anymore.

LSTM and GRU solve this with gates: mechanisms that decide what information they keep, what they forget and what they let through. That way they can hold context from further back. A gate is a row of numbers between 0 and 1, produced by a sigmoid (Lesson 14), that the information gets multiplied by: 0 blocks it, 1 lets it all through, and 0.5 lets half through.

Besides the state, an LSTM keeps a separate memory and has three gates. The forget gate decides what you erase from the memory, the input gate what new information you write into it, and the output gate which part of the memory you use at this step. GRU is a simpler variant with two gates, often just as good and faster.

In "Maria left home in the morning and, after a long day at school, she came back tired", the word "she" points back to "Maria", more than ten words earlier. An LSTM can keep who the subject is in its memory until then, by holding its forget gate close to 1. You don't have to implement them from scratch, but understand conceptually why they work: the gates protect important information from being erased step by step.

The LSTM's memory is updated mostly by addition, like the residual connection from Lesson 17. When the forget gate is close to 1, the memory passes almost unchanged from one word to the next, and so does the gradient. In PyTorch, `nn.LSTM` is used like `nn.RNN`, with the same arguments, except it also returns the memory: `outputs, (state, memory) = lstm(x)`.

RNNs and LSTMs have largely been replaced by transformers in top-end NLP. A transformer no longer reads word by word: it looks at all the words at once and learns, for each word, which of the others to pay attention to. The big text models, like ChatGPT, are built on this idea. RNNs still matter for understanding the idea of sequence processing and the long-range memory problem, which is exactly what transformers came to solve better.

# @practice
- Explore vector arithmetic (king - man + woman) on a set of pretrained embeddings.
- Compare FastText with Word2Vec on inflected Romanian words.
- Use pretrained embeddings as features and put a logistic regression on top.
