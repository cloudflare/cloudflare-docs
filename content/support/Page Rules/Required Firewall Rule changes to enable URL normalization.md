---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360057896851-Required-Firewall-Rule-changes-to-enable-URL-normalization
title: Required Firewall Rule changes to enable URL normalization
---

# Required Firewall Rule changes to enable URL normalization



## Overview

On April 8th, 2021, Cloudflare announced **URL normalization**, a feature that protects zones by normalizing HTTP request URI paths.

Malicious users can craft specific URIs that could be interpreted differently by firewall systems and origin systems. When you enable **Normalize incoming URLs**, all rules filtering on the URI path will receive the URL in a canonical form, which provides an extra layer of protection against these malicious users. 

Cloudflare gradually enabled URL normalization for all Cloudflare zones except for those that could be impacted by this change. We determined the impacted zones by analyzing all Firewall Rules, looking for patterns in HTTP fields that would no longer match when using URL normalization techniques.

These fields are:

-   `http.request.uri.path`
-   `http.request.full_uri`
-   `http.request.uri`

We have **not enabled URL normalization automatically** for zones that would be impacted by these changes to prevent any change in behavior of your existing Firewall Rules.

{{<Aside type="warning">}}
We strongly recommend that you **update any Firewall Rules** impacted by
the URL Normalization changes and that you **enable URL normalization**
to ensure a stronger security posture on your zone(s).
{{</Aside>}}

___

## Required steps

We strongly recommend that you enable **Normalize incoming URLs**, available under Rules in the **Settings** tab, to strengthen your zone(s) security posture. Not doing so leaves your zone at greater risk of a successful attack. Malicious actors could craft the URL in a way that the rules aren't accounting for (e.g., using percent encoding). For example, a Firewall Rule of `http.request.uri.path contains "/login"` could be bypassed if the malicious actor has encoded the `l` character as `%6C`. In this scenario, and with URL normalization disabled, traffic will not be matched by the rule.

Before enabling URL normalization, we recommend that you review the affected Firewall Rules on the zone(s) and take one of the following approaches:

-   Edit these Firewall Rules to remove the parts which will no longer trigger once normalized, for example, any rules that look for `//` or `../` in URL paths. Administrators previously created these rules to perform a limited sort of URL normalization, and these rules can now be safely disabled and then deleted. 
-   If you wish to identify visitors with non-normalized URI paths with these Firewall Rules, you should update them to use the original, non-normalized fields. These are:
    -   `raw.http.request.uri.path`
    -   `raw.http.request.full_uri`
    -   `raw.http.request.uri`

You should enable URL normalization (in **Rules** \> **Settings**) once you have updated the affected Firewall Rules.

A Cloudflare user must have the [Firewall role](/fundamentals/account-and-billing/members/roles/) or one of the Administrator roles to access URL normalization settings in the dashboard.

For more information, check the Cloudflare Developers Portal or create a post on Cloudflare Community.

___

## Related resources

-   [URL normalization](/rules/normalization) (Developers Documentation)
-   [Dynamic URL Rewriting at the edge with Cloudflare](https://blog.cloudflare.com/introducing-transform-rules-with-url-rewriting-at-the-edge) (Cloudflare Blog)
