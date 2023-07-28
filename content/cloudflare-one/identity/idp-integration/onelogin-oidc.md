---
pcx_content_type: how-to
title: OneLogin OIDC
weight: 12
---

# OneLogin OIDC

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an OIDC identity provider.

## Set up OneLogin OIDC

To set up OneLogin as your identity provider:

1.  Log in to your OneLogin admin portal.

1.  Select **Apps** > **Custom Connectors**. The _Custom Connectors_ card displays.

1.  Select **New Connector**.

1.  Name the connector. The _connector name_ card displays. Our example uses `access-oidc` for the connector name.

1.  In **Sign-On Method**, select the **OpenID Connect** option.

1.  In the **Redirect URI** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    ![OneLogin OIDC Application Basic Configuration page with example Redirect URI](/images/cloudflare-one/identity/onelogin/onelogin-oidc-3.png)

1.  Select **Save**.

1.  Select **More Actions** > **Add App to Connector**.

1.  In the **Portal** section, enter a name for your application in the **Display Name** field.

1.  Select **Save**.

1.  Select the **Access** tab.

1.  Add the **Roles** that can access this application.

1.  Select the **SSO** tab.

1.  Select **Show client secret**.

1.  Copy both the **Client ID** and **Client Secret**.

1.  In Zero Trust, go to **Settings** > **Authentication**.

1.  Under **Login methods**, select **Add new**.

1.  Select OneLogin as your IdP.

1.  Paste in your copied **Client ID** and **Client secret**.

1.  Select **Save**.

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
