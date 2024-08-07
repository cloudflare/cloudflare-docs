---
model:
  id: "19547f04-7a6a-4f87-bf2c-f5e32fb12dc5"
  source: 1
  name: "@cf/runwayml/stable-diffusion-v1-5-img2img"
  description: "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion. "
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: "Generates images from input text. These models can be used to generate and modify images based on text prompts."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/runwayml/stable-diffusion-v1-5"
    - property_id: "terms"
      value: "https://github.com/runwayml/stable-diffusion/blob/main/LICENSE"
task_type: "text-to-image"
model_display_name: "stable-diffusion-v1-5-img2img"
layout: "model"
weight: 0
title: "stable-diffusion-v1-5-img2img"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"prompt\": {\n      \"type\": \"string\",\n      \"minLength\": 1\n    },\n    \"negative_prompt\": {\n      \"type\": \"string\"\n    },\n    \"height\": {\n      \"type\": \"integer\",\n      \"maximum\": 1024\n    },\n    \"width\": {\n      \"type\": \"integer\",\n      \"maximum\": 1024\n    },\n    \"image\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    },\n    \"image_b64\": {\n      \"type\": \"string\"\n    },\n    \"mask\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    },\n    \"num_steps\": {\n      \"type\": \"integer\",\n      \"default\": 20,\n      \"maximum\": 20\n    },\n    \"strength\": {\n      \"type\": \"number\",\n      \"default\": 1\n    },\n    \"guidance\": {\n      \"type\": \"number\",\n      \"default\": 7.5\n    },\n    \"seed\": {\n      \"type\": \"integer\"\n    }\n  },\n  \"required\": [\n    \"prompt\"\n  ]\n}"
  output: "{\n  \"type\": \"string\",\n  \"contentType\": \"image/png\",\n  \"format\": \"binary\"\n}"

---
