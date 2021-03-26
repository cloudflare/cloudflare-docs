---
order: 12
---

# Google Suite

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

You can integrate a Google Workspace (formerly Google Suite) account with Cloudflare Access. Unlike the instructions for [generic Google authentication](/authentication/configuring-identity-providers/google), the steps below will allow you to pull group membership information from your Google Workspace account.

Once integrated, users will login with their Google Suite credentials to reach resources protected by Cloudflare Access or to enroll their device into Cloudflare Gateway.

1. Log in the Google Cloud Platform [console][https://console.cloud.google.com/]. This is separate from your Google Workspace console.

![GCP Console](../../static/gsuite/gcp-home.png)

2. Click **Create Project** to create a new project. Name the project and click **Create**.

![Create Project](../../static/gsuite/create-project.png)

You should now see a Dashboard for your project.

![Post Create](../../static/gsuite/post-create.png)

3. On the left-hand side, select `APIs & Services` and click **Dashboard**.

![Click API](../../static/gsuite/click-api.png)

4. In the screen that loads, click **+ Enable APIs and Services** in the top toolbar.

![Enable API](../../static/gsuite/enable-api.png)

5. The API Library will load. Search for `admin` in the search bar.

![API Library](../../static/gsuite/api-library.png)

6. Select `Admin SDK API` by Google.

![Admin SDK](../../static/gsuite/admin-sdk.png)

7. Click **Enable** on the Admin SDK API page.

![Admin SDK](../../static/gsuite/enable-admin-sdk.png)

The Admin SDK will be added to your project.

![Admin SDK](../../static/gsuite/post-enable.png)

8. Return to the APIs & Services page. Click **Credentials** in the navigation bar. You will see a warning that you need to configure a consent screen. Click **Configure Consent Screen**.

![Configure Consent Screen](../../static/gsuite/configure-consent-screen.png)

9. Cloudflare Access will gather information about users in your Google Workspace account, but not other accounts. Toggle `Internal` to limit this to members in your account.

![Internal Users](../../static/gsuite/consent-internal.png)

10. Input information about the application.

![App Domain](../../static/gsuite/consent-screen-app-name.png)

In this case, you are making an application available to your users and can add your team's contact information.

![Internal Users](../../static/gsuite/consent-screen-contact.png)

You will not need to configure scopes in this screen and can leave these fields blank.

![Consent Screen Scope](../../static/gsuite/consent-screen-scope.png)

The summary page will load and you can save and exit.

![Consent Screen Summary](../../static/gsuite/consent-screen-summary.png)

11. Return to the `Credentials` page. Click **+ Create Credentials**

![Create Credentials](../../static/gsuite/create-credentials.png)

12. Select **OAuth client ID**.

![Select OAuth](../../static/gsuite/select-oauth.png)

13. Select `Web application` as the Application type.

![Create OAuth](../../static/gsuite/create-oauth.png)

14. You will need to input your Cloudflare authentication domain. The domain will be structured in the following format:

```
https://<your-auth-domain-here>.cloudflareaccess.com
```

Input the authentication domain without any path in the `Authorized JavaScript origins` section. In the Authorized redirect URIs section, input your authentication domain with the path below.

```
https://<your-auth-domain-here>.cloudflareaccess.com/cdn-cgi/access/callback
```

![Input Auth Domain](../../static/gsuite/input-auth-domain.png)

Click **Create**.

15. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should be kept securely and not shared. For the purposes of this tutorial, the secret field is kept visible. Copy both values.

![Secret Field](../../static/gsuite/secret-field.png)

The Client ID will now appear in the `APIs & Services` page.

![Client ID Visible](../../static/gsuite/client-id-visible.png)

16. Navigate to the Cloudflare for Teams dashboard. In the `Authentication` page of the Access section, click **+ Add**.

![Add IdP](../../static/gsuite/add-idp.png)

17. Select `Google Suite`.

![Add Google Suite](../../static/gsuite/add-gsuite.png)

18. Input the Client ID and Client Secret fields generated previously. Additionally, input the domain of your Google Workspace account. Click **Save**.

![Add Google Suite](../../static/gsuite/input-client.png)

19. To complete setup, you must scroll below and visit the link generated. If you are not the Google Workspace administrator, share the link with the administrator.

![Visit Link](../../static/gsuite/visit-link.png)

20. The generated link will prompt you to login to your Google account and to authorize Cloudflare Access to view group information.

![Authorize Groups](../../static/gsuite/authorize-groups.png)

A success page will then load from Cloudflare Access.

![Group Success](../../static/gsuite/group-success.png)

21. You can now return to the list of identity providers in the `Authentication` page of the Cloudflare for Teams dashboard. Select Google Suite and click **Test**.

Your user identity and group membership should return.

![Connection Works](../../static/gsuite/connection-works.png)

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