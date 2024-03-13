---
model:
  id: "7f797b20-3eb0-44fd-b571-6cbbaa3c423b"
  source: 1
  name: "@cf/bytedance/stable-diffusion-xl-lightning"
  description: "SDXL-Lightning is a lightning-fast text-to-image generation model. It can generate high-quality 1024px images in a few steps."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: "Generates images from input text. These models can be used to generate and modify images based on text prompts."
  tags:
    - "text-to-image"
  properties:
    - property_id: "info"
      value: "https://huggingface.co/ByteDance/SDXL-Lightning"
    - property_id: "beta"
      value: "true"
task_type: "text-to-image"
model_display_name: "stable-diffusion-xl-lightning"
layout: "model"
weight: 0
title: "stable-diffusion-xl-lightning"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"prompt\": {\n      \"type\": \"string\"\n    },\n    \"image\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"image\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"mask\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"mask\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"num_steps\": {\n      \"type\": \"integer\",\n      \"default\": 20,\n      \"maximum\": 20\n    },\n    \"strength\": {\n      \"type\": \"number\",\n      \"default\": 1\n    },\n    \"guidance\": {\n      \"type\": \"number\",\n      \"default\": 7.5\n    }\n  },\n  \"required\": [\n    \"prompt\"\n  ]\n}"
  output: "{\n  \"type\": \"string\",\n  \"contentType\": \"image/png\",\n  \"format\": \"binary\"\n}"

---
