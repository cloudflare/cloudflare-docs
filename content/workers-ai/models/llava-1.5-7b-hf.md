---
model:
  id: "af274959-cb47-4ba8-9d8e-5a0a58b6b402"
  source: 1
  name: "@cf/llava-hf/llava-1.5-7b-hf"
  description: "LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture."
  task:
    id: "882a91d1-c331-4eec-bdad-834c919942a8"
    name: "Image-to-Text"
    description: "Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
task_type: "image-to-text"
model_display_name: "llava-1.5-7b-hf"
layout: "model"
weight: 0
title: "llava-1.5-7b-hf"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"temperature\": {\n          \"type\": \"number\"\n        },\n        \"prompt\": {\n          \"type\": \"string\"\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 6144\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"image\": {\n          \"oneOf\": [\n            {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            },\n            {\n              \"type\": \"string\",\n              \"format\": \"binary\"\n            }\n          ]\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 512\n        }\n      },\n      \"required\": [\n        \"image\"\n      ],\n      \"not\": {\n        \"required\": [\n          \"prompt\",\n          \"messages\"\n        ]\n      },\n      \"errorMessage\": {\n        \"not\": \"\\\"prompt\\\" and \\\"messages\\\" are mutually exclusive\"\n      }\n    }\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"description\": {\n      \"type\": \"string\"\n    }\n  }\n}"

---
