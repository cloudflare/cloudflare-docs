---
_build:
  publishResources: false
  render: never
  list: never
---

To adjust your encryption mode with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`).