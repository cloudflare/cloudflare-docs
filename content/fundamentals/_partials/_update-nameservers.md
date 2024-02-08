---
_build:
  publishResources: false
  render: never
  list: never
---

{{<render file="_nameserver-preamble.md" productFolder="dns" >}}
<br/>

Before your domain can begin using Cloudflare for DNS resolution, you need to [add these nameservers](/dns/zone-setups/full-setup/setup/#update-your-nameservers) at your registrar. Make sure DNSSEC **is disabled** at this point.

{{<render file="_minimize-downtime-tip.md" productFolder="dns" >}}