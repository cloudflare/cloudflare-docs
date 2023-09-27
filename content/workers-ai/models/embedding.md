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
* License type: MIT
* [Terms + Information](https://github.com/FlagOpen/FlagEmbedding/blob/master/LICENSE)

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

    const embeddings = await ai.run('@cf/baai/bge-base-en-v1.5', {
        text: stories
      }
    );

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

```json
{
    "task": "text-embeddings",
    "tsClass": "AiTextEmbeddings",
    "jsonSchema": {
        "input": {
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
        },
        "output": {
            "type": "object",
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
    }
}
```