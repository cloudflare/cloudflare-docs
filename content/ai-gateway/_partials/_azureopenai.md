---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/azure-openai/RESOURCE_NAME/MODEL_NAME`

When making requests to Azure OpenAI, you will need:
- AI Gateway account tag
- AI Gateway gateway name
- Azure OpenAI API key
- Azure OpenAI resource name
- Azure OpenAI deployment name (aka model name)

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/azure-openai/RESOURCE_NAME/DEPLOYMENT_NAME`. Then, you can append your endpoint and api-version at the end of the base URL, like `.../chat/completions?api-version=2023-05-15`.


```bash
---
header: Example fetch request
---

curl --request POST \
  --url 'https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/azure-openai/RESOURCE_NAME/DEPLOYMENT_NAME/chat/completions?api-version=2023-05-15' \
  --header 'Content-Type: application/json' \
  --header 'api-key: {azure_api_key}' \
  --data '{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
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
    baseURL: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/azure-openai/${resource}/${model}`,
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': apiKey },
  });
```
