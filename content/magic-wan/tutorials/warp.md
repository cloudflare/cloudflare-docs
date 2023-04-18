---
title: WARP
pcx_content_type: tutorial
meta:
  title: Use WARP as an on-ramp
---

# WARP on-ramp to Magic WAN

Use WARP as an on-ramp to Magic WAN and route traffic from user devices with WARP installed to any network connected with Cloudflare Tunnel or Magic IP-layer tunnels (Anycast [GRE](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/), [IPsec](https://developers.cloudflare.com/magic-wan/how-to/ipsec/), or [CNI](http://developers.cloudflare.com/network-interconnect/)).

## Prerequisites

Before you can begin using WARP as an on-ramp to Magic WAN, you must:

- Set up your [Zero Trust account](/cloudflare-one/setup/#start-from-the-cloudflare-dashboard).
- Contact your account team to enable the integration between WARP and Magic WAN.

## 1. Route packets back to WARP devices

Route packets back to WARP devices from services behind an Anycast GRE or other type tunnel.

WARP devices will be assigned IP addresses from the WARP virtual IP (VIP) space. To view your virtual IP address, open the **Cloudflare Zero Trust** dashboard and select **My Team** > **Devices**.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

```txt
ip route add 100.96.0.0/12 dev gre1
```

{{<Aside type="note" header="Note">}}

After set up, **HTTP** and **Network** logs in Gateway will show the virtual IP address of your WARP device as the **Source IP**. DNS logs will continue to show the original WARP device IP because DNS traffic is sent over the public Internet to Cloudflare's public-facing resolver.

{{</Aside>}}
