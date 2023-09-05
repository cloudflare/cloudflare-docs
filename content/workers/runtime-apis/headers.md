---
pcx_content_type: configuration
title: Headers
---

# Headers

## Background

All HTTP request and response headers are available through the [Headers API](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

When a header name possesses multiple values, those values will be concatenated as a single, comma-delimited string value. This means that `Headers.get` will always return a string or a `null` value. This applies to all header names except for `Set-Cookie`, which requires `Headers.getAll`. This is documented below in [Differences](#differences).

```js
let headers = new Headers();

headers.get('x-foo'); //=> null

headers.set('x-foo', '123');
headers.get('x-foo'); //=> "123"

headers.set('x-foo', 'hello');
headers.get('x-foo'); //=> "hello"

headers.append('x-foo', 'world');
headers.get('x-foo'); //=> "hello, world"
```

## Differences

- Despite the fact that the `Headers.getAll` method has been made obsolete, Cloudflare still offers this method but only for use with the `Set-Cookie` header. This is because cookies will often contain date strings, which include commas. This can make parsing multiple values in a `Set-Cookie` header more difficult. Any attempts to use `Headers.getAll` with other header names will throw an error. A brief history `Headers.getAll` is available in this [GitHub issue](https://github.com/whatwg/fetch/issues/973).

- Due to [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265) prohibiting folding multiple `Set-Cookie` headers into a single header, the `Headers.append` method will allow you to set multiple `Set-Cookie` response headers instead of appending the value onto the existing header.

```js
const headers = new Headers();

headers.append("Set-Cookie", "cookie1=value_for_cookie_1; Path=/; HttpOnly;");
headers.append("Set-Cookie", "cookie2=value_for_cookie_2; Path=/; HttpOnly;");

console.log(headers.getAll("Set-Cookie"));
// Array(2) [ cookie1=value_for_cookie_1; Path=/; HttpOnly;, cookie2=value_for_cookie_2; Path=/; HttpOnly; ]
```

- In Cloudflare Workers, the `Headers.get` method returns a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) instead of a [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), which is specified by the spec. For most scenarios, this should have no noticeable effect. To compare the differences between these two string classes, refer to this [Playground example](https://cloudflareworkers.com/#97c644202d0ef43fd73acb6b045529e8:https://tutorial.cloudflareworkers.com).

## Cloudflare headers

Cloudflare sets a number of its own custom headers on incoming requests and outgoing responses. While some may be used for its own tracking and bookkeeping, many of these can be useful to your own applications – or Workers – too.

For a list of documented Cloudflare request headers, refer to [HTTP request headers](/fundamentals/get-started/reference/http-request-headers/).

## Related resources

* [Logging headers to console](/workers/examples/logging-headers/) - Review how to log headers in the console.
