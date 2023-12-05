---
title: Text Generation
pcx_content_type: get-started
weight: 1
---

# Text Generation

Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks.

* Task type: **text-generation**
* TypeScript class: **AiTextGeneration**

{{<render file="_npm-update.md">}}

## Available models

List of available Text Generation models:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/meta/llama-2-7b-chat-fp16`                   | Full precision (fp16) generative text model with 7 billion parameters from Meta<br/><strong>Default max (sequence) tokens (stream)</strong>: 2500<br/><strong>Default max (sequence) tokens</strong>: 256<br/><strong>Context tokens limit</strong>: 3072<br/><strong>Sequence tokens limit</strong>: 2500<br/>[More information](https://ai.meta.com/llama/)<br/>[Terms and license](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)<br/>  |
| `@cf/meta/llama-2-7b-chat-int8`                   | Quantized (int8) generative text model with 7 billion parameters from Meta<br/><strong>Default max (sequence) tokens (stream)</strong>: 1800<br/><strong>Default max (sequence) tokens</strong>: 256<br/><strong>Context tokens limit</strong>: 2048<br/><strong>Sequence tokens limit</strong>: 1800<br/>[More information](https://ai.meta.com/llama/)<br/>[Terms and license](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)<br/>  |
| `@cf/mistral/mistral-7b-instruct-v0.1`                   | Instruct fine-tuned version of the Mistral-7b generative text model with 7 billion parameters<br/><strong>Default max (sequence) tokens (stream)</strong>: 1800<br/><strong>Default max (sequence) tokens</strong>: 256<br/>[More information](https://mistral.ai/news/announcing-mistral-7b/)<br/>  |
| `@hf/thebloke/codellama-7b-instruct-awq`                   | CodeLlama 7B Instruct AWQ is an efficient, accurate and blazing-fast low-bit weight quantized Code Llama variant.<br/><strong>Default max (sequence) tokens (stream)</strong>: 596<br/><strong>Default max (sequence) tokens</strong>: 256<br/>[More information](https://huggingface.co/TheBloke/CodeLlama-7B-Instruct-AWQ)<br/>  |

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

## Prompting

Part of getting good results from text generation models is asking questions correctly. LLMs are usually trained with specific predefined templates, which should then be used with the model's tokenizer for better results when doing inference tasks.

There are two ways to prompt text generation models with Workers AI:

### Scoped prompts

This is the **recommended** method. With scoped prompts, Workers AI takes the burden of knowing and using different chat templates for different models and provides a unified interface to developers when building prompts and creating text generation tasks.

Scoped prompts are a list of messages. Each message defines two keys: the role and the content.

Typically, the role can be one of three options:

* **system** - System messages define the AI's personality. You can use them to set rules and how you expect the AI to behave.
* **user** - User messages are where you actually query the AI by providing a question or a conversation.
* **assistant** - Assistant messages hint to the AI about the desired output format. Not all models support this role.

OpenAI has a [good explanation](https://docs.airops.com/docs/llm-step#openai-chat-model-specifications) of how they use these roles with their GPT models. Even though chat templates are flexible, other text generation models tend to follow the same conventions.

Here's an input example of a scoped prompt using system and user roles:

```javascript
{
  messages: [
    { role: "system", content: "you are a very funny comedian and you like emojis" },
    { role: "user", content: "tell me a joke about cloudflare" },
  ],
};
```

Here's a better example of a chat session using multiple iterations between the user and the assistant.

```javascript
{
  messages: [
    { role: "system", content: "you are a professional computer science assistant" },
    { role: "user", content: "what is WASM?" },
    { role: "assistant", content: "WASM (WebAssembly) is a binary instruction format that is designed to be a platform-agnostic" },
    { role: "user", content: "does Python compile to WASM?" },
    { role: "assistant", content: "No, Python does not directly compile to WebAssembly" },
    { role: "user", content: "what about Rust?" },
  ],
};
```

Note that different LLMs are trained with different templates for different use cases. While Workers AI tries its best to abstract the specifics of each LLM template from the developer through a unified API, you should always refer to the model documentation for details (we provide links in the table above.) For example, instruct models like Codellama are fine-tuned to respond to a user-provided instruction, while chat models expect fragments of dialogs as input.

### Unscoped prompts

You can use unscoped prompts to send a single question to the model without worrying about providing any context. Workers AI will automatically convert your { prompt: } input to a reasonable default scoped prompt internally so that you get the best possible prediction.

```javascript
{
  prompt: "tell me a joke about cloudflare"
};
```

You can also use unscoped prompts to construct the model chat template manually. In this case, you can use the raw parameter. Here's an input example of a [Mistral](https://docs.mistral.ai/llm/mistral-instruct-v0.1#chat-template) chat template prompt:

```javascript
{
  prompt: "<s>[INST]comedian[/INST]</s>\n[INST]tell me a joke about cloudflare[/INST]",
  raw: true
};
```

## Responses

### Using streaming

The recommended method to handle text generation responses is streaming.

LLMs work internally by generating responses sequentially using a process of repeated inference — the full output of a LLM model is essentially a sequence of hundreds or thousands of individual prediction tasks. For this reason, while it only takes a few milliseconds to generate a single token, generating the full response takes longer, on the order of seconds.

You can use streaming to start displaying the response as soon as the first tokens are generated, and append each additional token until the response is complete. This yields a much better experience for the end user. Displaying text incrementally as it's generated not only provides instant responsiveness, but also gives the end-user time to read and interpret the text.

To enable, set the `stream` parameter to true.

Using the Workers API:

```javascript
const stream = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
  stream: true
  messages,
});

