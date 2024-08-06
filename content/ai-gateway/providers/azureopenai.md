---
title: Azure OpenAI
pcx_content_type: get-started
---

# Azure OpenAI
[Azure OpenAI](https://azure.microsoft.com/en-gb/products/ai-services/openai-service/) allows you apply natural language algorithms on your data.

## Endpoint

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/azure-openai/{resource_name}/{deployment_name}`

## What you need

When making requests to Azure OpenAI, you will need:
- AI Gateway account ID
- AI Gateway gateway name
- Azure OpenAI API key
- Azure OpenAI resource name
- Azure OpenAI deployment name (aka model name)

## URL structure

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/azure-openai/{resource_name}/{deployment_name}`. Then, you can append your endpoint and api-version at the end of the base URL, like `.../chat/completions?api-version=2023-05-15`.

## Examples

```bash
---
header: Example fetch request
---

curl 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/azure-openai/{resource_name}/{deployment_name}/chat/completions?api-version=2023-05-15' \
  --header 'Content-Type: application/json' \
  --header 'api-key: {azure_api_key}' \
  --data '{
  "messages": [
    {
      "role": "user",
      "content": "What is Cloudflare?"
    }
  ]
}'
```

If you are using the `openai-node` library, you can set your endpoint like this:

```javascript
---
filename: index.js
---
import OpenAI from "openai";

  const resource = 'xxx'; //without the .openai.azure.com
  const model = 'xxx';
  const apiVersion = 'xxx';
  const apiKey = env.AZURE_OPENAI_API_KEY;

  const azure_openai = new OpenAI({
    apiKey,
    baseURL: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/azure-openai/${resource}/${model}`,
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': apiKey },
  });
```
