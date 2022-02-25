---
title: Troubleshooting
pcx-content-type: reference
---

# Troubleshooting Domain Control Validation

When performing Domain Control Validation (DCV) for partial domains using Universal SSL certificates, you might experience issues with certificate issuance and renewal using [HTTP DCV](/edge-certificates/changing-dcv-method#http).

If these issues occur while using HTTP DCV, review the following settings:

*   **Cloudflare Firewall Rules**: Review your [Firewall Rules](https://developers.cloudflare.com/firewall/) to ensure that your rules *do not*:

    *   Block requests from the United States
    *   Block requests from the issuing Certificate Authority's IP addresses
    *   Enable CAPTCHAs on the validation URL

*   **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://support.cloudflare.com/hc/articles/200170076) and [Page Rules](https://support.cloudflare.com/hc/articles/218411427) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

*   **Authoritative DNS provider**: Check your settings at your authoritative DNS provider to make sure that:

    *   [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) is configured correctly.
    *   Your [CAA records](https://support.cloudflare.com/hc/articles/115000310832) allow Cloudflare's partner Certificate Authorities can issue certificates on your behalf.
