---
title: Origin CA certificates
pcx_content_type: how-to
weight: 3
meta:
  description: Origin Certificate Authority (CA) certificates allow you to encrypt traffic between Cloudflare and your origin web server, and reduce origin bandwidth consumption.
---

# Origin CA certificates

Use Origin Certificate Authority (CA) certificates to encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth consumption. Once deployed, these certificates are compatible with [Strict SSL mode](/ssl/origin-configuration/ssl-modes/full-strict/).

For more background information on Origin CA certificates, refer to the [introductory blog post](https://blog.cloudflare.com/cloudflare-ca-encryption-origin/).

{{<Aside type="note">}}
Using Cloudflare Origin CA certificates do not prevent you from using [delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).
{{</Aside>}}

## Availability

{{<feature-table id="ssl.origin_certificates">}}

---

## Deploy an Origin CA certificate

### 1. Create an Origin CA certificate

To create an Origin CA certificate in the dashboard:

1.  Log in to the Cloudflare dashboard and select an account.
2.  Choose a domain.
3.  Go to **SSL/TLS** > **Origin Server**.
4.  Select **Create Certificate**.
5.  Choose either:
    - **Generate private key and CSR with Cloudflare**: Private key type can be RSA or ECC.
    - **Use my private key and CSR**: Paste the Certificate Signing Request into the text field.
6.  List the [hostnames (including wildcards)](#hostname-and-wildcard-coverage) the certificate should protect with SSL encryption. The zone root and first level wildcard hostname are included by default.
7.  Choose a **Certificate Validity** period.
8.  Select **Create**.
9.  Choose the **Key Format**:
    - Servers using OpenSSL — like Apache and NGINX — generally expect PEM files (Base64-encoded ASCII), but also work with binary DER files.
    - Servers using Windows and Apache Tomcat require PKCS#7 (a `.p7b` file).
10. Copy the signed **Origin Certificate** and **Private Key** into separate files. For security reasons, you cannot see the **Private Key** after you exit this screen.
11. Select **OK**.

{{<Aside type="note">}}For details about working with certificates programmatically, refer to [API calls](#api-calls).{{</Aside>}}

### 2. Install Origin CA certificate on origin server

To add an Origin CA certificate to your origin web server

1.  Upload the Origin CA certificate (created in [Step 1](#1-create-an-origin-ca-certificate)) to your origin web server.
2.  Update your web server configuration:

  * [Apache httpd](https://www.digicert.com/kb/csr-ssl-installation/apache-openssl.htm)
  * [GoDaddy Hosting](https://www.digitalcandy.agency/website-tips/cloudflare-origin-ca-free-ssl-installation-on-godaddy/)
  * [Microsoft IIS 7](https://www.digicert.com/csr-ssl-installation/iis-7.htm#ssl_certificate_install)
  * [Microsoft IIS 8 and 8.5](https://www.digicert.com/csr-ssl-installation/iis-8-and-8.5.htm#ssl_certificate_install)
  * [Microsoft IIS 10](https://www.digicert.com/kb/csr-creation-ssl-installation-iis-10.htm)
  * [NGINX](https://www.digicert.com/kb/csr-ssl-installation/nginx-openssl.htm)
  * [Apache Tomcat](https://www.digicert.com/csr-ssl-installation/tomcat-keytool.htm#ssl_certificate_install)
  * [Amazon Web Services](https://www.digicert.com/ssl-certficate-installation-amazon-web-services.htm)
  * [Apache cPanel](https://www.digicert.com/kb/ssl-certificate-installation-apache-cpanel.htm)
  * [Ubuntu Server with Apache2](https://www.digicert.com/kb/csr-ssl-installation/ubuntu-server-with-apache2-openssl.htm#ssl_certificate_install)


  {{<Aside type="note">}}If you do not see your server in the list above, search the [DigiCert documentation](https://www.digicert.com/search-results) or contact your hosting provider, web admin, or server vendor.{{</Aside>}}

3.  (Required for some) Upload the [Cloudflare CA root certificate](#cloudflare-origin-ca-root-certificate) to your origin server. This can also be referred to as the certificate chain.
4.  Enable SSL and port `443` at your origin web server.

### 3. Change SSL/TLS mode

After you have installed the Origin CA certificate on your origin web server, update the SSL/TLS encryption mode for your application.

If all your origin hosts are protected by Origin CA certificates or publicly trusted certificates:

1.  Go to **SSL/TLS**.
2.  For **SSL/TLS encryption mode**, select **Full (strict)**.

If you have origin hosts that are not protected by certificates, set the **SSL/TLS encryption** mode for a specific application to **Full (strict)** by using a [Page Rule](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

## Revoke an Origin CA certificate

If you misplace your key material or do not want a certificate to be trusted, you may want to revoke your certificate. You cannot undo this process.

To prevent visitors from seeing warnings about an insecure certificate, you may want to set your [SSL/TLS encryption](/ssl/origin-configuration/ssl-modes/) to **Full** or **Flexible** before revoking your certificate. Do this globally via the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls) or for a specific hostname via a [Page Rule](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

To revoke a certificate:

1.  Log in to the Cloudflare dashboard and select an account.
2.  Choose a domain.
3.  Go to **SSL/TLS** > **Origin Server**.
4.  In **Origin Certificates**, choose a certificate.
5.  Select **Revoke**.

## Additional details

### Cloudflare Origin CA root certificate

Some origin web servers require upload of the Cloudflare Origin CA root certificate or certificate chain. Use the following links to download either an ECC or an RSA version and upload to your origin web server:

- [Cloudflare Origin ECC PEM](/ssl/static/origin_ca_ecc_root.pem) (do not use with Apache cPanel)
- [Cloudflare Origin RSA PEM](/ssl/static/origin_ca_rsa_root.pem)

### Hostname and wildcard coverage

Certificates may be generated with up to 100 individual Subject Alternative Names (SANs). A SAN can take the form of a fully-qualified domain name (`www.example.com`) or a wildcard (`*.example.com`). You cannot use IP addresses as SANs on Cloudflare Origin CA certificates.

Wildcards may only cover one level, but can be used multiple times on the same certificate for broader coverage (for example, `*.example.com` and `*.secure.example.com` may co-exist).

## API calls

To automate processes involving Origin CA certificates, use the following API calls with [Origin CA Keys](/fundamentals/api/get-started/ca-keys/).

| Operation | Method | Endpoint |
| --- | --- | --- |
| [List certificates](/api/operations/origin-ca-list-certificates) | `GET` | `certificates?zone_id=<<ZONE_ID>>` |
| [Create certificate](/api/operations/origin-ca-create-certificate) | `POST` | `certificates` |
| [Get certificate](/api/operations/origin-ca-get-certificate) | `GET` | `certificates/<<ID>>` |
| [Revoke certificate](/api/operations/origin-ca-revoke-certificate) | `DELETE` | `certificates/<<ID>>` |

## Troubleshooting

Site visitors may see untrusted certificate errors if you pause or disable Cloudflare on subdomains that use Origin CA certificates. These certificates only encrypt traffic between Cloudflare and your origin server, not traffic from client browsers to your origin.
