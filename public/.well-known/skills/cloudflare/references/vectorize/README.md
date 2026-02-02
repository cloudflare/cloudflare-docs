# Cloudflare Vectorize Skill

Expert guidance for Cloudflare Vectorize - globally distributed vector database for AI applications.

## Overview

Vectorize is Cloudflare's vector database that enables building full-stack AI-powered applications with Workers. It stores and queries vector embeddings for semantic search, recommendations, classification, and anomaly detection.

**Key Features:**
- Globally distributed vector database
- Seamless integration with Workers AI
- Support for dimensions up to 1536 (32-bit float precision)
- Metadata filtering (up to 10 indexes per Vectorize index)
- Namespace support for index segmentation
- Three distance metrics: euclidean, cosine, dot-product
- Up to 5M vectors per index (V2)

**Status:** Generally Available (GA)

## Index Configuration

### Creating Indexes

Use `wrangler vectorize create` with required parameters:

```bash
# Wrangler 3.71.0+ required for V2 indexes
npx wrangler@latest vectorize create <index-name> \
  --dimensions=<number> \
  --metric=<euclidean|cosine|dot-product>
```

**CRITICAL: Index configuration is immutable after creation. Cannot change dimensions or metric.**

#### Distance Metrics

| Metric | Best For | Score Interpretation |
|--------|----------|---------------------|
| `euclidean` | Absolute distance, spatial data | Lower = closer (0.0 = identical) |
| `cosine` | Text embeddings, semantic similarity | Higher = closer (1.0 = identical) |
| `dot-product` | Recommendation systems, normalized vectors | Higher = closer |

**Metric Selection:**
- Text/semantic search: `cosine` (most common)
- Image similarity: `euclidean`
- Pre-normalized vectors: `dot-product`

#### Naming Conventions

Index names must:
- Be lowercase and/or numeric ASCII
- Start with a letter
- Use dashes (-) instead of spaces
- Be < 32 characters
- Be descriptive: `production-doc-search`, `dev-recommendation-engine`

### Metadata Indexes

Enable filtering on metadata properties (up to 10 per index):

```bash
# Create metadata index BEFORE inserting vectors
npx wrangler vectorize create-metadata-index <index-name> \
  --property-name=<field-name> \
  --type=<string|number|boolean>
```

**Important:**
- Create metadata indexes BEFORE inserting vectors
- Existing vectors won't be indexed retroactively (must re-upsert)
- String fields: first 64 bytes indexed (UTF-8 boundary)
- Number fields: float64 precision
- Max 10 metadata indexes per Vectorize index

**Cardinality Considerations:**
- **High cardinality** (UUIDs, millisecond timestamps): Good for `$eq`, poor for range queries
- **Low cardinality** (enum values, status): Good for filters, less selective
- **Best practice**: Bucket high-cardinality data (e.g., round timestamps to 5-min windows)

### Management Commands

```bash
# List metadata indexes
npx wrangler vectorize list-metadata-index <index-name>

# Delete metadata index
npx wrangler vectorize delete-metadata-index <index-name> --property-name=<field>

# Get index info (vector count, processed mutations)
npx wrangler vectorize info <index-name>

# List vector IDs (paginated, 1-1000 per page)
npx wrangler vectorize list-vectors <index-name> \
  --count=100 \
  --cursor=<pagination-cursor>
```

## Worker Binding

### Configuration

**wrangler.jsonc:**
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "vectorize": [
    {
      "binding": "VECTORIZE",
      "index_name": "production-index"
    }
  ]
}
```

**wrangler.toml:**
```toml
[[vectorize]]
binding = "VECTORIZE"  # Available as env.VECTORIZE
index_name = "production-index"
```

### TypeScript Types

```typescript
export interface Env {
  VECTORIZE: Vectorize;
}

