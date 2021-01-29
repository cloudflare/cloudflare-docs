---
order: 12
---

# Google

You can integrate Google authentication with Cloudflare Access without a Google Workspace account. The integration will allow any user with a Google account to login (if the Access policy allows them to reach the resource). Unlike the instructions for [Google Workspace](/identity/idp-integration/gsuite), the steps below will not allow you to pull group membership information from a Google Workspace account.

1. Visit the Google Cloud Platform console. Create a new project.

![Create Project](../../static/documentation/identity/google/create-project.png)

2. Name the project and click **Create**.

![Name Project](../../static/documentation/identity/google/name-project.png)

3. On the project home page that loads, select `APIs & Services` from the sidebar and click **Dashboard**.

![Name Project](../../static/documentation/identity/google/click-api-dash.png)

4. You will first need to configure a consent screen. Click **Configure Consent Screen** at the top of the page.

![Click Consent](../../static/documentation/identity/google/click-configure-consent.png)

5. Choose `External` as the User Type. Since this application is not being created in a Google Workspace account, the only types of users are external.

![Choose External](../../static/documentation/identity/google/choose-external.png)

6. Name the application and add a support email (GCP will require you to add an email in your account).

![Name App](../../static/documentation/identity/google/name-app.png)

You will also be prompted to input contact fields.

![Contact Fields](../../static/documentation/identity/google/contact-fields.png)

7. In the `Scopes` section, we recommend adding the `userinfo.email` scope. This is not required for the integration to work, but will indicate to users authenticating what information is being gathered.

![Scopes](../../static/documentation/identity/google/scopes.png)

You do not need to add test users.

![Test Users](../../static/documentation/identity/google/test-users.png)

You can review the summary information and return to the dashboard at the bottom of the page.

![Summary](../../static/documentation/identity/google/consent-screen-summary.png)

8. Return to the `APIs & Services` page and click **+ Create Credentials**. Select `OAuth client ID`.

![Create OAuth](../../static/documentation/identity/google/create-oauth.png)

9. Name the application.

![Name OAuth](../../static/documentation/identity/google/name-oauth.png)

10. In the **Authorized JavaScript origins**, input your [organization domain](/glossary#organization-domain).

 In the** Authorized redirect URIs** section, input your organization domain with the path below:

```text
https://<your-organization-name>.cloudflareaccess.com/cdn-cgi/access/callback
```

![organization domain](../../static/documentation/identity/google/auth-domain.png)

11. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should be kept securely and not shared. For the purposes of this tutorial, the secret field is kept visible. Copy both values.

![Secret Field](../../static/documentation/identity/google/oauth-created.png)

16. Navigate to the Cloudflare for Teams dashboard. In the `Authentication` page of the Access section, click **+ Add**.

![Add IdP](../../static/documentation/identity/google/add-idp.png)

17. Select `Google`.

![Add Google](../../static/documentation/identity/google/add-google.png)

18. Input the Client ID and Client Secret fields generated previously. Click **Save**.

![Add Google Suite](../../static/documentation/identity/google/input-client.png)

21. You can now return to the list of identity providers in the `Authentication` page of the Cloudflare for Teams dashboard. Select Google Suite and click **Test**.

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
