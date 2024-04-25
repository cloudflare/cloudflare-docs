---
title: Manage overlapping IPs
pcx_content_type: overview
weight:
layout: learning-unit
---

{{<render file="tunnel/_virtual-networks-intro.md" productFolder="cloudflare-one">}}

## Example

This example illustrates best practices for managing overlapping subnets. For this example, assume that you are connecting two different private networks: a production VPC that uses the `10.0.0.0/8` space holistically and a staging VPC that uses the `10.0.1.0/24` space. These networks are served by Tunnel-A and Tunnel-B respectively.

The following table shows the default configuration without a virtual network assigned:

| Routes in Tunnel-A | Virtual network |
| --------------- | --------------- |
| `10.0.0.0/8`    | default         |

| Routes in Tunnel-B | Virtual network |
| --------------- | --------------- |
| `10.0.1.0/24`   | default         |

In the above configuration, all user traffic to `10.0.1.0/24` takes the most specific path and routes to the staging VPC (Tunnel-B). All other `10.0.0.0/8` traffic routes to the production VPC (Tunnel-A). Users would not be able to reach the `10.0.1.0/24` subnet for the network served by Tunnel-A.

To solve this problem, add a `10.0.1.0/24` route to Tunnel-A and assign it the `production` virtual network. Next, assign the `staging` virtual network to `10.0.1.0/24` in Tunnel-B.

| Routes in Tunnel-A | Virtual network |
| --------------- | --------------- |
| `10.0.0.0/8`    | default         |
| `10.0.1.0/24`   | production      |

| Routes in Tunnel-B | Virtual network |
| --------------- | --------------- |
| `10.0.1.0/24`   | staging      |

The user can now [toggle between the two virtual networks](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/#connect-to-a-virtual-network) in their WARP client, similar to the concept of switching VPN profiles in a VPN client. When a user selects `production`, they can connect to the entire `10.0.0.0/8` range served by Tunnel-A. When they select `staging`, they can connect to all of `10.0.0.0/8` in Tunnel-A except for `10.0.1.0/24`, which will be served by Tunnel-B.

## Set up virtual networks

For setup instructions, refer to [Create a virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/#create-a-virtual-network).