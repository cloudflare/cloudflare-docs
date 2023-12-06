---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: 7productPathProbe
---

To check for tunnel health, Cloudflare sends a [health check probe]($1) consisting of ICMP (Internet Control Message Protocol) reply packets to your network. Cloudflare needs to receive these probes to know if your tunnel is healthy.

Cloudflare defaults to bidirectional health checks for Magic WAN, and unidirectional health checks for Magic Transit (direct server return). However, routing unidirectional ICMP reply packets over the Internet to Cloudflare is sometimes subject to drops by intermediate network devices, such as stateful firewalls. Magic Transit customers with egress traffic can modify this setting to bidirectional.