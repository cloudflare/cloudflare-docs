---
_build:
publishResources: false
render: never
list: never

name: "Upper-case HTTP methods"
sort_date: "2024-10-14"
enable_date: "2024-10-14"
enable_flag: "upper_case_all_http_methods"
disable_flag: "no_upper_case_all_http_methods"
---

HTTP methods are expected to be upper-cased. Per the fetch spec, if the
method is specified as `get`, `post`, `put`, `delete`, `head`, or `options`,
implementations are expected to uppercase the method. All other method names
would generally be expected to throw as unrecognized (for example, `patch` would be
an error while `PATCH` is accepted). This is a bit restrictive, even if it is in the spec.
This flag modifies the behavior to uppercase all methods
prior to parsing so that the method is always recognized if it is a known
method.

To restore the standard behavior, use the `no_upper_case_all_http_methods`
compatibility flag.
