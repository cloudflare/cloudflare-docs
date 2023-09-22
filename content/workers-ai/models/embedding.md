---
title: Embedding
pcx_content_type: get-started
weight: 6
---

# Embeddings
Feature extraction models transform raw data into numerical features that can be processed while preserving the information in the original dataset.

* ID:  **@cf/baai/bge-base-en-v1.5** - used to `run` this model via SDK or API
* Name: Feature extraction model	
* Task: text-embeddings

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

    // Can be a string or array of strings]
    const stories = [
      'This is a story about an orange cloud',
      'This is a story about a llama',
      'This is a story about a hugging emoji'
    ]

    const embeddings = ai.run('@cf/baai/bge-base-en-v1.5', {
        text: stories
      }
    });

    return new Response(JSON.stringify(embeddings));
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

// Can be a string or array of strings]
const stories = [
  'This is a story about an orange cloud',
  'This is a story about a llama',
  'This is a story about a hugging emoji'
];

run('cf/baai/bge-base-en-v1.5', { text: input }).then((response) => {
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

stories = [
  'This is a story about an orange cloud',
  'This is a story about a llama',
  'This is a story about a hugging emoji'
]
    
output = run("@cf/baai/bge-base-en-v1.5", { input: stories })
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/baai/bge-base-en-v1.5 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{ "text": "['This is a story about an orange cloud','This is a story about a llama','This is a story about a hugging emoji']" }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "result": {
    "items": [
      [-0.387, 192, 0.315, 384, -0.363,...],
      [-0.256, 193, 0.053, 385,	-0.346,...],
      [-0.649, 196,	0.053, 388,	-1.055,...]
    ]
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
        "oneOf": [
          { "type": "string" },
          {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        ]
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
      "type": "number"
    }
  }
}
```

