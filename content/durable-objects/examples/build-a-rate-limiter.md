---
type: example
summary: Build a rate limiter using Durable Objects and Workers.
tags:
  - Durable Objects
pcx_content_type: configuration
title: Build a rate limiter 
weight: 2
layout: example
---

This example shows how to build a rate limiter using Durable Objects and Workers that can be used to protect upstream resources, including third-party APIs that your application relies on and/or services that may be costly for you to invoke.

This example also discusses some decisions that need to be made when designing a system, such as a rate limiter, with Durable Objects.

The Worker creates a `RateLimiter` Durable Object on a per IP basis to protect upstream resources. IP based rate limiting can be effective without negatively impacting latency because any given IP will remain within a small geographic area colocated with the `RateLimiter` Durable Object instance. Furthermore, throughput is also improved because each IP gets its own Durable Object.

It might seem simpler to implement a global rate limiter, `const id = env.RATE_LIMITER.idFromName("global");`, which can provide better guarantees on the request rate to the upstream resource. However:

* This would require all requests globally to make a sub-request to a single Durable Object.
* Implementing a global rate limiter would add additional latency for requests not colocated with the Durable Object, and global throughput would be capped to the throughput of a single Durable Object.
* A single Durable Object that all requests rely on is typically considered an anti-pattern. Durable Objects work best when they are scoped to a user, room, service and/or the specific subset of your application that requires global co-ordination.

{{<Aside type="note">}}

If you do not need unique or custom rate-limiting capabilities, refer to [Rate limiting rules](/waf/rate-limiting-rules/) that are part of Cloudflare's Web Application Firewall (WAF) product. 

{{</Aside>}}

The Durable Object uses a token bucket algorithm to implement rate limiting. The naive idea is that each request requires a token to complete, and the tokens are replenished according to the reciprocal of the desired number of requests per second. As an example, a 1000 requests per second rate limit will have a token replenished every millisecond (as specified by milliseconds_per_request) up to a given capacity limit.

This example uses Durable Object's [Alarms API](/durable-objects/api/alarms) to schedule the Durable Object to be woken up at a time in the future. 

* When the alarm's scheduled time comes, the `alarm()` handler method is called, and in this case, the alarm will add a token to the "Bucket".
* The implementation is made more efficient by adding tokens in bulk (as specified by milliseconds_for_updates) and preventing the alarm handler from being invoked every millisecond. More frequent invocations of Durable Objects will lead to higher invocation and duration charges.

The first implementation of a rate limiter is below:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
import { DurableObject } from "cloudflare:workers";

// Worker
export default {
  async fetch(request, env, _ctx) {
    // Determine the IP address of the client
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip === null) {
      return new Response("Could not determine client IP", { status: 400 });
    }

    // Obtain an identifier for a Durable Object based on the client's IP address
    const id = env.RATE_LIMITER.idFromName(ip);

    try {
      const stub = env.RATE_LIMITER.get(id);
      const milliseconds_to_next_request = await stub.getMillisecondsToNextRequest();
      if (milliseconds_to_next_request > 0) {
        // Alternatively one could sleep for the necessary length of time
        return new Response("Rate limit exceeded", { status: 429 });
      }
    } catch (error) {
      return new Response("Could not connect to rate limiter", { status: 502 });
    }

    // TODO: Implement me
    return new Response("Call some upstream resource...")
  }
};

// Durable Object
export class RateLimiter extends DurableObject {
  static milliseconds_per_request = 1;
  static milliseconds_for_updates = 5000;
  static capacity = 10000;

  constructor(ctx, env) {
    super(ctx, env);
    this.tokens = RateLimiter.capacity;
  }

  async getMillisecondsToNextRequest() {
    this.checkAndSetAlarm()

    let milliseconds_to_next_request = RateLimiter.milliseconds_per_request;
    if (this.tokens > 0) {
      this.tokens -= 1;
      milliseconds_to_next_request = 0;
    }

    return milliseconds_to_next_request;
  }

  async checkAndSetAlarm() {
    let currentAlarm = await this.ctx.storage.getAlarm();
    if (currentAlarm == null) {
      this.ctx.storage.setAlarm(Date.now() + 
        RateLimiter.milliseconds_for_updates * RateLimiter.milliseconds_per_request);
    }
  }

