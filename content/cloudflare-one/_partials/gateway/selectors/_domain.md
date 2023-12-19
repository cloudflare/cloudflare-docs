---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to match against a domain and all subdomains. For example, you can match `example.com` and its subdomains, such as `www.example.com`.

| UI name | API example                            | Evaluation phase      |
| ------- | -------------------------------------- | --------------------- |
| Domain  | `any(dns.domains[*] == "example.com")` | Before DNS resolution |
