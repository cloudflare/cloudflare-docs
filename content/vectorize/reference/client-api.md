---
title: Vectorize API
pcx_content_type: concept
weight: 2
---

# Vectorize API

This page covers the Vectorize API available within [Cloudflare Workers](/workers/), including usage examples.

## Operations

### Insert vectors

```ts
let vectorsToInsert = [
    {id: "123", values: [32.4, 6.5, 11.2, 10.3, 87.9]},
    {id: "456", values: [2.5, 7.8, 9.1, 76.9, 8.5]},
]
let inserted = await env.YOUR_INDEX.insert(vectorsToInsert)
```

Inserts vectors into the index. Returns the count of vectors inserted and their IDs.

If vectors with the same vector ID already exist in the index, only the vectors with new IDs will be inserted. The returned `VectorizeVectorMutation` will return a `count` and an `ids` array with IDs of the vectors inserted into the index, and omit IDs that already exist in the index.

If you need to update existing vectors, use the [upsert](#upsert-vectors) operation.

### Upsert vectors

```ts
let vectorsToUpsert = [
    {id: "123", values: [32.4, 6.5, 11.2, 10.3, 87.9]},
    {id: "456", values: [2.5, 7.8, 9.1, 76.9, 8.5]},
    {id: "768", values: [29.1, 5.7, 12.9, 15.4, 1.1]}
]
let upserted = await env.YOUR_INDEX.upsert(vectorsToUpsert)
```

Upserts vectors into an index. Returns the count of vectors upserted and their IDs.

An upsert operation will insert vectors into the index if vectors with the same ID do not exist, and overwrite vectors with the same ID.

Upserting does not merge or combine the values or metadata of an existing vector with the upserted vector: the upserted vector replaces the existing vector in full.

### Query vectors

```ts
let queryVector = [32.4, 6.55, 11.2, 10.3, 87.9]
let matches = await env.YOUR_INDEX.query(queryVector)
```

Query an index with the provided vector, returning the score(s) of the closest vectors based on the configured distance metric.

* Configure the number of returned matches by setting `topK` (default: 3)
* Return vector values by setting `returnValues: true` (default: false)
* Return vector metadata by setting `returnMetadata: true` (default: false)

```ts
let matches = await env.YOUR_INDEX.query(queryVector, { topK: 5, returnValues: true, returnMetadata: true })
```

### Get vectors by ID

```ts
let ids = ["11", "22", "33", "44"];
const vectors = await env.YOUR_INDEX.getByIds(ids);
```

Retrieves the specified vectors by their ID, including values and metadata.

### Delete vectors by ID

```ts
let idsToDelete = ["11", "22", "33", "44"];
const deleted = await env.YOUR_INDEX.deleteByIds(idsToDelete);
```

Deletes the vector IDs provided from the current index. Returns a count of the IDs provided and the list of vector IDs.

### Retrieve index details

```ts
const details = await env.YOUR_INDEX.describe();
```

Retrieves the configuration of a given index directly, including its configured `dimensions` and distance `metric`.

## Vectors

A vector represents the vector embedding output from a machine learning model.

- `id` - a unique `string` identifying the vector in the index. This should map back to the ID of the document, object or database identifier that the vector values were generated from.
- `namespace` - an optional partition key within a index. Operations are performed per-namespace, so this can be used to create isolated segments within a larger index.
- `values` - an array of `number`, `Float32Array`, or `Float64Array` as the vector embedding itself. This must be a dense array, and the length of this array must match the `dimensions` configured on the index.
- `metadata` - an optional set of key-value pairs that can be used to store additional metadata alongside a vector.

```ts
let vectorExample = {
    id: "12345",
    values: [32.4, 6.55, 11.2, 10.3, 87.9],
    metadata: {
        "key": "value",
        "hello": "world",
        "url": "r2://bucket/some/object.json"
    }
}
```

## Binding to a Worker

[Bindings](/workers/runtime-apis/bindings/) allow you to attach resources, including Vectorize indexes or R2 buckets, to your Worker.

Bindings are defined in either the [`wrangler.toml`](/workers/wrangler/configuration/) configuration associated with your Workers project, or via the Cloudflare dashboard for your project.

Vectorize indexes are bound by name. A binding for an index named `production-doc-search` would resemble the below:

```toml
[[vectorize]]
binding = "PROD_SEARCH" # the index will be available as env.PROD_SEARCH in your Worker
index_name = "production-doc-search"
```

Refer to the [bindings documentation](/workers/wrangler/configuration/#vectorize-indexes) for more details.

## TypeScript Types

New Workers projects created via `npm create cloudflare@latest` automatically include the relevant TypeScript types for Vectorize.

Older projects, or non-Workers projects looking to use Vectorize's [REST API](https://developers.cloudflare.com/api/operations/vectorize-list-vectorize-indexes) in a TypeScript project, should ensure `@cloudflare/workers-types` version `4.20230922.0` or later is installed.
