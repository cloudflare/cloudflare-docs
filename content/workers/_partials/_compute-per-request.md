---
_build:
  publishResources: false
  render: never
  list: never
---

Most Workers are a variation on the default Workers flow:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```
{{</tab>}}
{{<tab label="ts">}}
```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
```
{{</tab>}}
{{</tabs>}}

For Workers written in [ES modules syntax](/workers/reference/migrate-to-module-workers/), when a request to your `*.workers.dev` subdomain or to your Cloudflare-managed domain is received by any of Cloudflare's data centers, the request invokes the [`fetch()` handler](/workers/runtime-apis/handlers/fetch/) defined in your Worker code with the given request. You can respond to the request by returning a [`Response`](/workers/runtime-apis/response/) object.
