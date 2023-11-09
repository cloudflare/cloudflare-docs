---
title: Text Generation
pcx_content_type: get-started
weight: 1
---

# Text Generation

Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks.

* Task type: **text-generation**
* TypeScript class: **AiTextGeneration**

## Available Embedding Models

List of available models in for this task type:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/meta/llama-2-7b-chat-fp16`                   | Full precision (fp16) generative text model with 7 billion parameters from Meta<br/><strong>Default max (sequence) tokens (stream)</strong>: 2500<br/><strong>Default max (sequence) tokens</strong>: 256<br/><strong>Context tokens limit</strong>: 3072<br/><strong>Sequence tokens limit</strong>: 2500<br/>[More information](https://ai.meta.com/llama/)<br/>[Terms and license](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)<br/>  |
| `@cf/meta/llama-2-7b-chat-int8`                   | Quantized (int8) generative text model with 7 billion parameters from Meta<br/><strong>Default max (sequence) tokens (stream)</strong>: 1800<br/><strong>Default max (sequence) tokens</strong>: 256<br/><strong>Context tokens limit</strong>: 2048<br/><strong>Sequence tokens limit</strong>: 1800<br/>[More information](https://ai.meta.com/llama/)<br/>[Terms and license](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)<br/>  |
| `@cf/mistral/mistral-7b-instruct-v0.1`                   | Instruct fine-tuned version of the Mistral-7b generative text model with 7 billion parameters<br/><strong>Default max (sequence) tokens (stream)</strong>: 1800<br/><strong>Default max (sequence) tokens</strong>: 256<br/>[More information](https://mistral.ai/news/announcing-mistral-7b/)<br/>  |
| `@hf/codellama/codellama-7b-hf`                   | Generative text model built on top of Llama 2, fine-tuned for generating and discussing code<br/><strong>Default max (sequence) tokens (stream)</strong>: 1800<br/><strong>Default max (sequence) tokens</strong>: 256<br/>[More information](https://github.com/facebookresearch/codellama)<br/>[Terms and license](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)<br/>  |

## Examples - chat style with system prompt (preferred)
{{<tabs labels="streaming | worker | node | python | curl">}}
{{<tab label="streaming" default="true">}}

```ts
import { Ai } from '@cloudflare/ai'

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: 'system', content: 'You are a friendly assistant' },
      { role: 'user', content: 'What is the origin of the phrase Hello, World' }
    ];

    const stream = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages,
      stream: true
    });

    return new Response(
      stream,
      { headers: { "content-type": "text/event-stream" } }
    );
  },
};
```

{{</tab>}}
{{<tab label="worker">}}

```ts
import { Ai } from '@cloudflare/ai'

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: 'system', content: 'You are a friendly assistant' },
      { role: 'user', content: 'What is the origin of the phrase Hello, World' }
    ];
    const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', { messages });

    return Response.json(response);
  },
};
```

{{</tab>}}
{{<tab label="node">}}

```js
async function run(model, prompt) {
  const messages = [
    { role: 'system', content: 'You are a friendly assistant' },
    { role: 'user', content: prompt }
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

run('@cf/meta/llama-2-7b-chat-int8', 'Tell me a story').then((response) => {
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

## Responses

### Non-streaming response

```json
{
  "response":
    "The origin of the phrase \"Hello, World\" is not well-documented, but it is believed to have originated in the early days of computing. In the 1970s, when personal computers were first becoming popular, many programming languages, including C, had a simple \"Hello, World\" program that was used to demonstrate the basics of programming.\nThe idea behind the program was to print the words \"Hello, World\" on the screen, and it was often used as a first program for beginners to learn the basics of programming. Over time, the phrase \"Hello, World\" became a common greeting among programmers and computer enthusiasts, and it is now widely recognized as a symbol of the computing industry.\nIt's worth noting that the phrase \"Hello, World\" is not a specific phrase that was coined by any one person or organization, but rather a catchphrase that evolved over time as a result of its widespread use in the computing industry."
  }
```

### Handling streaming responses in the client

A streaming response will be returned in the [server-side events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), or SSE format. Below is an example showing how to parse this response in JavaScript, from the browser:

```js
const source = new EventSource("/"); // Workers AI streaming endpoint
source.onmessage = (event) => {
  if (event.data == "[DONE]") {
    source.close();
    return;
  }
  const data = JSON.parse(event.data);
  el.innerHTML += data.response;
}
```

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "prompt": {
          "type": "string"
        },
        "stream": {
          "type": "boolean",
          "default": false
        },
        "max_tokens": {
          "type": "integer",
          "default": 256
        }
      },
      "required": [
        "prompt"
      ]
    },
    {
      "properties": {
        "messages": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string"
              },
              "content": {
                "type": "string"
              }
            },
            "required": [
              "role",
              "content"
            ]
          }
        },
        "stream": {
          "type": "boolean",
          "default": false
        },
        "max_tokens": {
          "type": "integer",
          "default": 256
        }
      },
      "required": [
        "messages"
      ]
    }
  ]
}
```

TypeScript class: **AiTextGenerationInput**

### Output

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "response": {
          "type": "string"
        }
      }
    },
    {
      "type": "string",
      "format": "binary"
    }
  ]
}
```

TypeScript class: **AiTextGenerationOutput**
