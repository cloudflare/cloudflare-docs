# Cloudflare Tail Workers Skill

## Purpose
Expert guidance on Cloudflare Tail Workers—specialized Workers that consume execution events from producer Workers for logging, debugging, analytics, and observability.

## When to Use
- User implements observability/logging for Cloudflare Workers
- User needs to process Worker execution events, logs, exceptions
- User builds custom analytics or error tracking
- User configures real-time event streaming
- User mentions tail handlers, tail consumers, or producer Workers

## Core Concepts

### What Are Tail Workers?
Tail Workers automatically process events from producer Workers (the Workers being monitored). They receive:
- HTTP request/response info
- Console logs (console.log/error/warn/debug)
- Uncaught exceptions
- Execution outcomes (ok, exception, exceededCpu, etc.)
- Diagnostic channel events

**Key characteristics:**
- Invoked AFTER producer finishes executing
- Capture entire request lifecycle including Service Bindings and Dynamic Dispatch sub-requests
- Billed by CPU time, not request count
- Available on Workers Paid and Enterprise tiers

### Alternative: OpenTelemetry Export
For batch exports to observability tools (Sentry, Grafana, Honeycomb):
- Consider OTEL export instead of Tail Workers
- OTEL sends logs/traces in batches (more efficient)
- Tail Workers = advanced mode for custom processing

## Implementation Patterns

### Basic Tail Handler Structure

```typescript
export default {
  async tail(events, env, ctx) {
    // Process events from producer Worker
  }
};
```

**Parameters:**
- `events`: Array of `TailItem` objects (one per producer invocation)
- `env`: Bindings (KV, D1, R2, env vars, etc.)
- `ctx`: Context with `waitUntil()` for async work

**CRITICAL:** Tail handlers don't return values. Use `ctx.waitUntil()` for async operations.

### Event Structure (`TailItem`)

```typescript
interface TailItem {
  scriptName: string;           // Producer Worker name
  eventTimestamp: number;        // Epoch time
  outcome: 'ok' | 'exception' | 'exceededCpu' | 'exceededMemory' 
         | 'canceled' | 'scriptNotFound' | 'responseStreamDisconnected' | 'unknown';
  
  event: {
    request?: {
      url: string;               // Redacted by default
      method: string;
      headers: Record<string, string>;  // Sensitive headers redacted
      cf: IncomingRequestCfProperties;
      getUnredacted(): TailRequest;     // Bypass redaction (use carefully)
    };
    response?: {
      status: number;
    };
  };
  
  logs: Array<{
    timestamp: number;
    level: 'debug' | 'info' | 'log' | 'warn' | 'error';
    message: any[];              // Args passed to console function
  }>;
  
  exceptions: Array<{
    timestamp: number;
    name: string;                // Error type (Error, TypeError, etc.)
    message: string;             // Error description
  }>;
  
  diagnosticsChannelEvents: Array<{
    channel: string;
    message: any;
    timestamp: number;
  }>;
}
```

### Configuration

**Producer Worker wrangler.toml:**
```toml
name = "my-producer-worker"
tail_consumers = [{service = "my-tail-worker"}]
```

**Producer Worker wrangler.jsonc:**
```json
{
  "name": "my-producer-worker",
  "tail_consumers": [
    {
      "service": "my-tail-worker"
    }
  ]
}
```

**Tail Worker wrangler.toml:**
```toml
name = "my-tail-worker"
# No special config needed, just must have tail() handler
```

## Common Use Cases

### 1. Send Logs to HTTP Endpoint

```typescript
export default {
  async tail(events, env, ctx) {
    const payload = events.map(event => ({
      script: event.scriptName,
      timestamp: event.eventTimestamp,
      outcome: event.outcome,
      url: event.event?.request?.url,
      status: event.event?.response?.status,
      logs: event.logs,
      exceptions: event.exceptions,
    }));
    
    ctx.waitUntil(
      fetch(env.LOG_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    );
  }
};
```

