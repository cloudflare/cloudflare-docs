---
pcx_content_type: reference
title: Certificate and hostname priority
weight: 4
meta:
    description: Learn about how Cloudflare decides which certificate (and the associated SSL/TLS settings) apply to individual hostnames.
---

# Certificate and hostname priority

When a new certificate is created, Cloudflare first deploys the certificate and then serves it.

---

## Certificate deployment

For any given hostname, Cloudflare uses the following order to determine which certificate (and associated TLS settings) to apply to that hostname:

1.  **Hostname specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a wildcard certificate (`*.example.com`) for requests to `www.example.com`.

2.  **Zone specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a custom hostname certificate if the domain is active as a zone on Cloudflare.

3.  **Certificate priority**: If the hostname is the same, certain types of certificates take precedence over others.

    | Priority | Certificate Type                                                 |
    | -------- | ---------------------------------------------------------------- |
    | 1        | [Keyless SSL](/ssl/keyless-ssl/)                                 |
    | 2        | [Custom Legacy](/ssl/edge-certificates/custom-certificates/)     |
    | 3        | [Custom Modern](/ssl/edge-certificates/custom-certificates/)     |
    | 4        | [Custom Hostname (Cloudflare for SaaS)](/cloudflare-for-platforms/cloudflare-for-saas/) |
    | 5        | [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) |
    | 6        | [Advanced - Total TLS](/ssl/edge-certificates/additional-options/total-tls/) |
    | 7        | [Universal](/ssl/edge-certificates/universal-ssl/)               |

4.  **Certificate recency**: If the hostname and certificate type are the same, Cloudflare deploys the most recently issued or renewed certificate.

{{<Aside type="warning">}}

When you [issue a custom hostname certificate](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) with wildcards enabled, any cipher suites or Minimum TLS settings applied to that hostname will only apply to the direct hostname.

However, if you want to update the Minimum TLS settings for all wildcard hostnames, you can change the [zone-level Minimum TLS version](/ssl/edge-certificates/additional-options/minimum-tls/).

{{</Aside>}}

---

## Certificate presentation

Cloudflare uses the following order to determine the certificate and settings used during a TLS handshake:

1.  **SNI match**: Certificates and settings that match the SNI hostname _exactly_ take precedence.
2.  **SNI wildcard match**: If there is not an exact match between the hostname and SNI hostname, Cloudflare uses certificates and settings that match an SNI wildcard.
3.  **IP address**: If no SNI is presented, Cloudflare uses certificate based on the IP address (the hostname can support TLS handshakes made without SNI).

---

## Hostname priority (SSL for SaaS)

When multiple proxied DNS records exist for a zone — usually with SSL for SaaS — only one record can control the zone settings and associated origin server.

Cloudflare determines this priority in the following order (assuming each record exists and is proxied (orange-clouded)):

1.  **Exact hostname match**:

    1.  [New Custom Hostname](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) (Belonging to a SaaS Provider)
    2.  [Legacy Custom Hostname](/cloudflare-for-platforms/cloudflare-for-saas/reference/versioning/) (Belonging to a SaaS Provider)
    3.  [DNS](/dns/manage-dns-records/reference/proxied-dns-records/) (Belonging to the logical DNS zone)

2.  **Wildcard hostname match**:

    1.  DNS (Belonging to the logical DNS zone)
    2.  New Custom Hostname (Belonging to a SaaS Provider)

If a hostname resource record is not proxied (gray-clouded) for a zone on Cloudflare, that zone’s settings are not applied and any settings configured at the associated origin are applied instead. This origin could be another zone on Cloudflare or any other server.

### Example scenarios

#### Scenario 1

Customer1 uses Cloudflare for authoritative DNS for the zone `shop.example.com`. Customer2 is a SaaS provider that creates and successfully [verifies the new Custom Hostname](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/) `shop.*example.com*`. Afterward, traffic starts routing over Customer2’s zone:

- If Customer1 wants to regain control of their zone, Customer 1 contacts Customer2 and requests them to delete the Custom Hostname record. Another possibility is to stop proxying (gray-cloud) the record.
- If Customer1 is already proxying a new Custom Hostname for `www.example.com`, Customer2 creates and verifies `www.example.com` so traffic starts routing over Customer2’s zone. Since this new Custom Hostname is the last one validated, the new custom hostname on Customer1’s zone enters a _moved_ status.
- If Customer1 is already proxying a legacy Custom Hostname for `www.example.com` and Customer2 creates and verifies a new wildcard Custom Hostname for `*.example.com`, traffic is routed to Customer1’s zone while the `www.example.com` CNAME points to Customer1.

#### Scenario 2

A customer has a [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) DNS record for their domain. The customer's zone on Cloudflare is using a Free plan.

This customer is also using a SaaS provider that utilizes Cloudflare for SaaS. The SaaS provider is using a Cloudflare Enterprise plan.

If the SaaS provider is using a wildcard custom hostname, then the original customer's plan limits will take precedence over the SaaS provider's plan limits (Cloudflare will treat the zone as a Free zone). To apply the Enterprise limits through Cloudflare for SaaS, the original customer's zone would need to either use a [DNS-only](/dns/manage-dns-records/reference/proxied-dns-records/) record or the SaaS provider would need to use an exact hostname match.
