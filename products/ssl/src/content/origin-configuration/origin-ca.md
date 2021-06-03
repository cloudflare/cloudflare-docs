---
title: Origin CA certificates
order: 3
pcx-content-type: concept
---

# Managing Cloudflare Origin CA certificates

Use Origin Certificate Authority (CA) certificates to encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth consumption. Once deployed, these certificates are compatible with [Strict SSL mode](/origin-configuration/ssl-modes#strict).

<Aside>
For more background information on Origin CA certificates, see our <a href="https://blog.cloudflare.com/cloudflare-ca-encryption-origin/">introductory blog post</a>.
</Aside>

## Deploy an Origin CA certificate

### 1. Create an Origin CA certificate

### 2. Install Origin CA certificate on origin server

1. 

### 3. Change SSL/TLS mode

After you have installed the Origin CA certificate on your origin web server, update the SSL/TLS encryption mode for your application.

If all your origin hosts are protected by Origin CA certificates or publicly trusted certificates:
1. Go to **SSL/TLS**.
1. For **SSL/TLS encryption mode**, select **Full (strict)**.

If you have origin hosts that are not protected by certificates, set your **SSL/TLS encryption** mode to **Full (strict)** by using a [Page Rule](https://support.cloudflare.com/hc/articles/218411427).

### 4. (optional) Add Cloudflare Origin CA root certificates

Some origin web servers require upload of the Cloudflare Origin CA root certificate. Click on a link below to download either an RSA and ECC version of the Cloudflare Origin CA root certificate:

- [Cloudflare Origin ECC PEM](../static/origin_ca_ecc_root.pem)
- [Cloudflare Origin RSA PEM](../static/origin_ca_rsa_root.pem)

## Revoke an Origin CA certificate

If you misplace your key material or wish to indicate that a certificate should otherwise no longer be trusted, you may want to revoke your certificate. You cannot undo this process.

To prevent visitors from seeing warnings about an insecure certificate, you may want to set your [SSL/TLS encryption](/origin-configuration/ssl-modes) to **Full** or **Flexible** before revoking your certificate. Do this globally via the **SSL/TLS** app or for a specific hostname via a **Page Rule**.

To revoke a certificate:
1. Log into your Cloudflare account and choose an application.
1. Go to **SSL/TLS** > **Origin Server**.
1. In **Origin Certificates**, choose a certificate.
1. Click **Revoke**.

## Additional details

### Hostname/wildcard coverage
Certificates may be generated with up to 100 individual Subject Alternative Names (SANs). A SAN can take the form of a fully-qualified domain name (`www.example.com`) or a wildcard (`*.example.com`). IP addresses are not permitted as SANs on Cloudflare Origin Certificates.

Wildcards may only cover one level, but can be used multiple times on the same certificate for broader coverage (e.g., `*.example.com` and `*.secure.example.com` may co-exist).

### Expiration
By default, newly generated certificates are valid for 15 years. If you wish to generate shorter-lived certificates (e.g., as short as 7 days), use the [API](#api-calls).

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
            <td><code>GET&nbsp;certificates/':zone_id'}/waiting_rooms</code></td>
            <td></td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-create-certificate'>Create Certificate</a></td>
            <td><code>POST&nbsp;certificates/:zone_id</code></td>
            <td>See the API documentation for a full list of optional parameters, but some are also described in the <a href="#details">Details</a> section of this page.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-get-certificate'>Get Certificate</a></td>
            <td><code>GET&nbsp;certificates/:certificate_id</code></td>
            <td></td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#origin-ca-revoke-certificate'>Revoke Certificate</a></td>
            <td><code>DELETE&nbsp;certificates/:certificate-id'</code></td>
            <td>Additional details and warnings in <a href="#revoke-an-origin-ca-certificate">Revoke certificate</a></td>
        </tr>
    </tbody>
</table>