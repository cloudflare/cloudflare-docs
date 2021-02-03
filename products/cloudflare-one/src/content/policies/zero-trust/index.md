---
order: 4
---

# Zero Trust

Access determines who can reach your applications by applying the zero-trust policies you configure. To build a zero-trust policy, you will have to combine different elements; the way you assemble these "building blocks" determines the scope and effectiveness of your policy.

The elements that make up a zero-trust policy are:

* **Actions**
* **Rules**
* **Criteria**

### Actions

Actions let you define which *action* you want to take on a certain user or user group. Do you want to allow someone access to your applications? Do you want to deny someone access to your applications? Do you want to bypass certain users?

The action is the first element you'll be asked to configure when you create a zero-trust policy in the Teams dash. You can set only one action per policy.

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

### Rules

Rules work like logical operators. They help you define which categories of users your policy will affect. Each action needs at least an Include rule; for each action, you can set as many rules as you need. 

These are the rule types you can choose from:

| Include | Exclude | Require |
| ------- | ------- | ------- |
| The Include action is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria. | The Exclude rule works like a NOT logical operator. A user meeting any Exclude criteria won’t be allowed access to the application. | The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access. |

### Criteria

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
* **Login Method** - checks the identity provider used at the time of login.


### Example scenarios


| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Allow  | Include | Emails Ending In: `@example.com` |

**Result**: this configuration lets any user with an `@example.com` email address, as validated against an IdP, reach the application. 

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Allow  | Include | Country: `Portugal` |
|  | Require | Emails Ending In: `@team.com` |
|  | Exclude | Email: `user-1@team.com`, `user-2@team.com` |

**Result**: this configuration lets any user from Portugal with a `@team.com` email address, as validated against an IdP, reach the application, except for `user-1` and `user-2`.

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Block  | Include | `Everyone` |

**Result**: this configuration blocks every request to the application.
