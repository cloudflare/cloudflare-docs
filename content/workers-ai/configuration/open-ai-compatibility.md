---
pcx_content_type: configuration
weight: 3
title: OpenAI compatible API endpoints
---

# OpenAI compatible API endpoints

{{<render file="_openai-compatibility.md">}}
<br/>

## Usage

### Workers AI

Normally, Workers AI requires you to specify the model name in the cURL endpoint or within the `env.AI.run` function.

With OpenAI compatible endpoints,you can leverage the [openai-node sdk](https://github.com/openai/openai-node) to make calls to Workers AI. This allows you to use Workers AI by simply changing the base URL and the model name.

```js
---
header: OpenAI SDK Example
---
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.CLOUDFLARE_API_KEY,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`
 });

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Make some robot noises" }],
  model: "@cf/meta/llama-3-8b-instruct",
 });

const embeddings = await openai.embeddings.create({
    model: "@cf/baai/bge-large-en-v1.5",
    input: "I love matcha"
  });

```

```bash
---
header: cURL example
---
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions \
  --header 'Authorization: Bearer {api_token}' \
  --header 'Content-Type: application/json' \
  --data '
    {
      "model": "@cf/meta/llama-3-8b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
        }
      ]
    }
'
```

### AI Gateway

These endpoints are also compatible with [AI Gateway](/ai-gateway/providers/workersai/#openai-compatible-endpoints).