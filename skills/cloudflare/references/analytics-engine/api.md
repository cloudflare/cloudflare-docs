#### API Usage Tracking

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const customerId = request.headers.get("X-Customer-Id");
    const startTime = Date.now();
    
    // Handle request...
    const response = await handleRequest(request);
    const duration = Date.now() - startTime;
    
    // Track API usage
    env.API_USAGE.writeDataPoint({
      blobs: [
        url.pathname,                      // blob1: endpoint
        request.method,                    // blob2: HTTP method  
        response.status.toString(),        // blob3: status code
        request.cf?.colo as string,        // blob4: datacenter
        request.cf?.country as string      // blob5: country
      ],
      doubles: [
        duration,                          // double1: latency ms
        1                                  // double2: request count (for summing)
      ],
      indexes: [customerId || "anonymous"