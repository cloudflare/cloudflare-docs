---
model:
  id: "e5ca943b-720f-4e66-aa8f-40e3d2770933"
  source: 2
  name: "@hf/nexusflow/starling-lm-7b-beta"
  description: "We introduce Starling-LM-7B-beta, an open large language model (LLM) trained by Reinforcement Learning from AI Feedback (RLAIF). Starling-LM-7B-beta is trained from Openchat-3.5-0106 with our new reward model Nexusflow/Starling-RM-34B and policy optimization method Fine-Tuning Language Models from Human Preferences (PPO)."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/Nexusflow/Starling-LM-7B-beta"
    - property_id: "max_batch_prefill_tokens"
      value: "8192"
    - property_id: "max_input_length"
      value: "3072"
    - property_id: "max_total_tokens"
      value: "4096"
task_type: "text-generation"
model_display_name: "starling-lm-7b-beta"
layout: "model"
weight: 0
title: "starling-lm-7b-beta"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"oneOf\": [\n    {\n      \"properties\": {\n        \"prompt\": {\n          \"type\": \"string\",\n          \"minLength\": 1,\n          \"maxLength\": 6144\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"lora\": {\n          \"type\": \"string\"\n        }\n      },\n      \"required\": [\n        \"prompt\"\n      ]\n    },\n    {\n      \"properties\": {\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 6144\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        }\n      },\n      \"required\": [\n        \"messages\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"oneOf\": [\n    {\n      \"type\": \"object\",\n      \"contentType\": \"application/json\",\n      \"properties\": {\n        \"response\": {\n          \"type\": \"string\"\n        }\n      }\n    },\n    {\n      \"type\": \"string\",\n      \"contentType\": \"text/event-stream\",\n      \"format\": \"binary\"\n    }\n  ]\n}"

---
