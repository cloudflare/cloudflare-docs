---
pcx_content_type: how-to
title: Provision with SCIM
weight: 4
---

# Provision Cloudflare with SCIM

By connecting a System for Cross-domain Identity Management (SCIM) provider, you can provision access on a per-user basis.

This how-to will use Okta as the IdP provider.

## Prerequisites

- In Cloudflare, super administrator access on the account that maintains [your SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/).
- In Okta, access to the `Create groups` and `Manage applications` permissions.

## Limitations

- You cannot automatically deprovision users under domains that do not have the SSO connector.
- You cannot update user attributes from the IdP.
- If a user is the only super administrator on an enterprise account, they will not be deprovisioned.
- We currently do not have an Okta Integration Network (OIN) integration. This is currently in review.

## 1. Create a token

1. [Create a token](/fundamentals/api/get-started/create-token/) with the following permissions:

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
3. Select the group > **Assign people**.
4. Add your users. Select **Done**.

## 3. Set up the Okta application

1. Create your Okta SCIM application.

   1. In the Okta dashboard, go to **Applications** > **Applications**.
   2. Select **Browse App Catalog**.
   3. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**.
   4. Select **Add Integration** and name your application.
   5. Enable **Do not display application icon to users** and **Do not display application icon in the Okta Mobile App**, and disable **Automatically log in when user lands on login page**.
   6. Select **Next**, then select **Done**.

2. Integrate the Cloudflare API.

   1. Go to **Provisioning** > **Configure API Integration**.
   2. Enable **Enable API Integration**.
   3. In SCIM 2.0 Base Url, enter `https://api.cloudflare.com/client/v4/accounts/<your_account_tag>/scim/v2`.
   4. In OAuth Bearer Token, enter your token value.
   5. Disable **Import Groups**.
   6. Select **Save**.

3. Set up your users.

   1. In **Provisioning to App**, select **Edit**.
   2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
   3. Go to **Assignments** > **Assign** > **Assign to Groups**. Assign your Cloudflare group.
   4. Select **Done**.

## 4. Configure permissions

1. In the tab bar, go to **Provisioning**. Select **Edit**.
2. Enable **Create Users** and **Deactivate Users**. Select **Save**.
3. Select **Add group** and add groups with the following names:

- `Administrator Read Only`
- `Administrator`
- `Billing`
- `Super Administrator - All Privileges`

4. Go to **Push Groups** > gear icon.
5. Disable **Rename groups**. Select **Save**.
6. Within the **Push Groups** tab, select **Push Groups**.
7. Add the groups you created.
8. Select **Save**.

Adding any users to these groups will grant them the role. Removing the users from the IdP will remove them from the associated role.
