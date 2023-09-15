---
title: TXT
pcx_content_type: how-to
weight: 2
meta:
  title: TXT method — Domain Control Validation — SSL/TLS
---

# TXT DCV method

{{<render file="_txt-validation-definition.md">}}
<br/>

---

## When to use

Generally, you need to perform TXT-based DCV when your certificate [requires DCV](/ssl/edge-certificates/changing-dcv-method/) and you cannot perform [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

---

## Setup

### Specify DCV method

{{<render file="_generic-validation-process.md">}}

### Get DCV values

{{<render file="_txt-validation-preamble.md">}}

{{<tabs labels="API | Dashboard">}}
{{<tab label="api" no-code="true">}}

{{<render file="_txt-validation-api.md">}}

{{</tab>}}

{{<tab label="dashboard" no-code="true">}}

{{<render file="_txt-validation-dashboard.md">}}

{{</tab>}}
{{</tabs>}}

### Update DNS records

At your authoritative DNS provider, create a TXT record named the `txt_name` and containing the `txt_value`. 

Repeat this process for all the DCV records returned in the `validation_records` field to your Authoritative DNS provider.

If one or more of the hostnames on the certificate fail to validate, the certificate will not be issued or renewed.

This means that a wildcard certificate covering `example.com` and `*.example.com` will require two DCV tokens to be placed at the authoritative DNS provider. Similarly, a certificate with five hostnames in the SAN (including a wildcard) will require five DCV tokens to be placed at the authoritative DNS provider.

### Complete DCV

Once you update your DNS records, you can either [wait for the next retry](/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/) or request an immediate recheck.

{{<render file="_dcv-validate-patch.md">}}

TXT records used for DCV can be removed from your authoritative DNS provider as soon as the certificate is issued.

## Renewal

{{<render file="_dcv-certificate-renewal.md">}}

{{<render file="_dcv-renewal-fallback.md">}}

[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.