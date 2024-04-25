---
pcx_content_type: how-to
title: Create a dynamic dispatch Worker
weight: 3
layout: wide
---

# Create a dynamic dispatch Worker

After you have created a dispatch namespace, you can fetch any user Workers in the namespace using a dynamic dispatch Worker. The [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/get-started/dynamic-dispatch/) has a namespace binding.

Use any method of routing to a namespaced Worker (reading the subdomain, request header, or lookup in a database). Ultimately you need the name of the user Worker.

In the following example, routing to a user Worker is done through reading the subdomain `<USER_WORKER_NAME>.example.com/*`. For example, `my-customer.example.com` will run the script uploaded to `PUT accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/my-dispatch-namespace/scripts/my-customer`.

```js
---
filename: src/index.js
---
export default {
	async fetch(request, env) {
		try {
			// parse the URL, read the subdomain
			let workerName = new URL(request.url).host.split('.')[0];
			let userWorker = env.dispatcher.get(workerName);
			return await userWorker.fetch(request);
		} catch (e) {
			if (e.message.startsWith('Worker not found')) {
				// we tried to get a worker that doesn't exist in our dispatch namespace
				return new Response('', { status: 404 });
			}

			// this could be any other exception from `fetch()` *or* an exception
			// thrown by the called worker (e.g. if the dispatched worker has
			// `throw MyException()`, you could check for that here).
			return new Response(e.message, { status: 500 });
		}
	},
};
```
