---
pcx_content_type: configuration
title: Fallbacks
weight: 2
---

# Provider and model fallbacks

Specify model or provider fallback with your [Universal endpoint](/ai-gateway/providers/universal/) to specify what to do if a request fails.

## Example

For example, you could set up a gateway endpoint that:
1. Sends a request to Workers AI Inference API.
2. If that request fails, proceeds to OpenAI.

```mermaid
graph TD
    A[AI Gateway] --> B[Request to Workers AI Inference API]
    B -->|Success| C[Return Response]
    B -->|Failure| D[Request to OpenAI API]
    D --> E[Return Response]
```
<br/>

You can add as many fallbacks as you need, just by adding another object in the array.

{{<render file="_universal-gateway-example.md">}}