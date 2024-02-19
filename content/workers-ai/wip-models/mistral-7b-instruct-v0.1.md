---
title: mistral-7b-instruct-v0.1
pcx_content_type: get-started
model:
  id: cf/mistral/mistral-7b-instruct-v0.1
  name: mistral-7b-instruct-v0.1
  description: Instruct fine-tuned version of the Mistral-7b generative text model with 7 billion parameters
  terms: https://www.example.com/
  infos: https://www.example.com/
  limits:
    - name: "Default max (sequence) tokens (stream)"
      value: 596
    - name: "Default max (sequence) tokens"
      value: 256
  params:
    - name: prompt
      type: string
      desc: this is sample text
    - name: raw
      type: boolean
      optional: true
      desc: this is more text

task_display: Text Generation
task:
  name: Text Generation
  description: Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks.
related:
  - name: This will be a very helpful resource
    value: https://example.com
  - name: Also check out this one
    value: https://example.com
  - name: All good things come in three
    value: https://example.com
---

{{% model-display-header %}}

## Code Example

This is one line of text, telling you what's happening.

{{<tabs labels="streaming | worker | node | python | curl">}}
{{<tab label="streaming" default="true">}}

```ts
import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];

    const stream = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages,
      stream: true,
    });

    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
};
```

{{</tab>}}
{{<tab label="worker">}}

```ts
import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];
    const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages,
    });

    return Response.json(response);
  },
};
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, prompt) {
  const messages = [
    { role: "system", content: "You are a friendly assistant" },
    { role: "user", content: prompt },
  ];

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer {API_TOKEN}" },
      method: "POST",
      body: JSON.stringify({ messages }),
    }
  );
  const result = await response.json();
  return result;
}

run("@cf/meta/llama-2-7b-chat-int8", "Tell me a story").then((response) => {
  console.log(JSON.stringify(response));
});
```

{{</tab>}}
{{<tab label="python">}}

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, prompt):
  input = {
    "messages": [
      { "role": "system", "content": "You are a friendly assistant" },
      { "role": "user", "content": prompt }
    ]
  }
  response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
  return response.json()

output = run("@cf/meta/llama-2-7b-chat-int8", "Tell me a story")
print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

{{</tab>}}
{{</tabs>}}

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

{{% model-display-footer %}}
