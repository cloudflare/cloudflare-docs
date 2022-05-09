---
pcx-content-type: concept
title: Service bindings
---

# Service bindings

## About Service bindings

Service bindings are an API that facilitate Worker-to-Worker communication via explicit bindings defined in your configuration.

A Service binding allows you to send HTTP requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. You can invoke other Workers directly from your code. This makes it possible to communicate with shared services managed by other teams with differing test and release processes. Those services do not need to be hooked up to publicly accessible endpoints. Service bindings facilitate private services to communicate with one another.

Service bindings allow you to:

* Segment multiple use cases into separate Workers Services that can be explicitly invoked from your code.
* Achieve better composability on the Workers platform using service-oriented architecture.
* Create private microservices, to be conditionally invoked from other edge-facing services.


### Interface

Service bindings use the standard [Fetch](../../runtime-apis/fetch) API. You can continue to use your existing utilities and libraries - a Workers Service binding will trigger a [FetchEvent](../../runtime-apis/fetch-event). While the interface among Service bindings is HTTP, the networking is not. Unlike the typical microservice architecture, where services communicate over a network and can suffer from latency or interruption, Service bindings are a zero-cost abstraction. When one Worker invokes another, there is no network delay and the request is executed immediately.

![Service bindings are a zero-cost abstraction](../media/service-bindings-comparison.png)

### Shared Resources
Workers connected to one another via Service bindings share the CPU resources of the top-level request. A single thread is allocated and reused amongst these Workers. This means no idle resources are wasted while work is performed across various Workers.

### Setting a Service binding
You can manage Workers Service bindings in [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables** > **Service bindings** > **Edit variables**. You can also change the environment of a Workers Service binding, so you can target a specific version of a Workers Service.

![To configure a Service binding, head to your Worker's Settings tab](../media/service-bindings-config.png)

Workers bound to your Worker will be listed in the [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Triggers** tab, under **Bound Services**. Your team can easily view cross-service dependencies in this manner.

![Your team can view cross-service dependencies in the Triggers tab](../media/service-bindings-triggers.png)

## Composing an example Worker

### Authentication Workers Service

Following authentication Workers Service code responds with `200` in case `x-custom-token` request matches `SECRET_TOKEN` secret binding.

```js
export default {
  async fetch(request, env) {
    // Read x-custom-token header and make sure it matches SECRET_TOKEN
    if (request.headers.get('x-custom-token') === env.SECRET_TOKEN) {
      return new Response('Request allowed', { status: 200 });
    } else {
      return new Response('x-custom-token does not match, request not allowed', { status: 403 });
    }
  },
};
```

This authentication Workers Service does not need to have a `*.workers.dev` or other domain endpoint, nor does it need an HTTP Route: it is accessed through a Workers Service binding from the other Worker directly. The authentication Worker is, effectively, a private Worker Service.

### Gateway Worker and Service bindings usage

In order to bind and call the [authentication Workers Service above](#authentication-workers-service), the application Workers Service needs to set up a Workers Service binding. You can manage Workers Service bindings in [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables** > **Service bindings** > **Edit variables**.

![Selecting Edit bindings to create new bindings and edit existing bindings that enable Worker-to-Worker communication](../media/service-bindings.png)

Once added, the application Workers Service can access the Workers Service binding directly from the code, as in the example below.

{{<Aside type="note">}}

Note that [Requests](../../runtime-apis/request) can only be read once. If you need to use a Request object multiple times, clone your incoming Request objects.

{{</Aside>}}

```js
export default {
  async fetch(request, env) {
    // Fetch AUTH service and pass request
    const response = await env.AUTH.fetch(request);

    // Return response from the AUTH service if the response status is not 200
    // It would return 403 'x-custom-token does not match, request not allowed' response in such case
    if (response.status !== 200) {
      return response;
    }

    // Request allowed
    const data = ''; // For example, read data from KV, Durable Objects, or Database
    return new Response(data);
  },
};
```

In this setup, only the Gateway Worker is exposed to the Internet and privately communicating with the authentication Workers Service using a Service binding.

## Related resources

- [Services introduction blog post](https://blog.cloudflare.com/introducing-worker-services/)
