---
pcx_content_type: how-to
title: Google
weight: 13
---

# Google

You can integrate Google authentication with Cloudflare Access without a Google Workspace account. The integration allows any user with a Google account to log in (if the [Access policy](/cloudflare-one/policies/access/) allows them to reach the resource). Unlike the instructions for [Google Workspace](/cloudflare-one/identity/idp-integration/gsuite/), the steps below will not allow you to pull group membership information from a Google Workspace account.

You do not need to be a Google Cloud Platform user to integrate Google Suite as an identity provider with Cloudflare Zero Trust. You will only need to open the Google Cloud Platform to configure IdP integration settings.

## Set up Google as an identity provider

1. Visit the Google Cloud Platform console. Create a new project, name the project, and select **Create**.

2. On the project home page, go to **APIs & Services** on the sidebar and select **Dashboard**.

3. On the sidebar, go to **Credentials** and select **Configure Consent Screen** at the top of the page.

   ![Location of credential settings at the top of the Google Cloud Platform dashboard.](/cloudflare-one/static/documentation/identity/google/click-configure-consent.png)

4. Choose `External` as the User Type. Since this application is not being created in a Google Workspace account, any user with a Gmail address can login.

5. Name the application, add a support email, and input contact fields. Google Cloud Platform requires an email in your account.
   {{<Aside type="note">}}In the **Scopes** section, we recommend adding the `userinfo.email` scope. This is not required for the integration, but shows authenticating users what information is being gathered. You do not need to add test users.{{</Aside>}}

6. Return to the **APIs & Services** page, select **Create Credentials** > **OAuth client ID**, and name the application.

   ![Location of OAuth client ID settings on Google Cloud Platform credentials page.](/cloudflare-one/static/documentation/identity/google/create-oauth.png)

7. Under **Authorized JavaScript origins**, in the **URIs** field, enter your [team domain](/cloudflare-one/glossary/#team-domain).

8. Under **Authorized redirect URIs**, in the **URIs** field, enter your team domain followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

9. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should not be shared. Copy both values.

10. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Authentication**.

11. Under **Login methods**, select **Add new**. Choose **Google** on the next page.

12. Input the Client ID and Client Secret fields generated previously.

13. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

14. Select **Save**.

## Test your connection

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to Google.

## Example API Config

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>"
  },
  "type": "google",
  "name": "my example idp"
}
```
