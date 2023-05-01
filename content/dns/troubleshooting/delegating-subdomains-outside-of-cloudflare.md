---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021357131-Delegating-Subdomains-Outside-of-Cloudflare
title: Delegating Subdomains Outside of Cloudflare
---

# Delegating Subdomains Outside of Cloudflare



## Overview

Subdomain delegation allows different individuals, teams, or organizations to manage different subdomains of a site.

{{<Aside type="note">}}
DNS delegation is not possible for Cloudflare domains using a [partial
setup](/dns/zone-setups/partial-setup).
{{</Aside>}}

For instance, consider _example.com_ as a Cloudflare domain with _www.example.com_ managed in Cloudflare’s **DNS** app and _internal.example.com_ delegated to nameservers outside of Cloudflare. In this example, _internal.example.com_ can now be managed by individuals who do not have access to Cloudflare credentials for the _example.com_ domain.

{{<Aside type="warning">}}
Cloudflare's CDN and security services are not applied to delegated
subdomains.
{{</Aside>}}

___

## Delegate a subdomain

To delegate a subdomain such as _internal.example.com_, tell DNS resolvers where to find the zone file:

1\. Log in to the Cloudflare dashboard and select your account.

2\. Select the domain that contains the subdomain to be delegated.

3\. Go to **DNS**.

4\. Create _NS records_ for the subdomain. For example:

-   `internal.example.com NS ns1.externalhost.com`
-   `internal.example.com NS ns2.externalhost.com`
-   `internal.example.com NS ns3.externalhost.com`

{{<Aside type="note">}}
*A records* for the subdomain are only required as glue records for
nameservers that are located in the subdomain of the current zone that
is being delegated.
{{</Aside>}}

5\. (Optional) If the delegated nameserver has DNSSEC enabled, add the _DS record_ in the Cloudflare **DNS** app.

___

## Related Resources

-   [Managing DNS records in Cloudflare](/dns/manage-dns-records/how-to/create-dns-records)
-   [Understanding a CNAME setup](/dns/zone-setups/partial-setup)
-   [Glue Records](https://www.ietf.org/rfc/rfc1912.txt) (RFC 1912 Section 2.3)
