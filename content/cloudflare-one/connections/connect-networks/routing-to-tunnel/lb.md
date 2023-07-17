---
pcx_content_type: concept
title: Load balancers
weight: 51
---

# Load balancers

When you create a tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created tunnel. You can treat `UUID.cfargotunnel.com` as if it were an origin target in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for a DNS record or a Load Balancer pool in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.

## Add a tunnel to a load balancer pool

{{<tabs labels="Dashboard | CLI">}}
{{<tab label="dashboard" no-code="true">}}

To create or edit a Cloudflare Load Balancer pool, refer to the [load balancer documentation](/load-balancing/how-to/create-load-balancer/). When adding an origin server address, enter the subdomain of your tunnel (`UUID.cfargotunnel.com`).

If you want to add a [monitor](/load-balancing/understand-basics/monitors/) to your load balancer pool, you will need to add a host header to **Advanced health check settings**. The header will be similar to `Header Name: Host` and `Value: www.your-zone.com`. The monitor will not work without the host header if you are using a config file that defines the `ingress` field, as shown in [this example](https://github.com/cloudflare/argo-tunnel-examples/blob/adb44da43ec0aa65f7928613b762a47ae0d9b2b0/named-tunnel-k8s/cloudflared.yaml#L90).
{{</tab>}}

{{<tab label="cli" no-code="true">}}

You can add Cloudflare Tunnel to an existing load balancer pool directly from `cloudflared`:

```sh
$ cloudflared tunnel route lb <tunnel name/uuid> <hostname> <load balancer pool>
```

* `<hostname>`: the DNS hostname of the load balancer, for example `lb.example.com`.

* `<load balancer pool>`: the name of the [pool](/load-balancing/how-to/create-pool/#create-a-pool) that will contain the tunnel subdomain.

This command creates an LB DNS record that points the specified hostname to the subdomain of your tunnel (`UUID.cfargotunnel.com`). Traffic will not be proxied unless the tunnel is running.

{{<Aside type="note">}}
In order to create DNS records using `cloudflared`, the [`cert.pem`](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-useful-terms/#certpem) file must be installed on your system.
{{</Aside>}}

{{</tab>}}

{{</tabs>}}

## Optional Cloudflare settings

The application will default to the Cloudflare settings for the load balancer hostname, including [cache rules](/cache/how-to/cache-rules/) and [firewall policies](/firewall/). You can changes the settings for your hostname in the [Cloudflare dashboard](https://dash.cloudflare.com/).

## Known limitations

### Monitors and TCP Tunnel origins

If you have a tunnel to a port or SSH port, do not run a TCP health check.

Instead, set up a health check endpoint in `cloudflared` — for example, an [ingress entry rule](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/ingress/) that returns a fixed HTTP status response — and create an **HTTP** [monitor](/load-balancing/understand-basics/monitors/) for that endpoint. The monitor will only verify that your server is reachable. It does not check whether the server is running and accepting requests.

### Session affinity and replicas

The load balancer does not distinguish between [replicas](/cloudflare-one/connections/connect-networks/install-and-setup/deploy-cloudflared-replicas/) of the same tunnel. If you run the same tunnel UUID on two separate hosts, the load balancer treats both hosts as a single origin server. To maintain [session affinity](/load-balancing/understand-basics/session-affinity/) between a client and a particular host, you will need to connect each host to Cloudflare using a different tunnel UUID.

### Local connection preference

If you notice traffic imbalances across origin servers in different locations, you may have to adjust your load balancer setup.

`cloudflared` connections give preference to tunnels that terminate in the same Cloudflare data center. This behavior can impact how connections are weighted and traffic is distributed.

The solution depends on the type of tunnel being used. If running [legacy tunnels](/cloudflare-one/connections/connect-networks/do-more-with-tunnels/migrate-legacy-tunnels/), put your origins in different pools. If running [Cloudflare tunnel replicas](/cloudflare-one/connections/connect-networks/install-and-setup/deploy-cloudflared-replicas/) (using a shared ID), switch to separate Cloudflare tunnels as distinct origins.
