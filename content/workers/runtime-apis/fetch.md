---
pcx_content_type: configuration
title: Fetch
meta:
  description: An interface for asynchronously fetching resources via HTTP requests inside of a Worker.
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` must be executed within a [handler](/workers/runtime-apis/handlers/). If you try to call `fetch()` within [global scope](https://developer.mozilla.org/en-US/docs/Glossary/Global_scope), your Worker will throw an error. Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

Worker-to-Worker `fetch` requests are possible with [Service bindings](/workers/runtime-apis/bindings/service-bindings/).

{{</Aside>}}

## Syntax

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
---
highlight: [3-7]
---
export default {
  async scheduled(event, env, ctx) {
    return await fetch("https://example.com", {
      headers: {
        "X-Source": "Cloudflare-Workers",
      },
    });
  },
};
```
{{</tab>}}
{{<tab label="js/sw">}}
```js
---
highlight: [8]
---
addEventListener('fetch', event => {
  // NOTE: can’t use fetch here, as we’re not in an async scope yet
  event.respondWith(eventHandler(event));
});

async function eventHandler(event) {
  // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  const resp = await fetch(event.request);
  return resp;
}
```
{{</tab>}}
{{</tabs>}}

{{<definitions>}}

- {{<code>}}fetch(resource, options {{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type-link href="/runtime-apis/response">}}Promise`<Response>`{{</type-link>}}

  - Fetch returns a promise to a Response.

{{</definitions>}}

### Parameters

{{<definitions>}}

- [`resource`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#resource) {{<type-link href="/workers/runtime-apis/request/">}}Request{{</type-link>}} | {{<type>}}string{{</type>}} | {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/URL">}}URL{{</type>}}

- `options` {{<type-link href="/runtime-apis/request/#the-cf-property-requestinitcfproperties">}}options{{</type-link>}}
  - An object that defines the content and behavior of the request.

{{</definitions>}}

## Related resources

- [Example: use `fetch` to respond with another site](/workers/examples/respond-with-another-site/)
- [Example: Fetch HTML](/workers/examples/fetch-html/)
- [Example: Fetch JSON](/workers/examples/fetch-json/)
- [Example: cache using Fetch](/workers/examples/cache-using-fetch/)
- Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
