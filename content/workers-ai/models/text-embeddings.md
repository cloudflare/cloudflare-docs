---
title: Text Embeddings
pcx_content_type: get-started
weight: 6
---

# Text Embeddings

Feature extraction models transform raw data into numerical features that can be processed while preserving the information in the original dataset. These models are ideal as part of building vector search applications or Retrieval Augmented Generation workflows with Large Language Models (LLM).

* Task type: **text-embeddings**
* TypeScript class: **AiTextEmbeddings**

{{<render file="_npm-update.md">}}

## Available Embedding Models

List of available models in for this task type:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/baai/bge-base-en-v1.5`                   | BAAI general embedding (bge) models transform any given text into a compact vector<br/><strong>Max input tokens</strong>: 512<br/><strong>Output dimensions</strong>: 768<br/>[More information](https://huggingface.co/BAAI/bge-base-en-v1.5)<br/>  |
| `@cf/baai/bge-large-en-v1.5`                   | BAAI general embedding (bge) models transform any given text into a compact vector<br/><strong>Max input tokens</strong>: 512<br/><strong>Output dimensions</strong>: 1024<br/>[More information](https://huggingface.co/BAAI/bge-base-en-v1.5)<br/>  |
| `@cf/baai/bge-small-en-v1.5`                   | BAAI general embedding (bge) models transform any given text into a compact vector<br/><strong>Max input tokens</strong>: 512<br/><strong>Output dimensions</strong>: 384<br/>[More information](https://huggingface.co/BAAI/bge-base-en-v1.5)<br/>  |

An English word is approximately 1-3 tokens, depending on word length and representation within the model.

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

    // Can be a string or array of strings]
    const stories = [
      'This is a story about an orange cloud',
      'This is a story about a llama',
      'This is a story about a hugging emoji'
    ]

    const embeddings = await ai.run('@cf/baai/bge-base-en-v1.5', {
        text: stories
      }
    );

    return Response.json(embeddings);
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
		headers: { Authorization: "Bearer ${API_TOKEN}" },
		method: "POST",
		body: JSON.stringify(input),
	  }
	);
	const result = await response.json();
	return result;
}

// Can be a string or array of strings]
const stories = [
'This is a story about an orange cloud',
'This is a story about a llama',
'This is a story about a hugging emoji'
];

run('@cf/baai/bge-base-en-v1.5', { text: stories }).then((response) => {
  console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
import requests
API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, input):
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

stories = [
  'This is a story about an orange cloud',
  'This is a story about a llama',
  'This is a story about a hugging emoji'
]

output = run("@cf/baai/bge-base-en-v1.5", { "text": stories })
print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "input": {
    "text":"Tell me a joke about Cloudflare"
  },
  "response": {
    "shape":[1,768],
    "data": [
      [0.03190500661730766, 0.006071353796869516, 0.025971125811338425,...]
    ]
  },
  "batchedInput": {
    "text": ["Tell me a joke about Cloudflare","The weather is sunny"]
  },
  "batchedResponse": {
    "shape":[2,768],
    "data":[
      [0.03190416097640991, 0.006062490865588188, 0.025968171656131744,...],
      [0.002439928939566016, -0.021352028474211693, 0.06229676678776741,...],
      [-0.02154572866857052,0.09098546206951141,0.006273532286286354,...]
    ]
  }
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
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "string"
          },
          "maxItems": 100
        }
      ]
    }
  },
  "required": [
    "text"
  ]
}
```

TypeScript class: **AiTextEmbeddingsInput**

### Output

```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "shape": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "data": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    }
  }
}
```

TypeScript class: **AiTextEmbeddingsOutput**
