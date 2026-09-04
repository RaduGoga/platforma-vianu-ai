---
code: S21
duration: ~1 week
---

# @intro
CNNs (convolutional networks) are the tools for images. Instead of connecting every pixel to every neuron, which would be enormous, they use small filters that slide over the image. That's how they learn local features (edges, corners, then shapes) efficiently and with few weights. You saw convolution by hand in S17; here the network learns it on its own.

## Why not a plain MLP on images
If you connected every pixel of a 224x224 color image to every neuron, you'd have hundreds of thousands of weights in the first layer alone. Too many: a huge, slow model that overfits immediately. On top of that, an MLP treats each pixel independently and loses the fact that neighboring pixels form structures.

CNNs exploit two ideas. Locality: the useful features (an edge) are local, so a small filter is enough. Weight sharing: the same filter slides over the whole image, so an edge is recognized wherever it appears, with the same weights. Few weights, a lot of power.

## The convolutional layer: kernel, stride, padding
A convolutional layer applies several learned filters over the input, each producing a feature map that highlights a certain pattern. Three settings define how the filter slides.

- Kernel: the size of the filter (usually 3x3). How big the sliding window is.
- Stride: how far the filter jumps at each step. Stride 2 jumps two at a time, shrinking the output.
- Padding: how much you pad the edges with zeros, so the output doesn't shrink too fast and the corners count.

You need to know how to compute the output size, otherwise you can't wire the layers together correctly. It's a simple formula you apply for each layer.

> [!FORMULA]
> output = (input - kernel + 2·padding) / stride + 1
> For an input of 32, kernel 3, padding 1, stride 1: (32 - 3 + 2) / 1 + 1 = 32. The size is kept.

## Pooling and the receptive field
Pooling shrinks the feature map, taking for example the maximum of each 2x2 window (max pooling). It reduces the size, so the computation, and grows the receptive field: how much of the original image a neuron sees. The upper layers, with a large receptive field, see whole shapes, not just edges.

Global average pooling is a clean alternative to the dense layers at the end: it averages each feature map into a single number. It has fewer weights and overfits less than large dense layers.

## Classic architectures and ResNet
The classic pattern of a CNN: you alternate convolutional and pooling layers, which extract more and more abstract features, then at the end a classification head that gives the class. LeNet (digits) and VGG (stacks of 3x3 convolutions) are the historical starting points.

The problem with very deep networks: the gradient vanishes on the way back through many layers, and the network stops learning. ResNet solved this with residual connections: a shortcut that skips a few layers and adds the input to the output. The gradient can flow straight through the shortcut, so networks of tens or hundreds of layers become trainable. Most modern image models start from here.

> [!NOTE]
> The residual connection is the idea to remember from this module. Without it, very deep networks don't learn. With it, depth becomes an advantage, not a bottleneck.

# @takeaways
- CNNs use small shared filters: few weights, they recognize features wherever they appear.
- The convolutional layer has kernel, stride, padding; the output is computed with a simple formula.
- Pooling shrinks the map and grows the receptive field.
- The pattern: convolutions plus pooling for features, then a classification head.
- Residual connections (ResNet) let the gradient pass through deep networks.

# @pitfalls
- Work out the sizes on paper before wiring the layers together.
- Use residual connections in deep networks, so the gradient reaches back.
- Finish with global average pooling instead of huge dense layers.

# @practice
- Compute the output sizes for a small convolutional network on paper, layer by layer.
- Train a simple convolutional network on a small image dataset.
- Add a residual connection to a network and compare training with and without it.
