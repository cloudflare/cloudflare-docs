---
pcx_content_type: how-to
title: Azure AD®
weight: 4
---

# Microsoft Azure AD®

You can integrate Microsoft Azure AD® (Active Directory) with Cloudflare Zero Trust and build policies based on user identity and group membership. Users will authenticate to Zero Trust using their Azure AD credentials.

## Set up Azure AD as an identity provider

### 1. Obtain Azure AD settings

The following Azure AD values are required to set up the integration:

- Application (client) ID
- Directory (tenant) ID
- Client secret

To retrieve those values:

1. Log in to the [Azure dashboard](https://portal.azure.com/).

2. Navigate to **All services** > **Azure Active Directory**.

In the Azure Active Directory menu, go to **Enterprise applications**  and select **New application**.

Select **Create your own application**.

Name your application.

Select **Register an application to integration with Azure AD (App you're developing)**. Select **Create**.

Input the Redirect URI.

Next, go to App registrations to configure permissions and the secret.


3. In the Azure Active Directory menu, go to **App registrations** and select **New registration**.
    ![Adding a new app in Azure](/cloudflare-one/static/documentation/identity/azure/click-new-reg.png)

4. Name your application.

5. Under **Redirect URI**, select the _Web_ platform and enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in the Zero Trust dashboard under **Settings** > **General**.

    ![Registering an application in Azure](/cloudflare-one/static/documentation/identity/azure/name-app.png)

6. Select **Register**.

7. Copy the **Application (client) ID** and **Directory (tenant) ID**.

8. Next, navigate to **Certificates & secrets** and select **New client secret**.

9. Name the client secret and choose an expiration period.

10. Select **Add**.

11. Copy the **Value** of the client secret. Store the client secret in a safe place, as it can only be viewed immediately after creation.

    ![Location of client secret in Azure](/cloudflare-one/static/documentation/identity/azure/client-cert-value.png)

### 2. Configure API permissions in Azure

1. In Azure Active Directory, navigate to **API permissions** and select **Add a permission**.

2. Select **Microsoft Graph**.

3. Select **Delegated permissions** and enable the following [permissions](https://learn.microsoft.com/en-us/graph/permissions-reference):

    - `email`
    - `offline_access`
    - `openid`
    - `profile`
    - `User.Read`
    - `Directory.Read.All`
    - `GroupMember.Read.All`

4. Once all seven permissions are enabled, select **Add permissions**.

5. Select **Grant admin consent** for your account.

    ![Configured permissions list in Azure](/cloudflare-one/static/documentation/identity/azure/configured-perms.png)

### 3. Add Azure AD as an identity provider

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.

2. Under **Login methods**, select **Add new**.

3. Select **Azure AD**.

4. Enter the **Application (client) ID**, **Client secret**, and **Directory (tenant) ID** obtained from the Azure dashboard.

5. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

6. (Optional) If you are using Azure AD groups, enable **Support Groups**.

7. Select **Save**.

8. Create an Enterprise app and assign users to the application.
https://azuretrendz.wordpress.com/2020/06/06/how-to-do-app-registration-for-enterprise-application/

To test that your connection is working, select **Test** next to Azure AD.

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
