---
order: 6
---

# Troubleshooting

### I receive an untrusted certificate warnings for every page and I am unable to browse the internet.

#### Download and install the Cloudflare root certificate on a user's device
1. Navigate to the **Settings** tab on your [Teams dashboard](https://dash.teams.cloudflare.com).
2. Click on **Account**.
3. Scroll down to find the **Certificates** card.
4. Click on **Download**. 

![Download certificate](../static/update-certificates-page.png)

You will now need to add the certificate to your system to ensure your web browser will use this certificate to establish HTTPS connections.

#### Add certificate to your system

1. If you are on a Mac, **double-click** on the .pem file.
2. The certificate is now listed in the **Keychain Access** application.

![Keychain](../static/listed-in-keychain.png)

3. Double-click on the certificate and then click on **Trust**.

![Keychain](../static/cert-click-on-trust.png)

4. Select **Always Trust** from the drop-down menu for **When using this certificate**.

![Always trust](../static/cert-select-always-trust.png)

5. Close the menu.

### Even though I installed the Cloudflare certificate on my system, mobile applications warn of an invalid certificate.

The mobile application may leverage certificate pinning. This is a security mechanism used to prevent man-in-the-middle (MITM) attacks on the internet by hardcoding information about the certificate that the application expects to receive. If the wrong certificate is received, even if it's trusted by the system, the application will refuse to connect. 

Cloudflare Gateway dynamically generates a certificate for all encrypted connections in order to inspect the content of HTTP traffic. This certificate will not match the expected certificate by applications that use certificate pinning.

To allow these applications to function normally, administrators can configure bypass rules to exempt traffic to hosts associated with the application from being intercepted and inspected. 

### I browsed to a website and received a Cloudflare Gateway error page, not a block page.

![HTTP error page](../static/http-error-page.png)

Cloudflare Gateway is designed to protect users by default. In the event this page is received, providing as much information as possible to the local IT administrator will be helpful as we troubleshoot with them such as:

* Operating System (Windows 10, macOS 10.x, iOS 14.x)
* Web browser (Chrome, Firefox, Safari, Edge)
* URL of the request
* Screenshot or copy/paste of the content from the error page

We present an HTTP error page in the following cases:

### An untrusted certificate is presented from the origin to Gateway

Gateway will consider a certificate is untrusted if any of these three conditions are true:

* The server certificate issuer is unknown or is not trusted by the service.
* The server certificate is revoked and fails a CRL check (OSCP checking coming soon)
* There is at least one expired certificate in the certificate chain for the server certificate

### Common certificate errors

For example in the event of a certificate common name mismatch.


### Insecure cipher suite

When the connection from Cloudflare Gateway to an upstream server is insecure (e.g, uses an insecure cipher such as rc4, rc4-md5, 3des, etc.)

We do support upstream connections that require a connection over TLS that is prior to TLS 1.3. We will support the ability for an administrator to configure whether to trust insecure connections in the very near future. 



