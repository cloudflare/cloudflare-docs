---
model:
  id: "7912c0ab-542e-44b9-b9ee-3113d226a8b5"
  source: 1
  name: "@cf/lykon/dreamshaper-8-lcm"
  description: "Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: null
  tags:
    - "text-to-image"
  properties: []
task_type: "text-to-image"
model_display_name: "dreamshaper-8-lcm"
layout: "model"
title: "dreamshaper-8-lcm"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"prompt\": {\n      \"type\": \"string\"\n    },\n    \"image\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"image\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"mask\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"mask\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"num_steps\": {\n      \"type\": \"integer\",\n      \"default\": 20,\n      \"maximum\": 20\n    }\n  },\n  \"required\": [\n    \"prompt\"\n  ]\n}"
  output: "{\n  \"type\": \"string\",\n  \"contentType\": \"image/png\",\n  \"format\": \"binary\"\n}"

---
