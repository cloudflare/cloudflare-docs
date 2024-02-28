---
model:
  id: "7f797b20-3eb0-44fd-b571-6cbbaa3c423b"
  source: 1
  name: "@cf/bytedance/stable-diffusion-xl-lightning"
  description: "SDXL-Lightning is a lightning-fast text-to-image generation model. It can generate high-quality 1024px images in a few steps."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: null
  tags:
    - "text-to-image"
  properties: []
task_type: "text-to-image"
model_display_name: "stable-diffusion-xl-lightning"
layout: "model"
title: "stable-diffusion-xl-lightning"
json_schema:
  input: "{\"type\":\"object\",\"properties\":{\"prompt\":{\"type\":\"string\"},\"image\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"mask\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"mask\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"num_steps\":{\"type\":\"integer\",\"default\":20,\"maximum\":20}},\"required\":[\"prompt\"]}"
  output: "{\"type\":\"string\",\"contentType\":\"image/png\",\"format\":\"binary\"}"

---
