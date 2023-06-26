---
pcx_content_type: how-to
title: Google Workspace
weight: 13
---

# Google Workspace

{{<Aside type="note">}}
The Google Workspace IdP integration is not supported if your Google Workspace account is protected by Access.
{{</Aside>}}

You can integrate a Google Workspace (formerly Google Suite) account with Cloudflare Access. Unlike the instructions for [generic Google authentication](/cloudflare-one/identity/idp-integration/google/), the steps below will allow you to pull group membership information from your Google Workspace account.

Once integrated, users will log in with their Google Workspace credentials to reach resources protected by Cloudflare Access or to enroll their device into Cloudflare Gateway.

You do not need to be a Google Cloud Platform user to integrate Google Workspace as an identity provider with Cloudflare Zero Trust. You will only need to open the Google Cloud Platform to configure IdP integration settings.

## Set up Google Workspace as an identity provider

1. Log in to the Google Cloud Platform [console](https://console.cloud.google.com/). This is separate from your Google Workspace console.

2. A Google Cloud project is required to enable Google Workspace APIs. If you do not already have a Google Cloud project, go to **IAM & Admin** > **Create Project**. Name the project and select **Create**.

3. Go to **APIs & Services** and select **+ Enable APIs and Services**. The API Library will load.

4. In the API Library, search for `admin` and select _Admin SDK API_.

5. **Enable** the Admin SDK API.

6. Return to the **APIs & Services** page and go to **Credentials**.

   ![Location of credential settings at the top of the Google Cloud Platform dashboard.](/images/cloudflare-one/identity/google/click-configure-consent.png)

7. You will see a warning that you need to configure a consent screen. Select **Configure Consent Screen**.

8. To configure the consent screen:

   1. Choose **Internal** as the User Type. This limits authorization requests to users in your Google Workspace and blocks users who have regular Gmail addresses.
   2. Name the application, add a support email, and input contact fields. Google Cloud Platform requires an email in your account.
   3. The **Scopes** page can be left blank.
   4. The summary page will load and you can save and exit.

9. Return to the **Credentials** page and select **+ Create Credentials** > **OAuth client ID**.

   ![Location of OAuth client ID settings on Google Cloud Platform credentials page.](/images/cloudflare-one/identity/google/create-oauth.png)

10. Choose _Web application_ as the Application type.

11. Under **Authorized JavaScript origins**, in the **URIs** field, enter your [team domain](/cloudflare-one/glossary/#team-domain).

    ```txt
    https://<your-team-name>.cloudflareaccess.com
    ```

12. Under **Authorized redirect URIs**, in the **URIs** field, enter your team domain followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

13. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should not be shared. Copy both values.

14. On your [Google Admin console](https://admin.google.com), go to **Security** > **Access and data control** > **API controls**.  
    ![Location of Trust internal apps setting in the Google Admin dashboard](/images/cloudflare-one/identity/gsuite/trust-internal-apps.png)

15. Enable the **Trust internal, domain-owned apps** option. This setting is disabled by default and must be enabled for Cloudflare Access to work correctly.

16. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Authentication**.

17. Under **Login methods**, select **Add new** and choose **Google Workspace**.

18. Input the Client ID and Client Secret fields generated previously. Additionally, input the domain of your Google Workspace account.

19. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

20. Select **Save**. To complete setup, you must visit the generated link. If you are not the Google Workspace administrator, share the link with the administrator.

21. The generated link will prompt you to log in to your Google admin account and to authorize Cloudflare Access to view group information. After allowing permissions, you will see a success page from Cloudflare Access.

## Test your connection

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to Google Workspace. Your user identity and group membership should return.

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "apps_domain": "mycompany.com"
  },
  "type": "google-apps",
  "name": "my example idp"
}
```
