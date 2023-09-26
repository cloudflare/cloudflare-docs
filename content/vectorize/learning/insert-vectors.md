---
title: Insert vectors
weight: 4
pcx_content_type: concept
---

# Insert vectors


## Supported vector formats

- f32 / f64 / number

## Metadata

- what is metadata?
- shape of metadata
- example of metadata
- limits link

## Examples
### Workers API

You can use the `.insert()` and `.upsert()` methods available on an index from within a Cloudflare Worker to insert vectors into the current index.

```ts
// Mock vectors
//
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
	{ id: '1', values: [32.4, 74.1, 3.2], metadata: { url: '/products/sku/13913913' } },
	{ id: '2', values: [15.1, 19.2, 15.8], metadata: { url: '/products/sku/10148191' } },
	{ id: '3', values: [0.16, 1.2, 3.8], metadata: { url: '/products/sku/97913813' } },
];

// Insert our vectors, returning a count of the vectors inserted and their vector IDs.
let inserted = await env.TUTORIAL_INDEX.insert(sampleVectors);
```

Refer to the [Workers Client API documentation](/vectorize/learning/client-api/) for additional examples.

### wrangler CLI

You can bulk upload vector embeddings directly 

* The file must be in newline-delimited JSON (NDJSON format): each complete vector must be newline separated, and not within an array or object.
* Vectors must be complete and include a unique string `id` per vector
* 

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

Vectorize also supports inserting vectors via the [HTTP API](https://developers.cloudflare.com/api/operations/vectorize-update-vectorize-index), which allows you to operate on a Vectorize index from existing machine-learning tooling and languages (including Python).

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
