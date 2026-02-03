# Cloudflare Pipelines Skill

Expert guidance for working with Cloudflare Pipelines - ETL streaming data platform for ingesting, transforming, and loading data into R2.

## Overview

Cloudflare Pipelines ingests events, transforms them with SQL, and delivers to R2 as Apache Iceberg tables or Parquet/JSON files. It provides:

- **Streams**: Durable, buffered queues for event ingestion via HTTP or Workers
- **Pipelines**: SQL-based transformations between streams and sinks
- **Sinks**: Destinations for processed data (R2 Data Catalog or R2 storage)

**Status**: Open beta (Workers Paid plan required)
**Pricing**: Currently no charge beyond standard R2 storage/operations

## Architecture

```
Data Sources → Streams → Pipelines (SQL) → Sinks → R2
                 ↑          ↓                 ↓
            HTTP/Workers   Transform      Iceberg/Parquet
```

### Core Components

1. **Streams**: Buffer and store incoming events
   - Structured (with schema validation) or unstructured (raw JSON)
   - HTTP endpoints and Worker bindings
   - Can be read by multiple pipelines

2. **Pipelines**: Execute SQL transformations
   - Filter, transform, enrich data
   - Cannot be modified after creation (delete/recreate required)
   - SQL reference: SELECT, INSERT, scalar functions

3. **Sinks**: Write to destinations
   - **R2 Data Catalog**: Apache Iceberg tables with ACID guarantees
   - **R2 Storage**: Parquet or JSON files
   - Exactly-once delivery guarantee

## Common Use Cases

- **Analytics pipelines**: Server logs, clickstream, telemetry
- **Data warehousing**: ETL into queryable Iceberg tables
- **Event processing**: Mobile/IoT events with enrichment
- **Ecommerce analytics**: User events, purchases, product views
- **Log aggregation**: Application/server logs with filtering

## Setup & Configuration

### Quick Start

```bash
# Interactive setup (recommended)
npx wrangler pipelines setup

# Manual setup
npx wrangler r2 bucket create my-bucket
npx wrangler r2 bucket catalog enable my-bucket
npx wrangler pipelines streams create my-stream --schema-file schema.json
npx wrangler pipelines sinks create my-sink --type r2-data-catalog \
  --bucket my-bucket --namespace default --table my_table \
  --catalog-token YOUR_TOKEN
npx wrangler pipelines create my-pipeline \
  --sql "INSERT INTO my_sink SELECT * FROM my_stream"
```

### Schema Definition

**Structured streams** (recommended for validation):

```json
{
  "fields": [
    {
      "name": "user_id",
      "type": "string",
      "required": true
    },
    {
      "name": "event_type",
      "type": "string",
      "required": true
    },
    {
      "name": "amount",
      "type": "float64",
      "required": false
    },
    {
      "name": "tags",
      "type": "list",
      "required": false,
      "items": {
        "type": "string"
      }
    },
    {
      "name": "metadata",
      "type": "struct",
      "required": false,
      "fields": [
        {
          "name": "source",
          "type": "string",
          "required": false
        }
      ]
    }
  ]
}
```

**Supported types**: `string`, `int32`, `int64`, `float32`, `float64`, `bool`, `timestamp`, `json`, `binary`, `list`, `struct`

**Unstructured streams** (no validation, single `value` column):
```bash
npx wrangler pipelines streams create my-stream
```

## Writing Data to Streams

### Via Workers (Recommended)

**Configuration** (`wrangler.toml`):
```toml
[[pipelines]]
pipeline = "<STREAM_ID>"
binding = "STREAM"
```

**Or JSON** (`wrangler.jsonc`):
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "pipelines": [
    {
      "pipeline": "<STREAM_ID>",
      "binding": "STREAM"
    }
  ]
}
```

**Worker code**:
```typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const event = {
      user_id: "12345",
      event_type: "purchase",
      product_id: "widget-001",
      amount: 29.99
    };
    
    // Send single or multiple events
    await env.STREAM.send([event]);
    
    return new Response('Event sent');
  },
} satisfies ExportedHandler<Env>;
```

**Batch sending**:
```typescript
const events = [
  { user_id: "user1", event_type: "view" },
  { user_id: "user2", event_type: "purchase", amount: 50 }
];
await env.STREAM.send(events);
```

### Via HTTP

**Endpoint format**: `https://{stream-id}.ingest.cloudflare.com`

