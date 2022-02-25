---
order: 50
pcx-content-type: how-to
---

# DNS record

| Before you start |
|---|
| 1. [Create a Tunnel](/connections/connect-apps/create-tunnel) |
| 2. [Configure the Tunnel](/connections/connect-apps/configuration) |

## Route traffic from the Cloudflare dashboard

When you create a tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created tunnel. You can treat that subdomain as if it were an origin target in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for a DNS record in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.

### Create a DNS record

To create a DNS record for your tunnel:

1.  Log into the Cloudflare dashboard.
2.  Navigate to the **Cloudflare DNS** tab.
3.  Create a new CNAME record and input the subdomain of your tunnel into the Target field.
4.  Click **Save**.

![DNS tab](../../../static/documentation/connections/connect-apps/dns/dns-record.png)

The DNS record is distinct from the state of the tunnel. You can create DNS records that point to a tunnel that is not currently running. If the tunnel stops running, the DNS record will not be deleted. If you point the DNS record to a tunnel not currently running visitors will see a 1016 error message.

Additionally, you can create multiple DNS records that point to the same tunnel subdomain. If you are routing traffic from multiple hostnames to multiple services, you will need to create a CNAME entry for each hostname. The CNAME entries will share the same target.

### Delete a DNS record

To delete a DNS record assigned to a tunnel:

1.  Log into the Cloudflare dashboard.
2.  Navigate to DNS and locate the DNS record under the DNS management card.
3.  Click **Edit** > **Delete**.

## Route traffic from the command line

You can create DNS records from `cloudflared`, which will provision a CNAME record that points to the subdomain of a specific tunnel. The result is the same as creation from the dashboard above.

To do so, run the following command.

```sh
$ cloudflared tunnel route dns <UUID or NAME> www.app.com
```

The command will create a CNAME record that points to the tunnel subdomain, but will not proxy traffic if the tunnel is not currently running.

Note: this command requires the `cert.pem` file.

## Optional: Configure additional Cloudflare settings

The application will default to the Cloudflare settings of the hostname in your account that includes the Cloudflare Tunnel DNS record, including [cache rules](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache) and [firewall policies](https://developers.cloudflare.com/firewall/). You can changes these settings for your hostname in Cloudflare's dashboard.
