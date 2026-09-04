---
code: S17
duration: ~1 week
---

# @intro
An image is just a tensor of numbers. Before neural nets, it's worth understanding what you do with it: how you represent it, what a convolution filter is, and which augmentation helps without breaking the label. This module is the bridge to CNNs: if you understand the image as a tensor and convolution by hand, the convolutional layers later aren't magic anymore.

## The image as a tensor
A tensor is a grid of numbers with several dimensions, the generalization of a matrix. A grayscale image is a 2D matrix: each number is the intensity of a pixel. A color image is a 3D tensor: height, width and 3 channels (red, green, blue). Each color pixel is three numbers.

> [!NOTE]
> Watch out for the dtype and the range. Pixels come either as integers from 0 to 255, or as decimals from 0 to 1. Don't mix them: a model trained on 0 to 1 gets garbage if you feed it 0 to 255. Normalizing to the same range is your first concern.

```
img.shape       # (H, W, 3): height, width, 3 color channels
img = img / 255.0   # bring it from 0..255 to 0..1
```

## Convolution: filters that slide over the image
A convolution filter is a small matrix (say 3x3) that you slide over the image. At each position, you multiply the filter with the patch of image under it and add up. The result is a new image that brings out a certain pattern: edges, blur, contrast.

It's worth writing a few classic filters by hand once. Blur averages the neighbors (smooths). Sharpen accentuates differences. Sobel detects edges, where intensity changes abruptly. Once you've written them, you understand exactly what a convolutional layer in a network does: the same operation, only the filters are learned, not written by you.

```
sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]])
# you slide sobel_x over the image to pull out the vertical edges
```

## Data augmentation
When you have few images, the model memorizes. Augmentation artificially grows the set by creating variants of the images: you flip them, rotate them, crop them, shift the colors a bit. The model sees the same label in slightly different forms and learns to generalize, not to memorize.

- Horizontal flip: mirrors the image left to right.
- Random rotation and crop: change the position and the framing.
- Color jitter: slightly varies the brightness and color.
- Cutout: covers a random patch, forcing the model not to rely on a single detail.

> [!NOTE]
> The golden rule of augmentation: it has to keep the label. A horizontal flip of a cat is still a cat, so it's valid. But for the digit 2 or the letter b, the flip changes the meaning, so it's NOT valid. Always ask whether the transform would change the correct answer.

# @takeaways
- An image is a tensor: 2D grayscale, 3D color (H, W, channels).
- Watch the range: 0..255 integer or 0..1 decimal, don't mix them.
- Convolution slides a small filter over the image; it's exactly what CNN layers do, with learned filters.
- Augmentation grows the set and fights overfitting.
- Valid augmentation keeps the label; a flip on digits or letters breaks it.

# @pitfalls
- Pick augmentations that preserve the label: no flips on characters, no big rotations on objects with a fixed orientation.
- Keep a single intensity range across the whole set.
- Augment training only; validation stays clean.

# @practice
- Write a Sobel filter by hand and apply it to an image to pull out the edges.
- Test whether a set of augmentations improves the score on a small classification problem.
- Take a list of augmentations and decide for each whether it keeps the label on a digit problem.
