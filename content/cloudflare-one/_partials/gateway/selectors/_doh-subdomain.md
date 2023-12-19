---
_build:
  publishResources: false
  render: never
  list: never
---

Use this selector to match against DNS queries that arrive via DNS-over-HTTPS (DoH) destined for the DoH endpoint configured for each DNS location. For example, you can use a DNS location with a DoH endpoint of `abcdefg.cloudflare-gateway.com` by choosing the DoH Subdomain selector and inputting a value of `abcdefg`.

| UI name       | API example                      | Evaluation phase      |
| ------------- | -------------------------------- | --------------------- |
| DOH Subdomain | `dns.doh_subdomain == "abcdefg"` | Before DNS resolution |