**Without auth** (for testing):
```bash
curl -X POST https://{stream-id}.ingest.cloudflare.com \
  -H "Content-Type: application/json" \
  -d '[
    {
      "user_id": "user_12345",
      "event_type": "purchase",
      "product_id": "widget-001",
      "amount": 29.99
    }
  ]'
```

**With authentication**:
```bash
curl -X POST https://{stream-id}.ingest.cloudflare.com \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '[{"event": "data"}]'
```

**Required permission**: Workers Pipeline Send

## SQL Transformations

### Basic Patterns

**Pass-through**:
```sql
INSERT INTO my_sink SELECT * FROM my_stream
```

**Filtering**:
```sql
INSERT INTO my_sink
SELECT * FROM my_stream
WHERE event_type = 'purchase' AND amount > 100
```

**Field selection**:
```sql
INSERT INTO my_sink
SELECT user_id, event_type, timestamp, amount
FROM my_stream
```

**Field transformation**:
```sql
INSERT INTO my_sink
SELECT
  user_id,
  UPPER(event_type) as event_type,
  timestamp,
  amount * 1.1 as amount_with_tax,
  CONCAT(user_id, '_', product_id) as unique_key
FROM my_stream
```

**Conditional logic**:
```sql
INSERT INTO my_sink
SELECT
  user_id,
  event_type,
  CASE
    WHEN amount > 1000 THEN 'high_value'
    WHEN amount > 100 THEN 'medium_value'
    ELSE 'low_value'
  END as customer_tier
FROM my_stream
WHERE event_type IN ('purchase', 'refund')
```

## Sink Configuration

### R2 Data Catalog (Iceberg Tables)

**Create sink**:
```bash
npx wrangler pipelines sinks create my-sink \
  --type r2-data-catalog \
  --bucket my-bucket \
  --namespace my_namespace \
  --table my_table \
  --catalog-token YOUR_CATALOG_TOKEN \
  --compression zstd \
  --roll-interval 60 \
  --roll-size 100
```

**Options**:
- `--compression`: `zstd` (default), `snappy`, `gzip`, `lz4`, `uncompressed`
- `--roll-interval`: Seconds between writes (default: 300)
- `--roll-size`: Max file size in MB before rolling
- `--target-row-group-size`: Parquet row group size in MB (default: 256)

**Querying with R2 SQL**:
```bash
export WRANGLER_R2_SQL_AUTH_TOKEN=YOUR_API_TOKEN

npx wrangler r2 sql query "warehouse_name" "
SELECT user_id, event_type, COUNT(*) as event_count
FROM default.my_table
WHERE event_type = 'purchase'
GROUP BY user_id, event_type
LIMIT 100"
```

### R2 Storage (Raw Files)

**JSON format**:
```bash
npx wrangler pipelines sinks create my-sink \
  --type r2 \
  --bucket my-bucket \
  --format json \
  --path analytics/events \
  --partitioning "year=%Y/month=%m/day=%d" \
  --roll-interval 60 \
  --roll-size 100 \
  --access-key-id YOUR_KEY \
  --secret-access-key YOUR_SECRET
```

**Parquet format** (better compression/performance):
```bash
npx wrangler pipelines sinks create my-sink \
  --type r2 \
  --bucket my-bucket \
  --format parquet \
  --compression zstd \
  --path analytics/events \
  --partitioning "year=%Y/month=%m/day=%d/hour=%H" \
  --target-row-group-size 256 \
  --roll-interval 300 \
  --roll-size 100 \
  --access-key-id YOUR_KEY \
  --secret-access-key YOUR_SECRET
```

**File organization**:
```
bucket/analytics/events/
  year=2025/
    month=01/
      day=11/
        uuid-1.parquet
        uuid-2.parquet
```

## Wrangler Commands Reference

### Setup & Management

```bash
# Interactive setup (creates stream, sink, pipeline)
npx wrangler pipelines setup

# List all pipelines
npx wrangler pipelines list

# Get pipeline details
npx wrangler pipelines get <PIPELINE_ID>

# Delete pipeline
npx wrangler pipelines delete <PIPELINE_ID>
```

