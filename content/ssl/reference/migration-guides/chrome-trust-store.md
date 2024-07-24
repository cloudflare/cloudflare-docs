---
pcx_content_type: reference
title: Chrome trust store update
weight: 1
---

# Chrome trust store update

Chrome, Google's web browser, [has announced](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html) it will no longer trust certificates by Entrust or AffirmTrust.

Since these are not within the [certificate authorities](/ssl/reference/certificate-authorities/) used by Cloudflare managed certificates, this change will only affect customers who have uploaded [custom certificates](/ssl/edge-certificates/custom-certificates/) issued by either Entrust or AffirmTrust.

## Impact

* **November 1, 2024**: Entrust or AffirmTrust certificates issued on Novermber 1, 2024 or after will not be trusted on Google Chrome by default. This means that visitors trying to access websites or applications serving these certificates will land on a warning page, stating that their connection is not properly secured.

* Issued before that will be trusted throughout their expiry

* Signed Certificate Timestamp

* Entrust roots list

* Chrome versions

## Recommendations

To ensure that Chrome users can continue to access your website without encountering a warning, consider the following options:

* Issue and [upload a certificate](/ssl/edge-certificates/custom-certificates/uploading/) from a different certificate authority [trusted by Chrome](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md).

* Migrate to certificates managed by Cloudflare: [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [Advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

## More resources