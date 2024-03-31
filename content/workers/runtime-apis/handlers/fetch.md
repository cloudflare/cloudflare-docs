---
pcx_content_type: configuration
title: Fetch Handler
---

# Fetch Handler

## Background

Incoming HTTP requests to a Worker are passed to the `fetch()` handler as a [`Request`](/workers/runtime-apis/request/) object. To respond to the request with a response, return a [`Response`](/workers/runtime-apis/response/) object:

```ts
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

### Parameters

{{<definitions>}}

- `request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - The incoming HTTP request.

- `env` {{<type>}}object{{</type>}}

  - The [bindings](/workers/configuration/environment-variables/) available to the Worker. As long as the [environment](/workers/wrangler/environments/) has not changed, the same object (equal by identity) is passed to all requests.

- {{<code>}}context.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`waitUntil`](/workers/runtime-apis/context/#waituntil).

- {{<code>}}context.passThroughOnException(){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`passThroughOnException`](/workers/runtime-apis/context/#passThroughOnException).

{{</definitions>}}