### 2. Error Tracking to External Service

```typescript
export default {
  async tail(events, env, ctx) {
    for (const event of events) {
      // Only process errors
      if (event.outcome === 'exception' || event.exceptions.length > 0) {
        ctx.waitUntil(
          fetch("https://error-tracker.example.com/errors", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${env.ERROR_TRACKER_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              script: event.scriptName,
              timestamp: event.eventTimestamp,
              exceptions: event.exceptions,
              request: event.event?.request?.getUnredacted?.(),  // If needed
              logs: event.logs,
            }),
          })
        );
      }
    }
  }
};
```

### 3. Store Logs in KV

```typescript
export default {
  async tail(events, env, ctx) {
    const promises = events.map(event => {
      const key = `log:${event.scriptName}:${event.eventTimestamp}`;
      const value = JSON.stringify({
        outcome: event.outcome,
        logs: event.logs,
        exceptions: event.exceptions,
      });
      
      // TTL: 24 hours
      return env.LOGS_KV.put(key, value, { expirationTtl: 86400 });
    });
    
    ctx.waitUntil(Promise.all(promises));
  }
};
```

### 4. Analytics Engine for Aggregated Metrics

```typescript
export default {
  async tail(events, env, ctx) {
    const writes = events.map(event => 
      env.ANALYTICS.writeDataPoint({
        // String dimensions
        blobs: [
          event.scriptName,
          event.outcome,
          event.event?.request?.method ?? 'unknown',
        ],
        // Numeric metrics
        doubles: [
          1,  // Count
          event.event?.response?.status ?? 0,
        ],
        // Indexed fields for filtering
        indexes: [
          event.event?.request?.cf?.colo ?? 'unknown',
        ],
      })
    );
    
    ctx.waitUntil(Promise.all(writes));
  }
};
```

### 5. Filter Specific Routes/Patterns

```typescript
export default {
  async tail(events, env, ctx) {
    // Only process API routes
    const apiEvents = events.filter(event => 
      event.event?.request?.url?.includes('/api/')
    );
    
    if (apiEvents.length === 0) return;
    
    ctx.waitUntil(
      fetch(env.API_LOGS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(apiEvents),
      })
    );
  }
};
```

### 6. Multi-Destination Logging

```typescript
export default {
  async tail(events, env, ctx) {
    // Send errors to one place, everything else to another
    const errors = events.filter(e => e.outcome === 'exception');
    const success = events.filter(e => e.outcome === 'ok');
    
    const tasks = [];
    
    if (errors.length > 0) {
      tasks.push(
        fetch(env.ERROR_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(errors),
        })
      );
    }
    
    if (success.length > 0) {
      tasks.push(
        fetch(env.SUCCESS_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(success),
        })
      );
    }
    
    ctx.waitUntil(Promise.all(tasks));
  }
};
```

### 7. Performance Monitoring

```typescript
export default {
  async tail(events, env, ctx) {
    const metrics = events.map(event => ({
      script: event.scriptName,
      timestamp: event.eventTimestamp,
      duration: calculateDuration(event),  // Custom logic
      outcome: event.outcome,
      status: event.event?.response?.status,
      colo: event.event?.request?.cf?.colo,
    }));
    
    ctx.waitUntil(
      fetch(env.METRICS_ENDPOINT, {
        method: "POST",
        headers: { "X-API-Key": env.METRICS_API_KEY },
        body: JSON.stringify(metrics),
      })
    );
  }
};
```

## Security & Privacy

### Automatic Redaction
By default, sensitive data is redacted from `TailRequest`:

**Header redaction:**
- Headers containing: `auth`, `key`, `secret`, `token`, `jwt` (case-insensitive)
- `cookie` and `set-cookie` headers
- Redacted values show as `"REDACTED"`

**URL redaction:**
- Hex IDs: 32+ hex digits → `"REDACTED"`
- Base-64 IDs: 21+ chars with 2+ upper, 2+ lower, 2+ digits → `"REDACTED"`