### Streams

```bash
# Create stream with schema
npx wrangler pipelines streams create my-stream --schema-file schema.json

# Create unstructured stream
npx wrangler pipelines streams create my-stream

# List streams
npx wrangler pipelines streams list

# Get stream details
npx wrangler pipelines streams get <STREAM_ID>

# Delete stream (deletes dependent pipelines and buffered events!)
npx wrangler pipelines streams delete <STREAM_ID>
```

### Sinks

```bash
# Create R2 Data Catalog sink
npx wrangler pipelines sinks create my-sink \
  --type r2-data-catalog \
  --bucket my-bucket \
  --namespace default \
  --table my_table \
  --catalog-token TOKEN

# Create R2 storage sink
npx wrangler pipelines sinks create my-sink \
  --type r2 \
  --bucket my-bucket \
  --format parquet \
  --compression zstd

# List sinks
npx wrangler pipelines sinks list

# Get sink details
npx wrangler pipelines sinks get <SINK_ID>

# Delete sink
npx wrangler pipelines sinks delete <SINK_ID>
```

### Pipelines

```bash
# Create with inline SQL
npx wrangler pipelines create my-pipeline \
  --sql "INSERT INTO my_sink SELECT * FROM my_stream"

# Create with SQL file
npx wrangler pipelines create my-pipeline \
  --sql-file transform.sql

# View pipeline
npx wrangler pipelines get <PIPELINE_ID>

# List all pipelines
npx wrangler pipelines list

# Delete pipeline
npx wrangler pipelines delete <PIPELINE_ID>
```

## Authentication & Permissions

### R2 Data Catalog Token

Required permissions: **R2 Admin Read & Write**

Create in dashboard:
1. Go to R2 > Manage API tokens
2. Create Account API Token
3. Select "Admin Read & Write" permission
4. Save token value

### R2 Storage Credentials

Required permissions: **Object Read & Write**

Create via Wrangler or dashboard for access key ID and secret access key.

### HTTP Ingest Token

Required permissions: **Workers Pipeline Send**

For authenticated HTTP ingestion endpoints.

## Best Practices

### Schema Design
- ✅ Use structured streams for validation
- ✅ Mark critical fields as `required: true`
- ✅ Use appropriate types (`int64` for timestamps, `float64` for decimals)
- ❌ Avoid overly nested structs (query performance)
- ❌ Don't change schemas after creation (recreate stream)

### Performance
- **Low latency**: Set `--roll-interval 10` (smaller files, more frequent)
- **Query performance**: Set `--roll-interval 300` and `--roll-size 100` (larger files, less frequent)
- Use `zstd` compression for best ratio, `snappy` for speed
- Increase `--target-row-group-size` for analytical workloads

### SQL Transformations
- ✅ Filter early (`WHERE` clauses reduce data volume)
- ✅ Select only needed fields (reduces storage costs)
- ✅ Use functions for enrichment (CONCAT, UPPER, CASE)
- ❌ Cannot modify pipelines after creation (plan carefully)
- ❌ No JOINs across streams (single stream per pipeline)

### Workers Integration
- ✅ Use Worker bindings (no token management)
- ✅ Batch events when possible (`send([event1, event2, ...])`)
- ✅ Handle send errors gracefully
- ❌ Don't await send in critical path if latency matters (use `ctx.waitUntil()`)

```typescript
// Fire-and-forget pattern
export default {
  async fetch(request, env, ctx) {
    const event = { /* ... */ };
    
    // Don't block response on send
    ctx.waitUntil(env.STREAM.send([event]));
    
    return new Response('OK');
  }
};
```

### HTTP Ingestion
- ✅ Enable auth for production endpoints
- ✅ Configure CORS if sending from browsers
- ✅ Send arrays (not single objects) for batch efficiency
- ✅ Handle 4xx/5xx responses with retries

### Monitoring
- Check stream buffer status (dashboard or API)
- Monitor pipeline processing rate
- Review R2 storage growth
- Query data regularly to verify pipeline health

## Limits (Open Beta)

| Resource | Limit |
|----------|-------|
| Streams per account | 20 |
| Sinks per account | 20 |
| Pipelines per account | 20 |
| Payload size per request | 1 MB |
| Ingest rate per stream | 5 MB/s |

