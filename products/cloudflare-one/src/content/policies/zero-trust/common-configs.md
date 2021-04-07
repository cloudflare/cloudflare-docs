---
order: 2
---

# Common configurations

This section addresses a few common policy configurations and best practices.

For a basic overview of how to create, edit, and delete Policies on the dashboard, please see the [policy management page](/policies/zero-trust/policy-management).

## Allow

All rule actions must have at least one *Include*. Add a *Require* rule in the same policy action to enforce additional checks. Finally, if the policy contains an *Exclude* rule, users meeting that definition are prevented from reaching the application.

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

<Aside type='warning' header='Important'>

An Exclude rule will allow any user meeting that criteria to access an application when a Block Action is configured.
</Aside>

This action explicitly prevents users from reaching an application behind Access. Block actions enforce similar behavior to allow actions that contain an Exclude rule without the need to allow specific users.

| Action | Rule | Criteria |
| ------ | ---- | -------- |
| Block  | Include | `Everyone` |
|   | Exclude | Email: `user-1@team.com` |

**Result**: this configuration blocks every request to the application, except for requests from `user-1@team.com`.

## Bypass

<Aside type='warning' header='Important'>

Use Bypass rules carefully, as they <b>disable any Access enforcement</b> for traffic that meets the defined rule criteria.
</Aside>

The bypass rule action disables any Access enforcement for traffic that meets the defined rule criteria. This may be useful if you want to ensure your employees have direct permanent access to your internal applications, while still ensuring that any external resource is always asked to authenticate.

A *Bypass* rule based on IP ranges for an internal application could look like this, where you can input your office's IP addresses in the `Value` field: 

| Action | Rule | Criteria | Value |
| ------ | ---- | -------- | ----- | 
| Bypass  | Include | IP ranges | `192.xxx.xxx.xxx` |

This means Access won’t be enforced on the set of IP addresses you’ve specified.  To complete the setup, you need an additional rule to ensure that anyone asking to access your application from a different IP address will only be granted access if they only meet certain criteria, like email addresses ending with a given domain.

To do so, set up an additional *Allow* rule like the following:


| Action | Rule | Criteria | Value |
| ------ | ---- | -------- | ----- | 
| Allow  | Include | Emails ending in | `@contractors.com`, `@company.com` |

This ensures that everyone connecting from outside your specified IP range will be prompted to authenticate.

## Service Auth
Service Auth rules enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and mutual TLS.

