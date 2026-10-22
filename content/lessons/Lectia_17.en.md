---
code: S21
duration: ~1 week
---

# @intro
CNNs (convolutional networks) are the tools for images. Instead of connecting every pixel to every neuron, which would be enormous, they use small filters that slide over the image. That's how they learn local features (small patterns in one area of the image: edges, corners, then shapes) efficiently and with few weights. You saw convolution by hand in Lesson 13, with filters you wrote yourself; here the network learns its own filters.

## Why not a plain MLP on images
An MLP (the network from Lesson 14, where every neuron is connected to all the inputs) would take the image as one long row of numbers. A 224x224 color image has 224 · 224 · 3 = 150,528 numbers (three channels per pixel, Lesson 13). A neuron connected to all of them has 150,528 weights, and a first layer of 1,000 neurons has about 150 million. Too many: a huge, slow model that overfits immediately (it memorizes the training images and gets new ones wrong, Lesson 1).

On top of that, an MLP treats each pixel independently and loses the fact that neighboring pixels form structures. The image goes in flattened into a single row, as after `flatten()` in Lesson 4, so the network doesn't know which pixels were neighbors. If you shuffled the order of the pixels the same way in every image, an MLP would learn just as well, even though you couldn't recognize anything in the pictures anymore.

CNNs exploit two ideas. Locality: the useful features (an edge) are local, so a small filter is enough. To tell whether there's an edge at some point, the 3x3 square around it is all you need. Weight sharing: the same filter slides over the whole image, so an edge is recognized wherever it appears, with the same weights. The Sobel filter from Lesson 13 works the same way: the same 9 numbers find the edges across the whole image.

In numbers: a 3x3 filter on a color image covers 3 · 3 · 3 = 27 numbers (3x3 pixels, 3 channels each), so it has 27 weights plus a bias term, like the perceptron in Lesson 14. That's it, however big the image is, 32x32 or 224x224. A layer with 64 filters has 64 · 28 = 1,792 parameters (the numbers it learns), against the 150 million above. Few weights, a lot of power.

## The convolutional layer: kernel, stride, padding
A convolutional layer applies several learned filters over the input, each producing a feature map that highlights a certain pattern. A feature map is the grid of numbers that comes out of a single filter: one number for each position of the filter, large where the pattern shows up. The edge image that the Sobel filter from Lesson 13 gives you is a feature map. Mind the word: here a feature is a pattern in the image, not a column in a table as in the lessons on tabular data.

A layer with 16 filters outputs 16 maps, stacked on top of each other like channels: 3 color channels go in, 16 come out. Each filter goes through all the input channels at once, which is why a 3x3 filter on a color image has 3 · 3 · 3 weights. The numbers in the filters are weights like any others: they start out random and get adjusted by gradient descent (Lesson 14).

Three settings define how the filter slides.

- Kernel: the size of the filter (usually 3x3). How big the sliding window is. On a row of 5 pixels, a window of 3 can start at pixel 1, 2 or 3, so the output has 3 numbers.
- Stride: how far the filter jumps at each step. Stride 2 jumps two at a time, shrinking the output. On a row of 7 pixels, with kernel 3 and stride 2, the window starts at pixels 1, 3 and 5, so the output has 3 numbers instead of 5.
- Padding: how much you pad the edges with zeros, so the output doesn't shrink too fast and the corners count. Padding 1 adds a border of zeros one pixel wide: the row of 5 becomes 7, and kernel 3 gives 5 numbers again.

You need to know how to compute the output size, otherwise you can't wire the layers together correctly. For example, the `nn.Linear` layer at the end of the network (Lesson 14) has to know how many numbers it receives, and if you get it wrong, PyTorch stops with a shape error. It's a simple formula you apply for each layer.

> [!FORMULA]
> output = (input - kernel + 2·padding) / stride + 1
> For an input of 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. The size is kept.

