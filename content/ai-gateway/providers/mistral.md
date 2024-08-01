---
title: Mistral AI Platform
pcx_content_type: get-started
---

{{<heading-pill style="beta">}}Mistral AI Platform{{</heading-pill>}}

[Mistral AI Platform](https://mistral.ai) helps you build quickly with Mistral's advanced AI models.

## Endpoint

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral`

## What you need

When making requests to the Mistral AI Platform, you will need:

- AI Gateway Account ID
- AI Gateway gateway name
- Mistral AI account ID
- Mistral AI gateway name
- Mistral AI Platform API token
- Mistral AI model name

## URL structure

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/{account_tag}/{gateway}/mistral/`.

Then you can append the endpoint you want to hit, for example: `v1/chat/completions`

So your final URL will come together as: `https://gateway.ai.cloudflare.com/v1/{account_tag}/{gateway}/mistral/v1/chat/completions`.

## Examples

### cURL

```bash
---
header: Example fetch request
---
curl -X POST https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/mistral/v1/chat/completions \
 --header 'content-type: application/json' \
 --header 'Authorization: Bearer MISTRAL_TOKEN' \
 --data '{
    "model": "mistral-large-latest",
    "messages": [
        {
            "role": "user",
            "content": "What is Cloudflare?"
        }
    ]
}'
```

### JavaScript

If you are using the `@mistralai/mistralai` package, you can set your endpoint like this:

```js
---
header: JavaScript example
---
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
    apiKey: MISTRAL_TOKEN,
    serverURL: `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/mistral`,
});

await client.chat.create({
    model: 'mistral-large-latest',
    messages: [
        {
            role: 'user',
            content: 'What is Cloudflare?',
        },
    ],
});
```
