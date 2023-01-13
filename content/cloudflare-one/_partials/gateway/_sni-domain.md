---
_build:
  publishResources: false
  render: never
  list: never
---

The domain whose Server Name Indication (SNI) header Gateway will filter traffic against. For example, a rule for `example.com` will match `example.com`, `www.example.com`, and `my.test.example.com`.

| UI name    | API example                       |
| ---------- | --------------------------------- |
| SNI Domain | `net.sni.domains == "example.com"` |