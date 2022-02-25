---
pcx-content-type: configuration
title: Common configurations
weight: 3
---

# Common configurations

This section addresses a few common policy configurations and best practices.

For a basic overview of how to create, edit, and delete Policies on the dashboard, please see the [policy management page](/cloudflare-one/policies/zero-trust/policy-management/).

## Allow

All rule actions must have at least one *Include*. Add a *Require* rule in the same policy action to enforce additional checks. Finally, if the policy contains an *Exclude* rule, users meeting that definition are prevented from reaching the application.

For example, this configuration lets any user with an `@example.com` email address, as validated against an IdP, reach the application:

**Action**: Allow

| Rule | Criteria | Value |
| ------ | ---- | -------- |
| Include | Emails Ending In | `@example.com` |

For example, this second configuration lets any user from Portugal with a `@team.com` email address, as validated against an IdP, reach the application, except for `user-1` and `user-2`:

**Action**: Allow

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Include | Country | `Portugal` |
| Require | Emails Ending In | `@team.com` |
| Exclude | Email | `user-1@team.com`, `user-2@team.com` |

## Block

{{<Aside type="warning" header="Important">}}

An Exclude rule will allow any user meeting that criteria to access an application when a Block Action is configured.

{{</Aside>}}

This action explicitly prevents users from reaching an application behind Access. Block actions enforce similar behavior to allow actions that contain an Exclude rule without the need to allow specific users.

For example, this configuration blocks every request to the application, except for requests from `user-1@team.com`:

**Action**: Block

| Rule | Criteria | Value |
| ------ | ---- | -------- |
| Include  | `Everyone` | - |
| Exclude | Email | `user-1@team.com` |

## Bypass

{{<Aside type="warning" header="Important">}}

Use Bypass rules carefully, as they <b>disable any Access enforcement</b> for traffic that meets the defined rule criteria.

{{</Aside>}}

The bypass rule action disables any Access enforcement for traffic that meets the defined rule criteria. This may be useful if you want to ensure your employees have direct permanent access to your internal applications, while still ensuring that any external resource is always asked to authenticate.

A *Bypass* rule based on IP ranges for an internal application could look like this, where you can input your office's IP addresses in the `Value` field:

**Action**: Bypass

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Include | IP ranges | `192.xxx.xxx.xxx` |

This means Access won’t be enforced on the set of IP addresses you’ve specified.  To complete the setup, you need an additional rule to ensure that anyone asking to access your application from a different IP address will only be granted access if they only meet certain criteria, like email addresses ending with a given domain.

To do so, set up an additional *Allow* rule like the following:

**Action**: Allow

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Include | Emails ending in | `@contractors.com`, `@company.com` |

This ensures that everyone connecting from outside your specified IP range will be prompted to authenticate.

## Requiring multiple conditions

When setting up a Require rule for an Access policy, keep in mind that any values you add to the rule will be concatenated by an `and` operator. For example, let's say you want to grant access to an application to both the full-time employees and the contractors, and only the ones based in specific countries — say Portugal and the United States. If you set up a rule with the following configuration:

**Action**: Allow

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Require | Emails ending in | `@cloudflare.com`, `@contractors.com` |
| Require | Country | `United States`, `Portugal` |

the policy will only grant access to people reaching the application from both the United States `and` Portugal, and who have both an email ending in `@cloudflare.com` `and` in `@contractors.com`. Therefore, nobody will have access to the application.

Instead, you can address this need by using [Access groups](/cloudflare-one/identity/users/groups/). First, you can set up a group (we will call it `My Access Group`) that `includes` users in Portugal `or` in the United States:

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Include | Country | `United States`, `Portugal` |

Next, you can create a policy for your application that `requires` the group, and that also `includes` users with emails ending in either `@cloudflare.com` `or` `@contractors.com`:

**Action**: Allow

| Rule | Criteria | Value |
| ---- | -------- | ----- |
| Require | `My Access Group` | - |
| Include | Emails ending in | `@cloudflare.com`, `@contractors.com` |

## Service Auth

Service Auth rules enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and mutual TLS.
