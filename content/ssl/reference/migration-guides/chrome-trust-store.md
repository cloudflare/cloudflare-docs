---
pcx_content_type: reference
title: Chrome trust store update
weight: 1
---

# Chrome trust store update

Chrome, Google's web browser, [has announced](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html) it will no longer trust certificates by Entrust or AffirmTrust.

Since these are not within the [certificate authorities](/ssl/reference/certificate-authorities/) used by Cloudflare, this change will only affect customers who have uploaded [custom certificates](/ssl/edge-certificates/custom-certificates/) issued by either Entrust or AffirmTrust.

## Impact

New Entrust or AffirmTrust certificates, issued on **November 1, 2024** or after, will not be trusted on Google Chrome by default. This means that visitors trying to access websites or applications serving these certificates will land on a warning page, stating that their connection is not properly secured.

Certificates issued before that date will continue to be trusted until their expiry.

As explained in [Google's announcement](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html), this approach is based on a feature of Chrome versions 127 or later that can remove default trust based on Signed Certificate Timestamp (SCT) data.

Refer to the announcement for a full list of roots that will be removed from Chrome's trust store and for details on how to test impact for your website.

## Recommendations

To ensure that Chrome users can continue to access your website without encountering a warning, consider the following options:

* Issue and [upload a certificate](/ssl/edge-certificates/custom-certificates/uploading/) from a different certificate authority, [trusted by Chrome](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md).

* Migrate to certificates managed by Cloudflare: [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [Advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

## More resources