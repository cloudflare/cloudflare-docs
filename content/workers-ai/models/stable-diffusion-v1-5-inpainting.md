---
model:
  id: "a9abaef0-3031-47ad-8790-d311d8684c6c"
  source: 1
  name: "@cf/runwayml/stable-diffusion-v1-5-inpainting"
  description: "Stable Diffusion Inpainting is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, with the extra capability of inpainting the pictures by using a mask."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: null
  tags:
    - "text-to-image"
  properties: []
task_type: "text-to-image"
model_display_name: "stable-diffusion-v1-5-inpainting"
layout: "model"
title: "stable-diffusion-v1-5-inpainting"
json_schema:
  input: "{\"type\":\"object\",\"properties\":{\"prompt\":{\"type\":\"string\"},\"image\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"mask\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"mask\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"num_steps\":{\"type\":\"integer\",\"default\":20,\"maximum\":20}},\"required\":[\"prompt\"]}"
  output: "{\"type\":\"string\",\"contentType\":\"image/png\",\"format\":\"binary\"}"

---
