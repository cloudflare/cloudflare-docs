---
order: 2
---

# Configuring Access policies

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Access policies allow you to protect an entire website or a particular URI (the application resource). You can use policies to define users or groups who can or cannot access the application resource.

You can configure an access policy for an apex domain, a particular subdomain, or all subdomains using a wildcard policy. Similarly, you can apply an access policy to an entire website or protect a specific path. When protecting the entire website, leave the **path** field empty. You specify paths, for example `/admin`, as well.

![Configuring Access Policy](../static/apps/build-rule.png)

Access does not support overlapping definitions. For example, when setting policies for `/admin` and `/admin/specific` separately, `/admin/specific` does not inherit the policy set for `/admin`. The more specific policy is enforced.

Access does not support port numbers in the URL. Requests to URLs with port numbers are redirected to the URL and the port numbers stripped.

## Types of policy decisions

Cloudflare Access enforcement consists of two tiers: policies and rules. Policies define how a decision is enforced. Rules define the conditions that trigger a policy decision. These are the supported policy decisions:

* Allow
* Deny
* Bypass
* Non-identity

### Allow

Allow policies provide access to the application for a user or group. Users who meet the criteria in the defined Allow policy rules are granted permission to reach the application.

Allow policies contain Exclude and Require rules enforce more granular control. For example, an Allow policy with an Include rule defined as “`Emails Ending In: @example.com`.” lets any user with an `@example.com` email address, as validated against an IdP, can reach the application.

Add a [Require rule](#require) in the same policy to enforce additional checks, providing more granular control. When the Require rule defines a set of IP ranges, a user must be a member of `@example.com` and their request must originate from the defined IP range.

Finally, if the policy also contains an [Exclude rule](#exclude), users meeting that definition are prevented from reaching the application. When the Exclude rule defines a single email, such as `johndoe@example.com`, then all users in `@example.com` within the defined IP range are granted access, except for `johndoe@example.com`.

### Deny

Deny policies explicitly prevent users from reaching an application behind Access. Deny policies enforce similar behavior to allow policies that contain an Exclude rule without the need to allow specific users.

For example, a Deny policy that contains an Include rule defined as “Everyone” restricts access to any requests that attempt to reach the application.

### Bypass

Use this policy to bypass Access for a specific path of the application or for the entire application. Bypass policies disable any Access enforcement on the given path.

Let’s take an example website secured with Access with a third-party service that needs access to a specific endpoint. You can configure traffic to bypass Access and access that endpoint. You can also whitelist a range of IP addresses to bypass Access or allow all traffic by setting the policy to include everyone.

If the service does not publish its IP range or it changes periodically, you can choose to include _Everyone_ in the Bypass policy so that any request can access the specified path.

When configuring a Bypass policy to allow requests to a specific page while protecting the entire site or other specified pages, store your assets in the path to bypass. Otherwise, Access allows traffic to that page but does not retrieve (display) assets stored in protected locations.

**Note:** When applying a Bypass policy, security settings revert to the defaults configured for the zone and any configured page rules. If _Always use HTTPS_ is enabled for the site, then traffic to the bypassed destination continues in HTTPS. If it is not or you applied page rules to disable it, traffic is HTTP.

### Non-identity

Non-identity policies enforce authentication flows that do not require an identity provider IdP) login, such as service tokens and [mutual TLS](/service-auth/mtls/).

## Types of rule decisions

Rules determine the criteria for a given policy action. The types of rule decisions available are:

* Include
* Exclude
* Require

### Include

The Include policy works similar to an `OR` logical operator. For example, a policy contains two Include rules: `Email Ending In: @example.com` and `Emails: johndoe@company.com`. Any user who is a member of `@example.com` or with the email address `johndoe@company.com` can access. Users do not need to meet both criteria. It is recommended that every Access Group and application policy have at least one Include Access rule.

### Exclude

The Exclude policy works like a `NOT` logical operator. For example, in a policy with the Exclude rule `Emails: johndoe@company.com`, a user with that email address is excluded from any Include rules and cannot access to the application.

### Require

The Require policy works like an `AND` logical operator. For example, in a policy with the Require rule `IP Ranges: 192.168.100.14⁄2`, users must send requests from this IP range and meet at least one criteria in an Include rule to access the application.

### Policy ordering and paths

Access policies trigger sequentially based on their position in the policy table in your Cloudflare dashboard, except for Bypass policies; Access evaluates Bypass policies first.

For Allow and Deny policies, Access enforces the decision starting at the top of the list. You can modify the order in which policies trigger by dragging and dropping individual policies.

![Configuring Access Policy](../static/apps/multi-rule.png)

You can create unique policies for parts of the application that share a root path. When multiple policies are set for a common root path, they do not inherit rules. Instead, the more specific policy takes precedence. For example:

* The application is deployed at `dashboard.com/eng`.
* Policy A restricts access to that path to members of the engineering team.
* Have a tool deployed at `dashboard.com/eng/exec` that only the executive team can reach that path.
* When using only Policy A, this path inherits the rules from Policy A and members of the engineering team can access that path. You can instead create a second policy, Policy B, to restrict access to the executive team.
* When applying Policy B to `dashboard.com/eng/exec`, the more specific policy takes precedence. The `/exec` path is gated by Policy B instead of relying on the rules in Policy A.

## Using wildcards in policies

You can secure any subdomain of the apex domain in Cloudflare Access by using a wildcard in the policy. Wildcard policies use an asterisk ( * )  in the _Subdomain_ field in the _Create Access Policy_ window.

Note that using a wildcard in the _Subdomain_ field does not cover the apex domain. That is, a wildcard policy that controls access using the format, `*.example.com`, covers `alpha.example.com` and `beta.example.com`, but not `example.com`. You must create separate policies for the apex domain.
