---
model:
  id: "19bd38eb-bcda-4e53-bec2-704b4689b43a"
  source: 1
  name: "@cf/facebook/bart-large-cnn"
  description: "BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. You can use this model for text summarization."
  task:
    id: "6f4e65d8-da0f-40d2-9aa4-db582a5a04fd"
    name: "Summarization"
    description: "Summarization is the task of producing a shorter version of a document while preserving its important information. Some models can extract text from the original input, while other models can generate entirely new text."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
task_type: "summarization"
model_display_name: "bart-large-cnn"
layout: "model"
weight: 0
title: "bart-large-cnn"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"input_text\": {\n      \"type\": \"string\",\n      \"minLength\": 1\n    },\n    \"max_length\": {\n      \"type\": \"integer\",\n      \"default\": 1024\n    }\n  },\n  \"required\": [\n    \"input_text\"\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"summary\": {\n      \"type\": \"string\"\n    }\n  }\n}"

---
