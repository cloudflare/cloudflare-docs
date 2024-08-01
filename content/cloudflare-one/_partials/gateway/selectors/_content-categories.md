---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to filter domains belonging to specific [content categories](/cloudflare-one/policies/gateway/domain-categories/#content-categories).

| UI name            | API example                           | Evaluation phase      |
| ------------------ | ------------------------------------- | --------------------- |
| Content Categories | `any(dns.content_category[*] in {1})` | Before DNS resolution |