  async alarm() {
    if (this.tokens < RateLimiter.capacity) {
      this.tokens = Math.min(RateLimiter.capacity,
        this.tokens + RateLimiter.milliseconds_for_updates);
      this.checkAndSetAlarm()
    }
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: index.ts
---
import { DurableObject } from "cloudflare:workers";

export interface Env {
  RATE_LIMITER: DurableObjectNamespace<RateLimiter>;
}

// Worker
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    // Determine the IP address of the client
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip === null) {
      return new Response("Could not determine client IP", { status: 400 });
    }

    // Obtain an identifier for a Durable Object based on the client's IP address
    const id = env.RATE_LIMITER.idFromName(ip);

    try {
      const stub = env.RATE_LIMITER.get(id);
      const milliseconds_to_next_request = await stub.getMillisecondsToNextRequest();
      if (milliseconds_to_next_request > 0) {
        // Alternatively one could sleep for the necessary length of time
        return new Response("Rate limit exceeded", { status: 429 });
      }
    } catch (error) {
      return new Response("Could not connect to rate limiter", { status: 502 });
    }

    // TODO: Implement me
    return new Response("Call some upstream resource...")
  }
};

// Durable Object
export class RateLimiter extends DurableObject {
  static readonly milliseconds_per_request = 1;
  static readonly milliseconds_for_updates = 5000;
  static readonly capacity = 10000;

  tokens: number;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.tokens = RateLimiter.capacity;
  }

  async getMillisecondsToNextRequest(): Promise<number> {
    this.checkAndSetAlarm()

    let milliseconds_to_next_request = RateLimiter.milliseconds_per_request;
    if (this.tokens > 0) {
      this.tokens -= 1;
      milliseconds_to_next_request = 0;
    }

    return milliseconds_to_next_request;
  }

  private async checkAndSetAlarm() {
    let currentAlarm = await this.ctx.storage.getAlarm();
    if (currentAlarm == null) {
      this.ctx.storage.setAlarm(Date.now() + 
        RateLimiter.milliseconds_for_updates * RateLimiter.milliseconds_per_request);
    }
  }

  async alarm() {
    if (this.tokens < RateLimiter.capacity) {
      this.tokens = Math.min(RateLimiter.capacity,
        this.tokens + RateLimiter.milliseconds_for_updates);
      this.checkAndSetAlarm()
    }
  }
}
```

{{</tab>}}
{{</tabs>}}

While the token bucket algorithm is popular for implementing rate limiting and uses Durable Object features, there is a simpler approach:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---

// Durable Object
export class RateLimiter extends DurableObject {
  static milliseconds_per_request = 1;
  static milliseconds_for_grace_period = 5000;

  constructor(ctx, env) {
    super(ctx, env);
    this.nextAllowedTime = 0;
  }

  async getMillisecondsToNextRequest() {
    const now = Date.now();

    this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
    this.nextAllowedTime += RateLimiter.milliseconds_per_request;

    const value = Math.max(0,
      this.nextAllowedTime - now - RateLimiter.milliseconds_for_grace_period);
    return value;
  }
}

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: index.ts
---

// Durable Object
export class RateLimiter extends DurableObject {
  static milliseconds_per_request = 1;
  static milliseconds_for_grace_period = 5000;

  nextAllowedTime: number;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.nextAllowedTime = 0;
  }

  async getMillisecondsToNextRequest(): Promise<number> {
    const now = Date.now();

    this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
    this.nextAllowedTime += RateLimiter.milliseconds_per_request;

    const value = Math.max(0,
      this.nextAllowedTime - now - RateLimiter.milliseconds_for_grace_period);
    return value;
  }
}

{{</tab>}}
{{</tabs>}}

Finally, configure your `wrangler.toml` file to include a Durable Object [binding](/durable-objects/get-started/#5-configure-durable-object-bindings) and [migration](/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```toml
---
filename: wrangler.toml
---
name = "my-counter"

[[durable_objects.bindings]]
name = "RATE_LIMITER"
class_name = "RateLimiter"

[[migrations]]
tag = "v1"
new_classes = ["RateLimiter"]
```

### Related resources

- Learn more about Durable Object's [Alarms API](/durable-objects/api/alarms) and how to configure alarms.
- [Understand how to troubleshoot](/durable-objects/observability/troubleshooting/) common errors related with Durable Objects.
- Review how [Durable Objects are priced](/durable-objects/platform/pricing/), including pricing examples.