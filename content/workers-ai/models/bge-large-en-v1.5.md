---
model:
  id: "01bc2fb0-4bca-4598-b985-d2584a3f46c0"
  source: 1
  name: "@cf/baai/bge-large-en-v1.5"
  description: "BAAI general embedding (bge) models transform any given text into a compact vector"
  task:
    id: "0137cdcf-162a-4108-94f2-1ca59e8c65ee"
    name: "Text Embeddings"
    description: "Feature extraction models transform raw data into numerical features that can be processed while preserving the information in the original dataset. These models are ideal as part of building vector search applications or Retrieval Augmented Generation workflows with Large Language Models (LLM)."
  tags: []
  properties:
    - property_id: "beta"
      value: "false"
    - property_id: "info"
      value: "https://huggingface.co/BAAI/bge-base-en-v1.5"
    - property_id: "max_input_tokens"
      value: "512"
    - property_id: "output_dimensions"
      value: "1024"
task_type: "text-embeddings"
model_display_name: "bge-large-en-v1.5"
layout: "model"
weight: 100
title: "bge-large-en-v1.5"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"text\": {\n      \"oneOf\": [\n        {\n          \"type\": \"string\",\n          \"minLength\": 1\n        },\n        {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"string\",\n            \"minLength\": 1\n          },\n          \"maxItems\": 100\n        }\n      ]\n    }\n  },\n  \"required\": [\n    \"text\"\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"shape\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"number\"\n      }\n    },\n    \"data\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"array\",\n        \"items\": {\n          \"type\": \"number\"\n        }\n      }\n    }\n  }\n}"

---
