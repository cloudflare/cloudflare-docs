---
title: Connect with WARP Connector (optional)
pcx_content_type: overview
weight: 4
layout: learning-unit
---

WARP Connector uses the same underlying technology as our WARP endpoint client. The software is installed on a Linux server or virtual machine in your private network and requires you to make routing updates to machines or networks behind WARP Connector. WARP Connector supports bidirectional proxy of traffic: it can proxy traffic initiated from a user running WARP into a private network (same as `cloudflared`), but it can also enable traffic from a network to be on-ramped to Cloudflare for either public or private destinations. You can also use WARP Connector to create mesh network connectivity so that any device either running the WARP client, or behind a WARP Connector, can communicate using the CGNat virtual IP addresses assigned to each device.

For most customers, [`cloudflared`](/learning-paths/replace-vpn/connect-private-network/cloudflared/) should be the primary connectivity method for end-users to connect to services in your private network.  WARP Connector is the preferred method for mesh or other software-defined networking — most of which require bidirectional connectivity — or when organizations do not want to make changes to their underlying network routing infrastructure.

## Set up WARP Connector

To connect your private network using WARP Connector, refer to [Set up WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/).
