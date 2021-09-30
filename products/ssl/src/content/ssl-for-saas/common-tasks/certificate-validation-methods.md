---
order: 3
pcx-content-type: how-to
---

import DCVDefinition from "../../_partials/_dcv-definition.md"
import CNAMECertValidation from "../../_partials/_cname-cert-verification.md"
import CreateHostname from "../../_partials/_ssl-for-saas-create-hostname.md"
import EmailValidationDefinition from "../../_partials/_email-validation-definition.md"
import TXTValidationDefinition from "../../_partials/_txt-validation-definition.md"
import EmailValidationProcess from "../../_partials/_email-validation-process.md"
import ValidatePatch from "../../_partials/_ssl-for-saas-validate-patch.md"

# Validate certificates

<DCVDefinition/>

## DCV methods

If you want to pre-validate your customer's certificate before they set a CNAME record — either to avoid downtime or prevent any issuance errors — explore [TXT](#txt), [Email](#email), or [HTTP (manual)](#http-manual) validation.

If you value simplicity and your customers can tolerate a few minutes of downtime, use [HTTP (automatic)](#http-automatic) validation.

### TXT record

<TXTValidationDefinition/>

<CreateHostname/>

- [API](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): `txt_name` and `txt_value`
- Dashboard (on the certificate): **Certificate validation TXT name** and **Certificate validation TXT value**

Ask your customer to create a TXT record named the **name** and containing the **value** at their authoritative DNS provider. Once this TXT is in place, validation and certificate issuance will automatically complete.

<ValidatePatch/>

### Email

<EmailValidationDefinition/>

<CreateHostname/>

- [API](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): `emails`
- Dashboard (on the certificate): **Certificate validation email recipients**

<EmailValidationProcess/>

<ValidatePatch/>

### HTTP

HTTP adds a DCV token to your origin. You can either add that token [manually](#http-manual) to support pre-validation or wait for Cloudflare to add the DCV token [automatically](#http-automatic), which may lead to a few minutes of downtime.

<Aside type="warning">

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates. For more details and next steps, refer to [Changes to HTTP DCV](/ssl-tls/dcv-update).

</Aside>

#### HTTP (manual)

<CreateHostname/>

- [API](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): `http_url` and `http_body`
- Dashboard (on the certificate): **Certificate validation request** and **Certificate validation response**

At your origin, make this token available at the path specified in `http_url`. This path should also be publicly accessible to anyone on the Internet so your CA can access it.

Here is an example NGINX configuration that would return a token:

```txt
location "/.well-known/pki-validation/ca3-0052344e54074d9693e89e27486692d6.txt" {
        return 200 "ca3-be794c5f757b468eba805d1a705e44f6\n";
}
```

Once your configuration is live, test that the DCV text file is in place with `curl`:

```bash
$ curl "http://http-preval.example.com/.well-known/pki-validation/ca3-0052344e54074d9693e89e27486692d6.txt"
ca3-be794c5f757b468eba805d1a705e44f6
```

On the next check cycle, Cloudflare will ask the CA to recheck the URL, complete validation, and issue the certificate.

<ValidatePatch/>


#### HTTP (automatic)

If you value simplicity and your customers can handle a few minutes of downtime, you can rely on Cloudflare automatic HTTP validation.

Once you create a new hostname [via the dashboard](/ssl-for-saas/common-tasks/issuing-certificates#via-the-dashboard) or [via the API](/ssl-for-saas/common-tasks/issuing-certificates#via-the-api) and choose the `http` validation method, all your customers have to do is add a CNAME to your `$CNAME_TARGET` and Cloudflare will take care of the rest.

<details>
<summary>What happens after you create the custom hostname</summary>
<div>

<CNAMECertValidation/>

</div>

</details>

<Aside type='note' header='Note'>

Cloudflare is able to serve a random token from our edge due to the fact that `site.example.com` has a CNAME in place to `$CNAME_TARGET`, which ultimately resolves to Cloudflare IPs. If your customer has not yet added the CNAME, the CA will not be able to retrieve the token and the process will not complete.

We will attempt to retry this validation check for a finite period before timing out. Refer to <a href="/ssl-for-saas/validation-backoff-schedule">Validation Retry Schedule</a> for more details.

</Aside>

If you would like to complete the issuance process before asking your customer to update their CNAME (or before changing the resolution of your target CNAME to be proxied by Cloudflare), choose another validation method.
