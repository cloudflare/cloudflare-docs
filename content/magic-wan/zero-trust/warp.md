---
title: WARP
pcx_content_type: tutorial
meta:
  title: Use WARP as an on-ramp
---

# WARP on-ramp to Magic WAN

Use WARP as an on-ramp to Magic WAN and route traffic from user devices with WARP installed to any network connected with Cloudflare Tunnel or Magic IP-layer tunnels (Anycast [GRE](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/), [IPsec](/magic-wan/reference/tunnels/#ipsec-tunnels), or [CNI](/network-interconnect/)).

{{<render file="_traceroute.md">}}

## Prerequisites

Before you can begin using WARP as an on-ramp to Magic WAN, you must:

- Set up your [Zero Trust account](/cloudflare-one/setup/#create-a-zero-trust-organization).
- Contact your account team to enable the integration between WARP and Magic WAN.

## 1. Route packets back to WARP devices

Route packets back to WARP devices from services behind an Anycast GRE or other type tunnel.

Cloudflare will assign IP addresses from the WARP virtual IP (VIP) space to your WARP devices. To view your virtual IP address, open the **[Cloudflare Zero Trust](https://one.dash.cloudflare.com/)** dashboard and select **My Team** > **Devices**.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

```sh
$ ip route add 100.96.0.0/12 dev gre1
```

{{<Aside type="note" header="Note">}}

After set up, **HTTP** and **Network** logs in Gateway will show the virtual IP address of your WARP device as the **Source IP**. DNS logs will continue to show the original WARP device IP because DNS traffic is sent over the public Internet to Cloudflare's public-facing resolver.

{{</Aside>}}

## 2. Configure Split Tunnels

[Configure Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) from your Zero Trust account to only include traffic from the private IP addresses you want to access.

Optionally, you can configure Split Tunnels to include IP ranges or domains you want to use for connecting to public IP addresses.

## 3. Install the WARP client on your device

Refer to [Deploy WARP to your organization](/cloudflare-one/connections/connect-devices/warp/deployment/) for more information on whether to choose a manual or managed deployment.

You should be able to access Private IP addresses specified in the Split Tunnel configuration.

{{<Aside type="note">}}You must log out and log back in with at least one WARP device to ensure the configuration updates on your device.{{</Aside>}}