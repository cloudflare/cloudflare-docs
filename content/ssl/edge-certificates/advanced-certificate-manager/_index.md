---
pcx_content_type: concept
title: Advanced certificates
weight: 2
---

# Advanced certificates

Advanced certificates offers a flexible and customizable way to issue and manage certificates.

{{<render file="_acm-definition.md">}}

## Features

Advanced certificates allow you multiple customization options:

*   Include the zone apex and less than 50 hosts as covered hostnames.
*   Cover more than one level of subdomain.
*   Select the preferred validation method (HTTP, TXT, or Email).
*   Choose the certificate validity period (14, 30, or 90 days).
*   Choose the Certificate Authority to issue the certificate.
*   Remove Cloudflare branding that are normally present on Universal certificates.
*   Select a custom trust store for origin authentication.
*   Control [cipher suites used for TLS](/ssl/ssl-tls/cipher-suites/disable-cipher-suites/).

{{<Aside type="note">}}

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 edge certificates per zone.

{{</Aside>}}

## Related resources

*   [Manage certificates](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/)
*   [Common API commands](/ssl/edge-certificates/advanced-certificate-manager/api-commands/)
