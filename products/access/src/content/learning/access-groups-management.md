---
order: 6
---

# Access Groups Management

This section addresses a few common group configurations and best practices.

For a basic overview of how to create and edit Groups on the dashboard, please see the [Access Groups](/getting-started/access-groups/) page in the Setup section.


## Criteria for Group Rules

Access Group rules determine whether or not a user is a member of a particular group.

Group Rules follow the same [logic](/getting-started/policies/) as rules for Access Policies.

Group rule criteria help define whether to include or exclude a team member from an Access group.
Here is a list of membership types and examples:
* **Emails** — `you@company.com`
* **Emails ending in** — `@company.com`
* **Access groups** — `example-team`
* **IP ranges** — `192.168.100.14` (supports IPv4 and IPv6)
* **Everyone** — allows, denies, or bypasses access to everyone.
* **Country** – uses the IP address to determine country
* **Valid Certificate** - The request will need to present any valid client certificate
* **Common Name** - The request will need to present a valid certificate with an expected common name
* **Any Access Service Token** - The request will need to present the headers for any service token created for this account
* **Service Token** - The request will need to present the correct service token headers configured for the specific application
* **Identity provider groups** — Employs the user groups (if supported) you configured with your identity provider (IdP) or LDAP with Access. The IdP group option only displays if you use an identity provider that passes groups using SAML or OAuth Scope.


## Using Groups For IP-Based Rules

We recommend using Access groups to define any IP address-based rules you configure in policies. Keeping IP addresses in one place allows you to modify or remove addresses once, rather than in each policy, and reduces the potential for mistakes.

**Note**: If adding more than one IP address or range to an access group, it’s best to use an Include rule. If you don’t use the Include rule, the policy using that Access group attempts to require traffic to originate from all ranges.

## Using Groups for Country Requirements

You can create an Access Group that consists of countries to allow or block. The Access Group will treat the countries in the `Include` policy with an `OR` operator. You can use this Access Group inside of a `Require` rule to require at least one of the countries inside of the group.
