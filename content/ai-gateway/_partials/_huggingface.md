---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface`

When making requests to HuggingFace Inference API, replace `https://api-inference.huggingface.co/models/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface`. Note that the model you’re trying to access should come right after, for example `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface/bigcode/starcoder`.


```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface/bigcode/starcoder -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "inputs": "console.log"
}'
```

If you are using the HuggingFace.js library, you can set your inference endpoint like this:

```javascript
---
filename: index.js
---
import { HfInferenceEndpoint } from '@huggingface/inference'

const hf = new HfInferenceEndpoint(
	"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/huggingface/gpt2",
	env.HF_API_TOKEN
);
```