---
pcx_content_type: configuration
weight: 3
title: OpenAI compatible API endpoints
---

# OpenAI compatible API endpoints

Workers AI supports OpenAI compatible endpoints for [text generation](/workers-ai/models/#text-generation) (`/v1/chat/completions`) and [text embedding models](/workers-ai/models/#text-embeddings) (`/v1/embeddings`). This allows you to use the same code as you would for your OpenAI commands, but swap in Workers AI more easily.

## Usage

Normally, Workers AI requires you to specify the model name in the cURL endpoint or within the `env.AI.run` function.

With OpenAI compatible endpoints, Workers AI supports examples like the following:

```js
---
header: Example script
---
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: c.env.CLOUDFLARE_API_KEY,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${c.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`
 });

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Make some robot noises" }],
  model: "@cf/meta/llama-3-8b-instruct",
 });
```