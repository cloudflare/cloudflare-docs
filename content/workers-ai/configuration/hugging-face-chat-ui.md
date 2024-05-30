---
title: Hugging Face Chat UI
weight: 6
pcx_content_type: navigation
---

# Hugging Face Chat UI

Use Workers AI with [Chat UI](https://github.com/huggingface/chat-ui?tab=readme-ov-file#text-embedding-models), an open-source chat interface offered by Hugging Face.

## Prerequisites

You will need the following:
- A [Cloudflare account](https://dash.cloudflare.com).
- Your [Account ID](/fundamentals/setup/find-account-and-zone-ids/).
- An [API token](/workers-ai/get-started/rest-api/#1-get-an-api-token) for Workers AI.

## Setup

First, decide how to reference your Account ID and API token (either directly in your `.env.local` using the `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` variables or in the endpoint configuration).

Then, follow the rest of the setup instructions in the [Chat UI GitHub repository](https://github.com/huggingface/chat-ui?tab=readme-ov-file#text-embedding-models).

When setting up your models, specify the `cloudflare` endpoint.

```json
{
  "name" : "nousresearch/hermes-2-pro-mistral-7b",
  "tokenizer": "nousresearch/hermes-2-pro-mistral-7b",
  "parameters": {
    "stop": ["<|im_end|>"]
  },
  "endpoints" : [
    {
      "type": "cloudflare",
      // optionally specify these if not included in .env.local
      "accountId": "your-account-id",
      "apiToken": "your-api-token"
      //
    }
  ]
}
```

## Supported models

This template works with any [text generation models](/workers-ai/models/#text-generation) that begin with the `@hf` parameter.