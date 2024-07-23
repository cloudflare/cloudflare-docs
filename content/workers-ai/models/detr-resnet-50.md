---
model:
  id: "cc34ce52-3059-415f-9a48-12aa919d37ee"
  source: 1
  name: "@cf/facebook/detr-resnet-50"
  description: "DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images)."
  task:
    id: "9c178979-90d9-49d8-9e2c-0f1cf01815d4"
    name: "Object Detection"
    description: "Object detection models can detect instances of objects like persons, faces, license plates, or others in an image. This task takes an image as input and returns a list of detected objects, each one containing a label, a probability score, and its surrounding box coordinates."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
task_type: "object-detection"
model_display_name: "detr-resnet-50"
layout: "model"
weight: 0
title: "detr-resnet-50"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"image\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    }\n  ]\n}"
  output: "{\n  \"type\": \"array\",\n  \"contentType\": \"application/json\",\n  \"items\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"score\": {\n        \"type\": \"number\"\n      },\n      \"label\": {\n        \"type\": \"string\"\n      },\n      \"box\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"xmin\": {\n            \"type\": \"number\"\n          },\n          \"ymin\": {\n            \"type\": \"number\"\n          },\n          \"xmax\": {\n            \"type\": \"number\"\n          },\n          \"ymax\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    }\n  }\n}"

---
