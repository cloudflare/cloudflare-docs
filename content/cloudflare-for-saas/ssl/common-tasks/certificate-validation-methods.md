---
title: Validate certificates
pcx-content-type: configuration
weight: 4
meta:
  title: Validate certificates — Cloudflare for SaaS
---

# Validate certificates — Cloudflare for SaaS

{{<render file="../../ssl/_partials/_dcv-definition.md">}}

## DCV methods

If you want to pre-validate your customer's certificate before they set a CNAME record — either to avoid downtime or prevent any issuance errors — explore [TXT](#txt), [Email](#email), or [HTTP (manual)](#http-manual), or [CNAME](#cname) validation.

If you create custom hostnames with wildcards, use [TXT](#txt) or [Email](#email) validation.

If you value simplicity and your customers can tolerate a few minutes of downtime, use [HTTP (automatic)](#http-automatic) validation.

### TXT record

{{<render file="../../ssl/_partials/_txt-validation-definition.md">}}

{{<render file="_ssl-for-saas-create-hostname.md">}}

- [**API**](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, refer to the values present in the `validation_records` array (specifically `txt_name` and `txt_value`).
- **Dashboard**: When viewing an individual certificate at **SSL/TLS** > **Custom Hostnames**, refer to the values for **Certificate validation TXT name** and **Certificate validation TXT value**.

Ask your customer to create a TXT record named the **name** and containing the **value** at their authoritative DNS provider. Once this TXT record is in place, validation and certificate issuance will automatically complete.

{{<render file="_ssl-for-saas-validate-patch.md">}}

### Email

{{<render file="../../ssl/_partials/_email-validation-definition.md">}}

{{<render file="_ssl-for-saas-create-hostname.md">}}

- [**API**](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, refer to the values present in the `validation_records` array (specifically `emails`).
- **Dashboard**: When viewing an individual certificate at **SSL/TLS** > **Custom Hostnames**, refer to the value for **Certificate validation email recipients**.

{{<render file="../../ssl/_partials/_email-validation-process.md">}}

{{<render file="_ssl-for-saas-validate-patch.md">}}

### CNAME (manual)

{{<render file="../../ssl/_partials/_dcv-cname-definition.md">}}

Since this method is only available using the API, you need to make a [POST request](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname) and set a `"method":"cname"` parameter.

Within the `ssl` object in the response, refer to the values present in the `validation_records` array. Each record will contain a property for `cname` and `cname_target` (you can also access these values in the dashboard by clicking that specific hostname certificate). Provide these values to your customer so they can add a CNAME record at their authoritative DNS provider.

{{<render file="_ssl-for-saas-validate-patch.md">}}

### HTTP

HTTP adds a DCV token to your origin. You can either add that token [manually](#http-manual) to support pre-validation or wait for Cloudflare to add the DCV token [automatically](#http-automatic), which may lead to a few minutes of downtime.

{{<Aside type="warning">}}

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates. For more details and next steps, refer to [Changes to HTTP DCV](/ssl/ssl-tls/migration-guides/dcv-update/).

{{</Aside>}}

#### HTTP (manual)

{{<render file="_ssl-for-saas-create-hostname.md">}}

- [**API**](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, store the values present in the `validation_records` array (specifically `http_url` and `http_body`).
- **Dashboard**: When viewing an individual certificate at **SSL/TLS** > **Custom Hostnames**, refer to the values for **Certificate validation request** and **Certificate validation response**.

At your origin, make the `http_body` available in a TXT record at the path specified in `http_url`. This path should also be publicly accessible to anyone on the Internet so your CA can access it.

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

{{<render file="_ssl-for-saas-validate-patch.md">}}

#### HTTP (automatic)

If you value simplicity and your customers can handle a few minutes of downtime, you can rely on Cloudflare automatic HTTP validation.

Once you create a new hostname [via the dashboard](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-dashboard) or [via the API](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-api) and choose the `http` validation method, all your customers have to do is add a CNAME to your `$CNAME_TARGET` and Cloudflare will take care of the rest.

<details>
<summary>What happens after you create the custom hostname</summary>
<div>

{{<render file="../../ssl/_partials/_cname-cert-verification.md">}}

</div>

</details>

{{<Aside type="note">}}

Cloudflare is able to serve a random token from our edge due to the fact that `site.example.com` has a CNAME in place to `$CNAME_TARGET`, which ultimately resolves to Cloudflare IPs. If your customer has not yet added the CNAME, the CA will not be able to retrieve the token and the process will not complete.

We will attempt to retry this validation check for a finite period before timing out. Refer to [Validation Retry Schedule](/ssl/ssl-tls/validation-backoff-schedule/) for more details.

{{</Aside>}}

If you would like to complete the issuance process before asking your customer to update their CNAME (or before changing the resolution of your target CNAME to be proxied by Cloudflare), choose another validation method.

## Renew certificates issued by DCV

If you are using a proxied hostname, new certificates are automatically validated [via HTTP](#http-automatic).

If you need to use another validation method — for example, if you are using wildcard certificates or certificates with multiple SANs — you need to repeat the DCV process with your chosen method and share the tokens with your customer.
