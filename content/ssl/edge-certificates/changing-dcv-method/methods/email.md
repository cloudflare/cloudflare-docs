---
title: Email
pcx_content_type: how-to
weight: 2
meta:
  title: Email method — Domain Control Validation — SSL/TLS
---

# Email DCV method

{{<render file="_email-validation-definition.md">}}

## Limitations

Based on your chosen Certificate Authority, you may not be able to use email verification with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

{{<render file="_lets-encrypt-advanced-limitations.md">}}

## Setup

### Specify DCV method

{{<render file="_generic-validation-process.md">}}

### View DCV values

Once you specify your chosen validation method, you can access the validation values by:

{{<render file="_generic-view-validation-status.md">}}

Once you locate your certificate, find the following values:

*   API: `emails`
*   Dashboard: **Certificate validation email recipients**.

### Complete DCV

{{<render file="_email-validation-process.md">}}

{{<render file="_dcv-validate-patch.md">}}

## Renew DCV tokens

{{<render file="_dcv-token-renewal.md">}}