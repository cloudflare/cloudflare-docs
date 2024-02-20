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
task_type: "text-generation"
model_display_name: "llama-2-7b-chat-int8"
title: "llama-2-7b-chat-int8"

---

{{% model-display %}}