Request increases: [Limit Increase Form](https://forms.gle/ukpeZVLWLnKeixDu7)

## Troubleshooting

### Events not appearing in R2
- Wait 10-300 seconds (depends on `--roll-interval`)
- Check pipeline status: `npx wrangler pipelines get <ID>`
- Verify stream has data (check dashboard metrics)
- Confirm sink credentials are valid

### Schema validation failures
- Events accepted but dropped if invalid
- Check event structure matches schema exactly
- Verify required fields are present
- Check data types (e.g., strings not numbers)

### Worker binding not found
- Verify `wrangler.toml`/`wrangler.jsonc` has correct `pipeline` ID
- Redeploy Worker after adding binding
- Check binding name matches code (`env.STREAM`)

### SQL errors
- SQL cannot be modified after creation
- Recreate pipeline with corrected SQL
- Verify stream and sink names in SQL match actual resources
- Check SQL syntax against reference docs

## Complete Example: Ecommerce Analytics

**1. Create schema** (`ecommerce-schema.json`):
```json
{
  "fields": [
    {
      "name": "user_id",
      "type": "string",
      "required": true
    },
    {
      "name": "event_type",
      "type": "string",
      "required": true
    },
    {
      "name": "product_id",
      "type": "string",
      "required": false
    },
    {
      "name": "amount",
      "type": "float64",
      "required": false
    },
    {
      "name": "timestamp",
      "type": "timestamp",
      "required": true
    }
  ]
}
```

**2. Setup infrastructure**:
```bash
# Create bucket and enable catalog
npx wrangler r2 bucket create ecommerce-data
npx wrangler r2 bucket catalog enable ecommerce-data

# Create stream
npx wrangler pipelines streams create ecommerce-stream \
  --schema-file ecommerce-schema.json

# Create sink
npx wrangler pipelines sinks create ecommerce-sink \
  --type r2-data-catalog \
  --bucket ecommerce-data \
  --namespace default \
  --table events \
  --catalog-token $CATALOG_TOKEN \
  --roll-interval 60

# Create pipeline with transformation
npx wrangler pipelines create ecommerce-pipeline \
  --sql "INSERT INTO ecommerce_sink 
         SELECT 
           user_id,
           UPPER(event_type) as event_type,
           product_id,
           amount,
           timestamp,
           CASE 
             WHEN amount > 100 THEN 'high_value'
             ELSE 'standard'
           END as transaction_tier
         FROM ecommerce_stream
         WHERE event_type IN ('purchase', 'add_to_cart', 'view_product')"
```

**3. Configure Worker** (`wrangler.toml`):
```toml
name = "ecommerce-api"
main = "src/index.ts"

[[pipelines]]
pipeline = "<STREAM_ID>"
binding = "EVENTS"
```

**4. Send events** (`src/index.ts`):
```typescript
interface Env {
  EVENTS: Pipeline;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'POST') {
      const data = await request.json();
      
      const event = {
        user_id: data.userId,
        event_type: data.eventType,
        product_id: data.productId,
        amount: data.amount,
        timestamp: new Date().toISOString()
      };
      
      try {
        await env.EVENTS.send([event]);
        return new Response('Event tracked', { status: 200 });
      } catch (error) {
        return new Response('Failed to track event', { status: 500 });
      }
    }
    
    return new Response('Method not allowed', { status: 405 });
  }
} satisfies ExportedHandler<Env>;
```

**5. Query results**:
```bash
export WRANGLER_R2_SQL_AUTH_TOKEN=$CATALOG_TOKEN

npx wrangler r2 sql query "ecommerce-warehouse" "
SELECT 
  event_type,
  transaction_tier,
  COUNT(*) as event_count,
  SUM(amount) as total_revenue
FROM default.events
WHERE event_type = 'PURCHASE'
GROUP BY event_type, transaction_tier
ORDER BY total_revenue DESC"
```

## Additional Resources

- [Pipelines Documentation](https://developers.cloudflare.com/pipelines/)
- [SQL Reference](https://developers.cloudflare.com/pipelines/sql-reference/)
- [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/)
- [Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/#pipelines)
- [Apache Iceberg](https://iceberg.apache.org/)
