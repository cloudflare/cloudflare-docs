---
pcx_content_type: troubleshooting
title: Issuance errors
weight: 3
---

# Certificate issuance errors

Consider a list of error messages displayed when a certificate issuance fails and the respective troubleshooting steps.

## CAA records

> CAA records block issuance. Please remove all CAA records or add records for this authority.

A Certificate authority authorization (CAA) DNS record specifies which certificate authorities (CAs) are allowed to issue certificates for a domain. If you or someone else in your organization has added CAA records that do not include the certificate authority trying to issue a certificate, the issuance will be blocked.

You can find a list of CAA records content for all CAs used by Cloudflare in [Certificate authorities](/ssl/reference/certificate-authorities/#caa-records)

## Rate limiting

{{<render file="_error-rate-limiting.md">}}


<!--- All errors taken from source code

```txt
Internal error with Certificate Authority. Please check later
```

> Certificate authority encountered a SERVFAIL during DNS lookup, please check your DNS reachability.

> The certificate authority will not issue for this domain. Please check your input or try another authority.

--->