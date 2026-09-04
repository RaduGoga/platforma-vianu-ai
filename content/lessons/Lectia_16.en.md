---
code: S20
duration: ~1 week
---

# @intro
Sooner or later, a network refuses to learn: the loss stays put, or the score is at guessing level. Panicking and changing things at random doesn't help. You have a checklist, in order, from simple to complex. Most of the time the problem is trivial and it's near the top of the list.

## The test that solves half the cases
Before anything, check whether the model can overfit 10 examples. You take ten examples, turn off all regularization, and train until it should memorize them perfectly. If the loss gets close to zero, the learning machinery works and the problem is elsewhere (data, too aggressive regularization).

> [!NOTE]
> If the model can't reach a near-zero loss even on ten examples, you have a BUG, not a capacity or data problem. There's no point training longer or making the network bigger. Something is broken in the code, the data or the wiring.

## The checklist, in order
If the overfit-on-10-examples test fails, go through this list, top to bottom. These are the most common causes, roughly ordered by how often they show up.

1. Learning rate: too big (chaotic loss or NaN) or too small (nothing moves). Try another value first.
2. Data normalization: are the inputs scaled? A network struggles with data on huge or inconsistent ranges.
3. Labels: are they aligned correctly with the inputs? Did you shuffle the order? Do you have the right loss function for the type of problem?
4. zero_grad: are you calling optimizer.zero_grad() at each step? Without it, the gradients add up and training goes haywire.
5. Initialization and gradients: check whether the gradients explode (become huge) or vanish (become zero). Batch norm and good initialization help.

## How to read the loss curve
The loss curve is the main diagnostic tool. Look at it, not just the final score. Each shape tells you something different.

- Flat loss from the start: learning doesn't kick off. Most often the learning rate or the data.
- Loss that explodes or becomes NaN: learning rate too big or exploding gradients.
- Training loss drops, validation loss rises: overfitting, add regularization.
- Noisy but decreasing loss: probably normal, maybe a batch size that's too small.

# @takeaways
- First test: can the model overfit 10 examples? If not, it's a bug.
- Debug in order: learning rate, normalization, labels, zero_grad, gradients.
- Don't change things at random; go down the list, one thing at a time.
- The loss curve tells you the cause: flat shape, explosion, or a train-validation gap.

# @pitfalls
- Check that the data is normalized before blaming the architecture.
- If it doesn't learn in the first few epochs, stop and look for the bug.
- Change one thing at a time, so you know what helped.

# @practice
- Take a network that won't learn and find the cause by going through the list, one step at a time.
- Reproduce overfitting on 10 examples as a sanity check before the real training.
- Draw a few loss curves (good and bad) and learn to recognize them by shape.
