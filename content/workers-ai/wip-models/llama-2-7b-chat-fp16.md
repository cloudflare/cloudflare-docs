---
model:
  id: "ca54bcd6-0d98-4739-9b3b-5c8b4402193d"
  source: 1
  name: "@cf/meta/llama-2-7b-chat-fp16"
  description: "Full precision (fp16) generative text model with 7 billion parameters from Meta"
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
      value: "3072"
    - property_id: "sequence_length_limit"
      value: "2500"
    - property_id: "constellation_config"
      value: "infer_response_cache: in_memory\n\nmax_requests_per_min:\n  default: 5\n  accounts:\n    32118455: 60 # ai.cloudflare.com staging\n    50147400: 60 # ai.cloudflare.com\n\nneurons:\n  metrics:\n    - name: input_tokens\n      neuron_cost: 0.3672\n    - name: output_tokens\n      neuron_cost: 0.3672\nmax_concurrent_requests: 1"
task_type: "text-generation"
model_display_name: "llama-2-7b-chat-fp16"
layout: "model"
title: "llama-2-7b-chat-fp16"

---

TODO: JSON Schemas