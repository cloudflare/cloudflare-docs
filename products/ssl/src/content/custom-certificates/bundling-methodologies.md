---
order: 3
---

# Bundling methodologies

When an SSL certificate is deployed to the Cloudflare edge, it may be augmented with intermediate and root certificates to assist the user agent in finding a chain to a publicly trusted root. You can control the mechanics of how certificates are bundled by specifying a bundling methodology.

## Compatible

Compatible mode is the default and uses common and well distributed intermediate certificates to complete the chain, ensuring that the resulting bundle is compatible with as many clients as possible.

## Modern

Modern attempts to make the chain as efficient as possible, often by using newer or fewer intermediate certificates.

## User-defined

User defined allows you to paste your own certificate chain and present that bundle to clients. You must specify any intermediates you wish to use, followed by the leaf. If you’re using a self-signed certificate (not recommended), you must use this mode.
