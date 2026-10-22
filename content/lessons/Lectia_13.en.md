---
code: S17
duration: ~1 week
---

# @intro
An image is just a tensor of numbers, meaning a grid of numbers with several dimensions. Before neural nets (from Lesson 14 on), it's worth understanding what you do with it: how you represent it, what a convolution filter is, and which augmentation helps without breaking the label. This module is the bridge to CNNs, the networks for images in Lesson 17: if you understand the image as a tensor and convolution by hand, the convolutional layers later won't be a mystery anymore.

## The image as a tensor
A tensor is a grid of numbers with several dimensions, the generalization of a matrix. A single number has 0 dimensions, a list of numbers has 1, a table with rows and columns (a matrix) has 2, and a stack of tables has 3. For a NumPy array, the number of dimensions is the number of values in its `shape` (Lesson 4): an array with shape (2, 3) has 2 dimensions. NumPy calls it an ndarray, PyTorch (Lesson 14) calls it a tensor, but it's the same idea.

A grayscale image is a 2D matrix: each number is the intensity of a pixel, meaning how bright it is, from 0 (black) to 255 (white). A color image is a 3D tensor: height, width and 3 channels (red, green, blue). Each color pixel is three numbers: (255, 0, 0) is bright red, (255, 255, 0) is yellow, and (255, 255, 255) is white. So a 4000 by 3000 pixel phone photo holds 4000 · 3000 · 3 = 36 million numbers.

> [!NOTE]
> Watch out for the dtype and the range. Pixels come either as integers from 0 to 255, or as decimals from 0 to 1. The image you read with Pillow in Lesson 4 had dtype `uint8`, meaning 8-bit integers with no minus sign: exactly the numbers from 0 to 255. Don't mix them: a model trained on 0 to 1 gets garbage if you feed it 0 to 255. Normalizing to the same range is your first concern. And don't do arithmetic directly in `uint8`: there 250 + 10 gives 4, because the result goes past 255 and wraps around to 0.

```
img.shape       # (H, W, 3): height, width, 3 color channels
img = img / 255.0   # bring it from 0..255 to 0..1
```

`img` here is the NumPy array of a photo, like `a` in Lesson 4. H stands for height (the number of rows of pixels), and W for width (the number of columns). `img / 255.0` divides every pixel by 255, through broadcasting (Lesson 4), and gives an array of decimals, of type `float64`: 255 becomes 1.0, 51 becomes 0.2, and 0 stays 0.0.

## Convolution: filters that slide over the image
A convolution filter is a small matrix (say 3x3) that you slide over the image. At each position, you multiply the filter with the patch of image under it and add up: each number in the filter times the pixel under it, then you add the 9 products. The sum becomes one pixel of the new image. The result is a new image that brings out a certain pattern: edges, blur, contrast.

It's worth writing a few classic filters by hand once. Blur averages the neighbors (smooths): all 9 numbers of the filter are 1/9, so the result is the average of the 9 pixels under it. Sharpen accentuates differences: it has 5 in the middle, -1 above, below, left and right, and 0 in the corners. On a uniform area where every pixel is 10, it gives 5 · 10 - 4 · 10 = 10, so nothing changes, but next to an edge it darkens the dark side and brightens the bright side. Sobel detects edges, where intensity changes abruptly.

Once you've written them, you understand exactly what a convolutional layer in a network does (Lesson 17): the same operation, only the filters are learned, not written by you. The 9 numbers in a filter are parameters, like the weights in Lesson 7.

```
import numpy as np

sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]])
# you slide sobel_x over the image to pull out the vertical edges

patch = np.array([[0, 0, 9],
                  [0, 0, 9],
                  [0, 0, 9]])    # dark on the left, bright on the right
print((patch * sobel_x).sum())   # 36
```

`patch` is a 3x3 square cut from an image, with a vertical edge: pixels of 0 (black) on the left and 9 (bright) on the right. The numbers are small so you can check them with a pencil. `patch * sobel_x` multiplies position by position, as in Lesson 4, and `.sum()` adds everything up. By hand, row by row: -1 · 0 + 0 · 0 + 1 · 9 = 9, then -2 · 0 + 0 · 0 + 2 · 9 = 18, then 9 again, so 9 + 18 + 9 = 36.

On a uniform patch where every pixel is 9, you'd get (-9 + 9) + (-18 + 18) + (-9 + 9) = 0. A big number means an edge, and 0 means a uniform area. Blur on the same patch gives the average: (0 + 0 + 9) · 3 / 9 = 3.

To get the whole new image, you repeat the calculation at every position. The function below does that on a 4 by 6 pixel image, with 0 on the left and 9 on the right, and uses `np` and `sobel_x` from the block above.

