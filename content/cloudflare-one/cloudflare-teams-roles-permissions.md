---
pcx_content_type: reference
title: Roles and permissions
weight: 21
---

# Roles and permissions

When creating a Cloudflare Zero Trust account, you will be given the Super Administrator role. As a Super Administrator, you can invite members to join your Zero Trust account and assign them different roles. There is no limit to the number of members which can be added to a given account. Any members with the proper permissions will be able to make configuration changes while actively logged into Zero Trust (unless [read-only mode](/cloudflare-one/api-terraform/#set-dashboard-to-read-only) is enabled).

To check the list of members in your account, or to manage roles and permissions, refer to our [Account setup](/fundamentals/account-and-billing/members/) documentation.

## Zero Trust roles

{{<Aside type="note">}}
This feature is only available on Enterprise plans.
{{</Aside>}}

Only Super Administrators of Enterprise accounts will be able to assign or remove the following roles from users in their account. Scroll to the right to see a full list of permissions for each role.

{{<table-wrap>}}

|                                 | Access Read | Access Edit | Gateway Read | Gateway Edit | Gateway Report | Billing Read | Billing Edit |
| ------------------------------- | ----------- | ----------- | ------------ | ------------ | -------------- | ------------ | ------------ | --- |
| Super Administrator             | ✓           | ✓           | ✓            | ✓            | ✓              | ✓            | ✓            |
| Cloudflare Zero Trust           | ✓           | ✓           | ✓            | ✓            | ✓              | ✓            | -            |
| Cloudflare Access               | ✓           | ✓           | ✓            | -            | ✓              | ✓            | -            | -   |
| Cloudflare Gateway              | ✓           | -           | ✓            | ✓            | ✓              | ✓            | -            | -   |
| Cloudflare Zero Trust Read Only | ✓           | -           | ✓            | -            | ✓              | ✓            | -            | -   |
| Cloudflare Zero Trust Reporting | -           | -           | -            | -            | ✓              | ✓            | -            | -   |

{{</table-wrap>}}

### Cloudflare Zero Trust PII

By default, only Super Administrators can view end users' PII in the Gateway activity logs, such as Device IDs, Source IPs, or user emails. No other roles will have the ability to read PII unless Super Administrators explicitly assign the **Cloudflare Zero Trust PII** role to them.

The Cloudflare Zero Trust PII role should be considered an add-on role, to be combined with any role from the table above. For example, Super Administrators may decide to assign the Cloudflare Gateway role to a user, and add the Cloudflare Zero Trust PII role to allow that user to access PII in the Gateway logs.

{{<Aside type="note">}}
The Cloudflare Zero Trust PII role does not apply to Access audit logs. PII is always visible in Access logs.
{{</Aside>}}
