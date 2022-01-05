---
title: Configure
pcx-content-type: how-to
---

# Configure mTLS

When you specify API hosts in [mTLS authentication](/products/mtls), Cloudflare will block all requests that do not have a certificate for mTLS authentication.

To protect your application with mTLS:

1. Use Cloudflare's fully hosted public key infrastructure (PKI) to [create a client certificate in the Cloudflare dashboard](https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate).

1. [Configure your mobile app or IoT device](https://developers.cloudflare.com/ssl/client-certificates/configure-your-mobile-app-or-iot-device) to use your Cloudflare-issued client certificate.

1. [Enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls) for the hosts you wish to protect.

1. Create Cloudflare Firewall Rules that [require API requests to present a valid client certificate](https://developers.cloudflare.com/firewall/recipes/require-valid-client-certificate). The **Firewall** app in the Cloudflare dashboard provides a dedicated interface where you can [create mTLS rules](https://developers.cloudflare.com/firewall/cf-dashboard/create-mtls-rule).