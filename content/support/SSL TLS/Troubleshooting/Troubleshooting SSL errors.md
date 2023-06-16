---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors
title: Troubleshooting SSL errors
---

# Troubleshooting SSL errors



## Overview

Until Cloudflare provides an SSL certificate for your domain, the following errors appear in various browsers for HTTPS traffic:

**Firefox**

     _ssl\_error\_bad\_cert\_domain      This connection is untrusted_

**Chrome**

     _Your connection is not private_

**Safari**

     _Safari can't verify the identity of the website_

**Edge / Internet Explorer**

     _There is a problem with this website's security certificate_

Even with a Cloudflare SSL certificate provisioned for your domain, older browsers display errors about untrusted SSL certificates because they do not [support the Server Name Indication (SNI) protocol](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) used by Cloudflare Universal SSL certificates.  [Determine if your browser supports SNI](https://caniuse.com/#feat=sni).

It is possible for [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) to enable non-SNI support for domains on Pro, Business, or Enterprise plans for Universal, Advanced, Custom, or Custom Hostname certificates.

Otherwise, if SSL errors occur when using a newer browser, review these common SSL error causes:

-   [Redirect loop errors or HTTP 525 or 526 errors](/support/ssl-tls/troubleshooting/troubleshooting-ssl-errors/#redirect-loop-errors-or-http-525-or-526-errors)
-   [Only some of your subdomains return SSL errors](/support/ssl-tls/troubleshooting/troubleshooting-ssl-errors/#only-some-of-your-subdomains-return-ssl-errors)
-   [Your Cloudflare Universal SSL certificate is not active](/support/ssl-tls/troubleshooting/troubleshooting-ssl-errors/#your-cloudflare-universal-ssl-certificate-is-not-active)
-   [OCSP response error](/support/ssl-tls/troubleshooting/troubleshooting-ssl-errors/#ocsp-response-error)
-   [SSL expired or SSL mismatch errors](/support/ssl-tls/troubleshooting/troubleshooting-ssl-errors/#ssl-expired-or-ssl-mismatch-errors)

{{<Aside type="note">}}
To avoid SSL errors with the Cloudflare dashboard when using Kaspersky
Antivirus, allow dash.cloudflare.com in Kaspersky.
{{</Aside>}}

___

## Redirect loop errors or HTTP 525 or 526 errors

**Symptom**

Visitors observe [redirect loop errors](/ssl/troubleshooting/too-many-redirects/) when browsing to your domain or observe HTTP [525](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-525-ssl-handshake-failed) or [526](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-526-invalid-ssl-certificate) errors. These errors occur when the current Cloudflare SSL/TSL encryption mode in the Cloudflare **SSL/TLS** app is not compatible with your origin web server’s configuration. **Resolution**

For redirect loops, refer to our guide on [troubleshooting redirect loop errors](/ssl/troubleshooting/too-many-redirects/).

To resolve HTTP [525](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-525-ssl-handshake-failed) or [526](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-526-invalid-ssl-certificate) errors, follow the guidance in [SSL encryption modes](/ssl/origin-configuration/ssl-modes).

.

___

## Only some of your subdomains return SSL errors

**Symptom** [Cloudflare Universal SSL](/ssl/edge-certificates/universal-ssl) and only cover the root-level domain (_example.com_) and one level of subdomains (_\*.example.com_). If visitors to your domain observe errors accessing a second level of subdomains in their browser (such as _dev.www.example.com_) but not the first level of subdomains (such as _www.example.com_), resolve the issue using one of the following methods below.

**Resolution**

-   Ensure the domain is at least on a Business plan and upload a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates) that covers _dev.www.example.com_
-   purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager) that covers _dev.www.example.com_
-   if you have a valid certificate for the second level subdomains at your origin web server, click the orange cloud icon beside the _dev.www_ hostname in the Cloudflare **DNS** app for _example.com_.

___

## Your Cloudflare Universal SSL certificate is not active

**Symptom**

All active Cloudflare domains are provided a [Universal SSL certificate](/ssl/edge-certificates/universal-ssl). If you observe SSL errors and do not have a certificate of **Type** _Universal_ within the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app for your domain, the Universal SSL certificate has not yet provisioned.

{{<Aside type="note">}}
Cloudflare SSL certificates only apply for traffic proxied through
Cloudflare. If SSL errors only occur for hostnames not proxied to
Cloudflare, proxy those hostnames through Cloudflare:

-   For domains on Full DNS setups, click the grey cloud icon icon
    beside the DNS hostname in your Cloudflare DNS app until the icon
    becomes an orange cloud.
-   For domains on CNAME setups, review our guide on [adding DNS records
    to a CNAME
    setup](/dns/zone-setups/partial-setup).
{{</Aside>}}

Our SSL vendors verify each SSL certificate request before Cloudflare can issue a certificate for a domain name. This process may take anywhere from 15 minutes to 24 hours. Our SSL certificate vendors sometimes flag a domain name for additional review.

**Resolution**

If your domain is on a [partial setup](/dns/zone-setups/partial-setup): Confirm whether you have CAA DNS records enabled at your current hosting provider. If so, ensure you [specify the Certificate Authorities that Cloudflare uses](/ssl/edge-certificates/caa-records/) to provision certificates for your domain. If [Universal SSL](/ssl/edge-certificates/universal-ssl) is disabled on your domain under the **Disable Universal SSL** section of the **Edge Certificates** tab in Cloudflare **SSL/TLS** app:

-   enable Universal SSL
-   purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager)
-   upload a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates) to Cloudflare

If your Cloudflare SSL certificate is not issued within 24 hours of Cloudflare domain activation:

-   If your origin web server has a valid SSL certificate, [temporarily pause Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/), and
-   [open a support ticket](https://dash.cloudflare.com/?to=/:account/support)  to provide the following information:
    -   the affected domain name, and
    -   a screenshot of the errors you observe.

Temporarily pausing Cloudflare will allow the HTTPS traffic to be served properly from your origin web server while the support team investigates the issue.

___

## OCSP response error

**Symptom** Visitors to your site observe an OCSP response error.

**Resolution** This error is either caused by the browser version or an issue requiring attention by one of Cloudflare’s SSL vendors. In order to properly diagnose, [open a support ticket](https://dash.cloudflare.com/?to=/:account/support) with the following information provided by the visitor that observes the browser error:

1.  The output from [_https://aboutmybrowser.com/_](https://aboutmybrowser.com/)  
2.  1.  The output of _https://example.com/cdn-cgi/trace_ from the visitor’s browser. Replace _example.com_  with your website’s domain name.

___

## SSL expired or SSL mismatch errors

**Symptom** Visitors observe error messages in their browser about SSL expiration or SSL mismatch.

**Resolution**

For more details, refer to [ERR\_SSL\_VERSION\_OR\_CIPHER\_MISMATCH](/ssl/troubleshooting/version-cipher-mismatch/).

___

## Incorrect HSTS headers

**Symptom**

The HSTS headers (`Strict-Transport-Security` and `X-Content-Type-Options`) in the response do not match the configuration settings defined in **SSL/TLS** > **Edge Certificates**.

**Resolution**

You may have configured [HTTP Response Header Modification Rules](/rules/transform/response-header-modification) that are overriding the HSTS header values defined in the **SSL/TLS** app.

1.  Go to **Rules** > **Transform Rules**.
2.  Under **HTTP Response Header Modification**, check the existing rules for a rule that is setting the value of one of the HSTS headers (`Strict-Transport-Security` or `X-Content-Type-Options`).
3.  Delete (or edit) the rule so that the HSTS configuration settings defined in the **SSL/TLS** app are applied.
4.  Repeat this procedure for the other HSTS header.

___

## Related resources

-   [Redirect loop errors](/ssl/troubleshooting/too-many-redirects/)
-   [Mixed content errors](/support/ssl-tls/troubleshooting/troubleshooting-mixed-content-errors/)
-   [Determine if your browser supports SNI](https://caniuse.com/#feat=sni)
