---
model:
  id: "c907d0f9-d69d-4e93-b501-4daeb4fd69eb"
  source: 1
  name: "@cf/mistral/mistral-7b-instruct-v0.1"
  description: "Instruct fine-tuned version of the Mistral-7b generative text model with 7 billion parameters"
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "mistral"
    - "text-generation"
  properties:
    - property_id: "info"
      value: "https://mistral.ai/news/announcing-mistral-7b/"
    - property_id: "constellation_config"
      value: "max_concurrent_requests: 10"
task_type: "text-generation"
model_display_name: "mistral-7b-instruct-v0.1"
layout: "model"
title: "mistral-7b-instruct-v0.1"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
