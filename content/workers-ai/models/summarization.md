---
title: Summarization
pcx_content_type: get-started
weight: 4
---

# Summarization

Summarization is the task of producing a shorter version of a document while preserving its important information. Some models can extract text from the original input, while other models can generate entirely new text.

* Task type: **summarization**
* TypeScript class: **AiSummarization**

{{<render file="_npm-update.md">}}

## Available models

List of available Summarization models:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/facebook/bart-large-cnn`                   | BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. You can use this model for text summarization.<br/>  |

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

    const response = await ai.run('@cf/facebook/bart-large-cnn', {
        input_text: "really long text..."
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

run('@cf/facebook/bart-large-cnn', { input_text: 'really long text...' }).then((response) => {
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

output = run("@cf/facebook/bart-large-cnn", { "input_text": "really long text..." })
print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "input_text": "really long text..." }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "summary": "summary of the really long text"
}
```

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  "type": "object",
  "properties": {
    "input_text": {
      "type": "string"
    },
    "max_length": {
      "type": "integer"
    }
  },
  "required": [
    "input_text"
  ]
}
```

TypeScript class: **AiSummarizationInput**

### Output

```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "summary": {
      "type": "string"
    }
  }
}
```

TypeScript class: **AiSummarizationOutput**
