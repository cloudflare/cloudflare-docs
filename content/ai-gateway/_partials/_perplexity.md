---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai`


```bash
---
header: Example fetch request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai/chat/completions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'Authorization: Bearer {perplexity_token}' \
     --data '{
      "model": "mistral-7b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }'
```

Perplexity doesn't have their own SDK, but they have compatibility with the OpenAI SDK. You can use the OpenAI SDK to make a Perplexity call through AI Gateway as follows:

```javascript
---
filename: index.js
---
import OpenAI from "openai";

const perplexity = new OpenAI({
  apiKey: env.PERPLEXITY_API_KEY,
  baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai"
});

const chatCompletion = await perplexity.chat.completions.create({
  model: "mistral-7b-instruct",
  messages: [{role: "user", content: "What is Cloudflare?"}],
  max_tokens: 20,
});
```