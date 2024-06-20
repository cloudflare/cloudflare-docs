---
model:
  id: "bf6ddd21-6477-4681-bbbe-24c3d5423e78"
  source: 1
  name: "@cf/tinyllama/tinyllama-1.1b-chat-v1.0"
  description: "The TinyLlama project aims to pretrain a 1.1B Llama model on 3 trillion tokens. This is the chat model finetuned on top of TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0"
task_type: "text-generation"
model_display_name: "tinyllama-1.1b-chat-v1.0"
layout: "model"
weight: 0
title: "tinyllama-1.1b-chat-v1.0"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"oneOf\": [\n    {\n      \"properties\": {\n        \"prompt\": {\n          \"type\": \"string\",\n          \"minLength\": 1,\n          \"maxLength\": 6144\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        }\n      },\n      \"required\": [\n        \"prompt\"\n      ]\n    },\n    {\n      \"properties\": {\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 6144\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        }\n      },\n      \"required\": [\n        \"messages\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"oneOf\": [\n    {\n      \"type\": \"object\",\n      \"contentType\": \"application/json\",\n      \"properties\": {\n        \"response\": {\n          \"type\": \"string\"\n        }\n      }\n    },\n    {\n      \"type\": \"string\",\n      \"contentType\": \"text/event-stream\",\n      \"format\": \"binary\"\n    }\n  ]\n}"

---
