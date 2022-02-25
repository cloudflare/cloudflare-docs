---
order: 2
pcx-content-type: how-to
hidden: true
---

import OriginHealthOverview from "../../_partials/_origin-health-overview"
import SecureOriginConnections from "../../_partials/_origin-secure-connections"
import OriginPassiveAlert from "../../_partials/_origin-passive-alert"
import OriginLBAlert from "../../_partials/_origin-lb-alert"
import DDoS from "../../_partials/_origin-ddos"
import Caching from "../../_partials/_origin-caching"
import LoadBalancing from "../../_partials/_origin-load-balancing"

# Protect your origin server — Free

<OriginHealthOverview/>

## Secure origin connections

<SecureOriginConnections/>

## Monitor origin health

<OriginPassiveAlert/>

<OriginLBAlert/>

## Reduce origin traffic

### Block traffic

<DDoS/>

Additionally, adjust various settings in your **Firewall** to restrict potentially malicious traffic:
- Set up customized [firewall rules](https://developers.cloudflare.com/firewall/cf-firewall-rules)
- Enable [bot protection](https://developers.cloudflare.com/bots/get-started)
- Block, challenge, or allow specific addresses with [IP access rules](https://support.cloudflare.com/hc/articles/217074967)
- Create [rate limiting](https://support.cloudflare.com/hc/articles/115001635128) rules as a final defense against malicious traffic (usage-based billing)

### Increase caching

<Caching/>

### Distribute traffic

<LoadBalancing/>