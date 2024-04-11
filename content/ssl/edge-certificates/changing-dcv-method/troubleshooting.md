---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 3
meta:
  title: Troubleshooting Domain Control Validation
---

# Troubleshooting Domain Control Validation

Taking into account the [steps involved in DCV](/ssl/edge-certificates/changing-dcv-method/dcv-flow/), some situations may interfere with certificate issuance and renewal.

While [blocked validation URLs](#blocked-validation-url) or [misconfigured DNS settings](#dns-settings-and-records) interfere with the {{<glossary-tooltip term_id="Certificate Authority (CA)">}}certificate authority (CA){{</glossary-tooltip>}} ability to finish the validation process and may have to be addressed by you in Cloudflare or at your authoritative DNS provider, there can also be [errors on the CA side](#ca-errors).

{{<Aside type="note">}}
If you are using the Cloudflare API, error messages are presented under the `validation_errors` parameter.
{{</Aside>}}

## Blocked validation URL

If you have issues while HTTP DCV is in place, review the following settings:

- **Anything affecting `/.well-known/*`**: Review [WAF custom rules](/waf/custom-rules/), [IP Access Rules](/waf/tools/ip-access-rules/), and other [configuration rules](/rules/configuration-rules/) to make sure that your rules _do not_ enable interactive challenge on the validation URL.

- **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](/fundamentals/reference/under-attack-mode/), [Configuration Rules](/rules/configuration-rules/), and [Page Rules](/rules/page-rules/) to ensure you have not enabled **I'm Under Attack Mode** on the validation URL.

  {{<Aside type="warning">}}
{{<render file="_dcv-path-security.md">}}
{{</Aside>}}

## DNS settings and records

The errors below refer to situations that have to be addressed at the authoritative DNS provider:

* `the Certificate Authority had trouble performing a DNS lookup: dns problem: looking up caa for nsheiapp.codeacloud.com: dnssec: bogus`
* `Certificate authority encountered a SERVFAIL during DNS lookup, please check your DNS reachability.`

Consider the following when troubleshooting:

- [DNSSEC](https://www.cloudflare.com/learning/dns/dns-security/) must be configured correctly. You can use [DNSViz](https://dnsviz.net/) to understand and troubleshoot the deployment of DNSSEC.
- Your [CAA records](/ssl/edge-certificates/caa-records/) should allow Cloudflare's partner [certificate authorities (CAs)](/ssl/reference/certificate-authorities/) to issue certificates on your behalf.
- The HTTP verification process is done preferably over **IPv6**, so if any `AAAA` record exists and does not point to the same dual-stack location as the `A` record, the validation will fail.

## CA errors

### Rate limiting

{{<render file="_error-rate-limiting.md">}}

### Internal errors

When, during the CA check portion of the [DCV flow](/ssl/edge-certificates/changing-dcv-method/dcv-flow/), the certificate authority finds an issue, you may see a `Internal error with Certificate Authority` message. In this case, either wait or try a different certificate authority.

When the error states that the `certificate authority will not issue for this domain`, you can try a different certificate authority or contact the CA directly.