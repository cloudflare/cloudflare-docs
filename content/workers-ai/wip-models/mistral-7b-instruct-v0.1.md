---
title: mistral-7b-instruct-v0.1
pcx_content_type: get-started
model:
  id: cf/mistral/mistral-7b-instruct-v0.1
  name: mistral-7b-instruct-v0.1
  description: Instruct fine-tuned version of the Mistral-7b generative text model with 7 billion parameters
  terms: https://www.example.com/
  infos: https://www.example.com/
  limits:
    - name: "Default max (sequence) tokens (stream)"
      value: 596
    - name: "Default max (sequence) tokens"
      value: 256
  params:
    - name: prompt
      type: string
      desc: this is sample text
    - name: raw
      type: boolean
      optional: true
      desc: this is more text

task_type: text-generation
task:
  name: Text Generation
  description: Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks.
related:
  - name: This will be a very helpful resource
    value: https://example.com
  - name: Also check out this one
    value: https://example.com
  - name: All good things come in three
    value: https://example.com
---

{{% model-display %}}