return new Response(stream, {
  headers: {
    "content-type": "text/event-stream",
  },
});
```

Using the REST API:

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "stream": true, "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good?" }]}'
```

Streaming responses use [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events); the are easy to use, simple to implement on the server side, standardized, and broadly available across many platforms natively or as a polyfill.

```sh
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<account>/ai/run/@cf/meta/llama-2-7b-chat-int8" \
-H "Authorization: Bearer {API_TOKEN}" \
-H "Content-Type:application/json" \
-d '{ "prompt": "where is new york?", "stream": true }'

data: {"response":"New"}

data: {"response":" York"}

data: {"response":" is"}

data: {"response":" located"}

data: {"response":" in"}

data: {"response":" the"}

...

data: [DONE]
```

#### Handling streaming responses in the client

Below is an example showing how to parse this response in JavaScript, from the browser:

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

### Non-streaming response

Non-streaming responses may be helpful in some contexts, and they are possible; however, be aware that we limit the maximum number of output sequence tokens to avoid timeouts. Whenever possible, use streaming.

```json
{
  "response":
    "The origin of the phrase \"Hello, World\" is not well-documented, but it is believed to have originated in the early days of computing. In the 1970s, when personal computers were first becoming popular, many programming languages, including C, had a simple \"Hello, World\" program that was used to demonstrate the basics of programming.\nThe idea behind the program was to print the words \"Hello, World\" on the screen, and it was often used as a first program for beginners to learn the basics of programming. Over time, the phrase \"Hello, World\" became a common greeting among programmers and computer enthusiasts, and it is now widely recognized as a symbol of the computing industry.\nIt's worth noting that the phrase \"Hello, World\" is not a specific phrase that was coined by any one person or organization, but rather a catchphrase that evolved over time as a result of its widespread use in the computing industry."
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
          "type": "string",
          "maxLength": 4096
        },
        "raw": {
          "type": "boolean",
          "default": false
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
                "type": "string",
                "maxLength": 4096
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
      "contentType": "application/json",
      "properties": {
        "response": {
          "type": "string"
        }
      }
    },
    {
      "type": "string",
      "contentType": "text/event-stream",
      "format": "binary"
    }
  ]
}
```

TypeScript class: **AiTextGenerationOutput**
