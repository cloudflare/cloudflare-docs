---
pcx-content-type: reference
title: Roles and permissions
weight: 21
---

# Roles and permissions

When creating a Cloudflare Zero Trust account, you will be given the Super Administrator role. With this role, you can invite members to join your Zero Trust account, and assign them different roles depending on the permissions you’d like to give them.

Only Super Administrators of Enterprise accounts will be able to assign or remove the following roles from users in their account. Scroll to the right to see a full list of permissions for each role.

<TableWrap>

| | Access Read | Access Edit | Gateway Read | Gateway Edit | Gateway Report | Billing Read | Billing Edit |
| -- | -- | -- | -- | -- | -- | -- | -- |
| Super Administrator | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cloudflare for Teams | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| Cloudflare Access Admin | ✓ | ✓ | ✓ | - | ✓ | ✓ | - | - |
| Cloudflare Gateway Admin | ✓ | - | ✓ | ✓ | ✓ | ✓ | - | - |
| Cloudflare for Teams Read Only | ✓ | - | ✓ | - | ✓ | ✓ | - | - |
| Cloudflare for Teams Reporting | - | - | - | - | ✓ | ✓ | - | - |

</TableWrap>

## Protecting Personally Identifiable Information (PII)

By default, Super Administrators can access end users' PII, such as Device IDs, Source IPs, or usernames. No other roles will have the ability to read PII unless Super Administrators explicitly assign the **Cloudflare for Teams PII** role to them.

The Cloudflare for Teams + PII role should be considered add-on role to be combined with any other roles from the table above. For example, Super Administrators may decide to assign the Cloudflare Gateway Admin role to a user, and add the Cloudflare for Teams + PII role to allow that user to access PII in the Gateway logs.

## Assigning or removing a role

To check the list of members in your account, or to manage roles and permissions:

1.  Navigate to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2.  From your Account Home, navigate to Members.
3.  Enter a member’s email address to add them to your account, and click **Invite**.
4.  Alternatively, scroll down to the Members card to find a list of members with their status and role.

For more information on managing roles within your Cloudflare account, visit the [help center](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare#2K2NLky0NgEtThpHOwrgx8).
