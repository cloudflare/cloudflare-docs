---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2
---

Use this selector to apply $1 policies to a specific private IP address on a user's local network that requests arrive to Gateway from.

| UI name            | API example                                   |
| ------------------ | --------------------------------------------- |
| Source Internal IP | `$2.src.internal_src_ip == "192.168.86.0/27"` |
