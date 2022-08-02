---
pcx_content_type: how-to
title: Enable mTLS
weight: 5
---

# Enable mTLS

To enable mutual Transport Layer Security (mTLS) for a host from the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Navigate to **SSL** > **Client Certificates**.
3.  To enable mTLS for a host, click the **Edit** link in the **Hosts** section of the **Client Certificates** card.
4.  Enter the name of a host in your current application and press `Enter`.
5.  Click **Save**.

Now that you have enabled mTLS for your host, you can enforce mTLS with [API Shield™](/api-shield/security/mtls/configure/).
