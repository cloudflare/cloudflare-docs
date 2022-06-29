---
pcx-content-type: how-to
title: Manage account access
weight: 2
---

# Manage account access

Customers on all plans can share account access with other members. However, the roles available to your account depend on your plan.

## Add account members

To add a member to your account:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator** and have a verified email address).
2. Go to **Manage Account** > **Members**.
3. For **Invite members**, enter one or more email addresses.
4. Choose the associated roles.

    <details>
    <summary>Available roles (non-Enterprise)</summary>
    <div>
    
    {{<render file="_account-roles-non-ent.md">}}

    </div>
    </details>

    <details>
    <summary>Available roles (Enterprise)</summary>
    <div>
    
    If you have an account on an Enterprise plan, you can assign multiple roles to additional members, scoping permissions broadly or narrowly as needed.

    To add a new member as a non-administrator (the default role):
    
    1. Click **More roles**.
    2. Select another role.
    3. De-select **Administrator**.

    For a full list of available roles and associated permissions, go to the [**Account Members**](https://dash.cloudflare.com/?to=/:account/members) page within the dashboard or refer to [Available roles](/fundamentals/account-and-billing/account-setup/account-roles/#enterprise-roles).

    </div>
    </details>

5. (Optional) Click **Direct add** to add the member to your account without requiring an email invitation.
6. Click **Invite**.

## Remove account members

To revoke a member's access to your account:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator**).
2. Go to **Manage Account** > **Members**.
3. Locate an account member and expand their record.
4. Click **Revoke**.
5. Click **Yes, revoke access**.

## Change Super Administrator

If you or someone in your organization leaves or loses access to email, you must change who is assigned the Super Administrator role. However, the process differs based on your plan type. 

### Enterprise customers

Enterprise users can have multiple Super Administrators associated with their accounts. To edit your Super Administrator, [add a member](#add-account-members) to your account and assign the **Super Administrator** role.

If you want to remove a previous Super Administrator, only do so after adding the new Super Administrator.

### Non-enterprise customers

Free, Pro, or Business customers are only allowed one Super Administrator. To change your Super Administrator, you must [change the email address](https://support.cloudflare.com/hc/articles/203471284#12345679) associated with your Cloudflare account to a new email address that is not associated with an existing Cloudflare account.

If your desired email address is currently used by another Cloudflare account, you may need to use a temporary email address as a placeholder while you update both accounts.

## Provide edit access to Cloudflare Support

Occasionally, you may want to allow edit access to your account for Cloudflare Support. A typical use case might be migrating a complex or sensitive domain over to Cloudflare.

By default, Cloudflare Support does not have edit access to your account.

To enable editing access by Cloudflare Support:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator**).
2. Go to **Manage Account** > **Configurations**.
3. For **Editing Permission**, switch the toggle to **On**.
4. Select a duration.
5. Click **Approve**.

{{<Aside type="note">}}

In an emergency, Cloudflare Support can override your **Editing Permissions** and make updates to your account, but your Super Administrator will receive an email and the action will be recorded in your [Audit Logs](/fundamentals/account-and-billing/account-security/review-audit-logs/) with an **Action** of **Break glass**.

{{</Aside>}}