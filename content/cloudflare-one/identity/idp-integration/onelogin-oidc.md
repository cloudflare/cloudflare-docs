---
pcx_content_type: how-to
title: OneLogin
weight: 19
---

# OneLogin

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an OIDC identity provider.

## Set up OneLogin as an OIDC provider

1. Log in to your OneLogin admin portal.

2. Go to **Applications** > **Applications** and select **Add App**.

3. Search for `OIDC` and select **OpenId Connect (OIDC)** by OneLogin, Inc.

4. In **Display Name**, enter any name for your application. Select **Save**.

5. Next, go to **Configuration**. In the **Redirect URI** field, enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

6. Select **Save**.

7. Go to **Access** and choose the **Roles** that can access this application. Select **Save**.

8. Go to **SSO** and select **Show client secret**.

9. Copy the **Client ID** and **Client Secret**.

10. In [Zero Trust](https://one.dash.cloudflare.com),, go to **Settings** > **Authentication**.

11. Under **Login methods**, select **Add new**.

12. Select **OneLogin**.

13. Fill in the following information:
    - **Name**: Name your identity provider.
    - **App ID**: Enter your OneLogin client ID.
    - **Client secret**: Enter your OneLogin client secret.
    - **OneLogin account URL**: Enter your OneLogin domain, for example `https://<your-domain>.onelogin.com`.

14. (Optional) Under **Optional configurations**, enter [custom OIDC claims](/cloudflare-one/identity/idp-integration/generic-oidc/#oidc-claims) that you wish to add to your Access [application token](/cloudflare-one/identity/authorization-cookie/application-token/).

15. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to OneLogin.

## Example API Config

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "onelogin_account": "https://mycompany.onelogin.com"
  },
  "type": "onelogin",
  "name": "my example idp"
}
```
