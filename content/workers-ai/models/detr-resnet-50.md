---
model:
  id: "6ade40e1-1646-4013-8da0-95abb3360e33"
  source: 1
  name: "@cf/meta/detr-resnet-50"
  description: "DEtection TRansformer (DETR) model with ResNet-50 backbone for image object detection."
  task:
    id: "9c178979-90d9-49d8-9e2c-0f1cf01815d4"
    name: "Object Detection"
    description: "Object detection models can detect instances of objects like persons, faces, license plates, or others in an image. This task takes an image as input and returns a list of detected objects, each one containing a label, a probability score, and its surrounding box coordinates."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/facebook/detr-resnet-50"
task_type: "object-detection"
model_display_name: "detr-resnet-50"
layout: "model"
weight: 0
title: "detr-resnet-50"
json_schema:

---
