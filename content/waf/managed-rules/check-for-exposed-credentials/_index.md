---
pcx_content_type: concept
title: Check for exposed credentials
weight: 12
---

# Check for exposed credentials

Many web applications have suffered {{<glossary-tooltip term_id="credential stuffing">}}credential stuffing{{</glossary-tooltip>}} attacks in the recent past. In these attacks there is a massive number of login attempts using username/password pairs from databases of {{<glossary-tooltip term_id="exposed credentials">}}exposed credentials{{</glossary-tooltip>}}.

Cloudflare offers you automated checks for exposed credentials using Cloudflare Web Application Firewall (WAF).

{{<Aside type="note">}}

This feature is available to all paid plans.

{{</Aside>}}

The WAF provides two mechanisms for this check:

* The [Exposed Credentials Check Managed Ruleset](/waf/managed-rules/reference/exposed-credentials-check/), which contains predefined rules for popular CMS applications. By enabling this ruleset for a given zone, you immediately enable checks for exposed credentials for these well-known applications.

* The ability to [write custom rules](#exposed-credentials-checks-in-custom-rules) at the account level that check for exposed credentials according to your criteria.

Cloudflare updates the databases of exposed credentials supporting the exposed credentials check feature on a regular basis.

The username and password credentials in clear text never leave the Cloudflare network. The WAF only uses an anonymized version of the username and password when determining if there are previously exposed credentials. Cloudflare follows the approach based on the _k_-Anonymity mathematical property described in the following blog post: [Validating Leaked Passwords with k-Anonymity](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/).

## Available actions

The WAF can perform one of the following actions when it detects exposed credentials:

* **Exposed-Credential-Check Header**: Adds a new HTTP header to HTTP requests with exposed credentials. Your application at the origin can then force a password reset, start a two-factor authentication process, or perform any other action. The name of the added HTTP header is `Exposed-Credential-Check` and its value is `1`.
* **Managed Challenge**: Helps reduce the lifetimes of human time spent solving CAPTCHAs across the Internet. Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge based on specific criteria.
* **Block**: Blocks HTTP requests containing exposed credentials.
* **JS Challenge**: Presents a non-interactive challenge to the clients making HTTP requests with exposed credentials.
* **Log**: Only available on Enterprise plans. Logs requests with exposed credentials in the Cloudflare logs. Recommended for validating a rule before committing to a more severe action.
* **Interactive Challenge**: Presents an interactive challenge to the clients making HTTP requests with exposed credentials.

The default action for the rules in the Exposed Credentials Check Managed Ruleset is *Exposed-Credential-Check Header* (named `rewrite` in the API).

Cloudflare recommends that you only use the following actions: *Exposed-Credential-Check Header* (named `rewrite` in the API) and *Log* (`log`).

## Exposed credentials checks in custom rules

{{<Aside type="note">}}
Exposed credentials checks in custom rules are only available via API and require account-level WAF, which is available to Enterprise customers with a paid add-on.
{{</Aside>}}

Besides enabling the [Exposed Credentials Check Managed Ruleset](/waf/managed-rules/reference/exposed-credentials-check/), you can also check for exposed credentials in [custom rules](/waf/custom-rules/). One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials. Rules that check for exposed credentials run before rate limiting rules.

To check for exposed credentials in a custom rule, include the exposed credentials check in the rule definition at the account level and specify how to obtain the username and password values from the HTTP request. For more information, refer to [Create a custom rule checking for exposed credentials](/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).
