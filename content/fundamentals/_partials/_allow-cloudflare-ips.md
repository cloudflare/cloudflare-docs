---
_build:
  publishResources: false
  render: never
  list: never
---

Because of [how Cloudflare works](/fundamentals/concepts/how-cloudflare-works/), all traffic to your origin server will appear to be coming from Cloudflare IP addresses.

To avoid rate limiting or blocking these requests, you will want to [allow Cloudflare IPs](/fundamentals/setup/allow-cloudflare-ip-addresses/) at your origin server.