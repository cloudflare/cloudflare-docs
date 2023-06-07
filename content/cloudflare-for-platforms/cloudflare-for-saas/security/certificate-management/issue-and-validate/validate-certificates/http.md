---
pcx_content_type: reference
title: HTTP
weight: 3
meta:
    title: HTTP domain control validation (DCV)
---

# HTTP domain control validation (DCV)

HTTP validation involves adding a DCV token to your customer's origin.

---

## Non-wildcard custom hostnames

If your custom hostname does not include a wildcard, Cloudflare will always and automatically attempt to complete DCV through [HTTP validation](#http-automatic), even if you have selected **TXT** for your validation method.

This HTTP validation should succeed as long as your customer is pointing to your custom hostname and they do not have any [CAA records](/cloudflare-for-platforms/cloudflare-for-saas/reference/troubleshooting/#certificate-authority-authorization-caa-records) blocking your chosen certificate authority.

## Wildcard custom hostnames
 
HTTP DCV validation is [no longer allowed](/ssl/reference/migration-guides/dcv-update/) for wildcard certificates. You would instead need to use [TXT validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

---

## Validation methods

### HTTP (automatic)
 
If you value simplicity and your customers can handle a few minutes of downtime, you can rely on Cloudflare automatic HTTP validation.
 
Once you [create a new hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) and choose the `http` validation method, all your customers have to do is add a CNAME to your `$CNAME_TARGET` and Cloudflare will take care of the rest.
 
<details>
<summary>What happens after you create the custom hostname</summary>
<div>
 
{{<render file="_cname-cert-verification.md" productFolder="ssl" >}}
 
</div>
 
</details>
 
{{<Aside type="note">}}
 
Cloudflare is able to serve a random token from our edge due to the fact that `site.example.com` has a CNAME in place to `$CNAME_TARGET`, which ultimately resolves to Cloudflare IPs. If your customer has not yet added the CNAME, the CA will not be able to retrieve the token and the process will not complete.
 
We will attempt to retry this validation check for a finite period before timing out. Refer to [Validation Retry Schedule](/ssl/reference/validation-backoff-schedule/) for more details.
 
{{</Aside>}}
 
If you would like to complete the issuance process before asking your customer to update their CNAME (or before changing the resolution of your target CNAME to be proxied by Cloudflare), choose another validation method.
 
### HTTP (manual)
 
{{<render file="_ssl-for-saas-create-hostname.md">}}
<br>
 
- [**API**](/api/operations/custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, store the values present in the `validation_records` array (specifically `http_url` and `http_body`).
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
 
The token is valid for one check cycle. On the next check cycle, Cloudflare will ask the CA to recheck the URL, complete validation, and issue the certificate.
 
{{<render file="_ssl-for-saas-validate-patch.md">}}
