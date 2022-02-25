---
title: Origin CA certificates
pcx-content-type: how-to
weight: 4
meta:
  title: Managing Cloudflare Origin CA certificates
---

# Managing Cloudflare Origin CA certificates

Use Origin Certificate Authority (CA) certificates to encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth consumption. Once deployed, these certificates are compatible with [Strict SSL mode](/ssl/origin-configuration/ssl-modes/#strict).

<Aside type="note">
For more background information on Origin CA certificates, see the <a href="https://blog.cloudflare.com/cloudflare-ca-encryption-origin/">introductory blog post</a>.
</Aside>

***

## Deploy an Origin CA certificate

### 1. Create an Origin CA certificate

To create an Origin CA certificate in the dashboard:

1.  Log in to the Cloudflare dashboard and select an account.
2.  Choose a domain.
3.  Go to **SSL/TLS** > **Origin Server**.
4.  Click **Create Certificate**.
5.  Choose either:
    *   **Generate private key and CSR with Cloudflare**: Private key type can be RSA or ECDSA.
    *   **Use my private key and CSR**: Paste the Certificate Signing Request into the text field.
6.  List the [hostnames (including wildcards)](#hostname-and-wildcard-coverage) the certificate should protect with SSL encryption. The zone root and first level wildcard hostname are included by default.
7.  Choose the [expiration date](#expiration).
8.  Click **Next**.
9.  Choose the **Key Format**:
    *   Servers using OpenSSL — like Apache and NGINX — generally expect PEM files (Base64-encoded ASCII), but also work with binary DER files.
    *   Servers using Windows and Apache Tomcat require PKCS#7 (a `.p7b` file).
10. Copy the signed **Origin Certificate** and **Private Key** into separate files. For security reasons, you cannot see the **Private Key** after you exit this screen.
11. Click **OK**.

<Aside type="note">For details about working with certificates programmatically, see <a href="#api-calls">API calls</a>.</Aside>

### 2. Install Origin CA certificate on origin server

To add an Origin CA certificate to your origin web server

1.  Upload the Origin CA certificate (created in [Step 1](#1-create-an-origin-ca-certificate)) to your origin web server.
2.  Update your web server configuration:

     <details>
     <summary>Configuration guides for popular servers</summary>
     <div>

    *   [Apache httpd](https://www.digicert.com/kb/csr-ssl-installation/apache-openssl.htm)
    *   [GoDaddy Hosting](https://www.digitalcandy.agency/website-tips/cloudflare-origin-ca-free-ssl-installation-on-godaddy/)
    *   [Microsoft IIS 7](https://www.digicert.com/csr-ssl-installation/iis-7.htm#ssl_certificate_install)
    *   [Microsoft IIS 8 and 8.5](https://www.digicert.com/csr-ssl-installation/iis-8-and-8.5.htm#ssl_certificate_install)
    *   [Microsoft IIS 10](https://www.digicert.com/kb/csr-creation-ssl-installation-iis-10.htm)
    *   [NGINX](https://www.digicert.com/kb/csr-ssl-installation/nginx-openssl.htm)
    *   [Apache Tomcat](https://www.digicert.com/csr-ssl-installation/tomcat-keytool.htm#ssl_certificate_install)
    *   [Amazon Web Services](https://www.digicert.com/ssl-certficate-installation-amazon-web-services.htm)
    *   [Apache cPanel](https://www.digicert.com/kb/ssl-certificate-installation-apache-cpanel.htm)
    *   [Ubuntu Server with Apache2](https://www.digicert.com/kb/csr-ssl-installation/ubuntu-server-with-apache2-openssl.htm#ssl_certificate_install)

    If you do not see your server in the list above, search the [Digicert documentation](https://www.digicert.com/search-results) or contact your hosting provider, web admin, or server vendor.

     </div>
     </details>
3.  (required for some) Upload the [Cloudflare CA root certificate](#4-required-for-some-add-cloudflare-origin-ca-root-certificates) to your origin server.
4.  Enable SSL and port 443 at your origin web server.

### 3. Change SSL/TLS mode

After you have installed the Origin CA certificate on your origin web server, update the SSL/TLS encryption mode for your application.

If all your origin hosts are protected by Origin CA certificates or publicly trusted certificates:

1.  Go to **SSL/TLS**.
2.  For **SSL/TLS encryption mode**, select **Full (strict)**.

If you have origin hosts that are not protected by certificates, set the **SSL/TLS encryption** mode for a specific application to **Full (strict)** by using a [Page Rule](https://support.cloudflare.com/hc/articles/218411427).

### 4. (required for some) Add Cloudflare Origin CA root certificates

Some origin web servers require upload of the Cloudflare Origin CA root certificate. Click a link below to download either an RSA and ECC version of the Cloudflare Origin CA root certificate:

*   [Cloudflare Origin ECC PEM](/ssl/static/origin_ca_ecc_root.pem/) (do not use with Apache cPanel)
*   [Cloudflare Origin RSA PEM](/ssl/static/origin_ca_rsa_root.pem/)

## Revoke an Origin CA certificate

If you misplace your key material or do not want a certificate to be trusted, you may want to revoke your certificate. You cannot undo this process.

To prevent visitors from seeing warnings about an insecure certificate, you may want to set your [SSL/TLS encryption](/ssl/origin-configuration/ssl-modes/) to **Full** or **Flexible** before revoking your certificate. Do this globally via the **SSL/TLS** app or for a specific hostname via a **Page Rule**.

To revoke a certificate:

1.  Log in to the Cloudflare dashboard and select an account.
2.  Choose a domain.
3.  Go to **SSL/TLS** > **Origin Server**.
4.  In **Origin Certificates**, choose a certificate.
5.  Click **Revoke**.

## Additional details

### Hostname and wildcard coverage

Certificates may be generated with up to 100 individual Subject Alternative Names (SANs). A SAN can take the form of a fully-qualified domain name (`www.example.com`) or a wildcard (`*.example.com`). You cannot use IP addresses as SANs on Cloudflare Origin CA certificates.

Wildcards may only cover one level, but can be used multiple times on the same certificate for broader coverage (for example, `*.example.com` and `*.secure.example.com` may co-exist).

### Expiration

By default, newly generated certificates are valid for 15 years. If you wish to generate shorter-lived certificates (for example, as short as 7 days), use the [API](#api-calls).

## API calls

To automate processes involving Origin CA certificates, use the following API calls.

<table style="width:100%">
   <thead>
        <tr>
            <th>Operation</th>
            <th>Method + URL stub</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-list-certificates'>List Certificates</a></td>
            <td><code>GET&nbsp;certificates/:zone_id</code></td>
            <td></td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-create-certificate'>Create Certificate</a></td>
            <td><code>POST&nbsp;certificates/:zone_id</code></td>
            <td>See the API documentation for a full list of optional parameters, but some are also described in the <a href="#additional-details">Details</a> section of this page.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-get-certificate'>Get Certificate</a></td>
            <td><code>GET&nbsp;certificates/:certificate_id</code></td>
            <td></td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-revoke-certificate'>Revoke Certificate</a></td>
            <td><code>DELETE&nbsp;certificates/:certificate_id</code></td>
            <td>Additional details and warnings in <a href="#revoke-an-origin-ca-certificate">Revoke an Origin CA certificate</a></td>
        </tr>
    </tbody>
</table>

## Troubleshooting

Site visitors may see untrusted certificate errors if you pause or disable Cloudflare on subdomains that use Origin CA certificates. These certificates only encrypt traffic between Cloudflare and your origin server, not traffic from client browsers to your origin.