// Generate types after config changes
// npx wrangler types
```

## Vector Operations

### Vector Format

```typescript
interface VectorizeVector {
  id: string;              // Unique identifier (max 64 bytes)
  values: number[] | Float32Array | Float64Array;  // Match index dimensions
  namespace?: string;      // Optional partition key (max 64 bytes)
  metadata?: Record<string, string | number | boolean | null>;  // Max 10 KiB
}
```

**Vector Values:**
- Array of numbers, Float32Array, or Float64Array
- Must match index dimensions exactly
- Stored as Float32 (Float64 converted on insert)
- Dense arrays only (no sparse vectors)

### Insert vs Upsert

```typescript
// INSERT: Ignore duplicates (keeps first)
const inserted = await env.VECTORIZE.insert([
  {
    id: "1",
    values: [0.12, 0.45, 0.67, ...],
    metadata: { url: "/products/sku/123", category: "electronics" }
  }
]);

// UPSERT: Overwrite existing (keeps last)
const upserted = await env.VECTORIZE.upsert([
  {
    id: "1",
    values: [0.15, 0.48, 0.70, ...],
    metadata: { url: "/products/sku/123", category: "electronics", updated: true }
  }
]);
```

**Key Differences:**
- `insert()`: Duplicate IDs ignored, first insert wins
- `upsert()`: Overwrites completely (no merge), last upsert wins
- Both return `{ mutationId: string }`
- Asynchronous: Takes a few seconds to be queryable

**Batch Limits:**
- Workers: 1000 vectors per batch
- HTTP API: 5000 vectors per batch
- File upload: 100 MB max

### Querying

#### Basic Query

```typescript
// Query vector: must match index dimensions
const queryVector: number[] = [0.13, 0.25, 0.44, ...];

const matches = await env.VECTORIZE.query(queryVector, {
  topK: 5,                    // Default: 5, Max: 100 (or 20 with values/metadata)
  returnValues: false,        // Default: false
  returnMetadata: "none",     // "none" | "indexed" | "all"
  namespace?: "user-123",     // Optional namespace filter
  filter?: { category: "electronics" }  // Optional metadata filter
});
```

**Response:**
```typescript
interface VectorizeMatches {
  count: number;
  matches: Array<{
    id: string;
    score: number;           // Distance score (interpretation depends on metric)
    values?: number[];       // If returnValues: true
    metadata?: Record<string, any>;  // If returnMetadata != "none"
  }>;
}
```

#### Query by ID

```typescript
// Query using existing vector in index
const matches = await env.VECTORIZE.queryById("some-vector-id", {
  topK: 5,
  returnValues: true,
  returnMetadata: "all"
});
```

#### Get Vectors by ID

```typescript
// Retrieve specific vectors with values and metadata
const ids = ["11", "22", "33"];
const vectors = await env.VECTORIZE.getByIds(ids);
```

### Metadata Filtering

```typescript
// Implicit $eq
const matches = await env.VECTORIZE.query(queryVector, {
  topK: 10,
  filter: { category: "electronics" }
});

// Explicit operators
const matches = await env.VECTORIZE.query(queryVector, {
  filter: {
    category: { $ne: "deprecated" },
    price: { $gte: 10, $lt: 100 },
    tags: { $in: ["featured", "sale"] },
    discontinued: { $ne: true }
  }
});

// Nested metadata with dot notation
const matches = await env.VECTORIZE.query(queryVector, {
  filter: { "product.brand": "acme" }
});

