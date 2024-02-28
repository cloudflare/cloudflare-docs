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
  tags:
    - "experimental"
    - "meta"
    - "text-generation"
  properties:
    - property_id: "info"
      value: "https://huggingface.co/facebook/detr-resnet-50"
    - property_id: "constellation_config"
      value: "max_requests_per_min:\n  default: 180\n\nneurons:\n  cost_per_infer: 0.6841666668  # ...3x that of resnet-50 (:shrug:).\nmax_concurrent_requests: 100"
task_type: "object-detection"
model_display_name: "detr-resnet-50"
layout: "model"
title: "detr-resnet-50"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"image\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    }\n  ]\n}"
  output: "{\n  \"type\": \"array\",\n  \"contentType\": \"application/json\",\n  \"items\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"score\": {\n        \"type\": \"number\"\n      },\n      \"label\": {\n        \"type\": \"string\"\n      },\n      \"box\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"xmin\": {\n            \"type\": \"number\"\n          },\n          \"ymin\": {\n            \"type\": \"number\"\n          },\n          \"xmax\": {\n            \"type\": \"number\"\n          },\n          \"ymax\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    }\n  }\n}"

---
