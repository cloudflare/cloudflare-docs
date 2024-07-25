---
title: Email
pcx_content_type: how-to
weight: 3
meta:
  title: Email method — Domain Control Validation — SSL/TLS
---

# Email DCV method

{{<render file="_email-validation-definition.md">}}

{{<Aside type="note">}}

With the [upcoming change](/ssl/reference/migration-guides/digicert-update/advanced-certificates/) to certificates issued by DigiCert, email DCV will soon be unsupported.

{{</Aside>}}

## Limitations

Based on your chosen Certificate Authority, you may not be able to use email verification with [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

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

## Renewal

{{<render file="_dcv-certificate-renewal.md">}}

If any one of the conditions is not met, the certificate renewal falls back to your chosen method and you will need to repeat the DCV process manually.