---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: featureValueOnOff
---

To turn $1 **Server-side Excludes** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `server_side_exclude` as the setting name in the URI path, and the `value` parameter set to `"$1"`.
