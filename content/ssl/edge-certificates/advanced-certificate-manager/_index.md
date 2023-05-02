---
pcx_content_type: concept
title: Advanced certificates
weight: 2
layout: single
---

# Advanced certificates

Advanced certificates offers a flexible and customizable way to issue and manage certificates.

{{<render file="_acm-definition.md">}}
<br/>

## Features

Advanced certificates allow you multiple customization options:

*   Include the zone apex and up to 50 hosts as covered hostnames.
*   Cover more than one level of subdomain.
*   Choose the certificate authority (CA) to issue the certificate.
*   Select the preferred validation method (HTTP, TXT, or Email).
*   Choose the certificate validity period (14, 30, or 90 days).
*   Remove Cloudflare branding that is normally present on Universal certificates.
*   Select a [custom trust store](/ssl/origin-configuration/custom-origin-trust-store/) for origin authentication.
*   Control [cipher suites used for TLS](/ssl/reference/cipher-suites/customize-cipher-suites/).


{{<feature-table id="ssl.advanced_certificates">}}

{{<Aside type="note">}}

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 edge certificates per zone.

{{</Aside>}}

## Availability

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Limitations

Advanced Certificate Manager cannot be used with [Cloudflare Pages](/pages/) due to [certificate prioritization](/ssl/reference/certificate-and-hostname-priority/). This is because Pages uses Cloudflare for SaaS for Custom Domains.

{{<render file="_validation-level-intro.md" withParameters="Advanced ceritificates">}}. If your organization needs Organization Validated (OV) or Extended Validation (EV) certificates, refer to [Custom certificates](/ssl/edge-certificates/custom-certificates/).
<br/>

## Related resources

{{<directory-listing>}}
