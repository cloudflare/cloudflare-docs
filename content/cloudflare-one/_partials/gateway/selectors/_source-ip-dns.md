---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to apply policies to a specific source IP address that queries arrive to Gateway from. For example, this could be the WAN IP address of the stub resolver used by an organization to send queries upstream to Gateway.

| UI name   | API example                  | Evaluation phase      |
| --------- | ---------------------------- | --------------------- |
| Source IP | `dns.src_ip == 198.51.100.0` | Before DNS resolution |
