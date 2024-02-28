---
model:
  id: "90a20ae7-7cf4-4eb3-8672-8fc4ee580635"
  source: 1
  name: "@cf/qwen/qwen1.5-7b-chat-awq"
  description: "Qwen1.5 is the improved version of Qwen, the large language model series developed by Alibaba Cloud. AWQ is an efficient, accurate and blazing-fast low-bit weight quantization method, currently supporting 4-bit quantization."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "text-generation"
  properties: []
task_type: "text-generation"
model_display_name: "qwen1.5-7b-chat-awq"
layout: "model"
title: "qwen1.5-7b-chat-awq"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
