---
_build:
  publishResources: false
  render: never
  list: never
---

Random prefix attacks are when someone sends a lot of traffic to subdomains that are highly unlikely to exist (`12345.example.com`, `abcdefg.example.com`), but are still associated with your main domain (`example.com`).

Usually, a DNS query to each random subdomain (or prefix) is not repeated, so it cannot be cached by resolvers or any other proxies and always reaches the authoritative nameservers. Rate limiting or blocking queries based on source IP can introduce a high amount of false positives, since random prefix attacks commonly are conducted via public resolvers. This makes these attacks particularly effective and hard to mitigate.