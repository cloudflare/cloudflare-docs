---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 3
meta:
  title: Troubleshooting Domain Control Validation
---

# Troubleshooting Domain Control Validation

Taking into account the [steps involved in DCV](/ssl/edge-certificates/changing-dcv-method/dcv-flow/), some situations may interfere with certificate issuance and renewal.

{{<Aside type="note">}}
If you are using the Cloudflare API, error messages are presented under the `validation_errors` parameter.
{{</Aside>}}

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

{{<render file="_error-rate-limiting.md">}}