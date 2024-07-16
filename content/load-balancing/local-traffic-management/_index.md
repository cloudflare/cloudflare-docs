---
pcx_content_type: concept
title: Local traffic management (LTM)
weight: 6
layout: single
meta:
    description: Use Cloudflare LTM to load balance traffic between servers within a data center or between private applications, and eliminate the need for hardware appliances.
---

# Local traffic management (LTM)

Local traffic management (LTM) enables you to load balance traffic between servers within a data center ([endpoint steering](/load-balancing/understand-basics/traffic-steering/origin-level-steering/)) and between private applications. This helps you eliminate the need for hardware appliances and facilitates the migration of your infrastructure to the cloud, providing advantages such as elastic scalability and enhanced reliability.

LTM supports not only public IPs but also virtual IPs and private IPs as endpoint values.

{{<Aside type="note">}}
This page assumes a certain level of familiarity with how the Cloudflare Load Balancing solution works. For an introductory overview refer to [Load Balancing components](/load-balancing/understand-basics/load-balancing-components/).
{{</Aside>}}

---

## Off-ramps

Off-ramps create a direct and secure way for Cloudflare to connect into your networks that are not publicly available.

Since traffic steering decisions or failover mechanisms rely on the health information of pools and endpoints, being able to input your virtual or private IPs directly as endpoints within your load balancer means you can better leverage existing health monitoring.

Cloudflare Load Balancing currently supports using Cloudflare Tunnel as an off-ramp. [GRE and IPsec tunnels](/magic-wan/reference/tunnels/) support will be added in the future.

### Tunnel

Currently, to be able to connect to private IP origins, Cloudflare load balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network (VNet)](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/).

Once the endpoint and virtual network (VNet) tunnel association is configured, Cloudflare can determine not only the tunnel health but also the health of the corresponding virtual or private IP targets.

Refer to [Set up private IPs with Cloudflare Tunnel](/load-balancing/local-traffic-management/ltm-tunnels-setup/) for a detailed guide.

### Magic WAN 

LTM supports off-ramping traffic for Magic WAN tunnels, such as GRE, IPSec or CNI tunnels. For more information refer to the Set up LTM with Magic Wan.

---

## On-ramps

LTM on-ramps, on the other hand, refer to secure paths between the end-user request and the Cloudflare network. Cloudflare Load Balancing supports traffic from [CDN](/cache/), [Spectrum](/spectrum/), [WARP](/cloudflare-one/connections/connect-devices/warp/) and [Magic WAN](/magic-wan/) and forward that traffic to a load balancer, and then egress to an endpoint behind any off-ramp (CDN/CNI/IPSec/GRE/Tunnel). Your traffic can ingress and egress by any on-ramp/off-ramp combination. 

---

## Use cases

* **Requests originating from the public Internet and directed to a private/internal service**: You can route requests from the Internet to your internal services on internal IPs - such as accounting or production automation systems - using [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/).

* **Intelligent traffic routing**: Benefit from failover for your private traffic and have the ability to monitor the health of these IP targets directly, rather than load balancing to a tunnel and only monitoring the health of the tunnel itself.