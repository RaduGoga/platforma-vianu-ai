---
code: S18
duration: ~1 week
---

# @intro
This is where deep learning starts: machine learning with neural networks that have many layers. A neural network is a chain of layers, and training is adjusting the weights so the error goes down. The weights are the numbers the network learns, like the w's in linear regression (Lesson 7). The key to the module is understanding what backpropagation does, not just calling it: it's how the network works out which way to move each weight. Once you get how the gradient flows back through the network (the gradient is the slope of the error, explained below), the rest of deep learning becomes tuning, not mystery.

## From perceptron to network
A small example: you want to guess whether a student passes a test from two input numbers: x₁ = 3 hours of studying and x₂ = 2 hours on the phone the night before. Each input has a weight that says how much it counts and in which direction: w₁ = 0.8 (studying helps), w₂ = -0.5 (the phone hurts). You also add a bias term, b = -1, the same as the intercept b in linear regression (Lesson 7); PyTorch calls it bias. The sum is z = 0.8 · 3 + (-0.5) · 2 + (-1) = 2.4 - 1 - 1 = 0.4.

Then a rule decides: if z is greater than 0, the answer is 1 (pass), otherwise it's 0 (fail). Here z = 0.4, so 1. This rule is the simplest activation function: the function that takes the sum z and gives the output.

That's what a perceptron, the basic brick, does: it takes the inputs, multiplies them by some weights, adds a bias term, and passes the result through an activation function. The weights and the bias are its parameters, the numbers it learns from examples.

> [!FORMULA]
> output = f(w₁x₁ + w₂x₂ + b)
> f is the activation function. With more inputs, you add one w · x product for each, as in linear regression.

On its own, it only learns linear boundaries, just like logistic regression. The boundary is where z = 0, here the line 0.8 · x₁ - 0.5 · x₂ - 1 = 0 in the plane with axes x₁ and x₂: the points (x₁, x₂) on one side of it get 1, the ones on the other side get 0. If the students who pass and the ones who fail can't be split by a single straight line, a perceptron can't cope.

The fix is to connect several perceptrons. In a network, each one is called a neuron. A layer is a group of neurons that get the same inputs, each with its own weights, and the outputs of one layer become the inputs of the next one.

The power shows up when you stack many layers of neurons one after another: an MLP (multilayer perceptron). Each layer transforms the output of the one before. With layers and non-linear activations between them, the network can learn relationships of any complexity. Without non-linearity, however many layers you stack collapse into a single one.

The layers between the inputs and the output layer are called hidden layers, because their values don't show up anywhere in the data. A small MLP for the test example: 2 inputs, a hidden layer of 3 neurons, one output neuron. Each hidden neuron has 2 weights and a bias, and the output neuron has 3 weights (one per hidden neuron) and a bias. In total, 3 · 3 + 4 = 13 parameters.

The collapse above is easy to see with numbers. Without an activation function, a neuron only multiplies and adds, so it's a linear function, like f(x) = ax + b in math class, whose graph is a straight line. Take two layers with one neuron each: the first computes 3x + 1, the second multiplies the result by 2. Together they give 2 · (3x + 1) = 6x + 2, still a straight line. A single neuron with weight 6 and bias 2 did exactly the same thing. However many linear layers you chain, the result stays a straight line.

The activation function brings the non-linearity. ReLU (keep the positive, cut the negative to zero) is the most used, it's simple and trains fast. Sigmoid and tanh are still used, but ReLU is the default choice in the hidden layers.

> [!FORMULA]
> ReLU(z) = max(0, z)
> Positives pass through unchanged, negatives become 0: ReLU(5) = 5, ReLU(0.4) = 0.4, ReLU(-2) = 0. The graph has a bend at 0, and out of many bends placed in different spots, one from each neuron, the network can build almost any shape.

You know the sigmoid from Lesson 7: it squeezes any number between 0 and 1, with σ(0) = 0.5, σ(2) ≈ 0.88 and σ(-2) ≈ 0.12. Tanh has the same S shape, but it squeezes numbers between -1 and 1: tanh(0) = 0, tanh(2) ≈ 0.96, tanh(-2) ≈ -0.96.

