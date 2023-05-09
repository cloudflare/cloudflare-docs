---
pcx_content_type: how-to
title: SCIM provisioning
weight: 4
---

# Provision Cloudflare with SCIM

By adding a Dashboard SSO application to your Cloudflare Zero Trust account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice. SSO will be enforced for every user in your email domain.

## Prerequisites

- In Cloudflare, super administrator access on the account that maintains the SSO connector
- In Okta, access to Create Groups and Create Applications

## Limitations

- We are unable to automatically deprovision users under domains that do not have the SSO connector
- We are unable to update user attributes from the IDP
- If a user is the only super administrator on an enterprise account, they will not be deprovisioned.
- We currently do not have an Okta Application Network integration, but this is currently in review.

## 1. Create a token

[Create a token](/fundamentals/api/get-started/create-token/) with the following permissions:

| Type    | Item             | Permission |
| ------- | ---------------- | ---------- |
| Account | Account Settings | Read       |
| Account | Account Settings | Edit       |
| User    | Memberships      | Read       |
| User    | Memberships      | Edit       |

Add the following account resources:

| Action  | Account          |
| ------- | ---------------- |
| Include | < account name > |

After creating the token, copy the token value.

## 2. Assign Cloudflare users to an Okta group

1. In the Okta dashboard, go to **Directory** > **Groups**.
2. Select **Add a group**, name it, then select **Save**.
3. Select the group, then select **Assign people**. Add your users, then select **Done**.

## 3. Set up the Okta application

1. In the Okta dashboard, go to **Applications** > **Applications**.
2. Select **Browse App Catalog**. Locate and select **SCIM 2.0 Test App (OAuth Bearer Token)**, then select **Add Integration**.
3. Name your application. Enable **Do not display application icon to users** and **Do not display application icon in the Okta Mobile App**, and disable **Automatically log in when user lands on login page**.
4. Select **Next**, then select **Done**.
5. Go to **Provisioning** > **Configure API Integration**.
6. Enable **Enable API Integration**. In SCIM 2.0 Base Url, enter `https://api.cloudflare.com/client/v4/accounts/<youraccounttag>/scim/v2`. In OAuth Bearer Token, enter your token value. Disable **Import Groups**, then select **Save**.
7. In **Provisioning to App**, select **Edit**. Enable **Create Users** and **Deactivate Users**, then select **Save**.
8. Go to **Assignments** > **Assign** > **Assign to Groups**. Assign your Cloudflare group, then select **Done**.
