---
order: 2
pcx-content-type: how-to
hidden: true
---

import OriginHealthOverview from "../../_partials/_origin-health-overview"
import OriginHealthCheck from "../../_partials/_origin-health-check"
import OriginLBAlert from "../../_partials/_origin-lb-alert"
import DDoS from "../../_partials/_origin-ddos"
import FirewallOptions from "../../_partials/_origin-firewall-options"
import Caching from "../../_partials/_origin-caching"
import LoadBalancing from "../../_partials/_origin-load-balancing"
import WaitingRoom from "../../_partials/_origin-waiting-room"
import ZeroDowntimeFailover from "../../_partials/_dns-zero-downtime-failover"


# Protect your origin server — Enterprise

<OriginHealthOverview/>

## Secure origin connections

When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

- **DNS**: Set up [proxied (orange-clouded) DNS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records) and [change your domain nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup), which will also require that you [allow Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700) at your origin.
- **SSL**: 
    - To encrypt all traffic between Cloudflare and your server, [choose Strict (SSL-Only Origin Pull)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes#strict-ssl-only-origin-pull) SSL/TLS mode (requires server configuration)
    - To validate requests are coming from the Cloudflare network, [set up authenticated origin pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull).
- **Prevent external connections**:
    - **Firewall** (moderately secure): Set up a [Firewall Rule](https://developers.cloudflare.com/firewall/cf-dashboard) that only allows traffic from [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
    - **Cloudflare Tunnel** (very secure): To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps).

## Monitor origin health

For passive monitoring, [create notifications](/notifications/create-notifications) for **Origin Error Rate Alerts** to receive alerts when your origin returns 5xx codes above a configurable threshold and **Passive Origin Monitoring** to see when Cloudflare is unable to reach your origin for a few minutes.

<OriginHealthCheck/>

<OriginLBAlert/>

### Zero Downtime Failover

<ZeroDowntimeFailover/>

## Reduce origin traffic

### Block traffic

<DDoS/>

<FirewallOptions/>

### Increase caching

<Caching/>

### Distribute traffic

<LoadBalancing/>

<WaitingRoom/>
