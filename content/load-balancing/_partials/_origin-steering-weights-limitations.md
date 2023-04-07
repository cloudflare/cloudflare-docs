---
_build:
  publishResources: false
  render: never
  list: never
---

If you choose **Hash** for your **Origin Steering** or enable [session affinity](/load-balancing/understand-basics/session-affinity/), these options can affect traffic distribution.

Additionally, session affinity takes precedence over any selected weight or origin steering policy.

When using [DNS-only load balancing](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), DNS resolves may cache resolved IPs for clients and affect traffic distribution.