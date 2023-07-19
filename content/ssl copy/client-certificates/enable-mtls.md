---
pcx_content_type: how-to
title: Enable mTLS
weight: 5
---

# Enable mTLS

You can enable mutual Transport Layer Security (mTLS) for any hostname.

## Enable mTLS

To enable mutual Transport Layer Security (mTLS) for a host from the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **SSL** > **Client Certificates**.
3.  To enable mTLS for a host, select **Edit** in the **Hosts** section of the **Client Certificates** card.
4.  Enter the name of a host in your current application and press `Enter`.
5.  Select **Save**.

Now that you have enabled mTLS for your host, you can enforce mTLS with [API Shield™](/api-shield/security/mtls/configure/).

{{<render file="_cloudflare-managed-client-cert.md">}}

{{<render file="_forward-client-certificate.md">}}