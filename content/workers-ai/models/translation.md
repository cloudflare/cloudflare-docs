---
title: Translation
pcx_content_type: get-started
weight: 3
---

# Translation
No Language Left Behind (NLLB) was trained on multilingual data for translation between a set of 200 languages.

* ID:  **@cf/meta/nllb-200-1.3b** - used to `run` this model via SDK or API
* Name: Quantized Llama 2 chat model from Met
* Task: text-generation

## Examples
{{<tabs labels="worker | node | python | curl">}}
{{<tab label="worker" default="true">}}

```js
import { Ai } from '@cloudflare/ai'

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const  = ai.run('@cf/meta/nllb-200-1.3b', {
        text: "I'll have an order of the moule frites",
        language: "french" 
      }
    );

    return new Response(JSON.stringify(answer));
  },
};
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer {API_TOKEN}" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

run('@cf/meta/nllb-200-1.3b', {
        text: "I'll have an order of the moule frites",
        language: "french"
}).then((response) => {
    console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, input)
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()
    
output = run('@cf/meta/nllb-200-1.3b', {
  text: "I'll have an order of the moule frites",
  language: "french" 
})
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/nllb-200-1.3b \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{ "text": "I'll have an order of the moule frites", "language": "french" }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "result": {
    "translated_text": "Je vais commander des moules frites",
  "success": true,
  "errors":[],
  "messages":[]
}
```

## Input/Output schemas
The following schemas are based on [JSON Schema](https://json-schema.org/)

**Input**
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "text",
      "language"
    },
    "required": ["text", "language"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "translated_text": {
        "type": "string"
      }
    }
  }
}
```
