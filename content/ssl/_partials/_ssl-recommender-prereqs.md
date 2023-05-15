---
_build:
  publishResources: false
  render: never
  list: never
---

To make sure you do not inadvertently block the **SSL/TLS Recommender**, review your settings to make sure your domain:

- Is accessible.
- Is not blocking requests from our bot (which uses a user agent of `Cloudflare-SSLDetector`).
- Does not have any active, SSL-specific [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) or [Configuration rules](/rules/configuration-rules/).