---
title: Query vectors
pcx_content_type: concept
weight: 5
---

# Query Vectors

Querying an index, or vector search, enables you to search an index by providing an input vector and returning the nearest vectors based on the [configured distance metric](/vectorize/best-practices/create-indexes/#distance-metrics).

Optionally, you can apply [metadata filters](/vectorize/reference/metadata-filtering/) or a [namespace](/vectorize/best-practices/insert-vectors/#namespaces) to narrow the vector search space.

## Example query

To pass a vector as a query to an index, use the `query()` method on the index itself.

A query vector is either an array of JavaScript numbers, 32-bit floating point or 64-bit floating point numbers: `number[]`, `Float32Array`, or `Float64Array`. Unlike when [inserting vectors](/vectorize/best-practices/insert-vectors/), a query vector does not need an ID or metadata.

```ts
let queryVector = [54.8, 5.5, 3.1];
let matches = await env.YOUR_INDEX.query(queryVector);
```

This would return a set of matches resembling the following, based on a `cosine` distance metric:

```json
{
  "matches": {
    "count": 3,
    "matches": [
      { "score": 0.999909486, "id": "5" },
      { "score": 0.789848214, "id": "4" },
      { "score": 0.720476967, "id": "4444" }
    ]
  }
}
```

You can optionally change the number of results returned and/or whether results should include metadata and values:

```ts
let queryVector = [54.8, 5.5, 3.1];
// topK defaults to 3; returnValues defaults to false; returnMetadata defaults to false
let matches = await env.YOUR_INDEX.query(queryVector, {
  topK: 1,
  returnValues: true,
  returnMetadata: true,
});
```

This would return a set of matches resembling the following, based on a `cosine` distance metric:

```json
{
  "matches": {
    "count": 1,
    "matches": [
      {
        "score": 0.999909486,
        "id": "5",
        "values": [58.79999923706055, 6.699999809265137, 3.4000000953674316],
        "metadata": { "url": "/products/sku/55519183" }
      }
    ]
  }
}
```

Refer to [Vectorize API](/vectorize/reference/client-api/) for additional examples.

## Workers AI

If you are generating embeddings from a [Workers AI](/workers-ai/models/#text-embeddings) text embedding model, the response type from `env.AI.run()` is an object that includes both the `shape` of the response vector - e.g. `[1,768]` - and the vector `data` as an array of vectors:

```ts
interface EmbeddingResponse {
  shape: number[];
  data: number[][];
}

let userQuery = "a query from a user or service";
const queryVector: EmbeddingResponse = await env.AI.run(
  "@cf/baai/bge-base-en-v1.5",
  {
    text: [userQuery],
  }
);
```

When passing the vector to the `query()` method of a Vectorize index, pass only the vector embedding itself on the `.data` sub-object, and not the top-level response.

For example:

```ts
let matches = await env.TEXT_EMBEDDINGS.query(queryVector.data[0], { topK: 1 });
```

Passing `queryVector` or `queryVector.data` will cause `query()` to return an error.

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