## The cost function and the gradient
Training needs a measure of the error: the cost function (loss), which you saw in Lesson 7. It's a number that says how wrong the model is, and lower is better. For regression, the squared error. For classification, cross-entropy, which punishes confident wrong answers hard. The goal is to find the weights that make the loss as small as possible.

For regression the usual choice is MSE (mean squared error): for each example you subtract the real answer from the prediction, square the difference, then take the average. If the model predicts 3 and 5 and the real answers are 2 and 8, the differences are 1 and -3, the squares 1 and 9, and MSE = (1 + 9) / 2 = 5.

For classification, the network gives a probability for each class, and they add up to 1 (it gets them with a function called softmax, which PyTorch's `nn.CrossEntropyLoss` applies for you). Cross-entropy only looks at the probability p given to the correct class.

> [!FORMULA]
> loss = -log(p)
> p is the probability the model gave to the correct class. p = 0.9 gives a loss of 0.105, p = 0.5 gives 0.69, and p = 0.1 gives 2.3.

Logarithms only come up in math in grade 10; here a few of their values are enough (it's the natural logarithm, Python's `math.log`): log(1) = 0, log(0.9) ≈ -0.105, log(0.5) ≈ -0.69, log(0.1) ≈ -2.3. The closer p gets to 0, the lower log(p) goes, and the minus in front makes the loss positive. A model that gives the correct class 0.9 pays 0.105. One that is confidently wrong, giving the correct class only 0.1, pays 2.3, almost 22 times more.

How do you find the weights that make the loss small? Take the simplest case: a model with a single weight w and the loss L(w) = (w - 3)². The loss is at its minimum, 0, when w = 3, but the model doesn't know that. It starts from w = 0, where L = (0 - 3)² = 9.

Move w up a little, to 0.1: L = (0.1 - 3)² = 8.41, so the loss went down by 0.59. Divide the change in the loss by how far w moved: -0.59 / 0.1 = -5.9. With an even smaller move, to w = 0.01, you get -5.99, closer and closer to -6. This number is the slope of the loss at w = 0: how much the loss changes for a tiny move of w, relative to the size of the move. The minus says the loss goes down when w goes up.

That slope is the gradient. For L(w) = (w - 3)², the gradient has the formula 2 · (w - 3), which comes from derivatives (math, grade 11); here you just take it as given. At w = 0 it gives 2 · (0 - 3) = -6, exactly what you found above. When the loss depends on many weights, the gradient with respect to one of them is written ∂L/∂w and read "the gradient of L with respect to w": how much L changes when you nudge only w, holding the other weights still. The ∂ sign is a rounded d that signals exactly that, that you're looking at one weight out of many.

The gradient of the loss with respect to each weight tells you which direction to move the weight to increase the loss; you go the opposite way. In the example, the gradient of -6 says the loss grows toward smaller w, so you move w up. The idea is called gradient descent: step by step, you go down the slope toward the minimum, the point where the loss is smallest.

> [!FORMULA]
> w ← w - η · ∂L/∂w
> Each weight w moves a small step (learning rate η) in the direction opposite to the gradient ∂L/∂w. You repeat thousands of times. The arrow means "gets the value", like `w = w - eta * grad` in Python. η (the Greek letter eta) is a small number, for example 0.1; you already met the learning rate with boosting, in Lesson 9.

Two steps by hand, with η = 0.1. Step 1: at w = 0 the gradient is -6, so w ← 0 - 0.1 · (-6) = 0.6, and the loss drops from 9 to (0.6 - 3)² = 5.76. Step 2: at w = 0.6 the gradient is 2 · (0.6 - 3) = -4.8, so w ← 0.6 - 0.1 · (-4.8) = 1.08, and the loss gets to 3.69. The steps shrink on their own, because the slope gets gentler as you get closer to the minimum.

```
w = 0.0
eta = 0.1                    # learning rate
for step in range(1, 31):
    grad = 2 * (w - 3)       # gradient of (w - 3) ** 2 at the point w
    w = w - eta * grad       # one descent step
    if step % 10 == 0:
        print(step, round(w, 4))
# prints:
# 10 2.6779
# 20 2.9654
# 30 2.9963
```

The code repeats the step 30 times and prints w after every tenth step: the weight gets closer to 3, so the loss (w - 3)² gets closer to 0.

## Backpropagation: the chain rule
A network is a chain of operations. To find the gradient of the loss with respect to a weight in the first layer, you apply the chain rule from calculus (also grade 11): you multiply the gradients step by step, from the output back toward the input. That's backpropagation, the backward propagation of the error.

The idea of the chain rule: rates of change multiply. Take y = 3x + 1 and L = 2 · y. If x goes up by 0.1 (from 1 to 1.1), y goes up 3 times as much, by 0.3 (from 4 to 4.3). L goes up 2 times as much as y, by 0.6 (from 8 to 8.6). So L changes 3 · 2 = 6 times as fast as x, as in the example with the layers: 2 · (3x + 1) = 6x + 2.

The same thing in a tiny network with a single weight: the input x = 2, the prediction p = w · x, the correct answer 8 and the loss L = (p - 8)². You start with w = 1, so p = 2 and L = 36. The chain has two links. The first is the gradient of L with respect to p: by the same formula as for (w - 3)², it's 2 · (p - 8) = 2 · (2 - 8) = -12. The second is how fast p changes when w changes: p = w · 2, so 2 times as fast. Multiply them: ∂L/∂w = -12 · 2 = -24. Check it with a small nudge: at w = 1.01, L drops to 35.76, that is by 0.24, 24 times the nudge of 0.01.

Concretely: each operation in the network knows how to pass its gradient backward. You start from the loss, go back layer by layer, and at the end you have the gradient for every weight in the network, in a single pass. The product computed up to one layer gets reused for the layer before it, so you don't redo the chain from scratch for every weight. That's what makes training large networks efficient.

> [!NOTE]
> Backpropagation computes the gradients. It does NOT update the weights. The update is done by the optimizer, in a separate step. The optimizer is the piece of code that applies the rule w ← w - η · ∂L/∂w, or a smarter variant of it (you'll see them in Lesson 15). This mix-up is common, remember they're two different things.

## PyTorch: what it looks like in code
PyTorch is the neural network library mentioned in Lesson 1. You install it with `pip install torch`, inside the virtual environment.

PyTorch works with tensors that keep track of their gradient automatically. A tensor (the grid of numbers from Lesson 13) looks a lot like a NumPy array from Lesson 4, with one difference: it remembers which operations produced it, so PyTorch can run backpropagation on its own.

```
import torch

w = torch.tensor(0.0, requires_grad=True)   # a weight, with a gradient
L = (w - 3) ** 2          # the loss from the slope example
L.backward()              # backpropagation: computes the gradient
print(w.grad)             # tensor(-6.)

L = (w - 3) ** 2
L.backward()              # once more, without clearing
print(w.grad)             # tensor(-12.): -6 was added on top of -6
```

`requires_grad=True` asks PyTorch to track everything computed from w. `L.backward()` runs backpropagation and puts the gradient in `w.grad`: -6 (printed as `tensor(-6.)`), as in the hand calculation. The second time, the new gradient was added on top of the old one: PyTorch doesn't clear gradients by itself, which is why the training loop calls `zero_grad()`.

You define the network as an `nn.Module`: you write a class (Lesson 3) that inherits from `nn.Module`, PyTorch's base class for models. In `__init__` you create the layers, and in the `forward` method you write how the data flows through them. The basic layer is `nn.Linear(inputs, neurons)`, where every neuron is connected to all the inputs; it's also called a dense layer. For example, `nn.Linear(2, 3)` is the hidden layer from the test example: 3 neurons with 2 weights each, plus 3 biases.

You wrap the data in a `Dataset` and a `DataLoader`. The Dataset holds the (input, correct answer) pairs and gives you any one of them by its number. The DataLoader takes the Dataset and hands it to you in batches: small groups of examples processed at once, for example 20 at a time. Why batches, and how big, is in Lesson 15.

At each step, meaning for each batch, you do four things, always in the same order.

1. Pass the data through the model and compute the loss (forward, the forward pass).
2. `loss.backward()`: backpropagation computes the gradients.
3. `optimizer.step()`: the optimizer updates the weights with the gradients.
4. `optimizer.zero_grad()`: you clear the gradients, so they don't add up at the next step.

```
for x, y in dataloader:
    pred = model(x)                # forward
    loss = criterion(pred, y)
    loss.backward()                # compute the gradients
    optimizer.step()               # update the weights
    optimizer.zero_grad()          # clear for the next step
```

On each turn of the loop, `dataloader` gives you a batch: `x` holds the inputs, `y` the correct answers. `model(x)` calls `forward` and returns the predictions. `criterion` is the loss function (the criterion you judge the prediction by): `nn.MSELoss()` for numbers, `nn.CrossEntropyLoss()` for classes. You create the optimizer, for example, with `torch.optim.SGD(model.parameters(), lr=0.1)`: it gets the model's parameters and the learning rate, and `step()` applies the rule w ← w - η · ∂L/∂w to each parameter.

## A complete example you can run
The code below puts all the pieces together and runs as it is. The network learns the relationship y = x², which isn't a straight line, from 200 made-up examples, with a hidden layer of 32 neurons and ReLU. The loss is MSE, because it predicts a number.

```
import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader

torch.manual_seed(0)          # the same random numbers on every run

# made-up data: 200 values of x between -2 and 2, the target is x squared
X_train = torch.linspace(-2, 2, 200).reshape(-1, 1)   # shape (200, 1)
y_train = X_train ** 2

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(1, 32)    # hidden layer: 32 neurons
        self.output = nn.Linear(32, 1)    # one output neuron

    def forward(self, x):
        h = torch.relu(self.hidden(x))    # the ReLU activation
        return self.output(h)

model = Net()
data = TensorDataset(X_train, y_train)
dataloader = DataLoader(data, batch_size=20, shuffle=True)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

for epoch in range(1, 101):       # 100 passes through all the data
    total = 0
    for x, y in dataloader:       # 10 batches of 20 examples
        pred = model(x)
        loss = criterion(pred, y)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        total += loss.item()
    if epoch in [1, 10, 50, 100]:
        print(epoch, round(total / len(dataloader), 4))

x_new = torch.tensor([[1.5]])          # a new example, shape (1, 1)
print(round(model(x_new).item(), 3))   # the right answer: 1.5 ** 2 = 2.25
# prints:
# 1 0.9165
# 10 0.0135
# 50 0.0023
# 100 0.0012
# 2.272
```

- `torch.linspace(-2, 2, 200)` gives 200 evenly spaced numbers between -2 and 2, like `np.linspace` from Lesson 4, and `.reshape(-1, 1)` stacks them in a column: 200 rows, one feature each (-1 means "however many rows it takes").
- `super().__init__()` sets up the part inherited from `nn.Module`, like `super()` in Lesson 3.
- `TensorDataset` is a ready-made Dataset for data that already sits in tensors. `batch_size=20` gives 10 batches of 20, and `shuffle=True` shuffles the examples on every pass.
- The outer loop goes through all the data 100 times; one full pass is called an epoch (Lesson 15 explains it). Inside is the loop from above, unchanged.
- `loss.item()` pulls the number out of the tensor, and `total / len(dataloader)` is the average loss over the epoch's 10 batches.
- `torch.manual_seed(0)` fixes the starting weights and the shuffling order (like `random.seed` in Lesson 3), so you get the same numbers as in the comments.

The average loss drops from 0.92 to 0.0012, and for x = 1.5 the network predicts 2.272, close to the right answer, 2.25. Try removing `torch.relu` from `forward`: the loss stays around 1.46, and the network gives about 1.46 for every x, a flat line. Without the activation, the two layers squashed into one, as with 2 · (3x + 1).

# @practice
- Work out backpropagation by hand for a network with one hidden layer, on paper.
- Train an MLP on a small dataset in PyTorch and watch the loss go down.
- Deliberately remove zero_grad() and see how the training goes haywire.
