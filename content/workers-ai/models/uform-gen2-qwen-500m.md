---
model:
  id: "3dca5889-db3e-4973-aa0c-3a4a6bd22d29"
  source: 1
  name: "@cf/unum/uform-gen2-qwen-500m"
  description: "UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets."
  task:
    id: "882a91d1-c331-4eec-bdad-834c919942a8"
    name: "Image-to-Text"
    description: "Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://www.unum.cloud/"
task_type: "image-to-text"
model_display_name: "uform-gen2-qwen-500m"
layout: "model"
weight: 0
title: "uform-gen2-qwen-500m"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"temperature\": {\n          \"type\": \"number\"\n        },\n        \"prompt\": {\n          \"type\": \"string\"\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 6144\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"image\": {\n          \"oneOf\": [\n            {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            },\n            {\n              \"type\": \"string\",\n              \"format\": \"binary\"\n            }\n          ]\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 512\n        }\n      },\n      \"required\": [\n        \"image\"\n      ],\n      \"not\": {\n        \"required\": [\n          \"prompt\",\n          \"messages\"\n        ]\n      },\n      \"errorMessage\": {\n        \"not\": \"\\\"prompt\\\" and \\\"messages\\\" are mutually exclusive\"\n      }\n    }\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"description\": {\n      \"type\": \"string\"\n    }\n  }\n}"

---
