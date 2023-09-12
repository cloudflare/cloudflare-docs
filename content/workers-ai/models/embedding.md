---
title: Embedding
pcx_content_type: get-started
weight: 5
---

# Embedding model
`@cloudflare/BIAA/bge-small-en`

Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. This model...

## Use cases

## API

### Input format
```js
const output = await ai.run({ 
  model: '@cloudflare/bge-small-en', 
  input: {
    words: ['workers', 'ai']  
  }
})
```

### Output format

```json
{
  "id": "",
  "object": "",
  "created": ,
  "model": "@cloudflare/meta-llama/llama-2-7b",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

