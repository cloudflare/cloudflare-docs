---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic`


```bash
---
header: Example fetch request
---

curl -X POST https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic/v1/messages \
    -H 'x-api-key: XXX' \
    -H "anthropic-version: 2023-06-01" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "claude-3-opus-20240229",
      "max_tokens": 1024,
      "messages": [
          {"role": "user", "content": "Hello, world"}
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
  baseURL: "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic",
});

const message = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  messages: [{role: "user", content: "When is halloween?"}],
  max_tokens: 1024,

});

```