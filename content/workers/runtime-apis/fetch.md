---
pcx_content_type: configuration
title: Fetch
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

The `fetch` method is implemented on the `ServiceWorkerGlobalScope`. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for more information.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a `FetchEvent` handler such as [`respondWith`](/workers/runtime-apis/fetch-event/#respondwith). Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

Worker-to-Worker `fetch` requests are now possible with [Service bindings](/workers/configuration/bindings/about-service-bindings/).

{{</Aside>}}

---

## Constructor

<!-- This code example needs more work -->

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

<!-- Where do we have the return type in this format? -->

{{<definitions>}}

- {{<code>}}fetch(request, init {{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type-link href="/runtime-apis/response">}}Promise`<Response>`{{</type-link>}}

  - Fetch returns a promise to a Response.

{{</definitions>}}

### Parameters

{{<definitions>}}

- `request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}} | {{<type>}}string{{</type>}}

  - The [`Request`](/workers/runtime-apis/request/) object or a string represents the URL to fetch.

- `init` {{<type-link href="/runtime-apis/request#requestinit">}}RequestInit{{</type-link>}}
  - The content of the request.

{{</definitions>}}

---

## Related resources

- [Example: use `fetch` to respond with another site](/workers/examples/respond-with-another-site/)
- [Example: Fetch HTML](/workers/examples/fetch-html/)
- [Example: Fetch JSON](/workers/examples/fetch-json/)
- [Example: cache using Fetch](/workers/examples/cache-using-fetch/)
