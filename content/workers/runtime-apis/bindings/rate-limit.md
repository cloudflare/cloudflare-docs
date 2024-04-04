---
pcx_content_type: configuration
title: Rate Limiting
meta:
  description: Define rate limits and interact with them directly from your Cloudflare Worker
---

{{<heading-pill style="beta">}}Rate Limiting{{</heading-pill>}}

The Rate Limiting API lets you define rate limits and write code around them in your Worker.

You can use it to enforce:

- Rate limits that are applied after your Worker starts, only once a specific part of your code is reached
- Different rate limits for different types of customers or users (ex: free vs. paid)
- Resource-specific or path-specific limits (ex: limit per API route)
- Any combination of the above

The Rate Limiting API is backed by the same infrastructure that serves the [Rate limiting rules](/waf/rate-limiting-rules/) that are built into the [Cloudflare Web Application Firewall (WAF)](/waf/).

{{<Aside type="warning" header="The Rate Limiting API is in open beta">}}

- You must use version 3.45.0 or later of the [Wrangler CLI](/workers/wrangler)

We want your feedback. Tell us what you'd like to see in the #rate-limiting-beta channel of the [Cloudflare Developers Discord](https://discord.cloudflare.com/)
{{</Aside>}}

## Get started

First, add a [binding](/workers/runtime-apis/bindings) to your Worker that gives it access to the Rate Limiting API:

```toml
main = "src/index.js"

# The rate limiting API is in open beta
[[unsafe.bindings]]
name = "MY_RATE_LIMITER"
type = "ratelimit"
namespace_id = "1001" # An identifier you define, that is unique to your Cloudflare account
simple = {
  limit = 100, # The number of tokens allowed within a given period, in a single Cloudflare location
  period = 60 # The duration of the period, in seconds. Must be either 60 or 10
}
```

This binding makes the `MY_RATE_LIMITER` binding available, which provides a `limit()` method:

```javascript
---
filename: src/index.js
---
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    const { success } = await env.MY_RATE_LIMITER.limit({ key: pathname }) // key can be any string of your choosing
    if (!success) {
      return new Response(`429 Failure – rate limit exceeded for ${pathname}`, { status: 429 })
    }

    return new Response(`Success!`)
  }
}
```

The `limit()` API accepts a single argument — a configuration object with the `key` field. The key you provide can be any string value. A common pattern is to define your key by combining a string that uniquely identifies the actor initiating the request (ex: a user ID or customer ID) and a string that identifies a specific resource (ex: a particular API route).

## Locality

Rate limits that you define and enforce in your Worker are local to the [Cloudflare location](https://www.cloudflare.com/network/) that your Worker runs in.

For example, if a request comes in from Sydney, Australia, to the Worker shown above, after 100 requests in a 60 second window, and further requests for a particular path would be rejected, and a 429 HTTP status code returned. But this would only apply to requests served in Sydney. For each unique key you pass to your rate limiting binding, there is a unique limit per Cloudflare location.

## Performance

The Rate Limiting API in Workers is designed to be fast.

The underlying counters are cached on the same machine that your Worker runs in, and updated asynchronously in the background by communicating with a backing store that is within the same Cloudflare location.

This means that while in your code you `await` a call to the `limit()` method:

```javascript
const { success } = await env.MY_RATE_LIMITER.limit({ key: customerId })
```

You are not waiting on a network request. You can use the Rate Limiting API without introducing any meaningful latency to your Worker.

## Accuracy

The above also means that the Rate Limiting API is permissive, eventually consistent, and intentionally designed to not be used as an accurate accounting system.

For example, if many requests come in to your Worker in a single Cloudflare location, all rate limited on the same key, the [isolate](/workers/reference/how-workers-works) that serves each request will check against its locally cached value of the rate limit. Very quickly, but not immediately, these requests will count towards the rate limit within that Cloudflare location.