---
title: "[Computer Vision] Segmentation"
excerpt:
categories:
  - computervision
---

```py
import cv2
import math
import numpy as np
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# Height and width that will be used by the model
DESIRED_HEIGHT = 480
DESIRED_WIDTH = 480

# Performs resizing and showing the image
def resize_and_show(image):
    h, w = image.shape[:2]
    if h < w:
        img = cv2.resize(image, (DESIRED_WIDTH, math.floor(h/(w/DESIRED_WIDTH))))
    else:
        img = cv2.resize(image, (math.floor(w/(h/DESIRED_HEIGHT)), DESIRED_HEIGHT))
    cv2.imshow("Image", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Image file names
IMAGE_FILENAMES = ['woman.jpeg']

# Preview the image(s)
# for name in IMAGE_FILENAMES:
#     image = cv2.imread(name)
#     if image is not None:
#         print(name)
#         resize_and_show(image)
#     else:
#         print(f"Failed to load {name}")


BG_COLOR = (192, 192, 192) # gray
MASK_COLOR = (255, 255, 255) # white


# Create the options that will be used for ImageSegmenter
base_options = python.BaseOptions(model_asset_path='deeplabv3.tflite')
options = vision.ImageSegmenterOptions(base_options=base_options,
                                       output_category_mask=True)

# Create the image segmenter
with vision.ImageSegmenter.create_from_options(options) as segmenter:

  # Loop through demo image(s)
  for image_file_name in IMAGE_FILENAMES:

    # Create the MediaPipe image file that will be segmented
    image = mp.Image.create_from_file(image_file_name)

    # Retrieve the masks for the segmented image
    segmentation_result = segmenter.segment(image)
    category_mask = segmentation_result.category_mask

    # Generate solid color images for showing the output segmentation mask.
    image_data = image.numpy_view()

    fg_image = np.zeros(image_data.shape, dtype=np.uint8)
    # fg_image[:] = MASK_COLOR
    fg_image[:, :, :3] = MASK_COLOR

    bg_image = np.zeros(image_data.shape, dtype=np.uint8)
    bg_image[:, :, :3] = BG_COLOR

    # condition = np.stack((category_mask.numpy_view(),) * 3, axis=-1) > 0.2
    condition = np.stack((category_mask.numpy_view(),) * 4, axis=-1)  # 알파 채널을 추가로 복제

    output_image = np.where(condition, fg_image, bg_image)

    # output_image = np.where(condition, fg_image, bg_image)

    print(f'Segmentation mask of {image_file_name}:')
    resize_and_show(output_image)
```
