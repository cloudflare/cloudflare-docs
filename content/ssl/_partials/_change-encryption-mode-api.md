---
_build:
  publishResources: false
  render: never
  list: never
---

To adjust your encryption mode with the API, send a [`PATCH`](/api/operations/zone-settings-change-ssl-setting) request with the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`).