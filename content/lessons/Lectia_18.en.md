---
code: S22
duration: ~1 week
---

# @intro
You rarely train an image network from scratch. You take a pretrained model, one that someone else has already trained on a huge number of images, and adapt it to your problem. Usually that's ImageNet: about 1.2 million photos labeled in 1,000 classes, from dog breeds to fruits and tools. With little data, that's the difference between a good score and a miserable one. The model has already learned to see edges, textures and shapes; you just reorient it toward your classes.

## Why transfer works
A CNN trained on many images learns general features in the lower layers (the first ones, closest to the image): edges, corners, textures. These are useful for almost any image problem, including one the model has never seen. The upper layers (the last ones, close to the output) learn specific features (shapes of dogs, of cars). The transfer idea: you keep the general part and rewrite only the specific part.

Say you have 300 photos of leaves, healthy or diseased. ImageNet has no "diseased leaf" class, but the spots, edges and textures the model already recognizes are exactly what you need to tell them apart.

ResNet18, the model in the code below, is a ResNet (Lesson 17) with 18 layers and about 11.7 million parameters. That way, instead of training millions of weights from scratch, with millions of images you don't have, you use what the model already learned and train only a little, with little data. It's the most practical technique in all of image deep learning.

## Feature extraction vs fine-tuning
There are two ways to adapt a pretrained model, depending on how much data you have.

- Feature extraction: you freeze the whole network (it no longer trains) and replace only the classification head, which you train on your classes. Fast, suited to when you have very little data.
- Fine-tuning: you also unfreeze the upper layers of the network and train them with a small learning rate, to nudge them toward your problem. It can give a better score, suited to when you have somewhat more data.

The classification head is the last layer of the network, the one that gives a score for each class (Lesson 17). In ResNet it's called `net.fc` (for fully connected) and goes from 512 numbers to 1,000 scores, one for each ImageNet class. Your problem has other classes, so you replace it with a new one.

The name feature extraction comes from what the frozen network does: it extracts features. For each image it outputs 512 numbers that describe it, and the new head learns from them, like an ordinary model on a table with 512 columns.

Freezing a weight means `requires_grad = False`: PyTorch stops computing its gradient. With no gradient, the optimizer has nothing to move it with at `optimizer.step()` (Lesson 14), so it stays exactly as it came.

```
from torchvision import models
import torch
import torch.nn as nn

NUM_CLASSES = 2                      # for example: healthy / diseased leaf

net = models.resnet18(weights="DEFAULT")
for p in net.parameters():
    p.requires_grad = False          # freeze everything (feature extraction)
net.fc = nn.Linear(net.fc.in_features, NUM_CLASSES)   # new, trainable head
print(net.fc)   # Linear(in_features=512, out_features=2, bias=True)

optimizer = torch.optim.Adam(net.fc.parameters(), lr=1e-3)   # head only
```

`weights="DEFAULT"` loads the best ImageNet weights torchvision has for ResNet18. `net.fc.in_features` is the number of inputs of the old head, 512 for ResNet18. You read it from there instead of typing 512 by hand, so the code also works with other models (ResNet50 has 2,048). `NUM_CLASSES` is your number of classes. The new head is created after the freezing, so its weights have `requires_grad = True` and they're the only ones that train: 512 · 2 + 2 = 1,026 numbers out of more than 11 million. The optimizer gets only `net.fc.parameters()`, the head's weights, and `lr=1e-3` is a learning rate of 0.001.

> [!NOTE]
> `weights="DEFAULT"` downloads the weights from the internet the first time you run the code (for ResNet18, a file of about 45 MB) and keeps them on your computer for next time. At ONIA, the platform runs your code without internet access (Lesson 6), so the download fails. You can use a pretrained model at the contest only if the rules allow it and the weights file is already available where your code runs. In that case you create the model with `weights=None` (random weights) and load the file with `net.load_state_dict(torch.load("resnet18.pth"))`. Check the rules before the contest, not during it.

## Normalization: the same as at training
A pretrained model saw images normalized in a certain way: subtracted and divided by the ImageNet statistics (the means and deviations on the three channels). Concretely, once the pixels were brought between 0 and 1 (Lesson 13), each channel had its mean subtracted and was divided by its standard deviation, exactly the standardization from Lesson 5. The means, computed on the ImageNet photos, are 0.485, 0.456 and 0.406 (red, green, blue), and the standard deviations are 0.229, 0.224 and 0.225.

A pixel with red at 0.8 becomes (0.8 - 0.485) / 0.229 ≈ 1.38, and one with red at exactly 0.485 becomes 0, an "ordinary red" for ImageNet. If you feed it images normalized differently, the input doesn't look like what it saw at training and it works badly, sometimes inexplicably badly.

In torchvision, preparing the photos looks like this.

```
from PIL import Image
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),           # the size of ImageNet photos
    transforms.ToTensor(),                   # 0..255 -> 0..1, shape (3, H, W)
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

img = Image.new("RGB", (300, 200), (204, 128, 51))   # a test photo
x = transform(img)
print(x.shape)      # torch.Size([3, 224, 224])
print(x[:, 0, 0])   # tensor([ 1.3755,  0.2052, -0.9156])
```

`transforms.Compose` puts the steps in order, like a Pipeline from Lesson 6. `Resize((224, 224))` brings the photo to 224x224, the size the model was trained on. `ToTensor()` turns the Pillow photo (Lesson 4) into a tensor with values between 0 and 1 and the channels first, and `Normalize` does the subtraction and division on each channel. The test photo has the color (204, 128, 51) everywhere, and 204 / 255 = 0.8, so the first number is exactly (0.8 - 0.485) / 0.229 ≈ 1.3755. `x[:, 0, 0]` takes all three channels of the top-left pixel.

> [!NOTE]
> When you use a pretrained model, normalize the images exactly with the statistics it was trained on (for ImageNet, the means and standard deviations above). It's a silent, common mistake: the code runs without any error, only the score comes out bad. To be safe, you can get the model's official steps with `models.ResNet18_Weights.DEFAULT.transforms()`.

## A small learning rate for fine-tuning
In fine-tuning, the pretrained layers already have good weights. If you train them with a large learning rate, the big steps break exactly the valuable features you wanted to keep. Use a small learning rate for them, sometimes even smaller than for the new head. That way you nudge them finely, not destroy them.

In PyTorch, the optimizer can take groups of parameters, each with its own learning rate. Below, the last block of the pretrained body (everything before the head) is unfrozen and gets steps 10 times smaller than the new head. The rest of the body stays frozen.

```
for p in net.layer4.parameters():
    p.requires_grad = True           # unfreeze the last block

optimizer = torch.optim.AdamW([
    {"params": net.layer4.parameters(), "lr": 1e-4},   # body: small steps
    {"params": net.fc.parameters(), "lr": 1e-3},       # head: bigger steps
])
```

The body of ResNet18 has four big blocks, `net.layer1` to `net.layer4`, and `net.layer4` is the closest to the head. AdamW is the optimizer from Lesson 15. Each dictionary in the list is a group: `"params"` says which weights it holds, and `"lr"` the learning rate it moves them with. 1e-4 means 0.0001, 10 times less than 1e-3.

# @practice
- Adapt a ResNet to a problem with few images through feature extraction.
- Compare feature extraction with fine-tuning on the same set and see when each is worth it.
- Check what happens to the score if you drop the correct image normalization.
