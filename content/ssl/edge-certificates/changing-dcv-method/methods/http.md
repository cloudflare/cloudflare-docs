---
title: HTTP
pcx_content_type: how-to
weight: 4
meta:
  title: HTTP method — Domain Control Validation — SSL/TLS
---

# HTTP DCV method

When you choose HTTP DCV, Cloudflare automatically adds a verification HTTP token to your domain.

Only use this method if your domain can tolerate a few minutes of downtime.

{{<Aside type="note">}}

If you encounter issues with HTTP DCV, refer to the [troubleshooting guide](/ssl/edge-certificates/changing-dcv-method/troubleshooting/).

{{</Aside>}}

## Limitations

HTTP DCV is only available for [proxied domains](/dns/manage-dns-records/reference/proxied-dns-records/).

HTTP DCV validation also does not work for wildcard certificates.

If you want to use wildcard certificates or pre-validate your certificate — either to avoid downtime or prevent any issuance errors — use [TXT validation](/ssl/edge-certificates/changing-dcv-method/methods/txt/).

Based on your chosen Certificate Authority, you may also not be able to use HTTP verification with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

## Setup

### Specify DCV method

{{<render file="_http-cname-validation-process.md">}}

In either case, you would need to set a `"validation_method":"http"` parameter.

### Review other Cloudflare settings

To make sure your domain does not accidentally block HTTP DCV, review your Cloudflare settings for [common setup issues](/ssl/edge-certificates/changing-dcv-method/troubleshooting/).

### Complete DCV

Your HTTP token will be available for the Certificate Authority as soon as you finish your [partial domain setup](/dns/zone-setups/partial-setup/setup/#add-dns-records).

This means that you need to add a CNAME record to Cloudflare in your authoritative DNS and create [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) for your hostname within Cloudflare.

This process may involve a few minutes of downtime.

{{<details header="What happens after you create your records">}}

{{<render file="_cname-cert-verification.md">}}

{{</details>}}

{{<render file="_acm-validate-cert.md">}}

## Renewal

{{<render file="_dcv-certificate-renewal.md">}}
