---
_build:
  publishResources: false
  render: never
  list: never
---

1. Go to **Settings** > **Network**.
2. Enable **Proxy** for TCP.
3. (Recommended) To proxy traffic to internal DNS resolvers, select **UDP**.
4. (Recommended) To proxy traffic for diagnostic tools such as `ping` and `traceroute`:

   1. Select **ICMP**.
   2. On Linux servers:

   - Ensure that the Group ID for the `cloudflared` process is included in `/proc/sys/net/ipv4/ping_group_range`.
   - If you are running multiple network interfaces (for example, `eth0` and `eth1`), configure `cloudflared` to use the external Internet-facing interface:

   ```sh
   $ cloudflared tunnel run --icmpv4-src <IP of primary interface>
   ```

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#3-route-private-network-ips-through-warp). For more information on how Gateway forwards traffic, refer to [Gateway proxy](/cloudflare-one/policies/gateway/proxy/).