---
pcx_content_type: configuration
title: Headers
meta:
  description: Access HTTP request and response headers.
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

- In Cloudflare Workers, the `Headers.get` method returns a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) instead of a [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), which is specified by the spec. For most scenarios, this should have no noticeable effect. To compare the differences between these two string classes, refer to this [Playground example](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbMutvvsCMALAJx-cAzAHZeANkG8AHAAZOU7t2EBWAEy9eqsXNWdOALg5HjbHv34jxk2fMUr1m7Z12cAsACgAwuioQApr7YACJQAM4w6KFQ0D76JBhYeATEJFRwwH4MAERQNH4AHgB0AFahWaSoUGAB6Zk5eUWlWR7evgEQ2AAqdDB+cXAwMGBQAMYEUD7IxXAAbnChIwiwEADUwOi44H4eHgURSCS4fqhw4BAkAN7uAJDzdFQj8X4QIwAWABQIfgCOIH6hEAAlJcbtdqucxucGCQsoBeDcAXHtZUHgkggCCoKSeAgkaFUPwAdxInQKEAAog8Nn4EO9AYUAiNKe9IYDkc8SPTKbgsVCSABlCBLKgAc0KqAQ6GAnleiG8R3ehQVaIx3JZoIZVFC6GqhTA6CF7yynVeYRIJrgJAAqryAGr8wVCkj46KvEjmyH6LIAGhIzLVPk12t1+sNxtCprD5oAQnR-Hbcg6nRAXW7sT5LZ0AGLYKQe70co5cgiq67XZDIEgACT8cCOCAjXxIoRAg0iflwJAg6EdmAA1iQfGA6I7nSRo7GBfHQt6yGj+yAEKCy6bgEM-BlfOM0yBQv9LTa48LQoUiaHUiSSMM8cOwGASDBBec4Ivy-jEFR466KLOk2FCqzzq81a1mGuIEpWQFUqE7wXDC+ZttgkJZHEcGFucAC+xbXF8EDzlQZ6EgASv8EQan4BpSn4Ix9pQ5xJn4JAAAatAGfgMa6NAdoBJBEeE-r0YBNaQR2XY7vRdFzhAMCzgyK6IGE-qFF6lwkAJwEkBhNxoe4aEeCYelGGYAiWBI0hyAoShqBoWg6HoLQ+P4gQhLxUQxFQcQJDg+CEKQaQZNkGSEF5cDlPEVQ1H5WRkLqZDNF49ntF0PR9K6gzDJCExUFMmpUDs7gXFkwBwLkAD66ybNUSH1EcjRlDp7j6Q1rCGRYogmTY5n2FZTguMwHhAA).

## Cloudflare headers

Cloudflare sets a number of its own custom headers on incoming requests and outgoing responses. While some may be used for its own tracking and bookkeeping, many of these can be useful to your own applications – or Workers – too.

For a list of documented Cloudflare request headers, refer to [HTTP request headers](/fundamentals/reference/http-request-headers/).

## Related resources

* [Logging headers to console](/workers/examples/logging-headers/) - Review how to log headers in the console.
* [HTTP request headers](/fundamentals/reference/http-request-headers/) - A list of specific headers Cloudflare adds.
