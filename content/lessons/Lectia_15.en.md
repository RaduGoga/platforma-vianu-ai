---
code: S19
duration: ~1 week
---

# @intro
A good model trained badly doesn't learn. This module is about the training loop from Lesson 14 (forward, backward, step, zero_grad): how you choose the optimizer, how you tune the learning rate (the most important knob), and how you keep overfitting under control. Overfitting means the model has learned the training examples by heart and gets new data wrong (Lesson 1). The same layers, trained carefully or carelessly, give completely different results.

## Epochs, batches, steps
Three words to lock in. A batch is a small group of examples you process at once. An epoch is one full pass through the whole training set. A step is one weight update, meaning one batch processed. You usually train for many epochs, each with many steps.

With numbers: you have 1,000 training examples and batches of 100 (the batch size, how many examples a batch holds, is 100). One epoch has 1,000 / 100 = 10 steps. If you train for 20 epochs, you take 20 · 10 = 200 steps: the weights get updated 200 times, and each example is seen 20 times. The complete example in Lesson 14 had 200 examples, batches of 20 and 100 epochs, so 10 steps per epoch and 1,000 in total.

Why batches and not the whole set at once? Because it's faster and adds useful noise that helps the model not get stuck. Why not one example at a time? Because batches use the hardware better. A batch size between 32 and 256 is typical.

Faster, because in one pass through the data the model corrects itself 10 times, not just once. The noise comes from the fact that the gradient computed on 100 examples is only an estimate of the one on all 1,000, a little different from one batch to the next. The steps don't head perfectly straight for the minimum, they zigzag a bit, and the zigzag can knock the model out of a small dip in the loss where it would otherwise get stuck.

The hardware is the physical part of the computer. Networks are usually trained on the graphics card (GPU), which does thousands of multiplications in parallel, and with a single example most of it would sit idle. A batch of 64 examples is computed much faster than 64 examples taken one by one, just like vectorization in Lesson 4.

## Optimizers
The optimizer decides how it uses the gradients to update the weights; it's what runs `optimizer.step()` in the Lesson 14 loop. SGD (stochastic gradient descent) with momentum is solid and reliable: momentum adds inertia, like a ball rolling, so it gets over small bumps.

Plain SGD is exactly the rule from Lesson 14, w ← w - η · ∂L/∂w. Stochastic means "with some randomness in it": the gradient isn't computed on the whole set, but on a batch picked at random. With momentum, each step keeps part of the previous step, usually 90% (`momentum=0.9`). When the gradients keep pointing the same way, the steps get longer, and when they contradict each other from one batch to the next, they partly cancel out and the zigzag calms down.

Adam and AdamW adapt on their own: they take bigger steps where needed and smaller ones where not. Concretely, Adam keeps track, for each weight, of how big its gradients usually are and divides by that size, so the weights with small gradients move forward too. They start more easily and need less tuning, which is why they're the default for many. AdamW handles weight decay more correctly. Start with Adam/AdamW if you're not sure.

Weight decay pulls every weight a little toward 0 at each step, harder the bigger the weight is. You set it with a number, for example `weight_decay=0.01`. When you give Adam weight decay, it adds the shrinking to the gradient, and its adaptive steps distort it. AdamW applies it separately, directly on the weights, which is why it's more correct.

```
import torch
from torch import nn

model = nn.Linear(10, 1)      # any model; here, a single layer
sgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
adam = torch.optim.Adam(model.parameters(), lr=0.001)
adamw = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)
```

In a real program you create just one, not all three. Each one gets `model.parameters()`, the weights it moves, and `lr`, the learning rate. The values in the code are common starting points.

## Learning rate, the most important knob
The learning rate (η) is the step size at each update. It's the most important hyperparameter in all of deep learning (a hyperparameter is a setting you choose before training, Lesson 9). Too big: the loss jumps around chaotically or explodes, the model diverges. Too small: it learns painfully slowly or gets stuck before reaching anywhere good.

Diverging means that instead of getting closer to the minimum, the model moves further and further away from it, and the loss grows from one step to the next. The code below goes back to the Lesson 14 example, L(w) = (w - 3)² starting from w = 0, and takes 20 steps with three learning rates.

```
for eta in [1.1, 0.1, 0.001]:
    w = 0.0
    for step in range(20):
        w = w - eta * 2 * (w - 3)       # the step from Lesson 14
    print(eta, round((w - 3) ** 2, 4))  # the loss after 20 steps
# prints:
# 1.1 13227.9441
# 0.1 0.0012
# 0.001 8.3074
```

