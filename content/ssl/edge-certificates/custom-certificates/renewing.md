---
pcx_content_type: reference
title: Renewal and expiration
weight: 3
meta:
    description: Learn how renewal and expiration work when using Cloudflare Custom SSL certificates.
---

# Renewal and expiration

## Renew custom certificates

Since Cloudflare cannot renew uploaded certificates, you should ensure that you replace an expiring custom certificate before it expires, otherwise your visitors may not be able to connect.

{{<Aside type="note">}}
When renewing a custom certificate, we don't expect any downtime. We make sure the certification transition will happen tranparently. 
{{</Aside>}}

Cloudflare automatically sends email notifications 30 and 14 days before your custom certificate expires. The email is sent to users who have the SSL/TLS, Administrator, or Super Administrator [roles](/fundamentals/account-and-billing/members/roles/).

{{<Aside type="note">}}
When renewing a custom certificate, you can reuse a [previously generated CSR](/ssl/edge-certificates/additional-options/certificate-signing-requests/).
{{</Aside>}}

## Expired certificates

If a valid replacement - covering some or all of the [SANs](/fundamentals/glossary/#subject-alternative-name-san) in the expiring custom certificate - is already available, Cloudflare will remove the expiring custom certificate in the 24 hours before expiration.

If no valid replacement is available, Cloudflare will remove the custom certificate after it expires.

Affected domains and subdomains will fall back to any other active certificate covering the hostnames on the expiring certificate.
