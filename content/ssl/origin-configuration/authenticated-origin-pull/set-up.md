---
pcx-content-type: how-to
title: Set up authenticated origin pulls
weight: 2
---

# Set up authenticated origin pulls

Set up authenticated origin pulls via one of the following options:

*   [Zone-Level Authenticated Origin Pull using **Cloudflare** certificates](#zone-level--cloudflare-certificates)
*   [Zone-Level Authenticated Origin Pull using **customer** certificates](#zone-level--customer-certificates)
*   [Per-Hostname Authenticated Origin Pull using customer certificates](#per-hostname--customer-certificates)

Authenticated Origin Pull does not work when your [**SSL/TLS encryption mode**](/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.

***

## Zone-Level — Cloudflare certificate

### Certificate value

Cloudflare uses the following CA to sign certificates for the Authenticated Origin Pull service:

<details>
<summary>Certificate value</summary>
<div>

```text
-----BEGIN CERTIFICATE-----
MIIGCjCCA/KgAwIBAgIIV5G6lVbCLmEwDQYJKoZIhvcNAQENBQAwgZAxCzAJBgNV
BAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMRQwEgYDVQQLEwtPcmln
aW4gUHVsbDEWMBQGA1UEBxMNU2FuIEZyYW5jaXNjbzETMBEGA1UECBMKQ2FsaWZv
cm5pYTEjMCEGA1UEAxMab3JpZ2luLXB1bGwuY2xvdWRmbGFyZS5uZXQwHhcNMTkx
MDEwMTg0NTAwWhcNMjkxMTAxMTcwMDAwWjCBkDELMAkGA1UEBhMCVVMxGTAXBgNV
BAoTEENsb3VkRmxhcmUsIEluYy4xFDASBgNVBAsTC09yaWdpbiBQdWxsMRYwFAYD
VQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlhMSMwIQYDVQQD
ExpvcmlnaW4tcHVsbC5jbG91ZGZsYXJlLm5ldDCCAiIwDQYJKoZIhvcNAQEBBQAD
ggIPADCCAgoCggIBAN2y2zojYfl0bKfhp0AJBFeV+jQqbCw3sHmvEPwLmqDLqynI
42tZXR5y914ZB9ZrwbL/K5O46exd/LujJnV2b3dzcx5rtiQzso0xzljqbnbQT20e
ihx/WrF4OkZKydZzsdaJsWAPuplDH5P7J82q3re88jQdgE5hqjqFZ3clCG7lxoBw
hLaazm3NJJlUfzdk97ouRvnFGAuXd5cQVx8jYOOeU60sWqmMe4QHdOvpqB91bJoY
QSKVFjUgHeTpN8tNpKJfb9LIn3pun3bC9NKNHtRKMNX3Kl/sAPq7q/AlndvA2Kw3
Dkum2mHQUGdzVHqcOgea9BGjLK2h7SuX93zTWL02u799dr6Xkrad/WShHchfjjRn
aL35niJUDr02YJtPgxWObsrfOU63B8juLUphW/4BOjjJyAG5l9j1//aUGEi/sEe5
lqVv0P78QrxoxR+MMXiJwQab5FB8TG/ac6mRHgF9CmkX90uaRh+OC07XjTdfSKGR
PpM9hB2ZhLol/nf8qmoLdoD5HvODZuKu2+muKeVHXgw2/A6wM7OwrinxZiyBk5Hh
CvaADH7PZpU6z/zv5NU5HSvXiKtCzFuDu4/Zfi34RfHXeCUfHAb4KfNRXJwMsxUa
+4ZpSAX2G6RnGU5meuXpU5/V+DQJp/e69XyyY6RXDoMywaEFlIlXBqjRRA2pAgMB
AAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgECMB0GA1Ud
DgQWBBRDWUsraYuA4REzalfNVzjann3F6zAfBgNVHSMEGDAWgBRDWUsraYuA4REz
alfNVzjann3F6zANBgkqhkiG9w0BAQ0FAAOCAgEAkQ+T9nqcSlAuW/90DeYmQOW1
QhqOor5psBEGvxbNGV2hdLJY8h6QUq48BCevcMChg/L1CkznBNI40i3/6heDn3IS
zVEwXKf34pPFCACWVMZxbQjkNRTiH8iRur9EsaNQ5oXCPJkhwg2+IFyoPAAYURoX
VcI9SCDUa45clmYHJ/XYwV1icGVI8/9b2JUqklnOTa5tugwIUi5sTfipNcJXHhgz
6BKYDl0/UP0lLKbsUETXeTGDiDpxZYIgbcFrRDDkHC6BSvdWVEiH5b9mH2BON60z
0O0j8EEKTwi9jnafVtZQXP/D8yoVowdFDjXcKkOPF/1gIh9qrFR6GdoPVgB3SkLc
5ulBqZaCHm563jsvWb/kXJnlFxW+1bsO9BDD6DweBcGdNurgmH625wBXksSdD7y/
fakk8DagjbjKShYlPEFOAqEcliwjF45eabL0t27MJV61O/jHzHL3dknXeE4BDa2j
bA+JbyJeUMtU7KMsxvx82RmhqBEJJDBCJ3scVptvhDMRrtqDBW5JShxoAOcpFQGm
iYWicn46nPDjgTU0bX1ZPpTpryXbvciVL5RkVBuyX2ntcOLDPlZWgxZCBp96x07F
AnOzKgZk4RzZPNAxCXERVxajn/FLcOhglVAKo5H0ac+AitlQ0ip55D2/mf8o72tM
fVQ6VpyjEXdiIXWUq/o=
-----END CERTIFICATE-----
```

</div>
</details>

### Setup instructions

To enable Authenticated Origin Pull globally on a zone:

1.  Install the above certificate at the origin web server to authenticate all connections.

2.  For your **SSL/TLS encryption mode**, select **Full**.

3.  Configure your [origin web server](#server-installation-instructions) to accept client certificates:

     <details>
     <summary>Apache example</summary>
     <div>

    For this example, you would have saved the <a href="#certificate-value">certificate</a> to <code>/path/to/origin-pull-ca.pem</code>.

    ```txt
    SSLVerifyClient require
    SSLVerifyDepth 1
    SSLCACertificateFile /path/to/origin-pull-ca.pem
    ```

     </div>
     </details>

     <details>
     <summary>NGINX example</summary>
     <div>

    For this example, you would have saved the <a href="#certificate-value">certificate</a> to <code>/etc/nginx/certs/cloudflare.crt</code>.

    ```txt
    ssl_client_certificate /etc/nginx/certs/cloudflare.crt;
    ssl_verify_client on;
    ```

     </div>

     </details>

4.  Enable **Authenticated Origin Pulls**:

    *   In the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin), go to **Authenticated Origin Pulls** and select **On**.
    *   For the API, [change the TLS Client Auth setting](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-set-enablement-for-zone):

***

## Zone-Level — customer certificates

1.  For your **SSL/TLS encryption mode**, select **Full**.
2.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`origin_tls_client_auth` endpoint](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate).
3.  Enable **Authenticated Origin Pulls**:

    *   In the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin), go to **Authenticated Origin Pulls** and select **On**.
    *   For the API, [set the enablement for a zone](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-set-enablement-for-zone):

***

## Per-Hostname — customer certificates

When enabling Authenticated Origin Pull per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. Customers can use client certificates from their Private PKI to authenticate connections from Cloudflare.

1.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

  <Aside type='note' header='Note'>

Save the certificate ID <code>id</code> since it is required for the next step.

  </Aside>

1.  On a specific hostname, [enable Authenticated Origin Pull](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

### Replace a client cert (without downtime)

For hostname:

1.  [Upload the new certificate](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

2.  [Enable Authenticated Origin Pull for that specific hostname](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

For global:

1.  [Upload the new certificate](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate).

2.  [Check whether new certificate is Active](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-get-certificate-details).

3.  Once certificate is active, then [delete the old certificate](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-delete-certificate).

***

### To apply a different client certificate simultaneously at both the zone and hostname level

1.  Upload a certificate following steps in [Zone-Level Authenticated Origin Pull](#zone-level--customer-certificates)

2.  Upload multiple certificates following the steps in [Per-Hostname Authenticated Origin Pull](#per-hostname--customer-certificates)

  <Aside type='note' header='Note'>

Hostname certificates take precedence over zone certificates.

  </Aside>

### Delete a certificate

Client certificates are not deleted from Cloudflare upon expiration unless a [delete](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-delete-certificate) or [replace](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate) request is sent to the Cloudflare API.

However, requests are dropped at your origin if your origin only accepts a valid client certificate.
