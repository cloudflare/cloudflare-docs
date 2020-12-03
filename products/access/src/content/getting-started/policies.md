---
order: 3
---

# Policies

Access policies let you define who has access to your organization's applications. To build an Access policy, you will have to combine different elements; the way you assemble these "building blocks" determines the scope and effectiveness of your policy.

The elements that make up an Access policy are:

* **Actions**
* **Rules**
* **Criteria**

### Actions

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

### Rules

Rules work like logical operators. They help you define which categories of users your policy will affect. Each action needs at least an Include rule; for each action, you can set as many rules as you need. 

These are the rule types you can choose from:

| Include | Exception | Require |
| ------- | ------- | ------- |
| The Include action is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria. | Exceptions work like a NOT logical operator. A user meeting any Exclude criteria won’t be allowed access to the application. | The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access. |

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

<Aside>

To learn more about policy rules and how to combine policy actions and rules, read the [Policies and rules learning section](/learning/policies-and-rules/).

</Aside>

## Managing policies
Policies are properties of applications. Creating the first policy for an application is part of the set up process for that application.

You can then choose to edit or delete that first policy after completing the application setup, or you can decide to add new policies to the application, all from the Applications section of the Teams dashboard.

There is no limit to the number of policies you can set up for your applications.

To make any changes to an application’s policies:

1. On the Teams dashboard, navigate to the **Access > Applications** page.
2. Locate the application for which you want to change the policies.
3. Click **Edit**. This will automatically redirect you to the app’s **Policies** section.

![Policies section](../static/summary/policies-section.png)

4. Once in the **Policies** section:
  * To make changes to an existing policy, click Edit.
  * To delete a policy, click Delete.
  * To add a new policy, click Add a policy on top of the Policies card.

5. Once you’ve made all the necessary changes, click **Save application**.


## Example scenarios

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

<!--

<Aside>

If you configure one policy for an application, and then decide to delete that one policy, Access will block everyone from reaching that application, by default. When clicking Delete on the only policy you have configured for an application, you will be asked to confirm that you wish to save the application without policies.
</Aside> -->