With 1.1, every step jumps over 3, further each time (w = 6.6, then -1.32, then 8.18), and after 20 steps the loss is over 13,000: it diverged. With 0.1 it gets to 0.0012. With 0.001 it barely moved, from 9 to 8.31.

Don't guess it, search for it. Try values on a logarithmic scale (for example 0.1, 0.01, 0.001) and look at the loss curve. You want the largest learning rate where the loss still drops smoothly, not chaotically.

On a logarithmic scale, each value is 10 times smaller than the one before. That way a few tries cover the whole useful range, from 1 down to 0.00001, while between 0.1 and 0.09 you'd barely feel a difference. The loss curve is the graph with the loss on the vertical axis and the steps or epochs on the horizontal one. It's not the learning curve from Lesson 8, where the horizontal axis was the amount of data. With a good learning rate, the curve drops fast at first, then more and more slowly, and levels off. With one that's too big, it jumps up and down or climbs. With one that's too small, it goes down almost flat.

Schedulers change the learning rate during training. A recipe that often works: a short warmup at the start (you raise the rate gradually, so you don't destabilize it), followed by a smooth decay (cosine) toward the end, to settle finely into the minimum.

Warmup: at the start the weights are random, and the first gradients can be big and chaotic. So you begin with a small step and raise it gradually, for example from 0.01 to 0.1 over the first 10 steps. Cosine: after the warmup, the learning rate goes smoothly down toward 0 following the shape of the cosine function from trigonometry, slowly at first, faster around the middle and slowly again at the end. The small steps at the end no longer jump over the minimum, they settle into it.

```
import torch
from torch import nn
from torch.optim import lr_scheduler

model = nn.Linear(10, 1)
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

# first 10 steps: warmup, lr climbs from 0.01 to 0.1
warmup = lr_scheduler.LinearLR(optimizer, start_factor=0.1, total_iters=10)
# next 90 steps: cosine, lr goes smoothly down toward 0
cosine = lr_scheduler.CosineAnnealingLR(optimizer, T_max=90)
scheduler = lr_scheduler.SequentialLR(optimizer, [warmup, cosine],
                                      milestones=[10])

for step in range(100):
    lr = scheduler.get_last_lr()[0]    # the lr used at this step
    if step in [0, 5, 10, 55, 99]:
        print(step, round(lr, 4))
    # ... forward, loss.backward() ...
    optimizer.step()
    optimizer.zero_grad()
    scheduler.step()                   # sets up the lr for the next step
# prints:
# 0 0.01
# 5 0.055
# 10 0.1
# 55 0.05
# 99 0.0
```

`LinearLR` does the warmup: it multiplies the lr by a factor that climbs from 0.1 to 1 over 10 steps. `CosineAnnealingLR` does the decay, over `T_max=90` steps. `SequentialLR` chains them: the first one until step 10 (`milestones=[10]`), then the second. `get_last_lr()` gives a list with the current lr, and `[0]` takes its first element. You call `scheduler.step()` once per step, after `optimizer.step()`. At step 99 the lr is 0.00003, which is why it shows up rounded to 0.0.

> [!NOTE]
> If training goes haywire or the loss becomes NaN, the first thing you try is lowering the learning rate. Most of the time that's the cause. NaN (not a number) is the result of a calculation that makes no sense. It shows up, for example, when the weights grow so much that they pass the largest number the computer can hold and become infinity, and the program ends up computing infinity minus infinity. Once it appears, it spreads: any calculation with NaN gives NaN, so the loss stays `nan` until the end.

## Regularization: keeping overfitting in check
Regularization is any technique that stops the model from memorizing the training set. Without it, a big network learns the examples by heart and falls apart on new data. You have several tools, often used together:

- Dropout: during training, it randomly switches off part of the neurons at each step. It forces the network not to rely on a single path, so it generalizes better, meaning it also works well on data it hasn't seen.
- Weight decay: penalizes large weights, keeping them small and the model simple. It's the shrinking toward 0 from the optimizers: with small weights, the prediction can't jump sharply for a small change in the input, so the model can't chase every detail of a single example.
- Batch normalization: normalizes the activations in each batch, stabilizes and speeds up training. The activations are the outputs of the neurons after the activation function, the numbers that pass from one layer to the next.
- Early stopping: you stop when the validation score starts getting worse, even if the training one is still dropping. You saw it with boosting, in Lesson 9.

Dropout with p = 0.5 means that, at each step, every neuron outputs 0 with a 50% chance, so on average half of them go quiet, a different half each time. At prediction time all the neurons are used, and `model.eval()` is the command that switches the model into that mode. The code below applies dropout to 8 activations equal to 1.

```
import torch
from torch import nn

torch.manual_seed(0)
drop = nn.Dropout(p=0.5)
x = torch.ones(8)          # 8 activations, all equal to 1

drop.train()               # training mode
print(drop(x))             # tensor([0., 0., 2., 0., 0., 0., 2., 2.])
print(drop(x))             # tensor([0., 2., 2., 2., 2., 0., 2., 2.])
drop.eval()                # prediction mode
print(drop(x))             # tensor([1., 1., 1., 1., 1., 1., 1., 1.])
```

At the first step 3 activations out of 8 survived, at the second 6 out of 8: half is only an average. The survivors get multiplied by 2, that is 1 / (1 - 0.5), so the sum stays the same on average as at prediction time, when nothing is switched off. On a whole model, `model.train()` and `model.eval()` switch the mode of all its layers.

Batch norm applies the standardization from Lesson 5 to each batch: it subtracts the batch's mean and divides by its standard deviation. If a neuron outputs 2, 4 and 6 on the 3 examples of a batch, after batch norm it outputs -1.22, 0 and 1.22, with mean 0 and standard deviation 1. Then the layer learns, for each neuron, two numbers it can use to stretch and shift the result. At prediction time, after `model.eval()`, it uses the mean and standard deviation gathered during training, not those of the current batch. In a network, the two layers sit like this:

```
import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(20, 64),
    nn.BatchNorm1d(64),   # normalizes the 64 activations over each batch
    nn.ReLU(),
    nn.Dropout(p=0.5),    # during training, half of them become 0 on average
    nn.Linear(64, 2),
)
```

`nn.Sequential` is a ready-made `nn.Module`: it passes the data through the layers in the order you write them, without you writing `forward`.

Early stopping with patience: the validation loss bounces around a little from one epoch to the next, so you don't stop at the first time it gets worse. You wait a number of epochs called the patience and stop only if no better validation loss showed up in all that time. With a patience of 3 and the validation loss going 0.50, 0.42, 0.38, 0.39, 0.37, 0.40, 0.41, 0.43, the best is 0.37, at epoch 5. Then come 3 epochs with nothing better, so you stop after epoch 8 and keep the weights from epoch 5. The sketch below does this in code, with a patience of 5.

```
def evaluate(model):
    model.eval()                # dropout off, batch norm in prediction mode
    with torch.no_grad():       # you only measure, no gradients
        return criterion(model(X_val), y_val).item()

best = float("inf")             # bigger than any loss
patience = 5                    # how many epochs you wait with no progress
no_progress = 0
for epoch in range(1, 201):
    train_one_epoch(model)      # the Lesson 14 loop, once through the data
    val_loss = evaluate(model)
    if val_loss < best:
        best = val_loss
        torch.save(model.state_dict(), "best.pt")
        no_progress = 0
    else:
        no_progress += 1
        if no_progress == patience:
            break               # 5 epochs in a row with no progress: stop

model.load_state_dict(torch.load("best.pt"))
```

You write `train_one_epoch` yourself: it's the Lesson 14 loop, put in a function that starts with `model.train()`. `evaluate` measures the loss on the validation data (`X_val`, `y_val`). `with torch.no_grad():` tells PyTorch to stop tracking the operations for gradients, since here you only measure. `float("inf")` is infinity, bigger than any loss, so the first epoch is sure to come out as the best so far. `model.state_dict()` is the dictionary with all the model's weights: `torch.save` writes it to a file, and at the end `load_state_dict` puts back the weights from the best epoch.

Weight initialization matters more than it seems at first. Initialization means the values the weights start with, before the first step: PyTorch picks them at random and small, which is why `torch.manual_seed` makes the results repeatable. Weights started badly can block training from the start. If all the weights of a layer started from the same value, all its neurons would compute the same thing and get the same gradient, so they'd stay copies of each other: 64 neurons acting like one. Luckily, PyTorch layers have good default initializations, so you rarely need to step in, but it's worth knowing it's a factor.

# @practice
- Test three learning rates on a logarithmic scale and draw the loss curves.
- Add dropout and early stopping to a network and see the effect on validation.
- Compare SGD with momentum and Adam on the same small problem.
