---
title: Speech to text
pcx_content_type: get-started
weight: 2
---

# Speech to text
`@cloudflare/openai/whisper`
Model name: `cf/openai/whisper` - this model name is used to run this model via SDK and the API.​​


Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification.

## Use cases

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
$ todo
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
