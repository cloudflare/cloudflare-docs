---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic`


```bash
---
header: Example fetch request
---
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'x-api-key: {anthropic_api_key}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

If you are using the `@anthropic-ai/sdk`, you can set your endpoint like this:

```javascript
---
filename: index.js
---
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
  baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic",
});

const message = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  messages: [{role: "user", content: "What is Cloudflare?"}],
  max_tokens: 1024
});
```