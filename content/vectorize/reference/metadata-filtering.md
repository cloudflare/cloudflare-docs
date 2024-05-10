---
title: Metadata filtering
pcx_content_type: concept
weight: 6
---

# Metadata Filtering

In addition to providing an input vector to your query, you can also filter by [vector metadata](/vectorize/best-practices/insert-vectors/#metadata) associated with every vector. Query results only include vectors that match `filter` criteria, meaning that  `filter` is applied first, and `topK` results are taken from the filtered set. 

By using metadata filtering to limit the scope of a query, you can filter by specific customer IDs, tenant, product category or any other metadata you associate with your vectors.

## Supported operations

Optional `filter` property on `query()` method specifies metadata filter:

| Operator | Description |
| -------- | ----------- |
| `$eq`    | Equals      |
| `$ne`    | Not equals |

- `filter` must be non-empty object whose compact JSON representation must be less than 2048 bytes.
- `filter` object keys cannot be empty, contain `" | .` (dot is reserved for nesting), start with `$`, or be longer than 512 characters.
- `filter` object non-nested values can be `string`, `number`, `boolean`, or `null` values.

### Namespace versus metadata filtering

Both [namespaces](/vectorize/best-practices/insert-vectors/#namespaces) and metadata filtering narrow the vector search space for a query.  Consider the following when evaluating both filter types:

- A namespace filter is applied before metadata filter(s). 
- A vector can only be part of a single namespace with the documented [limits](/vectorize/platform/limits/). Vector metadata can contain multiple key-value pairs up to [metadata per vector limits](/vectorize/platform/limits/). Metadata values support different types (`string`, `boolean`, and others), therefore offering more flexibility.

### Valid `filter` examples

#### Implicit `$eq` operator

```json
{ "streaming_platform": "netflix" }
```

#### Explicit operator

```json
{ "someKey": { "$ne": true } }
```

#### Implicit logical `AND` with multiple keys

```json
{ "pandas.nice": 42, "someKey": { "$ne": true } }
```

#### Keys define nesting with `.` (dot)

```json
{ "pandas.nice": 42 } // looks for { "pandas": { "nice": 42 } }
```

## Examples

### Add metadata

With the following index definition:

```sh
$ npx wrangler vectorize create tutorial-index --dimensions=3 --metric=cosine
```

Metadata can be added when [inserting or upserting vectors](/vectorize/best-practices/insert-vectors/#examples).

```ts
const newMetadataVectors: Array<VectorizeVector> = [
	{ 
    id: "1", 
    values: [32.4, 74.1, 3.2], 
    metadata: { url: "/products/sku/13913913", streaming_platform: "netflix" } 
  },
	{ 
    id: "2", 
    values: [15.1, 19.2, 15.8], 
    metadata: { url: "/products/sku/10148191", streaming_platform: "hbo" } 
  },
	{ 
    id: "3", 
    values: [0.16, 1.2, 3.8], 
    metadata: { url: "/products/sku/97913813", streaming_platform: "amazon" } 
  },
	{ id: "4",
    values: [75.1, 67.1, 29.9], 
    metadata: { url: "/products/sku/418313", streaming_platform: "netflix" } 
  },
	{ 
    id: "5", 
    values: [58.8, 6.7, 3.4], 
    metadata: { url: "/products/sku/55519183", streaming_platform: "hbo" } 
  },
];

// Upsert vectors with added metadata, returning a count of the vectors upserted and their vector IDs
let upserted = await env.YOUR_INDEX.upsert(newMetadataVectors);
```

### Query examples

Use the `query()` method:

```ts
let queryVector: Array<number> = [54.8, 5.5, 3.1];
// Best match is vector id = 5 (score closet to 1)
let originalMatches = await env.YOUR_INDEX.query(queryVector, { topK: 3, returnValues: true, returnMetadata: true });
```

Results without metadata filtering:

```json
{
  "matches": [
      {
        "id": "5",
        "score": 0.999909486,
        "values": [58.79999923706055, 6.699999809265137, 3.4000000953674316],
        "metadata": {
          "url": "/products/sku/55519183",
          "streaming_platform": "hbo"
        }
      },
      {
        "id": "4",
        "score": 0.789848214,
        "values": [75.0999984741211, 67.0999984741211, 29.899999618530273],
        "metadata": {
          "url": "/products/sku/418313",
          "streaming_platform": "netflix"
        }
      },
      {
        "id": "2",
        "score": 0.611976262,
        "values": [15.100000381469727, 19.200000762939453, 15.800000190734863],
        "metadata": {
          "url": "/products/sku/10148191",
          "streaming_platform": "hbo"
        }
      }
  ]
}
```

The same `query()` method with a `filter` property supports metadata filtering.

```ts
let queryVector: Array<number> = [54.8, 5.5, 3.1];
// Best match is vector id = 4 with metadata filter
let metadataMatches = await env.YOUR_INDEX.query(queryVector, { topK: 3, filter: { streaming_platform: "netflix" }, returnValues: true, returnMetadata: true } )
```

Results with metadata filtering:

```json
{
  "matches": [
    {
      "id": "4",
      "score": 0.789848214,
      "values": [ 75.0999984741211, 67.0999984741211, 29.899999618530273],
      "metadata": {
        "url": "/products/sku/418313",
        "streaming_platform": "netflix"
      }
    },
    {
      "id": "1",
      "score": 0.491185264,
      "values": [32.400001525878906, 74.0999984741211, 3.200000047683716],
      "metadata": {
        "url": "/products/sku/13913913",
        "streaming_platform": "netflix"
      }
    }
  ]
}
```

## Limitations
- Only newly created indexes on or after 2023-12-06 support metadata filtering. Previously created indexes cannot be migrated to support metadata filtering.
