---
title: TXT
pcx_content_type: how-to
weight: 1
meta:
  title: TXT method — Domain Control Validation — SSL/TLS
---

# TXT DCV method

{{<render file="_txt-validation-definition.md">}}

## Setup

### Specify DCV method

{{<render file="_generic-validation-process.md">}}

### View DCV values

{{<render file="_generic-view-validation-status.md">}}

Once you locate your certificate, find the following values:

- **API**: `txt_name` and `txt_value`
- **Dashboard**: **Certificate validation TXT name** and **Certificate validation TXT value**

### Update DNS records

At your authoritative DNS provider, create a TXT record named the `txt_name` and containing the `txt_value`. Once this TXT record is in place, validation and certificate issuance will automatically complete.

### Complete DCV

{{<render file="_dcv-validate-patch.md">}}

## Renew DCV tokens

{{<render file="_dcv-token-renewal.md">}}
