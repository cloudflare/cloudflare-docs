---
_build:
  publishResources: false
  render: never
  list: never
---

When choosing which endpoint IP addresses to monitor with health checks, use these guidelines:

- Provide one IP address for each of the prefixes Cloudflare will advertise.
- Redundant IPs routed via the same ISP and infrastructure are not necessary but are useful when troubleshooting.

Cloudflare pings health check IPs from within the [published Cloudflare IP range](https://www.cloudflare.com/ips/), which is also available via the [Cloudflare API](https://api.cloudflare.com/#cloudflare-ips-properties).

Refer to the table below for an example endpoint health check configuration.