{{ $modelId := (.model.name) }}

{{ define "partials/models/hack-tabs" }}
  {{ return "<div><em>You cannot use shortcodes in a partial</em>, <strong>BUT you can return HTML from an inline partial</strong></div>" }}
{{ end }}

{{ partial "partials/models/hack-tabs" }}

## Code Example

This is one line of text, telling you what's happening.

{{/*
{{<tabs labels="streaming | worker | node | python | curl">}}
{{<tab label="streaming" default="true">}}
*/}}

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

    const stream = await ai.run("{{ $modelId }}", {
      messages,
      stream: true,
    });

    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
};
```
{{/*
{{</tab>}}
{{<tab label="worker">}}
*/}}

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
    const response = await ai.run("{{ $modelId }}", {
      messages,
    });

    return Response.json(response);
  },
};
```
{{/*
{{</tab>}}
{{<tab label="node">}}
*/}}

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

run("{{ $modelId }}", "Tell me a story").then((response) => {
  console.log(JSON.stringify(response));
});
```
{{/*
{{</tab>}}
{{<tab label="python">}}
*/}}

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

output = run("{{ $modelId }}", "Tell me a story")
print(output)
```
{{/*
{{</tab>}}
{{<tab label="curl">}}
*/}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{{ $modelId }} \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

{{/*
{{</tab>}}
{{</tabs>}}
*/}}