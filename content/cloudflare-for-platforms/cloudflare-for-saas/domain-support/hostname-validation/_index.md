---
pcx_content_type: concept
title: Hostname validation
weight: 2
---

# Hostname validation

Before Cloudflare can proxy traffic through a custom hostname, we need to verify your customer's ownership of that hostname.

{{<Aside type="note">}}

If a custom hostname is already on Cloudflare, using the [pre-validation methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/) will not shift the traffic to the SaaS zone. That will only happen once the [DNS target](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-3--have-customer-create-cname-record) of the custom hostnames changes to point to the SaaS zone.

{{</Aside>}}

## Options

If minimizing downtime is more important to you, refer to our [pre-validation methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/).

If ease of use for your customers is more important, review our [real-time validation methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/).

## Other resources

- [Hostname validation statuses](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/validation-status/)
- [Error codes](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/)