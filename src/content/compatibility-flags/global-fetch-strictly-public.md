---
_build:
  publishResources: false
  render: never
  list: never

name: "Global fetch() strictly public"
sort_date: "2024-11-08"
enable_flag: "global_fetch_strictly_public"
disable_flag: "global_fetch_private_origin"
---

When the `global_fetch_strictly_public` compatibility flag is enabled, the global [`fetch()` function](/workers/runtime-apis/fetch/) will strictly route requests as if they were made on the public Internet.

This means requests to a Worker's own zone will loop back to the "front door" of Cloudflare and will be treated like a request from the Internet, possibly even looping back to the same Worker again.

When the `global_fetch_strictly_public` is not enabled, such requests are routed to the zone's origin server, ignoring any Workers mapped to the URL and also bypassing Cloudflare security settings.
