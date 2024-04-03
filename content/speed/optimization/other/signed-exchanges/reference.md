---
pcx_content_type: reference
title: Reference
weight: 4
meta:
    title: Reference - Signed exchanges
---

# Reference

## Verify that signed exchanges are working

Make a request with the signed exchange request header:

1. Open a terminal and run the following command, replacing `https://example.com` with your domain:

```sh
$ curl -svo /dev/null https://example.com -H "Accept: application/signed-exchange;v=b3"
```

2. Verify that the `Content-Type` in the response headers is `application/signed-exchange;v=b3` rather than `text/html`.

## Certificate authority used with SXGs

Cloudflare uses [Google for SXGs' certificate issuance](https://web.dev/signed-exchanges/#certificates). Once SXGs is enabled, Cloudflare automatically adds the Certification Authority Authorization records on behalf of the zones. Refer to the following example below:

```bash
$ dig example.com caa
;; ANSWER SECTION:
example.com. 3600 IN CAA 0 issue "digicert.com; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issue "pki.goog; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issuewild "digicert.com; cansignhttpexchanges=yes"
example.com. 3600 IN CAA 0 issuewild "pki.goog; cansignhttpexchanges=yes"
```