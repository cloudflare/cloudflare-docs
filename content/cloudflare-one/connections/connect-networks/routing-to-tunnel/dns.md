---
pcx_content_type: how-to
title: DNS records
weight: 51
---

# Manage DNS records

{{<render file="tunnel/_dns-record.md" productFolder="cloudflare-one">}}

## Create a DNS record for the tunnel

{{<tabs labels="Dashboard | CLI">}}
{{<tab label="dashboard" no-code="true">}}

To create a new DNS record for your tunnel:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **DNS** > **Records**.
3. Select **Add record**.
4. Input the following information:
    - **Type**: _CNAME_
    - **Name**: Subdomain of your application
    - **IPv4 address**: `<UUID>.cfargotunnel.com`
5. Select **Save**.

![Example of fields completed to create a new CNAME record.](/images/cloudflare-one/connections/connect-apps/dns/dns-record.png)

{{</tab>}}

{{<tab label="cli" no-code="true">}}

You can create a new DNS record directly from `cloudflared`:

```sh
$ cloudflared tunnel route dns <UUID or NAME> www.app.com
```

This command create a `CNAME` record that points to the tunnel subdomain, but will not proxy traffic if the tunnel is not currently running.

{{<Aside type="note">}}
To create DNS records using `cloudflared`, the [`cert.pem`](/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#certpem) file must be installed on your system.
{{</Aside>}}

{{</tab>}}

{{</tabs>}}

The DNS record is distinct from the state of the tunnel. You can create DNS records that point to a tunnel that is not currently running. If the tunnel stops running, the DNS record will not be deleted. If you point the DNS record to a tunnel not currently running, visitors will see a `1016` error message.

Additionally, you can create multiple DNS records that point to the same tunnel subdomain. If you are routing traffic from multiple hostnames to multiple services, you will need to create a `CNAME` entry for each hostname. The CNAME entries will share the same target.

## Optional Cloudflare settings

The application will default to the Cloudflare settings of the hostname in your account that includes the Cloudflare Tunnel DNS record, including [cache rules](/cache/how-to/cache-rules/) and [firewall policies](/firewall/). You can changes these settings for your hostname in Cloudflare's dashboard.
