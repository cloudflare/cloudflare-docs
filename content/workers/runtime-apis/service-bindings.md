---
pcx_content_type: configuration
title: Service bindings
---

# Service bindings

## About Service bindings

Service bindings are an API that facilitate Worker-to-Worker communication via explicit bindings defined in your configuration. A Service binding allows you to send HTTP requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. You can invoke other Workers directly from your code.

Learn more [about Service bindings](/workers/platform/bindings/about-service-bindings/).

To use Service bindings in your code, you must first create a Service binding from one Worker to another.

---

### Interface

```js
export default {
    async fetch(request, environment) {
        return await environment.BINDING.fetch(request)
    }
}
```

Service bindings use the standard [Fetch](/workers/runtime-apis/fetch/) API. A Service binding will trigger a [FetchEvent](../../runtime-apis/fetch-event) on the target Worker. To access a target Worker from a parent Worker, you must first configure the target Worker with a binding for that target Workers Service. The binding definition includes a variable name on which the `fetch()` method will be accessible. The `fetch()` method has the exact same signature as the [global `fetch`](/workers/runtime-apis/fetch/). However, instead of sending an HTTP request to the Internet, the request is always sent to the Worker to which the Service binding points.

### Shared resources

Workers connected to one another via Service bindings share the CPU resources of the top-level request. A single thread is allocated and reused amongst these Workers. This means no idle resources are wasted while work is performed across various Workers.

### Lifecycle

Lifecycle is tied to the top-level Worker. If a child Worker is still processing, and the parent Worker does not await the completion of a child Worker, the child Worker will be terminated and cleaned up. It is important to use `await` and `event.waitUntil` to manage the lifecycle of any child processes invoked via Service bindings.

### Context

Service bindings live on the environment context. This means Service bindings can be used from within a Durable Object, as long as the environment context remains intact.

### Limits

Service bindings have a few important limits:

* Each request to a Worker via Service bindings count toward your [subrequest limit](/workers/platform/limits/#subrequests).
* Nested calls to child Workers increase the depth of your Worker Pipeline. Maximum Pipeline depth is 32, including the first Worker. Subsequent calls will trigger an error.
* [Simultaneous open connection limits](/workers/platform/limits/#simultaneous-open-connections) are Pipeline-wide, meaning subrequests from multiple different Workers incur a global concurrent subrequest limit. However, a `fetch` call on a Service binding does not count as an open connection.

## Related resources
- [About Service bindings](/workers/platform/bindings/about-service-bindings/)