---
order: 3
pcx-content-type: reference
---

# Certificate and hostname priority

When a new certificate is created, Cloudflare first deploys the certificate and then serves it.

---

## Certificate deployment

For any given hostname, Cloudflare uses the following order to determine which certificate (and associated TLS settings) apply to that hostname:

1. **Hostname specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a wildcard certificate (`*.example.com`) for requests to `www.example.com`.
1. **Certificate priority**: If the hostname is the same, certain types of certificates take precedence over others.

    | Priority | Certificate Type|
    | --- | --- |
    | 1 | [Custom Legacy](/edge-certificates/custom-certificates/)|
    | 2 | [Custom SNI-Only](/edge-certificates/custom-certificates/)|
    | 3 | [Custom Hostname (SSL for SaaS)](/ssl-for-saas/)|
    | 4 | [Advanced](/edge-certificates/advanced-certificate-manager) or [Dedicated](https://support.cloudflare.com/hc/articles/228009108)|
    | 5 | [Universal](/edge-certificates/universal-ssl/)|

1. **Certificate recency**: If the hostname and certificate type are the same, Cloudflare deploys the most recently issued certificate.

---

## Certificate presentation

Cloudflare uses the following order to determine the certificate and settings used during a TLS handshake:

1. **SNI match**: Certificates and settings that match the SNI hostname *exactly* take precedence.
1. **SNI wildcard match**: If there is not an exact match between the hostname and SNI hostname, Cloudflare uses certificates and settings that match an SNI wildcard.
1. **IP address**: If no SNI is presented, Cloudflare uses certificate based on the IP address (the hostname can support TLS handshakes made without SNI).

### Hostname priority

Hostname matching at Cloudflare’s edge follows DNS convention: a hostname always matches an exact resource record (RR) before a wildcard RR. This means that for a zone file for a Cloudflare zone that contains a RR that is an exact hostname match and a RR that is a wildcard match, Cloudflare’s edge will always apply the zone settings and origin for the exact match.

Additionally, a Cloudflare zone using the SSL for SaaS product (a SaaS provider) may create Custom Hostnames. These are hostnames not belonging to the zone configured to use the SSL for SaaS product. For example, a zone, *saasprovider.com*, is configured to use the SSL for SaaS product and creates a Custom Hostname for *example.com*. Custom Hostnames allow a SaaS provider to order certificates and manage some settings for the Custom Hostname, whose content is ultimately provided and served by the SaaS provider.

The following describes how Cloudflare routes the traffic for a specific hostname, assuming each exists and is proxied (orange-clouded).

Exact hostname match

* New Custom Hostname (Belonging to a SaaS Provider)
* Legacy Custom Hostname (Belonging to a SaaS Provider)
* DNS (Belonging to the logical DNS zone)

Wildcard hostname match

* DNS (Belonging to the logical DNS zone)
* New Custom Hostname (Belonging to a SaaS Provider)

Any hostname whose RR is not proxied (is grey-clouded) for a zone on Cloudflare, that zone’s settings are not applied and any settings configured at the origin for the RR are applied instead. This origin could be another zone on Cloudflare or any other server connected to the Internet.

DNS hostnames are created under the DNS section.  Traffic is proxied to Cloudflare and [DNS queries respond with Cloudflare IPs for orange clouded hostnames](https://support.cloudflare.com/hc/articles/200169626).

Legacy Custom hostnames are created under the SSL/TLS — Custom Hostname, those hostnames proxy traffic when the owner of the custom hostname CNAMEs to the Cloudflare zone.

New Custom Hostnames are created under SSL/TLS — Custom Hostname, those hostnames proxy traffic when [hostname verification](/ssl-for-saas/hostname-verification/) is completed and the custom hostname is marked active.

New Custom Hostnames that are successfully completed take priority over any other hostname routing the traffic to the Cloudflare zone where the new custom hostname is created.

Wildcard custom hostnames are similar to new Custom Hostnames, but with wildcard matching.

--------

## Example scenarios
Customer1 uses Cloudflare for authoritative DNS for the zone *shop.example.com*. Customer2 is a SaaS provider that creates and successfully verifies the new Custom Hostname shop.*example.com*. Afterward, traffic starts routing over Customer2’s zone.
- If Customer1 wants to regain control of their zone, Customer 1 contacts Customer2 and requests them to delete the Custom Hostname record. Another  possibility is to grey-cloud the record.
- If Customer1 is already proxying a new Custom Hostname for *www.example.com*, Customer2 creates and verifies *www.example.com* so traffic starts routing over Customer2’s zone.  Since this new Custom Hostname is the last one validated, the new custom hostname on Customer1’s zone enters a *moved* status.
- If Customer1 is already proxying a legacy Custom Hostname for *www.example.com* and Customer2 creates and verifies a new wildcard Custom Hostname for _*.example.com_, traffic is routed to Customer1’s zone while the _www.example.com_ CNAME points to Customer1.
