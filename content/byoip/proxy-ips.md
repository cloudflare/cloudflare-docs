---
title: Proxy IPs
pcx_content_type: concept
weight: 5
---

# Proxy IPs

The {{<glossary-tooltip term_id="address map">}}address map{{</glossary-tooltip>}} is a data structure enabling customers with BYOIP prefixes or account-level Static IPs to specify which IP addresses should be mapped to a zone's DNS records when they are proxied through Cloudflare.

For an address map to take effect, DNS records within the mapped zone must be set to proxied or orange-clouded. When a zone is proxied, [Cloudflare authoritative DNS](/dns/manage-dns-records/how-to/create-dns-records/) will respond with the address(es) on the address map. Address maps do not change how Cloudflare reaches the configured origin, the IP addresses under Records on the zone-level DNS tab continue to instruct Cloudflare how to reach the origin.

Creating an address map does not automatically change DNS configuration. DNS Responses only begin to change when a zone or account is added to a map.  Additionally, address maps that are not yet **Enabled** will not take effect in DNS responses.

{{<Aside type="note">}}
IPv4 and IPv6 addresses are both supported.
{{</Aside>}}

## Create address maps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **Proxy IP Addresses**.
3. Select **Create an address map** and fill out the form.
4. Select **Save and Deploy**.

## Manage address maps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **Proxy IP Addresses**.
3. Go to your address map and select **Review**.
4. Edit your address map.
5. Select **Save**.

{{<Aside type="note">}}
You can also enable, disable, and delete address maps. This will likely change the IP addresses used for your zones.
{{</Aside>}}

## Immutable address maps

Some customers may only proxy zones through BYOIP addresses, and are prohibited from using Cloudflare IP addresses for proxied DNS names. In this case, Cloudflare will create an immutable, account-wide address map to ensure all zones in your account receive BYOIP addresses as a fallback. These address maps cannot be deleted. 

It is still possible to create more specific zone-level address maps with specific BYOIPs, but DNS will fall back to the account-wide address map without one.

To specify different addresses for certain zones, [create a new address map](#create-address-maps).
