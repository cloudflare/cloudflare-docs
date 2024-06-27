---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface`

When making requests to HuggingFace Inference API, replace `https://api-inference.huggingface.co/models/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface`. Note that the model you’re trying to access should come right after, for example `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface/bigcode/starcoder`.


```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface/bigcode/starcoder \
  --header 'Authorization: Bearer {hf_api_token}' \
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
	"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface/gpt2",
	env.HF_API_TOKEN
);
```