---
pcx_content_type: how-to
title: Reach private LBs with WARP
weight: 3
---

# Reach private load balancers with Cloudflare WARP

Consider the following steps to learn how to configure Cloudflare local traffic management (LTM) solution, using WARP as the on-ramp to securely connect to your private or internal services.

## 1. Set up a private load balancer with Cloudflare Tunnel

Currently, to be able to connect to private IP origins, Cloudflare load balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network (VNet)](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/).

Start from [Set up private IPs with Cloudflare Tunnel](/load-balancing/local-traffic-management/ltm-tunnels-setup/) if you have not yet configured tunnels as your off-ramp.

## 2. Configure WARP device profiles

1. [Create](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/#create-a-new-profile) or [edit](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/#edit-profile-settings) your WARP device profile(s).
2. [Route the virtual network IPs through WARP](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#3-route-private-network-ips-through-warp).

Once connected, WARP considers the configuration of the virtual network and installs routes on the end user devices. These routes inform the end user devices how to reach the Cloudflare private load balancer.

## 3. (Optional) Create DNS records locally

Finally, you can create local DNS records that point to the load balancer private IP address, making it easier for your end users to access the private or internal service.