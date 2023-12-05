---
_build:
  publishResources: false
  render: never
  list: never
---

1. Go to the [**Local Domain Fallback** page](#view-local-domains).

2. Enter the **Domain** you want to exclude from Gateway. All prefixes under the domain are subject to the local domain fallback rule (for example, all entries are interpreted as `*.example.com`).

3. Enter the DNS server(s) that should resolve that domain name.

   - All servers are tried and the fastest response is used. If this response is `no records found`, then that response will be used and the other servers will not be queried.
   - It is best to always specify at least one DNS server for each domain. If a value is not specified, the WARP client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.

4. Enter an optional description and select **Save domain**.

5. DNS traffic to the local domain fallback server is routed according to your [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configuration. To ensure that queries can reach your private DNS server:
   - If your DNS server is only reachable outside of the WARP tunnel (for example, via a third-party VPN), [exclude](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route) the server's IP.
   - If your DNS server is only reachable through the WARP tunnel (for example, if it is connected to Cloudflare via `cloudflared` or Magic WAN), [include](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route) the server's IP.

[Learn more](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/#how-the-warp-client-handles-dns-requests) about how WARP handles DNS requests.
