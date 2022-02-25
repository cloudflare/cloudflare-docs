---
order: 12
pcx-content-type: how-to
---

# Okta

You can integrate Okta with Cloudflare Access to allow users to reach applications protected by Access with their Okta account.

1.  In your Okta dashboard, click **Admin**.
2.  Select the **Applications** tab in the Admin dashboard.
3.  Click **Create App Integration** in the top right corner.
4.  In the pop-up dialog, select **OpenID Connect**.

![OpenID connect option](../../static/documentation/identity/okta/okta-1.png)

1.  Choose `Web Application` as the Application type and click **Next**.

2.  Enter any name for the application. In the **Login redirect URIs** field, input your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

3.  Specify an assignment. Any value can be selected based on the desired behavior.

4.  Click **Save**.

5.  From the application view, navigate to the **Sign On** tab.

6.  Scroll down to the OpenID ConnectID Token.

    ![OpenID connect option](../../static/documentation/identity/okta/okta-2.png)

7.  Click **Edit** and set the Groups claim filter to *Matches regex* and the value `.*`.

8.  Return to the **General** tab. Scroll down to find your credentials, and copy the ID and secret.

    ![Client credentials](../../static/documentation/identity/okta/okta-3.png)

9.  On the Zero Trust dashboard, navigate to **Settings** > **Authentication**.

10. Under **Login methods**, click **Add new**.

11. Select **Okta** as your identity provider.

12. Input the ID, secret, and the Okta account URL.

13. (optional) Create an Okta API token and enter it in the Zero Trust dashboard (the token can be read-only). This will prevent your Okta groups from failing if you have more than 100 groups.

14. Click **Save**.

To test that your connection is working, navigate to **Settings** > **Authentication** > **Login methods** and click **Test** next to Okta.

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret>",
        "okta_account": "https://dev-abc123.oktapreview.com",
    },
    "type": "okta",
    "name": "my example idp"
}
```
