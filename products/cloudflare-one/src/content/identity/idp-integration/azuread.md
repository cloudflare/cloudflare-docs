---
order: 12
---

# Microsoft Azure AD®

You can integrate Microsoft Azure AD® (Active Directory) with Cloudflare for Teams and build rules based on user identity and group membership. Users will authenticate with their Azure AD credentials and connect to Teams.

1. Sign in to [the Azure dashboard](https://portal.azure.com/).

 ![Azure AD Portal](../../static/documentation/identity/azure/azure-portal.png)

1. Click **Azure Active Directory** in the Azure Services section.

 ![Azure AD Select AD](../../static/documentation/identity/azure/pick-azure-ad.png)

1. On the **Azure AD** dashboard, click **App registrations** in the **Manage** section of the _Azure Active Directory_ pane.

 ![Azure AD App Registration](../../static/documentation/identity/azure/click-app-reg.png)

1. Click **+ New registration**.

 ![Azure AD New Registration](../../static/documentation/identity/azure/click-new-reg.png)

1. Name your application and enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```
    Click **Register**.

 ![Azure AD Cloudflare Access App](../../static/documentation/identity/azure/name-app.png)

1. On the following screen, copy the `Application (client) ID` and `Directory (tenant ID`. You will need to input these values into the Cloudflare dashboard.

 ![Azure AD IDs](../../static/documentation/identity/azure/client-directory-ids.png)

1. In the left hand panel, click **Certificates & Secrets** to create an Application Secret.

 ![Azure AD Certs and Secrets](../../static/documentation/identity/azure/certs-and-secrets.png)

1. Click **+ New client secret**. Name the client secret and choose an expiration. Click **Add**.

 ![Azure AD Certs and Secrets](../../static/documentation/identity/azure/name-client-cert.png)

 Copy the `Value` field of the client secret. Treat this value like a password. This example leaves the value visible so the values in Azure can be seen in the Access configuration.

 ![Azure AD Certs and Secrets](../../static/documentation/identity/azure/client-cert-value.png)

1. In the left hand panel, select **API permissions**. Click **Add a permission**.

 ![Azure AD API Permissions](../../static/documentation/identity/azure/api-perms.png)

1. Click **Microsoft Graph**.

 ![Azure AD API Permissions](../../static/documentation/identity/azure/microsoft-graph.png)

1. Select Delegated permissions. You will need to toggle 7 specific permissions in the next page. Once toggled, click **Add permissions**.

    - email
    - openid
    - profile
    - offline_access
    - User.Read
    - Directory.Read.All
    - Group.Read.All

 ![Azure AD API Permissions](../../static/documentation/identity/azure/request-perms.png)

1. On the next page, click the button that begins **Grant Admin Consent for ...**.

 ![Azure AD API Permissions](../../static/documentation/identity/azure/configured-perms.png)

1. On the Teams dashboard, navigate to **Configuration > Authentication**.

1. Under **Login methods**, click *+ Add*.

1. Choose **Azure AD** on the next page.

1. Input the `Application ID`, `Application secret`, and `Directory ID` values from Azure.

 If you are using Azure AD groups, toggle **Support Groups** slider **On** in the **Edit your Azure AD identity provider** window.

 ![Azure AD Add Identity](../../static/documentation/identity/azure/add-azure.png)

1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to Azure AD.

 ![Azure AD Test](../../static/documentation/identity/azure/valid-test.png)

## Using AzureAD Groups

AzureAD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. In the example below, the group named "Admins" has an ID of `61503835-b6fe-4630-af88-de551dd59a2`.

![Azure AD Test Connection](../../static/documentation/identity/azure/object-id.png)

To configure Access to use Azure groups, make sure you toggle on the **Support groups** switch as you set up Azure AD on your Teams dash.

This will enable you to select **Azure AD groups** when creating or editing a group. When asked for the **Azure group ID**, you must input the `Object Id`. 

![Azure AD Test Connection](../../static/documentation/identity/azure/configure-group-n.png)

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
