---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/perplexity-ai`


```bash
---
header: Example fetch request
---

curl --request POST \
     --url https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/perplexity-ai/chat/completions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'Authorization: Bearer pplx-XXXXXXXXXXXXXXXXX' \
     --data '{
      "model": "mistral-7b-instruct",
      "messages": [
        {
          "role": "system",
          "content": "Be precise and concise."
        },
        {
          "role": "user",
          "content": "How many stars are there in our galaxy?"
        }
      ]
    }'
```

Perplexity doesn't have their own SDK, but they have compatability with the OpenAI SDK. You can use the OpenAI SDK to make a Perplexity call through AI Gateway as follows:

```javascript
---
filename: index.js
---
import OpenAI from "openai";

  const perplexity = new OpenAI({
    apiKey: env.PERPLEXITY_API_KEY,
    baseURL: "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/perplexity-ai"
  });

   const chatCompletion = await perplexity.chat.completions.create({
      model: "mistral-7b-instruct",
      messages: [{role: "user", content: "What is petrichor?"}],
      max_tokens: 20,
    });
```