---
pcx_content_type: concept
title: Local traffic management
weight: 6
layout: single
---

# Local traffic management (LTM)

Local Traffic Management enables you to load balance traffic between your servers within a data center. This helps you eliminate the need for hardware appliances and move your infrastructure to the cloud to benefit from elastic scalability and reliability.

LTM supports not only public IPs but also virtual IPs and private IPs as origin values.

---

## Health monitor support

Since traffic steering decisions or failover mechanisms rely on the health information of pools and origins, being able to input your virtual or private IPs directly as origins within your load balancer means you are able to better leverage existing health monitoring.

Before, you could only enter tunnel addresses in your load balancer and configure health monitor requests to the tunnels themselves. Now, once the origin and VNet tunnel association is configured, Cloudflare determines not only the tunnel health but also the health of corresponding virtual/private IPs targets.

---

## Off-ramps

Off-ramps create a direct and secure way to connect into your networks that are not publicly available. Local Traffic Management currently supports Tunnels off-ramps. GRE and IPsec tunnels support is coming soon.

---

## Use cases

* **Requests originating from the public Internet and directed to a private/internal service**: You can route requests from the Internet to your internal services on internal IPs - such as accounting or production automation systems - using Cloudflare Tunnels.

* **Intelligently route traffic**: Benefit from failover for your private traffic and have the ability to monitor the health of these targets directly, rather than load balancing to a tunnel and monitoring the health of the tunnel itself.