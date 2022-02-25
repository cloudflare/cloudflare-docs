---
order: 5
pcx-content-type: how-to
---

# Revoke a client certificate

You can revoke a client certificate you previously generated. 

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
1. Navigate to **SSL** > **Client Certificates**. 
1. Click the certificate you want to revoke.
1. Click **Revoke** and confirm the operation.

<Aside type='warning' header='Important'>

After revoking a certificate, you must update any mTLS rules that check for the presence of a client certificate so that they block all requests that include a revoked certificate.

For more information, see [Check for revoked certificates](https://developers.cloudflare.com/firewall/cf-dashboard/create-mtls-rule#check-for-revoked-certificates).

</Aside>
