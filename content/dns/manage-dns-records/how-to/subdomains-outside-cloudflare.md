---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/360021357131-Delegating-Subdomains-Outside-of-Cloudflare
title: Delegating Subdomains
---

# Delegating Subdomains Outside of Cloudflare

Subdomain delegation allows different individuals, teams, or organizations to manage different subdomains of a site.

{{<Aside type="note">}}
DNS delegation is not possible for Cloudflare domains using a [partial setup](/dns/zone-setups/partial-setup).
{{</Aside>}}

For instance, consider `example.com` as a Cloudflare domain with `www.example.com` managed in Cloudflare’s **DNS** app and `internal.example.com` delegated to nameservers outside of Cloudflare. In this example, `internal.example.com` can now be managed by individuals who do not have access to Cloudflare credentials for the `example.com` domain.

{{<Aside type="warning">}}
Cloudflare's CDN and security services are not applied to delegated subdomains.
{{</Aside>}}

## Availability

{{<feature-table id="dns.subdomain_delegation">}}

___

## Delegate a subdomain

To delegate a subdomain such as _internal.example.com_, tell DNS resolvers where to find the zone file:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select the domain that contains the subdomain to be delegated.
3. Go to **DNS** > **Records**.
4. Create `NS` records for the subdomain. For example:
    -   `internal.example.com NS ns1.externalhost.com`
    -   `internal.example.com NS ns2.externalhost.com`
    -   `internal.example.com NS ns3.externalhost.com`

    {{<Aside type="note">}}The `A` records for the subdomain are only required as glue records for nameservers that are located in the subdomain of the current zone that is being delegated.
    {{</Aside>}}

5. (Optional) If the delegated nameserver has DNSSEC enabled, [add the `DS` record](/dns/dnssec/#step-1---activate-dnssec-in-cloudflare) in Cloudflare.