---
title: Delegated
pcx_content_type: how-to
weight: 1
meta:
  title: Delegated DCV — Domain Control Validation — SSL/TLS
---

# Delegated DCV

Delegated DCV allows zones with [partial DNS setups](/dns/zone-setups/partial-setup/) - meaning authoritative DNS is not provided by Cloudflare - to delegate the DCV process to Cloudflare.

DCV Delegation requires you to place a one-time record that allows Cloudflare to auto-renew all future certificate orders, so that there’s no manual intervention at the time of the renewal.

{{<Aside type="note">}}
DCV Delegation will not work with Universal Certificates and requires the use of an [Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
{{</Aside>}}

## Availability

{{<feature-table id="ssl.delegated_dcv">}}

## When to use

You should use Delegated DCV when all of the following conditions are true:

- Your zone is using a [partial DNS setup](/dns/zone-setups/partial-setup/).
- Cloudflare is not already [performing DCV automatically](/ssl/edge-certificates/changing-dcv-method/).
- Your zone is using an [Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
- Your zone is not using multiple CDN providers.
- The Certificate Authority is either Google or Let's Encrypt

{{<Aside type="note" header="Delegated DCV and origin certificates">}}
As explained in the [announcement blog post](https://blog.cloudflare.com/introducing-dcv-delegation/), currently, you can only delegate DCV to one provider at a time. If you also issue publicly trusted certificates for the same hostname for your [origin server](/ssl/concepts/#origin-certificate), this will no longer be possible. You can use [Cloudflare Origin CA certificates](/ssl/origin-configuration/origin-ca/) instead.
{{</Aside>}}

## Setup

To set up Delegated DCV:

1. Order an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) for your zone, choosing `TXT` as the **Certificate validation method**.
2. On **SSL/TLS** > **Edge Certificates**, go to **DCV Delegation for Partial Zones**.
3. Copy the Cloudflare validation URL.
4. At your authoritative DNS provider, create `CNAME` record(s) considering the following:

* If your certificate only covers the apex domain and a wildcard, you only need to create a single `CNAME` record for your apex domain. Any direct subdomains will be covered as well.

{{<example>}}

  ```txt
  _acme-challenge.example.com CNAME example.com.<COPIED_VALIDATION_URL>.
  ```

{{</example>}}

* If your certificate also covers subdomains specified by their name, you will need to add multiple `CNAME` records to your authoritative DNS provider, one for each specific subdomain.

{{<example>}}

For example, a certificate covering `example.com`, `*.example.com`, and `sub.example.com` would require the following records.

```txt
_acme-challenge.example.com CNAME .example.com.<COPIED_VALIDATION_URL>.
_acme-challenge.sub.example.com CNAME sub.example.com.<COPIED_VALIDATION_URL>.
```

{{</example>}}

{{<Aside type="warning" header="Remove previous TXT records">}}
Existing TXT records for `_acme-challenge` will conflict with the delegated DCV CNAME record. Make sure to check and remove records such as the following:

```txt
_acme-challenge.example.com TXT <CERTIFICATE_VALIDATION_VALUE>
```
{{</Aside>}}

Once the `CNAME` records are in place, Cloudflare will add TXT DCV tokens for every hostname on the Advanced certificate that has a DCV delegation record in place, as long as the zone is [active](/dns/zone-setups/reference/domain-status/) on Cloudflare.

Because DCV happens regularly, do not remove the `CNAME` record(s) at your authoritative DNS provider. Otherwise, Cloudflare will not be able to perform DCV on your behalf and your certificate will not be issued.

## Further details

### Testing

If you use a `dig` command to test, you should only be able see the placed tokens if the certificate is up for issuance.

This is because Cloudflare places the tokens when needed and then cleans them up.

```sh
$ dig TXT +noadditional +noquestion +nocomments +nocmd +nostats _acme-challenge.example.com. @1.1.1.1_acme-challenge.example.com. 3600    IN    CNAME    example.com.<COPIED_VALIDATION_URL>
```

### Renewal

Currently, at certificate renewal, Cloudflare attempts to automatically perform DCV via HTTP if your certificate matches certain criteria:

* Hostnames are proxied.
* Hostnames on the certificate resolve to the IPs assigned to the zone.
* The certificate does not contain wildcards.

Note that settings that interfere with the validation URLs can cause issues in this case. Refer to [Troubleshooting](/ssl/edge-certificates/changing-dcv-method/troubleshooting/) for guidance.

{{<Aside type="note">}}
If a hostname becomes unreachable during certificate renewal time, the certificate will not be able to be renewed automatically via Delegated DCV. Should you need to renew a certificate for a hostname that is not resolving currently, you can send a PATCH request to [the changing DCV method API endpoint](/api/operations/ssl-verification-edit-ssl-certificate-pack-validation-method) and change the method to TXT to proceed with manual renewal per [the TXT DCV method](/ssl/edge-certificates/changing-dcv-method/methods/txt/).

Once the hostname becomes resolvable again, [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) will resume working as expected.
{{</Aside>}}

### Moved domains

If you [move your zone to another account](/fundamentals/setup/manage-domains/move-domain/), you will need to update the `CNAME` record at your authoritative DNS provider with a new validation URL.
