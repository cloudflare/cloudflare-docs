---
pcx_content_type: concept
title: Traffic steering
meta:
    description: Magic WAN uses a static configuration to route traffic through anycast tunnels using the Generic Routing Encapsulation (GRE) and Internet Protocol Security (IPsec) protocols from Cloudflare’s global network to your network.
---

{{<render file="_traffic-steering.md" productFolder="magic-transit" withParameters="Magic WAN;;/magic-wan/reference/tunnels/;;/magic-wan/configuration/manually/how-to/configure-static-routes/;;/magic-wan/reference/tunnels/#ipsec-tunnels">}}

## Application-aware policies

By default, Cloudflare balances and steers traffic based on network-layer characteristics (IP, port etc). If you are using the Magic WAN Connector, you can also steer traffic based on well-known applications. Application-aware policies provide easier management and more granularity over traffic flows.

For more information, refer to [Applications and app types](/cloudflare-one/policies/gateway/application-app-types/).