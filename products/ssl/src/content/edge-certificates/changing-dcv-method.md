---
title: Domain Control Validation (DCV)
order: 3
pcx-content-type: how-to
---

import DCVDefinition from "../_partials/_dcv-definition.md"
import CNAMECertValidation from "../_partials/_cname-cert-verification.md"
import GenericValidationProcess from "../_partials/_generic-validation-process.md"
import EmailValidationDefinition from "../_partials/_email-validation-definition.md"
import TXTValidationDefinition from "../_partials/_txt-validation-definition.md"
import EmailValidationProcess from "../_partials/_email-validation-process.md"

# Domain Control Validation (DCV) — SSL/TLS

<DCVDefinition/>

## DCV exceptions

### Full setups

If your domain is on a full setup (Cloudflare runs your [authoritative nameservers](https://developers.cloudflare.com/fundamentals/glossary#nameserver)), we handle DCV automatically on your behalf using a TXT record.

### Custom certificates

If your domain is using a [custom certificate](../custom-certificates), you need to handle DCV on your own when you obtain certificates from a CA.

## Performing DCV

If your application is on a partial/CNAME setup (someone else runs your authoritative nameservers), you may need to perform DCV.

### Apex validation

When you perform DCV through Cloudflare, we recommend that you validate against your domain apex (`example.com`) instead of individual subdomains (`blog.example.com`). This recommendation applies even if you do not intend to proxy traffic from your apex domain.

When you validate against the apex, Cloudflare can complete DCV for all subdomains. Otherwise, you will have to validate each subdomain manually.

### DCV methods

#### HTTP

<Aside type="warning">

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates or certificates with multiple SANs. For more details and next steps, refer to [Changes to HTTP DCV](/ssl-tls/dcv-update).

</Aside>

 If you are using proxied (orange-clouded) DNS records and can tolerate a few minutes of downtime, Cloudflare can handle DCV by using an HTTP token. This token is available for the Certificate Authority as soon as you create a CNAME record to Cloudflare in your authoritative DNS and you create proxied DNS records for your hostname within Cloudflare. 

<details>
<summary>What happens after you create your records</summary>
<div>

<CNAMECertValidation/>

</div>

</details>

Though this process happens relatively quickly, your application may experience a brief period of downtime. If you want to use wildcard certificates or pre-validate your certificate — either to avoid downtime or prevent any issuance errors — use [TXT](#txt) or [Email](#email) validation.

#### TXT

<TXTValidationDefinition/>

<GenericProcess/>

- API: `txt_name` and `txt_value`
- Dashboard: When viewing an individual certificate at **SSL/TLS** > **Edge Certificates**, refer to the values for **Certificate validation TXT name** and **Certificate validation TXT value**.

At your authoritative DNS provider, create a TXT record named the **name** and containing the **value**. Once this TXT is in place, validation and certificate issuance will automatically complete.

#### Email

<EmailValidationDefinition/>

<GenericValidationProcess/>

- API: `emails`
- Dashboard: When viewing an individual certificate at **SSL/TLS** > **Edge Certificates**, refer to the value for **Certificate validation email recipients**.

<EmailValidationProcess/>

### Verify DCV status

To verify the DCV status of a domain, either view the certificate in the dashboard or use the [Verification Status endpoint](https://api.cloudflare.com/#ssl-verification-ssl-verification-details).

A status of `active` means that the certificate has been deployed to Cloudflare’s edge network and will be served as soon as HTTP traffic is proxied to Cloudflare.

### Update DCV method for an active certificate

You cannot update the DCV method for an active certificate. To update the DCV method for a subdomain, wait until the DCV expires and then change the DCV method.
