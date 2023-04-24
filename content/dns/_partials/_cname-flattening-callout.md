---
_build:
  publishResources: false
  render: never
  list: never
---

If a `CNAME` target is being used to verify a domain for a third-party service, enabling the **Flatten all CNAMEs** setting may cause that functionality to work incorrectly since the `CNAME` record itself will not be returned directly.