Input and output are the width (or the height) in pixels; for a square image, both give the same result. With stride 2, the division may not come out even. For input 32, kernel 3, padding 1 and stride 2: (32 - 3 + 2) / 2 + 1 = 31 / 2 + 1 = 15.5 + 1. The division is rounded down, to 15, because the filter can't start at half a pixel. The output has 15 + 1 = 16 pixels, so stride 2 halved the image. PyTorch rounds the same way.

## Pooling and the receptive field
Pooling shrinks the feature map, taking for example the maximum of each 2x2 window (max pooling). In the code below, a 4x4 map becomes 2x2. PyTorch works with batches of images (Lesson 15) shaped (N, C, H, W): the number of images, the channels, the height and the width. The channels come first, not last as in Lesson 13, which is why the 4x4 grid gets the shape (1, 1, 4, 4).

```
import torch
import torch.nn as nn

x = torch.tensor([[1, 3, 2, 0],
                  [4, 2, 1, 1],
                  [0, 1, 5, 6],
                  [2, 0, 7, 3]])
x = x.reshape(1, 1, 4, 4)    # 1 image, 1 channel, 4x4
pool = nn.MaxPool2d(2)       # 2x2 windows, jumping 2 at a time
print(pool(x).reshape(2, 2))
# tensor([[4, 2],
#         [2, 7]])
```

The 2x2 window jumps two at a time, so the 16 numbers split into four squares, and only the largest number of each square stays. From the top-left square (1, 3, 4, 2) you keep 4, and from the bottom-right one (5, 6, 7, 3) you keep 7. Pooling has no weights to learn. It keeps how clearly the pattern showed up in each area and forgets its exact position.

It reduces the size, so the computation, and grows the receptive field: how much of the original image a neuron sees. Here a neuron is one number in a feature map, and it depends only on a patch of the image. After one 3x3 convolution, each number sees 3x3 pixels. After a second convolution, a 3x3 window combines 3x3 numbers from the first map, which together cover 5x5 pixels (three windows of 3 pixels, each shifted by one, cover 5). After the third convolution, the receptive field is 7x7.

After a 2x2 pooling, one step on the map means 2 pixels in the image, so the convolutions after it widen the receptive field twice as fast. The upper layers (the last ones, furthest from the image), with a large receptive field, see whole shapes, while the first ones only see edges.

At the end of a CNN there are usually a few dense (fully connected) layers: layers where every neuron is connected to all the input numbers, as in the MLP from Lesson 14, which means `nn.Linear` in PyTorch. Global average pooling is a clean alternative to the dense layers at the end: it averages each feature map into a single number. It has fewer weights and overfits less than large dense layers.

An example with numbers. VGG, a classic network from the next section, flattens its final 512 maps of 7x7 into a row of 512 · 7 · 7 = 25,088 numbers. It connects them to a dense layer of 4,096 neurons: over 102 million weights in that one place. With global average pooling you're left with 512 numbers, one per map, and a dense layer from them to 10 classes has 512 · 10 + 10 = 5,130 parameters.

## Classic architectures and ResNet
The classic pattern of a CNN: you alternate convolutional and pooling layers, which extract more and more abstract features, then at the end a classification head that gives the class. More abstract means that the first layers find edges, the next ones corners and textures, and the last ones parts of objects, like an eye or a wheel. The classification head is the last layer (or the last few): it takes the features and gives one score per class, and the class with the highest score is the prediction.

The code below builds a small CNN for 32x32 color images with 10 classes and prints the shape of the data after each layer.

