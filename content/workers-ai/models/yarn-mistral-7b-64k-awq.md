---
model:
  id: "75e8f9c6-f5ca-4adc-8ffd-3d40525539f2"
  source: 1
  name: "@cf/thebloke/yarn-mistral-7b-64k-awq"
  description: "Nous-Yarn-Mistral-7b-64k is a state-of-the-art language model for long context, further pretrained on long context data for 1000 steps using the YaRN extension method. It is an extension of Mistral-7B-v0.1 and supports a 64k token context window."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "text-generation"
  properties: []
task_type: "text-generation"
model_display_name: "yarn-mistral-7b-64k-awq"
layout: "model"
title: "yarn-mistral-7b-64k-awq"
json_schema:
  input: "{\"type\":\"object\",\"oneOf\":[{\"properties\":{\"prompt\":{\"type\":\"string\",\"maxLength\":4096},\"raw\":{\"type\":\"boolean\",\"default\":false},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"prompt\"]},{\"properties\":{\"messages\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"role\":{\"type\":\"string\"},\"content\":{\"type\":\"string\",\"maxLength\":4096}},\"required\":[\"role\",\"content\"]}},\"stream\":{\"type\":\"boolean\",\"default\":false},\"max_tokens\":{\"type\":\"integer\",\"default\":256}},\"required\":[\"messages\"]}]}"
  output: "{\"oneOf\":[{\"type\":\"object\",\"contentType\":\"application/json\",\"properties\":{\"response\":{\"type\":\"string\"}}},{\"type\":\"string\",\"contentType\":\"text/event-stream\",\"format\":\"binary\"}]}"

---
