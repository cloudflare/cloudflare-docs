---
model:
  id: "6d52253a-b731-4a03-b203-cde2d4fae871"
  source: 1
  name: "@cf/stabilityai/stable-diffusion-xl-base-1.0"
  description: "Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: "Generates images from input text. These models can be used to generate and modify images based on text prompts."
  tags:
    - "stabilityai"
    - "text-to-image"
  properties:
    - property_id: "terms"
      value: "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md"
    - property_id: "info"
      value: "https://stability.ai/stable-diffusion"
    - property_id: "constellation_config"
      value: "# infer_response_cache: r2\n\nmax_requests_per_min:\n  default: 120\n  accounts:\n    32118455: 1440 # ai.cloudflare.com staging\n    50147400: 1440 # ai.cloudflare.com\n    13852056: 1440 # Firewall Team for `@RespectTables ai`\n\nneurons:\n  metrics:\n    - name: inference_steps\n      neuron_cost: 0\nmax_concurrent_requests: 1"
task_type: "text-to-image"
model_display_name: "stable-diffusion-xl-base-1.0"
layout: "model"
title: "stable-diffusion-xl-base-1.0"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"prompt\": {\n      \"type\": \"string\"\n    },\n    \"image\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"image\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"mask\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"format\": \"binary\"\n        },\n        {\n          \"type\": \"object\",\n          \"properties\": {\n            \"mask\": {\n              \"type\": \"array\",\n              \"items\": {\n                \"type\": \"number\"\n              }\n            }\n          }\n        }\n      ]\n    },\n    \"num_steps\": {\n      \"type\": \"integer\",\n      \"default\": 20,\n      \"maximum\": 20\n    },\n    \"strength\": {\n      \"type\": \"number\",\n      \"default\": 1\n    },\n    \"guidance\": {\n      \"type\": \"number\",\n      \"default\": 7.5\n    }\n  },\n  \"required\": [\n    \"prompt\"\n  ]\n}"
  output: "{\n  \"type\": \"string\",\n  \"contentType\": \"image/png\",\n  \"format\": \"binary\"\n}"

---
