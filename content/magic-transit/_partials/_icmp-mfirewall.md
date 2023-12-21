---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}Internet Control Message Protocol (ICMP) traffic is subject to Magic Firewall rules. If you have Magic Firewall enabled, ensure your rules allow ICMP traffic sourced from Cloudflare public IPs. Otherwise, {{<glossary-tooltip term_id="tunnel health-check">}}health checks{{</glossary-tooltip>}} will fail. Refer to [Magic Firewall rules](/magic-firewall/about/ruleset-logic/#magic-firewall-rules-and-magic-transit-endpoint-health-checks) for more information.{{</Aside>}}