---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq`

When making requests to [Groq](https://groq.com/), replace `https://api.groq.com/openai/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq`.

```bash
---
header: Example fetch request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq/chat/completions \
  --header 'Authorization: Bearer {groq_api_key}' \
  --header 'Content-Type: application/json' \
  --data '{
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ],
    "model": "mixtral-8x7b-32768"
}'
```

If using the [`groq-sdk`](https://www.npmjs.com/package/groq-sdk), set your endpoint like this:

```javascript
---
filename: index.js
---
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
	baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq"
});

const chatCompletion = await groq.chat.completions.create({
	messages: [{ role: 'user', content: 'What is Cloudflare?' }],
	model: 'mixtral-8x7b-32768',
});
```