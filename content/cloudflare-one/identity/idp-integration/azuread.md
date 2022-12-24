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

3. In the Azure Active Directory menu, go to **Enterprise applications**  and select **New application**.

4. Select **Create your own application**.

5. Name your application (for example, `Cloudflare Access`).

6. Select **Register an application to integration with Azure AD (App you're developing)** and then select **Create**.

7. Under **Redirect URI**, select the _Web_ platform and enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in the Zero Trust dashboard under **Settings** > **General**.

    ![Registering an application in Azure](/cloudflare-one/static/documentation/identity/azure/name-app.png)

8. Select **Register**.

9. Next, return to the Azure Active Directory menu and go to **App registrations**.

10. Select the app you just created and copy the **Application (client) ID** and **Directory (tenant) ID**.

11. Navigate to **Certificates & secrets** and select **New client secret**.

12. Name the client secret and choose an expiration period. 

13. After the client secret is created, copy its **Value** field. Store the client secret in a safe place, as it can only be viewed immediately after creation.

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

5. Select **Grant admin consent**.

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

## Synchronize users and groups

Blurb about what this feature does.

### 1. Enable SCIM in the Zero Trust dashboard

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.

2. Locate the **Azure AD** integration and select **Edit**.

3. Enable **Support groups**.

4. Select **Enable SCIM**. Optional settings include:
  - **Enable user deprovisioning**: [Revoke a user's session](/cloudflare-one/identity/users/session-management/#per-user) when they are removed from the Azure application.
  - **Remove user seat on deprovision**: [Remove a user's seat](/cloudflare-one/identity/users/seat-management/) when they are removed from the Azure application.
  - **Enable group membership change reauthentication**: Require users to reauthenticate with Access when their group membership is updated in Azure AD. Reauthentication allows Access to update the user's nested group memberships.

5. Select **Save**.

6. Copy the resulting **SCIM Endpoint** and **SCIM Secret**. You will need to [enter these values](#set-up-scim-in-azure) into Azure AD.

### 2. Set up SCIM in Azure

{{<Aside type="note">}}
Until Microsoft supports out-of-the-box provisioning for Access, SCIM requires a separate enterprise application from the one created during [initial setup](#set-up-azure-ad-as-an-identity-provider).
{{</Aside>}}

1. In the Azure Active Directory menu, go to **Enterprise applications**  and select **New application**.

2. Select **Create your own application**.

3. Name your application (for example, `Cloudflare Access SCIM`).

4. Select **Integrate any other application you don't find in the gallery (Non-gallery)**.

5. Once the application is created, [assign users and groups to the application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal?pivots=portal). Azure does not currently synchronize nested groups. However, Access can still read nested group memberships when users log in to the application.

6. Navigate to **Provisioning** and select **Get started**.

7. For **Provisioning Mode**, choose _Automatic_.

8. In the **Tenant URL** field, enter the **SCIM Endpoint** obtained from the Zero Trust dashboard.

9. In the **Secret Token** field, enter the **SCIM Secret** obtained from the Zero Trust dashboard.

![Azure dashboard screen for configuring provisioning]()

10. Select **Test Connection**.

11. Once the test succeeds, select **Save**. Exit the dialog to return to the **Provisioning** page.

12. Select **Start provisioning**. The synchronized objects and logs will appear in the Azure dashboard.

Cloudflare Access will now synchronize the configured users and groups with the Azure AD database. When you build an Access policy, the synchronized groups will appear in the **Values** dropdown when you choose the _Azure groups_ selector.

{{<Aside type="note">}}
Gateway does not currently support SCIM synchronization. To use Azure groups in a Gateway policy, you must manually enter their Object IDs.
{{</Aside>}}

## Read nested Azure groups

Azure AD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. Need to use this method to create Cloudflare Gateway policies. Also needed to read transitive groups in Access policies.

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
