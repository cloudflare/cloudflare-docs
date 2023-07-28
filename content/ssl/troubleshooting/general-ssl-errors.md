---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors
title: General SSL errors
meta:
    description: Learn how to troubleshoot various SSL/TLS errors with Cloudflare.
---

# General SSL errors

## Outdated browsers

### Sympton

Until Cloudflare provides an SSL certificate for your domain, the following errors may appear in various browsers for HTTPS traffic:

- **Firefox**: `_ssl_error_bad_cert_domain` / `This connection is untrusted`
- **Chrome**: `Your connection is not private`
- **Safari**: `Safari can't verify the identity of the website`
- **Edge / Internet Explorer**: `There is a problem with this website's security certificate`

### Resolution

Even with a Cloudflare SSL certificate provisioned for your domain, older browsers display errors about untrusted SSL certificates because they do not [support the Server Name Indication (SNI) protocol](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) used by Cloudflare Universal SSL certificates. 

To solve, [determine if the browser supports SNI](https://caniuse.com/#feat=sni). If not, upgrade your browser.

{{<Aside type="note">}}

It is possible for [Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to enable non-SNI support for paid plans using any certificate.

{{</Aside>}}

___

## Only some of your subdomains return SSL errors

### Symptom

[Cloudflare Universal SSL certificates](/ssl/edge-certificates/universal-ssl) only cover the apex domain (`example.com`) and one level of subdomains (`blog.example.com`). If visitors to your domain observe errors accessing a second level of subdomains in their browser (such as `dev.www.example.com`) but not the first level of subdomains, resolve the issue using one of the following methods below.

### Resolution

-   Purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager) that covers `dev.www.example.com`.
-   Upload a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates) that covers `dev.www.example.com`.
-   If you have a valid certificate for the second level subdomains at your origin web server, change the DNS record for `dev.www` to [proxied](/dns/manage-dns-records/reference/proxied-dns-records/).

___

## Your Cloudflare Universal SSL certificate is not active

### Symptom

All active Cloudflare domains are provided a [Universal SSL certificate](/ssl/edge-certificates/universal-ssl). If you observe SSL errors and do not have a certificate of **Type** _Universal_ within the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app for your domain, the Universal SSL certificate has not yet provisioned.

Our SSL vendors verify each SSL certificate request before Cloudflare can issue a certificate for a domain name. This process may take anywhere from 15 minutes to 24 hours. Our SSL certificate vendors sometimes flag a domain name for additional review.

### Resolution

#### No Universal certificate

If your Cloudflare SSL certificate is not issued within 24 hours of Cloudflare domain activation:

-   If your origin web server has a valid SSL certificate, [temporarily pause Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/), and
-   [Contact Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) and provide a screenshot of the errors.

Temporarily pausing Cloudflare will allow the HTTPS traffic to be served properly from your origin web server while the support team investigates the issue.

#### Full DNS setup

If your domain is on a [full setup](/dns/zone-setups/full-setup/), review your DNS records.

Cloudflare SSL/TLS certificates only apply for traffic [proxied through Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/). If SSL errors only occur for hostnames not proxied to Cloudflare, proxy those hostnames through Cloudflare.

#### Partial DNS setup

If your domain is on a [partial setup](/dns/zone-setups/partial-setup/), confirm whether you have CAA DNS records enabled at your current hosting provider. If so, ensure you [specify the Certificate Authorities that Cloudflare uses](/ssl/edge-certificates/caa-records/) to provision certificates for your domain. 

___

## OCSP response error

### Symptom

Visitors to your site observe an OCSP response error.

### Resolution

This error is either caused by the browser version or an issue requiring attention by one of Cloudflare’s SSL vendors. In order to properly diagnose, [contact Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) with the following information provided by the visitor that observes the browser error:

1.  The output from [https://aboutmybrowser.com/](https://aboutmybrowser.com/)  .
2.  The output of `https://<YOUR_DOMAIN>/cdn-cgi/trace` from the visitor’s browser.

___

## Incorrect HSTS headers

### Symptom

The HSTS headers (`Strict-Transport-Security` and `X-Content-Type-Options`) in the response do not match the configuration settings defined in your [HSTS settings](/ssl/edge-certificates/additional-options/http-strict-transport-security/).

### Resolution

You may have configured [HTTP Response Header Modification Rules](/rules/transform/response-header-modification) that are overriding the HSTS header values defined in the **SSL/TLS** app.

1.  Go to **Rules** > **Transform Rules**.
2.  Under **HTTP Response Header Modification**, check the existing rules for a rule that is setting the value of one of the HSTS headers (`Strict-Transport-Security` or `X-Content-Type-Options`).
3.  Delete (or edit) the rule so that the HSTS configuration settings defined in the **SSL/TLS** app are applied.
4.  Repeat this procedure for the other HSTS header.

___

## Kaspersky Antivirus

To avoid SSL errors with the Cloudflare dashboard when using Kaspersky
Antivirus, allow `dash.cloudflare.com` in Kaspersky.
