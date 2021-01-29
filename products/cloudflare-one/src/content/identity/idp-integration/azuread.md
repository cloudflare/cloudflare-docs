---
order: 12
---

# Microsoft Azure AD® (Active Directory)

You can integrate Microsoft Azure AD® (Active Directory) with Cloudflare for Teams and build rules based on user identity and group membership. Users will authenticate with their Azure AD credentials and login to resources protected by Cloudflare Access or enroll into Cloudflare Gateway.

1. Sign in to [the Azure dashboard](https://portal.azure.com/).

![Azure AD Portal](../../static/documentation/identity/azure/azure-portal.png)

2. Click **Azure Active Directory** in the Azure Services section.

![Azure AD Select AD](../../static/documentation/identity/azure/pick-azure-ad.png)

3. On the **Azure AD** dashboard, click **App registrations** in the **Manage** section of the _Azure Active Directory_ pane.

![Azure AD App Registration](../../static/documentation/identity/azure/click-app-reg.png)

4. Click **+ New registration**.

![Azure AD New Registration](../../static/documentation/identity/azure/click-new-reg.png)

5. Name your application and enter your Authentication domain. The format of the Authentication domain will be `https://<your-organization-domain>/cdn-cgi/access/callback`, where `<your-organization-domain>` is your Teams [organization domain](/glossary#organization-domain). Click **Register**.

![Azure AD Cloudflare Access App](../../static/documentation/identity/azure/name-app.png)

6. On the following screen, copy the `Application (client) ID` and `Directory (tenant ID`. You will need to input these values into the Cloudflare dashboard.

![Azure AD IDs](../../static/documentation/identity/azure/client-directory-ids.png)

7. In the left hand panel, click **Certificates & Secrets** to create an Application Secret.

![Azure AD Certs and Secrets](../../static/documentation/identity/azure/certs-and-secrets.png)

8. Click **+ New client secret**. Name the client secret and choose an expiration. Click **Add**.

![Azure AD Certs and Secrets](../../static/documentation/identity/azure/name-client-cert.png)

Copy the `Value` field of the client secret. Treat this value like a password. This example leaves the value visible so the values in Azure can be seen in the Access configuration.

![Azure AD Certs and Secrets](../../static/documentation/identity/azure/client-cert-value.png)

9. In the left hand panel, select **API permissions**. Click **Add a permission**.

![Azure AD API Permissions](../../static/documentation/identity/azure/api-perms.png)

10. Click **Microsoft Graph**.

![Azure AD API Permissions](../../static/documentation/identity/azure/microsoft-graph.png)

11. Select Delegated permissions. You will need to toggle 7 specific permissions in the next page. Once toggled, click **Add permissions**.

    - email
    - openid
    - profile
    - offline_access
    - User.Read
    - Directory.Read.All
    - Group.Read.All

![Azure AD API Permissions](../../static/documentation/identity/azure/request-perms.png)

12. On the next page, click the button that begins **Grant Admin Consent for ...**.

![Azure AD API Permissions](../../static/documentation/identity/azure/configured-perms.png)

13. Return to the Cloudflare for Teams dashboard. Select `Authentication` under the Access section of the sidebar. In the `Login` tab, click **+ Add**. Choose `Azure AD` on the next page.

![Azure AD Add Identity](../../static/documentation/identity/azure/add-identity.png)

14. Input the `Application ID`, `Application secret`, and `Directory ID` values from Azure.

If you are using Azure AD groups, toggle **Support Groups** slider **On** in the **Edit your Azure AD identity provider** window.

![Azure AD Add Identity](../../static/documentation/identity/azure/add-azure-ad.png)

15. Click **Save and Test** to check your connection to the IdP.

![Azure AD Test](../../static/documentation/identity/azure/valid-test.png)

## Using AzureAD Groups

AzureAD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. In the example below, the group named "Admins" has an ID of "61503835-b6fe-4630-af88-de551dd59a2".

![Azure AD Test Connection](../../static/documentation/identity/azure/object-id.png)

When configuring Access to use Azure groups, you must input the `Object Id`.

![Azure AD Test Connection](../../static/documentation/identity/azure/group-config.png)

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "directory_id": "<your azure directory uuid",
        "support_groups": true
    },
    "type": "azureAD",
    "name": "my example idp"
}
```
