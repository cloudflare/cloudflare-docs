---
pcx_content_type: faq
title: General
weight: 3
meta:
    description: Review frequently asked questions about Cloudflare Zero Trust.
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

Cloudflare Zero Trust can be used with the Data Localization Suite to ensure that traffic is only inspected in the regions you choose. For more information refer to [Use Zero Trust with Data Localization Suite](/data-localization/how-to/zero-trust/).

## What data is visible to my company through Zero Trust?

When you enroll a device in Cloudflare Zero Trust, your company has access to certain information about your device and Internet browsing history. This article describes the types of data that your company can collect using the Cloudflare WARP software and Cloudflare One Agent app. For information about how your company uses the data, refer to your company's Acceptable Use Policy and Employee Privacy Policy,

### If I have a work profile on my Android mobile device, does the Cloudflare One Agent app only see work profile traffic or all traffic from the device?
Cloudflare One Agent (aka WARP) only sees traffic from your work profile.

If you do not have a work profile configured, all traffic is visible to WARP.