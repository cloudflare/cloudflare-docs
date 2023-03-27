---
_build:
  publishResources: false
  render: never
  list: never
---

Pay specific attention to:

- Which endpoints are being targeted.
- The top non-Mozilla user agents.
- Traffic from Outlook or Office user-agents.
- Traffic from cloud-based Secure Web Gateways (ASNs labeled with the proxy provider).
- Traffic from on-premises forward proxies.
- Whether requests come from a predictable IP address and ASN, or have a similar [JA3 fingerprint](/bots/concepts/ja3-fingerprint/).