---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/217912538-My-DNS-doesn-t-work
title: My DNS doesn't work
---

# My DNS doesn't work



## Symptoms

In web browsers such as Safari or Chrome, there are several commonly observable DNS errors:

-   _This site can’t be reached_
-   _This webpage is not available_
-   _err\_name\_not\_resolved_
-   _Can't find the server_
-   [_Error 1001 DNS resolution error_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## Common causes and resolutions

Below are the most common causes for DNS resolution errors along with suggested solutions.

### Mistyped domain or subdomain

Verify that the domain or subdomain was correctly spelled in the request URL.

### Missing DNS records

Ensure that you have the necessary DNS records in the **DNS** app of your Cloudflare dashboard. This includes having the following records:

-   The root domain (e.g., _example.com_)
-   Any existing subdomains (e.g., _www.example.com, blog.example.com_, etc.)

{{<Aside type="tip">}}
If you have a [partial zone
setup](/dns/zone-setups/partial-setup),
ensure your DNS records also exist in your authoritative nameservers.
{{</Aside>}}

Learn more about setting up A and CNAME [DNS records](/dns/manage-dns-records/how-to/create-dns-records).

### DNSSEC wasn't disabled before the domain was added to Cloudflare

DNS resolution failures occur if [DNSSEC is not disabled](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269) at your domain provider before you add the domain to Cloudflare.

### Nameservers no longer point to Cloudflare

If you manage DNS records via the **DNS** app in Cloudflare's Dashboard and your domain stops pointing to Cloudflare's nameservers, DNS resolution will break.  This can occur if your domain registrar switches the nameservers for your domain to point to their default nameservers. To confirm if this is the problem, [check whether your domain uses Cloudflare's nameservers](https://support.cloudflare.com/hc/articles/4426809598605).

### Unresolved IP address

In rare cases, the DNS resolver in the client requesting the URL might fail to resolve a DNS record to a valid IP address.  Reload the page after a short wait to note if the problem disappears. This issue is unrelated to Cloudflare, but using [Cloudflare's DNS resolver](/1.1.1.1/setting-up-1.1.1.1/) may help. Contact your hosting provider for additional help with your current DNS resolver.
