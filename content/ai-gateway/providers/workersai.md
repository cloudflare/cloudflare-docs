---
title: Workers AI
pcx_content_type: configuration
weight: 2
---

# Workers AI

Use AI Gateway for analytics, caching, and security on requests to [Workers AI](/workers-ai/).

## REST API

To interact with a REST API, update the URL used for your request:

- **Previous**: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_id}`
- **New**: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/{model_id}`

For these parameters:

- `{account_id}` is your Cloudflare [account ID](/workers-ai/get-started/rest-api/#1-get-api-token-and-account-id).
- `{gateway_id}` refers to the name of your existing [AI Gateway](/ai-gateway/get-started/#create-gateway).
- `{model_id}` refers to the model ID of the [Workers AI model](/workers-ai/models/).

## Examples

First, generate an [API token](/fundamentals/api/get-started/create-token/) with `Workers AI Read` access and use it in your request.

```bash
---
header: Request to Workers AI llama model
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/meta/llama-3.1-8b-instruct \
 --header 'Authorization: Bearer {cf_api_token}' \
 --header 'Content-Type: application/json' \
 --data '{"prompt": "What is Cloudflare?"}'
```

```bash
---
header: Request to Workers AI text classification model
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/huggingface/distilbert-sst-2-int8 \
  --header 'Authorization: Bearer {cf_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{ "text": "Cloudflare docs are amazing!" }'
```

### OpenAI compatible endpoints

{{<render file="_openai-compatibility.md" productFolder="workers-ai">}}
<br/>

```bash
---
header: Request to OpenAI compatible endpoint
---
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/v1/chat/completions \
 --header 'Authorization: Bearer {cf_api_token}' \
 --header 'Content-Type: application/json' \
 --data '{
      "model": "@cf/meta/llama-3.1-8b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
'
```

### Worker

To include an AI Gateway within your Worker, add the gateway as an object in your Workers AI request.

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        prompt: "Why should you use Cloudflare for your AI inference?"
      },
      {
        gateway: {
          id: "{gateway_id}",
          skipCache: false,
          cacheTtl: 3360
        }
      }
    );
    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
```

Workers AI supports the following parameters for AI gateways:

{{<definitions>}}

- `id` {{<type>}}string{{</type>}}
  - Name of your existing [AI Gateway](/ai-gateway/get-started/#create-gateway). Must be in the same account as your Worker.
- `skipCache` {{<type>}}boolean{{</type>}}{{<prop-meta>}}(default: false){{</prop-meta>}}
  - Controls whether the request should [skip the cache](/ai-gateway/configuration/caching/#skip-cache-cf-skip-cache).
- `cacheTtl` {{<type>}}number{{</type>}}
  - Controls the [Cache TTL](/ai-gateway/configuration/caching/#cache-ttl-cf-cache-ttl).

{{</definitions>}}
