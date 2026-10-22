---
code: S20
duration: ~1 week
---

# @intro
Sooner or later, a network refuses to learn: the loss stays put, or the score is at guessing level, meaning what you'd get without looking at the data, for example by always answering the most frequent class, like the baseline from Lesson 6. Panicking and changing things at random doesn't help. You have a checklist, in order, from simple to complex. Most of the time the problem is trivial and it's near the top of the list.

## The test that solves half the cases
Before anything, check whether the model can overfit 10 examples, meaning whether it can learn them by heart (Lesson 1). You take ten examples, turn off all regularization (no dropout, no weight decay, Lesson 15), and train until it should memorize them perfectly. If the loss gets close to zero, the learning machinery works and the problem is elsewhere (data, too aggressive regularization).

The test makes sense because memorizing is the easiest thing you can ask of a network. Even a small network has hundreds of weights, and 10 examples are nothing to it. If the data reaches the model correctly, the loss is computed correctly, the gradients flow back and the optimizer moves the weights, the loss has to come down close to 0. On 10 examples, the test takes a few seconds.

```
import torch
from torch import nn

torch.manual_seed(0)
X = torch.randn(10, 5)              # 10 examples, 5 made-up features
y = torch.randint(0, 2, (10,))      # 10 random labels: 0 or 1

model = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for step in range(1, 301):
    loss = criterion(model(X), y)   # all 10 examples, at every step
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    if step in [1, 100, 200, 300]:
        print(step, round(loss.item(), 4))

print(model(X).argmax(dim=1))       # the class picked for each example
print(y)                            # the true labels
# prints:
# 1 0.6561
# 100 0.0047
# 200 0.0012
# 300 0.0006
# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])
# tensor([0, 0, 0, 0, 1, 1, 0, 0, 0, 1])
```

`torch.randn(10, 5)` gives 10 rows of 5 random numbers around 0. `torch.randint(0, 2, (10,))` gives 10 whole numbers from 0 up to 2, without 2 (as with `range`), so 0 or 1. The labels are random, so there's no rule to learn: the network can only memorize them, which is exactly what you're checking. All 10 examples go in at every step, with no DataLoader. For each example, the network gives two numbers, one score per class, and `nn.CrossEntropyLoss` turns them into probabilities (Lesson 14).

The loss starts at 0.66, close to -log(0.5) = 0.69, what you get by giving each class 50%, and gets down to 0.0006. `argmax(dim=1)` picks, for each row, the class with the higher score, and the predictions come out identical to the labels. On your own data, you run the test with your model and the first 10 rows, `X_train[:10]` and `y_train[:10]`.

> [!NOTE]
> If the model can't reach a near-zero loss even on ten examples, you have a BUG, not a capacity or data problem. Capacity is how much a model can learn, and it grows with the number of weights; for 10 examples, almost any network has enough. There's no point training longer or making the network bigger. Something is broken in the code, the data or the wiring (the way the layers are connected to each other).

## The checklist, in order
If the overfit-on-10-examples test fails, go through this list, top to bottom. These are the most common causes, roughly ordered by how often they show up.

1. Learning rate: too big (chaotic loss or NaN, the result of a calculation that got out of hand, Lesson 15) or too small (nothing moves). Try another value first, 10 times smaller or bigger.
2. Data normalization: are the inputs scaled? A network struggles with data on huge or inconsistent ranges. Standardize the columns (mean 0, standard deviation 1, Lesson 5) and bring pixels to 0..1 (Lesson 13).
3. Labels: are they aligned correctly with the inputs? Did you shuffle the order? Do you have the right loss function for the type of problem? Row i of X has to have its label on row i of y, and if you shuffle only X, the pairs break. For classes you use `nn.CrossEntropyLoss`, for numbers `nn.MSELoss`.
4. zero_grad: are you calling optimizer.zero_grad() at each step? Without it, the gradients add up and training goes haywire. In Lesson 14 you saw the gradient -6 turn into -12.
5. Initialization and gradients: check whether the gradients explode (become huge) or vanish (become zero). Batch norm and good initialization help.

Gradients explode or vanish because of the chain rule from Lesson 14: backpropagation multiplies the gradient by one factor per layer. If the factors are around 0.5, after 20 layers the gradient is multiplied by 0.5 to the power of 20, about 0.000001, and the first layers barely learn anything. If they're around 2, it's multiplied by 2 to the power of 20, about a million, and the steps throw the weights far off, all the way to NaN. To check, after `loss.backward()` you look at the size of the gradients, layer by layer:

