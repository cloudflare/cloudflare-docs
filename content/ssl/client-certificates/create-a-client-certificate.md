---
pcx_content_type: how-to
title: Create a client certificate
weight: 3
---

# Create a client certificate

To create a client certificate in the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **SSL** > **Client Certificates**.
3.  Select **Create Certificate**.

    {{<render file="_cloudflare-managed-client-cert.md">}}

4.  For **Private key type**, select a value.

5.  For **Certificate Validity**, select a value. The default value is 10 years.

6.  Select **Create**.

7.  To copy the certificate or private key to your clipboard, use the **click to copy** link.

8.  To close the dialog, select **OK**.

## Next steps

You can now use the client certificate for multiple things, including:

- Adding an mTLS certificate binding to your [Worker](/workers/runtime-apis/mtls/).
- Embedding a certificate in your [mobile app or IoT device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device/).
