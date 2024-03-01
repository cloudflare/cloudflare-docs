---
model:
  id: "d9b7a55c-cefa-4208-8ab3-11497a2b046c"
  source: 2
  name: "@hf/thebloke/llamaguard-7b-awq"
  description: "Llama Guard is provided as-is without any representations, warranties, or guarantees. Any rules or examples contained in blogs, developer docs, or other reference materials are provided for informational purposes only. You acknowledge and agree that you are responsible for the results and outcomes of your use of Workers AI. Cloudflare has no control or authority over the third-party models, which are provided to you subject to separate third-party licenses between you and the model provider."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags:
    - "huggingface"
    - "text-generation"
  properties:
    - property_id: "beta"
      value: "true"
task_type: "text-generation"
model_display_name: "llamaguard-7b-awq"
layout: "model"
title: "llamaguard-7b-awq"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"oneOf\": [\n    {\n      \"properties\": {\n        \"prompt\": {\n          \"type\": \"string\",\n          \"maxLength\": 4096\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        }\n      },\n      \"required\": [\n        \"prompt\"\n      ]\n    },\n    {\n      \"properties\": {\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 4096\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        }\n      },\n      \"required\": [\n        \"messages\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"oneOf\": [\n    {\n      \"type\": \"object\",\n      \"contentType\": \"application/json\",\n      \"properties\": {\n        \"response\": {\n          \"type\": \"string\"\n        }\n      }\n    },\n    {\n      \"type\": \"string\",\n      \"contentType\": \"text/event-stream\",\n      \"format\": \"binary\"\n    }\n  ]\n}"

---
