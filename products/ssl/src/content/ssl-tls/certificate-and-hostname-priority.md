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
2. **Zone specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a custom hostname certificate if the domain is active as a zone on Cloudflare.
3. **Certificate priority**: If the hostname is the same, certain types of certificates take precedence over others.

    | Priority | Certificate Type|
    | --- | --- |
    | 1 | [Custom Legacy](/edge-certificates/custom-certificates/)|
    | 2 | [Custom SNI-Only](/edge-certificates/custom-certificates/)|
    | 3 | [Custom Hostname (SSL for SaaS)](/ssl-for-saas/)|
    | 4 | [Advanced](/edge-certificates/advanced-certificate-manager) or [Dedicated](https://support.cloudflare.com/hc/articles/228009108)|
    | 5 | [Universal](/edge-certificates/universal-ssl/)|

4. **Certificate recency**: If the hostname and certificate type are the same, Cloudflare deploys the most recently issued certificate.

---

## Certificate presentation

Cloudflare uses the following order to determine the certificate and settings used during a TLS handshake:

1. **SNI match**: Certificates and settings that match the SNI hostname *exactly* take precedence.
1. **SNI wildcard match**: If there is not an exact match between the hostname and SNI hostname, Cloudflare uses certificates and settings that match an SNI wildcard.
1. **IP address**: If no SNI is presented, Cloudflare uses certificate based on the IP address (the hostname can support TLS handshakes made without SNI).

---

## Hostname priority (SSL for SaaS)

When multiple proxied DNS records exist for a zone — usually with SSL for SaaS — only one record can control the zone settings and associated origin server.

Cloudflare determines this priority in the following order (assuming each record exists and is proxied (orange-clouded)):

1. **Exact hostname match**:

    1. [New Custom Hostname](/ssl-for-saas/getting-started) (Belonging to a SaaS Provider)
    1. [Legacy Custom Hostname](/ssl-for-saas/reference/versioning) (Belonging to a SaaS Provider)
    1. [DNS](https://support.cloudflare.com/hc/articles/200169626) (Belonging to the logical DNS zone)

1. **Wildcard hostname match**:
    
    1. DNS (Belonging to the logical DNS zone)
    1. New Custom Hostname (Belonging to a SaaS Provider)

If a hostname resource record is not proxied (gray-clouded) for a zone on Cloudflare, that zone’s settings are not applied and any settings configured at the associated origin are applied instead. This origin could be another zone on Cloudflare or any other server.

### Example scenario

Customer1 uses Cloudflare for authoritative DNS for the zone `shop.example.com`. Customer2 is a SaaS provider that creates and successfully [verifies the new Custom Hostname](/ssl-for-saas/common-tasks/hostname-verification) `shop.*example.com*`. Afterward, traffic starts routing over Customer2’s zone:

- If Customer1 wants to regain control of their zone, Customer 1 contacts Customer2 and requests them to delete the Custom Hostname record. Another  possibility is to stop proxying (gray-cloud) the record.
- If Customer1 is already proxying a new Custom Hostname for `www.example.com`, Customer2 creates and verifies `www.example.com` so traffic starts routing over Customer2’s zone. Since this new Custom Hostname is the last one validated, the new custom hostname on Customer1’s zone enters a *moved* status.
- If Customer1 is already proxying a legacy Custom Hostname for `www.example.com` and Customer2 creates and verifies a new wildcard Custom Hostname for `*.example.com`, traffic is routed to Customer1’s zone while the `www.example.com` CNAME points to Customer1.
