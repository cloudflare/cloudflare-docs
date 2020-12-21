---
order: 0
---

# Policy structure

<Aside>

For instructions on how to add, edit, and delete policies in the Teams dashboard, visit the [Policy management](/getting-started/policies) section.
</Aside>

Access policies let you define who has access to your organization's applications. To build an Access policy, you will have to combine different elements; the way you assemble these "building blocks" determines the scope and effectiveness of your policy.

The elements that make up an Access policy are:

* [Actions](#actions)
* [Rules](#rules)
* [Criteria](#criteria)

## Actions

Actions let you define what *action* you want to take on a certain user or user group. Do you want to allow someone access to your applications? Do you want to deny someone access to your applications? Do you want to bypass certain users?

The action is the first element you'll be asked to configure when you create an Access policy in the Teams dash. You can set only one action per policy.

These are the action types you can choose from:

* **​Allow**.  
    The allow action allows users that meet certain criteria to reach an application behind Access. 
* **Block**.  
    The block action prevents users from reaching an application behind Access. 
* **Bypass**.  
    The bypass action disables any Access enforcement for traffic that meets the defined rule criteria.
* **Service Auth**.  
    Service Auth rules enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and mutual TLS.

**Note.** When applying a Bypass action, security settings revert to the defaults configured for the zone and any configured page rules. If Always use HTTPS is enabled for the site, then traffic to the bypassed destination continues in HTTPS. If it is not or you applied page rules to disable it, traffic is HTTP.

## Rules

Rules work like logical operators. They help you define which categories of users your policy will affect. Each action needs at least an Include rule; for each action, you can set as many rules as you need. 

These are the rule types you can choose from:

| Include | Exception | Require |
| ------- | ------- | ------- |
| The Include action is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria. | Exceptions work like a NOT logical operator. A user meeting any Exclude criteria won’t be allowed access to the application. | The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access. |

## Criteria

When you add a rule to your policy, you will be asked to specify the criteria you want users to meet in order for the rule to be applied to them. For example, you may want your policy to apply to all your team members in a specific country, except the ones whose email ends in `@contractor.company.com`. 

Here is a list of all the criteria you can apply:

* **Emails** — `you@company.com`
* **Emails ending in** — `@company.com`
* **Access groups** — `example-team`
* **IP ranges** — `192.168.100.14` (supports IPv4 and IPv6).
* **Everyone** — allows, denies, or bypasses access to everyone.
* **Country** – uses the IP address to determine country.
* **Valid Certificate** - the request will need to present any valid client certificate.
* **Common Name** - the request will need to present a valid certificate with an expected common name.
* **Any Access Service Token** - the request will need to present the headers for any [service token](/access-service-auth/service-tokens) created for this account.
* **Service Token** - the request will need to present the correct service token headers configured for the specific application
* **Identity provider groups** — employs the user groups (if supported) you configured with your identity provider (IdP) or LDAP with Access. The IdP group option only displays if you use an identity provider that passes groups using SAML or OAuth Scope.
* **Authentication Method** - checks the [multifactor authentication](/learning/mfa-requirements) method used by the user, if supported by the identity provider.
* **WARP** - checks if the user's machine is running the Cloudflare WARP client.
* **Gateway** - checks if the user's machine is running your organization's Gateway configuration.

## Policy evaluation

For [self-hosted applications](/getting-started/applications#protect-a-self-hosted-application), policies are evaluated on every request to that application regardless of a user’s session length. 

For [SaaS applications](/getting-started/applications#protect-a-saas-application), policies are only evaluated at the time of login. A user’s session will then be controlled by the specific SaaS application.

To learn more on how Access evaluates policies, read the [section about changes in user context](/learning/policies-and-rules#changes-in-user-context).

## Changes in user context

For [self-hosted applications](/getting-started/applications#protect-a-self-hosted-application), Access evaluates the following attributes on every request:
* `IP Address`
* `Country`
* `mTLS Certificate`
* `Service Token`

If any of these attributes change and become out of policy, the user’s session will be immediately terminated, regardless of their remaining session length. For example, you could configure a policy with the following criteria:

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Allow  | Include | Country: `United States` |
|   | Require | Emails ending in: `@team.com` |
|   | Require | IP ranges: `192.168.100.14` |

Where `192.168.100.14` is the IP address of your office network. This would grant access to your team members from the United States who connect from your office network. If a user logs into the application with a session length of 8 hours, and leaves the office mid-session to connect from a different IP address, that user will be blocked.

The following attributes are only evaluated on login:
* `Email`
* `Emails Ending in`
* `All attributes for Access for SaaS applications`

For [SaaS applications](/getting-started/applications#protect-a-saas-application), policies are only evaluated at the time of login. A user’s session will then be controlled by the specific SaaS application.

## Rule ordering

Access policies trigger sequentially, based on their position in your Cloudflare dashboard, except for Bypass actions; Access evaluates Bypass actions first, in the order they appear.
For Allow, Block and Service Auth actions, Access enforces the decision starting at the top of the list in the rules menu. You can modify the order in which rules trigger by dragging and dropping.

![Rule ordering](../static/summary/rule-ordering.png)