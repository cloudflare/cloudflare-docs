---
pcx_content_type: reference
title: Chrome trust store update
weight: 1
---

# Chrome trust store update

Chrome, Google's web browser, [has announced](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html) it will no longer trust certificates by Entrust or AffirmTrust.

Since these are not within the [certificate authorities](/ssl/reference/certificate-authorities/) used by Cloudflare, this change will only affect customers who have uploaded [custom certificates](/ssl/edge-certificates/custom-certificates/) issued by either Entrust or AffirmTrust.

## Impact

New Entrust or AffirmTrust certificates, issued on **November 1, 2024 or after**, will not be trusted on Google Chrome by default. This means that visitors trying to access websites or applications serving these certificates will encounter a full page warning, stating that their connection is not properly secured.

Certificates issued before that date will continue to be trusted until their expiry.

As explained in [Google's announcement](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html), this approach relies on a feature of Chrome versions 127 or later that can remove default trust based on Signed Certificate Timestamp (SCT) data.

Refer to the announcement for a full list of roots that will be distrusted by Chrome and for details on how to test impact for your website.

Unlike [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for custom certificates. Throughout the Chrome update, Clouflare will continue to serve any custom certificates that meet the [custom certificates requirements](/ssl/edge-certificates/custom-certificates/uploading/#certificate-requirements). However, note that Entrust or AffirmTrust certificates issued on November 1, 2024 or after will not be trusted by Google Chrome.

## Recommendations

To ensure that Chrome users can continue to access your website or application without encountering a warning, consider the following options:

* Issue and [upload a certificate](/ssl/edge-certificates/custom-certificates/uploading/) from a different certificate authority, [trusted by Chrome](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md).

* Migrate to Cloudflare managed certificates: [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [Advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

## More resources

* [Google Security Blog](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html)
* [Entrust TLS Certificate Information Center](https://www.entrust.com/tls-certificate-information-center)