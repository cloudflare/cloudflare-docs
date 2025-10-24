---
_build:
  publishResources: false
  render: never
  list: never

name: "Global `navigator`"
sort_date: "2022-03-21"
enable_date: "2022-03-21"
enable_flag: "global_navigator"
disable_flag: "no_global_navigator"
---

With the `global_navigator` flag set, a new global `navigator` property is available from within Workers. Currently, it exposes only a single `navigator.userAgent` property whose value is set to `'Cloudflare-Workers'`. This property can be used to reliably determine whether code is running within the Workers environment.
