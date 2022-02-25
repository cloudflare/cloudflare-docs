---
pcx-content-type: how-to
title: Create a client certificate
weight: 3
---

# Create a client certificate

To create a client certificate in the Cloudflare dashboard:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Navigate to **SSL** > **Client Certificates**.
3.  Click **Create Certificate**.

  {{<Aside type="warning" header="Important">}}

You can only use API Shield with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each zone.

If you need to use certificates issued by another CA, use <a href="https://developers.cloudflare.com/cloudflare-one/identity/devices/mutual-tls-authentication?">Cloudflare Access</a> to upload your own CA.

  {{</Aside>}}

1.  For **Private key type**, select a value.

2.  For **Certificate Validity**, select a value. The default value is 10 years.

3.  Click **Create**.

4.  To copy the certificate or private key to your clipboard, use the **click to copy** link.

5.  To close the dialog, click **OK**.

You can now embed the client certificate in your mobile app or IoT device. For an example, refer to [Configure your mobile app or Internet-of-things device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device/).
