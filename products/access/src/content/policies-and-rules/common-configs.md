---
order: 1
---

# Common policy configurations

This section addresses a few common policy configurations and best practices.

For a basic overview of how to create, edit, and delete Policies on the dashboard, please see the [Policies page](/getting-started/policies/) in the [Getting started](/getting-started) section.

## Allow

All rule actions must have at least one Include. Add a Require rule in the same policy action to enforce additional checks. Finally, if the policy contains an Exclude rule, users meeting that definition are prevented from reaching the application.

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

## Block

This action explicitly prevents users from reaching an application behind Access. Block actions enforce similar behavior to allow actions that contain an Exclude rule without the need to allow specific users.

<Aside type='warning' header='Important'>

An Exclude rule will allow any user meeting that criteria to access an application when a Block Action is configured.

</Aside>

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Block  | Include | `Everyone` |
|   | Exclude | Email: `user-1@team.com` |

**Result**: this configuration blocks every request to the application, except for requests from `user-1@team.com`.

## Bypass

Use this rule action to bypass Access for a specific path of the application, a subset of users or for the entire application. The bypass rule action disables any Access enforcement for traffic that meets the defined rule criteria.

Let’s take an example website secured with Access with a third-party service that needs access to a specific endpoint. You can configure traffic to bypass Access and access that endpoint. You can also whitelist a range of IP addresses to bypass Access or allow all traffic by setting the rule to include everyone.

If the service does not publish its IP range or it changes periodically, you can choose to include Everyone in the Bypass action so that any request can access the specified path.

## Service Auth
Service Auth rules enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and mutual TLS.

