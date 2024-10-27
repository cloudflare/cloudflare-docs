---
_build:
  publishResources: false
  render: never
  list: never

name: "Bot Management data"
sort_date: "2023-08-01"
enable_date: "2023-08-01"
experimental: false
enable_flag: "no_cf_botmanagement_default"
disable_flag: "cf_botmanagement_default"
---

This flag streamlines Workers requests by reducing unnecessary properties in the `request.cf` object.

With the flag enabled - either by default after 2023-08-01 or by setting the `no_cf_botmanagement_default` flag - Cloudflare will only include the [Bot Management object](/bots/reference/bot-management-variables/) in a Worker's `request.cf` if the account has access to Bot Management.

With the flag disabled, Cloudflare will include a default Bot Management object, regardless of whether the account is entitled to Bot Management.
