---
pcx_content_type: reference
title: Role scopes
weight: 4
---

# Role scopes

When you assign domain specific roles to account members, you can scope these roles to apply to all domains or various combinations of included and excluded domains.

---

## Choose role scopes

You choose the scope of a role when you [add a member](/fundamentals/account-and-billing/members/manage/) to your account.

### All domains

If you want the member to have a role that applies to all domains within your account, use the following combination of fields.

| Field | Value |
| --- | --- |
| Operator | *Include* |
| Type | *All domains* |

{{<Aside type="note">}}

You can only assign [account-scoped roles](/fundamentals/account-and-billing/members/roles/#account-scoped-roles) to members who have access to all domains.

{{</Aside>}}

### Excluding specific domains

If you want the member to have roles associated with most domains, but not one or two specific, more restricted domains, use the following combination of fields.

| Field | Value |
| --- | --- |
| Operator | *Include* |
| Type | *All domains* |

| Field | Value |
| --- | --- |
| Operator | *Exclude* |
| Type | *A specific domain* |
| Name | `example.com` |

{{<Aside type="note">}}

If you limit permissions to any domain, you can only assign [domain-scoped roles](/fundamentals/account-and-billing/members/roles/#domain-scoped-roles) to these members.

{{</Aside>}}

### Domain groups

If you want a member with access to a group of specific domains, you can also create a **Domain Group**.

#### Create group

To create a domain group: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator** and have a [verified email address](/fundamentals/account-and-billing/account-setup/verify-email-address/)).
2. Go to **Manage Account** > **Configurations** > **Lists**.
3. For **Domain Group Manager**, select **Create**.
4. Create your domain group:

    1. Select the domains to include.
    2. Add a **Name**.
    3. Select **Create**.

You can also edit and delete these groups as needed.

#### Use group

To assign a member permissions to a domain group, use the following combination of fields:

| Field | Value |
| --- | --- |
| Operator | *Include* |
| Type | *Domain Group* |
| Name | *Example Group* |

{{<Aside type="note">}}

With Domain Groups, you can only assign [domain-scoped roles](/fundamentals/account-and-billing/members/roles/#domain-scoped-roles) to these members.

{{</Aside>}}
