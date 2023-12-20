---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to apply policies to the source IP address of DNS queries. For example, this could be the WAN IP address of the stub resolver used by your organization to send queries to Gateway.

| UI name   | API example                  | Evaluation phase      |
| --------- | ---------------------------- | --------------------- |
| Source IP | `dns.src_ip == 198.51.100.0` | Before DNS resolution |
