---
pcx_content_type: configuration
title: Fetch
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

The `fetch` method is implemented on the `ServiceWorkerGlobalScope`. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for more information.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` are not executed at the top level in a Worker and must be executed within a `fetch()` handler. Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

Worker-to-Worker `fetch` requests are possible with [Service bindings](/workers/configuration/bindings/about-service-bindings/).

{{</Aside>}}

---

## Syntax

```javascript
---
header: ES Modules
highlight: [3,4,5,6,7]
---
export default {
  async fetch(request) {
    return await fetch("https://example.com", {
      headers: {
        "X-Source": "Cloudflare-Workers",
      },
    });
  }
}
```

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
