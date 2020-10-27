---
order: 50
---

# Load balancers

| Before you start |
|---|
| 1. [Add a website to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Creating-a-Cloudflare-account-and-adding-a-website) |
| 2. [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708) |
| 3. [Enable Argo Smart Routing for your account](https://support.cloudflare.com/hc/articles/115000224552-Configuring-Argo-through-the-UI) |
| 4. [Install `cloudflared` and authenticate the software](/getting-started) |
| 5. [Create an Argo Tunnel](/create-tunnel) |
| 6. [Create a Load Balancer pool in Cloudflare](https://developers.cloudflare.com/load-balancing/create-load-balancer-ui) |

## Route traffic from the dashboard

When you create an Argo Tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created Tunnel. You can treat that subdomain as if it were an origin target in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for a DNS record or a Load Balancer pool in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.

To add an Argo Tunnel connection to a Cloudflare Load Balancer pool:

1. Navigate to the Load Balancer page in the Cloudflare dashboard.
2. Create or edit an existing Origin Pool. Add the Argo Tunnel subdomain as an Origin Address.
3. Click `Save`.

## Route traffic from the command line

You can add Argo Tunnel to an existing load Balancer pool directly from `cloudflared`. The result is the same as creation from the dashboard above.

To do so, run the following command:

```sh
$ cloudflared tunnel route lb <tunnel ID or NAME> <load balancer name> <load balancer pool>
```

**Note**: this command requires the `cert.pem` file.
