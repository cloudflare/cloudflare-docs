---
pcx_content_type: how-to
title: Reach private LBs with WARP
weight: 3
---

# Reach private load balancers with Cloudflare WARP

Consider the following steps to learn how to configure Cloudflare local traffic management (LTM) solution, using WARP as the on-ramp to securely connect to your private or internal services.

## 1. Set up a private load balancer with Cloudflare Tunnel

Currently, to be able to connect to private IP origins, Cloudflare load balancers require a [Cloudflare tunnel](/cloudflare-one/connections/connect-networks/) with an associated [virtual network (VNet)](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/).

Start from [Set up private IPs with Cloudflare Tunnel](/load-balancing/local-traffic-management/ltm-tunnels-setup/) if you have not yet configured tunnels as your off-ramp.

<!--- Once you create a load balancer that points to private origins, the load balancer itself will be assigned a private IP address.--->

## 2. Configure WARP device profiles



## 3. (Optional) Create DNS records locally
