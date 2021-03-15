---
order: 50
---

# Load balancers

| Before you start |
|---|
| 1. [Create an Argo Tunnel](/connections/connect-apps/create-tunnel) |
| 2. [Configure the Tunnel](/connections/connect-apps/configuration) |
| 3. [Create a Load Balancer pool in Cloudflare](https://developers.cloudflare.com/load-balancing/create-load-balancer-ui) |

## Route traffic from the dashboard

When you create an Argo Tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created Tunnel. You can treat that subdomain as if it were an origin target in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for a DNS record or a Load Balancer pool in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.

To add an Argo Tunnel connection to a Cloudflare Load Balancer pool:

1. Navigate to the Load Balancer page in the Cloudflare dashboard.
2. Create or edit an existing Origin Pool. Add the Argo Tunnel subdomain as an Origin Address.
3. Click **Save**.

## Route traffic from the command line

You can add Argo Tunnel to an existing load Balancer pool directly from `cloudflared`. The result is the same as creation from the dashboard above.

To do so, run the following command:

```sh
$ cloudflared tunnel route lb <tunnel ID or NAME> <load balancer name> <load balancer pool>
```

**Note**: this command requires the `cert.pem` file.

## Optional: Configure additional Cloudflare settings

The application will default to the Cloudflare settings of the hostname in your account that includes the Argo Tunnel Load Balancer records, including [cache rules](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache) and [firewall policies](https://developers.cloudflare.com/firewall/). You can changes these settings for your hostname in Cloudflare's dashboard.