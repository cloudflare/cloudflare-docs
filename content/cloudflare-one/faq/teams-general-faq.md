---
pcx_content_type: faq
title: General
weight: 3
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# General

## What is the difference between Cloudflare Gateway and 1.1.1.1?

1.1.1.1 does not block any DNS query. When a browser requests for example.com, 1.1.1.1 simply looks up the answer either in cache or by performing a full recursive DNS query.

Cloudflare Gateway's DNS resolver introduces security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat, or is requesting a blocked domain configured by an administrator as part of a Gateway policy, Gateway stops it before the site could load for the user - and potentially execute code or phish that team member.

## Is multi-factor authentication supported?

Access is subjected to the MFA policies set in your identity provider. For example, users attempting to log in to an Access protected app might log in through Okta. Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

Access does not have an independent or out-of-band MFA feature.

## Which browsers are supported?

These browsers are supported:

- Internet Explorer® 11
- Edge® (current release, last release)
- Firefox® (current release, last release)
- Chrome® (current release, last release)
- Safari® (current release, last release)

## What data localization services are supported?

As part of our Regional Services, Cloudflare Zero Trust will only perform TLS decryption and store logs within the region provisioned for your account.

Services available in all [supported regions](https://support.cloudflare.com/hc/en-us/articles/360061946171-Data-Localization-Suite#h_7olRZn8DdrDsw79Rqfs05n):
 - Terminate connections for all network, HTTP, and HTTPS traffic proxied through Cloudflare Gateway.
 - Maintain local storage for all [Zero Trust logs](/cloudflare-one/analytics/logs/).

Additional services available in the United States:
- Ensure that all reverse proxy requests for applications protected by Access will only occur in FedRAMP-compliant data centers.
- [Configure Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#region) to only connect to data centers within the United States, regardless of where the software was deployed.
