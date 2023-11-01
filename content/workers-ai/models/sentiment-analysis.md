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
* License type: Apache 2.0
* [Terms + Information](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english)

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

    const response = await ai.run('@cf/huggingface/distilbert-sst-2-int8', {
        text: "This pizza is great!"
      }
    );

    return Response.json(response)
  },
};
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

run('@cf/huggingface/distilbert-sst-2-int8', { text: 'This pizza is great!' }).then((response) => {
    console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"
headers = {"Authorization": "Bearer {API_KEY}"}

def run(model, input):
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

output = run("@cf/huggingface/distilbert-sst-2-int8", { "text": "This pizza is great!" })
print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/huggingface/distilbert-sst-2-int8 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "text": "This pizza is great!" }'
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
  },
  required: ["text"],
}


### Output

```json
{
  type: "array",
  items: {
    type: "object",
    properties: {
      score: {
        type: "number",
      },
      label: {
        type: "string",
      },
    },
  },
}
```