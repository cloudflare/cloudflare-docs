---
_build:
  publishResources: false
  render: never
  list: never
---

Most Workers are a variation on the default Workers flow:

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    return new Response('Hello worker!', { status: 200 });
  },
};
```
{{</tab>}}
{{<tab label="js/sw">}}
```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response('Hello worker!', { status: 200 });
}
```
{{</tab>}}
{{</tabs>}}

For Workers written in [ES modules syntax](/workers/reference/migrate-to-module-workers/), when a request to your `*.workers.dev` subdomain or to your Cloudflare-managed domain is received by any of Cloudflare's data centers, the request invokes the `fetch()` handler defined in your Worker code with the given request. You can respond to the request by returning a [`Response`](/workers/runtime-apis/response/) object.

For Workers written in Service Worker syntax, when a request to your `*.workers.dev` subdomain or to your Cloudflare-managed domain is received by any of Cloudflare's data centers, the Worker is passed a [`FetchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) argument to the event handler defined in the Worker. From there, you can return a response by returning a `Response` object.