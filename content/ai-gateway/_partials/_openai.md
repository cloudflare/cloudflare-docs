---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai`

When making requests to OpenAI, replace `https://api.openai.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai`.


```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai/chat/completions -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --data ' {
   		 "model": "gpt-3.5-turbo",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
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
	baseURL: "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai"
});

```