### Bypassing Redaction
```typescript
// Use with extreme caution
const unredacted = event.event?.request?.getUnredacted();
// unredacted.url and unredacted.headers contain raw values
```

**Best practices:**
- Only call `getUnredacted()` when absolutely necessary
- Never log unredacted sensitive data
- Implement additional filtering before external transmission
- Use environment variables for API keys, never hardcode

## Wrangler CLI Usage

### Deploy Tail Worker
```bash
wrangler deploy
```

### View Live Tail Locally (NOT Tail Workers)
```bash
# This streams logs to terminal, different from Tail Workers
wrangler tail <producer-worker-name>
```

### Update Producer Configuration
```bash
# Edit wrangler.toml to add tail_consumers
wrangler deploy
```

### Remove Tail Consumer
```toml
# Remove from wrangler.toml or set empty array
tail_consumers = []
```

## TypeScript Types

```typescript
// Add to your Tail Worker
export default {
  async tail(
    events: TailItem[],
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Implementation
  }
} satisfies ExportedHandler<Env>;

interface Env {
  // Your bindings
  LOGS_KV: KVNamespace;
  ANALYTICS: AnalyticsEngineDataset;
  LOG_ENDPOINT: string;
  API_TOKEN: string;
}
```

## Testing & Development

### Local Testing
Tail Workers cannot be fully tested locally with `wrangler dev`. Deploy to staging environment for testing.

### Testing Strategy
1. Deploy producer Worker to staging
2. Deploy Tail Worker to staging
3. Configure `tail_consumers` in producer
4. Trigger producer Worker requests
5. Verify Tail Worker receives events (check destination logs/storage)

### Debugging Tips
```typescript
export default {
  async tail(events, env, ctx) {
    // Log to console for debugging (won't be captured by self)
    console.log('Received events:', events.length);
    
    try {
      // Your logic
      await processEvents(events, env);
    } catch (error) {
      // Log errors
      console.error('Tail Worker error:', error);
      // Consider sending errors to monitoring service
    }
  }
};
```

## Advanced Patterns

### Batching Events
```typescript
// Use KV or Durable Objects to batch events before sending
export default {
  async tail(events, env, ctx) {
    const batch = await env.BATCH_DO.get(env.BATCH_DO.idFromName("batch"));
    ctx.waitUntil(batch.addEvents(events));
  }
};
```

### Sampling
```typescript
// Only process a percentage of events
export default {
  async tail(events, env, ctx) {
    const sampleRate = 0.1;  // 10%
    const sampledEvents = events.filter(() => Math.random() < sampleRate);
    
    if (sampledEvents.length > 0) {
      ctx.waitUntil(sendToEndpoint(sampledEvents, env));
    }
  }
};
```

### Workers for Platforms
For dynamic dispatch Workers, `events` array contains TWO elements:
1. Dynamic dispatch Worker event
2. User Worker event

```typescript
export default {
  async tail(events, env, ctx) {
    for (const event of events) {
      // Distinguish between dispatch and user Worker
      if (event.scriptName === 'dispatch-worker') {
        // Handle dispatch Worker event
      } else {
        // Handle user Worker event
      }
    }
  }
};
```

## Common Pitfalls

1. **Not using `ctx.waitUntil()`:**
   ```typescript
   // ❌ WRONG - async work may not complete
   export default {
     async tail(events) {
       fetch(endpoint, { body: JSON.stringify(events) });
     }
   };
   
   // ✅ CORRECT
   export default {
     async tail(events, env, ctx) {
       ctx.waitUntil(
         fetch(endpoint, { body: JSON.stringify(events) })
       );
     }
   };
   ```

2. **Missing tail() handler:**
   Producer Worker deployment will fail if tail_consumers references a Worker without tail() handler.

3. **Outcome vs HTTP Status:**
   `outcome` is script execution status, NOT HTTP status. A Worker can return 500 but have outcome='ok' if script completed successfully.

