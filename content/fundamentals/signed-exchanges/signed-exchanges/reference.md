---
pcx_content_type: reference
title: Reference
weight: 3
---

# Reference

## Verify that Automatic Signed Exchanges are working

Make a request with the the signed exchange request header:

1. Run the following command in your terminal, and replace `https://example.com` with your domain:

```bash
curl -svo /dev/null https://example.com -H "Accept: application/signed-exchange;v=b3"
```

2. Verify that the `Content-Type` in the response headers is `application/signed-exchange;v=b3` rather than `text/html`.

## Certificate Authority used with SXGs

Cloudflare uses Google for SXGs' certificate issuance. Once SXGs is enabled, Cloudflare automatically adds the CAA records on behalf of the zones. Refer to the following example below:

```bash
% dig example.com caa
;; ANSWER SECTION:
example.com. 3600 IN CAA 0 issue "digicert.com; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issue "pki.goog; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issuewild "digicert.com; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issuewild "pki.goog; cansignhttpexchanges=yes"
```