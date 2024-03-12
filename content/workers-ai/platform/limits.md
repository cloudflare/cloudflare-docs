---
pcx_content_type: configuration
title: Limits
weight: 2
---

# Limits

During the open beta, the following limits are in place:

**Inference requests per minute (per model)**

- [@cf/meta/llama-2-7b-chat-int8](/workers-ai/models/#text-generation) - 50 requests/minute.
- [@cf/openai/whisper](/workers-ai/models/#automatic-speech-recognition) - 4,000 requests/minute.
- [@cf/meta/m2m100-1.2b](/workers-ai/models/#translation) - 4,000 reqs/min
- [@cf/huggingface/distilbert-sst-2-int8](/workers-ai/models/#text-classification) - 6,000 requests/minute.
- [@cf/microsoft/resnet-50](/workers-ai/models/#image-classification) - 6,000 requests/minute.
- [@cf/baai/bge-base-en-v1.5](/workers-ai/models/#text-embeddings) - 6,000 requests/minute.

Note that these limits are estimates, subject to change, and will vary by location while in open beta.

Model inferences in local mode using Wrangler will also count towards these limits.
