---
pcx_content_type: reference
title: Certificate authorities
layout: list
weight: 5
---

# Certificate authorities

For publicly trusted certificates, Cloudlfare partners with different certificate authorities (CAs). Refer to this page to check what CAs are used for each Cloudflare offering and for more details about the CAs [features, limitations and browser compatibility](#features-limitations-and-browser-compatibility).

## Availability per certificate type and encryption algorithm

{{<table-wrap>}}

| Certificate         | Algorithm | [Let's Encrypt](#lets-encrypt) | [Google Trust Services](#google-trust-services) | [Sectigo](#sectigo) | [DigiCert](#digicert-deprecating-soon)                 |
|---------------------|-------|---------------|-----------------------|---------|--------------------------|
| [Universal](/ssl/edge-certificates/universal-ssl/)| ECDSA<br /><br /><br />RSA<br /><sub>(Paid plans only)</sub> | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> <sub>Deprecating soon</sub> <br /><br />✅<br /> <sub>Deprecating soon</sub> |
| [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) | ECDSA<br /><br /><br />RSA | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> <sub>Deprecating soon</sub> <br /><br /> ✅<br /> <sub>Deprecating soon</sub> |
| [Total TLS](/ssl/edge-certificates/additional-options/total-tls/) | ECDSA<br /><br /><br />RSA | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ❌ <br /><br /><br /> ❌ |
| [SSL for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) | ECDSA<br /><br /><br />RSA |✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> <sub>Deprecating soon</sub> <br /><br /> ✅<br /> <sub>Deprecating soon</sub> |
| [Backup](/ssl/edge-certificates/backup-certificates/) | ECDSA<br /><br />RSA | ✅<br /><br />✅| ❌<br /><br />✅ | ✅<br /><br />✅ | ❌ <br /><br /> ❌ |

{{</table-wrap>}}

## Features, limitations and browser compatibility

{{<Aside type="warning" header="Universal SSL">}}
{{<render file="_universal-ssl-validity.md">}}
{{</Aside>}}

---

### Let's Encrypt

* Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 90 days.
* [DCV tokens](/ssl/edge-certificates/changing-dcv-method/) are valid for 7 days.

#### Limitations

* Hostname on certificate can contain up to 10 levels of subdomains.
* Duplicate certificate limit of [5 certificates](https://letsencrypt.org/docs/rate-limits/) per week.

#### Browser compatibility

{{<Aside type="warning">}}

This section summarizes commonly requested client support information. For the complete and most up-to-date certificate compatibility, refer to [Let's Encrypt documentation](https://letsencrypt.org/docs/certificate-compatibility/).

{{</Aside>}}

The main determining factor for whether a platform can validate Let’s Encrypt certificates is whether that platform trusts ISRG’s “ISRG Root X1” certificate. You can find the full list of supported clients in the [Let's Encrypt documentation](https://letsencrypt.org/docs/certificate-compatibility/). Older versions of Android and Java clients might not be compatible with Let’s Encrypt certificates.

#### Other resources

[Let's Encrypt Root CAs](https://letsencrypt.org/certificates/)

---

### Google Trust Services

* Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days.
* [DCV tokens](/ssl/edge-certificates/changing-dcv-method/) are valid for 14 days.

#### Limitations

* Punycode domains are not yet supported.
* Cloudflare will be supporting ECDSA with Google Trust Services soon.

#### Browser compatibility (most compatible)

{{<Aside type="warning">}}

This section summarizes commonly requested client support information. For the complete and most up-to-date certificate compatibility, refer to [Google Trust Services documentation](https://pki.goog/faq/).

{{</Aside>}}

Currently trusted by Microsoft, Mozilla, Safari, Cisco, Oracle Java, and Qihoo’s 360 browser. All browsers or operating systems that depend on these root programs are covered.
In addition, some of Google Trust Services' [root CAs](https://pki.goog/faq/#faq-27) may rely on a cross-signature to ensure optimal support across a wide range of devices.

---

### Sectigo

* Only used for [Backup certificates](/ssl/edge-certificates/backup-certificates/).
* Backup certificates are valid for 90 days.

#### Browser compatibility

Refer to [Sectigo documentation](https://www.sectigo.com/knowledge-base/detail/SSL-Browser-Compatibility-1527076085062/kA01N000000zFJt).

---

### DigiCert (deprecating soon)

* Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days.
* [DCV tokens](/ssl/edge-certificates/changing-dcv-method/) are valid for 30 days.

#### Limitations

Due to sanctions imposed by the United States, DigiCert is legally prohibited or restricted from offering its products and services to specific countries or regions. Refer to [Embargoed countries and regions](https://knowledge.digicert.com/solution/Embargoed-Countries-and-Regions.html) for details.

#### Browser compatibility

Refer to [DigiCert documentation](https://www.digicert.com/support/resources/faq/public-trust-and-certificates/are-digicert-tls-ssl-certificates-compatible-with-my-browser).

#### Other resources

[Status page](https://status.digicert.com/)

[DigiCert Root CAs](https://www.digicert.com/kb/digicert-root-certificates.htm)

---

## CAA records

{{<render file="_caa-records-definition.md">}}
<br/>

If you are using Cloudflare as your DNS provider, then the CAA records will be added on your behalf. If you need to add CAA records, refer to [Add CAA records](/ssl/edge-certificates/caa-records/).

The following table lists the CAA record content for each CA:

{{<table-wrap>}}

| Certificate authority | CAA record content                       |
|-----------------------|------------------------------------------|
| Let's Encrypt         | `letsencrypt.org`                        |
| Google Trust Services | `pki.goog; cansignhttpexchanges=yes`     |
| DigiCert              | `digicert.com; cansignhttpexchanges=yes` |
| Sectigo               | `sectigo.com`                            |

{{</table-wrap>}}