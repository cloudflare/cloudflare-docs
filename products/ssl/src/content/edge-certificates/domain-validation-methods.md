---
order: 2
pcx-content-type: how-to
---

import CnameCertValidation from "../_partials/_cname-cert-verification.md"
import EmailValidation from "../_partials/_email-validation.md"
import TXTValidation from "../_partials/_txt-validation.md"
import HTTPValidation from "../_partials/_http-validation.md"
import GenericProcess from "../_partials/_generic-validation-process.md"
import EmailSteps from "../_partials/_email-validation-steps.md"

# Domain control validation

Before a Certificate Authority will issue a certificate for a domain, the requestor must prove they have control over that domain. This process is known as domain control validation (DCV).

----

## Automatic DCV

### Full setup

If you are using a **Universal** or **Advanced** certificate and you changed your authoritative nameservers to Cloudflare (full setup), Cloudflare handles automatically DCV on your behalf using a TXT record.

### CNAME (partial) setup

If you are using a **Universal** or **Advanced** certificate and your domain uses a partial setup (CNAME setup) — meaning Cloudflare does not provide your authoritative DNS — Cloudflare will place an HTTP token to complete DCV. This token is available for the Certificate Authority as soon as:

* Hostname has a CNAME to Cloudflare from the domain’s authoritative DNS.
* Hostname is Orange-Clouded in Cloudflare’s DNS settings.

<details>
<summary>Detailed explanation</summary>
<div>

<CnameCertValidation/>

</div>

</details>

Though this process happens relatively quickly, your application may experience a brief period of downtime. If you want to pre-validate your certificate — either to avoid downtime or prevent any issuance errors — refer to [Manual DCV](#manual-dcv).

### Exceptions

Advanced certificates covering multiple hostnames cannot be validated automatically and require [Manual DCV](#manual-dcv) through Cloudflare.

You also may want to set up manual DCV to avoid potential downtime or issuance errors.

For [custom certificates](/edge-certificates/custom-certificates), Cloudflare is not involved in the DCV process and you cannot use the Cloudflare dashboard or API.

---

## Manual DCV

Manual DCV is typically associated with either CNAME (partial) setups — meaning Cloudflare does not provide your authoritative DNS. 

It's best to do this validation against the apex (`cloudflare.com`), even if you don’t intend on proxying traffic for the apex. Otherwise, each subdomain needs to be validated manually.

### Options

#### TXT record

<TextValidation/>

<GenericProcess/>

- API: `txt_name` and `txt_value`
- Dashboard (on the certificate): **Certificate validation TXT name** and **Certificate validation TXT value**

At your authoritative DNS provider, create a TXT record named the **name** and containing the **value**. Once this TXT is in place, validation and certificate issuance will automatically complete.

#### Email

<EmailValidation/>

<GenericProcess/>

- API: `emails`
- Dashboard (on the certificate): **Certificate validation email recipients**

<EmailSteps/>

#### HTTP (manual)

<Aside type="warning">

Advanced certificates with wildcards or using [multiple SANs](https://developers.cloudflare.com/fundamentals/glossary#subject-alternative-name-san) require TXT or email validation.

</Aside>

<HTTPValidation/>

---

## Update DCV method for an active certificate

You cannot update the DCV method for an active certificate. To update the DCV method for a domain, wait until the DCV expires and then change the DCV method.

## API documentation

For more detail, see the Cloudflare API documentation on these operations:

* [Get SSL Verification Details](https://api.cloudflare.com/#ssl-verification-ssl-verification-details)
* [Edit SSL Certificate Pack Validation Method](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method)
