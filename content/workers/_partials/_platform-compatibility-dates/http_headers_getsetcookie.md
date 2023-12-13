---
_build:
  publishResources: false
  render: never
  list: never

name: "Header class getSetCookie() method"
sort_date: "2023-03-01"
enable_date: "2023-03-01"
experimental: false
enable_flag: "http_headers_getsetcookie"
disable_flag: "no_http_headers_getsetcookie"
---

The WHATWG introduced the new `getSetCookie()` method on the `Headers` class. Because the method is
new and changes the behavior of the `Headers` class key/value iterators there is a risk of breaking
existing code. To mitigate this risk, the new behavior will be opt-in via a compatibility flag
that became the default on March 1, 2023.

Without `http_headers_getsetcookie` flag, the iterator on the `Headers` object will improperly combine the values of `Set-Cookie` headers into a single item. With the flag enabled, the iterator appropriately keeps `Set-Cookie` headers separate while continuing to combine other headers.