```
import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(
    nn.Conv2d(3, 16, kernel_size=3, padding=1),    # 16 filters, 3x3
    nn.ReLU(),
    nn.MaxPool2d(2),                               # 32x32 -> 16x16
    nn.Conv2d(16, 32, kernel_size=3, padding=1),   # 32 filters, 3x3
    nn.ReLU(),
    nn.MaxPool2d(2),                               # 16x16 -> 8x8
    nn.AdaptiveAvgPool2d(1),                       # global average pooling
    nn.Flatten(),
    nn.Linear(32, 10),                             # the head: 10 classes
)

x = torch.randn(8, 3, 32, 32)   # a batch of 8 color images, 32x32
for layer in model:
    x = layer(x)
    print(type(layer).__name__, tuple(x.shape))
# Conv2d (8, 16, 32, 32)
# ReLU (8, 16, 32, 32)
# MaxPool2d (8, 16, 16, 16)
# Conv2d (8, 32, 16, 16)
# ReLU (8, 32, 16, 16)
# MaxPool2d (8, 32, 8, 8)
# AdaptiveAvgPool2d (8, 32, 1, 1)
# Flatten (8, 32)
# Linear (8, 10)
```

`nn.Sequential` chains the layers: the output of one goes into the next, and the `for` loop takes them one at a time. `nn.Conv2d(3, 16, kernel_size=3, padding=1)` takes 3 channels and has 16 filters, so it outputs 16 maps, and padding 1 keeps the size. ReLU (it cuts negatives to zero, Lesson 14) doesn't change the shape. `nn.MaxPool2d(2)` is max pooling with 2x2 windows, and `nn.AdaptiveAvgPool2d(1)` is global average pooling: it leaves a single number from each map. `nn.Flatten()` turns the shape (8, 32, 1, 1) into (8, 32), one row per image. `nn.Linear(32, 10)` is the head: 10 scores per image. `type(layer).__name__` just gives the layer's name, so you know which line is which.

What comes out: after each layer you see the shape (images, channels, height, width). Convolutions change the number of channels, pooling halves the height and the width, and at the end 10 numbers per image are left. The whole model has only 5,418 parameters. You train it with the exact loop from Lesson 14, with `nn.CrossEntropyLoss()` as the loss, since it's a classification problem.

LeNet (digits) and VGG (stacks of 3x3 convolutions) are the historical starting points. LeNet (1998) read handwritten digits from 32x32 black-and-white images. VGG (2014) has 16 or 19 layers with weights and uses only 3x3 convolutions, one after another.

The problem with very deep networks: the gradient vanishes on the way back through many layers, and the network stops learning. In backpropagation (Lesson 14), the gradient for the first layers comes from multiplying one factor for each layer it passes through. If the factors are below 1, say 0.5, after 20 layers you're left with 0.5 to the power of 20, about 0.000001. The first layers barely move anymore: these are the vanishing gradients from the checklist in Lesson 16.

ResNet (2015) solved this with residual connections: a shortcut that skips a few layers and adds the input to the output. If x is the input of a block and F(x) is what the layers inside it compute (say, two convolutions), the block outputs y = F(x) + x. It keeps the input as it is and adds a learned correction to it. If the layers have nothing useful to add, it's enough for F(x) to be close to 0, and the input passes through unchanged.

The gradient can flow straight through the shortcut, so networks of tens or hundreds of layers become trainable. On the way back, the "+ x" branch passes the gradient on multiplied by 1, so it reaches the first layers whole. Most modern image models start from here.

A residual block in PyTorch looks like this. To add F(x) and x, the two need the same shape, which is why the convolutions in the block keep the number of channels and the size (padding 1).

```
class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)

    def forward(self, x):
        f = self.conv2(torch.relu(self.conv1(x)))   # F(x)
        return torch.relu(f + x)                    # F(x) + x

block = ResidualBlock(16)
y = block(torch.randn(8, 16, 32, 32))
print(y.shape)   # torch.Size([8, 16, 32, 32]), same shape as the input
```

`torch.relu` is ReLU used as a function. The only difference from a plain network is the `f + x` in `forward`: without the "+ x", it would be two ordinary convolutions in a row.

> [!NOTE]
> The residual connection is the idea to remember from this module. Without it, very deep networks don't learn. With it, depth becomes an advantage, not a bottleneck.

# @practice
- Compute the output sizes for a small convolutional network on paper, layer by layer.
- Train a simple convolutional network on a small image dataset.
- Add a residual connection to a network and compare training with and without it.
