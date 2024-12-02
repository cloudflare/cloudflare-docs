---
_build:
  publishResources: false
  render: never
  list: never

name: "`Headers` supports `getSetCookie()`"
sort_date: "2023-03-01"
enable_date: "2023-03-01"
enable_flag: "http_headers_getsetcookie"
disable_flag: "no_http_headers_getsetcookie"
---

Adds the [`getSetCookie()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie) method to the [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) API in Workers.

```js
const response = await fetch("https://example.com");
let cookieValues = response.headers.getSetCookie();
```
