---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: example
---

Use this selector to match against a domain and all subdomains. $1

| UI name | API example                            | Evaluation phase      |
| ------- | -------------------------------------- | --------------------- |
| Domain  | `any(dns.domains[*] == "example.com")` | Before DNS resolution |
