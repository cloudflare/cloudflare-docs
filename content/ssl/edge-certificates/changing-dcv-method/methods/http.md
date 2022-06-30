---
title: HTTP
pcx-content-type: how-to
weight: 3
meta:
  title: HTTP method — Domain Control Validation — SSL/TLS
---

# HTTP DCV method

When you choose HTTP DCV, Cloudflare automatically adds a verification HTTP token to your domain.

Only use this method if your domain can tolerate a few minutes of downtime.

## Limitations

HTTP DCV is only available for [proxied domains](/dns/manage-dns-records/reference/proxied-dns-records/).

HTTP DCV validation also does not work for wildcard certificates or certificates with multiple SANs.

If you want to use wildcard certificates or pre-validate your certificate — either to avoid downtime or prevent any issuance errors — use [TXT](/ssl/edge-certificates/changing-dcv-method/methods/txt/) or [Email](/ssl/edge-certificates/changing-dcv-method/methods/email/) validation.

Based on your chosen Certificate Authority, you may also not be able to use HTTP verification with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

{{<render file="_lets-encrypt-advanced-limitations.md">}}

## Setup

### Specify DCV method

{{<render file="_http-cname-validation-process.md">}}

In either case, you would need to set a `"validation_method":"http"` parameter.

### Review other Cloudflare settings

To make sure your domain does not accidentally block HTTP DCV, review your Cloudflare settings for [common setup issues](/ssl/edge-certificates/changing-dcv-method/troubleshooting/).

### Complete DCV

Your HTTP token will be available for the Certificate Authority as soon as you finish your [partial domain setup](/dns/zone-setups/partial-setup/setup/#step-3--add-dns-records).

This means that you need to add a CNAME record to Cloudflare in your authoritative DNS and create [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) for your hostname within Cloudflare.

This process may involve a few minutes of downtime.

<details>
<summary>What happens after you create your records</summary>
<div>

{{<render file="_cname-cert-verification.md">}}

</div>

</details>

{{<render file="_acm-validate-cert.md">}}

## Renew DCV tokens

{{<render file="_dcv-token-renewal.md">}}