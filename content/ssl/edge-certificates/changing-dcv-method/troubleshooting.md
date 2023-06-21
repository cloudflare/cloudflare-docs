---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 2
meta:
  title: Troubleshooting Domain Control Validation
---

# Troubleshooting Domain Control Validation

When performing Domain Control Validation (DCV) for partial domains using Universal SSL certificates, you might experience issues with certificate issuance and renewal using [HTTP DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/).

If these issues occur while using HTTP DCV, review the following settings:

- **Anything affecting `/.well-known/*`**: Review [firewall rules](/waf/custom-rules/) and other configuration [rules](/rules/) to make sure no Cloudflare settings are targeting your zone's path for `/.well-known/*`.

- **Cloudflare Firewall Rules**: Review your [firewall rules](/waf/custom-rules/) to ensure that your rules _do not_ enable interactive challenge on the validation URL

- **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://support.cloudflare.com/hc/articles/200170076), [Configuration Rules](/rules/configuration-rules/), and [Page Rules](https://support.cloudflare.com/hc/articles/218411427) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

- **Authoritative DNS provider**: Check your settings at your authoritative DNS provider to make sure that:

  - [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) is configured correctly.
  - Your [CAA records](/ssl/edge-certificates/caa-records/) allow Cloudflare's partner Certificate Authorities to issue certificates on your behalf.

- The HTTP verification process is done preferably over **IPv6**, so if any `AAAA` record exists and does not point to the same dual-stack location as the `A` record, the validation will fail. 
