---
pcx_content_type: reference
title: Bundle methodologies
weight: 4
---

# Bundle methodologies

When an SSL certificate is deployed to Cloudflare's global network, it may be augmented with intermediate and root certificates to assist the user agent in finding a chain to a publicly trusted root. 

You can control the mechanics of how certificates are bundled by specifying a bundling methodology.

## Intermediate and root certificates

Cloudflare maintains intermediate and root certificates used for bundling on a [GitHub repository](https://github.com/cloudflare/cfssl_trust). As the certificates expire or are removed by certificate authorities, Cloudflare removes and adds them accordingly.

Expiration values for these certificates may appear in the `expires_on` field when you use the [Analyze Certificate endpoint](/api/operations/analyze-certificate-analyze-certificate) - often when the methodology you specify is [Compatible](#compatible). However, these expiration values reflect intermediate and root certificates - which are handled by Cloudflare -, not the leaf certificate you would have previously uploaded to Cloudflare.

## Methodologies

### Compatible

Compatible is the default methodology and uses **common and well distributed intermediate certificates** to complete the chain. This  ensures that the resulting bundle is compatible with as many clients as possible.

### Modern

Modern consists of attempts to make the chain as efficient as possible, often by using **newer or fewer intermediate certificates**.

### User-defined

User-defined allows you to paste **your own certificate chain** and present that bundle to clients. You must specify any intermediates you wish to use, followed by the leaf. If you are using a self-signed certificate (not recommended), you must use this mode.
