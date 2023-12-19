---
_build:
  publishResources: false
  render: never
  list: never
---

| UI name            | API example                           | Evaluation phase      |
| ------------------ | ------------------------------------- | --------------------- |
| Content Categories | `any(dns.content_category[*] in {1})` | Before DNS resolution |
