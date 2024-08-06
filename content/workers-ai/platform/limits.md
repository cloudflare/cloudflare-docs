---
pcx_content_type: configuration
title: Limits
weight: 2
---

# Limits

Workers AI is now Generally Available. We've updated our rate limits to reflect this.

Note that model inferences in local mode using Wrangler will also count towards these limits. Beta models may have lower rate limits while we work on performance and scale.

{{<render file="_custom_requirements.md">}}

Rate limits are default per task type, with some per-model limits defined as follows:

## Rate limits by task type

### [Automatic Speech Recognition](/workers-ai/models/#automatic-speech-recognition)
- 720 requests per minute

### [Image Classification](/workers-ai/models/#image-classification)
- 3000 requests per minute

### [Image-to-Text](/workers-ai/models/#image-to-text)
- 720 requests per minute

### [Object Detection](/workers-ai/models/#object-detection)
- 3000 requests per minute

### [Summarization](/workers-ai/models/#summarization)
- 1500 requests per minute

### [Text Classification](/workers-ai/models/#text-classification)
- 2000 requests per minute

### [Text Embeddings](/workers-ai/models/#text-embeddings)
- 3000 requests per minute
- [@cf/baai/bge-large-en-v1.5](/workers-ai/models/bge-large-en-v1.5/) is 1500 requests per minute

### [Text Generation](/workers-ai/models/#text-generation)
- 300 requests per minute
- [@hf/thebloke/mistral-7b-instruct-v0.1-awq](/workers-ai/models/mistral-7b-instruct-v0.1-awq/) is 400 requests per minute
- [@cf/microsoft/phi-2](/workers-ai/models/phi-2/) is 720 requests per minute
- [@cf/qwen/qwen1.5-0.5b-chat](/workers-ai/models/qwen1.5-0.5b-chat/) is 1500 requests per minute
- [@cf/qwen/qwen1.5-1.8b-chat](/workers-ai/models/qwen1.5-1.8b-chat/) is 720 requests per minute
- [@cf/qwen/qwen1.5-14b-chat-awq](/workers-ai/models/qwen1.5-14b-chat-awq/) is 150 requests per minute
- [@cf/tinyllama/tinyllama-1.1b-chat-v1.0](/workers-ai/models/tinyllama-1.1b-chat-v1.0/) is 720 requests per minute

### [Text-to-Image](/workers-ai/models/#text-to-image)
- 720 requests per minute
- [@cf/runwayml/stable-diffusion-v1-5-img2img](/workers-ai/models/stable-diffusion-v1-5-img2img/) is 1500 requests per minute

### [Translation](/workers-ai/models/#translation)
- 720 requests per minute