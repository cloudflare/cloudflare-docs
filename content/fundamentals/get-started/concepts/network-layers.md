---
pcx-content-type: concept
title: Network Layers
weight: 4
---

# Network layers

Below is a list of the different layers that makes up the [open systems interconnection (OSI) model](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) and the associated Cloudflare products.

{{<Aside heading="Note:">}}

The list of related products is representative but not comprehensive.

{{</Aside>}}

|  Network layer       | Protocol and related products   |
|----------------------|---------------------------------|
| 7 Application layer  | **HTTP, DNS**</br> [Authoritative DNS](/dns), [CDN](https://www.cloudflare.com/cdn/), [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/), [Stream](/stream), [Load Balancing](/load-balancing/understand-basics/proxy-modes/), [WAF](/waf), [Bot Management](/bots) |
| 6 Presentation layer |                                 |
| 5 Session layer      |                                 |
| 4 Transport layer    | **TCP/UDP**</br> [Spectrum](/spectrum), [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/), [Load Balancing](/load-balancing/understand-basics/proxy-modes/) |
| 3 Network layer  | **IP, GRE, any packet/protocol**</br> [Magic Transit](/magic-transit), [Magic Firewall](/magic-firewall), [Magic WAN](/magic-wan) |
| 2 Datalink layer     | **Direct connection**</br> [Cloudflare Network Interconnect (CNI)](/network-interconnect) |
| 1 Physical layer     | **Direct connection**</br> [Cloudflare Network Interconnect (CNI)](/network-interconnect) |