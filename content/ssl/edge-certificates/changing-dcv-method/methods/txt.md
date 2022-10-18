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

You will need to add all of the DCV records returned in the `validation_records` field to your Authoritative DNS provider.

### Update DNS records

At your authoritative DNS provider, create a TXT record named the `txt_name` and containing the `txt_value`. Once this TXT record is in place, validation and certificate issuance will automatically complete.

### Complete DCV

{{<render file="_dcv-validate-patch.md">}}

## Renew DCV tokens

{{<render file="_dcv-token-renewal.md">}}