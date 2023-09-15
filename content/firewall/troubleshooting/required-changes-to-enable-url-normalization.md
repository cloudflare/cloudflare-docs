---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360057896851-Required-Firewall-Rule-changes-to-enable-URL-normalization
title: Required firewall rule changes to enable URL normalization
---

# Required firewall rule changes to enable URL normalization

{{<render file="_deprecation-notice.md">}}

On 2021-04-08, Cloudflare announced [URL normalization](/rules/normalization/), a feature that protects zones by normalizing HTTP request URI paths.

Malicious users can craft specific URIs that could be interpreted differently by firewall systems and origin systems. When you enable **Normalize incoming URLs**, all rules filtering on the URI path will receive the URL in a canonical form, which provides an extra layer of protection against these malicious users. 

Cloudflare gradually enabled URL normalization for all Cloudflare zones except for those that could be impacted by this change. We determined the impacted zones by analyzing all firewall rules, looking for patterns in HTTP fields that would no longer match when using URL normalization techniques.

These fields are the following:
- `http.request.uri.path`
- `http.request.full_uri`
- `http.request.uri`

Cloudflare did not enable URL normalization automatically for zones that would be impacted by these changes to prevent any change in behavior of your existing firewall rules.

## Why URL normalization is important

Cloudflare strongly recommends that you enable **Normalize incoming URLs** in **Rules** > **Settings** to strengthen your zone's security posture. Not doing so leaves your zone at greater risk of a successful attack. Malicious actors could craft the URL in a way that the rules are not accounting for.

For example, a firewall rule with an expression such as `http.request.uri.path contains "/login"` could be bypassed if the malicious actor has encoded the `l` character as `%6C`. In this scenario, and with URL normalization disabled, traffic would not be matched by the firewall rule.

Refer to [How URL normalization works](/rules/normalization/how-it-works/) for more information and additional examples.

---

## Recommended procedure

It is recommended that you:
1. Update any firewall rules impacted by the URL normalization changes.
2. Enable URL normalization.

These steps will ensure a stronger security posture on your zone(s).

### 1. Review and update firewall rules

Before enabling URL normalization, you should review the affected firewall rules on your zone(s) and take one of the following approaches:

- Edit these firewall rules to remove the parts which will no longer trigger once normalized — for example, any rules that look for `//` or `../` in URL paths. Administrators previously created these rules to perform a limited URL normalization, and these rules can now be safely disabled and then deleted.

- If you wish to identify visitors with non-normalized URI paths with these firewall rules, you should update them to use the original (or raw) non-normalized fields. These fields are the following:

    - `raw.http.request.uri.path`
    - `raw.http.request.full_uri`
    - `raw.http.request.uri`

### 2. Enable URL normalization

Once you have updated the affected firewall rules, enable URL normalization in **Rules** > **Settings**.

A Cloudflare user must have the [Firewall role](/fundamentals/account-and-billing/members/roles/) or one of the Administrator roles to access URL normalization settings in the dashboard.

___

## Related resources

- [URL normalization](/rules/normalization/)
- [Transform Rules](/rules/transform/)
