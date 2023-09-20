---
title: Embedding
pcx_content_type: get-started
weight: 5
---

# Embedding model
Model name: `cf/BIAA/bge-small-en` - this model name is used to run this model via SDK and the API.​​

Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. This model...

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
      "text": {
        "oneOf": [
          { "type": "string" },
          {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        ]
      }
    },
    "required": ["text"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "array",
    "items": {
      "type": "number"
    }
  }
}
```

