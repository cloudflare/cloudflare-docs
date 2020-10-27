---
order: 10
hidden: true
---

# Access Groups

Access Groups define a set of users that can be added to an Access policy. You can reuse Access Groups to quickly create policies and apply them to the same set of users.

Access Groups are distinct from groups in your identity provider, like Okta groups. Access Groups can contain a mix of individual users, groups from identity providers, and service authentication options like service tokens.

To create and manage Access Groups, navigate to the **My Teams** section of the Cloudflare for Teams dashboard and open the **Groups** option.

![Access Groups](../static/groups/groups.png)

## Group membership rules

Access group membership rules determine whether a user is a member of a particular group. The rules follow the same structure as rules used in Cloudflare Access Application policies.

![Access Groups](../static/groups/group-creation.png)

Rules for Access Groups follow the same [logic](/setting-up-access/configuring-access-policies/) as rules for Access Policies.

Membership rule types help define whether to include or exclude a team member from an Access group. Here are some membership types and examples:

* **Email —** `you@company.com`

* **Email ending in —** `@company.com`

* **IP address —** Supports IPv4 and IPv6 addresses, for example: `192.168.100.14/2`

* **Everyone —** Applies to everyone. Use `Everyone` filter to allow, deny, or bypass access to everyone.

* **Identity provider groups —** Employs the user groups you configured with your identity provider (IdP) or LDAP with Access. The IdP group option only displays if you use an identity provider that passes groups using SAML or OAuth Scope.

## Using groups for IP-based rules

We recommend using Access groups to define any IP address-based rules you configure in policies. Keeping IP addresses in one place allows you to modify or remove addresses once, rather than in each policy, and reduces the potential for mistakes.

**Note:** If adding more than one IP address or range to an access group, it’s best to use an Include rule. If you don’t use the Include rule, the policy using that Access group attempts to require traffic to originate from all ranges.

## Legacy groups

Cloudflare Access supported a flow in the UI to build policies with IdP groups, called Legacy groups. Native integration with groups surfaced from your IdP has replaced this feature. If your account built policies with Legacy groups, these are still available and continue to work as you intend.

If your account uses Legacy groups, a banner displays in the Access dashboard.

Unfortunately, Access cannot automatically migrate your Legacy groups. This is due to the risk of Legacy group names not matching identity provider group names or, in some cases, IdP groups consisting of a unique ID unknown to Access.

To migrate from Legacy groups:

1. Open policies using Legacy groups.

    Navigate to your Access policies and open any using Legacy groups.

1. Replace Legacy groups with identity provider groups.
1. Replace the policy rules using Legacy groups by adding a new, mirrored rule that pulls groups from your identity provider.

    For example, if you have a Legacy group that allows “Engineers,” and that Legacy group maps to the same membership of an Okta® group, add a new rule based on Okta groups to allow “Engineers.”

1. Remove the Legacy group rule.

    Once you create a new rule with the group from your identity provider, remove the rule that uses Legacy groups.

1. Click **Save**.

    **Note:** If you continue to use policies with Legacy groups, Access still prevents unauthorized users from reaching your applications; however, users who are members of Legacy groups are also prevented from being authenticated.