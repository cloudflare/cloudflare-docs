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
- In Okta, access to Create Groups and Create Applications.

## Limitations

- You cannot automatically deprovision users under domains that do not have the SSO connector.
- You cannot update user attributes from the IdP.
- If a user is the only super administrator on an enterprise account, they will not be deprovisioned.
- We currently do not have an Okta Integration Network (OIN) integration. This is currently in review.

## 1. Create a token

[Create a token](/fundamentals/api/get-started/create-token/) with the following permissions:

| Type    | Item             | Permission |
| ------- | ---------------- | ---------- |
| Account | Account Settings | Read       |
| Account | Account Settings | Edit       |
| User    | Memberships      | Read       |
| User    | Memberships      | Edit       |

Add the following under **Account Resources**:

| Action  | Account          |
| ------- | ---------------- |
| Include | \<account name\> |

After creating the token, copy the token value.

## 2. Assign Cloudflare users to an Okta group

1. In the Okta dashboard, go to **Directory** > **Groups**.
2. Select **Add a group**, enter a name, then select **Save**.
3. Select the group, then select **Assign people**.
4. Add your users, then select **Done**.

## 3. Set up the Okta application

1. In the Okta dashboard, go to **Applications** > **Applications**.
2. Select **Browse App Catalog**. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**, then select **Add Integration**.
3. Name your application. Enable **Do not display application icon to users** and **Do not display application icon in the Okta Mobile App**, and disable **Automatically log in when user lands on login page**.
4. Select **Next**, then select **Done**.
5. Go to **Provisioning** > **Configure API Integration**.
6. Enable **Enable API Integration**. In SCIM 2.0 Base Url, enter `https://api.cloudflare.com/client/v4/accounts/<youraccounttag>/scim/v2`. In OAuth Bearer Token, enter your token value. Disable **Import Groups**, then select **Save**.
7. In **Provisioning to App**, select **Edit**. Enable **Create Users** and **Deactivate Users**, then select **Save**.
8. Go to **Assignments** > **Assign** > **Assign to Groups**. Assign your Cloudflare group, then select **Done**.
