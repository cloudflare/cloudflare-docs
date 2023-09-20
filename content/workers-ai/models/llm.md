---
title: Large language model (LLM)
pcx_content_type: get-started
weight: 1
---

# Large language model (LLM)
Model name: `cf/meta-llama/llama-2-7b` - this model name is used to run this model via SDK and the API.​​


## Use cases


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
        model: '@cloudflare/llama-2-7b',
        input: {
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
  const input = { input: { prompt } };
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

run('cf/meta-llama/llama_2_7b_chat_int8', 'Tell me a story').then((response) => {
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
    input = { "input": { "prompt": prompt } }
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()
    
output = run("cf/meta-llama/llama_2_7b_chat_int8", "Tell me a story ")
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/cf/meta-llama/llama_2_7b_chat_int8 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    -d '{"input": { prompt: "Tell me a story" } }'
```

{{</tab>}}
{{</tabs>}}

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
