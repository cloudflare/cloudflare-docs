---
pcx_content_type: how-to
title: Provision with SCIM
weight: 4
---

# Provision Cloudflare with SCIM

By connecting a System for Cross-domain Identity Management (SCIM) provider, you can provision access to the Cloudflare dashboard on a per-user basis.

Currently, we only provide SCIM support for Azure Active Directory and Okta in Self-Hosted Access applications.

For more information about SCIM support, refer to the [Announcing SCIM support for Cloudflare Access & Gateway](https://blog.cloudflare.com/access-and-gateway-with-scim/) blog post.

This guide will use Okta as the SCIM provider.

## Prerequisites

- In Cloudflare, [Super Administrator](/fundamentals/account-and-billing/members/roles/) access on the account that maintains [your SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/).
- In Okta, access to the `Create groups` and `Manage applications` [permissions](https://help.okta.com/en-us/Content/Topics/Security/custom-admin-role/about-role-permissions.htm).

## Limitations

- You cannot automatically deprovision users under domains that do not have the SSO connector.
- You cannot update [user attributes](/cloudflare-one/policies/gateway/identity-selectors/) from the SCIM provider.
- If a user is the only Super Administrator on an Enterprise account, they will not be deprovisioned.
- Currently, we do not support Okta Integration Network (OIN) integration. This integration is in review.

## 1. Create an API token

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

3. Copy the token value.

## 2. Assign Cloudflare users to an Okta group

1. In the Okta dashboard, go to **Directory** > **Groups**.
2. Select **Add a group** and enter a name. Select **Save**.
3. Select the group you created.
4. Select **Assign people** and add your users.
5. Select **Done**.

## 3. Set up the Okta application

1. Create your Okta SCIM application.

   1. In the Okta dashboard, go to **Applications** > **Applications**.
   2. Select **Browse App Catalog**.
   3. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**.
   4. Select **Add Integration** and name your integration.
   5. Enable the following options:

      - **Do not display application icon to users**
      - **Do not display application icon in the Okta Mobile App**

   6. Disable **Automatically log in when user lands on login page**.
   7. Select **Next**, then select **Done**.

2. Integrate the Cloudflare API.

   1. In your integration page, go to **Provisioning** > **Configure API Integration**.
   2. Enable **Enable API Integration**.
   3. In SCIM 2.0 Base Url, enter `https://api.cloudflare.com/client/v4/accounts/<your_account_ID>/scim/v2`.
   4. In OAuth Bearer Token, enter your API token value.
   5. Disable **Import Groups**.
   6. Select **Save**.

3. Set up your SCIM users.

   1. In **Provisioning to App**, select **Edit**.
   2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
   3. In the integration page, go to **Assignments** > **Assign** > **Assign to Groups**.
   4. Assign users to your Cloudflare group.
   5. Select **Done**.

## 4. Configure user permissions

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
