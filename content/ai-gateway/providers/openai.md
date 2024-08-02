---
title: OpenAI
pcx_content_type: get-started
---

# OpenAI
[OpenAI](https://openai.com/about/)  helps you build with ChatGPT.

## Endpoint

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai`

## URL structure

When making requests to OpenAI, replace `https://api.openai.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai`.

## Examples

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer {openai_token}' \
  --header 'Content-Type: application/json' \
  --data ' {
   		 "model": "gpt-4o-mini",
   		 "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare"
        }
   		 ]
   	 }
'
```


If you’re using a library like openai-node, set the `baseURL` to your OpenAI endpoint like this:

```javascript
---
filename: index.js
---
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: 'my api key', // defaults to process.env["OPENAI_API_KEY"]
	baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai"
});

try {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "What is a neuron?" }],
    max_tokens: 100,
  });

  const response = chatCompletion.choices[0].message;

  return new Response(JSON.stringify(response));
} catch (e) {
  return new Response(e);
}

```