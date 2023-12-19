---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: example
---

Use this selector to choose the DNS resource record type that you would like to apply policies against. $1

| UI name           | API example                | Evaluation phase      |
| ----------------- | -------------------------- | --------------------- |
| Query Record Type | `dns.query_rtype == "TXT"` | Before DNS resolution |
