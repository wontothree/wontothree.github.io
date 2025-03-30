---
title: "[Machine Learning] CNN Architecture"
excerpt:
categories:
  - machinelearning
---
## AlexNet

```py
model = models.Sequential()

model.add(layers.Conv2D(filters=96, kernel_size=(11, 11), strides=(4, 4), activation="relu", input_shape=(28, 28, 1)))
model.add(layers.BatchNormalization())
model.add(layers.MaxPool2D(pool_size=(3, 3), strides=(2, 2)))

model.add(layers.Conv2D(filters=256, kernel_size=(5, 5), strides=(1, 1), activation="relu", padding="same"))
model.add(layers.BatchNormalization())
model.add(layers.MaxPool2D(pool_size=(2, 2), strides=(2, 2)))

model.add(layers.Conv2D(filters=384, kernel_size=(3, 3), strides=(1, 1), activation="relu", padding="same"))
model.add(layers.BatchNormalization())

model.add(layers.Conv2D(filters=384, kernel_size=(3, 3), strides=(1, 1), activation="relu", padding="same"))
model.add(layers.BatchNormalization())

model.add(layers.Conv2D(filters=256, kernel_size=(3, 3), strides=(1, 1), activation="relu", padding="same"))
model.add(layers.BatchNormalization())

model.add(layers.Flatten())

model.add(layers.Dense(4096, activation="relu"))
model.add(layers.Dropout(0.5))

model.add(layers.Dense(4096, activation="relu"))
model.add(layers.Dropout(0.5))

model.add(layers.Dense(10, activation="softmax"))

model.summary()
```
