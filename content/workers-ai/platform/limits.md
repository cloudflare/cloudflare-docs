---
pcx_content_type: configuration
title: Limits
weight: 4
---

# Limits

{{<Aside>}}
Workers AI is currently in Open Beta and is **not recommended for production data and traffic**, and limits + access are subject to change
{{</Aside>}}

During the open beta, the following limits are in place:

**Inference requests per minute (per model)**
 - [@cf/meta/llama-2-7b-chat-int8](/workers-ai/models/text-generation/) - 50 reqs/min
 - [@cf/openai/whisper](/workers-ai/models/speech-recognition/) - 4000 reqs/min
 - [@cf/meta/m2m100-1.2b](/workers-ai/models/translation/) - 4000 reqs/min
 - [@cf/huggingface/distilbert-sst-2-int8](/workers-ai/models/text-classification/) - 6000 reqs/min
 - [@cf/microsoft/resnet-50](/workers-ai/models/image-classification/) - 6000 reqs/min
 - [@cf/baai/bge-base-en-v1.5](/workers-ai/models/text-embeddings/) - 6000 reqs/min

Note that these limits are estimates, subject to change, and will vary by location while in Open Beta.

Model inferences in local mode using Wrangler will also count towards these limits.