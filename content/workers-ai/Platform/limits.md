---
pcx_content_type: configuration
title: Limits
weight: 4
---

# Limits

{{<Aside>}}
Workers AI is currently in Open Beta and is **not recommended for production data and traffic**, and limits + access are subject to change
{{</Aside>}}

During the open beta, the following limits are place:

**Inference requests per minute (per model)**
 - @cf/meta/llama-2-7b-chat-int8 - 50 reqs/min globally
 - @cf/openai/whisper - 120 reqs/min globally
 - @cf/meta/m2m100-1.2b - 120 reqs/min globally
 - @cf/huggingface/distilbert-sst-2-int8 - 180 reqs/min globally
 - @cf/microsoft/resnet-50 - 180 reqs/min globally
 - @cf/baai/bge-base-en-v1.5 -1 80 reqs/min globally

 **Other Limits**
- @cf/meta/llama-2-7b-chat-int8 (max tokens) - 768 input / 256 output
- @cf/meta/m2m100-1.2b (max tokens) - 256 output
