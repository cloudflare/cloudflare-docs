---
order: 6
title: "🕸 Web Standards"
---

- [Web Standards Reference](/workers/runtime-apis/web-standards)
- [Encoding Reference](/workers/runtime-apis/encoding)
- [Fetch Reference](/workers/runtime-apis/fetch)
- [Request Reference](/workers/runtime-apis/request)
- [Response Reference](/workers/runtime-apis/response)
- [Streams Reference](/workers/runtime-apis/streams)
- [Web Crypto Reference](/workers/runtime-apis/web-crypto)

## Mocking Outbound `fetch` Requests

When using the API, Miniflare allows you to substitute custom `Response`s for
`fetch()` calls using `undici`'s
[`MockAgent` API](https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin).
This is useful for testing Workers that make HTTP requests to other services. To
enable `fetch` mocking, create a
[`MockAgent`](https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin)
using the `createFetchMock()` function, then set this using the `fetchMock`
option.

```js
import { Miniflare, createFetchMock } from "miniflare";

// Create `MockAgent` and connect it to the `Miniflare` instance
const fetchMock = createFetchMock();
const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async fetch(request, env, ctx) {
      const res = await fetch("https://example.com/thing");
      const text = await res.text();
      return new Response(\`response:\${text}\`);
    }
  }
  `,
	fetchMock,
});

// Throw when no matching mocked request is found
// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentdisablenetconnect)
fetchMock.disableNetConnect();

// Mock request to https://example.com/thing
// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin)
const origin = fetchMock.get("https://example.com");
// (see https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions)
origin
	.intercept({ method: "GET", path: "/thing" })
	.reply(200, "Mocked response!");

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // "response:Mocked response!"
```

## Subrequests

Miniflare does not support limiting the amount of
[subrequests](/workers/platform/limits#account-plan-limits).
Please keep this in mind if you make a large amount of subrequests from your
Worker.
