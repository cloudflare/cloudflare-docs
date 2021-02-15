---
order: 12
---

# Google

You can integrate Google authentication with Cloudflare Access without a Google Workspace account. The integration will allow any user with a Google account to login (if the [Zero Trust policy](/policies/zero-trust) allows them to reach the resource). Unlike the instructions for [Google Workspace](/identity/idp-integration/gsuite), the steps below will not allow you to pull group membership information from a Google Workspace account.

1. Visit the Google Cloud Platform console. Create a new project.

 ![Create Project](../../static/documentation/identity/google/create-project.png)

1. Name the project and click **Create**.

 ![Name Project](../../static/documentation/identity/google/name-project.png)

1. On the project home page that loads, select `APIs & Services` from the sidebar and click **Dashboard**.

 ![Name Project](../../static/documentation/identity/google/click-api-dash.png)

1. You will first need to configure a consent screen. Click **Configure Consent Screen** at the top of the page.

 ![Click Consent](../../static/documentation/identity/google/click-configure-consent.png)

1. Choose `External` as the User Type. Since this application is not being created in a Google Workspace account, the only types of users are external.

 ![Choose External](../../static/documentation/identity/google/choose-external.png)

1. Name the application and add a support email (GCP will require you to add an email in your account).

 ![Name App](../../static/documentation/identity/google/name-app.png)

 You will also be prompted to input contact fields.

 ![Contact Fields](../../static/documentation/identity/google/contact-fields.png)

1. In the **Scopes** section, we recommend adding the `userinfo.email` scope. This is not required for the integration to work, but will indicate to users authenticating what information is being gathered.

 ![Scopes](../../static/documentation/identity/google/scopes.png)

 You do not need to add test users.

 ![Test Users](../../static/documentation/identity/google/test-users.png)

 You can review the summary information and return to the dashboard at the bottom of the page.

 ![Summary](../../static/documentation/identity/google/consent-screen-summary.png)

1. Return to the **APIs & Services** page and click *+ Create Credentials*. Select `OAuth client ID`.

 ![Create OAuth](../../static/documentation/identity/google/create-oauth.png)

1. Name the application.

 ![Name OAuth](../../static/documentation/identity/google/name-oauth.png)

1. Under **Authorized JavaScript origins**, in the **URIs** field, enter your [team domain](/glossary#team-domain). 

1. Under **Authorized redirect URIs**, in the **URIs** field, enter your team domain followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

 ![Team Domain](../../static/documentation/identity/google/auth-domain.png)

1. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should not be shared. For the purposes of this tutorial, the secret field is kept visible. Copy both values.

 ![Secret Field](../../static/documentation/identity/google/oauth-created.png)

1. On the Teams dashboard, navigate to **Access > Authentication**.

1. Under **Login methods**, click *+ Add*.

1. Choose **Google** on the next page.

 ![Add IdP](../../static/documentation/identity/google/add-idp.png)

1. Select **Google**.

 ![Add Google](../../static/documentation/identity/google/add-google.png)

1. Input the Client ID and Client Secret fields generated previously.

1. Click **Save**.

![Add Google Suite](../../static/documentation/identity/google/input-client.png)

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to Google.

Your user identity should return.

![Connection Works](../../static/documentation/identity/google/connection-works.png)

## Example API Config

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
    },
    "type": "google",
    "name": "my example idp"
}