```
torch.manual_seed(0)                # the same network as above, untrained
X = torch.randn(10, 5)
y = torch.randint(0, 2, (10,))
model = nn.Sequential(nn.Linear(5, 32), nn.ReLU(), nn.Linear(32, 2))

loss = criterion(model(X), y)
loss.backward()                     # computes the gradients, takes no step
for name, p in model.named_parameters():
    print(name, round(p.grad.abs().mean().item(), 4))
# prints:
# 0.weight 0.0087
# 0.bias 0.0119
# 2.weight 0.0539
# 2.bias 0.207
```

`named_parameters()` gives (name, tensor) pairs: `0.weight` are the weights of the layer at position 0 in `nn.Sequential`, and `2.bias` the biases of the layer at position 2. `.abs()` takes the absolute value (drops the sign), and `.mean()` takes the average. Values like 0.01 or 0.2 are normal. 0.0 in the first layers means vanishing gradients, and thousands or millions mean exploding gradients.

## How to read the loss curve
The loss curve is the main diagnostic tool. Look at it, not just the final score. Each shape tells you something different.

The curve has the loss on the vertical axis and the epochs on the horizontal one (Lesson 15), usually with two lines: one for training, one for validation. A healthy curve, on a classification with two classes, looks roughly like this from one epoch to the next: 0.69, 0.45, 0.31, 0.24, 0.21, 0.20. It drops fast at first, then more and more slowly, and levels off, with validation a little above training.

- Flat loss from the start: learning doesn't kick off. Most often the learning rate or the data. For example 0.693, 0.693, 0.692, 0.693, which is exactly -log(0.5): the model gives each class 50% and doesn't budge.
- Loss that explodes or becomes NaN: learning rate too big or exploding gradients. For example 0.69, 0.81, 3.5, 140, then nan.
- Training loss drops, validation loss rises: overfitting, add regularization. For example, training 0.60, 0.40, 0.25, 0.12, 0.05 and validation 0.62, 0.48, 0.45, 0.50, 0.61: the right moment is the validation minimum, epoch 3, where early stopping would stop you.
- Noisy but decreasing loss: probably normal, maybe a batch size that's too small. For example 0.90, 0.75, 0.82, 0.61, 0.66, 0.50: it goes up and down from one epoch to the next, but the trend is down, and small batches give noisier gradients (Lesson 15).

The code below produces the third shape with real numbers: only 10 training examples and a network far too big for them.

```
import torch
from torch import nn

torch.manual_seed(0)
X = torch.randn(110, 1)
Y = X + 0.5 * torch.randn(110, 1)        # a straight line, plus noise
X_train, y_train = X[:10], Y[:10]         # only 10 training examples
X_val, y_val = X[10:], Y[10:]             # 100 validation examples

model = nn.Sequential(nn.Linear(1, 128), nn.ReLU(),
                      nn.Linear(128, 128), nn.ReLU(),
                      nn.Linear(128, 1))  # far too big for 10 examples
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(1, 401):
    model.train()
    loss = criterion(model(X_train), y_train)
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    model.eval()
    with torch.no_grad():                 # validation is only measured
        val_loss = criterion(model(X_val), y_val).item()
    if epoch in [1, 25, 100, 200, 400]:
        print(epoch, round(loss.item(), 3), round(val_loss, 3))
# prints (epoch, training, validation):
# 1 0.749 0.628
# 25 0.082 0.203
# 100 0.059 1.142
# 200 0.048 3.949
# 400 0.025 5.119
```

At each epoch, the model takes one step on the 10 examples, then `model.eval()` and `torch.no_grad()` (Lesson 15) measure the validation loss without changing anything. Training goes down to 0.025, but validation gets to about 0.2 in the first epochs, then climbs to 5.1: the network learned the 10 points by heart, noise included. To draw the curves, at each epoch you add the two values to two lists and pass them to `plt.plot` (Lesson 4).

# @practice
- Take a network that won't learn and find the cause by going through the list, one step at a time.
- Reproduce overfitting on 10 examples as a sanity check before the real training.
- Draw a few loss curves (good and bad) and learn to recognize them by shape.
