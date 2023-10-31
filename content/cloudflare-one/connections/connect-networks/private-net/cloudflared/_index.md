---
pcx_content_type: how-to
title: Connect private networks
weight: 1
layout: single
---

# Connect private networks

A private network has two primariy components: the server and the client. The server's infrastructure (whether that is a single application, multiple applications, or a network segment) is connected to Cloudflare's global network by Cloudflare Tunnel. This is done by running the `cloudflared` daemon on the server.

On the client side, end users connect to Cloudflare's global network using the Cloudflare WARP client. The WARP client can be rolled out to your entire organization in just a few minutes using your in-house MDM tooling.  When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare’s network to the corresponding tunnel.

![Diagram displaying connections between a device, WireGuard tunnel, Cloudflare Tunnel and a public cloud.](/images/cloudflare-one/connections/private-ips-diagram.png)

To enable remote access to your private network, follow the guide below.

## 1. Connect the server to Cloudflare

To connect your infrastructure with Cloudflare Tunnel:

1. Create a Cloudflare Tunnel for your server by following our [dashboard setup guide](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/). You can skip the connect an application step and go straight to connecting a network.

2. In the **Private Networks** tab for the tunnel, enter the IP/CIDR range of your private network (for example `10.0.0.0/8`). This makes the WARP client aware that any requests to this IP range need to be routed to your new tunnel.

## 2. Set up the client

{{<render file="tunnel/_warp-to-tunnel-client.md">}}

## 3. Route private network IPs through WARP

{{<render file="tunnel/_warp-to-tunnel-route-ips.md">}}

## 4. (Recommended) Filter network traffic with Gateway

By default, all WARP devices enrolled in your Zero Trust organization can connect to your private network through Cloudflare Tunnel. You can configure Gateway to inspect your network traffic and either block or allow access based on user identity and device posture.

### Enable the Gateway proxy

1. [Enable the Gateway proxy](/cloudflare-one/policies/gateway/proxy/#enable-the-gateway-proxy) for TCP.
2. (Recommended) To proxy traffic to internal DNS resolvers, select **UDP**.
3. (Recommended) To proxy traffic for diagnostic tools such as `ping` and `traceroute`:

   1. Select **ICMP**.
   2. On Linux servers:

   - Ensure that the Group ID for the `cloudflared` process is included in `/proc/sys/net/ipv4/ping_group_range`.
   - If you are running multiple network interfaces (for example, `eth0` and `eth1`), configure `cloudflared` to use the external Internet-facing interface:

   ```sh
   $ cloudflared tunnel run --icmpv4-src <IP of primary interface>
   ```

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](#3-route-private-network-ips-through-warp). For more information on how Gateway forwards traffic, refer to [Gateway proxy](/cloudflare-one/policies/gateway/proxy/).

### Create Zero Trust policies

You can create Zero Trust policies to manage access to specific applications on your network.

1. Go to **Access** > **Applications** > **Add an application**.
2. Select **Private Network**.
3. Name your application.
4. For **Application type**, select _Destination IP_.
5. For **Value**, enter the IP address for your application (for example, `10.128.0.7`).
   {{<Aside type="note">}}
   If you would like to create a policy for an IP/CIDR range instead of a specific IP address, you can build a [Gateway Network policy](/cloudflare-one/policies/gateway/network-policies/) using the **Destination IP** selector.
   {{</Aside>}}

6. Configure your [App Launcher](/cloudflare-one/applications/app-launcher/) visibility and logo.
7. Select **Next**. You will see two auto-generated Gateway Network policies: one that allows access to the destination IP and another that blocks access.
8. Modify the policies to include additional identity-based conditions. For example:

   - **Policy 1**
     | Selector       | Operator      | Value            | Logic | Action |
     | -------------- | ------------- | ---------------- | ----- | ------ |
     | Destination IP | in            | `10.128.0.7`     | And   | Allow  |
     | User email     | Matches regex | `.*@example.com` |       |        |

   - **Policy 2**
     | Selector       | Operator | Value        | Action |
     | -------------- | -------- | ------------ | ------ |
     | Destination IP | in       | `10.128.0.7` | Block  |

   Policies are evaluated in [numerical order](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence), so a user with an email ending in @example.com will be able to access `10.128.0.7` while all others will be blocked. For more information on building network policies, refer to our [dedicated documentation](/cloudflare-one/policies/gateway/network-policies/).

9. Select **Add application**.

Your application will appear on the **Applications** page.

## 5. Connect as a user

End users can now reach HTTP or TCP-based services on your network by visiting any IP address in the range you have specified.

### Troubleshooting

#### Device configuration

To check that their device is properly configured, the user can visit `https://help.teams.cloudflare.com/` to ensure that:

- The page returns **Your network is fully protected**.
- In **HTTP filtering**, both **WARP** and **Gateway Proxy** are enabled.
- The **Team name** matches the Zero Trust organization from which you created the tunnel.

#### Router configuration

Check the local IP address of the device and ensure that it does not fall within the IP/CIDR range of your private network. For example, some home routers will make DHCP assignments in the `10.0.0.0/24` range, which overlaps with the `10.0.0.0/8` range used by most corporate private networks. When a user's home network shares the same IP addresses as the routes in your tunnel, their device will be unable to connect to your application.

To resolve the IP conflict, you can either:

- Reconfigure the user's router to use a non-overlapping IP range. Compatible routers typically use `192.168.1.0/24`, `192.168.0.0/24` or `172.16.0.0/24`.

- Tighten the IP range in your Split Tunnel configuration to exclude the `10.0.0.0/24` range. This will only work if your private network does not have any hosts within `10.0.0.0/24`.

- Change the IP/CIDR of your private network so that it does not overlap with a range commonly used by home networks.
