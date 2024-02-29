---
model:
  id: "9c95c39d-45b3-4163-9631-22f0c0dc3b14"
  source: 1
  name: "@cf/meta/llama-2-7b-chat-int8"
  description: "Quantized (int8) generative text model with 7 billion parameters from Meta"
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "meta"
    - "text-generation"
  properties:
    - property_id: "terms"
      value: "https://ai.meta.com/resources/models-and-libraries/llama-downloads/"
    - property_id: "info"
      value: "https://ai.meta.com/llama/"
    - property_id: "context_length_limit"
      value: "2048"
    - property_id: "sequence_length_limit"
      value: "1800"
    - property_id: "constellation_config"
      value: "infer_response_cache: in_memory\n\nmax_requests_per_min:\n  default: 5\n  accounts:\n    32118455: 60 # ai.cloudflare.com staging\n    50147400: 60 # ai.cloudflare.com\n    48546443: 1000 # workers ai\n    56599770: 1000 # talkmap\n\nneurons:\n  metrics:\n    - name: input_tokens\n      neuron_cost: 0.1836\n    - name: output_tokens\n      neuron_cost: 0.1836\nmax_concurrent_requests: 4"
task_type: "text-generation"
model_display_name: "llama-2-7b-chat-int8"
layout: "model"
title: "llama-2-7b-chat-int8"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"oneOf\": [\n    {\n      \"properties\": {\n        \"prompt\": {\n          \"type\": \"string\",\n          \"maxLength\": 4096\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        }\n      },\n      \"required\": [\n        \"prompt\"\n      ]\n    },\n    {\n      \"properties\": {\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 4096\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        }\n      },\n      \"required\": [\n        \"messages\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"oneOf\": [\n    {\n      \"type\": \"object\",\n      \"contentType\": \"application/json\",\n      \"properties\": {\n        \"response\": {\n          \"type\": \"string\"\n        }\n      }\n    },\n    {\n      \"type\": \"string\",\n      \"contentType\": \"text/event-stream\",\n      \"format\": \"binary\"\n    }\n  ]\n}"

---
