---
model:
  id: "7912c0ab-542e-44b9-b9ee-3113d226a8b5"
  source: 1
  name: "@cf/lykon/dreamshaper-8-lcm"
  description: "Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: "Generates images from input text. These models can be used to generate and modify images based on text prompts."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/Lykon/DreamShaper"
task_type: "text-to-image"
model_display_name: "dreamshaper-8-lcm"
layout: "model"
weight: 0
title: "dreamshaper-8-lcm"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"prompt\": {\n      \"type\": \"string\",\n      \"minLength\": 1\n    },\n    \"negative_prompt\": {\n      \"type\": \"string\"\n    },\n    \"height\": {\n      \"type\": \"integer\",\n      \"maximum\": 1024\n    },\n    \"width\": {\n      \"type\": \"integer\",\n      \"maximum\": 1024\n    },\n    \"image\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    },\n    \"image_b64\": {\n      \"type\": \"string\"\n    },\n    \"mask\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    },\n    \"num_steps\": {\n      \"type\": \"integer\",\n      \"default\": 20,\n      \"maximum\": 20\n    },\n    \"strength\": {\n      \"type\": \"number\",\n      \"default\": 1\n    },\n    \"guidance\": {\n      \"type\": \"number\",\n      \"default\": 7.5\n    },\n    \"seed\": {\n      \"type\": \"integer\"\n    }\n  },\n  \"required\": [\n    \"prompt\"\n  ]\n}"
  output: "{\n  \"type\": \"string\",\n  \"contentType\": \"image/png\",\n  \"format\": \"binary\"\n}"

---
