---
model:
  id: "980ec5e9-33c2-483a-a2d8-cd092fdf273f"
  source: 2
  name: "@hf/thebloke/mistral-7b-instruct-v0.1-awq"
  description: "Mistral 7B Instruct v0.1 AWQ is an efficient, accurate and blazing-fast low-bit weight quantized Mistral variant."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "mistral"
    - "text-generation"
  properties:
    - property_id: "info"
      value: "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-AWQ"
task_type: "text-generation"
model_display_name: "mistral-7b-instruct-v0.1-awq"
layout: "model"
title: "mistral-7b-instruct-v0.1-awq"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
