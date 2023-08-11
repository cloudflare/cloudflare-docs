---
pcx_content_type: reference
title: Renewal and expiration
weight: 3
meta:
    description: Learn how renewal and expiration work when using Cloudflare Custom SSL certificates.
---

# Renewal and expiration

## Renew custom certificates

Since Cloudflare cannot renew uploaded certificates, you should ensure that you replace or [update](/ssl/edge-certificates/custom-certificates/uploading/#update-a-custom-certificate) an expiring custom certificate before it expires, otherwise your visitors may not be able to connect.

Cloudflare automatically sends email notifications 30 and 14 days before your custom certificate expires. The email is sent to users who have the SSL/TLS, Administrator, or Super Administrator [roles](/fundamentals/account-and-billing/members/roles/).

{{<Aside type="note">}}
When renewing a custom certificate, you can reuse a [previously generated CSR](/ssl/edge-certificates/additional-options/certificate-signing-requests/).

If you are on an Enterprise plan and want to renew a custom (modern) certificate, consider requesting access to [Staging environment (Beta)](/ssl/edge-certificates/staging-environment/).
{{</Aside>}}

## Expired certificates

If a valid replacement - covering some or all of the [SANs](/fundamentals/glossary/#subject-alternative-name-san) in the expiring custom certificate - is already available, Cloudflare will remove the expiring custom certificate in the 24 hours before expiration. There is no expected downtime due to certificate transition.

If no valid replacement is available, Cloudflare will remove the custom certificate after it expires.

Affected domains and subdomains will fall back to any other active certificate covering the hostnames on the expiring certificate.

## Migrate to other certificate types

If you no longer want to use your custom certificate but still want your website or application to be covered with SSL/TLS, you can do the following:

1. Go to [**SSL/TLS** > **Edge Certificates**](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates).
2. Make sure there is already an active [universal](/ssl/edge-certificates/universal-ssl/) or [advanced](/ssl/edge-certificates/advanced-certificate-manager/) certificate covering the same hostnames.
3. Delete your custom certificate.