---
title: Query vectors
pcx_content_type: concept
weight: 5
---

# Query Vectors



## Example

```ts
let queryVector = [32.4, 6.55, 11.2, 10.3, 87.9];
let matches = await env.YOUR_INDEX.query(queryVector);
```

Refer to the [Workers Client API documentation](/vectorize/learning/client-api/) for additional examples.

## Workers AI

If you are generating embeddings from a [Workers AI](/workers-ai/models/embedding/) text embedding model, the response type from `ai.run()` is an object that includes both the `shape` of the response vector - e.g. `[1,768]` - and the vector `data` as an array of vectors:

```ts
interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}

let userQuery = "a query from a user or service"
const queryVector: EmbeddingResponse = await ai.run(
  "@cf/baai/bge-base-en-v1.5",
  {
    text: [userQuery],
  }
);
```

When passing the vector to the `.query()` method of a Vectorize index, ensure you are passing only the vector embedding itself on the `.data` sub-object, and not the top-level response. For example:

```ts
let matches = await env.TEXT_EMBEDDINGS.query(queryVector.data[0], { topK: 1 });
```

Passing `queryVector` or `queryVector.data` will cause `.query()` to return an error.
