---
title: CNAME
pcx-content-type: how-to
weight: 5
meta:
  title: CNAME method — Domain Control Validation — SSL/TLS
---

# CNAME

{{<render file="_dcv-cname-definition.md">}}

## Limitations

Based on your chosen Certificate Authority, you may not be able to use CNAME verification with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

{{<render file="_lets-encrypt-advanced-limitations.md">}}

## Setup

### Specify DCV method

{{<render file="_http-cname-validation-process.md">}}

In either case, you would need to set a `"validation_method":"cname"` parameter.

### View DCV values

{{<render file="_generic-view-validation-status.md">}}

Specifically, you should be looking for the `cname` and `cname_target` (you can also see these values in the dashboard by clicking that specific hostname certificate). Then, use these values to add a CNAME record at your authoritative DNS provider.

### Complete DCV

{{<render file="_dcv-validate-patch.md">}}

## Renew DCV tokens

{{<render file="_dcv-token-renewal.md">}}