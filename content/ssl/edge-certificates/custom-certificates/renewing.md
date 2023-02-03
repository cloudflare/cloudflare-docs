---
pcx_content_type: reference
title: Renewing
weight: 3
---

# Renewing

Uploaded Certificates cannot be renewed by Cloudflare. You must ensure that you replace an expiring certificate before it expires, otherwise your visitors may not be able to connect.

Cloudflare automatically sends email notification 30 and 14 days before your custom certificate expires. The email is sent to users who have the SSL/TLS, Administrator, or Super Administrator [roles](/fundamentals/account-and-billing/members/roles/).

{{<Aside type="note">}}
When renewing a custom certificate, you can reuse a [previously generated CSR](/ssl/edge-certificates/additional-options/certificate-signing-requests/).
{{</Aside>}}

## Expired certificates and Legacy Client Support

For custom certificates, Cloudflare will remove the certificate in the 24 hours before expiration if a valid replacement is already available. If no valid replacement is available, Cloudflare will remove the certificate 30 minutes before it expires. 

Affected domains and subdomains will fall back to any other active certificate covering the hostnames on the expiring certificate.
