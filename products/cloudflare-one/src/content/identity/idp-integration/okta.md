---
order: 12
---

# Okta

You can integrate Okta with Cloudflare Access to allow users to reach applications protected by Access with their Okta account.

1. In your Okta dashboard, click **Admin**.

![Okta Applications](../../static/documentation/identity/okta/click-admin.png)

2. Select the `Applications` tab in the Admin dashboard.

![Admin Dash](../../static/documentation/identity/okta/select-admin.png)

3. Click **Add Application** on the next page.

![Add App](../../static/documentation/identity/okta/add-app.png)

4. Click **Create New App** in the top right corner.

![Create New App](../../static/documentation/identity/okta/create-new-app.png)

5. Choose `Web` as the Platform and toggle `OpenID Connect`. Click **Create**.

![Create New App](../../static/documentation/identity/okta/web-app.png)

6. You can name the application to be any value. In the `Login redirect URIs` field, input your Cloudflare [organization domain](/glossary#organization-domain) followed by `/cdn-cgi/access/callback`, for example:

```text
https://example.cloudflareaccess.com/cdn-cgi/access/callback
```

![Create New App](../../static/documentation/identity/okta/add-uri.png)

7. Once saved, choose the `Sign On` tab from the application view.

![Create New App](../../static/documentation/identity/okta/app-view.png)

8. Scroll down to the `OpenID ConnectID Token`.

![Scroll Down](../../static/documentation/identity/okta/scroll-down.png)

9. Click **Edit** and edit the Groups claim filter to `Starts with` and the value `.*`.

![Scroll Down](../../static/documentation/identity/okta/edit-groups.png)

10. Next, click the `Assignments` tab.

![Assignments Tab](../../static/documentation/identity/okta/assignments-tab.png)

11. Click **Assign** and assign the application to all users in your organization.

![Assign App](../../static/documentation/identity/okta/assign-app.png)

12. Return to the `General` tab. Scroll down to find your credentials. Copy the ID and secret.

![Credentials](../../static/documentation/identity/okta/credentials.png)

13. Visit the Cloudflare for Teams dashboard and navigate to the `Authentication` page of the Access section. Click **+Add** to add a new identity provider. Choose `Okta`.

![Choose Okta](../../static/documentation/identity/okta/choose-okta.png)

14. Input the ID, secret, and the Okta account URL. Click **Save**.

![Input](../../static/documentation/identity/okta/input-credentials.png)

15. In the application list, you can now test the connection by clicking the **Test** button.

![Test](../../static/documentation/identity/okta/with-mfa.png)

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "okta_account": "https://dev-abc123.oktapreview.com",
    },
    "type": "okta",
    "name": "my example idp"
}
```
