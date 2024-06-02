---
pcx_content_type: reference
title: Role scopes
weight: 4
---

# Role scopes

Scopes are one of the 3 constituent parts of a policy that allows granting of access to users.
In order to allow for flexible combinations of access to users, we currently have two types of scopes (Account and Domain), with different sets of roles for each. We are interested in expanding this list of scopes.

---

## Choosing the scope of roles

Each Policy has a limitation of a single scope, but you can assign multiple policies to a given user.
You choose the scope of a policy when you [add a member](/fundamentals/setup/manage-members/manage/).

### Account Scope

If you want the member to have a policy that applies across your account, use the following combination of fields.

| Field | Value |
| --- | --- |
| Operator | *Include* |
| Type | *All domains* |

{{<Aside type="note">}}

You can only assign [account-scoped roles](/fundamentals/setup/manage-members/roles/#account-scoped-roles) as part of these types of policies

{{</Aside>}}

### Specific Domains

If you want the member to have a policy that applies to a specific domain, use the following combination of fields. When applying these roles to this policy, only domain-scoped roles can be used.

| Field | Value |
| --- | --- |
| Operator | *Include* |
| Type | *A specific domain* |
| Name | the specific domain |

### Domain groups

If you have a set of domains that are all categorized similarly (e.g. all of your sensitive/production domains, all domains around a given project or geography), you can pre-assign them into a domain group, and then create policies that provide access to all domains within this group.

#### Create group

To create a domain group: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account (you must be logged in as a **Super Administrator** and have a [verified email address](/fundamentals/setup/account/verify-email-address/)).
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

With Domain Groups, you can only assign [domain-scoped roles](/fundamentals/setup/manage-members/roles/#domain-scoped-roles) to these members.

{{</Aside>}}
