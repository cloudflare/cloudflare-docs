---
pcx_content_type: concept
title: Outbound Workers
---

# Outbound Workers

Outbound Workers sit between your customer’s Workers and the public Internet. They give you visibility into all outgoing `fetch()` requests from user Workers.

![Outbound Workers diagram information](/images/cloudflare-for-platforms/outbound-worker-diagram.png)

## General Use Cases

Outbound Workers can be used to:

- Log all subrequests to identify malicious domains or usage patterns.
- Create, allow, or block lists for hostnames requested by user Workers.
- Configure authentication to your APIs behind the scenes (without end developers needing to set credentials).

## Use Outbound Workers

To use Outbound Workers:

1. Create a Worker intended to serve as your Outbound Worker.
2. Outbound Worker can be specified as an optional parameter in the [dispatch namespaces](/cloudflare-for-platforms/workers-for-platforms/get-started/configuration/#2-create-a-dispatch-namespace) binding in a project's [wrangler.toml](/workers/wrangler/configuration/). Optionally, to pass data from your dynamic dispatch Worker to the Outbound Worker, the variable names can be specified under **parameters**.

Make sure that you have `wrangler@3.3.0` or later [installed](/workers/wrangler/install-and-update/).

```toml
---
filename: wrangler.toml
---
[[dispatch_namespaces]]
binding = "dispatcher"
namespace = "<NAMESPACE_NAME>"
outbound = {service = "<SERVICE_NAME>", parameters = ["params_object"]}
```
3. Edit your dynamic dispatch Worker to call the Outbound Worker and declare variables to pass on `dispatcher.get()`.
```js
---
filename: index.js
---
export default {
	async fetch(request, env) {
	  try {

    // parse the URL, read the subdomain
		let workerName = new URL(request.url).host.split('.')[0];

		let context_from_dispatcher = {
			'customer_name': workerName,
			'url': request.url,
		  }

		let userWorker = env.dispatcher.get(
		  workerName,
		  {},
		  {// outbound arguments. object name must match parameters in the binding
			outbound: {
			 params_object: context_from_dispatcher,
			   }
			 }
		);
		return await userWorker.fetch(request);
	  } catch (e) {
		if (e.message.startsWith('Worker not found')) {
		  // we tried to get a worker that doesn't exist in our dispatch namespace
		  return new Response('', { status: 404 });
		}
		 return new Response(e.message, { status: 500 });
	  }
	}
}
```
4. The Outbound Worker will now be invoked on any `fetch()` requests from a user Worker. The user Worker will trigger a [FetchEvent](/workers/runtime-apis/handlers/fetch/) on the Outbound Worker. The variables declared in the binding can be accessed in the Outbound Worker through `env.<VAR_NAME>`.

The following is an example of an Outbound Worker that logs the fetch request from user Worker and creates a JWT if the fetch request matches `api.example.com`.

```js
---
filename: index.js
---
export default {
  // this event is fired when the dispatched Workers make a subrequest
  async fetch(request, env, ctx) {
    // env contains the values we set in `dispatcher.get()`
    const customer_name = env.customer_name;
    const original_url = env.url;

    // log the request
    ctx.waitUntil(fetch(
      'https://logs.example.com',
      {
        method: 'POST',
        body: JSON.stringify({
          customer_name,
          original_url,
        }),
      },
    ));

    const url = new URL(original_url);
    if (url.host === 'api.example.com') {
      // pre-auth requests to our API
      const jwt = make_jwt_for_customer(customer_name);

      let headers = new Headers(request.headers);
      headers.set('Authorization', `Bearer ${jwt}`);

      // clone the request to set new headers using existing body
      let new_request = new Request(request, {headers});

      return fetch(new_request)
    }

    return fetch(request)
  }
};
```

{{<Aside type ="note">}}

Outbound Workers do not intercept fetch requests made from [Durable Objects](/durable-objects/) or [mTLS certificate bindings](/workers/runtime-apis/bindings/mtls/).

{{</Aside>}}
