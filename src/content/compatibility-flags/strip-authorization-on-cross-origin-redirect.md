---
_build:
  publishResources: false
  render: never
  list: never

name: "Strip Authorization header on cross-origin redirects"
sort_date: "2025-09-01"
enable_date: "2025-09-01"
enable_flag: "strip_authorization_on_cross_origin_redirect"
disable_flag: "retain_authorization_on_cross_origin_redirect"
---

When `strip_authorization_on_cross_origin_redirect` is enabled, the `Authorization` header is automatically removed when following a redirect to a different origin. This behavior is required by the current [Fetch API specification](https://fetch.spec.whatwg.org/).

This requirement was added to the Fetch spec in 2022, after Cloudflare Workers originally implemented its fetch handling. Workers did not originally implement this requirement, so the new behavior is gated behind a compatibility flag.

The old behavior was not inherently insecure, and could be desirable in some circumstances. For example, if an API that requires authorization wishes to redirect to a new hostname while having the client send along their credentials. Under the new behavior, such a redirect will not include credentials automatically. However, the old behavior could lead to unintentional credential leakage when redirecting to untrusted origins.

To retain the old behavior, set the `retain_authorization_on_cross_origin_redirect` flag.
