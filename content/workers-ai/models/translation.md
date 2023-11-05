---
title: Translation
pcx_content_type: get-started
weight: 3
---

# Translation
M2M100 is a multilingual encoder-decoder (seq-to-seq) model trained for Many-to-Many multilingual translation.

* ID:  **@cf/meta/m2m100-1.2b** - used to `run` this model via SDK or API
* Task: Translation
* License type: MIT
* [Terms + Information](https://github.com/facebookresearch/fairseq/blob/main/LICENSE)

## Supported languages
The following languages are currently supported by the model:
*  english
*  chinese
*  french
*  spanish
*  arabic
*  russian
*  german
*  japanese
*  portuguese
*  hindi

## Examples
{{<tabs labels="worker | node | python | curl">}}
{{<tab label="worker" default="true">}}

```ts
import { Ai } from '@cloudflare/ai'

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const response = await ai.run('@cf/meta/m2m100-1.2b', {
        text: "I'll have an order of the moule frites",
        source_lang: "english", // defaults to english
        target_lang: "french"
      }
    );

    return new Response(JSON.stringify(response));
  },
}
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer {API_TOKEN}" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

run('@cf/meta/m2m100-1.2b', {
  text: "I'll have an order of the moule frites",
  source_lang: "english", // defaults to english
  target_lang: "french"
}).then((response) => {
    console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, input):
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

output = run('@cf/meta/m2m100-1.2b', {
  "text": "I'll have an order of the moule frites",
  "source_lang": "english",
  "target_lang": "french"
})

print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{ "text": "Ill have an order of the moule frites", "source_lang": "english", "target_lang": "french" }'
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

## API schema
The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  type: "object",
  properties: {
    text: {
      type: "string",
    },
    source_lang: {
      type: "string",
      default: "en",
    },
    target_lang: {
      type: "string",
    },
  },
  required: ["text", "target_lang"],
}
```

### Output

```json
{
  type: "object",
  properties: {
    translated_text: {
      type: "string",
    },
  },
}
```