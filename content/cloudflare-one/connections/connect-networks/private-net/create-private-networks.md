---
pcx_content_type: how-to
title: Create private networks
weight: 5
---

# Create private networks with WARP

With Cloudflare Zero Trust, you can create a private network between any two or more devices running Cloudflare WARP. This means that you can have a private network between your phone and laptop without ever needing to be connected to the same physical network. If you already have an existing Zero Trust deployment, you can also enable this feature to add device-to-device connectivity to your private network with the press of a button. This will allow you to connect to any service that relies on TCP, UDP, or ICMP-based protocols through Cloudflare’s network.

Users in your organization can reach these services by enrolling into your organization's Zero Trust account. Once enrolled, each device is assigned a virtual IP address in the `100.64/10` range which will allow users or systems to address these devices directly. Administrators will then be able to build Zero Trust policies to determine who within your organization can reach those virtual IPs.

This guide covers how to:

- Enable WARP-to-WARP connectivity to establish a virtual network between your devices
- Manage Split Tunnel preferences for the WARP client to determine what traffic should be routed to the Cloudflare global network
- Create Zero Trust security policies to restrict access
- Connect to virtual IP spaces from WARP devices without any client-side configuration changes

## Prerequisites

- [Install the Cloudflare WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your devices.
- [Define device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/).
- [Enroll your devices](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device-manually) in your Zero Trust organization.​​

## Enable the WARP-to-WARP configuration

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Enable **Proxy**.
3. Enable **Warp-to-Warp**.
4. In your [Split Tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/), ensure that traffic to `100.64/10` is going through WARP:

- If using **Exclude** mode, remove `100.64/10` from your list.
- If using **Include** mode, add `100.64/10` to your list.

This will instruct WARP to begin proxying any traffic destined for a `100.64/10` IP address to Cloudflare for routing and policy enforcement.

## Connect via WARP

Once enrolled, your users and services will be able to connect to the virtual IPs configured for TCP, UDP, or ICMP-based traffic.

Optionally, you can create [Gateway network policies](/cloudflare-one/policies/gateway/network-policies/) by blocking the `100.64/10` IP space and creating [identity-based rules](/cloudflare-one/policies/gateway/identity-selectors/) around the virtual IPs you wish to allow users to access.

## Availability

WARP-to-WARP is currently in closed beta. To get started, sign-up on our [waitlist](https://www.cloudflare.com/lp/warp-peering/) to receive early access. For more information about the feature, refer to the [Cloudflare blog](https://blog.cloudflare.com/warp-to-warp/).
