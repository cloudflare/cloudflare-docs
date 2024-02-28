---
model:
  id: "9d2ab560-065e-4d0d-a789-d4bc7468d33e"
  source: 1
  name: "@cf/thebloke/discolm-german-7b-v1-awq"
  description: "DiscoLM German 7b is a Mistral-based large language model with a focus on German-language applications. AWQ is an efficient, accurate and blazing-fast low-bit weight quantization method, currently supporting 4-bit quantization."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "text-generation"
  properties: []
task_type: "text-generation"
model_display_name: "discolm-german-7b-v1-awq"
layout: "model"
title: "discolm-german-7b-v1-awq"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
