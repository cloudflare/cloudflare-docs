---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/azure-openai/RESOURCE_NAME/MODEL_NAME`

When making requests to Azure OpenAI, specify the Azure OpenAI resource name and Azure OpenAI deployment name in your AI Gateway endpoint. Then replace your Azure OpenAI request URL with your AI Gateway endpoint. 


```bash
---
header: Request
---

curl --request POST \
  --url 'https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/azure-openai/RESOURCE_NAME/MODEL_NAME/chat/completions?api-version=2023-05-15' \
  --header 'Content-Type: application/json' \
  --header 'api-key: KEY' \
  --data '{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Does Azure OpenAI support customer managed keys?"
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
    baseURL: `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/azure-openai/${resource}/${model}`,
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': apiKey },
  });
```