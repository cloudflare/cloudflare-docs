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

- **Viewer**: Can enter child accounts but is prevented from making any settings changes, regardless of the customer account settings.
- **SOC Analyst**: Can enter child accounts and make changes on behalf of the customer.

If your account has [parent permissions](/email-security/account-setup/manage-parent-permissions/) that conflict with a parent user's permissions, the parent permissions set on your account take precedence.

## Child accounts

Child accounts control settings and services associated with an Area 1 instance.

### Child users

Users created at child level will only have access to the assigned child account. These users can have one of the following roles:

- **Super Admin**: Has full access to the account and can make any configuration changes. Can access **Settings** (the gear icon).
- **Configuration Admin**: Can make configuration changes and manage users, except for Super Admin. Has no ability to review messages.
- **SOC Analyst**: Can search, review and retract messages. Has no admin capabilites or access to **Settings** (the gear icon).
- **Viewer**: Only has access to metrics withing the system. No access to **Settings** (the gear icon).

{{<table-wrap>}}

Account area | Super Admin | Configuration Admin | SOC Analyst | Viewer
--- | --- | --- | --- | ---
All Settings | ✅ | ✅ | ❌ | ❌
User Profile | ✅ | ✅ | ✅ | ✅
Global Search | ✅ | ✅ | ✅ | ✅
Detection Search | ✅ | ✅ | ✅ | ✅
Detection Search Actions | ✅ | ✅ | ✅ | ❌
Mail Trace | ✅ | ✅ | ✅ | ❌
Home | ✅ | ✅ | ✅ | ✅
Email | ✅ | ✅ | ✅ | ✅
Web | ✅ | ✅ | ✅ | ✅
Accountability | ✅ | ✅ | ✅ | ✅
Announcements and Support | ✅ | ✅ | ✅ | ✅
Landscape | ✅ | ✅ | ✅ | ✅
Message Preview | ✅ | ❌ | ✅ | ❌
Message Retraction | ✅ | ❌ | ✅ | ❌
Admin Quarantine | ✅ | ❌ | ✅ | ❌

{{</table-wrap>}}

### Parent users

Depending on the [parent permissions](/email-security/account-setup/manage-parent-permissions/) of your child account, you can delegate access to parent users of your account. This configuration will allow a parent user to view and change settings associated with your account.