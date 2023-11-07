---
pcx_content_type: how-to
title: Private DNS
weight: 5
---

# Private DNS

By default, the WARP client sends DNS requests to [1.1.1.1](/1.1.1.1/), Cloudflare's public DNS resolver, for resolution. With Cloudflare Tunnel, you can connect an internal DNS resolver to Cloudflare and use it to resolve non-publicly routed domains.

## Configure private DNS

1. [Connect your private network](/cloudflare-one/connections/connect-networks/get-started/) with Cloudflare Tunnel.

2. Under **Networks** > **Routes**, verify that the IP address of your internal DNS resolver is included in the tunnel.

3. [Enable the Gateway proxy](/cloudflare-one/policies/gateway/proxy/#enable-the-gateway-proxy) for TCP and UDP.

4. Next, [create a Local Domain Fallback entry](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) that points to the internal DNS resolver. For example, you can instruct the WARP client to resolve all requests for `myorg.privatecorp` through an internal resolver at `10.0.0.25` rather than attempting to resolve this publicly.

{{<Aside type="note">}}

Ensure that **Split Tunnels** are configured to [include traffic to private IPs and hostnames](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#3-route-private-network-ips-through-warp).

{{</Aside>}}

5. Finally, ensure that your tunnel uses QUIC as the default [transport protocol](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#protocol). This will enable `cloudflared` to proxy UDP-based traffic which is required in most cases to resolve DNS queries.

The WARP client will now resolve requests through the internal DNS server you set up in your private network.

## Test the setup

For testing, run a `dig` command for the internal DNS service:

```sh
dig AAAA www.myorg.privatecorp
```

The `dig` command will work because `myorg.privatecorp` was configured above as a fallback domain. If you skip that step, you can still force `dig` to use your private DNS resolver:

```sh
dig @10.0.0.25 AAAA www.myorg.privatecorp
```

Both `dig` commands will fail if the WARP client is disabled on your end user's device.

## Troubleshooting

Use the following troubleshooting strategies if you are running into issues while configuring your private network with Cloudflare Tunnel.

- Ensure that `cloudflared` is connected to Cloudflare by visiting **Networks** > **Tunnels** in Zero Trust.

- Ensure that `cloudflared` is running with the `quic` protocol (search for `Initial protocol quic` in its logs).

- Ensure that the machine where `cloudflared` is running is allowed to egress via UDP to port 7844 to talk out to Cloudflare.

- Ensure that end-user devices are enrolled into WARP by visiting <https://help.teams.cloudflare.com>.

- Double-check the precedence of your application policies in the Gateway Network policies tab. Ensure that a more global Block or Allow policy will not supersede the application policies.

- Check the Gateway Audit Logs Network tab to see whether your UDP DNS resolutions are being allowed or blocked.

- Ensure that your Private DNS resolver is available over a routable private IP address. You can check that by trying the `dig` commands on your machine running `cloudflared`.

- Check your set up by using `dig ... +tcp` to force the DNS resolution to use TCP instead of UDP.
