## Common Use Cases

### 1. Usage-Based Billing

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const customerId = request.headers.get('X-Customer-ID');
    const apiKey = request.headers.get('X-API-Key');
    
    if (!customerId || !apiKey) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Track API usage per customer
    env.ANALYTICS.writeDataPoint({
      'blobs': [customerId, request.url, request.method],
      'doubles': [1], // request_count
      'indexes': [customerId]
    });
    
    return processRequest(request);
  }
}
```

**Query for billing**:
```sql
SELECT
  blob1 AS customer_id,
  SUM(_sample_interval * double1) AS total_api_calls
FROM api_usage
WHERE timestamp >= DATE_TRUNC('month', NOW())
GROUP BY customer_id
ORDER BY total_api_calls DESC
```

### 2. Performance Monitoring

```typescript
async function monitoredFetch(url: string, env: Env): Promise<Response> {
  const start = Date.now(