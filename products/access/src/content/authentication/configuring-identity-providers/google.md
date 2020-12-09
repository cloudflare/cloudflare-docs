---
order: 12
---

# Google

You can integrate Google authentication with Cloudflare Access without a Google Workspace account. The integration will allow any user with a Google account to login (if the Access policy allows them to reach the resource). Unlike the instructions for [Google Workspace](/authentication/configuring-identity-providers/gsuite), the steps below will not allow you to pull group membership information from a Google Workspace account.

1. Visit the Google Cloud Platform console. Create a new project.

![Create Project](../../static/google/create-project.png)

2. Name the project and click **Create**.

![Name Project](../../static/google/name-project.png)

3. On the project home page that loads, select `APIs & Services` from the sidebar and click **Dashboard**.

![Name Project](../../static/google/click-api-dash.png)

4. You will first need to configure a consent screen. Click **Configure Consent Screen** at the top of the page.

![Click Consent](../../static/google/click-configure-consent.png)

5. Choose `External` as the User Type. Since this application is not being created in a Google Workspace account, the only types of users are external.

![Choose External](../../static/google/choose-external.png)

6. Name the application and add a support email (GCP will require you to add an email in your account).

![Name App](../../static/google/name-app.png)

You will also be prompted to input contact fields.

![Contact Fields](../../static/google/contact-fields.png)

7. In the `Scopes` section, we recommend adding the `userinfo.email` scope. This is not required for the integration to work, but will indicate to users authenticating what information is being gathered.

![Scopes](../../static/google/scopes.png)

You do not need to add test users.

![Test Users](../../static/google/test-users.png)

You can review the summary information and return to the dashboard at the bottom of the page.

![Summary](../../static/google/consent-screen-summary.png)

8. Return to the `APIs & Services` page and click **+ Create Credentials**. Select `OAuth client ID`.

![Create OAuth](../../static/google/create-oauth.png)

9. Name the application.

![Name OAuth](../../static/google/name-oauth.png)

10. You will need to input your Cloudflare authentication domain. The domain will be structured in the following format:

```
https://<your-auth-domain-here>.cloudflareaccess.com
```

Input the authentication domain without any path in the `Authorized JavaScript origins` section. In the Authorized redirect URIs section, input your authentication domain with the path below.

```
https://<your-auth-domain-here>.cloudflareaccess.com/cdn-cgi/access/callback
```

![Auth Domain](../../static/google/auth-domain.png)

11. Google will present the OAuth Client ID and Secret values. The secret field functions like a password and should be kept securely and not shared. For the purposes of this tutorial, the secret field is kept visible. Copy both values.

![Secret Field](../../static/google/oauth-created.png)

16. Navigate to the Cloudflare for Teams dashboard. In the `Authentication` page of the Access section, click **+ Add**.

![Add IdP](../../static/google/add-idp.png)

17. Select `Google`.

![Add Google](../../static/google/add-google.png)

18. Input the Client ID and Client Secret fields generated previously. Click **Save**.

![Add Google Suite](../../static/google/input-client.png)

21. You can now return to the list of identity providers in the `Authentication` page of the Cloudflare for Teams dashboard. Select Google Suite and click **Test**.

Your user identity should return.

![Connection Works](../../static/google/connection-works.png)

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
