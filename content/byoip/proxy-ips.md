---
title: Proxy IPs
pcx_content_type: concept
weight: 6
---

# Proxy IPs

The Address Map is a data structure enabling customers with BYOIP prefixes or account-level Static IPs to specify which IP addresses should be mapped to a zone's DNS records when they are proxied through Cloudflare.

For an Address Map to take effect, DNS records within the mapped zone must be set to proxied or orange-clouded. When a zone is proxied, [Cloudflare authoritative DNS](/dns/manage-dns-records/how-to/create-dns-records/) will respond with the address(es) on the Address Map. Address Maps do not change how Cloudflare reaches the configured origin, the IP addresses under Records on the zone-level DNS tab continue to instruct Cloudflare how to reach the origin.

Creating an Address Map does not automatically change DNS configuration. DNS Responses only begin to change when a zone or account is added to a map.  Additionally, Address Maps that are not yet **Enabled** will not take effect in DNS responses.

{{<Aside type="note">}}

IPv4 and IPv6 addresses are both supported.

{{</Aside>}}

## Create Address Maps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **IP Addresses** > **Proxy IP Addresses**.
3. Select **Create an Address Map** and fill out the form.
4. Select **Save and Deploy**.

## Manage Address Maps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **IP Addresses** > **Proxy IP Addresses**.
3. Navigate to your Address Map and select **Review**.
4. Edit your Address Map.
5. Select **Save**.

{{<Aside type="note">}}

You can also enable, disable, and delete Address Maps. This will likely change the IP addresses used for your zones.

{{</Aside>}}

## Immutable Address Maps

Some customers may only proxy zones through BYOIP addresses, and are prohibited from using Cloudflare IP addresses for proxied DNS names. In this case, Cloudflare will create an immutable, account-wide Address Map to ensure all zones in your account receive BYOIP addresses as a fallback. These Address Maps cannot be deleted. 

It is still possible to create more specific zone-level Address Maps with specific BYOIPs, but DNS will fall back to the account-wide Address Map without one.

To specify different addresses for certain zones, [create a new Address Map](#create-address-maps).
