---
pcx_content_type: configuration
title: Real-time verification
weight: 2
meta:
    title: Real-time verification methods - Custom Hostname Verification
---

# Real-time verification methods

When you use a real-time verification method, Cloudflare verifies your customer's hostname when your customers adds their [DNS routing record](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-5--have-customer-create-a-cname-record) to their authoritative DNS.

## Use when

Real-time verification methods put less burden on your customers because it does not require any additional actions.

However, it may cause some downtime since Cloudflare takes a few seconds to iterate over DNS records. This downtime also can increase - due to the increasing [verification backoff schedule](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/backoff-schedule/) - if your customer takes additional time to add their DNS routing record.

To minimize this downtime, you can continually send no-change [`PATCH` requests](/api/operations/custom-hostname-for-a-zone-edit-custom-hostname) for the specific custom hostname until it validates (which resets the validation backoff schedule).

To avoid any chance of downtime, use a [pre-validation method](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/pre-verification/)

## How to

Real-time verification occurs automatically when your customer adds their [DNS routing record](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-5--have-customer-create-a-cname-record).

The exact record depends on your Cloudflare for SaaS setup.

### Normal setup (CNAME target)

{{<render file="_cname-target-process.md">}}

### Apex proxying

{{<render file="_apex-proxying-process.md">}}