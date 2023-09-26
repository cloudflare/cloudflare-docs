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

## Workers API

You can use the `.insert()` and `.upsert()` methods available on an index from within a Cloudflare Worker to insert vectors into the current index.

```ts
// TODO - show a quick .insert example
```

Refer to the [Workers Client API documentation](/vectorize/learning/insert-vectors/) for additional examples.
## wrangler CLI

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

## HTTP API

Vectorize also supports inserting vectors via the [HTTP API](https://developers.cloudflare.com/api/operations/vectorize-update-vectorize-index), which allows you to operate on a Vectorize index from existing machine-learning tooling and languages (including Python).

For example, to insert embeddings in NDJSON format directly from a Python script:

```py
import requests

url = "https://api.cloudflare.com/client/v4/accounts/{}/vectorize/indexes/{}".format("your-account-id", "index-name")

headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer <your-api-token>"
}

with open('embeddings.ndjson', 'rb') as embeddings:
    resp = requests.request("POST", url, data=payload, headers=headers, files=embeddings)

print(response.text)
```
