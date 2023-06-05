---
_build:
  publishResources: false
  render: never
  list: never

name: "URLSearchParams delete() and has() value argument"
sort_date: "2023-07-01"
enable_date: "2023-07-01"
experimental: false
enable_flag: "urlsearchparams_delete_has_value_arg"
disable_flag: "no_urlsearchparams_delete_has_value_arg"
---

The WHATWG introduced additional optional arguments to the `URLSearchParams` object `delete()` and
`has()` methods that allow for more precise control over the removal of query parameters. Because
the arguments are optional and change the behavior of the methods when present there is a risk of
breaking existing code. To mitigate this risk, the new behavior will be opt-in via a compatibility
flag that becomes the default on July 1, 2023.
