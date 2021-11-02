---
order: 3
pcx-content-type: concept
---

# Client certificates

Use Cloudflare public key infrastructure (PKI) to create client certificates. You can use these certificates with Cloudflare [API Shield™](https://developers.cloudflare.com/firewall/cf-firewall-rules/api-shield) to enforce mutual Transport Layer security (mTLS) encryption.

To use API Shield to protect your API or web application, you must do the following:

1. Use Cloudflare’s fully hosted public key infrastructure (PKI) to [create a client certificate](create-a-client-certificate).

1. [Configure your mobile app or IoT device](configure-your-mobile-app-or-iot-device) to use your Cloudflare-issued client certificate.

1. [Enable mTLS](enable-mtls) for the hosts you wish to protect with API Shield.

1. Create Cloudflare firewall rules that [require API requests to present a valid client certificate](https://developers.cloudflare.com/firewall/recipes/require-valid-client-certificate). The **Firewall** app in the Cloudflare dashboard provides a dedicated interface where you can [create mTLS rules](https://developers.cloudflare.com/firewall/cf-dashboard/create-mtls-rule).
