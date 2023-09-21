---
title: Translation
pcx_content_type: get-started
weight: 3
---

# Translation
No Language Left Behind (NLLB) was trained on multilingual data for translation between a set of 200 languages.

* ID:  **@cf/meta/nllb-200-1.3b** - used to `run` this model via SDK or API
* Name: Quantized Llama 2 chat model from Met
* Task: text-generation

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
