---
_build:
  publishResources: false
  render: never
  list: never
---

Total TLS certificates follow the [Common Name (CN) restriction](https://www.rfc-editor.org/rfc/rfc5280.html) of 64 characters. If you have a hostname that exceeds this length, you can manually create an [Advanced Certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) to cover it.