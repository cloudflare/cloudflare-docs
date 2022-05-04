---
pcx-content-type: how-to
title: Azure AD®
weight: 4
---

# Microsoft Azure AD®

You can integrate Microsoft Azure AD® (Active Directory) with Cloudflare Zero Trust and build rules based on user identity and group membership. Users will authenticate with their Azure AD credentials and connect to Zero Trust.

## Set up Azure AD as an identity provider

1. Log in to the [Azure dashboard](https://portal.azure.com/).

2. Click **Azure Active Directory** in the Azure Services section.

![Navigating to Azure Active Directory on the Azure dashboard](/cloudflare-one/static/documentation/identity/azure/pick-azure-ad.png)

3. Navigate to **Manage** > **App registrations** and click **+ New registration**.

![Adding a new app in Azure](/cloudflare-one/static/documentation/identity/azure/click-new-reg.png)

4. Name your application and select _Web_ from the **Select a platform** dropdown.

5. Enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

6. Click **Register**.

![Registering an application in Azure](/cloudflare-one/static/documentation/identity/azure/name-app.png)

7. Copy the `Application (client) ID` and `Directory (tenant) ID`. You will need to input these values into the Cloudflare dashboard.

![Application and Directory IDs in Azure](/cloudflare-one/static/documentation/identity/azure/client-directory-ids.png)

8. To create an Application Secret, navigate to **Certificates & Secrets** and click **+ New client secret**.

9. Name the client secret and choose an expiration. Click **Add**.

![Adding a client secret in Azure](/cloudflare-one/static/documentation/identity/azure/name-client-cert.png)

10. Copy the `Value` field of the client secret. Treat this value like a password. This example leaves the value visible so the values in Azure can be seen in the Access configuration.

![Viewing client secret in Azure](/cloudflare-one/static/documentation/identity/azure/client-cert-value.png)

11. Navigate to **API permissions** and click **Add a permission**.

![Adding an API permission in Azure](/cloudflare-one/static/documentation/identity/azure/api-perms.png)

12. Click **Microsoft Graph**.

![Selecting Microsoft Graph API in Azure](/cloudflare-one/static/documentation/identity/azure/microsoft-graph.png)

13. Select **Delegated permissions**. You will need to toggle 7 specific permissions in the next page. Once toggled, click **Add permissions**.

    - email
    - openid
    - profile
    - offline_access
    - User.Read
    - Directory.Read.All
    - Group.Read.All

![Configuring Microsoft Graph API permissions in Azure](/cloudflare-one/static/documentation/identity/azure/request-perms.png)

14. Click **Grant Admin Consent for <your-account>**.

![Configured permissions list in Azure](/cloudflare-one/static/documentation/identity/azure/configured-perms.png)

15. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.

16. Under **Login methods**, click **Add new**.

17. Click **Azure AD**.

18. Input the `Application ID`, `Application secret`, and `Directory ID` values from Azure.

19. (Optional) If you are using Azure AD groups, toggle **Support Groups** slider **On** in the **Edit your Azure AD identity provider** window.

20. Click **Save**.

To test that your connection is working, navigate to **Authentication** > **Login methods** and click **Test** next to Azure AD.

## Use Azure AD groups

Azure AD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. To use Azure groups in Cloudflare Access:

1. Make sure you toggle on the **Support groups** switch as you set up Azure AD on your Zero Trust dashboard.

2. On your Azure dashboard, note the `Object Id` for the Azure group. In the example below, the group named Admins has an ID of `61503835-b6fe-4630-af88-de551dd59a2`.

![Viewing the Azure group IDs on the Azure dashboard](/cloudflare-one/static/documentation/identity/azure/object-id.png)

3. When you create a Zero Trust policy for an Azure group, you will be prompted to enter the **Azure group ID**. Enter the `Object Id` for the Azure group.

![Entering an Azure group ID on the Zero Trust dashboard](/cloudflare-one/static/documentation/identity/azure/configure-group-n.png)

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "directory_id": "<your azure directory uuid>",
    "support_groups": true
  },
  "type": "azureAD",
  "name": "my example idp"
}
```
