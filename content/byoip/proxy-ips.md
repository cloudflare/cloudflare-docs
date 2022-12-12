---
title: Proxy IPs
pcx_content_type: concept
weight: 6
---

# Proxy IPs

The Address Map is a data structure which enables customers with BYOIP prefixes or account-level Static IPs to specify which IP addresses should be mapped to a zone when they are proxied on Cloudflare.

The zone must also be proxied or orange-clouded. When a zone is proxied, [Cloudflare authoritative DNS](/dns/manage-dns-records/how-to/create-dns-records/) will respond with the address on the Address Map. The IP addresses under Records on the zone-level DNS tab will tell Cloudflare how to get to the origin.

Creating an Address Map does not automatically change DNS configuration. DNS Responses only begin to change when a zone or account is added to a map.

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

Some customers may only use BYOIP and are prohibited from using Cloudflare IP addresses. In this case, Cloudflare will create an immutable, account-wide Address Map to ensure all zones in your account receive BYOIP addresses. These Address Maps cannot be deleted.

To specify different addresses for certain zones, [create a new Address Map](#create-address-maps).
