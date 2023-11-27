---
pcx_content_type: how-to
title: Provision with SCIM
weight: 4
updated: 2023-11-27
---

# Provision Cloudflare with SCIM

By connecting a System for Cross-domain Identity Management (SCIM) provider, you can provision access to the Cloudflare dashboard on a per-user basis.

Currently, we only provide SCIM support for Azure Active Directory and Okta in Self-Hosted Access applications.

For more information about SCIM support, refer to the [Announcing SCIM support for Cloudflare Access & Gateway](https://blog.cloudflare.com/access-and-gateway-with-scim/) blog post.

## Limitations

- You cannot update [user attributes](/cloudflare-one/policies/gateway/identity-selectors/) from the identity provider.
- If a user is the only Super Administrator on an Enterprise account, they will not be deprovisioned.
- Currently, Cloudflare does not support Okta Integration Network (OIN) integration. This integration is in review.

## Prerequisites

- Cloudflare provisioning with SCIM is only available to Enterprise customers and requires a Cloudflare-specific feature flag. Contact your account team for more information.
- In Cloudflare, [Super Administrator](/fundamentals/setup/manage-members/roles/) access on the account that maintains [your SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/).
- In other identity providers (IdP), access to the `Create groups` and `Manage applications` [permissions](https://help.okta.com/en-us/Content/Topics/Security/custom-admin-role/about-role-permissions.htm).

---

## Create an API token

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following permissions:

   | Type    | Item             | Permission |
   | ------- | ---------------- | ---------- |
   | Account | Account Settings | Read       |
   | Account | Account Settings | Edit       |
   | User    | Memberships      | Read       |
   | User    | Memberships      | Edit       |

2. Add the following under **Account Resources**:

   | Action  | Account          |
   | ------- | ---------------- |
   | Include | \<account name\> |

3. Under **Account Resources**, select the specific account to include or exclude from the dropdown menu.
4. Select **Continue to summary**.
5. Validate the permissions and select **Create Token**.
6. Copy the token value.

---

## Provision with Okta

1. Log in the Okta Admin dashboard and go to **Directory** > **Groups**.
2. Select **Add group** and name your group. Select **Save**.
3. Select the group you created.
4. Select **Assign people** and assign all Cloudflare Users to it.
5. Select **Done**.

### Set up your Okta SCIM application.

1. In the Okta dashboard, go to **Applications** > **Applications**.
2. Select **Browse App Catalog**.
3. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**.
4. Select **Add Integration** and name your integration.
5. Enable the following options:

   - **Do not display application icon to users**
   - **Do not display application icon in the Okta Mobile App**

6. Disable **Automatically log in when user lands on login page**.
7. Select **Next**, then select **Done**.

### Integrate the Cloudflare API.

1. In your integration page, go to **Provisioning** > **Configure API Integration**.
2. Enable **Enable API Integration**.
3. In SCIM 2.0 Base Url, enter `https://api.cloudflare.com/client/v4/accounts/<your_account_ID>/scim/v2`.
4. In OAuth Bearer Token, enter your API token value.
5. Disable **Import Groups**.
6. Select **Save**.

### Set up your SCIM users.

   1. In **Provisioning to App**, select **Edit**.
   2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
   3. In the integration page, go to **Assignments** > **Assign** > **Assign to Groups**.
   4. Assign users to your Cloudflare SCIM group.
   5. Select **Done**.

### Configure user permissions on Okta

1. In the tab bar, go to **Provisioning**. Select **Edit**.
2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
3. Select **Add group** and add groups with the following names:

   - `Administrator Read Only`
   - `Administrator`
   - `Billing`
   - `Super Administrator - All Privileges`

4. Go to **Push Groups** and select the gear icon.
5. Disable **Rename groups**. Select **Save**.
6. Within the **Push Groups** tab, select **Push Groups**.
7. Add the groups you created.
8. Select **Save**.

Adding any users to these groups will grant them the role. Removing the users from the identity provider will remove them from the associated role.

Refer to [Roles](/fundamentals/account-and-billing/account-security/scim-setup/scim-roles/) more details.

---

## Provision using Microsoft Azure Active Directory (AD)

{{<Aside type="note">}}
If Microsoft Azure AD does not work, you can alternatively try using the [Microsoft Entra admin center](/fundamentals/account-and-billing/account-security/scim-setup/#provision-using-microsoft-entra).
{{</Aside>}}

### Set up the Microsoft Azure AD Enterprise application.

   1. Go to your Microsoft Azure AD instance > Enterprise Applications.
   2. Select **Create your own application** and name your application.
   3. Select **Integrate any other application you don’t find in the gallery (Non-gallery)**.
   4. Select **Create**.

### Provision the Azure AD Enterprise application.

   1. Under **Manage** on the sidebar menu, select **Provisioning**.
   2. Select **Automatic** on the dropdown menu for the Provisioning Mode.
   3. Enter your API token value and the tenant URL: `https://api.cloudflare.com/client/v4/accounts/<your_account_ID>/scim/v2`.
   4. Select **Test Connection**, then select **Save**.

### Configure user permissions in Azure AD

Currently, groups need to match a specific format to provision specific Cloudflare account-level roles. Cloudflare is in the process of adding Cloudflare Groups, which can take in freeform group names in the future.

These permissions work on an exact string match with the prefix `CF-<your_account_id> - <roleName>`

Refer to [Roles](/fundamentals/account-and-billing/account-security/scim-setup/scim-roles/) more details.

1. To ensure that only required groups are provisioned, go to your Microsoft Azure AD instance.
2. Under Manage on the sidebar menu, select **Provisioning**.
3. Select **Provision Azure Active Directory Groups** in Mappings.
4. Select **All records** under Source Object Scope.
5. Select **Add scoping filter** and create the appropriate filtering criteria to capture only the necessary groups.
6. Save the Attribute Mapping by selecting **OK** and return to the Enterprise Application Provisioning overview page.
7. Select **Start provisioning** to view the new users and groups populated on the Cloudflare dashboard. 

---

## Provision using Microsoft Entra

   1. In the Microsoft Entra admin center, select **Overview** > **Manage provisioning**.
   2. Select **Add scoping filters**.
   3. Under Mappings, you can select filters for groups and users. 

   {{<Aside type="note">}}
   Microsoft does not currently support `MemberOf` group as a filter.
   {{</Aside>}}

   4. To target a specific set of users, select Provision Azure Active Directory Users then choose **All records** under Source Object Scope.
   5. Select **Add scoping filter** and add the appropriate scoping criteria to match the users that need to be synchronized. Any users that are not explicitly given the named Azure Groups will be provisioned to Cloudflare, but will not have any permissions attached