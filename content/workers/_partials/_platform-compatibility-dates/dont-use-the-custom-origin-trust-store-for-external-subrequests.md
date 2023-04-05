---
_build:
  publishResources: false
  render: never
  list: never

name: "Do not use the Custom Origin Trust Store for external subrequests"
sort_date: "2022-03-08"
enable_date: "2022-03-08"
enable_flag: "no_cots_on_external_fetch"
disable_flag: "cots_on_external_fetch"
---

The `no_cots_on_external_fetch` flag disables the use of the [Custom Origin Trust Store](/ssl/origin-configuration/custom-origin-trust-store/) when making external (grey-clouded) subrequests from a Cloudflare Worker.
