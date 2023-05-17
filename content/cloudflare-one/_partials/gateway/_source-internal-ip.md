---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: policyType;;APIprefix
---

Use this selector to apply $1 policies to a private IP address, assigned by a user's local network, that requests arrive to Gateway from. This selector will only apply to users connected through a [Magic GRE or IPSec tunnel](/magic-wan/zero-trust/cloudflare-gateway/).

| UI name            | API example                                   |
| ------------------ | --------------------------------------------- |
| Source Internal IP | `$2.src.internal_src_ip == "192.168.86.0/27"` |
