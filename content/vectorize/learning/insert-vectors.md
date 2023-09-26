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

You can bulk upload 

```sh
# Ensure you are using wrangler 3.9.2 or greater
$ wrangler vectorize insert your-index-name --file=embeddings.ndjson
```

## HTTP API

Vectorize also supports inserting vectors via the [HTTP API](), which allows you to operate on a Vectorize index from existing machine-learning tooling and languages (including Python).
