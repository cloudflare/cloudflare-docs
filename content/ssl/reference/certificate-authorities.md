---
pcx_content_type: reference
title: Certificate authorities
layout: list
weight: 5
---

# Certificate authorities

Learn more about the certificate authorities Cloudflare uses to issue [Universal](/ssl/edge-certificates/universal-ssl/), [Advanced](/ssl/edge-certificates/advanced-certificate-manager/), or [SSL for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) certificates.

## Comparisons

### Main features

| Certificate authority | Features | Limitations | Client support |
| --- | --- | --- | --- |
| **DigiCert** (soon to be [deprecated](/ssl/reference/migration-guides/digicert-update/)) | RSA and ECDSA certificates<br/><br/>Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days | [TLD restrictions](https://knowledge.digicert.com/solution/Embargoed-Countries-and-Regions.html) | [Browser compatibility](https://www.digicert.com/support/resources/faq/public-trust-and-certificates/are-digicert-tls-ssl-certificates-compatible-with-my-browser)<br/><br/>[Status page](https://status.digicert.com/)<br/><br/>[Root CAs](https://www.digicert.com/kb/digicert-root-certificates.htm) |
| **Let’s Encrypt** | RSA and ECDSA certificates<br/><br/>Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 90 days.<br/><br/>[DCV tokens](/ssl/edge-certificates/changing-dcv-method/) valid for 7 days. | Hostname on certificate must contain 10 or less levels of subdomains<br/><br/> Duplicate certificate limit of [5 certificates](https://letsencrypt.org/docs/rate-limits/) per week. | [Browser compatibility](https://letsencrypt.org/docs/certificate-compatibility/)<br/><br/>[Root CAs](https://letsencrypt.org/certificates/) |
| **Google Trust Services** | RSA certificates<br/><br/>Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days.<br/><br/>[DCV tokens](/ssl/edge-certificates/changing-dcv-method/) valid for 14 days. | ECDSA certificates and Punycode domains are not yet supported. | Currently trusted by Microsoft, Mozilla, Safari, Cisco, Oracle Java, and Qihoo’s 360 browser. All browsers or operating systems that depend on these root programs are covered.<br/><br/>In addition, some of Google Trust Services' [root CAs](https://pki.goog/faq/#faq-27) may rely on a cross-signature to ensure optimal support across a wide range of devices. |

### CAA records

{{<render file="_caa-records-definition.md">}}
<br/>

{{<render file="_caa-records-added-by-cf.md">}}

## Backup certificates

Cloudflare may also issue [backup certificates](/ssl/edge-certificates/backup-certificates/) from Google Trust Services or Sectigo.
