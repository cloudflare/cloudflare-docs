---
pcx_content_type: faq
title: FAQ
meta:
    title: General FAQ
---

# FAQ

The following provide answers to the most common questions associated with Cloudflare SSL/TLS certificates and settings.

## If I have multiple Cloudflare certificates, which one is used?

Cloudflare certificates are prioritized by a combination of hostname specificity, zone specificity, and certificate type.

For more details, refer to [Certificate and hostname priority](/ssl/reference/certificate-and-hostname-priority/).

{{<Aside type="warning">}}

Occasionally, the Cloudflare dashboard displays a wildcard certificate with only the apex hostname listed (and does not include the wildcard symbol `*`).

This behavior occurs when all of the following conditions are true:
- The zone is on a [subdomain setup](/dns/zone-setups/subdomain-setup/).
- The certificate has a subject or SAN that is a wildcard for the zone's parent domain.

{{</Aside>}}

___

## Will having Cloudflare's SSL help with SEO?

Yes, Google announced that they use [HTTPS as a ranking signal for SEO](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

For further SEO tweaks, refer to our article on [improving SEO Rankings with Cloudflare](/fundamentals/basic-tasks/improve-seo/).

___

## How long does it take for Cloudflare's SSL to activate?

If Cloudflare is your [authoritative DNS provider](/dns/zone-setups/full-setup), Universal SSL certificates typically issue within 15 minutes of domain activation at Cloudflare and do not require further customer action after domain activation.

Alternatively, if you use [Cloudflare services via `CNAME` records](/dns/zone-setups/partial-setup) set at your authoritative DNS provider, provisioning your Universal SSL certificate requires manual addition of [DNS verification records](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup) at your authoritative DNS provider. [Advanced SSL certificates](/ssl/edge-certificates/advanced-certificate-manager/) also typically issue within 15 minutes.

If the Certificate Authority requires a manual review of brand, phishing, or TLD requirements, a Universal SSL certificate can take longer than 24 hours to issue.

___

## What does SSL invalid brand check mean?

Some domains are not eligible for the Universal SSL if they contain words that conflict with trademarked domains.

To resolve this issue, you can:

-   Purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
-   Upload your own [custom certificate](/ssl/edge-certificates/custom-certificates/uploading/).

___

## Does Cloudflare SSL support Internationalized Domain Names (IDN)?

The double byte / IDN / punycode domains support for Cloudflare edge certificates depends on the [certificate authority (CA)](/ssl/reference/certificate-authorities).
Google Trust Services does not support punycode domains as mentioned in the [certificate authorities limitations](/ssl/reference/certificate-authorities/#limitations-1).

___

## How do I redirect all visitors to HTTPS/SSL?

Refer to [Encrypt all visitor traffic](/ssl/edge-certificates/encrypt-visitor-traffic/).

___

## Does SSL work for hosting partners?

A free Universal SSL certificate is available for all new Cloudflare domains added via a hosting partner using both [full](/dns/zone-setups/full-setup/) and {{<glossary-tooltip term_id="partial setup" link="/dns/zone-setups/partial-setup/">}}partial setups{{</glossary-tooltip>}}.

For more details, refer to [Enable Universal SSL certificates](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/).

{{<Aside type="note">}}

For domains added to Cloudflare prior to December 9, 2016, the hosting
partner must delete and re-add the domain to Cloudflare to provision the
SSL certificate.

{{</Aside>}}

___

## Are Cloudflare SSL certificates shared?

No. Cloudflare SSL/TLS certificates are not shared across domains nor across customers.

___

## Why do I see a Cloudflare certificate when an SSL certificate is installed at my website?

Cloudflare must decrypt traffic in order to cache and filter malicious traffic. Cloudflare either re-encrypts traffic or sends plain text traffic to the origin web server depending on your domain's [encryption mode](/ssl/origin-configuration/ssl-modes/).

___

## I want Cloudflare to use an SSL certificate that I purchased elsewhere.

Domains on Business and Enterprise plans can upload a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates).

___

## Does enabling Cloudflare affect PayPal's TLS 1.2 requirement?

No. Since Cloudflare does not proxy connections made directly to `paypal.com`, enabling Cloudflare for your domain does not affect how TLS connections are made.

However, note that PayPal IPN (Instant Payment Notification) might not support [TLS version 1.3](/ssl/edge-certificates/additional-options/tls-13/) if you have it enabled on your zone.
If you are encountering issues with PayPal IPN when the traffic is proxied by Cloudflare, try setting the [Minimum TLS version](/ssl/edge-certificates/additional-options/minimum-tls/) to `1.2`.

___

## How can I serve an SSL certificate from Cloudflare's China data centers?

Cloudflare [Universal SSL](/ssl/edge-certificates/universal-ssl) and [advanced](/ssl/edge-certificates/advanced-certificate-manager) certificates are not deployed in China.  If your domain is on an Enterprise plan and has been granted access to China data centers, Cloudflare's data centers in China only serve a SSL certificate for your domain under the following conditions:

1.  You have uploaded a [Custom SSL certificate](/ssl/edge-certificates/custom-certificates/uploading).
2.  **Allow Private Keys in China (Custom Certificates)** is set to _On_ in the **Edge Certificates** tab of the Cloudflare **SSL/TLS** app.

___

## Does Cloudflare support TLS client authentication?

Yes. For more details, refer to our documentation on [Mutual TLS authentication](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

## How do I obtain an SSL certificate for customers on partial (CNAME) setup?

A [partial DNS setup](/dns/zone-setups/partial-setup/) requires additional steps to provision and validate an SSL certificate.

For more details, refer to [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl#partial-dns-setup).

___

## Can I use Certificate Pinning?

No. Multiple industry leaders — including [Digicert](https://www.digicert.com/blog/certificate-pinning-what-is-certificate-pinning) and [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning) — have discouraged certificate pinning because of security concerns.

For a safer alternative, use [Certificate Transparency Monitoring](/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/).

Refer to [Certificate pinning](/ssl/reference/certificate-pinning/) for more details.

___

## Where can I learn more about SSL?

To learn more about SSL, go to the [Cloudflare Learning Center](https://www.cloudflare.com/learning/ssl/what-is-ssl/).

___

## Redsys is not working with my Let's Encrypt Certificate.

The Let's Encrypt Certificate Authority and SNI are not currently supported by Redsys.

We recommend one of the following options:

-   Change the Universal Certificate Certificate Authority to a different CA.
-   Add an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/) or [custom certificate](/ssl/edge-certificates/custom-certificates/) using a different CA.
