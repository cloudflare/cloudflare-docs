---
order: 11
---

# OneLogin OIDC

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an OIDC identity provider.

## Set up OneLogin OIDC

To set up OneLogin as your identity provider:

1. Log in to your OneLogin admin portal.
1. Select **Apps > Custom Connectors**.

    ![OneLogin OIDC](../../static/documentation/identity/onelogin/onelogin-oidc-1.png)

    The _Custom Connectors_ card displays.

    ![OneLogin Custom Connectors](../../static/documentation/identity/onelogin/onelogin-oidc-2.png)

1. Click **New Connector**.
1. Name the connector.

     The _connector name_ card displays. Our example uses `access-oidc` for the connector name.

    ![OneLogin OIDC Application Basic Configuration page](../../static/documentation/identity/onelogin/onelogin-oidc-3.png)

1. In **Sign-On Method**, select the **OpenID Connect** option.
1. In the **Redirect URI** field, enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```
    
1. Click **Save**.
1. Select **More Actions > Add App to Connector**.

    ![OneLogin OIDC Application Basic Configuration page More Actions menu](../../static/documentation/identity/onelogin/onelogin-oidc-4.png)

1. In the **Portal** section, enter a name for your application in the **Display Name** field.

    ![OneLogin OIDC Add Application Configuration page](../../static/documentation/identity/onelogin/onelogin-oidc-5.png)

1. Click **Save**.
1. Select the **Access** tab.

    ![OneLogin OIDC Add Application Access page](../../static/documentation/identity/onelogin/onelogin-oidc-6.png)

1. Add the **Roles** that can access this application.
1. Select the **SSO** tab.

    ![OneLogin OIDC Add Application SSO page](../../static/documentation/identity/onelogin/onelogin-oidc-7.png)

1. Click **Show client secret**.
1. Copy both the **Client ID** and **Client Secret**.

1. On the Teams dashboard, navigate to **Access > Authentication**.

1. Click *+ Add* under **Login Methods**, and select Centrify as your IdP.
1. Paste in your copied **Client ID** and **Client secret**.
1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to OneLogin.

## Example API Config

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "onelogin_account": "https://mycompany.onelogin.com",
    },
    "type": "onelogin",
    "name": "my example idp"
}
```
