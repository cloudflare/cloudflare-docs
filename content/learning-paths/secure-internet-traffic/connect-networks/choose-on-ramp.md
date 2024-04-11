---
title: Choose an on-ramp
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Similar to the network onboarding practices in the [Replace your VPN](/learning-paths/replace-vpn/connect-private-network/) implementation guide, there are a number of ways to on-ramp your network traffic to the Cloudflare global network. In our recommended approach to security, you will source traffic from devices that would otherwise go to the Internet through a default route. Relevant targets for this may be branch offices, network subnets that need a secure path to the Internet, or anywhere that you control the Internet paths for groups of devices.

## Available on-ramps

The primary ways to source multi-device or network traffic to the Cloudflare network are via the [WARP Connector](#warp-connector) as an all-ports traffic proxy, or via upstream DNS for a whole network using [DNS filtering locations](#dns-filtering-locations). Alternatively, Enterprise users can add [Magic WAN](#magic-wan) to their plan and configure Magic WAN Connector or a dedicated third-party device.

{{<heading-pill style="beta" heading="h3">}}WARP Connector{{</heading-pill>}}

[WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/), a software agent similar to our device client, functions as a virtual device to establish a connection between your network and the Cloudflare global network. You can install WARP Connector on a dedicated Linux server or virtual machine.

WARP Connector supports both ingressing and egressing traffic to and from your private network. This means it can proxy traffic initiated from a user running WARP into a private network (like {{<glossary-tooltip term_id="cloudflared" link="/cloudflare-one/connections/connect-networks/get-started/">}}`cloudflared`{{</glossary-tooltip>}}), or allow traffic initiated from a network to be on-ramped to Cloudflare for either public or private destinations. You can use WARP Connector to establish a secure egress path for servers or users on a network which may not each be able to run the WARP client and still apply Gateway network and HTTP inspection policies. This connection is most analogous to site-to-site VPN or proxy server connectivity.

For more information on setting up Cloudflare Tunnel via WARP Connector, refer to [Set up WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/).

### DNS filtering locations

{{<glossary-definition term_id="DNS location">}}

The fastest way to start filtering DNS queries from a location is by changing the DNS resolvers at the router. Alternatively, you can on-ramp devices or specific applications via [DNS over HTTPS](/cloudflare-one/connections/connect-devices/agentless/dns/dns-over-https/) or [DNS over TLS](/cloudflare-one/connections/connect-devices/agentless/dns/dns-over-tls/).

For more information on setting up DNS locations, refer to [Add locations](/cloudflare-one/connections/connect-devices/agentless/dns/locations/).

### Magic WAN

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

[Magic WAN](/magic-wan/) is Cloudflare's offering most analogous to a traditional SD-WAN. Magic WAN is typically deployed via an IPSec or GRE tunnel terminating on customer devices (such as firewalls or routers), or via our Magic WAN Connector hardware device. You can also be deploy Magic WAN using [Cloudflare Network Interconnect](/network-interconnect/) (CNI) at private peering locations or some public cloud instances (where compatible).

Magic WAN on-ramps and off-ramps traffic via your connections after transiting the Cloudflare global network. Gateway can also apply network and HTTP policies to this traffic for secure egress.

For more information on how Magic WAN integrates with Zero Trust, refer to [Zero Trust integration](/magic-wan/zero-trust/).
