---
order: 16
pcx-content-type: concept
---

# Workers Services

Services are the new building block for deploying applications on Cloudflare Workers. Services are made of environments, which are scripts that can contain bindings to KV stores, Durable Objects or even other services, as well as environment variables and secrets. Services can have multiple environments and can set up pipelines for promoting a service from one environment to another.

Unlike a script, a service is composable, which allows services to talk to each other; allowing you to develop new kinds of services like routers, middlewares, or traffic gateways. Services also support multiple environments, allowing you to test changes in a preview environment, then promote to production when you’re confident.

<Aside type="note">

To enable a seamless transition to services, all scripts have been automatically migrated to services with one “production” environment — no action needed.

</Aside>

Each service comes with a production environment and the ability to create or clone dozens of preview environments. Every aspect of an environment is overridable: the code, environment variables, and even resource bindings like a KV Namespace or Durable Object. You can create and switch between environments with just a few clicks in the dashboard.

## Service environments

<Aside type="note">

Currently, the dashboard is the only way to interact with service environments. Support in Wrangler is coming in [v2.1](https://github.com/cloudflare/wrangler2/issues/27)

</Aside>

Wrangler supports an older version of environments. With Wrangler environments, you create custom contexts for your code to run in by adding keys to your `wrangler.toml` file. Wrangler will then generate a separate script for each environment. If you make a “staging” and “prod” environment for example, Wrangler will generate `my-worker-staging` and `my-worker-prod`. 

Service environments take a cleaner approach. You can create and edit environments directly in the Dashboard. Unlike Wrangler environments, Service environments don’t create extra scripts. They are, however, able to connect to their own KV stores and Durable Objects. The code for any environment can be changed directly in the Dashboard via the quick editor. A common workflow is to create an environment for a test feature, edit the code via the quick editor until you are satisfied with it and then promote it to production when the code is ready.

Each environment is resolvable at a unique hostname, which is automatically generated when you create or rename the environment. There’s no waiting around after you deploy. Everything you need, like DNS records, SSL certificates, and more, is ready-to-go seconds later. If you’d like a more advanced setup, you can also add custom routes from your domain to an environment.

## Environment versions

Each environment in a service has its own version history. Every time there is a code change or an environment variable is updated, the version number of that environment is incremented. You can also append additional metadata to each version, like a git commit or a deployment tag.

## Workers Service Bindings

Services are composable, allowing one service to talk to another. To support this, we’re introducing a new API to facilitate worker-to-worker communication: service bindings.

<Aside type="warning">

Service bindings are in closed beta currently. Visit [Service Bindings closed beta sign up](https://www.cloudflare.com/en-gb/service-bindings-closed-beta-sign-up/) page to request access.

</Aside>

![service bindings settings](./media/service-bindings.png)

A service binding allows you to send HTTP requests to another Worker, without those requests necessarily going over the Internet. That means you can invoke other Workers directly from your code! Service bindings open up a new world of composability. In the example below, requests are validated by an authentication service.


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
    const data = "" // For example, read data from KV, Durable Objects, or Database
    return new Response(data);
  }
}
```

![service binding diagram](./media/app-workers-dev.png)

Service bindings use the standard fetch API, so you can continue to use your existing utilities and libraries - a service binding will trigger a FetchEvent. You can also change the environment of a service binding, so you can test a new version of a service. In the next example, 1% of requests are routed to a “canary” deployment of a Worker. If a request to the canary fails, it’s sent to the production deployment for another chance.

```js
export default {
  canRetry(request) {
    return request.method === "GET" || request.method === "HEAD";
  },
  async fetch(request, environment) {
    if (Math.random() < 0.01) {
      const response = await environment.CANARY.fetch(request.clone());
      if (response.status < 500 || !canRetry(request)) {
        return response;
      }
    }
    return environment.PRODUCTION.fetch(request);
  }
}
```

While the interface among services is HTTP, the networking is not. In fact, there is no networking to think about! Unlike the typical “microservice architecture,” where services communicate over a network and can suffer from latency or interruption, service bindings are a zero-cost abstraction. When one Worker invokes another, there is no network delay; the request is executed immediately.

![service bindings comparison](./media/service-bindings-comparison.png)

This zero-cost model enables teams to share and reuse code within their organizations, without sacrificing latency or performance. Forget the days of convoluted YAML templates or exponential back off to orchestrate services — just write code, and we’ll stitch it all together.

Overall, Service Bindings will allow you to:
- Segment multiple use-cases into separate services that can be explicitly invoked from your code
- Achieve better composability on the Workers platform using service oriented architecture
- Create private microservices, to be conditionally invoked from other edge facing services

Workers services are composable, allowing one service to talk to each other. Complex applications can be composed from many smaller Workers, allowing organisations to separate concerns across individual teams. 

--------------------------------

## Composing an example Worker

### Auth service

Following auth service code responds with 200 in case `x-custom-token` request matches `SECRET_TOKEN` secret binding.

```js
export default {
  async fetch(request, env) {
    // Read x-custom-token header and make sure it matches SECRET_TOKEN
    if (request.headers.get("x-custom-token") === env.SECRET_TOKEN) {
      return new Response("Request allowed", { status: 200 });
    } else {
      return new Response("x-custom-token does not match, request not allowed", { status: 403 })
    }
  }
}
```

This auth service does not need to have workers.dev or custom domain public endpoint, it will accessed through a service binding from the other service script directly.

### Gateway Worker and service bindings usage


In order to bind and call auth service above, the app service needs to setup a service binding. You can manage service bindings in `Settings -> Variables` under the Workers Service settings.

![Workers service bindings](./media/service-bindings.png)

Once added, app service can access the service binding directly from the code, as in example below.


<Aside type="note">

Note that [requests](/runtime-apis/request) can only be read once; if you need to use a request object multiple times, be sure to clone your incoming request objects.

</Aside>


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
    const data = "" // For example, read data from KV, Durable Objects, or Database
    return new Response(data);
  }
}
```

In this setup, only the Gateway Worker is exposed to the internet, and _(privately)_ communicating with the Auth Worker using a Workers service binding.


## Related resources

- [Services introduction blog post](https://blog.cloudflare.com/introducing-worker-services/)