// Range query for prefix search (strings)
const matches = await env.VECTORIZE.query(queryVector, {
  filter: { 
    category: { $gte: "elec", $lt: "eled" }  // Matches "electronics"
  }
});
```

**Operators:**
- `$eq`: Equals (implicit if no operator)
- `$ne`: Not equals
- `$in`: In array
- `$nin`: Not in array
- `$lt`, `$lte`: Less than (or equal)
- `$gt`, `$gte`: Greater than (or equal)

**Filter Constraints:**
- Max 2048 bytes (compact JSON)
- Keys: no empty, no dots, no `$` prefix, no double-quotes, max 512 chars
- Values: string, number, boolean, null
- Range queries: Can combine upper/lower bounds on same field
- Namespaces filtered before metadata

### Deletion

```typescript
// Delete by IDs (asynchronous)
const deleted = await env.VECTORIZE.deleteByIds(["11", "22", "33"]);
// Returns: { mutationId: string }
```

### Index Inspection

```typescript
// Get index configuration
const details = await env.VECTORIZE.describe();
// Returns: { dimensions: number, metric: string, vectorCount?: number }
```

## Namespaces

Partition vectors within a single index by customer, tenant, or category.

```typescript
// Insert with namespace
await env.VECTORIZE.insert([
  { id: "1", values: [...], namespace: "customer-abc" },
  { id: "2", values: [...], namespace: "customer-xyz" }
]);

// Query within namespace (applied before vector search)
const matches = await env.VECTORIZE.query(queryVector, {
  namespace: "customer-abc"
});
```

**Limits:**
- 50,000 namespaces (Paid) / 1,000 (Free)
- Max 64 bytes per namespace name
- Namespace filter applied before metadata filters

## Integration Patterns

### Workers AI Integration

```typescript
import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ai = new Ai(env.AI);
    
    // Generate embedding
    const userQuery = "what is a vector database";
    const embeddings = await ai.run("@cf/baai/bge-base-en-v1.5", {
      text: [userQuery]
    });
    
    // embeddings.data is number[][]
    // Pass embeddings.data[0], NOT embeddings or embeddings.data
    const matches = await env.VECTORIZE.query(embeddings.data[0], {
      topK: 3,
      returnMetadata: "all"
    });
    
    return Response.json({ matches });
  }
};
```

**Common Embedding Models:**
- `@cf/baai/bge-base-en-v1.5`: 768 dimensions, English
- `@cf/baai/bge-large-en-v1.5`: 1024 dimensions, English
- `@cf/baai/bge-small-en-v1.5`: 384 dimensions, English

### OpenAI Integration

```typescript
import OpenAI from 'openai';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });
    
    const userQuery = "semantic search query";
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: userQuery
    });
    
    // Pass response.data[0].embedding, NOT response
    const matches = await env.VECTORIZE.query(response.data[0].embedding, {
      topK: 5,
      returnMetadata: "all"
    });
    
    return Response.json({ matches });
  }
};
```

### RAG Pattern

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { query } = await request.json();
    
    // 1. Generate query embedding
    const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [query]
    });
    
    // 2. Search Vectorize
    const matches = await env.VECTORIZE.query(embeddings.data[0], {
      topK: 5,
      returnMetadata: "all"
    });
    
    // 3. Fetch full documents from R2/D1/KV
    const documents = await Promise.all(
      matches.matches.map(async (match) => {
        const key = match.metadata?.r2_key as string;
        const obj = await env.R2_BUCKET.get(key);
        return obj?.text();
      })
    );
    
    // 4. Build context for LLM
    const context = documents.filter(Boolean).join("\n\n");
    
    // 5. Generate response with context
    const llmResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      prompt: `Context: ${context}\n\nQuestion: ${query}\n\nAnswer:`
    });
    
    return Response.json({ answer: llmResponse, sources: matches.matches });
  }
};
```

## CLI Operations

### Bulk Upload (NDJSON)

```bash
# File: embeddings.ndjson
# { "id": "1", "values": [0.1, 0.2, ...], "metadata": {"url": "/doc/1"}}
# { "id": "2", "values": [0.3, 0.4, ...], "metadata": {"url": "/doc/2"}}

npx wrangler vectorize insert <index-name> --file=embeddings.ndjson
```

**Rate Limits:**
- Max 5000 vectors per file (Cloudflare API rate limit)
- Use multiple files for larger batches

### Python HTTP API Example

