---
title: Permissions
pcx_content_type: reference
weight: 5
---

# Permissions

When you [create a user](/email-security/account-setup/manage-account-members/#add-user), the available options for permissions depend on whether your account is a **parent** account or a **child** account.

## Parent accounts

Parent accounts are treated as containers with no services provisioned. User accounts created at the parent level will allow them to access any child account.

These accounts are only required for administrators who manage multiple accounts, most commonly associated with our [partners](/email-security/partners/).

Parent users can have one of the following roles:

- **Read-only**: Can enter child accounts but is prevented from making any settings changes, regardless of the customer account settings.
- **Read-write**: Can enter child accounts and make changes on behalf of the customer.

If your account has [parent permissions](/email-security/account-setup/manage-parent-permissions/) that conflict with a parent user's permissions, the parent permissions set on your account take precedence.

## Child accounts

Child accounts control settings and services associated with an Area 1 instance.

### Child users

Users created at child level will only have access to the assigned child account. These users can have one of the following roles:

- **Read-only**: Only have access to view the email and detection statistics. No access to **Settings** (the gear icon).
- **Read-write**: Can view email and detection statistics, as well as message preview, retraction, detection search, and mail trace. No access to **Settings** (the gear icon).
- **Admin**: Can make any configuration changes for the account. Can access **Settings** (the gear icon).

| Account area              | Read-only | Read-write | Admin |
| ------------------------- | --------- | ---------- | ----- |
| All Settings              | ❌        | ❌         | ✅    |
| User Profile              | ✅        | ✅         | ✅    |
| Global Search             | ✅        | ✅         | ✅    |
| Detection Search          | ❌        | ✅         | ✅    |
| Mail Trace                | ❌        | ✅         | ✅    |
| Home                      | ✅        | ✅         | ✅    |
| Email                     | ✅        | ✅         | ✅    |
| Web                       | ✅        | ✅         | ✅    |
| Accountability            | ✅        | ✅         | ✅    |
| Announcements and Support | ✅        | ✅         | ✅    |
| Landscape                 | ✅        | ✅         | ✅    |
| Message Preview           | ❌        | ✅         | ✅    |
| Message Retraction        | ❌        | ✅         | ✅    |

### Parent users

Depending on the [parent permissions](/email-security/account-setup/manage-parent-permissions/) of your child account, you can delegate access to parent users of your account. This configuration will allow a parent user to view and change settings associated with your account.
