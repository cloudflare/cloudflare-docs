---
pcx_content_type: concept
title: Local traffic management (LTM)
weight: 6
layout: single
---

# Local traffic management (LTM)

Local traffic management (LTM) enables you to load balance traffic between your servers within a data center. This helps you eliminate the need for hardware appliances and move your infrastructure to the cloud, benefiting from elastic scalability and reliability.

LTM supports not only public IPs but also virtual IPs and private IPs as origin values.

{{<Aside type="warning">}}

Currently, to be able to connect to private IP origins, Cloudflare load balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network (VNet)](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/). Refer to [Set up private IPs with Cloudflare Tunnel](/load-balancing/local-traffic-management/ltm-tunnels-setup/) for a detailed guide.

{{</Aside>}}

---

## Health monitor support

Since traffic steering decisions or failover mechanisms rely on the health information of pools and origins, being able to input your virtual or private IPs directly as origins within your load balancer means you are able to better leverage existing health monitoring.

Before, you could only enter tunnel addresses in your load balancer and configure health monitor requests to the tunnels themselves. Now, once the origin and [virtual network (VNet)](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) tunnel association is configured, Cloudflare determines not only the tunnel health but also the health of the corresponding virtual or private IP targets.

---

## Off-ramps

Off-ramps create a direct and secure way to connect into your networks that are not publicly available. Cloudflare local traffic management currently supports Cloudflare Tunnel as off-ramps. [GRE and IPsec tunnels](/magic-wan/reference/tunnels/) support will be added in the future.

---

## Use cases

* **Requests originating from the public Internet and directed to a private/internal service**: You can route requests from the Internet to your internal services on internal IPs - such as accounting or production automation systems - using [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/).

* **Intelligent traffic routing**: Benefit from failover for your private traffic and have the ability to monitor the health of these IP targets directly, rather than load balancing to a tunnel and only monitoring the health of the tunnel itself.