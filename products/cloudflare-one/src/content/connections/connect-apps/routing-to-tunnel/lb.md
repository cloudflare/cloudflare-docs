---
order: 50
pcx-content-type: how-to
---

# Load balancers

| Before you start |
|---|
| 1. [Create a Tunnel](/connections/connect-apps/create-tunnel) |
| 2. [Configure the Tunnel](/connections/connect-apps/configuration) |
| 3. [Create a Load Balancer pool in Cloudflare](https://developers.cloudflare.com/load-balancing/create-load-balancer-ui) |

## Route traffic from the dashboard

When you create a tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created tunnel. You can treat that subdomain as if it were an origin target in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for a DNS record or a Load Balancer pool in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.

To add a Cloudflare Tunnel connection to a Cloudflare Load Balancer pool:

1. Navigate to the Load Balancer page in the Cloudflare dashboard.
2. Create or edit an existing Origin Pool. Add the tunnel subdomain as an Origin Address.
3. Click **Save**.

If you want to add a Monitor to your Cloudflare Load Balancer pool, you need to add a host header in the **Advanced Healthcheck Settings** section. The header will be similar to `Header Name: Host` and `Value: www.your-zone.com`. The Monitor will not work without the host header if you are using a config file that defines the `ingress` field like the example [cloudflared.yaml](https://github.com/cloudflare/argo-tunnel-examples/blob/adb44da43ec0aa65f7928613b762a47ae0d9b2b0/named-tunnel-k8s/cloudflared.yaml#L90) in this repo. 

## Route traffic from the command line

You can add Cloudflare Tunnel to an existing load Balancer pool directly from `cloudflared`. The result is the same as creation from the dashboard above.

To do so, run the following command:

```sh
$ cloudflared tunnel route lb <tunnel ID or NAME> <load balancer name> <load balancer pool>
```

**Note**: this command requires the `cert.pem` file.

## Optional: Configure additional Cloudflare settings

The application will default to the Cloudflare settings of the hostname in your account that includes the Cloudflare Tunnel Load Balancer records, including [cache rules](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache) and [firewall policies](https://developers.cloudflare.com/firewall/). You can changes these settings for your hostname in Cloudflare's dashboard.

## Known limitations

### Monitors and TCP Tunnel origins

If you have a tunnel to a port or ssh port, you **should not** run a TCP health check.

Instead, set up a health check endpoint in `cloudflared` — for example, an [ingress entry rule](/connections/connect-apps/configuration/configuration-file/ingress) that returns a fixed http status response — and create an **HTTP** [monitor](https://developers.cloudflare.com/load-balancing/understand-basics/monitors) for that endpoint. This monitor will only verify that your server is reachable, **not** whether it is up and can accept requests.

### Named Tunnels and replicas

A load balancer maintains [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity) by treating an entire Named Tunnel as an origin server, meaning that it does not distinguish between Named Tunnels [running as replicas](/connections/connect-apps/run-tunnel/deploy-cloudflared-replicas). 

To maintain session affinity for individual service instances running behind tunnel replicas, use different Named Tunnel IDs.

### Local connection preference

If you notice traffic imbalances across origin servers in different locations, you may have to adjust your load balancer setup. 

`cloudflared` connections give preference to tunnels that terminate in the same data center (local connections). This behavior can impact how connections are weighted and traffic is distributed.

The solution depends on the type of tunnel being used. If running Classic Tunnels, put your origins in different pools. If running [Named Tunnels replicas](/connections/connect-apps/run-tunnel/deploy-cloudflared-replicas) (using a shared ID), switch to separate Named Tunnels as distinct origins.