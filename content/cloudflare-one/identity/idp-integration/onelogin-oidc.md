---
pcx_content_type: how-to
title: OneLogin OIDC
weight: 12
---

# OneLogin OIDC

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an OIDC identity provider.

## Set up OneLogin as an OIDC provider

1. Log in to your OneLogin admin portal.

2. Select **Apps** > **Custom Connectors**. The _Custom Connectors_ card displays.

3. Select **New Connector**.

4. Name the connector. The _connector name_ card displays. Our example uses `access-oidc` for the connector name.

5. In **Sign-On Method**, select the **OpenID Connect** option.

6. In the **Redirect URI** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    ![OneLogin OIDC Application Basic Configuration page with example Redirect URI](/images/cloudflare-one/identity/onelogin/onelogin-oidc-3.png)

7. Select **Save**.

8. Select **More Actions** > **Add App to Connector**.

9. In the **Portal** section, enter a name for your application in the **Display Name** field.

10. Select **Save**.

11. Select the **Access** tab.

12. Add the **Roles** that can access this application.

13. Select the **SSO** tab.

14. Select **Show client secret**.

15. Copy both the **Client ID** and **Client Secret**.

16. In [Zero Trust](https://one.dash.cloudflare.com),, go to **Settings** > **Authentication**.

17. Under **Login methods**, select **Add new**.

18. Select **OneLogin**

19. Paste in your copied **Client ID** and **Client secret**.

20. (Optional) Under **Optional configurations**, enter [custom OIDC claims](/cloudflare-one/identity/idp-integration/generic-oidc/#oidc-claims) that you wish to add to your Access [application token](/cloudflare-one/identity/authorization-cookie/application-token/).

21. Select **Save**.

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