```python
import requests

url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/vectorize/v2/indexes/{index_name}/insert"
headers = {"Authorization": f"Bearer {api_token}"}

with open('embeddings.ndjson', 'rb') as f:
    resp = requests.post(url, headers=headers, files=dict(vectors=f))
    print(resp.json())
```

## Performance Optimization

### Write Throughput

**Batching Strategy:**
- Vectorize batches up to 200K vectors OR 1000 operations per job
- Inserting 1 vector at a time = 1000 vectors per job = slow
- Inserting 2500 vectors at a time = 200K+ vectors per job = fast

**Example:**
```typescript
// BAD: 250,000 individual inserts = 250 jobs = ~1 hour
for (const vector of vectors) {
  await env.VECTORIZE.insert([vector]);
}

// GOOD: 100 batches of 2,500 = 2-3 jobs = minutes
for (let i = 0; i < vectors.length; i += 2500) {
  const batch = vectors.slice(i, i + 2500);
  await env.VECTORIZE.insert(batch);
}
```

### Query Performance

**High-Precision vs. Approximate:**
- Default: Approximate scoring (faster, good trade-off)
- `returnValues: true`: High-precision scoring (slower, more accurate)

**topK Limits:**
- Default limit: 100 without values/metadata
- With `returnValues: true` or `returnMetadata: "all"`: Max 20
- Balance accuracy vs. latency

**Metadata Filter Performance:**
- Namespace filters applied first (fastest)
- High-cardinality range queries degrade performance
- Bucket high-cardinality values when possible

### Mutation Tracking

```bash
# Check if mutations are processed
npx wrangler vectorize info <index-name>

# Returns processedUpToMutation and processedUpToDatetime
# Compare with insert/upsert mutationId
```

## Limits (V2)

| Resource | Limit |
|----------|-------|
| Indexes per account | 50,000 (Paid) / 100 (Free) |
| Max dimensions | 1536 (32-bit float) |
| Max vector ID length | 64 bytes |
| Metadata per vector | 10 KiB |
| Max topK (no values/metadata) | 100 |
| Max topK (with values/metadata) | 20 |
| Insert batch size (Workers) | 1000 |
| Insert batch size (HTTP API) | 5000 |
| List vectors page size | 1000 |
| Max index name length | 64 bytes |
| Max vectors per index | 5,000,000 |
| Max namespaces | 50,000 (Paid) / 1000 (Free) |
| Max namespace length | 64 bytes |
| Max upload size | 100 MB |
| Max metadata indexes | 10 |
| Indexed metadata per field | 64 bytes (strings, UTF-8) |

## Common Patterns

### Multi-Tenant Architecture

```typescript
// Option 1: Separate indexes per tenant (if < 50K tenants)
const tenantIndex = env[`VECTORIZE_${tenantId.toUpperCase()}`];

// Option 2: Namespaces (up to 50K namespaces)
await env.VECTORIZE.insert([
  { id: "doc-1", values: [...], namespace: `tenant-${tenantId}` }
]);

const matches = await env.VECTORIZE.query(queryVector, {
  namespace: `tenant-${tenantId}`
});

// Option 3: Metadata filtering (flexible but slower)
const matches = await env.VECTORIZE.query(queryVector, {
  filter: { tenantId: tenantId }
});
```

### Semantic Search with Metadata

```typescript
// Index documents with rich metadata
await env.VECTORIZE.upsert([
  {
    id: doc.id,
    values: embedding,
    metadata: {
      title: doc.title,
      category: doc.category,
      published: Math.floor(doc.date / 1000), // Unix timestamp
      tags: doc.tags.join(","),
      url: doc.url
    }
  }
]);

// Search with filters
const matches = await env.VECTORIZE.query(queryVector, {
  topK: 10,
  returnMetadata: "all",
  filter: {
    category: "tutorials",
    published: { $gte: thirtyDaysAgo }
  }
});
```

