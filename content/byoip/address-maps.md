---
title: Address Maps
pcx_content_type: concept
weight: 5
---

# IP Address Maps

The {{<glossary-tooltip term_id="address map">}}address map{{</glossary-tooltip>}} is a data structure enabling customers with BYOIP prefixes or account-level Static IPs to specify which IP addresses should be mapped to a zone’s DNS records when they are proxied through Cloudflare.

For an address map to take effect, DNS records within the mapped zone must be set to proxied or orange-clouded. When a zone is proxied, [Cloudflare authoritative DNS](/dns/manage-dns-records/how-to/create-dns-records/) will respond with the address(es) on the address map. Address maps do not change how Cloudflare reaches the configured origin, the IP addresses under Records on the zone-level DNS tab continue to instruct Cloudflare how to reach the origin.

Creating an address map does not automatically change DNS configuration. DNS Responses only begin to change when a zone or account is added to a map. Additionally, address maps that are not yet enabled will not take effect in DNS responses.

{{<Aside type="note">}}
IPv4 and IPv6 addresses are both supported.
{{</Aside>}}

If you do not have BYOIP or static IPs and you want to use Address Maps, contact your account manager to purchase static IPs or bring your own IP addresses to Cloudflare.

## How to use Address Maps

For domains using Cloudflare authoritative DNS, we typically respond to DNS queries with [Cloudflare anycast IPs](/fundamentals/concepts/cloudflare-ip-addresses/). If you [customize the IPs Cloudflare uses](/fundamentals/concepts/cloudflare-ip-addresses/#customize-cloudflare-ip-addresses), by leasing static Cloudflare IPs or bringing your own IPs (BYOIP), use Address Maps to specify which IPs to return for which hostnames.

| Leased static IPs | BYOIPs |
| --- | --- |
| <div style="width:350px">Use a set of specifically assigned Cloudflare IPs to ensure they do not change. Cloudflare creates an address map with your static IPs that you may edit. You cannot create another map using your static IPs.</div> | <div style="width:350px">Use your IPs by bringing an address space you lease/own and creating an address map.</div> |

### Create address maps

To avoid any errors if you have a static IP, Cloudflare has already created an address map where you can instead add or edit your domains. You do not need to create a new address map if you have a static IP. 

Refer to [Static IPs](#static-ips) for more information.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **Address Maps**.
3. Select **Create an address map**.
4. Choose the scope of the address map.
5. Add the domains and IP addresses that you want to map.
6. Name your address map.
7. Review the information and select **Save and Deploy**.

### Manage address maps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **Address Maps**.
3. Go to your address map and select **Review**.
4. Edit your address map.
5. Review the information and select **Save**.

{{<Aside type="note">}}
You can also enable, disable, and delete address maps. This will likely change the IP addresses used for your zones.
{{</Aside>}}

## Immutable address maps

Some customers may only proxy zones through BYOIP addresses, and are prohibited from using Cloudflare IP addresses for proxied DNS names. In this case, Cloudflare will create an immutable, account-wide address map to ensure all zones in your account receive BYOIP addresses as a fallback. These address maps cannot be deleted.

It is still possible to create more specific zone-level address maps with specific BYOIPs, but DNS will fall back to the account-wide address map without one.

To specify different addresses for certain zones, [create a new address map](#create-address-maps).

## Static IPs

Static IPs are allocated to the account, but can be assigned to a single zone. This means that you can place multiple zones on the same static IPs. You can also specify which zones are mapped to your static IPs and control when the IPs in your zones change. 

If you need to allowlist your IPs or to communicate your IPs to third parties, allocating static IPs to your account allows you to know them ahead of time.

`- INFO TO BE VERIFIED -`

If you have a static IP, Cloudflare creates an address map which you can edit and add zones to. You cannot create a new address map using the static IP assigned to your account.

### Availability

Static IPs are available as an add-on purchase for Enterprise plans.