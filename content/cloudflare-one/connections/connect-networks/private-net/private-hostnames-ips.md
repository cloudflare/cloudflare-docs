---
pcx_content_type: concept
title: Private hostnames and IPs
weight: 5
---

# Private hostnames and IPs

{{<Aside type="note" header="Traffic handling">}}

When the old replica is stopped, it will drop long-lived HTTP requests (for example, WebSocket) and TCP connections (for example, SSH). UDP flows will also be dropped, as they are modeled based on timeouts. When the new replica connects, it will handle all new traffic, including new HTTP requests, TCP connections, and UDP flows.

{{</Aside>}}

Building out a private network has two primary components: the infrastructure side and the client side.

The infrastructure side is powered by Cloudflare Tunnel, which connects your infrastructure to Cloudflare — whether that be a singular application, many applications, or an entire network segment. This is made possible by running `cloudflared` in your environment to establish multiple secure, outbound-only, load-balanced links to Cloudflare.

On the client side, your end users need to be able to easily connect to Cloudflare and, more importantly, your network. This connection is handled by Cloudflare WARP. This client can be rolled out to your entire organization in just a few minutes using your in-house MDM tooling and it establishes a secure connection from your users’ devices to the Cloudflare network.

![Diagram displaying connections between a device, WireGuard tunnel, Cloudflare Tunnel and a public cloud.](/images/cloudflare-one/connections/private-ips-diagram.png)

Follow the steps below to define your internal DNS resolver with Cloudflare Zero Trust and to resolve requests to your private network using Cloudflare Tunnel.

## Prerequisites

- Cloudflare Tunnel must be properly [configured](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/) to route traffic to a private IP space.
- `cloudflared` must be connected to Cloudflare from your target private network.
- Cloudflare WARP must be installed on end-user devices to connect your users to Cloudflare.

## Enable UDP support

To enable UDP support, [enable the Gateway proxy](/cloudflare-one/policies/gateway/proxy/#enable-the-gateway-proxy) for TCP and UDP.

## Create a Local Domain Fallback entry

Next, we need to [create a Local Domain Fallback entry](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) that points to the internal DNS resolver. The rule in the following example instructs the WARP client to resolve all requests for `myorg.privatecorp` through an internal resolver at `10.0.0.25` rather than attempting to resolve this publicly.

![Local Domain Fallback panel displaying example data.](/images/cloudflare-one/secure-origin-connections/warp-to-tunnel-internal-dns/create-local-domain-fallback.png)

{{<Aside type="note">}}

Ensure that **Split Tunnels** are configured to [include traffic to private IPs and hostnames](/cloudflare-one/connections/connect-networks/private-net/connect-private-networks/#3-route-private-network-ips-through-warp).

{{</Aside>}}

## Update `cloudflared`

Next, update your Cloudflare Tunnel configuration to ensure it is using QUIC as the default transport protocol. This will enable `cloudflared` to proxy UDP-based traffic which is required in most cases to resolve DNS queries. To do this, you can either set the `protocol: quic` property in your [configuration file](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/configuration-file/) or [pass the `–-protocol quic` flag](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/arguments/) directly through your CLI.

Finally, update to the latest available version (2021.12.3 as of the time of writing) of cloudflared running on your target private network.

![Example of terminal output after updating cloudflared to the latest version.](/images/cloudflare-one/secure-origin-connections/warp-to-tunnel-internal-dns/update-cfd.png)

You can now resolve requests through the internal DNS server you set up in your private network.

## Test the setup

For testing, run a `dig` command for the internal DNS service:

```sh
$ dig AAAA www.myorg.privatecorp
```

The `dig` will work because `myorg.privatecorp` was configured above as a fallback domain. If you skip that step, you can still force `dig` to use your private DNS resolver:

```sh
$ dig @10.0.0.25 AAAA www.myorg.privatecorp
```

Both `dig` commands will fail if the WARP client is disabled in your end user's device.

## Troubleshooting

Use the following troubleshooting strategies if you are running into issues while configuring your private network with Cloudflare Tunnel.

- Ensure that `cloudflared` is connected to Cloudflare by visiting **Access** > **Tunnels** in Zero Trust.

- Ensure that `cloudflared` is running with `quic` protocol (search for `Initial protocol quic` in its logs).

- Ensure that the machine where `cloudflared` is running is allowed to egress via UDP to port 7844 to talk out to Cloudflare.

- Ensure that end-user devices are enrolled into WARP by visiting <https://help.teams.cloudflare.com>

- Double-check the precedence of your application policies in the Gateway Network policies tab. Ensure that a more global Block or Allow policy will not supersede the application policies.

- Check the Gateway Audit Logs Network tab to see whether your UDP DNS resolutions are being allowed or blocked.

- Ensure that your Private DNS resolver is available over a routable private IP address. You can check that by trying the `dig` commands on your machine running `cloudflared`.

- Check your set up by using `dig ... +tcp` to force the DNS resolution to use TCP instead of UDP.
