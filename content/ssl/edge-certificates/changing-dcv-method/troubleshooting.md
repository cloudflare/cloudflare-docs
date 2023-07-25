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

- **Anything affecting `/.well-known/*`**: Review [firewall rules](/waf/custom-rules/) and other configuration [rules](/rules/) to make sure no Cloudflare settings are targeting your zone's path for `/.well-known/*`.

- **Cloudflare Firewall Rules**: Review your [firewall rules](/waf/custom-rules/) to ensure that your rules _do not_ enable interactive challenge on the validation URL

- **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://support.cloudflare.com/hc/articles/200170076), [Configuration Rules](/rules/configuration-rules/), and [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

- **Authoritative DNS provider**: Check your settings at your authoritative DNS provider to make sure that:

  - [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) is configured correctly.
  - Your [CAA records](/ssl/edge-certificates/caa-records/) allow Cloudflare's partner Certificate Authorities to issue certificates on your behalf.

- The HTTP verification process is done preferably over **IPv6**, so if any `AAAA` record exists and does not point to the same dual-stack location as the `A` record, the validation will fail. 
