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

As part of [Regional Services](https://support.cloudflare.com/hc/en-us/articles/360061946171-Data-Localization-Suite#h_7olRZn8DdrDsw79Rqfs05n), Cloudflare Zero Trust will only perform TLS decryption and store Logpush data within the region provisioned for your account.

### Traffic scope

Regional Services apply to all HTTPS traffic proxied through our Access, Gateway, Cloudflare Tunnel and WARP products. Additionally, you can [configure Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#region) to only connect to data centers within the United States, regardless of where the tunnel was deployed.

### Logs scope

Regional Services apply to the following types of [Zero Trust logs](/cloudflare-one/analytics/logs/):
- Gateway activity logs:

    - DNS logs
    - Network logs
    - HTTP logs for HTTPS requests
- Access audit logs:

    - Authentication audit logs
    - Pre-request audit logs
- Tunnel audit logs

Logs are delivered from memory and never stored on disk.
