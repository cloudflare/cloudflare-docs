---
model:
  id: "44774b85-08c8-4bb8-8d2a-b06ebc538a79"
  source: 2
  name: "@hf/nousresearch/hermes-2-pro-mistral-7b"
  description: "Hermes 2 Pro on Mistral 7B is the new flagship 7B Hermes! Hermes 2 Pro is an upgraded, retrained version of Nous Hermes 2, consisting of an updated and cleaned version of the OpenHermes 2.5 Dataset, as well as a newly introduced Function Calling and JSON Mode dataset developed in-house."
  task:
    id: "c329a1f9-323d-4e91-b2aa-582dd4188d34"
    name: "Text Generation"
    description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
    - property_id: "function_calling"
      value: "true"
    - property_id: "info"
      value: "https://huggingface.co/NousResearch/Hermes-2-Pro-Mistral-7B"
    - property_id: "max_batch_prefill_tokens"
      value: "8192"
    - property_id: "max_input_length"
      value: "3072"
    - property_id: "max_total_tokens"
      value: "4096"
task_type: "text-generation"
model_display_name: "hermes-2-pro-mistral-7b"
layout: "model"
weight: 0
title: "hermes-2-pro-mistral-7b"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"oneOf\": [\n    {\n      \"properties\": {\n        \"prompt\": {\n          \"type\": \"string\",\n          \"minLength\": 1,\n          \"maxLength\": 6144\n        },\n        \"raw\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        }\n      },\n      \"required\": [\n        \"prompt\"\n      ]\n    },\n    {\n      \"properties\": {\n        \"messages\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"role\": {\n                \"type\": \"string\"\n              },\n              \"content\": {\n                \"type\": \"string\",\n                \"maxLength\": 6144\n              }\n            },\n            \"required\": [\n              \"role\",\n              \"content\"\n            ]\n          }\n        },\n        \"tools\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"type\": {\n                \"type\": \"string\"\n              },\n              \"function\": {\n                \"type\": \"object\",\n                \"properties\": {\n                  \"name\": {\n                    \"type\": \"string\"\n                  },\n                  \"description\": {\n                    \"type\": \"string\"\n                  },\n                  \"parameters\": {\n                    \"type\": \"object\",\n                    \"properties\": {\n                      \"type\": {\n                        \"type\": \"string\"\n                      },\n                      \"required\": {\n                        \"type\": \"array\",\n                        \"items\": {\n                          \"type\": \"string\"\n                        }\n                      },\n                      \"properties\": {\n                        \"type\": \"object\",\n                        \"additionalProperties\": {\n                          \"type\": \"object\",\n                          \"properties\": {\n                            \"type\": {\n                              \"type\": \"string\"\n                            },\n                            \"description\": {\n                              \"type\": \"string\"\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        },\n        \"stream\": {\n          \"type\": \"boolean\",\n          \"default\": false\n        },\n        \"max_tokens\": {\n          \"type\": \"integer\",\n          \"default\": 256\n        },\n        \"temperature\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 5\n        },\n        \"top_p\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"top_k\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 50\n        },\n        \"seed\": {\n          \"type\": \"integer\",\n          \"minimum\": 1,\n          \"maximum\": 9999999999\n        },\n        \"repetition_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"frequency_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        },\n        \"presence_penalty\": {\n          \"type\": \"number\",\n          \"minimum\": 0,\n          \"maximum\": 2\n        }\n      },\n      \"required\": [\n        \"messages\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"oneOf\": [\n    {\n      \"type\": \"object\",\n      \"contentType\": \"application/json\",\n      \"properties\": {\n        \"response\": {\n          \"type\": \"string\"\n        },\n        \"tool_calls\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"object\",\n            \"properties\": {\n              \"arguments\": {\n                \"type\": \"object\"\n              },\n              \"name\": {\n                \"type\": \"string\"\n              }\n            }\n          }\n        }\n      }\n    },\n    {\n      \"type\": \"string\",\n      \"contentType\": \"text/event-stream\",\n      \"format\": \"binary\"\n    }\n  ]\n}"

---
