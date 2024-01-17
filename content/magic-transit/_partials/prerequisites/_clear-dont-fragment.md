---
_build:
  publishResources: false
  render: never
  list: never
---

### Clear Don't Fragment (DF)

If you are unable to set the MSS on your physical interfaces to a value lower than 1500 bytes, you can choose to clear the `don't-fragment` bit in the IP header. When this option is enabled, Cloudflare fragments packets greater than 1500 bytes, and the packets are reassembled on your infrastructure after decapsulation. In most environments, enabling this option does not have significant impact on traffic throughput.

To enable this option for your network, contact your account team.