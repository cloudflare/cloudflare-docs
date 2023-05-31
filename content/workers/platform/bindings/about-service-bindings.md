---
pcx_content_type: concept
title: About Service bindings
---

# About Service bindings

Service bindings are an API that facilitate Worker-to-Worker communication via explicit bindings defined in your configuration.

A Service binding allows you to send HTTP requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. You can invoke other Workers directly from your code. This makes it possible to communicate with shared services managed by other teams with differing test and release processes. Those services do not need to be hooked up to publicly accessible endpoints. Service bindings facilitate private services to communicate with one another.

Service bindings allow you to:

- Segment multiple use cases into separate Workers that can be explicitly invoked from your code.
- Achieve better composability on the Workers platform using service-oriented architecture.
- Create private microservices, to be conditionally invoked from other global network-facing services.

While the interface among Service bindings is HTTP, the networking is not. Unlike the typical microservice architecture, where services communicate over a network and can suffer from latency or interruption, Service bindings are a zero-cost abstraction. When one Worker invokes another, there is no network delay and the request is executed immediately.

For more information, refer to the [Runtime API documentation for Service bindings](/workers/runtime-apis/service-bindings).

![Service bindings are a zero-cost abstraction](/workers/platform/bindings/media/service-bindings-comparison.png)

## Set a Service binding

### Dashboard

To manage a Workers Service binding:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Worker.
4. Go to **Settings** > **Variables** > **Service bindings** > **Edit variables**.

### Wrangler

To configure a Service binding in your `wrangler.toml`, use the following syntax:

```toml
services = [
  { binding = "<BINDING_NAME>", service = "<WORKER_NAME>", environment = "<ENVIRONMENT_NAME>" }
]
```

The `wrangler.toml` options are:

- `binding`: Variable name for the binding in your Worker code, accessible under the `env` parameter in [Module syntax](/workers/learning/migrating-to-module-workers/), or in the global scope in [Service Worker syntax](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
- `service`: Name of the target Worker you would like to communicate with. This Worker should be on your account.

### `wrangler.toml` example

For the example outlined above, a `wrangler.toml` might look like this:

```toml
services = [
  { binding = "auth", service = "authentication" },
  { binding = "logout", service = "logout" }
]
```

In the example above, the Service bindings for the `authentication` and `logout` Workers are accessible in code via `env.auth` and `env.logout`, respectively (when using Module syntax), or globally at `auth` and `logout` (when using Service Worker syntax).

### Local development

Local development is supported for Service bindings. For each Worker, open a terminal and use [`wrangler dev`](/workers/wrangler/commands/#dev) in the relevant directory or use the `SCRIPT` option to specify the relevant Worker's entrypoint.

### Use Service bindings

Service bindings are available in your Worker code under the `<BINDING_NAME>` specified in `wrangler.toml`, via API, or the dashboard. For example, a Service binding that is named "auth" will be available under the binding name `auth` in your Worker. The API `fetch()` is implemented on each Service binding by default.

### Connected Workers

To review Workers bound to your Worker in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** and in **Overview**, select your **Worker**.
3. Go to **Triggers** > **Bound Services**. Your team can easily view cross-service dependencies in this manner.

![Your team can view cross-service dependencies in the Cloudflare dashboard Account Home > Workers & Pages > your Worker > Triggers](/workers/platform/bindings/media/service-bindings-triggers.png)

## Compose an example Worker

In the following example, you will create a `gateway` Worker that invokes an `auth` Worker to handle authorization checks.

### Gateway Worker and Service bindings usage

First, you will create both a `gateway` and `auth` Worker. Once they are set up, go to the `gateway` Worker. In order to bind and call the [authentication](#authentication-workers-service) Worker, the `gateway` Worker needs to set up a Service binding.

To manage Service bindings:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. Select your Worker > **Settings**.
4. In **Variables**, find **Service bindings** > **Edit variables**.

![Selecting Edit variables to create new bindings and edit existing bindings that enable Worker-to-Worker communication](/workers/platform/bindings/media/service-bindings.png)

Once added, the `gateway` Worker can access the Workers Service binding directly from the code, as in the example below. It utilizes the `fetch` API.

```js
export default {
  async fetch(request, env) {
    // Fetch AUTH service and pass request
    const authResponse = await env.auth.fetch(request.clone());

    // Return response from the AUTH service if the response status is not 200
    // It would return 403 'x-custom-token does not match, request not allowed' response in such case
    if (authResponse.status !== 200) {
      return authResponse;
    }

    // Request allowed
    // You can write application logic here
    // In this case we delegate the logic to an `application` Worker
    return await env.application.fetch(request);
  },
};
```

{{<Aside type="note">}}

Note that [Requests](/workers/runtime-apis/request/) can only be read once. If you need to use a Request object multiple times, clone your incoming Request objects.

{{</Aside>}}

In this setup, only the `gateway` Worker is exposed to the Internet and privately communicating with the `auth` and `application` Workers using Service bindings. In the next section, you will build the `auth` Worker.

### Authentication Workers Service

The following authentication Worker code responds with a status code `200` in the case that `x-custom-token` in the incoming request matches a `SECRET_TOKEN` secret binding. Note that you implement `fetch` here, since a Service binding will invoke `FetchEvent` on the target Worker.

```js
export default {
  async fetch(request, env) {
    // Read x-custom-token header and make sure it matches SECRET_TOKEN
    if (request.headers.get("x-custom-token") === env.SECRET_TOKEN) {
      return new Response("Request allowed", { status: 200 });
    } else {
      return new Response(
        "x-custom-token does not match, request not allowed",
        { status: 403 }
      );
    }
  },
};
```

This `auth` Worker does not need to have a `*.workers.dev` or other public endpoint. The `auth` Workers is accessed through a Service binding from the `gateway` Worker directly. The authentication Worker is, effectively, a private Worker Service.

## Related resources

- [Runtime API documentation](/workers/runtime-apis/service-bindings)
- [Services introduction blog post](https://blog.cloudflare.com/introducing-worker-services/)
