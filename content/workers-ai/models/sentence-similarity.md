---
title: Sentence Similarity
pcx_content_type: get-started
weight: 4
---

# Sentence Similarity



* Task type: **sentence-similarity**
* TypeScript class: **AiSentenceSimilarity**

{{<render file="_npm-update.md">}}

## Available models

No available models for this task type yet.

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

    const response = await ai.run('@hf/sentence-transformers/all-minilm-l6-v2', {
        source: "This pizza is great",
        sentences: ["Great hamburger", "Not so good hotdog"]
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

run('@hf/sentence-transformers/all-minilm-l6-v2', { text: 'This pizza is great', sentences: ['Great hamburger', 'Not so good hotdog'] }).then((response) => {
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

output = run("@hf/sentence-transformers/all-minilm-l6-v2", { source: "This pizza is great", sentences: ["Great hamburger", "Not so good hotdog"] })
print(output)
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@hf/sentence-transformers/all-minilm-l6-v2 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '[ 0.0973462763, 0.87357612313 ]'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
[ 0.0973462763, 0.87357612313 ]
```

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string"
    },
    "sentences": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "source",
    "sentences"
  ]
}
```

TypeScript class: **AiSentenceSimilarityInput**

### Output

```json
{
  "type": "array",
  "contentType": "application/json",
  "items": {
    "type": "number"
  }
}
```

TypeScript class: **AiSentenceSimilarityOutput**
