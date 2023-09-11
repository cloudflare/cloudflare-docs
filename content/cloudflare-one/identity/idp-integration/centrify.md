---
pcx_content_type: how-to
title: Centrify
weight: 13
---

# Centrify

Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the number one cause of breaches: privileged access abuse.

## Set up Centrify as an OIDC provider

1. Log in to the Centrify administrator panel.

2. Select **Apps**.

3. Select **Add Web Apps**.

4. Select the **Custom** tab, then select **Add OpenID Connect**.

5. On the **Add Web App** screen, select **Yes** to create an OpenID Connect application.

6. Enter an **Application ID**.

    ![Centrify Settings with Application ID added](/images/cloudflare-one/identity/centrify/centrify-4.png)

7. Select **Save**.

8. Select **Trust** in the **Settings** menu.

9. Enter a strong application secret on the **Trust** section.

10. Under **Service Provider Configuration** enter your application’s authentication domain as the resource application URL.

11. Under **Authorized Redirect URIs**, select **Add**.

12. Under **Authorized Redirect URIs** enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    ![Centrify Trust Identity Provider Configuration with team domain and callback](/images/cloudflare-one/identity/centrify/centrify-6.png)

13. Select **Save**.

14. Copy the following values:
  - **Client ID**
  - **Client Secret**
  - **OpenID Connect Issuer URL**
  - **Application ID** from the **Settings** tab

15. Go to the **User Access** tab.

16. Select the roles to grant access to your application.

17. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

18. Under **Login methods**, select **Add new**.

19. Paste in the **Client ID**, **Client Secret**, **Centrify account URL** and **Application ID**.

20. (Optional) Under **Optional configurations**, enter [custom OIDC claims](/cloudflare-one/identity/idp-integration/generic-oidc/#oidc-claims) that you wish to add to your Access [application token](/cloudflare-one/identity/authorization-cookie/application-token/).

21. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test.

## **Example API Config**

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "centrify_account": "https://abc123.my.centrify.com/",
    "centrify_app_id": "exampleapp"
  },
  "type": "centrify",
  "name": "my example idp"
}
```
