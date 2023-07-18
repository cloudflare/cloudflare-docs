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

2. Go to **All services** > **Azure Active Directory**.

3. In the Azure Active Directory menu, go to **Enterprise applications**.

4. Select **New application** > **Create your own application**.

5. Name your application.

6. Select **Register an application to integrate with Azure AD (App you're developing)** and then select **Create**.

7. Under **Redirect URI**, select the _Web_ platform and enter the following URL:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

   You can find your [team name](/cloudflare-one/glossary/#team-name) in Zero Trust under **Settings** > **General**.

   ![Registering an application in Azure](/images/cloudflare-one/identity/azure/name-app.png)

8. Select **Register**.

9. Next, return to the Azure Active Directory menu and go to **App registrations**.

10. Select the app you just created. Copy the **Application (client) ID** and **Directory (tenant) ID**.

    ![Viewing the Application ID and Directory ID in Azure](/images/cloudflare-one/identity/azure/azure-values.png)

11. Go to **Certificates & secrets** and select **New client secret**.

12. Name the client secret and choose an expiration period.

13. After the client secret is created, copy its **Value** field. Store the client secret in a safe place, as it can only be viewed immediately after creation.

    ![Location of client secret in Azure](/images/cloudflare-one/identity/azure/client-cert-value.png)

### 2. Configure API permissions in Azure

1. From the **App registrations** page for your application, go to **API permissions**.

2. Select **Add a permission**.

3. Select **Microsoft Graph**.

4. Select **Delegated permissions** and enable the following [permissions](https://learn.microsoft.com/en-us/graph/permissions-reference):

   - `email`
   - `offline_access`
   - `openid`
   - `profile`
   - `User.Read`
   - `Directory.Read.All`
   - `GroupMember.Read.All`

{{<Aside type="note">}}
More narrow permissions may be used, however this is the set of permissions that are tested and supported by Cloudflare.
{{</Aside>}}

5. Once all seven permissions are enabled, select **Add permissions**.

6. Select **Grant admin consent**.

   ![Configured permissions list in Azure](/images/cloudflare-one/identity/azure/configured-perms.png)

### 3. Add Azure AD as an identity provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

2. Under **Login methods**, select **Add new**.

3. Select **Azure AD**.

4. Enter the **Application (client) ID**, **Client secret**, and **Directory (tenant) ID** obtained from the Azure dashboard.

5. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

6. (Optional) If you are using Azure AD groups, enable **Support Groups**.

7. Select **Save**.

To [test](/cloudflare-one/identity/idp-integration#test-idps-in-zero-trust) that your connection is working, select **Test**.

## Synchronize users and groups

The Azure AD integration supports the [System for Cross-domain Identity Management (SCIM)](https://www.rfc-editor.org/rfc/rfc7642.txt) protocol. With SCIM, Cloudflare Access can automatically deprovision users after they are deactivated in the identity provider and display synchronized group names in the Access policy builder.

To synchronize users and groups between Access and Azure:

### 1. Enable SCIM in Zero Trust

{{<render file="_enable-scim-on-dashboard.md" withParameters="**Support groups** and **Enable SCIM**">}}

### 2. Configure SCIM in Azure

{{<Aside type="note">}}
SCIM requires a separate enterprise application from the one created during [initial setup](#set-up-azure-ad-as-an-identity-provider).
{{</Aside>}}

1. In the Azure Active Directory menu, go to **Enterprise applications**.

2. Select **New application** > **Create your own application**.

3. Name your application (for example, `Cloudflare Access SCIM`).

4. Select **Integrate any other application you don't find in the gallery (Non-gallery)**.

5. Once the SCIM application is created, [assign users and groups to the application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal?pivots=portal).

6. Go to **Provisioning** and select **Get started**.

7. For **Provisioning Mode**, choose _Automatic_.

8. In the **Tenant URL** field, enter the **SCIM Endpoint** obtained from Zero Trust.

9. In the **Secret Token** field, enter the **SCIM Secret** obtained from Zero Trust.

10. Select **Test Connection** to ensure that the credentials were entered correctly.

11. Select **Save**.

12. On the **Provisioning** page, select **Start provisioning**. You will see the synchronization status in Azure.

To check which users and groups were synchronized, select **View provisioning logs**.

## Azure groups in Zero Trust policies

### Automatic entry

When [SCIM synchronization is enabled](#synchronize-users-and-groups), the Azure group names will appear in the **Values** dropdown when you choose the _Azure Groups_ selector.

![Azure group names displayed in the Access policy builder](/images/cloudflare-one/identity/azure/azure-scim-groups.png)

### Manual entry

You can create Access and Gateway policies for groups that are not synchronized with SCIM. Azure AD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`.

1. Make sure you enable **Support groups** as you set up Azure AD in Zero Trust.

2. On your Azure dashboard, note the `Object Id` for the Azure group. In the example below, the group named Admins has an ID of `61503835-b6fe-4630-af88-de551dd59a2`.

   ![Viewing the Azure group ID on the Azure dashboard](/images/cloudflare-one/identity/azure/object-id.png)

3. If building an Access policy, choose the _Azure Groups_ selector. If building a Gateway policy, choose the _User Group IDs_ selector.

4. In the **Value** field, enter the `Object Id` for the Azure group.

   ![Entering an Azure group ID in Zero Trust](/images/cloudflare-one/identity/azure/configure-group-n.png)

### Nested groups

Access and Gateway policies for an Azure group will also apply to all [nested groups](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-manage-groups#add-or-remove-a-group-from-another-group). For example, if a user belongs to the group `US devs`, and `US devs` is part of the broader group `Devs`, the user would be allowed or blocked by all policies created for `Devs`.

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
