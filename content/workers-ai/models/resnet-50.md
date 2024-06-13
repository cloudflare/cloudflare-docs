---
model:
  id: "7f9a76e1-d120-48dd-a565-101d328bbb02"
  source: 1
  name: "@cf/microsoft/resnet-50"
  description: "50 layers deep image classification CNN trained on more than 1M images from ImageNet"
  task:
    id: "00cd182b-bf30-4fc4-8481-84a3ab349657"
    name: "Image Classification"
    description: "Image classification models take an image input and assigns it labels or classes."
  tags: []
  properties:
    - property_id: "beta"
      value: "false"
    - property_id: "info"
      value: "https://www.microsoft.com/en-us/research/blog/microsoft-vision-model-resnet-50-combines-web-scale-data-and-multi-task-learning-to-achieve-state-of-the-art/"
task_type: "image-classification"
model_display_name: "resnet-50"
layout: "model"
weight: 100
title: "resnet-50"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"image\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"number\"\n          }\n        }\n      },\n      \"required\": [\n        \"image\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"type\": \"array\",\n  \"contentType\": \"application/json\",\n  \"items\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"score\": {\n        \"type\": \"number\"\n      },\n      \"label\": {\n        \"type\": \"string\"\n      }\n    }\n  }\n}"

---
