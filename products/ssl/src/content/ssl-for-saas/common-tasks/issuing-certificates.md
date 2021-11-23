---
order: 2
pcx-content-type: how-to
---

import IssueCertsPreamble from "../../_partials/_issue-certs-preamble.md"
import CreateCustomHostname from "../../_partials/_create-custom-hostname.md"
import CreateCustomHostnameAPI from "../../_partials/_create-custom-hostname-api.md"

# Issue new certificates

Once you have [set up your SSL for SaaS application](/ssl-for-saas/getting-started), you can start issuing new certificates for your customers.

<IssueCertsPreamble/>

## Via the dashboard

<CreateCustomHostname/>

## Via the API

<CreateCustomHostnameAPI/>

## Monitor certificates

Certificates move through the following stages as they progress to Cloudflare’s edge:

1. Initializing
2. Pending Validation
3. Pending Issuance
4. Pending Deployment
5. Active

Once you issue a certificate, it should be in **Pending Validation**, but change to **Active** within five minutes. If you see any errors, you or your customer may need to take additional actions to [validate the certificate](../certificate-validation-methods).

You can monitor a certificate's status in the dashboard (at **SSL/TLS** > **Custom Hostnames**) or by [using the API](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details).