4. **Excessive logging:**
   Tail Workers are invoked on EVERY producer invocation. Be mindful of volume and costs.

5. **Blocking operations:**
   Don't await in tail handler unless necessary. Use `ctx.waitUntil()` for fire-and-forget operations.

## Integration Examples

### Sentry
```typescript
export default {
  async tail(events, env, ctx) {
    const errors = events.filter(e => 
      e.outcome === 'exception' || e.exceptions.length > 0
    );
    
    for (const event of errors) {
      ctx.waitUntil(
        fetch(`https://sentry.io/api/${env.SENTRY_PROJECT}/store/`, {
          method: "POST",
          headers: {
            "X-Sentry-Auth": `Sentry sentry_key=${env.SENTRY_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: event.exceptions[0]?.message,
            level: "error",
            tags: { worker: event.scriptName },
            extra: { event },
          }),
        })
      );
    }
  }
};
```

### Datadog
```typescript
export default {
  async tail(events, env, ctx) {
    const logs = events.flatMap(event => 
      event.logs.map(log => ({
        ddsource: "cloudflare-worker",
        ddtags: `worker:${event.scriptName},outcome:${event.outcome}`,
        hostname: event.event?.request?.cf?.colo,
        message: log.message.join(" "),
        status: log.level,
        timestamp: log.timestamp,
      }))
    );
    
    ctx.waitUntil(
      fetch("https://http-intake.logs.datadoghq.com/v1/input", {
        method: "POST",
        headers: {
          "DD-API-KEY": env.DATADOG_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logs),
      })
    );
  }
};
```

## Related Resources
- Tail Workers Docs: https://developers.cloudflare.com/workers/observability/logs/tail-workers/
- Tail Handler API: https://developers.cloudflare.com/workers/runtime-apis/handlers/tail/
- Analytics Engine: https://developers.cloudflare.com/analytics/analytics-engine/
- OpenTelemetry Export: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/

## Decision Tree

```
Need observability for Workers?
├─ Batch export to known tools (Sentry/Grafana/Honeycomb)?
│  └─ Use OpenTelemetry export (not Tail Workers)
├─ Custom real-time processing needed?
│  ├─ Aggregated metrics?
│  │  └─ Use Tail Worker + Analytics Engine
│  ├─ Error tracking?
│  │  └─ Use Tail Worker + external service
│  ├─ Custom logging/debugging?
│  │  └─ Use Tail Worker + KV/HTTP endpoint
│  └─ Complex event processing?
│     └─ Use Tail Worker + Durable Objects
└─ Quick debugging?
   └─ Use `wrangler tail` (different from Tail Workers)
```

## Code Quality Guidelines

### Type Safety
```typescript
// ✅ Use proper types
interface Env {
  LOG_ENDPOINT: string;
  API_TOKEN: string;
}

export default {
  async tail(
    events: TailItem[],
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Type-safe implementation
  }
} satisfies ExportedHandler<Env>;

// ❌ Avoid any
export default {
  async tail(events: any, env: any, ctx: any) {
    // Unsafe
  }
};
```

### Error Handling
```typescript
export default {
  async tail(events, env, ctx) {
    ctx.waitUntil(
      (async () => {
        try {
          await fetch(env.ENDPOINT, {
            method: "POST",
            body: JSON.stringify(events),
          });
        } catch (error) {
          // Log to console or send to fallback
          console.error("Failed to send events:", error);
        }
      })()
    );
  }
};
```

### Minimal, Surgical Changes
- Process only necessary events (filter early)
- Avoid unnecessary data transformations
- Keep handlers focused and simple

## Summary
Tail Workers provide real-time, custom event processing for Cloudflare Workers. Use them when you need fine-grained control over logging, error tracking, or analytics that goes beyond standard OTEL export. Always use `ctx.waitUntil()` for async work, be mindful of sensitive data redaction, and consider Analytics Engine for aggregated metrics.
