---
_build:
  publishResources: false
  render: never
  list: never
---

Session Affinity automatically directs requests from the same client to the same origin web server:

1.  When a client makes its first request, Cloudflare sets a `CFLib` cookie on the client (to track the associated origin web server).
2.  Subsequent requests by the same client are forwarded to that origin for the duration of the cookie and as long as the origin server remains healthy.
3.  If the cookie expires or the origin server becomes unhealthy, Cloudflare sets a new cookie tracking the new failover origin.

All sessions default to 23 hours unless you set a custom session _Time to live_ (TTL).

The session cookie is secure when [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.