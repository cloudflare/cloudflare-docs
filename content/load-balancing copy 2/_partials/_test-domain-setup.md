---
_build:
  publishResources: false
  render: never
  list: never
---

Instead of starting on your production domain, you likely should create a load balancer on a test or staging domain. This may involve temporary changes to your monitors and pools, depending on your infrastructure setup.

Starting with a test domain allows you to verify everything is working correctly before routing production traffic.