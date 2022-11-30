---
pcx_content_type: how-to
title: Revoke a client certificate
weight: 6
---

# Revoke a client certificate

You can revoke a client certificate you previously generated.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Navigate to **SSL** > **Client Certificates**.
3.  Click the certificate you want to revoke.
4.  Click **Revoke** and confirm the operation.

{{<Aside type="warning" header="Important">}}

After revoking a certificate, you must update any mTLS rules that check for the presence of a client certificate so that they block all requests that include a revoked certificate.

For more information, refer to [Check for revoked certificates](/firewall/cf-dashboard/create-mtls-rule/#check-for-revoked-certificates).

{{</Aside>}}
