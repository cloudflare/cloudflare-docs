---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/217912538-My-DNS-doesn-t-work
title: DNS issues
---

# DNS issues

In web browsers such as Safari or Chrome, there are several commonly observable DNS errors:

-   `This site can’t be reached`
-   `This webpage is not available`
-   `err_name_not_resolved`
-   `Can't find the server`
-   [`Error 1001 DNS resolution error`](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/#error-1001-dns-resolution-error)

## Common causes and resolutions

Below are the most common causes for DNS resolution errors along with suggested solutions.

### Mistyped domain or subdomain

Verify that the domain or subdomain was correctly spelled in the request URL.

### Missing DNS records

Ensure that you have the necessary DNS records in the **DNS** app of your Cloudflare dashboard. This includes having the following records:

-   The [zone apex](/dns/manage-dns-records/how-to/create-zone-apex/) (e.g., `example.com`) record.
-   Existing [subdomains](/dns/manage-dns-records/how-to/create-subdomain/) (`www.example.com`, `blog.example.com`) records.

{{<Aside type="note">}}
If you have a [partial zone setup](/dns/zone-setups/partial-setup), ensure your DNS records also exist in your authoritative nameservers.
{{</Aside>}}

### DNSSEC was not disabled before the domain was added to Cloudflare

DNS resolution failures occur if [DNSSEC is not disabled](/dns/dnssec/#disable-dnssec) at your domain provider before you add the domain to Cloudflare.

### Nameservers no longer point to Cloudflare

If you manage DNS records via the **DNS** app in Cloudflare's Dashboard and your domain stops pointing to Cloudflare's nameservers, DNS resolution will stop functioning.

This can occur if your domain registrar switches the nameservers for your domain to point to their default nameservers. To confirm if this is the problem, [check whether your domain uses Cloudflare's nameservers](/dns/zone-setups/full-setup/setup/#verify-changes).

### Unresolved IP address

In rare cases, the DNS resolver in the client requesting the URL might fail to resolve a DNS record to a valid IP address.

Reload the page after a short wait to note if the problem disappears. This issue is unrelated to Cloudflare, but using [Cloudflare's DNS resolver](/1.1.1.1/setup/) may help. Contact your hosting provider for additional help with your current DNS resolver.
