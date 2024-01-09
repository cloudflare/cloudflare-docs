---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to apply policies to a specific [Gateway DNS location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) or set of locations.

| UI name  | API example                                             | Evaluation phase      |
| -------- | ------------------------------------------------------- | --------------------- |
| Location | `dns.location in {"location_uuid_1" "location_uuid_2"}` | Before DNS resolution |
