---
model:
  id: "3dca5889-db3e-4973-aa0c-3a4a6bd22d29"
  source: 1
  name: "@cf/unum/uform-gen2-qwen-500m"
  description: "UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets."
  task:
    id: "882a91d1-c331-4eec-bdad-834c919942a8"
    name: "Image-to-Text"
    description: null
  tags:
    - "image-to-text"
  properties: []
task_type: "image-to-text"
model_display_name: "uform-gen2-qwen-500m"
layout: "model"
title: "uform-gen2-qwen-500m"
json_schema:
  input: "{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}},\"prompt\":{\"type\":\"string\"},\"max_tokens\":{\"type\":\"integer\"}}}]}"
  output: "{\"type\":\"array\",\"contentType\":\"application/json\",\"properties\":{\"description\":{\"type\":\"string\"}}}"

---