```
img = np.array([[0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9],
                [0, 0, 0, 9, 9, 9]], dtype=float)

def convolve(img, kernel):
    H, W = img.shape
    out = np.zeros((H - 2, W - 2))
    for i in range(H - 2):
        for j in range(W - 2):
            patch = img[i:i + 3, j:j + 3]        # the 3x3 window
            out[i, j] = (patch * kernel).sum()   # multiply and add
    return out

blur = np.ones((3, 3)) / 9
print(convolve(img, blur))
# [[0. 3. 6. 9.]
#  [0. 3. 6. 9.]]
print(convolve(img, sobel_x))
# [[ 0. 36. 36.  0.]
#  [ 0. 36. 36.  0.]]
```

The function takes a grayscale image (a 2D array) and a 3x3 filter, and returns the filtered image. `img[i:i + 3, j:j + 3]` is the slice of 3 rows and 3 columns that starts at row i and column j. `dtype=float` makes the pixels decimals, so you avoid the `uint8` surprises, and `np.ones((3, 3)) / 9` is the blur filter.

The result is 2 by 4 pixels, not 4 by 6, because the filter only fits in 2 positions vertically and 4 horizontally. In Lesson 17 you'll see how to keep the size with padding, a frame of zeros placed around the image. The blur turned the sudden jump from 0 to 9 into a smooth ramp: 0, 3, 6, 9. Sobel gives 36 only next to the edge and 0 on the uniform areas on both sides.

## Data augmentation
When you have few images, the model memorizes (overfitting, from Lesson 1). Augmentation artificially grows the set by creating variants of the images: you flip them, rotate them, crop them, shift the colors a bit. The model sees the same label in slightly different forms and learns to generalize, not to memorize. If all your cat photos show the cat with its head on the left, the model can learn "cat = head on the left". After a flip, it also sees cats with the head on the right.

- Horizontal flip: mirrors the image left to right.
- Random rotation and crop: change the position and the framing, for example you rotate by a few degrees or keep only a piece from a randomly chosen spot.
- Color jitter: slightly varies the brightness and color, like the same photo taken in the morning, in the evening or under neon light (jitter means a small shake).
- Cutout: covers a random patch with a black square, like a finger over the lens, forcing the model not to rely on a single detail.

On an array, flips and rotations just move the numbers around. Here's what they do to a small 2 by 3 array:

```
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])
print(np.fliplr(a))   # mirror left to right
# [[3 2 1]
#  [6 5 4]]
print(np.rot90(a))    # rotate by 90°, counterclockwise
# [[3 6]
#  [2 5]
#  [1 4]]
```

`np.fliplr` reverses the order of the columns. On an image with shape (H, W, 3) it does the same, so it mirrors the image and leaves the channels alone. `np.rot90` rotates by 90 degrees, and the shape (2, 3) becomes (3, 2): for an image, height and width swap places.

In practice you don't write them by hand. torchvision, PyTorch's image library (you use it from Lesson 14 on), has them ready-made, random part included:

```
from PIL import Image
from torchvision import transforms

aug = transforms.Compose([
    transforms.Resize((64, 64)),              # every photo to 64x64
    transforms.RandomHorizontalFlip(p=0.5),   # flip, with a 50% chance
    transforms.RandomRotation(15),            # between -15 and 15 degrees
    transforms.RandomCrop(56),                # a 56x56 piece
    transforms.ColorJitter(brightness=0.2),   # brightness x0.8 ... x1.2
    transforms.ToTensor(),                    # tensor (3, H, W), 0 ... 1
    transforms.RandomErasing(p=0.5),          # cutout, with a 50% chance
])

img = Image.open("cat.jpg").convert("RGB")
x = aug(img)              # a different variant on every call
print(x.shape)            # torch.Size([3, 56, 56])
```

Here `img` is the photo opened with Pillow, as in Lesson 4, not an array. `Compose` chains the transforms: the photo goes through them one by one, top to bottom. The ones with Random in their name flip a coin on every call: `p=0.5` means they apply half the time, and the angle and the crop position are picked at random. `ColorJitter(brightness=0.2)` multiplies the brightness by a number picked at random between 0.8 and 1.2. That way, every time the model asks for the photo, it sees a different variant, and you don't save any copies to disk.

`ToTensor` turns the Pillow photo into a PyTorch tensor with values from 0 to 1, but with the channels first: the shape is (3, H, W), not (H, W, 3) as in NumPy. `RandomErasing` is cutout, and it comes after `ToTensor` because it works on tensors.

You apply augmentations only to the training data. On validation and test you leave the images as they are, so the score shows how well the model does on real photos.

> [!NOTE]
> The golden rule of augmentation: it has to keep the label. A horizontal flip of a cat is still a cat, so it's valid. But for the digit 2 or the letter b, the flip changes the meaning, so it's NOT valid. In the same way, a 6 rotated by 180 degrees becomes a 9. Always ask whether the transform would change the correct answer.

# @practice
- Write a Sobel filter by hand and apply it to an image to pull out the edges.
- Test whether a set of augmentations improves the score on a small classification problem.
- Take a list of augmentations and decide for each whether it keeps the label on a digit problem.
