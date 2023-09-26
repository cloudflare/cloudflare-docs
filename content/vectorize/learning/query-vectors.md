---
title: Query vectors
pcx_content_type: concept
weight: 5
---

# Query Vectors

Vectorize

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

let userQuery = "a query from a user or service";
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

## OpenAI

When using OpenAI's [JavaScript client API](https://github.com/openai/openai-node) and [Embeddings API](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings), the response type from `embeddings.create` is an object that includes the model, usage information and the requested vector embedding. 

```ts
const openai = new OpenAI({ apiKey: env.YOUR_OPENAPI_KEY });

let userQuery = "a query from a user or service";

let embeddingResponse = await openai.embeddings.create({
  input: userQuery,
  model: "text-embedding-ada-002",
});
```

Similar to Workers AI, you will need to provide the vector embedding itself (`.embedding[0]`) and not the `EmbeddingResponse` wrapper when querying a Vectorize index:

```ts
let matches = await env.TEXT_EMBEDDINGS.query(embeddingResponse.embedding[0], {
  topK: 1,
});
```
