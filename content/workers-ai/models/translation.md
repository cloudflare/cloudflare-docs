---
title: Translation
pcx_content_type: get-started
weight: 3
---

# Translation

Translation models convert a sequence of text from one language to another.

* Task type: **translation**
* TypeScript class: **AiTranslation**

{{<render file="_npm-update.md">}}

## Available Embedding Models

List of available models in for this task type:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/meta/m2m100-1.2b`                   | Multilingual encoder-decoder (seq-to-seq) model trained for Many-to-Many multilingual translation<br/><strong>languages</strong>: english, chinese, french, spanish, arabic, russian, german, japanese, portuguese, hindi<br/>[More information](https://github.com/facebookresearch/fairseq/tree/main/examples/m2m_100)<br/>[Terms and license](https://github.com/facebookresearch/fairseq/blob/main/LICENSE)<br/>  |

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
  "type": "object",
  "properties": {
    "text": {
      "type": "string"
    },
    "source_lang": {
      "type": "string",
      "default": "en"
    },
    "target_lang": {
      "type": "string"
    }
  },
  "required": [
    "text",
    "target_lang"
  ]
}
```

TypeScript class: **AiTranslationInput**

### Output

```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "translated_text": {
      "type": "string"
    }
  }
}
```

TypeScript class: **AiTranslationOutput**
