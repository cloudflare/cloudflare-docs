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
  input: "{\"type\":\"object\",\"properties\":{\"prompt\":{\"type\":\"string\"},\"image\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"mask\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"mask\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"num_steps\":{\"type\":\"integer\",\"default\":20,\"maximum\":20}},\"required\":[\"prompt\"]}"
  output: "{\"type\":\"string\",\"contentType\":\"image/png\",\"format\":\"binary\"}"

---
