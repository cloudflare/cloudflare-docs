---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 3
meta:
  title: Troubleshooting Domain Control Validation
---

# Troubleshooting Domain Control Validation

Taking into account the [steps involved in DCV](/ssl/edge-certificates/changing-dcv-method/dcv-flow/), some situations may interfere with certificate issuance and renewal.

## Blocked validation URL

If you have issues while HTTP DCV is in place, review the following settings:

- **Anything affecting `/.well-known/*`**: Review [WAF custom rules](/waf/custom-rules/), [IP Access Rules](/waf/tools/ip-access-rules/), and other [configuration rules](/rules/configuration-rules/) to make sure no Cloudflare settings are targeting your zone's path for `/.well-known/*` and that your rules _do not_ enable interactive challenge on the validation URL.

- **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](/fundamentals/reference/under-attack-mode/), [Configuration Rules](/rules/configuration-rules/), and [Page Rules](/rules/page-rules/) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

## DNS settings and records

Check your settings at your authoritative DNS provider to make sure that:

- [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) is configured correctly.
- Your [CAA records](/ssl/edge-certificates/caa-records/) allow Cloudflare's partner [certificate authorities (CAs)](/ssl/reference/certificate-authorities/) to issue certificates on your behalf.
- The HTTP verification process is done preferably over **IPv6**, so if any `AAAA` record exists and does not point to the same dual-stack location as the `A` record, the validation will fail.

## Rate limiting

As mentioned in [Certificate authorities](/ssl/reference/certificate-authorities/), specific CAs may have their own limitations. If you use Let’s Encrypt and find the following error, it means you hit their [duplicate certificate limit](https://letsencrypt.org/docs/duplicate-certificate-limit/).

```txt
The authority has rate limited these domains. Please wait for the rate limit to expire or try another authority.
```

A certificate is considered a duplicate of an earlier certificate if it contains the exact same set of hostnames.

In this case, you can either wait for the rate limit window to end or choose a different certificate authority.