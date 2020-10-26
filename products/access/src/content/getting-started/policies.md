---
order: 3
---

# Policies

Policies let you define who can or cannot access applications secured behind Cloudflare Access, based on a number of attributes. These attributes include User Identity, network attributes, and device posture.

You can define the scope of a policy by configuring **policy actions** and **policy rules**.

## Policy Actions
Policy actions dictate how a user is routed based on a defined set of policy rules. You can select four types of policy actions:
### Allow
Grants permission to reach the application to a user or group. Allow will always require authentication through an identity provider.
### Block
Explicitly prevents users from reaching an application behind Access.
### Bypass
Disables any Access enforcement on the given path.
### Service Auth
Enforces authentication flows that do not require an identity provider IdP login, such as service tokens and mutual TLS.

## Policy Rules
Policy rules provide the criteria for how a policy actions are applied. There are three types of rules you can configure:
### Include
The Include action is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria.
### Exclude
The Exclude rule works like a NOT logical operator. A user meeting any Exclude criteria won’t be allowed access to the application.
### Require
The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access.

## Criteria
Rule criteria help define whether to include or exclude a team member from being influenced by a rule.
These are the criteria you can assign to a rule:

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

<!-- To learn more about policy rules and how to combine policy actions and rules, read the [Policy Management](/learning-and-examples/policy-management/) section. -->

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



<!--

<Aside>

If you configure one policy for an application, and then decide to delete that one policy, Access will block everyone from reaching that application, by default. When clicking Delete on the only policy you have configured for an application, you will be asked to confirm that you wish to save the application without policies.
</Aside> -->


