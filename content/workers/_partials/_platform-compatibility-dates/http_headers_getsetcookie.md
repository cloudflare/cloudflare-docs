---
_build:
  publishResources: false
  render: never
  list: never

name: "Get set cookie"
sort_date: "2023-03-01"
enable_date: "2023-03-01"
enable_flag: "http_headers_getsetcookie"
disable_flag: "http_headers_getsetcookie"
---

Adds the standard [`getSetCookie()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie) method to the [headers API](https://developer.mozilla.org/en-US/docs/Web/API/Headers) in Workers.

```js
const response = await fetch("https://example.com");
response.headers.getSetCookie();
```
