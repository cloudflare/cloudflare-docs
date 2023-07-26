---
pcx_content_type: reference
title: Certificate authorities
layout: list
weight: 5
---

# Certificate authorities

For publicly trusted certificates, Cloudlfare partners with different certificate authorities (CAs). Refer to this page to check what CAs are used for each Cloudflare offering and for more details about the CAs [features, limitations and device ubiquity](#features-limitations-and-device-ubiquity).

## Availability per certificate type and chain

{{<table-wrap>}}

| Certificate         | Chain | [Let's Encrypt](#lets-encrypt) | [Google Trust Services](#google-trust-services) | [Sectigo](#sectigo) | [DigiCert](#digicert)                 |
|---------------------|-------|---------------|-----------------------|---------|--------------------------|
| [Universal](/ssl/edge-certificates/universal-ssl/)| ECDSA<br /><br /><br />RSA<br />(Paid plans only) | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> Deprecating soon <br /><br />✅<br /> Deprecating soon|
| [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) | ECDSA<br /><br /><br />RSA | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> Deprecating soon <br /><br /> ✅<br /> Deprecating soon |
| [Total TLS](/ssl/edge-certificates/additional-options/total-tls/) | ECDSA<br /><br /><br />RSA | ✅<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> Deprecating soon <br /><br /> ✅<br /> Deprecating soon |
| [Custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) | ECDSA<br /><br /><br />RSA | ❌<br /><br /><br />✅| ❌<br /><br /><br />✅ | N/A<br /><br /><br />N/A | ✅<br /> Deprecating soon <br /><br /> ✅<br /> Deprecating soon |
| [Backup](/ssl/edge-certificates/backup-certificates/) | ECDSA<br /><br />RSA | ✅<br /><br />✅| ❌<br /><br />✅ | ✅<br /><br />✅ | ❌ <br /><br /> ❌ |

{{</table-wrap>}}

## Features, limitations and device ubiquity

{{<Aside type="warning" header="Universal SSL">}}
{{<render file="_universal-ssl-validity.md">}}
{{</Aside>}}

### Let's Encrypt

* Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 90 days.
* [DCV tokens](/ssl/edge-certificates/changing-dcv-method/) are valid for 7 days.
* Hostname on certificate can contain up to 10 levels of subdomains.
* Duplicate certificate limit of [5 certificates](https://letsencrypt.org/docs/rate-limits/) per week.

<details>
<summary>Device ubiquity</summary>
<div>

{{<Aside type="warning">}}

This section summarizes commonly requested client support information. For the complete and most up-to-date certificate compatibility, always refer to the respective [certificate authority documentation](https://letsencrypt.org/docs/certificate-compatibility/).

{{</Aside>}}

The main determining factor for whether a platform can validate Let’s Encrypt certificates is whether that platform trusts ISRG’s “ISRG Root X1” certificate.

**Platforms that trust ISRG Root X1**
* Windows >= XP SP3 (assuming Automatic Root Certificate Update isn’t manually disabled) 
* macOS >= 10.12.1 iOS >= 10 (iOS 9 does not include it)
* iPhone 5 and above can upgrade to iOS 10 and can thus trust ISRG Root X1
* Android >= 7.1.1 (but Android >= 2.3.6 will work by default due to [special cross-sign](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* Mozilla Firefox >= 50.0
* Ubuntu >= Precise Pangolin / 12.04 (with updates applied)
* Debian >= jessie / 8 (with updates applied)
* Java 8 >= 8u141
* Java 7 >= 7u151
* NSS >= 3.26

Browsers (Chrome, Safari, Edge, Opera) generally trust the same root certificates as the operating system they are running on. Firefox is the exception, having its own root store.

</div>
</details>

[Root CAs](https://letsencrypt.org/certificates/) 

### Google Trust Services

* Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days.
* [DCV tokens](/ssl/edge-certificates/changing-dcv-method/) valid for 14 days.
* Punycode domains are not yet supported.
* Cloudflare will be supporting ECDSA with Google Trust Services soon.

<details>
<summary>Device ubiquity</summary>
<div>

Currently trusted by Microsoft, Mozilla, Safari, Cisco, Oracle Java, and Qihoo’s 360 browser. All browsers or operating systems that depend on these root programs are covered.
In addition, some of Google Trust Services' [root CAs](https://pki.goog/faq/#faq-27) may rely on a cross-signature to ensure optimal support across a wide range of devices.

</div>
</details>

### Sectigo

Only used for [Backup certificates](/ssl/edge-certificates/backup-certificates/)

### Digicert

Supports [validity periods](/ssl/reference/certificate-validity-periods/) of 14, 30, and 90 days.

[TLD restrictions](https://knowledge.digicert.com/solution/Embargoed-Countries-and-Regions.html)

[Browser compatibility](https://www.digicert.com/support/resources/faq/public-trust-and-certificates/are-digicert-tls-ssl-certificates-compatible-with-my-browser)

[Status page](https://status.digicert.com/)

[Root CAs](https://www.digicert.com/kb/digicert-root-certificates.htm)


## CAA records

{{<render file="_caa-records-definition.md">}}
<br/>

{{<render file="_caa-records-added-by-cf.md">}}