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

However, it may cause some downtime since Cloudflare takes a few seconds to iterate over DNS records. This downtime also can increase - due to the increasing [validation backoff schedule](/ssl/reference/validation-backoff-schedule/) - if your customer takes additional time to add their DNS routing record.

To minimize this downtime, you can continually send no-change [`PATCH` requests](/api/operations/custom-hostname-for-a-zone-edit-custom-hostname) for the specific custom hostname until it validates (which resets the validation backoff schedule).

To avoid any chance of downtime, use a [pre-validation method](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/pre-verification/)

## How to

Real-time verification occurs automatically when your customer adds their [DNS routing record](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-5--have-customer-create-a-cname-record).

The exact record depends on your Cloudflare for SaaS setup.

### Normal setup (CNAME target)

Most customers will have a `CNAME` target, which requires their customers to create a `CNAME` record similar to:

```txt
app.example.com CNAME customers.saasprovider.com
```

### Apex proxying

With apex proxying - available as an [Enterprise add-on](/cloudflare-for-platforms/cloudflare-for-saas/plans/) - SaaS customers need to create an `A` record for their hostname that points to the IP prefix allocated to the SaaS provider's account.

```txt
example.com.  60  IN  A   192.0.2.1
```

Since most DNS providers do not allow `CNAME` records at the zone's root[^1], apex proxying also allows your customers to use their root domain (`example.com`) instead of a subdomain (`shop.example.com`).

[^1]: Cloudflare offers this functionality through [CNAME flattening](/dns/cname-flattening/).