---
pcx_content_type: how-to
title: PingOne®
weight: 22
---

# PingOne®

The PingOne® cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as an OIDC identity provider.

## Set up PingOne as an OIDC provider

1. In your PingIdentity environment, go to **Connections** > **Applications**.
2. Select **Add Application**.
3. Enter an **Application Name**.
4. Select **OIDC Web App** and then **Save**.
5. Select **Resource Access** and add the **email** and **profile** scopes.
6. In the **Configuration** tab, select **General**.
7. Copy the **Client ID**, **Client Secret**, and **Environment ID** to a safe place. These ids will be used in a later step to add PingOne to Zero Trust.
8. In the **Configuration** tab, select the pencil icon.
9. In the **Redirect URIs** field, enter your team domain:

    ```txt
    https://<your-team-name>.cloudflareaccess.com
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.
10. Select **Save**.
11. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Authentication**.
12. Under **Login methods**, select **Add new**.
13. Select **PingOne**.
14. Input the **Client ID**, **Client Secret**, and **Environment ID** generated previously.
15. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
16. (Optional) Under **Optional configurations**, enter [custom OIDC claims](/cloudflare-one/identity/idp-integration/generic-oidc/#oidc-claims) that you wish to add to your users' identity. This information will be available in the [user identity endpoint](/cloudflare-one/identity/authorization-cookie/application-token/#user-identity).
17. Select **Save**.

You can now [test your connection](/cloudflare-one/identity/idp-integration/#test-idps-in-zero-trust) and create [Access policies](/cloudflare-one/policies/access/) based on the configured login method.

## Example API configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "ping_env_id": "<your ping environment id>"
  },
  "type": "ping",
  "name": "my example idp"
}
```
