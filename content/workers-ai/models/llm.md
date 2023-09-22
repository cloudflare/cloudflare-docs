---
title: Large language model (LLM)
pcx_content_type: get-started
weight: 1
---

# Large language model (LLM)
Llama 2 is a family of generative text models and can be adapted for a variety of natural language generation tasks.

* ID:  **@cf/meta/llama-2-7b-chat-int8** - used to `run` this model via SDK or API
* Name: Quantized Llama 2 chat model from Meta	
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

    const answer = ai.run('@cf/meta/llama-2-7b-chat-int8', {
        prompt: "What is the origin of the phrase 'Hello, World'" 
      }
    });

    return new Response(JSON.stringify(answer));
  },
};
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, prompt) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer {API_TOKEN}" },
      method: "POST",
      body: JSON.stringify(prompt),
    }
  );
  const result = await response.json();
  return result;
}

run('@cf/meta/llama-2-7b-chat-int8', { prompt: 'Tell me a story' }).then((response) => {
    console.log(JSON.stringify(response));
});
```

{{</tab>}}

{{<tab label="python">}}

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, prompt)
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=prompt)
    return response.json()
    
output = run("@cf/meta/llama-2-7b-chat-int8", { prompt: "Tell me a story" })
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-2-7b-chat-int8 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{ prompt: "Tell me a story" }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
  "result": {
    "answer": "Hello, World first appeared in 1974 at Bell Labs when Brian Kernighan included it in the C programming language example. It became widely used as a basic test program due to simplicity and clarity. It represents an inviting greeting from a program to the world.",
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
      "question": {
        "type": "string"
      }
    },
    "required": ["question"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "answer": {
        "type": "string"
      }
    }
  }
}
```
