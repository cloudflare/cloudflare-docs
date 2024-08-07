---
title: Insert vectors
weight: 4
pcx_content_type: concept
---

# Insert vectors

Vectorize indexes allow you to insert vectors at any point: Vectorize will optimize the index behind the scenes to ensure that vector search remains efficient, even as new vectors are added or existing vectors updated.

## Supported vector formats

Vectorize supports vectors in three formats:

- An array of floating point numbers (converted into a JavaScript `number[]` array).
- A [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
- A [Float64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)

In most cases, a `number[]` array is the easiest when dealing with other APIs, and is the return type of most machine-learning APIs.

## Metadata

Metadata is an optional set of key-value pairs that can be attached to a vector on insert or upsert, and allows you to embed or co-locate data about the vector itself.

Metadata keys cannot be empty, contain the dot character (`.`), contain the double-quote character (`"`), or start with the dollar character (`$`).

Metadata can be used to:

- Include the object storage key, database UUID or other identifier to look up the content the vector embedding represents.
- The raw content (up to the [metadata limits](/vectorize/platform/limits/)), which can allow you to skip additional lookups for smaller content.
- Dates, timestamps, or other metadata that describes when the vector embedding was generated or how it was generated.

For example, a vector embedding representing an image could include the path to the [R2 object](/r2/) it was generated from, the format, and a category lookup:

```ts
{ id: '1', values: [32.4, 74.1, 3.2], metadata: { path: 'r2://bucket-name/path/to/image.png', format: 'png', category: 'profile_image' } }
```

## Namespaces

Namespaces provide a way to segment the vectors within your index. For example, by customer, merchant or store ID.

To associate vectors with a namespace, you can optionally provide a `namespace: string` value when performing an insert or upsert operation. When querying, you can pass the namespace to search within as an optional parameter to your query.

A namespace can be up to 63 characters (bytes) in length and you can have up to 1,000 namespaces per index. Refer to the [Limits](/vectorize/platform/limits/) documentation for more details.

When a namespace is provided, only vectors within that namespace are used for the search. Namespace filtering is applied before vector search, not after.

To insert vectors with a namespace:

```ts
// Mock vectors
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
  {
    id: "1",
    values: [32.4, 74.1, 3.2],
    namespace: "text",
  },
  {
    id: "2",
    values: [15.1, 19.2, 15.8],
    namespace: "images",
  },
  {
    id: "3",
    values: [0.16, 1.2, 3.8],
    namespace: "pdfs",
  },
];

// Insert your vectors, returning a count of the vectors inserted and their vector IDs.
let inserted = await env.TUTORIAL_INDEX.insert(sampleVectors);
```

To query vectors within a namespace:

```ts
// Your queryVector will be searched against vectors within the namespace (only)
let matches = await env.TUTORIAL_INDEX.query(queryVector, { namespace: "images" })
```

## Examples

### Workers API

Use the `insert()` and `upsert()` methods available on an index from within a Cloudflare Worker to insert vectors into the current index.

```ts
// Mock vectors
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
  {
    id: "1",
    values: [32.4, 74.1, 3.2],
    metadata: { url: "/products/sku/13913913" },
  },
  {
    id: "2",
    values: [15.1, 19.2, 15.8],
    metadata: { url: "/products/sku/10148191" },
  },
  {
    id: "3",
    values: [0.16, 1.2, 3.8],
    metadata: { url: "/products/sku/97913813" },
  },
];

// Insert your vectors, returning a count of the vectors inserted and their vector IDs.
let inserted = await env.TUTORIAL_INDEX.insert(sampleVectors);
```

Refer to [Vectorize API](/vectorize/reference/client-api/) for additional examples.

### wrangler CLI

You can bulk upload vector embeddings directly:

- The file must be in newline-delimited JSON (NDJSON format): each complete vector must be newline separated, and not within an array or object.
- Vectors must be complete and include a unique string `id` per vector.

An example NDJSON formatted file:

```json
---
filename: embeddings.ndjson
---

{ "id": "4444", "values": [175.1, 167.1, 129.9], "metadata": {"url": "/products/sku/918318313"}}
{ "id": "5555", "values": [158.8, 116.7, 311.4], "metadata": {"url": "/products/sku/183183183"}}
{ "id": "6666", "values": [113.2, 67.5, 11.2], "metadata": {"url": "/products/sku/717313811"}}
```

{{<render file="_vectorize-wrangler-version.md">}}

```sh
$ wrangler vectorize insert <your-index-name> --file=embeddings.ndjson
```

### HTTP API

Vectorize also supports inserting vectors via the [REST API](/api/operations/vectorize-insert-vector), which allows you to operate on a Vectorize index from existing machine-learning tooling and languages (including Python).

For example, to insert embeddings in [NDJSON format](#workers-api) directly from a Python script:

```py
import requests

url = "https://api.cloudflare.com/client/v4/accounts/{}/vectorize/indexes/{}/insert".format("your-account-id", "index-name")

headers = {
    "Authorization": "Bearer <your-api-token>"
}

with open('embeddings.ndjson', 'rb') as embeddings:
    resp = requests.post(url, headers=headers, files=dict(vectors=embeddings))
    print(resp)
```

This code would insert the vectors defined in `embeddings.ndjson` into the provided index. Python libraries, including Pandas, also support the NDJSON format via the built-in `read_json` method:

```py
import pandas as pd
data = pd.read_json('embeddings.ndjson', lines=True)
```