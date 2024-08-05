---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;antiReplayPagePath
---

If you use $1 and {{<glossary-tooltip term_id="anycast">}}anycast{{</glossary-tooltip>}} IPsec tunnels, we recommend disabling anti-replay protection. This setting is disabled on Cloudflare’s side by default. However, it can be enabled via the API or the Cloudflare dashboard for devices that do not support disabling it, including Cisco Meraki, Velocloud, and AWS VPN Gateway.

Refer to [Anti-replay protection]($2) for more information on this topic, or [Add IPsec tunnels](#add-tunnels) below to learn how to enable this feature.