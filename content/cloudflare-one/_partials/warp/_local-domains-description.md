---
_build:
  publishResources: false
  render: never
  list: never
---

By default, Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processing. These domains are resolved by the local DNS resolver configured for the device on its primary interface. Since these DNS requests bypass the Gateway resolver, they are not subject to Gateway DNS policies or DNS logging.

You can add additional domains to the Local Domain Fallback list and specify a DNS server to use in place of the Gateway resolver. The WARP client proxies these requests directly to the configured fallback servers.
