---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/204144518-SSL-FAQ
title: SSL FAQ
---

# SSL FAQ



## I have multiple Cloudflare certificates, which one is used?

Cloudflare certificates are prioritized by [](https://support.cloudflare.com/hc/articles/203295200)certificate type and also by most specific hostname.

Exceptions to general prioritization occur based on hostname specificity.  Certificates that mention a specific hostname are preferred to wildcard certificates. For example, a Universal SSL certificate that explicitly mentions _www.example.com_ takes priority over a certificate that matches the _www_ hostname via a wildcard such as _\*.example.com._

{{<Aside type="warning">}}
When dealing with a child zone, a certificate uploaded whose subject or
SAN is a wildcard for its parent domain, will show in the web UI as
being ONLY for the Apex hostname in the domain. Otherwise, the UI will
include with the wildcard (\*) symbol as expect.
{{</Aside>}}

For more details on hostname priority, refer to our [developer documentation](/ssl/reference/certificate-and-hostname-priority/).

___

## Will having Cloudflare's SSL help with SEO?

Yes, Google announced that they use [HTTPS as a ranking signal for SEO](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

For further SEO tweaks, refer to our article on [improving SEO Rankings with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-).

___

## How long does it take for Cloudflare's SSL to activate?

If Cloudflare is your [authoritative DNS provider](/dns/zone-setups/full-setup), Universal SSL certificates typically issue within 15 minutes of domain activation at Cloudflare and do not require further customer action after domain activation.  Alternatively, if you use [Cloudflare services via CNAME records](/dns/zone-setups/partial-setup) set at your authoritative DNS provider, provisioning your Universal SSL certificate requires manual addition of [DNS verification records](/ssl/edge-certificates/universal-ssl/enable-universal-ssl#non-authoritative-partial-domains) at your authoritative DNS provider.  [Advanced SSL certificates](/ssl/edge-certificates/advanced-certificate-manager) also typically issue within 15 minutes.

If the Certificate Authority requires a manual review of brand, phishing, or TLD requirements, a Universal SSL certificate can take longer than 24 hours to issue.

___

## What does SSL invalid brand check mean?

Some domains are not eligible for the Universal SSL if they contain words that conflict with trademarked domains.

To resolve this issue, you can either:

-   [Upload your own certificate](/ssl/edge-certificates/custom-certificates/uploading) if the domain is on a Business or Enterprise plan, or
-   Purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager)

___

## Does Cloudflare SSL support Internationalized Domain Names (IDN)?

Cloudflare supports double byte / IDN / punycode domains.  Domains with non-Latin characters receive SSL certificates just like any other domain added to Cloudflare.

___

## How do I redirect all visitors to HTTPS/SSL?

Refer to [Encrypt all visitor traffic](/ssl/edge-certificates/encrypt-visitor-traffic/).

___

## Does SSL work for hosting partners?

A Free Universal SSL certificate is available for all new Cloudflare domains added via a hosting partner through both CNAME and Full DNS integrations.

{{<Aside type="note">}}
For domains added to Cloudflare prior to December 9, 2016, the hosting
partner must delete and re-add the domain to Cloudflare to provision the
SSL certificate.
{{</Aside>}}

Proxy a subdomain through Cloudflare to provision the Free Universal SSL certificate.

___

## Are Cloudflare SSL certificates shared?

None of the SSL certificates issued by Cloudflare are shared across multiple domains for multiple customers.

___

## An SSL certificate is installed at my website, why do I see a Cloudflare certificate?

Cloudflare must decrypt traffic in order to cache and filter malicious traffic. Cloudflare either re-encrypts traffic or sends plain text traffic to the origin web server depending on the [SSL option](https://support.cloudflare.com/hc/articles/200170416) selected in the **Overview** tab of the **SSL/TLS** app.

___

## I want Cloudflare to use an SSL certificate I've purchased elsewhere

Domains on Business and Enterprise plans are allowed to upload a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates).

___

## Does enabling Cloudflare affect PayPal's TLS 1.2 requirement?

No. Since Cloudflare does not proxy connections made directly to paypal.com, enabling Cloudflare for your domain does not affect how TLS connections are made.

___

## How can I serve an SSL certificate from Cloudflare's China data centers?

Cloudflare [Universal SSL](/ssl/edge-certificates/universal-ssl) and [advanced](/ssl/edge-certificates/advanced-certificate-manager) certificates are not deployed in China.  If your domain is on an Enterprise plan and has been granted access to China data centers, Cloudflare's data centers in China only serve a SSL certificate for your domain under the following conditions:

1.  You have uploaded a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates/uploading).
2.  **Allow Private Keys in China (Custom Certificates)** is set to _On_ in the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app.

___

## Does Cloudflare support TLS client authentication?

TLS Client Authentication validates that a certificate presented by a client is signed by the company’s root Certificate Authority certificate.  By validating this certificate on each request, access can be limited to authorized client connections.  To enable TLS client authentication via Cloudflare, refer to our documentation on [Mutual TLS authentication](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

## How do I enable Universal SSL with GitHub?

Refer to the Cloudflare blog post about [using Cloudflare's Universal SSL with GitHub Pages](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/).

___

## How do I obtain an SSL certificate for customers on partial (CNAME) setup?

For more details, refer to [Domain Control Validation](/ssl/edge-certificates/changing-dcv-method/methods/).

___

## Can I use Certificate Pinning?

No. Multiple industry leaders — including [Digicert](https://www.digicert.com/blog/certificate-pinning-what-is-certificate-pinning) and [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning) — have discouraged certificate pinning because of security concerns.

For a safer alternative, use [Certificate Transparency Monitoring](/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/).

___

## Where can I learn more about SSL?

To learn more about SSL, go to the [Cloudflare Learning Center](https://www.cloudflare.com/learning/ssl/what-is-ssl/).

For SSL terms and definitions, go to the [Cloudflare Glossary](/fundamentals/glossary).

___

## Redsys doesn't seem to be working with my Let's Encrypt Certificate?

The Let's Encrypt Certificate Authority and SNI are not currently supported by Redsys.

We recommend either :

-   Changing the Universal Certificate to CA back to Digicert (default)

OR

-   Advanced Certificate Manager or Custom Certificate using a different CA other than Let's Encrypt
