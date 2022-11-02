---
pcx_content_type: how-to
title: Enable Universal SSL certificates
weight: 2
---

# Enable Universal SSL certificates

{{<render file="_universal-ssl-definition.md">}}

\
The process for activating a Universal SSL certificate depends on your domain's DNS setup.

## Full DNS setup

For an authoritative or full domain — domains that changed their [domain nameservers](/dns/zone-setups/full-setup/) – your domain should **automatically** receive its Universal SSL certificate between **15 minutes to 24 hours** of domain activation. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA).

This certificate covers your root domain (`example.com`) and all first-level subdomains (`subdomain.example.com`).

### Minimize downtime

For sites that require an SSL/TLS certificate prior to migrating traffic to Cloudflare, you could do the following:

- Purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
- Upload a [custom certificate](/ssl/edge-certificates/custom-certificates/) prior to migrating (and then delete the certificate after your [Universal certificate is active](#verify-your-certificate-is-active)).
- Keep DNS records [**unproxied**](/dns/manage-dns-records/reference/proxied-dns-records) until your [certificate is active](#verify-your-certificate-is-active).

{{<Aside type="note">}}If your domain is using a **partial setup**, you will need to add [Domain Control Validation (DCV) records](/ssl/edge-certificates/changing-dcv-method/) to your authoritative DNS.{{</Aside>}}

## Partial DNS setup

For non-authoritative or [partial domains](/dns/zone-setups/partial-setup/), Universal SSL will be:

- Provisioned once the DNS record is [proxied through Cloudflare](/dns/zone-setups/partial-setup/setup/#step-3--add-dns-records).
- Validated:

  - Immediately if you add [Domain Control Validation (DCV)](/ssl/edge-certificates/changing-dcv-method/) records to your authoritative DNS.
  - After a brief period of downtime if you **do not** add DCV records (once your traffic is proxied).

Unless you cover and validate multiple subdomains with an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/), you will need to proxy and validate new subdomains as they are added.

## Verify your certificate is active

Once you enable Universal SSL, you can review the [certificate's status](/ssl/reference/certificate-statuses/) in the dashboard at **SSL/TLS** > **Edge Certificates** or via the API with a [GET request](https://api.cloudflare.com/#certificate-packs-list-certificate-packs).