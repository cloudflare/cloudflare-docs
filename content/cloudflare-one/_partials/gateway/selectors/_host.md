---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: example
---

Use this selector to match against only the hostname specified. $1

| UI name | API example                      | Evaluation phase      |
| ------- | -------------------------------- | --------------------- |
| Host    | `dns.fqdn == "test.example.com"` | Before DNS resolution |
