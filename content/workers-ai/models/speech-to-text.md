---
title: Speech to text
pcx_content_type: get-started
weight: 2
---

# Speech to text
Whisper is an automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data collected from the web.

* ID: **@cf/openai/whisper** - used to `run` this model via SDK or API
* Name: Automatic speech recognition (ASR) system from OpenAI
* Task: speech-recognition

## Examples

{{<tabs labels="worker | node | python | curl ">}}
{{<tab label="worker" default="true">}}

```js
// todo
```

{{</tab>}}
{{<tab label="node">}}

```js
// todo js
```

{{</tab>}}

{{<tab label="python">}}

```py
# todo
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/openai/whisper \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    --data-binary @talking-llama.mp3
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
      "audio": {
        "type": "string",
        "format": "binary"
      }
    },
    "required": ["audio"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string"
      }
    }
  }
}
```
