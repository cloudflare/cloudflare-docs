---
_build:
  publishResources: false
  render: never
  list: never
---

Split tunnel settings determine which traffic WARP does and does not proxy.

WARP offers two different split tunnel modes:

- If you intend to send all internal and external destination traffic through Cloudflare's global network, opt for **Exclude IPs and domains** mode. This mode will proxy everything through the WARP tunnel with the exception of IPs and hosts defined explicitly within the Split Tunnel list.
- If you intend to only use WARP to proxy private destination traffic, you can operate in **Include IPs and domains** mode, in which you explicitly define which IP ranges and domains should be included in the WARP routing table.

## Update Split Tunnels mode

To change your Split Tunnels mode:
{{<render file="warp/_change-split-tunnels-mode.md" productFolder="cloudflare-one">}}

## Add a route

{{<render file="warp/_add-split-tunnels-route.md" productFolder="cloudflare-one">}}
