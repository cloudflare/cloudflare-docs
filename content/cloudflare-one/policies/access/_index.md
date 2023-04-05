---
pcx_content_type: configuration
title: Access
layout: single
weight: 2
meta:
  title: Access policies
---

# Access policies

Cloudflare Access determines who can reach your application by applying the Access policies you configure.

An Access policy consists of an **Action** as well as rules which determine the scope of the action. To build a rule, you need to choose a **Rule type**, **Selector**, and a **Value** for the selector.

- [Actions](#actions)
- [Rule types](#rule-types)
- [Selectors](#selectors)

## Actions

Actions let you grant or deny permission to a certain user or user group. You can set only one action per policy.

### Allow

The Allow action allows users that meet certain criteria to reach an application behind Access.

The following example lets any user with an `@example.com` email address, as validated against an IdP, reach the application:

| Action | Rule type | Selector          | Value |
| ------ | --------- | ----------------- | ------ |
| Allow  | Include   | Emails Ending In: | `@example.com` |

You can add a Require rule in the same policy action to enforce additional checks. Finally, if the policy contains an Exclude rule, users meeting that definition are prevented from reaching the application. 

For example, this second configuration lets any user from Portugal with a `@team.com` email address, as validated against an IdP, reach the application, except for `user-1` and `user-2`:

| Action | Rule type | Selector | Value |
| ------ | ---- | -------- | -----------|
| Allow  | Include | Country | `Portugal` |
|        | Require | Emails Ending In | `@team.com` |
|        | Exclude | Email | `user-1@team.com`, `user-2@team.com` |

### Block

The Block action prevents users from reaching an application behind Access.

For example, this configuration blocks every request to the application, except for requests from `user-1@team.com`:

| Action | Rule type | Selector | Value |
| ------ | --------- | -------- |-------|
| Block  | Include   | Everyone | `Everyone` |
|        | Exclude   | Email    | `user-1@team.com`|

### Bypass

The Bypass action disables any Access enforcement for traffic that meets the defined rule criteria. This may be useful if you want to ensure your employees have direct permanent access to your internal applications, while still ensuring that any external resource is always asked to authenticate.

A Bypass policy based on IP ranges for an internal application could look like this, where you can input your office's IP addresses in the `Value` field:

| Action | Rule type  | Selector  | Value             |
|--------| ------- | --------- | ----------------- |
| Bypass  | Include | IP ranges | `192.xxx.xxx.xxx` |

This means Access won’t be enforced on the set of IP addresses you have specified. To complete the setup, you need an additional rule to ensure that anyone asking to access your application from a different IP address will only be granted access if they only meet certain criteria, like email addresses ending with a given domain.

To do so, set up an additional Allow policy like the following:

| Action | Rule    | Selector       | Value                              |
| ------- | ------- | ---------------- | ---------------------------------- |
| Allow | Include | Emails ending in | `@contractors.com`, `@company.com` |

This ensures that everyone connecting from outside your specified IP range will be prompted to authenticate.

{{<Aside type="note">}}

When applying a Bypass action, security settings revert to the defaults configured for the zone and any configured page rules. If **Always use HTTPS** is enabled for the site, then traffic to the bypassed destination continues in HTTPS. If it is not or you applied page rules to disable it, traffic is HTTP.

{{</Aside>}}

### Service Auth

Service Auth rules enforce authentication flows that do not require an identity provider IdP login, such as service tokens and mutual TLS.

| Action | Rule type | Selector |
| ------ | --------- | -------- |
| Service Auth  | Include   | Valid certificate |

## Rule types

Rules work like logical operators. They help you define which categories of users your policy will affect.

| Include | Exclude | Require |
| ------- | ------- | ------- |
| The Include rule is similar to an OR logical operator. In case more than one Include rule is specified, users need to meet only one of the criteria. | The Exclude rule works like a NOT logical operator. A user meeting any Exclusion criteria will not be allowed access to the application. | The Require rule works like an AND logical operator. A user must meet all specified Require rules to be allowed access. |

All Access policies must contain an Include rule. This is what defines the initial pool of eligible users who can access an application. You can then add Exclude and Require rules to enforce specific policies for those users.

### Requiring multiple conditions

When setting up a Require rule for an Access policy, keep in mind that any values you add to the rule will be concatenated by an AND operator. For example, let's say you want to grant access to an application to both the full-time employees and the contractors, and only the ones based in specific countries — say Portugal and the United States. If you set up a rule with the following configuration:

| Action | Rule type   | Selector         | Value                                 |
| -------| ------- | ---------------- | ------------------------------------- |
| Allow  | Require | Emails ending in | `@cloudflare.com`, `@contractors.com` |
|        | Require | Country          | `United States`, `Portugal`           |

the policy will only grant access to people reaching the application from both the United States AND Portugal, and who have both an email ending in `@cloudflare.com` AND in `@contractors.com`. Therefore, nobody will have access to the application.

Instead, you can address this need by using [Access groups](/cloudflare-one/identity/users/groups/). First, you can set up a group (we will call it `My Access Group`) that includes users in Portugal OR in the United States:

| Rule type    | Selector | Value                       |
| ------- | -------- | --------------------------- |
| Include | Country  | `United States`, `Portugal` |

Next, you can create a policy for your application that requires the group, and that also includes users with emails ending in either `@cloudflare.com` OR `@contractors.com`:

| Action | Rule type   | Selector          | Value                                 |
| -------| ------- | ----------------- | ------------------------------------- |
| Allow  | Require | `My Access Group` | -                                     |
|        | Include | Emails ending in  | `@cloudflare.com`, `@contractors.com` |

## Selectors

When you add a rule to your policy, you will be asked to specify the criteria you want users to meet.  

These criteria are available for all Access application types, including [SaaS](/cloudflare-one/applications/configure-apps/saas-apps/), [self-hosted](/cloudflare-one/applications/configure-apps/self-hosted-apps/), and [non-HTTP](/cloudflare-one/applications/non-http/) applications. Identity-based attributes are only checked when a user authenticates, whereas other attributes are polled continuously for changes during the session.

{{<table-wrap>}}
| Selector | Description  | Checked at login | Checked continuously |
| -------- | ------------ | ---------------- | -------------------- |
| Emails   | `you@company.com`  | ✅ | ❌ |
| Emails ending in | `@company.com`| ✅ | ❌ |
| External Evaluation | Allows or denies access based on [custom logic](/cloudflare-one/policies/access/external-evaluation/) in an external API. | ✅ | ❌ |
| IP ranges | `192.168.100.14` (supports IPv4 and IPv6). | ✅ | ✅ |
| Country | Uses the IP address to determine country. | ✅ | ✅ |
| Everyone | Allows, denies, or bypasses access to everyone. |  ✅ | ❌ |
| Common Name | The request will need to present a valid certificate with an expected common name. | ✅ | ✅ |
| Valid Certificate | The request will need to present any valid client certificate. |✅ | ✅ |
| Service Token| The request will need to present the correct service token headers configured for the specific application. |✅ | ✅ |
| Any Access Service Token | The request will need to present the headers for any [service token](/cloudflare-one/identity/service-tokens/) created for this account. |✅ | ✅ |
| Login Methods | Checks the identity provider used at the time of login. | ✅ | ❌ |
| Authentication Method | Checks the [multifactor authentication](/cloudflare-one/policies/access/mfa-requirements/) method used by the user, if supported by the identity provider. |✅ | ❌  |
| Identity provider group| Checks the user groups you configured with your identity provider (IdP). This selector only displays if you use AzureAD, Github, Google, or Okta as your IdP.  | ✅ | ❌ |
| SAML Group | Checks a SAML attribute name / value pair. This selector only displays if you use a generic SAML identity provider. | ✅ | ❌ |
| OIDC Claim | Checks an OIDC claim name / value pair. This selector only displays if you use a generic OIDC identity provider. | ✅ | ❌ |
| Device posture | Checks [device posture signals](/cloudflare-one/identity/devices/) from the WARP client or a third-party service provider. |✅ | ✅ |
| Warp | Checks that the device is connected to WARP, including the consumer version. |✅ | ✅ |
| Gateway | Checks that the device is connected to your Zero Trust instance through the [WARP client](/cloudflare-one/connections/connect-devices/warp/). |✅ | ✅ |
{{</table-wrap>}}

## Order of execution

Policies are evaluated based on their action type and ordering. Bypass and Service Auth policies are evaluated first, from top to bottom as shown in the UI. Then, Block and Allow policies are evaluated based on their order.

For example, if you have a list of policies arranged as follows:

- Allow A
- Block B
- Service Auth C
- Bypass D
- Allow E

The policies will execute in this order: Service Auth C > Bypass D > Allow A > Block B > Allow E. Once a user matches an Allow or Block policy, evaluation stops and no subsequent policies can override the decision.
