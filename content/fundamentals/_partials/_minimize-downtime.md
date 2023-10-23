---
_build:
  publishResources: false
  render: never
  list: never
---

When making any change to the routing of an Internet application, there is always a possibility of downtime due to certificate issuance, misconfigured settings, or limitations at your origin server. To avoid downtime when going live, it's important to review the most common configurations. 

{{<tutorial>}}
{{<tutorial-step title="Update and review DNS records.">}}

Before activating your domain on Cloudflare (exact steps depend on your [DNS setup](/dns/zone-setups/)), review the DNS records in your Cloudflare account.

### Start with unproxied records

With a new domain, make sure all your DNS records have a [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) of **DNS-only**. 

This setting prevents Cloudflare from proxying your traffic before you have an active edge certificate or before you have allowed Cloudflare IP addresses.

### Confirm record accuracy

Take extra time to confirm the accuracy of your DNS records before activating your domain, paying special attention to:

- [Zone apex records (`example.com`)](/dns/manage-dns-records/how-to/create-zone-apex/)
- [Subdomain records (`www.example.com` or `blog.example.com`)](/dns/manage-dns-records/how-to/create-subdomain/)
- [Email records](/dns/manage-dns-records/how-to/email-records/)

If you add DNS records to your authoritative DNS provider between onboarding your domain and activating your domain, you may need to also add these records within Cloudflare.

{{</tutorial-step>}}

{{<tutorial-step title="Activate your domain.">}}

Finish the [DNS setup](/dns/zone-setups/) for your domain, moving the [domain status](/dns/zone-setups/reference/domain-status/) to **Active**:

- [Full setups](/dns/zone-setups/full-setup/setup/): Update the authoritative nameservers at your registrar and wait for that change to be authenticated.
- [Partial setups](/dns/zone-setups/partial-setup/setup/): Add the verification TXT record to your authoritative DNS and wait for that change to be authenticated.

{{</tutorial-step>}}

{{<tutorial-step title="Verify SSL/TLS edge certificates.">}}

Before proxying your traffic through Cloudflare, [verify](/ssl/reference/certificate-statuses/#monitor-certificate-statuses) that Cloudflare has an active **Edge Certificate** for your domain.

For more details about timing and certificate recommendations, refer to [Certificate issuance](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup).

{{</tutorial-step>}}

{{<tutorial-step title="Test configuration." optional=true >}}

You may want to test your configuration using your local machine or proxying traffic from a development domain or subdomain.

If you experience issues, you should make sure that you have [allowed Cloudflare IP addresses](/fundamentals/setup/allow-cloudflare-ip-addresses/) at your origin server.

{{</tutorial-step>}}

{{<tutorial-step title="sadfsdUpdate proxy status." >}}

Once you have verified that your SSL/TLS edge certificate is active and you have allowed Cloudflare IP addresses, change the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) of appropriate DNS records to **Proxied**.

{{</tutorial-step>}}

{{</tutorial>}}