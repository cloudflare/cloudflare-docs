---
model:
  id: "50c8a074-f308-442c-8115-f8dfba566a71"
  source: 2
  name: "@hf/thebloke/starling-lm-7b-alpha-awq"
  description: "Open large language model (LLM) trained by Reinforcement Learning from AI Feedback (RLAIF). The model harnesses the power of a new GPT-4 labeled ranking dataset. AWQ is an efficient, accurate and blazing-fast low-bit weight quantization method, currently supporting 4-bit quantization."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "experimental"
    - "text-generation"
  properties: []
task_type: "text-generation"
model_display_name: "starling-lm-7b-alpha-awq"
layout: "model"
title: "starling-lm-7b-alpha-awq"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