### Hybrid Search (Vector + Metadata)

```typescript
// 1. Create metadata indexes for common filters
// wrangler vectorize create-metadata-index my-index --property-name=category --type=string
// wrangler vectorize create-metadata-index my-index --property-name=published --type=number

// 2. Query with both semantic similarity and filters
const results = await env.VECTORIZE.query(queryVector, {
  topK: 20,
  returnMetadata: "all",
  filter: {
    category: { $in: ["tech", "science"] },
    published: { $gte: lastMonth },
    status: "published"
  }
});
```

## Error Handling

```typescript
try {
  const matches = await env.VECTORIZE.query(queryVector, { topK: 5 });
} catch (error) {
  // Common errors:
  // - Dimension mismatch
  // - Invalid filter syntax
  // - topK exceeds limits
  // - Index not found/not bound
  console.error("Vectorize query failed:", error);
  
  // Fallback strategy
  return Response.json({ 
    error: "Search unavailable", 
    matches: [] 
  }, { status: 503 });
}
```

## Best Practices

1. **Create metadata indexes BEFORE inserting vectors** - existing vectors not retroactively indexed
2. **Use upsert for updates** - insert ignores duplicates
3. **Batch operations** - 1000-2500 vectors per batch for optimal throughput
4. **Monitor mutations** - Use `wrangler vectorize info` to track processing
5. **Choose appropriate metric** - cosine for text, euclidean for images
6. **Design for cardinality** - Bucket high-cardinality metadata for better range queries
7. **Namespace for tenant isolation** - Faster than metadata filters
8. **Return metadata strategically** - Use "indexed" for speed, "all" when needed
9. **Validate dimensions** - Must match index configuration exactly
10. **Handle async operations** - Inserts/upserts take seconds to be queryable

## Common Mistakes

1. **Passing wrong data shape to query():**
   - Workers AI: Pass `embeddings.data[0]`, not `embeddings`
   - OpenAI: Pass `response.data[0].embedding`, not `response`

2. **Creating metadata indexes after inserting vectors** - Won't index existing vectors

3. **Using insert when upsert is needed** - Duplicates ignored with insert

4. **Not batching operations** - 1 vector per request is extremely slow

5. **Returning all values/metadata by default** - Impacts performance and topK limit

6. **High-cardinality range queries** - Use bucketing or discrete values

7. **Exceeding topK limits** - 20 with values/metadata, 100 without

8. **Forgetting to run wrangler types** - Missing TypeScript types after config changes

## Troubleshooting

### Vectors not appearing in queries

- Check mutation processed: `wrangler vectorize info <index>`
- Wait 5-10 seconds after insert/upsert
- Verify mutationId matches processedUpToMutation

### Dimension mismatch errors

- Ensure query vector length matches index dimensions exactly
- Check embedding model output dimensions

### Filter not working

- Verify metadata index created: `wrangler vectorize list-metadata-index <index>`
- Re-upsert vectors after creating metadata index
- Check filter syntax and operator constraints

### Performance issues

- Reduce topK if using returnValues or returnMetadata="all"
- Simplify metadata filters (avoid high-cardinality ranges)
- Use namespace filtering instead of metadata when possible
- Batch insert/upsert operations properly

## Resources

- [Official Docs](https://developers.cloudflare.com/vectorize/)
- [Client API Reference](https://developers.cloudflare.com/vectorize/reference/client-api/)
- [Metadata Filtering](https://developers.cloudflare.com/vectorize/reference/metadata-filtering/)
- [Limits](https://developers.cloudflare.com/vectorize/platform/limits/)
- [Workers AI Models](https://developers.cloudflare.com/workers-ai/models/#text-embeddings)
- [Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/#vectorize)
- [Discord: #vectorize](https://discord.cloudflare.com)

---

**Version:** V2 (GA) - Requires Wrangler 3.71.0+
**Last Updated:** 2025-01-11
