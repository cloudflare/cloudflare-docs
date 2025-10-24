---
_build:
  publishResources: false
  render: never
  list: never

name: "Use a spec compliant URL implementation in redirects"
sort_date: "2023-03-14"
enable_date: "2023-03-14"
enable_flag: "response_redirect_url_standard"
disable_flag: "response_redirect_url_original"
---

Change the URL implementation used in `Response.redirect()` to be spec-compliant (WHATWG URL Standard).
