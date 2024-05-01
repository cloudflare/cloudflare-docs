---
_build:
  publishResources: false
  render: never
  list: never
---


By default, WARP excludes traffic bound for [RFC 1918 space](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for WARP to send traffic to your private network, you must configure [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through WARP.

1. First, check whether your [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. If you are using **Include** mode, add your network's IP/CIDR range to the list. Your list should also include the [domains necessary for Cloudflare Zero Trust functionality](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#cloudflare-zero-trust-domains).

3. If you are using **Exclude** mode:
   1. Delete your network's IP/CIDR range from the list. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.
   2. Re-add IP/CDIR ranges that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through WARP.

By tightening the private IP range included in WARP, you reduce the risk of breaking a user's [access to local resources](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#allow-users-to-enable-local-network-exclusion).
