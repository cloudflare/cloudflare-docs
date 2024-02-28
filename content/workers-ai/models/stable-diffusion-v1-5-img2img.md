---
model:
  id: "19547f04-7a6a-4f87-bf2c-f5e32fb12dc5"
  source: 1
  name: "@cf/runwayml/stable-diffusion-v1-5-img2img"
  description: "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion. "
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: null
  tags:
    - "text-to-image"
  properties: []
task_type: "text-to-image"
model_display_name: "stable-diffusion-v1-5-img2img"
layout: "model"
title: "stable-diffusion-v1-5-img2img"
json_schema:
  input: "{\"type\":\"object\",\"properties\":{\"prompt\":{\"type\":\"string\"},\"image\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"mask\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"mask\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"num_steps\":{\"type\":\"integer\",\"default\":20,\"maximum\":20}},\"required\":[\"prompt\"]}"
  output: "{\"type\":\"string\",\"contentType\":\"image/png\",\"format\":\"binary\"}"

---
