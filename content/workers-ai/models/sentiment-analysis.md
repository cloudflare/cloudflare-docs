---
title: Sentiment Analysis
pcx_content_type: get-started
weight: 4
---

# Sentiment Analysis
DistilBERT-SST-2 is a distilled BERT model that was finetuned on SST-2 for sentiment classification.

* ID: **@cf/huggingface/distilbert-sst-2-int8** - used to `run` this model via SDK or API
* Name: Quantized DistilBERT model finetuned for sentiment-analysis
* Task: text-classification

## Examples
{{<tabs labels="worker | node | python | curl">}}
{{<tab label="worker" default="true">}}

```js
import { Ai } from '@cloudflare.com/ai'

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const answer = ai.run({
        model: '@cf/huggingface/distilbert-sst-2-int8',
        input: {
            text: "This pizza is great!" 
        }
    });

    return new Response(JSON.stringify(answer));
  },
};
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, text) {
  const input = { input: { text } };
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

run('@cf/huggingface/distilbert-sst-2-int8', 'This pizza is great!').then((response) => {
    console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, text)
    input = { "input": { "text": text } }
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()
    
output = run("@cf/huggingface/distilbert-sst-2-int88", "This pizza is great!")
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-2-7b-chat-int8 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{ "input": { text: "This pizza is great!" } }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "result": {
    "items": [
      {
      "label": "POSITIVE",
      "score": 0.9998738765716553
      },
      {
        "label": "NEGATIVE",
        "score": 0.00012611268903128803
      }
    ],
  }
  success": true,
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
      "text": {
        "type": "string"
      }
    },
    "required": ["text"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "score": {
          "type": "number"
        },
        "label": {
          "type": "string"
        }
      }
    }
  }
}
```