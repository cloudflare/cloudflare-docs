---
order: 12
---

# Google Suite

You can integrate a Google Workspace (formerly Google Suite) account with Cloudflare Access. Unlike the instructions for [generic Google authentication](/authentication/configuring-identity-providers/google), the steps below will allow you to pull group membership information from your Google Workspace account.

Once integrated, users will login with their Google Suite credentials to reach resources protected by Cloudflare Access or to enroll their device into Cloudflare Gateway.

1. Log into the Google Cloud Platform [console](https://console.cloud.google.com/). This is separate from your Google Workspace console.

 ![GCP Console](../../static/documentation/identity/gsuite/gcp-home.png)

1. Click **Create Project** to create a new project. Name the project and click **Create**.

 ![Create Project](../../static/documentation/identity/gsuite/create-project.png)

 You should now see a Dashboard for your project.

 ![Post Create](../../static/documentation/identity/gsuite/post-create.png)

1. On the left-hand side, select `APIs & Services` and click **Dashboard**.

 ![Click API](../../static/documentation/identity/gsuite/click-api.png)

1. In the screen that loads, click **+ Enable APIs and Services** in the top toolbar.

1. The API Library will load. Search for `admin` in the search bar.

 ![API Library](../../static/documentation/identity/gsuite/api-library.png)

1. Select `Admin SDK API` by Google.

1. Click **Enable** on the Admin SDK API page.

 ![Admin SDK](../../static/documentation/identity/gsuite/enable-admin-sdk.png)

 The Admin SDK will be added to your project.

 ![Admin SDK](../../static/documentation/identity/gsuite/post-enable.png)

1. Return to the APIs & Services page. Click **Credentials** in the navigation bar. You will see a warning that you need to configure a consent screen. Click **Configure Consent Screen**.

 ![Configure Consent Screen](../../static/documentation/identity/gsuite/configure-consent-screen.png)

1. Cloudflare Access will gather information about users in your Google Workspace account, but not other accounts. Toggle `Internal` to limit this to members in your account.

 ![Internal Users](../../static/documentation/identity/gsuite/consent-internal.png)

1. Input information about the application.

 ![App Domain](../../static/documentation/identity/gsuite/consent-screen-app-name.png)

 In this case, you are making an application available to your users and can add your team's contact information.

 ![Internal Users](../../static/documentation/identity/gsuite/consent-screen-contact.png)

 You will not need to configure scopes in this screen and can leave these fields blank.

 ![Consent Screen Scope](../../static/documentation/identity/gsuite/consent-screen-scope.png)

 The summary page will load and you can save and exit.

 ![Consent Screen Summary](../../static/documentation/identity/gsuite/consent-screen-summary.png)

1. Return to the **Credentials** page. Click **+ Create Credentials**

 ![Create Credentials](../../static/documentation/identity/gsuite/create-credentials.png)

1. Select **OAuth client ID**.

 ![Select OAuth](../../static/documentation/identity/gsuite/select-oauth.png)

1. Select `Web application` as the Application type.

 ![Create OAuth](../../static/documentation/identity/gsuite/create-oauth.png)

1. Under **Authorized JavaScript origins**, in the **URIs** field, enter your [team domain](/glossary#team-domain). 

1. Under **Authorized redirect URIs**, in the **URIs** field, enter your team domain followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

 ![Input Team Domain](../../static/documentation/identity/gsuite/input-auth-domain.png)

 Click **Create**.

1. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should be kept securely and not shared. For the purposes of this tutorial, the secret field is kept visible. Copy both values.

 ![Secret Field](../../static/documentation/identity/gsuite/secret-field.png)

 The Client ID will now appear in the `APIs & Services` page.

![Client ID Visible](../../static/documentation/identity/gsuite/client-id-visible.png)

1. Navigate to the Cloudflare for Teams dashboard. In the `Authentication` page of the Access section, click **+ Add**.

 ![Add IdP](../../static/documentation/identity/gsuite/add-idp.png)

1. Select `Google Suite`.

 ![Add Google Suite](../../static/documentation/identity/gsuite/add-gsuite.png)

1. Input the Client ID and Client Secret fields generated previously. Additionally, input the domain of your Google Workspace account. Click **Save**.

 ![Add Google Suite](../../static/documentation/identity/gsuite/input-client.png)

1. To complete setup, you must scroll below and visit the link generated. If you are not the Google Workspace administrator, share the link with the administrator.

 ![Visit Link](../../static/documentation/identity/gsuite/visit-link.png)

1. The generated link will prompt you to login to your Google account and to authorize Cloudflare Access to view group information.

 ![Authorize Groups](../../static/documentation/identity/gsuite/authorize-groups.png)

 A success page will then load from Cloudflare Access.

 ![Group Success](../../static/documentation/identity/gsuite/group-success.png)

1. You can now return to the list of identity providers in the **Authentication** page of the Cloudflare for Teams dashboard. Select Google Suite and click **Test**.

 Your user identity and group membership should return.

 ![Connection Works](../../static/documentation/identity/gsuite/connection-works.png)

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "apps_domain": "mycompany.com"
    },
    "type": "google-apps",
    "name": "my example idp"
}