---
_build:
  publishResources: false
  render: never
  list: never

name: "New URL parser implementation"
sort_date: "2022-10-31"
enable_date: "2022-10-31"
enable_flag: "url_standard"
disable_flag: "url_original"
---

The original implementation of the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) API in Workers was not fully compliant with the [WHATWG URL Standard](https://url.spec.whatwg.org/), differing in several ways, including:

* The original implementation collapsed sequences of multiple slashes into a single slash:

  `new URL("https://example.com/a//b").toString() === "https://example.com/a/b"`

* The original implementation would throw `"TypeError: Invalid URL string."` if it encountered invalid percent-encoded escape sequences, like `https://example.com/a%%b`.

* The original implementation would percent-encode or percent-decode certain content differently:

  `new URL("https://example.com/a%40b?c d%20e?f").toString() === "https://example.com/a@b?c+d+e%3Ff"`

* The original implementation lacked more recently implemented `URL` features, like [`URL.canParse()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static).

Set the compatibility date of your Worker to a date after `2022-10-31` or enable the `url_standard` compatibility flag to opt-in the fully spec compliant `URL` API implementation.

Refer to the [`response_redirect_url_standard` compatibility flag](/workers/configuration/compatibility-flags/#use-a-spec-compliant-url-implementation-in-redirects) , which affects the URL implementation used in `Response.redirect()`.
