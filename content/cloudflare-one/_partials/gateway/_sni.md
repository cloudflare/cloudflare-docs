---
_build:
  publishResources: false
  render: never
  list: never
---

The host whose Server Name Indication (SNI) header Gateway will filter traffic against. This will allow for an exact match.

| UI name | API example                         |
| ------- | ----------------------------------- |
| SNI     | `net.sni.host == "www.example.com"` |