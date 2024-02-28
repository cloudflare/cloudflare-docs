---
model:
  id: "6d52253a-b731-4a03-b203-cde2d4fae871"
  source: 1
  name: "@cf/stabilityai/stable-diffusion-xl-base-1.0"
  description: "Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts."
  task:
    id: "3d6e1f35-341b-4915-a6c8-9a7142a9033a"
    name: "Text-to-Image"
    description: null
  tags:
    - "stabilityai"
    - "text-to-image"
  properties:
    - property_id: "terms"
      value: "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md"
    - property_id: "info"
      value: "https://stability.ai/stable-diffusion"
    - property_id: "constellation_config"
      value: "# infer_response_cache: r2\n\nmax_requests_per_min:\n  default: 120\n  accounts:\n    32118455: 1440 # ai.cloudflare.com staging\n    50147400: 1440 # ai.cloudflare.com\n    13852056: 1440 # Firewall Team for `@RespectTables ai`\n\nneurons:\n  metrics:\n    - name: inference_steps\n      neuron_cost: 0\nmax_concurrent_requests: 1"
task_type: "text-to-image"
model_display_name: "stable-diffusion-xl-base-1.0"
layout: "model"
title: "stable-diffusion-xl-base-1.0"
json_schema:
  input: "{\"type\":\"object\",\"properties\":{\"prompt\":{\"type\":\"string\"},\"image\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"image\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"mask\":{\"oneOf\":[{\"type\":\"string\",\"format\":\"binary\"},{\"type\":\"object\",\"properties\":{\"mask\":{\"type\":\"array\",\"items\":{\"type\":\"number\"}}}}]},\"num_steps\":{\"type\":\"integer\",\"default\":20,\"maximum\":20}},\"required\":[\"prompt\"]}"
  output: "{\"type\":\"string\",\"contentType\":\"image/png\",\"format\":\"binary\"}"

---
