---
title: WARP
pcx_content_type: tutorial
meta:
  title: Use WARP as an on-ramp
---

# WARP on-ramp to Magic WAN

Use WARP as an on-ramp to Magic WAN and route traffic from user devices with WARP installed to any network connected with Magic IP-layer tunnels (Anycast [GRE](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/), [IPsec](/magic-wan/how-to/ipsec/), or [CNI](/network-interconnect/)).

## Prerequisites

Before you can begin using WARP as an on-ramp to Magic WAN, you must: 

- Set up your [Zero Trust account](/cloudflare-one/setup/#start-from-the-cloudflare-dashboard).
- Contact your account team to enable the integration between WARP and Magic WAN.

## 1. Create a service token

Refer to [Create a service token](/cloudflare-one/identity/service-tokens/#create-a-service-token) in the Cloudflare Zero Trust documentation for more information.

## 2. Install the WARP client on your device

Refer to [Install the WARP client on your devices](/cloudflare-one/setup/#install-the-warp-client-on-your-devices) in the Cloudflare Zero Trust documentation for more information.

## 3. Configure Split Tunnels

[Configure Split Tunnels](/cloudflare-one/tutorials/split-tunnel/) from your Zero Trust dashboard to only include traffic from the private IP addresses you want to acceess.

Optionally, you can configure Split Tunnels to include IP ranges or domains you want to use for connecting to public IP addresses. If you choose to use this option, destination ports `1023` and lower are supported.

## 4. Connect to WARP from your machine

Refer to [Deploy WARP to your organization](/cloudflare-one/connections/connect-devices/warp/deployment/) for more information on whether to choose a manual or managed deployment.

You should be able to access Private IP addresses specified in the Split Tunnel configuration. If you requested to test TCP connectivity to public IP addresses, you should be able to access these services provided the destination port is `1023` or lower.

## 5. Route packets back to WARP devices

Route packets back to WARP devices from services behind an Anycast GRE or other type tunnel.

WARP devices will be assigned IP addresses from the Magic WARP Virtual IP (VIP) space.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

`ip route add 100.96.0.0/12 dev gre1`
