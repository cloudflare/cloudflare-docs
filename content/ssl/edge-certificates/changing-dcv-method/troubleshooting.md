---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 3
meta:
  title: Troubleshooting Domain Control Validation
---

# Troubleshooting Domain Control Validation

Taking into account the [steps involved in DCV](/ssl/edge-certificates/changing-dcv-method/dcv-flow/), some situations may interfere with certificate issuance and renewal.

If these issues occur while HTTP DCV is in place, review the following settings:

- **Anything affecting `/.well-known/*`**: Review [WAF custom rules](/waf/custom-rules/) and other configuration [rules](/rules/) to make sure no Cloudflare settings are targeting your zone's path for `/.well-known/*`.

- **Cloudflare WAF rules**: Review your [WAF custom rules](/waf/custom-rules/) to ensure that your rules _do not_ enable interactive challenge on the validation URL.

- **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://support.cloudflare.com/hc/articles/200170076), [Configuration Rules](/rules/configuration-rules/), and [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

- **Authoritative DNS provider**: Check your settings at your authoritative DNS provider to make sure that:

  - [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) is configured correctly.
  - Your [CAA records](/ssl/edge-certificates/caa-records/) allow Cloudflare's partner Certificate Authorities to issue certificates on your behalf.

- The HTTP verification process is done preferably over **IPv6**, so if any `AAAA` record exists and does not point to the same dual-stack location as the `A` record, the validation will fail.

-  **Let's Encrypt Rate Limiting:** Let’s Encrypt provides rate limits to ensure fair usage, and because of that you need to prevent to reach the most common rate limiting trigger, that is all issuance requests are subject to a Duplicate Certificate limit of 5 per week. You should receive an error message like the following from your ACME client when you’ve exceeded the Duplicate Certificate limit:

_too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit_

A certificate is considered a renewal (or a duplicate) of an earlier certificate if it contains the exact same set of hostnames. More details, check the [Let's Encrypt documentation](https://letsencrypt.org/docs/rate-limits/).
