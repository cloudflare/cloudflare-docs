---
pcx_content_type: how-to
title: Manage
weight: 2
meta:
    title: Manage account members
---

# Manage account members

Learn how to add new account members, edit or revoke their permissions and access, and resend verifications emails.

{{<Aside type="note">}}
{{<render file="_account-member-manage-limitation.md">}}
{{</Aside>}}

## Add account members

To add a member to your account:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account[^1].
2. Go to **Manage Account** > **Members**.
3. Select **Invite**.
4. Fill out the following information:

    - **Invite members**: Enter one or more email addresses (if multiple, separate addresses with commas).
    - **Scope**: Use a variety of fields to adjust the [scope](/fundamentals/account-and-billing/members/roles/) of your roles.
    - **Roles**: Choose one or more [roles](/fundamentals/account-and-billing/members/roles/) to assign your members.

5. Select **Continue to summary**.
6. Review the information, then select **Invite**.

{{<Aside type="note">}}
If a user already has an account with Cloudflare and you have an Enterprise account, you can also select **Direct Add** to add them to your account without sending an email invitation.
{{</Aside>}}

## Edit member permissions

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account[^2].
2. Go to **Manage Account** > **Members**.
3. Select a member record, then select **Edit**.
4. Update the scope and roles of their permissions.
5. Select **Continue to summary**.
6. Review the information, then select **Update**.

## Resend an invitation

If you invited a member to your account but they cannot find the invitation or the invitation expires, you can resend the invitation through the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account[^3].
2. Go to **Manage Account** > **Members**.
3. Select a member record where their **Status** is **Invite Pending**.
4. Select **Resend invite**.

## Remove account members

To revoke a member's access to your account:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account[^4].
2. Go to **Manage Account** > **Members**.
3. Locate an account member and expand their record.
4. Click **Revoke**.
5. Click **Yes, revoke access**.

[^1]: {{<render file="_account-member-manage-limitation.md">}}
[^2]: {{<render file="_account-member-manage-limitation.md">}}
[^3]: {{<render file="_account-member-manage-limitation.md">}}
[^4]: {{<render file="_account-member-manage-limitation.md">}}
