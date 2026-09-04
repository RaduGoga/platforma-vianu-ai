---
code: S18
duration: ~1 week
---

# @intro
This is where deep learning starts. A neural network is a chain of layers, and training is adjusting the weights so the error goes down. The key to the module is understanding what backpropagation does, not just calling it. Once you get how the gradient flows back through the network, the rest of deep learning becomes tuning, not mystery.

## From perceptron to network
A perceptron, the basic brick, takes the inputs, multiplies them by some weights, adds a bias term, and passes the result through an activation function. On its own, it only learns linear boundaries, just like logistic regression.

The power shows up when you stack many layers of neurons one after another: an MLP (multilayer perceptron). Each layer transforms the output of the one before. With layers and non-linear activations between them, the network can learn relationships of any complexity. Without non-linearity, however many layers you stack collapse into a single one.

The activation function brings the non-linearity. ReLU (keep the positive, cut the negative to zero) is the most used, it's simple and trains fast. Sigmoid and tanh are still used, but ReLU is the default choice in the hidden layers.

## The cost function and the gradient
Training needs a measure of the error: the cost function (loss). For regression, the squared error. For classification, cross-entropy, which punishes confident wrong answers hard. The goal is to find the weights that make the loss as small as possible.

How? The gradient of the loss with respect to each weight tells you which direction to move the weight to increase the loss; you go the opposite way. The idea is called gradient descent: step by step, you go down the slope toward the minimum.

> [!FORMULA]
> w ← w - η · ∂L/∂w
> Each weight w moves a small step (learning rate η) in the direction opposite to the gradient ∂L/∂w. You repeat thousands of times.

## Backpropagation: the chain rule
A network is a chain of operations. To find the gradient of the loss with respect to a weight in the first layer, you apply the chain rule from calculus: you multiply the gradients step by step, from the output back toward the input. That's backpropagation, the backward propagation of the error.

Concretely: each operation in the network knows how to pass its gradient backward. You start from the loss, go back layer by layer, and at the end you have the gradient for every weight in the network, in a single pass. That's what makes training large networks efficient.

> [!NOTE]
> Backpropagation computes the gradients. It does NOT update the weights. The update is done by the optimizer, in a separate step. This mix-up is common, remember they're two different things.

## PyTorch: what it looks like in code
PyTorch works with tensors that keep track of their gradient automatically. You define the network as an nn.Module, wrap the data in a Dataset and a DataLoader (which hands it over in batches), and at each step you do four things, always in the same order.

1. Pass the data through the model and compute the loss (forward).
2. loss.backward(): backpropagation computes the gradients.
3. optimizer.step(): the optimizer updates the weights with the gradients.
4. optimizer.zero_grad(): you clear the gradients, so they don't add up at the next step.

```
for x, y in dataloader:
    pred = model(x)                # forward
    loss = criterion(pred, y)
    loss.backward()                # compute the gradients
    optimizer.step()               # update the weights
    optimizer.zero_grad()          # clear for the next step
```

# @takeaways
- An MLP is layers of neurons with non-linear activations between them; without non-linearity it collapses to one layer.
- ReLU is the default activation in the hidden layers.
- Training = gradient descent: you move the weights opposite the loss gradient.
- Backpropagation is the chain rule applied backward through the network; it computes the gradients.
- In PyTorch: forward, backward, step, zero_grad, in that order.

# @pitfalls
- Call `optimizer.zero_grad()` at every step, otherwise gradients add up.
- Remember that `.backward()` only computes gradients; the optimizer takes the step.
- Put activations between linear layers, otherwise the network stays linear.

# @practice
- Work out backpropagation by hand for a network with one hidden layer, on paper.
- Train an MLP on a small dataset in PyTorch and watch the loss go down.
- Deliberately remove zero_grad() and see how the training goes haywire.
